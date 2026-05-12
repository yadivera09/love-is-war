"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Maps a screen + roundIndex to the corresponding audio file path.
 * Returns null for screens that should not have audio (e.g. expediente).
 */
function getAudioSrc(
  screen: string,
  roundIndex: number
): string | null {
  switch (screen) {
    case "intro":
      return "/audio/intro.mp3";
    case "round":
      return `/audio/round-${roundIndex + 1}.mp3`;
    case "final":
      return "/audio/final.mp3";
    case "expediente":
    default:
      return null;
  }
}

/**
 * Manages background audio playback per screen.
 * Automatically fades out the previous track and plays the new one
 * when the screen or roundIndex changes.
 */
export function useScreenAudio(screen: string, roundIndex: number) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopCurrent = useCallback(() => {
    if (fadeTimerRef.current) {
      clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Stop whatever was playing
    stopCurrent();

    const src = getAudioSrc(screen, roundIndex);
    if (!src) return;

    const audio = new Audio(src);
    audio.volume = 0;
    audioRef.current = audio;

    // Play immediately to satisfy browser requirements for user-triggered audio
    audio
      .play()
      .then(() => {
        // Fade in over ~500ms
        let vol = 0;
        const step = 0.05;
        const interval = setInterval(() => {
          vol = Math.min(1, vol + step);
          audio.volume = vol;
          if (vol >= 1) clearInterval(interval);
        }, 25);
      })
      .catch((err) => {
        console.warn("Audio playback blocked by browser. Interaction required.", err);
      });

    return () => {
      // Fade out on cleanup
      if (audioRef.current) {
        const a = audioRef.current;
        let vol = a.volume;
        fadeTimerRef.current = setInterval(() => {
          vol = Math.max(0, vol - 0.1);
          a.volume = vol;
          if (vol <= 0) {
            if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
            a.pause();
            a.currentTime = 0;
          }
        }, 30);
      }
    };
  }, [screen, roundIndex, stopCurrent]);
}
