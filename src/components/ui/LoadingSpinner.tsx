import React from 'react';

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizes[size]} border-3 border-[#E2ECFF] border-t-[#527CE5] rounded-full animate-spin`}
        style={{ borderWidth: '3px' }}
      />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen bg-[#EEF4FF] flex flex-col items-center justify-center gap-4">
      <div className="text-5xl animate-bounce">🔍</div>
      <LoadingSpinner size="lg" />
      <p className="text-[#527CE5] font-semibold text-sm">Memuat...</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl p-4 flex gap-3 animate-pulse">
      <div className="w-16 h-16 rounded-2xl bg-gray-200 flex-shrink-0" />
      <div className="flex-1 flex flex-col gap-2 justify-center">
        <div className="h-4 bg-gray-200 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
        <div className="h-3 bg-gray-100 rounded-full w-2/3" />
      </div>
    </div>
  );
}
