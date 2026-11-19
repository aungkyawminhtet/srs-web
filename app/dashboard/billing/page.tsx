"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { enrollmentsApi, EnrollmentItem } from "@/lib/api";
import { useMyEnrollmentsQuery } from "@/hooks/api";

const DEFAULT_INVOICES = [
  {
    id: "INV-20261101-4912",
    course: "Algebra I, minus the overwhelm",
    date: "Nov 1, 2026",
    paymentMethod: "KBZPay",
    status: "Approved / Paid",
    statusColor: "text-[#0A5C4C] bg-[#EAF5F2] border-[#0A5C4C]/20",
    advisor: "Lin Chen",
  },
  {
    id: "INV-20261015-8831",
    course: "1501208 Database Systems",
    date: "Oct 15, 2026",
    paymentMethod: "Wave Pay",
    status: "Approved / Paid",
    statusColor: "text-[#0A5C4C] bg-[#EAF5F2] border-[#0A5C4C]/20",
    advisor: "Lin Chen",
  },
  {
    id: "INV-20261001-3210",
    course: "Science, explored",
    date: "Oct 1, 2026",
    paymentMethod: "CB Pay",
    status: "Approved / Paid",
    statusColor: "text-[#0A5C4C] bg-[#EAF5F2] border-[#0A5C4C]/20",
    advisor: "Dr. Maya Patel",
  },
  {
    id: "INV-20261118-9012",
    course: "Discrete Mathematics & Logic",
    date: "Nov 18, 2026",
    paymentMethod: "KBZPay",
    status: "Pending Review",
    statusColor: "text-amber-800 bg-amber-50 border-amber-200",
    advisor: "Dr. Maya Patel",
  },
];

export default function BillingPage() {
  const { data: serverEnrollments } = useMyEnrollmentsQuery();
  const [invoices, setInvoices] = useState(DEFAULT_INVOICES);
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  useEffect(() => {
    if (serverEnrollments && Array.isArray(serverEnrollments) && serverEnrollments.length > 0) {
      const mapped = serverEnrollments.map((item) => ({
        id: (item as any).invoiceNumber || `INV-${item._id.slice(-6)}`,
        course: item.programTitle,
        date: new Date(item.paymentDate || (item as any).createdAt || Date.now()).toLocaleDateString(),
        paymentMethod: item.paymentMethod,
        status: item.status === "approved" ? "Approved / Paid" : "Pending Review",
        statusColor:
          item.status === "approved"
            ? "text-[#0A5C4C] bg-[#EAF5F2] border-[#0A5C4C]/20"
            : "text-amber-800 bg-amber-50 border-amber-200",
        advisor: (item as any).advisorName || "Assigned Advisor",
      }));
      setInvoices(mapped);
    }
  }, [serverEnrollments]);

  const handleDownloadReceipt = (invoiceId: string, course: string) => {
    setDownloadNotice(`Downloading receipt statement for invoice ${invoiceId} (${course})...`);
    setTimeout(() => {
      window.print();
      setDownloadNotice(null);
    }, 600);
  };

  const filtered = invoices.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.id.toLowerCase().includes(q) ||
      item.course.toLowerCase().includes(q) ||
      item.paymentMethod.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-slate-400 font-mono block mb-1.5">
            Student Portal · Payment Records
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#0B1E2B] tracking-tight font-display">
            Invoices &amp; Receipts History
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed">
            Official record of your tuition payments, bank receipt slips, and downloadable statements.
          </p>
        </div>

        <Link
          href="/dashboard/enrollment"
          className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-2xs transition-all shrink-0 self-start sm:self-auto"
        >
          <span>Enroll New Course</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {downloadNotice && (
        <div className="bg-[#EAF5F2] border border-[#0A5C4C]/30 text-[#0A5C4C] text-xs font-bold p-3.5 rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Invoices & Receipts History Table Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-[#0B1E2B] font-display">
              Payment &amp; Tuition Receipts
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified statements for all course registrations
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search by invoice or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs focus:outline-none focus:border-[#0A5C4C]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">Invoice #</th>
                <th className="py-3 px-3">Course Name</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Banking Method</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Receipt Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-3 font-mono font-bold text-slate-900">
                    {inv.id}
                  </td>
                  <td className="py-4 px-3">
                    <div className="font-bold text-slate-900">{inv.course}</div>
                    <div className="text-[11px] text-slate-500">Advisor: {inv.advisor}</div>
                  </td>
                  <td className="py-4 px-3 text-slate-600 font-medium">
                    {inv.date}
                  </td>
                  <td className="py-4 px-3">
                    <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                      {inv.paymentMethod}
                    </span>
                  </td>
                  <td className="py-4 px-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${inv.statusColor}`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleDownloadReceipt(inv.id, inv.course)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A5C4C] hover:bg-[#EAF5F2] border border-[#0A5C4C]/20 hover:border-[#0A5C4C]/40 px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
