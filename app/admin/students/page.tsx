"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Plus,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
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

export default function AdminStudentsPage() {
  const [selectedTab, setSelectedTab] = useState("students");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [selectedStudent, setSelectedStudent] = useState<any>({
    id: "ST-1008",
    name: "Emma Thant",
    grade: "Grade 8",
    status: "Active learner",
    plan: "Grade 8 · Algebra I · Lin Chen · One-to-one",
    guardian: "May Thant · Parent & billing contact · Verified",
    sibling: "Noah Thant · Grade 5 · Science explorers",
    prefs: "English · Burmese support on request · America/New_York (UTC-5 today)",
    nextLesson: "Today · 5:00–6:00 PM ET · Linear equations",
    billing: "2 of 8 lessons completed · $240 monthly · Paid Nov 1",
  });

  const students = [
    {
      id: "ST-1008",
      name: "Emma Thant",
      grade: "Grade 8",
      guardian: "May Thant",
      guardianSub: "2 linked children",
      plan: "Algebra I",
      planSub: "Lin Chen · One-to-one",
      status: "Active",
      action: "View profile",
      sibling: "Noah Thant · Grade 5 · Science explorers",
      prefs: "English · Burmese support on request · America/New_York (UTC-5 today)",
      nextLesson: "Today · 5:00–6:00 PM ET · Linear equations",
      billing: "2 of 8 lessons completed · $240 monthly · Paid Nov 1",
    },
    {
      id: "ST-1009",
      name: "Noah Thant",
      grade: "Grade 5",
      guardian: "May Thant",
      guardianSub: "2 linked children",
      plan: "Science explorers",
      planSub: "Thiri Aung · One-to-one",
      status: "Active",
      action: "View profile",
      sibling: "Emma Thant · Grade 8 · Algebra I",
      prefs: "English · Burmese support on request · Eastern Time",
      nextLesson: "Friday · 6:00–7:00 PM ET · Solar System",
      billing: "1 of 4 lessons completed · $120 monthly · Paid Nov 1",
    },
    {
      id: "ST-1012",
      name: "Liam Patel",
      grade: "Grade 6",
      guardian: "Anita Patel",
      guardianSub: "English · ET",
      plan: "Math foundations",
      planSub: "Priya Shah · One-to-one",
      status: "Active",
      action: "View profile",
      sibling: "None",
      prefs: "English · Eastern Time",
      nextLesson: "Monday · 4:00–5:00 PM ET · Decimals",
      billing: "2 of 8 lessons completed · $240 monthly",
    },
    {
      id: "ST-1021",
      name: "Mia Lopez",
      grade: "Grade 7",
      guardian: "Elena Lopez",
      guardianSub: "Spanish · ET",
      plan: "Reading & writing",
      planSub: "Daniel Brooks · Group",
      status: "Active",
      action: "View profile",
      sibling: "None",
      prefs: "Spanish / English · America/New_York",
      nextLesson: "Today · 5:30–6:30 PM ET",
      billing: "Enrolled in Small Group · $140 monthly",
    },
    {
      id: "ST-1025",
      name: "Oliver Kim",
      grade: "Grade 7",
      guardian: "Jin Kim",
      guardianSub: "English · PT",
      plan: "Creative computing",
      planSub: "Alex Rivera · One-to-one",
      status: "Active",
      action: "View profile",
      sibling: "None",
      prefs: "English · Pacific Time",
      nextLesson: "Saturday · 11:00 AM ET",
      billing: "4 of 8 lessons completed · $240 monthly",
    },
    {
      id: "ST-1128",
      name: "Ethan Wilson",
      grade: "Grade 9",
      guardian: "Rachel Wilson",
      guardianSub: "English · ET",
      plan: "Algebra I",
      planSub: "Tutor to be matched",
      status: "New",
      action: "Match tutor",
      sibling: "None",
      prefs: "English · Eastern Time · After 5:00 PM",
      nextLesson: "Pending tutor matching",
      billing: "Consultation complete · Awaiting package selection",
    },
    {
      id: "ST-1127",
      name: "Ava Johnson",
      grade: "Grade 3",
      guardian: "Dana Johnson",
      guardianSub: "Timezone missing",
      plan: "Reading foundations",
      planSub: "Consent pending",
      status: "Incomplete",
      action: "Complete",
      sibling: "None",
      prefs: "Timezone not confirmed yet",
      nextLesson: "Pending guardian onboarding consent",
      billing: "Onboarding stage",
    },
  ];

  const filteredStudents = students.filter((item) => {
    if (selectedTab === "needs-attention" && item.status !== "Incomplete") return false;
    if (selectedStatus !== "all" && item.status.toLowerCase() !== selectedStatus.toLowerCase())
      return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.guardian.toLowerCase().includes(q) ||
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
              Students & families
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Learning plans, guardians and family support in one place.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export directory</span>
            </button>
            <button
              type="button"
              className="px-3.5 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add student</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Active students</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">128</div>
          <div className="text-[11px] text-teal-700 font-medium mt-1">
            6 new students in November
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Family accounts</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">104</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            18 families with linked siblings
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Profiles to complete</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">4</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            Guardian consent or timezone missing
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Language support</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">23</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Families requesting multilingual support
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200/80 pb-2">
        {[
          { id: "students", label: "Students", count: 128 },
          { id: "families", label: "Families", count: 104 },
          { id: "needs-attention", label: "Needs attention", count: 4 },
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
            placeholder="Search name, guardian or student ID"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Select
            value={selectedStatus}
            onValueChange={(val) => val && setSelectedStatus(val)}
          >
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Status: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Status: All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="incomplete">Incomplete</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Grade: All">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Grade: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Grade: All">Grade: All</SelectItem>
              <SelectItem value="Grades K-5">Grades K-5</SelectItem>
              <SelectItem value="Grades 6-8">Grades 6-8</SelectItem>
              <SelectItem value="Grades 9-12">Grades 9-12</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Language: All">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Language: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Language: All">Language: All</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Burmese">Burmese</SelectItem>
              <SelectItem value="Chinese">Chinese</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
            </SelectContent>
          </Select>

          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedStatus("all");
            }}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Grid: Directory Table + Selected Student Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0B1E2B]">Student directory</h2>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Manage columns</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <Table className="w-full text-left text-xs">
              <TableHeader className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <TableRow>
                  <TableHead className="py-3 px-4 font-bold text-slate-500">Student / Grade</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">Guardian</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">Learning Plan</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">Status</TableHead>
                  <TableHead className="py-3 px-4 text-right font-bold text-slate-500">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100">
                {filteredStudents.map((item) => {
                  const isSelected = selectedStudent?.id === item.id;
                  return (
                    <TableRow
                      key={item.id}
                      onClick={() =>
                        setSelectedStudent({
                          id: item.id,
                          name: item.name,
                          grade: item.grade,
                          status:
                            item.status === "Active"
                              ? "Active learner"
                              : item.status === "New"
                              ? "New student"
                              : "Needs onboarding",
                          plan: `${item.grade} · ${item.plan} · ${item.planSub}`,
                          guardian: `${item.guardian} · Parent & billing contact · Verified`,
                          sibling: item.sibling,
                          prefs: item.prefs,
                          nextLesson: item.nextLesson,
                          billing: item.billing,
                        })
                      }
                      className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                        isSelected ? "bg-teal-50/50" : ""
                      }`}
                    >
                      <TableCell className="py-3 px-4">
                        <div className="font-bold text-[#0B1E2B]">{item.name}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {item.id} · {item.grade}
                        </div>
                      </TableCell>
                      <TableCell className="py-3 px-3">
                        <div className="font-medium text-slate-700">{item.guardian}</div>
                        <div className="text-[10px] text-slate-400">{item.guardianSub}</div>
                      </TableCell>
                      <TableCell className="py-3 px-3">
                        <div className="font-medium text-slate-700">{item.plan}</div>
                        <div className="text-[10px] text-slate-400">{item.planSub}</div>
                      </TableCell>
                      <TableCell className="py-3 px-3">
                        <Badge
                          variant="secondary"
                          className={`text-[10px] font-bold ${
                            item.status === "Active"
                              ? "bg-teal-100 text-teal-800 hover:bg-teal-100 border-none"
                              : item.status === "New"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100 border-none"
                              : "bg-rose-100 text-rose-800 hover:bg-rose-100 border-none"
                          }`}
                        >
                          {item.status}
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
            <span>Showing {filteredStudents.length} of 128 active students</span>
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

        {/* Selected Student Profile (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Student Profile · {selectedStudent?.id || "ST-1008"}
            </span>
            <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100 border-none text-[10px] font-bold">
              {selectedStudent?.status || "Active learner"}
            </Badge>
          </div>

          <div>
            <h3 className="text-xl font-black text-[#0B1E2B] font-display">
              {selectedStudent?.name || "Emma Thant"}
            </h3>
          </div>

          {/* Details list */}
          <div className="space-y-3 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Learning plan
              </div>
              <div className="text-slate-800 font-medium">
                {selectedStudent?.plan || "Grade 8 · Algebra I · Lin Chen · One-to-one"}
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Linked guardian
              </div>
              <div className="text-slate-800 font-medium">
                {selectedStudent?.guardian ||
                  "May Thant · Parent & billing contact · Verified"}
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Sibling account
              </div>
              <div className="text-slate-800 font-medium">
                {selectedStudent?.sibling ||
                  "Noah Thant · Grade 5 · Science explorers"}
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Family preferences
              </div>
              <div className="text-slate-800 font-medium">
                {selectedStudent?.prefs ||
                  "English · Burmese support on request · America/New_York (UTC-5 today)"}
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Next lesson
              </div>
              <div className="text-slate-800 font-medium">
                {selectedStudent?.nextLesson ||
                  "Today · 5:00–6:00 PM ET · Linear equations"}
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                November learning plan
              </div>
              <div className="text-slate-800 font-medium">
                {selectedStudent?.billing ||
                  "2 of 8 lessons completed · $240 monthly · Paid Nov 1"}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              className="w-full py-2.5 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Open family record
            </button>
            <button
              type="button"
              className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Message May
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Onboarding attention & Guardian privacy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Onboarding needs attention */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E2B]">Onboarding needs attention</h3>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Review all 4</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0B1E2B]">
                  Ava Johnson · Guardian consent pending
                </span>
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none text-[10px] font-bold">
                  Required
                </Badge>
              </div>
              <div className="text-[11px] text-slate-500">
                Invite sent Nov 3 · Do not schedule lessons before consent is recorded.
              </div>
              <button className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer">
                <span>Resend guardian invitation</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <Alert className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <AlertDescription className="text-xs text-amber-900 leading-snug">
                Timezone is required before a first lesson can be confirmed.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Guardian access & privacy */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E2B]">Guardian access & privacy</h3>
            <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100 border-none text-[10px] font-bold">
              Verified
            </Badge>
          </div>

          <div className="space-y-3 pt-1">
            <div className="font-bold text-xs text-[#0B1E2B]">
              Thant family · Access verified
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              May can see Emma and Noah&apos;s lessons, progress and billing. Student accounts cannot view payment details.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
              <div className="font-bold text-slate-700">Only invite an authorized guardian</div>
              <p className="text-[11px] text-slate-500">
                Linking another guardian requires family confirmation and is recorded in activity history.
              </p>
            </div>
            <button className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Manage guardian links</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

