"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { NarratorBlock } from "@/components/NarratorBlock";
import Image from "next/image";
import type { Round } from "@/data/content";

type RoundScreenProps = {
  round: Round;
  roundIndex: number;
  totalRounds: number;
  betoScore: number;
  yadiraScore: number;
  onNext: () => void;
};

export function RoundScreen({
  round,
  roundIndex,
  totalRounds,
  betoScore,
  yadiraScore,
  onNext,
}: RoundScreenProps) {
  const [phase, setPhase] = useState<"lines" | "achievement">("lines");
  const { displayed, done: linesDone } = useTypewriter(
    round.lines,
    40,
    phase === "lines"
  );
  const [showScoreUpdate, setShowScoreUpdate] = useState(false);

  // Reset phase when round changes
  useEffect(() => {
    setPhase("lines");
    setShowScoreUpdate(false);
  }, [round]);

  useEffect(() => {
    if (linesDone && phase === "lines") {
      const t = setTimeout(() => setPhase("achievement"), 700);
      return () => clearTimeout(t);
    }
  }, [linesDone, phase]);

  // Show score update after achievement appears
  useEffect(() => {
    if (phase === "achievement") {
      const t = setTimeout(() => setShowScoreUpdate(true), 600);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const isLast = roundIndex === totalRounds - 1;
  const nextLabel = isLast
    ? "Ver expediente →"
    : `Round ${["I", "II", "III", "IV", "V", "VI", "VII"][roundIndex + 1]} →`;

  const winnerText =
    round.winner === "both"
      ? "Empate"
      : round.winner === "beto"
        ? "Punto para Beto"
        : "Punto para Yadira";

  return (
    <div className="relative min-h-dvh w-full flex flex-col items-center justify-center px-6 py-12 overflow-hidden bg-[#080808]">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top left, rgba(139,0,0,0.18) 0%, transparent 55%), radial-gradient(ellipse at bottom right, #0d0d0d 0%, #050505 100%)",
        }}
      />

      {/* Giant roman numeral watermark */}
      <div className="absolute right-[-1rem] bottom-[-2rem] font-mincho font-black text-[clamp(8rem,25vw,14rem)] text-[rgba(139,0,0,0.04)] leading-none pointer-events-none select-none">
        {round.number}
      </div>

      {/* ─── VS Scoreboard ─── */}
      <motion.div
        className="absolute top-4 left-0 right-0 z-20 flex justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 bg-[rgba(10,8,8,0.85)] border border-[#1a1a1a] px-4 py-2 rounded-full backdrop-blur-sm">
          {/* Beto side */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full border border-[#8b0000] bg-[#1a0a0a] overflow-hidden">
              <Image
                src="/avatars/beto.png"
                alt="Beto"
                width={36}
                height={36}
                className="object-cover w-full h-full"
              />
            </div>
            <span
              className={`font-mincho text-cream text-sm font-bold transition-all ${showScoreUpdate && (round.winner === "beto" || round.winner === "both")
                ? "score-pop"
                : ""
                }`}
            >
              {betoScore}
            </span>
            {showScoreUpdate && (round.winner === "beto" || round.winner === "both") && (
              <span className="text-green-500 text-xs font-bold score-float">+1</span>
            )}
          </div>

          <span className="font-mincho text-[#3d0000] text-xs">⚔️</span>

          {/* Yadira side */}
          <div className="flex items-center gap-2">
            {showScoreUpdate && (round.winner === "yadira" || round.winner === "both") && (
              <span className="text-green-500 text-xs font-bold score-float">+1</span>
            )}
            <span
              className={`font-mincho text-cream text-sm font-bold transition-all ${showScoreUpdate && (round.winner === "yadira" || round.winner === "both")
                ? "score-pop"
                : ""
                }`}
            >
              {yadiraScore}
            </span>
            <div className="w-9 h-9 rounded-full border border-[#8b0000] bg-[#1a0a0a] overflow-hidden">
              <Image
                src="/avatars/yadira.png"
                alt="Yadira"
                width={36}
                height={36}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-2xl w-full">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="font-mincho text-[0.6rem] tracking-[0.4em] text-[#8b0000] uppercase">
            ROUND {round.number}
          </span>
          <div className="font-mincho font-black leading-none mt-1 mb-1"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
              color: "rgba(139,0,0,0.35)",
              WebkitTextStroke: "1px rgba(192,57,43,0.4)",
            }}
          >
            {round.year}
          </div>
          <h2 className="font-mincho font-bold text-cream"
            style={{ fontSize: "clamp(1.1rem, 3.5vw, 1.6rem)" }}
          >
            {round.emoji} {round.title}
          </h2>
        </motion.div>

        {/* Narrator */}
        <div className="mb-6">
          <NarratorBlock lines={displayed} />
        </div>

        {/* Achievement */}
        <AnimatePresence>
          {phase === "achievement" && (
            <motion.div
              className="border-l-4 border-[#c0392b] pl-4 py-3 bg-[rgba(139,0,0,0.1)] mb-4 achieve-pop"
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <p className="text-[0.6rem] tracking-[0.2em] text-[#c0392b] uppercase mb-1">
                🏆 Achievement desbloqueado
              </p>
              <p className="font-mincho text-cream italic text-sm md:text-base">
                &ldquo;{round.achievement}&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Winner announcement + Avatar reactions */}
        <AnimatePresence>
          {showScoreUpdate && (
            <motion.div
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Beto reaction */}
              <div className="flex flex-col items-center gap-1">
                <span className="reaction-bubble text-2xl">
                  {round.reactions.beto}
                </span>
                <span className="font-mincho text-[#a08070] text-[0.65rem] tracking-widest">
                  BETO
                </span>
              </div>

              {/* Winner text */}
              <motion.p
                className="font-mincho text-[#c0392b] text-xs tracking-[0.2em] uppercase"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
              >
                {winnerText}
              </motion.p>

              {/* Yadira reaction */}
              <div className="flex flex-col items-center gap-1">
                <span className="reaction-bubble text-2xl" style={{ animationDelay: "0.15s" }}>
                  {round.reactions.yadira}
                </span>
                <span className="font-mincho text-[#a08070] text-[0.65rem] tracking-widest">
                  YADIRA
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <AnimatePresence>
          {phase === "achievement" && (
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <button
                onClick={onNext}
                className="border border-[#c0392b] text-[#c0392b] px-6 py-2 font-mincho text-sm tracking-wider transition-all hover:bg-[#8b0000] hover:text-cream hover:border-[#8b0000] active:scale-95"
              >
                {nextLabel}
              </button>
              <span className="font-mincho text-[#3d0000] text-xs tracking-widest">
                {roundIndex + 1} / {totalRounds}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
