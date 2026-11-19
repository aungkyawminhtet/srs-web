/**
 * SRS Central API Client
 * Connects srs-web to srs-server (http://localhost:4000/api/v1)
 * Includes token management and resilient fallback for local offline mode.
 */

export * from "./api/index";
import { getStoredAuth, setStoredAuth, UserSession } from "./api/index";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

// Generic fetch wrapper with Authorization header
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string }> {
  try {
    const token = getStoredAuth()?.token || null;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const json = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: json.msg || json.message || "An error occurred",
      };
    }

    return {
      success: true,
      data: json.result ?? json.data ?? json,
      message: json.msg || "Success",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Network request failed",
    };
  }
}

// ==========================================
// 1. AUTH API
// ==========================================
export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const res = await request<UserSession & { redirectUrl?: string }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify(credentials),
      }
    );

    if (res.success && res.data) {
      setStoredAuth(res.data);
    }
    return res;
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role?: "student" | "admin";
  }) => {
    const res = await request<UserSession & { redirectUrl?: string }>(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify(userData),
      }
    );

    if (res.success && res.data) {
      setStoredAuth(res.data);
    }
    return res;
  },

  logout: async () => {
    await request("/auth/logout", { method: "POST" });
    setStoredAuth(null);
  },

  getProfile: async () => {
    return request<UserSession>("/auth/profile");
  },
};

// ==========================================
// 2. PROGRAMS API
// ==========================================
export interface ProgramItem {
  _id: string;
  title: string;
  slug: string;
  subject: string;
  category: string;
  description: string;
  tutorName: string;
  tutorRole?: string;
  tutorAvatar?: string;
  lessonsCount: number;
  price: number;
  priceCurrency: string;
  level: string;
  features: string[];
  progress?: number;
  isActive: boolean;
}

export const programsApi = {
  getAll: (params?: { subject?: string; level?: string; search?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return request<ProgramItem[]>(`/programs?${query}`);
  },
  getBySlug: (slug: string) => {
    return request<ProgramItem>(`/programs/${slug}`);
  },
  create: (data: Partial<ProgramItem>) => {
    return request<ProgramItem>("/programs", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  update: (id: string, data: Partial<ProgramItem>) => {
    return request<ProgramItem>(`/programs/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  delete: (id: string) => {
    return request(`/programs/${id}`, { method: "DELETE" });
  },
};

// ==========================================
// 3. SUBJECTS API
// ==========================================
export interface SubjectItem {
  _id: string;
  name: string;
  code: string;
  description: string;
  category: string;
  icon?: string;
  color?: string;
  programsCount?: number;
}

export const subjectsApi = {
  getAll: () => request<SubjectItem[]>("/subjects"),
  create: (data: Partial<SubjectItem>) =>
    request<SubjectItem>("/subjects", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<SubjectItem>) =>
    request<SubjectItem>(`/subjects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) => request(`/subjects/${id}`, { method: "DELETE" }),
};

// ==========================================
// 4. TUTORS API
// ==========================================
export interface TutorItem {
  _id: string;
  name: string;
  email: string;
  subject: string;
  role: string;
  bio: string;
  avatar?: string;
  rating: number;
  experienceYears: number;
  activeStudents: number;
  availability: string[];
}

export const tutorsApi = {
  getAll: () => request<TutorItem[]>("/tutors"),
  create: (data: Partial<TutorItem>) =>
    request<TutorItem>("/tutors", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<TutorItem>) =>
    request<TutorItem>(`/tutors/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) => request(`/tutors/${id}`, { method: "DELETE" }),
};

// ==========================================
// 5. ENROLLMENTS & PAYMENT SLIPS API
// ==========================================
export interface EnrollmentItem {
  _id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  programId: string;
  programTitle: string;
  advisorName: string;
  amount: number;
  paymentMethod: string;
  paymentName: string;
  paymentDate: string;
  receiptImage: string;
  status: "pending" | "approved" | "rejected";
  invoiceNumber: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  todos?: Array<{
    id: string;
    title: string;
    done: boolean;
    dueDate: string;
  }>;
  createdAt: string;
}

export const enrollmentsApi = {
  getAll: (params?: { studentId?: string; status?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return request<EnrollmentItem[]>(`/enrollments?${query}`);
  },
  create: (data: {
    studentId?: string;
    studentName: string;
    studentEmail: string;
    programId: string;
    programTitle: string;
    amount: number;
    paymentMethod: string;
    paymentName: string;
    paymentDate: string;
    receiptImage: string; // Base64
  }) => {
    return request<EnrollmentItem>("/enrollments", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  updateStatus: (id: string, status: "pending" | "approved" | "rejected") => {
    return request<EnrollmentItem>(`/enrollments/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
};

// ==========================================
// 6. SCHEDULE TIMETABLE API
// ==========================================
export interface ScheduleBlock {
  _id?: string;
  courseCode: string;
  courseTitle: string;
  dayIndex: number; // 1 (Mon) to 7 (Sun)
  dayLabel: string;
  startTime: string; // "10:00"
  endTime: string;   // "11:50"
  startHour: number; // 10
  durationHours: number; // 1.83
  section: string;
  teachingType: "LECT" | "LAB";
  buildingRoom: string;
  tutorName?: string;
}

export const schedulesApi = {
  getTimetable: () => request<ScheduleBlock[]>("/schedules"),
  create: (data: Partial<ScheduleBlock>) =>
    request<ScheduleBlock>("/schedules", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<ScheduleBlock>) =>
    request<ScheduleBlock>(`/schedules/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) => request(`/schedules/${id}`, { method: "DELETE" }),
};

// ==========================================
// 7. ASSIGNMENTS & HOMEWORK SUBMISSION API
// ==========================================
export interface AssignmentItem {
  _id: string;
  title: string;
  course: string;
  advisorName: string;
  dueDate: string;
  meta: string;
  status: "assigned" | "missing" | "done";
  isCloseDeadline?: boolean;
  deadlineWarning?: string;
  submissions?: Array<{
    studentName: string;
    reportLink?: string;
    reportFileUrl?: string;
    notes?: string;
    status: string;
    score?: string;
    feedback?: string;
    submittedAt: string;
  }>;
}

export const assignmentsApi = {
  getAll: () => request<AssignmentItem[]>("/assignments"),
  submitReport: (
    id: string,
    data: {
      studentId?: string;
      studentName: string;
      reportLink?: string;
      reportFileUrl?: string; // base64 / URL
      notes?: string;
    }
  ) => {
    return request<AssignmentItem>(`/assignments/${id}/submit`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  create: (data: Partial<AssignmentItem>) =>
    request<AssignmentItem>("/assignments", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// ==========================================
// 8. LEARNING LIBRARY API
// ==========================================
export interface LibraryFileItem {
  _id: string;
  title: string;
  type: "pdf" | "document" | "image" | "video";
  course: string;
  subject?: string;
  description: string;
  fileSize: string;
  fileUrl: string;
  isSavedByUser?: boolean;
  downloads: number;
  uploadedBy: string;
  createdAt: string;
}

export const libraryApi = {
  getAll: (params?: { type?: string; course?: string; search?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return request<LibraryFileItem[]>(`/library?${query}`);
  },
  create: (data: Partial<LibraryFileItem>) =>
    request<LibraryFileItem>("/library", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  toggleSave: (id: string) =>
    request<LibraryFileItem>(`/library/${id}/save`, { method: "PATCH" }),
};

// ==========================================
// 9. STUDENTS & STUDENT ID EXPORT API
// ==========================================
export interface StudentRecord {
  _id: string;
  studentId: string;
  name: string;
  email: string;
  phone?: string;
  grade?: string;
  avatar?: string;
  role?: "student" | string;
  createdAt: string;
  enrolledCourses?: Array<{ _id: string; title: string; subject: string }>;
}

export const studentsApi = {
  getAll: (search?: string) => {
    const query = search ? `?search=${encodeURIComponent(search)}` : "";
    return request<StudentRecord[]>(`/students${query}`);
  },
  create: (data: Partial<StudentRecord> & { password?: string }) => {
    return request<StudentRecord>("/students", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  update: (id: string, data: Partial<StudentRecord>) => {
    return request<StudentRecord>(`/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  delete: (id: string) => {
    return request<{ _id: string; studentId: string }>(`/students/${id}`, {
      method: "DELETE",
    });
  },
  export: () => {
    return request<
      Array<{
        index: number;
        studentId: string;
        name: string;
        email: string;
        phone: string;
        grade: string;
        registeredDate: string;
      }>
    >("/students/export");
  },
};
