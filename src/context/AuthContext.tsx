'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Profile } from '@/types';
import { IS_DEMO_MODE } from '@/lib/constants';
import { DEMO_USER } from '@/lib/demo-data';

interface AuthContextType {
  user: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error?: string }>;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (IS_DEMO_MODE) {
      // In demo mode, check localStorage for persisted login
      const stored = localStorage.getItem('finda_demo_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
      setLoading(false);
      return;
    }

    // Real Supabase auth
    const initAuth = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          setUser(profile);
        }

        supabase.auth.onAuthStateChange(async (event, session) => {
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            setUser(profile);
          } else {
            setUser(null);
          }
        });
      } catch (err) {
        console.error('Auth init error:', err);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (IS_DEMO_MODE) {
      // Demo mode: accept any email/password
      const demoUser: Profile = {
        ...DEMO_USER,
        email,
        full_name: email.split('@')[0],
      };
      localStorage.setItem('finda_demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
      return {};
    }

    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };
      return {};
    } catch {
      return { error: 'Gagal masuk. Silakan coba lagi.' };
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    if (IS_DEMO_MODE) {
      const demoUser: Profile = {
        ...DEMO_USER,
        email,
        full_name: fullName,
      };
      localStorage.setItem('finda_demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
      return {};
    }

    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) return { error: error.message };
      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          full_name: fullName,
          email,
        });
      }
      return {};
    } catch {
      return { error: 'Gagal mendaftar. Silakan coba lagi.' };
    }
  }, []);

  const signOut = useCallback(async () => {
    if (IS_DEMO_MODE) {
      localStorage.removeItem('finda_demo_user');
      setUser(null);
      return;
    }
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    async (updates: Partial<Profile>) => {
      if (IS_DEMO_MODE) {
        const updated = { ...user, ...updates } as Profile;
        localStorage.setItem('finda_demo_user', JSON.stringify(updated));
        setUser(updated);
        return {};
      }
      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const { error } = await supabase.from('profiles').update(updates).eq('id', user!.id);
        if (error) return { error: error.message };
        setUser((prev) => ({ ...prev!, ...updates }));
        return {};
      } catch {
        return { error: 'Gagal memperbarui profil.' };
      }
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut, updateProfile, isDemoMode: IS_DEMO_MODE }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
