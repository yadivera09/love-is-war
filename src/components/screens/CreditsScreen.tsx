"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CREDITS } from "@/data/content";

type CreditsScreenProps = {
  onRestart?: () => void;
};

export function CreditsScreen({ onRestart }: CreditsScreenProps) {
  const [showRestart, setShowRestart] = useState(false);

  useEffect(() => {
    // Show restart button after credits finish scrolling
    const timer = setTimeout(() => setShowRestart(true), 40000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-dvh w-full flex flex-col items-center justify-center overflow-hidden bg-[#040404]">
      {/* Star-like background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10,5,5,1) 0%, #020202 100%)",
        }}
      />

      {/* Scrolling credits */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="credits-scroll absolute inset-x-0 top-0 flex flex-col items-center pt-[10vh] pb-[60vh] gap-12 px-6">
          {/* Title */}
          <div className="text-center mb-8">
            <p className="font-mincho text-[#8b0000] text-[0.6rem] tracking-[0.5em] uppercase mb-2">
              CRÉDITOS
            </p>
            <h2
              className="font-mincho text-cream font-bold"
              style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}
            >
              BETO vs YADIRA
            </h2>
            <p className="font-mincho text-[#a08070] text-sm mt-2">
              5 años de batalla
            </p>
          </div>

          {/* Credit entries */}
          {CREDITS.map((credit, i) => (
            <div key={i} className="text-center max-w-sm">
              <p className="font-klee text-[#a08070] text-[0.7rem] tracking-[0.3em] uppercase mb-1">
                {credit.role}
              </p>
              <p className="font-mincho text-cream text-lg">
                {credit.name}
              </p>
            </div>
          ))}

          {/* Fin */}
          <div className="text-center mt-12">
            <p className="font-mincho text-[#8b0000] text-3xl tracking-[0.3em]">
              FIN
            </p>
            <p className="font-klee text-[#8b0000] text-xs mt-4 tracking-widest">
              ...o apenas el comienzo del siguiente capítulo.
            </p>
          </div>
        </div>
      </div>

      {/* Restart button (appears after credits) */}
      {showRestart && (
        <motion.div
          className="absolute bottom-12 z-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={onRestart}
            className="border border-[#3d0000] text-[#5a3a3a] px-6 py-2 font-mincho text-xs tracking-widest transition-all hover:border-[#8b0000] hover:text-[#c0392b] active:scale-95"
          >
            ↺ Volver al inicio
          </button>
        </motion.div>
      )}
    </div>
  );
}
