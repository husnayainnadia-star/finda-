import React from 'react';
import { ReportType } from '@/types';

export function Badge({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'lost' | 'found' | 'match' | 'success' | 'warning';
}) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    lost: 'bg-red-100 text-red-600',
    found: 'bg-green-100 text-green-600',
    match: 'bg-amber-100 text-amber-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-orange-100 text-orange-700',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
}

export function TypeBadge({ type }: { type: ReportType }) {
  return (
    <Badge variant={type === 'lost' ? 'lost' : 'found'}>
      {type === 'lost' ? '😢 Hilang' : '✅ Ditemukan'}
    </Badge>
  );
}
