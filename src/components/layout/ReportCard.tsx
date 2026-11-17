'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { LostReport, FoundReport, ReportType } from '@/types';
import { ItemImagePlaceholder } from '@/components/ui/Illustrations';
import { TypeBadge } from '@/components/ui/Badge';
import { CATEGORY_LABELS } from '@/lib/constants';

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

interface ReportCardProps {
  report: LostReport | FoundReport;
  type: ReportType;
  matchScore?: number;
  compact?: boolean;
}

export function ReportCard({ report, type, matchScore, compact = false }: ReportCardProps) {
  const href = type === 'lost' ? `/lost/${report.id}` : `/found/${report.id}`;
  const location = type === 'lost'
    ? (report as LostReport).last_seen_location
    : (report as FoundReport).found_location;

  return (
    <Link href={href}>
      <div className="bg-white rounded-3xl p-3 flex items-center gap-3 hover:shadow-md transition-all duration-200 active:scale-[0.98]">
        {/* Image */}
        <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-[#E2ECFF]">
          {report.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={report.image_url} alt={report.item_name} className="w-full h-full object-cover" />
          ) : (
            <ItemImagePlaceholder category={report.category} />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
            <p className="font-semibold text-sm text-[#111111] truncate">{report.item_name}</p>
            {matchScore !== undefined && (
              <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-semibold whitespace-nowrap">
                {matchScore}% cocok
              </span>
            )}
          </div>
          {!compact && (
            <p className="text-xs text-[#777777] truncate mb-1">{report.description}</p>
          )}
          <div className="flex items-center gap-1 text-xs text-[#777777]">
            <MapPin size={11} className="text-[#527CE5] flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#aaa] mt-0.5">
            <Clock size={11} className="flex-shrink-0" />
            <span>{timeAgo(report.created_at)}</span>
            {!compact && (
              <>
                <span className="mx-1">·</span>
                <TypeBadge type={type} />
              </>
            )}
          </div>
        </div>

        {/* Arrow */}
        <div className="w-8 h-8 rounded-full bg-[#527CE5] flex items-center justify-center flex-shrink-0">
          <ArrowRight size={14} className="text-white" />
        </div>
      </div>
    </Link>
  );
}

export function ReportCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-3 flex items-center gap-3 animate-pulse">
      <div className="w-16 h-16 rounded-2xl bg-gray-200 flex-shrink-0" />
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-4 bg-gray-200 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
        <div className="h-3 bg-gray-100 rounded-full w-2/3" />
      </div>
      <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
    </div>
  );
}
