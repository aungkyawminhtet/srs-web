import { API_BASE_URL, getAuthToken } from "./client";

export interface UploadResponse {
  url: string;
  key: string;
  provider: "local" | "cloudinary" | "s3";
  filename: string;
  size: number;
  mimetype: string;
}

export async function uploadImageFile(
  file: File,
  folder: string = "general"
): Promise<{ url: string; provider: string; filename: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const token = getAuthToken();
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      headers,
      body: formData,
    });

    const json = await res.json();
    if (!res.ok || !json.con) {
      throw new Error(json.msg || `Upload failed with status ${res.status}`);
    }

    return {
      url: json.data.url,
      provider: json.data.provider || "local",
      filename: json.data.filename || file.name,
    };
  } catch (err: any) {
    // If backend is not running or network fails, fall back to base64 data URL
    console.warn("[Upload] Direct upload failed, falling back to base64 preview:", err.message);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          url: reader.result as string,
          provider: "local",
          filename: file.name,
        });
      };
      reader.onerror = () => reject(new Error("Failed to read image file locally"));
      reader.readAsDataURL(file);
    });
  }
}
