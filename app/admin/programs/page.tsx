"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Plus,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  FileText,
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

export default function AdminProgramsPage() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProgram, setEditingProgram] = useState({
    id: "PR-001",
    name: "Algebra I",
    subject: "Mathematics",
    gradeRange: "7-10",
    promise:
      "Build confidence with equations, graphing and real-world word problems.",
    delivery: "One-to-one · 60 min · 8 lessons / month",
    price: "$240/month",
  });

  const programs = [
    {
      id: "PR-001",
      name: "Algebra I",
      subject: "Mathematics",
      grades: "7-10",
      format: "One-to-one",
      enrolled: 32,
      state: "Published",
      action: "Edit",
      promise:
        "Build confidence with equations, graphing and real-world word problems.",
      delivery: "One-to-one · 60 min · 8 lessons / month",
    },
    {
      id: "PR-002",
      name: "Math foundations",
      subject: "Mathematics",
      grades: "4-8",
      format: "Both formats",
      enrolled: 28,
      state: "Published",
      action: "Edit",
      promise:
        "Master fractions, decimals, ratios and foundational number sense.",
      delivery: "Both formats · 60 min · 4-8 lessons / month",
    },
    {
      id: "PR-003",
      name: "Reading & writing",
      subject: "English",
      grades: "6-9",
      format: "Group · 3–5",
      enrolled: 24,
      state: "Published",
      action: "Edit",
      promise:
        "Strengthen essay organization, analytical reading and persuasive voice.",
      delivery: "Group · 60 min · 4 lessons / month",
    },
    {
      id: "PR-004",
      name: "Creative computing",
      subject: "Technology",
      grades: "5-9",
      format: "Both formats",
      enrolled: 18,
      state: "Published",
      action: "Edit",
      promise:
        "Learn Python and game logic with supportive project-based mentoring.",
      delivery: "Both formats · 60 min · 4 lessons / month",
    },
    {
      id: "PR-005",
      name: "Science explorers",
      subject: "Science",
      grades: "3-6",
      format: "Both formats",
      enrolled: 22,
      state: "Published",
      action: "Edit",
      promise:
        "Hands-on inquiry into ecosystems, planetary science and simple physics.",
      delivery: "Both formats · 60 min · 4 lessons / month",
    },
    {
      id: "PR-006",
      name: "Reading foundations",
      subject: "English",
      grades: "K-3",
      format: "One-to-one",
      enrolled: 12,
      state: "Published",
      action: "Edit",
      promise:
        "Phonics, guided reading, fluency and confident early literacy habits.",
      delivery: "One-to-one · 45 min · 8 lessons / month",
    },
    {
      id: "PR-013",
      name: "SAT math readiness",
      subject: "Test preparation",
      grades: "10-12",
      format: "Group · 3–5",
      enrolled: 0,
      state: "Draft",
      action: "Review",
      promise:
        "Targeted digital SAT strategy, high-yield practice and timed drills.",
      delivery: "Group · 75 min · 4 lessons / month",
    },
  ];

  const filteredPrograms = programs.filter((p) => {
    if (selectedTab === "published" && p.state !== "Published") return false;
    if (selectedTab === "drafts" && p.state !== "Draft") return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.subject.toLowerCase().includes(q) ||
        p.grades.toLowerCase().includes(q)
      );
    }
    return true;
  });

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
              Programs & subjects
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Keep learning pathways clear, age-appropriate and ready to enroll.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>Manage subjects</span>
            </button>
            <button
              type="button"
              className="px-3.5 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create program</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Published programs</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">12</div>
          <div className="text-[11px] text-teal-700 font-medium mt-1">
            6 subjects · Kindergarten–Grade 12
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Draft programs</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">3</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            2 ready for curriculum review
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Active enrollments</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">146</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Students may have multiple plans
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Delivery formats</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">2</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Live one-to-one & groups of 3–5
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200/80 pb-2">
        {[
          { id: "all", label: "All programs", count: 15 },
          { id: "published", label: "Published", count: 12 },
          { id: "drafts", label: "Drafts", count: 3 },
          { id: "subjects", label: "Subjects", count: 6 },
          { id: "archived", label: "Archived", count: 0 },
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
            placeholder="Search program, subject or grade range"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Select defaultValue="Subject: All">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Subject: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Subject: All">Subject: All</SelectItem>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Format: All">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Format: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Format: All">Format: All</SelectItem>
              <SelectItem value="One-to-one">One-to-one</SelectItem>
              <SelectItem value="Group · 3–5">Group · 3–5</SelectItem>
              <SelectItem value="Both formats">Both formats</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Status: All">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Status: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Status: All">Status: All</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
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

      {/* Main Grid: Catalog Table + Edit Program Drawer Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Catalog table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0B1E2B]">Program catalog</h2>
            <Link
              href="/programs"
              className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1"
            >
              <span>View public catalog</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto flex-1">
            <Table className="text-left text-xs">
              <TableHeader className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <TableRow>
                  <TableHead className="py-3 px-4 text-slate-400 font-bold">Program / Subject</TableHead>
                  <TableHead className="py-3 px-3 text-slate-400 font-bold">Grades</TableHead>
                  <TableHead className="py-3 px-3 text-slate-400 font-bold">Format</TableHead>
                  <TableHead className="py-3 px-3 text-slate-400 font-bold">Enrolled</TableHead>
                  <TableHead className="py-3 px-3 text-slate-400 font-bold">State</TableHead>
                  <TableHead className="py-3 px-4 text-right text-slate-400 font-bold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100">
                {filteredPrograms.map((item) => {
                  const isSelected = editingProgram.name === item.name;
                  return (
                    <TableRow
                      key={item.id}
                      onClick={() =>
                        setEditingProgram({
                          id: item.id,
                          name: item.name,
                          subject: item.subject,
                          gradeRange: item.grades,
                          promise: item.promise,
                          delivery: item.delivery,
                          price: "$240/month",
                        })
                      }
                      className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                        isSelected ? "bg-teal-50/50" : ""
                      }`}
                    >
                      <TableCell className="py-3 px-4">
                        <div className="font-bold text-[#0B1E2B]">{item.name}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {item.subject} · {item.id}
                        </div>
                      </TableCell>
                      <TableCell className="py-3 px-3 text-slate-700 font-medium">
                        {item.grades}
                      </TableCell>
                      <TableCell className="py-3 px-3 text-slate-600">{item.format}</TableCell>
                      <TableCell className="py-3 px-3 font-semibold text-slate-800">
                        {item.enrolled}
                      </TableCell>
                      <TableCell className="py-3 px-3">
                        <Badge
                          variant="secondary"
                          className={`border-none font-bold text-[10px] ${
                            item.state === "Published"
                              ? "bg-teal-100 text-teal-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {item.state}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3 px-4 text-right">
                        <span className="font-semibold text-teal-800 hover:underline">
                          {item.action}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="p-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Showing {filteredPrograms.length} of 15 programs</span>
            <Pagination className="mx-0 w-auto">
              <PaginationContent className="gap-1 font-bold text-slate-600">
                <PaginationItem>
                  <PaginationPrevious href="#" className="h-7 px-2 text-xs hover:bg-slate-100" />
                </PaginationItem>
                <PaginationItem>
                  <span className="px-2 text-xs">Page 1</span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" className="h-7 px-2 text-xs hover:bg-slate-100" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* Edit Program Drawer Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
            Published · Changes not yet live
          </div>

          <div>
            <h3 className="text-xl font-black text-[#0B1E2B] font-display">
              Edit {editingProgram.name}
            </h3>
          </div>

          {/* Form */}
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Program name
              </label>
              <input
                type="text"
                value={editingProgram.name}
                onChange={(e) =>
                  setEditingProgram({ ...editingProgram, name: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Subject
                </label>
                <Select
                  value={editingProgram.subject}
                  onValueChange={(val) =>
                    val && setEditingProgram({
                      ...editingProgram,
                      subject: val,
                    })
                  }
                >
                  <SelectTrigger className="w-full bg-slate-50 border-slate-200 text-xs text-slate-800 font-medium h-9">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Test preparation">Test preparation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Grade range
                </label>
                <input
                  type="text"
                  value={editingProgram.gradeRange}
                  onChange={(e) =>
                    setEditingProgram({
                      ...editingProgram,
                      gradeRange: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Learning promise
              </label>
              <textarea
                rows={3}
                value={editingProgram.promise}
                onChange={(e) =>
                  setEditingProgram({
                    ...editingProgram,
                    promise: e.target.value,
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 leading-relaxed font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Delivery & duration
              </label>
              <input
                type="text"
                value={editingProgram.delivery}
                onChange={(e) =>
                  setEditingProgram({
                    ...editingProgram,
                    delivery: e.target.value,
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium"
              />
            </div>

            <p className="text-[11px] text-slate-400">
              Current family plan: $240/month. Price changes apply to new enrollments only unless explicitly reviewed.
            </p>

            <Alert className="p-3 bg-teal-50/80 border-teal-200/80 rounded-xl flex items-start gap-2.5 text-xs text-teal-900">
              <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <AlertDescription className="text-xs text-teal-900">
                Required before publishing: learning outcomes, eligible tutors and a family-facing summary.
              </AlertDescription>
            </Alert>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              className="py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Save draft
            </button>
            <button
              type="button"
              className="py-2.5 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Review publish
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Publish checklist & Subject structure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Publish checklist */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E2B]">Publish checklist</h3>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Preview changes</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0B1E2B]">
                  Algebra I · Revised learning outcomes
                </span>
                <Badge variant="secondary" className="border-none font-bold text-[10px] bg-teal-100 text-teal-800">
                  Ready to review
                </Badge>
              </div>
              <div className="text-[11px] text-slate-500">
                Draft revision by Jamie Lee · Nov 5, 2:15 PM ET · Published version remains visible.
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0B1E2B]">
                  SAT math readiness · No eligible tutor yet
                </span>
                <Badge variant="secondary" className="border-none font-bold text-[10px] bg-rose-100 text-rose-800">
                  Blocked
                </Badge>
              </div>
              <div className="text-[11px] text-slate-500">
                Assign an approved tutor before offering the program to families.
              </div>
              <Link
                href="/admin/tutors"
                className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1 mt-1"
              >
                <span>Add tutor eligibility</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Subject structure */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E2B]">Subject structure</h3>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Edit taxonomy</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 pt-1">
            <div className="text-xs text-slate-700 font-semibold flex flex-wrap gap-2">
              {[
                "Mathematics",
                "English",
                "Science",
                "Technology",
                "Languages",
                "Test preparation",
              ].map((subj) => (
                <span
                  key={subj}
                  className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 border border-slate-200/60"
                >
                  {subj}
                </span>
              ))}
            </div>

            <Alert className="p-3 bg-amber-50/80 border-amber-200/70 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <AlertDescription className="text-xs text-amber-900">
                Group programs must support 3–5 learners. A class needs at least 3 confirmed enrollments before it can start.
              </AlertDescription>
            </Alert>

            <p className="text-[11px] text-slate-400">
              Archiving a program keeps existing family lesson records intact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

