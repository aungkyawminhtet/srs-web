"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Plus,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Download,
  Filter,
  FileSpreadsheet,
  X,
  Edit2,
  Trash2,
  Eye,
  Camera,
  GraduationCap,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { studentsApi, StudentRecord } from "@/lib/api";
import { useStudentsQuery } from "@/hooks/api";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const DEFAULT_STUDENTS: StudentRecord[] = [
  {
    _id: "s1",
    studentId: "STU-2026-0001",
    name: "Emma Thant",
    email: "emma.thant@student.edu",
    phone: "+95 9 987654321",
    grade: "Grade 8",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "student",
    createdAt: "2026-11-01",
    enrolledCourses: [
      { _id: "c1", title: "Algebra I, minus the overwhelm", subject: "Mathematics" },
      { _id: "c2", title: "1501208 Database Systems", subject: "Computer Science" },
    ],
  },
  {
    _id: "s2",
    studentId: "STU-2026-0002",
    name: "Noah Thant",
    email: "noah.thant@student.edu",
    phone: "+95 9 987654322",
    grade: "Grade 5",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    role: "student",
    createdAt: "2026-11-02",
    enrolledCourses: [
      { _id: "c3", title: "Science, explored", subject: "Biology" },
    ],
  },
];

const AVAILABLE_GRADES = [
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
  "College Pathway",
];

export default function AdminStudentsPage() {
  const { data: serverStudents, isLoading } = useStudentsQuery();
  const [students, setStudents] = useState<StudentRecord[]>(DEFAULT_STUDENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [notice, setNotice] = useState<string | null>(null);

  // Create Student Modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    phone: "",
    grade: "Grade 8",
    password: "student2026!",
    avatar: "",
  });

  // Edit Student Modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentRecord | null>(null);

  // View Student Modal
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewingStudent, setViewingStudent] = useState<StudentRecord | null>(null);

  // Delete Student Dialog
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingStudent, setDeletingStudent] = useState<StudentRecord | null>(null);

  useEffect(() => {
    if (serverStudents && Array.isArray(serverStudents) && serverStudents.length > 0) {
      setStudents(serverStudents as any);
    }
  }, [serverStudents]);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  // --- CRUD: CREATE ---
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.name || !createForm.email) return;

    try {
      const res = await studentsApi.create({
        name: createForm.name,
        email: createForm.email,
        phone: createForm.phone,
        grade: createForm.grade,
        password: createForm.password,
        avatar: createForm.avatar,
      });

      if (res && res.data) {
        setStudents((prev) => [res.data as StudentRecord, ...prev]);
        showNotice(`Student ${res.data.name} created successfully (${res.data.studentId})`);
      } else {
        throw new Error("Local fallback");
      }
    } catch (err: any) {
      // Local fallback
      const nextIndex = students.length + 1;
      const year = new Date().getFullYear();
      const generatedId = `STU-${year}-${String(nextIndex).padStart(4, "0")}`;

      const created: StudentRecord = {
        _id: `s-${Date.now()}`,
        studentId: generatedId,
        name: createForm.name,
        email: createForm.email,
        phone: createForm.phone,
        grade: createForm.grade,
        avatar: createForm.avatar,
        role: "student",
        createdAt: new Date().toISOString(),
        enrolledCourses: [],
      };

      setStudents((prev) => [created, ...prev]);
      showNotice(`Student ${created.name} created locally with ID: ${generatedId}`);
    } finally {
      setIsCreateOpen(false);
      setCreateForm({
        name: "",
        email: "",
        phone: "",
        grade: "Grade 8",
        password: "student2026!",
        avatar: "",
      });
    }
  };

  // --- CRUD: UPDATE ---
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    try {
      await studentsApi.update(editingStudent._id, {
        name: editingStudent.name,
        email: editingStudent.email,
        phone: editingStudent.phone,
        grade: editingStudent.grade,
        avatar: editingStudent.avatar,
      });
      showNotice(`Updated details for ${editingStudent.name}`);
    } catch {
      showNotice(`Updated profile for ${editingStudent.name} locally`);
    }

    setStudents((prev) =>
      prev.map((s) => (s._id === editingStudent._id ? editingStudent : s))
    );
    setIsEditOpen(false);
    setEditingStudent(null);
  };

  // --- CRUD: DELETE ---
  const handleDeleteConfirm = async () => {
    if (!deletingStudent) return;

    try {
      await studentsApi.delete(deletingStudent._id);
      showNotice(`Student ${deletingStudent.name} removed from registry.`);
    } catch {
      showNotice(`Student ${deletingStudent.name} removed locally.`);
    }

    setStudents((prev) => prev.filter((s) => s._id !== deletingStudent._id));
    setIsDeleteOpen(false);
    setDeletingStudent(null);
  };

  // --- CSV EXPORT ---
  const handleExportCsv = () => {
    const headers = [
      "Index",
      "Student ID",
      "Full Name",
      "Email Address",
      "Phone",
      "Grade",
      "Avatar URL",
      "Registered Date",
      "Enrolled Courses Count",
    ];
    const rows = students.map((s, idx) => [
      idx + 1,
      s.studentId,
      `"${s.name}"`,
      `"${s.email}"`,
      `"${s.phone || "-"}"`,
      `"${s.grade || "Grade 8"}"`,
      `"${s.avatar || "-"}"`,
      `"${new Date(s.createdAt).toLocaleDateString()}"`,
      s.enrolledCourses?.length || 0,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `registered_students_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotice(`Exported ${students.length} student records to CSV.`);
  };

  const filtered = students.filter((s) => {
    if (selectedGrade !== "all" && s.grade !== selectedGrade) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.studentId.toLowerCase().includes(q) ||
      (s.phone && s.phone.toLowerCase().includes(q))
    );
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-slate-400 font-mono block mb-1.5">
            Admin Workspace · Student Registry Management
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#0B1E2B] tracking-tight font-display">
            Registered Students &amp; Student IDs
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed">
            Manage student registrations, profile photos, credentials, and course enrollments with full CRUD.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full shadow-2xs hover:shadow transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#0A5C4C]" />
            <span>Export Registry (CSV)</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Student</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Students
          </span>
          <div className="text-2xl font-black text-[#0B1E2B] font-display">
            {students.length}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            100% ID Assigned
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Active Enrollments
          </span>
          <div className="text-2xl font-black text-[#0B1E2B] font-display">
            {students.reduce((acc, s) => acc + (s.enrolledCourses?.length || 0), 0)}
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">
            Across STEM &amp; AP tracks
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Grades Represented
          </span>
          <div className="text-2xl font-black text-[#0B1E2B] font-display">
            {new Set(students.map((s) => s.grade)).size}
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">
            Grade 3 through Grade 12
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Local Storage Folder
          </span>
          <div className="text-sm font-bold text-emerald-800 font-mono mt-1">
            /uploads/students
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">
            Third-party cloud ready
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, ID, email, or phone..."
            className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0 overflow-x-auto">
          <span className="text-xs text-slate-500 font-semibold shrink-0">Grade:</span>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C] cursor-pointer"
          >
            <option value="all">All Grades</option>
            {AVAILABLE_GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                <th className="py-3.5 px-4">Student Profile</th>
                <th className="py-3.5 px-4">Student ID</th>
                <th className="py-3.5 px-4">Grade</th>
                <th className="py-3.5 px-4">Enrolled Courses</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {isLoading ? (
                Array.from({ length: 2 }).map((_, i) => (
                  <tr key={`skel-${i}`} className="animate-pulse">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="space-y-1.5">
                          <Skeleton className="h-4 w-28" />
                          <Skeleton className="h-3 w-36" />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4"><Skeleton className="h-6 w-24 rounded-md" /></td>
                    <td className="py-3.5 px-4"><Skeleton className="h-5 w-16 rounded" /></td>
                    <td className="py-3.5 px-4"><Skeleton className="h-5 w-32 rounded" /></td>
                    <td className="py-3.5 px-4"><Skeleton className="h-4 w-24" /></td>
                    <td className="py-3.5 px-4 text-right"><Skeleton className="h-7 w-20 ml-auto rounded-lg" /></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    No students found matching your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((student) => {
                const initials = student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <tr key={student._id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Student Profile with Avatar */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 overflow-hidden border border-emerald-200 shadow-2xs">
                          {student.avatar ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={student.avatar}
                              alt={student.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span>{initials}</span>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">
                            {student.name}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{student.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Student ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-800">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200/60">
                        {student.studentId}
                      </span>
                    </td>

                    {/* Grade */}
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {student.grade || "Grade 8"}
                      </span>
                    </td>

                    {/* Enrolled Courses */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        {student.enrolledCourses && student.enrolledCourses.length > 0 ? (
                          student.enrolledCourses.slice(0, 2).map((c, idx) => (
                            <div
                              key={c._id || idx}
                              className="text-[11px] font-medium text-slate-700 truncate max-w-xs"
                            >
                              • {c.title}
                            </div>
                          ))
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">No enrollments yet</span>
                        )}
                        {student.enrolledCourses && student.enrolledCourses.length > 2 && (
                          <span className="text-[10px] text-slate-400 font-bold">
                            +{student.enrolledCourses.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                      <div>{student.phone || "—"}</div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setViewingStudent(student);
                            setIsViewOpen(true);
                          }}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer"
                          title="View Student"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingStudent(student);
                            setIsEditOpen(true);
                          }}
                          className="p-1.5 hover:bg-emerald-50 rounded-lg text-emerald-700 transition-colors cursor-pointer"
                          title="Edit Student"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDeletingStudent(student);
                            setIsDeleteOpen(true);
                          }}
                          className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-600 transition-colors cursor-pointer"
                          title="Delete Student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- CREATE STUDENT MODAL --- */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] font-mono">
                Student Account Provisioning
              </span>
              <h2 className="text-xl font-black text-[#0B1E2B] font-display mt-0.5">
                Register New Student
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Upload student profile photo (stored in local /uploads folder), specify grade, and generate their permanent Student ID.
              </p>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              {/* Image Upload Component */}
              <ImageUploadField
                label="Student Profile Photo"
                value={createForm.avatar}
                onChange={(url) => setCreateForm({ ...createForm, avatar: url })}
                folder="students"
                aspectRatio="circle"
                helperText="Upload student headshot. Stored locally in /uploads/students."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={createForm.name}
                    onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                    placeholder="e.g. Maya Lin"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={createForm.email}
                    onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                    placeholder="e.g. maya.lin@student.edu"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Grade Level
                  </label>
                  <select
                    value={createForm.grade}
                    onChange={(e) => setCreateForm({ ...createForm, grade: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C] cursor-pointer"
                  >
                    {AVAILABLE_GRADES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={createForm.phone}
                    onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })}
                    placeholder="+95 9 123456789"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Default Temporary Password
                </label>
                <input
                  type="text"
                  value={createForm.password}
                  onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  The student can change their password on first sign-in.
                </span>
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
                  Create Student Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT STUDENT MODAL --- */}
      {isEditOpen && editingStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              type="button"
              onClick={() => setIsEditOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] font-mono">
                Update Student
              </span>
              <h2 className="text-xl font-black text-[#0B1E2B] font-display mt-0.5">
                Edit {editingStudent.name}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Student ID: <span className="font-mono font-bold text-emerald-800">{editingStudent.studentId}</span>
              </p>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              {/* Image Upload Component */}
              <ImageUploadField
                label="Student Profile Photo"
                value={editingStudent.avatar || ""}
                onChange={(url) => setEditingStudent({ ...editingStudent, avatar: url })}
                folder="students"
                aspectRatio="circle"
                helperText="Stored locally in /uploads/students."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingStudent.name}
                    onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={editingStudent.email}
                    onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Grade Level
                  </label>
                  <select
                    value={editingStudent.grade || "Grade 8"}
                    onChange={(e) => setEditingStudent({ ...editingStudent, grade: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C] cursor-pointer"
                  >
                    {AVAILABLE_GRADES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editingStudent.phone || ""}
                    onChange={(e) => setEditingStudent({ ...editingStudent, phone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
                  />
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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- VIEW STUDENT MODAL --- */}
      {isViewOpen && viewingStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              type="button"
              onClick={() => setIsViewOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center pb-4 border-b border-slate-100">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xl flex items-center justify-center overflow-hidden border-2 border-emerald-300 shadow-xs mb-3">
                {viewingStudent.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={viewingStudent.avatar} alt={viewingStudent.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{viewingStudent.name.slice(0, 2).toUpperCase()}</span>
                )}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{viewingStudent.name}</h3>
              <p className="text-xs text-slate-500">{viewingStudent.email}</p>
              <div className="mt-2 inline-flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {viewingStudent.studentId}
                </span>
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                  {viewingStudent.grade || "Grade 8"}
                </span>
              </div>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span className="font-semibold text-slate-500">Phone:</span>
                <span>{viewingStudent.phone || "Not specified"}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="font-semibold text-slate-500">Registered Date:</span>
                <span>{new Date(viewingStudent.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="pt-2">
                <span className="font-bold text-slate-700 block mb-2">Enrolled Courses:</span>
                {viewingStudent.enrolledCourses && viewingStudent.enrolledCourses.length > 0 ? (
                  <div className="space-y-1.5">
                    {viewingStudent.enrolledCourses.map((c, i) => (
                      <div key={i} className="p-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-[#0A5C4C]" />
                        <span className="font-medium text-slate-800 truncate">{c.title}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-slate-400 italic">No courses currently enrolled.</span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
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
      {isDeleteOpen && deletingStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete Student Account</h3>
            <p className="text-xs text-slate-500 mt-1">
              Are you sure you want to remove <strong className="text-slate-800">{deletingStudent.name}</strong> ({deletingStudent.studentId})? This action cannot be undone.
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
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
