import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, QrCode, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageHeader, Pill, Surface } from "@/components/ui-bits";
import { certificates, student } from "@/lib/demo-data";

export const Route = createFileRoute("/app/certificates")({
  head: () => ({
    meta: [{ title: "Digital Certificates — DigiUni" }],
  }),
  component: Certificates,
});

function Certificates() {
  const [view, setView] = useState<(typeof certificates)[0] | null>(null);

  return (
    <div>
      <PageHeader title="Digital Certificates" subtitle="Verified documents issued to your DigiUni ID" />

      <div className="grid gap-4 sm:grid-cols-2">
        {certificates.map((c) => (
          <Surface key={c.id} className="flex flex-col">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-display text-lg font-bold">{c.name}</div>
                <div className="text-sm text-muted-foreground">{c.subtitle}</div>
              </div>
              <Pill tone="success">{c.status}</Pill>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">Issued {c.issued} · ID {c.id}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" className="rounded-lg" onClick={() => setView(c)}>
                View
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-lg"
                onClick={() => toast.success("Download started", { description: `${c.name} · demo PDF` })}
              >
                <Download className="mr-1.5 size-3.5" /> Download
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-lg"
                onClick={() => toast.message("Certificate verified", { description: `${c.id} · DigiUni registry match` })}
              >
                <ShieldCheck className="mr-1.5 size-3.5" /> Verify
              </Button>
            </div>
          </Surface>
        ))}
      </div>

      <Dialog open={!!view} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Certificate Preview</DialogTitle>
          </DialogHeader>
          {view ? (
            <div className="surface soft-gradient relative overflow-hidden p-6 text-center">
              <div className="absolute inset-x-6 top-6 h-px bg-primary/30" />
              <div className="absolute inset-x-6 bottom-6 h-px bg-primary/30" />
              <ShieldCheck className="mx-auto size-8 text-primary" />
              <div className="mt-3 font-display text-xl font-extrabold">{student.university}</div>
              <div className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Certificate of</div>
              <div className="mt-1 font-display text-2xl font-bold">{view.name}</div>
              <p className="mt-2 text-sm text-muted-foreground">{view.subtitle}</p>
              <p className="mt-4 text-sm">
                Awarded to <span className="font-semibold">{student.name}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {student.course} · {student.enrollment}
              </p>
              <div className="mx-auto mt-5 grid size-20 place-items-center rounded-lg border-2 border-dashed border-primary/40 bg-card">
                <QrCode className="size-10 text-primary" />
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground">Scan to verify · {view.id}</p>
              <p className="mt-3 text-xs text-muted-foreground">Issued {view.issued} · Status: Verified</p>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
