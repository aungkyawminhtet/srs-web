"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  FileCheck2,
  MessageSquare,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Video,
  Calendar,
  Sparkles,
  ChevronRight,
  Layers,
  Send,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getStoredAuth } from "@/lib/api/client";
import { PROGRAMS, Program } from "@/lib/data";
import {
  instructorStore,
  Instructor,
  InstructorAssignment,
  StudentSubmission,
  ChatThread,
} from "@/lib/instructorStore";

export default function InstructorDashboardPage() {
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [assignedPrograms, setAssignedPrograms] = useState<Program[]>([]);
  const [assignments, setAssignments] = useState<InstructorAssignment[]>([]);
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Quick grading modal
  const [gradingSub, setGradingSub] = useState<StudentSubmission | null>(null);
  const [scoreInput, setScoreInput] = useState<number>(90);
  const [feedbackInput, setFeedbackInput] = useState<string>("");

  useEffect(() => {
    const auth = getStoredAuth();
    let current: Instructor | undefined;

    if (auth?.email) {
      current = instructorStore.getInstructorByEmail(auth.email);
    }
    if (!current) {
      current = instructorStore.getInstructorById("INS-101");
    }

    if (current) {
      setInstructor(current);
      const courseIds = current.assignedCourses || ["math-that-clicks", "algebra-with-confidence"];
      const matched = PROGRAMS.filter((p) => courseIds.includes(p.id));
      setAssignedPrograms(matched);

      // Load assignments & submissions
      const asgs = instructorStore.getAssignmentsForCourses(courseIds);
      setAssignments(asgs);
      const subs = instructorStore.getSubmissionsForCourses(courseIds);
      setSubmissions(subs);
    }

    setThreads(instructorStore.getThreads());
    setIsLoading(false);
  }, []);

  const pendingSubmissions = submissions.filter((s) => s.status === "submitted");

  const handleOpenGrading = (sub: StudentSubmission) => {
    setGradingSub(sub);
    setScoreInput(sub.maxPoints * 0.9);
    setFeedbackInput(
      `Great effort, ${sub.studentName.split(" ")[0]}! Your method is accurate and well organized.`
    );
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingSub) return;

    instructorStore.gradeSubmission(gradingSub.id, Number(scoreInput), feedbackInput);

    if (instructor) {
      const updatedSubs = instructorStore.getSubmissionsForCourses(
        instructor.assignedCourses || []
      );
      setSubmissions(updatedSubs);
    }
    setGradingSub(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0B1E2B] via-[#0D2838] to-[#0A5C4C] rounded-3xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_top_right,rgba(10,92,76,0.5),transparent)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instructor Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight">
              Welcome back, {instructor?.name || "Lin Chen"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {instructor?.title || "Senior Mathematics & Algebra Instructor"} · You have{" "}
              <strong className="text-emerald-300">{pendingSubmissions.length} student submissions</strong> awaiting grading today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/instructor/courses"
              className="px-4 py-2.5 bg-white text-[#0B1E2B] hover:bg-slate-100 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-[#0A5C4C]" />
              <span>Manage Course Outlines</span>
            </Link>
            <Link
              href="/instructor/assignments"
              className="px-4 py-2.5 bg-[#0A5C4C] hover:bg-[#08483B] text-white rounded-xl font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 border border-emerald-500/30"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Review Assignments</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Assigned Courses
            </span>
            <BookOpen className="w-4 h-4 text-[#0A5C4C]" />
          </div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1.5 font-display">
            {assignedPrograms.length}
          </div>
          <div className="text-[11px] text-[#0A5C4C] font-semibold mt-1">
            Authorized by Organization Owner
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Active Learners
            </span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1.5 font-display">
            28
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Enrolled across your classes
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Pending Submissions
            </span>
            <FileCheck2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1.5 font-display">
            {pendingSubmissions.length}
          </div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            Require grading &amp; feedback
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Teaching Hours
            </span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1.5 font-display">
            {instructor?.workloadHours || 18} / {instructor?.maxHours || 20} h
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Weekly allocated capacity
          </div>
        </div>
      </div>

      {/* Main Grid: Assigned Courses (7 cols) + Pending Submissions (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Assigned Courses & Outlines (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-[#0B1E2B] font-display">
                My Assigned Programs
              </h2>
              <p className="text-xs text-slate-500">
                Courses granted to your instructor account by the Admin.
              </p>
            </div>
            <Link
              href="/instructor/courses"
              className="text-xs font-bold text-[#0A5C4C] hover:underline flex items-center gap-1"
            >
              <span>View all outlines</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {isLoading ? (
              Array.from({ length: 2 }).map((_, idx) => (
                <div
                  key={`ins-prog-skel-${idx}`}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10 rounded-xl" />
                      <div className="space-y-1.5">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-28" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-full" />
                  <div className="flex justify-between pt-2 border-t border-slate-100">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-7 w-20 rounded-lg" />
                  </div>
                </div>
              ))
            ) : (
              assignedPrograms.map((prog) => {
              const outline = instructorStore.getCourseOutline(prog.id);
              const modulesCount = outline?.modules?.length || prog.curriculumModules?.length || 3;
              const lessonsCount = outline?.modules?.reduce(
                (sum, m) => sum + (m.lessons?.length || 0),
                0
              ) || 8;

              return (
                <div
                  key={prog.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center font-bold">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-black text-[#0B1E2B] font-display">
                          {prog.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] font-semibold text-slate-500">
                            {prog.grades}
                          </span>
                          <span className="text-slate-300">·</span>
                          <Badge
                            variant="secondary"
                            className="bg-slate-100 text-slate-700 text-[10px]"
                          >
                            {prog.categoryTag || "Academic Program"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <Badge className="bg-emerald-100 text-emerald-800 border-none text-[10px] font-bold">
                      Teaching Active
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {prog.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                      <span>
                        <strong className="text-slate-800">{modulesCount}</strong> Modules
                      </span>
                      <span>·</span>
                      <span>
                        <strong className="text-slate-800">{lessonsCount}</strong> Lessons
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/instructor/courses/${prog.id}`}
                        className="px-3 py-1.5 bg-[#0A5C4C] hover:bg-[#08483B] text-white font-bold rounded-lg text-xs transition-colors"
                      >
                        Edit Outline
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
            )}
          </div>

          {/* Owner Notice Card */}
          <div className="bg-[#FAF7EC] rounded-2xl p-4 border border-[#ECE5CD] flex items-start gap-3 text-xs text-amber-950">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold">Need access to additional courses?</span>
              <p className="text-amber-900/90 leading-relaxed text-[11px]">
                Course permissions are designated by the institution Owner (Admin). To request new program assignments, message Jamie Lee in the Chatbox.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Pending Grading & Quick Review (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-[#0B1E2B] font-display">
                Submissions to Grade
              </h2>
              <p className="text-xs text-slate-500">
                Student work submitted for your assignments.
              </p>
            </div>
            <Link
              href="/instructor/assignments"
              className="text-xs font-bold text-[#0A5C4C] hover:underline"
            >
              All assignments
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100 overflow-hidden">
            {isLoading ? (
              Array.from({ length: 2 }).map((_, idx) => (
                <div key={`sub-skel-${idx}`} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-28" />
                        <Skeleton className="h-2.5 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-16 rounded-md" />
                  </div>
                  <Skeleton className="h-16 w-full rounded-xl" />
                  <Skeleton className="h-8 w-full rounded-xl" />
                </div>
              ))
            ) : pendingSubmissions.length > 0 ? (
              pendingSubmissions.map((sub) => {
                const asg = assignments.find((a) => a.id === sub.assignmentId);
                return (
                  <div key={sub.id} className="p-4 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0">
                          {sub.studentAvatar}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-[#0B1E2B]">
                            {sub.studentName}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {sub.submittedAt}
                          </div>
                        </div>
                      </div>

                      <Badge
                        variant="secondary"
                        className="bg-amber-100 text-amber-800 text-[10px] font-bold border-none"
                      >
                        Needs Grade
                      </Badge>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {asg?.title || "Course Assignment"}
                      </div>
                      <p className="text-slate-700 mt-1 line-clamp-2 italic">
                        &ldquo;{sub.content}&rdquo;
                      </p>
                      {sub.attachmentName && (
                        <div className="mt-1.5 text-[11px] font-semibold text-[#0A5C4C] flex items-center gap-1">
                          <span>📎 {sub.attachmentName}</span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenGrading(sub)}
                      className="w-full py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Grade &amp; Give Feedback
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-sm text-[#0B1E2B]">All caught up!</div>
                <p className="text-xs text-slate-400">
                  No submissions pending evaluation at this moment.
                </p>
              </div>
            )}
          </div>

          {/* Quick Chat Activity */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#0A5C4C]" />
                <h3 className="text-xs font-bold text-[#0B1E2B]">Recent Inquiries</h3>
              </div>
              <Link
                href="/instructor/messages"
                className="text-xs font-semibold text-[#0A5C4C] hover:underline"
              >
                Open Chatbox
              </Link>
            </div>

            <div className="space-y-2">
              {threads.slice(0, 2).map((th) => (
                <Link
                  key={th.id}
                  href="/instructor/messages"
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 flex items-center justify-between text-xs transition-colors block"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-slate-800 truncate">
                      {th.participantName}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {th.lastMessage}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {th.lastMessageTime}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          MODAL: QUICK SUBMISSION GRADING
      ======================================================== */}
      {gradingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-[#0B1E2B] font-display">
                  Grade Student Submission
                </h3>
                <p className="text-xs text-slate-500">
                  Student: <strong className="text-slate-800">{gradingSub.studentName}</strong> ({gradingSub.studentEmail})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setGradingSub(null)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                Close
              </button>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
              <div className="font-bold text-slate-800">Student Work / Description:</div>
              <p className="text-slate-700 leading-relaxed italic bg-white p-3 rounded-xl border border-slate-200">
                &ldquo;{gradingSub.content}&rdquo;
              </p>
              {gradingSub.attachmentName && (
                <div className="text-xs font-semibold text-[#0A5C4C]">
                  Attachment: {gradingSub.attachmentName}
                </div>
              )}
            </div>

            <form onSubmit={handleSaveGrade} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Score (Out of {gradingSub.maxPoints} pts) *
                </label>
                <input
                  type="number"
                  min="0"
                  max={gradingSub.maxPoints}
                  required
                  value={scoreInput}
                  onChange={(e) => setScoreInput(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#0B1E2B] focus:outline-none focus:border-[#0A5C4C] focus:ring-2 focus:ring-[#0A5C4C]/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Constructive Instructor Feedback *
                </label>
                <textarea
                  rows={3}
                  required
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  placeholder="Provide encouragement and guidance on steps they can improve..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C] focus:ring-2 focus:ring-[#0A5C4C]/20"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setGradingSub(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0A5C4C] hover:bg-[#08483B] text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Submit Grade &amp; Return Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
