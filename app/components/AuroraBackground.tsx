"use client";

import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Aurora Ribbon 1 */}
<motion.div
  className="absolute -top-32 left-1/2 h-[380px] w-[1600px] -translate-x-1/2 rounded-full blur-[140px]"
  style={{
    background:
      "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.12) 20%, rgba(16,185,129,0.14) 50%, rgba(59,130,246,0.16) 80%, transparent 100%)",
    transform: "rotate(-12deg)",
  }}
  animate={{
    x: [-120, 80, -120],
    y: [-20, 30, -20],
    rotate: [-12, -8, -12],
  }}
  transition={{
    duration: 42,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>

      {/* Aurora Ribbon 2 */}
<motion.div
  className="absolute top-10 left-1/2 h-[340px] w-[1500px] -translate-x-1/2 rounded-full blur-[150px]"
  style={{
    background:
      "linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.14) 20%, rgba(34,211,238,0.12) 55%, rgba(56,189,248,0.12) 85%, transparent 100%)",
    transform: "rotate(8deg)",
  }}
  animate={{
    x: [100, -120, 100],
    y: [0, 35, 0],
    rotate: [8, 12, 8],
  }}
  transition={{
    duration: 48,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>

     {/* Aurora Ribbon 3 */}
<motion.div
  className="absolute top-24 left-1/2 h-[420px] w-[1700px] -translate-x-1/2 rounded-full blur-[170px]"
 style={{
  background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.10) 18%, rgba(34,211,238,0.08) 50%, rgba(16,185,129,0.08) 82%, transparent 100%)",
  transform: "rotate(-5deg)",
}}
  animate={{
    x: [-80, 120, -80],
    y: [20, -20, 20],
    rotate: [-5, -2, -5],
  }}
  transition={{
    duration: 55,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>

    {/* Aurora Accent */}
<motion.div
  className="absolute top-1/3 left-1/2 h-[500px] w-[1200px] -translate-x-1/2 rounded-full blur-[200px]"
  style={{
    background:
      "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.05) 45%, rgba(236,72,153,0.04) 60%, transparent 100%)",
    transform: "rotate(3deg)",
  }}
  animate={{
    x: [40, -40, 40],
    y: [0, 15, 0],
    rotate: [3, 6, 3],
  }}
  transition={{
    duration: 60,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
<div
  className="absolute inset-0"
  style={{
    background:
      "linear-gradient(to bottom, transparent 0%, rgba(5,7,11,0.15) 70%, var(--background) 100%)",
  }}
/>
{/* Stars */}
<div
  className="absolute inset-0 opacity-80 dark:opacity-60"
  style={
    {
      "--star-color": "rgba(255,255,255,0.95)",
      "--gold-star": "rgba(255,223,120,0.95)",

      backgroundImage: `
      /* White stars */
      radial-gradient(circle at 15% 20%, var(--star-color) 1px, transparent 2px),
      radial-gradient(circle at 75% 35%, var(--star-color) 1px, transparent 2px),
      radial-gradient(circle at 45% 15%, var(--star-color) 1px, transparent 2px),
      radial-gradient(circle at 90% 10%, var(--star-color) 1.5px, transparent 3px),
      radial-gradient(circle at 10% 60%, var(--star-color) 1px, transparent 2px),
      radial-gradient(circle at 60% 70%, var(--star-color) 1px, transparent 2px),
      radial-gradient(circle at 80% 80%, var(--star-color) 1px, transparent 2px),
      radial-gradient(circle at 30% 85%, var(--star-color) 1px, transparent 2px),
      radial-gradient(circle at 12% 12%, var(--star-color) 1px, transparent 2px),
      radial-gradient(circle at 22% 42%, var(--star-color) 1px, transparent 2px),
      radial-gradient(circle at 38% 30%, var(--star-color) 1px, transparent 2px),
      radial-gradient(circle at 52% 18%, var(--star-color) 1px, transparent 2px),
      radial-gradient(circle at 68% 62%, var(--star-color) 1px, transparent 2px),
      radial-gradient(circle at 82% 24%, var(--star-color) 1px, transparent 2px),
      radial-gradient(circle at 91% 58%, var(--star-color) 1px, transparent 2px),
      radial-gradient(circle at 72% 90%, var(--star-color) 1px, transparent 2px),
      radial-gradient(circle at 18% 78%, var(--star-color) 1px, transparent 2px),
      radial-gradient(circle at 44% 84%, var(--star-color) 1px, transparent 2px),
      radial-gradient(circle at 58% 52%, var(--star-color) 1px, transparent 2px),
      radial-gradient(circle at 95% 85%, var(--star-color) 1px, transparent 2px),

      /* Gold accent stars */
      radial-gradient(circle at 25% 15%, var(--gold-star) 2px, transparent 4px),
      radial-gradient(circle at 78% 22%, var(--gold-star) 2px, transparent 4px),
      radial-gradient(circle at 90% 70%, var(--gold-star) 2px, transparent 4px),
      radial-gradient(circle at 5% 30%, var(--gold-star) 2px, transparent 4px),
      radial-gradient(circle at 35% 65%, var(--gold-star) 2px, transparent 4px),
      radial-gradient(circle at 55% 40%, var(--gold-star) 2px, transparent 4px),
      radial-gradient(circle at 70% 12%, var(--gold-star) 2px, transparent 4px),
      radial-gradient(circle at 88% 45%, var(--gold-star) 2px, transparent 4px),
      radial-gradient(circle at 15% 92%, var(--gold-star) 2px, transparent 4px),
      radial-gradient(circle at 48% 95%, var(--gold-star) 2px, transparent 4px),
      radial-gradient(circle at 65% 88%, var(--gold-star) 2px, transparent 4px),
      radial-gradient(circle at 98% 18%, var(--gold-star) 2px, transparent 4px)
      `,
    } as CSSProperties
  }
/>
    </div>
  );
}