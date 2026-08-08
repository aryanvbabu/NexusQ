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
    <section
      id="about"
      className="relative nq-section overflow-hidden"
    >
      {/* Smooth Background Transition */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(8,20,32,0.18) 0%,
              rgba(5,7,11,0.92) 30%,
              rgba(5,7,11,1) 100%
            ),
            radial-gradient(
              ellipse at top center,
              rgba(56,189,248,0.08),
              transparent 70%
            )
          `,
        }}
      />

      <div className="nq-container">
        <div
  aria-hidden
  className="absolute left-1/2 top-20 -translate-x-1/2 h-64 w-[700px] rounded-full blur-[120px] opacity-40"
  style={{
    background:
      "radial-gradient(circle, rgba(34,211,238,0.18) 0%, transparent 70%)",
  }}
/>
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

        <motion.h2
  variants={fadeUp}
  className="nq-heading mt-4"
  whileHover={{
    scale: 1.01,
    textShadow: "0 0 25px rgba(34,211,238,0.35)",
  }}
>
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
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {pillars.map((item, index) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              transition={{
  delay: index * 0.15,
  duration: 0.5,
}}
              whileHover={
                animate
                  ? {
                      y: -12,
                      scale: 1.03,
                      rotateX: 3,
                    }
                  : undefined
              }
              className="group relative overflow-hidden nq-surface rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-7 transition-all duration-500 hover:border-cyan-400/40 hover:shadow-[0_0_50px_rgba(34,211,238,0.20)]"
            >
              {/* Glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
              </div>
              <motion.div
  aria-hidden
  className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
  animate={{
    x: ["-120%", "220%"],
  }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "linear",
    delay: index * 0.6,
  }}
/>

              {/* Animated Light Sweep */}
              <motion.div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ["-120%", "120%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut",
                }}
              />

              <h3 className="relative text-xl font-semibold tracking-tight text-nq-white">
                {item.title}
              </h3>

              <p className="relative mt-4 text-base leading-7 text-nq-muted">
                {item.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}