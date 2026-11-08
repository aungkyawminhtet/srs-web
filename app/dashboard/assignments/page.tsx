"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Clock,
  Search,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  HelpCircle,
  Info,
  ChevronRight,
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "todo" | "submitted" | "reviewed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("Algebra I");
  const [sortBy, setSortBy] = useState("Due date");

  const assignments = [
    {
      id: "1",
      title: "Multi-step equations · Practice 03",
      details: "8 questions · About 15 min",
      dueDate: "Today, Nov 5",
      dueTime: "11:59 PM",
      status: "Due today",
      statusStyle: "text-rose-700 bg-rose-50 border border-rose-200/80",
      actionText: "Open practice →",
      actionHref: "/dashboard/assignments/details",
      category: "todo",
    },
    {
      id: "2",
      title: "Graph it: slope & intercepts",
      details: "Interactive worksheet · About 15 min",
      dueDate: "Mon, Nov 9",
      dueTime: "11:59 PM",
      status: "Not started",
      statusStyle: "text-slate-600 bg-slate-100",
      actionText: "Start worksheet →",
      actionHref: "/dashboard/assignments/details",
      category: "todo",
    },
    {
      id: "3",
      title: "Equation warm-up",
      details: "8 questions · Submitted Nov 3",
      dueDate: "Tue, Nov 3",
      dueTime: "Reviewed Nov 4",
      status: "Reviewed · 7 / 8",
      statusStyle: "text-[#0A5C4C] bg-[#EAF5F2] border border-[#CCE8E0]",
      actionText: "View feedback →",
      actionHref: "/dashboard/assignments/details",
      category: "reviewed",
    },
  ];

  const filteredAssignments = assignments.filter((item) => {
    if (activeTab === "todo" && item.category !== "todo") return false;
    if (activeTab === "reviewed" && item.category !== "reviewed") return false;
    if (activeTab === "submitted") return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans">
      {/* Header */}
      <div>
        <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 font-mono block mb-1">
          Thursday, November 5, 2026 · Learner Portal
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
          A little practice. A lot of possibility.
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Try it, show your thinking, and learn from your feedback. Your work lives here.
        </p>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white rounded-3xl p-5 lg:p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>Needs your attention</span>
            <FileText className="w-4 h-4 text-[#0A5C4C]" />
          </div>
          <div className="text-3xl lg:text-4xl font-black text-[#0B1E2B] font-display">
            2
          </div>
          <div className="text-xs text-slate-500 mt-1">
            One assignment due today
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 lg:p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>Reviewed this month</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl lg:text-4xl font-black text-[#0B1E2B] font-display">
            1
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Your feedback is ready
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 lg:p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>Estimated practice</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl lg:text-4xl font-black text-[#0B1E2B] font-display">
            30 min
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Across your open assignments
          </div>
        </div>
      </div>

      {/* Your Assignments Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-5">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
          Your assignments
        </h2>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4">
          {[
            { id: "all", label: "All assignments · 3" },
            { id: "todo", label: "To do · 2" },
            { id: "submitted", label: "Submitted · 0" },
            { id: "reviewed", label: "Reviewed · 1" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#0A5C4C] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Select Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
          <div className="sm:col-span-6 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or topic..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="sm:col-span-3">
            <Select
              value={selectedProgram}
              onValueChange={(val) => val && setSelectedProgram(val)}
            >
              <SelectTrigger className="w-full bg-white border-slate-200 text-xs sm:text-sm text-slate-700 font-medium h-10">
                <SelectValue placeholder="Filter by program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Algebra I">Algebra I</SelectItem>
                <SelectItem value="Science Explorers">Science Explorers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-3">
            <Select
              value={sortBy}
              onValueChange={(val) => val && setSortBy(val)}
            >
              <SelectTrigger className="w-full bg-white border-slate-200 text-xs sm:text-sm text-slate-700 font-medium h-10">
                <SelectValue placeholder="Sort assignments by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Due date">Due date</SelectItem>
                <SelectItem value="Title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Assignments Table */}
        <div className="overflow-x-auto pt-2">
          <Table className="w-full text-left border-collapse min-w-[640px]">
            <TableHeader>
              <TableRow className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                <TableHead className="py-3 px-3">Assignment</TableHead>
                <TableHead className="py-3 px-3">Due date · ET</TableHead>
                <TableHead className="py-3 px-3">Status</TableHead>
                <TableHead className="py-3 px-3 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredAssignments.map((item) => (
                <TableRow key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <TableCell className="py-4 px-3">
                    <div className="font-bold text-slate-900">{item.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.details}</div>
                  </TableCell>
                  <TableCell className="py-4 px-3">
                    <div className="font-medium text-slate-800">{item.dueDate}</div>
                    <div className="text-[11px] text-slate-500">{item.dueTime}</div>
                  </TableCell>
                  <TableCell className="py-4 px-3">
                    <Badge variant="secondary" className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${item.statusStyle}`}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 px-3 text-right">
                    <Link
                      href={item.actionHref}
                      className="inline-flex items-center gap-1 font-bold text-[#0A5C4C] hover:underline"
                    >
                      <span>{item.actionText}</span>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 font-sans">
          Showing 3 of 3 assignments · All times Eastern Time (UTC-5)
        </div>
      </div>

      {/* Bottom 2-Column: Feedback + Make a good start */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column (7 cols): Feedback is part of learning */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
            Feedback is part of learning
          </span>
          <h3 className="text-lg font-bold text-slate-900 font-display">
            &ldquo;Your steps are getting clearer.&rdquo;
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Lin reviewed your Equation warm-up. You balanced both sides well—now take one more look at the negative sign in question 6.
          </p>

          <Link
            href="/dashboard/assignments/details"
            className="p-4 rounded-2xl bg-slate-50 hover:bg-[#EAF5F2]/50 border border-slate-100 flex items-center justify-between gap-3 transition-colors block"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0A5C4C] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">Equation warm-up</div>
                <div className="text-[11px] text-slate-500">Lin Chen · Reviewed Nov 4</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0A5C4C] bg-[#EAF5F2] px-2.5 py-1 rounded-full">
                7 / 8 correct
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </Link>

          <div>
            <Link
              href="/dashboard/assignments/details"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A5C4C] hover:underline"
            >
              <span>Read Lin&apos;s full feedback</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column (5 cols): Helper cards */}
        <div className="lg:col-span-5 space-y-5">
          {/* Yellow tip card */}
          <Alert className="bg-[#FAF7EC] border-[#ECE5CD] rounded-3xl p-5 space-y-1.5 text-amber-950">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-950 font-display">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <AlertTitle className="text-xs font-bold text-amber-950 font-display">No need to rush</AlertTitle>
            </div>
            <AlertDescription className="text-xs text-amber-900/85 leading-relaxed">
              Save a draft as you go. Your tutor can help if you get stuck—just share the step that confused you.
            </AlertDescription>
          </Alert>

          {/* Make a good start checklist */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
            <h4 className="text-sm font-bold text-slate-900 font-display">
              Make a good start
            </h4>
            <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>Read the question slowly.</li>
              <li>Show how you got there.</li>
              <li>Check your answer.</li>
            </ol>
            <div className="pt-2">
              <Link
                href="/dashboard/messages"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A5C4C] hover:underline"
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
