import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className = '', onClick, hoverable = false }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-3xl shadow-sm border border-white/80 ${
        hoverable ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function FeatureCard({
  icon,
  title,
  description,
  onClick,
  color = 'blue',
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  color?: 'blue' | 'purple' | 'green';
}) {
  const colors = {
    blue: 'from-[#527CE5]/10 to-[#E2ECFF]',
    purple: 'from-purple-100 to-purple-50',
    green: 'from-green-100 to-green-50',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br ${colors[color]} rounded-3xl p-4 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col items-center gap-2 text-center`}
    >
      <div className="w-16 h-16 flex items-center justify-center">{icon}</div>
      <p className="text-xs font-semibold text-[#527CE5]">{title}</p>
      <p className="text-xs text-[#777777] leading-tight">{description}</p>
    </div>
  );
}
