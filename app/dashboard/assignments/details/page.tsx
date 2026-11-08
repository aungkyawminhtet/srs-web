"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  CheckCircle2,
  FileText,
  Paperclip,
  Send,
  Info,
  ChevronRight,
  Eye,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function AssignmentDetailsPage() {
  const [explanation, setExplanation] = useState(
    "3x - 6 = -12 → 3x = -6 → x = -2. Checking: 3(-2 - 2) = -12."
  );
  const [hasFile, setHasFile] = useState(true);
  const [submittedRevision, setSubmittedRevision] = useState(false);

  const handleSendRevision = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedRevision(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans">
      {/* Header & Back Action */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 font-mono block mb-1">
            Thursday, November 5, 2026 · Learner Portal
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
            Equation warm-up
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Algebra I · Unit 02 · 8 questions · About 15 minutes
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/assignments"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-full px-4 py-2 shadow-2xs hover:shadow transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All assignments</span>
          </Link>

          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0A5C4C] hover:underline"
          >
            <span>Download worksheet</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Meta status badges */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <span className="font-bold text-[#0A5C4C] bg-[#EAF5F2] border border-[#CCE8E0] px-3 py-1 rounded-full">
          Reviewed · 7 / 8 correct
        </span>
        <span className="text-slate-500">
          Submitted Nov 3, 7:42 PM ET · Reviewed by Lin on Nov 4
        </span>
      </div>

      {/* Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* The task */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              The task
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Solve each equation. Show the same operation on both sides, then substitute your answer to check it.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Questions 1–5 and 7–8: Correct. Question 6 is a chance to try again. You can send an optional revision below.
            </p>

            {/* Worksheet attachment box */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0A5C4C] flex items-center justify-center shrink-0">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Equation warm-up.pdf</div>
                  <div className="text-[11px] text-slate-500">Original worksheet · PDF · 280 KB</div>
                </div>
              </div>
              <button
                type="button"
                className="text-xs font-bold text-[#0A5C4C] hover:underline"
              >
                Download &gt;
              </button>
            </div>
          </div>

          {/* A closer look at question 6 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              A closer look at question 6
            </h2>

            {/* Question Box */}
            <div className="bg-[#EAF5F2] border border-[#CCE8E0] rounded-2xl p-5 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A5C4C] font-mono block">
                Question 6 · Solve for x
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1E2B] font-mono">
                3(x - 2) = -12
              </div>
            </div>

            {/* Original answer */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                Your original answer
              </div>
              <div className="text-xs sm:text-sm font-mono text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                3x - 6 = -12 → 3x = 6 → x = 2
              </div>
            </div>

            {/* Lin's feedback callout */}
            <div className="bg-[#FAF7EC] border border-[#ECE5CD] rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-950 font-display">
                <Info className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Lin&apos;s feedback</span>
              </div>
              <p className="text-xs text-amber-900/90 leading-relaxed font-sans">
                Good use of the distributive property. When you add 6 to -12, what sign does the result have? Check that step, then substitute your answer.
              </p>
            </div>
          </div>

          {/* Try it again · Optional revision */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Try it again · Optional revision
            </h2>

            {submittedRevision ? (
              <div className="bg-[#EAF5F2] border border-[#CCE8E0] rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#0A5C4C] font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Revision sent to Lin!</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Lin will review your updated steps before your next lesson today at 5:00 PM.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendRevision} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block font-mono">
                    Your explanation
                  </label>
                  <textarea
                    rows={2}
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-slate-800 focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>

                {/* Attach working file */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700">Attach your working</div>
                  <div className="text-[11px] text-slate-400">PDF, JPG or PNG · Up to 10 MB per file</div>

                  {hasFile && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 text-slate-800">
                        <Paperclip className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold">emma-equation-revision.pdf</span>
                        <span className="text-[11px] text-slate-400">· 248 KB · Uploaded to draft</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setHasFile(false)}
                        className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    className="text-xs font-bold text-[#0A5C4C] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Choose another file</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-xs transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send revision to Lin</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Draft saved!")}
                    className="inline-flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full transition-all cursor-pointer"
                  >
                    <span>Save draft</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-400">
                  Draft saved today at 4:12 PM ET. This revision has not been sent.
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Right Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* A step forward score card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
              A Step Forward
            </span>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-black text-[#0B1E2B] font-display">
                7 / 8
              </div>
              <span className="text-xs font-bold text-[#0A5C4C] bg-[#EAF5F2] px-3 py-1 rounded-full">
                Strong understanding
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Practice feedback, not a school grade. You&apos;re getting more confident with balancing equations.
            </p>

            {/* Lin Chen bio quote */}
            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
                    alt="Lin Chen"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Lin Chen</div>
                  <div className="text-[11px] text-slate-500">Math tutor · English &amp; Chinese</div>
                </div>
              </div>
              <blockquote className="text-xs text-slate-700 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                &ldquo;Your steps are getting clearer. Keep writing the operation you use on each side.&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Your submission */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Your submission
            </h3>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-800 truncate">emma-warmup.pdf</div>
                  <div className="text-[10px] text-slate-400">Nov 3, 7:42 PM ET · 512 KB</div>
                </div>
              </div>
              <button
                type="button"
                className="text-xs font-bold text-[#0A5C4C] hover:underline shrink-0"
              >
                View &gt;
              </button>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Original work is kept in your history. Sending a revision won&apos;t remove this submission.
            </p>

            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A5C4C] hover:underline"
            >
              <span>View submission history</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Need another explanation */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
              Need Another Explanation?
            </span>
            <h4 className="text-base font-bold text-slate-900 font-display">
              Negative numbers, made clearer.
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              A quick number-line guide to adding and subtracting negative values.
            </p>
            <div className="space-y-1.5 pt-1">
              <Link
                href="/dashboard/library"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A5C4C] hover:underline block"
              >
                <span>Open 4-minute guide</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/dashboard/messages"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A5C4C] hover:underline block"
              >
                <span>Ask Lin a question</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Illustrative Footer Note */}
      <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-4 border-t border-slate-200/60 font-sans">
        <Info className="w-3.5 h-3.5 shrink-0" />
        <span>Sample workspace · Students, tutors, progress and billing are illustrative. No real student data is shown.</span>
      </div>
    </div>
  );
}

