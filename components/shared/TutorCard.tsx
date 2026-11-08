import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Star, Languages } from "lucide-react";
import { Tutor } from "@/lib/data";

export function TutorCard({ tutor }: { tutor: Tutor }) {
  const firstName = tutor.name.split(" ")[0];

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Large Prominent Photo Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <Image
            src={tutor.image}
            alt={tutor.name}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          {/* Top-left Grade Badge */}
          <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-xs">
            {tutor.gradeRange}
          </div>

          {/* Top-right Star Rating Badge */}
          <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{tutor.rating.toFixed(1)}</span>
            <span className="text-slate-400 font-normal">({tutor.sessionCount})</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0A5C4C] mb-1.5">
            <GraduationCap className="w-4 h-4 text-[#0A5C4C] shrink-0" />
            <span className="truncate">{tutor.education}</span>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-[#0A5C4C] transition-colors font-display">
            {tutor.name}
          </h3>

          <div className="text-xs font-semibold uppercase tracking-wider text-[#0A5C4C] mb-3">
            {tutor.role} • {tutor.languages.join(" & ")}
          </div>

          {/* Subject Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
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

      {/* Full-width Action Link Button */}
      <div className="px-6 pb-6 pt-2">
        <Link
          href={`/tutors/${tutor.id}`}
          className="w-full py-3.5 rounded-full bg-[#0B1E2B] hover:bg-[#0A5C4C] text-white text-sm font-bold transition-all flex items-center justify-center gap-2 group/btn shadow-xs hover:shadow"
        >
          <span>Meet {firstName}</span>
          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
