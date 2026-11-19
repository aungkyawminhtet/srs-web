"use client";

import React, { useState } from "react";
import { InstructorSidebar } from "@/components/instructor/InstructorSidebar";
import { InstructorHeader } from "@/components/instructor/InstructorHeader";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex text-[#1E293B]">
      {/* Instructor Sidebar */}
      <InstructorSidebar
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <InstructorHeader onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}

          {/* Teacher workspace disclaimer footer */}
          <div className="pt-6 pb-4 border-t border-slate-200/60 text-center">
            <p className="text-[11px] text-slate-400">
              ⓘ Instructor Workspace · Teaching outline management, grading rubrics, and communication channels for assigned courses.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
