'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useReports } from '@/context/ReportsContext';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { FoundIllustration } from '@/components/ui/Illustrations';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { CATEGORIES } from '@/lib/constants';
import { ItemCategory } from '@/types';

interface FoundFormData {
  item_name: string;
  description: string;
  found_location: string;
  found_date: string;
  category: ItemCategory | '';
  contact_information: string;
  image_url: string;
}

const INITIAL: FoundFormData = {
  item_name: '',
  description: '',
  found_location: '',
  found_date: '',
  category: '',
  contact_information: '',
  image_url: '',
};

export default function FoundNewPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { submitFoundReport } = useReports();
  const { showToast } = useToast();

  const [form, setForm] = useState<FoundFormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FoundFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [, setImageFile] = useState<File | null>(null);

  if (!user) { router.replace('/auth'); return null; }

  const update = (key: keyof FoundFormData, val: string) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: '' }));
  };

  const validate = () => {
    const errs: Partial<Record<keyof FoundFormData, string>> = {};
    if (!form.item_name.trim()) errs.item_name = 'Nama barang wajib diisi';
    if (!form.description.trim()) errs.description = 'Deskripsi wajib diisi';
    if (!form.found_location.trim()) errs.found_location = 'Lokasi ditemukan wajib diisi';
    if (!form.contact_information.trim()) errs.contact_information = 'Kontak wajib diisi';
    if (!form.image_url) errs.image_url = 'Foto barang temuan wajib diunggah';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    const result = await submitFoundReport(
      {
        item_name: form.item_name.trim(),
        description: form.description.trim(),
        found_location: form.found_location.trim(),
        found_date: form.found_date || undefined,
        category: (form.category || 'lainnya') as ItemCategory,
        contact_information: form.contact_information.trim(),
        image_url: form.image_url || undefined,
      },
      user.id
    );
    setLoading(false);

    if (result.error) {
      showToast(result.error, 'error');
    } else {
      router.push('/found/success');
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF4FF] max-w-md mx-auto pb-28">
      <PageWrapper showBack backHref="/home">
        {/* Hero */}
        <div className="flex flex-col items-center text-center mb-6">
          <FoundIllustration />
          <h1 className="text-lg font-bold text-[#111111] mt-2">Laporkan Barang Temuan</h1>
          <p className="text-sm text-[#777777] mt-1 max-w-xs">
            Bantu pemiliknya dengan melaporkan barang yang kamu temukan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <Input
            label="Nama barang"
            required
            placeholder="Contoh: Dompet pink kulit"
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
            label="Lokasi barang ditemukan"
            required
            placeholder="Contoh: Masjid lantai 1, dekat tempat wudhu"
            value={form.found_location}
            onChange={(e) => update('found_location', e.target.value)}
            error={errors.found_location}
          />
          <Input
            label="Tanggal ditemukan"
            type="date"
            value={form.found_date}
            onChange={(e) => update('found_date', e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
          <Select
            label="Kategori barang"
            placeholder="Pilih kategori"
            value={form.category}
            onChange={(e) => update('category', e.target.value as ItemCategory)}
            options={CATEGORIES.map((c) => ({ value: c.value, label: `${c.emoji} ${c.label}` }))}
          />
          <Input
            label="Kontak yang bisa dihubungi"
            required
            placeholder="WhatsApp, Instagram, atau email"
            value={form.contact_information}
            onChange={(e) => update('contact_information', e.target.value)}
            error={errors.contact_information}
          />
          <ImageUpload
            label="Foto barang yang anda temukan"
            required
            hint="Wajib – bantu pemilik mengenali barangnya"
            onChange={(file, url) => {
              setImageFile(file);
              update('image_url', url || '');
            }}
            error={errors.image_url}
          />

          <Button type="submit" fullWidth loading={loading} size="lg" className="mt-2">
            Kirim Laporan
          </Button>
        </form>
      </PageWrapper>
      <BottomNav />
    </div>
  );
}
