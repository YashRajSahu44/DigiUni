import { createFileRoute } from "@tanstack/react-router";
import { Bus, MapPin, Phone } from "lucide-react";
import { PageHeader, Pill, SectionTitle, Surface } from "@/components/ui-bits";
import { transport } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/transport")({
  head: () => ({
    meta: [{ title: "Transport — DigiUni" }],
  }),
  component: Transport,
});

function Transport() {
  return (
    <div>
      <PageHeader title="Transport" subtitle="Assigned route, schedule and demo live tracking" />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Assigned Route", transport.route],
          ["Pickup", transport.pickup],
          ["Destination", "University Campus"],
          ["Bus Status", transport.status],
        ].map(([label, value]) => (
          <Surface key={label}>
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className="mt-1 font-display text-base font-bold leading-snug">{value}</div>
          </Surface>
        ))}
      </div>

      <div className="mt-2">
        <Pill tone="violet">Demo tracking data</Pill>
      </div>

      <Surface className="relative mt-6 overflow-hidden soft-gradient p-0">
        <div className="relative h-64 p-5 sm:h-72">
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, oklch(0.7 0.1 258 / 0.35), transparent 40%), radial-gradient(circle at 70% 60%, oklch(0.7 0.12 295 / 0.3), transparent 45%)" }} />
          <svg className="absolute inset-x-8 top-1/2 h-2 -translate-y-1/2" viewBox="0 0 400 8" preserveAspectRatio="none">
            <path d="M0 4 C80 0, 120 8, 200 4 S320 0, 400 4" stroke="var(--primary)" strokeWidth="3" fill="none" strokeDasharray="6 4" />
          </svg>
          <div className="absolute left-[8%] top-[28%] flex flex-col items-center gap-1">
            <span className="grid size-10 place-items-center rounded-full bg-card shadow-[var(--shadow-card)]">
              <MapPin className="size-5 text-primary" />
            </span>
            <span className="rounded-full bg-card px-2 py-0.5 text-[10px] font-medium shadow-sm">Campus</span>
          </div>
          <div className="absolute left-[48%] top-[42%] flex flex-col items-center gap-1">
            <span className="brand-gradient grid size-11 place-items-center rounded-full text-primary-foreground shadow-[var(--shadow-float)]">
              <Bus className="size-5" />
            </span>
            <span className="rounded-full bg-card px-2 py-0.5 text-[10px] font-medium shadow-sm">Bus · {transport.bus}</span>
          </div>
          <div className="absolute right-[10%] top-[55%] flex flex-col items-center gap-1">
            <span className="grid size-10 place-items-center rounded-full bg-warning/20 text-warning-foreground shadow-[var(--shadow-card)]">
              <MapPin className="size-5" />
            </span>
            <span className="rounded-full bg-card px-2 py-0.5 text-[10px] font-medium shadow-sm">Pickup</span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-card/90 p-3 text-sm backdrop-blur">
            <div className="font-semibold">{transport.status}</div>
            <div className="text-xs text-muted-foreground">{transport.path}</div>
          </div>
        </div>
      </Surface>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Surface>
          <SectionTitle>Route details & schedule</SectionTitle>
          <div className="space-y-3">
            {transport.stops.map((s, i) => (
              <div key={s.name} className="flex items-center gap-3">
                <span className={cn("grid size-8 place-items-center rounded-full text-xs font-bold", s.done ? "bg-success/15 text-success" : i === transport.stops.findIndex((x) => !x.done) ? "bg-primary-soft text-accent-foreground" : "bg-muted text-muted-foreground")}>
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.time}</div>
                </div>
                {s.done ? <Pill tone="success">Passed</Pill> : i === transport.stops.findIndex((x) => !x.done) ? <Pill tone="primary">Next</Pill> : <Pill tone="muted">Upcoming</Pill>}
              </div>
            ))}
          </div>
        </Surface>

        <Surface>
          <SectionTitle>Driver information</SectionTitle>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bus</span>
              <span className="font-medium">{transport.bus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Driver</span>
              <span className="font-medium">{transport.driver}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Contact</span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Phone className="size-3.5" /> {transport.contact}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pickup time</span>
              <span className="font-medium">{transport.time}</span>
            </div>
          </div>
        </Surface>
      </div>
    </div>
  );
}
