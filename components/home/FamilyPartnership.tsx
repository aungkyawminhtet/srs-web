import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Heart } from "lucide-react";

export function FamilyPartnership() {
  return (
    <section className="py-16 md:py-24 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E8F4F0] border border-[#CDEAE2] rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden relative shadow-xs">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Image: Parent & Child working together */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop"
                  alt="Mother and son learning together happily with tutor guidance"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover"
                />
              </div>

              {/* Floating micro card */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-lg border border-slate-100 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0B6B58] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">100% Satisfaction Guarantee</div>
                  <div className="text-[11px] text-slate-500">Love your tutor or your next match is free</div>
                </div>
              </div>
            </div>

            {/* Right Copy & Features */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#BCE1D6] text-[#0B6B58] text-xs font-bold tracking-wider uppercase mb-4">
                <Heart className="w-3.5 h-3.5 fill-[#0B6B58]" />
                <span>For Families and Students</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1E2B] tracking-tight leading-tight mb-4 font-display">
                A new school system. <br />
                <span className="text-[#0B6B58]">A familiar helping hand.</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
                Navigating advanced placement courses, shifting state standards, and exam stress can feel overwhelming. We bridge the gap between school curriculum and home study, empowering your student with independent habits that last through college.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-slate-800 text-xs sm:text-sm font-semibold shadow-xs">
                  <Check className="w-4 h-4 text-[#0B6B58]" />
                  Weekly parent email recap
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-slate-800 text-xs sm:text-sm font-semibold shadow-xs">
                  <Check className="w-4 h-4 text-[#0B6B58]" />
                  Flexible reschedule up to 24h
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-slate-800 text-xs sm:text-sm font-semibold shadow-xs">
                  <Check className="w-4 h-4 text-[#0B6B58]" />
                  Dedicated learning advisor
                </span>
              </div>

              {/* CTA button */}
              <Link
                href="/tutors"
                className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-base font-bold px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all group"
              >
                <span>Talk with an education advisor</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

