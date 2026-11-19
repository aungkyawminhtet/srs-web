import { apiRequest } from "@/utils/axios";
import type { LibraryItem } from "@/lib/api/types";

export interface LibraryPayload {
  title: string;
  courseTitle: string;
  fileType: "pdf" | "document" | "image" | "video";
  fileUrl: string;
  fileSize?: string;
}

export interface LibraryFilterParams {
  fileType?: string;
  savedOnly?: boolean;
  search?: string;
}

/**
 * Get library materials
 */
export async function getLibraryList(
  params?: LibraryFilterParams,
  token?: string | null
): Promise<LibraryItem[]> {
  const response = await apiRequest(token).get<{ con: boolean; data: LibraryItem[] }>("/library", {
    params,
  });
  return response.data.data;
}

/**
 * Get library item by ID
 */
export async function getLibraryDetail(id: string, token?: string | null): Promise<LibraryItem> {
  const response = await apiRequest(token).get<{ con: boolean; data: LibraryItem }>(`/library/${id}`);
  return response.data.data;
}

/**
 * Upload / create library item
 */
export async function createLibraryItem(
  data: LibraryPayload,
  token?: string | null
): Promise<LibraryItem> {
  const response = await apiRequest(token).post<{ con: boolean; data: LibraryItem }>("/library", data);
  return response.data.data;
}

/**
 * Update library item
 */
export async function updateLibraryItem(
  id: string,
  data: Partial<LibraryPayload>,
  token?: string | null
): Promise<LibraryItem> {
  const response = await apiRequest(token).put<{ con: boolean; data: LibraryItem }>(`/library/${id}`, data);
  return response.data.data;
}

/**
 * Delete library item
 */
export async function deleteLibraryItem(id: string, token?: string | null): Promise<{ id: string }> {
  const response = await apiRequest(token).delete<{ con: boolean; data: { id: string } }>(`/library/${id}`);
  return response.data.data;
}

/**
 * Toggle bookmark / save status
 */
export async function toggleSaveLibraryItem(
  id: string,
  token?: string | null
): Promise<{ id: string; isSaved: boolean }> {
  const response = await apiRequest(token).post<{ con: boolean; data: { id: string; isSaved: boolean } }>(
    `/library/${id}/save`
  );
  return response.data.data;
}
