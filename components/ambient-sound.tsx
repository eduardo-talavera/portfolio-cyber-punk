"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Language } from "../content/portfolio";
import styles from "./ambient-sound.module.css";

const TRACK_SOURCE = "/audio/cyberpunk-ambient.mp3";
const TARGET_VOLUME = 0.34;

const labels = {
  es: {
    name: "Sonido ambiental",
    enable: "Activar ambiente sonoro",
    disable: "Silenciar ambiente sonoro",
    waiting: "El navegador requiere una interacción para iniciar el sonido",
    unavailable: "El audio ambiental no está disponible en este navegador",
  },
  en: {
    name: "Ambient sound",
    enable: "Enable ambient sound",
    disable: "Mute ambient sound",
    waiting: "The browser requires an interaction to start sound",
    unavailable: "Ambient audio is not available in this browser",
  },
} satisfies Record<Language, Record<string, string>>;

export function AmbientSound({ language }: { language: Language }) {
  const [enabled, setEnabled] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [supported, setSupported] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeFrameRef = useRef<number | null>(null);

  const cancelFade = useCallback(() => {
    if (fadeFrameRef.current !== null) {
      window.cancelAnimationFrame(fadeFrameRef.current);
      fadeFrameRef.current = null;
    }
  }, []);

  const fadeTo = useCallback((target: number, duration: number, onComplete?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    cancelFade();

    const initialVolume = audio.volume;
    const startedAt = window.performance.now();

    const update = (time: number) => {
      const progress = Math.min(1, (time - startedAt) / duration);
      const eased = 1 - (1 - progress) ** 3;
      audio.volume = Math.max(0, Math.min(1, initialVolume + (target - initialVolume) * eased));

      if (progress < 1) {
        fadeFrameRef.current = window.requestAnimationFrame(update);
        return;
      }

      fadeFrameRef.current = null;
      onComplete?.();
    };

    fadeFrameRef.current = window.requestAnimationFrame(update);
  }, [cancelFade]);

  const startAudio = useCallback(async (automatic = false) => {
    const audio = audioRef.current;
    if (!audio || document.hidden) return;

    cancelFade();
    if (audio.paused) audio.volume = 0;

    try {
      await audio.play();
      setAutoplayBlocked(false);
      setPlaying(true);
      fadeTo(TARGET_VOLUME, automatic ? 1100 : 650);
    } catch {
      setPlaying(false);
      setAutoplayBlocked(true);
    }
  }, [cancelFade, fadeTo]);

  const pauseAudio = useCallback((duration = 420) => {
    const audio = audioRef.current;
    cancelFade();
    setPlaying(false);
    if (!audio || audio.paused) return;

    fadeTo(0, duration, () => audio.pause());
  }, [cancelFade, fadeTo]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const canPlayMp3 = audio.canPlayType("audio/mpeg") !== "";
    setSupported(canPlayMp3);
    if (!canPlayMp3) {
      setEnabled(false);
      return;
    }

    void startAudio(true);
  }, [startAudio]);

  useEffect(() => {
    if (!enabled || !autoplayBlocked || playing || document.hidden) return;

    const unlock = (event: PointerEvent | KeyboardEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-ambient-toggle]")) return;
      void startAudio();
    };

    document.addEventListener("pointerdown", unlock, { capture: true });
    document.addEventListener("keydown", unlock, { capture: true });
    return () => {
      document.removeEventListener("pointerdown", unlock, { capture: true });
      document.removeEventListener("keydown", unlock, { capture: true });
    };
  }, [autoplayBlocked, enabled, playing, startAudio]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        pauseAudio(180);
      } else if (enabled) {
        void startAudio();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [enabled, pauseAudio, startAudio]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      cancelFade();
      if (!audio) return;
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    };
  }, [cancelFade]);

  const toggleSound = () => {
    if (!supported) return;

    if (enabled && autoplayBlocked && !playing) {
      void startAudio();
      return;
    }

    if (enabled) {
      setEnabled(false);
      setAutoplayBlocked(false);
      pauseAudio();
      return;
    }

    setEnabled(true);
    void startAudio();
  };

  const copy = labels[language];
  const title = !supported
    ? copy.unavailable
    : autoplayBlocked && enabled && !playing
      ? copy.waiting
      : enabled
        ? copy.disable
        : copy.enable;

  return (
    <>
      <audio
        ref={audioRef}
        src={TRACK_SOURCE}
        preload="auto"
        loop
        playsInline
        onPlay={() => {
          setPlaying(true);
          setAutoplayBlocked(false);
        }}
        onPause={() => setPlaying(false)}
        onError={() => {
          setSupported(false);
          setEnabled(false);
          setPlaying(false);
        }}
      />
      <button
        className={[
          "tool-button",
          styles.soundButton,
          playing ? styles.playing : "",
          autoplayBlocked && enabled ? styles.awaiting : "",
        ].filter(Boolean).join(" ")}
        type="button"
        data-ambient-toggle
        aria-label={copy.name}
        aria-pressed={enabled}
        disabled={!supported}
        title={title}
        onClick={toggleSound}
      >
        <span className={styles.soundGlyph} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="sr-only">{title}</span>
      </button>
    </>
  );
}
