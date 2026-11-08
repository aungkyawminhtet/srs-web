"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Check, 
  CheckCircle2, 
  ArrowRight, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  Video, 
  Globe2 
} from "lucide-react";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ConsultationPage() {
  const [selectedDay, setSelectedDay] = useState(12);
  const [selectedTime, setSelectedTime] = useState("4:00 PM");
  const [timezone, setTimezone] = useState("Eastern Time (ET / UTC-5)");
  const [firstName, setFirstName] = useState("Mei");
  const [lastName, setLastName] = useState("Chen");
  const [email, setEmail] = useState("mei.chen@example.com");
  const [grade, setGrade] = useState("Grade 9 (High school)");
  const [interest, setInterest] = useState("Math tutoring");
  const [language, setLanguage] = useState("Chinese");
  const [helpNote, setHelpNote] = useState("Building confidence with Algebra I and finding a manageable weekly routine.");
  const [agree, setAgree] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const timeSlots = ["3:00 PM", "4:00 PM", "5:00 PM"];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!grade) {
      setValidationError("Please select your child's grade before confirming your consultation.");
      return;
    }

    if (!agree) {
      setValidationError("Please agree to be contacted about this consultation.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4C] block mb-2 font-mono">
              A SIMPLE START • FREE 20-MINUTE CONVERSATION
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1E2B] tracking-tight font-display mb-3">
              Let&apos;s find their starting point.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
              Tell us a little about your family and choose a time to talk. No payment, no pressure—just a helpful next step.
            </p>
          </div>

          {/* Stepper Bar */}
          <div className="bg-[#EAF5F2] rounded-2xl px-6 py-3.5 mb-10 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold text-slate-600 font-sans border border-[#CCE8E0]">
            <div className="flex items-center gap-2 text-[#0A5C4C]">
              <span className="w-5 h-5 rounded-full bg-[#0A5C4C] text-white text-[11px] font-bold flex items-center justify-center">
                1
              </span>
              <span>Choose a time</span>
            </div>
            <span className="text-slate-300">/</span>
            <div className={`flex items-center gap-2 ${submitted ? "text-[#0A5C4C]" : "text-slate-700"}`}>
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center justify-center">
                2
              </span>
              <span>Tell us about your child</span>
            </div>
            <span className="text-slate-300">/</span>
            <div className={`flex items-center gap-2 ${submitted ? "text-[#0A5C4C] font-bold" : "text-slate-400"}`}>
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center justify-center">
                3
              </span>
              <span>Confirm your conversation</span>
            </div>
          </div>

          {submitted ? (
            /* Post-Booking Confirmation Card */
            <div className="bg-[#EAF5F2] rounded-3xl p-8 sm:p-12 border border-[#CCE8E0] shadow-sm space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4C] font-mono">
                  AFTER BOOKING • CONFIRMATION
                </span>
                <span className="px-3 py-1 bg-white text-[#0A5C4C] font-bold text-xs rounded-full border border-[#CCE8E0]">
                  Status: Confirmed
                </span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0B1E2B] font-display">
                  You&apos;re booked. We&apos;ll take the next step together.
                </h2>
                <p className="text-lg font-bold text-[#0A5C4C] mt-2 font-display">
                  Thursday, November {selectedDay}, 2026 • {selectedTime}–4:20 PM ET
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-6 border border-[#CCE8E0] text-sm text-slate-700 font-sans space-y-2">
                <p>
                  A confirmation and secure meeting link have been sent to <span className="font-semibold text-slate-900">{email}</span>.
                </p>
                <p className="text-xs text-slate-500">
                  Requested family support: <span className="font-medium text-slate-800">{language}</span> • Student grade: <span className="font-medium text-slate-800">{grade}</span>.
                </p>
                <p className="text-xs text-slate-400 italic pt-1">
                  If you don&apos;t see the email, check your spam folder or reach out to our team at any time.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => alert("Added to your Google / Apple Calendar!")}
                  className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-sm font-bold px-6 py-3.5 rounded-full shadow-xs transition-all cursor-pointer"
                >
                  <span>Add to calendar</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-sm font-semibold px-6 py-3.5 rounded-full transition-all cursor-pointer"
                >
                  <span>Reschedule conversation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* 2-Column Booking Form */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Calendar & Time Slots */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Calendar Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 font-display">
                      Choose a day
                    </h3>
                    <div className="flex items-center gap-1 text-slate-400">
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg cursor-pointer">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg cursor-pointer">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-slate-500">
                    November 2026
                  </div>

                  {/* Calendar Matrix */}
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-sans">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                      <div key={d} className="text-slate-400 font-bold py-1 text-[11px]">
                        {d}
                      </div>
                    ))}

                    {/* Day empty placeholders */}
                    <div className="py-2 text-slate-300"></div>
                    <div className="py-2 text-slate-300"></div>
                    <div className="py-2 text-slate-300"></div>
                    <div className="py-2 text-slate-300"></div>
                    <div className="py-2 text-slate-300"></div>
                    <div className="py-2 text-slate-300"></div>
                    <div className="py-2 text-slate-400">1</div>

                    {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((day) => {
                      const isSelected = selectedDay === day;
                      const isSelectable = day >= 10 && day <= 20;

                      return (
                        <button
                          key={day}
                          type="button"
                          disabled={!isSelectable}
                          onClick={() => setSelectedDay(day)}
                          className={`py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#0A5C4C] text-white shadow-xs"
                              : isSelectable
                              ? "hover:bg-[#EAF5F2] text-slate-800"
                              : "text-slate-300 cursor-not-allowed"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[11px] text-slate-400 font-sans border-t border-slate-100 pt-3">
                    Example booking availability • Dates and times are illustrative.
                  </p>
                </div>

                {/* Selected Day Slots Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-display">
                      Thursday, November {selectedDay}
                    </h3>
                    <div className="text-xs text-slate-500 font-sans mt-0.5">
                      Timezone: {timezone}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="flex flex-wrap gap-2.5">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          selectedTime === slot
                            ? "bg-[#0B1E2B] text-white shadow-xs"
                            : "bg-[#FBFBFA] border border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-1.5 font-sans pt-1">
                    <Video className="w-3.5 h-3.5 text-[#0A5C4C]" />
                    <span>20 minutes • Online video conversation</span>
                  </div>

                  {/* What We'll Talk About */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] block font-mono">
                      What We&apos;ll Talk About
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600 font-sans">
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#0A5C4C] shrink-0 mt-0.5" />
                        <span>Your child&apos;s goals and current learning needs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#0A5C4C] shrink-0 mt-0.5" />
                        <span>Subjects, format and tutor matching</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#0A5C4C] shrink-0 mt-0.5" />
                        <span>Your schedule and language preferences</span>
                      </li>
                    </ul>
                    <p className="text-[11px] text-slate-400 italic pt-1 font-sans">
                      Your child is welcome to join, but does not need to attend.
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Column: Family Details Form */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 font-display">
                    A little about your family
                  </h2>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    Required fields are marked with an asterisk.
                  </p>
                </div>

                {validationError && (
                  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-800">
                    <div className="font-bold">One more detail to check</div>
                    <div>{validationError}</div>
                  </div>
                )}

                <form onSubmit={handleBooking} className="space-y-4 font-sans">
                  {/* First & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        First name *
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0A5C4C] focus:ring-2 focus:ring-[#0A5C4C]/10"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Last name *
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0A5C4C] focus:ring-2 focus:ring-[#0A5C4C]/10"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Email address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0A5C4C] focus:ring-2 focus:ring-[#0A5C4C]/10"
                    />
                    <p className="text-[10px] text-slate-400">
                      Your confirmation and meeting link will go here.
                    </p>
                  </div>

                  {/* Child's Grade */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Child&apos;s grade *
                    </label>
                    <Select
                      value={grade}
                      onValueChange={(val) => val && setGrade(val)}
                    >
                      <SelectTrigger className="w-full bg-white border-slate-200 text-sm text-slate-700 h-10">
                        <SelectValue placeholder="Choose a grade..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Grades K–4 (Elementary)">Grades K–4 (Elementary)</SelectItem>
                        <SelectItem value="Grades 5–6 (Upper elementary)">Grades 5–6 (Upper elementary)</SelectItem>
                        <SelectItem value="Grades 7–8 (Middle school)">Grades 7–8 (Middle school)</SelectItem>
                        <SelectItem value="Grade 9 (High school)">Grade 9 (High school)</SelectItem>
                        <SelectItem value="Grade 10 (High school)">Grade 10 (High school)</SelectItem>
                        <SelectItem value="Grade 11 (High school)">Grade 11 (High school)</SelectItem>
                        <SelectItem value="Grade 12 (High school)">Grade 12 (High school)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Area of Interest & Preferred Language */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Main area of interest *
                      </label>
                      <Select
                        value={interest}
                        onValueChange={(val) => val && setInterest(val)}
                      >
                        <SelectTrigger className="w-full bg-white border-slate-200 text-xs sm:text-sm text-slate-700 h-10">
                          <SelectValue placeholder="Main area of interest" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Math tutoring">Math tutoring</SelectItem>
                          <SelectItem value="English & reading">English & reading</SelectItem>
                          <SelectItem value="Science & biology">Science & biology</SelectItem>
                          <SelectItem value="Coding & computing">Coding & computing</SelectItem>
                          <SelectItem value="Test preparation">Test preparation (SAT / ACT)</SelectItem>
                          <SelectItem value="College planning">College planning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Preferred language *
                      </label>
                      <Select
                        value={language}
                        onValueChange={(val) => val && setLanguage(val)}
                      >
                        <SelectTrigger className="w-full bg-white border-slate-200 text-xs sm:text-sm text-slate-700 h-10">
                          <SelectValue placeholder="Preferred language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Chinese">Chinese (Mandarin)</SelectItem>
                          <SelectItem value="Burmese">Burmese</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* What would you like help with */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      What would you like help with?
                    </label>
                    <textarea
                      rows={3}
                      value={helpNote}
                      onChange={(e) => setHelpNote(e.target.value)}
                      placeholder="e.g. Building confidence with Algebra I and finding a manageable weekly routine."
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0A5C4C] focus:ring-2 focus:ring-[#0A5C4C]/10 resize-none"
                    />
                  </div>

                  {/* Agreement */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-[#0A5C4C] focus:ring-[#0A5C4C]"
                      />
                      <span>
                        I agree to be contacted about this consultation and have read the{" "}
                        <Link href="/contact#faq" className="text-[#0A5C4C] hover:underline font-semibold">
                          privacy policy
                        </Link>
                        .
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-sm font-bold px-7 py-3.5 rounded-full shadow-xs hover:shadow transition-all cursor-pointer disabled:opacity-60"
                    >
                      <span>{loading ? "Confirming..." : "Confirm free consultation"}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 italic pt-1">
                    No payment required. You can request a different time using the confirmation email.
                  </p>
                </form>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

