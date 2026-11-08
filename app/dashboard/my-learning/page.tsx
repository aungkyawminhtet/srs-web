"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  BookOpen,
  BarChart2,
  ChevronRight,
  User,
  Info,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function MyLearningPage() {
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "saved">("active");

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Page Header */}
      <div>
        <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 font-mono block mb-1">
          Thursday, November 5, 2026 · Learner Portal
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
          Your learning, at your pace.
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-1 font-sans">
          One connected place for your classes, materials and next steps.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "active"
              ? "bg-[#0A5C4C] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Active programs · 1
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "completed"
              ? "bg-[#0A5C4C] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Completed · 0
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("saved")}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "saved"
              ? "bg-[#0A5C4C] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Saved programs
        </button>
      </div>

      {/* Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column: Program Card + Roadmap (7 cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Featured Active Program Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-5">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A5C4C] bg-[#EAF5F2] px-2.5 py-1 rounded-full font-mono">
                Active
              </span>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                One-to-one
              </span>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                Grades 7–9
              </span>
            </div>

            {/* Title & Description */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0B1E2B] font-display">
                Algebra I, minus the overwhelm.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                From unfamiliar symbols to ideas that click. Build your understanding with Lin, one step at a time.
              </p>
            </div>

            {/* Mint Formula Callout Card */}
            <div className="bg-[#EAF5F2] border border-[#CCE8E0] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-2xl sm:text-3xl font-black text-[#0A5C4C] font-mono tracking-tight">
                y = 2x + 1
              </div>
              <div className="text-xs sm:text-sm text-slate-700 sm:text-right">
                <div className="font-bold text-[#0B1E2B]">One idea. Many ways to see it.</div>
                <div className="text-slate-500 text-[11px] mt-0.5">Explore it. Graph it. Understand it.</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>November learning plan · 2 of 8 lessons complete</span>
                <span className="text-[#0A5C4C] font-bold">25%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#0A5C4C] rounded-full w-1/4" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/dashboard/my-learning/workspace"
                className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-xs hover:shadow transition-all"
              >
                <span>Open class workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard/schedule"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full transition-all"
              >
                <span>View schedule</span>
              </Link>
            </div>

            <div className="text-[11px] text-slate-500 pt-1 font-sans">
              Next lesson: <strong className="text-slate-800">Today, 5:00–6:00 PM ET</strong> · Linear equations
            </div>
          </div>

          {/* Small steps. Connected ideas. Roadmap */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                Small steps. Connected ideas.
              </h3>
              <button
                type="button"
                className="text-xs font-semibold text-[#0A5C4C] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Full roadmap</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {/* Unit 1 */}
              <div className="py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0A5C4C] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                      Expressions &amp; the language of algebra
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Variables · Like terms · Distributive property
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#0A5C4C] bg-[#EAF5F2] px-2.5 py-1 rounded-full shrink-0">
                  Completed
                </span>
              </div>

              {/* Unit 2 */}
              <div className="py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                      Equations &amp; inequalities
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Current focus · Multi-step equations
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full shrink-0">
                  In progress
                </span>
              </div>

              {/* Unit 3 */}
              <div className="py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                    <BarChart2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                      Linear relationships &amp; graphs
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Next · Tables, slope and intercepts
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full shrink-0">
                  Coming up
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Tutor Card + Personal Plan (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Your learning partner */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Your learning partner
            </h3>

            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
                  alt="Lin Chen"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Lin Chen</div>
                <div className="text-xs text-slate-500">Math tutor · English &amp; Chinese</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Visual explanations. Thoughtful questions. Room to understand the &ldquo;why.&rdquo;
            </p>

            <Link
              href="/dashboard/messages"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A5C4C] hover:underline"
            >
              <span>Message Lin</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
              Your parent can help with enrollment or schedule changes.
            </p>
          </div>

          {/* Yellow tip card */}
          <div className="bg-[#FAF7EC] border border-[#ECE5CD] rounded-3xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-950 font-display">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Your plan, made personal</span>
            </div>
            <p className="text-xs text-amber-900/85 leading-relaxed font-sans">
              We adapt the roadmap to your schoolwork and understanding—not a race through chapters.
            </p>
          </div>

          {/* Between lessons */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
              Between Lessons
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Make the connection.
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Try a short visual guide, then bring one question to your next lesson.
            </p>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex items-center justify-between gap-3 hover:bg-slate-100/70 transition-colors">
              <div>
                <div className="text-xs font-bold text-slate-800">The balance method</div>
                <div className="text-[11px] text-slate-500 mt-0.5">5-minute read · Saved for you</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>

            <Link
              href="/dashboard/library"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A5C4C] hover:underline pt-1"
            >
              <span>Browse learning library</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
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

