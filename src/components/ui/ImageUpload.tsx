'use client';

import React, { useRef, useState } from 'react';
import { Camera, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  label?: string;
  required?: boolean;
  onChange: (file: File | null, previewUrl: string | null) => void;
  error?: string;
  hint?: string;
}

export function ImageUpload({ label, required, onChange, error, hint }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diizinkan.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB.');
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(file, url);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null, null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-semibold text-[#111111]">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      {preview ? (
        <div className="relative rounded-2xl overflow-hidden bg-[#F5F8FF]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`w-full h-36 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all hover:bg-[#E2ECFF] ${
            error
              ? 'border-red-400 bg-red-50'
              : 'border-[#527CE5]/40 bg-[#F5F8FF] hover:border-[#527CE5]'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-[#E2ECFF] flex items-center justify-center">
            <Camera size={20} className="text-[#527CE5]" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-[#527CE5]">Tambah Foto</p>
            {hint && <p className="text-xs text-[#777777] mt-0.5">{hint}</p>}
          </div>
          <div className="flex items-center gap-1 text-xs text-[#777777]">
            <ImageIcon size={12} />
            <span>JPG, PNG, max 5MB</span>
          </div>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
