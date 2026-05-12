"use client";

import { useState, useEffect } from "react";

export function useTypewriter(
  lines: string[],
  speed = 36,
  active = true
) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Reset when lines change
    setDisplayed([]);
    setCurrentLine(0);
    setCurrentChar(0);
    setDone(false);
  }, [lines]);

  useEffect(() => {
    if (!active || done) return;
    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }
    if (currentChar < lines[currentLine].length) {
      const t = setTimeout(() => {
        setDisplayed((prev) => {
          const copy = [...prev];
          copy[currentLine] =
            (copy[currentLine] || "") + lines[currentLine][currentChar];
          return copy;
        });
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 440);
      return () => clearTimeout(t);
    }
  }, [active, currentLine, currentChar, lines, speed, done]);

  return { displayed, done };
}
