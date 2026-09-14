import React from 'react';
import { ArrowLeft, X, ChevronRight } from 'lucide-react';

interface SalonMenPreferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTier: (tier: 'royale' | 'prime') => void;
}

export const SalonMenPreferenceModal: React.FC<SalonMenPreferenceModalProps> = ({
  isOpen,
  onClose,
  onSelectTier,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Floating Modal container matching screenshot */}
      <div className="relative w-full max-w-md bg-[#f9fafb] rounded-[28px] shadow-2xl overflow-hidden z-10 border border-slate-200/90 transform transition-all duration-200 scale-100">
        {/* Top Bar with Back Arrow and Close Button */}
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <button
            type="button"
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-slate-200/60 text-slate-900 transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 rounded-full bg-slate-900/5 hover:bg-slate-900/15 text-slate-800 transition-colors cursor-pointer"
            aria-label="Close preference selector"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Main Heading */}
        <div className="px-6 pb-4">
          <h2 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Select your preference
          </h2>
        </div>

        {/* Separator */}
        <div className="border-t border-slate-200/80" />

        {/* Options List */}
        <div className="divide-y divide-slate-200/80">
          {/* 1. ROYALE OPTION (Top Rated Pros) */}
          <div
            onClick={() => onSelectTier('royale')}
            className="p-5 sm:p-6 hover:bg-white transition-all duration-150 cursor-pointer group flex items-start justify-between gap-4"
            id="salon-men-preference-royale"
          >
            {/* Left: Stylist photo */}
            <div className="shrink-0 pt-0.5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-200 border border-slate-200/90 shadow-2xs group-hover:scale-102 transition-transform">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80"
                  alt="Royale Stylist"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Middle: Details */}
            <div className="flex-1 min-w-0">
              {/* Badge: ● Top rated pros */}
              <div className="mb-1">
                <span className="inline-flex items-center gap-1.5 bg-[#8b6528] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-sm shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-200"></span>
                  Top rated pros
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                Royale
              </h3>

              {/* Brand Logos Row */}
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-black tracking-widest text-slate-700 my-1 select-none">
                <span>IKONIC</span>
                <span className="text-slate-300 font-normal">|</span>
                <span>REPÊCHAGE</span>
                <span className="text-slate-300 font-normal">|</span>
                <span className="text-blue-900 font-extrabold">O<sub className="bottom-0">3+</sub></span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-slate-600 font-normal leading-relaxed mt-0.5">
                <span className="font-semibold text-slate-900">Starts at ₹449</span> Only top professionals for advanced cuts, beard styling & facials.
              </p>
            </div>

            {/* Right: Chevron */}
            <div className="self-center shrink-0 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all">
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
            </div>
          </div>

          {/* 2. PRIME OPTION */}
          <div
            onClick={() => onSelectTier('prime')}
            className="p-5 sm:p-6 hover:bg-white transition-all duration-150 cursor-pointer group flex items-start justify-between gap-4"
            id="salon-men-preference-prime"
          >
            {/* Left: Stylist photo */}
            <div className="shrink-0 pt-0.5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-200 border border-slate-200/90 shadow-2xs group-hover:scale-102 transition-transform">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80"
                  alt="Prime Barber"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Middle: Details */}
            <div className="flex-1 min-w-0">
              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                Prime
              </h3>

              {/* Brand Logos Row */}
              <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-black tracking-widest text-slate-700 my-1 select-none">
                <span className="tracking-wider">L'OREAL</span>
                <span className="inline-flex items-center gap-1 text-emerald-800 tracking-wide font-black">
                  <span className="text-emerald-600 text-xs">🌱</span> BOMBAY SHAVING
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-slate-600 font-normal leading-relaxed mt-0.5">
                <span className="font-semibold text-slate-900">Starts at ₹249</span> Everyday cuts, color & cleanup.
              </p>
            </div>

            {/* Right: Chevron */}
            <div className="self-center shrink-0 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all">
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
