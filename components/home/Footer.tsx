"use client";

import React from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useAuthModal } from "@/components/auth/AuthModalContext";

export function Footer() {
  const { openAuthModal } = useAuthModal();
  return (
    <footer className="bg-[#0B1E2B] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-[#0A5C4C] flex items-center justify-center text-white shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-display">
                fun & learn
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-4">
              A little guidance. A lot of possibility. Live learning that meets your child where they are.
            </p>

            <div className="text-xs text-emerald-400 font-semibold mb-6">
              English • Burmese • Chinese
            </div>

            <div className="text-xs text-slate-500 font-medium">
              <div>Questions? Email us at <a href="mailto:support@funandlearn.com" className="text-slate-300 hover:underline">support@funandlearn.com</a></div>
            </div>
          </div>

          {/* Nav Links Column 1: Explore (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/programs" className="hover:text-emerald-400 transition-colors">K-12 Tutoring</Link></li>
              <li><Link href="/programs" className="hover:text-emerald-400 transition-colors">Enrichment Programs</Link></li>
              <li><Link href="/subjects" className="hover:text-emerald-400 transition-colors">Subject Tracks</Link></li>
              <li><Link href="/how-it-works#college-pathway" className="hover:text-emerald-400 transition-colors">College Pathway</Link></li>
              <li><Link href="/how-it-works#pricing" className="hover:text-emerald-400 transition-colors">Pricing & Plans</Link></li>
            </ul>
          </div>

          {/* Nav Links Column 2: For Families (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              For Families
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</Link></li>
              <li><Link href="/tutors" className="hover:text-emerald-400 transition-colors">Meet Our Tutors</Link></li>
              <li><Link href="/resources" className="hover:text-emerald-400 transition-colors">Family Resources</Link></li>
              <li><Link href="/how-it-works#pricing" className="hover:text-emerald-400 transition-colors">Package Details</Link></li>
              <li><Link href="/contact#faq" className="hover:text-emerald-400 transition-colors">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* Nav Links Column 3: Let's Connect (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Let&apos;s Connect
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/consultation" className="hover:text-emerald-400 transition-colors">Book a Free Consultation</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact Our Team</Link></li>
              <li>
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Parent Login
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openAuthModal("register")}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Create Account
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Fun and Learn, All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
