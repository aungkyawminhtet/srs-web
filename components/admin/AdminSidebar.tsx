"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  GraduationCap,
  MessageSquare,
  BookOpen,
  CreditCard,
  BarChart3,
  CalendarClock,
  Library,
  CheckSquare,
  Mail,
  Globe,
  ShieldCheck,
  History,
  Settings,
  HelpCircle,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const adminNav = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Lessons", href: "/admin/lessons", icon: Calendar },
    { label: "Students & families", href: "/admin/students", icon: Users },
    { label: "Tutors", href: "/admin/tutors", icon: GraduationCap },
    { label: "Consultations", href: "/admin/consultations", icon: MessageSquare },
    { label: "Programs", href: "/admin/programs", icon: BookOpen },
    { label: "Payments", href: "/admin/payments", icon: CreditCard },
    { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  ];

  const manageNav = [
    { label: "Scheduling", href: "/admin/scheduling", icon: CalendarClock },
    { label: "Learning content", href: "/admin/content", icon: Library },
    { label: "Attendance & progress", href: "/admin/attendance", icon: CheckSquare },
    { label: "Communications", href: "/admin/communications", icon: Mail },
    { label: "Website content", href: "/admin/website", icon: Globe },
    { label: "Team & permissions", href: "/admin/team", icon: ShieldCheck },
    { label: "Activity history", href: "/admin/activity", icon: History },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  const navContent = (
    <div className="flex flex-col h-full bg-[#0B1E2B] text-slate-300 w-64 select-none">
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-slate-800/80">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#F4A261] text-[#0B1E2B] flex items-center justify-center font-black shadow-xs">
            <BookOpen className="w-4 h-4 text-[#0B1E2B]" />
          </div>
          <div>
            <span className="text-base font-black tracking-tight text-white font-display">
              fun & learn
            </span>
          </div>
        </Link>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-teal-300 border border-teal-500/30">
          Admin
        </span>
      </div>

      {/* Navigation Scroll */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 text-xs font-medium scrollbar-thin">
        {/* ADMIN WORKSPACE */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Admin Workspace
          </div>
          <div className="space-y-0.5">
            {adminNav.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                    active
                      ? "bg-[#16384C] text-white font-bold shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? "text-teal-400" : "text-slate-400"}`} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* MANAGE WORKSPACE */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Manage Workspace
          </div>
          <div className="space-y-0.5">
            {manageNav.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                    active
                      ? "bg-[#16384C] text-white font-bold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-slate-400" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer / Profile */}
      <div className="p-3 border-t border-slate-800/80 space-y-2">
        <Link
          href="/admin/settings"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 text-xs transition-colors"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Settings & help</span>
        </Link>

        {/* User Card */}
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-[#0B1E2B] font-bold text-xs flex items-center justify-center shrink-0">
            JL
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white truncate">Jamie Lee</div>
            <div className="text-[11px] text-slate-400 truncate">Administrator</div>
          </div>
          <Link
            href="/"
            title="Public site"
            className="text-slate-400 hover:text-teal-400 p-1"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 bg-[#0B1E2B] text-white rounded-xl shadow-lg border border-slate-700 cursor-pointer"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-xs flex"
          onClick={() => setMobileOpen(false)}
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

