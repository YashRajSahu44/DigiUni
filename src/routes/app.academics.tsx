import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BookOpen, CalendarDays, ClipboardList, FileWarning, GraduationCap } from "lucide-react";
import { PageHeader, Pill, SectionTitle, Surface, Bar } from "@/components/ui-bits";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  assignments,
  backlogs,
  examSchedule,
  leaveRequests,
  performanceTrend,
  previousResult,
  student,
  subjects,
} from "@/lib/demo-data";

export const Route = createFileRoute("/app/academics")({
  head: () => ({
    meta: [
      { title: "Academic — DigiUni" },
      { name: "description", content: "Academic overview, marks, grades, exams and assignments for your current semester." },
    ],
  }),
  component: Academics,
});

function Academics() {
  return (
    <div>
      <PageHeader title="Academic" subtitle={`${student.course} · ${student.semester}`} />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
          {[
            ["overview", "Overview"],
            ["attendance", "Attendance"],
            ["marks", "Assessment Marks"],
            ["backlogs", "Backlogs"],
            ["grades", "Grades"],
            ["exams", "Exam Schedule"],
            ["assignments", "Assignments"],
            ["leave", "Leave Requests"],
          ].map(([v, label]) => (
            <TabsTrigger key={v} value={v} className="rounded-full border border-border data-[state=active]:border-primary data-[state=active]:bg-primary-soft">
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Current Semester", student.semester, GraduationCap],
              ["Program", student.course, BookOpen],
              ["Section", student.section, ClipboardList],
              ["Academic Year", student.academicYear, CalendarDays],
              ["CGPA", String(student.cgpa), Award],
              ["Credits Completed", String(student.creditsCompleted), FileWarning],
            ].map(([label, value, Icon]) => (
              <Surface key={label as string} className="flex items-start gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-primary-soft text-accent-foreground">
                  <Icon className="size-4" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">{label as string}</div>
                  <div className="mt-0.5 font-display text-lg font-bold">{value as string}</div>
                </div>
              </Surface>
            ))}
          </div>

          <Surface>
            <SectionTitle>Performance trend</SectionTitle>
            <div className="flex h-40 items-end gap-4">
              {performanceTrend.map((p) => (
                <div key={p.term} className="flex flex-1 flex-col items-center gap-2">
                  <div className="text-xs font-semibold">{p.cgpa}</div>
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="brand-gradient w-full rounded-t-lg"
                      style={{ height: `${(p.cgpa / 10) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">{p.term}</div>
                </div>
              ))}
            </div>
          </Surface>

          <SectionTitle>Subjects</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {subjects.map((s) => (
              <Surface key={s.name}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.faculty}</div>
                  </div>
                  <Pill tone="primary">{s.grade}</Pill>
                </div>
                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-muted-foreground">Internal marks</span>
                  <span className="font-medium">{s.marks}/100</span>
                </div>
                <div className="mt-2">
                  <Bar value={s.marks} />
                </div>
              </Surface>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="attendance">
          <Surface>
            <p className="mb-4 text-sm text-muted-foreground">Overall attendance {student.attendance}%. Open the Attendance module for full detail.</p>
            <div className="space-y-4">
              {subjects.map((s) => (
                <div key={s.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{s.name}</span>
                    <span className="font-semibold">{s.attendance}%</span>
                  </div>
                  <Bar value={s.attendance} tone={s.attendance >= 75 ? "primary" : "danger"} />
                </div>
              ))}
            </div>
            <Link to="/app/attendance" className="mt-4 inline-block text-sm font-medium text-primary">
              Open Attendance →
            </Link>
          </Surface>
        </TabsContent>

        <TabsContent value="marks">
          <div className="space-y-3">
            {subjects.map((s) => (
              <Surface key={s.name} className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-xs text-muted-foreground">Internal Assessment</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-xl font-bold">{s.marks}/100</div>
                  <Pill tone="primary">{s.grade}</Pill>
                </div>
              </Surface>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="backlogs">
          <Surface>
            {backlogs.length === 0 ? (
              <div className="py-8 text-center">
                <Pill tone="success">No backlogs</Pill>
                <p className="mt-3 text-sm text-muted-foreground">You have cleared all subjects to date. Keep it up!</p>
              </div>
            ) : (
              backlogs.map((b) => (
                <div key={b.subject} className="flex justify-between border-b border-border py-3 last:border-0">
                  <span>{b.subject}</span>
                  <Pill tone="warning">{b.status}</Pill>
                </div>
              ))
            )}
          </Surface>
        </TabsContent>

        <TabsContent value="grades">
          <Surface>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Previous result</div>
                <div className="font-display text-lg font-bold">{previousResult.semester}</div>
              </div>
              <div className="text-right">
                <div className="font-display text-2xl font-bold">{previousResult.sgpa} SGPA</div>
                <Pill tone="success">{previousResult.status}</Pill>
              </div>
            </div>
            <div className="divide-y divide-border">
              {subjects.map((s) => (
                <div key={s.name} className="flex items-center justify-between py-3">
                  <span className="text-sm">{s.name}</span>
                  <Pill tone="violet">{s.grade}</Pill>
                </div>
              ))}
            </div>
          </Surface>
        </TabsContent>

        <TabsContent value="exams">
          <Surface className="divide-y divide-border p-0">
            {examSchedule.map((e) => (
              <div key={e.subject} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-semibold">{e.subject}</div>
                  <div className="text-xs text-muted-foreground">{e.date} · {e.time}</div>
                </div>
                <Pill tone="primary">{e.room}</Pill>
              </div>
            ))}
          </Surface>
          <Link to="/app/exams" className="mt-3 inline-block text-sm font-medium text-primary">
            Open Examination & Results →
          </Link>
        </TabsContent>

        <TabsContent value="assignments">
          <Surface className="divide-y divide-border p-0">
            {assignments.map((a) => (
              <div key={a.title} className="flex items-center justify-between gap-3 p-4">
                <div>
                  <div className="font-medium">{a.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {a.subject} · due {a.due}
                  </div>
                </div>
                <Pill tone={a.status === "Pending" ? "warning" : "success"}>{a.status}</Pill>
              </div>
            ))}
          </Surface>
        </TabsContent>

        <TabsContent value="leave">
          <Surface className="divide-y divide-border p-0">
            {leaveRequests.map((l) => (
              <div key={l.id} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-medium">{l.id} · {l.reason}</div>
                  <div className="text-xs text-muted-foreground">
                    {l.from}
                    {l.to !== l.from ? ` – ${l.to}` : ""}
                  </div>
                </div>
                <Pill tone="success">{l.status}</Pill>
              </div>
            ))}
          </Surface>
        </TabsContent>
      </Tabs>
    </div>
  );
}
