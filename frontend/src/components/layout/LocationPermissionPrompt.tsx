import React from 'react';
import { Navigation, MapPin, Zap, ShieldCheck, X, CheckCircle2, Loader2 } from 'lucide-react';

interface LocationPermissionPromptProps {
  isOpen: boolean;
  isDetecting: boolean;
  onAllow: () => void;
  onDismiss: () => void;
  onSelectManually: () => void;
}

export const LocationPermissionPrompt: React.FC<LocationPermissionPromptProps> = ({
  isOpen,
  isDetecting,
  onAllow,
  onDismiss,
  onSelectManually,
}) => {
  if (!isOpen) return null;

  return (
    <aside
      aria-label="Location Permission Prompt"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-md w-full animate-fadeIn"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200/90 p-5 sm:p-6 overflow-hidden relative">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500" />
        
        {/* Close Button */}
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
          title="Dismiss"
          aria-label="Dismiss location request"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5">
          {/* Pulsing Location Icon */}
          <div className="relative shrink-0 mt-0.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
              {isDetecting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Navigation className="w-5 h-5 fill-white/20" />
              )}
            </div>
            {!isDetecting && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border-2 border-white"></span>
              </span>
            )}
          </div>

          {/* Prompt Body */}
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">
                Doorstep Services
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">• 30m SOS</span>
            </div>

            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-snug">
              Auto-detect your city & locality?
            </h3>
            
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              UrgentLyfe asks for location access to show nearest verified technicians, live 30-min SOS arrival, and localized rates.
            </p>

            {/* Micro Feature Pills */}
            <div className="flex flex-wrap items-center gap-2 mt-2.5 text-[11px] text-slate-700 font-medium">
              <span className="inline-flex items-center gap-1 text-slate-700">
                <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                30m SOS dispatch
              </span>
              <span className="inline-flex items-center gap-1 text-slate-700">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verified partners
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-4">
              <button
                type="button"
                onClick={onAllow}
                disabled={isDetecting}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md shadow-blue-600/25 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isDetecting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Detecting Location...</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Allow & Detect Location</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onSelectManually}
                disabled={isDetecting}
                className="inline-flex items-center justify-center text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
              >
                Select Manually
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
