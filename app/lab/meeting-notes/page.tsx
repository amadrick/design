import { notFound } from "next/navigation";
import { LabPage } from "@/components/vignettes/LabPage";
import MeetingNotesVignette from "@/components/vignettes/MeetingNotes";

export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <LabPage name="meeting-notes">
      <MeetingNotesVignette />
    </LabPage>
  );
}
