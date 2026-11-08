"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Plus,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  Users,
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

export default function AdminLessonsPage() {
  const [selectedTab, setSelectedTab] = useState("classes");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState({
    id: "CL-203",
    name: "Reading & writing A",
    nextMeeting: "Today · 5:30–6:30 PM ET · Daniel Brooks",
    capacity: "3 of 5 seats filled",
    capacityPercent: 60,
    learners: [
      {
        name: "Mia Lopez",
        grade: "Grade 7",
        guardian: "Elena Lopez · Spanish / English",
        status: "Confirmed",
      },
      {
        name: "Ben Carter",
        grade: "Grade 8",
        guardian: "Olivia Carter · English",
        status: "Confirmed",
      },
      {
        name: "Zoe Nguyen",
        grade: "Grade 7",
        guardian: "Minh Nguyen · English",
        status: "Confirmed",
      },
    ],
    note: "No waitlisted learners for this class. Two seats are available.",
  });

  const classes = [
    {
      id: "CL-203",
      name: "Reading & writing A",
      schedule: "CL-203 · Thu 5:30 PM ET · Grades 7-8",
      tutor: "Daniel Brooks",
      capacity: "3/5",
      capacitySub: "2 seats open",
      capacityPercent: 60,
      state: "Confirmed",
      action: "Open roster",
      nextMeeting: "Today · 5:30–6:30 PM ET · Daniel Brooks",
      note: "No waitlisted learners for this class. Two seats are available.",
      learners: [
        {
          name: "Mia Lopez",
          grade: "Grade 7",
          guardian: "Elena Lopez · Spanish / English",
          status: "Confirmed",
        },
        {
          name: "Ben Carter",
          grade: "Grade 8",
          guardian: "Olivia Carter · English",
          status: "Confirmed",
        },
        {
          name: "Zoe Nguyen",
          grade: "Grade 7",
          guardian: "Minh Nguyen · English",
          status: "Confirmed",
        },
      ],
    },
    {
      id: "CL-108",
      name: "Algebra I · Emma",
      schedule: "CL-108 · Tue / Thu 5:00 PM ET",
      tutor: "Lin Chen",
      capacity: "1/1",
      capacitySub: "One-to-one",
      capacityPercent: 100,
      state: "Active",
      action: "View class",
      nextMeeting: "Today · 5:00–6:00 PM ET · Lin Chen",
      note: "One-to-one recurring schedule. Lesson note due after session.",
      learners: [
        {
          name: "Emma Thant",
          grade: "Grade 8",
          guardian: "May Thant · Burmese / English",
          status: "Confirmed",
        },
      ],
    },
    {
      id: "CL-109",
      name: "Science explorers · Noah",
      schedule: "CL-109 · Fri 6:00 PM ET",
      tutor: "Thiri Aung",
      capacity: "1/1",
      capacitySub: "One-to-one",
      capacityPercent: 100,
      state: "Active",
      action: "View class",
      nextMeeting: "Friday · 6:00–7:00 PM ET · Thiri Aung",
      note: "One-to-one monthly program. Hands-on experiments.",
      learners: [
        {
          name: "Noah Thant",
          grade: "Grade 5",
          guardian: "May Thant · Burmese / English",
          status: "Confirmed",
        },
      ],
    },
    {
      id: "CL-211",
      name: "Math foundations A",
      schedule: "CL-211 · Mon 4:00 PM ET · Grades 5-6",
      tutor: "Priya Shah",
      capacity: "5/5",
      capacitySub: "3 waitlisted",
      capacityPercent: 100,
      state: "Full",
      action: "Waitlist",
      nextMeeting: "Monday · 4:00–5:00 PM ET · Priya Shah",
      note: "Class is at maximum capacity (5). 3 students are on the waitlist.",
      learners: [
        {
          name: "Liam Patel",
          grade: "Grade 6",
          guardian: "Anita Patel · English",
          status: "Confirmed",
        },
        {
          name: "Chloe King",
          grade: "Grade 5",
          guardian: "Robert King · English",
          status: "Confirmed",
        },
        {
          name: "Lucas Diaz",
          grade: "Grade 6",
          guardian: "Carmen Diaz · Spanish",
          status: "Confirmed",
        },
      ],
    },
    {
      id: "CL-215",
      name: "Creative computing B",
      schedule: "CL-215 · Sat 11:00 AM ET · Grades 6-7",
      tutor: "Alex Rivera",
      capacity: "4/5",
      capacitySub: "1 offer pending",
      capacityPercent: 80,
      state: "Enrolling",
      action: "Review offer",
      nextMeeting: "Saturday · 11:00 AM–12:00 PM ET · Alex Rivera",
      note: "1 seat offer sent to Lucas Reed. Expires Nov 6.",
      learners: [
        {
          name: "Oliver Kim",
          grade: "Grade 7",
          guardian: "Jin Kim · English",
          status: "Confirmed",
        },
        {
          name: "Maya Lin",
          grade: "Grade 6",
          guardian: "Hui Lin · Chinese",
          status: "Confirmed",
        },
      ],
    },
    {
      id: "CL-220",
      name: "Reading foundations B",
      schedule: "CL-220 · Starts Nov 9 · Grades 2-3",
      tutor: "Sofia Diaz",
      capacity: "2/5",
      capacitySub: "Minimum 3",
      capacityPercent: 40,
      state: "Below min.",
      action: "Review start",
      nextMeeting: "Monday, Nov 9 · 3:30–4:30 PM ET · Sofia Diaz",
      note: "Requires at least 1 more enrolled learner before launch.",
      learners: [
        {
          name: "Leo Evans",
          grade: "Grade 3",
          guardian: "Sarah Evans · English",
          status: "Confirmed",
        },
        {
          name: "Samira Khan",
          grade: "Grade 2",
          guardian: "Tariq Khan · English",
          status: "Confirmed",
        },
      ],
    },
  ];

  const filteredClasses = classes.filter((item) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.tutor.toLowerCase().includes(q)
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
              Classes & enrollments
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage class rosters, available seats and fair waitlist offers.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Add enrollment</span>
            </button>
            <button
              type="button"
              className="px-3.5 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create class</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Active classes</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">115</div>
          <div className="text-[11px] text-teal-700 font-medium mt-1">
            103 one-to-one · 12 small groups
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">
            Group seat utilization
          </div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">86%</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            43 enrolled / 50 available seats
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">
            Waitlisted learners
          </div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">6</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            Across 3 small-group classes
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Starting soon</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">4</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            1 class below minimum enrollment
          </div>
        </div>
      </div>

      {/* Yellow Warning Banner */}
      <Alert className="bg-amber-50/90 border-amber-200/80 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <AlertDescription className="text-xs text-amber-900 leading-snug">
            <strong className="font-bold">
              Reading foundations B has 2 of 3 required learners.
            </strong>{" "}
            Confirm a third learner or move the start date before launch.
          </AlertDescription>
        </div>
        <button
          type="button"
          onClick={() => {
            const b = classes.find((c) => c.id === "CL-220");
            if (b) {
              setSelectedClass({
                id: b.id,
                name: b.name,
                nextMeeting: b.nextMeeting,
                capacity: `${b.capacity} seats filled`,
                capacityPercent: b.capacityPercent,
                learners: b.learners,
                note: b.note,
              });
            }
          }}
          className="text-amber-900 font-bold hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
        >
          <span>Review class</span>
          <span className="text-xs">→</span>
        </button>
      </Alert>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200/80 pb-2">
        {[
          { id: "classes", label: "Classes", count: 115 },
          { id: "enrollments", label: "Enrollments", count: 146 },
          { id: "waitlists", label: "Waitlists", count: 6 },
          { id: "archived", label: "Archived", count: 0 },
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
            placeholder="Search class, program, learner or tutor"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Select defaultValue="Program: All">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Program: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Program: All">Program: All</SelectItem>
              <SelectItem value="Reading & writing">Reading &amp; writing</SelectItem>
              <SelectItem value="Algebra I">Algebra I</SelectItem>
              <SelectItem value="Math foundations">Math foundations</SelectItem>
              <SelectItem value="Creative computing">Creative computing</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Format: All">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Format: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Format: All">Format: All</SelectItem>
              <SelectItem value="One-to-one">One-to-one</SelectItem>
              <SelectItem value="Group · 3–5">Group · 3–5</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Status: Active">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Status: Active" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Status: Active">Status: Active</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Enrolling">Enrolling</SelectItem>
              <SelectItem value="Full">Full</SelectItem>
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

      {/* Main Grid: Class Directory Table + Class Roster Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0B1E2B]">Class directory</h2>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Calendar view</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <Table className="w-full text-left text-xs">
              <TableHeader className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <TableRow>
                  <TableHead className="py-3 px-4 font-bold text-slate-500">Class / Schedule</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">Tutor</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">Capacity</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">State</TableHead>
                  <TableHead className="py-3 px-4 text-right font-bold text-slate-500">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100">
                {filteredClasses.map((item) => {
                  const isSelected = selectedClass.id === item.id;
                  return (
                    <TableRow
                      key={item.id}
                      onClick={() =>
                        setSelectedClass({
                          id: item.id,
                          name: item.name,
                          nextMeeting: item.nextMeeting,
                          capacity: `${item.capacity} seats filled`,
                          capacityPercent: item.capacityPercent,
                          learners: item.learners,
                          note: item.note,
                        })
                      }
                      className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                        isSelected ? "bg-teal-50/50" : ""
                      }`}
                    >
                      <TableCell className="py-3 px-4">
                        <div className="font-bold text-[#0B1E2B]">{item.name}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{item.schedule}</div>
                      </TableCell>
                      <TableCell className="py-3 px-3 text-slate-700 font-medium">
                        {item.tutor}
                      </TableCell>
                      <TableCell className="py-3 px-3">
                        <div className="font-semibold text-slate-800">{item.capacity}</div>
                        <div className="text-[10px] text-slate-400">{item.capacitySub}</div>
                      </TableCell>
                      <TableCell className="py-3 px-3">
                        <Badge
                          variant="secondary"
                          className={`text-[10px] font-bold ${
                            item.state === "Confirmed" || item.state === "Active"
                              ? "bg-teal-100 text-teal-800 hover:bg-teal-100 border-none"
                              : item.state === "Enrolling"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100 border-none"
                              : item.state === "Below min."
                              ? "bg-rose-100 text-rose-800 hover:bg-rose-100 border-none"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-100 border-none"
                          }`}
                        >
                          {item.state}
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
            <span>Showing {filteredClasses.length} of 115 active classes</span>
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

        {/* Selected Class Roster Drawer (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Class Roster · {selectedClass.id}
          </div>

          <div>
            <h3 className="text-xl font-black text-[#0B1E2B] font-display">
              {selectedClass.name}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Next meeting: {selectedClass.nextMeeting}
            </p>
          </div>

          {/* Small-group capacity bar */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Small-group capacity
              </span>
              <span className="font-bold text-slate-800">
                {selectedClass.capacity}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0A5C4C] rounded-full"
                style={{ width: `${selectedClass.capacityPercent}%` }}
              />
            </div>
          </div>

          {/* Learners list */}
          <div className="space-y-2">
            {selectedClass.learners.map((learner, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs text-[#0B1E2B]">
                    {learner.name} · {learner.grade}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Guardian: {learner.guardian}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800">
                  {learner.status}
                </span>
              </div>
            ))}
          </div>

          {/* Note callout */}
          <div className="p-3 bg-teal-50/80 border border-teal-200/80 rounded-xl flex items-start gap-2.5 text-xs text-teal-900">
            <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>{selectedClass.note}</div>
          </div>

          <button
            type="button"
            className="w-full py-2.5 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Add enrollment
          </button>
        </div>
      </div>

      {/* Bottom Grid: Waitlist & Seat offer awaiting reply */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Waitlist · Math foundations A */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E2B]">
              Waitlist · Math foundations A
            </h3>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>View all 3</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="font-bold text-xs text-[#0B1E2B]">
                1. Arjun Mehta · Joined Nov 2
              </div>
              <div className="text-[11px] text-slate-500">
                Grade 6 · Mon 4:00 PM ET works for family · No seat charged
              </div>
              <button className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer">
                <span>Offer alternative class</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="font-bold text-xs text-[#0B1E2B]">
                2. Sophie Tran · Joined Nov 3
              </div>
              <div className="text-[11px] text-slate-500">
                Grade 5 · Family requested next available seat
              </div>
              <button className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer">
                <span>Contact guardian</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Seat offer awaiting a reply */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E2B]">
              Seat offer awaiting a reply
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
              Reserved
            </span>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="font-bold text-xs text-[#0B1E2B]">
                Creative computing B · Lucas Reed
              </div>
              <div className="text-[11px] text-slate-500">
                Offer sent Nov 4, 3:00 PM ET · Expires Nov 6, 3:00 PM ET
              </div>
              <button className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer">
                <span>Send one reminder</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                An offer reserves a seat, not an enrollment. Confirm family acceptance before billing or adding to the roster.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

