"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { TutorCard } from "@/components/shared/TutorCard";
import { ConsultationBanner } from "@/components/shared/ConsultationBanner";
import { TUTORS } from "@/lib/data";
import { Search, ArrowUpRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TutorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const filteredTutors = TUTORS.filter((tutor) => {
    const matchesSearch =
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.quote.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLanguage =
      selectedLanguage === "all" ||
      tutor.languages.some((l) => l.toLowerCase() === selectedLanguage.toLowerCase());

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />

      <main className="flex-1">
        {/* Header Hero Section */}
        <section className="pt-12 pb-10 bg-[#FBFBFA] border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] block mb-3 font-mono">
              Good learning starts with good people
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0B1E2B] tracking-tight leading-tight mb-4 font-display">
              Patient guides. Curious minds. Your team.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed mb-8">
              Find a tutor who makes room for questions, understands your child&apos;s goals and helps the next step feel possible.
            </p>

            {/* Search & Filter Bar */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, subject or skill"
                    className="w-full bg-white border border-slate-200 rounded-full pl-11 pr-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0A5C4C]/20 focus:border-[#0A5C4C] transition-all shadow-2xs"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <Select defaultValue="Subject: All">
                    <SelectTrigger className="bg-white border-slate-200 rounded-full px-4 text-xs sm:text-sm font-medium text-slate-700 h-11">
                      <SelectValue placeholder="Subject: All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Subject: All">Subject: All</SelectItem>
                      <SelectItem value="Math">Math</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select defaultValue="Grade: All">
                    <SelectTrigger className="bg-white border-slate-200 rounded-full px-4 text-xs sm:text-sm font-medium text-slate-700 h-11">
                      <SelectValue placeholder="Grade: All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade: All">Grade: All</SelectItem>
                      <SelectItem value="Elementary">Elementary</SelectItem>
                      <SelectItem value="Middle school">Middle school</SelectItem>
                      <SelectItem value="High school">High school</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedLanguage}
                    onValueChange={(val) => val && setSelectedLanguage(val)}
                  >
                    <SelectTrigger className="bg-white border-slate-200 rounded-full px-4 text-xs sm:text-sm font-medium text-slate-700 h-11">
                      <SelectValue placeholder="Language: Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Language: Any</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                      <SelectItem value="Burmese">Burmese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-1">
                <span>{filteredTutors.length} featured tutor profiles • All languages</span>
                <Link href="#match" className="text-[#0A5C4C] font-bold hover:underline inline-flex items-center gap-1">
                  <span>Find my tutor match</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* 3 Featured Tutor Profile Cards */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredTutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>

            <div className="mt-8 text-center text-xs text-slate-400 italic">
              Meet the team preview. These profiles are illustrative. Tutor matching, subjects and availability are confirmed with your family.
            </div>
          </div>
        </section>

        {/* What to expect: A real person, right there with them */}
        <section className="py-14 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A5C4C] block mb-2 font-mono">
              What to expect
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E2B] tracking-tight mb-8 font-display">
              A real person, right there with them.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#FBFBFA] rounded-2xl p-6 border border-slate-200/80">
                <h3 className="text-base font-bold text-slate-900 mb-2">Room to ask</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Questions and mistakes are part of learning, not something to hide.
                </p>
              </div>

              <div className="bg-[#FBFBFA] rounded-2xl p-6 border border-slate-200/80">
                <h3 className="text-base font-bold text-slate-900 mb-2">Explanations that connect</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Visual examples, guided practice and time to explain their thinking.
                </p>
              </div>

              <div className="bg-[#FBFBFA] rounded-2xl p-6 border border-slate-200/80">
                <h3 className="text-base font-bold text-slate-900 mb-2">Parents stay included</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Lesson notes and clear next steps help learning continue between sessions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Consultation Banner */}
        <ConsultationBanner
          eyebrow="THEIR NEXT CHAPTER STARTS WITH A CONVERSATION"
          title="Let's find a friendly face for their next step."
          subtitle="No commitment. Just a helpful place to begin."
          buttonText="Book a free consultation"
          href="/tutors"
        />
      </main>

      <Footer />
    </div>
  );
}

