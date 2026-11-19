import {
  getAssignmentList,
  getMyAssignments,
  getAssignmentDetail,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  AssignmentPayload,
  SubmitWorkPayload,
} from "@/utils/api-requests/assignments";
import { AssignmentItem } from "./types";

export type { AssignmentPayload, SubmitWorkPayload, AssignmentItem };

export const assignmentsService = {
  getMyAssignments: async (): Promise<AssignmentItem[]> => {
    return getMyAssignments();
  },

  getAll: async (params?: { courseId?: string; status?: string }): Promise<AssignmentItem[]> => {
    return getAssignmentList(params);
  },

  getById: async (id: string): Promise<AssignmentItem> => {
    return getAssignmentDetail(id);
  },

  create: async (payload: AssignmentPayload): Promise<AssignmentItem> => {
    return createAssignment(payload);
  },

  update: async (id: string, payload: Partial<AssignmentPayload>): Promise<AssignmentItem> => {
    return updateAssignment(id, payload);
  },

  delete: async (id: string): Promise<{ id: string }> => {
    return deleteAssignment(id);
  },

  submitWork: async (id: string, payload: SubmitWorkPayload): Promise<AssignmentItem> => {
    return submitAssignment(id, payload);
  },
};

export const assignmentsApi = assignmentsService;
