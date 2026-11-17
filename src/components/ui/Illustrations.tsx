import React from 'react';

// SVG-based inline illustrations matching the FINDA design reference

export function SplashIllustration() {
  return (
    <div className="relative w-56 h-56 mx-auto">
      {/* Box */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-32">
        <svg viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Box body */}
          <rect x="10" y="40" width="140" height="85" rx="8" fill="#D4A574" />
          <rect x="10" y="40" width="140" height="85" rx="8" fill="url(#boxGrad)" />
          {/* Box lid */}
          <path d="M5 30 Q80 15 155 30 L150 50 Q80 38 10 50 Z" fill="#C49060" />
          {/* Box flap */}
          <path d="M55 15 Q80 8 105 15 L100 42 Q80 36 60 42 Z" fill="#B8824A" />
          {/* Tape */}
          <rect x="70" y="38" width="20" height="6" rx="3" fill="#E8C89A" />
          {/* Items in box */}
          <circle cx="50" cy="70" r="14" fill="#FFB6C1" /> {/* pink item */}
          <rect x="80" y="58" width="22" height="28" rx="4" fill="#87CEEB" /> {/* blue item */}
          <circle cx="118" cy="68" r="12" fill="#98FB98" /> {/* green item */}
          {/* Teddy bear */}
          <circle cx="80" cy="52" r="10" fill="#DEB887" />
          <circle cx="73" cy="46" r="6" fill="#D2A87A" />
          <circle cx="87" cy="46" r="6" fill="#D2A87A" />
          <circle cx="78" cy="53" r="2" fill="#8B6914" />
          <circle cx="82" cy="53" r="2" fill="#8B6914" />
          <defs>
            <linearGradient id="boxGrad" x1="10" y1="40" x2="10" y2="125" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E8B87A" />
              <stop offset="1" stopColor="#C49060" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Magnifying glass */}
      <div className="absolute top-0 right-0 w-28 h-28">
        <svg viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
          <circle cx="45" cy="45" r="32" fill="white" stroke="#527CE5" strokeWidth="8" />
          <circle cx="45" cy="45" r="22" fill="#E2ECFF" />
          <circle cx="38" cy="38" r="6" fill="white" opacity="0.7" />
          <line x1="68" y1="68" x2="95" y2="95" stroke="#527CE5" strokeWidth="10" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

export function LostIllustration() {
  return (
    <div className="relative w-44 h-36 mx-auto">
      <svg viewBox="0 0 180 148" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Person searching */}
        <circle cx="40" cy="30" r="18" fill="#FFDAB9" />
        <rect x="24" y="48" width="32" height="40" rx="8" fill="#527CE5" />
        <line x1="24" y1="60" x2="8" y2="80" stroke="#FFDAB9" strokeWidth="6" strokeLinecap="round" />
        <line x1="56" y1="60" x2="72" y2="72" stroke="#FFDAB9" strokeWidth="6" strokeLinecap="round" />
        {/* Magnifying glass in hand */}
        <circle cx="82" cy="68" r="16" fill="white" stroke="#527CE5" strokeWidth="5" />
        <circle cx="82" cy="68" r="10" fill="#E2ECFF" />
        <line x1="92" y1="78" x2="104" y2="90" stroke="#527CE5" strokeWidth="5" strokeLinecap="round" />
        {/* Question marks */}
        <text x="118" y="45" fill="#527CE5" fontSize="20" fontWeight="bold" opacity="0.6">?</text>
        <text x="140" y="70" fill="#A9D8FF" fontSize="14" fontWeight="bold" opacity="0.8">?</text>
        {/* Legs */}
        <line x1="32" y1="88" x2="28" y2="120" stroke="#527CE5" strokeWidth="7" strokeLinecap="round" />
        <line x1="48" y1="88" x2="52" y2="120" stroke="#527CE5" strokeWidth="7" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function FoundIllustration() {
  return (
    <div className="relative w-44 h-36 mx-auto">
      <svg viewBox="0 0 180 148" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Box */}
        <rect x="30" y="68" width="120" height="72" rx="10" fill="#D4A574" />
        <path d="M25 55 Q90 42 155 55 L150 72 Q90 60 30 72 Z" fill="#C49060" />
        <path d="M68 38 Q90 30 112 38 L108 60 Q90 54 72 60 Z" fill="#B8824A" />
        <rect x="80" y="58" width="20" height="6" rx="3" fill="#E8C89A" />
        {/* Items sticking out */}
        <circle cx="65" cy="62" r="12" fill="#FFB6C1" />
        <rect x="85" y="48" width="20" height="24" rx="4" fill="#87CEEB" />
        <circle cx="118" cy="60" r="11" fill="#DEB887" />
        {/* Teddy ears */}
        <circle cx="112" cy="52" r="6" fill="#D2A87A" />
        <circle cx="124" cy="52" r="6" fill="#D2A87A" />
        {/* Green checkmark circle */}
        <circle cx="145" cy="80" r="22" fill="#4CAF50" />
        <path d="M134 80 L142 88 L158 72" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function FindMatchIllustration() {
  return (
    <div className="relative w-52 h-36 mx-auto">
      <svg viewBox="0 0 210 148" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Left box */}
        <rect x="8" y="68" width="76" height="60" rx="8" fill="#D4A574" />
        <path d="M4 56 Q46 46 84 56 L80 70 Q46 60 8 70 Z" fill="#C49060" />
        <circle cx="30" cy="62" r="10" fill="#FFB6C1" />
        <rect x="46" y="52" width="16" height="20" rx="3" fill="#87CEEB" />
        {/* Right box */}
        <rect x="126" y="68" width="76" height="60" rx="8" fill="#D4A574" />
        <path d="M122 56 Q164 46 202 56 L198 70 Q164 60 126 70 Z" fill="#C49060" />
        <circle cx="148" cy="62" r="10" fill="#98FB98" />
        <rect x="164" y="52" width="16" height="20" rx="3" fill="#DEB887" />
        {/* Match arrows / connector */}
        <circle cx="105" cy="80" r="18" fill="#527CE5" />
        <path d="M96 80 L100 76 L100 78 L110 78 L110 76 L114 80 L110 84 L110 82 L100 82 L100 84 Z" fill="white" />
        <circle cx="97" cy="72" r="3" fill="#A9D8FF" opacity="0.8" />
        <circle cx="113" cy="88" r="3" fill="#A9D8FF" opacity="0.8" />
      </svg>
    </div>
  );
}

export function SuccessLostIllustration() {
  return (
    <div className="w-52 h-44 mx-auto">
      <svg viewBox="0 0 210 176" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Magnifying glass */}
        <circle cx="80" cy="70" r="45" fill="white" stroke="#527CE5" strokeWidth="10" />
        <circle cx="80" cy="70" r="30" fill="#E2ECFF" />
        <circle cx="68" cy="58" r="8" fill="white" opacity="0.6" />
        <line x1="114" y1="104" x2="145" y2="135" stroke="#527CE5" strokeWidth="12" strokeLinecap="round" />
        {/* Box */}
        <rect x="100" y="105" width="96" height="66" rx="10" fill="#D4A574" />
        <path d="M96 92 Q148 80 200 92 L196 108 Q148 96 100 108 Z" fill="#C49060" />
        <circle cx="125" cy="100" r="10" fill="#FFB6C1" />
        <circle cx="162" cy="98" r="12" fill="#DEB887" />
        <circle cx="156" cy="92" r="6" fill="#D2A87A" />
        <circle cx="168" cy="92" r="6" fill="#D2A87A" />
      </svg>
    </div>
  );
}

export function SuccessFoundIllustration() {
  return (
    <div className="w-52 h-44 mx-auto">
      <svg viewBox="0 0 210 176" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Large box */}
        <rect x="30" y="80" width="150" height="88" rx="12" fill="#D4A574" />
        <path d="M24 64 Q105 50 186 64 L180 82 Q105 68 30 82 Z" fill="#C49060" />
        <path d="M78 44 Q105 36 132 44 L128 68 Q105 62 82 68 Z" fill="#B8824A" />
        <rect x="95" y="66" width="20" height="8" rx="4" fill="#E8C89A" />
        {/* Items */}
        <circle cx="70" cy="72" r="14" fill="#FFB6C1" />
        <rect x="94" y="56" width="22" height="28" rx="4" fill="#87CEEB" />
        <circle cx="140" cy="70" r="14" fill="#DEB887" />
        <circle cx="133" cy="62" r="7" fill="#D2A87A" />
        <circle cx="147" cy="62" r="7" fill="#D2A87A" />
        {/* Big checkmark */}
        <circle cx="162" cy="92" r="28" fill="#4CAF50" />
        <path d="M148 92 L158 102 L176 82" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function HomeIllustration() {
  return (
    <div className="w-20 h-20">
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <circle cx="34" cy="34" r="22" fill="white" stroke="#527CE5" strokeWidth="6" />
        <circle cx="34" cy="34" r="14" fill="#E2ECFF" />
        <circle cx="28" cy="28" r="4" fill="white" opacity="0.7" />
        <line x1="49" y1="49" x2="68" y2="68" stroke="#527CE5" strokeWidth="7" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function EmptyIllustration() {
  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <div className="text-6xl">📭</div>
      <p className="text-[#777777] text-sm text-center">Belum ada laporan di sini</p>
    </div>
  );
}

export function ItemImagePlaceholder({ category }: { category?: string }) {
  const emojis: Record<string, string> = {
    dompet: '👛',
    tas: '👜',
    elektronik: '📱',
    dokumen: '📄',
    kunci: '🔑',
    perhiasan: '💍',
    pakaian: '👕',
    buku: '📚',
    lainnya: '📦',
  };
  const emoji = category ? emojis[category] || '📦' : '📦';
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#E2ECFF] to-[#c8dcff] rounded-2xl">
      <span className="text-4xl">{emoji}</span>
    </div>
  );
}
