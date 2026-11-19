import {
  uploadSingleFile,
  uploadMultipleFiles,
  deleteUploadedFile,
  UploadResponse,
} from "@/utils/api-requests/upload";

export type { UploadResponse };

export async function uploadImageFile(
  file: File,
  folder: string = "general"
): Promise<{ url: string; provider: string; filename: string }> {
  const result = await uploadSingleFile(file, folder);
  return {
    url: result.url,
    provider: result.provider || "local",
    filename: result.filename || file.name,
  };
}

export const uploadService = {
  uploadSingle: uploadSingleFile,
  uploadMultiple: uploadMultipleFiles,
  delete: deleteUploadedFile,
};
