/** The green dot. It marks the one thing that is still happening. */
export function NowDot() {
  return (
    <span className="now-dot" aria-hidden="true">
      <span className="now-dot-ring" />
      <span className="now-dot-core" />
    </span>
  );
}
