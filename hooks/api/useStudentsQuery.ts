import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { studentsService, StudentListItem } from "@/lib/api";
import { queryKeys } from "./queryKeys";

export function useStudentsQuery(filters?: { search?: string }) {
  return useQuery({
    queryKey: queryKeys.students.list(filters),
    queryFn: () => studentsService.getAll(filters),
  });
}

export function useExportStudentsMutation() {
  return useMutation({
    mutationFn: async () => {
      const blob = await studentsService.exportCsv();
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
