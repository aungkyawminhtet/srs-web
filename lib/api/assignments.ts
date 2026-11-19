import { apiClient } from "./client";
import { AssignmentItem } from "./types";

export interface SubmitWorkPayload {
  submissionLink?: string;
  submissionAttachment?: string; // base64 or file URL
  submissionNotes?: string;
}

export const assignmentsService = {
  getMyAssignments: async (): Promise<AssignmentItem[]> => {
    return apiClient<AssignmentItem[]>("/assignments/my");
  },

  getAll: async (params?: { courseId?: string; status?: string }): Promise<AssignmentItem[]> => {
    return apiClient<AssignmentItem[]>("/assignments", { params });
  },

  submitWork: async (id: string, payload: SubmitWorkPayload): Promise<AssignmentItem> => {
    return apiClient<AssignmentItem>(`/assignments/${id}/submit`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
