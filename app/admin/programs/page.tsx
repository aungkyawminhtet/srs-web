"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Plus,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  FileText,
  SlidersHorizontal,
  X,
  Edit2,
  Trash2,
  Eye,
  DollarSign,
  Layers,
  GraduationCap,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { programsService } from "@/lib/api/programs";
import { useProgramsQuery } from "@/hooks/api";
import { ProgramItem } from "@/lib/api";

export interface AdminProgramItem {
  id: string;
  name: string;
  subject: string;
  grades: string;
  format: string;
  enrolled: number;
  state: "Published" | "Draft" | "Archived";
  price: string;
  promise: string;
  delivery: string;
  thumbnail?: string;
}

// 2 sample items aligned with DB
const INITIAL_PROGRAMS: AdminProgramItem[] = [
  {
    id: "PR-001",
    name: "Algebra I, minus the overwhelm",
    subject: "Mathematics",
    grades: "7-10",
    format: "One-to-one",
    enrolled: 32,
    state: "Published",
    price: "$240/month",
    promise: "Build confidence with linear equations, graphing and real-world word problems.",
    delivery: "One-to-one · 60 min · 8 lessons / month",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "PR-002",
    name: "Math that clicks",
    subject: "Mathematics",
    grades: "4-8",
    format: "Both formats",
    enrolled: 28,
    state: "Published",
    price: "$210/month",
    promise: "Master fractions, decimals, ratios and foundational number sense without memorization drills.",
    delivery: "Both formats · 60 min · 4-8 lessons / month",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80",
  },
];

const SUBJECT_OPTIONS = [
  "Mathematics",
  "Science",
  "English",
  "Technology",
  "Test preparation",
  "Social Studies",
];

const GRADE_OPTIONS = ["K-3", "4-6", "7-9", "10-12", "All Levels"];
const FORMAT_OPTIONS = ["One-to-one", "Group · 3–5", "Both formats"];

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<AdminProgramItem[]>(INITIAL_PROGRAMS);
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const { data: dbPrograms, isLoading: isProgramsLoading } = useProgramsQuery();

  React.useEffect(() => {
    if (dbPrograms && dbPrograms.length > 0) {
      const mapped: AdminProgramItem[] = dbPrograms.map((p) => ({
        id: p._id,
        name: p.title,
        subject: p.curriculum || "General",
        grades: p.gradeLevel || "All Levels",
        format: "Both formats",
        enrolled: 0,
        state: p.status === "active" ? "Published" : p.status === "draft" ? "Draft" : "Archived",
        price: p.tuitionFee ? `$${p.tuitionFee}/month` : "$200/month",
        promise: p.description || "",
        delivery: "60 min · 4-8 lessons / month",
        thumbnail: p.thumbnail,
      }));
      setPrograms(mapped);
    }
  }, [dbPrograms]);

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    subject: "Mathematics",
    grades: "7-10",
    format: "One-to-one",
    price: "$240/month",
    promise: "",
    delivery: "One-to-one · 60 min · 8 lessons / month",
    state: "Published" as "Published" | "Draft",
    thumbnail: "",
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<AdminProgramItem | null>(null);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewingProgram, setViewingProgram] = useState<AdminProgramItem | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingProgram, setDeletingProgram] = useState<AdminProgramItem | null>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  // --- CRUD: CREATE ---
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.name || !createForm.subject) return;

    const newId = `PR-00${programs.length + 1}`;
    const newProgram: AdminProgramItem = {
      id: newId,
      name: createForm.name,
      subject: createForm.subject,
      grades: createForm.grades,
      format: createForm.format,
      enrolled: 0,
      state: createForm.state,
      price: createForm.price,
      promise: createForm.promise,
      delivery: createForm.delivery,
      thumbnail: createForm.thumbnail,
    };

    setPrograms([newProgram, ...programs]);
    showNotice(`Program "${newProgram.name}" created successfully!`);
    setIsCreateOpen(false);
    setCreateForm({
      name: "",
      subject: "Mathematics",
      grades: "7-10",
      format: "One-to-one",
      price: "$240/month",
      promise: "",
      delivery: "One-to-one · 60 min · 8 lessons / month",
      state: "Published",
      thumbnail: "",
    });
  };

  // --- CRUD: UPDATE ---
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgram) return;

    setPrograms((prev) =>
      prev.map((p) => (p.id === editingProgram.id ? editingProgram : p))
    );
    showNotice(`Program "${editingProgram.name}" updated successfully!`);
    setIsEditOpen(false);
    setEditingProgram(null);
  };

  // --- CRUD: DELETE ---
  const handleDeleteConfirm = () => {
    if (!deletingProgram) return;

    setPrograms((prev) => prev.filter((p) => p.id !== deletingProgram.id));
    showNotice(`Program "${deletingProgram.name}" deleted.`);
    setIsDeleteOpen(false);
    setDeletingProgram(null);
  };

  const filteredPrograms = programs.filter((p) => {
    if (selectedTab === "published" && p.state !== "Published") return false;
    if (selectedTab === "drafts" && p.state !== "Draft") return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.subject.toLowerCase().includes(q) ||
        p.grades.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans">
      {/* Toast Notice */}
      {notice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B1E2B] text-emerald-300 border border-emerald-500/40 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-slate-400 font-mono block mb-1.5">
            Admin Workspace · Academic Programs &amp; Curriculum
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#0B1E2B] tracking-tight font-display">
            Programs &amp; Course Pathways
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed">
            Manage course pathways, upload cover visuals (stored in local /uploads/programs), and configure curriculum specs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Program</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Programs
          </span>
          <div className="text-2xl font-black text-[#0B1E2B] font-display">
            {programs.length}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {programs.filter((p) => p.state === "Published").length} Published
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Active Enrollments
          </span>
          <div className="text-2xl font-black text-[#0B1E2B] font-display">
            {programs.reduce((acc, p) => acc + p.enrolled, 0)}
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">
            Across middle &amp; high school
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Subjects Offered
          </span>
          <div className="text-2xl font-black text-[#0B1E2B] font-display">
            {new Set(programs.map((p) => p.subject)).size}
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">
            STEM, Humanities &amp; SAT
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Media Storage
          </span>
          <div className="text-sm font-bold text-emerald-800 font-mono mt-1">
            /uploads/programs
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">
            Local + Cloud S3/Cloudinary ready
          </span>
        </div>
      </div>

      {/* Tabs and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 border-b md:border-b-0 pb-2 md:pb-0 border-slate-100">
          <button
            type="button"
            onClick={() => setSelectedTab("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedTab === "all"
                ? "bg-[#0A5C4C] text-white shadow-2xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            All Programs ({programs.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab("published")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedTab === "published"
                ? "bg-[#0A5C4C] text-white shadow-2xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Published ({programs.filter((p) => p.state === "Published").length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab("drafts")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedTab === "drafts"
                ? "bg-[#0A5C4C] text-white shadow-2xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Drafts ({programs.filter((p) => p.state === "Draft").length})
          </button>
        </div>

        <div className="relative flex-1 md:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search programs by title or subject..."
            className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
          />
        </div>
      </div>

      {/* Programs Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full text-left">
            <TableHeader>
              <TableRow className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                <TableHead className="py-3.5 px-4 font-bold text-slate-500">Program &amp; Visual</TableHead>
                <TableHead className="py-3.5 px-4 font-bold text-slate-500">Subject</TableHead>
                <TableHead className="py-3.5 px-4 font-bold text-slate-500">Grades</TableHead>
                <TableHead className="py-3.5 px-4 font-bold text-slate-500">Pricing</TableHead>
                <TableHead className="py-3.5 px-4 font-bold text-slate-500">Enrollment</TableHead>
                <TableHead className="py-3.5 px-4 font-bold text-slate-500">Status</TableHead>
                <TableHead className="py-3.5 px-4 text-right font-bold text-slate-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-100 text-xs">
              {isProgramsLoading ? (
                Array.from({ length: 2 }).map((_, idx) => (
                  <TableRow key={`prog-skeleton-${idx}`}>
                    <TableCell className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-14 h-10 rounded-xl shrink-0" />
                        <div className="space-y-1.5 min-w-0">
                          <Skeleton className="h-4 w-44" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5 px-4">
                      <Skeleton className="h-6 w-20 rounded-md" />
                    </TableCell>
                    <TableCell className="py-3.5 px-4">
                      <Skeleton className="h-4 w-12" />
                    </TableCell>
                    <TableCell className="py-3.5 px-4">
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell className="py-3.5 px-4">
                      <Skeleton className="h-4 w-14" />
                    </TableCell>
                    <TableCell className="py-3.5 px-4">
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </TableCell>
                    <TableCell className="py-3.5 px-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <Skeleton className="h-7 w-7 rounded-lg" />
                        <Skeleton className="h-7 w-7 rounded-lg" />
                        <Skeleton className="h-7 w-7 rounded-lg" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredPrograms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-slate-400">
                    No programs found matching &quot;{searchQuery}&quot;
                  </TableCell>
                </TableRow>
              ) : (
                filteredPrograms.map((program) => (
                  <TableRow key={program.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Program Cover & Name */}
                    <TableCell className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative">
                          {program.thumbnail ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={program.thumbnail}
                              alt={program.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 bg-emerald-50 text-[10px] font-bold">
                              SRS
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 max-w-xs">
                          <div className="font-bold text-slate-900 text-sm truncate">
                            {program.name}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">
                            {program.delivery}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    {/* Subject */}
                    <TableCell className="py-3.5 px-4">
                      <Badge variant="outline" className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60 text-[11px]">
                        {program.subject}
                      </Badge>
                    </TableCell>

                    {/* Grades */}
                    <TableCell className="py-3.5 px-4 font-semibold text-slate-700">
                      {program.grades}
                    </TableCell>

                    {/* Price */}
                    <TableCell className="py-3.5 px-4 font-bold text-slate-900">
                      {program.price}
                    </TableCell>

                    {/* Enrolled */}
                    <TableCell className="py-3.5 px-4">
                      <span className="font-bold text-[#0B1E2B]">{program.enrolled}</span>
                      <span className="text-[11px] text-slate-400 ml-1">students</span>
                    </TableCell>

                    {/* State */}
                    <TableCell className="py-3.5 px-4">
                      <Badge
                        variant="outline"
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          program.state === "Published"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                            : "bg-amber-100 text-amber-800 border-amber-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            program.state === "Published" ? "bg-emerald-600" : "bg-amber-600"
                          }`}
                        />
                        {program.state}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setViewingProgram(program);
                            setIsViewOpen(true);
                          }}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProgram(program);
                            setIsEditOpen(true);
                          }}
                          className="p-1.5 hover:bg-emerald-50 rounded-lg text-emerald-700 transition-colors cursor-pointer"
                          title="Edit Program"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDeletingProgram(program);
                            setIsDeleteOpen(true);
                          }}
                          className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-600 transition-colors cursor-pointer"
                          title="Delete Program"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* --- CREATE PROGRAM MODAL --- */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 my-8">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] font-mono">
                Curriculum Builder
              </span>
              <h2 className="text-xl font-black text-[#0B1E2B] font-display mt-0.5">
                Create New Program Pathway
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Upload course cover visual (saved in local /uploads/programs), define outcomes, and set pricing.
              </p>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              {/* Image Upload Component */}
              <ImageUploadField
                label="Course Cover Visual / Thumbnail"
                value={createForm.thumbnail}
                onChange={(url) => setCreateForm({ ...createForm, thumbnail: url })}
                folder="programs"
                aspectRatio="banner"
                helperText="Upload 16:9 banner or cover photo. Stored in /uploads/programs."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Program Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={createForm.name}
                    onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                    placeholder="e.g. AP Biology Mastery & Lab Skills"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Subject Field
                  </label>
                  <select
                    value={createForm.subject}
                    onChange={(e) => setCreateForm({ ...createForm, subject: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C] cursor-pointer"
                  >
                    {SUBJECT_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Grade Range
                  </label>
                  <select
                    value={createForm.grades}
                    onChange={(e) => setCreateForm({ ...createForm, grades: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C] cursor-pointer"
                  >
                    {GRADE_OPTIONS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Delivery Format
                  </label>
                  <select
                    value={createForm.format}
                    onChange={(e) => setCreateForm({ ...createForm, format: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C] cursor-pointer"
                  >
                    {FORMAT_OPTIONS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Tuition Fee
                  </label>
                  <input
                    type="text"
                    value={createForm.price}
                    onChange={(e) => setCreateForm({ ...createForm, price: e.target.value })}
                    placeholder="$240/month"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Core Educational Promise / Description
                </label>
                <textarea
                  rows={3}
                  value={createForm.promise}
                  onChange={(e) => setCreateForm({ ...createForm, promise: e.target.value })}
                  placeholder="Describe student learning outcomes and how mentors conduct 1-on-1 or group workshops..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Publication Status
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="state"
                      value="Published"
                      checked={createForm.state === "Published"}
                      onChange={() => setCreateForm({ ...createForm, state: "Published" })}
                      className="accent-[#0A5C4C]"
                    />
                    Published (Active in Catalog)
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="state"
                      value="Draft"
                      checked={createForm.state === "Draft"}
                      onChange={() => setCreateForm({ ...createForm, state: "Draft" })}
                      className="accent-[#0A5C4C]"
                    />
                    Draft (Internal review)
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Create Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT PROGRAM MODAL --- */}
      {isEditOpen && editingProgram && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 my-8">
            <button
              type="button"
              onClick={() => setIsEditOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] font-mono">
                Update Course Pathway
              </span>
              <h2 className="text-xl font-black text-[#0B1E2B] font-display mt-0.5">
                Edit {editingProgram.name}
              </h2>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <ImageUploadField
                label="Course Cover Visual / Thumbnail"
                value={editingProgram.thumbnail || ""}
                onChange={(url) => setEditingProgram({ ...editingProgram, thumbnail: url })}
                folder="programs"
                aspectRatio="banner"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Program Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProgram.name}
                    onChange={(e) => setEditingProgram({ ...editingProgram, name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Subject Field
                  </label>
                  <select
                    value={editingProgram.subject}
                    onChange={(e) => setEditingProgram({ ...editingProgram, subject: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C] cursor-pointer"
                  >
                    {SUBJECT_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Tuition Fee
                  </label>
                  <input
                    type="text"
                    value={editingProgram.price}
                    onChange={(e) => setEditingProgram({ ...editingProgram, price: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Learning Promise &amp; Outcomes
                </label>
                <textarea
                  rows={3}
                  value={editingProgram.promise}
                  onChange={(e) => setEditingProgram({ ...editingProgram, promise: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Publication State
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="edit-state"
                      value="Published"
                      checked={editingProgram.state === "Published"}
                      onChange={() => setEditingProgram({ ...editingProgram, state: "Published" })}
                      className="accent-[#0A5C4C]"
                    />
                    Published
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="edit-state"
                      value="Draft"
                      checked={editingProgram.state === "Draft"}
                      onChange={() => setEditingProgram({ ...editingProgram, state: "Draft" })}
                      className="accent-[#0A5C4C]"
                    />
                    Draft
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Save Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- VIEW DETAILS MODAL --- */}
      {isViewOpen && viewingProgram && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              type="button"
              onClick={() => setIsViewOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {viewingProgram.thumbnail && (
              <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={viewingProgram.thumbnail}
                  alt={viewingProgram.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-xs text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                {viewingProgram.subject}
              </span>
              <span className="font-semibold text-xs text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded">
                Grades {viewingProgram.grades}
              </span>
            </div>

            <h3 className="text-lg font-black text-[#0B1E2B] font-display">
              {viewingProgram.name}
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {viewingProgram.promise}
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span className="font-semibold text-slate-500">Delivery:</span>
                <span>{viewingProgram.delivery}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span className="font-semibold text-slate-500">Tuition:</span>
                <span className="font-bold text-slate-900">{viewingProgram.price}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span className="font-semibold text-slate-500">Enrolled Students:</span>
                <span className="font-bold text-emerald-700">{viewingProgram.enrolled} active</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsViewOpen(false)}
                className="px-5 py-2 bg-[#0A5C4C] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {isDeleteOpen && deletingProgram && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete Program</h3>
            <p className="text-xs text-slate-500 mt-1">
              Are you sure you want to delete <strong className="text-slate-800">{deletingProgram.name}</strong>? This will remove the course pathway from the public catalog.
            </p>

            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Delete Program
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
