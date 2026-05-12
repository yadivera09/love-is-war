"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { NarratorBlock } from "@/components/NarratorBlock";
import { Petals } from "@/components/Petals";
import { HeartRain } from "@/components/HeartRain";
import { FINAL_NARRATOR } from "@/data/content";

type FinalScreenProps = {
  onCredits: () => void;
};

function useDayCounter(targetDays: number, start: boolean) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    const duration = 2500; // ms
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * targetDays));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [start, targetDays]);

  return count;
}

export function FinalScreen({ onCredits }: FinalScreenProps) {
  const { displayed, done } = useTypewriter(FINAL_NARRATOR, 45);
  const [showMessage, setShowMessage] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Calculate days together (from May 12, 2021)
  const startDate = new Date(2021, 4, 12); // May 12, 2021
  const today = new Date();
  const totalDays = Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const dayCount = useDayCounter(totalDays, showCelebration);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setShowMessage(true), 900);
      return () => clearTimeout(t);
    }
  }, [done]);

  useEffect(() => {
    if (showMessage) {
      const t = setTimeout(() => setShowCelebration(true), 3500);
      return () => clearTimeout(t);
    }
  }, [showMessage]);

  return (
    <div className="relative min-h-dvh w-full flex flex-col items-center justify-center px-6 py-12 overflow-hidden bg-[#080808]">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(26,0,0,0.9) 0%, #050505 70%)",
        }}
      />

      <Petals count={20} bright />

      {/* Heart rain after celebration */}
      {showCelebration && <HeartRain count={25} />}

      <div className="relative z-10 max-w-xl w-full">
        {/* Round label */}
        <motion.p
          className="font-mincho text-[0.6rem] tracking-[0.5em] text-[#8b0000] uppercase mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ROUND FINAL
        </motion.p>

        {/* Narrator */}
        <div className="mb-8">
          <NarratorBlock lines={displayed} size="md" />
        </div>

        {/* Personal message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Divider */}
              <div className="w-14 h-px bg-[#8b0000] mb-6" />

              <div className="space-y-4">
                <motion.p
                  className="font-mincho text-parchment leading-relaxed text-base md:text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Beto, has sido una de las piezas más importantes de mi vida. Mi persona favorita, mi compañero y mi confidente.
                </motion.p>

                <motion.p
                  className="font-mincho text-parchment leading-relaxed text-base md:text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Cinco años contigo no han sido perfectos, pero han sido{" "}
                  <em className="text-cream not-italic font-bold">nuestros</em>,
                  lo cual lo hace mucho mejor.
                </motion.p>

                <motion.p
                  className="font-mincho text-parchment leading-relaxed text-base md:text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  No sé quién gana en esta batalla.
                </motion.p>

                <motion.p
                  className="font-mincho text-cream leading-relaxed text-base md:text-lg font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  Pero sé que quiero seguir perdiéndola contigo.
                </motion.p>
              </div>

              {/* Day counter */}
              <AnimatePresence>
                {showCelebration && (
                  <motion.div
                    className="mt-8 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                  >
                    <p className="font-mincho text-[#5a3a3a] text-xs tracking-[0.3em] uppercase mb-1">
                      Juntos por
                    </p>
                    <p className="font-mincho text-cream text-4xl md:text-5xl font-bold counter-glow">
                      {dayCount.toLocaleString()}
                    </p>
                    <p className="font-mincho text-[#8b0000] text-sm tracking-[0.2em] mt-1">
                      días
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hearts */}
              <motion.div
                className="mt-8 font-mincho text-[#8b0000] tracking-[0.3em] text-sm text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.8 }}
              >
                ♥ 5 años ♥
              </motion.div>

              {/* Avatars with merge animation */}
              <motion.div
                className="mt-8 flex justify-center gap-8 items-end"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.2 }}
              >
                {/* Avatar Yadira */}
                <div className={`flex flex-col items-center gap-2 ${showCelebration ? "avatar-merge-left" : ""}`}>
                  <div className="w-20 h-20 rounded-full border-2 border-[#8b0000] bg-[#1a0a0a] overflow-hidden">
                    <Image
                      src="/avatars/yadira.png"
                      alt="Yadira"
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="font-mincho text-[#c0392b] text-xs tracking-widest">
                    YADIRA
                  </span>
                </div>

                <div className="font-mincho text-[#3d0000] text-2xl mb-8">
                  {showCelebration ? "❤️" : "⚔️"}
                </div>

                {/* Avatar Beto */}
                <div className={`flex flex-col items-center gap-2 ${showCelebration ? "avatar-merge-right" : ""}`}>
                  <div className="w-20 h-20 rounded-full border-2 border-[#8b0000] bg-[#1a0a0a] overflow-hidden">
                    <Image
                      src="/avatars/beto.png"
                      alt="Beto"
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="font-mincho text-[#c0392b] text-xs tracking-widest">
                    BETO
                  </span>
                </div>
              </motion.div>

              {/* Credits button */}
              <AnimatePresence>
                {showCelebration && (
                  <motion.div
                    className="mt-10 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  >
                    <button
                      onClick={onCredits}
                      className="border border-[#3d0000] text-[#5a3a3a] px-6 py-2 font-mincho text-xs tracking-widest transition-all hover:border-[#8b0000] hover:text-[#c0392b] active:scale-95"
                    >
                      Ver créditos 🎬
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}