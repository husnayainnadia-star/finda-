import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export function Input({ label, error, required, className = '', id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-[#111111]">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-4 py-3 rounded-2xl bg-[#F5F8FF] border border-transparent focus:border-[#527CE5] focus:outline-none focus:ring-2 focus:ring-[#527CE5]/20 text-[#111111] placeholder:text-[#b0bcd4] text-sm transition-all ${
          error ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export function Textarea({ label, error, required, className = '', id, ...props }: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-[#111111]">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        rows={3}
        className={`w-full px-4 py-3 rounded-2xl bg-[#F5F8FF] border border-transparent focus:border-[#527CE5] focus:outline-none focus:ring-2 focus:ring-[#527CE5]/20 text-[#111111] placeholder:text-[#b0bcd4] text-sm transition-all resize-none ${
          error ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({
  label,
  error,
  required,
  options,
  placeholder,
  className = '',
  id,
  ...props
}: SelectProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-[#111111]">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        id={inputId}
        className={`w-full px-4 py-3 rounded-2xl bg-[#F5F8FF] border border-transparent focus:border-[#527CE5] focus:outline-none focus:ring-2 focus:ring-[#527CE5]/20 text-[#111111] text-sm transition-all appearance-none cursor-pointer ${
          error ? 'border-red-400' : ''
        } ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" className="text-[#b0bcd4]">
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
