import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, KeyRound, LogOut, Shield, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PageHeader, Pill, SectionTitle, Surface } from "@/components/ui-bits";
import { student } from "@/lib/demo-data";

export const Route = createFileRoute("/app/profile")({
  head: () => ({
    meta: [{ title: "Profile — DigiUni" }],
  }),
  component: Profile,
});

function Profile() {
  return (
    <div>
      <PageHeader title="My Profile" subtitle="Account, academics and preferences" />

      <Surface className="soft-gradient mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <span className="grid size-16 place-items-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground">AS</span>
        <div className="flex-1">
          <div className="font-display text-2xl font-bold">{student.name}</div>
          <div className="text-sm text-muted-foreground">{student.course}</div>
          <div className="mt-1 text-sm text-muted-foreground">
            {student.semester} · Section {student.section}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Pill tone="primary">{student.roll}</Pill>
            <Pill tone="violet">{student.enrollment}</Pill>
          </div>
        </div>
        <div className="surface grid size-28 place-items-center rounded-2xl bg-card p-3 text-center">
          <div className="text-[10px] text-muted-foreground">Digital ID</div>
          <div className="mt-1 font-mono text-xs font-bold">{student.enrollment}</div>
          <div className="mt-2 grid size-14 place-items-center rounded-lg border border-dashed border-primary/40">
            <User className="size-6 text-primary" />
          </div>
        </div>
      </Surface>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <SectionTitle>Academic information</SectionTitle>
          <Surface className="space-y-3 text-sm">
            {[
              ["University", student.university],
              ["Program", student.course],
              ["Semester", student.semester],
              ["Section", student.section],
              ["Academic year", student.academicYear],
              ["CGPA", String(student.cgpa)],
              ["Credits completed", String(student.creditsCompleted)],
              ["Email", student.email],
              ["Phone", student.phone],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3">
                <span className="text-muted-foreground">{k}</span>
                <span className="text-right font-medium">{v}</span>
              </div>
            ))}
          </Surface>
        </section>

        <section className="space-y-4">
          <div>
            <SectionTitle>Notification settings</SectionTitle>
            <Surface className="space-y-4">
              {[
                ["Exam alerts", true],
                ["Fee reminders", true],
                ["Assignment deadlines", true],
                ["Placement updates", false],
              ].map(([label, on]) => (
                <div key={label as string} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Bell className="size-4 text-muted-foreground" />
                    {label as string}
                  </div>
                  <Switch
                    defaultChecked={on as boolean}
                    onCheckedChange={() => toast.message("Preference saved", { description: "Demo setting updated locally" })}
                  />
                </div>
              ))}
            </Surface>
          </div>

          <div>
            <SectionTitle>Privacy & security</SectionTitle>
            <Surface className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl"
                onClick={() => toast.message("Privacy controls", { description: "Demo — profile visibility remains private to DigiUni." })}
              >
                <Shield className="mr-2 size-4" /> Privacy
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl"
                onClick={() => toast.message("Change password", { description: "Demo only — password is not changed." })}
              >
                <KeyRound className="mr-2 size-4" /> Change Password
              </Button>
              <Button asChild variant="outline" className="w-full justify-start rounded-xl text-destructive hover:text-destructive">
                <Link to="/">
                  <LogOut className="mr-2 size-4" /> Logout
                </Link>
              </Button>
            </Surface>
          </div>
        </section>
      </div>
    </div>
  );
}
