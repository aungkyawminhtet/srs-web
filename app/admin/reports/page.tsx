"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
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

export default function AdminReportsPage() {
  const [selectedTab, setSelectedTab] = useState("operations");
  const [searchQuery, setSearchQuery] = useState("");

  const revenueBars = [
    { month: "Jun", amount: "$12.8k", height: 50 },
    { month: "Jul", amount: "$13.6k", height: 55 },
    { month: "Aug", amount: "$14.2k", height: 60 },
    { month: "Sep", amount: "$16.1k", height: 72 },
    { month: "Oct", amount: "$17.4k", height: 80 },
    { month: "Nov*", amount: "$18.4k", height: 92, current: true },
  ];

  const programAttendance = [
    { program: "Algebra I", percent: "98%", score: "98 / 100", width: 98 },
    { program: "Math foundations", percent: "96%", score: "96 / 100", width: 96 },
    { program: "Reading & writing", percent: "95%", score: "76 / 80", width: 95 },
    { program: "Science explorers", percent: "96.7%", score: "58 / 60", width: 96.7 },
    { program: "Creative computing", percent: "93.3%", score: "56 / 60", width: 93.3 },
  ];

  const savedReports = [
    {
      name: "Weekly lesson delivery",
      sub: "Attendance, cancellations & tutor workload",
      period: "Nov 2–8",
      owner: "Jamie Lee",
      lastGenerated: "Nov 5 · 3:30 PM ET",
      state: "Ready",
      action: "Download CSV",
    },
    {
      name: "November invoice exceptions",
      sub: "Outstanding balance & follow-up owners",
      period: "Nov 1–5",
      owner: "Morgan Reed",
      lastGenerated: "Nov 5 · 3:35 PM ET",
      state: "Ready",
      action: "View report",
    },
    {
      name: "Monthly learner progress",
      sub: "Practice checks · Not school grades",
      period: "October 2026",
      owner: "Jamie Lee",
      lastGenerated: "Nov 1 · 9:00 AM ET",
      state: "Ready",
      action: "Open summary",
    },
  ];

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
              Reports
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Understand learning delivery and financial health, with context.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export dashboard</span>
            </button>
            <button
              type="button"
              className="px-3.5 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create report</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Active learners</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">128</div>
          <div className="text-[11px] text-teal-700 font-medium mt-1">
            As of Nov 5 · +6 this month
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Attendance · last 30 days</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">96%</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            384 / 400 expected lessons attended
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">November invoiced</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">$18,420</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            $660 outstanding · Month to date
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Family reports on time</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">91%</div>
          <div className="text-[11px] text-teal-700 font-medium mt-1">
            30 / 33 due reports · Last 30 days
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200/80 pb-2">
        {[
          { id: "operations", label: "Operations overview", count: 0 },
          { id: "outcomes", label: "Learning outcomes", count: 0 },
          { id: "financials", label: "Financials", count: 0 },
          { id: "saved", label: "Saved reports", count: 0 },
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
            {tab.label}
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
            placeholder="Find a saved report or metric definition"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Select defaultValue="As of Nov 5, 2026">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="As of Nov 5, 2026" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="As of Nov 5, 2026">As of Nov 5, 2026</SelectItem>
              <SelectItem value="As of Oct 31, 2026">As of Oct 31, 2026</SelectItem>
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
              <SelectItem value="Science explorers">Science explorers</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Compare: Prior period">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Compare: Prior period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Compare: Prior period">Compare: Prior period</SelectItem>
              <SelectItem value="Compare: Prior year">Compare: Prior year</SelectItem>
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

      {/* Main Grid: Invoiced Revenue Chart + Attendance By Program */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Invoiced revenue bar chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Monthly · USD
              </div>
              <h2 className="text-sm font-bold text-[#0B1E2B] mt-0.5">
                Invoiced revenue
              </h2>
            </div>
            <Link
              href="/admin/payments"
              className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1"
            >
              <span>View ledger</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <p className="text-[11px] text-slate-400">
            Issued invoice value, before refunds · Not collected cash
          </p>

          {/* Bar Chart Container */}
          <div className="pt-6 pb-2">
            <div className="flex items-end justify-between gap-3 h-44 border-b border-slate-100 px-4">
              {revenueBars.map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-bold text-slate-700">
                    {bar.amount}
                  </span>
                  <div
                    className={`w-full max-w-[48px] rounded-t-lg transition-all ${
                      bar.current ? "bg-[#0A5C4C]" : "bg-emerald-100"
                    }`}
                    style={{ height: `${bar.height}%` }}
                  />
                  <span className="text-[11px] font-medium text-slate-500 -mb-6">
                    {bar.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Alert className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-xl flex items-start gap-2.5 text-xs text-amber-900 mt-6">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <AlertDescription className="text-xs text-amber-900 leading-snug">
              *November is month to date through Nov 5. Prior months are complete; do not treat this as a like-for-like growth rate.
            </AlertDescription>
          </Alert>
        </div>

        {/* Attendance by program (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Last 30 Days · Attended / Expected
            </div>
            <h3 className="text-sm font-bold text-[#0B1E2B] mt-0.5">
              Attendance by program
            </h3>
          </div>

          <div className="space-y-4 pt-1">
            {programAttendance.map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{item.program}</span>
                  <span className="text-slate-600 font-bold">
                    {item.percent} · <span className="font-normal text-slate-400">{item.score}</span>
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0A5C4C] rounded-full"
                    style={{ width: `${item.width}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 leading-relaxed">
            Total: 384 of 400 expected lessons. Excludes lessons canceled before the attendance cutoff.
          </p>
        </div>
      </div>

      {/* Bottom Section: Saved reports & exports */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#0B1E2B]">Saved reports & exports</h2>
          <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
            <span>Manage schedules</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full text-left text-xs">
            <TableHeader className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <TableRow>
                <TableHead className="py-3 px-4 font-bold text-slate-500">Report / Scope</TableHead>
                <TableHead className="py-3 px-3 font-bold text-slate-500">Period</TableHead>
                <TableHead className="py-3 px-3 font-bold text-slate-500">Owner</TableHead>
                <TableHead className="py-3 px-3 font-bold text-slate-500">Last Generated</TableHead>
                <TableHead className="py-3 px-3 font-bold text-slate-500">State</TableHead>
                <TableHead className="py-3 px-4 text-right font-bold text-slate-500">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-100">
              {savedReports.map((r, i) => (
                <TableRow key={i} className="hover:bg-slate-50/80">
                  <TableCell className="py-3 px-4">
                    <div className="font-bold text-[#0B1E2B]">{r.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{r.sub}</div>
                  </TableCell>
                  <TableCell className="py-3 px-3 text-slate-700 font-medium">{r.period}</TableCell>
                  <TableCell className="py-3 px-3 text-slate-600">{r.owner}</TableCell>
                  <TableCell className="py-3 px-3 text-slate-600">{r.lastGenerated}</TableCell>
                  <TableCell className="py-3 px-3">
                    <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100 border-none text-[10px] font-bold">
                      {r.state}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 px-4 text-right">
                    <span className="font-semibold text-teal-800 hover:underline cursor-pointer">
                      {r.action}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="p-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Exports contain student data · Access follows staff permissions · Download links are illustrative</span>
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

      {/* Metric definitions footer banner */}
      <Alert className="p-3 bg-teal-50/80 border border-teal-200/80 rounded-xl flex items-start gap-2.5 text-xs text-teal-900">
        <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <AlertDescription className="text-xs text-teal-900 leading-snug">
          Metric definitions: active learners have a current enrollment; attendance uses completed eligible lessons; invoiced revenue is not cash received.
        </AlertDescription>
      </Alert>
    </div>
  );
}
