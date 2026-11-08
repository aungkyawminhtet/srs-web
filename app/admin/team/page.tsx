"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Plus,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  Users,
  SlidersHorizontal,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

export default function AdminTeamPage() {
  const [selectedTab, setSelectedTab] = useState("team");
  const [searchQuery, setSearchQuery] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Coordinator");

  const staff = [
    {
      name: "Jamie Lee",
      sub: "Organization administration",
      role: "Administrator",
      scope: "All operations",
      lastActive: "Today · 3:45 PM",
      action: "View access",
    },
    {
      name: "Sofia Diaz",
      sub: "Student support & consultation follow-ups",
      role: "Coordinator",
      scope: "Families & lessons",
      lastActive: "Today · 3:10 PM",
      action: "Edit access",
    },
    {
      name: "Morgan Reed",
      sub: "Billing operations",
      role: "Finance",
      scope: "Billing & reports",
      lastActive: "Today · 2:25 PM",
      action: "Review access",
    },
    {
      name: "Avery Stone",
      sub: "Curriculum quality",
      role: "Content editor",
      scope: "Learning & website",
      lastActive: "Yesterday",
      action: "Edit access",
    },
    {
      name: "Sam Taylor",
      sub: "Family support",
      role: "Coordinator",
      scope: "Families & lessons",
      lastActive: "Yesterday",
      action: "Edit access",
    },
  ];

  const permissionsMatrix = [
    {
      capability: "Families & student records",
      admin: "Manage",
      coord: "Manage",
      finance: "Billing contacts",
      content: "No access",
      tutor: "Assigned learners",
      tutorHighlight: true,
    },
    {
      capability: "Lessons & attendance",
      admin: "Manage",
      coord: "Manage",
      finance: "Read totals",
      content: "No access",
      tutor: "Assigned lessons",
      tutorHighlight: true,
    },
    {
      capability: "Invoices & refunds",
      admin: "Manage / approve",
      coord: "Read status only",
      finance: "Manage / approve",
      content: "No access",
      tutor: "No access",
    },
    {
      capability: "Learning & website content",
      admin: "Publish",
      coord: "Read",
      finance: "No access",
      content: "Edit / review",
      tutor: "Own learning drafts",
      tutorHighlight: true,
    },
    {
      capability: "Team, settings & audit",
      admin: "Manage",
      coord: "Own activity only",
      finance: "Finance audit",
      content: "Own activity only",
      tutor: "Own activity only",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          Administration / Thursday, November 5, 2026
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] font-display">
              Team & permissions
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Give every colleague the access they need, and nothing more.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Review access</span>
            </button>
            <button
              type="button"
              className="px-3.5 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Invite team member</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Active team members</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">6</div>
          <div className="text-[11px] text-teal-700 font-medium mt-1">
            Administration & operations staff
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Pending invitations</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">2</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Invitations expire after 7 days
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Permission roles</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">5</div>
          <div className="text-[11px] text-teal-700 font-medium mt-1">
            Includes scoped tutor access
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Access review due</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">1</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            Finance role · Review by Nov 10
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200/80 pb-2">
        {[
          { id: "team", label: "Team", count: 6 },
          { id: "invites", label: "Invitations", count: 2 },
          { id: "roles", label: "Role permissions", count: 0 },
          { id: "review", label: "Access review", count: 0 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedTab === tab.id
                ? "bg-[#0B1E2B] text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            {tab.label} {tab.count > 0 && <span className="opacity-70 ml-1 font-normal">{tab.count}</span>}
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search staff name or role"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Select defaultValue="Role: All">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Role: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Role: All">Role: All</SelectItem>
              <SelectItem value="Administrator">Administrator</SelectItem>
              <SelectItem value="Coordinator">Coordinator</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Content editor">Content editor</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Status: Active">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Status: Active" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Status: Active">Status: Active</SelectItem>
              <SelectItem value="Invited">Invited</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Scope: Organization">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Scope: Organization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Scope: Organization">Scope: Organization</SelectItem>
              <SelectItem value="Scope: Lessons">Scope: Lessons</SelectItem>
            </SelectContent>
          </Select>

          <button
            onClick={() => setSearchQuery("")}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Grid: Staff Directory + Invite Colleague Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Staff directory table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0B1E2B]">Staff directory</h2>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>View access history</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <Table className="w-full text-left text-xs">
              <TableHeader className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <TableRow>
                  <TableHead className="py-3 px-4 font-bold text-slate-500">Team Member</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">Role</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">Scope</TableHead>
                  <TableHead className="py-3 px-3 font-bold text-slate-500">Last Active</TableHead>
                  <TableHead className="py-3 px-4 text-right font-bold text-slate-500">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100">
                {staff.map((s, idx) => (
                  <TableRow key={idx} className="hover:bg-slate-50/80 cursor-pointer transition-colors">
                    <TableCell className="py-3 px-4">
                      <div className="font-bold text-[#0B1E2B]">{s.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{s.sub}</div>
                    </TableCell>
                    <TableCell className="py-3 px-3">
                      <span className="font-semibold text-slate-800">{s.role}</span>
                    </TableCell>
                    <TableCell className="py-3 px-3 text-slate-600">{s.scope}</TableCell>
                    <TableCell className="py-3 px-3 text-slate-500">{s.lastActive}</TableCell>
                    <TableCell className="py-3 px-4 text-right">
                      <span className="font-semibold text-teal-800 hover:underline">
                        {s.action}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="p-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Showing 5 of 6 active staff · Tutors are managed in the tutor roster</span>
            <Pagination className="w-auto mx-0 justify-end">
              <PaginationContent className="gap-1 text-xs">
                <PaginationItem>
                  <PaginationPrevious href="#" text="" className="h-7 w-7 p-0 justify-center text-slate-600 hover:text-slate-900 cursor-pointer" />
                </PaginationItem>
                <PaginationItem>
                  <span className="px-2 text-xs font-bold text-slate-700 select-none">Page 1</span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" text="" className="h-7 w-7 p-0 justify-center text-slate-600 hover:text-slate-900 cursor-pointer" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* Invite Colleague Drawer (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Invitation Preview · Not Sent
          </div>

          <div>
            <h3 className="text-xl font-black text-[#0B1E2B] font-display">
              Invite a colleague
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Work email - required
              </label>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Add a colleague's email"
                className="w-full bg-slate-50 border border-rose-300 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-rose-400"
              />
              <span className="text-[10px] text-rose-600 block mt-1">
                Enter a valid email address before sending an invitation
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Role
              </label>
              <Select
                value={inviteRole}
                onValueChange={(val) => val && setInviteRole(val)}
              >
                <SelectTrigger className="w-full bg-slate-50 border-slate-200 text-xs text-slate-800 font-medium h-9">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Coordinator">Coordinator</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Content editor">Content editor</SelectItem>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-slate-700">
              <div className="font-bold text-[11px]">Included access</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Manage families, consultations and lesson schedules. No refunds, role changes or organization settings.
              </p>
            </div>

            <Alert className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <AlertDescription className="text-xs text-amber-900 leading-snug">
                The recipient must accept their invitation. No password or credentials are created here.
              </AlertDescription>
            </Alert>
          </div>

          <button
            type="button"
            className="w-full py-2.5 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Review invitation
          </button>
        </div>
      </div>

      {/* Bottom Section: Staff Access Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Default role permissions · Scoped access may be narrower
            </div>
            <h2 className="text-sm font-bold text-[#0B1E2B] mt-0.5">
              Staff access matrix
            </h2>
          </div>
          <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
            <span>Manage roles</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full text-left text-xs">
            <TableHeader className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <TableRow>
                <TableHead className="py-3 px-4 font-bold text-slate-500">Capability</TableHead>
                <TableHead className="py-3 px-3 font-bold text-slate-500">Administrator</TableHead>
                <TableHead className="py-3 px-3 font-bold text-slate-500">Coordinator</TableHead>
                <TableHead className="py-3 px-3 font-bold text-slate-500">Finance</TableHead>
                <TableHead className="py-3 px-3 font-bold text-slate-500">Content Editor</TableHead>
                <TableHead className="py-3 px-4 font-bold text-slate-500">Tutor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-100">
              {permissionsMatrix.map((row, idx) => (
                <TableRow key={idx} className="hover:bg-slate-50/80">
                  <TableCell className="py-3 px-4 font-bold text-[#0B1E2B]">{row.capability}</TableCell>
                  <TableCell className="py-3 px-3 text-slate-700 font-medium">{row.admin}</TableCell>
                  <TableCell className="py-3 px-3 text-slate-700 font-medium">{row.coord}</TableCell>
                  <TableCell className="py-3 px-3 text-slate-700 font-medium">{row.finance}</TableCell>
                  <TableCell className="py-3 px-3 text-slate-700 font-medium">{row.content}</TableCell>
                  <TableCell className="py-3 px-4">
                    <span className={row.tutorHighlight ? "text-teal-700 font-bold" : "text-slate-500 font-medium"}>
                      {row.tutor}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Alert className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-xl flex items-start gap-2.5 text-xs text-amber-900 mt-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <AlertDescription className="text-xs text-amber-900 leading-snug">
            Access changes require review. You cannot remove the final administrator or grant a role beyond your own permissions.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

