import { apiClient } from "./client";
import { ProgramItem } from "./types";

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
}

export const programsService = {
  getAll: async (params?: { curriculum?: string; gradeLevel?: string }): Promise<ProgramItem[]> => {
    return apiClient<ProgramItem[]>("/programs", { params });
  },

  getById: async (id: string): Promise<ProgramItem> => {
    return apiClient<ProgramItem>(`/programs/${id}`);
  },

  create: async (payload: ProgramPayload): Promise<ProgramItem> => {
    return apiClient<ProgramItem>("/programs", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  update: async (id: string, payload: Partial<ProgramPayload>): Promise<ProgramItem> => {
    return apiClient<ProgramItem>(`/programs/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  delete: async (id: string): Promise<{ id: string }> => {
    return apiClient<{ id: string }>(`/programs/${id}`, {
      method: "DELETE",
    });
  },
};
