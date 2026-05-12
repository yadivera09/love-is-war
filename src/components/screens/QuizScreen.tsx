"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { QUIZ_QUESTIONS } from "@/data/content";

type QuizScreenProps = {
  onDone: () => void;
};

export function QuizScreen({ onDone }: QuizScreenProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answered, setAnswered] = useState<string | null>(null);
  const [scores, setScores] = useState({ beto: 0, yadira: 0 });
  const [showResult, setShowResult] = useState(false);
  const [animClass, setAnimClass] = useState<Record<string, string>>({});

  const question = QUIZ_QUESTIONS[currentQ];
  const isLastQuestion = currentQ === QUIZ_QUESTIONS.length - 1;

  // Shuffled order for variety
  const order = useMemo(
    () => (Math.random() > 0.5 ? ["beto", "yadira"] : ["yadira", "beto"]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentQ]
  );

  const handleAnswer = (choice: "beto" | "yadira") => {
    if (answered) return;
    setAnswered(choice);

    const isCorrect = choice === question.answer;

    if (isCorrect) {
      setAnimClass({ [choice]: "quiz-correct" });
      setScores((s) => ({ ...s, [choice]: s[choice as keyof typeof s] + 1 }));
    } else {
      setAnimClass({
        [choice]: "quiz-wrong",
        [question.answer]: "quiz-correct",
      });
      setScores((s) => ({
        ...s,
        [question.answer]: s[question.answer as keyof typeof s] + 1,
      }));
    }

    // Move to next question or show results
    setTimeout(
      () => {
        if (isLastQuestion) {
          setShowResult(true);
        } else {
          setCurrentQ((q) => q + 1);
          setAnswered(null);
          setAnimClass({});
        }
      },
      isCorrect ? 1200 : 2000
    );
  };

  const getVerdict = () => {
    const total = QUIZ_QUESTIONS.length;
    const correct = scores.beto + scores.yadira;
    if (correct === total) return "¡Perfecto! Conoces cada detalle de esta batalla. 👏";
    if (correct >= total * 0.7) return "Casi perfecto. La memoria es fuerte. 💪";
    if (correct >= total * 0.4) return "Hmm... ¿seguro que estuviste ahí? 🤔";
    return "Houston, tenemos un problema de memoria. 🚨";
  };

  return (
    <div className="relative min-h-dvh w-full flex flex-col items-center justify-center px-6 py-12 overflow-hidden bg-[#0a0808]">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 40% 30%, rgba(139,0,0,0.15) 0%, transparent 50%), radial-gradient(ellipse at 60% 70%, rgba(26,0,0,0.4) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-lg w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="font-mincho text-[0.6rem] tracking-[0.5em] text-[#8b0000] uppercase">
            BONUS ROUND
          </span>
          <h2
            className="font-mincho text-cream font-bold mt-1"
            style={{ fontSize: "clamp(1.3rem, 4vw, 2rem)" }}
          >
            🧠 ¿Quién lo dijo / hizo?
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex-1 h-1 bg-[#1a0a0a] rounded overflow-hidden">
                  <motion.div
                    className="h-full bg-[#8b0000] rounded"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentQ + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <span className="font-klee text-[#5a3a3a] text-xs">
                  {currentQ + 1}/{QUIZ_QUESTIONS.length}
                </span>
              </div>

              {/* Question */}
              <div className="bg-[#110e0e] border border-[#2a1a1a] p-6 mb-6">
                <p className="font-mincho text-cream text-lg leading-relaxed text-center">
                  {question.question}
                </p>
              </div>

              {/* Answer buttons */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {order.map((who) => {
                  const isChosen = answered === who;
                  const isCorrectAnswer = who === question.answer;
                  const showFeedback = answered !== null;

                  return (
                    <button
                      key={who}
                      onClick={() => handleAnswer(who as "beto" | "yadira")}
                      disabled={answered !== null}
                      className={`
                        flex flex-col items-center gap-3 p-4 border rounded-lg transition-all
                        ${animClass[who] || ""}
                        ${
                          showFeedback && isCorrectAnswer
                            ? "border-green-600 bg-[rgba(0,100,0,0.15)]"
                            : showFeedback && isChosen && !isCorrectAnswer
                              ? "border-red-600 bg-[rgba(100,0,0,0.15)]"
                              : "border-[#2a1a1a] bg-[#110e0e] hover:border-[#8b0000] hover:bg-[#1a0a0a]"
                        }
                        disabled:cursor-default
                      `}
                    >
                      <div className="w-16 h-16 rounded-full border-2 border-[#8b0000] bg-[#1a0a0a] overflow-hidden">
                        <Image
                          src={`/avatars/${who}.png`}
                          alt={who}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className="font-mincho text-cream text-sm tracking-widest uppercase">
                        {who}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation (after answering) */}
              <AnimatePresence>
                {answered && (
                  <motion.p
                    className="text-center font-klee text-[#9a8a7a] text-sm italic"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {question.explanation}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Results */
            <motion.div
              key="results"
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-[#110e0e] border border-[#2a1a1a] p-8 mb-6">
                <p className="font-mincho text-[#8b0000] text-xs tracking-[0.3em] uppercase mb-4">
                  Resultado del Quiz
                </p>

                {/* Score display */}
                <div className="flex justify-center items-center gap-6 mb-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full border-2 border-[#8b0000] bg-[#1a0a0a] overflow-hidden">
                      <Image
                        src="/avatars/beto.png"
                        alt="Beto"
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <motion.span
                      className="font-mincho text-cream text-2xl font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      {scores.beto}
                    </motion.span>
                    <span className="font-mincho text-[#5a3a3a] text-xs tracking-widest">
                      BETO
                    </span>
                  </div>

                  <span className="font-mincho text-[#3d0000] text-2xl">⚔️</span>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full border-2 border-[#8b0000] bg-[#1a0a0a] overflow-hidden">
                      <Image
                        src="/avatars/yadira.png"
                        alt="Yadira"
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <motion.span
                      className="font-mincho text-cream text-2xl font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      {scores.yadira}
                    </motion.span>
                    <span className="font-mincho text-[#5a3a3a] text-xs tracking-widest">
                      YADIRA
                    </span>
                  </div>
                </div>

                <motion.p
                  className="font-mincho text-parchment text-sm leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {getVerdict()}
                </motion.p>
              </div>

              <motion.button
                onClick={onDone}
                className="border border-[#c0392b] text-[#c0392b] px-8 py-2.5 font-mincho text-sm tracking-wider transition-all hover:bg-[#8b0000] hover:text-cream hover:border-[#8b0000] active:scale-95"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Round Final →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
