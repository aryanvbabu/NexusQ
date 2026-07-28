"use client";

import { motion } from "framer-motion";
import { Video, Users, ClipboardCheck } from "lucide-react";

export default function Ecosystem() {
  return (
    <section
      id="platforms"
      className="py-24 px-6 max-w-7xl mx-auto"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-extrabold text-center"
      >
        Our Ecosystem
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-zinc-400 text-center mt-6 max-w-3xl mx-auto text-lg leading-8"
      >
        A suite of AI-powered platforms designed to simplify hiring,
        assessments, and talent management.
      </motion.p>

      {/* Grid Cards */}
      <div className="grid md:grid-cols-3 gap-8 mt-16">

        {/* Card 1 */}
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]">
          <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="w-fit">
            <Video className="w-10 h-10 mb-4 text-cyan-400" />
          </motion.div>

          <h3 className="text-xl font-semibold">AuditionQ</h3>

          <p className="text-gray-400 mt-3">
            Conduct AI-powered video interviews with intelligent candidate
            evaluation.
          </p>
        </div>

        {/* Card 2 */}
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]">
          <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="w-fit">
            <Users className="w-10 h-10 mb-4 text-blue-400" />
          </motion.div>

          <h3 className="text-xl font-semibold">InterviewQ</h3>

          <p className="text-gray-400 mt-3">
            Manage live interviews with collaboration and AI-powered insights.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]">
          <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="w-fit">
            <ClipboardCheck className="w-10 h-10 mb-4 text-purple-400" />
          </motion.div>

          <h3 className="text-xl font-semibold">AssessQ</h3>

          <p className="text-gray-400 mt-3">
            Create skill assessments with automated scoring and detailed
            performance analytics.
          </p>
        </div>

      </div>
    </section>
  );
}