import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star, Sparkles, BookOpen, Clock, ShieldCheck, HeartHandshake } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 md:pt-12 md:pb-15 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5F2] border border-[#CDEAE2] text-[#0B6B58] text-xs font-bold tracking-wider uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>One-on-One Tutoring • Elementary, Middle & High School</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0B1E2B] leading-[1.08] mb-6 font-display">
              A little guidance. <br />
              <span className="text-[#0B6B58]">A brighter future.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#475569] leading-relaxed max-w-2xl mb-8 font-normal">
              From that first <span className="font-semibold text-slate-800">“I get it!”</span> to life-long milestones. Tutoreem matches your child with vetted subject-matter mentors who adapt to their pace, learning style, and school curriculum.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
              <Link
                href="/tutors"
                className="inline-flex items-center justify-center gap-2.5 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-base font-bold px-7 py-4 rounded-full shadow-md hover:shadow-lg transition-all group cursor-pointer"
              >
                <span>Find your matched tutor</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/programs"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 hover:text-slate-900 text-base font-semibold px-7 py-4 rounded-full transition-all"
              >
                Explore programs
              </Link>
            </div>

            {/* Trust checkmarks */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0B6B58]" />
                <span>Personalized tutor matching</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0B6B58]" />
                <span>1:1 dedicated live instruction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0B6B58]" />
                <span>Risk-free trial session</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Interactive Badges */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
              {/* Main Student Image */}
              <Image
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop"
                alt="Student smiling while learning online with laptop and notes"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 460px"
                className="object-cover object-center"
              />

              {/* Gradient overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

              {/* Floating Top Badge: Live Session Indicator */}
              <div className="absolute top-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0B6B58]"></span>
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Live 1:1 Session</div>
                    <div className="text-[11px] text-slate-500 font-medium">Algebra II • Quadratic Functions</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#0B6B58] bg-[#EAF5F2] px-2 py-1 rounded-lg">
                  Grade 10
                </span>
              </div>

              {/* Floating Bottom Card: Rating & Social Proof */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FEF6E9] flex items-center justify-center text-amber-500 font-bold shrink-0">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-900">4.9 / 5.0 Rating</span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-emerald-700 font-semibold">1,500+ Verified Parents</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1 italic mt-0.5">
                      “Our daughter went from anxious in math to top of her class!”
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative background blur dots */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
          </div>

        </div>
      </div>

      {/* Bottom Mint Support Strip */}
      <div className="mt-16 bg-[#E8F4F0] border-y border-[#D1E7E0] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 md:gap-8 text-xs sm:text-sm font-semibold text-[#0B5C4C]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0B6B58]" />
              <span>Support for every learning purpose</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0B6B58]" />
              <span>A-Z School Curriculum Alignment</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0B6B58]" />
              <span>Context-driven problem solving</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0B6B58]" />
              <span>No long-term locked contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#0B6B58]" />
              <span>Flexible cohort & 1:1 study hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

