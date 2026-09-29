import { useEffect, useRef, useState } from "react";
import { Mic, Send, Sparkles, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { answer, suggestedPrompts } from "@/lib/ai-brain";
import { cn } from "@/lib/utils";

type Msg = { role: "ai" | "user"; text: string };

const greeting: Msg = {
  role: "ai",
  text: "Hi! I'm DigiUni AI. I can see your attendance, timetable, fees, exams and campus services. How can I help you today?",
};

export function AiChat({ compact = false }: { compact?: boolean }) {
  const [messages, setMessages] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  function send(text: string) {
    const q = text.trim();
    if (!q || typing) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: answer(q) }]);
      setTyping(false);
    }, 750);
  }

  function simulateVoice() {
    if (listening || typing) return;
    setListening(true);
    window.setTimeout(() => {
      setListening(false);
      send("DigiUni, when is my next class?");
    }, 1900);
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <span className="brand-gradient grid size-10 place-items-center rounded-xl text-primary-foreground">
          <Sparkles className="size-5" />
        </span>
        <div>
          <div className="font-display text-sm font-semibold">DigiUni AI</div>
          <div className="text-xs text-muted-foreground">Your campus copilot</div>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-success/12 px-2.5 py-1 text-xs font-medium text-success">
          <span className="size-1.5 rounded-full bg-success" /> Online
        </span>
      </div>

      <div className={cn("min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4", compact && "text-sm")}>
        {messages.map((m, i) => (
          <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                m.role === "user"
                  ? "rounded-br-md bg-primary text-primary-foreground"
                  : "rounded-bl-md bg-muted text-foreground",
              )}
            >
              {m.text}
            </div>
          </div>
        ))}
        {typing ? (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-2xl rounded-bl-md bg-muted px-4 py-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-1.5 animate-bounce rounded-full bg-muted-foreground/70"
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </div>
          </div>
        ) : null}
        <div ref={endRef} />
      </div>

      {listening ? (
        <div className="flex flex-col items-center gap-2 border-t border-border py-5">
          <div className="relative grid size-14 place-items-center">
            <span className="listening-ring absolute inset-0 rounded-full bg-primary/30" />
            <span className="brand-gradient relative grid size-14 place-items-center rounded-full text-primary-foreground">
              <Mic className="size-6" />
            </span>
          </div>
          <p className="text-sm font-medium">Listening…</p>
          <p className="text-xs text-muted-foreground">Say "DigiUni, when is my next class?"</p>
        </div>
      ) : (
        <div className="border-t border-border px-4 pb-3 pt-3">
          <div className="mb-2.5 flex gap-2 overflow-x-auto pb-1">
            {suggestedPrompts.slice(0, 6).map((p) => (
              <button
                key={p}
                onClick={() => send(p)}
                className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {p}
              </button>
            ))}
          </div>
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about attendance, fees, classes…"
              className="h-11 rounded-full"
            />
            <Button type="button" variant="outline" size="icon" className="size-11 shrink-0 rounded-full" onClick={simulateVoice} aria-label="Voice assistant">
              {listening ? <Square className="size-4" /> : <Mic className="size-4" />}
            </Button>
            <Button type="submit" size="icon" className="size-11 shrink-0 rounded-full" aria-label="Send">
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
