"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Calendar,
  CheckCircle2,
  Download,
  ArrowUpRight,
  Info,
  Clock,
  Sparkles,
  ChevronDown,
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
import { Badge } from "@/components/ui/badge";

export default function BillingPage() {
  const [selectedChild, setSelectedChild] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("3months");

  const invoices = [
    {
      id: "FL-261101-A",
      program: "Emma / Algebra I",
      date: "Nov 1, 2026",
      amount: "$240.00",
      status: "Paid",
      child: "emma",
    },
    {
      id: "FL-261101-S",
      program: "Noah / Science explorers",
      date: "Nov 1, 2026",
      amount: "$96.00",
      status: "Paid",
      child: "noah",
    },
    {
      id: "FL-261001-A",
      program: "Emma / Algebra I",
      date: "Oct 1, 2026",
      amount: "$240.00",
      status: "Paid",
      child: "emma",
    },
    {
      id: "FL-261001-S",
      program: "Noah / Science explorers",
      date: "Oct 1, 2026",
      amount: "$96.00",
      status: "Paid",
      child: "noah",
    },
  ];

  const filteredInvoices = invoices.filter((item) => {
    if (selectedChild !== "all" && item.child !== selectedChild) return false;
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 font-mono block mb-1">
            Thursday, November 5, 2026 · Parent Portal
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
            Your family&apos;s learning plans.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage payments, lesson packages and receipts. Only parent accounts can access billing.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Downloading statements...")}
          className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full shadow-2xs hover:shadow transition-all shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <span>Download statements</span>
          <Download className="w-4 h-4 text-[#0A5C4C]" />
        </button>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white rounded-3xl p-5 lg:p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>Outstanding balance</span>
            <CheckCircle2 className="w-4 h-4 text-[#0A5C4C]" />
          </div>
          <div className="text-3xl lg:text-4xl font-black text-[#0B1E2B] font-display">
            $0.00
          </div>
          <div className="text-xs text-slate-500 mt-1">
            You&apos;re all paid up
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 lg:p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>Next family renewal</span>
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl lg:text-4xl font-black text-[#0B1E2B] font-display">
            $336
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Dec 1 · 2 active programs
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 lg:p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>Account credit</span>
            <CreditCard className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl lg:text-4xl font-black text-[#0B1E2B] font-display">
            $0.00
          </div>
          <div className="text-xs text-slate-500 mt-1">
            No unused credit on this account
          </div>
        </div>
      </div>

      {/* Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column: Active Plans & Invoices (7 cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Active learning plans */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-5">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Active learning plans
            </h2>

            {/* Plan 1: Emma Algebra I */}
            <div className="p-5 rounded-2xl border border-slate-200/80 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    Emma · Algebra I
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    One-to-one · 8 × 60-minute lessons · November 1–30
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-[#0A5C4C] bg-[#EAF5F2] px-2.5 py-0.5 rounded-full">
                    Paid
                  </span>
                  <div className="text-xs font-bold text-slate-900 mt-1">$240 / month</div>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>2 used · 6 lessons remaining</span>
                  <span className="text-[#0A5C4C]">25%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0A5C4C] rounded-full w-1/4" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-400">Renews Dec 1 · $240 · Visa •••• 4242</span>
                <button
                  type="button"
                  className="font-bold text-[#0A5C4C] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Manage plan &amp; renewal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Plan 2: Noah Science Explorers */}
            <div className="p-5 rounded-2xl border border-slate-200/80 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    Noah · Science explorers
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Small group of 4 · 4 × 60-minute lessons · November 1–30
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-[#0A5C4C] bg-[#EAF5F2] px-2.5 py-0.5 rounded-full">
                    Paid
                  </span>
                  <div className="text-xs font-bold text-slate-900 mt-1">$96 / month</div>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>0 used · 4 lessons remaining</span>
                  <span className="text-slate-400">0%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0A5C4C] rounded-full w-0" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-400">Renews Dec 1 · $96 · Visa •••• 4242</span>
                <button
                  type="button"
                  className="font-bold text-[#0A5C4C] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Manage plan &amp; renewal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Invoices & receipts */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                Invoices &amp; receipts
              </h2>
              <Link
                href="/dashboard/help"
                className="text-xs font-semibold text-[#0A5C4C] hover:underline inline-flex items-center gap-1"
              >
                <span>Billing help</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Filter row */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Child
                </label>
                <Select
                  value={selectedChild}
                  onValueChange={(val) => val && setSelectedChild(val)}
                >
                  <SelectTrigger className="w-full bg-white border-slate-200 text-xs text-slate-700 h-9">
                    <SelectValue placeholder="All children" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All children</SelectItem>
                    <SelectItem value="emma">Emma</SelectItem>
                    <SelectItem value="noah">Noah</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Period
                </label>
                <Select
                  value={selectedPeriod}
                  onValueChange={(val) => val && setSelectedPeriod(val)}
                >
                  <SelectTrigger className="w-full bg-white border-slate-200 text-xs text-slate-700 h-9">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">Last 3 months</SelectItem>
                    <SelectItem value="6months">Last 6 months</SelectItem>
                    <SelectItem value="year">2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Invoices table */}
            <div className="overflow-x-auto pt-2">
              <Table className="w-full text-left border-collapse min-w-[560px]">
                <TableHeader>
                  <TableRow className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    <TableHead className="py-2.5 px-2 text-slate-400 font-bold">Invoice / program</TableHead>
                    <TableHead className="py-2.5 px-2 text-slate-400 font-bold">Date</TableHead>
                    <TableHead className="py-2.5 px-2 text-slate-400 font-bold">Amount</TableHead>
                    <TableHead className="py-2.5 px-2 text-slate-400 font-bold">Status</TableHead>
                    <TableHead className="py-2.5 px-2 text-right text-slate-400 font-bold">Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-slate-100 text-xs">
                  {filteredInvoices.map((inv) => (
                    <TableRow key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                      <TableCell className="py-3 px-2">
                        <div className="font-bold text-slate-900">{inv.id}</div>
                        <div className="text-[11px] text-slate-500">{inv.program}</div>
                      </TableCell>
                      <TableCell className="py-3 px-2 text-slate-700">{inv.date}</TableCell>
                      <TableCell className="py-3 px-2 font-bold text-slate-900">{inv.amount}</TableCell>
                      <TableCell className="py-3 px-2">
                        <Badge variant="secondary" className="border-none font-bold text-[10px] text-[#0A5C4C] bg-[#EAF5F2]">
                          {inv.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3 px-2 text-right">
                        <button
                          type="button"
                          onClick={() => alert(`Downloading receipt for ${inv.id}...`)}
                          className="font-bold text-[#0A5C4C] hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Download</span>
                          <Download className="w-3 h-3" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
              Receipts are sent to <strong className="text-slate-600">may.thant@example.com</strong> · Prices shown in USD
            </div>
          </div>

        </div>

        {/* Right Column: Payment Method (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Payment Method Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Payment method
            </h3>

            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-7 rounded-md bg-white border border-slate-200 flex items-center justify-center font-mono font-black text-blue-700 text-xs">
                    VISA
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Visa •••• 4242</div>
                    <div className="text-[11px] text-slate-400">Expires 08/28 · May Thant</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full font-mono">
                  Default
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed font-sans pt-1 border-t border-slate-200/60">
                Automatic renewal is on for both plans.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => alert("Update payment method")}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold py-2.5 px-4 rounded-full transition-all cursor-pointer"
              >
                <span>Update payment method</span>
              </button>

              <div className="text-center">
                <Link
                  href="/dashboard/settings"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A5C4C] hover:underline"
                >
                  <span>Manage billing address</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Mint confirmation card */}
          <div className="bg-[#EAF5F2] border border-[#CCE8E0] rounded-3xl p-5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0A5C4C] font-display">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>You&apos;re all set</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              Your November payments were received. We&apos;ll email a reminder before your next renewal.
            </p>
          </div>

          <div className="text-[11px] text-slate-400 leading-relaxed font-sans px-1">
            Illustrative prices in USD. Changes to plans apply to future renewals; unused lesson terms are shown when you manage a plan.
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

