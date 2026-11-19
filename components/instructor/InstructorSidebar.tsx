"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  LayoutDashboard,
  FileCheck2,
  MessageSquare,
  LogOut,
  ExternalLink,
  X,
  Menu,
  GraduationCap,
  Sparkles,
  Layers,
  Settings,
} from "lucide-react";
import { getStoredAuth, setStoredAuth } from "@/lib/api/client";
import { instructorStore, Instructor } from "@/lib/instructorStore";
import { signOut } from "next-auth/react";

interface InstructorSidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export function InstructorSidebar({
  mobileOpen = false,
  setMobileOpen,
}: InstructorSidebarProps) {
  const pathname = usePathname();
  const [currentInstructor, setCurrentInstructor] = useState<Instructor | null>(null);

  useEffect(() => {
    const auth = getStoredAuth();
    if (auth?.email) {
      const ins = instructorStore.getInstructorByEmail(auth.email);
      if (ins) {
        setCurrentInstructor(ins);
        return;
      }
    }
    // Default to Lin Chen
    const defaultIns = instructorStore.getInstructorById("INS-101");
    if (defaultIns) setCurrentInstructor(defaultIns);
  }, []);

  const navItems = [
    {
      name: "Dashboard Overview",
      href: "/instructor",
      icon: LayoutDashboard,
      active: pathname === "/instructor",
    },
    {
      name: "Course Outlines",
      href: "/instructor/courses",
      icon: BookOpen,
      active: pathname.startsWith("/instructor/courses"),
    },
    {
      name: "Assignments & Grading",
      href: "/instructor/assignments",
      icon: FileCheck2,
      active: pathname.startsWith("/instructor/assignments"),
    },
    {
      name: "Chatbox & Messages",
      href: "/instructor/messages",
      icon: MessageSquare,
      active: pathname.startsWith("/instructor/messages"),
      badge: "2",
    },
  ];

  const handleLogout = async () => {
    document.cookie = "srs_user_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setStoredAuth(null);
    await signOut({ callbackUrl: "/login" });
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between bg-[#0B1E2B] text-slate-300 w-64 select-none">
      {/* Top Brand Header */}
      <div>
        <div className="p-5 flex items-center justify-between border-b border-slate-800/80">
          <Link href="/instructor" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0A5C4C] text-white flex items-center justify-center font-black shadow-xs">
              <GraduationCap className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-white font-display">
                fun &amp; learn
              </span>
            </div>
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
            Instructor
          </span>
        </div>

        {/* Section title */}
        <div className="px-5 pt-5 pb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Teacher Workspace
          </span>
        </div>

        {/* Navigation items */}
        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen && setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  item.active
                    ? "bg-[#16384C] text-white font-bold shadow-xs border border-teal-500/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      item.active ? "text-emerald-400" : "text-slate-400"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="w-5 h-5 rounded-full bg-[#0A5C4C] text-emerald-100 text-[10px] font-bold flex items-center justify-center shrink-0 shadow-2xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Actions */}
      <div className="p-3 border-t border-slate-800/80 space-y-2">
        {/* Course Access Summary Box */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 text-[11px] space-y-1">
          <div className="text-slate-400 flex items-center justify-between">
            <span>Assigned Courses:</span>
            <span className="text-emerald-400 font-bold">
              {currentInstructor?.assignedCourses?.length || 2} Programs
            </span>
          </div>
          <div className="text-[10px] text-slate-500">
            Course access is assigned by Admin.
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
          <div className="w-8 h-8 rounded-full bg-[#0A5C4C] text-white font-bold text-xs flex items-center justify-center shrink-0">
            {currentInstructor?.avatar || "LC"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white truncate">
              {currentInstructor?.name || "Lin Chen"}
            </div>
            <div className="text-[10px] text-emerald-400 truncate">
              Course Instructor
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            title="Sign out"
            className="text-slate-400 hover:text-rose-400 p-1 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Return to website */}
        <div className="flex items-center justify-between px-2 pt-1 text-[11px]">
          <Link
            href="/"
            className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <Link
            href="/admin"
            className="text-slate-400 hover:text-teal-300 transition-colors text-[10px]"
          >
            Admin Switch
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex"
          onClick={() => setMobileOpen && setMobileOpen(false)}
        >
          <div
            className="relative h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {navContent}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block shrink-0 sticky top-0 h-screen">
        {navContent}
      </aside>
    </>
  );
}
