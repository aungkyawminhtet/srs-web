"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  Calendar,
  BookOpen,
  Download,
  ChevronDown,
  Info,
  CheckCircle2,
  ArrowUpRight,
  User,
  Sparkles,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function ProgressPage() {
  const [selectedChild, setSelectedChild] = useState("emma");
  const [timeRange, setTimeRange] = useState("Last 30 days");

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 font-mono block mb-1">
            Thursday, November 5, 2026 · Learner Portal
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
            Small steps. Real understanding.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            A thoughtful view of Emma&apos;s growth, with clear next steps—not just numbers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Downloading progress report PDF...")}
          className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full shadow-2xs hover:shadow transition-all shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <span>Download report</span>
          <Download className="w-4 h-4 text-[#0A5C4C]" />
        </button>
      </div>

      {/* Child switcher bar */}
      <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#E5EAE8] text-[#0A5C4C] font-bold text-xs flex items-center justify-center font-display border border-slate-200">
            ET
          </div>
          <span className="font-bold text-slate-800">Emma Thant</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">Grade 8 · Algebra I</span>
        </div>

        <button
          type="button"
          onClick={() => alert("Switch child account")}
          className="text-[#0A5C4C] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          <span>Switch child: Noah Thant</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Top 3 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white rounded-3xl p-5 lg:p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>Practice accuracy</span>
            <TrendingUp className="w-4 h-4 text-[#0A5C4C]" />
          </div>
          <div className="text-3xl lg:text-4xl font-black text-[#0B1E2B] font-display">
            78%
          </div>
          <div className="text-xs text-[#0A5C4C] font-semibold mt-1">
            ↑ 14 points vs. 2 lessons ago
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 lg:p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>November attendance</span>
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl lg:text-4xl font-black text-[#0B1E2B] font-display">
            2 / 2
          </div>
          <div className="text-xs text-slate-500 mt-1">
            All scheduled lessons attended
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 lg:p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>Monthly lesson plan</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl lg:text-4xl font-black text-[#0B1E2B] font-display">
            2 / 8
          </div>
          <div className="text-xs text-slate-500 mt-1">
            6 lessons remaining
          </div>
        </div>
      </div>

      {/* Row 1: Accuracy Chart (7 cols) + Focus Areas (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Line Chart Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                Understanding is taking shape
              </h2>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                <span>Practice accuracy · Last 6 lessons</span>
                <span className="text-[11px] font-bold text-[#0A5C4C] bg-[#EAF5F2] px-2 py-0.5 rounded-full">
                  ↑ 14 pts vs. 2 lessons ago
                </span>
              </div>
            </div>

            <Select
              value={timeRange}
              onValueChange={(val) => val && setTimeRange(val)}
            >
              <SelectTrigger className="text-xs font-bold text-slate-600 bg-slate-50 border-slate-200 h-8">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                <SelectItem value="Last 60 days">Last 60 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* SVG Line Chart */}
          <div className="pt-4 pb-2">
            <div className="relative h-44 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0A5C4C" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#0A5C4C" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="0" y1="20" x2="500" y2="20" stroke="#F1F5F9" strokeDasharray="4 4" />
                <line x1="0" y1="70" x2="500" y2="70" stroke="#F1F5F9" strokeDasharray="4 4" />
                <line x1="0" y1="120" x2="500" y2="120" stroke="#F1F5F9" strokeDasharray="4 4" />

                {/* Axis Labels */}
                <text x="5" y="24" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">100</text>
                <text x="5" y="74" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">50</text>
                <text x="5" y="124" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">0</text>

                {/* Shaded Area under Curve */}
                <path
                  d="M 40 95 Q 120 90, 200 85 T 320 65 T 410 50 T 480 40 L 480 140 L 40 140 Z"
                  fill="url(#chartGrad)"
                />

                {/* Main Green Line */}
                <path
                  d="M 40 95 Q 120 90, 200 85 T 320 65 T 410 50 T 480 40"
                  fill="none"
                  stroke="#0A5C4C"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Current Dot (78%) */}
                <circle cx="480" cy="40" r="5" fill="#0A5C4C" />
                <rect x="450" y="12" width="45" height="20" rx="6" fill="#0A5C4C" />
                <text x="472" y="26" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">78%</text>
              </svg>

              {/* X Axis Dates */}
              <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-2 px-6">
                <span>Oct 16</span>
                <span>Oct 20</span>
                <span>Oct 23</span>
                <span>Oct 27</span>
                <span>Nov 1</span>
                <span className="font-bold text-slate-700">Nov 3</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed font-sans pt-2 border-t border-slate-100">
            Based on in-lesson practice checks, not formal grades. The last 6 completed lessons are shown.
          </p>
        </div>

        {/* Where we're focusing (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
            Where we&apos;re focusing
          </h2>

          <div className="space-y-4 pt-1">
            {/* Focus 1: Equations */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Equations</span>
                <span className="font-bold text-[#0A5C4C]">85%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#0A5C4C] rounded-full w-[85%]" />
              </div>
            </div>

            {/* Focus 2: Graphing */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Graphing</span>
                <span className="font-bold text-emerald-600">75%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full w-[75%]" />
              </div>
            </div>

            {/* Focus 3: Word problems */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Word problems</span>
                <span className="font-bold text-amber-600">55%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[55%]" />
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed pt-3 border-t border-slate-100 font-sans">
            Tutor observations · Updated Nov 3 · Building confidence means revisiting ideas, too.
          </p>
        </div>

      </div>

      {/* Row 2: Lin's learning note (7 cols) + Goals we're working toward (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Lin's Note */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
            Lin&apos;s learning note
          </h3>

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

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            Emma is explaining her steps more clearly. Her next focus is translating word problems into equations, especially choosing the right operation.
          </p>

          {/* Recommended next step callout */}
          <div className="bg-[#EAF5F2] border border-[#CCE8E0] rounded-2xl p-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0A5C4C]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Recommended next step</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Try two real-life word problems this week. Ask Emma to explain what each variable represents.
            </p>
          </div>

          <Link
            href="/dashboard/messages"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A5C4C] hover:underline pt-1"
          >
            <span>Talk with Lin about this plan</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Goals we're working toward */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
            Goals We&apos;re Working Toward
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
            Explain, then solve.
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Show clear reasoning in 4 practice sessions by Nov 12.
          </p>

          {/* Goal progress */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>3 of 4 practice days this week</span>
              <span className="text-[#0A5C4C] font-bold">75%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0A5C4C] rounded-full w-3/4" />
            </div>
          </div>

          <div className="text-xs text-slate-500 pt-1">
            Next milestone: <strong className="text-slate-800">Model a word problem independently.</strong>
          </div>

          <div className="pt-2">
            <span className="inline-block text-xs font-bold text-[#0A5C4C] bg-[#EAF5F2] px-3 py-1 rounded-full">
              On track
            </span>
          </div>
        </div>

      </div>

      {/* Row 3: Recent learning milestones Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
          Recent learning milestones
        </h3>

        <div className="overflow-x-auto">
          <Table className="w-full text-left border-collapse min-w-[600px]">
            <TableHeader>
              <TableRow className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                <TableHead className="py-2.5 px-3 text-slate-400 font-bold">Lesson</TableHead>
                <TableHead className="py-2.5 px-3 text-slate-400 font-bold">Completed</TableHead>
                <TableHead className="py-2.5 px-3 text-slate-400 font-bold">Practice check</TableHead>
                <TableHead className="py-2.5 px-3 text-slate-400 font-bold">Tutor observation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-100 text-xs sm:text-sm">
              <TableRow className="hover:bg-slate-50/70 transition-colors">
                <TableCell className="py-3 px-3 font-bold text-slate-900">Balancing equations</TableCell>
                <TableCell className="py-3 px-3 text-slate-600">Nov 3</TableCell>
                <TableCell className="py-3 px-3 font-bold text-[#0A5C4C]">78%</TableCell>
                <TableCell className="py-3 px-3 text-slate-700">Explains inverse operations</TableCell>
              </TableRow>
              <TableRow className="hover:bg-slate-50/70 transition-colors">
                <TableCell className="py-3 px-3 font-bold text-slate-900">Expressions &amp; like terms</TableCell>
                <TableCell className="py-3 px-3 text-slate-600">Nov 1</TableCell>
                <TableCell className="py-3 px-3 font-bold text-[#0A5C4C]">67%</TableCell>
                <TableCell className="py-3 px-3 text-slate-700">Combines like terms confidently</TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
