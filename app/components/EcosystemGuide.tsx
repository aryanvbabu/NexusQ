"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    title: "Welcome to NexusQ Global",
    tagline: "Ecosystem Overview",
    description:
      "NexusQ Global is a product-first parent company that designs and ships focused digital platforms.",
    highlight: "Start by exploring our flagship live platform or upcoming vision products.",
  },
  {
    title: "Explore Platforms",
    tagline: "Ecosystem",
    description:
      "Check out our live platforms and upcoming vision products across various sectors.",
    highlight: "Click 'Explore Platforms' to jump down to our product suite.",
  },
  {
    title: "Partner & Collaborate",
    tagline: "Get in Touch",
    description:
      "We build serious software and welcome business inquiries, client partnerships, and strategic collaborations.",
    highlight: "Click 'Partner With Us' in the main section to connect with our team.",
  },
];

export function EcosystemGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleClose = () => {
    setIsOpen(false);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-4 z-50 flex items-center gap-2 rounded-full bg-blue-600 px-3 py-2.5 text-xs font-medium text-white shadow-lg transition-all hover:bg-blue-700 active:scale-95 sm:bottom-6 sm:right-6 sm:px-4 sm:py-3 sm:text-sm"
      >
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        Website Tour
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/95 p-6 text-white shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400 border border-blue-500/20">
                  {steps[currentStep].tagline}
                </span>
                <span className="text-xs text-zinc-400">
                  {currentStep + 1} of {steps.length}
                </span>
              </div>

              <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                {steps[currentStep].title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-300 mb-4">
                {steps[currentStep].description}
              </p>

              <div className="rounded-xl bg-zinc-800/80 p-3 border border-zinc-700/50 mb-6">
                <p className="text-xs text-blue-300">
                  💡 <strong>Tip:</strong> {steps[currentStep].highlight}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                <button
                  onClick={handleClose}
                  className="text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  Close
                </button>

                <div className="flex items-center gap-2">
                  {currentStep > 0 && (
                    <button
                      onClick={prevStep}
                      className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-700 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={nextStep}
                    className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-md"
                  >
                    {currentStep === steps.length - 1 ? "Finish" : "Next →"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}