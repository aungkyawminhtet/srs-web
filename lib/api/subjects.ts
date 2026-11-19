import {
  getSubjectList,
  getSubjectDetail,
  createSubject,
  updateSubject,
  deleteSubject,
  SubjectPayload,
} from "@/utils/api-requests/subjects";
import { SubjectItem } from "./types";

export type { SubjectPayload, SubjectItem };

export const subjectsService = {
  getAll: async (params?: { programId?: string }): Promise<SubjectItem[]> => {
    return getSubjectList(params);
  },

  getById: async (id: string): Promise<SubjectItem> => {
    return getSubjectDetail(id);
  },

  create: async (payload: SubjectPayload): Promise<SubjectItem> => {
    return createSubject(payload);
  },

  update: async (id: string, payload: Partial<SubjectPayload>): Promise<SubjectItem> => {
    return updateSubject(id, payload);
  },

  delete: async (id: string): Promise<{ id: string }> => {
    return deleteSubject(id);
  },
};

export const subjectsApi = subjectsService;
