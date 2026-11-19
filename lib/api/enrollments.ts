import { apiClient } from "./client";
import { EnrollmentItem } from "./types";

export interface CreateEnrollmentPayload {
  programId: string;
  programTitle: string;
  paymentMethod: "KBZPay" | "CB Pay" | "AYA Pay" | "Wave Pay" | "Bank Transfer";
  paymentDate: string;
  amountPaid: number;
  transactionId?: string;
  paymentSlipUrl?: string; // base64 receipt image
  notes?: string;
}

export const enrollmentsService = {
  // Get current logged-in student's enrollments
  getMyEnrollments: async (): Promise<EnrollmentItem[]> => {
    return apiClient<EnrollmentItem[]>("/enrollments/my");
  },

  // Get all enrollments for admin oversight
  getAll: async (params?: { status?: string }): Promise<EnrollmentItem[]> => {
    return apiClient<EnrollmentItem[]>("/enrollments", { params });
  },

  // Submit manual enrollment with payment slip
  create: async (payload: CreateEnrollmentPayload): Promise<EnrollmentItem> => {
    return apiClient<EnrollmentItem>("/enrollments", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // Admin update enrollment status (approved, rejected, completed)
  updateStatus: async (
    id: string,
    status: "approved" | "rejected" | "completed",
    notes?: string
  ): Promise<EnrollmentItem> => {
    return apiClient<EnrollmentItem>(`/enrollments/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status, notes }),
    });
  },
};
