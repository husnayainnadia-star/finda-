'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SuccessFoundIllustration } from '@/components/ui/Illustrations';

export default function FoundSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#EEF4FF] flex flex-col items-center justify-between max-w-md mx-auto px-6 py-12">
      {/* Badge */}
      <div className="flex items-center gap-2 bg-green-100 rounded-full px-4 py-2">
        <CheckCircle size={16} className="text-green-600" />
        <span className="text-sm font-bold text-green-700">LAPORAN DITERIMA</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center w-full">
        <SuccessFoundIllustration />

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#111111]">Terima kasih! 🎉</h2>
          <p className="text-sm text-[#777777] leading-relaxed max-w-xs mx-auto">
            Terima kasih telah melaporkan barang yang anda temukan. Pemilik akan menghubungi anda melalui kontak yang anda cantumkan.
          </p>
        </div>

        {/* Info card */}
        <div className="w-full bg-white rounded-3xl p-5 shadow-sm text-left">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📋</span>
            <p className="font-bold text-sm text-[#111111]">Langkah Selanjutnya</p>
          </div>
          <ul className="text-xs text-[#777777] space-y-2 ml-9">
            <li>• Simpan barang temuan di tempat yang aman.</li>
            <li>• Pantau kontak kamu untuk dihubungi oleh pemilik.</li>
            <li>• Jika tidak ada yang menghubungi dalam 7 hari, pertimbangkan untuk menyerahkan ke petugas keamanan setempat.</li>
          </ul>
        </div>
      </div>

      <div className="w-full">
        <Button fullWidth size="lg" onClick={() => router.replace('/home')}>
          Kembali ke Beranda
        </Button>
      </div>
    </div>
  );
}
