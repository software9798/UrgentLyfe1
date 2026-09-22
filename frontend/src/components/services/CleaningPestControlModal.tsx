import React, { useEffect } from 'react';
import { X, Sparkles, ShieldAlert, Wrench } from 'lucide-react';
import { handleImageError } from '../../utils/imageFallback';

export type CleaningPestServiceOption =
  | 'bathroom-cleaning'
  | 'kitchen-cleaning'
  | 'living-bedroom-cleaning'
  | 'full-home-cleaning'
  | 'termite-control'
  | 'leak-gap-sealing'
  | 'tile-grouting';

interface CleaningPestControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: CleaningPestServiceOption) => void;
}

export const CleaningPestControlModal: React.FC<CleaningPestControlModalProps> = ({
  isOpen,
  onClose,
  onSelectOption,
}) => {
  // Prevent background scrolling while modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="cleaning-pest-control-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cleaning-pest-modal-title"
    >
      {/* Dark Blurred Backdrop matching screenshot and video */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Outer Wrapper for Modal & Top Right Floating White Circular Close Button */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center my-auto transition-all duration-300">
        {/* Floating White Circular Close Button with 'X' in top-right */}
        <div className="w-full flex justify-end mb-3 sm:mb-4 max-w-[640px]">
          <button
            id="close-cleaning-pest-modal-btn"
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-slate-800 shadow-2xl flex items-center justify-center hover:bg-slate-100 transition-all duration-200 hover:scale-105 active:scale-95 border border-slate-200/60 cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Card matching video 00:02 - 00:05 */}
        <div
          id="cleaning-pest-modal-card"
          className="w-full max-w-[640px] bg-white rounded-[26px] sm:rounded-[32px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] p-6 sm:p-8 border border-slate-100 transition-all duration-300 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto"
        >
          {/* Header Title: "Cleaning & Pest Control" */}
          <h2
            id="cleaning-pest-modal-title"
            className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight mb-6 sm:mb-8 text-left"
          >
            Cleaning & Pest Control
          </h2>

          <div className="space-y-7">
            {/* =============================================================== */}
            {/* SECTION 1: Cleaning (4 Items matching video 00:02 - 00:05)     */}
            {/* =============================================================== */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3.5 flex items-center gap-2">
                <span>Cleaning</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {/* 1. Bathroom Cleaning */}
                <button
                  id="opt-bathroom-cleaning"
                  onClick={() => onSelectOption('bathroom-cleaning')}
                  className="group flex flex-col items-center p-3 rounded-2xl bg-[#f8f9fa] hover:bg-slate-100 border border-slate-200/70 hover:border-slate-300 transition-all duration-200 hover:-translate-y-0.5 text-center cursor-pointer"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white p-2 flex items-center justify-center shadow-2xs mb-2.5 group-hover:scale-105 transition-transform overflow-hidden border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&q=80"
                      alt="Bathroom Cleaning"
                      className="w-full h-full object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                    />
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-900 leading-snug line-clamp-2">
                    Bathroom Cleaning
                  </span>
                </button>

                {/* 2. Kitchen cleaning */}
                <button
                  id="opt-kitchen-cleaning"
                  onClick={() => onSelectOption('kitchen-cleaning')}
                  className="group flex flex-col items-center p-3 rounded-2xl bg-[#f8f9fa] hover:bg-slate-100 border border-slate-200/70 hover:border-slate-300 transition-all duration-200 hover:-translate-y-0.5 text-center cursor-pointer"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white p-2 flex items-center justify-center shadow-2xs mb-2.5 group-hover:scale-105 transition-transform overflow-hidden border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=200&q=80"
                      alt="Kitchen cleaning"
                      className="w-full h-full object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                    />
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-900 leading-snug line-clamp-2">
                    Kitchen cleaning
                  </span>
                </button>

                {/* 3. Living & Bedroom Cleaning */}
                <button
                  id="opt-living-bedroom-cleaning"
                  onClick={() => onSelectOption('living-bedroom-cleaning')}
                  className="group flex flex-col items-center p-3 rounded-2xl bg-[#f8f9fa] hover:bg-slate-100 border border-slate-200/70 hover:border-slate-300 transition-all duration-200 hover:-translate-y-0.5 text-center cursor-pointer"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white p-2 flex items-center justify-center shadow-2xs mb-2.5 group-hover:scale-105 transition-transform overflow-hidden border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80"
                      alt="Living & Bedroom Cleaning"
                      className="w-full h-full object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                    />
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-900 leading-snug line-clamp-2">
                    Living &amp; Bedroom Cleaning
                  </span>
                </button>

                {/* 4. Full Home/ By Room Cleaning */}
                <button
                  id="opt-full-home-cleaning"
                  onClick={() => onSelectOption('full-home-cleaning')}
                  className="group flex flex-col items-center p-3 rounded-2xl bg-[#f8f9fa] hover:bg-slate-100 border border-slate-200/70 hover:border-slate-300 transition-all duration-200 hover:-translate-y-0.5 text-center cursor-pointer"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white p-2 flex items-center justify-center shadow-2xs mb-2.5 group-hover:scale-105 transition-transform overflow-hidden border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80"
                      alt="Full Home/ By Room Cleaning"
                      className="w-full h-full object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                    />
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-900 leading-snug line-clamp-2">
                    Full Home/ By Room Cleaning
                  </span>
                </button>
              </div>
            </div>

            {/* =============================================================== */}
            {/* SECTION 2: Pest Control (2 Items matching video 00:02 - 00:05)  */}
            {/* =============================================================== */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3.5 flex items-center gap-2">
                <span>Pest Control</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {/* 1. Termite Control */}
                <button
                  id="opt-termite-control"
                  onClick={() => onSelectOption('termite-control')}
                  className="group flex flex-col items-center p-3 rounded-2xl bg-[#f8f9fa] hover:bg-slate-100 border border-slate-200/70 hover:border-slate-300 transition-all duration-200 hover:-translate-y-0.5 text-center cursor-pointer"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white p-2 flex items-center justify-center shadow-2xs mb-2.5 group-hover:scale-105 transition-transform overflow-hidden border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1587393855524-087f83d95bc9?auto=format&fit=crop&w=200&q=80"
                      alt="Termite Control"
                      className="w-full h-full object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                    />
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-900 leading-snug line-clamp-2">
                    Termite Control
                  </span>
                </button>

                {/* 2. Leak & gap sealing (with 'New' badge matching video) */}
                <button
                  id="opt-leak-gap-sealing"
                  onClick={() => onSelectOption('leak-gap-sealing')}
                  className="group relative flex flex-col items-center p-3 rounded-2xl bg-[#f8f9fa] hover:bg-slate-100 border border-slate-200/70 hover:border-slate-300 transition-all duration-200 hover:-translate-y-0.5 text-center cursor-pointer"
                >
                  {/* Red "New" Badge from video 00:03 */}
                  <span className="absolute -top-1.5 left-3 sm:left-4 z-10 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                    New
                  </span>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white p-2 flex items-center justify-center shadow-2xs mb-2.5 group-hover:scale-105 transition-transform overflow-hidden border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=200&q=80"
                      alt="Leak & gap sealing"
                      className="w-full h-full object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                    />
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-900 leading-snug line-clamp-2">
                    Leak &amp; gap sealing
                  </span>
                </button>
              </div>
            </div>

            {/* =============================================================== */}
            {/* SECTION 3: Deep Restore (1 Item matching video 00:02 - 00:05)   */}
            {/* =============================================================== */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3.5 flex items-center gap-2">
                <span>Deep Restore</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {/* 1. Tile Grouting & Sealant */}
                <button
                  id="opt-tile-grouting"
                  onClick={() => onSelectOption('tile-grouting')}
                  className="group flex flex-col items-center p-3 rounded-2xl bg-[#f8f9fa] hover:bg-slate-100 border border-slate-200/70 hover:border-slate-300 transition-all duration-200 hover:-translate-y-0.5 text-center cursor-pointer"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white p-2 flex items-center justify-center shadow-2xs mb-2.5 group-hover:scale-105 transition-transform overflow-hidden border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&q=80"
                      alt="Tile Grouting & Sealant"
                      className="w-full h-full object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                    />
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-900 leading-snug line-clamp-2">
                    Tile Grouting &amp; Sealant
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
