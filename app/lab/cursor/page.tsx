import { notFound } from "next/navigation";
import { LabPage } from "@/components/vignettes/LabPage";
import CursorVignette from "@/components/vignettes/Cursor";

export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <LabPage name="cursor">
      <CursorVignette />
    </LabPage>
  );
}
