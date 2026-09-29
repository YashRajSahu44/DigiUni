import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageHeader, Pill, SectionTitle, Surface } from "@/components/ui-bits";
import { examSchedule, previousResult, student, subjects } from "@/lib/demo-data";

export const Route = createFileRoute("/app/exams")({
  head: () => ({
    meta: [{ title: "Examination & Results — DigiUni" }],
  }),
  component: Exams,
});

function Exams() {
  const [resultOpen, setResultOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Examination & Results"
        subtitle="Upcoming exams, assessment marks and semester results"
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="rounded-xl" onClick={() => setScheduleOpen(true)}>
              Exam Schedule
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={() => setResultOpen(true)}>
              <FileText className="mr-2 size-4" /> View Full Result
            </Button>
            <Button
              className="rounded-xl"
              onClick={() => toast.success("Demo download started", { description: "Semester 2 result · DU-DEMO-RESULT.pdf" })}
            >
              <Download className="mr-2 size-4" /> Download Result
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        <section>
          <SectionTitle>Upcoming Exams</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {examSchedule.slice(0, 2).map((e) => (
              <Surface key={e.subject}>
                <Pill tone="danger">Upcoming</Pill>
                <div className="mt-2 font-display text-lg font-bold">{e.subject}</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {e.date} · {e.time} · {e.room}
                </p>
              </Surface>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>Exam Schedule</SectionTitle>
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
        </section>

        <section>
          <SectionTitle>Assessment Marks & Grades</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((s) => (
              <Surface key={s.name}>
                <div className="font-semibold">{s.name}</div>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Internal Assessment</div>
                    <div className="font-display text-2xl font-bold">{s.marks}/100</div>
                  </div>
                  <Pill tone="violet">Grade: {s.grade}</Pill>
                </div>
              </Surface>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>Results</SectionTitle>
          <Surface className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Previous semester result</div>
              <div className="font-display text-xl font-bold">{previousResult.semester}</div>
              <p className="mt-1 text-sm text-muted-foreground">Credits: {previousResult.credits}</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="font-display text-3xl font-bold">SGPA {previousResult.sgpa}</div>
              <Pill tone="success">{previousResult.status}</Pill>
            </div>
          </Surface>
        </section>
      </div>

      <Dialog open={resultOpen} onOpenChange={setResultOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Semester Result Preview</DialogTitle>
          </DialogHeader>
          <div className="surface soft-gradient space-y-3 p-5">
            <div className="text-center">
              <div className="font-display text-lg font-bold">{student.university}</div>
              <div className="text-sm text-muted-foreground">{previousResult.semester} Grade Card</div>
            </div>
            <div className="rounded-xl bg-card/80 p-4 text-sm">
              <div className="flex justify-between">
                <span>Student</span>
                <span className="font-medium">{student.name}</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span>Enrollment</span>
                <span className="font-medium">{student.enrollment}</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span>SGPA</span>
                <span className="font-display text-lg font-bold">{previousResult.sgpa}</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span>Status</span>
                <Pill tone="success">{previousResult.status}</Pill>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground">Demo document · Not an official transcript</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mid-semester Exam Schedule</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {examSchedule.map((e) => (
              <div key={e.subject} className="rounded-xl border border-border p-3 text-sm">
                <div className="font-semibold">{e.subject}</div>
                <div className="text-muted-foreground">
                  {e.date} · {e.time} · {e.room}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
