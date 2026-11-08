"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Library,
  Plus,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  FolderOpen,
  FileText,
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

export default function AdminContentPage() {
  const [selectedTab, setSelectedTab] = useState("library");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedResource, setSelectedResource] = useState({
    id: "RES-031",
    title: "Practice 03",
    status: "Published · v1.2",
    docTitle: "Multi-step equations",
    instructions:
      "Show your steps. Check each solution by substituting it into the equation.",
    problems: ["1. 3x + 7 = 22", "2. 2(x - 4) = 10"],
    prompt: "Explain: What did you do first, and why?",
    details: "Emma Thant · Due today before 5:00 PM ET · About 15 min",
    skills:
      "Linear equations · Grades 7–10 · Tagged PDF · Reading order checked",
  });

  const resources = [
    {
      id: "RES-031",
      name: "Multi-step equations · Practice 03",
      sub: "Algebra I · 8 questions · Lin Chen",
      type: "Worksheet",
      version: "v1.2",
      state: "Published",
      action: "Preview",
      docTitle: "Multi-step equations",
      instructions:
        "Show your steps. Check each solution by substituting it into the equation.",
      problems: ["1. 3x + 7 = 22", "2. 2(x - 4) = 10"],
      prompt: "Explain: What did you do first, and why?",
      details: "Emma Thant · Due today before 5:00 PM ET · About 15 min",
      skills:
        "Linear equations · Grades 7–10 · Tagged PDF · Reading order checked",
    },
    {
      id: "RES-032",
      name: "Graph it: slope & intercepts",
      sub: "Algebra I · Interactive worksheet · Lin Chen",
      type: "Interactive",
      version: "v1.0",
      state: "Published",
      action: "Preview",
      docTitle: "Slope & Intercepts Interactive",
      instructions: "Drag points to plot the line and discover the slope m.",
      problems: ["Find y = 2x + 1", "Plot coordinates (0, 1) and (1, 3)"],
      prompt: "How does the y-intercept change when b is negative?",
      details: "Active in Algebra I curriculum · Interactive web applet",
      skills: "Graphing · Cartesian plane · Accessible screen-reader canvas",
    },
    {
      id: "RES-033",
      name: "Equation warm-up",
      sub: "Algebra I · Practice check · Lin Chen",
      type: "Quiz",
      version: "v2.1",
      state: "Published",
      action: "Preview",
      docTitle: "Equation Warm-Up Diagnostic",
      instructions: "Quick 8-question warm-up before live session.",
      problems: ["Balance both sides: 4x - 5 = 15", "Identify the constant term"],
      prompt: "Check your solution with inverse operations.",
      details: "Auto-graded practice · Results shared with tutor",
      skills: "Algebra I diagnostics · Instant tutor feedback",
    },
    {
      id: "RES-045",
      name: "Water & materials · Lesson guide",
      sub: "Science explorers · Thiri Aung",
      type: "Lesson guide",
      version: "v1.3",
      state: "Published",
      action: "Preview",
      docTitle: "Properties of Water & Household Materials",
      instructions: "Hands-on guided experiment protocol for Grade 3–6.",
      problems: ["Materials: cup of water, metal spoon, paper clip", "Record surface tension observations"],
      prompt: "Why did the surface tension resist immediate sinking?",
      details: "Science explorers kit required · Family-safe home protocol",
      skills: "Scientific method · Observation & journaling",
    },
    {
      id: "RES-058",
      name: "Find your evidence",
      sub: "Reading & writing · Daniel Brooks",
      type: "Worksheet",
      version: "v1.1",
      state: "In review",
      action: "Review",
      docTitle: "Textual Evidence & Analytical Claims",
      instructions: "Highlight quotes that directly support your central thesis.",
      problems: ["Identify claim in paragraph 2", "Select primary citation"],
      prompt: "Connect the quote back to the prompt in 2 sentences.",
      details: "Under review by Jamie Lee · Submitted Nov 4",
      skills: "Reading comprehension · Citation standards",
    },
    {
      id: "RES-062",
      name: "Loops & patterns",
      sub: "Creative computing · Alex Rivera",
      type: "Project",
      version: "v0.3",
      state: "Draft",
      action: "Edit",
      docTitle: "Repetition with For Loops",
      instructions: "Build a geometric spiral pattern using nested loops.",
      problems: ["Define loop counter i", "Step rotation angle by 45 degrees"],
      prompt: "Explain how changing step size affects the spiral geometry.",
      details: "Draft lesson plan · Not yet assigned to students",
      skills: "Computational thinking · Algorithm design",
    },
    {
      id: "RES-071",
      name: "Fractions in everyday life",
      sub: "Math foundations · Priya Shah",
      type: "PDF · 6 pages",
      version: "v1.0",
      state: "Check access",
      action: "Resolve",
      docTitle: "Fractions in Baking, Measurement and Time",
      instructions: "Real-world visual application booklet.",
      problems: ["Half-cup vs third-cup comparisons", "Elapsed time fractions"],
      prompt: "Calculate total ingredients when recipe is doubled.",
      details: "Accessibility flag: needs tagged PDF reading order verification",
      skills: "Fractions · Accessibility remediation pending",
    },
  ];

  const filteredResources = resources.filter((item) => {
    if (selectedTab === "in-review" && item.state !== "In review") return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.sub.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
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
              Learning content
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              A reviewed, reusable library for every live learning moment.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>Manage folders</span>
            </button>
            <button
              type="button"
              className="px-3.5 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add resource</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Published resources</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">248</div>
          <div className="text-[11px] text-teal-700 font-medium mt-1">
            Across 12 published programs
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Awaiting review</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">8</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            3 updated by tutors this week
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Assigned this week</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">86</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Worksheets, practice and lesson guides
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Accessibility checks</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">3</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Missing reading order or alt text
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200/80 pb-2">
        {[
          { id: "library", label: "Library", count: 256 },
          { id: "in-review", label: "In review", count: 8 },
          { id: "assignments", label: "Assignments", count: 0 },
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
            placeholder="Search title, skill or resource ID"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Select defaultValue="Program: All">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Program: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Program: All">Program: All</SelectItem>
              <SelectItem value="Algebra I">Algebra I</SelectItem>
              <SelectItem value="Science explorers">Science explorers</SelectItem>
              <SelectItem value="Reading & writing">Reading &amp; writing</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Type: All">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Type: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Type: All">Type: All</SelectItem>
              <SelectItem value="Worksheet">Worksheet</SelectItem>
              <SelectItem value="Interactive">Interactive</SelectItem>
              <SelectItem value="Quiz">Quiz</SelectItem>
              <SelectItem value="Project">Project</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Published & drafts">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Published & drafts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Published & drafts">Published & drafts</SelectItem>
              <SelectItem value="Published only">Published only</SelectItem>
              <SelectItem value="Drafts only">Drafts only</SelectItem>
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

      {/* Main Grid: Resource Library Table + Resource Preview Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Resource library table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0B1E2B]">Resource library</h2>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Bulk organize</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <Table className="text-left text-xs">
              <TableHeader className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <TableRow>
                  <TableHead className="py-3 px-4 text-slate-400 font-bold">Resource / Program</TableHead>
                  <TableHead className="py-3 px-3 text-slate-400 font-bold">Type</TableHead>
                  <TableHead className="py-3 px-3 text-slate-400 font-bold">Version</TableHead>
                  <TableHead className="py-3 px-3 text-slate-400 font-bold">State</TableHead>
                  <TableHead className="py-3 px-4 text-right text-slate-400 font-bold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100">
                {filteredResources.map((item) => {
                  const isSelected = selectedResource.title === item.name.split(" · ")[1] || selectedResource.docTitle === item.docTitle;
                  return (
                    <TableRow
                      key={item.id}
                      onClick={() =>
                        setSelectedResource({
                          id: item.id,
                          title: item.name.split(" · ")[1] || item.name,
                          status: `${item.state} · ${item.version}`,
                          docTitle: item.docTitle,
                          instructions: item.instructions,
                          problems: item.problems,
                          prompt: item.prompt,
                          details: item.details,
                          skills: item.skills,
                        })
                      }
                      className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                        isSelected ? "bg-teal-50/50" : ""
                      }`}
                    >
                      <TableCell className="py-3 px-4">
                        <div className="font-bold text-[#0B1E2B]">{item.name}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{item.sub}</div>
                      </TableCell>
                      <TableCell className="py-3 px-3 text-slate-700 font-medium">{item.type}</TableCell>
                      <TableCell className="py-3 px-3 text-slate-500 font-mono text-[11px]">{item.version}</TableCell>
                      <TableCell className="py-3 px-3">
                        <Badge
                          variant="secondary"
                          className={`border-none font-bold text-[10px] ${
                            item.state === "Published"
                              ? "bg-teal-100 text-teal-800"
                              : item.state === "In review"
                              ? "bg-amber-100 text-amber-800"
                              : item.state === "Check access"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-slate-100 text-slate-700"
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
            <span>Showing {filteredResources.length} of 256 library resources</span>
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

        {/* Selected Resource Preview Drawer (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Resource Preview · {selectedResource.id}
            </span>
            <Badge variant="secondary" className="border-none font-bold text-[10px] bg-teal-100 text-teal-800">
              {selectedResource.status}
            </Badge>
          </div>

          <div>
            <h3 className="text-xl font-black text-[#0B1E2B] font-display">
              {selectedResource.title}
            </h3>
          </div>

          {/* Worksheet mini document preview card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-3 font-sans">
            <div className="font-bold text-xs text-[#0B1E2B] border-b border-slate-200/60 pb-1.5">
              {selectedResource.docTitle}
            </div>
            <p className="text-[11px] text-slate-600 italic">
              {selectedResource.instructions}
            </p>
            <div className="space-y-1.5 font-mono text-xs text-slate-800 bg-white p-3 rounded-lg border border-slate-200/60">
              {selectedResource.problems.map((prob, idx) => (
                <div key={idx}>{prob}</div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              {selectedResource.prompt}
            </p>
          </div>

          {/* Details & Metadata */}
          <div className="space-y-2 text-xs">
            <div className="space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Assignment details
              </div>
              <p className="text-slate-700">{selectedResource.details}</p>
            </div>

            <div className="space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Skills & accessibility
              </div>
              <p className="text-slate-700">{selectedResource.skills}</p>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            Published resources are versioned. Updating a draft does not alter submitted student work.
          </p>

          <div className="space-y-2 pt-1">
            <button
              type="button"
              className="w-full py-2.5 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Open full resource
            </button>
            <button
              type="button"
              className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Create new version
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Review queue & Assignment oversight */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Review queue */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E2B]">Review queue</h3>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>All 8 resources</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0B1E2B]">
                  Find your evidence · v1.1
                </span>
                <Badge variant="secondary" className="border-none font-bold text-[10px] bg-amber-100 text-amber-800">
                  In review
                </Badge>
              </div>
              <div className="text-[11px] text-slate-500">
                Daniel Brooks · Submitted Nov 4 · Reviewer: Jamie Lee
              </div>
              <button className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer">
                <span>Review rubric & approve</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <Alert className="p-3 bg-amber-50/80 border-amber-200/70 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <AlertDescription className="text-xs text-amber-900">
                Fractions in everyday life needs a reading-order check before publishing.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Assignment oversight */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E2B]">Assignment oversight</h3>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>View assignments</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0B1E2B]">
                  Emma · Multi-step equations · Practice 03
                </span>
                <Badge variant="secondary" className="border-none font-bold text-[10px] bg-amber-100 text-amber-800">
                  Due today
                </Badge>
              </div>
              <div className="text-[11px] text-slate-500">
                Algebra I · 8 questions · Due today · Not yet submitted
              </div>
              <button className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer">
                <span>Open learner assignment</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0B1E2B]">
                  Emma · Equation warm-up
                </span>
                <Badge variant="secondary" className="border-none font-bold text-[10px] bg-teal-100 text-teal-800">
                  Reviewed
                </Badge>
              </div>
              <div className="text-[11px] text-slate-500">
                Reviewed by Lin · Feedback shared with family Nov 4
              </div>
              <button className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer">
                <span>Read tutor feedback</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

