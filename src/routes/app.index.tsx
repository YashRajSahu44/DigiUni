import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  Bus,
  CalendarDays,
  CreditCard,
  FileCheck2,
  GraduationCap,
  LifeBuoy,
  NotebookPen,
  QrCode,
  ShieldCheck,
  Sparkles,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pill, SectionTitle, StatCard } from "@/components/ui-bits";
import { assignments, insights, notices, student, todayTimetable, inr, fees } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — DigiUni" },
      { name: "description", content: "Your personalized campus overview: attendance, classes, fees, exams and AI insights." },
      { property: "og:title", content: "Student Dashboard — DigiUni" },
      { property: "og:description", content: "Attendance, classes, fees, exams and AI insights in one place." },
    ],
  }),
  component: Dashboard,
});

const quickActions = [
  { label: "Scan ID", icon: QrCode, to: "/app/profile" },
  { label: "Attendance", icon: GraduationCap, to: "/app/attendance" },
  { label: "Timetable", icon: CalendarDays, to: "/app/timetable" },
  { label: "Pay Fees", icon: CreditCard, to: "/app/fees" },
  { label: "Certificates", icon: ShieldCheck, to: "/app/certificates" },
  { label: "Complaint", icon: LifeBuoy, to: "/app/helpdesk" },
  { label: "Bus Tracking", icon: Bus, to: "/app/transport" },
  { label: "AI Assistant", icon: Sparkles, to: "/app/ai" },
];

const toneFor: Record<string, string> = {
  warning: "warning",
  info: "primary",
  violet: "violet",
  success: "success",
};

function openAi() {
  window.dispatchEvent(new Event("digiuni:open-ai"));
}

function Dashboard() {
  const now = todayTimetable.find((p) => p.status === "now");
  const next = todayTimetable.find((p) => p.status === "next");

  return (
    <div className="space-y-8">
      <section className="surface soft-gradient overflow-hidden p-5 sm:p-6">
        <p className="text-sm text-muted-foreground">Good morning, {student.firstName} 👋</p>
        <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">Here's your campus overview for today.</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {student.course} · {student.semester} · Section {student.section}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Pill tone="primary">Now: {now?.subject ?? "Free period"}</Pill>
          <Pill tone="violet">
            Next: {next?.subject} · {next?.room}
          </Pill>
          <Pill tone="warning">
            {inr(fees.pending)} due {fees.dueShort}
          </Pill>
        </div>
      </section>

      <section>
        <SectionTitle>Smart overview</SectionTitle>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          <StatCard
            to="/app/attendance"
            label="Attendance"
            value="82%"
            hint="Overall attendance"
            sub="2 subjects need attention"
            icon={<GraduationCap className="size-4.5" />}
          />
          <StatCard
            to="/app/timetable"
            label="Next class"
            value="AI"
            hint="Artificial Intelligence"
            sub="11:15 AM · AL-304-P"
            tone="violet"
            icon={<CalendarDays className="size-4.5" />}
          />
          <StatCard
            to="/app/fees"
            label="Fees"
            value={inr(fees.pending)}
            hint="Pending"
            sub={`Due ${fees.dueShort}`}
            tone="warning"
            icon={<CreditCard className="size-4.5" />}
          />
          <StatCard
            to="/app/academics"
            label="Assignments"
            value="3"
            hint="Due this week"
            sub="Earliest: 01 Oct"
            tone="teal"
            icon={<NotebookPen className="size-4.5" />}
          />
          <StatCard
            to="/app/exams"
            label="Exams"
            value="12 days"
            hint="Next examination"
            sub="Mid-sem begins 10 Oct"
            tone="danger"
            icon={<Award className="size-4.5" />}
          />
          <StatCard
            to="/app/certificates"
            label="Certificates"
            value="4"
            hint="Available digitally"
            sub="All verified"
            tone="success"
            icon={<FileCheck2 className="size-4.5" />}
          />
        </div>
      </section>

      <section>
        <SectionTitle>Quick actions</SectionTitle>
        <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-8">
          {quickActions.map((a) => (
            <Link
              key={a.label}
              to={a.to}
              className="surface flex flex-col items-center gap-2 p-3 text-center transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)]"
            >
              <span className="grid size-9 place-items-center rounded-xl bg-primary-soft text-accent-foreground">
                <a.icon className="size-4.5" />
              </span>
              <span className="text-[11px] font-medium leading-tight">{a.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <SectionTitle
            action={
              <Button size="sm" className="rounded-full" onClick={openAi}>
                <Sparkles className="mr-1.5 size-3.5" /> Ask DigiUni AI
              </Button>
            }
          >
            <span className="inline-flex items-center gap-2">
              <Sparkles className="size-4 text-primary" /> DigiUni Intelligence
            </span>
          </SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {insights.map((i) => (
              <div key={i.title} className="surface p-4">
                <Pill tone={toneFor[i.tone]}>{i.title}</Pill>
                <p className="mt-2.5 text-sm leading-relaxed text-foreground/80">{i.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            These are intelligent recommendations generated from demo data — not guaranteed predictions.
          </p>
        </div>

        <div>
          <SectionTitle
            action={
              <Link to="/app/timetable" className="text-xs font-medium text-primary">
                Full timetable
              </Link>
            }
          >
            Today's schedule
          </SectionTitle>
          <div className="surface divide-y divide-border">
            {todayTimetable.map((p) => (
              <div key={p.time} className={cn("flex items-center gap-3 p-3.5", p.status === "done" && "opacity-55")}>
                <div className="w-20 shrink-0 text-xs font-medium text-muted-foreground">{p.time}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{p.subject}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {p.faculty} · {p.room}
                  </div>
                </div>
                {p.status === "now" ? <Pill tone="success">Now</Pill> : null}
                {p.status === "next" ? <Pill tone="primary">Next</Pill> : null}
                {p.status === "free" ? <Clock className="size-4 text-muted-foreground" /> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div>
          <SectionTitle
            action={
              <Link to="/app/notices" className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                View all <ArrowRight className="size-3.5" />
              </Link>
            }
          >
            Important notices
          </SectionTitle>
          <div className="space-y-3">
            {notices.slice(0, 3).map((n) => (
              <Link key={n.title} to="/app/notices" className="surface block p-4 transition-colors hover:bg-muted/40">
                <div className="flex items-center justify-between gap-2">
                  <Pill tone="primary">{n.category}</Pill>
                  <span className="text-xs text-muted-foreground">{n.date}</span>
                </div>
                <div className="mt-2 text-sm font-semibold">{n.title}</div>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{n.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle>Assignments due</SectionTitle>
          <div className="surface divide-y divide-border">
            {assignments.map((a) => (
              <div key={a.title} className="flex items-center gap-3 p-3.5">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{a.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {a.subject} · due {a.due}
                  </div>
                </div>
                <Pill tone={a.status === "Pending" ? "warning" : "success"}>{a.status}</Pill>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
