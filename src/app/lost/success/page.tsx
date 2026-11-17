'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SuccessLostIllustration } from '@/components/ui/Illustrations';

export default function LostSuccessPage() {
  const router = useRouter();
  const [notifEnabled, setNotifEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-[#EEF4FF] flex flex-col items-center justify-between max-w-md mx-auto px-6 py-12">
      {/* Top badge */}
      <div className="flex items-center gap-2 bg-green-100 rounded-full px-4 py-2">
        <CheckCircle size={16} className="text-green-600" />
        <span className="text-sm font-bold text-green-700">LAPORAN DITERIMA</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center w-full">
        <SuccessLostIllustration />

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[#111111]">Laporanmu telah diterima!</h2>
          <p className="text-sm text-[#777777] leading-relaxed max-w-xs mx-auto">
            Kami siap bantu cari barangmu. Pantau di notifikasi untuk melihat apakah ada yang menemukan barangmu.
          </p>
        </div>

        {/* Notification card */}
        <div className="w-full bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E2ECFF] flex items-center justify-center flex-shrink-0">
              <Bell size={18} className="text-[#527CE5]" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-[#111111]">Aktifkan Notifikasi</p>
              <p className="text-xs text-[#777777] mt-0.5 leading-snug">
                Aktifkan notifikasi untuk mendapat update terbaru terkait laporanmu.
              </p>
            </div>
            {/* Toggle */}
            <button
              onClick={() => setNotifEnabled(!notifEnabled)}
              className={`w-12 h-6 rounded-full transition-colors duration-300 flex-shrink-0 relative ${notifEnabled ? 'bg-[#527CE5]' : 'bg-gray-200'}`}
              aria-label="Toggle notifikasi"
              aria-pressed={notifEnabled}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${notifEnabled ? 'translate-x-7' : 'translate-x-1'}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="w-full">
        <Button fullWidth size="lg" onClick={() => router.replace('/home')}>
          Kembali ke Beranda
        </Button>
      </div>
    </div>
  );
}
