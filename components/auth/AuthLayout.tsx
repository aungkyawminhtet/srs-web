import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-screen overflow-hidden flex">

      {/* LEFT PANEL — full-height photo with overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop"
          alt="Mother and daughter learning together"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1E2B]/80 via-[#0A5C4C]/60 to-[#0B1E2B]/40" />

        {/* Logo top-left */}
        <div className="relative z-10 p-8 shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30 group-hover:bg-white/30 transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-white font-display">
              fun & learn
            </span>
          </Link>
        </div>

        {/* Bottom brand text */}
        <div className="relative z-10 mt-auto p-8 pb-10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-300 block mb-3 font-mono">
            Your Family&apos;s Learning Space
          </span>
          <h1 className="text-3xl xl:text-4xl font-black text-white tracking-tight leading-tight font-display mb-4">
            A little guidance.<br />A brighter future.
          </h1>
          <p className="text-sm text-white/70 leading-relaxed font-sans mb-6 max-w-xs">
            Lessons, learning materials and progress updates — all in one welcoming place.
          </p>
          <div className="space-y-2.5 font-sans text-sm text-white/80">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 text-xs font-bold shrink-0">✓</span>
              <span>Live K–12 tutoring, built around your child</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 text-xs font-bold shrink-0">✓</span>
              <span>Support in English, Burmese and Chinese</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — form column */}
      <div className="flex-1 lg:w-1/2 flex flex-col bg-[#FBFBFA] overflow-y-auto">

        {/* Mobile logo (shown only on small screens) */}
        <div className="lg:hidden px-6 pt-6 shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-[#0A5C4C] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-lg font-black tracking-tight text-[#0B1E2B] font-display">
              fun & learn
            </span>
          </Link>
        </div>

        {/* Top nav row */}
        <div className="flex items-center justify-end px-8 pt-6 pb-2 shrink-0">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0A5C4C] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to funandlearn.us</span>
          </Link>
        </div>

        {/* Form centered */}
        <div className="flex-1 flex items-center justify-center px-8 py-6">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-8 py-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 font-sans">
          <div>© {new Date().getFullYear()} Fun and Learn</div>
          <div className="flex items-center gap-4">
            <Link href="/contact#faq" className="hover:text-slate-600 transition-colors">Privacy policy</Link>
            <Link href="/contact#faq" className="hover:text-slate-600 transition-colors">Terms of service</Link>
            <Link href="/contact" className="hover:text-slate-600 transition-colors">Contact us</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
