'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { SplashIllustration } from '@/components/ui/Illustrations';

const slides = [
  {
    title: 'FINDA',
    tagline: 'Find What You Lost',
    desc: 'Platform temukan & laporkan barang hilang untuk kampus, sekolah, dan tempat umum.',
  },
  {
    title: 'Laporkan',
    tagline: 'Barang Hilang atau Temuan',
    desc: 'Mudah melaporkan barang yang hilang atau yang kamu temukan kepada semua orang.',
  },
  {
    title: 'Cocokkan',
    tagline: 'Dan Temukan Pemiliknya',
    desc: 'Sistem cerdas kami mencocokkan laporan hilang dan temuan agar barang kembali ke pemiliknya.',
  },
];

export default function SplashPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      router.push('/auth');
    }
  };

  const slide = slides[current];

  return (
    <div className="min-h-screen bg-[#EEF4FF] flex flex-col items-center justify-between px-6 py-12 max-w-md mx-auto">
      {/* Illustration */}
      <div className="flex-1 flex flex-col items-center justify-center w-full gap-8 animate-fade-in-up">
        <SplashIllustration />

        <div className="text-center space-y-2">
          <h1 className="text-5xl font-black text-[#527CE5] tracking-tight">{slide.title}</h1>
          <p className="text-xl font-bold text-[#111111]">{slide.tagline}</p>
          <p className="text-sm text-[#777777] leading-relaxed max-w-xs mx-auto">{slide.desc}</p>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="w-full flex flex-col items-center gap-6">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 h-2.5 bg-[#527CE5]'
                  : 'w-2.5 h-2.5 bg-[#527CE5]/30'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Next / Start button */}
        <button
          onClick={handleNext}
          className="w-16 h-16 rounded-full bg-[#527CE5] flex items-center justify-center shadow-lg hover:bg-[#3d68d8] transition-colors active:scale-95"
          aria-label={current < slides.length - 1 ? 'Lanjut' : 'Mulai'}
        >
          <ArrowRight size={28} className="text-white" />
        </button>

        {/* Skip */}
        {current < slides.length - 1 && (
          <button
            onClick={() => router.push('/auth')}
            className="text-sm text-[#777777] hover:text-[#527CE5] transition-colors"
          >
            Lewati
          </button>
        )}
      </div>
    </div>
  );
}
