import {
  getStudentList,
  getStudentDetail,
  createStudent,
  updateStudent,
  deleteStudent,
  exportStudentsCsv,
  CreateStudentPayload,
  UpdateStudentPayload,
  StudentsFilterParams,
} from "@/utils/api-requests/students";
import { StudentListItem } from "./types";

export type { CreateStudentPayload, UpdateStudentPayload, StudentsFilterParams };
export type StudentRecord = StudentListItem;

export const studentsService = {
  getAll: async (params?: StudentsFilterParams): Promise<StudentListItem[]> => {
    return getStudentList(params);
  },

  getById: async (id: string): Promise<StudentListItem> => {
    return getStudentDetail(id);
  },

  create: async (payload: CreateStudentPayload): Promise<StudentListItem> => {
    return createStudent(payload);
  },

  update: async (id: string, payload: UpdateStudentPayload): Promise<StudentListItem> => {
    return updateStudent(id, payload);
  },

  delete: async (id: string): Promise<{ _id: string; studentId: string }> => {
    return deleteStudent(id);
  },

  exportCsv: async (): Promise<Blob> => {
    return exportStudentsCsv();
  },
};

export const studentsApi = studentsService;
