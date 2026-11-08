"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Calendar,
  Flame,
  Video,
  ArrowUpRight,
  ArrowRight,
  FileText,
  CheckCircle2,
  ChevronRight,
  User,
  Sparkles,
  Info,
  Clock,
  BookOpen,
} from "lucide-react";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 font-mono block mb-1">
            Thursday, November 5, 2026 · Learner Portal
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
            Good afternoon, Emma.
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-1 font-sans">
            A little progress, every day. Ready for your next discovery?
          </p>
        </div>

        <Link
          href="/dashboard/my-learning"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-full px-4 py-2 shadow-2xs hover:shadow transition-all shrink-0 self-start sm:self-auto"
        >
          <span>My learning</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Top 3 Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        {/* Metric 1 */}
        <div className="bg-white rounded-3xl p-5 lg:p-6 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>Practice accuracy</span>
            <TrendingUp className="w-4 h-4 text-[#0A5C4C]" />
          </div>
          <div className="text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
            78%
          </div>
          <div className="text-xs text-[#0A5C4C] font-semibold mt-1">
            ↑ 14 points over 2 lessons
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-3xl p-5 lg:p-6 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>November lessons</span>
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
            2 / 8
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Your next lesson is today
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-3xl p-5 lg:p-6 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>This week&apos;s practice</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
            3 days
          </div>
          <div className="text-xs text-slate-500 mt-1">
            One more day to reach your goal
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Dark Live Lesson Feature Card */}
          <div className="bg-[#0B2332] text-white rounded-3xl p-6 sm:p-7 shadow-md relative overflow-hidden">
            {/* Top row */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 font-mono">
                Your Next Live Lesson
              </span>
              <span className="text-xs font-semibold bg-white/10 text-white/90 px-3 py-1 rounded-full border border-white/15">
                Today · 5:00–6:00 PM ET
              </span>
            </div>

            {/* Title & Desc */}
            <h2 className="text-xl sm:text-2xl font-black tracking-tight font-display text-white">
              Algebra I: Linear equations
            </h2>
            <p className="text-xs sm:text-sm text-white/70 mt-1 font-sans leading-relaxed">
              Solving multi-step equations &amp; checking your thinking.
            </p>

            {/* Tutor meta */}
            <div className="flex items-center gap-2 text-xs text-white/80 mt-3 font-medium">
              <User className="w-3.5 h-3.5 text-emerald-300" />
              <span>Lin Chen · 60 min · One-to-one</span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => alert("Joining live video classroom...")}
                className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-xs transition-all cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>Join classroom</span>
              </button>

              <Link
                href="/dashboard/schedule/lesson-details"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white/80 hover:text-white px-3 py-2 transition-colors"
              >
                <span>View lesson details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-[11px] text-white/50 mt-3 font-sans">
              Join from 4:50 PM ET. Bring a notebook and your questions.
            </p>
          </div>

          {/* A little practice before we meet */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                A little practice before we meet
              </h3>
              <Link
                href="/dashboard/assignments"
                className="text-xs font-semibold text-[#0A5C4C] hover:underline inline-flex items-center gap-1"
              >
                <span>All assignments</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* List items */}
            <div className="divide-y divide-slate-100">
              
              {/* Item 1 */}
              <Link
                href="/dashboard/assignments"
                className="py-3.5 flex items-center justify-between gap-3 group hover:bg-slate-50/70 -mx-3 px-3 rounded-xl transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0A5C4C] transition-colors truncate">
                      Multi-step equations · Practice 03
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Algebra I · 8 questions · About 15 min
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                    Due today
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

              {/* Item 2 */}
              <Link
                href="/dashboard/assignments"
                className="py-3.5 flex items-center justify-between gap-3 group hover:bg-slate-50/70 -mx-3 px-3 rounded-xl transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0A5C4C] transition-colors truncate">
                      Graph it: slope &amp; intercepts
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Algebra I · Interactive worksheet · Not started
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                    Due Nov 9
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

              {/* Item 3 */}
              <Link
                href="/dashboard/assignments"
                className="py-3.5 flex items-center justify-between gap-3 group hover:bg-slate-50/70 -mx-3 px-3 rounded-xl transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0A5C4C] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0A5C4C] transition-colors truncate">
                      Equation warm-up
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Reviewed by Lin Chen · 7 / 8 correct
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-bold text-[#0A5C4C] bg-[#EAF5F2] px-2.5 py-1 rounded-full">
                    View feedback
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

            </div>
          </div>

        </div>

        {/* Right Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Your next small win */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-3.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
              Your Next Small Win
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Explain it in your own words.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              This week, show each step when solving an equation. The &ldquo;why&rdquo; matters as much as the answer.
            </p>

            {/* Progress bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>Practice days · 3 of 4</span>
                <span className="text-[#0A5C4C]">75%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#0A5C4C] rounded-full w-3/4" />
              </div>
            </div>

            {/* Habit callout */}
            <div className="bg-[#EAF5F2] rounded-2xl p-3.5 border border-[#CCE8E0] flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#0A5C4C] shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900">You&apos;re building a habit. </span>
                Try 10 minutes of practice before today&apos;s lesson.
              </div>
            </div>

            <Link
              href="/dashboard/progress"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A5C4C] hover:underline pt-1"
            >
              <span>View my goals</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* A note from Lin */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              A note from Lin
            </h3>
            <blockquote className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              &ldquo;You&apos;re explaining your steps more clearly, Emma. Today, let&apos;s turn a word problem into an equation together.&rdquo;
            </blockquote>
            <div className="text-[11px] text-slate-400 font-sans">
              Lin Chen · Today, 3:45 PM
            </div>
            <Link
              href="/dashboard/messages"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A5C4C] hover:underline"
            >
              <span>Reply to Lin</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Keep exploring */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Keep exploring
            </h3>
            <div>
              <div className="text-sm font-bold text-slate-800">
                The balance method
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                A visual guide to keeping both sides equal. Recommended for your next lesson.
              </p>
            </div>
            <Link
              href="/dashboard/library"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A5C4C] hover:underline pt-1"
            >
              <span>Open 5-minute guide</span>
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

