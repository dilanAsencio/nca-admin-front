"use client";

import React, { useState } from "react";
import Image from "next/image";
import { showToast } from "@/utils/alerts";

interface InputFileComponentProps {
  name: string;
  label?: string;
  formats?: string[];
  maxSizeMB?: number;
  multiple?: boolean;
  register?: any;
  onFileChange?: (files: File[], previews: string[]) => void;
}

/**
 * Componente reutilizable de subida de archivos con previsualización
 * - Soporta imágenes, PDF, DOCX, TXT, etc.
 * - Muestra mini visor embebido (iframe)
 * - Integrable con React Hook Form
 */
export const InputFileComponent: React.FC<InputFileComponentProps> = ({
  name,
  label,
  formats = ["jpg", "jpeg", "png", "pdf", "docx", "txt"],
  maxSizeMB = 10,
  multiple = false,
  register,
  onFileChange,
}) => {
  const [previews, setPreviews] = useState<{ url: string; name: string; type: string }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
    const files = Array.from(e.target.files || []);
    const validFiles: File[] = [];
    const newPreviews: { url: string; name: string; type: string }[] = [];

    files.forEach((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      const sizeMB = file.size / (1024 * 1024);

      if (!formats.includes(ext)) {
        showToast(`Formato no permitido: ${ext}`, "error");
        return;
      }

      if (sizeMB > maxSizeMB) {
        showToast(`El archivo ${file.name} supera el límite de ${maxSizeMB}MB`, "error");
        return;
      }

      validFiles.push(file);
      newPreviews.push({
        url: URL.createObjectURL(file),
        name: file.name,
        type: file.type,
      });
    });

    setPreviews(newPreviews);
    onFileChange?.(validFiles, newPreviews.map((p) => p.url));
  };

  const renderPreview = (preview: { url: string; name: string; type: string }, index: number) => {
    const isImage = preview.type.startsWith("image/");
    const isPdf = preview.type === "application/pdf";
    const isText = preview.type.startsWith("text/");

    return (
      <div
        key={index}
        className="flex flex-col items-center justify-center border rounded-md p-2 bg-gray-50 shadow-sm w-[140px]"
      >
        {isImage ? (
          <Image
            src={preview.url}
            alt={preview.name}
            width={120}
            height={120}
            className="object-cover rounded-md border"
          />
        ) : (
          <iframe
            src={preview.url}
            title={preview.name}
            className="w-[120px] h-[120px] rounded-md border"
          ></iframe>
        )}

        <p className="text-xs text-center truncate w-full mt-1 text-gray-700">{preview.name}</p>
      </div>
    );
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}

      <label
        htmlFor={name}
        className="flex flex-col items-center justify-center w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-md p-4 text-gray-500 hover:text-purple-600 hover:border-purple-600 transition"
      >
        {previews.length > 0 ? (
          <div className="flex flex-wrap gap-3 justify-center">{previews.map(renderPreview)}</div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <Image src="/assets/img/up-logo.png" alt="Upload" width={60} height={60} />
            <span className="text-sm">Haz clic o arrastra tus archivos</span>
            <span className="text-xs text-gray-400">
              Formatos permitidos: {formats.join(", ")} — Máx {maxSizeMB}MB
            </span>
          </div>
        )}

        <input
          id={name}
          type="file"
          name={name}
          multiple={multiple}
          accept={formats.map((ext) => `.${ext}`).join(",")}
          className="hidden"
          onChange={handleFileChange}
          {...(register ? register(name) : {})}
        />
      </label>
    </div>
  );
};
