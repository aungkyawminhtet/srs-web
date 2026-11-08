"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CalendarClock,
  Plus,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  Calendar,
  SlidersHorizontal,
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

export default function AdminSchedulingPage() {
  const [selectedTab, setSelectedTab] = useState("week");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTutor, setSelectedTutor] = useState("all");

  const [selectedConflict, setSelectedConflict] = useState({
    title: "Resolve tutor overlap",
    status: "Scheduling blocked",
    proposal:
      "Wei Zhang · Algebra I with Lin Chen · Today 5:30–6:30 PM ET",
    reason:
      "Lin is teaching Emma from 5:00–6:00 PM. This proposal also needs the 15-minute tutor buffer.",
    suggestedAlternative: "Tue, Nov 10 · 6:15–7:15 PM ET",
    familyLocalTime: "Family local time: 6:15 PM ET · Tutor available",
    language: "Chinese / English",
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
              Scheduling & conflicts
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Plan lessons in family time, without double bookings.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>Manage availability</span>
            </button>
            <button
              type="button"
              className="px-3.5 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Schedule lesson</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Lessons this week</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">164</div>
          <div className="text-[11px] text-teal-700 font-medium mt-1">
            Nov 2–8 · All teaching formats
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Lessons today</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">24</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            5 live now · 19 scheduled
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Conflicts to resolve</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">2</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            1 tutor overlap · 1 unavailable slot
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Change requests</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">3</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Noah&apos;s Friday request is pending
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200/80 pb-2">
        {[
          { id: "week", label: "Week", count: 0 },
          { id: "day", label: "Day", count: 0 },
          { id: "agenda", label: "Agenda", count: 0 },
          { id: "requests", label: "Change requests", count: 3 },
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

      {/* Search and Filters Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lesson, tutor or learner"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Select defaultValue="Nov 2–8, 2026">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Nov 2–8, 2026" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nov 2–8, 2026">Nov 2–8, 2026</SelectItem>
              <SelectItem value="Nov 9–15, 2026">Nov 9–15, 2026</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={selectedTutor}
            onValueChange={(val) => val && setSelectedTutor(val)}
          >
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Tutor: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutor: All</SelectItem>
              <SelectItem value="lin">Lin Chen</SelectItem>
              <SelectItem value="priya">Priya Shah</SelectItem>
              <SelectItem value="daniel">Daniel Brooks</SelectItem>
              <SelectItem value="alex">Alex Rivera</SelectItem>
              <SelectItem value="thiri">Thiri Aung</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="ET · UTC-5">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="ET · UTC-5" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ET · UTC-5">ET · UTC-5</SelectItem>
              <SelectItem value="PT · UTC-8">PT · UTC-8</SelectItem>
              <SelectItem value="CT · UTC-6">CT · UTC-6</SelectItem>
            </SelectContent>
          </Select>

          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTutor("all");
            }}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Grid: Weekly Schedule + Resolve Conflict Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Weekly Calendar Schedule Grid (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0B1E2B]">
              November 2–6 · Afternoon lessons
            </h2>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Today</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Schedule Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[500px]">
              {/* Day Headers */}
              <div className="grid grid-cols-6 border-b border-slate-100 pb-2 text-center text-xs">
                <div className="text-slate-400 font-bold text-[10px]">TIME</div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">MON</div>
                  <div className="text-xs font-black text-slate-800">2</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">TUE</div>
                  <div className="text-xs font-black text-slate-800">3</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">WED</div>
                  <div className="text-xs font-black text-slate-800">4</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-teal-700">THU</div>
                  <div className="text-xs font-black text-teal-800">5</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">FRI</div>
                  <div className="text-xs font-black text-slate-800">6</div>
                </div>
              </div>

              {/* Time Slots */}
              <div className="divide-y divide-slate-100 text-xs">
                {/* 4 PM */}
                <div className="grid grid-cols-6 py-2 min-h-[64px]">
                  <div className="text-[10px] font-bold text-slate-400 pt-1">4 PM</div>
                  {/* Mon */}
                  <div className="p-1">
                    <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-[10px] space-y-0.5">
                      <div className="text-slate-500 text-[9px]">4:00–5:00 PM</div>
                      <div className="font-bold text-slate-800 truncate">Math foundations A</div>
                      <div className="text-slate-500 text-[9px] truncate">Group · Priya</div>
                    </div>
                  </div>
                  {/* Tue */}
                  <div className="p-1"></div>
                  {/* Wed */}
                  <div className="p-1">
                    <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-[10px] space-y-0.5">
                      <div className="text-slate-500 text-[9px]">4:00–5:00 PM</div>
                      <div className="font-bold text-slate-800 truncate">Reading & writing</div>
                      <div className="text-slate-500 text-[9px] truncate">Group A · Daniel</div>
                    </div>
                  </div>
                  {/* Thu */}
                  <div className="p-1">
                    <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-[10px] space-y-0.5">
                      <div className="text-slate-500 text-[9px]">4:00–5:00 PM</div>
                      <div className="font-bold text-slate-800 truncate">Math foundations</div>
                      <div className="text-slate-500 text-[9px] truncate">Liam · Priya</div>
                    </div>
                  </div>
                  {/* Fri */}
                  <div className="p-1"></div>
                </div>

                {/* 5 PM */}
                <div className="grid grid-cols-6 py-2 min-h-[64px]">
                  <div className="text-[10px] font-bold text-slate-400 pt-1">5 PM</div>
                  {/* Mon */}
                  <div className="p-1"></div>
                  {/* Tue */}
                  <div className="p-1">
                    <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-[10px] space-y-0.5">
                      <div className="text-slate-500 text-[9px]">5:00–6:00 PM</div>
                      <div className="font-bold text-slate-800 truncate">Algebra I</div>
                      <div className="text-slate-500 text-[9px] truncate">Emma · Lin</div>
                    </div>
                  </div>
                  {/* Wed */}
                  <div className="p-1"></div>
                  {/* Thu (Conflict Day) */}
                  <div className="p-1 relative">
                    <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-[10px] space-y-0.5 relative pr-3">
                      <div className="text-slate-500 text-[9px]">5:00–6:00 PM</div>
                      <div className="font-bold text-slate-800 truncate">Algebra I</div>
                      <div className="text-slate-500 text-[9px] truncate">Emma · Lin</div>
                      <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-rose-500 rounded-r-lg" />
                    </div>
                  </div>
                  {/* Fri */}
                  <div className="p-1"></div>
                </div>

                {/* 6 PM */}
                <div className="grid grid-cols-6 py-2 min-h-[64px]">
                  <div className="text-[10px] font-bold text-slate-400 pt-1">6 PM</div>
                  {/* Mon */}
                  <div className="p-1">
                    <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-[10px] space-y-0.5">
                      <div className="text-slate-500 text-[9px]">6:00–7:00 PM</div>
                      <div className="font-bold text-slate-800 truncate">Algebra I</div>
                      <div className="text-slate-500 text-[9px] truncate">Joy · Priya</div>
                    </div>
                  </div>
                  {/* Tue */}
                  <div className="p-1"></div>
                  {/* Wed */}
                  <div className="p-1">
                    <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-[10px] space-y-0.5">
                      <div className="text-slate-500 text-[9px]">6:00–7:00 PM</div>
                      <div className="font-bold text-slate-800 truncate">Computing</div>
                      <div className="text-slate-500 text-[9px] truncate">Oliver · Alex</div>
                    </div>
                  </div>
                  {/* Thu */}
                  <div className="p-1"></div>
                  {/* Fri */}
                  <div className="p-1">
                    <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-[10px] space-y-0.5">
                      <div className="text-slate-500 text-[9px]">6:00–7:00 PM</div>
                      <div className="font-bold text-slate-800 truncate">Science explorers</div>
                      <div className="text-slate-500 text-[9px] truncate">Noah · Thiri</div>
                    </div>
                  </div>
                </div>

                {/* 7 PM */}
                <div className="grid grid-cols-6 py-1 min-h-[32px]">
                  <div className="text-[10px] font-bold text-slate-400 pt-0.5">7 PM</div>
                  <div className="p-1"></div>
                  <div className="p-1"></div>
                  <div className="p-1"></div>
                  <div className="p-1"></div>
                  <div className="p-1"></div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-100">
            Selected afternoon lessons · Coral marker: overlapping, unserved proposal. See conflict details. Original bookings are unchanged.
          </p>
        </div>

        {/* Right Drawer: Resolve tutor overlap (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Proposed Lesson · Not Confirmed
            </span>
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none text-[10px] font-bold">
              Scheduling blocked
            </Badge>
          </div>

          <div>
            <h3 className="text-xl font-black text-[#0B1E2B] font-display">
              Resolve tutor overlap
            </h3>
          </div>

          {/* Conflicting proposal */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Conflicting proposal
            </div>
            <p className="text-xs text-slate-800 font-bold bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              Wei Zhang · Algebra I with Lin Chen · Today 5:30–6:30 PM ET
            </p>
          </div>

          {/* Reason warning callout */}
          <Alert className="p-3 bg-rose-50/80 border border-rose-200/80 rounded-xl flex items-start gap-2.5 text-xs text-rose-900">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <AlertDescription className="text-xs text-rose-900 leading-snug">
              Lin is teaching Emma from 5:00–6:00 PM. This proposal also needs the 15-minute tutor buffer.
            </AlertDescription>
          </Alert>

          {/* Suggested Alternative */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-700">
              Suggested alternative
            </label>
            <input
              type="text"
              defaultValue={selectedConflict.suggestedAlternative}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium"
            />
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {selectedConflict.familyLocalTime}
            </span>
          </div>

          {/* Notify family in */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-700">
              Notify family in
            </label>
            <Select defaultValue="Chinese / English">
              <SelectTrigger className="w-full bg-slate-50 border-slate-200 text-xs text-slate-800 font-medium h-9">
                <SelectValue placeholder="Notification language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Chinese / English">Chinese / English</SelectItem>
                <SelectItem value="English only">English only</SelectItem>
                <SelectItem value="Chinese only">Chinese only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Availability checked for one lesson. Validate every occurrence before confirming a recurring series.
          </p>

          <button
            type="button"
            className="w-full py-2.5 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Send alternative to family
          </button>
        </div>
      </div>

      {/* Bottom Section: Requests & scheduling exceptions */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#0B1E2B]">
            Requests & scheduling exceptions
          </h2>
          <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
            <span>All requests</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full text-left text-xs">
            <TableHeader className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <TableRow>
                <TableHead className="py-3 px-4 font-bold text-slate-500">Lesson / Request</TableHead>
                <TableHead className="py-3 px-3 font-bold text-slate-500">Current Time</TableHead>
                <TableHead className="py-3 px-3 font-bold text-slate-500">Family Local Time</TableHead>
                <TableHead className="py-3 px-3 font-bold text-slate-500">Status</TableHead>
                <TableHead className="py-3 px-4 text-right font-bold text-slate-500">Next Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-100">
              <TableRow className="hover:bg-slate-50/80">
                <TableCell className="py-3 px-4">
                  <div className="font-bold text-[#0B1E2B]">
                    Noah Thant · Science explorers
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Guardian May requested a later Friday lesson
                  </div>
                </TableCell>
                <TableCell className="py-3 px-3 text-slate-700 font-medium">
                  Nov 6 · 6:00 PM ET
                </TableCell>
                <TableCell className="py-3 px-3 text-slate-600">
                  Nov 6 · 6:00 PM ET
                </TableCell>
                <TableCell className="py-3 px-3">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none text-[10px] font-bold">
                    Awaiting tutor
                  </Badge>
                </TableCell>
                <TableCell className="py-3 px-4 text-right">
                  <span className="font-semibold text-teal-800 hover:underline cursor-pointer">
                    Ask Thiri about 7 PM
                  </span>
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-slate-50/80">
                <TableCell className="py-3 px-4">
                  <div className="font-bold text-[#0B1E2B]">
                    Oliver Kim · Creative computing
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Proposed Nov 7 · Tutor outside availability
                  </div>
                </TableCell>
                <TableCell className="py-3 px-3 text-slate-700 font-medium">
                  Nov 7 · 2:00 PM ET
                </TableCell>
                <TableCell className="py-3 px-3 text-slate-600">
                  Nov 7 · 11:00 AM PT
                </TableCell>
                <TableCell className="py-3 px-3">
                  <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-100 border-none text-[10px] font-bold">
                    Conflict
                  </Badge>
                </TableCell>
                <TableCell className="py-3 px-4 text-right">
                  <span className="font-semibold text-teal-800 hover:underline cursor-pointer">
                    Choose available slot
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="p-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>All displayed times include the date&apos;s daylight-saving offset · America/New_York</span>
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
    </div>
  );
}

