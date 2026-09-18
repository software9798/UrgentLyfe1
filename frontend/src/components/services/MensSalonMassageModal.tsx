import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ChevronRight } from 'lucide-react';
import { SalonForMenVisual, MassageForMenVisual } from './SalonCategoryVisuals';
import { handleImageError } from '../../utils/imageFallback';

interface MensSalonMassageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: 'salon-men' | 'massage-men', tier?: 'royale' | 'prime') => void;
  initialStep?: 'categories' | 'preference';
}

export const MensSalonMassageModal: React.FC<MensSalonMassageModalProps> = ({
  isOpen,
  onClose,
  onSelectOption,
  initialStep = 'categories',
}) => {
  // Step 1: 'categories' (Men's Salon & Massage with 2 cards)
  // Step 2: 'preference' (Select your preference: Royale vs Prime matching exact screenshot)
  const [currentStep, setCurrentStep] = useState<'categories' | 'preference'>(initialStep);

  // Sync step whenever modal opens or initialStep changes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentStep(initialStep || 'categories');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialStep]);

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
      id="mens-salon-massage-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mens-salon-massage-modal-title"
    >
      {/* Blurred Dark Backdrop matching screenshot */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Outer Wrapper for Modal & Top Right Floating White Circular Close Button */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center my-auto transition-all duration-300">
        {/* Floating White Circular Button with dark 'X' in the top-right corner */}
        <div
          className={`w-full flex justify-end mb-3 sm:mb-4 ${
            currentStep === 'categories' ? 'max-w-[560px]' : 'max-w-[500px]'
          } transition-all duration-300`}
        >
          <button
            id="close-mens-salon-modal-btn"
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-slate-800 shadow-2xl flex items-center justify-center hover:bg-slate-100 transition-all duration-200 hover:scale-105 active:scale-95 border border-slate-200/60 cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: Categories Selection Modal (Men's Salon & Massage)                */}
        {/* ========================================================================= */}
        {currentStep === 'categories' ? (
          <div
            id="mens-salon-categories-card"
            className="w-full max-w-[560px] bg-white rounded-[26px] sm:rounded-[32px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] p-6 sm:p-8 md:p-9 border border-slate-100 transition-all duration-300 animate-in fade-in zoom-in-95"
          >
            {/* Prominent, Bold Heading: "Men's Salon & Massage" */}
            <h2
              id="mens-salon-massage-modal-title"
              className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-950 tracking-tight leading-tight mb-6 sm:mb-8 text-left"
            >
              Men's Salon & Massage
            </h2>

            {/* 2-column horizontal grid of rounded cards */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {/* Card 1: Salon for Men */}
              <button
                type="button"
                id="select-salon-for-men-card"
                onClick={() => setCurrentStep('preference')}
                className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
              >
                {/* Rounded Rectangle Card containing the 3D Vector Icon */}
                <div className="w-full aspect-[4/3] sm:aspect-square sm:max-h-32 rounded-2xl sm:rounded-3xl bg-[#f8fafc] group-hover:bg-[#f1f5f9] border border-slate-100 flex items-center justify-center p-3 sm:p-4 shadow-2xs group-hover:shadow-sm group-hover:scale-[1.03] active:scale-[0.98] transition-all duration-200">
                  <SalonForMenVisual className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-2xs group-hover:scale-105 transition-transform" />
                </div>

                {/* Descriptive Text Label below the card */}
                <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-slate-950 leading-snug mt-3 px-1">
                  Salon for Men
                </span>
              </button>

              {/* Card 2: Massage for Men */}
              <button
                type="button"
                id="select-massage-for-men-card"
                onClick={() => onSelectOption('massage-men')}
                className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
              >
                {/* Rounded Rectangle Card containing the 3D Vector Icon */}
                <div className="w-full aspect-[4/3] sm:aspect-square sm:max-h-32 rounded-2xl sm:rounded-3xl bg-[#f8fafc] group-hover:bg-[#f1f5f9] border border-slate-100 flex items-center justify-center p-3 sm:p-4 shadow-2xs group-hover:shadow-sm group-hover:scale-[1.03] active:scale-[0.98] transition-all duration-200">
                  <MassageForMenVisual className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-2xs group-hover:scale-105 transition-transform" />
                </div>

                {/* Descriptive Text Label below the card */}
                <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-slate-950 leading-snug mt-3 px-1">
                  Massage for Men
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* STEP 2: Preference Selection (Matching User's Reference Screenshot)       */
          /* ========================================================================= */
          <div
            id="mens-salon-preference-card"
            className="w-full max-w-[500px] bg-white rounded-[24px] sm:rounded-[28px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] overflow-hidden border border-slate-100 transition-all duration-300 animate-in fade-in zoom-in-95 flex flex-col text-slate-900"
          >
            {/* Top Navigation Row: '<-' Back Arrow Button (Left-aligned, clean icon) */}
            <div className="px-6 pt-5 pb-2">
              <button
                type="button"
                id="back-to-mens-categories-btn"
                onClick={() => setCurrentStep('categories')}
                className="p-1.5 -ml-1.5 rounded-full hover:bg-slate-100 text-slate-900 transition-colors cursor-pointer inline-flex items-center justify-center"
                aria-label="Back to categories"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </button>
            </div>

            {/* Main Heading: "Select your preference" */}
            <div className="px-6 pb-4">
              <h2 className="text-2xl sm:text-[28px] font-bold text-slate-950 tracking-tight leading-tight">
                Select your preference
              </h2>
            </div>

            {/* Separator Line below title */}
            <div className="border-t border-slate-200/80" />

            {/* Options List */}
            <div className="divide-y divide-slate-200/80">
              {/* Option 1: ROYALE (Matching exact screenshot layout) */}
              <div
                id="select-royale-option"
                onClick={() => onSelectOption('salon-men', 'royale')}
                className="p-5 sm:p-6 hover:bg-slate-50/70 transition-all duration-150 cursor-pointer group flex items-start gap-4 sm:gap-5"
              >
                {/* Left Column: Badge + Stylist photo */}
                <div className="flex flex-col items-start shrink-0 w-24 sm:w-28">
                  {/* Badge: ● Top rated pros */}
                  <div className="inline-flex items-center gap-1.5 bg-[#8f5e26] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fbd38d]" />
                    <span>Top rated pros</span>
                  </div>

                  {/* Stylist photo cutout in black shirt */}
                  <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-2xs group-hover:scale-102 transition-transform">
                    <img
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80"
                      alt="Royale Stylist"
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImageError(e, 'men')}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Right Column: Title, Brands, Price, Description & Chevron */}
                <div className="flex-1 min-w-0 pr-1">
                  {/* Header Row: Title 'Royale' and Right Chevron '>' */}
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl sm:text-[22px] font-bold text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors">
                      Royale
                    </h3>
                    <ChevronRight className="w-5 h-5 text-slate-400 stroke-[2] shrink-0 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all" />
                  </div>

                  {/* Brand Logos Row: INOA | REPÊCHAGE | O3+ */}
                  <div className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-700 tracking-wider font-semibold my-1.5 select-none flex-wrap">
                    <span className="font-extrabold tracking-widest text-slate-900">IN<span className="font-sans">O</span>A</span>
                    <span className="text-slate-300 font-normal">|</span>
                    <span className="font-serif tracking-widest text-[11px] sm:text-xs text-slate-800 font-bold">REPÊCHAGE</span>
                    <span className="text-slate-300 font-normal">|</span>
                    <span className="font-bold text-slate-900">O<sub className="text-[10px] bottom-0 font-bold">3+</sub></span>
                  </div>

                  {/* Starts at ₹449 */}
                  <div className="text-[13px] sm:text-sm font-semibold text-slate-900 mt-1">
                    Starts at ₹449
                  </div>

                  {/* Description: Only top professionals for advanced cuts, beard styling & facials. */}
                  <p className="text-xs sm:text-[13px] text-slate-600 font-normal leading-relaxed mt-1">
                    Only top professionals for advanced cuts, beard styling & facials.
                  </p>
                </div>
              </div>

              {/* Option 2: PRIME (Matching exact screenshot layout) */}
              <div
                id="select-prime-option"
                onClick={() => onSelectOption('salon-men', 'prime')}
                className="p-5 sm:p-6 hover:bg-slate-50/70 transition-all duration-150 cursor-pointer group flex items-start gap-4 sm:gap-5"
              >
                {/* Left Column: Stylist photo (No badge above) */}
                <div className="flex flex-col items-start shrink-0 w-24 sm:w-28 pt-1">
                  <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-2xs group-hover:scale-102 transition-transform">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                      alt="Prime Barber"
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImageError(e, 'men')}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Right Column: Title, Brands, Price, Description & Chevron */}
                <div className="flex-1 min-w-0 pr-1">
                  {/* Header Row: Title 'Prime' and Right Chevron '>' */}
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl sm:text-[22px] font-bold text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors">
                      Prime
                    </h3>
                    <ChevronRight className="w-5 h-5 text-slate-400 stroke-[2] shrink-0 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all" />
                  </div>

                  {/* Brand Logos Row: L'ORÉAL | BOMBAY SHAVING */}
                  <div className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-700 tracking-wider font-semibold my-1.5 select-none flex-wrap">
                    <span className="font-extrabold tracking-wider text-slate-900">L'ORÉAL</span>
                    <span className="text-slate-300 font-normal">|</span>
                    <span className="inline-flex items-center gap-1 font-bold text-slate-900 tracking-wide text-[11px] sm:text-xs">
                      {/* Bombay Shaving trident logo mark */}
                      <svg className="w-3.5 h-3.5 fill-slate-900 shrink-0" viewBox="0 0 24 24">
                        <path d="M12 2L9 8h6l-3-6zm-7 8l4 6-2 6 5-3 5 3-2-6 4-6H5z"/>
                      </svg>
                      BOMBAY SHAVING
                    </span>
                  </div>

                  {/* Starts at ₹249 */}
                  <div className="text-[13px] sm:text-sm font-semibold text-slate-900 mt-1">
                    Starts at ₹249
                  </div>

                  {/* Description: Everyday cuts, color & cleanup. */}
                  <p className="text-xs sm:text-[13px] text-slate-600 font-normal leading-relaxed mt-1">
                    Everyday cuts, color & cleanup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
