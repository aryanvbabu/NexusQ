import { useReducedMotion } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;

/** Never hide content with opacity 0 — that left sections blank on mobile. */
export const fadeUp = {
  hidden: { opacity: 1, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export const inView = {
  once: true,
  amount: 0.12 as const,
  margin: "0px 0px -8% 0px",
};

export function useMotionSafe() {
  const prefersReduced = useReducedMotion();
  return !prefersReduced;
}
