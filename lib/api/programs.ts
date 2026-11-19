import {
  getProgramList,
  getProgramDetail,
  createProgram,
  updateProgram,
  deleteProgram,
  ProgramPayload,
  ProgramsFilterParams,
} from "@/utils/api-requests/programs";
import { ProgramItem } from "./types";

export type { ProgramPayload, ProgramsFilterParams };

export const programsService = {
  getAll: async (params?: ProgramsFilterParams): Promise<ProgramItem[]> => {
    return getProgramList(params);
  },

  getById: async (id: string): Promise<ProgramItem> => {
    return getProgramDetail(id);
  },

  create: async (payload: ProgramPayload): Promise<ProgramItem> => {
    return createProgram(payload);
  },

  update: async (id: string, payload: Partial<ProgramPayload>): Promise<ProgramItem> => {
    return updateProgram(id, payload);
  },

  delete: async (id: string): Promise<{ id: string }> => {
    return deleteProgram(id);
  },
};

export const programsApi = programsService;
