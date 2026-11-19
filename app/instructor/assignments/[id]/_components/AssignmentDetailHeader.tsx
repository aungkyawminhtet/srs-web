"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, FileText, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InstructorAssignment } from "@/lib/instructorStore";

interface AssignmentDetailHeaderProps {
  assignment: InstructorAssignment;
  totalSubmissions: number;
  gradedCount: number;
  pendingCount: number;
}

export function AssignmentDetailHeader({
  assignment,
  totalSubmissions,
  gradedCount,
  pendingCount,
}: AssignmentDetailHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Top back button and title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/instructor/assignments"
            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            title="Back to All Assignments"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] font-display">
                {assignment.title}
              </h1>
              <Badge className="bg-emerald-100 text-emerald-800 border-none text-[10px] font-bold">
                {assignment.status.toUpperCase()}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Course: <strong className="text-slate-700">{assignment.courseTitle}</strong> · Due Date: {assignment.dueDate}
            </p>
          </div>
        </div>

        <Link
          href={`/instructor/courses/${assignment.courseId}`}
          className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <span>View Course Outline</span>
        </Link>
      </div>

      {/* Assignment Overview & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Assignment Instructions &amp; Prompts
          </span>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {assignment.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-100">
            <span>Max Score: <strong className="text-slate-700">{assignment.maxPoints} pts</strong></span>
            <span>·</span>
            <span>Published: <strong className="text-slate-700">{assignment.createdAt}</strong></span>
          </div>
        </div>

        <div className="md:col-span-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Submission Progress
          </span>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-100">
              <span className="text-xl font-black text-amber-900 font-display block">
                {pendingCount}
              </span>
              <span className="text-[10px] font-bold text-amber-700 uppercase">Awaiting</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-100">
              <span className="text-xl font-black text-emerald-900 font-display block">
                {gradedCount}
              </span>
              <span className="text-[10px] font-bold text-emerald-700 uppercase">Graded</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 text-center">
            Total {totalSubmissions} student responses received
          </div>
        </div>
      </div>
    </div>
  );
}
