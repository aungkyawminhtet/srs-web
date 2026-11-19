import { apiRequest } from "@/utils/axios";
import type { TutorItem } from "@/lib/api/types";

export interface TutorPayload {
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

export interface TutorsFilterParams {
  specialization?: string;
  status?: string;
  search?: string;
}

/**
 * Get all tutors with optional filters
 */
export async function getTutorList(
  params?: TutorsFilterParams,
  token?: string | null
): Promise<TutorItem[]> {
  const response = await apiRequest(token).get<{ con: boolean; data: TutorItem[] }>("/tutors", {
    params,
  });
  return response.data.data;
}

/**
 * Get single tutor detail by ID
 */
export async function getTutorDetail(id: string, token?: string | null): Promise<TutorItem> {
  const response = await apiRequest(token).get<{ con: boolean; data: TutorItem }>(`/tutors/${id}`);
  return response.data.data;
}

/**
 * Create a new tutor profile
 */
export async function createTutor(data: TutorPayload, token?: string | null): Promise<TutorItem> {
  const response = await apiRequest(token).post<{ con: boolean; data: TutorItem }>("/tutors", data);
  return response.data.data;
}

/**
 * Update an existing tutor profile
 */
export async function updateTutor(
  id: string,
  data: Partial<TutorPayload>,
  token?: string | null
): Promise<TutorItem> {
  const response = await apiRequest(token).put<{ con: boolean; data: TutorItem }>(`/tutors/${id}`, data);
  return response.data.data;
}

/**
 * Delete a tutor profile
 */
export async function deleteTutor(id: string, token?: string | null): Promise<{ id: string }> {
  const response = await apiRequest(token).delete<{ con: boolean; data: { id: string } }>(`/tutors/${id}`);
  return response.data.data;
}
