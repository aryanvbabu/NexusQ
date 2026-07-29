"use client";

import { motion } from "framer-motion";

export default function AuditionQ() {
  return (
    <section
      id="auditionq"
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Premium Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute top-1/2 left-10 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-10 border border-blue-400/20 shadow-[0_0_60px_rgba(59,130,246,0.18)] transition-all duration-500 hover:shadow-[0_0_80px_rgba(59,130,246,0.28)]"
      >
        <h2 className="text-4xl font-bold">
          AuditionQ
        </h2>

        <p className="mt-6 text-gray-400 text-lg">
          Our flagship platform connects talent with opportunities through a
          modern, AI-powered digital experience.
        </p>

       <a
  href="https://www.auditionq.com/"
  target="_blank"
  rel="noopener noreferrer"
>
  <button className="mt-8 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300">
    Explore Platform
  </button>
</a>
      </motion.div>
    </section>
  );
}