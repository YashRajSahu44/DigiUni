import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PageHeader, Pill, SectionTitle, Surface, Bar } from "@/components/ui-bits";
import { fees, inr, student } from "@/lib/demo-data";

export const Route = createFileRoute("/app/fees")({
  head: () => ({
    meta: [{ title: "Fees & Payments — DigiUni" }],
  }),
  component: Fees,
});

function Fees() {
  const [payOpen, setPayOpen] = useState(false);
  const [method, setMethod] = useState("upi");
  const [step, setStep] = useState<"form" | "success">("form");
  const [paidLocal, setPaidLocal] = useState(false);
  const pending = paidLocal ? 0 : fees.pending;
  const paid = paidLocal ? fees.total : fees.paid;

  function proceed() {
    setTimeout(() => {
      setStep("success");
      setPaidLocal(true);
      toast.success("Payment Successful", { description: "Transaction ID: DU-DEMO-2026" });
    }, 900);
  }

  return (
    <div>
      <PageHeader
        title="Fees & Payments"
        subtitle={`${student.name} · ${student.enrollment}`}
        action={
          <Button
            className="rounded-xl"
            disabled={pending === 0}
            onClick={() => {
              setStep("form");
              setPayOpen(true);
            }}
          >
            <CreditCard className="mr-2 size-4" /> Pay {inr(pending || fees.pending)}
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Total Fees", inr(fees.total), "primary"],
          ["Paid", inr(paid), "success"],
          ["Pending", inr(pending), "warning"],
          ["Due Date", fees.due, "violet"],
        ].map(([label, value, tone]) => (
          <Surface key={label as string}>
            <div className="text-xs text-muted-foreground">{label as string}</div>
            <div className="mt-1 font-display text-2xl font-bold">{value as string}</div>
            <div className="mt-2">
              <Pill tone={tone as string}>{tone === "warning" && pending === 0 ? "Cleared" : (label as string)}</Pill>
            </div>
          </Surface>
        ))}
      </div>

      <div className="mt-2">
        <Bar value={(paid / fees.total) * 100} tone="success" />
        <p className="mt-1 text-xs text-muted-foreground">{Math.round((paid / fees.total) * 100)}% of total fees collected</p>
      </div>

      <section className="mt-6">
        <SectionTitle>Payment breakdown</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          {fees.breakdown.map((b) => (
            <Surface key={b.head} className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold">{b.head}</div>
                <div className="font-display text-xl font-bold">{inr(b.amount)}</div>
              </div>
              <Pill tone={b.status === "Paid" ? "success" : b.status === "Pending" ? "warning" : "primary"}>{b.status}</Pill>
            </Surface>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle>Payment history</SectionTitle>
        <Surface className="overflow-x-auto p-0">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {fees.history.map((h) => (
                <tr key={h.id}>
                  <td className="px-4 py-3 whitespace-nowrap">{h.date}</td>
                  <td className="px-4 py-3">{h.head}</td>
                  <td className="px-4 py-3 font-medium">{inr(h.amount)}</td>
                  <td className="px-4 py-3">
                    <Pill tone="success">{h.status}</Pill>
                  </td>
                </tr>
              ))}
              {paidLocal ? (
                <tr>
                  <td className="px-4 py-3">30 Sep 2026</td>
                  <td className="px-4 py-3">Pending dues — demo payment</td>
                  <td className="px-4 py-3 font-medium">{inr(fees.pending)}</td>
                  <td className="px-4 py-3">
                    <Pill tone="success">Paid</Pill>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </Surface>
      </section>

      <Dialog
        open={payOpen}
        onOpenChange={(o) => {
          setPayOpen(o);
          if (!o) setStep("form");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{step === "form" ? "Payment Summary" : "Payment Successful"}</DialogTitle>
          </DialogHeader>
          {step === "form" ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-muted/60 p-4 text-sm">
                <div className="flex justify-between">
                  <span>Student</span>
                  <span className="font-medium">{student.name}</span>
                </div>
                <div className="mt-2 flex justify-between">
                  <span>Amount</span>
                  <span className="font-display text-lg font-bold">{inr(fees.pending)}</span>
                </div>
              </div>
              <div>
                <div className="mb-2 text-sm font-medium">Payment Method</div>
                <RadioGroup value={method} onValueChange={setMethod} className="space-y-2">
                  {[
                    ["upi", "UPI"],
                    ["card", "Card"],
                    ["netbanking", "Net Banking"],
                  ].map(([v, label]) => (
                    <Label key={v} className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-3">
                      <RadioGroupItem value={v} />
                      {label}
                    </Label>
                  ))}
                </RadioGroup>
              </div>
              <Button className="h-11 w-full rounded-xl" onClick={proceed}>
                Proceed to Payment
              </Button>
              <p className="text-center text-xs text-muted-foreground">Demo only — no real payment is processed.</p>
            </div>
          ) : (
            <div className="space-y-4 py-4 text-center">
              <CheckCircle2 className="mx-auto size-14 text-success" />
              <div className="font-display text-xl font-bold">Payment Successful</div>
              <p className="text-sm text-muted-foreground">Transaction ID: DU-DEMO-2026</p>
              <Button className="rounded-xl" onClick={() => setPayOpen(false)}>
                Done
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
