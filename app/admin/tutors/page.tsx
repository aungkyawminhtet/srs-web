"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Plus,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  Download,
  BookOpen,
  KeyRound,
  Copy,
  Check,
  Shield,
  Layers,
  Sparkles,
  X,
  Eye,
  UserCheck,
  ArrowUpRight,
  Edit2,
  Trash2,
  Star,
  Users,
  AlertTriangle,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PROGRAMS } from "@/lib/data";
import { instructorStore, Instructor } from "@/lib/instructorStore";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { tutorsService, TutorItem, TutorPayload } from "@/lib/api/tutors";
import { useTutorsQuery } from "@/hooks/api";
import { Skeleton } from "@/components/ui/skeleton";

// Default public showcase tutors (2 sample items aligned with DB)
const DEFAULT_PUBLIC_TUTORS: TutorItem[] = [
  {
    _id: "tut-1",
    name: "Lin Chen",
    title: "Lead Math & CS Advisor",
    email: "lin.chen@funandlearn.edu",
    phone: "+1 (555) 234-5678",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 4.95,
    experienceYears: 7,
    specialization: ["Algebra I", "Database Systems", "Calculus"],
    bio: "Passionate mathematics mentor with 7 years teaching students conceptual clarity.",
    status: "active",
  },
  {
    _id: "tut-2",
    name: "Dr. Maya Patel",
    title: "Lead Science Mentor",
    email: "maya.patel@funandlearn.edu",
    phone: "+1 (555) 345-6789",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    rating: 4.98,
    experienceYears: 10,
    specialization: ["AP Biology", "Chemistry", "Scientific Research"],
    bio: "Former university researcher guiding middle and high school students in experimental science.",
    status: "active",
  },
];

export default function AdminTutorsPage() {
  const [activeMainTab, setActiveMainTab] = useState<"instructors" | "public_tutors">("instructors");
  const [searchQuery, setSearchQuery] = useState("");
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [selectedInstructorId, setSelectedInstructorId] = useState<string>("INS-101");
  const [publicTutors, setPublicTutors] = useState<TutorItem[]>(DEFAULT_PUBLIC_TUTORS);
  const [notice, setNotice] = useState<string | null>(null);

  const { data: dbTutors, isLoading: isTutorsLoading } = useTutorsQuery();

  useEffect(() => {
    if (dbTutors && dbTutors.length > 0) {
      setPublicTutors(dbTutors);
    }
  }, [dbTutors]);

  // --- CREATE INSTRUCTOR MODAL ---
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("teach2026!");
  const [newPhone, setNewPhone] = useState("+1 (555) 000-0000");
  const [newTitle, setNewTitle] = useState("Academic Course Instructor");
  const [newBio, setNewBio] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [newSelectedCourses, setNewSelectedCourses] = useState<string[]>([
    "math-that-clicks",
    "algebra-with-confidence",
  ]);

  // --- EDIT INSTRUCTOR MODAL ---
  const [isEditInstructorOpen, setIsEditInstructorOpen] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);

  // --- DELETE INSTRUCTOR DIALOG ---
  const [isDeleteInstructorOpen, setIsDeleteInstructorOpen] = useState(false);
  const [deletingInstructor, setDeletingInstructor] = useState<Instructor | null>(null);

  // --- MANAGE COURSE ACCESS MODAL ---
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [accessCourses, setAccessCourses] = useState<string[]>([]);

  // --- PUBLIC TUTORS CRUD MODALS ---
  const [isCreateTutorOpen, setIsCreateTutorOpen] = useState(false);
  const [tutorForm, setTutorForm] = useState({
    name: "",
    email: "",
    phone: "",
    title: "Senior Academic Mentor",
    subject: "Mathematics",
    bio: "",
    avatar: "",
    rating: 4.9,
    experienceYears: 5,
  });

  const [isEditTutorOpen, setIsEditTutorOpen] = useState(false);
  const [editingTutor, setEditingTutor] = useState<TutorItem | null>(null);

  const [isDeleteTutorOpen, setIsDeleteTutorOpen] = useState(false);
  const [deletingTutor, setDeletingTutor] = useState<TutorItem | null>(null);

  // --- HANDOVER DATA ---
  const [handoverData, setHandoverData] = useState<{
    name: string;
    email: string;
    password: string;
    courses: string[];
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Load instructors from store
  useEffect(() => {
    const data = instructorStore.getInstructors();
    setInstructors(data);
  }, []);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  const selectedInstructor =
    instructors.find((ins) => ins.id === selectedInstructorId) || instructors[0];

  // Course access
  const handleOpenAccessModal = () => {
    if (selectedInstructor) {
      setAccessCourses(selectedInstructor.assignedCourses || []);
      setIsAccessModalOpen(true);
    }
  };

  const handleSaveAccess = () => {
    if (selectedInstructor) {
      const updated = instructorStore.updateInstructorCourseAccess(
        selectedInstructor.id,
        accessCourses
      );
      setInstructors(updated);
      setIsAccessModalOpen(false);
      showNotice(`Updated course permissions for ${selectedInstructor.name}`);
    }
  };

  // --- CREATE INSTRUCTOR ---
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const created = instructorStore.createInstructor({
      name: newName,
      email: newEmail,
      password: newPassword,
      title: newTitle,
      phone: newPhone,
      bio: newBio || "Qualified academic instructor focused on student growth and mastery.",
      assignedCourses: newSelectedCourses,
      workloadHours: 14,
      maxHours: 20,
      avatar: newAvatar,
      status: "active",
    });

    const refreshed = instructorStore.getInstructors();
    setInstructors(refreshed);
    setSelectedInstructorId(created.id);
    setIsCreateOpen(false);

    showNotice(`Instructor account created for ${newName}! Handover credentials generated.`);

    // Show Handover Credentials Dialog
    setHandoverData({
      name: newName,
      email: newEmail,
      password: newPassword,
      courses: newSelectedCourses,
    });

    // Reset form
    setNewName("");
    setNewEmail("");
    setNewPassword("teach2026!");
    setNewBio("");
    setNewAvatar("");
  };

  // --- EDIT INSTRUCTOR ---
  const handleEditInstructorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInstructor) return;

    const updated = instructorStore.updateInstructor(editingInstructor.id, editingInstructor);
    setInstructors(updated);
    showNotice(`Instructor ${editingInstructor.name} updated successfully.`);
    setIsEditInstructorOpen(false);
    setEditingInstructor(null);
  };

  // --- DELETE INSTRUCTOR ---
  const handleDeleteInstructorConfirm = () => {
    if (!deletingInstructor) return;

    const updated = instructorStore.deleteInstructor(deletingInstructor.id);
    setInstructors(updated);
    if (selectedInstructorId === deletingInstructor.id) {
      setSelectedInstructorId(updated[0]?.id || "");
    }
    showNotice(`Instructor account ${deletingInstructor.name} deleted.`);
    setIsDeleteInstructorOpen(false);
    setDeletingInstructor(null);
  };

  // --- PUBLIC TUTORS: CREATE ---
  const handleCreateTutorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorForm.name) return;

    const newTutor: TutorItem = {
      _id: `tut-${Date.now()}`,
      name: tutorForm.name,
      email: tutorForm.email,
      phone: tutorForm.phone,
      title: tutorForm.title,
      bio: tutorForm.bio || "Dedicated mentor committed to learner success.",
      avatar: tutorForm.avatar,
      rating: tutorForm.rating,
      experienceYears: tutorForm.experienceYears,
      specialization: [tutorForm.subject],
      status: "active",
    };

    setPublicTutors([newTutor, ...publicTutors]);
    showNotice(`Public tutor profile for ${newTutor.name} created!`);
    setIsCreateTutorOpen(false);
    setTutorForm({
      name: "",
      email: "",
      phone: "",
      title: "Senior Academic Mentor",
      subject: "Mathematics",
      bio: "",
      avatar: "",
      rating: 4.9,
      experienceYears: 5,
    });
  };

  // --- PUBLIC TUTORS: EDIT ---
  const handleEditTutorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTutor) return;

    setPublicTutors((prev) =>
      prev.map((t) => (t._id === editingTutor._id ? editingTutor : t))
    );
    showNotice(`Tutor profile for ${editingTutor.name} updated!`);
    setIsEditTutorOpen(false);
    setEditingTutor(null);
  };

  // --- PUBLIC TUTORS: DELETE ---
  const handleDeleteTutorConfirm = () => {
    if (!deletingTutor) return;

    setPublicTutors((prev) => prev.filter((t) => t._id !== deletingTutor._id));
    showNotice(`Tutor profile for ${deletingTutor.name} deleted.`);
    setIsDeleteTutorOpen(false);
    setDeletingTutor(null);
  };

  const copyHandoverCredentials = (data: {
    name: string;
    email: string;
    password: string;
    courses: string[];
  }) => {
    const courseTitles = data.courses
      .map((cId) => PROGRAMS.find((p) => p.id === cId)?.title || cId)
      .join(", ");

    const text = `Fun & Learn - Instructor Account Credentials\n==========================================\nName: ${data.name}\nLogin URL: http://localhost:3000/login\nEmail: ${data.email}\nTemporary Password: ${data.password}\nAssigned Courses: ${courseTitles}\n\nPlease sign in, check your course outlines, and update your assignments.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const filteredInstructors = instructors.filter((item) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredPublicTutors = publicTutors.filter((t) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        (t.title && t.title.toLowerCase().includes(q)) ||
        (t.email && t.email.toLowerCase().includes(q))
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

      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-slate-400 font-mono block mb-1.5">
            Admin Workspace · Academic Staff &amp; Faculty
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#0B1E2B] tracking-tight font-display">
            Teachers, Instructors &amp; Tutor Profiles
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed">
            Provision teacher accounts, delegate course outline permissions, upload profile headshots, and manage faculty showcases.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/instructor"
            target="_blank"
            className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold rounded-full shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>Instructor Portal</span>
          </Link>

          {activeMainTab === "instructors" ? (
            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Hire New Instructor</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsCreateTutorOpen(true)}
              className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Tutor Showcase</span>
            </button>
          )}
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200/80 pb-3">
        <button
          type="button"
          onClick={() => setActiveMainTab("instructors")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeMainTab === "instructors"
              ? "bg-[#0A5C4C] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Course Instructors ({instructors.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMainTab("public_tutors")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeMainTab === "public_tutors"
              ? "bg-[#0A5C4C] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Public Tutor Profiles ({publicTutors.length})</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
            Hired Instructors
          </div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">
            {instructors.length}
          </div>
          <div className="text-[11px] text-[#0A5C4C] font-semibold mt-1">
            Across {PROGRAMS.length} available programs
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
            Scheduled Workload
          </div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">164 h</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Capacity allocated across faculty
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
            Course Delegations
          </div>
          <div className="text-3xl font-black text-[#0B1E2B] mt-1 font-display">
            {instructors.reduce((acc, curr) => acc + (curr.assignedCourses?.length || 0), 0)}
          </div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            Program permissions granted
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
            Storage Location
          </div>
          <div className="text-sm font-bold text-emerald-800 font-mono mt-1">
            /uploads/instructors
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Cloud S3 / Cloudinary ready
          </div>
        </div>
      </div>

      {/* ========================================================
          TAB 1: COURSE INSTRUCTORS (OWNER WORKSPACE)
      ======================================================== */}
      {activeMainTab === "instructors" && (
        <div className="space-y-6">
          {/* Search bar */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search instructors by name, email, or specialization..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
              />
            </div>
          </div>

          {/* Main Grid: Instructor Roster + Selected Instructor Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Roster table (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#0B1E2B]">Instructors Roster</h2>
                <span className="text-xs text-slate-400">
                  {filteredInstructors.length} active teachers
                </span>
              </div>

              <div className="overflow-x-auto flex-1">
                <Table className="w-full text-left text-xs">
                  <TableHeader className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 font-mono">
                    <TableRow>
                      <TableHead className="py-3 px-4 font-bold text-slate-500">Instructor Profile</TableHead>
                      <TableHead className="py-3 px-3 font-bold text-slate-500">Course Access</TableHead>
                      <TableHead className="py-3 px-3 font-bold text-slate-500">Workload</TableHead>
                      <TableHead className="py-3 px-3 font-bold text-slate-500">Status</TableHead>
                      <TableHead className="py-3 px-4 text-right font-bold text-slate-500">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-slate-100">
                    {filteredInstructors.map((item) => {
                      const isSelected = selectedInstructor?.id === item.id;
                      const coursesCount = item.assignedCourses?.length || 0;
                      const isImg =
                        item.avatar &&
                        (item.avatar.startsWith("http") ||
                          item.avatar.startsWith("/uploads") ||
                          item.avatar.startsWith("data:"));

                      return (
                        <TableRow
                          key={item.id}
                          onClick={() => setSelectedInstructorId(item.id)}
                          className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                            isSelected ? "bg-teal-50/50" : ""
                          }`}
                        >
                          <TableCell className="py-3 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-full bg-[#0A5C4C] text-white flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden border border-emerald-300">
                                {isImg ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={item.avatar}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <span>{item.avatar || item.name.slice(0, 2).toUpperCase()}</span>
                                )}
                              </div>
                              <div>
                                <div className="font-bold text-[#0B1E2B]">{item.name}</div>
                                <div className="text-[11px] text-slate-400">{item.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-3 px-3">
                            <Badge
                              variant="secondary"
                              className="bg-slate-100 text-slate-700 text-[11px] font-semibold"
                            >
                              <BookOpen className="w-3 h-3 mr-1 text-[#0A5C4C]" />
                              {coursesCount} {coursesCount === 1 ? "course" : "courses"}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-3 px-3">
                            <div className="font-semibold text-slate-800">
                              {item.workloadHours} / {item.maxHours} h
                            </div>
                          </TableCell>
                          <TableCell className="py-3 px-3">
                            <Badge
                              variant="secondary"
                              className="bg-emerald-100 text-emerald-800 border-none text-[10px] font-bold"
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingInstructor(item);
                                  setIsEditInstructorOpen(true);
                                }}
                                className="p-1.5 hover:bg-emerald-50 rounded-lg text-emerald-700 transition-colors cursor-pointer"
                                title="Edit Instructor"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setDeletingInstructor(item);
                                  setIsDeleteInstructorOpen(true);
                                }}
                                className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-600 transition-colors cursor-pointer"
                                title="Delete Instructor"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              <Link
                                href={`/admin/tutors/${item.id}`}
                                className="font-semibold text-[#0A5C4C] hover:underline inline-flex items-center gap-0.5 ml-1"
                              >
                                <span>Detail</span>
                                <span>→</span>
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Selected Instructor Details & Course Access Drawer (5 cols) */}
            {selectedInstructor && (
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Instructor Profile · {selectedInstructor.id}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingInstructor(selectedInstructor);
                        setIsEditInstructorOpen(true);
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <Badge className="bg-emerald-100 text-emerald-800 border-none text-[10px] font-bold">
                      {selectedInstructor.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#0A5C4C] text-white flex items-center justify-center font-bold text-lg shadow-xs shrink-0 overflow-hidden border border-emerald-300">
                    {selectedInstructor.avatar &&
                    (selectedInstructor.avatar.startsWith("http") ||
                      selectedInstructor.avatar.startsWith("/uploads") ||
                      selectedInstructor.avatar.startsWith("data:")) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={selectedInstructor.avatar}
                        alt={selectedInstructor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{selectedInstructor.avatar || selectedInstructor.name.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-black text-[#0B1E2B] font-display">
                      {selectedInstructor.name}
                    </h3>
                    <p className="text-xs text-slate-500">{selectedInstructor.title}</p>
                    <p className="text-[11px] text-[#0A5C4C] font-mono mt-0.5">
                      {selectedInstructor.email}
                    </p>
                  </div>
                </div>

                {/* Assigned Courses Section */}
                <div className="bg-[#FAF7EC] p-3.5 rounded-2xl border border-[#ECE5CD] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-amber-800" />
                      <span className="text-xs font-bold text-amber-950">
                        Assigned Course Access ({selectedInstructor.assignedCourses?.length || 0})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleOpenAccessModal}
                      className="px-2.5 py-1 bg-amber-900/10 hover:bg-amber-900/20 text-amber-900 text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Edit Access
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedInstructor.assignedCourses?.length ? (
                      selectedInstructor.assignedCourses.map((cId) => {
                        const prog = PROGRAMS.find((p) => p.id === cId);
                        return (
                          <span
                            key={cId}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-950 text-xs font-semibold shadow-2xs"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0A5C4C]" />
                            {prog?.title || cId}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-xs text-slate-500 italic">
                        No courses assigned yet.
                      </span>
                    )}
                  </div>
                </div>

                {/* Credentials Slip */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                      Instructor Login Credentials
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyHandoverCredentials({
                          name: selectedInstructor.name,
                          email: selectedInstructor.email,
                          password: selectedInstructor.password || "instructor123",
                          courses: selectedInstructor.assignedCourses || [],
                        })
                      }
                      className="text-xs font-bold text-[#0A5C4C] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Slip</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-white p-2 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[10px]">Email (Login)</span>
                      <span className="font-mono font-semibold text-slate-800 break-all">
                        {selectedInstructor.email}
                      </span>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[10px]">Password</span>
                      <span className="font-mono font-semibold text-slate-800">
                        {selectedInstructor.password || "instructor123"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-2 pt-2">
                  <Link
                    href={`/admin/tutors/${selectedInstructor.id}`}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Full Permissions Page</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={handleOpenAccessModal}
                    className="w-full py-2.5 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Configure Course Permissions</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: PUBLIC TUTOR PROFILES (WEBSITE SHOWCASE)
      ======================================================== */}
      {activeMainTab === "public_tutors" && (
        <div className="space-y-6">
          <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tutor profile by name, subject, or role..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="w-full text-left">
                <TableHeader>
                  <TableRow className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                    <TableHead className="py-3.5 px-4 font-bold text-slate-500">Tutor Profile</TableHead>
                    <TableHead className="py-3.5 px-4 font-bold text-slate-500">Subject &amp; Specialization</TableHead>
                    <TableHead className="py-3.5 px-4 font-bold text-slate-500">Rating</TableHead>
                    <TableHead className="py-3.5 px-4 font-bold text-slate-500">Experience</TableHead>
                    <TableHead className="py-3.5 px-4 font-bold text-slate-500">Status</TableHead>
                    <TableHead className="py-3.5 px-4 text-right font-bold text-slate-500">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-slate-100 text-xs">
                  {isTutorsLoading ? (
                    Array.from({ length: 2 }).map((_, idx) => (
                      <TableRow key={`tutor-skeleton-${idx}`}>
                        <TableCell className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <Skeleton className="w-10 h-10 rounded-full" />
                            <div className="space-y-1.5">
                              <Skeleton className="h-4 w-32" />
                              <Skeleton className="h-3 w-40" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5 px-4">
                          <div className="flex gap-1.5">
                            <Skeleton className="h-5 w-16 rounded" />
                            <Skeleton className="h-5 w-20 rounded" />
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5 px-4">
                          <Skeleton className="h-6 w-14 rounded" />
                        </TableCell>
                        <TableCell className="py-3.5 px-4">
                          <Skeleton className="h-4 w-16" />
                        </TableCell>
                        <TableCell className="py-3.5 px-4">
                          <Skeleton className="h-5 w-14 rounded-full" />
                        </TableCell>
                        <TableCell className="py-3.5 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Skeleton className="h-7 w-7 rounded-lg" />
                            <Skeleton className="h-7 w-7 rounded-lg" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : filteredPublicTutors.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-8 text-center text-slate-400">
                        No public tutors found matching &quot;{searchQuery}&quot;
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPublicTutors.map((tutor) => (
                      <TableRow key={tutor._id} className="hover:bg-slate-50/60 transition-colors">
                        <TableCell className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 overflow-hidden border border-emerald-300">
                              {tutor.avatar ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={tutor.avatar} alt={tutor.name} className="w-full h-full object-cover" />
                              ) : (
                                <span>{tutor.name.slice(0, 2).toUpperCase()}</span>
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm">{tutor.name}</div>
                              <div className="text-[11px] text-slate-500">{tutor.title}</div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            {tutor.specialization?.map((spec: string, i: number) => (
                              <Badge key={i} variant="outline" className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-medium text-[11px] border border-emerald-200/60">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>

                        <TableCell className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-xs border border-amber-200">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            {tutor.rating || 4.9}
                          </span>
                        </TableCell>

                        <TableCell className="py-3.5 px-4 font-semibold text-slate-700">
                          {tutor.experienceYears || 5} years
                        </TableCell>

                        <TableCell className="py-3.5 px-4">
                          <Badge variant="outline" className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border-emerald-200">
                            Active
                          </Badge>
                        </TableCell>

                        <TableCell className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingTutor(tutor);
                                setIsEditTutorOpen(true);
                              }}
                              className="p-1.5 hover:bg-emerald-50 rounded-lg text-emerald-700 transition-colors cursor-pointer"
                              title="Edit Tutor"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setDeletingTutor(tutor);
                                setIsDeleteTutorOpen(true);
                              }}
                              className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 transition-colors cursor-pointer"
                              title="Delete Tutor"
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
        </div>
      )}

      {/* ========================================================
          MODAL: CREATE INSTRUCTOR ACCOUNT
      ======================================================== */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-5">
              <div>
                <h3 className="text-xl font-black text-[#0B1E2B] font-display">
                  Hire New Instructor Account
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload profile headshot (stored in local /uploads/instructors), set initial password, and assign course access.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <ImageUploadField
                label="Instructor Profile Headshot"
                value={newAvatar}
                onChange={setNewAvatar}
                folder="instructors"
                aspectRatio="circle"
                helperText="Upload teacher photo. Stored locally in /uploads/instructors."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Dr. Maya Patel"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Email Address (Login Username) *
                  </label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="e.g. maya.patel@funandlearn.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Temporary Password *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 font-mono bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Title &amp; Department
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Lead Science &amp; Biology Advisor"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                />
              </div>

              {/* Course Access Selection */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Grant Course Access (Select Programs) *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border border-slate-200 rounded-2xl bg-slate-50/50">
                  {PROGRAMS.map((prog) => {
                    const isChecked = newSelectedCourses.includes(prog.id);
                    return (
                      <label
                        key={prog.id}
                        className={`flex items-start gap-2.5 p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                          isChecked
                            ? "bg-[#EAF5F2] border-[#0A5C4C] text-[#0A5C4C] font-semibold"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewSelectedCourses([...newSelectedCourses, prog.id]);
                            } else {
                              setNewSelectedCourses(newSelectedCourses.filter((id) => id !== prog.id));
                            }
                          }}
                          className="mt-0.5 accent-[#0A5C4C]"
                        />
                        <span className="truncate">{prog.title}</span>
                      </label>
                    );
                  })}
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
                  Create Instructor Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: EDIT INSTRUCTOR
      ======================================================== */}
      {isEditInstructorOpen && editingInstructor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-5">
              <div>
                <h3 className="text-xl font-black text-[#0B1E2B] font-display">
                  Edit Instructor Profile
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  ID: <span className="font-mono font-bold text-emerald-800">{editingInstructor.id}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditInstructorOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditInstructorSubmit} className="space-y-4 text-xs">
              <ImageUploadField
                label="Instructor Profile Headshot"
                value={editingInstructor.avatar || ""}
                onChange={(url) => setEditingInstructor({ ...editingInstructor, avatar: url })}
                folder="instructors"
                aspectRatio="circle"
                helperText="Stored locally in /uploads/instructors."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingInstructor.name}
                    onChange={(e) => setEditingInstructor({ ...editingInstructor, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={editingInstructor.email}
                    onChange={(e) => setEditingInstructor({ ...editingInstructor, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Title / Department
                  </label>
                  <input
                    type="text"
                    value={editingInstructor.title}
                    onChange={(e) => setEditingInstructor({ ...editingInstructor, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editingInstructor.phone}
                    onChange={(e) => setEditingInstructor({ ...editingInstructor, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditInstructorOpen(false)}
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

      {/* ========================================================
          MODAL: DELETE INSTRUCTOR
      ======================================================== */}
      {isDeleteInstructorOpen && deletingInstructor && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Remove Instructor</h3>
            <p className="text-xs text-slate-500 mt-1">
              Are you sure you want to remove <strong className="text-slate-800">{deletingInstructor.name}</strong> ({deletingInstructor.id}) from the instructor roster?
            </p>

            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsDeleteInstructorOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteInstructorConfirm}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: EDIT COURSE ACCESS
      ======================================================== */}
      {isAccessModalOpen && selectedInstructor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-xl font-black text-[#0B1E2B] font-display">
                  Configure Course Permissions
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Instructor: <strong className="text-slate-800">{selectedInstructor.name}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAccessModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto p-1">
              {PROGRAMS.map((prog) => {
                const isChecked = accessCourses.includes(prog.id);
                return (
                  <label
                    key={prog.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      isChecked
                        ? "bg-[#EAF5F2] border-[#0A5C4C] text-[#0A5C4C] font-semibold"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAccessCourses([...accessCourses, prog.id]);
                        } else {
                          setAccessCourses(accessCourses.filter((id) => id !== prog.id));
                        }
                      }}
                      className="mt-0.5 accent-[#0A5C4C]"
                    />
                    <div>
                      <div className="font-bold">{prog.title}</div>
                      <div className="text-[11px] text-slate-500">{prog.grades} · {prog.format}</div>
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-4">
              <button
                type="button"
                onClick={() => setIsAccessModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAccess}
                className="px-5 py-2 bg-[#0A5C4C] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Save Permissions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: CREATE PUBLIC TUTOR PROFILE
      ======================================================== */}
      {isCreateTutorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-5">
              <div>
                <h3 className="text-xl font-black text-[#0B1E2B] font-display">
                  Add Public Tutor Showcase Profile
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Displays on the public website &amp; tutor booking catalog.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateTutorOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTutorSubmit} className="space-y-4 text-xs">
              <ImageUploadField
                label="Tutor Profile Headshot"
                value={tutorForm.avatar}
                onChange={(url) => setTutorForm({ ...tutorForm, avatar: url })}
                folder="tutors"
                aspectRatio="circle"
                helperText="Upload tutor photo. Stored in local /uploads/tutors."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Tutor Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={tutorForm.name}
                    onChange={(e) => setTutorForm({ ...tutorForm, name: e.target.value })}
                    placeholder="e.g. David Vance"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={tutorForm.email}
                    onChange={(e) => setTutorForm({ ...tutorForm, email: e.target.value })}
                    placeholder="david.vance@funandlearn.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Title &amp; Role
                  </label>
                  <input
                    type="text"
                    value={tutorForm.title}
                    onChange={(e) => setTutorForm({ ...tutorForm, title: e.target.value })}
                    placeholder="Lead Science Mentor"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Primary Subject
                  </label>
                  <input
                    type="text"
                    value={tutorForm.subject}
                    onChange={(e) => setTutorForm({ ...tutorForm, subject: e.target.value })}
                    placeholder="e.g. Mathematics"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Bio &amp; Academic Background
                </label>
                <textarea
                  rows={3}
                  value={tutorForm.bio}
                  onChange={(e) => setTutorForm({ ...tutorForm, bio: e.target.value })}
                  placeholder="Share teaching philosophy, academic degrees, and mentorship style..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateTutorOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0A5C4C] text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Create Tutor Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: EDIT PUBLIC TUTOR PROFILE
      ======================================================== */}
      {isEditTutorOpen && editingTutor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-5">
              <div>
                <h3 className="text-xl font-black text-[#0B1E2B] font-display">
                  Edit Tutor Profile
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update showcase details and photo for {editingTutor.name}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditTutorOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditTutorSubmit} className="space-y-4 text-xs">
              <ImageUploadField
                label="Tutor Profile Headshot"
                value={editingTutor.avatar || ""}
                onChange={(url) => setEditingTutor({ ...editingTutor, avatar: url })}
                folder="tutors"
                aspectRatio="circle"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Tutor Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingTutor.name}
                    onChange={(e) => setEditingTutor({ ...editingTutor, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Title &amp; Role
                  </label>
                  <input
                    type="text"
                    value={editingTutor.title || ""}
                    onChange={(e) => setEditingTutor({ ...editingTutor, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Bio
                </label>
                <textarea
                  rows={3}
                  value={editingTutor.bio || ""}
                  onChange={(e) => setEditingTutor({ ...editingTutor, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditTutorOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0A5C4C] text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: DELETE PUBLIC TUTOR
      ======================================================== */}
      {isDeleteTutorOpen && deletingTutor && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete Tutor Profile</h3>
            <p className="text-xs text-slate-500 mt-1">
              Are you sure you want to delete <strong className="text-slate-800">{deletingTutor.name}</strong> from public listings?
            </p>

            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsDeleteTutorOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteTutorConfirm}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: HANDOVER SLIP DIALOG
      ======================================================== */}
      {handoverData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-700" />
            </div>

            <h3 className="text-xl font-black text-[#0B1E2B] font-display">
              Instructor Account Ready for Handover
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Account created for <strong className="text-slate-800">{handoverData.name}</strong>. Provide these login credentials to the teacher.
            </p>

            <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span className="font-semibold text-slate-400">Login URL:</span>
                <span className="font-mono text-emerald-700">http://localhost:3000/login</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="font-semibold text-slate-400">Email:</span>
                <span className="font-mono font-bold text-slate-800">{handoverData.email}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="font-semibold text-slate-400">Temporary Password:</span>
                <span className="font-mono font-bold text-slate-800">{handoverData.password}</span>
              </div>
              <div className="pt-2 border-t border-slate-200/60">
                <span className="font-semibold text-slate-400 block mb-1">Granted Programs:</span>
                <div className="flex flex-wrap gap-1">
                  {handoverData.courses.map((cId) => (
                    <span key={cId} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 text-[11px]">
                      {PROGRAMS.find((p) => p.id === cId)?.title || cId}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => copyHandoverCredentials(handoverData)}
                className="px-4 py-2 bg-emerald-50 text-[#0A5C4C] hover:bg-emerald-100 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Full Handover Slip"}</span>
              </button>
              <button
                type="button"
                onClick={() => setHandoverData(null)}
                className="px-5 py-2 bg-[#0A5C4C] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
