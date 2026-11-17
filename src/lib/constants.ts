import { ItemCategory } from '@/types';

export const CATEGORIES: { value: ItemCategory; label: string; emoji: string }[] = [
  { value: 'dompet', label: 'Dompet', emoji: '👛' },
  { value: 'tas', label: 'Tas', emoji: '👜' },
  { value: 'elektronik', label: 'Elektronik', emoji: '📱' },
  { value: 'dokumen', label: 'Dokumen', emoji: '📄' },
  { value: 'kunci', label: 'Kunci', emoji: '🔑' },
  { value: 'perhiasan', label: 'Perhiasan', emoji: '💍' },
  { value: 'pakaian', label: 'Pakaian', emoji: '👕' },
  { value: 'buku', label: 'Buku', emoji: '📚' },
  { value: 'lainnya', label: 'Lainnya', emoji: '📦' },
];

export const CATEGORY_LABELS: Record<ItemCategory, string> = {
  dompet: 'Dompet',
  tas: 'Tas',
  elektronik: 'Elektronik',
  dokumen: 'Dokumen',
  kunci: 'Kunci',
  perhiasan: 'Perhiasan',
  pakaian: 'Pakaian',
  buku: 'Buku',
  lainnya: 'Lainnya',
};

export const IS_DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
