export const student = {
  name: "Aarav Sharma",
  firstName: "Aarav",
  course: "B.Tech CSE – AI/ML",
  semester: "3rd Semester",
  section: "G",
  roll: "CSE/AIML/2026/0192",
  enrollment: "DU20260192",
  academicYear: "2026–2027",
  email: "aarav.sharma@digiuni.edu.in",
  phone: "+91 98••• ••210",
  hostel: "Boys Hostel Block A",
  room: "A-204",
  bed: "02",
  cgpa: 8.1,
  attendance: 82,
  pendingFees: 18500,
  university: "DigiUni Institute of Technology",
};

export type Subject = {
  name: string;
  short: string;
  faculty: string;
  attendance: number;
  attended: number;
  total: number;
  marks: number;
  grade: string;
};

export const subjects: Subject[] = [
  { name: "Artificial Intelligence", short: "AI", faculty: "Verma Mamta Kantilal", attendance: 88, attended: 44, total: 50, marks: 84, grade: "A" },
  { name: "Data Structures", short: "DS", faculty: "Deepika Dubey", attendance: 71, attended: 32, total: 45, marks: 68, grade: "B" },
  { name: "Probability & Statistics", short: "P&S", faculty: "R. Nandkumar", attendance: 76, attended: 35, total: 46, marks: 72, grade: "B+" },
  { name: "Technical Communication", short: "TC", faculty: "Anita Joseph", attendance: 91, attended: 40, total: 44, marks: 88, grade: "A" },
  { name: "Mini Project", short: "MP", faculty: "Dr. Swagatika Lenka", attendance: 95, attended: 19, total: 20, marks: 92, grade: "A+" },
];

export const attendanceTrend = [
  { month: "May", value: 79 },
  { month: "Jun", value: 81 },
  { month: "Jul", value: 84 },
  { month: "Aug", value: 80 },
  { month: "Sep", value: 82 },
];

export const performanceTrend = [
  { term: "Sem 1", cgpa: 7.4 },
  { term: "Sem 2", cgpa: 7.8 },
  { term: "Mid 1", cgpa: 8.0 },
  { term: "Mid 2", cgpa: 8.1 },
];

export type Period = {
  time: string;
  subject: string;
  faculty: string;
  room: string;
  status: "done" | "now" | "next" | "upcoming" | "free";
};

export const todayTimetable: Period[] = [
  { time: "09:00–09:45", subject: "Technical Communication", faculty: "Anita Joseph", room: "AL-201", status: "done" },
  { time: "09:45–10:30", subject: "Free Period", faculty: "—", room: "—", status: "free" },
  { time: "10:30–11:15", subject: "Mini Project", faculty: "Dr. Swagatika Lenka", room: "BT-108-P", status: "now" },
  { time: "11:15–12:00", subject: "Artificial Intelligence", faculty: "Verma Mamta Kantilal", room: "AL-304-P", status: "next" },
  { time: "12:00–12:45", subject: "Data Structures", faculty: "Deepika Dubey", room: "AL-303", status: "upcoming" },
  { time: "13:30–14:15", subject: "Probability & Statistics", faculty: "R. Nandkumar", room: "AL-210", status: "upcoming" },
];

export const weekTimetable = [
  { day: "Mon", classes: ["TC", "MP", "AI", "DS", "P&S"] },
  { day: "Tue", classes: ["AI", "DS", "MP", "—", "TC"] },
  { day: "Wed", classes: ["DS", "P&S", "AI", "MP", "—"] },
  { day: "Thu", classes: ["MP", "TC", "DS", "AI", "P&S"] },
  { day: "Fri", classes: ["P&S", "AI", "TC", "DS", "MP"] },
  { day: "Sat", classes: ["Lab", "Lab", "—", "—", "—"] },
];

export const insights = [
  { tone: "warning", title: "Attendance needs attention", body: "Your attendance in Data Structures has dropped to 71%. Attend 3 of the next 4 classes to move above 75%." },
  { tone: "info", title: "3 assignments due this week", body: "AI case study (Thu), DS lab report (Fri), P&S problem set (Sat)." },
  { tone: "violet", title: "Exam prep suggestion", body: "Based on your recent assessments, revising Probability & Statistics may improve your upcoming exam score." },
  { tone: "success", title: "Consistent performance", body: "You have maintained a steady academic performance for the last 4 weeks." },
];

export const notices = [
  { category: "Examination", date: "28 Sep 2026", title: "Mid-semester exam timetable released", desc: "Semester 3 mid-term examinations begin 10 October. Download your hall ticket from the Examination module." },
  { category: "Placement", date: "27 Sep 2026", title: "Zentra Labs campus drive — register by 2 Oct", desc: "Open to CSE/AIML students with 7.0+ CGPA. 12 roles across ML engineering and data platform." },
  { category: "Holiday", date: "24 Sep 2026", title: "Campus closed on 2 October", desc: "Gandhi Jayanti holiday. Library and hostel mess operate on Sunday schedule." },
  { category: "Event", date: "22 Sep 2026", title: "TechnoVerse 2026 — registrations open", desc: "Annual technical fest across 18 events. Team registration closes 5 October." },
  { category: "Emergency", date: "20 Sep 2026", title: "Water supply maintenance in Block A", desc: "Supply unavailable 11:00–14:00 on 21 September in Boys Hostel Block A." },
  { category: "Academic", date: "18 Sep 2026", title: "Elective registration for Semester 4", desc: "Choose from 14 electives. Registration window: 1–8 October." },
];

export const notifications = [
  { type: "Exams", title: "Hall ticket available", time: "12m ago", unread: true },
  { type: "Fees", title: "₹18,500 due on 10 Oct", time: "2h ago", unread: true },
  { type: "Academic", title: "DS lab report deadline moved to Friday", time: "5h ago", unread: true },
  { type: "Transport", title: "Route 4 running 6 minutes late", time: "Yesterday", unread: false },
  { type: "Hostel", title: "Complaint #HC-338 marked In Progress", time: "Yesterday", unread: false },
  { type: "Placement", title: "Zentra Labs drive registration open", time: "2 days ago", unread: false },
];

export const fees = {
  total: 128500,
  paid: 110000,
  pending: 18500,
  due: "10 Oct 2026",
  breakdown: [
    { head: "Tuition fee", amount: 98000, status: "Paid" },
    { head: "Hostel fee", amount: 22000, status: "Paid" },
    { head: "Examination fee", amount: 4500, status: "Pending" },
    { head: "Other charges", amount: 4000, status: "Pending" },
  ],
  history: [
    { id: "TXN-90231", date: "12 Aug 2026", head: "Tuition fee – Instalment 2", amount: 49000, mode: "Net banking" },
    { id: "TXN-88117", date: "04 Jul 2026", head: "Hostel fee", amount: 22000, mode: "UPI" },
    { id: "TXN-85002", date: "18 Jun 2026", head: "Tuition fee – Instalment 1", amount: 49000, mode: "Net banking" },
  ],
};

export const certificates = [
  { name: "Bonafide Certificate", issued: "12 Sep 2026", id: "DU-BON-2026-0192", status: "Issued" },
  { name: "Semester 2 Marksheet", issued: "30 Jun 2026", id: "DU-MRK-2026-0192", status: "Issued" },
  { name: "Course Completion – ML Foundations", issued: "22 Aug 2026", id: "DU-CRS-2026-0455", status: "Issued" },
  { name: "Character Certificate", issued: "—", id: "DU-CHR-2026-0192", status: "Processing" },
];

export const hostelComplaints = [
  { id: "HC-338", title: "Water leakage in washroom", raised: "26 Sep 2026", status: "In Progress" },
  { id: "HC-310", title: "Wi-Fi drops after 11 PM", raised: "14 Sep 2026", status: "Resolved" },
];

export const messMenu = [
  { day: "Today", breakfast: "Poha, boiled eggs, tea", lunch: "Rajma chawal, salad, curd", dinner: "Paneer butter masala, roti, kheer" },
  { day: "Tomorrow", breakfast: "Idli sambhar, filter coffee", lunch: "Chole, jeera rice, papad", dinner: "Veg pulao, raita, gulab jamun" },
];

export const transport = {
  route: "Route 4",
  path: "Campus → Main Square → Railway Station",
  pickup: "Main Square (Stop 3)",
  time: "08:10 AM",
  status: "Arriving in 8 minutes",
  bus: "DU-BUS-14",
  driver: "Ramesh Yadav",
  contact: "+91 90••• ••455",
  stops: [
    { name: "Campus Gate", time: "07:45 AM", done: true },
    { name: "Green Park", time: "07:58 AM", done: true },
    { name: "Main Square", time: "08:10 AM", done: false },
    { name: "City Hospital", time: "08:22 AM", done: false },
    { name: "Railway Station", time: "08:35 AM", done: false },
  ],
};

export const placements = {
  profileCompletion: 82,
  applications: 5,
  interviews: 2,
  companies: [
    { name: "Zentra Labs", role: "ML Engineer Intern", ctc: "₹12 LPA", date: "06 Oct", eligible: true, match: 92 },
    { name: "Northwind Systems", role: "Software Engineer", ctc: "₹9.5 LPA", date: "11 Oct", eligible: true, match: 78 },
    { name: "Cobalt Analytics", role: "Data Analyst", ctc: "₹8 LPA", date: "15 Oct", eligible: true, match: 71 },
    { name: "Helio Fintech", role: "Backend Engineer", ctc: "₹11 LPA", date: "20 Oct", eligible: false, match: 54 },
  ],
  skills: ["System design basics", "SQL window functions", "Model evaluation metrics"],
};

export const library = {
  issued: [
    { title: "Introduction to Algorithms", author: "Cormen et al.", due: "05 Oct 2026", fine: 0 },
    { title: "Artificial Intelligence: A Modern Approach", author: "Russell & Norvig", due: "28 Sep 2026", fine: 20 },
  ],
  recommended: [
    { title: "Probability for Data Science", author: "Stanley Chan" },
    { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann" },
  ],
};

export const tickets = [
  { id: "DU1024", category: "Examination", title: "Unable to download examination form", status: "In Progress", updated: "1h ago" },
  { id: "DU1011", category: "Fees", title: "Receipt not generated for UPI payment", status: "Resolved", updated: "3 days ago" },
  { id: "DU0998", category: "IT Support", title: "Campus Wi-Fi login failing", status: "Resolved", updated: "1 week ago" },
];

export const helpdeskCategories = ["Academic", "Hostel", "Fees", "Transport", "IT Support", "Library", "Examination", "General"];

export const examSchedule = [
  { date: "10 Oct 2026", subject: "Artificial Intelligence", time: "09:30 – 12:30", room: "Hall 2" },
  { date: "12 Oct 2026", subject: "Data Structures", time: "09:30 – 12:30", room: "Hall 1" },
  { date: "14 Oct 2026", subject: "Probability & Statistics", time: "14:00 – 17:00", room: "Hall 4" },
  { date: "16 Oct 2026", subject: "Technical Communication", time: "09:30 – 11:30", room: "Hall 3" },
];

export const assignments = [
  { subject: "Artificial Intelligence", title: "Search algorithms case study", due: "01 Oct", status: "Pending" },
  { subject: "Data Structures", title: "Lab report – AVL trees", due: "02 Oct", status: "Pending" },
  { subject: "Probability & Statistics", title: "Problem set 4", due: "03 Oct", status: "Pending" },
  { subject: "Technical Communication", title: "Group presentation draft", due: "26 Sep", status: "Submitted" },
];

export const studyPlan = [
  { subject: "Data Structures", minutes: 40, reason: "Lowest attendance and assessment score", progress: 60 },
  { subject: "Probability & Statistics", minutes: 30, reason: "Exam in 14 days, weak on distributions", progress: 35 },
  { subject: "Artificial Intelligence", minutes: 45, reason: "High weightage, strong scoring opportunity", progress: 80 },
];

export const resources = [
  { title: "AVL & Red-Black Trees — visual walkthrough", type: "Video", subject: "Data Structures", mins: 18 },
  { title: "Bayes theorem practice set", type: "Worksheet", subject: "Probability & Statistics", mins: 25 },
  { title: "Heuristic search notes (Unit 3)", type: "Notes", subject: "Artificial Intelligence", mins: 30 },
];

export const calendarEvents: Record<number, { label: string; kind: "holiday" | "exam" | "event" }> = {
  2: { label: "Gandhi Jayanti", kind: "holiday" },
  5: { label: "TechnoVerse registration closes", kind: "event" },
  10: { label: "Mid-sem: AI", kind: "exam" },
  12: { label: "Mid-sem: DS", kind: "exam" },
  14: { label: "Mid-sem: P&S", kind: "exam" },
  16: { label: "Mid-sem: TC", kind: "exam" },
  20: { label: "Alumni meet", kind: "event" },
  25: { label: "Dussehra break", kind: "holiday" },
};

export const riskStudents = [
  { name: "Ishan Kapoor", roll: "CSE/2026/0211", risk: "High", attendance: 58, assignments: 40, factors: ["Attendance decline", "Missed 4 assignments", "Fee overdue 45 days"], action: "Academic counsellor follow-up" },
  { name: "Meera Nair", roll: "CSE/2026/0148", risk: "Moderate", attendance: 69, assignments: 65, factors: ["Attendance decline", "Reduced assignment submission"], action: "Mentor check-in this week" },
  { name: "Aarav Sharma", roll: "CSE/2026/0192", risk: "Moderate", attendance: 82, assignments: 75, factors: ["One subject below 75%", "Recent assessment dip"], action: "Subject-level support for Data Structures" },
  { name: "Rhea Dsouza", roll: "CSE/2026/0176", risk: "Low", attendance: 91, assignments: 95, factors: ["Stable engagement"], action: "No intervention needed" },
];

export const adminStats = [
  { label: "Active students", value: "8,412" },
  { label: "Average attendance", value: "84%" },
  { label: "Open helpdesk tickets", value: "126" },
  { label: "Fee collection", value: "91%" },
];

export const departmentAttendance = [
  { dept: "CSE", value: 86 },
  { dept: "ECE", value: 82 },
  { dept: "MECH", value: 78 },
  { dept: "CIVIL", value: 74 },
  { dept: "MBA", value: 88 },
];

export const helpdeskVolume = [
  { week: "W1", tickets: 82 },
  { week: "W2", tickets: 96 },
  { week: "W3", tickets: 74 },
  { week: "W4", tickets: 126 },
];

export const searchIndex = [
  { title: "Attendance Status", group: "Service", to: "/app/attendance" },
  { title: "Subject-wise Attendance", group: "Service", to: "/app/attendance" },
  { title: "Timetable", group: "Service", to: "/app/timetable" },
  { title: "Examination & Results", group: "Service", to: "/app/exams" },
  { title: "Fees & Payments", group: "Service", to: "/app/fees" },
  { title: "Digital Certificates", group: "Service", to: "/app/certificates" },
  { title: "Hostel Management", group: "Service", to: "/app/hostel" },
  { title: "Transport & Bus Tracking", group: "Service", to: "/app/transport" },
  { title: "Placements", group: "Service", to: "/app/placements" },
  { title: "Library", group: "Service", to: "/app/library" },
  { title: "Student Helpdesk", group: "Service", to: "/app/helpdesk" },
  { title: "News & Notices", group: "Service", to: "/app/notices" },
  { title: "Personalized Learning", group: "Service", to: "/app/learning" },
  { title: "DigiUni AI Assistant", group: "AI", to: "/app/ai" },
  { title: "Data Structures — Deepika Dubey", group: "Subject", to: "/app/academics" },
  { title: "Artificial Intelligence — Verma Mamta", group: "Subject", to: "/app/academics" },
  { title: "Ticket #DU1024", group: "Helpdesk", to: "/app/helpdesk" },
  { title: "Bonafide Certificate", group: "Certificate", to: "/app/certificates" },
  { title: "Profile & Settings", group: "Service", to: "/app/profile" },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
