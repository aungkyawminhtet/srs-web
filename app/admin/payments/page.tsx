"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Plus,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  Download,
  DollarSign,
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

export default function AdminBillingPage() {
  const [selectedTab, setSelectedTab] = useState("invoices");
  const [searchQuery, setSearchQuery] = useState("");
  const [refundAmount, setRefundAmount] = useState("30.00");
  const [refundReason, setRefundReason] = useState(
    "One lesson canceled by the organization; family requested a refund instead of credit."
  );

  const invoices = [
    {
      id: "INV-26011",
      family: "Thant",
      guardian: "May Thant · Paid Nov 1",
      plan: "Algebra I",
      planSub: "Emma · 8 lessons",
      amount: "$240",
      status: "Paid",
      action: "View receipt",
    },
    {
      id: "INV-26012",
      family: "Kim",
      guardian: "Jin Kim · Due Nov 3",
      plan: "Computing",
      planSub: "Oliver · Monthly",
      amount: "$240",
      status: "Declined",
      action: "Review & retry",
    },
    {
      id: "INV-26013",
      family: "Patel",
      guardian: "Anita Patel · Due Nov 1",
      plan: "Math foundations",
      planSub: "Liam · Monthly",
      amount: "$180",
      status: "Overdue",
      action: "Send reminder",
    },
    {
      id: "INV-26014",
      family: "Wilson",
      guardian: "Rachel Wilson · Due Nov 1",
      plan: "Algebra I",
      planSub: "Ethan · Monthly",
      amount: "$240",
      status: "Expired card",
      action: "Request update",
    },
    {
      id: "INV-26015",
      family: "Lopez",
      guardian: "Elena Lopez · Paid Nov 1",
      plan: "Reading & writing",
      planSub: "Mia · Group plan",
      amount: "$160",
      status: "Paid",
      action: "View receipt",
    },
    {
      id: "INV-26016",
      family: "Thant",
      guardian: "May Thant · Paid Nov 1",
      plan: "Science explorers",
      planSub: "Noah · Monthly",
      amount: "$160",
      status: "Paid",
      action: "View receipt",
    },
  ];

  const filteredInvoices = invoices.filter((item) => {
    if (selectedTab === "exceptions" && !["Declined", "Overdue", "Expired card"].includes(item.status))
      return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.id.toLowerCase().includes(q) ||
        item.family.toLowerCase().includes(q) ||
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
              Billing, payments & refunds
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Resolve exceptions with a clear record of every family transaction.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export ledger</span>
            </button>
            <button
              type="button"
              className="px-3.5 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create invoice</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">November invoiced</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">$18,420</div>
          <div className="text-[11px] text-teal-700 font-medium mt-1">
            Includes paid and outstanding invoices
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Collected</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">$17,760</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Before any pending refund adjustments
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Outstanding · 3 invoices</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">$660</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            Kim $240 · Patel $180 · Wilson $240
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Refund requests</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">1</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            $30 awaiting review · Not issued
          </div>
        </div>
      </div>

      {/* Yellow Warning Banner */}
      <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong className="font-bold">3 payment exceptions need a family-friendly follow-up.</strong> Never retry a declined payment without checking its latest status.
          </span>
        </div>
        <button
          type="button"
          onClick={() => setSelectedTab("exceptions")}
          className="text-amber-900 font-bold hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
        >
          <span>Review exceptions</span>
          <span className="text-xs">→</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200/80 pb-2">
        {[
          { id: "invoices", label: "Invoices", count: 0 },
          { id: "exceptions", label: "Exceptions", count: 3 },
          { id: "refunds", label: "Refunds", count: 1 },
          { id: "plans", label: "Plans & credits", count: 0 },
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
            placeholder="Search invoice ID, student or guardian"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Select defaultValue="November 2026">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="November 2026" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="November 2026">November 2026</SelectItem>
              <SelectItem value="October 2026">October 2026</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Status: All">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Status: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Status: All">Status: All</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Declined">Declined</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Currency: USD">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Currency: USD" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Currency: USD">Currency: USD</SelectItem>
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

      {/* Main Grid: Family Invoices Table + Review Partial Refund Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0B1E2B]">Family invoices</h2>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Reconcile payments</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <Table className="w-full text-left text-xs">
              <TableHeader className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <TableRow>
                  <TableHead className="py-3 px-4 font-bold text-slate-500">Invoice / Family</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">Plan</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">Amount</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">Status</TableHead>
                  <TableHead className="py-3 px-4 text-right font-bold text-slate-500">Next Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100">
                {filteredInvoices.map((item) => (
                  <TableRow key={item.id} className="hover:bg-slate-50/80 cursor-pointer transition-colors">
                    <TableCell className="py-3 px-4">
                      <div className="font-bold text-[#0B1E2B]">
                        {item.id} · {item.family}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.guardian}</div>
                    </TableCell>
                    <TableCell className="py-3 px-3">
                      <div className="font-semibold text-slate-800">{item.plan}</div>
                      <div className="text-[10px] text-slate-400">{item.planSub}</div>
                    </TableCell>
                    <TableCell className="py-3 px-3 font-bold text-slate-900">{item.amount}</TableCell>
                    <TableCell className="py-3 px-3">
                      <Badge
                        variant="secondary"
                        className={`text-[10px] font-bold ${
                          item.status === "Paid"
                            ? "bg-teal-100 text-teal-800 hover:bg-teal-100 border-none"
                            : item.status === "Declined"
                            ? "bg-rose-100 text-rose-800 hover:bg-rose-100 border-none"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-100 border-none"
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
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="p-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Showing {filteredInvoices.length} of 96 November invoices · All amounts USD</span>
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

        {/* Selected Refund Drawer (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              RF-018 · INV-26011 · Thant Family
            </span>
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none text-[10px] font-bold">
              Pending approval
            </Badge>
          </div>

          <div>
            <h3 className="text-xl font-black text-[#0B1E2B] font-display">
              Review partial refund
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Original payment: $240 · Nov 1 · Algebra I monthly plan
            </p>
          </div>

          {/* Form */}
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Refund amount (USD)
              </label>
              <input
                type="text"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-bold"
              />
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Maximum refundable: $240 · No prior refunds
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Reason - required
              </label>
              <textarea
                rows={3}
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 leading-relaxed font-medium"
              />
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Return destination
              </div>
              <div className="font-semibold text-slate-800">
                Original payment method · Visa •••• 4242
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Illustrative request only. Approval will not change the next renewal. Review lesson entitlement before issuing a refund.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              className="w-full py-2.5 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Review ${refundAmount} refund
            </button>
            <button
              type="button"
              className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Request more information
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Exception follow-up & Plan safeguards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Exception follow-up */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E2B]">Exception follow-up</h3>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>All 3 exceptions</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0B1E2B]">
                  Kim family · $240 · Card declined Nov 3
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                  Action needed
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                Last attempt: Nov 3 · No retry scheduled · Family timezone: PT
              </div>
              <button className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer">
                <span>Check status & request payment update</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0B1E2B]">
                  Patel family · $180 overdue
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                Nov 4 reminder bounced · Verify guardian email before resending · Due Nov 1
              </div>
              <button className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer">
                <span>Verify contact & preview reminder</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Plan & transaction safeguards */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E2B]">Plan & transaction safeguards</h3>
          </div>

          <div className="space-y-3 pt-1">
            <div className="font-bold text-xs text-[#0B1E2B]">
              Emma · Algebra I monthly
            </div>
            <p className="text-xs text-slate-500">
              2 of 8 lessons used · 6 remaining · Next renewal Dec 1 · $240
            </p>
            <button className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Review plan history</span>
              <ExternalLink className="w-3 h-3" />
            </button>

            <Alert variant="destructive" className="p-3 bg-rose-50/80 border border-rose-200/70 rounded-xl flex items-start gap-2.5 text-xs text-rose-900">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <AlertDescription className="text-xs text-rose-900 leading-snug">
                Refund amount must be positive and cannot exceed the remaining paid balance. A reason is required before review.
              </AlertDescription>
            </Alert>

            <p className="text-[11px] text-slate-400">
              Ledger is sample data, not a connected payment account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
