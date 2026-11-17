"use client";

import { useEffect, useRef } from "react";
import { VignetteStage, usePlayback } from "./Stage";
import styles from "./grok.module.css";

const QUESTION = "How long does light take to reach Mars?";
const ANSWER =
  "Between about 3 and 22 minutes. It depends on where Earth and Mars are in their orbits: roughly 3 minutes at their closest, 22 at their farthest.";
const WORDS = ANSWER.split(" ");
const CHIPS = ["Plan a launch window", "Explain orbital transfer", "Summarize a paper"];

/** Deterministic jitter in [0, 1) so every loop has the same rhythm. */
function jitter(i: number, seed: number) {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/* ---------------------------------------------------------------- timeline */

const FADE_IN = 60; // home fades in (350 ms)
const TYPE_START = FADE_IN + 350 + 950;

const CHAR_TIMES: number[] = [];
{
  let t = TYPE_START;
  for (let i = 0; i < QUESTION.length; i++) {
    CHAR_TIMES.push(t);
    t += 38 + Math.round(jitter(i, 1) * 30);
    if (QUESTION[i] === " ") t += 60 + Math.round(jitter(i, 2) * 50);
  }
}
const TYPE_END = CHAR_TIMES[CHAR_TIMES.length - 1];
const SEND = TYPE_END + 450;
const BUBBLE = SEND + 160;
const ANSWER_START = SEND + 900;

const WORD_TIMES: number[] = [];
{
  let t = ANSWER_START;
  for (let i = 0; i < WORDS.length; i++) {
    WORD_TIMES.push(t);
    t += 70 + Math.round(jitter(i, 3) * 55);
    if (/[.:,]$/.test(WORDS[i])) t += 150;
  }
}
const ANSWER_END = WORD_TIMES[WORD_TIMES.length - 1];
const ACTIONS = ANSWER_END + 320;
const FINISHED = ACTIONS + 320;
const FADE_OUT = FINISHED + 2500;
const LOOP = FADE_OUT + 440;

const EVENTS = Array.from(
  new Set([0, FADE_IN, ...CHAR_TIMES, SEND, BUBBLE, ...WORD_TIMES, ACTIONS, FADE_OUT])
).sort((a, b) => a - b);

function countUpTo(times: number[], t: number) {
  let n = 0;
  while (n < times.length && times[n] <= t) n++;
  return n;
}

/** Apply the scene state for time t (idempotent). */
function render(root: HTMLElement, text: HTMLElement, words: HTMLElement[], t: number) {
  const sent = t >= SEND;
  const typed = sent ? 0 : countUpTo(CHAR_TIMES, t);
  const shown = countUpTo(WORD_TIMES, t);
  const d = root.dataset;
  d.run = "1";
  d.out = t < FADE_IN || t >= FADE_OUT ? "1" : "0";
  d.dock = sent ? "1" : "0";
  d.caret = sent ? "0" : "1";
  d.typed = typed > 0 ? "1" : "0";
  d.bubble = t >= BUBBLE ? "1" : "0";
  d.actions = t >= ACTIONS ? "1" : "0";
  const value = QUESTION.slice(0, typed);
  if (text.textContent !== value) text.textContent = value;
  words.forEach((w, i) => {
    if (i < shown) w.setAttribute("data-on", "");
    else w.removeAttribute("data-on");
  });
}

/** Back to the static base: the finished conversation. */
function finish(root: HTMLElement, text: HTMLElement) {
  const d = root.dataset;
  delete d.run;
  d.out = "0";
  d.dock = "1";
  d.caret = "0";
  d.typed = "0";
  d.bubble = "1";
  d.actions = "1";
  text.textContent = "";
}

/* ------------------------------------------------------------------ glyphs */

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 11.25V2.75M3.25 6.5 7 2.75l3.75 3.75" />
    </svg>
  );
}

function Glyph({ d }: { d: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"
      strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const COPY = "M4.75 4.75V3a1 1 0 0 1 1-1h5.25a1 1 0 0 1 1 1v5.25a1 1 0 0 1-1 1H9.25M3 4.75h5.25a1 1 0 0 1 1 1V11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5.75a1 1 0 0 1 1-1Z";
const RETRY = "M11.5 7a4.5 4.5 0 1 1-1.32-3.18M11.5 2v2.5H9";
const SHARE = "M7 8.5V1.75M4.5 4.25 7 1.75l2.5 2.5M3.5 6.5H3a1 1 0 0 0-1 1V11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7.5a1 1 0 0 0-1-1h-.5";

/* ------------------------------------------------------------------- scene */

function Scene() {
  const { active, reduced } = usePlayback();
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const tRef = useRef<number | null>(null); // timeline position, kept across pauses

  useEffect(() => {
    const root = rootRef.current;
    const text = textRef.current;
    if (!root || !text) return;
    const words = wordRefs.current;

    if (reduced) {
      tRef.current = null;
      finish(root, text);
      return;
    }
    if (!active) return;

    // First run starts on the finished frame (matching the static base) and holds.
    if (tRef.current === null) tRef.current = FINISHED;
    let t = tRef.current;
    let wall = performance.now();
    let timer: ReturnType<typeof setTimeout> | undefined;

    render(root, text, words, t);

    const schedule = () => {
      const next = EVENTS.find((e) => e > t) ?? LOOP;
      timer = setTimeout(() => {
        t = next >= LOOP ? 0 : next;
        wall = performance.now();
        tRef.current = t;
        render(root, text, words, t);
        schedule();
      }, next - t);
    };
    schedule();

    return () => {
      if (timer) clearTimeout(timer);
      // Resume where we left off: remember how far into the current step we were.
      tRef.current = Math.min(t + (performance.now() - wall), LOOP - 1);
    };
  }, [active, reduced]);

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-out="0"
      data-dock="1"
      data-caret="0"
      data-typed="0"
      data-bubble="1"
      data-actions="1"
    >
      <div className={styles.window}>
        <div className={styles.content}>
          <div className={styles.bubble}>{QUESTION}</div>

          <p className={styles.answer}>
            {WORDS.map((w, i) => (
              <span key={i}>
                <span
                  className={styles.word}
                  ref={(el) => {
                    if (el) wordRefs.current[i] = el;
                  }}
                >
                  {w}
                </span>
                {i < WORDS.length - 1 ? " " : null}
              </span>
            ))}
            <span className={styles.actions}>
              <Glyph d={COPY} />
              <Glyph d={RETRY} />
              <Glyph d={SHARE} />
            </span>
          </p>

          <div className={styles.chips}>
            {CHIPS.map((c) => (
              <span key={c} className={styles.chip}>
                {c}
              </span>
            ))}
          </div>

          <div className={styles.composer}>
            <div className={styles.field}>
              <span className={styles.placeholder}>Ask anything</span>
              <span ref={textRef} />
              <span className={styles.caret} />
            </div>
            <span className={styles.send}>
              <Arrow />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GrokVignette() {
  return (
    <VignetteStage label="An empty assistant home with a centred composer; a question is typed and sent, the composer glides to the bottom and an answer streams in.">
      <Scene />
    </VignetteStage>
  );
}
