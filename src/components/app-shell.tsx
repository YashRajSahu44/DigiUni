import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Award,
  Bell,
  Bot,
  Bus,
  BookOpen,
  Briefcase,
  CalendarDays,
  ChevronDown,
  CreditCard,
  GraduationCap,
  Home,
  LayoutGrid,
  LifeBuoy,
  Lightbulb,
  Library,
  LogOut,
  Megaphone,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { AiChat } from "@/components/ai-chat";
import { notifications, searchIndex, student } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const nav = [
  {
    group: "Overview",
    items: [
      { to: "/app", label: "Dashboard", icon: Home },
      { to: "/app/notices", label: "News & Notices", icon: Megaphone },
      { to: "/app/calendar", label: "Calendar", icon: CalendarDays },
    ],
  },
  {
    group: "Academics",
    items: [
      { to: "/app/academics", label: "Academic", icon: BookOpen },
      { to: "/app/attendance", label: "Attendance", icon: GraduationCap },
      { to: "/app/timetable", label: "Timetable", icon: CalendarDays },
      { to: "/app/exams", label: "Examination & Results", icon: Award },
    ],
  },
  {
    group: "Campus services",
    items: [
      { to: "/app/fees", label: "Fees & Payments", icon: CreditCard },
      { to: "/app/certificates", label: "Digital Certificates", icon: ShieldCheck },
      { to: "/app/hostel", label: "Hostel", icon: LayoutGrid },
      { to: "/app/transport", label: "Transport", icon: Bus },
      { to: "/app/library", label: "Library", icon: Library },
      { to: "/app/placements", label: "Placements", icon: Briefcase },
      { to: "/app/helpdesk", label: "Helpdesk", icon: LifeBuoy },
    ],
  },
  {
    group: "Intelligence",
    items: [
      { to: "/app/ai", label: "DigiUni AI", icon: Bot },
      { to: "/app/learning", label: "Personalized Learning", icon: Lightbulb },
      { to: "/app/insights", label: "Performance Insights", icon: Sparkles },
    ],
  },
];

function Brand() {
  return (
    <Link to="/app" className="flex items-center gap-2.5">
      <span className="brand-gradient grid size-9 place-items-center rounded-xl text-primary-foreground">
        <GraduationCap className="size-5" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-base font-extrabold tracking-tight">DigiUni</span>
        <span className="block text-[11px] text-muted-foreground">Smart Digital Campus</span>
      </span>
    </Link>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="space-y-5 px-3 pb-8">
      {nav.map((section) => (
        <div key={section.group}>
          <div className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {section.group}
          </div>
          <div className="space-y-0.5">
            {section.items.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/75 hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className={cn("size-4", active && "text-primary")} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

function GlobalSearch({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl overflow-hidden p-0">
        <DialogTitle className="sr-only">Search DigiUni</DialogTitle>
        <Command>
          <CommandInput placeholder="Search services, subjects, notices, tickets…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {["Service", "Subject", "AI", "Helpdesk", "Certificate"].map((group) => {
              const items = searchIndex.filter((s) => s.group === group);
              if (!items.length) return null;
              return (
                <CommandGroup key={group} heading={group}>
                  {items.map((item) => (
                    <CommandItem
                      key={item.title}
                      value={item.title}
                      onSelect={() => {
                        onOpenChange(false);
                        navigate({ to: item.to });
                      }}
                    >
                      <Search className="mr-2 size-3.5 text-muted-foreground" />
                      {item.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

export function AiSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetTitle className="sr-only">DigiUni AI assistant</SheetTitle>
        <AiChat compact />
      </SheetContent>
    </Sheet>
  );
}

const bottomNav = [
  { to: "/app", label: "Home", icon: Home },
  { to: "/app/academics", label: "Academics", icon: BookOpen },
  { to: "/app/services", label: "Services", icon: LayoutGrid },
  { to: "/app/profile", label: "Profile", icon: User },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const unread = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="px-5 py-4">
          <Brand />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <NavList />
        </div>
        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={() => setAiOpen(true)}
            className="brand-gradient flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Sparkles className="size-4" /> Ask DigiUni AI
          </button>
        </div>
      </aside>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="px-5 py-4 text-left">
            <Brand />
          </SheetTitle>
          <div className="h-[calc(100vh-72px)] overflow-y-auto">
            <NavList onNavigate={() => setMenuOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-border bg-card/85 backdrop-blur">
          <div className="flex h-16 items-center gap-2 px-4 sm:px-6">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <Menu className="size-5" />
            </Button>
            <div className="lg:hidden">
              <Brand />
            </div>

            <button
              onClick={() => setSearchOpen(true)}
              className="ml-auto hidden w-full max-w-sm items-center gap-2 rounded-full border border-border bg-muted/60 px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted lg:ml-0 lg:flex"
            >
              <Search className="size-4" />
              Search services, subjects, notices…
              <kbd className="ml-auto rounded border border-border bg-card px-1.5 py-0.5 text-[10px]">⌘K</kbd>
            </button>

            <div className="ml-auto flex items-center gap-1">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSearchOpen(true)} aria-label="Search">
                <Search className="size-5" />
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                    <Bell className="size-5" />
                    {unread ? (
                      <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                        {unread}
                      </span>
                    ) : null}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 p-0">
                  <div className="flex items-center justify-between border-b border-border px-4 py-3">
                    <span className="font-display text-sm font-semibold">Notifications</span>
                    <span className="text-xs text-muted-foreground">{unread} unread</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.title} className="flex gap-3 border-b border-border px-4 py-3 last:border-0">
                        <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", n.unread ? "bg-primary" : "bg-border")} />
                        <div>
                          <div className="text-xs font-medium text-primary">{n.type}</div>
                          <div className="text-sm">{n.title}</div>
                          <div className="text-xs text-muted-foreground">{n.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                variant="ghost"
                size="icon"
                className="hidden text-primary sm:inline-flex"
                onClick={() => setAiOpen(true)}
                aria-label="DigiUni AI"
              >
                <Sparkles className="size-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="ml-1 flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-2.5 transition-colors hover:bg-muted">
                    <span className="grid size-7 place-items-center rounded-full bg-primary-soft text-xs font-bold text-accent-foreground">
                      AS
                    </span>
                    <span className="hidden text-sm font-medium sm:block">{student.firstName}</span>
                    <ChevronDown className="size-3.5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="text-sm font-semibold">{student.name}</div>
                    <div className="text-xs font-normal text-muted-foreground">{student.course}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/app/profile">
                      <User className="mr-2 size-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/app/profile">
                      <Settings className="mr-2 size-4" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="text-xs text-muted-foreground">Switch demo role</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link to="/parent">
                      <Users className="mr-2 size-4" /> Parent portal
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin">
                      <ShieldCheck className="mr-2 size-4" /> Administrator
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/">
                      <LogOut className="mr-2 size-4" /> Log out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:pb-12">{children}</main>
      </div>

      {/* Mobile bottom navigation */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        <div className="relative grid grid-cols-5 items-end">
          {bottomNav.slice(0, 2).map((item) => (
            <BottomLink key={item.to} {...item} active={pathname === item.to} />
          ))}
          <div className="flex justify-center">
            <button
              onClick={() => setAiOpen(true)}
              className="brand-gradient -mt-6 grid size-14 place-items-center rounded-full text-primary-foreground shadow-[var(--shadow-float)]"
              aria-label="DigiUni AI"
            >
              <Sparkles className="size-6" />
            </button>
          </div>
          {bottomNav.slice(2).map((item) => (
            <BottomLink key={item.to} {...item} active={pathname === item.to} />
          ))}
        </div>
      </div>

      <button
        onClick={() => setAiOpen(true)}
        className="brand-gradient fixed bottom-6 right-6 z-30 hidden size-14 place-items-center rounded-full text-primary-foreground shadow-[var(--shadow-float)] transition-transform hover:scale-105 lg:grid"
        aria-label="DigiUni AI"
      >
        <Sparkles className="size-6" />
      </button>

      <AiSheet open={aiOpen} onOpenChange={setAiOpen} />
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}

function BottomLink({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: typeof Home;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
        active ? "text-primary" : "text-muted-foreground",
      )}
    >
      <Icon className="size-5" />
      {label}
    </Link>
  );
}
