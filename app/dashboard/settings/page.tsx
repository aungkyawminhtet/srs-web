"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Check,
  User,
  ShieldCheck,
  Smartphone,
  Laptop,
  Globe2,
  Bell,
  UserPlus,
  ArrowUpRight,
  Info,
  ChevronRight,
  Plus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "family" | "security" | "preferences">("all");
  const [savedBanner, setSavedBanner] = useState(true);

  // Form states
  const [firstName, setFirstName] = useState("May");
  const [lastName, setLastName] = useState("Thant");
  const [email, setEmail] = useState("may.thant@example.com");
  const [phone, setPhone] = useState("+1 (617) 555-0148");
  const [relationship, setRelationship] = useState("Parent / guardian");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("America/New_York");
  const [timeFormat, setTimeFormat] = useState("12-hour · 5:00 PM");

  // Notifications toggles
  const [reminders, setReminders] = useState(true);
  const [messages, setMessages] = useState(true);
  const [weeklyProgress, setWeeklyProgress] = useState(true);
  const [tips, setTips] = useState(false);

  const handleSave = () => {
    setSavedBanner(true);
    setTimeout(() => {
      // Keep banner visible
    }, 100);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 font-mono block mb-1">
            Thursday, November 5, 2026 · Parent Portal
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
            A space that fits your family.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your family, account security and the way you hear from us.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-xs hover:shadow transition-all shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <span>Save preferences</span>
          <Check className="w-4 h-4" />
        </button>
      </div>

      {/* Preferences Saved Alert */}
      {savedBanner && (
        <Alert className="bg-[#EAF5F2] border-[#CCE8E0] rounded-2xl p-4 flex items-center justify-between text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0A5C4C] shrink-0" />
            <AlertDescription className="text-slate-700 text-xs">
              <strong className="text-slate-900">Preferences saved: </strong>
              Your language, timezone and notification settings were saved today at 4:10 PM ET.
            </AlertDescription>
          </div>
          <button
            type="button"
            onClick={() => setSavedBanner(false)}
            className="text-xs font-semibold text-[#0A5C4C] hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        </Alert>
      )}

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
        {[
          { id: "all", label: "All settings" },
          { id: "family", label: "Family" },
          { id: "security", label: "Security" },
          { id: "preferences", label: "Preferences" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#0A5C4C] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column: Profile & Family (7 cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Parent profile */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Parent profile
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">First name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Last name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Email address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                />
                <CheckCircle2 className="w-4 h-4 text-[#0A5C4C] absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-[11px] text-slate-400">
                Verified · Used for sign-in and family updates
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Phone number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Relationship</label>
                <Select
                  value={relationship}
                  onValueChange={(val) => val && setRelationship(val)}
                >
                  <SelectTrigger className="w-full bg-white border-slate-200 text-xs sm:text-sm text-slate-700 h-10">
                    <SelectValue placeholder="Relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Parent / guardian">Parent / guardian</SelectItem>
                    <SelectItem value="Stepparent">Stepparent</SelectItem>
                    <SelectItem value="Grandparent">Grandparent</SelectItem>
                    <SelectItem value="Advocate">Advocate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 pt-1">
              Only you and authorized family administrators can change these details.
            </p>
          </div>

          {/* Your children */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Your children
            </h2>

            <div className="space-y-3">
              {/* Child 1: Emma */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E5EAE8] text-[#0A5C4C] font-bold text-xs flex items-center justify-center font-display border border-slate-200">
                    ET
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">Emma Thant</div>
                    <div className="text-[11px] text-slate-500">
                      Grade 8 · Algebra I · Student account active
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Editing Emma's profile")}
                  className="text-xs font-bold text-slate-700 hover:text-[#0A5C4C] px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Edit profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Child 2: Noah */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FFF4ED] text-amber-900 font-bold text-xs flex items-center justify-center font-display border border-amber-200">
                    NT
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">Noah Thant</div>
                    <div className="text-[11px] text-slate-500">
                      Grade 5 · Science explorers · Student account active
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Editing Noah's profile")}
                  className="text-xs font-bold text-slate-700 hover:text-[#0A5C4C] px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Edit profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
              <button
                type="button"
                onClick={() => alert("Add a child")}
                className="font-bold text-slate-800 hover:text-[#0A5C4C] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add a child</span>
              </button>

              <button
                type="button"
                className="font-bold text-[#0A5C4C] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Manage student access</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              Parents manage enrollments and payments. Students can access lessons, assignments and their learning progress.
            </p>
          </div>

          {/* Security & sign-in */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Security &amp; sign-in
            </h2>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#0A5C4C]" />
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      Two-step verification
                    </span>
                    <span className="text-[10px] font-bold text-[#0A5C4C] bg-[#EAF5F2] px-2 py-0.5 rounded-full font-mono">
                      On
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Authenticator app · Enabled Oct 12
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => alert("Change password modal")}
                    className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50"
                  >
                    Change password
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Viewing recovery codes")}
                    className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50"
                  >
                    Recovery codes
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-slate-400">
                Password last changed Oct 12, 2026 · Recovery email verified
              </div>

              {/* Active device */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Laptop className="w-5 h-5 text-slate-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Chrome on macOS · Boston, MA</div>
                    <div className="text-[11px] text-slate-400">Current session · Active today at 4:10 PM ET</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-full">
                  This device &gt;
                </span>
              </div>

              <button
                type="button"
                className="text-xs font-bold text-[#0A5C4C] hover:underline inline-flex items-center gap-1 cursor-pointer pt-1"
              >
                <span>Manage devices &amp; sign out others</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Language, Notifications & Access (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Language & timezone */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Language &amp; timezone
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Portal language</label>
                <Select
                  value={language}
                  onValueChange={(val) => val && setLanguage(val)}
                >
                  <SelectTrigger className="w-full bg-white border-slate-200 text-xs sm:text-sm text-slate-800 h-10">
                    <SelectValue placeholder="Portal language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Burmese">Burmese</SelectItem>
                    <SelectItem value="Chinese (Mandarin)">Chinese (Mandarin)</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-[10px] text-slate-400">Also available: Burmese and Chinese</div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Timezone</label>
                <Select
                  value={timezone}
                  onValueChange={(val) => val && setTimezone(val)}
                >
                  <SelectTrigger className="w-full bg-white border-slate-200 text-xs sm:text-sm text-slate-800 h-10">
                    <SelectValue placeholder="Timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">America/New_York (ET)</SelectItem>
                    <SelectItem value="America/Chicago">America/Chicago (CT)</SelectItem>
                    <SelectItem value="America/Denver">America/Denver (MT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">America/Los_Angeles (PT)</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-[10px] text-slate-400">
                  Eastern Time · UTC-5 today. Daylight saving changes are applied automatically.
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Time format</label>
                <Select
                  value={timeFormat}
                  onValueChange={(val) => val && setTimeFormat(val)}
                >
                  <SelectTrigger className="w-full bg-white border-slate-200 text-xs sm:text-sm text-slate-800 h-10">
                    <SelectValue placeholder="Time format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12-hour · 5:00 PM">12-hour · 5:00 PM</SelectItem>
                    <SelectItem value="24-hour · 17:00">24-hour · 17:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mint timezone tip box */}
              <Alert className="bg-[#EAF5F2] border-[#CCE8E0] rounded-2xl p-4 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0A5C4C] shrink-0 mt-0.5" />
                <AlertDescription className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">One clear family schedule: </strong>
                  Lessons and due dates display in your selected timezone.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          {/* Keep me in the loop (Notification switches) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Keep me in the loop
            </h3>

            <div className="space-y-3 text-xs">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Lesson reminders</div>
                  <div className="text-slate-500 text-[11px]">Email · 24 hours and 10 minutes before</div>
                </div>
                <Switch
                  checked={reminders}
                  onCheckedChange={setReminders}
                  className="data-checked:bg-[#0A5C4C]"
                />
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Tutor messages</div>
                  <div className="text-slate-500 text-[11px]">Email &amp; portal notifications</div>
                </div>
                <Switch
                  checked={messages}
                  onCheckedChange={setMessages}
                  className="data-checked:bg-[#0A5C4C]"
                />
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Weekly progress</div>
                  <div className="text-slate-500 text-[11px]">Email · Every Sunday</div>
                </div>
                <Switch
                  checked={weeklyProgress}
                  onCheckedChange={setWeeklyProgress}
                  className="data-checked:bg-[#0A5C4C]"
                />
              </div>

              {/* Toggle 4 */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Tips &amp; new programs</div>
                  <div className="text-slate-500 text-[11px]">Occasional email</div>
                </div>
                <Switch
                  checked={tips}
                  onCheckedChange={setTips}
                  className="data-checked:bg-[#0A5C4C]"
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
              Billing receipts and essential account security notices are always sent.
            </p>
          </div>

          {/* Family access */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Family access
            </h3>
            <div className="text-xs">
              <div className="font-bold text-slate-900">May Thant · Family administrator</div>
              <div className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                No other guardians have access. Invite a trusted adult to help manage your family&apos;s learning.
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert("Invite guardian")}
              className="w-full inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold py-2.5 px-4 rounded-full transition-all cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Invite a guardian</span>
            </button>

            <div className="pt-1">
              <button
                type="button"
                className="text-xs font-semibold text-[#0A5C4C] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Privacy &amp; data preferences</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Illustrative Footer Note */}
      <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-4 border-t border-slate-200/60 font-sans">
        <Info className="w-3.5 h-3.5 shrink-0" />
        <span>Sample workspace · Students, tutors, progress and billing are illustrative. No real student data is shown.</span>
      </div>
    </div>
  );
}

