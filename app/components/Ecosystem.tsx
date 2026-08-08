"use client";

import { motion } from "framer-motion";
import {
  Clapperboard,
  PawPrint,
  Car,
  HeartPulse,
  Shirt,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { fadeUp, stagger, useMotionSafe } from "@/lib/motion";

type Status = "live" | "vision" | "exploration";

const platforms: {
  name: string;
  status: Status;
  description: string;
  icon: typeof Clapperboard;
  href?: string;
}[] = [
  {
    name: "AuditionQ",
    status: "live",
    description:
      "Our flagship live product — a modern digital platform connecting talent with opportunities through an AI-powered audition and interview experience.",
    icon: Clapperboard,
    href: "https://www.auditionq.com/",
  },
  {
    name: "FurSure",
    status: "vision",
    description:
      "A vision product in the NexusQ ecosystem. Details will be shared when the product moves beyond exploration.",
    icon: PawPrint,
  },
  {
    name: "RideQ",
    status: "vision",
    description:
      "A vision product focused on future mobility experiences. Not launched — currently in early concept.",
    icon: Car,
  },
  {
    name: "CaringMinds",
    status: "vision",
    description:
      "A vision product exploring digital tools for wellbeing and care. Presented here as direction, not a live service.",
    icon: HeartPulse,
  },
  {
    name: "Onakkodi",
    status: "vision",
    description:
      "A vision product under the NexusQ umbrella. Status: concept / early development — not available yet.",
    icon: Shirt,
  },
  {
    name: "Future AI",
    status: "exploration",
    description:
      "Ongoing exploration into AI capabilities and future platforms. Experimentation only — not a shipped product.",
    icon: Sparkles,
  },
];

const badgeClass: Record<Status, string> = {
  live: "nq-badge nq-badge-live",
  vision: "nq-badge nq-badge-vision",
  exploration: "nq-badge nq-badge-explore",
};

const badgeLabel: Record<Status, string> = {
  live: "Live",
  vision: "Vision",
  exploration: "Exploration",
};

export default function Ecosystem() {
  const animate = useMotionSafe();

  return (
    <section
      id="platforms"
      data-tour="section-platforms"
      className="nq-section bg-nq-surface/40"
    >
      <div className="nq-container">
        <motion.div
          initial={animate ? "hidden" : false}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={animate ? stagger : undefined}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.p variants={fadeUp} className="nq-eyebrow">
            Ecosystem
          </motion.p>

          <motion.h2 variants={fadeUp} className="nq-heading mt-4">
            Platforms across live, vision, and exploration
          </motion.h2>

          <motion.p variants={fadeUp} className="nq-lede mx-auto">
            Only AuditionQ is live today. Every other platform below is clearly
            marked as vision or exploration — never presented as available.
          </motion.p>
        </motion.div>

        <motion.div
          initial={animate ? "hidden" : false}
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={animate ? stagger : undefined}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {platforms.map((p) => {
            const Icon = p.icon;

            const inner = (
              <>
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
                </div>
                <motion.div
  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
  animate={{ x: ["-120%", "120%"] }}
  transition={{
    duration: 2.8,
    repeat: Infinity,
    repeatDelay: 4,
    ease: "easeInOut",
  }}
/>

                <div className="relative flex items-start justify-between gap-3">
                 <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400 transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 group-hover:bg-cyan-500/20">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>

                  <span className={badgeClass[p.status]}>
                    {badgeLabel[p.status]}
                  </span>
                </div>

                <h3 className="relative mt-5 text-xl font-semibold tracking-tight">
                  {p.name}
                </h3>

                <p className="relative mt-3 text-sm leading-relaxed text-nq-muted">
                  {p.description}
                </p>

                {p.href && (
                  <span className="relative mt-5 inline-flex text-sm font-medium text-cyan-400 transition-all duration-300 group-hover:translate-x-1">
                    Visit live product →
                  </span>
                )}
              </>
            );

            if (p.href) {
              return (
                <motion.a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeUp}
                  whileHover={
  animate
    ? {
        y: -14,
        scale: 1.04,
        rotateX: 3,
      }
    : undefined
}
                  className="group relative overflow-hidden nq-surface block h-full rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-7 transition-all duration-500 hover:border-cyan-400/60 hover:shadow-[0_0_90px_rgba(34,211,238,0.35)] focus-visible:outline-none"
                >
                  {inner}
                </motion.a>
              );
            }

            return (
              <motion.article
                key={p.name}
                variants={fadeUp}
                whileHover={
                  animate
                    ? {
                        y: -14,
                        scale: 1.04,
                        rotateX: 3,
                      }
                    : undefined
                }
                className="group relative overflow-hidden nq-surface h-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-7 transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_90px_rgba(34,211,238,0.35)]"
              >
                {inner}
              </motion.article>
            );
          })}
        </motion.div>

        <p className="mt-8 text-center text-xs text-nq-muted">
          Vision and exploration products have no download, store, or "launch
          app" actions until they ship.{" "}
          <Link
            href="/partner"
            className="text-nq-accent underline-offset-2 hover:underline"
          >
            Partner with us
          </Link>{" "}
          to discuss collaboration.
        </p>
      </div>
    </section>
  );
}