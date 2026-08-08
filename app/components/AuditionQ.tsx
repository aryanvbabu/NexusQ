"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, inView, stagger, useMotionSafe } from "@/lib/motion";

export default function AuditionQ() {
  const animate = useMotionSafe();

  return (
    <section
      id="auditionq"
      data-tour="section-auditionq"
      className="nq-section relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 80% 40%, rgba(56,189,248,0.12), transparent 60%)",
        }}
      />

      <div className="nq-container relative">
        <motion.div
          initial={false}
          whileInView="show"
          viewport={inView}
          variants={animate ? stagger : undefined}
          className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center"
        >
          <div>
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3"
              data-tour="aq-live-badge"
            >
              <span className="nq-badge nq-badge-live">Live</span>
              <span className="text-sm text-nq-muted">Flagship product</span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="nq-heading mt-5">
              AuditionQ is live — proof that NexusQ ships real products
            </motion.h2>

            <motion.p variants={fadeUp} className="nq-lede">
              AuditionQ is NexusQ Global&apos;s flagship platform: a modern,
              AI-powered digital experience that connects talent with
              opportunities. It is available today at auditionq.com.
            </motion.p>

            <motion.ul
              variants={fadeUp}
              className="mt-8 space-y-3 text-nq-muted text-[0.95rem]"
            >
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-nq-live shrink-0" />
                Live product under the NexusQ Global parent brand
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-nq-live shrink-0" />
                Built for real users — not a concept mock or waitlist page
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-nq-live shrink-0" />
                Distinct product identity; NexusQ remains the parent company
              </li>
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-9" data-tour="aq-cta">
              <a
                href="https://www.auditionq.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="nq-btn nq-btn-primary"
              >
                Visit AuditionQ
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            data-tour="aq-proof"
            className="nq-surface relative overflow-hidden p-8 min-h-[280px] flex flex-col justify-between"
          >
            <div>
              <p className="nq-eyebrow">Product proof</p>
              <p className="mt-4 text-2xl font-semibold tracking-tight">
                NexusQ already builds and operates live software.
              </p>
              <p className="mt-4 text-nq-muted leading-relaxed">
                AuditionQ is the clearest signal of that: a shipped product with
                a public presence, while the rest of the ecosystem remains
                honest about vision and exploration status.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-nq-border pt-5">
              <div>
                <p className="text-sm text-nq-muted">Status</p>
                <p className="font-medium text-nq-live">Live on the web</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-nq-muted">Destination</p>
                <p className="font-medium">auditionq.com</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
