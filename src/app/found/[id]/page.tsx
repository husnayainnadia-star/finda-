'use client';

import React, { Suspense, useState } from 'react';
import { useParams } from 'next/navigation';
import { MapPin, Calendar, Tag, User, Phone, MessageCircle } from 'lucide-react';
import { useReports } from '@/context/ReportsContext';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/Button';
import { Badge, TypeBadge } from '@/components/ui/Badge';
import { ItemImagePlaceholder, FindMatchIllustration } from '@/components/ui/Illustrations';
import { ReportCard } from '@/components/layout/ReportCard';
import { CATEGORY_LABELS } from '@/lib/constants';
import { findMatchesForFound } from '@/lib/matching';
import { FoundReport } from '@/types';
import { PageLoader } from '@/components/ui/LoadingSpinner';

function formatDate(dateStr?: string) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function FoundDetailContent() {
  const { id } = useParams<{ id: string }>();
  const { foundReports, lostReports, loadingReports } = useReports();
  const [showContact, setShowContact] = useState(false);

  if (loadingReports) return <PageLoader />;

  const report = foundReports.find((r) => r.id === id);
  if (!report) {
    return (
      <div className="min-h-screen bg-[#EEF4FF] flex flex-col items-center justify-center max-w-md mx-auto px-6 gap-4">
        <span className="text-5xl">😕</span>
        <p className="text-[#777777] text-center">Laporan tidak ditemukan.</p>
        <Button onClick={() => history.back()}>Kembali</Button>
      </div>
    );
  }

  const matches = findMatchesForFound(report as FoundReport, lostReports, 20);

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
          <TypeBadge type="found" />
        </div>

        {/* Meta */}
        <div className="bg-white rounded-3xl p-4 flex flex-col gap-3 mb-4 shadow-sm">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
              <MapPin size={15} className="text-green-600" />
            </div>
            <div>
              <p className="text-[10px] text-[#777777] uppercase font-semibold tracking-wide">Lokasi Ditemukan</p>
              <p className="font-semibold text-[#111111]">{report.found_location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
              <Calendar size={15} className="text-green-600" />
            </div>
            <div>
              <p className="text-[10px] text-[#777777] uppercase font-semibold tracking-wide">Tanggal Ditemukan</p>
              <p className="font-semibold text-[#111111]">{formatDate(report.found_date)}</p>
            </div>
          </div>
          {report.category && (
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                <Tag size={15} className="text-green-600" />
              </div>
              <div>
                <p className="text-[10px] text-[#777777] uppercase font-semibold tracking-wide">Kategori</p>
                <p className="font-semibold text-[#111111]">{CATEGORY_LABELS[report.category]}</p>
              </div>
            </div>
          )}
          {report.profiles && (
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                <User size={15} className="text-green-600" />
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

        {/* Contact info (revealed on tap) */}
        {showContact && (
          <div className="bg-white rounded-3xl p-4 mb-4 shadow-sm border-2 border-green-200 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-2">
              <Phone size={16} className="text-green-600" />
              <p className="text-xs font-bold text-[#777777] uppercase tracking-wide">Kontak Penemu</p>
            </div>
            <p className="text-sm font-semibold text-[#111111]">{report.contact_information}</p>
            <p className="text-xs text-[#777777] mt-1">Hubungi langsung penemu melalui kontak di atas.</p>
          </div>
        )}

        {/* Potential Matches */}
        {matches.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-28 h-16">
                <FindMatchIllustration />
              </div>
              <div>
                <p className="font-bold text-sm text-[#111111]">Kemungkinan Cocok</p>
                <p className="text-xs text-[#777777]">{matches.length} laporan hilang mungkin cocok</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {matches.slice(0, 3).map(({ report: lost, score }) => (
                <div key={lost.id} className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <Badge variant="match">{score}% cocok</Badge>
                  </div>
                  <ReportCard report={lost} type="lost" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <Button
          fullWidth
          size="lg"
          className="flex items-center gap-2"
          onClick={() => setShowContact(true)}
        >
          <MessageCircle size={18} />
          {showContact ? 'Kontak Ditampilkan ✓' : 'Hubungi Penemu'}
        </Button>
        {!showContact && (
          <p className="text-xs text-center text-[#777777] mt-2">
            Tekan tombol untuk melihat informasi kontak penemu
          </p>
        )}
      </PageWrapper>
      <BottomNav />
    </div>
  );
}

export default function FoundDetailPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <FoundDetailContent />
    </Suspense>
  );
}
