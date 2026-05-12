"use client";

import { useMemo, useState, useEffect } from "react";

type HeartRainProps = {
  count?: number;
};

const HEARTS = ["❤️", "💕", "💗", "♥️", "💖"];

export function HeartRain({ count = 20 }: HeartRainProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${5 + Math.random() * 7}s`,
        heart: HEARTS[Math.floor(Math.random() * HEARTS.length)],
        size: `${12 + Math.random() * 10}px`,
      })),
    [count]
  );

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <span
          key={p.id}
          className="heart-particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            fontSize: p.size,
          }}
        >
          {p.heart}
        </span>
      ))}
    </div>
  );
}
