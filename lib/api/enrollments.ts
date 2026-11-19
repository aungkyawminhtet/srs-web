import {
  getEnrollmentList,
  getMyEnrollments,
  getEnrollmentDetail,
  createEnrollment,
  updateEnrollmentStatus,
  deleteEnrollment,
  CreateEnrollmentPayload,
  EnrollmentsFilterParams,
} from "@/utils/api-requests/enrollments";
import { EnrollmentItem } from "./types";

export type { CreateEnrollmentPayload, EnrollmentsFilterParams, EnrollmentItem };

export const enrollmentsService = {
  getMyEnrollments: async (): Promise<EnrollmentItem[]> => {
    return getMyEnrollments();
  },

  getAll: async (params?: EnrollmentsFilterParams): Promise<EnrollmentItem[]> => {
    return getEnrollmentList(params);
  },

  getById: async (id: string): Promise<EnrollmentItem> => {
    return getEnrollmentDetail(id);
  },

  create: async (payload: CreateEnrollmentPayload): Promise<EnrollmentItem> => {
    return createEnrollment(payload);
  },

  updateStatus: async (
    id: string,
    status: "approved" | "rejected" | "completed",
    notes?: string
  ): Promise<EnrollmentItem> => {
    return updateEnrollmentStatus(id, status, notes);
  },

  delete: async (id: string): Promise<{ id: string }> => {
    return deleteEnrollment(id);
  },
};

export const enrollmentsApi = enrollmentsService;
