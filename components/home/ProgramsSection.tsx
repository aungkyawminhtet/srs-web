"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, User, Users } from "lucide-react";
import { PROGRAMS } from "@/lib/data";
import { ProgramCard } from "@/components/shared/ProgramCard";

export function ProgramsSection() {
  return (
    <section id="programs" className="py-16 md:py-20 bg-[#F8F9F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] block mb-2 font-mono">
              Plans and Grade Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1E2B] tracking-tight font-display">
              Meet their needs. Feed their curiosity.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-2 max-w-2xl">
              From foundational phonics and math to advanced AP prep and college essays, customized to their school curriculum.
            </p>
          </div>

          <Link
            href="/programs"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-[#0A5C4C] hover:text-[#08483b] group transition-colors mt-4 md:mt-0"
          >
            <span>View all 9 programs directory</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Program Cards Grid (1 row of 3 featured programs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {PROGRAMS.slice(0, 3).map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>

        {/* Delivery Formats Cards (1:1 vs Small Group) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: 1:1 Tutoring */}
          <div className="bg-[#EAF5F2] rounded-3xl p-8 border border-[#CCE8E0] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0A5C4C] text-white flex items-center justify-center mb-6 shadow-xs">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 font-display">
                One-to-one tutoring
              </h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
                100% personalized attention with a dedicated tutor matched to your student’s strengths, learning style, and goals. Flexible weekly scheduling with unlimited session recordings.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-[#CCE8E0]/70">
              <span className="text-sm font-bold text-[#0A5C4C]">
                From $45 / lesson
              </span>
              <Link
                href="/tutors"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0A5C4C] hover:text-[#08483b] group"
              >
                <span>Find a 1:1 mentor</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 2: Small Group Learning */}
          <div className="bg-[#FEF6E9] rounded-3xl p-8 border border-[#F8E2C1] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#D97706] text-white flex items-center justify-center mb-6 shadow-xs">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 font-display">
                Small-group learning
              </h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
                Dynamic, interactive sessions with 3 to 5 peers. Perfect for collaborative problem-solving, SAT/ACT study cohorts, and lively book discussions led by an expert teacher.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-[#F8E2C1]/70">
              <span className="text-sm font-bold text-amber-800">
                From $28 / lesson
              </span>
              <Link
                href="/programs"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-800 hover:text-amber-900 group"
              >
                <span>View cohort schedule</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
