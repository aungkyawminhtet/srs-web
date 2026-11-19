# SRS Web — Student Relationship System (Frontend)

> A modern, production-grade educational platform and Student Relationship System (SRS) built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **shadcn UI**, **NextAuth**, **TanStack React Query**, and **Socket.IO**.

---

## 📑 Table of Contents
1. [Overview](#-overview)
2. [Tech Stack](#-tech-stack)
3. [Prerequisites](#-prerequisites)
4. [Step-by-Step Setup Guide](#-step-by-step-setup-guide)
5. [Environment Variables Reference](#-environment-variables-reference)
6. [Google OAuth 2.0 Configuration](#-google-oauth-20-configuration)
7. [Default Demo Accounts](#-default-demo-accounts)
8. [Project Structure & Routing](#-project-structure--routing)
9. [Available Scripts](#-available-scripts)
10. [Key Design & Architecture Principles](#-key-design--architecture-principles)
11. [Troubleshooting & FAQ](#-troubleshooting--faq)

---

## 🌟 Overview

The SRS platform delivers three distinct, role-protected environments in addition to a public marketing and discovery site:

- **Public Showcase & Academic Discovery**: Programs, Tutors showcase, Subject pathways, Pricing, Learning resources, and Consultation booking.
- **Admin Workspace (`/admin`)**: Institutional management — Faculty/Tutor hiring, Course access permissions, Program curriculum creation, Attendance oversight, Scheduling conflicts resolution, and Student enrollment roster.
- **Instructor Command Center (`/instructor`)**: Curriculum outline editing, lesson breakdown management, coursework assignment creation, student work viewer, and grade/feedback evaluation.
- **Student Learning Portal (`/dashboard`)**: Enrolled course progress tracking, interactive weekly timetable, assignment submission upload (links/files), live 1-on-1 video classroom entry, and realtime advisor chat.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org) with React 19
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + Emerald/Deep Slate Brand System (`#0A5C4C` / `#0B1E2B`)
- **UI Components**: [shadcn UI](https://ui.shadcn.com) (`Table`, `Badge`, `Skeleton`, `Dialog`, `Alert`, `Select`, `Pagination`)
- **State & Data Fetching**: [TanStack React Query v5](https://tanstack.com/query) with optimistic updates & cache invalidation
- **Authentication**: [NextAuth.js v4](https://next-auth.js.org) + JWT Session Cookies with a strict **1-day expiration limit**
- **Realtime Communication**: [Socket.IO Client](https://socket.io) for live advisor-student messaging
- **Icons**: [Lucide React](https://lucide.dev)

---

## 📋 Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.18.0` or higher (`v20.x` recommended)
- **Package Manager**: `npm` (v9+) or `pnpm`
- **Backend API**: Running `srs-server` (see [Root README](../README.md))

---

## 🚀 Step-by-Step Setup Guide

Follow these steps to get the web frontend running locally:

### Step 1: Navigate to the `srs-web` directory
```bash
cd srs-web
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Create your local environment configuration
Copy the provided `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```

### Step 4: Verify your environment variables
Open `.env.local` and check that the values point to your backend:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=srs-super-secure-nextauth-secret-key-2026-production

# Google OAuth (Optional for local testing; required for Gmail login)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Step 5: Start the development server
```bash
npm run dev
```

Open your browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🔐 Environment Variables Reference

| Variable | Required | Description | Default / Example |
| :--- | :---: | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | **Yes** | Base REST API URL of the backend `srs-server` | `http://localhost:4000/api/v1` |
| `NEXT_PUBLIC_SOCKET_URL` | **Yes** | Base URL for the Socket.IO WebSocket server | `http://localhost:4000` |
| `NEXTAUTH_URL` | **Yes** | Base canonical URL of the frontend application | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | **Yes** | Secret encryption key used to sign NextAuth tokens | Run `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | *Optional* | Google Cloud Console OAuth 2.0 Client ID | `*.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | *Optional* | Google Cloud Console OAuth 2.0 Client Secret | `GOCSPX-...` |

---

## 🔑 Google OAuth 2.0 Configuration

To enable **Sign in with Google** on the `/login` and `/register` pages:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (e.g., `SRS-Edu-Platform`).
3. Navigate to **APIs & Services** > **OAuth consent screen**:
   - Choose **External**, fill in the App name, User support email, and Developer contact email.
4. Navigate to **APIs & Services** > **Credentials**:
   - Click **Create Credentials** > **OAuth client ID**.
   - Select Application type: **Web application**.
   - Under **Authorized JavaScript origins**, add:
     - `http://localhost:3000`
   - Under **Authorized redirect URIs**, add:
     - `http://localhost:3000/api/auth/callback/google`
5. Click **Create** and copy the **Client ID** and **Client Secret** into your `srs-web/.env.local`.
6. Restart your dev server (`npm run dev`).

---

## 👤 Default Demo Accounts

The backend automatically seeds these role-based accounts upon initial startup:

| Portal | Email | Password | Role | Redirect Route |
| :--- | :--- | :--- | :--- | :--- |
| **Administrator** | `admin@gmail.com` | `admin123` | `admin` | `/admin` |
| **Student** | `emma.thant@student.edu` | `student123` | `student` | `/dashboard` |
| **Course Instructor** | `lin.chen@funandlearn.edu` | `teach2026!` | `instructor` | `/instructor` |

> 💡 **Note on Role Protection:** The Next.js Middleware (`middleware.ts`) automatically inspects the user's role on protected routes. For example, a student navigating to `/admin` will be redirected to their `/dashboard`.

---

## 📁 Project Structure & Routing

```
srs-web/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx               # Dedicated Login page (Credentials + Google OAuth)
│   │   ├── register/page.tsx            # Dedicated Register page
│   │   └── forgot-password/page.tsx     # Password recovery
│   ├── admin/                           # Admin Workspace (Protected)
│   │   ├── page.tsx                     # Inquiries & Consultations Overview
│   │   ├── students/page.tsx            # Student Roster & Account Creation CRUD
│   │   ├── tutors/page.tsx              # Faculty Hiring & Public Tutor Profiles CRUD
│   │   ├── programs/page.tsx            # Curriculum Programs & Media CRUD
│   │   ├── scheduling/page.tsx          # Weekly Scheduling & Overlap Conflicts
│   │   └── attendance/page.tsx          # Learner Oversight & Trend Scores
│   ├── instructor/                      # Instructor Workspace (Protected)
│   │   ├── page.tsx                     # Command Center Overview & Submissions Queue
│   │   ├── courses/                     # Assigned Course Outlines & Syllabi
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx            # Module & Lesson CRUD Editor
│   │   └── assignments/                 # Coursework & Submissions Grading
│   │       ├── page.tsx
│   │       └── [id]/submissions/[subId]/page.tsx # Work Viewer & Grading
│   ├── dashboard/                       # Student Learning Portal (Protected)
│   │   ├── page.tsx                     # Progress Overview & To-Do Checklist
│   │   ├── my-learning/                 # Enrolled Courses & Detailed Syllabi
│   │   ├── assignments/                 # Course Submissions & Document Uploads
│   │   ├── schedule/                    # Interactive Weekly Room Timetable
│   │   └── messages/                    # Realtime Chat with Faculty via Socket.IO
│   ├── layout.tsx                       # Root layout with Providers
│   └── page.tsx                         # Public Homepage
├── components/
│   ├── shared/                          # Reusable shared components (ImageUploadField, Navbar, Footer)
│   └── ui/                              # shadcn UI components (table, skeleton, badge, dialog, etc.)
├── hooks/
│   └── api/                             # TanStack React Query custom hooks
├── lib/
│   ├── api/                             # API Client, endpoints & session handlers
│   ├── auth.ts                          # NextAuth configuration
│   └── instructorStore.ts               # In-memory instructor & outline state
└── middleware.ts                        # Route protection & role-based redirection
```

---

## ⚡ Available Scripts

In the `srs-web` directory, you can run:

```bash
# Start local development server with Webpack
npm run dev

# Run TypeScript typecheck without emitting output
npx tsc --noEmit

# Build production bundle with optimized static & dynamic pages
npm run build

# Start production server
npm run start

# Run ESLint validation
npm run lint
```

---

## 📐 Key Design & Architecture Principles

1. **shadcn UI Components First**:
   Always search and utilize existing components in `@/components/ui/*` (`Table`, `Badge`, `Skeleton`, `Dialog`, `Select`). Avoid raw HTML tables or inconsistent custom buttons.
2. **Skeleton Loading States**:
   Every async loading state uses shadcn `Skeleton` instead of generic spinners to preserve visual layout geometry during data transitions.
3. **Database Alignment**:
   Sample data across all dashboards is capped at **2 clean items**, exactly matching the schema of MongoDB collections in `srs-server`.
4. **Session Token Expiry**:
   User sessions enforce a strict **24-hour limit** (`24 * 60 * 60 * 1000` ms). Overdue sessions automatically expire and redirect to `/login?error=session_expired`.
5. **Clean Local Storage**:
   Only `srs_user_session` is stored for client authentication. Bulk data stores (`srs_*_store_v1`) are completely eliminated from `localStorage`.
6. **Zero '#' Anchor Routes**:
   All detail views and modals use clean, nested Next.js App Router paths (e.g. `/instructor/courses/[id]`, `/instructor/assignments/[id]/submissions/[subId]`).

---

## ❓ Troubleshooting & FAQ

#### 1. NextAuth redirect error or "Cannot read properties of undefined"
- Check that `NEXTAUTH_SECRET` is set in `.env.local`.
- Verify that `NEXTAUTH_URL` matches your local address (`http://localhost:3000`).

#### 2. CORS or "Failed to fetch from backend"
- Ensure `srs-server` is running on port `4000`.
- Verify `NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1` in `.env.local`.
- Check if your server port is blocked by running: `lsof -i :4000`.

#### 3. Why did my session expire?
- The platform enforces an automatic 24-hour session security timeout. Simply log back in with your credentials or Google account.
