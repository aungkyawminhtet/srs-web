"use client";

import React from "react";
import { Plus, Trash2, Clock, FileText, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { OutlineModule } from "@/lib/instructorStore";

interface ModuleCardProps {
  module: OutlineModule;
  onAddLesson: (moduleId: string) => void;
  onDeleteModule: (moduleId: string) => void;
  onDeleteLesson: (moduleId: string, lessonId: string) => void;
}

export function ModuleCard({
  module,
  onAddLesson,
  onDeleteModule,
  onDeleteLesson,
}: ModuleCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
      {/* Module Header */}
      <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#0A5C4C] text-white flex items-center justify-center font-bold text-xs shrink-0">
            {module.moduleNumber}
          </div>
          <div>
            <h2 className="text-base font-black text-[#0B1E2B] font-display">
              Module {module.moduleNumber}: {module.title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">{module.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => onAddLesson(module.id)}
            className="px-3 py-1.5 bg-[#EAF5F2] hover:bg-[#d8ece7] text-[#0A5C4C] text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Lesson</span>
          </button>
          <button
            type="button"
            onClick={() => onDeleteModule(module.id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Delete Module"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lessons Inside Module */}
      <div className="p-4 sm:p-5 divide-y divide-slate-100">
        {module.lessons && module.lessons.length > 0 ? (
          module.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-slate-400">
                    Lesson {lesson.lessonNumber}:
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    {lesson.title}
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-600 text-[10px]"
                  >
                    <Clock className="w-3 h-3 mr-1 text-slate-400" />
                    {lesson.durationMinutes} mins
                  </Badge>
                </div>

                {/* Objectives & Materials */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pl-4 sm:pl-0">
                  {lesson.objectives?.map((obj, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {obj}
                    </span>
                  ))}
                  {lesson.resourceTitle && (
                    <span className="text-[#0A5C4C] font-semibold flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {lesson.resourceTitle}
                    </span>
                  )}
                  {lesson.liveMeetingUrl && (
                    <span className="text-teal-700 font-semibold flex items-center gap-1">
                      <Video className="w-3.5 h-3.5" />
                      Live Room Linked
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => onDeleteLesson(module.id, lesson.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  title="Delete Lesson"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-6 text-center text-xs text-slate-400">
            No lessons in this module yet. Click &apos;Add Lesson&apos; above to define syllabus topics.
          </div>
        )}
      </div>
    </div>
  );
}
