"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, stagger, useMotionSafe } from "@/lib/motion";

export default function PartnerCTA() {
  const animate = useMotionSafe();

  return (
    <section
      id="contact"
      data-tour="section-partner"
      className="nq-section relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(56,189,248,0.14), transparent 55%)",
        }}
      />

      <motion.div
        initial={animate ? "hidden" : false}
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={animate ? stagger : undefined}
        className="nq-container relative"
      >
        <div className="nq-surface mx-auto max-w-4xl px-8 py-14 md:px-14 text-center border-nq-accent/20">
          <motion.p variants={fadeUp} className="nq-eyebrow">
            Partner with NexusQ
          </motion.p>
          <motion.h2 variants={fadeUp} className="nq-heading mt-4">
            Let&apos;s build something serious together
          </motion.h2>
          <motion.p variants={fadeUp} className="nq-lede mx-auto">
            Reach out for partnerships, client work, collaboration, or other
            legitimate business inquiries. We read every message.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9">
            <Link href="/partner" className="nq-btn nq-btn-primary">
              Start a conversation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
