"use client";

import { useMemo, useState, useEffect } from "react";

type PetalsProps = {
  count?: number;
  bright?: boolean;
};

export function Petals({ count = 12, bright = false }: PetalsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${4 + Math.random() * 5}s`,
      })),
    [count]
  );

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((p) => (
        <div
          key={p.id}
          className={`petal ${bright ? "bright" : ""}`}
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
