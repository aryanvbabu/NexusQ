"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// To change the entire background, replace:
// public/cinematic-studio.jpg
// Keep the same filename.
// No animation code changes are required.

/**
 * TEST ONLY — photoreal cinematic studio background.
 * Does not replace AuroraBackground, FilmSetBackground, or ActingSceneBackground.
 */

const DUST = [
  { left: "12%", delay: 0, duration: 18, size: 2 },
  { left: "28%", delay: 3, duration: 22, size: 1.5 },
  { left: "41%", delay: 7, duration: 16, size: 2.5 },
  { left: "55%", delay: 1.5, duration: 20, size: 1.5 },
  { left: "67%", delay: 5, duration: 24, size: 2 },
  { left: "78%", delay: 9, duration: 17, size: 1.5 },
  { left: "88%", delay: 4, duration: 21, size: 2 },
  { left: "18%", delay: 11, duration: 19, size: 1 },
  { left: "49%", delay: 6, duration: 23, size: 2 },
  { left: "73%", delay: 2, duration: 15, size: 1.5 },
];

export default function CinematicStudioBackground() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const zoom = isMobile ? 1.05 : 1.08;
  const xShift = isMobile ? "1.2%" : "2.2%";
  const yShift = isMobile ? "0.4%" : "0.8%";
  const duration = isMobile ? 32 : 26;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Photoreal studio plate — swap public/cinematic-studio.jpg to change visuals */}
      <motion.div
        className="absolute inset-[-10%]"
        style={{
          backgroundImage: "url(/cinematic-studio.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          willChange: "transform",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1.02, zoom, 1.02],
                x: ["0%", `-${xShift}`, xShift, "0%"],
                y: ["0%", `-${yShift}`, yShift, "0%"],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Volumetric warm light rays */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0"
          style={{
            willChange: "transform, opacity",
            background:
              "linear-gradient(118deg, transparent 28%, rgba(255, 196, 120, 0.14) 42%, transparent 54%)",
            mixBlendMode: "screen",
          }}
          animate={{
            opacity: [0.25, 0.55, 0.25],
            x: isMobile ? ["-4%", "4%", "-4%"] : ["-8%", "8%", "-8%"],
          }}
          transition={{
            duration: isMobile ? 16 : 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Cool rim-light pulse */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0"
          style={{
            willChange: "opacity",
            background:
              "radial-gradient(ellipse 45% 40% at 78% 42%, rgba(90, 190, 230, 0.16), transparent 60%)",
            mixBlendMode: "soft-light",
          }}
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{
            duration: isMobile ? 14 : 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Atmospheric haze drift */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0"
          style={{
            willChange: "transform, opacity",
            background:
              "linear-gradient(180deg, rgba(255, 236, 210, 0.08), transparent 38%, rgba(12, 18, 28, 0.12))",
          }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            y: isMobile ? ["0%", "-1.5%", "0%"] : ["0%", "-3%", "0%"],
          }}
          transition={{
            duration: isMobile ? 22 : 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Floating dust motes */}
      {!prefersReducedMotion &&
        !isMobile &&
        DUST.map((speck, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/70"
            style={{
              left: speck.left,
              bottom: "-4%",
              width: speck.size,
              height: speck.size,
              filter: "blur(0.4px)",
            }}
            animate={{
              y: ["0vh", "-110vh"],
              x: [0, 12, -8, 6],
              opacity: [0, 0.55, 0.55, 0],
            }}
            transition={{
              duration: speck.duration,
              delay: speck.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

      {/* Subtle film grain */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />

      {/* Even theme-aware veil so NexusQ copy stays readable */}
      <div className="absolute inset-0 bg-nq-bg/28 dark:bg-nq-bg/34" />
    </div>
  );
}
