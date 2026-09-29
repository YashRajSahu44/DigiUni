import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageHeader, Pill, Surface } from "@/components/ui-bits";
import { notices } from "@/lib/demo-data";

export const Route = createFileRoute("/app/notices")({
  head: () => ({
    meta: [{ title: "News & Notices — DigiUni" }],
  }),
  component: Notices,
});

function Notices() {
  const [selected, setSelected] = useState<(typeof notices)[0] | null>(null);

  return (
    <div>
      <PageHeader title="News & Notices" subtitle="Official campus announcements and updates" />

      <div className="grid gap-3 sm:grid-cols-2">
        {notices.map((n) => (
          <button key={n.title} className="text-left" onClick={() => setSelected(n)}>
            <Surface className="h-full transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)]">
              <div className="flex items-center justify-between gap-2">
                <Pill tone="primary">{n.category}</Pill>
                <span className="text-xs text-muted-foreground">{n.date}</span>
              </div>
              <div className="mt-2 font-semibold">{n.title}</div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{n.desc}</p>
              <span className="mt-3 inline-block text-xs font-medium text-primary">View details →</span>
            </Surface>
          </button>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.title}</DialogTitle>
          </DialogHeader>
          {selected ? (
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Pill tone="primary">{selected.category}</Pill>
                <span className="text-muted-foreground">{selected.date}</span>
              </div>
              <p className="leading-relaxed text-foreground/85">{selected.desc}</p>
              <p className="rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
                Published by DigiUni Administration · Demo notice content
              </p>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
