"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BookOpen, ArrowUpRight } from "lucide-react";
import { useAuthModal } from "@/components/auth/AuthModalContext";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openAuthModal } = useAuthModal();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FBFBFA]/95 backdrop-blur-md border-b border-[#EBEBE8] transition-all">
      {/* Top Multilingual Banner */}
      {/* <div className="bg-[#0A5C4C] text-emerald-50 text-[12px] py-1.5 px-4 text-center font-medium">
        <span>Learning feels better when we understand each other • English • Burmese • Chinese</span>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo: fun & learn */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#0A5C4C] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#0B1E2B] font-display">
              fun & learn
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8 text-[15px] font-medium text-[#334155]">
            <Link 
              href="/" 
              className={`hover:text-[#0A5C4C] transition-colors ${isActive("/") ? "text-[#0A5C4C] font-bold" : ""}`}
            >
              Home
            </Link>
            <Link 
              href="/programs" 
              className={`hover:text-[#0A5C4C] transition-colors ${isActive("/programs") ? "text-[#0A5C4C] font-bold" : ""}`}
            >
              Programs
            </Link>
            <Link 
              href="/subjects" 
              className={`hover:text-[#0A5C4C] transition-colors ${isActive("/subjects") ? "text-[#0A5C4C] font-bold" : ""}`}
            >
              Subjects
            </Link>
            <Link 
              href="/tutors" 
              className={`hover:text-[#0A5C4C] transition-colors ${isActive("/tutors") ? "text-[#0A5C4C] font-bold" : ""}`}
            >
              Our tutors
            </Link>
            <Link 
              href="/resources" 
              className={`hover:text-[#0A5C4C] transition-colors ${isActive("/resources") ? "text-[#0A5C4C] font-bold" : ""}`}
            >
              Family resources
            </Link>
            <Link 
              href="/how-it-works" 
              className={`hover:text-[#0A5C4C] transition-colors ${isActive("/how-it-works") ? "text-[#0A5C4C] font-bold" : ""}`}
            >
              How it works
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              type="button"
              onClick={() => openAuthModal("login")}
              className="text-[14px] font-semibold text-slate-700 hover:text-[#0A5C4C] px-3 py-2 transition-colors cursor-pointer"
            >
              Log in
            </button>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-1.5 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-[14px] font-bold px-5 py-2.5 rounded-full shadow-xs hover:shadow transition-all group"
            >
              <span>Free consultation</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#0A5C4C] hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2 text-base font-medium text-slate-700">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 hover:text-[#0A5C4C] ${isActive("/") ? "text-[#0A5C4C] font-bold" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/programs"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 hover:text-[#0A5C4C] ${isActive("/programs") ? "text-[#0A5C4C] font-bold" : ""}`}
            >
              Programs
            </Link>
            <Link
              href="/subjects"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 hover:text-[#0A5C4C] ${isActive("/subjects") ? "text-[#0A5C4C] font-bold" : ""}`}
            >
              Subjects
            </Link>
            <Link
              href="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 hover:text-[#0A5C4C] ${isActive("/how-it-works") ? "text-[#0A5C4C] font-bold" : ""}`}
            >
              How it works
            </Link>
            <Link
              href="/tutors"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 hover:text-[#0A5C4C] ${isActive("/tutors") ? "text-[#0A5C4C] font-bold" : ""}`}
            >
              Our tutors
            </Link>
            <Link
              href="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 hover:text-[#0A5C4C] ${isActive("/resources") ? "text-[#0A5C4C] font-bold" : ""}`}
            >
              Family resources
            </Link>
          </nav>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal("login");
              }}
              className="w-full text-center py-2.5 font-semibold text-slate-700 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Log in
            </button>
            <Link
              href="/consultation"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 font-bold text-white bg-[#0A5C4C] rounded-full shadow-xs"
            >
              Free consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
