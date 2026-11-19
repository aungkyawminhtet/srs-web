"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ShieldCheck, Mail, Phone, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Instructor } from "@/lib/instructorStore";

interface TutorHeaderProps {
  instructor: Instructor;
}

export function TutorHeader({ instructor }: TutorHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/tutors"
            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            title="Back to All Tutors & Instructors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] font-display">
                {instructor.name}
              </h1>
              <Badge className="bg-emerald-100 text-emerald-800 border-none text-[10px] font-bold">
                {instructor.status.toUpperCase()}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              ID: <strong className="text-slate-700">{instructor.id}</strong> · {instructor.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/instructor"
            target="_blank"
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>Open Instructor View</span>
          </Link>
        </div>
      </div>

      {/* Profile Summary Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0A5C4C] text-white flex items-center justify-center font-bold text-lg shadow-xs shrink-0 overflow-hidden border border-emerald-300">
            {instructor.avatar && (instructor.avatar.startsWith("http") || instructor.avatar.startsWith("/uploads") || instructor.avatar.startsWith("data:")) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={instructor.avatar}
                alt={instructor.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{instructor.avatar || instructor.name.slice(0, 2).toUpperCase()}</span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-[#0B1E2B] font-display">
                {instructor.name}
              </h3>
              <Badge
                variant="secondary"
                className="bg-slate-100 text-slate-700 text-[10px] font-bold"
              >
                Academic Staff
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1 font-mono text-[#0A5C4C]">
                <Mail className="w-3 h-3" />
                {instructor.email}
              </span>
              {instructor.phone && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {instructor.phone}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Teaching Scope
            </span>
            <span className="font-bold text-slate-800">
              {instructor.assignedCourses?.length || 0} Programs Granted
            </span>
          </div>
          <div className="w-px h-6 bg-slate-200" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Workload Allocation
            </span>
            <span className="font-bold text-[#0A5C4C]">
              {instructor.workloadHours} / {instructor.maxHours} hrs/wk
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
