"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { VignetteStage, usePlayback } from "./Stage";
import s from "./meetingnotes.module.css";

/*
 * One loop, 12 s. Each entry is the moment a step begins; the step number is
 * the index. Visuals are pure CSS reacting to the step, so React only renders
 * when a beat changes.
 */
const TIMES = [
  0, //     0  recording, 00:41
  1100, //  1  00:42
  2200, //  2  00:43
  3300, //  3  stop: line flattens, "Writing notes", shimmer
  4500, //  4  "Summary"
  4800, //  5  summary line 1
  5150, //  6  summary line 2
  5700, //  7  "Action items"
  6000, //  8  row 1
  6350, //  9  row 2
  6700, // 10  row 3
  7400, // 11  "Notes ready"
  8200, // 12  first item ticks (finished frame)
  11500, // 13  notes fade out
];
const LOOP = 12000;

const S_STOP = 3;
const S_SUM_LABEL = 4;
const S_SUM1 = 5;
const S_SUM2 = 6;
const S_ACT_LABEL = 7;
const S_ROW1 = 8;
const S_READY = 11;
const S_TICK = 12;
const S_FADE = 13;

/** The finished, fully composed frame (static, reduced motion, no JS). */
const FINAL = S_TICK;
/** First time the loop starts, it picks up inside the hold so nothing cuts. */
const START_AT = 9000;

function stepAt(t: number) {
  let step = 0;
  for (let i = 0; i < TIMES.length; i++) if (TIMES[i] <= t) step = i;
  return step;
}

function nextAfter(t: number) {
  for (const time of TIMES) if (time > t) return time;
  return LOOP;
}

/* 18 bars, each with its own height, rhythm and phase so the wave reads as voice. */
const BARS = [
  [9, "barA", 1.25, -0.3],
  [13, "barB", 1.6, -1.1],
  [16, "barC", 1.05, -0.6],
  [11, "barA", 1.45, -0.9],
  [18, "barB", 1.2, -0.2],
  [14, "barC", 1.7, -1.3],
  [10, "barA", 0.95, -0.5],
  [17, "barC", 1.35, -0.8],
  [12, "barB", 1.15, -0.1],
  [18, "barA", 1.55, -1.0],
  [15, "barB", 1.0, -0.4],
  [9, "barC", 1.4, -1.2],
  [16, "barA", 1.1, -0.7],
  [12, "barB", 1.65, -0.35],
  [14, "barC", 1.3, -0.95],
  [8, "barA", 1.5, -0.15],
  [11, "barB", 1.2, -0.75],
  [7, "barC", 1.0, -0.45],
] as const;

const ACTIONS = [
  "Tighten the type scale",
  "Record the Lightfield walkthrough",
  "Write up Claude Code",
];

export default function MeetingNotesVignette() {
  return (
    <VignetteStage label="A meeting recording flattens into a line while a block of notes, a summary and three action items, writes itself on a document page.">
      <Scene />
    </VignetteStage>
  );
}

function Scene() {
  const { active, reduced } = usePlayback();
  const [step, setStep] = useState(FINAL);
  const elapsed = useRef(START_AT);

  useEffect(() => {
    if (reduced) {
      setStep(FINAL);
      return;
    }
    if (!active) return;

    const start = performance.now();
    const base = elapsed.current;
    let timer: ReturnType<typeof setTimeout>;

    const now = () => (base + performance.now() - start) % LOOP;
    const tick = () => {
      const t = now();
      setStep(stepAt(t));
      timer = setTimeout(tick, nextAfter(t) - t + 4);
    };
    tick();

    return () => {
      clearTimeout(timer);
      elapsed.current = now();
    };
  }, [active, reduced]);

  const pillState =
    step < S_STOP ? "rec" : step < S_READY ? "writing" : "ready";
  const seconds = step < S_STOP ? 41 + step : 43;
  const on = (from: number) => (step >= from ? "true" : "false");

  return (
    <div className={s.scene}>
      <div className={s.window}>
        <h3 className={s.title}>Design review</h3>

        <div className={s.meta}>
          <span>Today</span>
          <span className={s.sep}>·</span>
          <span className={s.people}>
            <span className={`${s.person} ${s.personA}`} />
            <span className={`${s.person} ${s.personB}`} />
            <span className={`${s.person} ${s.personA}`} />
            <span className={`${s.person} ${s.personB}`} />
          </span>
        </div>

        <div className={s.pill} data-state={pillState}>
          <span className={s.dot} />
          <span className={s.labels}>
            <span className={s.label} data-on={pillState === "rec"}>
              Recording
            </span>
            <span className={s.label} data-on={pillState === "writing"}>
              Writing notes
            </span>
            <span className={s.label} data-on={pillState === "ready"}>
              Notes ready
            </span>
          </span>
          <span className={s.wave}>
            <span className={s.bars}>
              {BARS.map(([h, name, dur, delay], i) => (
                <span
                  key={i}
                  className={`${s.bar} ${s[name]}`}
                  style={
                    {
                      height: h,
                      animationDuration: `${dur}s`,
                      animationDelay: `${delay}s`,
                    } as CSSProperties
                  }
                />
              ))}
            </span>
            <span className={s.line}>
              <span className={s.shimmer} />
            </span>
          </span>
          <span className={s.timer}>00:{seconds}</span>
        </div>

        <div className={s.notes} data-fading={step === S_FADE}>
          <span className={`${s.heading} ${s.item}`} data-on={on(S_SUM_LABEL)}>
            Summary
          </span>
          <p className={s.summary}>
            <span className={`${s.summaryLine} ${s.item}`} data-on={on(S_SUM1)}>
              Agreed to ship the changelog layout. Case studies stay on one
              page,
            </span>
            <span className={`${s.summaryLine} ${s.item}`} data-on={on(S_SUM2)}>
              grouped by company, newest first.
            </span>
          </p>

          <div className={s.actions}>
            <span
              className={`${s.heading} ${s.item}`}
              data-on={on(S_ACT_LABEL)}
            >
              Action items
            </span>
            <ul className={s.list}>
              {ACTIONS.map((text, i) => (
                <li
                  key={text}
                  className={`${s.row} ${s.item}`}
                  data-on={on(S_ROW1 + i)}
                  data-done={i === 0 && step >= S_TICK ? "true" : "false"}
                >
                  <span className={s.box}>
                    <svg
                      className={s.check}
                      viewBox="0 0 15 15"
                      aria-hidden="true"
                    >
                      <path
                        className={s.checkPath}
                        d="M4.2 7.7 6.5 10 10.8 5.2"
                        pathLength={1}
                      />
                    </svg>
                  </span>
                  <span className={s.text}>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
