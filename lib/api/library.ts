import { apiClient } from "./client";
import { LibraryItem } from "./types";

export interface LibraryPayload {
  title: string;
  courseTitle: string;
  fileType: "pdf" | "document" | "image" | "video";
  fileUrl: string;
  fileSize?: string;
}

export const libraryService = {
  getAll: async (params?: { fileType?: string; savedOnly?: boolean }): Promise<LibraryItem[]> => {
    return apiClient<LibraryItem[]>("/library", { params });
  },

  toggleSave: async (id: string): Promise<{ id: string; isSaved: boolean }> => {
    return apiClient<{ id: string; isSaved: boolean }>(`/library/${id}/save`, {
      method: "POST",
    });
  },

  upload: async (payload: LibraryPayload): Promise<LibraryItem> => {
    return apiClient<LibraryItem>("/library", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
