import { apiRequest } from "@/utils/axios";
import type { StudentListItem } from "@/lib/api/types";

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
  status?: "active" | "inactive" | "suspended";
}

export interface StudentsFilterParams {
  search?: string;
  grade?: string;
  status?: string;
}

/**
 * Get all students with optional filters
 */
export async function getStudentList(
  params?: StudentsFilterParams,
  token?: string | null
): Promise<StudentListItem[]> {
  const response = await apiRequest(token).get<{ con: boolean; data: StudentListItem[] }>("/students", {
    params,
  });
  return response.data.data;
}

/**
 * Get single student by ID
 */
export async function getStudentDetail(id: string, token?: string | null): Promise<StudentListItem> {
  const response = await apiRequest(token).get<{ con: boolean; data: StudentListItem }>(`/students/${id}`);
  return response.data.data;
}

/**
 * Create a new student record
 */
export async function createStudent(
  data: CreateStudentPayload,
  token?: string | null
): Promise<StudentListItem> {
  const response = await apiRequest(token).post<{ con: boolean; data: StudentListItem }>("/students", data);
  return response.data.data;
}

/**
 * Update an existing student record
 */
export async function updateStudent(
  id: string,
  data: UpdateStudentPayload,
  token?: string | null
): Promise<StudentListItem> {
  const response = await apiRequest(token).put<{ con: boolean; data: StudentListItem }>(`/students/${id}`, data);
  return response.data.data;
}

/**
 * Delete a student record
 */
export async function deleteStudent(
  id: string,
  token?: string | null
): Promise<{ _id: string; studentId: string }> {
  const response = await apiRequest(token).delete<{ con: boolean; data: { _id: string; studentId: string } }>(
    `/students/${id}`
  );
  return response.data.data;
}

/**
 * Export students as a downloadable CSV Blob
 */
export async function exportStudentsCsv(token?: string | null): Promise<Blob> {
  const students = await getStudentList(undefined, token);
  const headers = [
    "Student ID",
    "Full Name",
    "Email",
    "Grade",
    "Phone",
    "Status",
    "Registered Date",
  ];
  const rows = students.map((s) => [
    s.studentId,
    `"${(s.name || "").replace(/"/g, '""')}"`,
    s.email,
    s.grade || "N/A",
    s.phone || "N/A",
    s.status || "active",
    s.createdAt ? new Date(s.createdAt).toLocaleDateString() : "N/A",
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  return new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
}
