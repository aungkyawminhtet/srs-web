import {
  getTutorList,
  getTutorDetail,
  createTutor,
  updateTutor,
  deleteTutor,
  TutorPayload,
  TutorsFilterParams,
} from "@/utils/api-requests/tutors";
import { TutorItem } from "./types";

export type { TutorPayload, TutorsFilterParams, TutorItem };

export const tutorsService = {
  getAll: async (params?: TutorsFilterParams): Promise<TutorItem[]> => {
    return getTutorList(params);
  },

  getById: async (id: string): Promise<TutorItem> => {
    return getTutorDetail(id);
  },

  create: async (payload: TutorPayload): Promise<TutorItem> => {
    return createTutor(payload);
  },

  update: async (id: string, payload: Partial<TutorPayload>): Promise<TutorItem> => {
    return updateTutor(id, payload);
  },

  delete: async (id: string): Promise<{ id: string }> => {
    return deleteTutor(id);
  },
};

export const tutorsApi = tutorsService;
