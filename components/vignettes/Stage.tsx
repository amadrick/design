"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import styles from "./stage.module.css";

/**
 * Every vignette is drawn on a fixed 960 x 600 canvas and scaled to whatever
 * width its frame has, so a vignette is authored once, in plain pixels.
 */
export const STAGE_WIDTH = 960;
export const STAGE_HEIGHT = 600;

type Playback = {
  /** True while the stage is on screen, the tab is visible and motion is allowed. */
  active: boolean;
  /** True when the visitor asked for reduced motion: render the finished frame, still. */
  reduced: boolean;
};

const PlaybackContext = createContext<Playback>({ active: false, reduced: false });

/** Read playback state from inside a vignette (for JS-driven sequences). */
export function usePlayback() {
  return useContext(PlaybackContext);
}

interface VignetteStageProps {
  /** One sentence describing what the vignette shows, for screen readers. */
  label: string;
  children: ReactNode;
  className?: string;
}

export function VignetteStage({ label, children, className }: VignetteStageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );
    io.observe(el);

    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / STAGE_WIDTH);
    });
    ro.observe(el);

    const onVisibility = () => setVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReduced(mq.matches);
    onMotion();
    mq.addEventListener("change", onMotion);

    return () => {
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      mq.removeEventListener("change", onMotion);
    };
  }, []);

  const active = inView && visible && !reduced;
  const style = scale === null ? undefined : ({ "--vg-scale": scale } as CSSProperties);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      data-active={active ? "true" : "false"}
      data-reduced={reduced ? "true" : "false"}
      className={[styles.frame, className].filter(Boolean).join(" ")}
      style={style}
    >
      <div className={styles.canvas} aria-hidden="true">
        <PlaybackContext.Provider value={{ active, reduced }}>{children}</PlaybackContext.Provider>
      </div>
    </div>
  );
}
