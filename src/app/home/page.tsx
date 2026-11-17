'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useReports } from '@/context/ReportsContext';
import { BottomNav } from '@/components/layout/BottomNav';
import { ReportCard, ReportCardSkeleton } from '@/components/layout/ReportCard';
import {
  HomeIllustration,
  LostIllustration,
  FoundIllustration,
  FindMatchIllustration,
  EmptyIllustration,
} from '@/components/ui/Illustrations';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { IS_DEMO_MODE } from '@/lib/constants';

function FeatureButton({
  href,
  label,
  sublabel,
  illustration,
  color,
}: {
  href: string;
  label: string;
  sublabel: string;
  illustration: React.ReactNode;
  color: string;
}) {
  return (
    <Link href={href}>
      <div
        className={`${color} rounded-3xl p-3 flex flex-col items-center gap-1.5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-95 text-center`}
      >
        <div className="w-20 h-16 flex items-center justify-center">{illustration}</div>
        <p className="text-xs font-bold text-[#527CE5] leading-tight">{label}</p>
        <p className="text-[10px] text-[#777777] leading-tight">{sublabel}</p>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const { user, loading } = useAuth();
  const { lostReports, foundReports, loadingReports, unreadCount } = useReports();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth');
    }
  }, [user, loading, router]);

  if (loading) return <PageLoader />;
  if (!user) return null;

  const firstName = user.full_name?.split(' ')[0] || 'Pengguna';

  // Interleave lost + found for recent status
  const recentReports = [
    ...lostReports.slice(0, 3).map((r) => ({ report: r, type: 'lost' as const })),
    ...foundReports.slice(0, 3).map((r) => ({ report: r, type: 'found' as const })),
  ]
    .sort((a, b) => new Date(b.report.created_at).getTime() - new Date(a.report.created_at).getTime())
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#EEF4FF] max-w-md mx-auto pb-28">
      {/* Header */}
      <div className="px-5 pt-10 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-2xl font-black text-[#527CE5]">FINDA</span>
            </div>
            <h2 className="text-xl font-bold text-[#111111]">Halo, {firstName}! 👋</h2>
            <p className="text-sm text-[#777777] mt-0.5">Bantu temukan barang atau temukan yang hilang yuk!</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/notifications" className="relative w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-[#E2ECFF] transition-colors">
              <Bell size={20} className="text-[#527CE5]" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>
            <HomeIllustration />
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="px-5">
        <div className="grid grid-cols-3 gap-3">
          <FeatureButton
            href="/lost/new"
            label="LOST ITEM"
            sublabel="Laporkan barang yang hilang"
            illustration={<LostIllustration />}
            color="bg-gradient-to-br from-[#E2ECFF] to-[#c8dcff]"
          />
          <FeatureButton
            href="/found/new"
            label="FOUND ITEM"
            sublabel="Laporkan barang temuan"
            illustration={<FoundIllustration />}
            color="bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9]"
          />
          <FeatureButton
            href="/search"
            label="FIND / MATCH"
            sublabel="Cari dan cocokkan barang"
            illustration={<FindMatchIllustration />}
            color="bg-gradient-to-br from-[#FFF8E1] to-[#FFECB3]"
          />
        </div>
      </div>

      {/* Recent Reports */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-base text-[#111111]">Status Terbaru</h3>
          <Link href="/search" className="text-xs text-[#527CE5] font-semibold hover:underline">
            Lihat Semua
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {loadingReports ? (
            Array.from({ length: 3 }).map((_, i) => <ReportCardSkeleton key={i} />)
          ) : recentReports.length > 0 ? (
            recentReports.map(({ report, type }) => (
              <ReportCard key={report.id} report={report} type={type} />
            ))
          ) : (
            <div className="bg-white rounded-3xl">
              <EmptyIllustration />
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
