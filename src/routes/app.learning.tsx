import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Pill, SectionTitle, Surface, Bar } from "@/components/ui-bits";
import { examSchedule, resources, studyPlan, subjects } from "@/lib/demo-data";

export const Route = createFileRoute("/app/learning")({
  head: () => ({
    meta: [{ title: "Personalized Learning — DigiUni" }],
  }),
  component: Learning,
});

function Learning() {
  const weak = subjects.filter((s) => s.marks < 80 || s.attendance < 75);

  return (
    <div>
      <PageHeader title="Personalized Learning" subtitle="Your recommended study plan based on demo academic signals" />

      <Surface className="soft-gradient mb-6">
        <SectionTitle>Your recommended study plan</SectionTitle>
        <p className="mb-4 text-sm text-muted-foreground">Today's focus blocks</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {studyPlan.map((s) => (
            <div key={s.subject} className="rounded-xl bg-card/90 p-4 shadow-[var(--shadow-card)]">
              <div className="font-semibold">{s.subject}</div>
              <div className="mt-1 font-display text-2xl font-bold">{s.minutes} min</div>
              <p className="mt-2 text-xs text-muted-foreground">{s.reason}</p>
              <div className="mt-3">
                <Bar value={s.progress} />
                <div className="mt-1 text-xs text-muted-foreground">{s.progress}% progress</div>
              </div>
            </div>
          ))}
        </div>
      </Surface>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <SectionTitle>Weak areas</SectionTitle>
          <div className="space-y-3">
            {weak.map((s) => (
              <Surface key={s.name}>
                <div className="flex items-center justify-between gap-2">
                  <div className="font-semibold">{s.name}</div>
                  <Pill tone="warning">{s.marks}/100</Pill>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Attendance {s.attendance}% · Focus recommended
                </p>
              </Surface>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>Recommended topics</SectionTitle>
          <div className="space-y-3">
            {resources.map((r) => (
              <Surface key={r.title}>
                <div className="flex items-center gap-2">
                  <Pill tone="violet">{r.type}</Pill>
                  <span className="text-xs text-muted-foreground">{r.mins} min</span>
                </div>
                <div className="mt-2 text-sm font-semibold">{r.title}</div>
                <div className="text-xs text-muted-foreground">{r.subject}</div>
              </Surface>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>Study progress</SectionTitle>
          <Surface className="space-y-4">
            {studyPlan.map((s) => (
              <div key={s.subject}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{s.subject}</span>
                  <span className="font-medium">{s.progress}%</span>
                </div>
                <Bar value={s.progress} tone={s.progress >= 70 ? "success" : "primary"} />
              </div>
            ))}
          </Surface>
        </section>

        <section>
          <SectionTitle>Upcoming exams</SectionTitle>
          <Surface className="divide-y divide-border p-0">
            {examSchedule.map((e) => (
              <div key={e.subject} className="p-4">
                <div className="font-semibold">{e.subject}</div>
                <div className="text-xs text-muted-foreground">
                  {e.date} · {e.time}
                </div>
              </div>
            ))}
          </Surface>
          <Link to="/app/exams" className="mt-2 inline-block text-sm font-medium text-primary">
            Open Examination & Results →
          </Link>
        </section>
      </div>
    </div>
  );
}
