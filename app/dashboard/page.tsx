"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Video,
  ArrowUpRight,
  ArrowRight,
  FileText,
  CheckCircle2,
  Clock,
  BookOpen,
  Calendar,
  User,
  AlertTriangle,
  AlertCircle,
  Radio,
  Sparkles,
  BarChart2,
  ChevronRight,
} from "lucide-react";
import { useMyEnrollmentsQuery } from "@/hooks/api";
import { Skeleton } from "@/components/ui/skeleton";

interface HighProgressProgram {
  id: string;
  title: string;
  subject: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  advisor: string;
  nextSession: string;
}

// 2 sample items aligned with DB
const HIGH_PROGRESS_PROGRAMS: HighProgressProgram[] = [
  {
    id: "db-systems",
    title: "1501208 Database Systems",
    subject: "Computer Science",
    progress: 75,
    completedLessons: 9,
    totalLessons: 12,
    advisor: "Lin Chen",
    nextSession: "Thursday at 10:00 AM (Room S1 202)",
  },
  {
    id: "algebra-1",
    title: "Algebra I, minus the overwhelm",
    subject: "Mathematics",
    progress: 62,
    completedLessons: 5,
    totalLessons: 8,
    advisor: "Lin Chen",
    nextSession: "Today at 5:00 PM ET",
  },
];

interface TodoTask {
  id: string;
  title: string;
  course: string;
  dueText: string;
  status: "assigned" | "missing" | "done";
  isCloseDeadline?: boolean;
  deadlineWarning?: string;
  isLiveSession?: boolean;
  meta: string;
}

// 2 sample items aligned with DB
const INITIAL_TODOS: TodoTask[] = [
  {
    id: "todo-session-1",
    title: "Algebra I: Linear equations · Live 1-on-1 Session",
    course: "Algebra I, minus the overwhelm",
    dueText: "Starts in 15 mins (5:00 PM ET)",
    status: "assigned",
    isLiveSession: true,
    meta: "Tutor: Lin Chen · Video classroom ready",
    deadlineWarning: "Attendance required for live session credit",
  },
  {
    id: "todo-1",
    title: "Multi-step equations · Practice 03",
    course: "Algebra I, minus the overwhelm",
    dueText: "Due today, 11:59 PM",
    status: "assigned",
    isCloseDeadline: true,
    deadlineWarning: "Less than 6 hours left to submit before today's cutoff",
    meta: "8 questions · ~15 mins",
  },
];

export default function StudentDashboardPage() {
  const { data: serverEnrollments, isLoading: isEnrollmentsLoading } = useMyEnrollmentsQuery();
  const [todos, setTodos] = useState<TodoTask[]>(INITIAL_TODOS);
  const [highProgressPrograms, setHighProgressPrograms] = useState<HighProgressProgram[]>(
    HIGH_PROGRESS_PROGRAMS.sort((a, b) => b.progress - a.progress).slice(0, 2)
  );

  useEffect(() => {
    if (serverEnrollments && Array.isArray(serverEnrollments) && serverEnrollments.length > 0) {
      const mapped = serverEnrollments.map((enr: any, idx: number) => {
        const fallback = HIGH_PROGRESS_PROGRAMS[idx % HIGH_PROGRESS_PROGRAMS.length];
        return {
          id: enr._id || fallback.id,
          title: enr.programTitle || fallback.title,
          subject: fallback.subject,
          progress: enr.progressPercent || enr.progress || fallback.progress,
          completedLessons: enr.completedLessons || fallback.completedLessons,
          totalLessons: enr.totalLessons || fallback.totalLessons,
          advisor: enr.advisorName || fallback.advisor,
          nextSession: fallback.nextSession,
        };
      });
      setHighProgressPrograms(mapped.sort((a, b) => b.progress - a.progress).slice(0, 2));
    }
  }, [serverEnrollments]);

  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === "done" ? "assigned" : "done" } : t
      )
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5F2] border border-[#0A5C4C]/20 text-[#0A5C4C] text-xs font-bold uppercase tracking-wider font-mono mb-2.5">
            <span>Thursday, November 5, 2026</span>
            <span>·</span>
            <span>Student Dashboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#0B1E2B] tracking-tight font-display">
            Good afternoon, Emma.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed max-w-2xl">
            Track your enrolled courses, upcoming online meetings, and to-do deadlines in one place.
          </p>
        </div>

        <Link
          href="/dashboard/my-learning"
          className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-sm font-bold px-6 py-3 rounded-full shadow-xs transition-all shrink-0 self-start sm:self-auto"
        >
          <span>My Learning Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Warning Alert Card (Urgent live session & deadline) */}
      <div className="bg-[#0B212D] text-white rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 border border-emerald-500/20">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full font-mono flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Live Class In 15 Mins</span>
            </span>
            <span className="text-xs sm:text-sm text-amber-300 font-semibold flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Starts at 5:00 PM ET</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Algebra I: Linear equations · 1-on-1 Session
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Tutor: <strong className="text-white">Lin Chen</strong> · Room S1 202 is now open. Attendance is required for credit.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/dashboard/schedule/lesson-details"
            className="text-sm font-semibold text-slate-300 hover:text-white px-3.5 py-2 transition-colors"
          >
            Lesson Info
          </Link>
          <button
            type="button"
            onClick={() => alert("Joining live video classroom with Lin Chen...")}
            className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-sm font-bold px-6 py-3 rounded-full shadow-xs transition-all cursor-pointer"
          >
            <Video className="w-4 h-4" />
            <span>Join Classroom Now</span>
          </button>
        </div>
      </div>

      {/* Section: Current Learning Programs with High Progress (Top 2 or 3) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E2B] font-display flex items-center gap-2.5">
              <BarChart2 className="w-5 h-5 text-[#0A5C4C]" />
              <span>High Progress Programs</span>
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Top enrolled courses with your highest completion rates
            </p>
          </div>
          <Link
            href="/dashboard/my-learning"
            className="text-sm font-bold text-[#0A5C4C] hover:underline inline-flex items-center gap-1"
          >
            <span>All enrolled courses</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {isEnrollmentsLoading ? (
            Array.from({ length: 2 }).map((_, idx) => (
              <div
                key={`prog-skel-${idx}`}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-12" />
                </div>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-2.5 w-full rounded-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <div className="pt-3.5 border-t border-slate-100 flex justify-between">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))
          ) : (
            highProgressPrograms.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-[#0A5C4C]/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4C] bg-[#EAF5F2] border border-[#0A5C4C]/20 px-2.5 py-1 rounded-full font-mono">
                      {prog.subject}
                    </span>
                    <span className="text-base font-black text-[#0A5C4C] font-display">
                      {prog.progress}%
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-display line-clamp-1">
                    {prog.title}
                  </h3>

                  {/* Progress bar */}
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0A5C4C] rounded-full transition-all"
                      style={{ width: `${prog.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 pt-0.5">
                    <span>{prog.completedLessons} of {prog.totalLessons} lessons done</span>
                    <span className="font-semibold text-slate-700">Tutor: {prog.advisor}</span>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-slate-500 truncate max-w-[190px]">
                    {prog.nextSession}
                  </span>
                  <Link
                    href="/dashboard/my-learning"
                    className="text-sm font-bold text-[#0A5C4C] hover:underline inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Section: To-Do Plan */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E2B] font-display">
              To-Do Plan &amp; Deadlines
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Live sessions to attend, homework practice, and reflection tasks
            </p>
          </div>

          <Link
            href="/dashboard/assignments"
            className="text-sm font-bold text-[#0A5C4C] hover:underline inline-flex items-center gap-1"
          >
            <span>Open assignments &amp; submit reports</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-3">
          {isEnrollmentsLoading ? (
            Array.from({ length: 2 }).map((_, idx) => (
              <div
                key={`todo-skel-${idx}`}
                className="p-4.5 rounded-2xl border border-slate-200 bg-white flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <Skeleton className="w-7 h-7 rounded-lg shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-56" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
                <Skeleton className="h-6 w-24 rounded-full shrink-0" />
              </div>
            ))
          ) : (
            todos.map((item) => {
            const isDone = item.status === "done";
            const isMissing = item.status === "missing";
            const isLive = item.isLiveSession;

            return (
              <div
                key={item.id}
                className={`p-4.5 rounded-2xl border transition-all ${
                  isLive
                    ? "border-l-4 border-l-[#0A5C4C] bg-[#EAF5F2]/40 border-slate-200"
                    : isMissing
                    ? "border-l-4 border-l-rose-500 bg-white border-slate-200"
                    : item.isCloseDeadline && !isDone
                    ? "border-l-4 border-l-amber-500 bg-white border-slate-200"
                    : isDone
                    ? "border-l-4 border-l-emerald-500/40 bg-slate-50/50 border-slate-200 opacity-80"
                    : "border-l-4 border-l-slate-300 bg-white border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <button
                      type="button"
                      onClick={() => handleToggleTodo(item.id)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors cursor-pointer ${
                        isDone
                          ? "bg-[#0A5C4C] text-white"
                          : "border border-slate-300 bg-white hover:bg-slate-100"
                      }`}
                    >
                      {isDone && <CheckCircle2 className="w-4 h-4" />}
                    </button>

                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-sm sm:text-base font-bold ${isDone ? "line-through text-slate-400" : "text-slate-900"}`}>
                          {item.title}
                        </span>

                        {isLive ? (
                          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EAF5F2] text-[#0A5C4C] border border-[#0A5C4C]/20 font-mono">
                            Live Session
                          </span>
                        ) : isMissing ? (
                          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-mono">
                            Missing
                          </span>
                        ) : item.isCloseDeadline && !isDone ? (
                          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-mono">
                            Due Today
                          </span>
                        ) : null}
                      </div>

                      <div className="text-xs sm:text-sm text-slate-600">
                        {item.course} · {item.meta}
                      </div>

                      {item.deadlineWarning && !isDone && (
                        <div className="mt-1 text-xs font-semibold text-amber-800 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>{item.deadlineWarning}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-xs sm:text-sm font-semibold text-slate-600 bg-slate-100 px-3.5 py-1 rounded-full shrink-0">
                    {item.dueText}
                  </span>
                </div>
              </div>
            );
          })
          )}
        </div>
      </div>
    </div>
  );
}
