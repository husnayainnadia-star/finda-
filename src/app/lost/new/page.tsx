'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useReports } from '@/context/ReportsContext';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { LostIllustration } from '@/components/ui/Illustrations';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { CATEGORIES } from '@/lib/constants';
import { ItemCategory } from '@/types';
import { PageLoader } from '@/components/ui/LoadingSpinner';

interface LostFormData {
  item_name: string;
  description: string;
  last_seen_location: string;
  lost_date: string;
  category: ItemCategory | '';
  image_url: string;
  additional_info: string;
}

const INITIAL: LostFormData = {
  item_name: '',
  description: '',
  last_seen_location: '',
  lost_date: '',
  category: '',
  image_url: '',
  additional_info: '',
};

export default function LostNewPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { submitLostReport } = useReports();
  const { showToast } = useToast();

  const [form, setForm] = useState<LostFormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof LostFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth');
    }
  }, [user, loading, router]);

  if (loading) return <PageLoader />;
  if (!user) return null;

  const update = (key: keyof LostFormData, val: string) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: '' }));
  };

  const validate = () => {
    const errs: Partial<Record<keyof LostFormData, string>> = {};
    if (!form.item_name.trim()) errs.item_name = 'Nama barang wajib diisi';
    if (!form.description.trim()) errs.description = 'Deskripsi wajib diisi';
    if (!form.last_seen_location.trim()) errs.last_seen_location = 'Lokasi terakhir wajib diisi';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    const result = await submitLostReport(
      {
        item_name: form.item_name.trim(),
        description: form.description.trim(),
        last_seen_location: form.last_seen_location.trim(),
        lost_date: form.lost_date || undefined,
        category: (form.category || 'lainnya') as ItemCategory,
        image_url: form.image_url || undefined,
      },
      user.id
    );
    setSubmitting(false);

    if (result.error) {
      showToast(result.error, 'error');
    } else {
      router.push('/lost/success');
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF4FF] max-w-md mx-auto pb-28">
      <PageWrapper showBack backHref="/home">
        <div className="flex flex-col items-center text-center mb-6">
          <LostIllustration />
          <h1 className="text-lg font-bold text-[#111111] mt-2">Laporkan Barang Hilang</h1>
          <p className="text-sm text-[#777777] mt-1 max-w-xs">
            Kami siap bantu cari barangmu. Deskripsikan yang detail ya.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <Input
            label="Nama barang"
            required
            placeholder="Contoh: Dompet hitam kulit"
            value={form.item_name}
            onChange={(e) => update('item_name', e.target.value)}
            error={errors.item_name}
          />
          <Textarea
            label="Deskripsi barang"
            required
            placeholder="Warna, merek, ciri khusus, isi barang..."
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            error={errors.description}
          />
          <Input
            label="Lokasi terakhir yang diingat"
            required
            placeholder="Contoh: Perpustakaan lantai 2, dekat meja baca"
            value={form.last_seen_location}
            onChange={(e) => update('last_seen_location', e.target.value)}
            error={errors.last_seen_location}
          />
          <Input
            label="Tanggal kehilangan"
            type="date"
            value={form.lost_date}
            onChange={(e) => update('lost_date', e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
          <Select
            label="Kategori barang"
            placeholder="Pilih kategori"
            value={form.category}
            onChange={(e) => update('category', e.target.value as ItemCategory)}
            options={CATEGORIES.map((c) => ({ value: c.value, label: `${c.emoji} ${c.label}` }))}
          />
          <ImageUpload
            label="Foto barang"
            hint="Opsional – bantu orang mengenali barangmu"
            onChange={(file, url) => {
              setImageFile(file);
              update('image_url', url || '');
            }}
          />
          <Textarea
            label="Informasi tambahan"
            placeholder="Info lain yang mungkin membantu..."
            value={form.additional_info}
            onChange={(e) => update('additional_info', e.target.value)}
          />

          <Button type="submit" fullWidth loading={submitting} size="lg" className="mt-2">
            Kirim Laporan
          </Button>
        </form>
      </PageWrapper>
      <BottomNav />
    </div>
  );
}
