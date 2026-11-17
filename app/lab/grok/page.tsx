import { notFound } from "next/navigation";
import { LabPage } from "@/components/vignettes/LabPage";
import GrokVignette from "@/components/vignettes/Grok";

export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <LabPage name="grok">
      <GrokVignette />
    </LabPage>
  );
}
