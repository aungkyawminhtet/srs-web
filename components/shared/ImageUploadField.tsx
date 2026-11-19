"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  X,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  Link2,
  HardDrive,
  Cloud,
  FileImage,
} from "lucide-react";
import { uploadImageFile } from "@/lib/api/upload";

interface ImageUploadFieldProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: "students" | "instructors" | "programs" | "tutors" | "general";
  aspectRatio?: "circle" | "square" | "banner";
  helperText?: string;
  required?: boolean;
}

export function ImageUploadField({
  value,
  onChange,
  label = "Upload Image",
  folder = "general",
  aspectRatio = "square",
  helperText = "PNG, JPG, WEBP or SVG up to 10MB.",
  required = false,
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [storageBadge, setStorageBadge] = useState<string | null>(
    value ? (value.includes("/uploads/") ? "Local Storage" : "Remote Storage") : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("File size exceeds 10MB limit.");
      return;
    }

    setErrorMessage(null);
    setIsUploading(true);

    try {
      const result = await uploadImageFile(file, folder);
      onChange(result.url);
      setStorageBadge(
        result.provider === "local" ? "Local Folder (/uploads)" : "Third-Party Cloud"
      );
    } catch (err: any) {
      setErrorMessage(err.message || "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please drop a valid image file.");
      return;
    }

    setErrorMessage(null);
    setIsUploading(true);

    try {
      const result = await uploadImageFile(file, folder);
      onChange(result.url);
      setStorageBadge(
        result.provider === "local" ? "Local Folder (/uploads)" : "Third-Party Cloud"
      );
    } catch (err: any) {
      setErrorMessage(err.message || "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setStorageBadge(null);
    setErrorMessage(null);
  };

  const isCircle = aspectRatio === "circle";
  const isBanner = aspectRatio === "banner";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <span>{label}</span>
          {required && <span className="text-rose-500">*</span>}
          {storageBadge && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <HardDrive className="w-2.5 h-2.5 text-emerald-600" />
              {storageBadge}
            </span>
          )}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-[#0A5C4C] hover:underline flex items-center gap-1 cursor-pointer font-medium"
        >
          <Link2 className="w-3 h-3" />
          {showUrlInput ? "Upload local file" : "Paste URL link"}
        </button>
      </div>

      {showUrlInput ? (
        <div className="space-y-2">
          <input
            type="url"
            value={value || ""}
            onChange={(e) => {
              onChange(e.target.value);
              setStorageBadge(e.target.value ? "Remote Image Link" : null);
            }}
            placeholder="https://example.com/images/avatar.jpg"
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
          />
          {value && (
            <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-xl">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-200 relative shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={value} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs text-slate-600 truncate flex-1">{value}</span>
              <button
                type="button"
                onClick={handleRemove}
                className="p-1 hover:bg-slate-200 rounded text-slate-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          {value ? (
            /* Uploaded Preview State */
            <div
              className={`relative group border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center ${
                isCircle
                  ? "w-28 h-28 rounded-full mx-auto"
                  : isBanner
                  ? "w-full h-40"
                  : "w-full sm:w-48 h-36"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />

              {/* Hover overlay with actions */}
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white p-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 bg-white text-slate-900 text-[11px] font-bold rounded-lg shadow-xs hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Change File
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Remove
                </button>
              </div>
            </div>
          ) : (
            /* Dropzone / Upload state */
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className={`border-2 border-dashed border-slate-300 hover:border-[#0A5C4C] hover:bg-emerald-50/20 transition-all rounded-2xl cursor-pointer p-4 text-center flex flex-col items-center justify-center gap-2 ${
                isCircle ? "w-28 h-28 rounded-full mx-auto" : "w-full py-6"
              }`}
            >
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-6 h-6 text-[#0A5C4C] animate-spin" />
                  <span className="text-[11px] font-medium text-slate-600">
                    Saving to local /uploads...
                  </span>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#0A5C4C] flex items-center justify-center shrink-0">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-800">
                      Click to upload <span className="font-normal text-slate-500">or drag &amp; drop</span>
                    </p>
                    <p className="text-[10px] text-slate-400">{helperText}</p>
                  </div>
                </>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {errorMessage && (
        <p className="text-[11px] text-rose-600 font-medium">{errorMessage}</p>
      )}
    </div>
  );
}
