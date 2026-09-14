import React from 'react';
import { X, Sparkles, ChevronRight, Star, ShieldCheck } from 'lucide-react';

interface SalonDermaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTier: (tier: 'prime' | 'luxe') => void;
}

export const SalonDermaModal: React.FC<SalonDermaModalProps> = ({
  isOpen,
  onClose,
  onSelectTier,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/65 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100 transform transition-all duration-300 scale-100">
        {/* Top Header Card (Derma facials Banner from Video 00:01) */}
        <div className="relative bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 text-white p-5 sm:p-6 overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer z-20"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Background Glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Content Layout */}
          <div className="relative z-10 pr-24 sm:pr-28">
            <div className="inline-flex items-center gap-1.5 bg-purple-500/30 border border-purple-400/40 text-purple-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2">
              <Sparkles className="w-3 h-3 text-purple-300" />
              <span>New launch</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              Derma facials
            </h2>

            <p className="text-xs sm:text-sm text-purple-200/90 mt-1 leading-relaxed font-medium">
              Targeted actives, powered by Cryofacial Cold Therapy
            </p>
          </div>

          {/* Cryofacial visual image thumbnail matching video */}
          <div className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1512290900672-1f41d911b306?auto=format&fit=crop&w=300&q=80"
              alt="Derma facial"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Options List matching Video 00:01 - 00:04 */}
        <div className="p-4 sm:p-5 space-y-3 bg-slate-50/50">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Choose your salon experience
          </p>

          {/* 1. LUXE OPTION */}
          <button
            onClick={() => onSelectTier('luxe')}
            className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-slate-200/80 hover:border-purple-600 hover:shadow-lg transition-all group text-left cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              {/* Avatar / Photo */}
              <div className="relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=140&q=80"
                  alt="Luxe Beautician"
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 group-hover:scale-105 transition-transform"
                />
                <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-md shadow-xs flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 fill-slate-950" /> 4.9
                </span>
              </div>

              {/* Text Info */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 border border-amber-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-amber-600 text-amber-600" />
                    Top Beauticians
                  </span>
                </div>

                <div className="text-lg font-black text-slate-900 group-hover:text-purple-700 transition-colors mt-0.5">
                  Luxe
                </div>

                <p className="text-xs text-slate-500 font-medium truncate">
                  Forest Essentials, Korean Rituals
                </p>

                <div className="text-xs font-bold text-slate-900 mt-1">
                  Starting at <span className="text-purple-700 text-sm">₹799</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 pl-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-purple-600 group-hover:text-white text-slate-600 flex items-center justify-center transition-colors">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </button>

          {/* 2. PRIME OPTION */}
          <button
            onClick={() => onSelectTier('prime')}
            className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-slate-200/80 hover:border-blue-600 hover:shadow-lg transition-all group text-left cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              {/* Avatar / Photo */}
              <div className="relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=140&q=80"
                  alt="Prime Beautician"
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 group-hover:scale-105 transition-transform"
                />
                <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-md shadow-xs flex items-center gap-0.5">
                  <ShieldCheck className="w-2.5 h-2.5" /> 4.86
                </span>
              </div>

              {/* Text Info */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded-md">
                    Prime
                  </span>
                </div>

                <div className="text-lg font-black text-slate-900 group-hover:text-blue-700 transition-colors mt-0.5">
                  Prime
                </div>

                <p className="text-xs text-slate-500 font-medium truncate">
                  Affordable salon service, branded products
                </p>

                <div className="text-xs font-bold text-slate-900 mt-1">
                  Starting at <span className="text-blue-700 text-sm">₹499</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 pl-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-600 flex items-center justify-center transition-colors">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </button>
        </div>

        {/* Footer Guarantee */}
        <div className="px-5 py-3 bg-slate-100 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            100% Single-use Sealed Kits & Monodosages
          </span>
          <span className="font-bold text-slate-800">UrgentLyfe Guarantee</span>
        </div>
      </div>
    </div>
  );
};
