import { apiClient } from "./client";
import { SubjectItem } from "./types";

export interface SubjectPayload {
  title: string;
  code?: string;
  description?: string;
  programId?: string;
  programTitle?: string;
  gradeLevel?: string;
  color?: string;
  status?: "active" | "archived";
}

export const subjectsService = {
  getAll: async (params?: { programId?: string }): Promise<SubjectItem[]> => {
    return apiClient<SubjectItem[]>("/subjects", { params });
  },

  getById: async (id: string): Promise<SubjectItem> => {
    return apiClient<SubjectItem>(`/subjects/${id}`);
  },

  create: async (payload: SubjectPayload): Promise<SubjectItem> => {
    return apiClient<SubjectItem>("/subjects", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  update: async (id: string, payload: Partial<SubjectPayload>): Promise<SubjectItem> => {
    return apiClient<SubjectItem>(`/subjects/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  delete: async (id: string): Promise<{ id: string }> => {
    return apiClient<{ id: string }>(`/subjects/${id}`, {
      method: "DELETE",
    });
  },
};
