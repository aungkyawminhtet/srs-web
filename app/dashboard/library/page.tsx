"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Bookmark,
  ArrowRight,
  ArrowUpRight,
  Download,
  Info,
  Sparkles,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LearningLibraryPage() {
  const [activeTab, setActiveTab] = useState<"all" | "guides" | "worksheets" | "interactive" | "mini">("all");
  const [searchQuery, setSearchQuery] = useState("Algebra");
  const [gradeLevel, setGradeLevel] = useState("Grades 7–9");
  const [subject, setSubject] = useState("Math");
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({
    "1": true,
    "6": true,
  });

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resources = [
    {
      id: "1",
      category: "guides",
      tag: "Visual guide",
      title: "The balance method",
      meta: "5 min · Equations · Recommended by Lin",
      formula: "x + 4 = 10",
      bgClass: "bg-[#EAF5F2] text-[#0A5C4C]",
      actionType: "open",
    },
    {
      id: "2",
      category: "interactive",
      tag: "Interactive",
      title: "See slope in action",
      meta: "10 min · Graphing · Grades 7–9",
      isSlopeIllustration: true,
      bgClass: "bg-[#FAF7EC] text-amber-900",
      actionType: "open",
    },
    {
      id: "3",
      category: "guides",
      tag: "Quick read",
      title: "Negative numbers, made clearer",
      meta: "4 min · Number sense · Grades 6–8",
      formula: "-12 + 6 = -6",
      bgClass: "bg-[#FFF4ED] text-rose-800",
      actionType: "open",
    },
    {
      id: "4",
      category: "worksheets",
      tag: "Worksheet",
      title: "From words to equations",
      meta: "15 min · Word problems · PDF, 320 KB",
      formula: "words → x",
      bgClass: "bg-[#FAF7EC] text-amber-900",
      actionType: "download",
    },
    {
      id: "5",
      category: "mini",
      tag: "Mini lesson",
      title: "Check your answer",
      meta: "6 min · Equations · Captions included",
      formula: "3(-2 - 2) = -12",
      bgClass: "bg-[#EAF5F2] text-[#0A5C4C]",
      actionType: "open",
    },
    {
      id: "6",
      category: "worksheets",
      tag: "Worksheet",
      title: "Slope & intercept practice",
      meta: "15 min · Graphing · PDF, 410 KB",
      formula: "y = mx + b",
      bgClass: "bg-[#FFF4ED] text-rose-800",
      actionType: "download",
    },
  ];

  const filteredResources = resources.filter((item) => {
    if (activeTab === "guides" && item.category !== "guides") return false;
    if (activeTab === "worksheets" && item.category !== "worksheets") return false;
    if (activeTab === "interactive" && item.category !== "interactive") return false;
    if (activeTab === "mini" && item.category !== "mini") return false;
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 font-mono block mb-1">
            Thursday, November 5, 2026 · Learner Portal
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
            Follow your curiosity.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Helpful guides, mini lessons and practice—picked for where you are now.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Viewing 2 saved resources")}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-full px-4 py-2 shadow-2xs hover:shadow transition-all shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <span>Saved resources · 2</span>
          <Bookmark className="w-3.5 h-3.5 fill-[#0A5C4C] text-[#0A5C4C]" />
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search the library..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="sm:col-span-3">
          <Select
            value={gradeLevel}
            onValueChange={(val) => val && setGradeLevel(val)}
          >
            <SelectTrigger className="w-full bg-white border-slate-200 text-xs sm:text-sm text-slate-700 h-10">
              <SelectValue placeholder="Grade level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Grades 7–9">Grades 7–9</SelectItem>
              <SelectItem value="Grades 4–6">Grades 4–6</SelectItem>
              <SelectItem value="Grades 10–12">Grades 10–12</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-3">
          <Select
            value={subject}
            onValueChange={(val) => val && setSubject(val)}
          >
            <SelectTrigger className="w-full bg-white border-slate-200 text-xs sm:text-sm text-slate-700 h-10">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Math">Math</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="Reading & Writing">Reading &amp; Writing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Featured Dark Banner */}
      <div className="bg-[#0B2332] text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative overflow-hidden">
        <div className="space-y-1.5 max-w-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 font-mono block">
            Picked For Your Next Step
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-display text-white">
            A fresh way to see algebra.
          </h2>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
            Start with Lin&apos;s balance-method guide, then test the idea for yourself.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Exploring Lin's recommended picks...")}
          className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-full shadow-xs transition-all shrink-0 cursor-pointer"
        >
          <span>Explore Lin&apos;s picks</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Tabs & Results Count */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-3">
          {[
            { id: "all", label: "All resources · 6" },
            { id: "guides", label: "Guides & reads · 2" },
            { id: "worksheets", label: "Worksheets · 2" },
            { id: "interactive", label: "Interactive · 1" },
            { id: "mini", label: "Mini lessons · 1" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#0A5C4C] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <div>
            6 results for &ldquo;<span className="font-semibold text-slate-700">Algebra</span>&rdquo; · Grades 7–9
          </div>
          <div className="font-semibold text-slate-700">
            Sort: Recommended ⌵
          </div>
        </div>
      </div>

      {/* 6 Resource Cards Grid (3 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all overflow-hidden flex flex-col justify-between"
          >
            {/* Visual Formula / Graphic Banner */}
            <div className={`h-36 ${card.bgClass} flex items-center justify-center p-4 relative`}>
              {card.isSlopeIllustration ? (
                /* Slope Line Graphic */
                <svg className="w-40 h-24 overflow-visible" viewBox="0 0 160 90">
                  <line
                    x1="20"
                    y1="75"
                    x2="140"
                    y2="15"
                    stroke="#0A5C4C"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-center">
                  {card.formula}
                </div>
              )}
            </div>

            {/* Card Body */}
            <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                    {card.tag}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleBookmark(card.id)}
                    className="text-slate-400 hover:text-[#0A5C4C] p-1 cursor-pointer"
                    aria-label="Bookmark resource"
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        bookmarked[card.id] ? "fill-[#0A5C4C] text-[#0A5C4C]" : ""
                      }`}
                    />
                  </button>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-display">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 font-sans">
                  {card.meta}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-3 border-t border-slate-100">
                {card.actionType === "download" ? (
                  <button
                    type="button"
                    onClick={() => alert(`Downloading ${card.title}...`)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A5C4C] hover:underline cursor-pointer"
                  >
                    <span>Download worksheet</span>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => alert(`Opening ${card.title}...`)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A5C4C] hover:underline cursor-pointer"
                  >
                    <span>Open resource</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Materials Revisit Note */}
      <div className="text-xs text-slate-500 font-sans pt-2">
        Materials support live learning and can be revisited anytime. Ask your tutor if you&apos;re unsure where to start.
      </div>

      {/* Illustrative Footer Note */}
      <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-4 border-t border-slate-200/60 font-sans">
        <Info className="w-3.5 h-3.5 shrink-0" />
        <span>Sample workspace · Students, tutors, progress and billing are illustrative. No real student data is shown.</span>
      </div>
    </div>
  );
}
