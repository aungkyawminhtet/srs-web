import { apiRequest } from "@/utils/axios";
import type { SubjectItem } from "@/lib/api/types";

export interface SubjectPayload {
  title: string;
  code?: string;
  description?: string;
  programId?: string;
  gradeLevel?: string;
  color?: string;
  status?: "active" | "archived";
}

/**
 * Get all subjects
 */
export async function getSubjectList(
  params?: { programId?: string },
  token?: string | null
): Promise<SubjectItem[]> {
  const response = await apiRequest(token).get<{ con: boolean; data: SubjectItem[] }>("/subjects", {
    params,
  });
  return response.data.data;
}

/**
 * Get single subject by ID
 */
export async function getSubjectDetail(id: string, token?: string | null): Promise<SubjectItem> {
  const response = await apiRequest(token).get<{ con: boolean; data: SubjectItem }>(`/subjects/${id}`);
  return response.data.data;
}

/**
 * Create a new subject
 */
export async function createSubject(
  data: SubjectPayload,
  token?: string | null
): Promise<SubjectItem> {
  const response = await apiRequest(token).post<{ con: boolean; data: SubjectItem }>("/subjects", data);
  return response.data.data;
}

/**
 * Update an existing subject
 */
export async function updateSubject(
  id: string,
  data: Partial<SubjectPayload>,
  token?: string | null
): Promise<SubjectItem> {
  const response = await apiRequest(token).put<{ con: boolean; data: SubjectItem }>(`/subjects/${id}`, data);
  return response.data.data;
}

/**
 * Delete a subject
 */
export async function deleteSubject(id: string, token?: string | null): Promise<{ id: string }> {
  const response = await apiRequest(token).delete<{ con: boolean; data: { id: string } }>(`/subjects/${id}`);
  return response.data.data;
}
