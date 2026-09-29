# DigiUni

**Your University. One Digital Campus.**

DigiUni is a student digital campus prototype that brings attendance, timetable, exams, fees, hostel, transport, placements, certificates, and AI assistance into a single web app.

> Demo-focused UI with sample student data — no backend required to explore the experience.

## Features

- **Student dashboard** — today’s classes, fees due, attendance overview, and quick actions
- **Academics** — attendance, timetable, exams & results, personalized learning
- **Campus services** — fees & payments, digital certificates, hostel, transport (bus tracking), library, placements, helpdesk
- **News & calendar** — campus notices and academic calendar
- **DigiUni AI Copilot** — ask about attendance, fees, next class, and more (text/voice-style demo)
- **Profile** — student ID, academics, and preferences

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [TanStack Start](https://tanstack.com/start) / [TanStack Router](https://tanstack.com/router)
- [Vite](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) (Radix primitives)
- [TanStack Query](https://tanstack.com/query)
- [Zod](https://zod.dev/) + React Hook Form

## Getting started

**Requirements:** Node.js 18+ and npm (or [bun](https://bun.sh/)).

```sh
git clone https://github.com/YashRajSahu44/DigiUni.git
cd DigiUni
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`), then enter the student demo from the landing page.

### Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Start the development server |
| `npm run build`   | Production build           |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run ESLint                 |
| `npm run format`  | Format with Prettier       |

## Project structure

```
src/
  components/   # App shell, UI bits, shared components
  lib/          # Demo data, utilities
  routes/       # File-based routes (landing + /app/*)
  styles.css    # Global styles / design tokens
```

Key routes under `/app`:

| Path              | Module                    |
| ----------------- | ------------------------- |
| `/app`            | Student dashboard         |
| `/app/attendance` | Attendance                |
| `/app/timetable`  | Timetable                 |
| `/app/exams`      | Examination & results     |
| `/app/fees`       | Fees & payments           |
| `/app/certificates` | Digital certificates    |
| `/app/hostel`     | Hostel                    |
| `/app/transport`  | Transport / bus tracking  |
| `/app/ai`         | DigiUni AI                |
| `/app/learning`   | Personalized learning     |

