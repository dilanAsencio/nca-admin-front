"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";

interface ImageUploaderProps {
  maxImages?: number;
  maxSizeMB?: number;
  format?: string;
  label?: string;
  onChange?: (files: File[], urls: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  maxImages = 5,
  maxSizeMB = 30,
  onChange,
  format = "PNG, JPG",
  label = "Arrastra o sube por lo menos 5 imágenes",
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles: File[] = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;
      if (file.size > maxSizeMB * 1024 * 1024) continue;
      if (images.length + validFiles.length >= maxImages) break;

      validFiles.push(file);
    }

    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    const updatedImages = [...images, ...validFiles];
    const updatedPreviews = [...previews, ...newPreviews];

    setImages(updatedImages);
    setPreviews(updatedPreviews);
    onChange?.(updatedImages, updatedPreviews);
  };

  const handleRemove = (index: number) => {
    const updatedImages = [...images];
    const updatedPreviews = [...previews];

    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setImages(updatedImages);
    setPreviews(updatedPreviews);
    onChange?.(updatedImages, updatedPreviews);
  };

  return (
    <div className="w-full flex flex-col gap-[1rem]">
      <div
        className="w-full flex flex-col justify-center border-2 border-dashed border-[#610CF4] rounded-lg p-[1rem] text-center text-gray-500 cursor-pointer bg-[#EFE7FE] transition"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
      {previews.length > 0 ? 
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-[0.75rem] p-[0.5rem]">
          {previews.map((src, index) => (
            <div key={index} className="relative group rounded border">
              <Image
                src={src}
                alt={`preview-${index}`}
                width={72}
                height={72}
                className="object-cover w-full h-32 rounded-[0.75rem]"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                style={{ borderRadius: "50%" }}
                className="absolute top-[-0.70rem] right-[-0.75rem] flex items-center rounded-[50%] justify-center bg-white text-black p-[0.5rem] text-xs w-6 h-6"
              >
                X
              </button>
            </div>
          ))}
        </div> : 
        <div className="flex items-center justify-center">
          <Image
              src={"/assets/img/upload-01.png"}
              alt="upload"
              width={52}
              height={52}
          />
        </div>
      }
        <span className={clsx(
          previews.length > 0 ? 'text-start' : 'text-center',
        )}>{label} <a className="text-[#610CF4_!important]">Buscar</a></span>
        <input
          ref={inputRef}
          type="file"
          accept={format === "PDF" ? "application/pdf" : "image/*"}
          multiple
          hidden
          onChange={handleSelect}
        />
      </div>

      <div className="flex justify-between">
            <label className="">Formato: {format}.</label>
            <label className="block text-sm font-medium mb-2 text-gray-700">
                Tamaño máximo total: {maxSizeMB}MB
            </label>
      </div>
    </div>
  );
};

export default ImageUploader;
