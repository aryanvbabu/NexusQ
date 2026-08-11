"use client";

import { motion } from "framer-motion";
import { Brain, Layers, FlaskConical } from "lucide-react";
import { fadeUp, inView, stagger, useMotionSafe } from "@/lib/motion";

const themes = [
  {
    icon: Brain,
    title: "AI capabilities",
    body: "Exploring how applied AI can strengthen future NexusQ products — carefully, and without claiming finished products.",
  },
  {
    icon: Layers,
    title: "New platforms",
    body: "Evaluating adjacent digital platforms that could join the ecosystem once they are ready to ship.",
  },
  {
    icon: FlaskConical,
    title: "Product experimentation",
    body: "Early research and prototyping. Experiments may become products later — or may not. We label them as exploration.",
  },
];

export default function Innovation() {
  const animate = useMotionSafe();

  return (
    <section id="innovation" className="nq-section">
      <div className="nq-container">
        <motion.div
          initial={false}
          whileInView="show"
          viewport={inView}
          variants={animate ? stagger : undefined}
          className="max-w-3xl"
        >
          <motion.p variants={fadeUp} className="nq-eyebrow">
            What comes next
          </motion.p>
          <motion.h2 variants={fadeUp} className="nq-heading mt-4">
            Exploring the future of the ecosystem
          </motion.h2>
          <motion.p variants={fadeUp} className="nq-lede">
            NexusQ is developing and exploring new ideas beyond AuditionQ —
            including AI, emerging technology, and future platforms. Nothing in
            this section is launched.
          </motion.p>
        </motion.div>

        <motion.div
          initial={false}
          whileInView="show"
          viewport={inView}
          variants={animate ? stagger : undefined}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {themes.map((theme) => {
            const Icon = theme.icon;
            return (
              <motion.article
                key={theme.title}
                variants={fadeUp}
                className="nq-card p-7"
              >
                <div className="rounded-xl bg-nq-accent-soft p-2.5 w-fit text-nq-accent">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{theme.title}</h3>
                <p className="mt-3 text-sm text-nq-muted leading-relaxed">
                  {theme.body}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
