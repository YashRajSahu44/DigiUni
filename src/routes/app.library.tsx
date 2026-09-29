import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader, Pill, SectionTitle, Surface } from "@/components/ui-bits";
import { library } from "@/lib/demo-data";

export const Route = createFileRoute("/app/library")({
  head: () => ({
    meta: [{ title: "Library — DigiUni" }],
  }),
  component: Library,
});

function Library() {
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return library.catalog;
    return library.catalog.filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
  }, [query]);

  return (
    <div>
      <PageHeader
        title="Library"
        subtitle="Issued books, renewals and catalog search"
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="rounded-xl" onClick={() => setShowSearch(true)}>
              <Search className="mr-2 size-4" /> Search Library
            </Button>
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => document.getElementById("issued")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Issued Books
            </Button>
          </div>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Books Issued", String(library.issuedCount)],
          ["Due Soon", String(library.dueSoon)],
          ["Overdue", String(library.overdue)],
        ].map(([label, value]) => (
          <Surface key={label}>
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className="mt-1 font-display text-2xl font-bold">{value}</div>
          </Surface>
        ))}
      </div>

      {showSearch ? (
        <Surface className="mt-6">
          <SectionTitle>Search catalog</SectionTitle>
          <Input
            autoFocus
            placeholder="Search by title or author…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-xl"
          />
          <div className="mt-3 space-y-2">
            {results.map((b) => (
              <div key={b.title} className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
                <div>
                  <div className="text-sm font-medium">{b.title}</div>
                  <div className="text-xs text-muted-foreground">{b.author}</div>
                </div>
                <Pill tone={b.available > 0 ? "success" : "danger"}>{b.available > 0 ? `${b.available} available` : "Unavailable"}</Pill>
              </div>
            ))}
          </div>
        </Surface>
      ) : null}

      <section id="issued" className="mt-6">
        <SectionTitle>Currently issued books</SectionTitle>
        <div className="space-y-3">
          {library.issued.map((b) => (
            <Surface key={b.title} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-semibold">{b.title}</div>
                <div className="text-xs text-muted-foreground">
                  {b.author} · Due: {b.due}
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="rounded-lg"
                onClick={() => toast.success("Renewal requested", { description: `${b.title} extended by 7 days (demo)` })}
              >
                Renew Book
              </Button>
            </Surface>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle>Recommended</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          {library.recommended.map((b) => (
            <Surface key={b.title}>
              <div className="font-medium">{b.title}</div>
              <div className="text-xs text-muted-foreground">{b.author}</div>
            </Surface>
          ))}
        </div>
      </section>
    </div>
  );
}
