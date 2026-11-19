import { apiRequest } from "@/utils/axios";
import type { ProgramItem } from "@/lib/api/types";

export interface ProgramPayload {
  title: string;
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
}

export interface ProgramsFilterParams {
  curriculum?: string;
  gradeLevel?: string;
  status?: string;
}

/**
 * Get all programs with optional filters
 */
export async function getProgramList(
  params?: ProgramsFilterParams,
  token?: string | null
): Promise<ProgramItem[]> {
  const response = await apiRequest(token).get<{ con: boolean; data: ProgramItem[] }>("/programs", {
    params,
  });
  return response.data.data;
}

/**
 * Get program by ID
 */
export async function getProgramDetail(id: string, token?: string | null): Promise<ProgramItem> {
  const response = await apiRequest(token).get<{ con: boolean; data: ProgramItem }>(`/programs/${id}`);
  return response.data.data;
}

/**
 * Create a new program
 */
export async function createProgram(
  data: ProgramPayload,
  token?: string | null
): Promise<ProgramItem> {
  const response = await apiRequest(token).post<{ con: boolean; data: ProgramItem }>("/programs", data);
  return response.data.data;
}

/**
 * Update an existing program
 */
export async function updateProgram(
  id: string,
  data: Partial<ProgramPayload>,
  token?: string | null
): Promise<ProgramItem> {
  const response = await apiRequest(token).put<{ con: boolean; data: ProgramItem }>(`/programs/${id}`, data);
  return response.data.data;
}

/**
 * Delete a program
 */
export async function deleteProgram(id: string, token?: string | null): Promise<{ id: string }> {
  const response = await apiRequest(token).delete<{ con: boolean; data: { id: string } }>(`/programs/${id}`);
  return response.data.data;
}
