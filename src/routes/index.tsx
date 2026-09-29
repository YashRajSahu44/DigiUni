import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Sparkles, ShieldCheck, Users, BookOpen, ArrowRight, Bot, CreditCard, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DigiUni — Your University. One Digital Campus." },
      {
        name: "description",
        content:
          "DigiUni unifies attendance, timetable, fees, hostel, transport, placements and certificates into one AI-powered smart campus platform.",
      },
      { property: "og:title", content: "DigiUni — Your University. One Digital Campus." },
      {
        property: "og:description",
        content: "One AI-powered platform for students, parents, faculty and administrators.",
      },
    ],
  }),
  component: Landing,
});

const roles = [
  { label: "Student", icon: GraduationCap, to: "/app", desc: "Full campus experience" },
  { label: "Parent", icon: Users, to: "/parent", desc: "Weekly child overview" },
  { label: "Faculty", icon: BookOpen, to: "/admin", desc: "Class & analytics view" },
  { label: "Administrator", icon: ShieldCheck, to: "/admin", desc: "Campus-wide intelligence" },
];

const highlights = [
  { icon: Bot, title: "DigiUni AI copilot", desc: "Ask about attendance, fees or your next class — in text or voice." },
  { icon: Sparkles, title: "Personalized learning", desc: "Daily study plans built from your own academic signals." },
  { icon: CreditCard, title: "Fees & certificates", desc: "Pay dues and download verified digital documents instantly." },
  { icon: Bus, title: "Hostel & transport", desc: "Room details, complaints, mess menu and live bus tracking." },
];

function Landing() {
  return (
    <div className="soft-gradient min-h-screen">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="brand-gradient grid size-10 place-items-center rounded-xl text-primary-foreground">
              <GraduationCap className="size-6" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight">DIGIUNI</span>
          </div>

          <h1 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl">
            Your University.
            <br />
            <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">One Digital Campus.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            Everything you need for your academic and campus journey — attendance, timetable, exams, fees, hostel,
            transport, placements and certificates — powered by AI.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map((h) => (
              <div key={h.title} className="surface flex gap-3 p-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-accent-foreground">
                  <h.icon className="size-4.5" />
                </span>
                <div>
                  <div className="text-sm font-semibold">{h.title}</div>
                  <div className="text-xs text-muted-foreground">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold">Sign in to DigiUni</h2>
          <p className="mt-1 text-sm text-muted-foreground">Choose a demo role to enter the prototype instantly.</p>

          <div className="mt-6 grid gap-3">
            {roles.map((r) => (
              <Link
                key={r.label}
                to={r.to}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-card)]"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-accent-foreground">
                  <r.icon className="size-5" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold">{r.label}</span>
                  <span className="block text-xs text-muted-foreground">{r.desc}</span>
                </span>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>

          <Button asChild className="mt-6 h-12 w-full rounded-xl text-sm font-semibold">
            <Link to="/app">
              <Sparkles className="mr-2 size-4" /> Enter student demo
            </Link>
          </Button>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Prototype with fictional demo data. No real student records are used.
          </p>
        </div>
      </div>
    </div>
  );
}
