"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Plus,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  Download,
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

export default function AdminTutorsPage() {
  const [selectedTab, setSelectedTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTutor, setSelectedTutor] = useState<any>({
    id: "TU-1002",
    name: "Lin Chen",
    status: "Active · Approved",
    focus: "Algebra I · Grades 7–10 · One-to-one & groups of 3–5",
    languages: "English, Chinese · America/New_York",
    workload: "18 / 20 hours",
    workloadPercent: 90,
    nextSlot: "Tuesday · 6:15–7:15 PM ET · From Nov 10",
    upcoming: "Emma Thant · Today at 5:00 PM ET",
    quality: "96% attendance · 1 overdue lesson note",
  });

  const tutors = [
    {
      id: "TU-1001",
      name: "Priya Shah",
      subject: "Math foundations · Grades 4–8",
      languages: "English, Hindi",
      load: "14 / 20 h",
      students: "8 students",
      status: "Available",
      workloadPercent: 70,
      focus: "Math foundations · Grades 4–8 · One-to-one",
      nextSlot: "Wednesday · 4:00–5:00 PM ET",
      upcoming: "Liam Patel · Monday at 4:00 PM ET",
      quality: "98% attendance · 0 overdue notes",
    },
    {
      id: "TU-1002",
      name: "Lin Chen",
      subject: "Algebra I · Grades 7–10",
      languages: "English, Chinese",
      load: "18 / 20 h",
      students: "10 students",
      status: "Near capacity",
      workloadPercent: 90,
      focus: "Algebra I · Grades 7–10 · One-to-one & groups of 3–5",
      nextSlot: "Tuesday · 6:15–7:15 PM ET · From Nov 10",
      upcoming: "Emma Thant · Today at 5:00 PM ET",
      quality: "96% attendance · 1 overdue lesson note",
    },
    {
      id: "TU-1003",
      name: "Daniel Brooks",
      subject: "Reading & writing · Grades 6–9",
      languages: "English",
      load: "16 / 24 h",
      students: "4 groups · 2 one-to-one",
      status: "Available",
      workloadPercent: 66,
      focus: "Reading & writing · Grades 6–9 · Small groups",
      nextSlot: "Thursday · 4:00–5:00 PM ET",
      upcoming: "Reading & writing A · Today at 5:30 PM ET",
      quality: "100% attendance · All notes current",
    },
    {
      id: "TU-1004",
      name: "Alex Rivera",
      subject: "Creative computing · Grades 5–9",
      languages: "English, Spanish",
      load: "12 / 16 h",
      students: "7 students",
      status: "Available",
      workloadPercent: 75,
      focus: "Creative computing & Scratch · Grades 5–9",
      nextSlot: "Saturday · 2:00–3:00 PM ET",
      upcoming: "Oliver Kim · Saturday at 11:00 AM ET",
      quality: "95% attendance · 0 overdue notes",
    },
    {
      id: "TU-1005",
      name: "Thiri Aung",
      subject: "Science explorers · Grades 3–6",
      languages: "English, Burmese",
      load: "15 / 20 h",
      students: "9 students",
      status: "Available",
      workloadPercent: 75,
      focus: "Science explorers & Elementary science · Grades 3–6",
      nextSlot: "Friday · 4:30–5:30 PM ET",
      upcoming: "Noah Thant · Friday at 6:00 PM ET",
      quality: "99% attendance · All notes current",
    },
    {
      id: "TU-1006",
      name: "Sofia Diaz",
      subject: "Math & bilingual support · K–5",
      languages: "English, Spanish",
      load: "9 / 16 h",
      students: "6 students",
      status: "Available",
      workloadPercent: 56,
      focus: "Elementary math & bilingual Spanish support · K–5",
      nextSlot: "Wednesday · 3:30–4:30 PM ET",
      upcoming: "Reading foundations B · Starts Nov 9",
      quality: "97% attendance · 0 overdue notes",
    },
  ];

  const filteredTutors = tutors.filter((item) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.subject.toLowerCase().includes(q) ||
        item.languages.toLowerCase().includes(q)
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
              Tutors management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Balance expertise, availability and a healthy teaching workload.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export roster</span>
            </button>
            <button
              type="button"
              className="px-3.5 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Invite tutor</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Active tutors</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">18</div>
          <div className="text-[11px] text-teal-700 font-medium mt-1">
            Across 6 subject areas
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Scheduled this week</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">164 h</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            76% of declared teaching capacity
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Matching requests</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">3</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            Ethan Wilson is ready to match
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Profiles in review</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">2</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Not yet available for assignment
          </div>
        </div>
      </div>

      {/* Yellow Warning Banner */}
      <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong className="font-bold">Lin Chen is at 90% of weekly capacity.</strong> Check declared availability before adding a recurring lesson.
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            const lin = tutors.find((t) => t.id === "TU-1002");
            if (lin) {
              setSelectedTutor({
                id: lin.id,
                name: lin.name,
                status: "Active · Approved",
                focus: lin.focus,
                languages: `${lin.languages} · America/New_York`,
                workload: `${lin.load}ours`,
                workloadPercent: lin.workloadPercent,
                nextSlot: lin.nextSlot,
                upcoming: lin.upcoming,
                quality: lin.quality,
              });
            }
          }}
          className="text-amber-900 font-bold hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
        >
          <span>Review workload</span>
          <span className="text-xs">→</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200/80 pb-2">
        {[
          { id: "active", label: "Active tutors", count: 18 },
          { id: "invited", label: "Invited", count: 2 },
          { id: "review", label: "Profile review", count: 2 },
          { id: "inactive", label: "Inactive", count: 0 },
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
            placeholder="Search tutor, subject or language"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Select defaultValue="Subject: All">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Subject: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Subject: All">Subject: All</SelectItem>
              <SelectItem value="Math">Math</SelectItem>
              <SelectItem value="Reading & writing">Reading &amp; writing</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Availability: All">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Availability: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Availability: All">Availability: All</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Near capacity">Near capacity</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="This week">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="This week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="This week">This week</SelectItem>
              <SelectItem value="Next week">Next week</SelectItem>
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

      {/* Main Grid: Tutor Roster + Tutor Profile Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Roster table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0B1E2B]">Tutor roster</h2>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Compare availability</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <Table className="w-full text-left text-xs">
              <TableHeader className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <TableRow>
                  <TableHead className="py-3 px-4 font-bold text-slate-500">Tutor / Expertise</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">Languages</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">Load / Week</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">Status</TableHead>
                  <TableHead className="py-3 px-4 text-right font-bold text-slate-500">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100">
                {filteredTutors.map((item) => {
                  const isSelected = selectedTutor?.id === item.id;
                  return (
                    <TableRow
                      key={item.id}
                      onClick={() =>
                        setSelectedTutor({
                          id: item.id,
                          name: item.name,
                          status: "Active · Approved",
                          focus: item.focus,
                          languages: `${item.languages} · America/New_York`,
                          workload: `${item.load}ours`,
                          workloadPercent: item.workloadPercent,
                          nextSlot: item.nextSlot,
                          upcoming: item.upcoming,
                          quality: item.quality,
                        })
                      }
                      className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                        isSelected ? "bg-teal-50/50" : ""
                      }`}
                    >
                      <TableCell className="py-3 px-4">
                        <div className="font-bold text-[#0B1E2B]">{item.name}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{item.subject}</div>
                      </TableCell>
                      <TableCell className="py-3 px-3 text-slate-700 font-medium">
                        {item.languages}
                      </TableCell>
                      <TableCell className="py-3 px-3">
                        <div className="font-semibold text-slate-800">{item.load}</div>
                        <div className="text-[10px] text-slate-400">{item.students}</div>
                      </TableCell>
                      <TableCell className="py-3 px-3">
                        <Badge
                          variant="secondary"
                          className={`text-[10px] font-bold ${
                            item.status === "Available"
                              ? "bg-teal-100 text-teal-800 hover:bg-teal-100 border-none"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-100 border-none"
                          }`}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3 px-4 text-right">
                        <span className="font-semibold text-teal-800 hover:underline">
                          View tutor
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="p-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Showing {filteredTutors.length} of 18 active tutors</span>
            <Pagination className="w-auto mx-0 justify-end">
              <PaginationContent className="gap-1 text-xs">
                <PaginationItem>
                  <PaginationPrevious href="#" text="" className="h-7 w-7 p-0 justify-center text-slate-600 hover:text-slate-900 cursor-pointer" />
                </PaginationItem>
                <PaginationItem>
                  <span className="px-2 text-xs font-bold text-slate-700 select-none">Page 1</span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" text="" className="h-7 w-7 p-0 justify-center text-slate-600 hover:text-slate-900 cursor-pointer" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* Selected Tutor Drawer (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Tutor Profile · {selectedTutor?.id || "TU-1002"}
            </span>
            <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100 border-none text-[10px] font-bold">
              {selectedTutor?.status || "Active · Approved"}
            </Badge>
          </div>

          <div>
            <h3 className="text-xl font-black text-[#0B1E2B] font-display">
              {selectedTutor?.name || "Lin Chen"}
            </h3>
          </div>

          {/* Details list */}
          <div className="space-y-3 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Teaching focus
              </div>
              <div className="text-slate-800 font-medium">
                {selectedTutor?.focus ||
                  "Algebra I · Grades 7–10 · One-to-one & groups of 3–5"}
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Languages & timezone
              </div>
              <div className="text-slate-800 font-medium">
                {selectedTutor?.languages || "English, Chinese · America/New_York"}
              </div>
            </div>

            {/* Workload Progress Bar */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Weekly workload
                </span>
                <span className="font-bold text-slate-800">
                  {selectedTutor?.workload || "18 / 20 hours"}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    selectedTutor?.workloadPercent >= 90
                      ? "bg-amber-500"
                      : "bg-[#0A5C4C]"
                  }`}
                  style={{ width: `${selectedTutor?.workloadPercent || 90}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Next available recurring slot
              </div>
              <div className="text-slate-800 font-medium">
                {selectedTutor?.nextSlot ||
                  "Tuesday · 6:15–7:15 PM ET · From Nov 10"}
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Upcoming lesson
              </div>
              <div className="text-slate-800 font-medium">
                {selectedTutor?.upcoming || "Emma Thant · Today at 5:00 PM ET"}
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Teaching quality
              </div>
              <div className="text-slate-800 font-medium">
                {selectedTutor?.quality ||
                  "96% attendance · 1 overdue lesson note"}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              className="w-full py-2.5 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Review availability
            </button>
            <button
              type="button"
              className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Message {selectedTutor?.name?.split(" ")[0] || "Lin"}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Ready for a tutor match & Onboarding review */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Ready for a tutor match */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E2B]">Ready for a tutor match</h3>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>All 3 requests</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="font-bold text-xs text-[#0B1E2B]">
                Ethan Wilson · Grade 9 · Algebra I
              </div>
              <div className="text-[11px] text-slate-500">
                Prefers Tue / Thu after 5:00 PM ET · One-to-one · English
              </div>
              <button className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer">
                <span>Compare Lin and Priya&apos;s availability</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0B1E2B]">
                  Aye Aye Win · Grade 7 math support
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                  Consult first
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                Consultation first · Burmese preferred · Do not assign before plan approval.
              </div>
            </div>
          </div>
        </div>

        {/* Onboarding review */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E2B]">Onboarding review</h3>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Review applications</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0B1E2B]">
                  Nora Ahmed · Science tutor
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">
                  Not assignable
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                Teaching profile submitted Nov 4 · Safeguarding review pending
              </div>
              <button className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer">
                <span>Review documentation</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>An invitation does not activate teaching access. Approval is required before assignment.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

