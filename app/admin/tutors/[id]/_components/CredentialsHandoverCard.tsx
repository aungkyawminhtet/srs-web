"use client";

import React, { useState } from "react";
import { KeyRound, Copy, Check, ShieldCheck } from "lucide-react";
import { Instructor } from "@/lib/instructorStore";
import { PROGRAMS } from "@/lib/data";

interface CredentialsHandoverCardProps {
  instructor: Instructor;
}

export function CredentialsHandoverCard({ instructor }: CredentialsHandoverCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const courseTitles = (instructor.assignedCourses || [])
      .map((cId) => PROGRAMS.find((p) => p.id === cId)?.title || cId)
      .join(", ");

    const text = `Fun & Learn - Instructor Account Handover Slip\n==========================================\nName: ${instructor.name}\nLogin URL: http://localhost:3000/login\nEmail: ${instructor.email}\nTemporary Password: ${instructor.password || "instructor123"}\nAssigned Courses: ${courseTitles}\n\nPlease sign in to check your course outlines and assignments.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-[#0A5C4C]" />
          <h3 className="font-bold text-base text-[#0B1E2B] font-display">
            Account Handover Credentials
          </h3>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="text-xs font-bold text-[#0A5C4C] hover:underline flex items-center gap-1 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Handover Slip</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
            Login Email (Username)
          </span>
          <span className="font-mono font-bold text-slate-900 break-all">
            {instructor.email}
          </span>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
            Initial Password
          </span>
          <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
            {instructor.password || "instructor123"}
          </span>
        </div>
      </div>

      <div className="p-3 bg-[#FAF7EC] rounded-2xl border border-[#ECE5CD] text-[11px] text-amber-950 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
        <span>
          Give these credentials to the teacher after onboarding. They can sign in at /login and manage their assigned courses.
        </span>
      </div>
    </div>
  );
}
