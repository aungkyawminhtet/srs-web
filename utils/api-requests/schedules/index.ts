import { apiRequest } from "@/utils/axios";
import type { ScheduleItem } from "@/lib/api/types";

export interface SchedulePayload {
  studentId?: string;
  courseCode: string;
  courseTitle: string;
  dayOfWeek: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  dayDate: string;
  startTime: string;
  endTime: string;
  section: string;
  teachingType: "LECT" | "LAB" | "TUTORIAL";
  buildingRoom: string;
  tutorName?: string;
  status?: "scheduled" | "completed" | "cancelled";
}

/**
 * Get all schedules with optional filters
 */
export async function getScheduleList(
  params?: { studentId?: string; tutorId?: string },
  token?: string | null
): Promise<ScheduleItem[]> {
  const response = await apiRequest(token).get<{ con: boolean; data: ScheduleItem[] }>("/schedules", {
    params,
  });
  return response.data.data;
}

/**
 * Get weekly schedule for student
 */
export async function getWeeklySchedule(
  studentId?: string,
  token?: string | null
): Promise<ScheduleItem[]> {
  return getScheduleList(studentId ? { studentId } : undefined, token);
}

/**
 * Get single schedule by ID
 */
export async function getScheduleDetail(id: string, token?: string | null): Promise<ScheduleItem> {
  const response = await apiRequest(token).get<{ con: boolean; data: ScheduleItem }>(`/schedules/${id}`);
  return response.data.data;
}

/**
 * Create a new schedule block
 */
export async function createSchedule(
  data: SchedulePayload,
  token?: string | null
): Promise<ScheduleItem> {
  const response = await apiRequest(token).post<{ con: boolean; data: ScheduleItem }>("/schedules", data);
  return response.data.data;
}

/**
 * Update an existing schedule block
 */
export async function updateSchedule(
  id: string,
  data: Partial<SchedulePayload>,
  token?: string | null
): Promise<ScheduleItem> {
  const response = await apiRequest(token).put<{ con: boolean; data: ScheduleItem }>(`/schedules/${id}`, data);
  return response.data.data;
}

/**
 * Delete a schedule block
 */
export async function deleteSchedule(id: string, token?: string | null): Promise<{ id: string }> {
  const response = await apiRequest(token).delete<{ con: boolean; data: { id: string } }>(`/schedules/${id}`);
  return response.data.data;
}
