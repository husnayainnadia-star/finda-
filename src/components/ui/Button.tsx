import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100';

  const variants = {
    primary: 'bg-[#527CE5] hover:bg-[#3d68d8] text-white focus:ring-[#527CE5] shadow-md hover:shadow-lg',
    secondary: 'bg-[#E2ECFF] hover:bg-[#c8dcff] text-[#527CE5] focus:ring-[#527CE5]',
    outline: 'border-2 border-[#527CE5] text-[#527CE5] hover:bg-[#E2ECFF] focus:ring-[#527CE5]',
    ghost: 'text-[#527CE5] hover:bg-[#E2ECFF] focus:ring-[#527CE5]',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}

export function IconButton({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  return (
    <button
      className={`w-10 h-10 rounded-full bg-[#527CE5] text-white flex items-center justify-center hover:bg-[#3d68d8] transition-all active:scale-95 shadow-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
