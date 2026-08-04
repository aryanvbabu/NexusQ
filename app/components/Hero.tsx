"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMotionSafe, easeOut } from "@/lib/motion";
import GuideMeButton from "@/app/components/onboarding/GuideMeButton";

export default function Hero() {
  const animate = useMotionSafe();

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-hidden px-6 pt-28 pb-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(56,189,248,0.18), transparent 55%), radial-gradient(ellipse 40% 40% at 90% 60%, rgba(14,165,233,0.08), transparent 50%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="relative z-10 nq-container text-center">
        <motion.p
          initial={animate ? { opacity: 0, y: -12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easeOut }}
          className="nq-eyebrow mb-6"
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
          <span className="text-nq-accent">product ecosystem</span>
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
          <Link href="/partner" className="nq-btn nq-btn-primary">
            Partner With Us
          </Link>
          <GuideMeButton className="nq-btn nq-btn-secondary inline-flex items-center justify-center gap-1.5" />
          <a href="#platforms" className="nq-btn nq-btn-secondary">
            Explore Platforms
          </a>
        </motion.div>
      </div>
    </section>
  );
}
