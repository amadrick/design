import type { ComponentType } from "react";
import type { VignetteName } from "@/lib/projects";
import ClaudeCodeVignette from "./ClaudeCode";
import CursorVignette from "./Cursor";
import GrokVignette from "./Grok";
import MeetingNotesVignette from "./MeetingNotes";

/** Coded covers for entries that have no footage yet. Swap for real media in lib/projects.ts. */
export const vignettes: Record<VignetteName, ComponentType> = {
  "claude-code": ClaudeCodeVignette,
  grok: GrokVignette,
  cursor: CursorVignette,
  "meeting-notes": MeetingNotesVignette,
};
