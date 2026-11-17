'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Bell, User, PlusCircle } from 'lucide-react';
import { useReports } from '@/context/ReportsContext';

export function BottomNav() {
  const pathname = usePathname();
  const { unreadCount } = useReports();

  const navItems = [
    { href: '/home', label: 'Beranda', icon: Home },
    { href: '/search', label: 'Cari', icon: Search },
    { href: '/report', label: 'Lapor', icon: PlusCircle, special: true },
    { href: '/notifications', label: 'Notifikasi', icon: Bell },
    { href: '/profile', label: 'Profil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 shadow-lg z-40 safe-area-bottom">
      <div className="flex items-center justify-around px-2 pt-2 pb-safe">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          if (item.special) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center -mt-5"
              >
                <div className="w-14 h-14 rounded-full bg-[#527CE5] flex items-center justify-center shadow-lg hover:bg-[#3d68d8] transition-colors active:scale-95">
                  <Icon size={26} className="text-white" />
                </div>
                <span className="text-xs text-[#527CE5] font-semibold mt-1">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 py-1 px-3 relative"
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={isActive ? 'text-[#527CE5]' : 'text-gray-400'}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                {item.href === '/notifications' && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium ${isActive ? 'text-[#527CE5]' : 'text-gray-400'}`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#527CE5] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
