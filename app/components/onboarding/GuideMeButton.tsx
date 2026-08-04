"use client";

import { Compass } from "lucide-react";
import { useOnboarding } from "@/app/components/onboarding/useOnboarding";

type GuideMeButtonProps = {
  className?: string;
  compact?: boolean;
};

export default function GuideMeButton({ className = "", compact }: GuideMeButtonProps) {
  const { guideMe, isOpen } = useOnboarding();

  return (
    <button
      type="button"
      onClick={() => guideMe("homepage")}
      disabled={isOpen}
      className={
        className ||
        "nq-btn nq-btn-secondary !py-2 !px-3.5 !text-sm inline-flex items-center gap-1.5"
      }
      aria-label="Start site guide tour"
    >
      <Compass className="h-4 w-4" aria-hidden />
      {compact ? "Guide" : "Guide me"}
    </button>
  );
}
