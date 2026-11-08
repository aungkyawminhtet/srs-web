"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Plus,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  Eye,
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

export default function AdminWebsiteContentPage() {
  const [selectedTab, setSelectedTab] = useState("editor");
  const [headline, setHeadline] = useState("Big confidence. One small step at a time.");
  const [supportingCopy, setSupportingCopy] = useState(
    "Live online tutoring that meets your child where they are. Find the right support, from kindergarten through Grade 12."
  );
  const [buttonLabel, setButtonLabel] = useState("Find your learning plan");
  const [buttonDestination, setButtonDestination] = useState("/programs");
  const [seoDescription, setSeoDescription] = useState("");

  const pages = [
    {
      title: "Home",
      route: "/",
      locale: "English",
      version: "v3 · Nov 1",
      state: "Needs SEO",
      editedBy: "Jamie Lee · Today",
      action: "Continue edit",
    },
    {
      title: "Programs",
      route: "/programs",
      locale: "English",
      version: "v2 · Oct 28",
      state: "Ready for review",
      editedBy: "Sofia Diaz · Nov 4",
      action: "Review draft",
    },
    {
      title: "About Fun and Learn",
      route: "/about",
      locale: "English",
      version: "v1 · Oct 20",
      state: "No changes",
      editedBy: "Jamie Lee · Oct 28",
      action: "View live",
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
              Website content
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Review public-facing changes before they reach families.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>Open website preview</span>
            </Link>
            <button
              type="button"
              className="px-3.5 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create page</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Published pages</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">9</div>
          <div className="text-[11px] text-teal-700 font-medium mt-1">
            Digital public website
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Unpublished revisions</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">3</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Live content stays unchanged
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Translations in review</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">2</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            Burmese & Spanish · Not live
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Consent checks</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">1</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            One missing SEO description
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200/80 pb-2">
        {[
          { id: "editor", label: "Page editor", count: 0 },
          { id: "pages", label: "Pages", count: 9 },
          { id: "nav", label: "Navigation", count: 0 },
          { id: "translations", label: "Translations", count: 0 },
          { id: "media", label: "Media", count: 0 },
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
            placeholder="Search page title, slug or content block"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Select defaultValue="Page: Home">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Page: Home" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Page: Home">Page: Home</SelectItem>
              <SelectItem value="Page: Programs">Page: Programs</SelectItem>
              <SelectItem value="Page: Contact">Page: Contact</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Locale: English">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Locale: English" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Locale: English">Locale: English</SelectItem>
              <SelectItem value="Locale: Burmese">Locale: Burmese</SelectItem>
              <SelectItem value="Locale: Spanish">Locale: Spanish</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Draft revision">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Draft revision" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Draft revision">Draft revision</SelectItem>
              <SelectItem value="Published version">Published version</SelectItem>
            </SelectContent>
          </Select>

          <button className="text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1 cursor-pointer">
            Reset
          </button>
        </div>
      </div>

      {/* Main Grid: CMS Editor + Family-facing Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Editor (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Unpublished Revision · Last saved 3:40 PM ET
          </div>

          <div>
            <h2 className="text-xl font-black text-[#0B1E2B] font-display">
              Home · Hero section
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Headline
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Supporting copy
              </label>
              <textarea
                rows={3}
                value={supportingCopy}
                onChange={(e) => setSupportingCopy(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 leading-relaxed font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Button label
                </label>
                <input
                  type="text"
                  value={buttonLabel}
                  onChange={(e) => setButtonLabel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Button destination
                </label>
                <input
                  type="text"
                  value={buttonDestination}
                  onChange={(e) => setButtonDestination(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                SEO description
              </label>
              <input
                type="text"
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Add a short page description..."
                className="w-full bg-slate-50 border border-rose-300 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-rose-400"
              />
              <span className="text-[10px] text-rose-600 block mt-1">
                Required for publishing. Aim for 120-160 characters.
              </span>
            </div>

            <Alert className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <AlertDescription className="text-xs text-amber-900 leading-snug">
                This is a sample CMS draft, not a change to the existing public page designs.
              </AlertDescription>
            </Alert>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Save draft
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Review changes
              </button>
            </div>
            <span className="text-[11px] text-slate-400">
              Publishing blocked: add SEO description.
            </span>
          </div>
        </div>

        {/* Family-facing preview (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E2B]">Family-facing preview</h3>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Expand</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="text-[10px] text-slate-400">
            Preview only · home / en · Unpublished
          </div>

          {/* Mini Mockup Canvas */}
          <div className="bg-[#FAF7EE] border border-amber-100 rounded-2xl p-5 space-y-3 font-sans">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-amber-200/40">
              <span className="font-black text-[#0B1E2B] font-display">fun & learn</span>
              <div className="flex gap-2 text-[10px] text-slate-600">
                <span>Programs</span>
                <span>About</span>
              </div>
            </div>

            <div className="inline-block px-2 py-0.5 rounded text-[9px] font-black tracking-wider text-teal-800 bg-teal-100/60 uppercase">
              Learn. Grow. Shine.
            </div>

            <h4 className="text-lg font-black text-[#0B1E2B] leading-tight font-display">
              {headline}
            </h4>

            <p className="text-xs text-slate-600 leading-relaxed">
              {supportingCopy}
            </p>

            <button
              type="button"
              className="px-3.5 py-1.5 bg-[#0A5C4C] text-white text-[11px] font-bold rounded-lg shadow-2xs"
            >
              {buttonLabel}
            </button>

            <p className="text-[10px] text-slate-400 pt-2 border-t border-amber-200/40">
              One-to-one support · Small groups of 3–5
            </p>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Content preview only. Adaptive and banner designs shown on the canvas remain unchanged.
          </p>
        </div>
      </div>

      {/* Bottom Section: Pages & publishing history */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#0B1E2B]">Pages & publishing history</h2>
          <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
            <span>All 9 pages</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full text-left text-xs">
            <TableHeader className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <TableRow>
                <TableHead className="py-3 px-4 font-bold text-slate-500">Page / Route</TableHead>
                <TableHead className="py-3 px-3 font-bold text-slate-500">Locale</TableHead>
                <TableHead className="py-3 px-3 font-bold text-slate-500">Live Version</TableHead>
                <TableHead className="py-3 px-3 font-bold text-slate-500">Draft State</TableHead>
                <TableHead className="py-3 px-3 font-bold text-slate-500">Last Edited By</TableHead>
                <TableHead className="py-3 px-4 text-right font-bold text-slate-500">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-100">
              {pages.map((p, idx) => (
                <TableRow key={idx} className="hover:bg-slate-50/80">
                  <TableCell className="py-3 px-4">
                    <div className="font-bold text-[#0B1E2B]">{p.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{p.route}</div>
                  </TableCell>
                  <TableCell className="py-3 px-3 text-slate-700 font-medium">{p.locale}</TableCell>
                  <TableCell className="py-3 px-3 text-slate-600">{p.version}</TableCell>
                  <TableCell className="py-3 px-3">
                    <Badge
                      variant="secondary"
                      className={`text-[10px] font-bold ${
                        p.state === "Ready for review"
                          ? "bg-teal-100 text-teal-800 hover:bg-teal-100 border-none"
                          : p.state === "Needs SEO"
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-100 border-none"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-100 border-none"
                      }`}
                    >
                      {p.state}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 px-3 text-slate-600">{p.editedBy}</TableCell>
                  <TableCell className="py-3 px-4 text-right">
                    <span className="font-semibold text-teal-800 hover:underline cursor-pointer">
                      {p.action}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="p-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Publishing requires review · Previous versions are retained for rollback</span>
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
    </div>
  );
}

