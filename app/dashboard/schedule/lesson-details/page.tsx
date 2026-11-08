"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  Video,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Settings,
  Download,
  FileText,
  Info,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export default function LessonDetailsPage() {
  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Header with Back button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 font-mono block mb-1">
            Thursday, November 5, 2026 · Learner Portal
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
            Linear equations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
            Algebra I / Unit 02: Equations &amp; inequalities / Lesson 3
          </p>
        </div>

        <Link
          href="/dashboard/schedule"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-full px-4 py-2 shadow-2xs hover:shadow transition-all shrink-0 self-start sm:self-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to schedule</span>
        </Link>
      </div>

      {/* Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Dark Live Lesson Card */}
          <div className="bg-[#0B2332] text-white rounded-3xl p-6 sm:p-7 shadow-md relative overflow-hidden space-y-5">
            {/* Badges row */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/15 font-mono">
                Confirmed
              </span>
              <span className="text-xs font-semibold bg-white/10 text-white/90 px-3 py-1 rounded-full border border-white/15">
                Today
              </span>
            </div>

            {/* Title & Desc */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-display text-white">
                Let&apos;s check your thinking.
              </h2>
              <p className="text-xs sm:text-sm text-white/70 mt-1 font-sans leading-relaxed">
                Solve multi-step equations, compare strategies and make the answer make sense.
              </p>
            </div>

            {/* Schedule details */}
            <div className="space-y-1.5 pt-1 text-xs text-white/90">
              <div className="flex items-center gap-2 font-bold text-emerald-300">
                <Calendar className="w-4 h-4" />
                <span>Thursday, November 5 · 5:00–6:00 PM ET</span>
              </div>
              <div className="text-white/70 text-[11px] pl-6">
                One-to-one · 60 minutes · Live online classroom
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-white/10 space-y-3">
              <button
                type="button"
                onClick={() => alert("Joining classroom...")}
                className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full shadow-xs transition-all cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>Join classroom</span>
              </button>
              <div className="text-[11px] text-white/60 font-sans">
                Room opens at 4:50 PM ET · Your tutor will welcome you at 5:00 PM.
              </div>
            </div>
          </div>

          {/* What we'll work on */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              What we&apos;ll work on
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              By the end, you&apos;ll be able to solve an equation with variables on both sides and explain each step.
            </p>

            <div className="divide-y divide-slate-100">
              {/* Stage 1 */}
              <div className="py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0A5C4C] flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-800">
                      Reconnect &amp; warm up
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      10 min · Review the balance method
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              {/* Stage 2 */}
              <div className="py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Video className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-800">
                      Explore together
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      20 min · Model a multi-step equation
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              {/* Stage 3 */}
              <div className="py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-800">
                      Practice &amp; explain
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      20 min · Try it on our shared whiteboard
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              {/* Stage 4 */}
              <div className="py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0A5C4C] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-800">
                      Reflect &amp; plan
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      10 min · Check your answer and choose a next step
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Your tutor */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Your tutor
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

            <Link
              href="/dashboard/messages"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A5C4C] hover:underline"
            >
              <span>Message Lin</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Before we meet */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Before we meet
            </h3>

            {/* Checklist */}
            <div className="space-y-1.5 text-xs text-slate-600 font-sans">
              <div className="flex items-center gap-2">
                <span className="text-[#0A5C4C] font-bold">✓</span>
                <span>A notebook and pencil</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#0A5C4C] font-bold">✓</span>
                <span>A quiet place to think</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#0A5C4C] font-bold">✓</span>
                <span>Camera and microphone ready</span>
              </div>
            </div>

            {/* Downloads / Links */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Download className="w-4 h-4 text-[#0A5C4C] shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">Lesson 3 worksheet</div>
                    <div className="text-[10px] text-slate-400">PDF · 420 KB</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-xs font-bold text-[#0A5C4C] hover:underline shrink-0 cursor-pointer"
                >
                  Download &gt;
                </button>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText className="w-4 h-4 text-orange-600 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">Practice 03</div>
                    <div className="text-[10px] text-slate-400">8 questions · Due today</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-xs font-bold text-[#0A5C4C] hover:underline shrink-0 cursor-pointer"
                >
                  Open &gt;
                </button>
              </div>
            </div>

            {/* Test camera button */}
            <button
              type="button"
              onClick={() => alert("Checking camera and microphone...")}
              className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-full transition-all cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Test camera &amp; audio</span>
            </button>
          </div>

          {/* Need a hand joining */}
          <div className="bg-[#FAF7EC] border border-[#ECE5CD] rounded-3xl p-5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-950 font-display">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Need a hand joining?</span>
            </div>
            <p className="text-xs text-amber-900/85 leading-relaxed font-sans">
              If your camera or connection isn&apos;t working, run the device check or contact support.
            </p>
          </div>

          {/* Lesson changes */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-2">
            <h4 className="text-sm font-bold text-slate-900 font-display">
              Lesson changes
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Changes are normally available up to 24 hours before a lesson. For today, please contact our team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#0A5C4C] hover:underline pt-1"
            >
              <span>Get scheduling help</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-100">
              Lesson ID: ALG-2026-1105-ET
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

