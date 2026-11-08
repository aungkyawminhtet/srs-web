"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { SubjectCard } from "@/components/shared/SubjectCard";
import { ConsultationBanner } from "@/components/shared/ConsultationBanner";
import { SUBJECTS } from "@/lib/data";
import { Check } from "lucide-react";

export default function SubjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", label: "All subjects" },
    { id: "elementary", label: "Elementary" },
    { id: "middle", label: "Middle school" },
    { id: "high", label: "High school" },
    { id: "goals", label: "Learning goals" },
  ];

  const filteredSubjects = SUBJECTS.filter((subject) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "elementary") {
      return ["math", "science", "english"].includes(subject.id);
    }
    if (activeFilter === "middle") {
      return ["math", "science", "english", "computing", "test-prep"].includes(subject.id);
    }
    if (activeFilter === "high") {
      return ["math", "science", "english", "computing", "test-prep", "college-planning"].includes(subject.id);
    }
    if (activeFilter === "goals") {
      return ["test-prep", "college-planning"].includes(subject.id);
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />

      <main className="flex-1">
        {/* Header Hero Section */}
        <section className="pt-12 pb-10 bg-[#FBFBFA] border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] block mb-3 font-mono">
              Strong foundations. Bigger possibilities.
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0B1E2B] tracking-tight leading-tight mb-4 font-display">
              Every subject. A new way in.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed mb-8">
              Sometimes a different explanation makes all the difference. Find live support that connects with how your child thinks, learns and grows.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      activeFilter === cat.id
                        ? "bg-[#0B1E2B] text-white shadow-2xs"
                        : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-500 font-medium">
                {filteredSubjects.length} subject {filteredSubjects.length === 1 ? "area" : "areas"} • One-to-one tutoring and selected groups of 3–5
              </div>
            </div>

          </div>
        </section>

        {/* 6 Subjects 2-Column Grid */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSubjects.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
            </div>
          </div>
        </section>

        {/* Start with what they know. Build from there. (Warm Butter Banner) */}
        <section className="py-12 bg-[#FEF6E9]/70 border-y border-[#F8E2C1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Photo */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-md border-4 border-white bg-slate-200">
                  <Image
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop"
                    alt="Student with laptop smiling during live tutoring lesson"
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-2 font-mono">
                  A plan, not a guess
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E2B] tracking-tight leading-tight mb-4 font-display">
                  Start with what they know. <br />
                  Build from there.
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                  Bring a school assignment, a recent challenge or simply a question. We&apos;ll help identify a useful starting point and connect the right skills across subjects.
                </p>

                <div className="space-y-3 mb-6 text-sm text-slate-800">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0A5C4C]" />
                    <span>School-aligned support and enrichment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0A5C4C]" />
                    <span>Shared materials and parent progress updates</span>
                  </div>
                </div>

                <div className="text-xs text-slate-500 italic">
                  Need support in more than one subject? Talk to us about a coordinated plan.
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Bottom Consultation Banner */}
        <ConsultationBanner
          eyebrow="THEIR NEXT CHAPTER STARTS WITH A CONVERSATION"
          title="Let's find your child's way forward."
          subtitle="No commitment. Just a helpful place to begin."
          buttonText="Book a free consultation"
          href="/tutors"
        />
      </main>

      <Footer />
    </div>
  );
}

