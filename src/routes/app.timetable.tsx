import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock } from "lucide-react";
import { PageHeader, Pill, SectionTitle, Surface } from "@/components/ui-bits";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { todayTimetable, weekTimetable, student } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/timetable")({
  head: () => ({
    meta: [{ title: "Timetable — DigiUni" }, { name: "description", content: "Today, week and month class schedule." }],
  }),
  component: Timetable,
});

const monthSlots = [
  { date: "29 Sep", day: "Mon", highlight: "Classes as scheduled" },
  { date: "30 Sep", day: "Tue", highlight: "TC assignment due" },
  { date: "01 Oct", day: "Wed", highlight: "AI case study due" },
  { date: "02 Oct", day: "Thu", highlight: "Holiday — Gandhi Jayanti" },
  { date: "03 Oct", day: "Fri", highlight: "P&S problem set due" },
  { date: "06 Oct", day: "Mon", highlight: "Regular classes" },
  { date: "10 Oct", day: "Fri", highlight: "Mid-sem begins — AI" },
];

function Timetable() {
  const [tab, setTab] = useState("today");
  const next = todayTimetable.find((p) => p.status === "next") ?? todayTimetable.find((p) => p.status === "now");

  return (
    <div>
      <PageHeader title="Timetable" subtitle={`${student.semester} · Section ${student.section}`} />

      <div className="surface mb-4 flex items-center gap-3 border-l-4 border-l-primary p-4">
        <Clock className="size-5 text-primary" />
        <div>
          <div className="text-sm font-semibold">Next class starts in 35 minutes</div>
          <p className="text-sm text-muted-foreground">
            {next?.subject} · {next?.time} · {next?.room} · {next?.faculty}
          </p>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4 rounded-full">
          <TabsTrigger value="today" className="rounded-full">
            Today
          </TabsTrigger>
          <TabsTrigger value="week" className="rounded-full">
            Week
          </TabsTrigger>
          <TabsTrigger value="month" className="rounded-full">
            Month
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <Surface className="overflow-x-auto p-0">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Period</th>
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-4 py-3 font-medium">Subject</th>
                  <th className="px-4 py-3 font-medium">Faculty</th>
                  <th className="px-4 py-3 font-medium">Room</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {todayTimetable.map((p, i) => (
                  <tr
                    key={p.time}
                    className={cn(
                      p.status === "now" && "bg-success/8",
                      p.status === "next" && "bg-primary-soft/60",
                      p.status === "done" && "opacity-60",
                    )}
                  >
                    <td className="px-4 py-3 font-medium">{i + 1}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{p.time}</td>
                    <td className="px-4 py-3 font-semibold">{p.subject}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.faculty}</td>
                    <td className="px-4 py-3">{p.room}</td>
                    <td className="px-4 py-3">
                      {p.status === "now" ? <Pill tone="success">Now</Pill> : null}
                      {p.status === "next" ? <Pill tone="primary">Next</Pill> : null}
                      {p.status === "done" ? <Pill tone="muted">Done</Pill> : null}
                      {p.status === "upcoming" ? <Pill tone="violet">Upcoming</Pill> : null}
                      {p.status === "free" ? <Pill tone="muted">Free</Pill> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Surface>

          <div className="mt-3 space-y-3 lg:hidden">
            {todayTimetable.map((p) => (
              <Surface key={p.time} className={cn(p.status === "now" && "border-success/40", p.status === "next" && "border-primary/40")}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">{p.time}</span>
                  {p.status === "now" ? <Pill tone="success">Now</Pill> : null}
                  {p.status === "next" ? <Pill tone="primary">Next</Pill> : null}
                </div>
                <div className="mt-1 font-semibold">{p.subject}</div>
                <div className="text-xs text-muted-foreground">
                  {p.faculty} · {p.room}
                </div>
              </Surface>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="week">
          <Surface className="overflow-x-auto p-0">
            <table className="w-full min-w-[480px] text-center text-sm">
              <thead className="border-b border-border bg-muted/40 text-xs text-muted-foreground">
                <tr>
                  <th className="px-3 py-3 text-left">Day</th>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <th key={n} className="px-3 py-3">
                      P{n}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {weekTimetable.map((d) => (
                  <tr key={d.day}>
                    <td className="px-3 py-3 text-left font-semibold">{d.day}</td>
                    {d.classes.map((c, i) => (
                      <td key={i} className="px-3 py-3">
                        <span className={cn("inline-flex min-w-10 justify-center rounded-lg px-2 py-1 text-xs font-medium", c === "—" ? "text-muted-foreground" : "bg-primary-soft text-accent-foreground")}>
                          {c}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Surface>
        </TabsContent>

        <TabsContent value="month">
          <SectionTitle>Upcoming schedule highlights</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {monthSlots.map((m) => (
              <Surface key={m.date}>
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold">{m.date}</span>
                  <Pill tone="primary">{m.day}</Pill>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{m.highlight}</p>
              </Surface>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
