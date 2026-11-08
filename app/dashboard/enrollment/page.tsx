"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  CreditCard,
  Calendar,
  Clock,
  Info,
  Check,
  ChevronDown,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function EnrollmentPage() {
  const [child, setChild] = useState("Noah Thant · Grade 5");
  const [selectedTime, setSelectedTime] = useState("Mondays · 4:00–5:00 PM ET");
  const [parentName, setParentName] = useState("May Thant");
  const [email, setEmail] = useState("may.thant@example.com");
  const [billingAddress, setBillingAddress] = useState(
    "18 Maple Street · Boston, MA 02108 · United States"
  );
  const [promoCode, setPromoCode] = useState("WELCOME10");
  const [promoError, setPromoError] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [completedEnrollment, setCompletedEnrollment] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;
    setCompletedEnrollment(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans">
      {/* Header with Back button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 font-mono block mb-1">
            Thursday, November 5, 2026 · Parent Portal
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
            Make room for a new discovery.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review Noah&apos;s new program and confirm your family&apos;s learning plan.
          </p>
        </div>

        <Link
          href="/dashboard/my-learning"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-full px-4 py-2 shadow-2xs hover:shadow transition-all shrink-0 self-start sm:self-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to programs</span>
        </Link>
      </div>

      {/* Stepper Progress Bar */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between text-xs font-bold text-slate-500 overflow-x-auto">
        <div className="flex items-center gap-2 text-slate-700 whitespace-nowrap">
          <span className="w-5 h-5 rounded-full bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center text-xs">✓</span>
          <span>1 · Choose a program</span>
        </div>
        <span className="text-slate-300 mx-2">→</span>
        <div className="flex items-center gap-2 text-[#0A5C4C] font-black whitespace-nowrap bg-[#EAF5F2] px-3 py-1 rounded-full">
          <span>2 · Review &amp; payment</span>
        </div>
        <span className="text-slate-300 mx-2">→</span>
        <div className="flex items-center gap-2 text-slate-400 whitespace-nowrap">
          <span>3 · Confirmation</span>
        </div>
      </div>

      {completedEnrollment ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-2xs text-center space-y-4 max-w-2xl mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-[#0B1E2B] font-display">
            Noah is enrolled in Creative Writing Studio!
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            We&apos;ve sent your receipt and class link to <strong className="text-slate-900">{email}</strong>. First session starts Monday, November 9 at 4:00 PM ET.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/dashboard/schedule"
              className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-xs transition-all"
            >
              <span>View in schedule</span>
            </Link>
            <Link
              href="/dashboard/my-learning"
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold px-5 py-2.5 rounded-full transition-all"
            >
              <span>Go to My learning</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Main 2-Column Checkout Layout */
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Form Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Who's learning */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                  Who&apos;s learning?
                </h2>
                <Link
                  href="/programs"
                  className="text-xs font-semibold text-[#0A5C4C] hover:underline inline-flex items-center gap-1"
                >
                  <span>Change program</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Child</label>
                <Select
                  value={child}
                  onValueChange={(val) => val && setChild(val)}
                >
                  <SelectTrigger className="w-full bg-white border-slate-200 text-xs sm:text-sm text-slate-800 font-medium h-10">
                    <SelectValue placeholder="Select child" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Noah Thant · Grade 5">Noah Thant · Grade 5</SelectItem>
                    <SelectItem value="Emma Thant · Grade 8">Emma Thant · Grade 8</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Yellow Highlight Card for New Enrollment */}
              <div className="bg-[#FAF7EC] border border-[#ECE5CD] rounded-2xl p-5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 font-mono block">
                  New Enrollment
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Creative writing studio
                </h3>
                <p className="text-xs text-slate-600">
                  Grades 4–6 · Live small group · 4 learners
                </p>
                <div className="text-xs text-amber-950 font-semibold pt-1 border-t border-[#ECE5CD]">
                  4 × 60-minute lessons each month · Materials included
                </div>
              </div>

              <p className="text-[11px] text-slate-400 font-sans">
                Noah&apos;s Science explorers enrollment stays unchanged.
              </p>
            </div>

            {/* A time that works */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                A time that works
              </h2>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Available group</label>
                <Select
                  value={selectedTime}
                  onValueChange={(val) => val && setSelectedTime(val)}
                >
                  <SelectTrigger className="w-full bg-white border-slate-200 text-xs sm:text-sm text-slate-800 font-medium h-10">
                    <SelectValue placeholder="Select available group time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mondays · 4:00–5:00 PM ET">Mondays · 4:00–5:00 PM ET</SelectItem>
                    <SelectItem value="Thursdays · 5:30–6:30 PM ET">Thursdays · 5:30–6:30 PM ET</SelectItem>
                    <SelectItem value="Saturdays · 11:00 AM–12:00 PM ET">Saturdays · 11:00 AM–12:00 PM ET</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-xs font-semibold text-slate-800">
                Starts Monday, November 9, 2026 · Eastern Time (UTC-5)
              </div>

              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                4 learners per group, within our 3–5 learner format. Your tutor and joining link appear in My learning after enrollment.
              </p>
            </div>

            {/* Parent & payment */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                Parent &amp; payment
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Parent name</label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Receipt email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>
              </div>

              {/* Saved Card Option */}
              <div className="p-3.5 rounded-2xl border-2 border-[#0A5C4C] bg-[#EAF5F2]/50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-mono font-black text-blue-700">
                    VISA
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Visa •••• 4242 · Expires 08/28</div>
                  </div>
                </div>
                <Badge className="text-[11px] font-bold text-[#0A5C4C] bg-white hover:bg-white px-2.5 py-1 rounded-full border border-[#CCE8E0]">
                  Selected
                </Badge>
              </div>

              <div className="text-xs">
                <button
                  type="button"
                  className="font-bold text-[#0A5C4C] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Use a different payment method</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Billing address */}
              <div className="space-y-1 pt-1">
                <label className="text-xs font-bold text-slate-700">Billing address</label>
                <input
                  type="text"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                />
              </div>

              <p className="text-[11px] text-slate-400">
                Payment is encrypted. Card details are never shared with tutors.
              </p>
            </div>

            {/* Before you confirm yellow note */}
            <Alert className="bg-[#FAF7EC] border-[#ECE5CD] rounded-3xl p-5 space-y-1.5 text-amber-950">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-950 font-display">
                <Info className="w-4 h-4 text-amber-700 shrink-0" />
                <AlertTitle className="text-xs font-bold text-amber-950 font-display">Before you confirm</AlertTitle>
              </div>
              <AlertDescription className="text-xs text-amber-900/90 leading-relaxed font-sans">
                You&apos;ll be charged $120 today. Your plan renews monthly on the 9th. Cancel future renewals from Billing before the next payment.
              </AlertDescription>
            </Alert>

          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Your Order Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block mb-1">
                  Your Order
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  A little imagination. A lot of growth.
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Creative writing studio · Noah Thant · Monthly small-group plan
                </p>
              </div>

              {/* Price items */}
              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex justify-between">
                  <span>4 live lessons</span>
                  <span className="font-semibold text-slate-800">$120.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Materials &amp; enrollment</span>
                  <span className="font-semibold text-slate-800">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-semibold text-slate-800">$0.00</span>
                </div>
              </div>

              {/* Total row */}
              <div className="border-t border-slate-200/80 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">Due today</span>
                  <span className="text-2xl font-black text-[#0B1E2B] font-display">$120.00</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Then $120/month · Next payment Dec 9, 2026
                </div>
              </div>

              {/* Promo code */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-[11px] font-bold text-slate-700 block">Promo code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono uppercase focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>

                {promoError && (
                  <Alert variant="destructive" className="bg-rose-50 border-rose-200 rounded-xl p-3 text-xs text-rose-800 space-y-0.5">
                    <div className="font-bold flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <AlertTitle className="text-xs font-bold text-rose-900">This code isn&apos;t valid</AlertTitle>
                    </div>
                    <AlertDescription className="text-[11px] text-rose-700/90 leading-tight">
                      Remove it or enter a different code. Your total is unchanged.
                    </AlertDescription>
                  </Alert>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setPromoCode("");
                    setPromoError(false);
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-700 hover:underline cursor-pointer"
                >
                  Remove code
                </button>
              </div>

              {/* Agreement */}
              <div className="pt-2">
                <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    required
                    className="mt-0.5 rounded border-slate-300 text-[#0A5C4C] focus:ring-[#0A5C4C]"
                  />
                  <span>
                    I agree to the enrollment terms, monthly renewal and cancellation policy.
                  </span>
                </label>
              </div>

              {/* CTA button */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-sm font-bold py-3 px-5 rounded-full shadow-xs hover:shadow transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Pay $120 &amp; enroll Noah</span>
              </button>

              <div className="text-[10px] text-rose-600 text-center leading-snug">
                Illustrative pricing. No real payment is processed in this sample workspace.
              </div>
            </div>

            {/* A clear start together */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
              <h4 className="text-sm font-bold text-slate-900 font-display">
                A clear start, together
              </h4>
              <div className="space-y-2 text-xs text-slate-600 font-sans">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0A5C4C] font-bold" />
                  <span>Confirmation and receipt by email</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0A5C4C] font-bold" />
                  <span>Lessons added to your schedule</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0A5C4C] font-bold" />
                  <span>Tutor introduction before your first class</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/dashboard/help"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A5C4C] hover:underline"
                >
                  <span>Questions? Contact family support</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </form>
      )}

      {/* Illustrative Footer Note */}
      <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-4 border-t border-slate-200/60 font-sans">
        <Info className="w-3.5 h-3.5 shrink-0" />
        <span>Sample workspace · Students, tutors, progress and billing are illustrative. No real student data is shown.</span>
      </div>
    </div>
  );
}

