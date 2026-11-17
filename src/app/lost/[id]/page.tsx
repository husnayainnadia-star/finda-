'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { MapPin, Calendar, Tag, User, MessageCircle } from 'lucide-react';
import { useReports } from '@/context/ReportsContext';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/Button';
import { Badge, TypeBadge } from '@/components/ui/Badge';
import { ItemImagePlaceholder, FindMatchIllustration } from '@/components/ui/Illustrations';
import { ReportCard } from '@/components/layout/ReportCard';
import { CATEGORY_LABELS } from '@/lib/constants';
import { findMatches } from '@/lib/matching';
import { LostReport } from '@/types';
import { PageLoader } from '@/components/ui/LoadingSpinner';

function formatDate(dateStr?: string) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default function LostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { lostReports, foundReports, loadingReports } = useReports();

  if (loadingReports) return <PageLoader />;

  const report = lostReports.find((r) => r.id === id);
  if (!report) {
    return (
      <div className="min-h-screen bg-[#EEF4FF] flex flex-col items-center justify-center max-w-md mx-auto px-6 gap-4">
        <span className="text-5xl">😕</span>
        <p className="text-[#777777] text-center">Laporan tidak ditemukan.</p>
        <Button onClick={() => history.back()}>Kembali</Button>
      </div>
    );
  }

  const matches = findMatches(report as LostReport, foundReports, 20);

  return (
    <div className="min-h-screen bg-[#EEF4FF] max-w-md mx-auto pb-28">
      <PageWrapper showBack backHref="/search">
        {/* Item Image */}
        <div className="w-full h-56 rounded-3xl overflow-hidden bg-[#E2ECFF] mb-5">
          {report.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={report.image_url} alt={report.item_name} className="w-full h-full object-cover" />
          ) : (
            <ItemImagePlaceholder category={report.category} />
          )}
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <h1 className="text-xl font-bold text-[#111111] leading-tight">{report.item_name}</h1>
          <TypeBadge type="lost" />
        </div>

        {/* Meta */}
        <div className="bg-white rounded-3xl p-4 flex flex-col gap-3 mb-4 shadow-sm">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-[#E2ECFF] flex items-center justify-center flex-shrink-0">
              <MapPin size={15} className="text-[#527CE5]" />
            </div>
            <div>
              <p className="text-[10px] text-[#777777] uppercase font-semibold tracking-wide">Lokasi Terakhir</p>
              <p className="font-semibold text-[#111111]">{report.last_seen_location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-[#E2ECFF] flex items-center justify-center flex-shrink-0">
              <Calendar size={15} className="text-[#527CE5]" />
            </div>
            <div>
              <p className="text-[10px] text-[#777777] uppercase font-semibold tracking-wide">Tanggal Hilang</p>
              <p className="font-semibold text-[#111111]">{formatDate(report.lost_date)}</p>
            </div>
          </div>
          {report.category && (
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-[#E2ECFF] flex items-center justify-center flex-shrink-0">
                <Tag size={15} className="text-[#527CE5]" />
              </div>
              <div>
                <p className="text-[10px] text-[#777777] uppercase font-semibold tracking-wide">Kategori</p>
                <p className="font-semibold text-[#111111]">{CATEGORY_LABELS[report.category]}</p>
              </div>
            </div>
          )}
          {report.profiles && (
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-[#E2ECFF] flex items-center justify-center flex-shrink-0">
                <User size={15} className="text-[#527CE5]" />
              </div>
              <div>
                <p className="text-[10px] text-[#777777] uppercase font-semibold tracking-wide">Dilaporkan Oleh</p>
                <p className="font-semibold text-[#111111]">{report.profiles.full_name}</p>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-white rounded-3xl p-4 mb-4 shadow-sm">
          <p className="text-xs font-bold text-[#777777] uppercase tracking-wide mb-2">Deskripsi</p>
          <p className="text-sm text-[#111111] leading-relaxed">{report.description}</p>
        </div>

        {/* Potential Matches */}
        {matches.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-28 h-16">
                <FindMatchIllustration />
              </div>
              <div>
                <p className="font-bold text-sm text-[#111111]">Kemungkinan Cocok</p>
                <p className="text-xs text-[#777777]">{matches.length} barang temuan mungkin cocok</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {matches.slice(0, 3).map(({ report: found, score }) => (
                <div key={found.id} className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <Badge variant="match">{score}% cocok</Badge>
                  </div>
                  <ReportCard report={found} type="found" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <Button fullWidth size="lg" className="flex items-center gap-2">
          <MessageCircle size={18} />
          Hubungi Pelapor
        </Button>
        <p className="text-xs text-center text-[#777777] mt-2">
          Kontak akan ditampilkan setelah konfirmasi
        </p>
      </PageWrapper>
      <BottomNav />
    </div>
  );
}
