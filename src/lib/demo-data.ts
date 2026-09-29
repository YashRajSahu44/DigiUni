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
  hostel: "Boys Hostel – Block A",
  room: "A-204",
  bed: "02",
  cgpa: 8.1,
  creditsCompleted: 72,
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
  { name: "Artificial Intelligence", short: "AI", faculty: "Verma Mamta Kantilal", attendance: 88, attended: 44, total: 50, marks: 82, grade: "A" },
  { name: "Data Structures", short: "DS", faculty: "Deepika Dubey", attendance: 71, attended: 32, total: 45, marks: 76, grade: "B+" },
  { name: "Probability & Statistics", short: "P&S", faculty: "R. Nandkumar", attendance: 76, attended: 35, total: 46, marks: 81, grade: "A" },
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
  { time: "11:15–12:00", subject: "Artificial Intelligence", faculty: "Verma Mamta Kantilal Swarnkar", room: "AL-304-P", status: "next" },
  { time: "12:00–12:45", subject: "Data Structures", faculty: "Deepika Dubey", room: "AL-303", status: "upcoming" },
  { time: "14:10–14:50", subject: "Probability & Statistics", faculty: "Dr. Sheela Verma", room: "AL-302", status: "upcoming" },
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
  { category: "Examination", date: "29 Sep 2026", title: "Examination Form Submission", desc: "Submit your mid-semester examination form online by 5 October. Late submissions require Dean approval." },
  { category: "Placement", date: "02 Oct 2026", title: "Campus Placement Drive", desc: "Zentra Labs campus drive — open to CSE/AIML students with 7.0+ CGPA. Register by 2 October." },
  { category: "Holiday", date: "02 Oct 2026", title: "Holiday Announcement", desc: "Campus closed on 2 October for Gandhi Jayanti. Library and hostel mess operate on Sunday schedule." },
  { category: "Event", date: "05 Oct 2026", title: "AI Workshop", desc: "Hands-on workshop on generative AI foundations. Register via DigiUni Events. Limited to 60 seats." },
  { category: "Examination", date: "28 Sep 2026", title: "Mid-semester exam timetable released", desc: "Semester 3 mid-term examinations begin 10 October. Download your hall ticket from the Examination module." },
  { category: "Academic", date: "18 Sep 2026", title: "Elective registration for Semester 4", desc: "Choose from 14 electives. Registration window: 1–8 October." },
];

export const notifications = [
  { type: "Exams", title: "New exam schedule published", time: "2 hours ago", unread: true },
  { type: "Fees", title: "Fee payment reminder", time: "5 hours ago", unread: true },
  { type: "Academic", title: "Assignment deadline approaching", time: "Yesterday", unread: true },
  { type: "Placement", title: "Placement drive announced", time: "Yesterday", unread: false },
  { type: "Transport", title: "Route 4 running 6 minutes late", time: "2 days ago", unread: false },
  { type: "Hostel", title: "Complaint #HC-338 marked In Progress", time: "2 days ago", unread: false },
];

export const fees = {
  total: 95000,
  paid: 76500,
  pending: 18500,
  due: "10 October 2026",
  dueShort: "10 Oct",
  breakdown: [
    { head: "Tuition Fee", amount: 70000, status: "Paid" },
    { head: "Hostel Fee", amount: 15000, status: "Paid" },
    { head: "Examination Fee", amount: 5000, status: "Pending" },
    { head: "Other Charges", amount: 5000, status: "Partial" },
  ],
  history: [
    { id: "TXN-90231", date: "12 Aug 2026", head: "Tuition Fee – Instalment 2", amount: 35000, mode: "Net banking", status: "Paid" },
    { id: "TXN-88117", date: "04 Jul 2026", head: "Hostel Fee", amount: 15000, mode: "UPI", status: "Paid" },
    { id: "TXN-85002", date: "18 Jun 2026", head: "Tuition Fee – Instalment 1", amount: 35000, mode: "Net banking", status: "Paid" },
    { id: "TXN-84011", date: "10 Jun 2026", head: "Other Charges (partial)", amount: 1500, mode: "UPI", status: "Paid" },
  ],
};

export const certificates = [
  { name: "Participation Certificate", subtitle: "Hackathon 2026", issued: "15 Sep 2026", id: "DU-HCK-2026-0192", status: "Verified" },
  { name: "Course Completion Certificate", subtitle: "AI Fundamentals", issued: "22 Aug 2026", id: "DU-CRS-2026-0455", status: "Verified" },
  { name: "Internship Certificate", subtitle: "Machine Learning Internship", issued: "30 Jul 2026", id: "DU-INT-2026-0088", status: "Verified" },
  { name: "Academic Certificate", subtitle: "Semester Achievement", issued: "30 Jun 2026", id: "DU-ACH-2026-0192", status: "Verified" },
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
  eligible: 8,
  applications: 3,
  upcomingDrives: 4,
  interviews: 2,
  companies: [
    { name: "Zentra Labs", role: "ML Engineer Intern", ctc: "₹12 LPA", date: "06 Oct", deadline: "02 Oct 2026", eligible: true, match: 92, applied: false },
    { name: "Northwind Systems", role: "Software Engineer", ctc: "₹9.5 LPA", date: "11 Oct", deadline: "08 Oct 2026", eligible: true, match: 78, applied: true },
    { name: "Cobalt Analytics", role: "Data Analyst", ctc: "₹8 LPA", date: "15 Oct", deadline: "12 Oct 2026", eligible: true, match: 71, applied: false },
    { name: "Helio Fintech", role: "Backend Engineer", ctc: "₹11 LPA", date: "20 Oct", deadline: "18 Oct 2026", eligible: false, match: 54, applied: false },
    { name: "Nova Soft", role: "AI Research Intern", ctc: "₹10 LPA", date: "22 Oct", deadline: "15 Oct 2026", eligible: true, match: 85, applied: true },
    { name: "Pixel Forge", role: "Full Stack Intern", ctc: "₹7 LPA", date: "25 Oct", deadline: "20 Oct 2026", eligible: true, match: 66, applied: false },
  ],
  skills: ["System design basics", "SQL window functions", "Model evaluation metrics"],
};

export const library = {
  issuedCount: 4,
  dueSoon: 2,
  overdue: 0,
  issued: [
    { title: "Data Structures & Algorithms", author: "Cormen et al.", due: "04 Oct 2026", fine: 0 },
    { title: "Artificial Intelligence", author: "Russell & Norvig", due: "08 Oct 2026", fine: 0 },
    { title: "Probability for Data Science", author: "Stanley Chan", due: "12 Oct 2026", fine: 0 },
    { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", due: "18 Oct 2026", fine: 0 },
  ],
  catalog: [
    { title: "Introduction to Algorithms", author: "Cormen et al.", available: 3 },
    { title: "Deep Learning", author: "Goodfellow et al.", available: 1 },
    { title: "Clean Code", author: "Robert C. Martin", available: 5 },
    { title: "The Pragmatic Programmer", author: "Hunt & Thomas", available: 2 },
    { title: "Hands-On Machine Learning", author: "Aurélien Géron", available: 0 },
    { title: "Bayesian Reasoning", author: "Pearl & Mackenzie", available: 4 },
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

export const calendarEvents: Record<string, { label: string; kind: "holiday" | "exam" | "event" | "academic" }[]> = {
  "2026-09-02": [{ label: "Gandhi Jayanti (observed prep)", kind: "holiday" }],
  "2026-09-20": [{ label: "Alumni meet planning", kind: "event" }],
  "2026-09-29": [{ label: "Regular Classes", kind: "academic" }, { label: "Exam form reminder", kind: "event" }],
  "2026-09-30": [{ label: "Assignment Deadline — TC draft", kind: "academic" }],
  "2026-10-02": [{ label: "Gandhi Jayanti", kind: "holiday" }],
  "2026-10-05": [{ label: "AI Workshop", kind: "event" }, { label: "TechnoVerse registration closes", kind: "event" }],
  "2026-10-10": [{ label: "Mid-sem: AI", kind: "exam" }],
  "2026-10-12": [{ label: "Mid-sem: DS", kind: "exam" }],
  "2026-10-14": [{ label: "Mid-sem: P&S", kind: "exam" }],
  "2026-10-16": [{ label: "Mid-sem: TC", kind: "exam" }],
  "2026-10-20": [{ label: "Alumni meet", kind: "event" }],
  "2026-10-25": [{ label: "Dussehra break", kind: "holiday" }],
};

export const previousResult = {
  semester: "Semester 2",
  sgpa: 8.2,
  status: "Passed",
  credits: 22,
};

export const backlogs: { subject: string; semester: string; status: string }[] = [];

export const leaveRequests = [
  { id: "LR-112", from: "18 Sep 2026", to: "18 Sep 2026", reason: "Medical", status: "Approved" },
  { id: "LR-098", from: "02 Sep 2026", to: "03 Sep 2026", reason: "Family function", status: "Approved" },
];

export const hostelNotices = [
  { title: "Water supply maintenance", date: "20 Sep 2026", body: "Block A water supply unavailable 11:00–14:00 on 21 September." },
  { title: "Mess timing change", date: "15 Sep 2026", body: "Dinner served until 21:30 on weekdays during mid-sem week." },
];

export const searchIndex = [
  { title: "Attendance", group: "Service", to: "/app/attendance" },
  { title: "Subject-wise Attendance", group: "Service", to: "/app/attendance" },
  { title: "Attendance Policy", group: "Service", to: "/app/attendance" },
  { title: "Timetable", group: "Service", to: "/app/timetable" },
  { title: "Examination & Results", group: "Service", to: "/app/exams" },
  { title: "Fees & Payments", group: "Service", to: "/app/fees" },
  { title: "Payment History", group: "Service", to: "/app/fees" },
  { title: "Fee Receipt", group: "Service", to: "/app/fees" },
  { title: "Digital Certificates", group: "Service", to: "/app/certificates" },
  { title: "Hostel Management", group: "Service", to: "/app/hostel" },
  { title: "Transport & Bus Tracking", group: "Service", to: "/app/transport" },
  { title: "Placements", group: "Service", to: "/app/placements" },
  { title: "Library", group: "Service", to: "/app/library" },
  { title: "Student Helpdesk", group: "Service", to: "/app/helpdesk" },
  { title: "News & Notices", group: "Service", to: "/app/notices" },
  { title: "Personalized Learning", group: "Service", to: "/app/learning" },
  { title: "DigiUni AI", group: "AI", to: "/app/ai" },
  { title: "DigiUni AI Assistant", group: "AI", to: "/app/ai" },
  { title: "Data Structures — Deepika Dubey", group: "Subject", to: "/app/academics" },
  { title: "Artificial Intelligence — Verma Mamta", group: "Subject", to: "/app/academics" },
  { title: "Ticket #DU1024", group: "Helpdesk", to: "/app/helpdesk" },
  { title: "Bonafide Certificate", group: "Certificate", to: "/app/certificates" },
  { title: "Profile & Settings", group: "Service", to: "/app/profile" },
  { title: "Calendar", group: "Service", to: "/app/calendar" },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
