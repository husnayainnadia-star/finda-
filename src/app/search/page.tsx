'use client';

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useReports } from '@/context/ReportsContext';
import { BottomNav } from '@/components/layout/BottomNav';
import { ReportCard, ReportCardSkeleton } from '@/components/layout/ReportCard';
import { FindMatchIllustration, EmptyIllustration } from '@/components/ui/Illustrations';
import { CATEGORIES } from '@/lib/constants';
import { ItemCategory, ReportType } from '@/types';

type TabType = 'all' | 'lost' | 'found';

export default function SearchPage() {
  const { lostReports, foundReports, loadingReports } = useReports();

  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<TabType>('all');
  const [filterCategory, setFilterCategory] = useState<ItemCategory | ''>('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    const lost =
      tab !== 'found'
        ? lostReports.filter((r) => {
            const matchQ =
              !q ||
              r.item_name.toLowerCase().includes(q) ||
              r.description.toLowerCase().includes(q) ||
              r.last_seen_location.toLowerCase().includes(q);
            const matchCat = !filterCategory || r.category === filterCategory;
            return matchQ && matchCat;
          })
        : [];

    const found =
      tab !== 'lost'
        ? foundReports.filter((r) => {
            const matchQ =
              !q ||
              r.item_name.toLowerCase().includes(q) ||
              r.description.toLowerCase().includes(q) ||
              r.found_location.toLowerCase().includes(q);
            const matchCat = !filterCategory || r.category === filterCategory;
            return matchQ && matchCat;
          })
        : [];

    return { lost, found };
  }, [query, tab, filterCategory, lostReports, foundReports]);

  const totalCount = filtered.lost.length + filtered.found.length;

  return (
    <div className="min-h-screen bg-[#EEF4FF] max-w-md mx-auto pb-28">
      {/* Header */}
      <div className="px-5 pt-10 pb-4 sticky top-0 bg-[#EEF4FF]/95 backdrop-blur-sm z-20">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-black text-[#527CE5]">FIND AND MATCH</span>
        </div>
        <div className="w-28 h-10 mb-2">
          <FindMatchIllustration />
        </div>
        <p className="text-xs text-[#777777] mb-3">
          Cari barang yang hilang dan cocokkan dengan barang temuan.
        </p>

        {/* Search bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777777]" />
            <input
              type="search"
              placeholder="Cari nama barang..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white border border-transparent focus:border-[#527CE5] focus:outline-none focus:ring-2 focus:ring-[#527CE5]/20 text-sm shadow-sm"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={15} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-sm ${
              showFilters || filterCategory ? 'bg-[#527CE5] text-white' : 'bg-white text-[#527CE5]'
            }`}
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-3 bg-white rounded-2xl p-3 shadow-sm animate-fade-in-up">
            <p className="text-xs font-semibold text-[#777777] mb-2">Filter Kategori:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterCategory('')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  !filterCategory ? 'bg-[#527CE5] text-white' : 'bg-[#E2ECFF] text-[#527CE5]'
                }`}
              >
                Semua
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilterCategory(cat.value === filterCategory ? '' : cat.value)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    filterCategory === cat.value
                      ? 'bg-[#527CE5] text-white'
                      : 'bg-[#E2ECFF] text-[#527CE5]'
                  }`}
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex bg-white rounded-2xl p-1 mt-3 shadow-sm">
          {(['all', 'lost', 'found'] as TabType[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                tab === t ? 'bg-[#527CE5] text-white shadow-sm' : 'text-[#777777] hover:text-[#527CE5]'
              }`}
            >
              {t === 'all' ? '📋 Semua' : t === 'lost' ? '😢 Hilang' : '✅ Temuan'}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="px-5">
        {!loadingReports && (
          <p className="text-xs text-[#777777] mb-3">
            {totalCount} hasil{query ? ` untuk "${query}"` : ''}
          </p>
        )}

        <div className="flex flex-col gap-3">
          {loadingReports ? (
            Array.from({ length: 4 }).map((_, i) => <ReportCardSkeleton key={i} />)
          ) : totalCount === 0 ? (
            <div className="bg-white rounded-3xl">
              <EmptyIllustration />
              {query && (
                <p className="text-xs text-center text-[#777777] pb-4">
                  Coba kata kunci lain atau hapus filter
                </p>
              )}
            </div>
          ) : (
            <>
              {filtered.lost.map((r) => (
                <ReportCard key={r.id} report={r} type="lost" />
              ))}
              {filtered.found.map((r) => (
                <ReportCard key={r.id} report={r} type="found" />
              ))}
            </>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
