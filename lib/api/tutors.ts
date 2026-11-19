import { apiClient } from "./client";
import { TutorItem } from "./types";
export type { TutorItem };

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

export const tutorsService = {
  getAll: async (params?: { specialization?: string }): Promise<TutorItem[]> => {
    return apiClient<TutorItem[]>("/tutors", { params });
  },

  getById: async (id: string): Promise<TutorItem> => {
    return apiClient<TutorItem>(`/tutors/${id}`);
  },

  create: async (payload: TutorPayload): Promise<TutorItem> => {
    return apiClient<TutorItem>("/tutors", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  update: async (id: string, payload: Partial<TutorPayload>): Promise<TutorItem> => {
    return apiClient<TutorItem>(`/tutors/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  delete: async (id: string): Promise<{ id: string }> => {
    return apiClient<{ id: string }>(`/tutors/${id}`, {
      method: "DELETE",
    });
  },
};
