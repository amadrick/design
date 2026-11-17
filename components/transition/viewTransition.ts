/**
 * View transitions for client-side navigation, as progressive enhancement.
 *
 * One element at a time carries the shared name: the cover being opened, or the
 * case-study media being closed. It is named just before the old snapshot, the
 * name moves to the incoming element once the new page has committed, and every
 * name is cleared when the transition settles. Anything unexpected (no API,
 * reduced motion, an error, a slow page) falls back to the plain navigation,
 * which always happens exactly once.
 */

export type TransitionKind =
  /** Home cover -> case-study media. */
  | "open"
  /** Case-study media -> home cover. */
  | "close"
  /** Previous / next case study: a quick crossfade. */
  | "step"
  /** Plain crossfade. */
  | "fade";

/** The one shared `view-transition-name`. Styled in app/globals.css. */
const SHARED_NAME = "case-media";

/** The new page must be ready within this long, or the transition lets go. */
const BUDGET_MS = 1500;

let inFlight = false;

export function canTransition(): boolean {
  if (typeof document === "undefined" || typeof window === "undefined") return false;
  if (typeof document.startViewTransition !== "function") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Clicks the browser should handle itself: new tab, new window, download, etc. */
export function isModifiedClick(e: {
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  currentTarget: EventTarget | null;
}): boolean {
  const target = (e.currentTarget as HTMLAnchorElement | null)?.getAttribute?.("target");
  return (
    e.button !== 0 ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey ||
    (Boolean(target) && target !== "_self")
  );
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Polls until `find` returns an element or the deadline passes. */
async function waitFor<T>(find: () => T | null, deadline: number): Promise<T | null> {
  for (;;) {
    const found = find();
    if (found) return found;
    if (performance.now() >= deadline) return null;
    await sleep(16);
  }
}

function settle(promise: Promise<unknown>, ms: number): Promise<void> {
  if (ms <= 0) return Promise.resolve();
  return Promise.race([promise.then(() => undefined, () => undefined), sleep(ms)]);
}

/** Gives the incoming frame a moment to have pixels, so the morph lands on an image. */
function waitForMedia(el: HTMLElement, ms: number): Promise<void> {
  const img = el.querySelector("img");
  if (img) {
    if (img.complete) return Promise.resolve();
    // A lazy image waits for a rendering pass that the transition is holding
    // back, so it would never arrive in time. It is on screen anyway.
    if (img.loading === "lazy") img.loading = "eager";
    return settle(img.decode(), ms);
  }
  const video = el.querySelector("video");
  if (video) {
    if (video.readyState >= 2 || !video.poster) return Promise.resolve();
    const poster = new Image();
    poster.src = video.poster;
    return settle(poster.decode(), ms);
  }
  return Promise.resolve();
}

function coverFor(slug: string) {
  return document.querySelector<HTMLElement>(`[data-vt-cover="${CSS.escape(slug)}"]`);
}

function caseMedia() {
  return document.querySelector<HTMLElement>("[data-vt-media]");
}

interface TransitionOptions {
  href: string;
  kind: TransitionKind;
  /** The case study the cover / media belongs to, for "open" and "close". */
  slug?: string;
  /** The plain navigation, e.g. `router.push`. Called exactly once. */
  navigate: (href: string) => void;
}

/**
 * Navigates inside a view transition. Returns false when the caller should
 * navigate normally instead (no support, or reduced motion).
 */
export function navigateWithTransition({ href, kind, slug, navigate }: TransitionOptions): boolean {
  if (!canTransition()) return false;
  // A transition is already carrying a navigation; a second click is swallowed
  // rather than queued, so nothing fires twice.
  if (inFlight) return true;
  inFlight = true;

  const root = document.documentElement;
  const target = new URL(href, window.location.href);
  const named = new Set<HTMLElement>();

  const name = (el: HTMLElement) => {
    el.style.setProperty("view-transition-name", SHARED_NAME);
    named.add(el);
  };
  const unname = () => {
    named.forEach((el) => el.style.removeProperty("view-transition-name"));
    named.clear();
  };

  let navigated = false;
  const go = () => {
    if (navigated) return;
    navigated = true;
    navigate(href);
  };

  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    unname();
    delete root.dataset.vt;
    inFlight = false;
  };

  // The outgoing element. Without one, open/close degrade to a crossfade.
  let mode: TransitionKind = kind;
  if ((kind === "open" || kind === "close") && slug) {
    const outgoing = kind === "open" ? coverFor(slug) : caseMedia();
    if (outgoing) name(outgoing);
    else mode = "fade";
  } else if (kind === "open" || kind === "close") {
    mode = "fade";
  }
  root.dataset.vt = mode;

  const findIncoming = (): HTMLElement | null => {
    if (window.location.pathname !== target.pathname) return null;
    if (mode === "open") return caseMedia();
    if (mode === "close" && slug) {
      // Wait for ScrollToHash to bring the entry into view and drop the hash,
      // so the new snapshot is taken with the cover where it will rest.
      if (window.location.hash) return null;
      return coverFor(slug);
    }
    return null;
  };

  const update = async () => {
    const deadline = performance.now() + BUDGET_MS;
    // The old snapshot is taken; free the name before anything else can carry it.
    unname();
    go();
    if (mode === "open" || mode === "close") {
      const incoming = await waitFor(findIncoming, deadline);
      if (incoming) {
        name(incoming);
        // Whatever is left of the budget goes to letting its pixels arrive.
        await waitForMedia(incoming, deadline - performance.now());
      }
    } else {
      await waitFor(() => (window.location.pathname === target.pathname ? true : null), deadline);
    }
  };

  let transition: ViewTransition;
  try {
    transition = document.startViewTransition(update);
  } catch {
    cleanup();
    go();
    return true;
  }

  transition.ready.catch(() => {});
  transition.updateCallbackDone.catch(() => {});
  transition.finished.catch(() => {}).finally(cleanup);

  // Belt and braces: the navigation happens even if the browser never runs the
  // update callback, and the lock is released even if `finished` never settles.
  setTimeout(go, BUDGET_MS + 100);
  setTimeout(cleanup, BUDGET_MS + 1500);

  return true;
}
