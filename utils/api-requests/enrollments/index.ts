import { apiRequest } from "@/utils/axios";
import type { EnrollmentItem } from "@/lib/api/types";

export interface CreateEnrollmentPayload {
  programId: string;
  programTitle: string;
  paymentMethod: "KBZPay" | "CB Pay" | "AYA Pay" | "Wave Pay" | "Bank Transfer";
  paymentDate: string;
  amountPaid: number;
  transactionId?: string;
  paymentSlipUrl?: string;
  notes?: string;
}

export interface EnrollmentsFilterParams {
  status?: string;
  studentId?: string;
}

/**
 * Get all enrollments for admin oversight
 */
export async function getEnrollmentList(
  params?: EnrollmentsFilterParams,
  token?: string | null
): Promise<EnrollmentItem[]> {
  const response = await apiRequest(token).get<{ con: boolean; data: EnrollmentItem[] }>("/enrollments", {
    params,
  });
  return response.data.data;
}

/**
 * Get current authenticated student's enrollments
 */
export async function getMyEnrollments(token?: string | null): Promise<EnrollmentItem[]> {
  const response = await apiRequest(token).get<{ con: boolean; data: EnrollmentItem[] }>("/enrollments/my");
  return response.data.data;
}

/**
 * Get enrollment by ID
 */
export async function getEnrollmentDetail(id: string, token?: string | null): Promise<EnrollmentItem> {
  const response = await apiRequest(token).get<{ con: boolean; data: EnrollmentItem }>(`/enrollments/${id}`);
  return response.data.data;
}

/**
 * Create a new enrollment submission
 */
export async function createEnrollment(
  data: CreateEnrollmentPayload,
  token?: string | null
): Promise<EnrollmentItem> {
  const response = await apiRequest(token).post<{ con: boolean; data: EnrollmentItem }>("/enrollments", data);
  return response.data.data;
}

/**
 * Update enrollment status (approved, rejected, completed)
 */
export async function updateEnrollmentStatus(
  id: string,
  status: "approved" | "rejected" | "completed",
  notes?: string,
  token?: string | null
): Promise<EnrollmentItem> {
  const response = await apiRequest(token).patch<{ con: boolean; data: EnrollmentItem }>(
    `/enrollments/${id}/status`,
    { status, notes }
  );
  return response.data.data;
}

/**
 * Delete or cancel an enrollment
 */
export async function deleteEnrollment(id: string, token?: string | null): Promise<{ id: string }> {
  const response = await apiRequest(token).delete<{ con: boolean; data: { id: string } }>(`/enrollments/${id}`);
  return response.data.data;
}
