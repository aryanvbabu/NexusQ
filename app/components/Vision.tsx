"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, useMotionSafe } from "@/lib/motion";

const pillars = [
  {
    title: "Parent company",
    body: "NexusQ Global exists to build and steward an ecosystem of focused digital products — not a single app.",
  },
  {
    title: "Ship what is real",
    body: "AuditionQ is live today. Everything else is presented honestly as vision or exploration until it ships.",
  },
  {
    title: "Product-first craft",
    body: "We prioritize clarity, usefulness, and long-term product quality over noise and hype.",
  },
];

export default function Vision() {
  const animate = useMotionSafe();

  return (
    <section id="about" className="nq-section">
      <div className="nq-container">
        <motion.div
          variants={animate ? stagger : undefined}
          initial={animate ? "hidden" : false}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl"
        >
          <motion.p variants={fadeUp} className="nq-eyebrow">
            Why we exist
          </motion.p>
          <motion.h2 variants={fadeUp} className="nq-heading mt-4">
            An ecosystem company, not a one-product story
          </motion.h2>
          <motion.p variants={fadeUp} className="nq-lede">
            NexusQ Global is the parent company behind a growing set of digital
            products. We build platforms that solve real problems — and we keep
            vision products clearly labelled until they are ready.
          </motion.p>
        </motion.div>

        <motion.div
          variants={animate ? stagger : undefined}
          initial={animate ? "hidden" : false}
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {pillars.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              className="nq-surface p-7 transition-colors hover:border-nq-accent/30"
            >
              <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-nq-muted leading-relaxed text-[0.95rem]">
                {item.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
