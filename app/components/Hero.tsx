"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMotionSafe, easeOut } from "@/lib/motion";
import AuroraBackground from "./AuroraBackground";

export default function Hero() {
  const animate = useMotionSafe();

  return (
    <section
  id="home"
  className="relative min-h-[115svh] flex items-center overflow-visible px-6 pt-28 pb-56 text-foreground transition-colors duration-300"
  style={{
    background:
      "linear-gradient(180deg, var(--background) 0%, color-mix(in srgb, var(--background) 88%, transparent) 100%)",
  }}
>
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <AuroraBackground />
      </div>

      {/* Soft Hero Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 20%, rgba(56,189,248,0.14), transparent 75%)",
        }}
      />

      {/* Grid Overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {/* Animated Light Ribbon */}
<motion.div
  aria-hidden
  className="absolute top-1/3 left-1/2 -translate-x-1/2 z-10 h-[220px] w-[1200px] rounded-full blur-[120px]"
  style={{
    background:
      "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.12) 20%, rgba(59,130,246,0.18) 50%, rgba(34,211,238,0.12) 80%, transparent 100%)",
  }}
  animate={{
    x: [-40, 40, -40],
    opacity: [0.35, 0.75, 0.35],
  }}
  transition={{
    duration: 12,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>

      {/* Hero Content */}
      <div className="relative z-20 nq-container text-center pt-10">
        <motion.p
  initial={animate ? { opacity: 0, y: -12 } : false}
  animate={{
    opacity: 1,
    textShadow: [
      "0 0 6px rgba(34,211,238,0.15)",
      "0 0 18px rgba(34,211,238,0.45)",
      "0 0 6px rgba(34,211,238,0.15)",
    ],
  }}
  transition={{
    opacity: { duration: 0.55 },
    textShadow: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  className="nq-eyebrow mb-06"
>
  NexusQ Global
</motion.p>

        <motion.h1
          initial={animate ? { opacity: 0, y: 28 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.05 }}
          className="mx-auto max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          Building a serious digital{" "}
         <span
  className="text-nq-accent"
  style={{
    textShadow:
      "0 0 6px rgba(34,211,238,0.30), 0 0 14px rgba(34,211,238,0.18)",
  }}
>
  product ecosystem
</span>
        </motion.h1>

        <motion.p
          initial={animate ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-7 mx-auto max-w-2xl text-lg md:text-xl text-nq-muted leading-relaxed"
        >
          NexusQ Global designs and ships digital platforms — starting with
          AuditionQ, our live flagship product — while carefully exploring what
          comes next.
        </motion.p>

        <motion.div
          initial={animate ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.55, ease: easeOut }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            id="hero-partner-btn"
            href="/partner"
            className="inline-flex items-center justify-center rounded-xl bg-[#22D3EE] px-6 py-3 text-base font-semibold text-slate-900 font-semibold transition-all duration-300 hover:bg-[#18C5DF] hover:scale-105 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)] active:scale-95"
          >
            Partner With Us
          </Link>

          <Link
            id="hero-explore-btn"
            href="#platforms"
            className="nq-btn nq-btn-secondary border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all duration-500"
          >
            Explore Platforms
          </Link>
        </motion.div>
      </div>

      {/* Bottom Fade */}
     {/* Bottom Fade */}
<div
  aria-hidden
  className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-10"
  style={{
    background:
      "linear-gradient(to bottom, transparent 0%, var(--background) 100%)",
  }}
/>

{/* Floating Stats Ribbon */}
<div className="absolute -bottom-14 left-1/2 z-30 hidden -translate-x-1/2 lg:block">
  <div className="flex items-center gap-10 rounded-2xl border border-white/10 bg-black/60 px-10 py-5 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]">

    <motion.div
      whileHover={{ y: -6, scale: 1.05 }}
      transition={{ duration: 0.25 }}
      className="text-center cursor-default"
    >
      <p className="text-3xl font-bold text-cyan-400">1</p>
      <p className="mt-1 text-sm text-white/70">Live Product</p>
    </motion.div>

    <div className="h-10 w-px bg-white/10" />

    <motion.div
      whileHover={{ y: -6, scale: 1.05 }}
      transition={{ duration: 0.25 }}
      className="text-center cursor-default"
    >
      <p className="text-3xl font-bold text-cyan-400">5</p>
      <p className="mt-1 text-sm text-white/70">Vision Products</p>
    </motion.div>

    <div className="h-10 w-px bg-white/10" />

    <motion.div
      whileHover={{ y: -6, scale: 1.05 }}
      transition={{ duration: 0.25 }}
      className="text-center cursor-default"
    >
      <p className="text-3xl font-bold text-cyan-400">∞</p>
      <p className="mt-1 text-sm text-white/70">Future Possibilities</p>
    </motion.div>

  </div>
</div>
</section>
  );
}