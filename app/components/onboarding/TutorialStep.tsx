"use client";

import { useCallback, useEffect, useState } from "react";
import type { TutorialConfig } from "@/tutorials/types";
import Overlay from "./Overlay";
import Spotlight, { type SpotlightRect } from "./Spotlight";
import Tooltip from "./Tooltip";

type TutorialChromeProps = {
  config: TutorialConfig;
  stepIndex: number;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onFinish: () => void;
};

function measure(selector: string): SpotlightRect | null {
  const el = document.querySelector(selector);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  if (r.width === 0 && r.height === 0) return null;
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

export default function TutorialChrome({
  config,
  stepIndex,
  onNext,
  onBack,
  onSkip,
  onFinish,
}: TutorialChromeProps) {
  const step = config.steps[stepIndex];
  const [rect, setRect] = useState<SpotlightRect | null>(null);

  const refresh = useCallback(() => {
    if (!step) return;
    setRect(measure(step.selector));
  }, [step]);

  useEffect(() => {
    if (!step) return;
    const el = document.querySelector(step.selector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
    const t = window.setTimeout(refresh, 350);
    return () => window.clearTimeout(t);
  }, [step, refresh]);

  useEffect(() => {
    refresh();
    window.addEventListener("resize", refresh);
    window.addEventListener("scroll", refresh, true);
    return () => {
      window.removeEventListener("resize", refresh);
      window.removeEventListener("scroll", refresh, true);
    };
  }, [refresh]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onSkip();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (stepIndex >= config.steps.length - 1) onFinish();
        else onNext();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onBack();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onBack, onSkip, onFinish, stepIndex, config.steps.length]);

  if (!step) return null;

  const isFirst = stepIndex === 0;
  const isLast = stepIndex === config.steps.length - 1;
  const stepLabel = `${stepIndex + 1} / ${config.steps.length}`;

  return (
    <div className="nq-onboarding-root" data-tour-active={config.id}>
      <Overlay transparent={Boolean(rect)} />
      <Spotlight rect={rect} />
      <Tooltip
        title={step.title}
        body={step.body}
        stepLabel={stepLabel}
        isFirst={isFirst}
        isLast={isLast}
        placement={step.placement ?? "auto"}
        targetRect={rect}
        onNext={onNext}
        onBack={onBack}
        onSkip={onSkip}
        onFinish={onFinish}
      />
    </div>
  );
}
