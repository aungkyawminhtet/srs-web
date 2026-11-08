"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  User,
  MessageSquare,
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

export default function AdminConsultationsPage() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOwner, setSelectedOwner] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<any>({
    id: "INQ-1042",
    name: "Aye Aye Win",
    grade: "Grade 7",
    subject: "Math support",
    language: "Burmese",
    stage: "New",
    owner: "Jamie Lee",
    followUp: "Nov 5, 2026 · 4:30 PM ET",
    learningNeeds: "Grade 7 math · Build confidence with fractions before pre-algebra.",
    familyPrefs: "Burmese preferred · America/New_York · Weekdays after 4:00 PM ET",
    internalNote: "request Burmese language support before confirming the call.",
  });

  const inquiries = [
    {
      id: "INQ-1042",
      name: "Aye Aye Win",
      sub: "Grade 7 · Math support · Burmese",
      stage: "New",
      owner: "Unassigned",
      action: "Assign & reply",
      due: "Due today · 2:00 PM",
      learningNeeds: "Grade 7 math · Build confidence with fractions before pre-algebra.",
      familyPrefs: "Burmese preferred · America/New_York · Weekdays after 4:00 PM ET",
      internalNote: "request Burmese language support before confirming the call.",
    },
    {
      id: "INQ-1041",
      name: "Sarah Martinez",
      sub: "Grade 10 · SAT planning · English",
      stage: "Booked",
      owner: "Jamie Lee",
      action: "Confirm time",
      due: "Nov 6 · 11:00 AM ET",
      learningNeeds: "Grade 10 SAT Math & Reading planning for Spring session.",
      familyPrefs: "English · Eastern Time · Weekends preferred",
      internalNote: "Family requested tutor with past college counseling background.",
    },
    {
      id: "INQ-1040",
      name: "Wei Zhang",
      sub: "Grade 8 · Algebra I · Chinese",
      stage: "Follow-up",
      owner: "Jamie Lee",
      action: "Send availability",
      due: "Due today · 4:00 PM",
      learningNeeds: "Needs support with quadratic equations and homework pacing.",
      familyPrefs: "Chinese preferred for parent updates · Weekday evenings",
      internalNote: "Lin Chen would be an optimal match.",
    },
    {
      id: "INQ-1039",
      name: "Grace Okafor",
      sub: "Grade 4 · Reading · English",
      stage: "New",
      owner: "Unassigned",
      action: "Assign & reply",
      due: "Received today · 10:20 AM",
      learningNeeds: "Reading comprehension and vocabulary enrichment.",
      familyPrefs: "English · Eastern Time · Monday/Wednesday 4:30 PM",
      internalNote: "First inquiry from elementary reading campaign.",
    },
    {
      id: "INQ-1038",
      name: "Luis Romero",
      sub: "Grade 6 · Math · Spanish",
      stage: "New",
      owner: "Sofia Diaz",
      action: "Reply in Spanish",
      due: "Due today · 5:00 PM",
      learningNeeds: "Grade 6 fractions and pre-algebra foundations.",
      familyPrefs: "Spanish preferred · Central Time · Tuesdays",
      internalNote: "Sofia Diaz assigned for Spanish consultation.",
    },
    {
      id: "INQ-1037",
      name: "Hana Park",
      sub: "Grade 9 · Writing · English",
      stage: "Booked",
      owner: "Jamie Lee",
      action: "Open consultation",
      due: "Nov 7 · 10:00 AM ET",
      learningNeeds: "High school essay writing and structured thesis development.",
      familyPrefs: "English · Pacific Time",
      internalNote: "Daniel Brooks recommended for writing group or 1-on-1.",
    },
  ];

  const filteredInquiries = inquiries.filter((item) => {
    if (selectedTab === "new" && item.stage !== "New") return false;
    if (selectedTab === "booked" && item.stage !== "Booked") return false;
    if (selectedTab === "followup" && item.stage !== "Follow-up") return false;
    if (selectedTab === "converted" && item.stage !== "Converted") return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.sub.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Header */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          Administration / Thursday, November 5, 2026
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] font-display">
              Inquiries & consultations
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Turn a first conversation into the right learning plan.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>View calendar</span>
            </button>
            <button
              type="button"
              className="px-3.5 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add inquiry</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Open consultations</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">7</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            3 awaiting a first response
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Follow-ups due today</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">3</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Oldest inquiry: 22 hours
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Booked this week</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">5</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            2 consultations still to happen
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Inquiry → enrollment</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">62%</div>
          <div className="text-[11px] text-teal-700 font-medium mt-1">
            8 of 13 · October sample cohort
          </div>
        </div>
      </div>

      {/* Yellow Warning Banner */}
      <Alert className="bg-amber-50/90 border-amber-200/80 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <AlertDescription className="text-xs text-amber-900">
            <strong className="font-bold">3 families are waiting for a first reply.</strong> Language preferences are included before you reach out.
          </AlertDescription>
        </div>
        <button
          type="button"
          onClick={() => setSelectedTab("new")}
          className="text-amber-900 font-bold hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
        >
          <span>Assign follow-ups</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </Alert>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200/80 pb-2">
        {[
          { id: "all", label: "All inquiries", count: 7 },
          { id: "new", label: "New", count: 3 },
          { id: "booked", label: "Booked", count: 2 },
          { id: "followup", label: "Follow-up", count: 2 },
          { id: "converted", label: "Converted", count: 0 },
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

      {/* Search and Dropdowns Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search family, student or inquiry ID"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Select
            value={selectedOwner}
            onValueChange={(val) => val && setSelectedOwner(val)}
          >
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Owner: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Owner: All</SelectItem>
              <SelectItem value="jamie">Jamie Lee</SelectItem>
              <SelectItem value="sofia">Sofia Diaz</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Program: All">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Program: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Program: All">Program: All</SelectItem>
              <SelectItem value="Math">Math</SelectItem>
              <SelectItem value="Reading & writing">Reading &amp; writing</SelectItem>
              <SelectItem value="SAT planning">SAT planning</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="This week">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="This week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="This week">This week</SelectItem>
              <SelectItem value="Today">Today</SelectItem>
              <SelectItem value="This month">This month</SelectItem>
            </SelectContent>
          </Select>

          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedOwner("all");
            }}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Grid: Pipeline Table + Selected Inquiry Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Family pipeline table (7 cols on lg) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0B1E2B]">Family pipeline</h2>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Manage stages</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <Table className="w-full text-left text-xs">
              <TableHeader className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <TableRow>
                  <TableHead className="py-3 px-4 font-bold text-slate-500">Family / Interest</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">Stage</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">Owner</TableHead>
                  <TableHead className="py-3 px-4 text-right font-bold text-slate-500">Next Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100">
                {filteredInquiries.map((item) => {
                  const isSelected = selectedInquiry?.id === item.id;
                  return (
                    <TableRow
                      key={item.id}
                      onClick={() => setSelectedInquiry(item)}
                      className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                        isSelected ? "bg-teal-50/50" : ""
                      }`}
                    >
                      <TableCell className="py-3 px-4">
                        <div className="font-bold text-[#0B1E2B]">{item.name}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{item.sub}</div>
                      </TableCell>
                      <TableCell className="py-3 px-3">
                        <Badge
                          variant="secondary"
                          className={`text-[10px] font-bold ${
                            item.stage === "New"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100 border-none"
                              : item.stage === "Booked"
                              ? "bg-teal-100 text-teal-800 hover:bg-teal-100 border-none"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-100 border-none"
                          }`}
                        >
                          {item.stage}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3 px-3 text-slate-600 font-medium">
                        {item.owner}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-right">
                        <div className="font-semibold text-teal-800 hover:underline">
                          {item.action}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{item.due}</div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="p-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Showing {filteredInquiries.length} of 7 open inquiries</span>
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

        {/* Selected Inquiry Card (5 cols on lg) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Selected Inquiry · {selectedInquiry?.id || "INQ-1042"}
            </span>
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none text-[10px] font-bold">
              First response needed
            </Badge>
          </div>

          <div>
            <h3 className="text-xl font-black text-[#0B1E2B] font-display">
              {selectedInquiry?.name || "Aye Aye Win"}
            </h3>
          </div>

          {/* Learning needs */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Learning needs
            </div>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              {selectedInquiry?.learningNeeds ||
                "Grade 7 math · Build confidence with fractions before pre-algebra."}
            </p>
          </div>

          {/* Family preferences */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Family preferences
            </div>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              {selectedInquiry?.familyPrefs ||
                "Burmese preferred · America/New_York · Weekdays after 4:00 PM ET"}
            </p>
          </div>

          {/* Form fields */}
          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Consultation owner
              </label>
              <Select defaultValue="Jamie Lee">
                <SelectTrigger className="w-full bg-slate-50 border-slate-200 text-xs text-slate-800 font-medium h-9">
                  <SelectValue placeholder="Select owner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jamie Lee">Jamie Lee</SelectItem>
                  <SelectItem value="Sofia Diaz">Sofia Diaz</SelectItem>
                  <SelectItem value="Daniel Brooks">Daniel Brooks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Next follow-up
              </label>
              <input
                type="text"
                defaultValue={selectedInquiry?.followUp || "Nov 5, 2026 · 4:30 PM ET"}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Family local time: 4:30 PM · 20 min consultation
              </span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-600">
              <span className="font-bold text-slate-700">Internal note: </span>
              {selectedInquiry?.internalNote ||
                "request Burmese language support before confirming the call."}
            </div>

            <button
              type="button"
              className="w-full py-2.5 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer mt-2"
            >
              Assign & send invitation
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Today's follow-up plan & Consultation outcome */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Today's follow-up plan */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E2B]">Today&apos;s follow-up plan</h3>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Open task queue</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="font-bold text-xs text-[#0B1E2B]">
                Wei Zhang · Share Algebra I availability
              </div>
              <div className="text-[11px] text-slate-500">
                Jamie Lee · Due 4:00 PM ET · Chinese preferred
              </div>
              <button className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer">
                <span>Send three available times</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="font-bold text-xs text-[#0B1E2B]">
                Sarah Martinez · Consultation confirmation
              </div>
              <div className="text-[11px] text-slate-500">
                Friday, Nov 6 · 11:00 AM ET · Jamie Lee
              </div>
              <button className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer">
                <span>Confirm with family</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Consultation outcome */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E2B]">Consultation outcome</h3>
            <Link
              href="/admin/students"
              className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1"
            >
              <span>View enrollment</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3 pt-1">
            <Alert className="p-3 bg-teal-50/80 border border-teal-200/80 rounded-xl flex items-start gap-2.5 text-xs text-teal-900">
              <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <AlertDescription className="text-xs text-teal-900 leading-snug">
                <strong>Ethan Wilson&apos;s consultation is complete.</strong> Learning goals saved and family follow-up sent.
              </AlertDescription>
            </Alert>

            <p className="text-xs text-slate-600 leading-relaxed">
              Next step: match an Algebra I tutor and offer a first lesson. No enrollment is created until the family accepts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

