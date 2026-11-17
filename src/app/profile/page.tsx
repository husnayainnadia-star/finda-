'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User, Mail, LogOut, Edit3, ChevronRight, Package, PackageSearch, Bell, Shield, CheckCircle,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useReports } from '@/context/ReportsContext';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ReportCard } from '@/components/layout/ReportCard';
import { useToast } from '@/components/ui/Toast';
import { PageLoader } from '@/components/ui/LoadingSpinner';

type ProfileTab = 'my-reports' | 'settings';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, signOut, updateProfile } = useAuth();
  const { lostReports, foundReports } = useReports();
  const { showToast } = useToast();

  const [tab, setTab] = useState<ProfileTab>('my-reports');
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [savingName, setSavingName] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth');
    }
    if (user) {
      setEditName(user.full_name || '');
    }
  }, [user, loading, router]);

  if (loading) return <PageLoader />;
  if (!user) return null;

  const myLost = lostReports.filter((r) => r.user_id === user.id);
  const myFound = foundReports.filter((r) => r.user_id === user.id);

  const handleSaveName = async () => {
    if (!editName.trim()) return;
    setSavingName(true);
    const result = await updateProfile({ full_name: editName.trim() });
    setSavingName(false);
    if (result.error) showToast(result.error, 'error');
    else { showToast('Nama berhasil diperbarui!', 'success'); setEditing(false); }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await signOut();
    router.replace('/auth');
  };

  const initials = user.full_name
    ? user.full_name.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  return (
    <div className="min-h-screen bg-[#EEF4FF] max-w-md mx-auto pb-28">
      <PageWrapper showBack backHref="/home">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-3 py-4 mb-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#527CE5] to-[#A9D8FF] flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {initials}
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
          </div>

          {editing ? (
            <div className="flex items-center gap-2 w-full max-w-xs">
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="flex-1 px-4 py-2 rounded-2xl bg-[#F5F8FF] border border-[#527CE5] text-sm font-semibold text-center focus:outline-none"
                autoFocus
              />
              <button
                onClick={handleSaveName}
                disabled={savingName}
                className="w-9 h-9 rounded-full bg-[#527CE5] flex items-center justify-center text-white hover:bg-[#3d68d8] transition-colors"
              >
                <CheckCircle size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#111111]">{user.full_name}</h2>
              <button
                onClick={() => setEditing(true)}
                className="w-7 h-7 rounded-full bg-[#E2ECFF] flex items-center justify-center hover:bg-[#c8dcff] transition-colors"
              >
                <Edit3 size={13} className="text-[#527CE5]" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-sm text-[#777777]">
            <Mail size={14} />
            <span>{user.email}</span>
          </div>

          {/* Stats */}
          <div className="flex gap-4 w-full max-w-xs">
            <div className="flex-1 bg-white rounded-2xl p-3 text-center shadow-sm">
              <p className="text-2xl font-black text-[#527CE5]">{myLost.length}</p>
              <p className="text-xs text-[#777777]">Laporan Hilang</p>
            </div>
            <div className="flex-1 bg-white rounded-2xl p-3 text-center shadow-sm">
              <p className="text-2xl font-black text-green-500">{myFound.length}</p>
              <p className="text-xs text-[#777777]">Laporan Temuan</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-2xl p-1 mb-4 shadow-sm">
          <button
            onClick={() => setTab('my-reports')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              tab === 'my-reports' ? 'bg-[#527CE5] text-white' : 'text-[#777777]'
            }`}
          >
            📋 Laporanku
          </button>
          <button
            onClick={() => setTab('settings')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              tab === 'settings' ? 'bg-[#527CE5] text-white' : 'text-[#777777]'
            }`}
          >
            ⚙️ Pengaturan
          </button>
        </div>

        {tab === 'my-reports' ? (
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Package size={15} className="text-[#527CE5]" />
                <p className="text-sm font-bold text-[#111111]">Barang Hilang ({myLost.length})</p>
              </div>
              {myLost.length === 0 ? (
                <div className="bg-white rounded-2xl p-4 text-center text-xs text-[#777777]">
                  Belum ada laporan kehilangan
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {myLost.map((r) => <ReportCard key={r.id} report={r} type="lost" compact />)}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <PackageSearch size={15} className="text-green-600" />
                <p className="text-sm font-bold text-[#111111]">Barang Temuan ({myFound.length})</p>
              </div>
              {myFound.length === 0 ? (
                <div className="bg-white rounded-2xl p-4 text-center text-xs text-[#777777]">
                  Belum ada laporan temuan
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {myFound.map((r) => <ReportCard key={r.id} report={r} type="found" compact />)}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <SettingItem icon={<Bell size={18} />} label="Pengaturan Notifikasi" />
            <SettingItem icon={<Shield size={18} />} label="Privasi & Keamanan" />
            <SettingItem icon={<User size={18} />} label="Edit Profil" onClick={() => { setEditing(true); setTab('my-reports'); }} />

            <div className="mt-4">
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-4 py-3.5 text-red-500 font-semibold text-sm hover:bg-red-100 transition-colors disabled:opacity-60"
              >
                <LogOut size={18} />
                {loggingOut ? 'Keluar...' : 'Keluar'}
              </button>
            </div>
          </div>
        )}
      </PageWrapper>
      <BottomNav />
    </div>
  );
}

function SettingItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 hover:bg-[#E2ECFF] transition-colors"
    >
      <div className="w-9 h-9 rounded-full bg-[#E2ECFF] flex items-center justify-center text-[#527CE5] flex-shrink-0">
        {icon}
      </div>
      <span className="flex-1 text-left text-sm font-semibold text-[#111111]">{label}</span>
      <ChevronRight size={16} className="text-[#aaa]" />
    </button>
  );
}
