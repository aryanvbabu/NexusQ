"use client";

import { motion } from "framer-motion";
import { Clapperboard, PawPrint, Car, HeartPulse, Shirt, Sparkles } from "lucide-react";
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
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {platforms.map((p) => {
            const Icon = p.icon;
            const inner = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div className="rounded-xl bg-nq-accent-soft p-2.5 text-nq-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <span className={badgeClass[p.status]}>{badgeLabel[p.status]}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-3 text-nq-muted text-sm leading-relaxed">{p.description}</p>
                {p.href && (
                  <span className="mt-5 inline-flex text-sm font-medium text-nq-accent">
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
                  whileHover={animate ? { y: -4 } : undefined}
                  className="nq-surface block h-full p-7 transition-colors border-nq-live/30 hover:border-nq-live/50 focus-visible:outline-none"
                >
                  {inner}
                </motion.a>
              );
            }

            return (
              <motion.article
                key={p.name}
                variants={fadeUp}
                whileHover={animate ? { y: -4 } : undefined}
                className="nq-surface h-full p-7 transition-colors hover:border-white/20"
              >
                {inner}
              </motion.article>
            );
          })}
        </motion.div>

        <p className="mt-8 text-center text-xs text-nq-muted">
          Vision and exploration products have no download, store, or “launch app”
          actions until they ship.{" "}
          <Link href="/partner" className="text-nq-accent underline-offset-2 hover:underline">
            Partner with us
          </Link>{" "}
          to discuss collaboration.
        </p>
      </div>
    </section>
  );
}
