"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  History,
  Plus,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  Download,
  Filter,
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

export default function AdminActivityHistoryPage() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedEvent, setSelectedEvent] = useState({
    id: "EVT-281105-031",
    title: "Permission scope updated",
    status: "Completed · Reviewed",
    actor: "Jamie Lee · Administrator · Nov 5, 2026 at 3:15 PM ET",
    record: "Sofia Diaz · STAFF-004 · Coordinator",
    before: "Families: read only · Lessons: read only · Consultations: manage",
    after: "Families: manage · Lessons: manage · Consultations: manage",
    reason: "Support November family onboarding and scheduling follow-ups.",
    note: "Billing approval, role management and organization settings remain restricted.",
  });

  const events = [
    {
      id: "EVT-281105-035",
      time: "Nov 5 · 3:42 PM",
      event: "Communication draft saved",
      sub: "MSG-089 · Science explorers reminder",
      actor: "Jamie Lee",
      result: "Saved",
      resultType: "slate",
      action: "Inspect",
      title: "Communication draft saved",
      status: "Draft saved",
      record: "MSG-089 · Science explorers reminder",
      before: "No existing draft",
      after: "Draft saved in outbound queue",
      reason: "Family prep reminder for Friday materials experiment.",
      note: "Draft is not dispatched until approved.",
    },
    {
      id: "EVT-281105-031",
      time: "Nov 5 · 3:15 PM",
      event: "Staff permission scope changed",
      sub: "STAFF-004 · Sofia Diaz · Coordinator",
      actor: "Jamie Lee",
      result: "Updated",
      resultType: "teal",
      action: "Inspect",
      title: "Permission scope updated",
      status: "Completed · Reviewed",
      record: "Sofia Diaz · STAFF-004 · Coordinator",
      before: "Families: read only · Lessons: read only · Consultations: manage",
      after: "Families: manage · Lessons: manage · Consultations: manage",
      reason: "Support November family onboarding and scheduling follow-ups.",
      note: "Billing approval, role management and organization settings remain restricted.",
    },
    {
      id: "EVT-281105-028",
      time: "Nov 5 · 3:05 PM",
      event: "Lesson scheduling blocked",
      sub: "Wei Zhang · Tutor overlap · No booking made",
      actor: "Sofia Diaz",
      result: "Blocked",
      resultType: "rose",
      action: "Inspect",
      title: "Lesson scheduling validation blocked",
      status: "Validation blocked",
      record: "Wei Zhang · Algebra I with Lin Chen",
      before: "Scheduling attempted for 5:30 PM",
      after: "Blocked due to tutor buffer overlap with Emma",
      reason: "Conflict validation system prevented double booking.",
      note: "No booking record was created in the database.",
    },
    {
      id: "EVT-281105-024",
      time: "Nov 5 · 2:45 PM",
      event: "Lesson notes shared with guardian",
      sub: "Emma Thant · May Thant · Algebra I",
      actor: "Lin Chen",
      result: "Delivered",
      resultType: "teal",
      action: "Inspect",
      title: "Lesson note published to guardian",
      status: "Delivered",
      record: "Emma Thant · Algebra I lesson on Linear Equations",
      before: "Pending submission",
      after: "Delivered to May Thant in family portal",
      reason: "Post-session learning progress and homework reflection.",
      note: "Guardian email alert sent.",
    },
    {
      id: "EVT-281105-020",
      time: "Nov 5 · 2:30 PM",
      event: "Refund request created",
      sub: "RF-018 · INV-26011 · Not issued",
      actor: "Morgan Reed",
      result: "Pending",
      resultType: "amber",
      action: "Inspect",
      title: "Partial refund requested",
      status: "Pending administrator approval",
      record: "RF-018 · INV-26011 · Thant family · $30",
      before: "Invoice paid in full ($240)",
      after: "Partial refund RF-018 created in pending review",
      reason: "One lesson canceled by organization; family requested refund.",
      note: "Payment gateway transaction not yet triggered.",
    },
    {
      id: "EVT-281105-015",
      time: "Nov 5 · 1:30 PM",
      event: "Content publish blocked",
      sub: "Home · Missing SEO description · No live change",
      actor: "Avery Stone",
      result: "Blocked",
      resultType: "rose",
      action: "Inspect",
      title: "CMS publish blocked by guardrail",
      status: "Publishing blocked",
      record: "Home page hero revision",
      before: "Live version v3 remain active",
      after: "Draft prevented from overriding live content",
      reason: "Validation check: SEO description is mandatory before publish.",
      note: "Live website unaffected.",
    },
    {
      id: "EVT-281101-002",
      time: "Nov 1 · 9:00 AM",
      event: "Family payment recorded",
      sub: "Thant family · INV-26011 · $240",
      actor: "Sample system",
      result: "Recorded",
      resultType: "teal",
      action: "Inspect",
      title: "Automated recurring payment recorded",
      status: "Settled",
      record: "INV-26011 · May Thant · Visa •••• 4242",
      before: "Monthly subscription renewal due",
      after: "Paid in full · Receipt generated",
      reason: "Scheduled monthly auto-debit for Algebra I package.",
      note: "Receipt delivered to may.thant@example.com.",
    },
  ];

  const filteredEvents = events.filter((item) => {
    if (selectedTab === "admin" && !item.event.toLowerCase().includes("permission") && !item.event.toLowerCase().includes("content"))
      return false;
    if (selectedTab === "billing" && !item.event.toLowerCase().includes("payment") && !item.event.toLowerCase().includes("refund"))
      return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.event.toLowerCase().includes(q) ||
        item.sub.toLowerCase().includes(q) ||
        item.actor.toLowerCase().includes(q)
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
              Activity history
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              A traceable record of administrative decisions and family follow-ups.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Saved views</span>
            </button>
            <button
              type="button"
              className="px-3.5 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create audit export</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Recorded events today</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">48</div>
          <div className="text-[11px] text-teal-700 font-medium mt-1">
            Lesson, family, billing & content events
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Administrative changes</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">12</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Attributed to named staff accounts
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Permission changes</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">1</div>
          <div className="text-[11px] text-teal-700 font-medium mt-1">
            Coordinator scope updated · Reviewed
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Failed actions</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">2</div>
          <div className="text-[11px] text-rose-700 font-medium mt-1">
            Validation blocked · No records changed
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200/80 pb-2">
        {[
          { id: "all", label: "All activity" },
          { id: "admin", label: "Administrative changes" },
          { id: "billing", label: "Billing events" },
          { id: "access", label: "Access & security" },
          { id: "exports", label: "Exports" },
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
            placeholder="Search event ID, actor or record"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Select defaultValue="Nov 1–5, 2026">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Nov 1–5, 2026" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nov 1–5, 2026">Nov 1–5, 2026</SelectItem>
              <SelectItem value="October 2026">October 2026</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Actor: All">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Actor: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Actor: All">Actor: All</SelectItem>
              <SelectItem value="Jamie Lee">Jamie Lee</SelectItem>
              <SelectItem value="Sofia Diaz">Sofia Diaz</SelectItem>
              <SelectItem value="Morgan Reed">Morgan Reed</SelectItem>
              <SelectItem value="Avery Stone">Avery Stone</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Event type: All">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Event type: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Event type: All">Event type: All</SelectItem>
              <SelectItem value="Permission">Permission</SelectItem>
              <SelectItem value="Scheduling">Scheduling</SelectItem>
              <SelectItem value="Billing">Billing</SelectItem>
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

      {/* Main Grid: Audit Events Table + Event Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Audit events table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0B1E2B]">Audit events</h2>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Customize view</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <Table className="w-full text-left text-xs">
              <TableHeader className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <TableRow>
                  <TableHead className="py-3 px-4 font-bold text-slate-500">Time (ET)</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">Event / Affected Record</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">Actor</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">Result</TableHead>
                  <TableHead className="py-3 px-4 text-right font-bold text-slate-500">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100">
                {filteredEvents.map((item) => {
                  const isSelected = selectedEvent.id === item.id;
                  return (
                    <TableRow
                      key={item.id}
                      onClick={() =>
                        setSelectedEvent({
                          id: item.id,
                          title: item.title,
                          status: item.status,
                          actor: `${item.actor} · Nov 5, 2026 at ${item.time.split(" · ")[1]}`,
                          record: item.record,
                          before: item.before,
                          after: item.after,
                          reason: item.reason,
                          note: item.note,
                        })
                      }
                      className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                        isSelected ? "bg-teal-50/50" : ""
                      }`}
                    >
                      <TableCell className="py-3 px-4 text-slate-500 font-medium whitespace-nowrap">
                        {item.time}
                      </TableCell>
                      <TableCell className="py-3 px-3">
                        <div className="font-bold text-[#0B1E2B]">{item.event}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{item.sub}</div>
                      </TableCell>
                      <TableCell className="py-3 px-3 text-slate-700 font-medium whitespace-nowrap">
                        {item.actor}
                      </TableCell>
                      <TableCell className="py-3 px-3">
                        <Badge
                          variant="secondary"
                          className={`text-[10px] font-bold ${
                            item.resultType === "teal"
                              ? "bg-teal-100 text-teal-800 hover:bg-teal-100 border-none"
                              : item.resultType === "rose"
                              ? "bg-rose-100 text-rose-800 hover:bg-rose-100 border-none"
                              : item.resultType === "amber"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100 border-none"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-100 border-none"
                          }`}
                        >
                          {item.result}
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
            <span>Showing 7 of 128 events · Newest first · All timestamps Eastern Time</span>
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

        {/* Selected Event Detail Drawer (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Audit Event · {selectedEvent.id}
            </span>
            <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100 border-none text-[10px] font-bold">
              {selectedEvent.status}
            </Badge>
          </div>

          <div>
            <h3 className="text-xl font-black text-[#0B1E2B] font-display">
              {selectedEvent.title}
            </h3>
          </div>

          {/* Metadata items */}
          <div className="space-y-3 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Actor & timestamp
              </div>
              <div className="font-medium text-slate-800">{selectedEvent.actor}</div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Affected record
              </div>
              <div className="font-medium text-slate-800">{selectedEvent.record}</div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Before
              </div>
              <div className="text-slate-600 font-mono text-[11px]">{selectedEvent.before}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 pt-1">
                After
              </div>
              <div className="text-slate-800 font-mono text-[11px] font-semibold">{selectedEvent.after}</div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Reason provided
              </div>
              <div className="text-slate-700">{selectedEvent.reason}</div>
            </div>

            <Alert className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <AlertDescription className="text-xs text-amber-900 leading-snug">
                {selectedEvent.note}
              </AlertDescription>
            </Alert>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Audit records cannot be edited here. A correction creates a new linked event.
          </p>

          <button
            type="button"
            className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            View current access
          </button>
        </div>
      </div>

      {/* Bottom Grid: Audit export requests & Reading the history */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Audit export requests */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E2B]">Audit export requests</h3>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Export history</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0B1E2B]">
                  October administrative changes
                </span>
                <Badge variant="secondary" className="bg-slate-200 text-slate-700 hover:bg-slate-200 border-none font-bold text-[10px]">
                  Sample only
                </Badge>
              </div>
              <div className="text-[11px] text-slate-500">
                Requested by Jamie Lee · Nov 1 · Filtered to staff changes
              </div>
              <button className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer">
                <span>Review export details</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              An export includes active filters and redactions. Do not include student contact details unless required for the review.
            </p>
          </div>
        </div>

        {/* Reading the history */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
          <h3 className="text-sm font-bold text-[#0B1E2B]">Reading the history</h3>

          <p className="text-xs text-slate-600 leading-relaxed">
            A blocked action means validation prevented a change. A saved draft is not published; a refund request is not a completed refund.
          </p>

          <Alert className="p-3 bg-teal-50/80 border border-teal-200/80 rounded-xl flex items-start gap-2.5 text-xs text-teal-900 mt-2">
            <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <AlertDescription className="text-xs text-teal-900 leading-snug">
              All events shown are illustrative audit examples, not evidence of real account access or live payments.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}

