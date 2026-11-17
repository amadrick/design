"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { VignetteStage, usePlayback } from "./Stage";
import s from "./claudecode.module.css";

/*
 * An agentic coding session in a terminal, drawn schematically.
 * The session is quietly redesigning this very site.
 *
 * The whole scene is a pure function of one clock value `t` (ms into the loop).
 * The clock only ticks at event boundaries (a typed character, a row arriving),
 * pauses while the stage is inactive and resumes where it left off.
 */

const REQUEST = "make the site read like a changelog";

const TYPE_START = 800;
/** When each character of the request lands, at a human cadence. */
const CHAR_TIMES: number[] = (() => {
  const out: number[] = [];
  let at = TYPE_START;
  for (let i = 0; i < REQUEST.length; i++) {
    at += 44 + ((i * 37 + 11) % 6) * 5; // 44-69 ms, slightly uneven
    if (REQUEST[i - 1] === " ") at += 80; // a beat at each word boundary
    out.push(at);
  }
  return out;
})();
const TYPE_END = CHAR_TIMES[CHAR_TIMES.length - 1];

const T = {
  submit: TYPE_END + 420,
  status: TYPE_END + 820,
  read1: TYPE_END + 2200,
  read2: TYPE_END + 2700,
  edit: TYPE_END + 3450,
  diff: TYPE_END + 3750,
  diffStep: 170,
  done: TYPE_END + 5300,
};
const FADE = T.done + 2700;
const FADE_MS = 420;
const LOOP = FADE + FADE_MS + 400;

const DIFF: { kind: "del" | "add"; code: string }[] = [
  { kind: "del", code: '<div className="grid gap-10">' },
  { kind: "del", code: "  {projects.map(card)}" },
  { kind: "add", code: '<ol className="changelog">' },
  { kind: "add", code: "  {releases.map(release)}" },
  { kind: "add", code: "</ol>" },
];
const DIFF_TIMES = DIFF.map((_, i) => T.diff + i * T.diffStep);

/** Every moment at which the frame changes, in order. */
const EVENTS = [
  ...CHAR_TIMES,
  T.submit,
  T.status,
  T.read1,
  T.read2,
  T.edit,
  ...DIFF_TIMES,
  T.done,
  FADE,
  LOOP,
].sort((a, b) => a - b);

/** The finished, fully composed frame (static, reduced motion, no JS). */
const FINISHED = T.done + 1;

function useLoopClock(active: boolean, reduced: boolean) {
  const [t, setT] = useState(FINISHED);
  const [started, setStarted] = useState(false);
  const tRef = useRef(FINISHED);

  useEffect(() => {
    if (!active || reduced) return;

    // First run: leave the finished frame softly, through the reset fade.
    if (!started) {
      tRef.current = FADE;
      setT(FADE);
      setStarted(true);
    }

    let base = performance.now() - tRef.current;
    let timer: number | undefined;

    const schedule = () => {
      const now = tRef.current;
      const next = EVENTS.find((e) => e > now) ?? LOOP;
      timer = window.setTimeout(() => {
        let value = next;
        if (value >= LOOP) {
          value = 0;
          base = performance.now();
        }
        tRef.current = value;
        setT(value);
        schedule();
      }, Math.max(0, base + next - performance.now()));
    };
    schedule();

    return () => {
      window.clearTimeout(timer);
      // Hold the clock at the last event reached so playback resumes there.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduced]);

  if (reduced) return { t: FINISHED, animate: false };
  return { t, animate: started };
}

function Row({ show, animate, children, className }: {
  show: boolean;
  animate: boolean;
  children: ReactNode;
  className?: string;
}) {
  if (!show) return null;
  return (
    <div className={[className, animate ? s.enter : ""].filter(Boolean).join(" ")}>{children}</div>
  );
}

function Tool({ verb, path }: { verb: string; path: string }) {
  return (
    <div className={s.tool}>
      <span className={s.gutter}>
        <span className={s.marker} />
      </span>
      <span className={s.verb}>{verb}</span>
      <span className={s.path}>{path}</span>
    </div>
  );
}

function Scene() {
  const { active, reduced } = usePlayback();
  const { t, animate } = useLoopClock(active, reduced);

  const submitted = t >= T.submit;
  const typed = submitted ? 0 : CHAR_TIMES.filter((c) => c <= t).length;
  const typing = typed > 0;
  const statusOn = t >= T.status && t < T.read1;
  const fading = t >= FADE;

  return (
    <div className={s.root}>
      <div className={s.window}>
        <div className={s.strip}>~/design</div>

        <div className={s.body}>
          <div className={[s.transcript, fading ? s.fading : ""].join(" ")}>
            <Row show={submitted} animate={animate} className={s.user}>
              <span className={s.gutter}>&gt;</span>
              <span>{REQUEST}</span>
            </Row>

            <div className={s.steps}>
              {/* The status line resolves, in place, into the first tool row. */}
              <div className={s.slot}>
                {statusOn && (
                  <div className={[s.status, animate ? s.enter : ""].join(" ")}>
                    <span className={s.gutter}>
                      <span className={s.pulse} />
                    </span>
                    <span>Reading the current site…</span>
                  </div>
                )}
                <Row show={t >= T.read1} animate={animate}>
                  <Tool verb="Read" path="lib/projects.ts" />
                </Row>
              </div>
              <Row show={t >= T.read2} animate={animate}>
                <Tool verb="Read" path="app/(site)/page.tsx" />
              </Row>
              <Row show={t >= T.edit} animate={animate}>
                <Tool verb="Edit" path="app/(site)/page.tsx" />
              </Row>

              {t >= T.diff && (
                <div className={[s.diff, animate ? s.enterLine : ""].join(" ")}>
                  {DIFF.map((line, i) =>
                    t >= DIFF_TIMES[i] ? (
                      <div
                        key={i}
                        className={[s.line, s[line.kind], animate ? s.enterLine : ""].join(" ")}
                      >
                        <span className={s.sign}>{line.kind === "del" ? "-" : "+"}</span>
                        <span className={s.code}>{line.code}</span>
                      </div>
                    ) : null
                  )}
                </div>
              )}
            </div>

            <Row show={t >= T.done} animate={animate} className={s.done}>
              <span className={s.gutter}>
                <span className={s.live} />
              </span>
              <span>Done. 3 files changed</span>
            </Row>
          </div>

          <div className={s.prompt}>
            <span className={s.promptMark}>&gt;</span>
            <span className={s.input}>
              {REQUEST.slice(0, typed)}
              <span className={[s.caret, typing ? s.caretSolid : ""].join(" ")} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClaudeCodeVignette() {
  return (
    <VignetteStage label="A terminal coding session: asked to make the site read like a changelog, the agent reads two files, edits the page, and reports three files changed.">
      <Scene />
    </VignetteStage>
  );
}
