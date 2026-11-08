"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { ProgramCard } from "@/components/shared/ProgramCard";
import { ConsultationBanner } from "@/components/shared/ConsultationBanner";
import { PROGRAMS, Program } from "@/lib/data";
import { Search, SlidersHorizontal, User, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "elementary" | "middle" | "high">("all");
  const [selectedFormat, setSelectedFormat] = useState("all");

  const filteredPrograms = PROGRAMS.filter((program) => {
    const matchesSearch =
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.categoryTag.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || program.gradeCategory === activeCategory;

    const matchesFormat =
      selectedFormat === "all" ||
      (selectedFormat === "1:1" && program.format.toLowerCase().includes("one-to-one")) ||
      (selectedFormat === "group" && program.format.toLowerCase().includes("group"));

    return matchesSearch && matchesCategory && matchesFormat;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />

      <main className="flex-1">
        {/* Header Hero Section */}
        <section className="pt-12 pb-10 bg-[#FBFBFA] border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] block mb-3 font-mono">
              A path for every learner
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0B1E2B] tracking-tight leading-tight mb-4 font-display">
              Meet their needs. Feed their curiosity.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
              Extra help, a new challenge, or a future taking shape—let&apos;s find their next step. Explore live K-12 tutoring and enrichment at your child&apos;s pace.
            </p>

            {/* Search & Filter Bar */}
            <div className="mt-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search a subject, skill or program"
                    className="w-full bg-white border border-slate-200 rounded-full pl-11 pr-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0A5C4C]/20 focus:border-[#0A5C4C] transition-all shadow-2xs"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <Select
                    value={selectedFormat}
                    onValueChange={(val) => val && setSelectedFormat(val)}
                  >
                    <SelectTrigger className="bg-white border-slate-200 rounded-full px-4 text-xs sm:text-sm font-medium text-slate-700 h-11">
                      <SelectValue placeholder="Format: All formats" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Format: All formats</SelectItem>
                      <SelectItem value="1:1">One-to-one</SelectItem>
                      <SelectItem value="group">Small group</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select defaultValue="Language: Any">
                    <SelectTrigger className="bg-white border-slate-200 rounded-full px-4 text-xs sm:text-sm font-medium text-slate-700 h-11">
                      <SelectValue placeholder="Language: Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Language: Any">Language: Any</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Burmese">Burmese</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Grade category filter pills & count */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {(
                    [
                      { id: "all", label: "All programs" },
                      { id: "elementary", label: "Elementary" },
                      { id: "middle", label: "Middle school" },
                      { id: "high", label: "High school" },
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        activeCategory === cat.id
                          ? "bg-[#0B1E2B] text-white shadow-2xs"
                          : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  {filteredPrograms.length} programs • Live online • Materials included
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 9 Programs Grid */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>

            <div className="mt-8 text-center text-xs text-slate-400 italic">
              Grade ranges are a guide. We&apos;ll recommend a starting point based on your child&apos;s needs, not just their age.
            </div>
          </div>
        </section>

        {/* Different Ways to Find Their Stride (Delivery Formats) */}
        <section className="py-12 bg-[#F2F8F6]/60 border-y border-[#DCEEE8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A5C4C] block mb-2 font-mono">
                  Their pace. Their place.
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E2B] tracking-tight mb-3 font-display">
                  Different ways to find their stride.
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Real-time support from a real person, wherever your child learns best.
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 1:1 Card */}
                <div className="bg-white rounded-3xl p-6 border border-[#CCE8E0] shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center mb-4">
                    <User className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    One-to-one tutoring
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    A dedicated tutor, a personalized plan and room for every question. Adapt the lesson to current schoolwork and individual goals.
                  </p>
                  <span className="text-[11px] font-bold text-[#0A5C4C]">
                    Built around your child
                  </span>
                </div>

                {/* Small Group Card */}
                <div className="bg-[#FEF6E9] rounded-3xl p-6 border border-[#F8E2C1] shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Small-group learning
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Shared discoveries with 3–5 students at a similar level. Space to collaborate, explain ideas and learn from each other.
                  </p>
                  <span className="text-[11px] font-bold text-amber-800">
                    A small circle. A shared spark.
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Consultation Banner */}
        <ConsultationBanner
          eyebrow="THEIR NEXT CHAPTER STARTS WITH A CONVERSATION"
          title="Not sure where to begin? That's our starting point."
          subtitle="No commitment. Just a helpful place to begin."
          buttonText="Book a free consultation"
          href="/tutors"
        />
      </main>

      <Footer />
    </div>
  );
}

