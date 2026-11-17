'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';

type Mode = 'signin' | 'signup';

function validate(mode: Mode, form: Record<string, string>) {
  const errors: Record<string, string> = {};
  if (!form.email) errors.email = 'Email wajib diisi';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Format email tidak valid';
  if (!form.password) errors.password = 'Password wajib diisi';
  else if (form.password.length < 6) errors.password = 'Password minimal 6 karakter';
  if (mode === 'signup') {
    if (!form.fullName) errors.fullName = 'Nama lengkap wajib diisi';
    if (form.password !== form.confirmPassword) errors.confirmPassword = 'Password tidak cocok';
  }
  return errors;
}

export default function AuthPage() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const { showToast } = useToast();

  const [mode, setMode] = useState<Mode>('signin');
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (key: string, val: string) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(mode, form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      const result =
        mode === 'signin'
          ? await signIn(form.email, form.password)
          : await signUp(form.email, form.password, form.fullName);

      if (result.error) {
        showToast(result.error, 'error');
      } else {
        showToast(mode === 'signin' ? 'Selamat datang kembali!' : 'Akun berhasil dibuat!', 'success');
        router.replace('/home');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF4FF] flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="px-6 pt-12 pb-8">
        <button
          onClick={() => router.push('/splash')}
          className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-[#E2ECFF] transition-colors mb-6"
        >
          <ArrowLeft size={18} className="text-[#527CE5]" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🔍</span>
          <h1 className="text-3xl font-black text-[#527CE5]">FINDA</h1>
        </div>
        <h2 className="text-xl font-bold text-[#111111]">
          {mode === 'signin' ? 'Masuk ke Akunmu' : 'Buat Akun Baru'}
        </h2>
        <p className="text-sm text-[#777777] mt-1">
          {mode === 'signin'
            ? 'Masuk untuk mengelola laporan kehilangan dan temuanmu.'
            : 'Daftar gratis dan mulai temukan barangmu.'}
        </p>


      </div>

      {/* Form */}
      <div className="flex-1 bg-white rounded-t-[2.5rem] px-6 pt-8 pb-10 shadow-inner">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          {mode === 'signup' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#111111]">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777777]" />
                <input
                  type="text"
                  placeholder="Nama lengkapmu"
                  value={form.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F5F8FF] border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#527CE5]/20 focus:border-[#527CE5] ${errors.fullName ? 'border-red-400' : 'border-transparent'}`}
                />
              </div>
              {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#111111]">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777777]" />
              <input
                type="email"
                placeholder="email@contoh.com"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                autoComplete="email"
                className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F5F8FF] border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#527CE5]/20 focus:border-[#527CE5] ${errors.email ? 'border-red-400' : 'border-transparent'}`}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#111111]">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777777]" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Minimal 6 karakter"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                className={`w-full pl-10 pr-11 py-3 rounded-2xl bg-[#F5F8FF] border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#527CE5]/20 focus:border-[#527CE5] ${errors.password ? 'border-red-400' : 'border-transparent'}`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777777] hover:text-[#527CE5] transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
          </div>

          {mode === 'signup' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#111111]">
                Konfirmasi Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777777]" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Ulangi password"
                  value={form.confirmPassword}
                  onChange={(e) => update('confirmPassword', e.target.value)}
                  autoComplete="new-password"
                  className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F5F8FF] border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#527CE5]/20 focus:border-[#527CE5] ${errors.confirmPassword ? 'border-red-400' : 'border-transparent'}`}
                />
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
            </div>
          )}

          {mode === 'signin' && (
            <button type="button" className="text-xs text-[#527CE5] text-right hover:underline">
              Lupa password?
            </button>
          )}

          <Button type="submit" fullWidth loading={loading} size="lg" className="mt-2">
            {mode === 'signin' ? 'Masuk' : 'Daftar Sekarang'}
          </Button>
        </form>

        <p className="text-sm text-center text-[#777777] mt-6">
          {mode === 'signin' ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
          <button
            onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setErrors({}); }}
            className="text-[#527CE5] font-semibold hover:underline"
          >
            {mode === 'signin' ? 'Daftar' : 'Masuk'}
          </button>
        </p>
      </div>
    </div>
  );
}
