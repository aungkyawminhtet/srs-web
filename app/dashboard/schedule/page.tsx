"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Video,
  Users,
  Info,
  CalendarCheck,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

export default function SchedulePage() {
  const [selectedChild, setSelectedChild] = useState("all");
  const [viewMode, setViewMode] = useState<"week" | "agenda" | "month">("week");

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 font-mono block mb-1">
            Thursday, November 5, 2026 · Learner Portal
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
            Room for learning.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
            Your family&apos;s lessons, in one place. All times are shown in Eastern Time (UTC-5).
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Syncing with Google Calendar...")}
          className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full shadow-2xs hover:shadow transition-all shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <CalendarIcon className="w-4 h-4 text-[#0A5C4C]" />
          <span>Sync calendar</span>
        </button>
      </div>

      {/* Filter Chips & Timezone */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedChild("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedChild === "all"
                ? "bg-[#EAF5F2] text-[#0A5C4C] border border-[#CCE8E0]"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            All children
          </button>
          <button
            type="button"
            onClick={() => setSelectedChild("emma")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedChild === "emma"
                ? "bg-[#EAF5F2] text-[#0A5C4C] border border-[#CCE8E0]"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Emma · Algebra I
          </button>
          <button
            type="button"
            onClick={() => setSelectedChild("noah")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedChild === "noah"
                ? "bg-[#FEECEB] text-rose-800 border border-rose-200"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Noah · Science explorers
          </button>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Timezone: <strong className="text-slate-700">America/New_York</strong>
        </div>
      </div>

      {/* Interactive Calendar Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-5 sm:p-7 space-y-6">
        
        {/* Calendar Nav Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              November 2–8, 2026
            </h2>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer"
                aria-label="Previous week"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="px-2.5 py-1 text-xs font-bold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Today
              </button>
              <button
                type="button"
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer"
                aria-label="Next week"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* View switcher */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
            <button
              type="button"
              onClick={() => setViewMode("week")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === "week" ? "bg-white text-slate-900 shadow-2xs" : "hover:text-slate-900"
              }`}
            >
              Week
            </button>
            <button
              type="button"
              onClick={() => setViewMode("agenda")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === "agenda" ? "bg-white text-slate-900 shadow-2xs" : "hover:text-slate-900"
              }`}
            >
              Agenda
            </button>
            <button
              type="button"
              onClick={() => setViewMode("month")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === "month" ? "bg-white text-slate-900 shadow-2xs" : "hover:text-slate-900"
              }`}
            >
              Month
            </button>
          </div>
        </div>

        {/* Week Schedule Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[720px]">
            {/* Days Header */}
            <div className="grid grid-cols-8 border-b border-slate-100 pb-3 text-center text-xs font-bold">
              <div className="text-slate-400 font-mono">ET</div>
              <div className="text-slate-700">Mon 2</div>
              <div className="text-slate-700">Tue 3</div>
              <div className="text-slate-700">Wed 4</div>
              <div>
                <span className="inline-block bg-[#0A5C4C] text-white px-3 py-1 rounded-lg shadow-2xs">
                  Thu 5
                </span>
              </div>
              <div className="text-slate-700">Fri 6</div>
              <div className="text-slate-700">Sat 7</div>
              <div className="text-slate-700">Sun 8</div>
            </div>

            {/* Time Rows */}
            <div className="divide-y divide-slate-100 text-xs">
              
              {/* 4 PM */}
              <div className="grid grid-cols-8 min-h-[60px] py-1">
                <div className="text-slate-400 font-mono pt-1 text-[11px]">4 PM</div>
                <div className="border-r border-slate-50" />
                <div className="border-r border-slate-50" />
                <div className="border-r border-slate-50" />
                <div className="border-r border-slate-50" />
                <div className="border-r border-slate-50" />
                <div className="border-r border-slate-50" />
                <div />
              </div>

              {/* 5 PM (Has Lessons!) */}
              <div className="grid grid-cols-8 min-h-[85px] py-1">
                <div className="text-slate-400 font-mono pt-1 text-[11px]">5 PM</div>
                
                {/* Mon */}
                <div className="border-r border-slate-50" />

                {/* Tue 3 - Completed Algebra I */}
                <div className="border-r border-slate-50 p-1">
                  <div className="bg-[#EAF5F2] border border-[#CCE8E0] rounded-xl p-2 h-full flex flex-col justify-between text-[11px]">
                    <div>
                      <div className="font-bold text-[#0A5C4C]">Algebra I</div>
                      <div className="text-slate-500 text-[10px]">5–6 PM · Emma</div>
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                      Completed
                    </span>
                  </div>
                </div>

                {/* Wed */}
                <div className="border-r border-slate-50" />

                {/* Thu 5 - Today Algebra I */}
                <div className="border-r border-slate-50 p-1">
                  <Link
                    href="/dashboard/schedule/lesson-details"
                    className="bg-[#EAF5F2] border-2 border-[#0A5C4C] rounded-xl p-2 h-full flex flex-col justify-between text-[11px] hover:shadow-xs transition-shadow block"
                  >
                    <div>
                      <div className="font-bold text-[#0A5C4C] flex items-center justify-between">
                        <span>Algebra I</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <div className="text-slate-700 text-[10px] font-medium">5–6 PM · Emma</div>
                    </div>
                    <div className="text-[10px] text-slate-500">Lin Chen</div>
                  </Link>
                </div>

                {/* Fri */}
                <div className="border-r border-slate-50" />

                {/* Sat */}
                <div className="border-r border-slate-50" />

                {/* Sun */}
                <div />
              </div>

              {/* 6 PM (Has Science explorers on Fri!) */}
              <div className="grid grid-cols-8 min-h-[85px] py-1">
                <div className="text-slate-400 font-mono pt-1 text-[11px]">6 PM</div>
                <div className="border-r border-slate-50" />
                <div className="border-r border-slate-50" />
                <div className="border-r border-slate-50" />
                <div className="border-r border-slate-50" />

                {/* Fri 6 - Science Explorers */}
                <div className="border-r border-slate-50 p-1">
                  <div className="bg-[#FFF4ED] border border-[#FED7AA] rounded-xl p-2 h-full flex flex-col justify-between text-[11px]">
                    <div>
                      <div className="font-bold text-amber-900">Science explorers</div>
                      <div className="text-amber-800/80 text-[10px]">6–7 PM · Noah</div>
                    </div>
                    <div className="text-[10px] text-amber-700">Thiri Aung</div>
                  </div>
                </div>

                <div className="border-r border-slate-50" />
                <div />
              </div>

              {/* 7 PM */}
              <div className="grid grid-cols-8 min-h-[60px] py-1">
                <div className="text-slate-400 font-mono pt-1 text-[11px]">7 PM</div>
                <div className="border-r border-slate-50" />
                <div className="border-r border-slate-50" />
                <div className="border-r border-slate-50" />
                <div className="border-r border-slate-50" />
                <div className="border-r border-slate-50" />
                <div className="border-r border-slate-50" />
                <div />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Coming Up Next & Helper cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Coming up next (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
            Coming up next
          </h3>

          <div className="divide-y divide-slate-100">
            {/* Item 1 */}
            <div className="py-3.5 flex items-center justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0A5C4C] flex items-center justify-center shrink-0 mt-0.5">
                  <Video className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                    Today · Algebra I: Linear equations
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Emma · Lin Chen · 5:00–6:00 PM ET
                  </div>
                </div>
              </div>
              <Link
                href="/dashboard/schedule/lesson-details"
                className="text-xs font-bold text-[#0A5C4C] bg-[#EAF5F2] hover:bg-[#d9ece7] px-3 py-1.5 rounded-full transition-colors shrink-0 inline-flex items-center gap-1"
              >
                <span>Lesson details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Item 2 */}
            <div className="py-3.5 flex items-center justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                    Fri, Nov 6 · Science explorers
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Noah · Thiri Aung · Group of 4 · 6:00–7:00 PM ET
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full shrink-0 inline-flex items-center gap-1">
                <span>Scheduled</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Item 3 */}
            <div className="py-3.5 flex items-center justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                    Tue, Nov 10 · Algebra I
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Emma · Lin Chen · 5:00–6:00 PM ET
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full shrink-0 inline-flex items-center gap-1">
                <span>Scheduled</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>

        {/* Right Helper Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Yellow policy note */}
          <div className="bg-[#FAF7EC] border border-[#ECE5CD] rounded-3xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-950 font-display">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Need to change a lesson?</span>
            </div>
            <p className="text-xs text-amber-900/85 leading-relaxed font-sans">
              Request a change at least 24 hours ahead. Today&apos;s lesson is inside that window; contact support for help.
            </p>
          </div>

          {/* Connect calendar card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Keep your week connected
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
              Add lessons to Google, Apple or Outlook. Changes update automatically.
            </p>
            <button
              type="button"
              onClick={() => alert("Connecting calendar...")}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#0A5C4C] hover:underline pt-1 cursor-pointer"
            >
              <span>Connect my calendar</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
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

