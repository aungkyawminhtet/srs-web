"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  FileCode,
  Image as ImageIcon,
  Video,
  Download,
  Bookmark,
  BookmarkCheck,
  Search,
  CheckCircle2,
  BookOpen,
  Filter,
} from "lucide-react";
import { libraryApi, LibraryFileItem } from "@/lib/api";
import { useLibraryQuery, useToggleSaveLibraryMutation } from "@/hooks/api";

const DEFAULT_LIBRARY_ITEMS: LibraryFileItem[] = [
  {
    _id: "lib-1",
    title: "Algebra I: Linear Equations Formula & Cheat Sheet",
    type: "pdf",
    course: "Algebra I, minus the overwhelm",
    subject: "Mathematics",
    description: "Step-by-step formula reference for two-step and multi-step equations, inverse operations, and check methods.",
    fileSize: "2.4 MB",
    fileUrl: "#",
    isSavedByUser: true,
    downloads: 142,
    uploadedBy: "Lin Chen",
    createdAt: "2026-11-04",
  },
  {
    _id: "lib-2",
    title: "Cell Structure & Organelles Microscopic Diagram Pack",
    type: "image",
    course: "Science, explored",
    subject: "Biology",
    description: "High-resolution labeled microscopy diagrams of plant and animal cells, chloroplasts, and cell membrane structures.",
    fileSize: "8.1 MB",
    fileUrl: "#",
    isSavedByUser: false,
    downloads: 98,
    uploadedBy: "Dr. Maya Patel",
    createdAt: "2026-11-03",
  },
  {
    _id: "lib-3",
    title: "The Scale Balance Method Visual Lesson Walkthrough",
    type: "video",
    course: "Algebra I, minus the overwhelm",
    subject: "Mathematics",
    description: "12-minute video walkthrough showing how to keep both sides of an algebraic equation equal.",
    fileSize: "45.0 MB",
    fileUrl: "#",
    isSavedByUser: true,
    downloads: 215,
    uploadedBy: "Lin Chen",
    createdAt: "2026-11-02",
  },
  {
    _id: "lib-4",
    title: "Scientific Method Hypothesis Template & Lab Guide",
    type: "document",
    course: "Science, explored",
    subject: "Biology",
    description: "Structured Word document template for writing testable hypotheses and logging experimental variables.",
    fileSize: "1.1 MB",
    fileUrl: "#",
    isSavedByUser: false,
    downloads: 77,
    uploadedBy: "Dr. Maya Patel",
    createdAt: "2026-11-01",
  },
  {
    _id: "lib-5",
    title: "1501208 Relational Schema & ERD Architecture Handbook",
    type: "pdf",
    course: "1501208 Database Systems",
    subject: "Computer Science",
    description: "Reference manual for primary keys, foreign keys, normalization 1NF through BCNF, and relational algebra.",
    fileSize: "5.6 MB",
    fileUrl: "#",
    isSavedByUser: true,
    downloads: 189,
    uploadedBy: "Lin Chen",
    createdAt: "2026-10-28",
  },
  {
    _id: "lib-6",
    title: "Interactive Slope & Coordinate Grid Exercises",
    type: "document",
    course: "Algebra I, minus the overwhelm",
    subject: "Mathematics",
    description: "Practice problems covering slope calculation, rise-over-run, and y-intercept graphing.",
    fileSize: "3.2 MB",
    fileUrl: "#",
    isSavedByUser: false,
    downloads: 110,
    uploadedBy: "Lin Chen",
    createdAt: "2026-10-25",
  },
];

export default function LearningLibraryPage() {
  const { data: serverItems } = useLibraryQuery();
  const toggleSaveMutation = useToggleSaveLibraryMutation();

  const [items, setItems] = useState<LibraryFileItem[]>(DEFAULT_LIBRARY_ITEMS);
  const [typeFilter, setTypeFilter] = useState<"all" | "pdf" | "document" | "image" | "video" | "saved">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (serverItems && Array.isArray(serverItems) && serverItems.length > 0) {
      setItems(serverItems as any);
    }
  }, [serverItems]);

  const toggleSave = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, isSavedByUser: !item.isSavedByUser } : item
      )
    );
    toggleSaveMutation.mutate(id);
  };

  const handleDownload = (item: LibraryFileItem) => {
    setDownloadSuccess(`Downloaded "${item.title}" successfully.`);
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  const filtered = items.filter((item) => {
    if (typeFilter === "saved") {
      if (!item.isSavedByUser) return false;
    } else if (typeFilter !== "all" && item.type !== typeFilter) {
      return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.course.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-slate-400 font-mono block mb-1.5">
            Student Portal · Course Materials &amp; Media Repository
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#0B1E2B] tracking-tight font-display">
            Course Learning Library
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed">
            Access, save, and download course PDF files, documents, diagrams, and video walkthroughs provided by your tutors.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search files by title or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-xs focus:outline-none focus:border-[#0A5C4C] shadow-2xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-3">
        <button
          type="button"
          onClick={() => setTypeFilter("all")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            typeFilter === "all"
              ? "bg-[#0A5C4C] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          All Materials ({items.length})
        </button>
        <button
          type="button"
          onClick={() => setTypeFilter("pdf")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            typeFilter === "pdf"
              ? "bg-[#0A5C4C] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          PDFs ({items.filter((i) => i.type === "pdf").length})
        </button>
        <button
          type="button"
          onClick={() => setTypeFilter("document")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            typeFilter === "document"
              ? "bg-[#0A5C4C] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Documents ({items.filter((i) => i.type === "document").length})
        </button>
        <button
          type="button"
          onClick={() => setTypeFilter("image")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            typeFilter === "image"
              ? "bg-[#0A5C4C] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Images &amp; Diagrams ({items.filter((i) => i.type === "image").length})
        </button>
        <button
          type="button"
          onClick={() => setTypeFilter("video")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            typeFilter === "video"
              ? "bg-[#0A5C4C] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Videos ({items.filter((i) => i.type === "video").length})
        </button>
        <button
          type="button"
          onClick={() => setTypeFilter("saved")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            typeFilter === "saved"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Saved in My Library ({items.filter((i) => i.isSavedByUser).length})
        </button>
      </div>

      {downloadSuccess && (
        <div className="bg-[#EAF5F2] border border-[#0A5C4C]/30 text-[#0A5C4C] text-xs font-bold p-3 rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Materials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const isPdf = item.type === "pdf";
          const isVideo = item.type === "video";
          const isImage = item.type === "image";

          return (
            <div
              key={item._id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isPdf
                          ? "bg-rose-50 text-rose-600"
                          : isVideo
                          ? "bg-blue-50 text-blue-600"
                          : isImage
                          ? "bg-purple-50 text-purple-600"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {isPdf && <FileText className="w-4 h-4" />}
                      {isVideo && <Video className="w-4 h-4" />}
                      {isImage && <ImageIcon className="w-4 h-4" />}
                      {!isPdf && !isVideo && !isImage && <FileCode className="w-4 h-4" />}
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                      {item.type} · {item.fileSize}
                    </span>
                  </div>

                  {/* Bookmark Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleSave(item._id)}
                    title={item.isSavedByUser ? "Saved in your library" : "Save file"}
                    className="p-1.5 rounded-full text-slate-400 hover:text-amber-600 transition-colors cursor-pointer"
                  >
                    {item.isSavedByUser ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-600 fill-amber-600" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A5C4C] block mb-1">
                    {item.course}
                  </span>
                  <h3 className="text-base font-bold text-[#0B1E2B] font-display line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="text-[11px] text-slate-400 pt-1">
                  Provided by <strong className="text-slate-600">{item.uploadedBy}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => toggleSave(item._id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                    item.isSavedByUser
                      ? "bg-amber-50 text-amber-800 border border-amber-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item.isSavedByUser ? "Saved ✓" : "Save to library"}
                </button>

                <button
                  type="button"
                  onClick={() => handleDownload(item)}
                  className="inline-flex items-center gap-1.5 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-2xs transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
