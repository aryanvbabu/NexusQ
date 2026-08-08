"use client";

import { motion } from "framer-motion";
import { fadeUp, inView, stagger, useMotionSafe } from "@/lib/motion";

const statements = [
  {
    title: "Live product in market",
    body: "AuditionQ is publicly available — the strongest proof that NexusQ builds real software.",
  },
  {
    title: "Honest product status",
    body: "Vision and exploration platforms are labelled clearly. We do not invent launch claims.",
  },
  {
    title: "Open to partnership",
    body: "We welcome partners, clients, collaborators, and serious business inquiries.",
  },
];

export default function Trust() {
  const animate = useMotionSafe();

  return (
    <section id="trust" className="nq-section">
      <div className="nq-container">
        <motion.div
          initial={false}
          whileInView="show"
          viewport={inView}
          variants={animate ? stagger : undefined}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.p variants={fadeUp} className="nq-eyebrow">
            Trust
          </motion.p>
          <motion.h2 variants={fadeUp} className="nq-heading mt-4">
            Built on what we can stand behind
          </motion.h2>
          <motion.p variants={fadeUp} className="nq-lede mx-auto">
            We do not publish fabricated metrics, testimonials, or customer
            logos. Trust comes from shipped work and clear communication.
          </motion.p>
        </motion.div>

        <motion.div
          initial={false}
          whileInView="show"
          viewport={inView}
          variants={animate ? stagger : undefined}
          className="mt-12 grid gap-5 md:grid-cols-3"
        >
          {statements.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              className="border border-nq-border rounded-2xl p-6 bg-transparent"
            >
              <h3 className="font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm text-nq-muted leading-relaxed">{item.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
