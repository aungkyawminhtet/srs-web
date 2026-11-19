import { apiRequest } from "@/utils/axios";

export interface UploadResponse {
  url: string;
  provider: "local" | "cloudinary" | "s3";
  filename: string;
  size?: number;
  mimetype?: string;
}

/**
 * Upload single image or document file
 */
export async function uploadSingleFile(
  file: File,
  folder: string = "general",
  token?: string | null
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  try {
    const response = await apiRequest(token).post<{ con: boolean; data: UploadResponse }>(
      "/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    console.warn("[Upload] Server upload failed, falling back to base64 preview:", error.message);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          url: reader.result as string,
          provider: "local",
          filename: file.name,
          size: file.size,
          mimetype: file.type,
        });
      };
      reader.onerror = () => reject(new Error("Failed to read image locally"));
      reader.readAsDataURL(file);
    });
  }
}

/**
 * Upload multiple files
 */
export async function uploadMultipleFiles(
  files: File[],
  folder: string = "general",
  token?: string | null
): Promise<UploadResponse[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  formData.append("folder", folder);

  const response = await apiRequest(token).post<{ con: boolean; data: UploadResponse[] }>(
    "/upload/multiple",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.data;
}

/**
 * Delete an uploaded file
 */
export async function deleteUploadedFile(
  filename: string,
  token?: string | null
): Promise<{ success: boolean; filename: string }> {
  const response = await apiRequest(token).delete<{
    con: boolean;
    data: { success: boolean; filename: string };
  }>(`/upload/${filename}`);
  return response.data.data;
}
