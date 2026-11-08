"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckSquare,
  Plus,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  Download,
  TrendingUp,
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

export default function AdminAttendancePage() {
  const [selectedTab, setSelectedTab] = useState("oversight");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedLearner, setSelectedLearner] = useState({
    name: "Emma",
    program: "ALGEBRA I · LAST 6 LESSONS",
    title: "Emma's learning trend",
    score: "78%",
    scoreDiff: "↑ 14 pts",
    equations: 85,
    graphing: 78,
    wordProblems: 65,
    note: "Lin's note: Emma is explaining her steps more clearly. Next focus: translating word problems into equations.",
  });

  const learners = [
    {
      id: "L-1",
      name: "Emma Thant",
      plan: "Algebra I · Lin Chen",
      attendance: "8 / 8",
      attendanceSub: "Last 30 days",
      practice: "78%",
      practiceSub: "↑ 14 points",
      report: "Shared",
      action: "View progress",
      programTag: "ALGEBRA I · LAST 6 LESSONS",
      title: "Emma's learning trend",
      score: "78%",
      scoreDiff: "↑ 14 pts",
      equations: 85,
      graphing: 78,
      wordProblems: 65,
      note: "Lin's note: Emma is explaining her steps more clearly. Next focus: translating word problems into equations.",
    },
    {
      id: "L-2",
      name: "Noah Thant",
      plan: "Science explorers · Thiri Aung",
      attendance: "4 / 4",
      attendanceSub: "Last 30 days",
      practice: "82%",
      practiceSub: "↑ 8 points",
      report: "Due Nov 6",
      action: "Review notes",
      programTag: "SCIENCE EXPLORERS · LAST 4 LESSONS",
      title: "Noah's learning trend",
      score: "82%",
      scoreDiff: "↑ 8 pts",
      equations: 90,
      graphing: 80,
      wordProblems: 75,
      note: "Thiri's note: Great curiosity during water and materials experiment. Completed journal entry on time.",
    },
    {
      id: "L-3",
      name: "Liam Patel",
      plan: "Math foundations · Priya Shah",
      attendance: "7 / 8",
      attendanceSub: "1 absence",
      practice: "72%",
      practiceSub: "↑ 5 points",
      report: "Overdue",
      action: "Remind tutor",
      programTag: "MATH FOUNDATIONS · LAST 8 LESSONS",
      title: "Liam's learning trend",
      score: "72%",
      scoreDiff: "↑ 5 pts",
      equations: 75,
      graphing: 70,
      wordProblems: 70,
      note: "Priya's note: Missing one makeup session for fractions worksheet. Monthly summary due.",
    },
    {
      id: "L-4",
      name: "Mia Lopez",
      plan: "Reading & writing · Daniel Brooks",
      attendance: "7 / 8",
      attendanceSub: "1 absence",
      practice: "76%",
      practiceSub: "↑ 9 points",
      report: "In review",
      action: "Review report",
      programTag: "READING & WRITING · LAST 6 LESSONS",
      title: "Mia's learning trend",
      score: "76%",
      scoreDiff: "↑ 9 pts",
      equations: 80,
      graphing: 75,
      wordProblems: 72,
      note: "Daniel's note: Essay thesis statement significantly stronger. Pacing on paragraph transitions improving.",
    },
    {
      id: "L-5",
      name: "Oliver Kim",
      plan: "Creative computing · Alex Rivera",
      attendance: "6 / 8",
      attendanceSub: "2 absences",
      practice: "68%",
      practiceSub: "No recent change",
      report: "Overdue",
      action: "Check in",
      programTag: "CREATIVE COMPUTING · LAST 8 LESSONS",
      title: "Oliver's learning trend",
      score: "68%",
      scoreDiff: "No recent change",
      equations: 65,
      graphing: 70,
      wordProblems: 68,
      note: "Alex's note: Two sessions missed in October due to sports schedule. Guardian check-in recommended.",
    },
    {
      id: "L-6",
      name: "Ben Carter",
      plan: "Reading & writing · Daniel Brooks",
      attendance: "8 / 8",
      attendanceSub: "Last 30 days",
      practice: "80%",
      practiceSub: "↑ 7 points",
      report: "Shared",
      action: "View progress",
      programTag: "READING & WRITING · LAST 8 LESSONS",
      title: "Ben's learning trend",
      score: "80%",
      scoreDiff: "↑ 7 pts",
      equations: 85,
      graphing: 80,
      wordProblems: 75,
      note: "Daniel's note: Consistent participation in group discussions. Completed all peer review notes.",
    },
  ];

  const filteredLearners = learners.filter((item) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.plan.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          Administration / Thursday, November 5, 2026
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] font-display">
              Attendance & progress
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Spot missed learning, support tutors and keep families informed.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export attendance</span>
            </button>
            <button
              type="button"
              className="px-3.5 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create progress report</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Attendance · last 30 days</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">96%</div>
          <div className="text-[11px] text-teal-700 font-medium mt-1">
            384 attended / 400 expected lessons
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Lesson notes complete</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">92%</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            368 of 400 · 6 notes overdue
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Family reports due</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">8</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            3 overdue by more than 48 hours
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Learners to check in on</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">4</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Repeated absence or stalled practice
          </div>
        </div>
      </div>

      {/* Yellow Warning Banner */}
      <Alert className="bg-amber-50/90 border-amber-200/80 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <AlertDescription className="text-xs text-amber-900">
            <strong className="font-bold">3 family progress reports are overdue.</strong> Review lesson notes before sending a reminder to the tutor.
          </AlertDescription>
        </div>
        <button
          type="button"
          onClick={() => setSelectedTab("reports")}
          className="text-amber-900 font-bold hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
        >
          <span>Review overdue reports</span>
          <span className="text-xs">→</span>
        </button>
      </Alert>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200/80 pb-2">
        {[
          { id: "oversight", label: "Learner oversight", count: 0 },
          { id: "register", label: "Attendance register", count: 0 },
          { id: "reports", label: "Family reports", count: 8 },
          { id: "notes", label: "Tutor notes", count: 0 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedTab === tab.id
                ? "bg-[#0B1E2B] text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            {tab.label} {tab.count > 0 && <span className="opacity-70 ml-1 font-normal">{tab.count}</span>}
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search learner, tutor or learning plan"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Select defaultValue="Last 30 days">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Last 30 days">Last 30 days</SelectItem>
              <SelectItem value="This month">This month</SelectItem>
              <SelectItem value="Last 90 days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Program: All">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Program: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Program: All">Program: All</SelectItem>
              <SelectItem value="Algebra I">Algebra I</SelectItem>
              <SelectItem value="Reading & writing">Reading &amp; writing</SelectItem>
              <SelectItem value="Math foundations">Math foundations</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Needs attention: All">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Needs attention: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Needs attention: All">Needs attention: All</SelectItem>
              <SelectItem value="Overdue reports">Overdue reports</SelectItem>
              <SelectItem value="Absences">Absences</SelectItem>
            </SelectContent>
          </Select>

          <button
            onClick={() => setSearchQuery("")}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Grid: Learner Oversight Table + Learning Trend Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0B1E2B]">Learner oversight</h2>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Set follow-up rules</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <Table className="text-left text-xs">
              <TableHeader className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <TableRow>
                  <TableHead className="py-3 px-4 text-slate-400 font-bold">Student / Plan</TableHead>
                  <TableHead className="py-3 px-3 text-slate-400 font-bold">Attendance</TableHead>
                  <TableHead className="py-3 px-3 text-slate-400 font-bold">Last Practice</TableHead>
                  <TableHead className="py-3 px-3 text-slate-400 font-bold">Report</TableHead>
                  <TableHead className="py-3 px-4 text-right text-slate-400 font-bold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100">
                {filteredLearners.map((item) => {
                  const isSelected = selectedLearner.name === item.name.split(" ")[0];
                  return (
                    <TableRow
                      key={item.id}
                      onClick={() =>
                        setSelectedLearner({
                          name: item.name.split(" ")[0],
                          program: item.programTag,
                          title: item.title,
                          score: item.score,
                          scoreDiff: item.scoreDiff,
                          equations: item.equations,
                          graphing: item.graphing,
                          wordProblems: item.wordProblems,
                          note: item.note,
                        })
                      }
                      className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                        isSelected ? "bg-teal-50/50" : ""
                      }`}
                    >
                      <TableCell className="py-3 px-4">
                        <div className="font-bold text-[#0B1E2B]">{item.name}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{item.plan}</div>
                      </TableCell>
                      <TableCell className="py-3 px-3">
                        <div className="font-semibold text-slate-800">{item.attendance}</div>
                        <div className="text-[10px] text-slate-400">{item.attendanceSub}</div>
                      </TableCell>
                      <TableCell className="py-3 px-3">
                        <div className="font-semibold text-slate-800">{item.practice}</div>
                        <div className="text-[10px] text-teal-700">{item.practiceSub}</div>
                      </TableCell>
                      <TableCell className="py-3 px-3">
                        <Badge
                          variant="secondary"
                          className={`border-none font-bold text-[10px] ${
                            item.report === "Shared"
                              ? "bg-teal-100 text-teal-800"
                              : item.report === "Overdue"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {item.report}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3 px-4 text-right">
                        <span className="font-semibold text-teal-800 hover:underline">
                          {item.action}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="p-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Showing {filteredLearners.length} of 126 active learners · Practice scores are not school grades</span>
            <Pagination className="mx-0 w-auto">
              <PaginationContent className="gap-1 font-bold text-slate-600">
                <PaginationItem>
                  <PaginationPrevious href="#" className="h-7 px-2 text-xs hover:bg-slate-100" />
                </PaginationItem>
                <PaginationItem>
                  <span className="px-2 text-xs">Page 1</span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" className="h-7 px-2 text-xs hover:bg-slate-100" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* Selected Learner Trend Drawer (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {selectedLearner.program}
          </div>

          <div>
            <h3 className="text-xl font-black text-[#0B1E2B] font-display">
              {selectedLearner.title}
            </h3>
          </div>

          {/* Big Metric */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#0B1E2B] font-display">
              {selectedLearner.score}
            </span>
            <span className="text-xs font-bold text-teal-700">
              {selectedLearner.scoreDiff}
            </span>
          </div>

          {/* SVG Trend Graph matching mockup */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="h-24 w-full relative">
              <svg
                viewBox="0 0 300 80"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <line x1="0" y1="20" x2="300" y2="20" stroke="#E2E8F0" strokeDasharray="3 3" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="#E2E8F0" strokeDasharray="3 3" />
                <polyline
                  fill="none"
                  stroke="#0A5C4C"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="20,62 100,50 180,42 270,22"
                />
                <circle cx="20" cy="62" r="3.5" fill="#0A5C4C" />
                <circle cx="100" cy="50" r="3.5" fill="#0A5C4C" />
                <circle cx="180" cy="42" r="3.5" fill="#0A5C4C" />
                <circle cx="270" cy="22" r="4.5" fill="#0A5C4C" />
              </svg>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-medium px-2 pt-1 border-t border-slate-200/60">
              <span>Oct 15</span>
              <span>Oct 22</span>
              <span>Oct 29</span>
              <span>Nov 3</span>
            </div>
          </div>

          {/* Breakdown progress bars */}
          <div className="space-y-2 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-semibold">
                <span className="text-slate-700">Equations</span>
                <span className="text-slate-900 font-bold">{selectedLearner.equations}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0A5C4C] rounded-full"
                  style={{ width: `${selectedLearner.equations}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-semibold">
                <span className="text-slate-700">Graphing</span>
                <span className="text-slate-900 font-bold">{selectedLearner.graphing}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0A5C4C] rounded-full"
                  style={{ width: `${selectedLearner.graphing}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-semibold">
                <span className="text-slate-700">Word problems</span>
                <span className="text-slate-900 font-bold">{selectedLearner.wordProblems}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${selectedLearner.wordProblems}%` }}
                />
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
            {selectedLearner.note}
          </p>

          <button
            type="button"
            className="w-full py-2.5 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Open full learning record
          </button>
        </div>
      </div>

      {/* Bottom Grid: Overdue family reports & Attendance follow-up */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Overdue family reports */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E2B]">Overdue family reports</h3>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>All 3 overdue</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0B1E2B]">
                  Liam Patel · Monthly summary
                </span>
                <Badge variant="secondary" className="border-none font-bold text-[10px] bg-rose-100 text-rose-800">
                  Overdue
                </Badge>
              </div>
              <div className="text-[11px] text-slate-500">
                Priya Shah · Due Nov 3 · 2 days overdue · Last lesson note complete
              </div>
              <button className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer">
                <span>Send tutor reminder</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="font-bold text-xs text-[#0B1E2B]">
                Oliver Kim · Monthly summary
              </div>
              <div className="text-[11px] text-slate-500">
                Alex Rivera · Due Nov 2 · Missing one lesson note
              </div>
              <button className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer">
                <span>Review missing note</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Attendance follow-up */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E2B]">Attendance follow-up</h3>
            <Badge variant="secondary" className="border-none font-bold text-[10px] bg-amber-100 text-amber-800">
              Check in
            </Badge>
          </div>

          <div className="space-y-3 pt-1">
            <div className="font-bold text-xs text-[#0B1E2B]">
              Oliver Kim · Two absences this month
            </div>
            <p className="text-xs text-slate-500">
              Oct 22 & Oct 29 · Guardian timezone: America/Los_Angeles
            </p>
            <button className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Contact Jin Kim</span>
              <ExternalLink className="w-3 h-3" />
            </button>

            <Alert className="p-3 bg-teal-50/80 border-teal-200/80 rounded-xl flex items-start gap-2.5 text-xs text-teal-900">
              <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <AlertDescription className="text-xs text-teal-900">
                Emma&apos;s November summary was shared with May Thant on Nov 4. Delivery recorded.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}

