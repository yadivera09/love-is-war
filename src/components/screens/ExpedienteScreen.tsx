"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EVIDENCE } from "@/data/content";

type ExpedienteScreenProps = {
  onNext: () => void;
};

export function ExpedienteScreen({ onNext }: ExpedienteScreenProps) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const reveal = (id: string) => {
    setRevealed((prev) => new Set([...prev, id]));

    // Stop previous audio if it's still playing
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }

    // Play reveal audio
    const audio = new Audio(`/audio/exp-${id}.mp3`);
    currentAudioRef.current = audio;
    audio.play().catch((err) => console.log("Audio playback blocked or failed:", err));
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
      }
    };
  }, []);

  const allRevealed = revealed.size === EVIDENCE.length;

  return (
    <div className="relative min-h-dvh w-full flex flex-col items-center px-6 py-12 overflow-hidden bg-[#0a0808]">
      {/* Lined paper texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(139,0,0,0.03) 28px, rgba(139,0,0,0.03) 29px)",
        }}
      />

      <div className="relative z-10 max-w-2xl w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className="inline-block border-2 border-[rgba(139,0,0,0.5)] text-[rgba(139,0,0,0.7)] font-mincho text-[0.7rem] tracking-[0.4em] px-4 py-1 mb-4"
            style={{ transform: "rotate(-2deg)" }}
          >
            CONFIDENCIAL
          </div>
          <h2 className="font-mincho text-cream font-bold"
            style={{ fontSize: "clamp(1.3rem, 4vw, 2rem)" }}
          >
            📁 Expediente Clasificado
          </h2>
          <p className="text-[#7a6a5a] text-xs mt-2 font-klee">
            Toca cada ficha para revelar — o como diría alguien: &ldquo;relevar&rdquo;
          </p>
          <p className="text-[#4a3a2a] text-xs mt-1 font-klee">
            {revealed.size} / {EVIDENCE.length} archivos descubiertos
          </p>
        </motion.div>

        {/* Evidence grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {EVIDENCE.map((e, i) => {
            const isRevealed = revealed.has(e.id);
            return (
              <motion.div
                key={e.id}
                className={`
                  bg-[#110e0e] border p-3 min-h-[110px] flex flex-col gap-1 transition-all duration-200
                  ${isRevealed
                    ? "border-[#3d0f0f] cursor-default"
                    : "border-[#2a1a1a] cursor-pointer hover:border-[#8b0000] hover:-translate-y-0.5"
                  }
                `}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => !isRevealed && reveal(e.id)}
              >
                <span className="text-[#5a4a3a] text-[0.6rem] tracking-widest font-klee">
                  #{e.id}
                </span>

                {isRevealed ? (
                  <motion.div
                    className="flex flex-col gap-1 flex-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-mincho text-cream text-sm font-bold leading-snug">
                      {e.name}
                    </p>
                    <p className="font-klee text-[#9a8a7a] text-xs leading-relaxed flex-1">
                      {e.desc}
                    </p>
                    <span className="text-[#8b0000] text-[0.6rem] mt-auto font-klee">
                      {e.tag}
                    </span>
                  </motion.div>
                ) : (
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="text-[#2a1a1a] text-sm leading-relaxed font-klee">
                      ▓▓▓▓▓▓▓<br />▓▓▓▓
                    </div>
                    <span className="text-[0.55rem] text-[#4a2a2a] tracking-[0.2em] font-klee uppercase">
                      Toca para revelar
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA — only when all revealed */}
        <AnimatePresence>
          {allRevealed && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="font-mincho text-[#8b0000] text-xs tracking-widest mb-4 uppercase">
                Expediente completo
              </p>
              <button
                onClick={onNext}
                className="border border-[#c0392b] text-[#c0392b] px-8 py-2.5 font-mincho text-sm tracking-wider transition-all hover:bg-[#8b0000] hover:text-cream hover:border-[#8b0000] active:scale-95"
              >
                Round Final →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
