"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, AlertCircle } from "lucide-react";
import {
  instructorStore,
  InstructorAssignment,
  StudentSubmission,
} from "@/lib/instructorStore";
import { AssignmentDetailHeader } from "./_components/AssignmentDetailHeader";
import { AssignmentSubmissionsTable } from "./_components/AssignmentSubmissionsTable";

export default function AssignmentDetailPage() {
  const params = useParams();
  const assignmentId = params?.id as string;

  const [assignment, setAssignment] = useState<InstructorAssignment | null>(null);
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);

  useEffect(() => {
    const allAssignments = instructorStore.getAssignments();
    const found = allAssignments.find((a) => a.id === assignmentId);
    if (found) {
      setAssignment(found);
    }

    const allSubs = instructorStore.getSubmissions();
    const matchedSubs = allSubs.filter((s) => s.assignmentId === assignmentId);
    setSubmissions(matchedSubs);
  }, [assignmentId]);

  if (!assignment) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center max-w-md mx-auto my-12 space-y-4">
        <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
        <h2 className="text-lg font-bold text-slate-800">Assignment Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested coursework item was not found or has been removed.
        </p>
        <Link
          href="/instructor/assignments"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0A5C4C] text-white text-xs font-bold rounded-xl"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Assignments</span>
        </Link>
      </div>
    );
  }

  const pendingCount = submissions.filter((s) => s.status === "submitted").length;
  const gradedCount = submissions.filter((s) => s.status === "graded").length;

  return (
    <div className="space-y-6">
      {/* Co-located Assignment Details Header */}
      <AssignmentDetailHeader
        assignment={assignment}
        totalSubmissions={submissions.length}
        gradedCount={gradedCount}
        pendingCount={pendingCount}
      />

      {/* Co-located Submissions Table with Nested Route Links */}
      <AssignmentSubmissionsTable
        submissions={submissions}
        assignmentId={assignmentId}
      />
    </div>
  );
}
