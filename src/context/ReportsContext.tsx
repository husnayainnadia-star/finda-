'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { LostReport, FoundReport, Notification } from '@/types';
import { IS_DEMO_MODE } from '@/lib/constants';
import { DEMO_LOST_REPORTS, DEMO_FOUND_REPORTS, DEMO_NOTIFICATIONS } from '@/lib/demo-data';

interface ReportsContextType {
  lostReports: LostReport[];
  foundReports: FoundReport[];
  notifications: Notification[];
  unreadCount: number;
  loadingReports: boolean;
  submitLostReport: (
    data: Omit<LostReport, 'id' | 'user_id' | 'created_at' | 'status' | 'profiles'>,
    userId: string
  ) => Promise<{ error?: string; id?: string }>;
  submitFoundReport: (
    data: Omit<FoundReport, 'id' | 'user_id' | 'created_at' | 'status' | 'profiles'>,
    userId: string
  ) => Promise<{ error?: string; id?: string }>;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  refreshReports: () => void;
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export function ReportsProvider({ children }: { children: React.ReactNode }) {
  const [lostReports, setLostReports] = useState<LostReport[]>([]);
  const [foundReports, setFoundReports] = useState<FoundReport[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);

  const loadReports = useCallback(async () => {
    setLoadingReports(true);
    if (IS_DEMO_MODE) {
      const storedLost = localStorage.getItem('finda_lost_reports');
      const storedFound = localStorage.getItem('finda_found_reports');
      const userLost: LostReport[] = storedLost ? JSON.parse(storedLost) : [];
      const userFound: FoundReport[] = storedFound ? JSON.parse(storedFound) : [];
      setLostReports([...userLost, ...DEMO_LOST_REPORTS]);
      setFoundReports([...userFound, ...DEMO_FOUND_REPORTS]);
      setNotifications(DEMO_NOTIFICATIONS);
      setLoadingReports(false);
      return;
    }

    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const [{ data: lost }, { data: found }] = await Promise.all([
        supabase
          .from('lost_reports')
          .select('*, profiles(*)')
          .eq('status', 'active')
          .order('created_at', { ascending: false }),
        supabase
          .from('found_reports')
          .select('*, profiles(*)')
          .eq('status', 'active')
          .order('created_at', { ascending: false }),
      ]);
      setLostReports(lost || []);
      setFoundReports(found || []);
    } catch (err) {
      console.error('Failed to load reports:', err);
    } finally {
      setLoadingReports(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const submitLostReport = useCallback(
    async (
      data: Omit<LostReport, 'id' | 'user_id' | 'created_at' | 'status' | 'profiles'>,
      userId: string
    ) => {
      if (IS_DEMO_MODE) {
        const newReport: LostReport = {
          ...data,
          id: `lost-${Date.now()}`,
          user_id: userId,
          status: 'active',
          created_at: new Date().toISOString(),
        };
        const stored = localStorage.getItem('finda_lost_reports');
        const existing: LostReport[] = stored ? JSON.parse(stored) : [];
        existing.unshift(newReport);
        localStorage.setItem('finda_lost_reports', JSON.stringify(existing));
        setLostReports((prev) => [newReport, ...prev]);
        return { id: newReport.id };
      }

      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const { data: inserted, error } = await supabase
          .from('lost_reports')
          .insert({ ...data, user_id: userId, status: 'active' })
          .select()
          .single();
        if (error) return { error: error.message };
        await loadReports();
        return { id: inserted.id };
      } catch {
        return { error: 'Gagal mengirim laporan. Silakan coba lagi.' };
      }
    },
    [loadReports]
  );

  const submitFoundReport = useCallback(
    async (
      data: Omit<FoundReport, 'id' | 'user_id' | 'created_at' | 'status' | 'profiles'>,
      userId: string
    ) => {
      if (IS_DEMO_MODE) {
        const newReport: FoundReport = {
          ...data,
          id: `found-${Date.now()}`,
          user_id: userId,
          status: 'active',
          created_at: new Date().toISOString(),
        };
        const stored = localStorage.getItem('finda_found_reports');
        const existing: FoundReport[] = stored ? JSON.parse(stored) : [];
        existing.unshift(newReport);
        localStorage.setItem('finda_found_reports', JSON.stringify(existing));
        setFoundReports((prev) => [newReport, ...prev]);
        return { id: newReport.id };
      }

      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const { data: inserted, error } = await supabase
          .from('found_reports')
          .insert({ ...data, user_id: userId, status: 'active' })
          .select()
          .single();
        if (error) return { error: error.message };
        await loadReports();
        return { id: inserted.id };
      } catch {
        return { error: 'Gagal mengirim laporan. Silakan coba lagi.' };
      }
    },
    [loadReports]
  );

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  }, []);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <ReportsContext.Provider
      value={{
        lostReports,
        foundReports,
        notifications,
        unreadCount,
        loadingReports,
        submitLostReport,
        submitFoundReport,
        markNotificationRead,
        markAllNotificationsRead,
        refreshReports: loadReports,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports() {
  const ctx = useContext(ReportsContext);
  if (!ctx) throw new Error('useReports must be used within ReportsProvider');
  return ctx;
}
