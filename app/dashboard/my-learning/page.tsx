"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  BookOpen,
  User,
  MessageSquare,
  Calendar,
  X,
  FileText,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useMyEnrollmentsQuery } from "@/hooks/api";
import { Skeleton } from "@/components/ui/skeleton";

interface EnrolledCourse {
  id: string;
  code?: string;
  title: string;
  subject: string;
  level: string;
  description: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  nextMeeting: string;
  advisor: {
    name: string;
    role: string;
    avatar: string;
    email: string;
    bio: string;
  };
  syllabus: Array<{ title: string; desc: string; done: boolean }>;
  todoPlan: Array<{ id: string; task: string; dueDate: string; done: boolean }>;
}

// 2 sample items aligned with DB
const ENROLLED_COURSES: EnrolledCourse[] = [
  {
    id: "algebra-1",
    code: "MATH-101",
    title: "Algebra I, minus the overwhelm",
    subject: "Mathematics",
    level: "Grades 8–10",
    description: "Step-by-step mastery of linear equations, multi-step balancing, checking steps, and graph coordinates.",
    progress: 62,
    completedLessons: 5,
    totalLessons: 8,
    nextMeeting: "Today at 5:00 PM ET",
    advisor: {
      name: "Lin Chen",
      role: "Lead Academic Advisor & Mathematics Mentor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      email: "lin.chen@tutoreem.edu",
      bio: "7+ years mentoring students into confident mathematical thinkers with zero stress.",
    },
    syllabus: [
      { title: "Module 1", desc: "Linear equations & inverse operations", done: true },
      { title: "Module 2", desc: "Multi-step balancing & checking steps", done: true },
      { title: "Module 3", desc: "Graphing slopes, intercepts & systems", done: true },
      { title: "Module 4", desc: "Linear inequalities & coordinate grids", done: false },
      { title: "Module 5", desc: "Real-world word problems & exam prep", done: false },
    ],
    todoPlan: [
      { id: "t1", task: "Multi-step equations · Practice 03", dueDate: "Due today, 11:59 PM", done: false },
      { id: "t2", task: "Review Lin's feedback on Equation balance warm-up", dueDate: "Tomorrow", done: true },
      { id: "t3", task: "Live 1-on-1 Session: Linear equations", dueDate: "Today 5:00 PM", done: false },
    ],
  },
  {
    id: "db-systems",
    code: "CS-1501208",
    title: "1501208 Database Systems",
    subject: "Computer Science",
    level: "Advanced High School & College Prep",
    description: "Relational database models, SQL query design, entity-relationship diagrams, and relational algebra.",
    progress: 75,
    completedLessons: 9,
    totalLessons: 12,
    nextMeeting: "Thursday at 10:00 AM (Room S1 202)",
    advisor: {
      name: "Lin Chen",
      role: "Computer Science Advisor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      email: "lin.chen@tutoreem.edu",
      bio: "Passionate about software architecture, clean schema normalization, and database optimization.",
    },
    syllabus: [
      { title: "Module 1", desc: "Relational Data Models & Schema Design", done: true },
      { title: "Module 2", desc: "SQL DDL, DML & Join Optimization", done: true },
      { title: "Module 3", desc: "Normalization: 1NF through BCNF", done: true },
      { title: "Module 4", desc: "Transaction Processing & ACID Properties", done: false },
    ],
    todoPlan: [
      { id: "t6", task: "Database Normalization Drill 4", dueDate: "Nov 21", done: false },
      { id: "t7", task: "Lab 4 SQL Schema Implementation", dueDate: "Nov 19", done: false },
    ],
  },
];

export default function MyLearningPage() {
  const { data: serverEnrollments, isLoading: isEnrollmentsLoading } = useMyEnrollmentsQuery();
  const [courses, setCourses] = useState<EnrolledCourse[]>(ENROLLED_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null);

  useEffect(() => {
    if (serverEnrollments && Array.isArray(serverEnrollments) && serverEnrollments.length > 0) {
      const live = serverEnrollments.map((enr: any, idx: number) => {
        const fallback = ENROLLED_COURSES[idx % ENROLLED_COURSES.length];
        return {
          id: enr._id || fallback.id,
          code: enr.programId?.code || fallback.code,
          title: enr.programTitle || fallback.title,
          subject: fallback.subject,
          level: fallback.level,
          description: fallback.description,
          progress: enr.progressPercent || enr.progress || fallback.progress,
          completedLessons: enr.completedLessons || fallback.completedLessons,
          totalLessons: enr.totalLessons || fallback.totalLessons,
          nextMeeting: fallback.nextMeeting,
          advisor: {
            name: enr.advisorName || (enr.advisorId as any)?.name || fallback.advisor.name,
            role: (enr.advisorId as any)?.title || fallback.advisor.role,
            avatar: (enr.advisorId as any)?.avatar || fallback.advisor.avatar,
            email: (enr.advisorId as any)?.email || fallback.advisor.email,
            bio: (enr.advisorId as any)?.bio || fallback.advisor.bio,
          },
          syllabus: fallback.syllabus,
          todoPlan: fallback.todoPlan,
        };
      });
      setCourses(live);
    }
  }, [serverEnrollments]);

  const toggleTodo = (courseId: string, todoId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        return {
          ...c,
          todoPlan: c.todoPlan.map((t) =>
            t.id === todoId ? { ...t, done: !t.done } : t
          ),
        };
      })
    );

    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          todoPlan: prev.todoPlan.map((t) =>
            t.id === todoId ? { ...t, done: !t.done } : t
          ),
        };
      });
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-slate-400 font-mono block mb-1.5">
            Student Portal · Active Enrolled Programs
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#0B1E2B] tracking-tight font-display">
            My Enrolled Courses
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed">
            Click any course card to inspect complete syllabus progress, to-do checklist, and chat directly with your course advisor.
          </p>
        </div>

        <Link
          href="/dashboard/schedule"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-full px-4 py-2.5 shadow-2xs transition-all shrink-0 self-start sm:self-auto"
        >
          <Calendar className="w-4 h-4 text-[#0A5C4C]" />
          <span>Weekly timetable</span>
        </Link>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isEnrollmentsLoading ? (
          Array.from({ length: 2 }).map((_, idx) => (
            <div
              key={`enr-skel-${idx}`}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4"
            >
              <div className="flex justify-between">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-2 w-full rounded-full" />
              <div className="bg-slate-50 rounded-2xl p-3 flex justify-between border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-3.5 w-28" />
                    <Skeleton className="h-2.5 w-36" />
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          ))
        ) : (
          courses.map((course) => (
          <div
            key={course.id}
            onClick={() => setSelectedCourse(course)}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-[#0A5C4C]/40 transition-all cursor-pointer flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A5C4C] bg-[#EAF5F2] border border-[#0A5C4C]/20 px-2.5 py-0.5 rounded-full font-mono">
                  {course.subject}
                </span>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {course.completedLessons}/{course.totalLessons} lessons
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#0B1E2B] group-hover:text-[#0A5C4C] transition-colors font-display line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>Course Progress</span>
                  <span className="text-[#0A5C4C] font-bold">{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0A5C4C] rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Advisor Info Chip */}
              <div className="bg-slate-50 rounded-2xl p-3 flex items-center justify-between gap-3 border border-slate-100">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#0A5C4C] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {course.advisor.name[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {course.advisor.name}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      Assigned Advisor
                    </div>
                  </div>
                </div>

                <Link
                  href={`/dashboard/messages?advisor=${encodeURIComponent(course.advisor.name)}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0A5C4C] hover:bg-[#EAF5F2] px-2.5 py-1 rounded-full transition-colors shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </Link>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0A5C4C]">
              <span>Inspect syllabus &amp; to-dos</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))
        )}
      </div>

      {/* Course Detail Modal (All details, progress, to-do plan, and advisor chat) */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative">
            <button
              type="button"
              onClick={() => setSelectedCourse(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A5C4C] bg-[#EAF5F2] px-2.5 py-1 rounded-full border border-[#0A5C4C]/20 font-mono">
                {selectedCourse.subject} · {selectedCourse.level}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] font-display mt-2">
                {selectedCourse.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {selectedCourse.description}
              </p>
            </div>

            {/* Complete Progress Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Overall Course Completion</span>
                <span className="text-lg font-black text-[#0A5C4C] font-display">{selectedCourse.progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0A5C4C] rounded-full transition-all"
                  style={{ width: `${selectedCourse.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>{selectedCourse.completedLessons} of {selectedCourse.totalLessons} lessons finished</span>
                <span>Next session: <strong className="text-slate-800">{selectedCourse.nextMeeting}</strong></span>
              </div>
            </div>

            {/* Advisor Card with Direct Chat */}
            <div className="bg-[#EAF5F2]/50 border border-[#0A5C4C]/25 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#0A5C4C] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
                  {selectedCourse.advisor.name[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0B1E2B]">
                    {selectedCourse.advisor.name}
                  </div>
                  <div className="text-xs text-[#0A5C4C] font-semibold">
                    {selectedCourse.advisor.role}
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                    {selectedCourse.advisor.bio}
                  </p>
                </div>
              </div>

              <Link
                href={`/dashboard/messages?advisor=${encodeURIComponent(selectedCourse.advisor.name)}`}
                className="inline-flex items-center justify-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xs transition-all shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Direct Chat with Advisor</span>
              </Link>
            </div>

            {/* Necessary To-Do Plan for this Course */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#0B1E2B] font-display">
                  Necessary To-Do Plan
                </h3>
                <span className="text-xs text-slate-400">Click check to toggle completion</span>
              </div>

              <div className="space-y-2">
                {selectedCourse.todoPlan.map((todo) => (
                  <div
                    key={todo.id}
                    onClick={() => toggleTodo(selectedCourse.id, todo.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      todo.done
                        ? "bg-slate-50 border-slate-200 text-slate-400"
                        : "bg-white border-slate-200/90 text-slate-900 hover:border-[#0A5C4C]/40"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                          todo.done
                            ? "bg-[#0A5C4C] border-[#0A5C4C] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {todo.done && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className={`text-xs font-medium truncate ${todo.done ? "line-through" : ""}`}>
                        {todo.task}
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold text-slate-500 shrink-0">
                      {todo.dueDate}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Syllabus */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-[#0B1E2B] font-display">
                Curriculum Syllabus
              </h3>
              <div className="space-y-2">
                {selectedCourse.syllabus.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-800">{item.title}: </span>
                      <span className="text-slate-600">{item.desc}</span>
                    </div>
                    {item.done ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A5C4C] bg-[#EAF5F2] px-2 py-0.5 rounded-full shrink-0">
                        Complete
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                        Upcoming
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
