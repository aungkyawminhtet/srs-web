/**
 * SRS Central Domain Types
 */

export type UserRole = "student" | "admin" | "tutor" | "instructor";

export const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 1 day limit in milliseconds (86,400,000 ms)

export interface UserSession {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
  grade?: string;
  phone?: string;
  avatar?: string;
  token?: string;
  redirectUrl?: string;
  assignedCourses?: string[];
  createdAt?: number;
  expiresAt?: number;
}

export interface ApiResponse<T> {
  con?: boolean;
  success?: boolean;
  msg?: string;
  message?: string;
  data?: T;
  result?: T;
}

export interface ProgramItem {
  _id: string;
  title: string;
  slug?: string;
  curriculum?: string;
  gradeLevel?: string;
  description?: string;
  tuitionFee?: number;
  currency?: string;
  thumbnail?: string;
  subjectsCount?: number;
  status?: "active" | "draft" | "archived";
  syllabus?: {
    moduleNumber: number;
    title: string;
    description?: string;
    hours?: number;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface SubjectItem {
  _id: string;
  title: string;
  code?: string;
  description?: string;
  programId?: string | { _id: string; title: string };
  programTitle?: string;
  gradeLevel?: string;
  color?: string;
  status?: "active" | "archived";
}

export interface TutorItem {
  _id: string;
  name: string;
  email?: string;
  title?: string;
  bio?: string;
  avatar?: string;
  specialization?: string[];
  education?: string;
  experienceYears?: number;
  rating?: number;
  hourlyRate?: number;
  phone?: string;
  status?: "active" | "inactive";
}

export interface EnrollmentItem {
  _id: string;
  studentId: string;
  studentName?: string;
  studentEmail?: string;
  programId: string | { _id: string; title: string; tuitionFee?: number; thumbnail?: string };
  programTitle: string;
  advisorId?: string | { _id: string; name: string; avatar?: string; title?: string };
  advisorName?: string;
  advisorAvatar?: string;
  status: "pending" | "approved" | "rejected" | "completed";
  paymentMethod: "KBZPay" | "CB Pay" | "AYA Pay" | "Wave Pay" | "Bank Transfer";
  paymentSlipUrl?: string;
  paymentDate: string;
  transactionId?: string;
  amountPaid: number;
  progressPercent: number;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ScheduleItem {
  _id: string;
  studentId?: string;
  courseCode: string;
  courseTitle: string;
  dayOfWeek: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  dayDate: string; // e.g. "16 Nov"
  startTime: string; // e.g. "08.00"
  endTime: string; // e.g. "10.00"
  section: string; // e.g. "3"
  teachingType: "LECT" | "LAB" | "TUTORIAL";
  buildingRoom: string; // e.g. "E3 B 101"
  tutorName?: string;
  status?: "scheduled" | "completed" | "cancelled";
}

export interface AssignmentItem {
  _id: string;
  studentId?: string;
  courseId?: string;
  courseTitle: string;
  title: string;
  description?: string;
  dueDate: string;
  advisorName: string;
  advisorId?: string;
  status: "pending" | "submitted" | "graded" | "late";
  submissionLink?: string;
  submissionAttachment?: string;
  submissionNotes?: string;
  submittedAt?: string;
  grade?: string;
  feedback?: string;
}

export interface LibraryItem {
  _id: string;
  title: string;
  courseTitle: string;
  fileType: "pdf" | "document" | "image" | "video";
  fileUrl: string;
  fileSize?: string;
  uploadedBy?: string;
  savedByStudents?: string[];
  isSaved?: boolean;
  createdAt?: string;
}

export interface StudentListItem {
  _id: string;
  studentId: string;
  name: string;
  email: string;
  role: "student";
  grade?: string;
  phone?: string;
  avatar?: string;
  enrolledCourses?: Array<{ _id: string; title: string; subject?: string }>;
  enrollmentsCount?: number;
  status?: "active" | "suspended";
  createdAt: string;
}
