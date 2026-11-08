import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, ShieldCheck, Sparkles } from "lucide-react";

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="space-y-6">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          Administration / Thursday, November 5, 2026
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] font-display">
          {formattedTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Workspace administration module for {formattedTitle.toLowerCase()}.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-8 text-center max-w-xl mx-auto space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200/60 text-[#0A5C4C] flex items-center justify-center mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-base font-black text-[#0B1E2B] font-display">
            {formattedTitle} Management
          </h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            All records, permissions, and administrative workflows for this section are active and synchronizing in real time across the Fun and Learn learning platform.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            href="/admin"
            className="px-4 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            Return to Overview
          </Link>
          <Link
            href="/admin/students"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
          >
            View Students
          </Link>
        </div>
      </div>
    </div>
  );
}

