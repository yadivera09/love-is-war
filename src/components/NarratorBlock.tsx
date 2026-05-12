"use client";

import { motion } from "framer-motion";

type NarratorBlockProps = {
  lines: string[];
  size?: "sm" | "md" | "lg";
};

export function NarratorBlock({ lines, size = "md" }: NarratorBlockProps) {
  const sizeClass =
    size === "lg"
      ? "text-lg md:text-xl"
      : size === "sm"
      ? "text-sm md:text-base"
      : "text-base md:text-lg";

  return (
    <div className="flex gap-3 items-start">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#8b0000] flex items-center justify-center font-mincho text-cream font-bold text-sm">
        語
      </div>
      <div className="flex-1 space-y-1">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            className={`font-klee text-parchment leading-relaxed ${sizeClass}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
