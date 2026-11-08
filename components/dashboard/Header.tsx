"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, ArrowRight } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();

  // Dynamic breadcrumb computation
  const getBreadcrumbs = () => {
    if (pathname === "/dashboard") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <span>My workspace</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold">Dashboard</span>
        </span>
      );
    }
    if (pathname === "/dashboard/my-learning") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link href="/dashboard" className="hover:text-[#0A5C4C]">My workspace</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold">My learning</span>
        </span>
      );
    }
    if (pathname === "/dashboard/my-learning/workspace") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link href="/dashboard" className="hover:text-[#0A5C4C]">My workspace</Link>
          <span className="text-slate-300">/</span>
          <Link href="/dashboard/my-learning" className="hover:text-[#0A5C4C]">My learning</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold">Class workspace</span>
        </span>
      );
    }
    if (pathname === "/dashboard/schedule") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link href="/dashboard" className="hover:text-[#0A5C4C]">Family workspace</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold">Schedule</span>
        </span>
      );
    }
    if (pathname === "/dashboard/schedule/lesson-details") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link href="/dashboard" className="hover:text-[#0A5C4C]">My workspace</Link>
          <span className="text-slate-300">/</span>
          <Link href="/dashboard/schedule" className="hover:text-[#0A5C4C]">Schedule</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold">Lesson details</span>
        </span>
      );
    }
    if (pathname === "/dashboard/assignments/details") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link href="/dashboard" className="hover:text-[#0A5C4C]">My workspace</Link>
          <span className="text-slate-300">/</span>
          <Link href="/dashboard/assignments" className="hover:text-[#0A5C4C]">Assignments</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold">Assignment details &amp; feedback</span>
        </span>
      );
    }
    if (pathname === "/dashboard/enrollment") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link href="/dashboard" className="hover:text-[#0A5C4C]">Family workspace</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold">Enrollment</span>
        </span>
      );
    }
    if (pathname === "/dashboard/billing") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link href="/dashboard" className="hover:text-[#0A5C4C]">Family workspace</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold">Billing</span>
        </span>
      );
    }
    if (pathname === "/dashboard/settings") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link href="/dashboard" className="hover:text-[#0A5C4C]">Family workspace</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold">Settings</span>
        </span>
      );
    }
    if (pathname === "/dashboard/help") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link href="/dashboard" className="hover:text-[#0A5C4C]">Family workspace</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold">Help &amp; support</span>
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
        <Link href="/dashboard" className="hover:text-[#0A5C4C]">My workspace</Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 font-bold capitalize">
          {pathname.replace("/dashboard/", "")}
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

      {/* Right side: Language & Timezone, Notifications, User avatar */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:flex items-center text-xs font-medium text-slate-500 bg-white border border-slate-200/80 px-3 py-1.5 rounded-full shadow-2xs">
          <span>English · ET (UTC-5)</span>
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="relative p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-white hover:border-slate-200 border border-transparent transition-all"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#0A5C4C]" />
        </button>

        {/* User Avatar Circle */}
        <div className="w-8 h-8 rounded-full bg-[#E5EAE8] border border-slate-200 text-[#0A5C4C] font-bold text-xs flex items-center justify-center font-display cursor-pointer hover:ring-2 hover:ring-[#0A5C4C]/20 transition-all">
          ET
        </div>
      </div>
    </header>
  );
}

