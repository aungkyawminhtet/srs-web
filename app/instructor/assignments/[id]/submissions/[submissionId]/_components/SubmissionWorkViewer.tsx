"use client";

import React from "react";
import { FileText, Download, User, Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StudentSubmission, InstructorAssignment } from "@/lib/instructorStore";

interface SubmissionWorkViewerProps {
  submission: StudentSubmission;
  assignment: InstructorAssignment | null;
}

export function SubmissionWorkViewer({
  submission,
  assignment,
}: SubmissionWorkViewerProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-5">
      {/* Student Profile Card */}
      <div className="flex items-start justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF5F2] text-[#0A5C4C] font-bold text-sm flex items-center justify-center shrink-0">
            {submission.studentAvatar}
          </div>
          <div>
            <h3 className="font-bold text-base text-[#0B1E2B]">
              {submission.studentName}
            </h3>
            <span className="text-xs text-slate-400 block">{submission.studentEmail}</span>
            <span className="text-[11px] text-slate-500 font-semibold mt-0.5 block">
              Enrolled Learner · Grade 8 Track
            </span>
          </div>
        </div>

        <Badge
          className={
            submission.status === "graded"
              ? "bg-emerald-100 text-emerald-800 border-none text-[11px] font-bold"
              : "bg-amber-100 text-amber-800 border-none text-[11px] font-bold"
          }
        >
          {submission.status === "graded" ? "Graded & Returned" : "Awaiting Evaluation"}
        </Badge>
      </div>

      {/* Assignment Context Pill */}
      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
          Assignment Prompt
        </span>
        <div className="font-bold text-slate-800">{assignment?.title}</div>
        <p className="text-slate-500 mt-1 line-clamp-2">{assignment?.description}</p>
      </div>

      {/* Submission Text Content */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Student Response Content
          </span>
          <span className="text-[11px]">Submitted: {submission.submittedAt}</span>
        </div>

        <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans min-h-[140px] whitespace-pre-wrap">
          {submission.content}
        </div>
      </div>

      {/* Attached Files & Work Samples */}
      {submission.attachmentName && (
        <div className="space-y-2 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Submitted File Attachments
          </span>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0A5C4C] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-800 block">
                  {submission.attachmentName}
                </span>
                <span className="text-[10px] text-slate-400">
                  Student Assignment Artifact · PDF Document
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert(`Opening ${submission.attachmentName} preview...`)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
