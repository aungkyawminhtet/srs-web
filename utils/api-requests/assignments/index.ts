import { apiRequest } from "@/utils/axios";
import type { AssignmentItem } from "@/lib/api/types";

export interface AssignmentPayload {
  studentId?: string;
  courseId?: string;
  courseTitle: string;
  title: string;
  description?: string;
  dueDate: string;
  advisorName?: string;
  advisorId?: string;
  status?: "pending" | "submitted" | "graded" | "late";
}

export interface SubmitWorkPayload {
  submissionLink?: string;
  submissionAttachment?: string;
  submissionNotes?: string;
}

/**
 * Get all assignments with optional filters
 */
export async function getAssignmentList(
  params?: { courseId?: string; status?: string },
  token?: string | null
): Promise<AssignmentItem[]> {
  const response = await apiRequest(token).get<{ con: boolean; data: AssignmentItem[] }>("/assignments", {
    params,
  });
  return response.data.data;
}

/**
 * Get current student's assignments
 */
export async function getMyAssignments(token?: string | null): Promise<AssignmentItem[]> {
  const response = await apiRequest(token).get<{ con: boolean; data: AssignmentItem[] }>("/assignments/my");
  return response.data.data;
}

/**
 * Get assignment by ID
 */
export async function getAssignmentDetail(id: string, token?: string | null): Promise<AssignmentItem> {
  const response = await apiRequest(token).get<{ con: boolean; data: AssignmentItem }>(`/assignments/${id}`);
  return response.data.data;
}

/**
 * Create a new assignment
 */
export async function createAssignment(
  data: AssignmentPayload,
  token?: string | null
): Promise<AssignmentItem> {
  const response = await apiRequest(token).post<{ con: boolean; data: AssignmentItem }>("/assignments", data);
  return response.data.data;
}

/**
 * Update an existing assignment
 */
export async function updateAssignment(
  id: string,
  data: Partial<AssignmentPayload>,
  token?: string | null
): Promise<AssignmentItem> {
  const response = await apiRequest(token).put<{ con: boolean; data: AssignmentItem }>(`/assignments/${id}`, data);
  return response.data.data;
}

/**
 * Delete an assignment
 */
export async function deleteAssignment(id: string, token?: string | null): Promise<{ id: string }> {
  const response = await apiRequest(token).delete<{ con: boolean; data: { id: string } }>(`/assignments/${id}`);
  return response.data.data;
}

/**
 * Submit work for an assignment
 */
export async function submitAssignment(
  id: string,
  data: SubmitWorkPayload,
  token?: string | null
): Promise<AssignmentItem> {
  const response = await apiRequest(token).post<{ con: boolean; data: AssignmentItem }>(
    `/assignments/${id}/submit`,
    data
  );
  return response.data.data;
}
