import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageHeader, Pill, SectionTitle, Surface, Bar } from "@/components/ui-bits";
import { placements } from "@/lib/demo-data";

export const Route = createFileRoute("/app/placements")({
  head: () => ({
    meta: [{ title: "Placements — DigiUni" }],
  }),
  component: Placements,
});

function Placements() {
  const [companies, setCompanies] = useState(placements.companies);
  const [view, setView] = useState<(typeof companies)[0] | null>(null);
  const applications = companies.filter((c) => c.applied).length;

  function apply(name: string) {
    setCompanies((list) => list.map((c) => (c.name === name ? { ...c, applied: true } : c)));
    toast.success("Application submitted", { description: `${name} · demo application recorded` });
    setView(null);
  }

  return (
    <div>
      <PageHeader title="Placement Dashboard" subtitle="Opportunities matched to your profile" />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Profile Completion", `${placements.profileCompletion}%`],
          ["Eligible Opportunities", String(placements.eligible)],
          ["Applications", String(applications)],
          ["Upcoming Drives", String(placements.upcomingDrives)],
        ].map(([label, value]) => (
          <Surface key={label}>
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className="mt-1 font-display text-2xl font-bold">{value}</div>
          </Surface>
        ))}
      </div>
      <div className="mt-2">
        <Bar value={placements.profileCompletion} />
      </div>

      <section className="mt-6">
        <SectionTitle>Opportunities</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          {companies.map((c) => (
            <Surface key={c.name}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-display text-lg font-bold">{c.name}</div>
                  <div className="text-sm text-muted-foreground">{c.role}</div>
                </div>
                <Pill tone={c.eligible ? "success" : "danger"}>{c.eligible ? "Eligible" : "Not eligible"}</Pill>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">Package</div>
                  <div className="font-medium">{c.ctc}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Deadline</div>
                  <div className="font-medium">{c.deadline}</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">Match score {c.match}%</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="rounded-lg" onClick={() => setView(c)}>
                  View Opportunity
                </Button>
                <Button size="sm" className="rounded-lg" disabled={!c.eligible || c.applied} onClick={() => apply(c.name)}>
                  {c.applied ? "Applied" : "Apply"}
                </Button>
              </div>
            </Surface>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle>Suggested skills</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {placements.skills.map((s) => (
            <Pill key={s} tone="violet">
              {s}
            </Pill>
          ))}
        </div>
      </section>

      <Dialog open={!!view} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{view?.name}</DialogTitle>
          </DialogHeader>
          {view ? (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Role</span>
                <span className="font-medium">{view.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Package</span>
                <span className="font-medium">{view.ctc}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Drive date</span>
                <span className="font-medium">{view.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Deadline</span>
                <span className="font-medium">{view.deadline}</span>
              </div>
              <p className="rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
                Demo opportunity. Eligibility and CTC are fictional for prototype purposes.
              </p>
              <Button className="w-full rounded-xl" disabled={!view.eligible || view.applied} onClick={() => apply(view.name)}>
                {view.applied ? "Already applied" : "Apply now"}
              </Button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
