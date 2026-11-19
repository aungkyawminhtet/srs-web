import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { queryKeys } from "./queryKeys";

export function useStudentsQuery(filters?: StudentsFilterParams) {
  return useQuery({
    queryKey: queryKeys.students.list(filters),
    queryFn: () => getStudentList(filters),
  });
}

export function useStudentDetailQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.students.detail(id),
    queryFn: () => getStudentDetail(id),
    enabled: Boolean(id),
  });
}

export function useCreateStudentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateStudentPayload) => createStudent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
    },
  });
}

export function useUpdateStudentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateStudentPayload }) =>
      updateStudent(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.students.detail(variables.id) });
    },
  });
}

export function useDeleteStudentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
    },
  });
}

export function useExportStudentsMutation() {
  return useMutation({
    mutationFn: async () => {
      const blob = await exportStudentsCsv();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tutoreem_students_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    },
  });
}
