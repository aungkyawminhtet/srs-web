"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";
import {
  instructorStore,
  StudentSubmission,
  InstructorAssignment,
} from "@/lib/instructorStore";

import { SubmissionWorkViewer } from "./_components/SubmissionWorkViewer";
import { GradingEvaluationForm } from "./_components/GradingEvaluationForm";

export default function SubmissionGradingPage() {
  const params = useParams();
  const router = useRouter();
  const assignmentId = params?.id as string;
  const submissionId = params?.submissionId as string;

  const [assignment, setAssignment] = useState<InstructorAssignment | null>(null);
  const [submission, setSubmission] = useState<StudentSubmission | null>(null);
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    const allAssignments = instructorStore.getAssignments();
    const foundAsg = allAssignments.find((a) => a.id === assignmentId);
    if (foundAsg) setAssignment(foundAsg);

    const allSubs = instructorStore.getSubmissions();
    const foundSub = allSubs.find((s) => s.id === submissionId);
    if (foundSub) setSubmission(foundSub);
  }, [assignmentId, submissionId]);

  const handleSaveGrade = (grade: number, feedback: string) => {
    if (!submission) return;

    instructorStore.gradeSubmission(submission.id, grade, feedback);

    // Refresh submission state
    setSubmission((prev) =>
      prev
        ? {
            ...prev,
            status: "graded",
            grade,
            feedback,
            gradedAt: "Just now",
          }
        : null
    );

    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      // Navigate back to assignment detail list
      router.push(`/instructor/assignments/${assignmentId}`);
    }, 1200);
  };

  if (!submission) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center max-w-md mx-auto my-12 space-y-4">
        <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
        <h2 className="text-lg font-bold text-slate-800">Submission Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested student work record could not be loaded.
        </p>
        <Link
          href={`/instructor/assignments/${assignmentId}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0A5C4C] text-white text-xs font-bold rounded-xl"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Assignment</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Nested Route Breadcrumbs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 flex-wrap">
          <Link
            href={`/instructor/assignments/${assignmentId}`}
            className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
            title="Back to Assignment Submissions"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link href="/instructor/assignments" className="hover:text-[#0A5C4C]">
            Assignments
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <Link
            href={`/instructor/assignments/${assignmentId}`}
            className="hover:text-[#0A5C4C] max-w-xs truncate"
          >
            {assignment?.title || "Assignment"}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-900 font-bold">{submission.studentName}</span>
        </div>

        <Link
          href={`/instructor/assignments/${assignmentId}`}
          className="text-xs font-bold text-[#0A5C4C] hover:underline"
        >
          ← Return to All Submissions
        </Link>
      </div>

      {/* 2-Column Evaluation Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Student Work & Response Viewer (6 cols) */}
        <div className="lg:col-span-6">
          <SubmissionWorkViewer
            submission={submission}
            assignment={assignment}
          />
        </div>

        {/* Right Column: Grading Evaluation Form (6 cols) */}
        <div className="lg:col-span-6">
          <GradingEvaluationForm
            submission={submission}
            onSaveGrade={handleSaveGrade}
            savedToast={savedToast}
          />
        </div>
      </div>
    </div>
  );
}
