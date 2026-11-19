"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Calendar as CalendarIcon,
  Clock,
  Video,
  Download,
  Info,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
} from "lucide-react";
import { schedulesApi, ScheduleBlock } from "@/lib/api";
import { useWeeklyScheduleQuery } from "@/hooks/api";
import { Skeleton } from "@/components/ui/skeleton";

const TIME_SLOTS = [
  "08.00",
  "09.00",
  "10.00",
  "11.00",
  "12.00",
  "13.00",
  "14.00",
  "15.00",
  "16.00",
  "17.00",
  "18.00",
  "7:00 PM",
  "20.00",
  "21.00",
];

const DAYS = [
  { index: 1, name: "Mo", day: "16", month: "Nov", fullDate: "Monday, 16 Nov 2026" },
  { index: 2, name: "Tu", day: "17", month: "Nov", fullDate: "Tuesday, 17 Nov 2026" },
  { index: 3, name: "We", day: "18", month: "Nov", fullDate: "Wednesday, 18 Nov 2026" },
  { index: 4, name: "Th", day: "19", month: "Nov", fullDate: "Thursday, 19 Nov 2026" },
  { index: 5, name: "Fr", day: "20", month: "Nov", fullDate: "Friday, 20 Nov 2026" },
  { index: 6, name: "Sa", day: "21", month: "Nov", fullDate: "Saturday, 21 Nov 2026" },
  { index: 7, name: "Su", day: "22", month: "Nov", fullDate: "Sunday, 22 Nov 2026" },
];

// 2 sample items aligned with DB
const DEFAULT_SCHEDULES: ScheduleBlock[] = [
  {
    courseCode: "1501206",
    courseTitle: "Computer Programming Fundamentals",
    dayIndex: 1,
    dayLabel: "Mo 16 Nov",
    startTime: "08:00",
    endTime: "10:00",
    startHour: 8,
    durationHours: 2,
    section: "3",
    teachingType: "LECT",
    buildingRoom: "E3 B 101",
    tutorName: "Lin Chen",
  },
  {
    courseCode: "1305215",
    courseTitle: "Discrete Mathematics & Logic",
    dayIndex: 2,
    dayLabel: "Tu 17 Nov",
    startTime: "10:00",
    endTime: "12:00",
    startHour: 10,
    durationHours: 2,
    section: "1",
    teachingType: "LECT",
    buildingRoom: "C1 314",
    tutorName: "Dr. Maya Patel",
  },
];

export default function SchedulePage() {
  const { data: remoteSchedules, isLoading: isScheduleLoading } = useWeeklyScheduleQuery();
  const [schedules, setSchedules] = useState<ScheduleBlock[]>(DEFAULT_SCHEDULES);
  const [activeItem, setActiveItem] = useState<{
    item: ScheduleBlock;
    fullDate: string;
  } | null>({
    item: DEFAULT_SCHEDULES[0],
    fullDate: "Monday, 16 Nov 2026",
  });

  useEffect(() => {
    if (remoteSchedules && Array.isArray(remoteSchedules) && remoteSchedules.length > 0) {
      setSchedules(remoteSchedules as any);
    }
  }, [remoteSchedules]);

  const handleExportPdf = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12 font-sans select-none">
      {/* Header with Title and PDF Export Button */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-slate-400 font-mono block mb-1.5">
            Weekly Class Timetable · Enrolled Courses
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#0B1E2B] tracking-tight font-display">
            Weekly Schedule
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1 leading-relaxed">
            16 Nov 2026 – 22 Nov 2026 · Interactive class room timetable
          </p>
        </div>

        {/* Circular PDF Export icon button matching the reference design */}
        <button
          type="button"
          onClick={handleExportPdf}
          title="Export schedule as PDF"
          className="w-10 h-10 rounded-full border-2 border-[#8B2323] text-[#8B2323] hover:bg-[#8B2323] hover:text-white flex items-center justify-center transition-all shadow-2xs group cursor-pointer shrink-0"
        >
          <div className="flex flex-col items-center justify-center text-[9px] font-black uppercase tracking-tighter leading-none">
            <span className="border-b border-current pb-0.5">PDF</span>
          </div>
        </button>
      </div>

      {/* Main Weekly Timetable Grid Table (Reference Image Layout) */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-x-auto relative">
        <div className="min-w-[1050px] relative">
          {/* Header Row: Times 08.00 to 21.00 */}
          <div className="grid grid-cols-[80px_repeat(14,1fr)] border-b border-slate-300 bg-slate-50/50 text-[11px] font-bold text-slate-700 text-center">
            <div className="p-2.5 border-r border-slate-300 font-mono">Day</div>
            {TIME_SLOTS.map((time, idx) => (
              <div
                key={idx}
                className="p-2.5 border-r border-slate-200 last:border-r-0 font-mono tracking-tight"
              >
                {time}
              </div>
            ))}
          </div>

          {/* Rows for Days: Mo 16 Nov to Su 22 Nov */}
          {isScheduleLoading ? (
            <div className="p-6 space-y-3">
              <Skeleton className="h-14 w-full rounded-xl" />
              <Skeleton className="h-14 w-full rounded-xl" />
            </div>
          ) : (
            <div className="relative">
            {DAYS.map((day) => {
              const daySchedules = schedules.filter((s) => s.dayIndex === day.index);

              return (
                <div
                  key={day.index}
                  className="grid grid-cols-[80px_repeat(14,1fr)] min-h-[64px] border-b border-slate-300 last:border-b-0 relative"
                >
                  {/* Left Day Label Column */}
                  <div className="p-2 border-r border-slate-300 bg-slate-50/30 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      {day.name}
                    </span>
                    <span className="text-sm font-black text-[#8B2323] leading-none">
                      {day.day}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase font-mono">
                      {day.month}
                    </span>
                  </div>

                  {/* 14 Time Grid Columns */}
                  {TIME_SLOTS.map((_, colIdx) => (
                    <div
                      key={colIdx}
                      className="border-r border-slate-200 last:border-r-0 h-full"
                    />
                  ))}

                  {/* Absolute Positioned Class Blocks for this Day */}
                  {daySchedules.map((item, itemIdx) => {
                    // Start column: 8.00 is hour 8 -> offset = (startHour - 8)
                    const offsetHours = item.startHour - 8;
                    const leftPercent = (offsetHours / 14) * 100;
                    const widthPercent = (item.durationHours / 14) * 100;

                    const isSelected =
                      activeItem?.item.courseCode === item.courseCode &&
                      activeItem?.item.dayIndex === item.dayIndex &&
                      activeItem?.item.section === item.section;

                    return (
                      <div
                        key={itemIdx}
                        onClick={() =>
                          setActiveItem({ item, fullDate: day.fullDate })
                        }
                        style={{
                          left: `calc(80px + (100% - 80px) * ${leftPercent / 100})`,
                          width: `calc((100% - 80px) * ${widthPercent / 100})`,
                        }}
                        className={`absolute top-1 bottom-1 rounded-sm p-1.5 flex flex-col justify-center text-center cursor-pointer transition-all border ${
                          isSelected
                            ? "bg-[#D9C2AD] border-[#8B2323] ring-2 ring-[#8B2323]/40 z-20 shadow-md"
                            : "bg-[#EAD9C6] hover:bg-[#DFCCB7] border-[#CFB79F] text-[#4A2E18] z-10"
                        }`}
                      >
                        <span className="text-[11px] font-black tracking-tight text-[#8B2323] border-b border-[#8B2323]/60 pb-0.5 inline-block mx-auto leading-tight">
                          {item.courseCode}
                        </span>
                        <span className="text-[10px] font-bold text-slate-800 leading-tight mt-0.5">
                          {item.section}
                        </span>
                        <span className="text-[10px] text-slate-700 leading-tight">
                          {item.buildingRoom}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          )}
        </div>

        {/* Popover Card matching reference screenshot */}
        {activeItem && (
          <div className="absolute top-[210px] left-[340px] max-w-sm w-80 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xl z-30 transition-all font-sans text-xs">
            <div className="flex items-start justify-between pb-2 border-b border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B2323] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Course Details
              </span>
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="text-slate-400 hover:text-slate-700 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1.5 pt-3">
              <div className="flex">
                <span className="font-bold text-[#8B2323] w-28 shrink-0">Date :</span>
                <span className="text-slate-800 font-semibold">{activeItem.fullDate}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-[#8B2323] w-28 shrink-0">Time :</span>
                <span className="text-slate-800">{activeItem.item.startTime} - {activeItem.item.endTime}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-[#8B2323] w-28 shrink-0">Course :</span>
                <span className="text-slate-900 font-bold">{activeItem.item.courseCode} {activeItem.item.courseTitle}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-[#8B2323] w-28 shrink-0">Section :</span>
                <span className="text-slate-800">{activeItem.item.section}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-[#8B2323] w-28 shrink-0">Teaching Type :</span>
                <span className="text-slate-800 font-bold text-[#8B2323]">{activeItem.item.teachingType}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-[#8B2323] w-28 shrink-0">Building / Room :</span>
                <span className="text-slate-800">{activeItem.item.buildingRoom}</span>
              </div>
              {activeItem.item.tutorName && (
                <div className="flex">
                  <span className="font-bold text-[#8B2323] w-28 shrink-0">Tutor :</span>
                  <span className="text-slate-800 font-medium">{activeItem.item.tutorName}</span>
                </div>
              )}
            </div>

            <div className="pt-3.5 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <Link
                href="/dashboard/my-learning"
                className="text-xs font-bold text-[#0A5C4C] hover:underline"
              >
                Course workspace →
              </Link>
              <button
                type="button"
                onClick={() => alert(`Connecting to room ${activeItem.item.buildingRoom}...`)}
                className="inline-flex items-center gap-1.5 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-2xs"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Join room</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
