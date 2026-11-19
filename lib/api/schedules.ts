import {
  getScheduleList,
  getWeeklySchedule,
  getScheduleDetail,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  SchedulePayload,
} from "@/utils/api-requests/schedules";
import { ScheduleItem } from "./types";

export type { SchedulePayload, ScheduleItem };
export type ScheduleBlock = ScheduleItem;

export const schedulesService = {
  getWeekly: async (params?: { studentId?: string }): Promise<ScheduleItem[]> => {
    return getWeeklySchedule(params?.studentId);
  },

  getAll: async (params?: { studentId?: string; tutorId?: string }): Promise<ScheduleItem[]> => {
    return getScheduleList(params);
  },

  getById: async (id: string): Promise<ScheduleItem> => {
    return getScheduleDetail(id);
  },

  create: async (payload: SchedulePayload): Promise<ScheduleItem> => {
    return createSchedule(payload);
  },

  update: async (id: string, payload: Partial<SchedulePayload>): Promise<ScheduleItem> => {
    return updateSchedule(id, payload);
  },

  delete: async (id: string): Promise<{ id: string }> => {
    return deleteSchedule(id);
  },
};

export const schedulesApi = schedulesService;
