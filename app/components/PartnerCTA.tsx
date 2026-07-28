"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function PartnerCTA() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-20 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/15 via-blue-500/20 to-purple-500/15 backdrop-blur-xl p-14 text-center shadow-[0_0_70px_rgba(59,130,246,0.15)]"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold">
          Ready to Transform
          <br />
          Your Hiring?
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-zinc-300 leading-8">
          Partner with NexusQ and experience AI-powered hiring that is
          faster, smarter, and built for the future.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
          <button className="rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 px-8 py-4 font-semibold transition hover:scale-105">
            Start Your Journey
          </button>

          <button className="rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-semibold transition hover:bg-white/10 flex items-center justify-center gap-2">
            Book a Demo
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}