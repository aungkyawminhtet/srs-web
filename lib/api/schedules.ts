import { apiClient } from "./client";
import { ScheduleItem } from "./types";

export interface SchedulePayload {
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
}

export const schedulesService = {
  getWeekly: async (params?: { studentId?: string }): Promise<ScheduleItem[]> => {
    return apiClient<ScheduleItem[]>("/schedules", { params });
  },

  create: async (payload: SchedulePayload): Promise<ScheduleItem> => {
    return apiClient<ScheduleItem>("/schedules", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  delete: async (id: string): Promise<{ id: string }> => {
    return apiClient<{ id: string }>(`/schedules/${id}`, {
      method: "DELETE",
    });
  },
};
