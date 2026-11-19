"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Save, Check, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Program } from "@/lib/data";

interface CourseOutlineHeaderProps {
  program: Program | null;
  courseId: string;
  modulesCount: number;
  savedToast: boolean;
  onAddModule: () => void;
  onSaveOutline: () => void;
}

export function CourseOutlineHeader({
  program,
  courseId,
  modulesCount,
  savedToast,
  onAddModule,
  onSaveOutline,
}: CourseOutlineHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Top Header Row with Back Button & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/instructor/courses"
            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            title="Back to Assigned Courses"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] font-display">
                {program?.title || "Course Outline Editor"}
              </h1>
              <Badge className="bg-emerald-100 text-emerald-800 border-none text-[10px] font-bold">
                Instructor Mode
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Customize modules, lesson objectives, materials, and live classroom links for this program.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onAddModule}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Module</span>
          </button>
          <button
            type="button"
            onClick={onSaveOutline}
            className="px-4 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {savedToast ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Outline Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Outline</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Course Metadata Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Grade Level
            </span>
            <span className="font-bold text-slate-800">{program?.grades}</span>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Curriculum Category
            </span>
            <span className="font-bold text-slate-800">{program?.categoryTag}</span>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Total Modules
            </span>
            <span className="font-bold text-[#0A5C4C]">{modulesCount} Modules</span>
          </div>
        </div>

        <Link
          href={`/programs/${courseId}`}
          target="_blank"
          className="text-xs font-semibold text-slate-500 hover:text-[#0A5C4C] flex items-center gap-1"
        >
          <span>View Public Course Page</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
