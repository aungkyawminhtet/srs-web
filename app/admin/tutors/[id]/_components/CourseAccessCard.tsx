"use client";

import React, { useState } from "react";
import { BookOpen, Check, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PROGRAMS } from "@/lib/data";

interface CourseAccessCardProps {
  assignedCourses: string[];
  onSaveAccess: (newCourses: string[]) => void;
  savedToast: boolean;
}

export function CourseAccessCard({
  assignedCourses,
  onSaveAccess,
  savedToast,
}: CourseAccessCardProps) {
  const [selectedCourses, setSelectedCourses] = useState<string[]>(assignedCourses);

  const toggleCourse = (courseId: string) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handleSave = () => {
    onSaveAccess(selectedCourses);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#0A5C4C]" />
            <h3 className="font-bold text-base text-[#0B1E2B] font-display">
              Course Access Permissions
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Owner delegation: Check programs this instructor is authorized to teach and manage outlines for.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          {savedToast ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Permissions Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Update Access</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {PROGRAMS.map((prog) => {
          const isChecked = selectedCourses.includes(prog.id);
          return (
            <label
              key={prog.id}
              className={`flex items-start justify-between p-3.5 rounded-2xl border text-xs cursor-pointer transition-all ${
                isChecked
                  ? "bg-[#EAF5F2] border-[#0A5C4C] text-[#0A5C4C]"
                  : "bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100/70"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCourse(prog.id)}
                  className="mt-0.5 rounded text-[#0A5C4C] focus:ring-[#0A5C4C]"
                />
                <div>
                  <div className="font-bold text-xs">{prog.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {prog.grades} · {prog.categoryTag}
                  </div>
                </div>
              </div>

              <Badge
                variant="secondary"
                className={`text-[10px] font-bold ${
                  isChecked
                    ? "bg-[#0A5C4C] text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {isChecked ? "Granted" : "Revoked"}
              </Badge>
            </label>
          );
        })}
      </div>
    </div>
  );
}
