"use client";

import { motion } from "framer-motion";
import { useMotionSafe } from "@/lib/motion";

export type SpotlightRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type SpotlightProps = {
  rect: SpotlightRect | null;
};

const PAD = 10;

export default function Spotlight({ rect }: SpotlightProps) {
  const animate = useMotionSafe();
  if (!rect) return null;

  const style = {
    top: Math.max(8, rect.top - PAD),
    left: Math.max(8, rect.left - PAD),
    width: rect.width + PAD * 2,
    height: rect.height + PAD * 2,
  };

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[95] rounded-2xl ring-2 ring-nq-accent/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.65)]"
      initial={animate ? { opacity: 0.6, scale: 0.98 } : false}
      animate={{
        opacity: 1,
        scale: 1,
        top: style.top,
        left: style.left,
        width: style.width,
        height: style.height,
      }}
      transition={{ duration: animate ? 0.35 : 0, ease: [0.22, 1, 0.36, 1] }}
      style={{
        boxShadow:
          "0 0 0 9999px rgba(5, 7, 11, 0.72), 0 0 40px rgba(56, 189, 248, 0.25)",
      }}
    />
  );
}
