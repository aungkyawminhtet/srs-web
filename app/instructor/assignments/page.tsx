"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileCheck2,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  FileText,
  User,
  ExternalLink,
  Trash2,
  Check,
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
} from "@/lib/instructorStore";

export default function InstructorAssignmentsPage() {
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [assignedPrograms, setAssignedPrograms] = useState<Program[]>([]);
  const [assignments, setAssignments] = useState<InstructorAssignment[]>([]);
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);

  const [activeTab, setActiveTab] = useState<"submissions" | "assignments">("submissions");
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Create Assignment Modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCourseId, setNewCourseId] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDueDate, setNewDueDate] = useState("2026-11-28");
  const [newMaxPoints, setNewMaxPoints] = useState(100);

  // Grading Modal
  const [gradingSub, setGradingSub] = useState<StudentSubmission | null>(null);
  const [gradeInput, setGradeInput] = useState<number>(90);
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
      if (matched.length > 0) {
        setNewCourseId(matched[0].id);
      }

      const asgs = instructorStore.getAssignmentsForCourses(courseIds);
      setAssignments(asgs);
      const subs = instructorStore.getSubmissionsForCourses(courseIds);
      setSubmissions(subs);
    }
    setIsLoading(false);
  }, []);

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCourseId) return;

    const prog = PROGRAMS.find((p) => p.id === newCourseId);

    const created = instructorStore.createAssignment({
      title: newTitle,
      courseId: newCourseId,
      courseTitle: prog?.title || "Assigned Course",
      description: newDesc,
      dueDate: newDueDate,
      maxPoints: Number(newMaxPoints),
      status: "active",
    });

    if (instructor) {
      const refreshed = instructorStore.getAssignmentsForCourses(
        instructor.assignedCourses || []
      );
      setAssignments(refreshed);
    }

    setIsCreateOpen(false);
    setNewTitle("");
    setNewDesc("");
  };

  const handleOpenGrading = (sub: StudentSubmission) => {
    setGradingSub(sub);
    setGradeInput(sub.grade || Math.round(sub.maxPoints * 0.92));
    setFeedbackInput(
      sub.feedback ||
        `Well done ${sub.studentName.split(" ")[0]}! Your calculations are accurate and clear.`
    );
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingSub) return;

    instructorStore.gradeSubmission(gradingSub.id, Number(gradeInput), feedbackInput);

    if (instructor) {
      const refreshedSubs = instructorStore.getSubmissionsForCourses(
        instructor.assignedCourses || []
      );
      setSubmissions(refreshedSubs);
    }
    setGradingSub(null);
  };

  const filteredSubmissions = submissions.filter((s) => {
    if (selectedCourseFilter !== "all" && s.courseId !== selectedCourseFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        s.studentName.toLowerCase().includes(q) ||
        s.studentEmail.toLowerCase().includes(q) ||
        s.content.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredAssignments = assignments.filter((a) => {
    if (selectedCourseFilter !== "all" && a.courseId !== selectedCourseFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.courseTitle.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const pendingCount = submissions.filter((s) => s.status === "submitted").length;
  const gradedCount = submissions.filter((s) => s.status === "graded").length;

  return (
    <div className="space-y-6">
      {/* Header & Main Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] font-display">
            Assignments &amp; Grading Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Issue coursework to your assigned programs and evaluate student submissions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Assignment</span>
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Active Coursework</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">
            {assignments.length}
          </div>
          <div className="text-[11px] text-[#0A5C4C] font-semibold mt-1">
            Across {assignedPrograms.length} courses
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Submissions Received</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">
            {submissions.length}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            From enrolled learners
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Awaiting Grade</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">
            {pendingCount}
          </div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">
            Pending instructor feedback
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Graded &amp; Returned</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">
            {gradedCount}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            Marks &amp; notes published
          </div>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab("submissions")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "submissions"
                ? "bg-white text-[#0B1E2B] shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Student Submissions ({submissions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("assignments")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "assignments"
                ? "bg-white text-[#0B1E2B] shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Assignments List ({assignments.length})
          </button>
        </div>

        {/* Filter by course and search */}
        <div className="flex items-center gap-2 flex-1 min-w-[240px] justify-end">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student or coursework..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
            />
          </div>

          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none"
          >
            <option value="all">All Assigned Courses</option>
            {assignedPrograms.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ========================================================
          VIEW 1: SUBMISSIONS QUEUE & GRADING
      ======================================================== */}
      {activeTab === "submissions" && (
        <div className="space-y-4">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-3.5">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div
                  key={`sub-skel-${idx}`}
                  className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <div className="space-y-1.5">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-24 rounded-full" />
                  </div>
                  <Skeleton className="h-14 w-full rounded-2xl" />
                  <div className="flex justify-between pt-2 border-t border-slate-100">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-8 w-28 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredSubmissions.length > 0 ? (
            <div className="grid grid-cols-1 gap-3.5">
              {filteredSubmissions.map((sub) => {
                const asg = assignments.find((a) => a.id === sub.assignmentId);
                const isGraded = sub.status === "graded";

                return (
                  <div
                    key={sub.id}
                    className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#EAF5F2] text-[#0A5C4C] font-bold text-xs flex items-center justify-center shrink-0">
                          {sub.studentAvatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm text-[#0B1E2B]">
                              {sub.studentName}
                            </h3>
                            <span className="text-[11px] text-slate-400">
                              ({sub.studentEmail})
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            Assignment: <strong className="text-slate-700">{asg?.title || "Class Assignment"}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <span className="text-[11px] text-slate-400">{sub.submittedAt}</span>
                        {isGraded ? (
                          <Badge className="bg-emerald-100 text-emerald-800 border-none text-[11px] font-bold">
                            Graded: {sub.grade}/{sub.maxPoints} pts
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-100 text-amber-800 border-none text-[11px] font-bold">
                            Awaiting Evaluation
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Student work excerpt */}
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-700 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Student Submission Text &amp; Attachments
                      </div>
                      <p className="leading-relaxed italic">&ldquo;{sub.content}&rdquo;</p>
                      {sub.attachmentName && (
                        <div className="text-xs font-semibold text-[#0A5C4C] flex items-center gap-1.5 pt-1">
                          <FileText className="w-4 h-4" />
                          <span>{sub.attachmentName}</span>
                        </div>
                      )}
                    </div>

                    {/* Feedback if graded */}
                    {isGraded && (
                      <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 text-xs text-emerald-950 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Instructor Feedback Given:</span>
                        </div>
                        <p className="leading-relaxed">{sub.feedback}</p>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <Link
                        href={`/instructor/assignments/${sub.assignmentId}`}
                        className="text-[11px] font-semibold text-slate-500 hover:text-[#0A5C4C]"
                      >
                        View Assignment Details
                      </Link>

                      <Link
                        href={`/instructor/assignments/${sub.assignmentId}/submissions/${sub.id}`}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                          isGraded
                            ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                            : "bg-[#0A5C4C] hover:bg-[#08483B] text-white shadow-xs"
                        }`}
                      >
                        <span>{isGraded ? "Review Grade" : "Evaluate & Award Grade"}</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">No Submissions Found</h3>
              <p className="text-xs text-slate-400">
                When students enrolled in your courses complete tasks, their work appears here.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          VIEW 2: ASSIGNMENTS LIST
      ======================================================== */}
      {activeTab === "assignments" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoading ? (
              Array.from({ length: 2 }).map((_, idx) => (
                <div
                  key={`asg-skel-${idx}`}
                  className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs space-y-3"
                >
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-24 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-10 w-full" />
                  <div className="flex gap-3">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex justify-between">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))
            ) : (
              filteredAssignments.map((asg) => (
              <div
                key={asg.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-slate-100 text-slate-700 text-[10px] font-semibold"
                    >
                      {asg.courseTitle}
                    </Badge>
                    <Badge className="bg-emerald-100 text-emerald-800 border-none text-[10px] font-bold">
                      {asg.status.toUpperCase()}
                    </Badge>
                  </div>

                  <h3 className="text-base font-black text-[#0B1E2B] font-display">
                    {asg.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {asg.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-[#0A5C4C]" />
                      Due {asg.dueDate}
                    </span>
                    <span>·</span>
                    <span>{asg.maxPoints} Points Max</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Created: {asg.createdAt}</span>
                  <Link
                    href={`/instructor/assignments/${asg.id}`}
                    className="text-xs font-bold text-[#0A5C4C] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Submissions &amp; Details</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: CREATE NEW ASSIGNMENT
      ======================================================== */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-xl font-black text-[#0B1E2B] font-display">
              Create Coursework Assignment
            </h3>

            <form onSubmit={handleCreateAssignment} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Assign to Course *
                </label>
                <select
                  required
                  value={newCourseId}
                  onChange={(e) => setNewCourseId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#0A5C4C]"
                >
                  {assignedPrograms.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.grades})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Assignment Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Linear Graphs &amp; Slope Calculation Mini-Project"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Max Points
                  </label>
                  <input
                    type="number"
                    required
                    value={newMaxPoints}
                    onChange={(e) => setNewMaxPoints(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Instructions &amp; Prompts *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Detail the instructions, exercises or problems students need to solve..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white font-bold rounded-xl text-xs shadow-xs"
                >
                  Publish Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: GRADING SUBMISSION
      ======================================================== */}
      {gradingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-[#0B1E2B] font-display">
                  Grade Submission
                </h3>
                <p className="text-xs text-slate-500">
                  Student: <strong className="text-slate-800">{gradingSub.studentName}</strong>
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

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-700">Submitted Content:</span>
              <p className="bg-white p-3 rounded-xl border border-slate-200 text-slate-800 italic">
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
                  value={gradeInput}
                  onChange={(e) => setGradeInput(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#0B1E2B] focus:outline-none focus:border-[#0A5C4C]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Personalized Feedback *
                </label>
                <textarea
                  rows={3}
                  required
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  placeholder="Offer constructive feedback to help the student continue improving..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
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
                  className="px-5 py-2.5 bg-[#0A5C4C] hover:bg-[#08483B] text-white font-bold rounded-xl text-xs shadow-xs"
                >
                  Save &amp; Return Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
