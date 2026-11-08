"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  LayoutDashboard,
  GraduationCap,
  Calendar,
  FileCheck2,
  TrendingUp,
  MessageSquare,
  Library,
  LifeBuoy,
  UserCircle2,
  ExternalLink,
  ChevronDown,
  LogOut,
  X,
  Menu,
  PlusCircle,
  CreditCard,
  Settings,
} from "lucide-react";

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export function Sidebar({ mobileOpen = false, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeAccount, setActiveAccount] = useState<"parent" | "student">("parent");

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      name: "My learning",
      href: "/dashboard/my-learning",
      icon: GraduationCap,
      active: pathname.startsWith("/dashboard/my-learning"),
    },
    {
      name: "Schedule",
      href: "/dashboard/schedule",
      icon: Calendar,
      active: pathname.startsWith("/dashboard/schedule"),
    },
    {
      name: "Assignments",
      href: "/dashboard/assignments",
      icon: FileCheck2,
      active: pathname.startsWith("/dashboard/assignments"),
    },
    {
      name: "Progress",
      href: "/dashboard/progress",
      icon: TrendingUp,
      active: pathname === "/dashboard/progress",
    },
    {
      name: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
      active: pathname === "/dashboard/messages",
      badge: "2",
    },
    {
      name: "Learning library",
      href: "/dashboard/library",
      icon: Library,
      active: pathname === "/dashboard/library",
    },
    {
      name: "Enrollment",
      href: "/dashboard/enrollment",
      icon: PlusCircle,
      active: pathname.startsWith("/dashboard/enrollment"),
    },
    {
      name: "Billing",
      href: "/dashboard/billing",
      icon: CreditCard,
      active: pathname.startsWith("/dashboard/billing"),
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between bg-white border-r border-slate-200/90 w-64 lg:w-72 select-none">
      {/* Top brand & nav */}
      <div className="p-5 lg:p-6 pb-2">
        {/* Brand Logo */}
        <div className="flex items-center justify-between mb-7">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-[#0A5C4C] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-xl font-black tracking-tight text-[#0B1E2B] font-display">
              fun & learn
            </span>
          </Link>

          {setMobileOpen && (
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Workspace section title */}
        <div className="mb-2 px-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Student Workspace
          </span>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen && setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  item.active
                    ? "bg-[#EAF5F2] text-[#0A5C4C]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      item.active ? "text-[#0A5C4C]" : "text-slate-400"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#0A5C4C] text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Middle & Bottom section */}
      <div className="p-5 lg:p-6 pt-2 space-y-4">
        {/* Help yellow card */}
        <div className="bg-[#FAF7EC] border border-[#ECE5CD] rounded-2xl p-4 space-y-1.5">
          <div className="text-xs font-bold text-amber-950 font-display">
            A little help goes a long way
          </div>
          <p className="text-[11px] text-amber-900/80 leading-relaxed font-sans">
            Questions about lessons or getting connected? We can help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0A5C4C] hover:underline pt-0.5"
          >
            <span>Contact support</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Secondary quick links */}
        <div className="space-y-1 px-1">
          <Link
            href="/dashboard/settings"
            className="flex items-center justify-between text-xs font-medium text-slate-500 hover:text-[#0A5C4C] py-1 transition-colors"
          >
            <span>Family profile &amp; settings</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>
          <Link
            href="/dashboard/help"
            className="flex items-center justify-between text-xs font-medium text-slate-500 hover:text-[#0A5C4C] py-1 transition-colors"
          >
            <span>Help &amp; support</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>
          <Link
            href="/"
            className="flex items-center justify-between text-xs font-semibold text-[#0A5C4C] hover:underline py-1 transition-colors"
          >
            <span>Back to website</span>
            <ExternalLink className="w-3 h-3 text-[#0A5C4C]" />
          </Link>
        </div>

        {/* User Account Switcher Widget */}
        <div className="relative pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#E5EAE8] text-[#0A5C4C] font-bold text-xs flex items-center justify-center font-display shrink-0 border border-slate-200">
                {activeAccount === "parent" ? "MT" : "ET"}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {activeAccount === "parent" ? "May Thant" : "Emma Thant"}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {activeAccount === "parent" ? "Parent account" : "Grade 8 · Student"}
                </div>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-2xl shadow-lg border border-slate-200/90 p-2 space-y-1 text-xs z-50">
              <div className="px-3 py-1.5 text-slate-500 border-b border-slate-100 text-[11px]">
                Switch account view:
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveAccount("parent");
                  setProfileDropdownOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                  activeAccount === "parent" ? "bg-[#EAF5F2] text-[#0A5C4C] font-bold" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] flex items-center justify-center font-bold">
                  MT
                </div>
                <span>May Thant (Parent)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveAccount("student");
                  setProfileDropdownOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                  activeAccount === "student" ? "bg-[#EAF5F2] text-[#0A5C4C] font-bold" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#E5EAE8] text-[#0A5C4C] text-[10px] flex items-center justify-center font-bold">
                  ET
                </div>
                <span>Emma Thant (Student)</span>
              </button>
              <div className="pt-1 border-t border-slate-100">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Account settings</span>
                </Link>
                <Link
                  href="/"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>Sign out</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop static sidebar */}
      <aside className="hidden lg:block shrink-0 sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen && setMobileOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

