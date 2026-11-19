"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, BookOpen, AlertCircle } from "lucide-react";
import { getStoredAuth } from "@/lib/api/client";
import { PROGRAMS, Program } from "@/lib/data";
import {
  instructorStore,
  CourseOutlineData,
  OutlineModule,
  LessonItem,
} from "@/lib/instructorStore";

import { CourseOutlineHeader } from "./_components/CourseOutlineHeader";
import { ModuleCard } from "./_components/ModuleCard";
import { AddModuleDialog } from "./_components/AddModuleDialog";
import { AddLessonDialog } from "./_components/AddLessonDialog";

export default function CourseOutlineEditorPage() {
  const params = useParams();
  const courseId = params?.id as string;

  const [program, setProgram] = useState<Program | null>(null);
  const [outline, setOutline] = useState<CourseOutlineData | null>(null);
  const [hasAccess, setHasAccess] = useState<boolean>(true);
  const [savedToast, setSavedToast] = useState<boolean>(false);

  // Dialog states
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [activeModuleIdForLesson, setActiveModuleIdForLesson] = useState<string | null>(null);

  useEffect(() => {
    const auth = getStoredAuth();
    const currentIns = auth?.email
      ? instructorStore.getInstructorByEmail(auth.email)
      : instructorStore.getInstructorById("INS-101");

    const assignedIds = currentIns?.assignedCourses || [
      "math-that-clicks",
      "algebra-with-confidence",
    ];

    if (!assignedIds.includes(courseId)) {
      setHasAccess(false);
    }

    const prog = PROGRAMS.find((p) => p.id === courseId);
    if (prog) {
      setProgram(prog);
      const loadedOutline = instructorStore.getCourseOutline(courseId);
      setOutline(loadedOutline);
    }
  }, [courseId]);

  const handleSaveOutline = () => {
    if (outline) {
      instructorStore.saveCourseOutline(courseId, outline);
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    }
  };

  const handleAddModule = (title: string, description: string) => {
    if (!outline) return;

    const newMod: OutlineModule = {
      id: `mod-${Date.now()}`,
      moduleNumber: outline.modules.length + 1,
      title,
      description,
      lessons: [],
    };

    const updated = {
      ...outline,
      modules: [...outline.modules, newMod],
    };

    setOutline(updated);
    instructorStore.saveCourseOutline(courseId, updated);
    setIsAddModuleOpen(false);
  };

  const handleDeleteModule = (modId: string) => {
    if (!outline) return;
    const updated = {
      ...outline,
      modules: outline.modules
        .filter((m) => m.id !== modId)
        .map((m, idx) => ({ ...m, moduleNumber: idx + 1 })),
    };
    setOutline(updated);
    instructorStore.saveCourseOutline(courseId, updated);
  };

  const handleAddLesson = (lessonData: {
    title: string;
    durationMinutes: number;
    objective: string;
    resourceTitle?: string;
    liveMeetingUrl?: string;
  }) => {
    if (!outline || !activeModuleIdForLesson) return;

    const newLesson: LessonItem = {
      id: `les-${Date.now()}`,
      lessonNumber: 1,
      title: lessonData.title,
      durationMinutes: lessonData.durationMinutes,
      objectives: lessonData.objective ? [lessonData.objective] : ["Master lesson competencies"],
      resourceTitle: lessonData.resourceTitle,
      liveMeetingUrl: lessonData.liveMeetingUrl,
    };

    const updatedModules = outline.modules.map((mod) => {
      if (mod.id === activeModuleIdForLesson) {
        newLesson.lessonNumber = (mod.lessons?.length || 0) + 1;
        return {
          ...mod,
          lessons: [...(mod.lessons || []), newLesson],
        };
      }
      return mod;
    });

    const updated = {
      ...outline,
      modules: updatedModules,
    };

    setOutline(updated);
    instructorStore.saveCourseOutline(courseId, updated);
    setActiveModuleIdForLesson(null);
  };

  const handleDeleteLesson = (modId: string, lessonId: string) => {
    if (!outline) return;
    const updatedModules = outline.modules.map((mod) => {
      if (mod.id === modId) {
        return {
          ...mod,
          lessons: mod.lessons
            .filter((l) => l.id !== lessonId)
            .map((l, idx) => ({ ...l, lessonNumber: idx + 1 })),
        };
      }
      return mod;
    });

    const updated = {
      ...outline,
      modules: updatedModules,
    };
    setOutline(updated);
    instructorStore.saveCourseOutline(courseId, updated);
  };

  if (!hasAccess) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center max-w-lg mx-auto space-y-4 my-12 shadow-2xs">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-black text-[#0B1E2B] font-display">
          Course Access Restricted
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          You are not currently authorized to manage the syllabus for this program. Only the administrator (school owner) can grant course access to instructor accounts.
        </p>
        <Link
          href="/instructor/courses"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A5C4C] text-white text-xs font-bold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Assigned Courses</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Co-located Header Component */}
      <CourseOutlineHeader
        program={program}
        courseId={courseId}
        modulesCount={outline?.modules?.length || 0}
        savedToast={savedToast}
        onAddModule={() => setIsAddModuleOpen(true)}
        onSaveOutline={handleSaveOutline}
      />

      {/* Modules List with Co-located ModuleCard Component */}
      <div className="space-y-5">
        {outline?.modules && outline.modules.length > 0 ? (
          outline.modules.map((mod) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              onAddLesson={(mId) => setActiveModuleIdForLesson(mId)}
              onDeleteModule={handleDeleteModule}
              onDeleteLesson={handleDeleteLesson}
            />
          ))
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">No Modules Created Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Start building your syllabus by adding your first curriculum module.
            </p>
            <button
              type="button"
              onClick={() => setIsAddModuleOpen(true)}
              className="px-4 py-2 bg-[#0A5C4C] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Add First Module
            </button>
          </div>
        )}
      </div>

      {/* Co-located Dialog Components */}
      <AddModuleDialog
        isOpen={isAddModuleOpen}
        onClose={() => setIsAddModuleOpen(false)}
        onSubmit={handleAddModule}
      />

      <AddLessonDialog
        isOpen={Boolean(activeModuleIdForLesson)}
        onClose={() => setActiveModuleIdForLesson(null)}
        onSubmit={handleAddLesson}
      />
    </div>
  );
}
