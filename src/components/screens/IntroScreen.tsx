"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { Petals } from "@/components/Petals";
import { INTRO_LINES } from "@/data/content";

type IntroScreenProps = {
  onDone: () => void;
};

export function IntroScreen({ onDone }: IntroScreenProps) {
  const { displayed, done } = useTypewriter(INTRO_LINES, 45);

  return (
    <div className="relative min-h-dvh w-full flex flex-col items-center justify-center px-6 py-12 overflow-hidden bg-[#0d0d0d]">
      {/* Background radials */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(61,0,0,0.7) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(26,0,0,0.5) 0%, transparent 50%)",
        }}
      />

      <Petals count={14} />

      <div className="relative z-10 max-w-xl w-full text-center">
        {/* Badge */}
        <motion.div
          className="inline-block border border-[#8b0000] px-5 py-1 mb-12 font-mincho text-[0.65rem] tracking-[0.35em] text-[#c0392b] uppercase"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          BETO vs YADIRA
        </motion.div>

        {/* Narrator lines */}
        <div className="min-h-[200px] mb-10 space-y-2">
          {displayed.map((line, i) => (
            <motion.p
              key={i}
              className="font-mincho text-cream leading-relaxed text-base md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* CTA */}
        <AnimatePresence>
          {done && (
            <motion.button
              className="bg-[#8b0000] text-cream px-10 py-3 font-mincho text-sm tracking-widest uppercase transition-colors hover:bg-[#c0392b] active:scale-95"
              style={{
                clipPath:
                  "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={onDone}
            >
              ⚔️ Comenzar la batalla
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom year */}
      <motion.div
        className="absolute bottom-6 left-0 right-0 text-center font-mincho text-[0.6rem] tracking-[0.4em] text-[#3d0000] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        2019 — 2026
      </motion.div>
    </div>
  );
}
