import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  backHref?: string;
  showBack?: boolean;
  className?: string;
  noPadding?: boolean;
}

export function PageWrapper({
  children,
  title,
  backHref,
  showBack = false,
  className = '',
  noPadding = false,
}: PageWrapperProps) {
  return (
    <div className={`min-h-screen bg-[#EEF4FF] flex flex-col max-w-md mx-auto ${className}`}>
      {(showBack || title) && (
        <header className="sticky top-0 z-30 bg-[#EEF4FF]/95 backdrop-blur-sm px-4 pt-4 pb-3 flex items-center gap-3">
          {showBack && (
            <Link
              href={backHref || '/home'}
              className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-[#E2ECFF] transition-colors flex-shrink-0"
            >
              <ChevronLeft size={20} className="text-[#527CE5]" />
            </Link>
          )}
          {title && (
            <h1 className="font-bold text-base text-[#111111] flex-1 truncate">{title}</h1>
          )}
        </header>
      )}
      <main className={`flex-1 ${noPadding ? '' : 'px-4 pb-28'}`}>{children}</main>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#EEF4FF]">
      <div className="max-w-md mx-auto relative min-h-screen">{children}</div>
    </div>
  );
}
