import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star, GraduationCap } from "lucide-react";
import { TUTORS } from "@/lib/data";

export function TutorsSection() {
  return (
    <section id="tutors" className="py-14 md:py-20 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] block mb-2 font-mono">
              Our Network of Vetted Mentors
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1E2B] tracking-tight font-display">
              Patient guides. Curious minds. Your team.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-2 max-w-2xl">
              Find a tutor who connects with your child&apos;s learning style, passions, and language.
            </p>
          </div>

          <Link
            href="/tutors"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-[#0A5C4C] hover:text-[#08483b] group transition-colors mt-4 md:mt-0"
          >
            <span>Browse all certified tutors</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 3 Tutor Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TUTORS.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={tutor.image}
                    alt={tutor.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{tutor.rating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">({tutor.sessionCount})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#0A5C4C] mb-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>{tutor.education}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-1">
                    {tutor.name}
                  </h3>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#0A5C4C] mb-4">
                    {tutor.role} • {tutor.languages.join(" & ")}
                  </div>

                  {/* Subject Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {tutor.subjects.map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#EAF5F2] text-[#0A5C4C]"
                      >
                        {sub.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom booking trigger */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/tutors/${tutor.id}`}
                  className="w-full py-3 rounded-full bg-[#0B1E2B] hover:bg-[#0A5C4C] text-white text-sm font-bold transition-colors flex items-center justify-center gap-2 group/btn"
                >
                  <span>Meet {tutor.name.split(" ")[0]}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
