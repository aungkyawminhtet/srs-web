"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { instructorStore, Instructor } from "@/lib/instructorStore";

import { TutorHeader } from "./_components/TutorHeader";
import { CourseAccessCard } from "./_components/CourseAccessCard";
import { CredentialsHandoverCard } from "./_components/CredentialsHandoverCard";

export default function AdminTutorDetailPage() {
  const params = useParams();
  const tutorId = params?.id as string;

  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    const list = instructorStore.getInstructors();
    const found = list.find((ins) => ins.id === tutorId || ins.id.toLowerCase() === tutorId.toLowerCase());
    if (found) {
      setInstructor(found);
    }
  }, [tutorId]);

  const handleSaveAccess = (newCourses: string[]) => {
    if (!instructor) return;
    const updated = instructorStore.updateInstructorCourseAccess(instructor.id, newCourses);
    const refreshed = updated.find((ins) => ins.id === instructor.id);
    if (refreshed) {
      setInstructor(refreshed);
    }
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  if (!instructor) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center max-w-md mx-auto my-12 space-y-4">
        <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
        <h2 className="text-lg font-bold text-slate-800">Instructor Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested tutor or instructor profile does not exist in the roster.
        </p>
        <Link
          href="/admin/tutors"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0A5C4C] text-white text-xs font-bold rounded-xl"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Tutors List</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Co-located Tutor Header */}
      <TutorHeader instructor={instructor} />

      {/* Co-located Course Access Delegation Manager */}
      <CourseAccessCard
        assignedCourses={instructor.assignedCourses || []}
        onSaveAccess={handleSaveAccess}
        savedToast={savedToast}
      />

      {/* Co-located Credentials Handover Slip */}
      <CredentialsHandoverCard instructor={instructor} />
    </div>
  );
}
