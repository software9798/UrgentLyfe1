import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ChevronRight, Star } from 'lucide-react';
import {
  SalonForWomenVisual,
  SpaForWomenVisual,
  HairStudioVisual,
  MakeupStylingVisual,
} from './SalonCategoryVisuals';

interface SalonDermaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTier: (tier: 'luxe' | 'prime') => void;
  onSelectCategoryItem?: (categoryTitle: string) => void;
}

export const SalonDermaModal: React.FC<SalonDermaModalProps> = ({
  isOpen,
  onClose,
  onSelectTier,
  onSelectCategoryItem,
}) => {
  // Step 1: 'categories' (the 4-column Women's Salon & Spa modal matching Screenshot 2026-09-17 005408.png & video 0:02-0:06)
  // Step 2: 'derma' (Derma facials & Luxe/Prime tiers matching image.png & video 0:08-0:14)
  const [currentStep, setCurrentStep] = useState<'categories' | 'derma'>('categories');

  // Reset to categories step every time modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentStep('categories');
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

  const categories = [
    {
      id: 'salon-women',
      label: 'Salon for Women',
      visual: SalonForWomenVisual,
    },
    {
      id: 'spa-women',
      label: 'Spa for Women',
      visual: SpaForWomenVisual,
    },
    {
      id: 'hair-studio-women',
      label: 'Hair Studio for Women',
      visual: HairStudioVisual,
    },
    {
      id: 'makeup-saree-styling',
      label: 'Makeup, Saree & Styling',
      visual: MakeupStylingVisual,
    },
  ];

  const handleCategoryClick = (catId: string, label: string) => {
    if (catId === 'salon-women') {
      // Exactly as in video at 0:06: clicking "Salon for Women" transitions to Derma Facials view
      setCurrentStep('derma');
    } else {
      onClose();
      if (onSelectCategoryItem) {
        onSelectCategoryItem(label);
      }
    }
  };

  return (
    <div
      id="womens-salon-spa-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="womens-salon-modal-title"
    >
      {/* Blurred Dark Backdrop matching video */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Outer Wrapper for Modal & Top Right Floating White Circular Close Button */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center my-auto transition-all duration-300">
        {/* Floating White Circular Button with dark 'X' in the top-right corner (matches video & screenshot) */}
        <div
          className={`w-full flex justify-end mb-3 sm:mb-4 ${
            currentStep === 'categories' ? 'max-w-[760px]' : 'max-w-[540px]'
          } transition-all duration-300`}
        >
          <button
            id="close-womens-salon-modal-btn"
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-slate-900 shadow-2xl flex items-center justify-center hover:bg-slate-100 transition-all duration-200 hover:scale-105 active:scale-95 border border-slate-200/60 cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: Categories Selection Modal (Screenshot 2026-09-17 005408.png & Video 0:02-0:06) */}
        {/* ========================================================================= */}
        {currentStep === 'categories' ? (
          <div
            id="categories-selection-card"
            className="w-full max-w-[760px] bg-white rounded-[28px] sm:rounded-[36px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] p-6 sm:p-8 md:p-9 border border-slate-100 transition-all duration-300 animate-in fade-in zoom-in-95"
          >
            {/* Prominent, Bold Heading: "Women's Salon & Spa" */}
            <h2
              id="womens-salon-modal-title"
              className="text-2xl sm:text-3xl lg:text-[32px] font-black text-slate-950 tracking-tight leading-tight mb-6 sm:mb-8 text-left"
            >
              Women's Salon & Spa
            </h2>

            {/* 4-column horizontal grid of rounded cards matching video 00:00-00:01 */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
              {categories.map((cat) => {
                const Visual = cat.visual;

                return (
                  <button
                    key={cat.id}
                    id={`category-card-${cat.id}`}
                    onClick={() => handleCategoryClick(cat.id, cat.label)}
                    className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                  >
                    {/* Rounded Rectangle Card containing the 3D Vector Icon */}
                    <div className="w-full aspect-[4/3] sm:aspect-square sm:max-h-28 rounded-2xl sm:rounded-3xl bg-[#f8fafc] group-hover:bg-[#f1f5f9] border border-slate-100/90 flex items-center justify-center p-2 sm:p-3 shadow-2xs group-hover:shadow-sm group-hover:scale-[1.04] active:scale-[0.98] transition-all duration-200">
                      <Visual className="w-12 h-12 sm:w-16 sm:h-16 drop-shadow-2xs" />
                    </div>

                    {/* Descriptive Text Label below the card */}
                    <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-slate-950 leading-snug mt-2.5 sm:mt-3 px-0.5">
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* STEP 2: Derma Facials & Tiers View (image.png & Video 0:08-0:14)          */
          /* ========================================================================= */
          <div
            id="derma-facials-card"
            className="w-full max-w-[540px] bg-white rounded-[28px] sm:rounded-[36px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden border border-slate-100 transition-all duration-300 animate-in fade-in zoom-in-95 flex flex-col"
          >
            {/* Top Navigation Row: '<-' Back Arrow Button */}
            <div className="px-5 sm:px-6 pt-4 sm:pt-5 pb-2">
              <button
                id="back-to-categories-btn"
                onClick={() => setCurrentStep('categories')}
                className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Back to categories"
                title="Back to categories"
              >
                <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
              </button>
            </div>

            {/* Hero Section: Cryofacial Photo with Electronic Device & Bubble Accents */}
            <div className="relative px-5 sm:px-6 pt-1 pb-3">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-slate-50 via-slate-100 to-sky-50 border border-slate-200/60 p-4 sm:p-5 flex flex-col justify-between min-h-[190px] sm:min-h-[220px]">
                {/* Photo of woman with closed eyes receiving cryotherapy facial device treatment */}
                <div className="absolute inset-y-0 right-0 w-[58%] h-full pointer-events-none overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80"
                    alt="Woman receiving Cryofacial cold therapy derma treatment"
                    className="w-full h-full object-cover object-center mix-blend-multiply opacity-95 scale-105"
                  />
                  {/* Soft gradient blend for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent" />

                  {/* Molecular / bubble detail accent graphic overlay matching image */}
                  <svg
                    className="absolute top-2 right-4 w-28 h-28 opacity-85 pointer-events-none drop-shadow-sm"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="30" y1="45" x2="52" y2="28" stroke="#38bdf8" strokeWidth="1.8" strokeDasharray="2 2" />
                    <line x1="52" y1="28" x2="78" y2="36" stroke="#38bdf8" strokeWidth="1.8" />
                    <line x1="52" y1="28" x2="62" y2="60" stroke="#38bdf8" strokeWidth="1.8" />
                    <line x1="78" y1="36" x2="90" y2="62" stroke="#38bdf8" strokeWidth="1.8" />

                    <circle cx="30" cy="45" r="7" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
                    <circle cx="52" cy="28" r="10" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
                    <circle cx="52" cy="28" r="4" fill="#ffffff" />
                    <circle cx="78" cy="36" r="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
                    <circle cx="62" cy="60" r="8" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.8" />
                    <circle cx="90" cy="62" r="5" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* Left Text Column */}
                <div className="relative z-10 max-w-[58%]">
                  {/* Maroon tag: "New launch" */}
                  <div className="inline-block mb-2 sm:mb-2.5">
                    <span
                      id="new-launch-tag"
                      className="bg-[#500724] text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md tracking-wide shadow-xs"
                    >
                      New launch
                    </span>
                  </div>

                  {/* Heading: "Derma facials" */}
                  <h3
                    id="derma-facials-heading"
                    className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-none mb-1.5"
                  >
                    Derma facials
                  </h3>

                  {/* Smaller descriptive text: "Targeted actives, powered by Cryofacial Cold Therapy" */}
                  <p className="text-xs sm:text-[13px] font-medium text-slate-700 leading-snug">
                    Targeted actives, powered by Cryofacial Cold Therapy
                  </p>
                </div>
              </div>
            </div>

            {/* Service Tiers List */}
            <div className="px-5 sm:px-6 pt-2 pb-6 flex flex-col">
              {/* Header Text: "Price varies by category & tier" */}
              <h4 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight mb-3">
                Price varies by category & tier
              </h4>

              <div className="space-y-3">
                {/* ======================================================= */}
                {/* 1. LUXE CARD                                            */}
                {/* ======================================================= */}
                <button
                  id="salon-tier-luxe-card"
                  onClick={() => onSelectTier('luxe')}
                  className="w-full flex items-center justify-between p-3 sm:p-3.5 bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all duration-200 text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    {/* Professional photo of smiling woman in dark maroon professional shirt + gold "Top rated pros" tag */}
                    <div className="relative shrink-0 w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden bg-amber-50/50 border border-slate-200/80">
                      {/* Gold tag above the photo: "Top rated pros" */}
                      <div className="absolute top-0 inset-x-0 bg-[#a0742a] text-white text-[8px] sm:text-[9px] font-extrabold uppercase px-1 py-0.5 text-center flex items-center justify-center gap-1 z-10 shadow-2xs tracking-wider">
                        <Star className="w-2.5 h-2.5 fill-white" />
                        <span>Top rated pros</span>
                      </div>

                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=260&q=80"
                        alt="Smiling professional beautician in dark maroon uniform"
                        className="w-full h-full object-cover object-top pt-3.5 group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>

                    {/* Details: Heading "Luxe", Brand logos, Pricing */}
                    <div className="min-w-0">
                      <h5 className="text-lg sm:text-xl font-black text-slate-950 leading-tight">
                        Luxe
                      </h5>

                      {/* Brand logos below: "FOREST ESSENTIALS LUXURIOUS AYURVEDA" and "CIRÉPIL" */}
                      <div className="flex items-center flex-wrap gap-1.5 my-0.5 text-slate-800">
                        <span className="font-serif text-[10.5px] sm:text-[11.5px] tracking-wider font-bold text-[#713f12]">
                          FOREST ESSENTIALS<span className="text-[8px] align-super">™</span>
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className="font-sans text-[10px] sm:text-[11px] font-extrabold tracking-widest text-slate-700">
                          CIRÉPIL
                        </span>
                      </div>

                      {/* Pricing text: "Starting at ₹799" with text "Explore all tiers for full price range" */}
                      <p className="text-xs sm:text-sm font-extrabold text-slate-950">
                        Starting at ₹799
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Explore all tiers for full price range
                      </p>
                    </div>
                  </div>

                  {/* Right-facing chevron arrow in gold circle */}
                  <div className="shrink-0 pl-2">
                    <div
                      className="w-8 h-8 rounded-full bg-[#a0742a] text-white flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-[#8c6523] transition-all duration-200"
                      aria-label="View Luxe Derma Facials"
                    >
                      <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  </div>
                </button>

                {/* ======================================================= */}
                {/* 2. PRIME CARD                                           */}
                {/* ======================================================= */}
                <button
                  id="salon-tier-prime-card"
                  onClick={() => onSelectTier('prime')}
                  className="w-full flex items-center justify-between p-3 sm:p-3.5 bg-white rounded-2xl border border-slate-200/90 hover:border-slate-400 hover:shadow-md transition-all duration-200 text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    {/* Professional photo of different smiling woman in white professional polo shirt */}
                    <div className="relative shrink-0 w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80">
                      <img
                        src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=260&q=80"
                        alt="Smiling professional beautician in crisp white polo shirt"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>

                    {/* Details: Heading "Prime", Brand logos, Description text */}
                    <div className="min-w-0">
                      <h5 className="text-lg sm:text-xl font-black text-slate-950 leading-tight">
                        Prime
                      </h5>

                      {/* Brand logos below: "O3+" and "RICA" */}
                      <div className="flex items-center gap-1.5 my-0.5 text-slate-800">
                        <span className="font-sans text-xs font-black tracking-tight text-slate-900">
                          O<sub className="font-bold text-[9px] -bottom-0.5">3+</sub>
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className="font-sans text-[10.5px] sm:text-[11.5px] font-extrabold tracking-wider text-slate-700">
                          RICA
                        </span>
                      </div>

                      {/* Description text: "Explore new Science backed Derma facials" */}
                      <p className="text-xs sm:text-[13px] font-medium text-slate-600">
                        Explore new Science backed Derma facials
                      </p>
                    </div>
                  </div>

                  {/* Right-facing chevron arrow in gold circle */}
                  <div className="shrink-0 pl-2">
                    <div
                      className="w-8 h-8 rounded-full bg-[#a0742a] text-white flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-[#8c6523] transition-all duration-200"
                      aria-label="View Prime Derma Facials"
                    >
                      <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
