import { useMutation } from "@tanstack/react-query";
import { uploadSingleFile, uploadMultipleFiles, UploadResponse } from "@/utils/api-requests/upload";

export type { UploadResponse };

export function useUploadMutation() {
  return useMutation({
    mutationFn: ({ file, folder }: { file: File; folder?: string }) =>
      uploadSingleFile(file, folder),
  });
}

export function useUploadMultipleMutation() {
  return useMutation({
    mutationFn: ({ files, folder }: { files: File[]; folder?: string }) =>
      uploadMultipleFiles(files, folder),
  });
}
