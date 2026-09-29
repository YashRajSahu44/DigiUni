import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, Pill, SectionTitle, Surface } from "@/components/ui-bits";
import { calendarEvents } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/calendar")({
  head: () => ({
    meta: [{ title: "Calendar — DigiUni" }],
  }),
  component: CalendarPage,
});

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const kindTone: Record<string, string> = {
  holiday: "warning",
  exam: "danger",
  event: "violet",
  academic: "primary",
};

function keyFor(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function CalendarPage() {
  const [cursor, setCursor] = useState(() => new Date(2026, 8, 1)); // Sep 2026
  const [selected, setSelected] = useState(29);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const monthLabel = cursor.toLocaleString("en-IN", { month: "long", year: "numeric" });

  const cells = useMemo(() => {
    const first = new Date(year, month, 1);
    const startPad = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayKey = "2026-09-29";
    const list: { day: number | null; key?: string; isToday?: boolean }[] = [];
    for (let i = 0; i < startPad; i++) list.push({ day: null });
    for (let d = 1; d <= daysInMonth; d++) {
      const key = keyFor(year, month, d);
      list.push({ day: d, key, isToday: key === todayKey });
    }
    while (list.length % 7 !== 0) list.push({ day: null });
    return list;
  }, [year, month]);

  const selectedKey = keyFor(year, month, selected);
  const selectedEvents = calendarEvents[selectedKey] ?? [];

  return (
    <div>
      <PageHeader title="Calendar" subtitle="Holidays, exams, events and academic days" />

      <div className="mb-4 flex flex-wrap gap-2">
        <Pill tone="warning">Holiday</Pill>
        <Pill tone="danger">Exam</Pill>
        <Pill tone="violet">Event</Pill>
        <Pill tone="primary">Academic</Pill>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <Surface>
          <div className="mb-4 flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setCursor(new Date(year, month - 1, 1))}
              aria-label="Previous month"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <h2 className="font-display text-lg font-bold">{monthLabel}</h2>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setCursor(new Date(year, month + 1, 1))}
              aria-label="Next month"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
            {WEEKDAYS.map((d) => (
              <div key={d} className="py-2">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((c, i) => {
              if (c.day == null) return <div key={`e-${i}`} className="aspect-square" />;
              const events = c.key ? calendarEvents[c.key] : undefined;
              const active = selected === c.day;
              return (
                <button
                  key={c.key}
                  onClick={() => setSelected(c.day!)}
                  className={cn(
                    "relative flex aspect-square flex-col items-center justify-start rounded-xl p-1 text-sm transition-colors",
                    active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                    c.isToday && !active && "ring-2 ring-primary/40",
                  )}
                >
                  <span className="font-semibold">{c.day}</span>
                  {events?.length ? (
                    <span className="mt-0.5 flex gap-0.5">
                      {events.slice(0, 3).map((e, idx) => (
                        <span
                          key={idx}
                          className={cn(
                            "size-1.5 rounded-full",
                            active ? "bg-primary-foreground" : e.kind === "holiday" ? "bg-warning" : e.kind === "exam" ? "bg-destructive" : e.kind === "event" ? "bg-violet" : "bg-primary",
                          )}
                        />
                      ))}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </Surface>

        <Surface>
          <SectionTitle>
            {selected} {monthLabel.split(" ")[0]}
          </SectionTitle>
          {selectedEvents.length ? (
            <div className="space-y-3">
              {selectedEvents.map((e) => (
                <div key={e.label} className="rounded-xl border border-border p-3">
                  <Pill tone={kindTone[e.kind]}>{e.kind}</Pill>
                  <div className="mt-2 text-sm font-semibold">{e.label}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No events scheduled for this date. Regular classes may apply.</p>
          )}
        </Surface>
      </div>
    </div>
  );
}
