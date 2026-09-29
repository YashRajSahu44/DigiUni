import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader, Pill, SectionTitle, Surface } from "@/components/ui-bits";
import { hostelComplaints, hostelNotices, leaveRequests, messMenu, student } from "@/lib/demo-data";

export const Route = createFileRoute("/app/hostel")({
  head: () => ({
    meta: [{ title: "Hostel — DigiUni" }],
  }),
  component: Hostel,
});

function Hostel() {
  const [open, setOpen] = useState(false);
  const [complaints, setComplaints] = useState(hostelComplaints);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  function submit() {
    if (!title.trim()) return;
    const id = `HC-${340 + complaints.length}`;
    setComplaints([{ id, title, raised: "30 Sep 2026", status: "Open" }, ...complaints]);
    setOpen(false);
    setTitle("");
    setDesc("");
    toast.success("Complaint raised", { description: `Ticket ${id} created` });
  }

  return (
    <div>
      <PageHeader
        title="Hostel Dashboard"
        subtitle={`${student.hostel} · Room ${student.room}`}
        action={
          <Button className="rounded-xl" onClick={() => setOpen(true)}>
            Raise Complaint
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Hostel", student.hostel],
          ["Room", student.room],
          ["Bed", student.bed],
        ].map(([label, value]) => (
          <Surface key={label}>
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className="mt-1 font-display text-lg font-bold">{value}</div>
          </Surface>
        ))}
      </div>

      <Tabs defaultValue="room" className="mt-6">
        <TabsList className="mb-4 flex h-auto flex-wrap gap-1 rounded-full bg-transparent p-0">
          {[
            ["room", "Room Details"],
            ["mess", "Mess Menu"],
            ["notices", "Hostel Notices"],
            ["leave", "Leave Request"],
            ["complaints", "Complaints"],
          ].map(([v, l]) => (
            <TabsTrigger key={v} value={v} className="rounded-full border border-border data-[state=active]:bg-primary-soft">
              {l}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="room">
          <Surface className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Block</span>
              <span className="font-medium">A</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Floor</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Roommate</span>
              <span className="font-medium">Rohan Mehta</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Warden</span>
              <span className="font-medium">Mr. Suresh Patil</span>
            </div>
          </Surface>
        </TabsContent>

        <TabsContent value="mess" className="space-y-3">
          {messMenu.map((m) => (
            <Surface key={m.day}>
              <SectionTitle>{m.day}</SectionTitle>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Breakfast · </span>
                  {m.breakfast}
                </div>
                <div>
                  <span className="text-muted-foreground">Lunch · </span>
                  {m.lunch}
                </div>
                <div>
                  <span className="text-muted-foreground">Dinner · </span>
                  {m.dinner}
                </div>
              </div>
            </Surface>
          ))}
        </TabsContent>

        <TabsContent value="notices" className="space-y-3">
          {hostelNotices.map((n) => (
            <Surface key={n.title}>
              <div className="flex items-center justify-between gap-2">
                <div className="font-semibold">{n.title}</div>
                <span className="text-xs text-muted-foreground">{n.date}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{n.body}</p>
            </Surface>
          ))}
        </TabsContent>

        <TabsContent value="leave">
          <Surface className="divide-y divide-border p-0">
            {leaveRequests.map((l) => (
              <div key={l.id} className="flex items-center justify-between p-4">
                <div>
                  <div className="font-medium">{l.reason}</div>
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

        <TabsContent value="complaints" className="space-y-3">
          {complaints.map((c) => (
            <Surface key={c.id} className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold">{c.title}</div>
                <div className="text-xs text-muted-foreground">
                  {c.id} · Raised {c.raised}
                </div>
              </div>
              <Pill tone={c.status === "Resolved" ? "success" : c.status === "Open" ? "warning" : "primary"}>{c.status}</Pill>
            </Surface>
          ))}
        </TabsContent>
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Raise Hostel Complaint</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="ctitle">Subject</Label>
              <Input id="ctitle" className="mt-1" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Water leakage" />
            </div>
            <div>
              <Label htmlFor="cdesc">Description</Label>
              <Textarea id="cdesc" className="mt-1" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Describe the issue…" />
            </div>
            <Button className="w-full rounded-xl" onClick={submit}>
              Submit Complaint
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
