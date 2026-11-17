'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SearchX, PackageSearch } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';

export default function ReportChooserPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#EEF4FF] max-w-md mx-auto pb-28">
      <PageWrapper title="Buat Laporan" showBack backHref="/home">
        <div className="flex flex-col gap-5 py-4">
          <p className="text-sm text-[#777777]">Pilih jenis laporan yang ingin kamu buat:</p>

          <button
            onClick={() => router.push('/lost/new')}
            className="bg-gradient-to-br from-[#E2ECFF] to-[#c8dcff] rounded-3xl p-6 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-[0.98] text-left"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#527CE5] flex items-center justify-center flex-shrink-0">
              <SearchX size={28} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-[#111111] text-base">Barang Hilang</p>
              <p className="text-sm text-[#777777] mt-0.5 leading-snug">
                Laporkan barang milikmu yang hilang dan minta bantuan komunitas untuk menemukannya.
              </p>
            </div>
          </button>

          <button
            onClick={() => router.push('/found/new')}
            className="bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] rounded-3xl p-6 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-[0.98] text-left"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#4CAF50] flex items-center justify-center flex-shrink-0">
              <PackageSearch size={28} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-[#111111] text-base">Barang Temuan</p>
              <p className="text-sm text-[#777777] mt-0.5 leading-snug">
                Laporkan barang yang kamu temukan agar bisa dikembalikan ke pemiliknya.
              </p>
            </div>
          </button>
        </div>
      </PageWrapper>
      <BottomNav />
    </div>
  );
}
