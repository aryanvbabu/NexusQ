"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

export default function Innovation() {
  const features = [
    "AI-powered hiring workflows",
    "Real-time analytics & insights",
    "Enterprise-grade security",
    "Built for global scalability",
  ];

  return (
    <section
      id="innovation"
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-10 right-20 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan-400 font-semibold uppercase tracking-widest mb-3">
            Innovation
          </p>

          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Innovation <br />
            at the Core
          </h2>

          <p className="mt-6 text-gray-400 text-lg leading-8">
            We build AI-powered platforms that help organizations hire
            faster, smarter, and with greater confidence. Every product
            in the NexusQ ecosystem is designed for speed, security,
            and scalability.
          </p>

          <div className="mt-10 space-y-5">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4"
              >
                <CheckCircle2 className="text-cyan-400 w-6 h-6" />
                <span className="text-gray-300 text-lg">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          <button className="mt-10 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 px-7 py-3 font-semibold transition hover:scale-105">
            Learn More
          </button>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl p-10 shadow-[0_0_60px_rgba(59,130,246,0.18)]">

            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-8 h-8 text-cyan-400" />
              <h3 className="text-2xl font-bold">
                AI Innovation
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-6">

              <div className="rounded-2xl bg-white/5 p-6 border border-white/10">
                <p className="text-3xl font-bold text-cyan-400">
                  10K+
                </p>
                <p className="text-gray-400 mt-2">
                  Interviews
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-6 border border-white/10">
                <p className="text-3xl font-bold text-blue-400">
                  99.9%
                </p>
                <p className="text-gray-400 mt-2">
                  Uptime
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-6 border border-white/10">
                <p className="text-3xl font-bold text-purple-400">
                  24/7
                </p>
                <p className="text-gray-400 mt-2">
                  AI Support
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-6 border border-white/10">
                <p className="text-3xl font-bold text-cyan-400">
                  50+
                </p>
                <p className="text-gray-400 mt-2">
                  Enterprise Clients
                </p>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}