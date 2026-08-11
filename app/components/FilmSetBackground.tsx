"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// To change the entire background, replace:
// public/film-background.jpg
// Keep the same filename.
// No animation code changes are required.

const FILM_PLATE = {
  backgroundImage: "url(/film-background.jpg)",
  backgroundSize: "cover" as const,
  backgroundPosition: "center" as const,
  backgroundRepeat: "no-repeat" as const,
  willChange: "transform" as const,
};

export default function FilmSetBackground() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Motion budgets — smaller on mobile for performance + readability
  const far = {
    scale: isMobile ? [1.04, 1.07, 1.04] : [1.06, 1.1, 1.06],
    x: isMobile ? ["0%", "-0.6%", "0.4%", "0%"] : ["0%", "-1.2%", "0.8%", "0%"],
    y: isMobile ? ["0%", "0.3%", "-0.2%", "0%"] : ["0%", "0.5%", "-0.4%", "0%"],
    duration: isMobile ? 32 : 26,
  };

  const mid = {
    scale: isMobile ? [1.06, 1.1, 1.06] : [1.08, 1.14, 1.08],
    x: isMobile ? ["0%", "0.9%", "-0.5%", "0%"] : ["0%", "1.8%", "-1.1%", "0%"],
    y: isMobile ? ["0%", "-0.4%", "0.25%", "0%"] : ["0%", "-0.7%", "0.45%", "0%"],
    duration: isMobile ? 26 : 20,
  };

  const near = {
    scale: isMobile ? [1.1, 1.15, 1.1] : [1.12, 1.2, 1.12],
    x: isMobile ? ["0%", "-1.2%", "0.7%", "0%"] : ["0%", "-2.4%", "1.4%", "0%"],
    y: isMobile ? ["0%", "0.5%", "-0.3%", "0%"] : ["0%", "0.9%", "-0.55%", "0%"],
    duration: isMobile ? 22 : 16,
  };

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* ── Far plate (slowest parallax) ─────────────────────────── */}
      <motion.div
        className="absolute inset-[-12%]"
        style={FILM_PLATE}
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: far.scale, x: far.x, y: far.y }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: far.duration, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* ── Mid plate (camera / set drift) ───────────────────────── */}
      <motion.div
        className="absolute inset-[-14%] opacity-90"
        style={{
          ...FILM_PLATE,
          mixBlendMode: "normal",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: mid.scale, x: mid.x, y: mid.y }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: mid.duration, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* ── Near plate — bottom-weighted so gear feels alive ─────── */}
      <motion.div
        className="absolute inset-[-16%]"
        style={{
          ...FILM_PLATE,
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 42%, transparent 72%)",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 42%, transparent 72%)",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: near.scale, x: near.x, y: near.y }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: near.duration, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* ── Warm amber studio light sweep ────────────────────────── */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0"
          style={{
            willChange: "transform, opacity",
            background:
              "radial-gradient(ellipse 55% 45% at 28% 38%, rgba(255, 190, 110, 0.28), transparent 62%)",
            mixBlendMode: "soft-light",
          }}
          animate={{
            opacity: isMobile ? [0.35, 0.55, 0.35] : [0.4, 0.7, 0.4],
            x: isMobile ? ["-3%", "4%", "-3%"] : ["-6%", "8%", "-6%"],
            y: isMobile ? ["0%", "2%", "0%"] : ["0%", "3%", "0%"],
          }}
          transition={{
            duration: isMobile ? 18 : 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* ── Cool cyan accent light (independent path) ────────────── */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0"
          style={{
            willChange: "transform, opacity",
            background:
              "radial-gradient(ellipse 40% 35% at 78% 48%, rgba(80, 200, 230, 0.22), transparent 58%)",
            mixBlendMode: "soft-light",
          }}
          animate={{
            opacity: isMobile ? [0.25, 0.45, 0.25] : [0.3, 0.55, 0.3],
            x: isMobile ? ["2%", "-3%", "2%"] : ["4%", "-6%", "4%"],
            y: isMobile ? ["1%", "-1%", "1%"] : ["2%", "-2%", "2%"],
          }}
          transition={{
            duration: isMobile ? 20 : 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* ── Soft haze / fog drift ────────────────────────────────── */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0"
          style={{
            willChange: "transform, opacity",
            background:
              "linear-gradient(105deg, rgba(255, 236, 210, 0.1), transparent 40%, rgba(120, 190, 220, 0.08) 70%, transparent)",
          }}
          animate={{
            opacity: [0.35, 0.6, 0.35],
            x: isMobile ? ["-2%", "2%", "-2%"] : ["-4%", "4%", "-4%"],
            y: isMobile ? ["0%", "-1%", "0%"] : ["0%", "-2%", "0%"],
          }}
          transition={{
            duration: isMobile ? 24 : 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* ── Extremely subtle film grain ──────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "160px 160px",
        }}
      />

      {/*
        Flat, light readability veil — same strength top→bottom so
        Hero → Vision → rest stay evenly bright (no dark banding).
      */}
      <div className="absolute inset-0 bg-nq-bg/20 dark:bg-nq-bg/25" />
    </div>
  );
}
