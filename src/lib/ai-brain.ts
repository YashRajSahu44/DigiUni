import { student, subjects, fees, todayTimetable, examSchedule, transport, certificates, inr } from "./demo-data";

export const suggestedPrompts = [
  "What is my attendance?",
  "When is my next class?",
  "Show my exam schedule",
  "How much are my pending fees?",
  "Where is my classroom?",
  "Help me apply for a certificate",
  "What should I study today?",
  "Raise a hostel complaint",
  "Track my bus",
  "Contact the helpdesk",
];

/** Rule-based demo assistant over local mock campus data. */
export function answer(question: string): string {
  const q = question.toLowerCase();
  const next = todayTimetable.find((p) => p.status === "next") ?? todayTimetable.find((p) => p.status === "now");

  if (q.includes("attendance")) {
    const low = subjects.filter((s) => s.attendance < 75).map((s) => `${s.name} (${s.attendance}%)`);
    return `Your overall attendance is ${student.attendance}%.${low.length ? ` ${low.join(", ")} ${low.length > 1 ? "are" : "is"} currently below the 75% requirement.` : " All subjects are above the 75% requirement."}`;
  }
  if (q.includes("next class") || q.includes("classroom") || q.includes("where is my")) {
    return next
      ? `Your next class is ${next.subject} at ${next.time.split("–")[1] ? next.time.split("–")[0] : next.time} in ${next.room}, with ${next.faculty}.`
      : "You have no more classes scheduled today.";
  }
  if (q.includes("exam")) {
    const e = examSchedule[0];
    return `Mid-semester exams start on ${e.date}. First paper: ${e.subject}, ${e.time}, ${e.room}. You have ${examSchedule.length} papers scheduled.`;
  }
  if (q.includes("fee") || q.includes("pay")) {
    return `You have ${inr(fees.pending)} pending — examination fee and other charges — due on ${fees.due}. You can pay from the Fees & Payments page.`;
  }
  if (q.includes("certificate")) {
    const ready = certificates.filter((c) => c.status === "Issued").length;
    return `You have ${ready} issued certificates ready to download, and 1 request in processing. To apply for a new one, open Digital Certificates and choose "Request certificate".`;
  }
  if (q.includes("study") || q.includes("learn") || q.includes("revise")) {
    return "Today's recommended focus: Data Structures 40 min (weakest area), Probability & Statistics 30 min (exam in 14 days), Artificial Intelligence 45 min (high weightage). This is a suggestion based on your demo records, not a guarantee.";
  }
  if (q.includes("hostel") || q.includes("complaint")) {
    return `You're in ${student.hostel}, room ${student.room}. Your complaint HC-338 (water leakage) is In Progress. Open Hostel → Raise complaint to add a new one.`;
  }
  if (q.includes("bus") || q.includes("transport") || q.includes("track")) {
    return `${transport.route} (${transport.path}) — ${transport.status}. Your pickup is ${transport.pickup} at ${transport.time}. Tracking shown is simulated demo data.`;
  }
  if (q.includes("helpdesk") || q.includes("support") || q.includes("ticket")) {
    return "Ticket #DU1024 (Unable to download examination form) is In Progress, last updated 1 hour ago. You can chat with support or raise a new ticket from the Helpdesk page.";
  }
  if (q.includes("timetable") || q.includes("schedule") || q.includes("today")) {
    return `You have ${todayTimetable.filter((p) => p.status !== "free").length} classes today. Currently: ${todayTimetable.find((p) => p.status === "now")?.subject ?? "free period"}.`;
  }
  if (q.includes("cgpa") || q.includes("result") || q.includes("marks") || q.includes("grade")) {
    return `Your current CGPA is ${student.cgpa}. Strongest subject: Mini Project (92). Needs work: Data Structures (68). Projected range for this semester: 7.8–8.3 CGPA — an estimate from demo data, not a guaranteed outcome.`;
  }
  if (q.includes("placement") || q.includes("job") || q.includes("intern")) {
    return "3 companies match your current skills. Zentra Labs (ML Engineer Intern) drives on 6 Oct — registration closes 2 Oct. Your placement profile is 82% complete.";
  }
  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return `Hi ${student.firstName}! I can help with attendance, timetable, fees, exams, certificates, hostel, transport and helpdesk. What do you need?`;
  }
  return "I can help with attendance, timetable, exams, fees, certificates, hostel, transport, placements, library and helpdesk. Try asking \"What is my attendance?\" or \"When is my next class?\"";
}
