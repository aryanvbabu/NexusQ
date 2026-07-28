"use client";

import { motion } from "framer-motion";
import { Lightbulb, Globe, Rocket } from "lucide-react";

export default function Vision() {
  return (
    <section
      id="about"
      className="py-24 px-6 max-w-7xl mx-auto"
    >
      {/* Updated Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-extrabold text-center"
      >
        Our Vision
      </motion.h2>

      {/* Updated Description */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-zinc-400 text-center mt-6 max-w-3xl mx-auto text-lg leading-8"
      >
        Building innovative digital products that empower businesses and
        communities around the world.
      </motion.p>

      {/* Grid Cards */}
      <div className="grid md:grid-cols-3 gap-8 mt-16">

        {/* Card 1: Lightbulb */}
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]">
          <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="w-fit">
            <Lightbulb className="w-10 h-10 mb-4 text-blue-400" />
          </motion.div>
          <h3 className="text-xl font-semibold">Innovation</h3>
          <p className="text-gray-400 mt-3">
            Creating modern digital solutions with cutting-edge technology.
          </p>
        </div>

        {/* Card 2: Globe */}
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]">
          <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="w-fit">
            <Globe className="w-10 h-10 mb-4 text-cyan-400" />
          </motion.div>
          <h3 className="text-xl font-semibold">Global Reach</h3>
          <p className="text-gray-400 mt-3">
            Connecting businesses and people across the world.
          </p>
        </div>

        {/* Card 3: Rocket */}
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]">
          <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="w-fit">
            <Rocket className="w-10 h-10 mb-4 text-purple-400" />
          </motion.div>
          <h3 className="text-xl font-semibold">Growth</h3>
          <p className="text-gray-400 mt-3">
            Helping startups and enterprises scale with confidence.
          </p>
        </div>

      </div>
    </section>
  );
}