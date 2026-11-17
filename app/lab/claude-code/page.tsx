import { notFound } from "next/navigation";
import { LabPage } from "@/components/vignettes/LabPage";
import ClaudeCodeVignette from "@/components/vignettes/ClaudeCode";

export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <LabPage name="claude-code">
      <ClaudeCodeVignette />
    </LabPage>
  );
}
