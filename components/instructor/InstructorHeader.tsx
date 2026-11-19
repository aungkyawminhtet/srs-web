"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, GraduationCap, Clock } from "lucide-react";
import { getStoredAuth } from "@/lib/api/client";

interface InstructorHeaderProps {
  onMenuClick?: () => void;
}

export function InstructorHeader({ onMenuClick }: InstructorHeaderProps) {
  const pathname = usePathname();
  const auth = getStoredAuth();

  const getBreadcrumbs = () => {
    if (pathname === "/instructor") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <span>Instructor Workspace</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold">Overall Dashboard</span>
        </span>
      );
    }
    if (pathname === "/instructor/courses") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link href="/instructor" className="hover:text-[#0A5C4C]">
            Instructor Workspace
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold">Assigned Courses &amp; Outlines</span>
        </span>
      );
    }
    if (pathname.startsWith("/instructor/courses/")) {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link href="/instructor" className="hover:text-[#0A5C4C]">
            Instructor Workspace
          </Link>
          <span className="text-slate-300">/</span>
          <Link href="/instructor/courses" className="hover:text-[#0A5C4C]">
            Courses
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold">Course Outline Editor</span>
        </span>
      );
    }
    if (pathname.includes("/assignments/") && pathname.includes("/submissions/")) {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link href="/instructor" className="hover:text-[#0A5C4C]">
            Instructor Workspace
          </Link>
          <span className="text-slate-300">/</span>
          <Link href="/instructor/assignments" className="hover:text-[#0A5C4C]">
            Assignments
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold">Grade Student Submission</span>
        </span>
      );
    }
    if (pathname.startsWith("/instructor/assignments/") && pathname !== "/instructor/assignments") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link href="/instructor" className="hover:text-[#0A5C4C]">
            Instructor Workspace
          </Link>
          <span className="text-slate-300">/</span>
          <Link href="/instructor/assignments" className="hover:text-[#0A5C4C]">
            Assignments
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold">Submissions Queue</span>
        </span>
      );
    }
    if (pathname === "/instructor/assignments") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link href="/instructor" className="hover:text-[#0A5C4C]">
            Instructor Workspace
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold">Assignments &amp; Grading</span>
        </span>
      );
    }
    if (pathname.startsWith("/instructor/messages")) {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link href="/instructor" className="hover:text-[#0A5C4C]">
            Instructor Workspace
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold">Chatbox &amp; Communication</span>
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
        <Link href="/instructor" className="hover:text-[#0A5C4C]">
          Instructor Workspace
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 font-bold capitalize">
          {pathname.replace("/instructor/", "")}
        </span>
      </span>
    );
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#FBFBFA]/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left side: Mobile menu toggle + Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        {getBreadcrumbs()}
      </div>

      {/* Right side: Term & Timezone, Notifications, User Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-white border border-slate-200/80 px-3 py-1.5 rounded-full shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Fall Term 2026 · America/New_York (ET)</span>
        </div>

        {/* Notifications */}
        <Link
          href="/instructor/messages"
          className="relative p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-white hover:border-slate-200 border border-transparent transition-all"
          aria-label="Messages"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#0A5C4C]" />
        </Link>

        {/* User Avatar Chip */}
        <div className="flex items-center gap-2 pl-1">
          <div className="w-8 h-8 rounded-full bg-[#E5EAE8] border border-slate-200 text-[#0A5C4C] font-bold text-xs flex items-center justify-center font-display shadow-2xs">
            {auth?.avatar || (auth?.name ? auth.name.slice(0, 2).toUpperCase() : "LC")}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-bold text-slate-800 leading-tight">
              {auth?.name || "Lin Chen"}
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold">
              Course Instructor
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
