"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowUpRight,
  Search,
  Layers,
  GraduationCap,
  Calendar,
  FileCheck2,
  Clock,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getStoredAuth } from "@/lib/api/client";
import { PROGRAMS, Program } from "@/lib/data";
import { instructorStore, Instructor } from "@/lib/instructorStore";

export default function InstructorCoursesPage() {
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [assignedPrograms, setAssignedPrograms] = useState<Program[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getStoredAuth();
    let current: Instructor | undefined;

    if (auth?.email) {
      current = instructorStore.getInstructorByEmail(auth.email);
    }
    if (!current) {
      current = instructorStore.getInstructorById("INS-101");
    }

    if (current) {
      setInstructor(current);
      const courseIds = current.assignedCourses || ["math-that-clicks", "algebra-with-confidence"];
      const matched = PROGRAMS.filter((p) => courseIds.includes(p.id));
      setAssignedPrograms(matched);
    }
    setIsLoading(false);
  }, []);

  const filtered = assignedPrograms.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.grades.toLowerCase().includes(q) ||
      p.categoryTag.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] font-display">
            My Course Outlines &amp; Syllabi
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage curriculum modules, lesson breakdowns, and classroom resources for your authorized courses.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl px-3.5 py-2 text-xs font-semibold text-[#0A5C4C] flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#0A5C4C]" />
          <span>{assignedPrograms.length} Courses Assigned by Admin</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your assigned courses by title, grade or category..."
            className="w-full pl-10 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, idx) => (
            <div
              key={`crs-skel-${idx}`}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-12 h-12 rounded-2xl" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-5 w-44" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full rounded-2xl" />
              <div className="pt-3 border-t border-slate-100 flex justify-between">
                <Skeleton className="h-4 w-28" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-24 rounded-xl" />
                  <Skeleton className="h-8 w-28 rounded-xl" />
                </div>
              </div>
            </div>
          ))
        ) : (
          filtered.map((prog) => {
          const outline = instructorStore.getCourseOutline(prog.id);
          const modules = outline?.modules || [];
          const lessonsCount = modules.reduce(
            (sum, m) => sum + (m.lessons?.length || 0),
            0
          );

          return (
            <div
              key={prog.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center font-bold shadow-2xs">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-[#0B1E2B] font-display">
                        {prog.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-500 font-semibold">
                          {prog.grades}
                        </span>
                        <span className="text-slate-300">·</span>
                        <Badge
                          variant="secondary"
                          className="bg-slate-100 text-slate-700 text-[10px]"
                        >
                          {prog.categoryTag}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Badge className="bg-emerald-100 text-emerald-800 border-none text-[10px] font-bold">
                    Active
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {prog.description}
                </p>

                {/* Modules breakdown preview */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Curriculum Modules ({modules.length})
                  </span>
                  <div className="space-y-1">
                    {modules.slice(0, 3).map((mod, i) => (
                      <div
                        key={mod.id || i}
                        className="flex items-center justify-between text-slate-700 text-[11px]"
                      >
                        <span className="font-semibold truncate">
                          Module {mod.moduleNumber}: {mod.title}
                        </span>
                        <span className="text-slate-400 shrink-0 text-[10px]">
                          {mod.lessons?.length || 0} lessons
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  <strong className="text-slate-700">{lessonsCount}</strong> total lessons
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/instructor/assignments?course=${prog.id}`}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                  >
                    Assignments
                  </Link>
                  <Link
                    href={`/instructor/courses/${prog.id}`}
                    className="px-4 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Manage Outline</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })
        )}
      </div>

      {/* Role Notice */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-slate-600 flex items-center gap-3">
        <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0" />
        <span>
          Access to other Fun &amp; Learn programs (e.g. Science, Coding, Humanities) is restricted to their assigned instructors as configured by the school owner.
        </span>
      </div>
    </div>
  );
}
