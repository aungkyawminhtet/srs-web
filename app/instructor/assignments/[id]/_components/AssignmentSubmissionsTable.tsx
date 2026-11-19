"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock, FileText, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StudentSubmission } from "@/lib/instructorStore";

interface AssignmentSubmissionsTableProps {
  submissions: StudentSubmission[];
  assignmentId: string;
}

export function AssignmentSubmissionsTable({
  submissions,
  assignmentId,
}: AssignmentSubmissionsTableProps) {
  const [filterStatus, setFilterStatus] = useState<"all" | "submitted" | "graded">("all");
  const [search, setSearch] = useState("");

  const filtered = submissions.filter((sub) => {
    if (filterStatus !== "all" && sub.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        sub.studentName.toLowerCase().includes(q) ||
        sub.studentEmail.toLowerCase().includes(q) ||
        sub.content.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden space-y-4 p-5">
      {/* Submissions Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterStatus === "all" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600"
            }`}
          >
            All Submissions ({submissions.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("submitted")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterStatus === "submitted"
                ? "bg-white text-amber-900 shadow-2xs"
                : "text-slate-600"
            }`}
          >
            Needs Grade ({submissions.filter((s) => s.status === "submitted").length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("graded")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterStatus === "graded"
                ? "bg-white text-emerald-900 shadow-2xs"
                : "text-slate-600"
            }`}
          >
            Graded ({submissions.filter((s) => s.status === "graded").length})
          </button>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student..."
            className="pl-8.5 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
          />
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((sub) => {
            const isGraded = sub.status === "graded";
            return (
              <div
                key={sub.id}
                className="p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EAF5F2] text-[#0A5C4C] font-bold text-sm flex items-center justify-center shrink-0">
                    {sub.studentAvatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm sm:text-base text-[#0B1E2B]">
                        {sub.studentName}
                      </h4>
                      <span className="text-xs text-slate-400">
                        ({sub.studentEmail})
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-1 mt-0.5 italic">
                      &ldquo;{sub.content}&rdquo;
                    </p>

                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span>Submitted: {sub.submittedAt}</span>
                      {sub.attachmentName && (
                        <>
                          <span>·</span>
                          <span className="text-[#0A5C4C] font-semibold flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" />
                            {sub.attachmentName}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                  {isGraded ? (
                    <div className="text-right">
                      <Badge className="bg-emerald-100 text-emerald-800 border-none text-xs font-bold px-2.5 py-1">
                        {sub.grade}/{sub.maxPoints} pts
                      </Badge>
                      <span className="block text-xs text-slate-400 mt-0.5">
                        Graded
                      </span>
                    </div>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-800 border-none text-xs font-bold px-2.5 py-1">
                      Awaiting Evaluation
                    </Badge>
                  )}

                  {/* Real nested route Link to submission grading detail */}
                  <Link
                    href={`/instructor/assignments/${assignmentId}/submissions/${sub.id}`}
                    className="px-4 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{isGraded ? "Review Grade" : "Evaluate & Grade"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center text-xs text-slate-400">
            No submissions matching the selected status.
          </div>
        )}
      </div>
    </div>
  );
}
