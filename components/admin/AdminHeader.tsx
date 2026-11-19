"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Bell, Clock, ArrowUpRight, LogOut, ChevronDown, ShieldCheck, GraduationCap, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { setStoredAuth } from "@/lib/api/client";

export function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    setMenuOpen(false);
    document.cookie = "srs_user_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setStoredAuth(null);
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Search Bar */}
      <div className="flex-1 max-w-md ml-10 lg:ml-0">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students, tutors, lessons... ⌘K"
            className="w-full pl-9 pr-12 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 shadow-2xs font-mono">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>All times in ET</span>
        </div>

        <Link
          href="/dashboard"
          className="hidden md:flex items-center gap-1 text-xs text-teal-800 bg-teal-50 hover:bg-teal-100 font-semibold px-2.5 py-1 rounded-lg border border-teal-200/60 transition-colors"
          title="Open student test workspace"
        >
          <span>Student View</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>

        {/* Notifications */}
        <button
          type="button"
          className="relative p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
        </button>

        {/* User avatar menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-1.5 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#0B1E2B] text-white font-bold text-xs flex items-center justify-center shadow-xs">
              JL
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 text-xs z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-100">
                <div className="font-bold text-slate-900">Jamie Lee</div>
                <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Platform Administrator</span>
                </div>
              </div>
              <div className="py-1">
                <Link
                  href="/instructor"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>Instructor Workspace</span>
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Student Workspace</span>
                </Link>
              </div>
              <div className="pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 text-left cursor-pointer transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

