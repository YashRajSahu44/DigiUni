import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  Briefcase,
  Bus,
  CreditCard,
  LayoutGrid,
  Library,
  LifeBuoy,
  ShieldCheck,
} from "lucide-react";
import { PageHeader, Surface } from "@/components/ui-bits";

export const Route = createFileRoute("/app/services")({
  head: () => ({
    meta: [{ title: "Campus Services — DigiUni" }],
  }),
  component: Services,
});

const services = [
  { to: "/app/fees", label: "Fees & Payments", icon: CreditCard, desc: "Pay dues and view receipts" },
  { to: "/app/certificates", label: "Digital Certificates", icon: ShieldCheck, desc: "View and download documents" },
  { to: "/app/hostel", label: "Hostel", icon: LayoutGrid, desc: "Room, mess and complaints" },
  { to: "/app/transport", label: "Transport", icon: Bus, desc: "Route and bus tracking" },
  { to: "/app/library", label: "Library", icon: Library, desc: "Issued books and catalog" },
  { to: "/app/placements", label: "Placements", icon: Briefcase, desc: "Drives and applications" },
  { to: "/app/helpdesk", label: "Helpdesk", icon: LifeBuoy, desc: "Raise and track tickets" },
  { to: "/app/exams", label: "Examination & Results", icon: Award, desc: "Schedule and grades" },
];

function Services() {
  return (
    <div>
      <PageHeader title="Campus Services" subtitle="Quick access to everyday DigiUni modules" />
      <div className="grid gap-3 sm:grid-cols-2">
        {services.map((s) => (
          <Link key={s.to} to={s.to} className="block">
            <Surface className="flex items-center gap-3 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)]">
              <span className="grid size-11 place-items-center rounded-xl bg-primary-soft text-accent-foreground">
                <s.icon className="size-5" />
              </span>
              <div>
                <div className="font-semibold">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.desc}</div>
              </div>
            </Surface>
          </Link>
        ))}
      </div>
    </div>
  );
}
