import { apiClient } from "./client";
import { StudentListItem } from "./types";

export interface CreateStudentPayload {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  grade?: string;
  avatar?: string;
  enrolledCourses?: string[];
}

export interface UpdateStudentPayload {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  grade?: string;
  avatar?: string;
  enrolledCourses?: string[];
}

export const studentsService = {
  getAll: async (params?: { search?: string; grade?: string }): Promise<StudentListItem[]> => {
    return apiClient<StudentListItem[]>("/students", { params });
  },

  getById: async (id: string): Promise<StudentListItem> => {
    return apiClient<StudentListItem>(`/students/${id}`);
  },

  create: async (payload: CreateStudentPayload): Promise<StudentListItem> => {
    return apiClient<StudentListItem>("/students", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  update: async (id: string, payload: UpdateStudentPayload): Promise<StudentListItem> => {
    return apiClient<StudentListItem>(`/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  delete: async (id: string): Promise<{ _id: string; studentId: string }> => {
    return apiClient<{ _id: string; studentId: string }>(`/students/${id}`, {
      method: "DELETE",
    });
  },

  exportCsv: async (): Promise<Blob> => {
    const students = await apiClient<StudentListItem[]>("/students");
    const headers = ["Student ID", "Full Name", "Email", "Grade", "Phone", "Status", "Registered Date"];
    const rows = students.map((s) => [
      s.studentId,
      `"${s.name.replace(/"/g, '""')}"`,
      s.email,
      s.grade || "N/A",
      s.phone || "N/A",
      s.status || "active",
      new Date(s.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    return new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  },
};

export const studentsApi = studentsService;
export type StudentRecord = StudentListItem;
