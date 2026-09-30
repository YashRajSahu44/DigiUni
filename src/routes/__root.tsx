import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DigiUni — Smart Digital Campus" },
      {
        name: "description",
        content: "DigiUni student digital campus — attendance, timetable, fees, hostel, transport and AI in one place.",
      },
      { name: "author", content: "DigiUni" },
      { property: "og:title", content: "DigiUni — Smart Digital Campus" },
      {
        property: "og:description",
        content: "Your university. One digital campus.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "apple-touch-icon", href: "/favicon-32.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("digiuni-theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const preferredTheme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : systemDark ? "dark" : "light";

    root.classList.toggle("dark", preferredTheme === "dark");
    root.style.colorScheme = preferredTheme;
    localStorage.setItem("digiuni-theme", preferredTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem("digiuni-theme")) {
        root.classList.toggle("dark", event.matches);
        root.style.colorScheme = event.matches ? "dark" : "light";
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    const playClickSound = () => {
      const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtor) return;

      const ctx = (window as typeof window & { __digiuniAudioCtx?: AudioContext }).__digiuniAudioCtx ?? new AudioCtor();
      (window as typeof window & { __digiuniAudioCtx?: AudioContext }).__digiuniAudioCtx = ctx;

      if (ctx.state === "suspended") {
        void ctx.resume();
      }

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const now = ctx.currentTime;

      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(580, now);
      oscillator.frequency.exponentialRampToValueAtTime(830, now + 0.08);

      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.exponentialRampToValueAtTime(0.035, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.13);
    };

    document.addEventListener("click", playClickSound, { passive: true });

    return () => {
      document.removeEventListener("click", playClickSound);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
