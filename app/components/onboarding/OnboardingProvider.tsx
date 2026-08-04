"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getTutorial, findMatchingTutorials } from "@/tutorials/registry";
import {
  markCompleted,
  readCompletion,
  resetCompletion,
} from "@/tutorials/storage";
import type {
  CompletionState,
  TutorialConfig,
  TutorialId,
} from "@/tutorials/types";
import TutorialChrome from "./TutorialStep";

const FORCE_TOUR_KEY = "nq_guide_me";

type OnboardingContextValue = {
  active: TutorialConfig | null;
  stepIndex: number;
  completion: CompletionState;
  isOpen: boolean;
  startTutorial: (id: TutorialId) => boolean;
  /** Start a tour now for anyone (ignores completion). Used by Guide me. */
  guideMe: (id?: TutorialId) => void;
  next: () => void;
  back: () => void;
  skip: () => void;
  finish: () => void;
  resetAll: () => void;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return ctx;
}

function getHash() {
  if (typeof window === "undefined") return "";
  return window.location.hash;
}

function waitForSelector(selector: string, attempts = 8, delayMs = 250): Promise<boolean> {
  return new Promise((resolve) => {
    let left = attempts;
    const tick = () => {
      if (document.querySelector(selector)) {
        resolve(true);
        return;
      }
      left -= 1;
      if (left <= 0) {
        resolve(false);
        return;
      }
      window.setTimeout(tick, delayMs);
    };
    tick();
  });
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const userKey = session?.user?.email ?? null;

  const [completion, setCompletion] = useState<CompletionState>(() =>
    typeof window === "undefined" ? readCompletion(null) : readCompletion(null)
  );
  const [active, setActive] = useState<TutorialConfig | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [hash, setHash] = useState("");
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    setCompletion(readCompletion(userKey));
    setHydrated(true);
  }, [userKey]);

  useEffect(() => {
    setHash(getHash());
    const onHash = () => setHash(getHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const closeAndPersist = useCallback(
    (config: TutorialConfig) => {
      setCompletion(markCompleted(config.completionKey, userKey));
      setActive(null);
      setStepIndex(0);
    },
    [userKey]
  );

  const launchTutorial = useCallback(async (id: TutorialId) => {
    const config = getTutorial(id);
    if (!config || config.steps.length === 0) return false;
    const ready = await waitForSelector(config.steps[0].selector);
    if (!ready) return false;
    setActive(config);
    setStepIndex(0);
    return true;
  }, []);

  const startTutorial = useCallback(
    (id: TutorialId) => {
      if (activeRef.current) return false;
      void launchTutorial(id);
      return true;
    },
    [launchTutorial]
  );

  const guideMe = useCallback(
    (id: TutorialId = "homepage") => {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(FORCE_TOUR_KEY, id);
      }
      if (pathname !== "/") {
        router.push("/");
        return;
      }
      void (async () => {
        setActive(null);
        setStepIndex(0);
        window.sessionStorage.removeItem(FORCE_TOUR_KEY);
        await launchTutorial(id);
      })();
    },
    [pathname, router, launchTutorial]
  );

  const next = useCallback(() => {
    if (!active) return;
    if (stepIndex >= active.steps.length - 1) {
      closeAndPersist(active);
      return;
    }
    setStepIndex((i) => i + 1);
  }, [active, stepIndex, closeAndPersist]);

  const back = useCallback(() => {
    setStepIndex((i) => Math.max(0, i - 1));
  }, []);

  const skip = useCallback(() => {
    if (!active) return;
    closeAndPersist(active);
  }, [active, closeAndPersist]);

  const finish = useCallback(() => {
    if (!active) return;
    closeAndPersist(active);
  }, [active, closeAndPersist]);

  const resetAll = useCallback(() => {
    setCompletion(resetCompletion(userKey));
    setActive(null);
    setStepIndex(0);
  }, [userKey]);

  // Honor Guide me / post-login force flag
  useEffect(() => {
    if (!hydrated || pathname !== "/") return;
    const forced = window.sessionStorage.getItem(FORCE_TOUR_KEY) as TutorialId | null;
    if (!forced) return;
    window.sessionStorage.removeItem(FORCE_TOUR_KEY);
    void launchTutorial(forced);
  }, [hydrated, pathname, launchTutorial]);

  // Auto-start matching incomplete tutorials
  useEffect(() => {
    if (!hydrated || status === "loading" || active) return;
    if (pathname !== "/") return;

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      const matches = findMatchingTutorials(pathname, getHash());
      const candidate =
        matches.find((t) => t.id === "homepage" && !completion[t.completionKey]) ??
        matches.find((t) => !completion[t.completionKey]);

      if (!candidate || cancelled) return;
      if (candidate.id === "auditionq" && !completion.homepage_completed) return;

      const ok = await waitForSelector(candidate.steps[0].selector);
      if (!ok || cancelled || activeRef.current) return;
      setActive(candidate);
      setStepIndex(0);
    }, 400);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [hydrated, status, pathname, hash, completion, active]);

  // IntersectionObserver: AuditionQ section tour after homepage done
  useEffect(() => {
    if (!hydrated || active || completion.auditionq_completed) return;
    if (!completion.homepage_completed) return;
    if (pathname !== "/") return;

    const el = document.querySelector('[data-tour="section-auditionq"]');
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (activeRef.current) return;
        const hit = entries.some((e) => e.isIntersecting && e.intersectionRatio >= 0.35);
        if (!hit) return;
        const config = getTutorial("auditionq");
        if (!config) return;
        const latest = readCompletion(userKey);
        if (!latest.homepage_completed || latest.auditionq_completed) return;
        setActive(config);
        setStepIndex(0);
      },
      { threshold: [0.35] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [
    hydrated,
    active,
    completion.auditionq_completed,
    completion.homepage_completed,
    pathname,
    userKey,
  ]);

  const value = useMemo<OnboardingContextValue>(
    () => ({
      active,
      stepIndex,
      completion,
      isOpen: Boolean(active),
      startTutorial,
      guideMe,
      next,
      back,
      skip,
      finish,
      resetAll,
    }),
    [
      active,
      stepIndex,
      completion,
      startTutorial,
      guideMe,
      next,
      back,
      skip,
      finish,
      resetAll,
    ]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
      {active ? (
        <TutorialChrome
          config={active}
          stepIndex={stepIndex}
          onNext={next}
          onBack={back}
          onSkip={skip}
          onFinish={finish}
        />
      ) : null}
    </OnboardingContext.Provider>
  );
}
