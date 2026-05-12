"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IntroScreen } from "@/components/screens/IntroScreen";
import { RoundScreen } from "@/components/screens/RoundScreen";
import { ExpedienteScreen } from "@/components/screens/ExpedienteScreen";
import { QuizScreen } from "@/components/screens/QuizScreen";
import { FinalScreen } from "@/components/screens/FinalScreen";
import { CreditsScreen } from "@/components/screens/CreditsScreen";
import { ROUNDS } from "@/data/content";
import { useScreenAudio } from "@/hooks/useScreenAudio";

type Screen = "splash" | "intro" | "round" | "expediente" | "quiz" | "final" | "credits";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [roundIndex, setRoundIndex] = useState(0);
  const [betoScore, setBetoScore] = useState(0);
  const [yadiraScore, setYadiraScore] = useState(0);

  // Play background audio per screen
  useScreenAudio(screen, roundIndex);

  // Calculate cumulative scores up to (and including) current round
  const getScores = (upToIndex: number) => {
    let b = 0,
      y = 0;
    for (let i = 0; i <= upToIndex; i++) {
      const w = ROUNDS[i].winner;
      if (w === "beto") b++;
      else if (w === "yadira") y++;
      else {
        b++;
        y++;
      }
    }
    return { beto: b, yadira: y };
  };

  const goNext = () => {
    if (screen === "splash") {
      setScreen("intro");
    } else if (screen === "intro") {
      setScreen("round");
      setRoundIndex(0);
      const s = getScores(0);
      setBetoScore(s.beto);
      setYadiraScore(s.yadira);
    } else if (screen === "round") {
      if (roundIndex < ROUNDS.length - 1) {
        const nextIdx = roundIndex + 1;
        setRoundIndex(nextIdx);
        const s = getScores(nextIdx);
        setBetoScore(s.beto);
        setYadiraScore(s.yadira);
      } else {
        setScreen("expediente");
      }
    } else if (screen === "expediente") {
      setScreen("quiz");
    } else if (screen === "quiz") {
      setScreen("final");
    } else if (screen === "final") {
      setScreen("credits");
    }
  };

  const handleRestart = () => {
    setScreen("splash");
    setRoundIndex(0);
    setBetoScore(0);
    setYadiraScore(0);
  };

  const slideVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <main className="min-h-dvh w-full bg-[#080808]">
      <AnimatePresence mode="wait">
        {screen === "splash" && (
          <motion.div
            key="splash"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <div
              className="min-h-dvh w-full flex flex-col items-center justify-center cursor-pointer select-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(26,0,0,0.6) 0%, #080808 70%)",
              }}
              onClick={goNext}
            >
              <motion.p
                className="font-mincho text-[#8b0000] text-[0.6rem] tracking-[0.5em] uppercase mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                BETO vs YADIRA
              </motion.p>

              <motion.p
                className="font-mincho text-cream text-lg md:text-xl tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                5 años de batalla
              </motion.p>

              <motion.p
                className="mt-10 font-mincho text-[#d4c4b0] text-xs md:text-sm tracking-widest animate-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Toca para comenzar
              </motion.p>
            </div>
          </motion.div>
        )}

        {screen === "intro" && (
          <motion.div
            key="intro"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <IntroScreen onDone={goNext} />
          </motion.div>
        )}

        {screen === "round" && (
          <motion.div
            key={`round-${roundIndex}`}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <RoundScreen
              round={ROUNDS[roundIndex]}
              roundIndex={roundIndex}
              totalRounds={ROUNDS.length}
              betoScore={betoScore}
              yadiraScore={yadiraScore}
              onNext={goNext}
            />
          </motion.div>
        )}

        {screen === "expediente" && (
          <motion.div
            key="expediente"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <ExpedienteScreen onNext={goNext} />
          </motion.div>
        )}

        {screen === "quiz" && (
          <motion.div
            key="quiz"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <QuizScreen onDone={goNext} />
          </motion.div>
        )}

        {screen === "final" && (
          <motion.div
            key="final"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6 }}
          >
            <FinalScreen onCredits={goNext} />
          </motion.div>
        )}

        {screen === "credits" && (
          <motion.div
            key="credits"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
          >
            <CreditsScreen onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
