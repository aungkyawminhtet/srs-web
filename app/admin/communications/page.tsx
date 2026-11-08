"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Plus,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
  Bold,
  Italic,
  Underline,
  Link2,
  List,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

export default function AdminCommunicationsPage() {
  const [selectedTab, setSelectedTab] = useState("compose");
  const [searchQuery, setSearchQuery] = useState("");
  const [messageType, setMessageType] = useState("Lesson preparation · Transactional");
  const [language, setLanguage] = useState("English");
  const [subject, setSubject] = useState("A small experiment for Noah's Friday lesson");
  const [body, setBody] = useState(
    `Hi May,\n\nNoah's Science explorers lesson with Thiri Aung is on Friday, November 6 at 6:00 PM Eastern Time (UTC-5). Please bring a cup of water and a spoon for our materials experiment.\n\nYour classroom and preparation notes are in your family dashboard. If this time no longer works, please request a schedule change.\n\nHappy exploring, the Fun and Learn team`
  );

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
              Communications
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Relevant messages, in the right language, with delivery you can trace.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>Manage templates</span>
            </button>
            <button
              type="button"
              className="px-3.5 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New message</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Delivered this week</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">214</div>
          <div className="text-[11px] text-teal-700 font-medium mt-1">
            Transactional & family updates
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Delivery exceptions</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">3</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            2 bounced · 1 missing guardian email
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Scheduled messages</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">4</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Next send: Nov 6 · 9:00 AM ET
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Conversations to answer</div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">6</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Oldest family reply: 3 hours ago
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200/80 pb-2">
        {[
          { id: "compose", label: "Compose", count: 0 },
          { id: "inbox", label: "Family inbox", count: 6 },
          { id: "scheduled", label: "Scheduled", count: 4 },
          { id: "history", label: "Delivery history", count: 0 },
          { id: "templates", label: "Templates", count: 0 },
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
            {tab.label} {tab.count > 0 && <span className="opacity-70 ml-1 font-normal">{tab.count}</span>}
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations or campaigns"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Select defaultValue="Audience: Families">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Audience: Families" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Audience: Families">Audience: Families</SelectItem>
              <SelectItem value="Audience: Tutors">Audience: Tutors</SelectItem>
              <SelectItem value="Audience: All">Audience: All</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Channel: Email">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="Channel: Email" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Channel: Email">Channel: Email</SelectItem>
              <SelectItem value="Channel: In-app">Channel: In-app</SelectItem>
              <SelectItem value="Channel: SMS">Channel: SMS</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="This week">
            <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-700 font-medium text-xs h-8">
              <SelectValue placeholder="This week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="This week">This week</SelectItem>
              <SelectItem value="Today">Today</SelectItem>
            </SelectContent>
          </Select>

          <button
            onClick={() => setSearchQuery("")}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Grid: Compose Card + Audience & Delivery Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Compose Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Draft · Not Sent
            </span>
            <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Save draft</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div>
            <h2 className="text-xl font-black text-[#0B1E2B] font-display">
              Friday science lesson reminder
            </h2>
          </div>

          {/* Type & Language Version */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Message type
              </label>
              <Select
                value={messageType}
                onValueChange={(val) => val && setMessageType(val)}
              >
                <SelectTrigger className="w-full bg-slate-50 border-slate-200 text-xs text-slate-800 font-medium h-9">
                  <SelectValue placeholder="Message type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lesson preparation · Transactional">Lesson preparation · Transactional</SelectItem>
                  <SelectItem value="Progress report update">Progress report update</SelectItem>
                  <SelectItem value="Account & billing notice">Account & billing notice</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Language version
              </label>
              <Select
                value={language}
                onValueChange={(val) => val && setLanguage(val)}
              >
                <SelectTrigger className="w-full bg-slate-50 border-slate-200 text-xs text-slate-800 font-medium h-9">
                  <SelectValue placeholder="Language version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Burmese">Burmese</SelectItem>
                  <SelectItem value="Chinese">Chinese</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Subject */}
          <div className="text-xs">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium"
            />
          </div>

          {/* Rich text editor box */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white text-xs">
            {/* Toolbar */}
            <div className="bg-slate-50 border-b border-slate-200/80 px-3 py-1.5 flex items-center gap-2 text-slate-600">
              <button type="button" className="p-1 hover:bg-slate-200 rounded font-bold">
                B
              </button>
              <button type="button" className="p-1 hover:bg-slate-200 rounded italic">
                I
              </button>
              <button type="button" className="p-1 hover:bg-slate-200 rounded underline">
                U
              </button>
              <span className="w-px h-4 bg-slate-300 mx-1" />
              <button type="button" className="p-1 hover:bg-slate-200 rounded flex items-center gap-1 text-[11px]">
                <Link2 className="w-3 h-3" />
                <span>Link</span>
              </button>
              <button type="button" className="p-1 hover:bg-slate-200 rounded flex items-center gap-1 text-[11px]">
                <List className="w-3 h-3" />
                <span>List</span>
              </button>
              <span className="w-px h-4 bg-slate-300 mx-1" />
              <button type="button" className="p-1 hover:bg-slate-200 rounded text-[11px] text-teal-700 font-semibold">
                Insert family name ▾
              </button>
            </div>

            {/* Textarea */}
            <textarea
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-3 text-xs text-slate-800 leading-relaxed focus:outline-none resize-none font-sans"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <span className="text-[11px] text-slate-400">
              Draft saved at 3:42 PM ET · Guardian-only message
            </span>
            <button
              type="button"
              className="py-2.5 px-5 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
            >
              Preview & review send
            </button>
          </div>
        </div>

        {/* Audience & Delivery Drawer (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#0B1E2B]">Audience & delivery</h3>
            <Badge variant="secondary" className="border-none font-bold text-[10px] bg-teal-100 text-teal-800">
              1 guardian selected
            </Badge>
          </div>

          <div className="space-y-1 text-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Audience rules
            </div>
            <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              Science explorers · Noah Thant · Authorized guardians only
            </p>
          </div>

          {/* Recipient Item */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-[#0B1E2B]">May Thant</div>
              <div className="text-[11px] text-slate-400">
                Linked guardian · English · America/New_York
              </div>
            </div>
            <Badge variant="secondary" className="border-none font-bold text-[10px] bg-teal-100 text-teal-800">
              Included
            </Badge>
          </div>

          {/* Send time */}
          <div className="space-y-1 text-xs">
            <label className="block text-[11px] font-bold text-slate-700">
              Send time
            </label>
            <input
              type="text"
              defaultValue="Nov 6, 2026 · 9:00 AM ET"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium"
            />
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Family local time: Nov 6 · 9:00 AM
            </span>
          </div>

          {/* Safeguard banner */}
          <Alert className="p-3 bg-teal-50/80 border-teal-200/80 rounded-xl flex items-start gap-2.5 text-xs text-teal-900">
            <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <AlertDescription className="text-xs text-teal-900">
              No student email addresses are included. Review recipients before scheduling.
            </AlertDescription>
          </Alert>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            For multilingual campaigns, review each translation before sending. Marketing messages exclude opted-out guardians.
          </p>

          <button
            type="button"
            className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Edit audience
          </button>
        </div>
      </div>

      {/* Bottom Section: Recent delivery history */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#0B1E2B]">Recent delivery history</h2>
          <button className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer">
            <span>View all messages</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <Table className="text-left text-xs">
            <TableHeader className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <TableRow>
                <TableHead className="py-3 px-4 text-slate-400 font-bold">Message / Audience</TableHead>
                <TableHead className="py-3 px-3 text-slate-400 font-bold">Channel</TableHead>
                <TableHead className="py-3 px-3 text-slate-400 font-bold">Sent At (ET)</TableHead>
                <TableHead className="py-3 px-3 text-slate-400 font-bold">Delivery</TableHead>
                <TableHead className="py-3 px-4 text-right text-slate-400 font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-100">
              <TableRow className="hover:bg-slate-50/80">
                <TableCell className="py-3 px-4">
                  <div className="font-bold text-[#0B1E2B]">Emma&apos;s lesson notes</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    May Thant · Sent by Lin Chen · English
                  </div>
                </TableCell>
                <TableCell className="py-3 px-3 text-slate-700 font-medium">In-app</TableCell>
                <TableCell className="py-3 px-3 text-slate-600">Nov 5 · 2:45 PM</TableCell>
                <TableCell className="py-3 px-3">
                  <Badge variant="secondary" className="border-none font-bold text-[10px] bg-teal-100 text-teal-800">
                    Delivered
                  </Badge>
                </TableCell>
                <TableCell className="py-3 px-4 text-right">
                  <span className="font-semibold text-teal-800 hover:underline cursor-pointer">
                    View conversation
                  </span>
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-slate-50/80">
                <TableCell className="py-3 px-4">
                  <div className="font-bold text-[#0B1E2B]">November invoice reminder</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Anita Patel · INV-26013 · English
                  </div>
                </TableCell>
                <TableCell className="py-3 px-3 text-slate-700 font-medium">Email</TableCell>
                <TableCell className="py-3 px-3 text-slate-600">Nov 4 · 9:00 AM</TableCell>
                <TableCell className="py-3 px-3">
                  <Badge variant="secondary" className="border-none font-bold text-[10px] bg-rose-100 text-rose-800">
                    Bounced
                  </Badge>
                </TableCell>
                <TableCell className="py-3 px-4 text-right">
                  <span className="font-semibold text-teal-800 hover:underline cursor-pointer">
                    Verify guardian email
                  </span>
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-slate-50/80">
                <TableCell className="py-3 px-4">
                  <div className="font-bold text-[#0B1E2B]">Weekly learning update</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    24 authorized guardians · English / Spanish
                  </div>
                </TableCell>
                <TableCell className="py-3 px-3 text-slate-700 font-medium">Email</TableCell>
                <TableCell className="py-3 px-3 text-slate-600">Nov 3 · 10:00 AM</TableCell>
                <TableCell className="py-3 px-3">
                  <Badge variant="secondary" className="border-none font-bold text-[10px] bg-amber-100 text-amber-800">
                    23 / 24 delivered
                  </Badge>
                </TableCell>
                <TableCell className="py-3 px-4 text-right">
                  <span className="font-semibold text-teal-800 hover:underline cursor-pointer">
                    Review 1 exception
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="p-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Delivery is not the same as read · No message is sent from this sample workspace</span>
          <Pagination className="mx-0 w-auto">
            <PaginationContent className="gap-1 font-bold text-slate-600">
              <PaginationItem>
                <PaginationPrevious href="#" className="h-7 px-2 text-xs hover:bg-slate-100" />
              </PaginationItem>
              <PaginationItem>
                <span className="px-2 text-xs">Page 1</span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" className="h-7 px-2 text-xs hover:bg-slate-100" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

