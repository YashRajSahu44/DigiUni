import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader, Pill, SectionTitle, Surface } from "@/components/ui-bits";
import { helpdeskCategories, tickets as initialTickets } from "@/lib/demo-data";

export const Route = createFileRoute("/app/helpdesk")({
  head: () => ({
    meta: [{ title: "Helpdesk — DigiUni" }],
  }),
  component: Helpdesk,
});

function Helpdesk() {
  const [tickets, setTickets] = useState(initialTickets);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(helpdeskCategories[0]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  function submit() {
    if (!subject.trim()) return;
    const id = `DU${1025 + tickets.length}`;
    setTickets([{ id, category, title: subject, status: "Open", updated: "Just now" }, ...tickets]);
    setOpen(false);
    setSubject("");
    setDescription("");
    toast.success("Ticket created successfully.", { description: `Ticket #${id}` });
  }

  return (
    <div>
      <PageHeader
        title="Student Helpdesk"
        subtitle="Unified support for campus services"
        action={
          <Button className="rounded-xl" onClick={() => setOpen(true)}>
            Raise New Ticket
          </Button>
        }
      />

      <SectionTitle>Categories</SectionTitle>
      <div className="mb-6 flex flex-wrap gap-2">
        {helpdeskCategories.map((c) => (
          <button
            key={c}
            onClick={() => {
              setCategory(c);
              setOpen(true);
            }}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:bg-primary-soft"
          >
            {c}
          </button>
        ))}
      </div>

      <SectionTitle>Your tickets</SectionTitle>
      <div className="space-y-3">
        {tickets.map((t) => (
          <Surface key={t.id} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs font-medium text-primary">
                Ticket #{t.id} · {t.category}
              </div>
              <div className="font-semibold">{t.title}</div>
              <div className="text-xs text-muted-foreground">Updated {t.updated}</div>
            </div>
            <Pill tone={t.status === "Resolved" ? "success" : t.status === "Open" ? "warning" : "primary"}>{t.status}</Pill>
          </Surface>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Raise New Ticket</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {helpdeskCategories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" className="mt-1 rounded-xl" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" className="mt-1 rounded-xl" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="file">Attachment</Label>
              <Input id="file" type="file" className="mt-1 rounded-xl" />
              <p className="mt-1 text-xs text-muted-foreground">Demo only — files are not uploaded.</p>
            </div>
            <Button className="w-full rounded-xl" onClick={submit}>
              Submit Ticket
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
