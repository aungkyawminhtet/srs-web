import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-12 md:py-20 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A5C4C] rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-300/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/60 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ready to start?</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-3 font-display">
                Let’s find your child’s way forward.
              </h2>
              <p className="text-emerald-100 text-base sm:text-lg leading-relaxed">
                Take our 2-minute diagnostic and speak with an academic advisor. Your first diagnostic session and tutor matching are 100% free.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
              <Link
                href="/tutors"
                className="inline-flex items-center justify-center gap-2.5 bg-white text-[#0A5C4C] hover:bg-emerald-50 text-base font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all group"
              >
                <span>Book a free consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

