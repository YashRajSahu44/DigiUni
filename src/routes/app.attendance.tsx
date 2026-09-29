import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Bar, PageHeader, Pill, Ring, SectionTitle, Surface } from "@/components/ui-bits";
import { attendanceTrend, subjects, student } from "@/lib/demo-data";

export const Route = createFileRoute("/app/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance — DigiUni" },
      { name: "description", content: "Overall and subject-wise attendance, trends and AI guidance to stay above the 75% requirement." },
      { property: "og:title", content: "Attendance — DigiUni" },
      { property: "og:description", content: "Subject-wise attendance, monthly trend and AI guidance." },
    ],
  }),
  component: Attendance,
});

function Attendance() {
  const attended = subjects.reduce((a, s) => a + s.attended, 0);
  const total = subjects.reduce((a, s) => a + s.total, 0);

  return (
    <div>
      <PageHeader title="Attendance" subtitle={`${student.semester} · Section ${student.section} · Requirement 75%`} />

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <Surface className="flex flex-col items-center">
          <Ring value={student.attendance} label="Overall" />
          <div className="mt-5 grid w-full grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-muted/60 p-2.5">
              <div className="font-display text-lg font-bold">{attended}</div>
              <div className="text-[11px] text-muted-foreground">Attended</div>
            </div>
            <div className="rounded-lg bg-muted/60 p-2.5">
              <div className="font-display text-lg font-bold">{total - attended}</div>
              <div className="text-[11px] text-muted-foreground">Missed</div>
            </div>
            <div className="rounded-lg bg-muted/60 p-2.5">
              <div className="font-display text-lg font-bold">75%</div>
              <div className="text-[11px] text-muted-foreground">Required</div>
            </div>
          </div>
        </Surface>

        <div className="space-y-4">
          <Surface>
            <SectionTitle>Subject-wise attendance</SectionTitle>
            <div className="space-y-4">
              {subjects.map((s) => (
                <div key={s.name}>
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{s.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {s.attended}/{s.total} classes · {s.faculty}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-bold">{s.attendance}%</span>
                      <Pill tone={s.attendance >= 85 ? "success" : s.attendance >= 75 ? "primary" : "danger"}>
                        {s.attendance >= 85 ? "Excellent" : s.attendance >= 75 ? "Safe" : "Shortage"}
                      </Pill>
                    </div>
                  </div>
                  <Bar value={s.attendance} tone={s.attendance >= 85 ? "success" : s.attendance >= 75 ? "primary" : "danger"} />
                </div>
              ))}
            </div>
          </Surface>

          <Surface>
            <SectionTitle>Monthly trend</SectionTitle>
            <div className="flex h-40 items-end gap-3">
              {attendanceTrend.map((m) => (
                <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="text-xs font-semibold">{m.value}%</div>
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="brand-gradient w-full rounded-t-lg transition-all duration-700"
                      style={{ height: `${m.value}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">{m.month}</div>
                </div>
              ))}
            </div>
          </Surface>

          <div className="surface flex gap-3 border-l-4 border-l-primary p-4">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
            <div>
              <div className="text-sm font-semibold">DigiUni AI insight</div>
              <p className="mt-1 text-sm text-foreground/80">
                Attend at least 3 of your next 4 Data Structures classes to move above 75%. Probability & Statistics needs
                2 more classes to reach a safe margin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
