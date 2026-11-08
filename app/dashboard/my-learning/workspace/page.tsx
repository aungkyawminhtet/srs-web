"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Video,
  ArrowUpRight,
  User,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  BookOpen,
  FileEdit,
  ChevronRight,
  MessageSquare,
  Sparkles,
  Info,
} from "lucide-react";

export default function ClassWorkspacePage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 font-mono block mb-1">
            Thursday, November 5, 2026 · Learner Portal
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
            Algebra I
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
            Emma&apos;s class with Lin Chen · One-to-one · Tue &amp; Thu, 5:00–6:00 PM ET
          </p>
        </div>

        <Link
          href="/dashboard/my-learning"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-full px-4 py-2 shadow-2xs hover:shadow transition-all shrink-0 self-start sm:self-auto"
        >
          <span>Program overview</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Workspace Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3 overflow-x-auto">
        {[
          { id: "overview", label: "Class overview" },
          { id: "lessons", label: "Lessons · 8" },
          { id: "assignments", label: "Assignments · 3" },
          { id: "materials", label: "Materials" },
          { id: "notes", label: "Class notes" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#0A5C4C] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Next Live Lesson Banner */}
          <div className="bg-[#0B2332] text-white rounded-3xl p-6 sm:p-7 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 font-mono">
                Your Next Live Lesson
              </span>
              <span className="text-xs font-semibold bg-white/10 text-white/90 px-3 py-1 rounded-full border border-white/15">
                Today · 5:00–6:00 PM ET
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight font-display text-white">
              Algebra I: Linear equations
            </h2>
            <p className="text-xs sm:text-sm text-white/70 mt-1 font-sans leading-relaxed">
              Solving multi-step equations &amp; checking your thinking.
            </p>

            <div className="flex items-center gap-2 text-xs text-white/80 mt-3 font-medium">
              <User className="w-3.5 h-3.5 text-emerald-300" />
              <span>Lin Chen · 60 min · One-to-one</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => alert("Connecting to classroom...")}
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

          {/* Our lesson journey */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                Our lesson journey
              </h3>
              <button
                type="button"
                className="text-xs font-semibold text-[#0A5C4C] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>All lessons</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {/* Lesson 3 */}
              <Link
                href="/dashboard/schedule/lesson-details"
                className="py-3.5 flex items-center justify-between gap-3 group hover:bg-slate-50/70 -mx-3 px-3 rounded-xl transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0A5C4C] flex items-center justify-center shrink-0 mt-0.5">
                    <Video className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0A5C4C] transition-colors truncate">
                      Linear equations
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Thu, Nov 5 · 5:00 PM · Lesson 3
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-bold text-[#0A5C4C] bg-[#EAF5F2] px-2.5 py-1 rounded-full">
                    Up next
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </Link>

              {/* Lesson 4 */}
              <div className="py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                      Turning words into equations
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Tue, Nov 10 · 5:00 PM · Lesson 4
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full shrink-0">
                  Scheduled
                </span>
              </div>

              {/* Lesson 5 */}
              <div className="py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                      Graphing linear relationships
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Thu, Nov 12 · 5:00 PM · Lesson 5
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full shrink-0">
                  Scheduled
                </span>
              </div>

              {/* Lesson 2 */}
              <div className="py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0A5C4C] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                      Balancing equations
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Tue, Nov 3 · 60 min · Notes available
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#0A5C4C] bg-[#EAF5F2] px-2.5 py-1 rounded-full shrink-0">
                  Completed
                </span>
              </div>

              {/* Lesson 1 */}
              <div className="py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0A5C4C] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                      Expressions &amp; like terms
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Sun, Nov 1 · 60 min · November kickoff
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#0A5C4C] bg-[#EAF5F2] px-2.5 py-1 rounded-full shrink-0">
                  Completed
                </span>
              </div>
            </div>
          </div>

          {/* Class Announcement Banner */}
          <div className="bg-[#EAF5F2] rounded-2xl p-4 border border-[#CCE8E0] flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#0A5C4C] shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900">Class announcement: </span>
              Lin shared the &ldquo;Balance method&rdquo; guide for today. Read it first if you have 5 minutes. Posted Nov 5, 3:45 PM.
            </div>
          </div>

        </div>

        {/* Right Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Meet your tutor */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Meet your tutor
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
              Ask questions here, or bring them to our live whiteboard. There&apos;s always room to try again.
            </p>

            <Link
              href="/dashboard/messages"
              className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold py-2.5 px-4 rounded-full transition-all"
            >
              <MessageSquare className="w-4 h-4 text-slate-500" />
              <span>Message Lin</span>
            </Link>
          </div>

          {/* This week's focus */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                This Week&apos;s Focus
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 font-mono">
                Unit 02
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Keep both sides balanced.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Solve multi-step equations and explain why each step keeps the equation true.
            </p>

            <div className="space-y-2 pt-1 font-sans text-xs text-slate-700">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                By the end, I can...
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#0A5C4C] font-bold">✓</span>
                <span>Combine like terms</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#0A5C4C] font-bold">✓</span>
                <span>Use inverse operations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#0A5C4C] font-bold">✓</span>
                <span>Check my solution</span>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A5C4C] hover:underline pt-2 cursor-pointer"
            >
              <span>View learning goals</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Your class toolkit */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Your class toolkit
            </h3>

            <div className="space-y-2">
              {/* Item 1 */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex items-center justify-between gap-3 hover:bg-slate-100/70 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0A5C4C] flex items-center justify-center shrink-0">
                    <Download className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">Lesson 3 worksheet</div>
                    <div className="text-[11px] text-slate-500">PDF · 420 KB</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              {/* Item 2 */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex items-center justify-between gap-3 hover:bg-slate-100/70 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">The balance method</div>
                    <div className="text-[11px] text-slate-500">Visual guide · 5 min</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              {/* Item 3 */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex items-center justify-between gap-3 hover:bg-slate-100/70 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <FileEdit className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">My class notes</div>
                    <div className="text-[11px] text-slate-500">Last edited Nov 3</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
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

