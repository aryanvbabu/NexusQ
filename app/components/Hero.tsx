"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black px-6"
    >
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[180px] rounded-full -top-32 -left-20"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[180px] rounded-full bottom-0 right-0"></div>

      <div className="relative z-10 max-w-5xl text-center">

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[0.3em] text-blue-400 text-sm mb-6"
        >
          NEXT GENERATION DIGITAL COMPANY
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-7xl font-extrabold leading-tight"
        >
          Building
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            {" "}World-Class{" "}
          </span>
          Digital Products
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-gray-400 text-xl max-w-3xl mx-auto"
        >
          We design, build and scale AI-powered digital platforms that help
          businesses innovate faster and grow globally.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-5 justify-center"
        >
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
            Start Your Journey
          </button>

          <button className="border border-zinc-700 bg-white/5 backdrop-blur-md px-8 py-4 rounded-xl hover:bg-white/10 transition">
            Explore Products
          </button>
        </motion.div>

      </div>
    </section>
  );
}