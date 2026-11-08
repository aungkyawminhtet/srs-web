"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Settings,
  Search,
  ExternalLink,
  AlertCircle,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
  const [selectedTab, setSelectedTab] = useState("general");
  const [displayName, setDisplayName] = useState("Fun and Learn");
  const [currency, setCurrency] = useState("USD - US dollar");
  const [timezone, setTimezone] = useState("America/New_York");
  const [language, setLanguage] = useState("English");

  const [lessonReminders, setLessonReminders] = useState(true);
  const [studentMarketing, setStudentMarketing] = useState(false);
  const [duration, setDuration] = useState("60 minutes");
  const [buffer, setBuffer] = useState("15 minutes");
  const [smallGroupMin, setSmallGroupMin] = useState("3 learners");
  const [smallGroupMax, setSmallGroupMax] = useState("5 learners");
  const [validateRecurring, setValidateRecurring] = useState(true);
  const [requireGuardianApproval, setRequireGuardianApproval] = useState(true);

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          Administration / Thursday, November 5, 2026
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] font-display">
              Organization settings
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Defaults that keep learning safe, consistent and easy to coordinate.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-all cursor-pointer"
            >
              <span>Discard edits</span>
            </button>
            <button
              type="button"
              className="px-3.5 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <span>Review changes +</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Warning Banner */}
      <Alert className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <AlertDescription className="text-xs text-amber-900 leading-snug">
          Reference brand: Fun and Learn · K-12 live tutoring. The policies and configuration below are sample defaults, not verified live settings.
        </AlertDescription>
      </Alert>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200/80 pb-2">
        {[
          { id: "general", label: "General & scheduling" },
          { id: "notifications", label: "Notifications" },
          { id: "billing", label: "Billing policies" },
          { id: "privacy", label: "Privacy & retention" },
          { id: "integrations", label: "Integrations" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedTab === tab.id
                ? "bg-[#0B1E2B] text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Find a setting"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Select defaultValue="Organization defaults">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Organization defaults" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Organization defaults">Organization defaults</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Administrator access">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Administrator access" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Administrator access">Administrator access</SelectItem>
            </SelectContent>
          </Select>
          <button className="text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1 cursor-pointer">
            Reset
          </button>
        </div>
      </div>

      {/* Grid of Settings Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (7 cols): Organization & Localization + Lesson Scheduling Defaults */}
        <div className="lg:col-span-7 space-y-5">
          {/* Organization & localization */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
            <h2 className="text-sm font-bold text-[#0B1E2B]">
              Organization & localization
            </h2>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Display name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Default currency
                </label>
                <Select
                  value={currency}
                  onValueChange={(val) => val && setCurrency(val)}
                >
                  <SelectTrigger className="w-full bg-slate-50 border-slate-200 text-xs text-slate-800 font-medium h-9">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD - US dollar">USD - US dollar</SelectItem>
                    <SelectItem value="CAD - Canadian dollar">CAD - Canadian dollar</SelectItem>
                    <SelectItem value="GBP - British pound">GBP - British pound</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Organization timezone
                </label>
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  ET · UTC-5 on Nov 5, 2026
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Default language
                </label>
                <Select
                  value={language}
                  onValueChange={(val) => val && setLanguage(val)}
                >
                  <SelectTrigger className="w-full bg-slate-50 border-slate-200 text-xs text-slate-800 font-medium h-9">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Burmese">Burmese</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Family preferences override this default.
                </span>
              </div>
            </div>
          </div>

          {/* Lesson scheduling defaults */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
            <h2 className="text-sm font-bold text-[#0B1E2B]">
              Lesson scheduling defaults
            </h2>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Standard lesson duration
                </label>
                <Select
                  value={duration}
                  onValueChange={(val) => val && setDuration(val)}
                >
                  <SelectTrigger className="w-full bg-slate-50 border-slate-200 text-xs text-slate-800 font-medium h-9">
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60 minutes">60 minutes</SelectItem>
                    <SelectItem value="45 minutes">45 minutes</SelectItem>
                    <SelectItem value="90 minutes">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Tutor buffer between lessons
                </label>
                <Select
                  value={buffer}
                  onValueChange={(val) => val && setBuffer(val)}
                >
                  <SelectTrigger className="w-full bg-slate-50 border-slate-200 text-xs text-slate-800 font-medium h-9">
                    <SelectValue placeholder="Buffer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15 minutes">15 minutes</SelectItem>
                    <SelectItem value="10 minutes">10 minutes</SelectItem>
                    <SelectItem value="30 minutes">30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Small group minimum
                </label>
                <input
                  type="text"
                  value={smallGroupMin}
                  onChange={(e) => setSmallGroupMin(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Small group maximum
                </label>
                <input
                  type="text"
                  value={smallGroupMax}
                  onChange={(e) => setSmallGroupMax(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium"
                />
              </div>
            </div>

            {/* Toggle Switches */}
            <div className="space-y-3 pt-2 text-xs border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">
                    Validate every recurring occurrence
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Check tutor availability, learner overlaps and timezone shifts for the whole series.
                  </div>
                </div>
                <Switch
                  checked={validateRecurring}
                  onCheckedChange={setValidateRecurring}
                  className="data-checked:bg-[#0A5C4C]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">
                    Require guardian approval for schedule changes
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Keep the original lesson until the family confirms the proposed time.
                  </div>
                </div>
                <Switch
                  checked={requireGuardianApproval}
                  onCheckedChange={setRequireGuardianApproval}
                  className="data-checked:bg-[#0A5C4C]"
                />
              </div>
            </div>

            <Alert className="p-3 bg-teal-50/80 border border-teal-200/80 rounded-xl flex items-start gap-2.5 text-xs text-teal-900">
              <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <AlertDescription className="text-xs text-teal-900 leading-snug">
                Changes apply to newly created lessons. Existing bookings are not moved automatically.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Right Column (5 cols): Notifications & Privacy + Integrations */}
        <div className="lg:col-span-5 space-y-5">
          {/* Notifications & privacy */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
            <h2 className="text-sm font-bold text-[#0B1E2B]">
              Notifications & privacy
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">
                    Send family lesson reminders
                  </div>
                  <div className="text-[11px] text-slate-400">
                    24 hours and 1 hour before a confirmed lesson, in family local time.
                  </div>
                </div>
                <Switch
                  checked={lessonReminders}
                  onCheckedChange={setLessonReminders}
                  className="data-checked:bg-[#0A5C4C]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">
                    Student marketing messages
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Do not send marketing directly to child accounts.
                  </div>
                </div>
                <Switch
                  checked={studentMarketing}
                  onCheckedChange={setStudentMarketing}
                  className="data-checked:bg-[#0A5C4C]"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-slate-700">
                <div className="font-bold text-[11px]">Guardian communication</div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Use each family&apos;s preferred language; review translations before sending.
                </p>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Retention and consent policies require organization review before activation.
              </p>
            </div>
          </div>

          {/* Integrations */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0B1E2B]">Integrations</h2>
              <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
                <span>Manage connections</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Video classroom provider</span>
                  <Badge variant="secondary" className="bg-slate-200 text-slate-700 hover:bg-slate-200 border-none font-bold text-[10px]">
                    Not configured
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-400">
                  No provider configured in this sample workspace. Lesson room links must be added manually.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Payment processing</span>
                  <Badge variant="secondary" className="bg-slate-200 text-slate-700 hover:bg-slate-200 border-none font-bold text-[10px]">
                    Not connected
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-400">
                  No live account connected. Invoices and card references are illustrative.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Email delivery provider</span>
                  <Badge variant="secondary" className="bg-slate-200 text-slate-700 hover:bg-slate-200 border-none font-bold text-[10px]">
                    Not connected
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-400">
                  No delivery credentials supplied; review provider and sender verification before use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Card: Review before saving */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#0B1E2B]">Review before saving</h3>
            <span className="text-xs text-slate-400">·</span>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>View settings history</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <div className="font-semibold text-xs text-slate-800 mt-1">
            2 unsaved draft changes · Lesson buffer and recurring validation
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            A review records who changed a policy and when. No credentials, active integrations or live configuration are created by this design.
          </p>
        </div>

        <button
          type="button"
          className="px-5 py-2.5 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
        >
          Review 2 changes
        </button>
      </div>
    </div>
  );
}

