"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { VignetteStage, usePlayback } from "./Stage";
import s from "./cursor.module.css";

/* The finished file, verbatim. */
const LINES = [
  "type Entry = { title: string; date: Date; shipped: boolean };",
  "",
  "export function latest(entries: Entry[]) {",
  "  return entries",
  "    .filter((e) => e.shipped)",
  "    .sort((a, b) => +b.date - +a.date)",
  "    .slice(0, 6);",
  "}",
];

const ROW = 23; // 13.5px * ~1.7
const CODE_X = 72;
const TYPED = "    .fil".length; // what the user types on line 5
const L5 = LINES[4].length;
const L7 = LINES[6].length;
const KEYWORDS = new Set(["type", "export", "function", "return"]);

type Token = { text: string; start: number; key: boolean };

/** Monochrome syntax: keywords and punctuation one step down, everything else default. */
function tokenize(line: string, splitAt = -1): Token[] {
  const out: Token[] = [];
  const re = /(\s+)|([A-Za-z_]\w*)|(\d+)|(=>)|([^\sA-Za-z_0-9])/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    const text = m[0];
    const start = m.index;
    const key = Boolean(m[4] || m[5] || (m[2] && KEYWORDS.has(m[2])));
    if (splitAt > start && splitAt < start + text.length) {
      out.push({ text: text.slice(0, splitAt - start), start, key });
      out.push({ text: text.slice(splitAt - start), start: splitAt, key });
    } else {
      out.push({ text, start, key });
    }
  }
  return out;
}

const TOKENS = LINES.map((l, i) => tokenize(l, i === 4 ? TYPED : -1));

type Cap = "off" | "on" | "pressed" | "gone";
type Snap = {
  typed: number; // characters of line 5 typed by the user
  ghost1: boolean; // inline completion offered on line 5
  acc1: boolean; // ...and accepted
  next: boolean; // next-edit suggestion (lines 6-7) offered
  acc2: boolean; // ...and accepted
  cap: Cap;
  capAt: 1 | 2;
  caret: [number, number];
  caretOn: boolean;
  fading: boolean;
  braceDown: boolean;
};

const FINAL: Snap = {
  typed: TYPED,
  ghost1: true,
  acc1: true,
  next: true,
  acc2: true,
  cap: "off",
  capAt: 2,
  caret: [6, L7],
  caretOn: true,
  fading: false,
  braceDown: true,
};

const START: Snap = {
  typed: 0,
  ghost1: false,
  acc1: false,
  next: false,
  acc2: false,
  cap: "off",
  capAt: 1,
  caret: [4, 0],
  caretOn: true,
  fading: false,
  braceDown: false,
};

/** The loop as [delay since previous step, change]. It begins with the soft reset. */
const TYPING_DELAYS = [0, 45, 40, 50, 150, 70, 55, 65]; // spaces, pause, ".", f i l
const SCRIPT: [number, Partial<Snap> | "start"][] = [
  [0, { fading: true, caretOn: false }],
  [300, { braceDown: false }],
  [500, "start"],
  ...TYPING_DELAYS.map(
    (d, i) =>
      [i === 0 ? 1200 : d, { typed: i + 1, caret: [4, i + 1] }] as [
        number,
        Partial<Snap>,
      ],
  ),
  [550, { ghost1: true }],
  [250, { cap: "on" }],
  [1500, { cap: "pressed" }],
  [120, { acc1: true, caret: [4, L5], cap: "gone" }],
  [300, { cap: "off", capAt: 2 }],
  [1100, { next: true, braceDown: true }],
  [500, { cap: "on" }],
  [1500, { cap: "pressed" }],
  [120, { acc2: true, caret: [6, L7], cap: "gone" }],
  [300, { cap: "off" }],
];
const FINISHED_HOLD_TAIL = 2400; // after the last step; the finished frame holds ~2.7 s

type Step = { t: number; snap: Snap };
const STEPS: Step[] = (() => {
  const out: Step[] = [];
  let t = 0;
  let snap = FINAL;
  for (const [d, change] of SCRIPT) {
    t += d;
    snap = change === "start" ? START : { ...snap, ...change };
    out.push({ t, snap });
  }
  return out;
})();
const LOOP = STEPS[STEPS.length - 1].t + FINISHED_HOLD_TAIL;
const FIRST_HOLD = 1400; // first time on screen: we are already in the finished hold

function useSequence(): Snap {
  const { active, reduced } = usePlayback();
  const [snap, setSnap] = useState<Snap>(FINAL);
  const pos = useRef(LOOP - FIRST_HOLD); // loop time at the last scheduling point
  const nextIdx = useRef(0);
  const nextDue = useRef(LOOP);

  useEffect(() => {
    if (reduced) {
      pos.current = LOOP - FIRST_HOLD;
      nextIdx.current = 0;
      nextDue.current = LOOP;
      setSnap(FINAL);
      return;
    }
    if (!active) return;

    let timer: ReturnType<typeof setTimeout>;
    let scheduledAt = performance.now();

    const schedule = () => {
      scheduledAt = performance.now();
      timer = setTimeout(fire, Math.max(0, nextDue.current - pos.current));
    };
    const fire = () => {
      const i = nextIdx.current;
      const step = STEPS[i];
      setSnap(step.snap);
      pos.current = step.t;
      nextIdx.current = (i + 1) % STEPS.length;
      nextDue.current = nextIdx.current === 0 ? LOOP : STEPS[nextIdx.current].t;
      schedule();
    };
    schedule();

    return () => {
      clearTimeout(timer);
      pos.current = Math.min(
        nextDue.current,
        pos.current + (performance.now() - scheduledAt),
      );
    };
  }, [active, reduced]);

  return snap;
}

function Code({
  row,
  upTo,
  ghostFrom = Infinity,
  ghostIn = false,
}: {
  row: number;
  upTo?: number;
  ghostFrom?: number;
  ghostIn?: boolean;
}) {
  const end = upTo ?? LINES[row].length;
  return (
    <>
      {TOKENS[row].map((tok) => {
        if (tok.start >= end) return null;
        const text = tok.text.slice(0, end - tok.start);
        const ghost = tok.start >= ghostFrom;
        const cls = [
          tok.key ? s.tKey : s.tDefault,
          ghost && s.ghost,
          ghost && ghostIn && s.ghostIn,
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <span key={tok.start} className={cls}>
            {text}
          </span>
        );
      })}
    </>
  );
}

export default function CursorVignette() {
  return (
    <VignetteStage label="A code editor offers a suggestion as faint ghost text, and pressing Tab turns it into real code.">
      <Scene />
    </VignetteStage>
  );
}

/* Rendered inside the stage so usePlayback() reads the stage's playback state. */
function Scene() {
  const v = useSequence();
  const [caretRow, caretCol] = v.caret;
  const numCls = (row: number, extra?: string | false) =>
    [s.num, row === caretRow && v.caretOn && s.numCurrent, extra]
      .filter(Boolean)
      .join(" ");
  const at = (row: number): CSSProperties => ({ top: row * ROW });

  const capRow = v.capAt === 1 ? 4 : 6;
  const capCol = v.capAt === 1 ? L5 : L7;
  const capCls = {
    off: "",
    on: s.capOn,
    pressed: s.capPressed,
    gone: s.capGone,
  }[v.cap];

  return (
    <div className={s.root}>
      <div className={s.window}>
        <div className={s.strip}>
          <div className={`${s.tab} ${s.mono}`}>changelog.ts</div>
        </div>

        <div className={s.body}>
          <div className={`${s.rows} ${s.mono}`}>
            {/* Lines 1-4 never change */}
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className={s.row} style={at(row)}>
                <span className={numCls(row)}>{row + 1}</span>
                <span className={s.code}>
                  <Code row={row} />
                </span>
              </div>
            ))}

            {/* Line 5: typed, then completed inline */}
            <div className={s.row} style={at(4)}>
              <span className={numCls(4)}>5</span>
              <span
                className={[s.code, s.fadeable, v.fading && s.hidden]
                  .filter(Boolean)
                  .join(" ")}
              >
                <Code
                  row={4}
                  upTo={v.ghost1 ? L5 : v.typed}
                  ghostFrom={v.acc1 ? Infinity : TYPED}
                  ghostIn={!v.acc1}
                />
              </span>
            </div>

            {/* Lines 6-7: the next-edit suggestion */}
            {[5, 6].map((row) => (
              <div
                key={row}
                className={[
                  s.row,
                  s.nextLine,
                  v.fading && s.fading,
                  (!v.next || v.fading) && s.hidden,
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={at(row)}
              >
                <span className={numCls(row, !v.acc2 && s.numGhost)}>
                  {row + 1}
                </span>
                <span
                  className={[s.code, !v.acc2 && s.ghost]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <Code row={row} />
                </span>
              </div>
            ))}

            {/* Closing brace: lives at line 8, lifted by transform while lines 6-7 are absent */}
            <div
              className={[s.row, s.brace, !v.braceDown && s.braceUp]
                .filter(Boolean)
                .join(" ")}
              style={at(7)}
            >
              <span className={s.num}>
                <span
                  className={s.numSwap}
                  style={{ opacity: v.braceDown ? 1 : 0 }}
                >
                  8
                </span>
                <span
                  className={s.numSwap}
                  style={{ opacity: v.braceDown ? 0 : 1 }}
                >
                  6
                </span>
              </span>
              <span className={s.code}>
                <Code row={7} />
              </span>
            </div>

            <span
              key={`${caretRow}-${caretCol}`}
              className={[s.caret, !v.caretOn && s.caretOff]
                .filter(Boolean)
                .join(" ")}
              style={{
                top: caretRow * ROW + 3,
                left: `calc(${CODE_X}px + ${caretCol}ch)`,
              }}
            />

            {/* Anchor sits in the code font so ch matches the code columns */}
            <span
              className={s.capAnchor}
              style={{
                top: capRow * ROW + 2,
                left: `calc(${CODE_X}px + ${capCol}ch)`,
              }}
            >
              <span className={[s.cap, capCls].filter(Boolean).join(" ")}>Tab</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
