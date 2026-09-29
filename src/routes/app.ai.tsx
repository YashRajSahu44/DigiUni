import { createFileRoute } from "@tanstack/react-router";
import { AiChat } from "@/components/ai-chat";
import { PageHeader, Surface } from "@/components/ui-bits";

export const Route = createFileRoute("/app/ai")({
  head: () => ({
    meta: [{ title: "DigiUni AI — DigiUni" }],
  }),
  component: AiPage,
});

function AiPage() {
  return (
    <div>
      <PageHeader title="DigiUni AI" subtitle="Your campus copilot — ask about attendance, fees, classes and more" />
      <Surface className="h-[min(70vh,640px)] overflow-hidden p-0">
        <AiChat />
      </Surface>
    </div>
  );
}
