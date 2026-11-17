'use client';

import React from 'react';
import { Bell, CheckCheck, Zap, MessageCircle, RefreshCw, Info } from 'lucide-react';
import { useReports } from '@/context/ReportsContext';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Notification } from '@/types';

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days} hari lalu`;
  if (hours > 0) return `${hours} jam lalu`;
  if (mins > 0) return `${mins} menit lalu`;
  return 'Baru saja';
}

function NotifIcon({ type }: { type: Notification['notification_type'] }) {
  const configs = {
    match: { bg: 'bg-amber-100', icon: <Zap size={16} className="text-amber-600" /> },
    contact: { bg: 'bg-blue-100', icon: <MessageCircle size={16} className="text-blue-600" /> },
    status_change: { bg: 'bg-green-100', icon: <RefreshCw size={16} className="text-green-600" /> },
    system: { bg: 'bg-[#E2ECFF]', icon: <Info size={16} className="text-[#527CE5]" /> },
  };
  const { bg, icon } = configs[type];
  return (
    <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center flex-shrink-0`}>
      {icon}
    </div>
  );
}

export default function NotificationsPage() {
  const { notifications, unreadCount, markNotificationRead, markAllNotificationsRead } = useReports();

  return (
    <div className="min-h-screen bg-[#EEF4FF] max-w-md mx-auto pb-28">
      <PageWrapper showBack backHref="/home">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-[#111111]">Notifikasi</h1>
            {unreadCount > 0 && (
              <p className="text-xs text-[#777777]">{unreadCount} belum dibaca</p>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="flex items-center gap-1.5 text-xs text-[#527CE5] font-semibold hover:underline"
            >
              <CheckCheck size={14} />
              Tandai semua
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16">
            <div className="w-16 h-16 rounded-full bg-[#E2ECFF] flex items-center justify-center">
              <Bell size={28} className="text-[#527CE5]" />
            </div>
            <p className="font-semibold text-[#111111]">Belum ada notifikasi</p>
            <p className="text-sm text-[#777777] text-center">
              Notifikasi akan muncul ketika ada kecocokan atau pembaruan laporan.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {notifications.map((notif) => (
              <button
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                className={`w-full text-left bg-white rounded-3xl p-4 flex items-start gap-3 transition-all hover:shadow-sm ${
                  !notif.is_read ? 'border-l-4 border-[#527CE5]' : ''
                }`}
              >
                <NotifIcon type={notif.notification_type} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm leading-tight ${!notif.is_read ? 'font-bold text-[#111111]' : 'font-semibold text-[#333]'}`}>
                      {notif.title}
                    </p>
                    {!notif.is_read && (
                      <span className="w-2 h-2 rounded-full bg-[#527CE5] flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-[#777777] mt-0.5 leading-snug">{notif.message}</p>
                  <p className="text-[10px] text-[#aaa] mt-1">{timeAgo(notif.created_at)}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </PageWrapper>
      <BottomNav />
    </div>
  );
}
