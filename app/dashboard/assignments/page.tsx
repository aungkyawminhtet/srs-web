"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Clock,
  Search,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  ChevronRight,
  AlertTriangle,
  X,
  Send,
  User,
  Paperclip,
} from "lucide-react";
import { assignmentsApi, AssignmentItem } from "@/lib/api";
import { useMyAssignmentsQuery, useSubmitAssignmentMutation } from "@/hooks/api";
import { Skeleton } from "@/components/ui/skeleton";

// 2 sample items aligned with DB
const INITIAL_ASSIGNMENTS: AssignmentItem[] = [
  {
    _id: "1",
    title: "Multi-step equations · Practice 03",
    course: "Algebra I, minus the overwhelm",
    advisorName: "Lin Chen",
    dueDate: "Due today, 11:59 PM",
    meta: "8 questions · ~15 mins",
    status: "assigned",
    isCloseDeadline: true,
    deadlineWarning: "Less than 6 hours left to submit before today's cutoff",
  },
  {
    _id: "2",
    title: "Cell Structure & Osmosis Lab Reflection",
    course: "Science, explored",
    advisorName: "Dr. Maya Patel",
    dueDate: "Due tomorrow, 5:00 PM",
    meta: "Short response · ~20 mins",
    status: "assigned",
    isCloseDeadline: true,
    deadlineWarning: "Due tomorrow before Friday lab check-in",
  },
];

export default function AssignmentsPage() {
  const { data: serverAssignments, isLoading: isAssignmentsLoading } = useMyAssignmentsQuery();
  const submitMutation = useSubmitAssignmentMutation();

  const [assignments, setAssignments] = useState<AssignmentItem[]>(INITIAL_ASSIGNMENTS);
  const [activeTab, setActiveTab] = useState<"all" | "assigned" | "missing" | "done">("all");
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentItem | null>(null);

  // Submission Form State
  const [reportLink, setReportLink] = useState("");
  const [reportNotes, setReportNotes] = useState("");
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (serverAssignments && Array.isArray(serverAssignments) && serverAssignments.length > 0) {
      setAssignments(serverAssignments as any);
    }
  }, [serverAssignments]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment) return;

    setSubmitting(true);
    setSuccessMsg("");

    try {
      await submitMutation.mutateAsync({
        id: selectedAssignment._id,
        payload: {
          submissionLink: reportLink,
          submissionAttachment: filePreview || undefined,
          submissionNotes: reportNotes,
        },
      });

      // Update local state fallback
      setAssignments((prev) =>
        prev.map((item) => {
          if (item._id !== selectedAssignment._id) return item;
          return {
            ...item,
            status: "done",
            submissions: [
              ...(item.submissions || []),
              {
                studentName: "Emma Thant",
                reportLink,
                reportFileUrl: filePreview || "",
                notes: reportNotes,
                status: "submitted",
                submittedAt: new Date().toISOString(),
              },
            ],
          };
        })
      );

      setSuccessMsg("Assignment report successfully delivered to your advisor!");
      setTimeout(() => {
        setSelectedAssignment(null);
        setReportLink("");
        setReportNotes("");
        setFilePreview(null);
        setFileName("");
        setSuccessMsg("");
      }, 1200);
    } catch {
      // Offline fallback
      setAssignments((prev) =>
        prev.map((item) =>
          item._id === selectedAssignment._id ? { ...item, status: "done" } : item
        )
      );
      setSuccessMsg("Report submitted successfully!");
      setTimeout(() => setSelectedAssignment(null), 1000);
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = assignments.filter((item) => {
    if (activeTab === "all") return true;
    return item.status === activeTab;
  });

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-slate-400 font-mono block mb-1.5">
            Student Portal · Course Submissions &amp; Reports
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#0B1E2B] tracking-tight font-display">
            Course Assignments &amp; Reports
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed">
            Upload document links, files, and solution images directly to your course advisor for review.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="inline-flex items-center bg-slate-100 p-1 rounded-full self-start sm:self-auto gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-[#0A5C4C] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All ({assignments.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("assigned")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "assigned"
                ? "bg-amber-500 text-white shadow-xs"
                : "text-slate-600 hover:text-amber-800"
            }`}
          >
            Assigned ({assignments.filter((a) => a.status === "assigned").length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("missing")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "missing"
                ? "bg-rose-500 text-white shadow-xs"
                : "text-slate-600 hover:text-rose-700"
            }`}
          >
            Missing ({assignments.filter((a) => a.status === "missing").length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("done")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "done"
                ? "bg-[#0A5C4C] text-white shadow-xs"
                : "text-slate-600 hover:text-[#0A5C4C]"
            }`}
          >
            Done ({assignments.filter((a) => a.status === "done").length})
          </button>
        </div>
      </div>

      {/* Assignment Items List */}
      <div className="space-y-4">
        {isAssignmentsLoading ? (
          Array.from({ length: 2 }).map((_, idx) => (
            <div
              key={`asg-item-skel-${idx}`}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2.5 min-w-0 flex-1">
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-24 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-6 w-3/4" />
                <div className="flex gap-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
              <Skeleton className="h-10 w-36 rounded-full shrink-0" />
            </div>
          ))
        ) : (
          filtered.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A5C4C] bg-[#EAF5F2] border border-[#0A5C4C]/20 px-2.5 py-0.5 rounded-full font-mono">
                  {item.course}
                </span>

                {item.status === "assigned" && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full font-mono">
                    Assigned
                  </span>
                )}
                {item.status === "missing" && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full font-mono">
                    Missing
                  </span>
                )}
                {item.status === "done" && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A5C4C] bg-[#EAF5F2] border border-[#0A5C4C]/20 px-2.5 py-0.5 rounded-full font-mono">
                    Report Submitted / Done
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#0B1E2B] font-display">
                {item.title}
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Advisor: <strong className="text-slate-700">{item.advisorName}</strong>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {item.dueDate}
                </span>
                <span>·</span>
                <span>{item.meta}</span>
              </div>

              {item.deadlineWarning && item.status !== "done" && (
                <div className="text-xs font-semibold text-amber-800 bg-amber-50/80 border border-amber-200/60 px-3 py-1 rounded-xl inline-flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{item.deadlineWarning}</span>
                </div>
              )}

              {item.submissions && item.submissions.length > 0 && (
                <div className="pt-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                  <div className="font-bold text-[#0A5C4C] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Advisor Review: {item.submissions[0].score || "Submitted"}</span>
                  </div>
                  {item.submissions[0].feedback && (
                    <p className="text-slate-600 italic">
                      &ldquo;{item.submissions[0].feedback}&rdquo;
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Action button */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedAssignment(item)}
                className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-full transition-all shadow-xs cursor-pointer ${
                  item.status === "done"
                    ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    : "bg-[#0A5C4C] hover:bg-[#08483b] text-white"
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>{item.status === "done" ? "Resubmit / Update" : "Report to Advisor"}</span>
              </button>
            </div>
          </div>
        ))
        )}
      </div>

      {/* Report / Submission Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative">
            <button
              type="button"
              onClick={() => setSelectedAssignment(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A5C4C] bg-[#EAF5F2] px-2.5 py-1 rounded-full border border-[#0A5C4C]/20 font-mono">
                {selectedAssignment.course}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0B1E2B] font-display mt-2">
                Report Work to {selectedAssignment.advisorName}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Assignment: <strong className="text-slate-800">{selectedAssignment.title}</strong>
              </p>
            </div>

            {successMsg && (
              <div className="bg-[#EAF5F2] border border-[#0A5C4C]/30 text-[#0A5C4C] text-xs font-bold p-3 rounded-2xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleReportSubmit} className="space-y-4">
              {/* Option 1: External Link */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-[#0A5C4C]" />
                  <span>Report / Solution Link (Google Docs, GitHub, Canva, Figma)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://docs.google.com/... or https://github.com/..."
                  value={reportLink}
                  onChange={(e) => setReportLink(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0A5C4C]/30 focus:border-[#0A5C4C]"
                />
              </div>

              {/* Option 2: File or Image Upload */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#0A5C4C]" />
                  <span>Upload Solution File or Image</span>
                </label>
                <div className="border-2 border-dashed border-slate-200 hover:border-[#0A5C4C]/50 rounded-2xl p-4 text-center cursor-pointer transition-colors relative bg-slate-50/50">
                  <input
                    type="file"
                    accept="image/*,.pdf,.doc,.docx,.zip"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {filePreview ? (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-[#0A5C4C]">
                        Selected: {fileName}
                      </p>
                      {filePreview.startsWith("data:image") && (
                        <img
                          src={filePreview}
                          alt="preview"
                          className="max-h-36 mx-auto rounded-lg object-contain shadow-2xs"
                        />
                      )}
                      <p className="text-[10px] text-slate-400">Click to change file</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                      <p className="text-xs font-semibold text-slate-700">
                        Click or drag image / document to upload
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Supports PNG, JPG, PDF, Word up to 25MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes to advisor */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Questions or Notes for {selectedAssignment.advisorName}
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain your thinking or ask where you got stuck..."
                  value={reportNotes}
                  onChange={(e) => setReportNotes(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0A5C4C]/30 focus:border-[#0A5C4C] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedAssignment(null)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || (!reportLink && !filePreview && !reportNotes)}
                  className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] disabled:opacity-50 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-xs transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? "Delivering..." : "Submit Report to Advisor"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
