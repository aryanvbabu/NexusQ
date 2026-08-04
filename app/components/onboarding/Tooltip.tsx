"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useMotionSafe } from "@/lib/motion";
import type { TutorialPlacement } from "@/tutorials/types";
import type { SpotlightRect } from "./Spotlight";

type TooltipProps = {
  title: string;
  body: string;
  stepLabel: string;
  isFirst: boolean;
  isLast: boolean;
  placement: TutorialPlacement;
  targetRect: SpotlightRect | null;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onFinish: () => void;
};

function computePosition(
  target: SpotlightRect | null,
  placement: TutorialPlacement,
  tooltipW: number,
  tooltipH: number
) {
  const margin = 16;
  const gap = 14;
  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;

  if (!target) {
    return {
      top: Math.max(margin, (vh - tooltipH) / 2),
      left: Math.max(margin, (vw - tooltipW) / 2),
    };
  }

  const candidates: Record<"top" | "bottom" | "left" | "right", { top: number; left: number }> = {
    bottom: {
      top: target.top + target.height + gap,
      left: target.left + target.width / 2 - tooltipW / 2,
    },
    top: {
      top: target.top - tooltipH - gap,
      left: target.left + target.width / 2 - tooltipW / 2,
    },
    left: {
      top: target.top + target.height / 2 - tooltipH / 2,
      left: target.left - tooltipW - gap,
    },
    right: {
      top: target.top + target.height / 2 - tooltipH / 2,
      left: target.left + target.width + gap,
    },
  };

  const order: Array<"top" | "bottom" | "left" | "right"> =
    placement === "auto"
      ? ["bottom", "top", "right", "left"]
      : [placement, "bottom", "top", "right", "left"];

  for (const key of order) {
    const pos = candidates[key];
    const fits =
      pos.top >= margin &&
      pos.left >= margin &&
      pos.top + tooltipH <= vh - margin &&
      pos.left + tooltipW <= vw - margin;
    if (fits) {
      return {
        top: pos.top,
        left: Math.min(Math.max(margin, pos.left), vw - tooltipW - margin),
      };
    }
  }

  // Fallback: clamp preferred
  const pref = candidates[placement === "auto" ? "bottom" : placement];
  return {
    top: Math.min(Math.max(margin, pref.top), vh - tooltipH - margin),
    left: Math.min(Math.max(margin, pref.left), vw - tooltipW - margin),
  };
}

export default function Tooltip({
  title,
  body,
  stepLabel,
  isFirst,
  isLast,
  placement,
  targetRect,
  onNext,
  onBack,
  onSkip,
  onFinish,
}: TooltipProps) {
  const animate = useMotionSafe();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Focus trap + initial focus
  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

    const nodes = focusables();
    nodes[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", onKeyDown);
    return () => {
      panel.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [title, stepLabel]);

  const tooltipW = Math.min(360, typeof window !== "undefined" ? window.innerWidth - 32 : 360);
  const tooltipH = 220;
  const pos = computePosition(targetRect, placement, tooltipW, tooltipH);

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="nq-tour-title"
      aria-describedby="nq-tour-body"
      className="fixed z-[100] w-[min(22.5rem,calc(100vw-2rem))] rounded-2xl border border-nq-border bg-nq-surface-elevated p-5 shadow-2xl shadow-black/50"
      initial={animate ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0, top: pos.top, left: pos.left }}
      transition={{ duration: animate ? 0.3 : 0, ease: [0.22, 1, 0.36, 1] }}
      style={{ top: pos.top, left: pos.left }}
    >
      <p className="text-xs font-medium tracking-wide text-nq-accent" aria-live="polite">
        {stepLabel}
      </p>
      <h2 id="nq-tour-title" className="mt-2 text-lg font-semibold tracking-tight text-nq-text">
        {title}
      </h2>
      <p id="nq-tour-body" className="mt-2 text-sm leading-relaxed text-nq-muted">
        {body}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {!isFirst ? (
          <button
            type="button"
            onClick={onBack}
            className="nq-btn nq-btn-secondary !py-2 !px-3 !text-sm"
            aria-label="Back to previous step"
          >
            Back
          </button>
        ) : null}

        {isLast ? (
          <button
            type="button"
            onClick={onFinish}
            className="nq-btn nq-btn-primary !py-2 !px-3 !text-sm"
            aria-label="Finish tutorial"
          >
            Finish
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="nq-btn nq-btn-primary !py-2 !px-3 !text-sm"
            aria-label="Next step"
          >
            Next
          </button>
        )}

        <button
          type="button"
          onClick={onSkip}
          className="ml-auto text-sm text-nq-muted hover:text-nq-text underline-offset-2 hover:underline"
          aria-label="Skip tour"
        >
          Skip Tour
        </button>
      </div>
    </motion.div>
  );
}
