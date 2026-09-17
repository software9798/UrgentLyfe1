import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Play, Crown, Sparkles, ChevronDown } from 'lucide-react';
import { SalonSubCategory } from '../../data/salonData';
import { handleImageError } from '../../utils/imageFallback';

interface SalonLuxeHeroProps {
  categories: SalonSubCategory[];
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  onOpenVideoModal: () => void;
}

export const SalonLuxeHero: React.FC<SalonLuxeHeroProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
  onOpenVideoModal,
}) => {
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      title: 'FOREST ESSENTIALS™',
      tagline: 'LUXURIOUS AYURVEDA',
      subtitle: 'Experience 24K Gold Soundarya & Kansa Adept Therapy',
      bgImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
      badge: 'EXCLUSIVE AT HOME',
    },
    {
      title: 'JAPANESE RITUALS',
      tagline: 'GLASS-SKIN GLOW WITH YUZU',
      subtitle: '8-step ceremonial facial with fermented rice water essence',
      bgImage: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
      badge: 'NEW LAUNCH',
    },
    {
      title: 'KOREAN GLASS SKIN',
      tagline: '10-STEP K-BEAUTY SEQUENCE',
      subtitle: 'Achieve smooth, poreless, and reflective dewy skin at home',
      bgImage: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
      badge: 'BESTSELLER',
    },
  ];

  // First 8 categories for 3x3 grid (9th slot is "+2 more")
  const primaryCategories = categories.slice(0, 8);
  const extraCategories = categories.slice(8);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = heroSlides[activeSlide];

  return (
    <div className="bg-white border-b border-slate-200/90 pt-4 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* ================================================================ */}
          {/* LEFT COLUMN: TITLE, STATS & 3x3 CATEGORY SELECTION GRID */}
          {/* ================================================================ */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Earliest Slot Pill & Rating */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200/90 px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Earliest Thu, 9:00 AM</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-amber-50/70 border border-amber-200/60 px-2.5 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span className="font-bold text-slate-900">4.89</span>
                  <span className="text-slate-500">(2.2 M bookings)</span>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Salon Luxe
              </h1>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Luxury home salon with Forest Essentials, K-Beauty rituals & top-tier specialists
              </p>

              {/* Sub-heading: Select a service */}
              <div className="mt-4 sm:mt-5 mb-3 flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
                  Select a service
                </h2>
                {showMoreCategories && (
                  <button
                    type="button"
                    onClick={() => setShowMoreCategories(false)}
                    className="text-[11px] text-purple-700 font-bold hover:underline cursor-pointer"
                  >
                    Collapse view
                  </button>
                )}
              </div>

              {/* 3x3 Category Grid (Direct from Video 0:05-0:10) */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {primaryCategories.map((cat) => {
                  const isSelected = cat.id === activeCategoryId;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => onSelectCategory(cat.id)}
                      className={`group relative flex flex-col items-center justify-between p-2.5 sm:p-3 rounded-2xl border text-center transition-all cursor-pointer min-h-[96px] sm:min-h-[108px] ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50/80 shadow-xs ring-2 ring-purple-500/20'
                          : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/70 shadow-2xs'
                      }`}
                    >
                      {/* Top Badge if any */}
                      {cat.badge && (
                        <span
                          className={`absolute top-1.5 right-1.5 text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                            cat.badgeColor || 'bg-rose-500 text-white'
                          }`}
                        >
                          {cat.badge}
                        </span>
                      )}

                      {/* Thumbnail Image */}
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 shrink-0 group-hover:scale-105 transition-transform">
                        {cat.image ? (
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => handleImageError(e, 'salon')}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-purple-600">
                            <Sparkles className="w-5 h-5" />
                          </div>
                        )}
                      </div>

                      {/* Category Name */}
                      <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight mt-1.5 line-clamp-2">
                        {cat.name}
                      </span>
                    </button>
                  );
                })}

                {/* 9th Grid Item: "+2 more" Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowMoreCategories(!showMoreCategories)}
                  className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl border border-dashed text-center transition-all cursor-pointer min-h-[96px] sm:min-h-[108px] ${
                    showMoreCategories
                      ? 'border-purple-600 bg-purple-50/60 text-purple-900'
                      : 'border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center mb-1 text-slate-700 group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors">
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        showMoreCategories ? 'rotate-180 text-purple-700' : ''
                      }`}
                    />
                  </div>
                  <span className="text-xs font-black text-slate-900">
                    {showMoreCategories ? 'Less' : `+${extraCategories.length} more`}
                  </span>
                  <span className="text-[9px] text-slate-500">
                    {showMoreCategories ? 'Hide' : 'Threading, Detan'}
                  </span>
                </button>
              </div>

              {/* Expanded Extra Categories if "+2 more" is opened */}
              {showMoreCategories && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mt-2.5 pt-2.5 border-t border-slate-100 animate-in fade-in duration-200">
                  {extraCategories.map((cat) => {
                    const isSelected = cat.id === activeCategoryId;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => onSelectCategory(cat.id)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          {cat.image ? (
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                              onError={(e) => handleImageError(e, 'salon')}
                            />
                          ) : (
                            <Sparkles className="w-4 h-4 text-purple-600 m-auto" />
                          )}
                        </div>
                        <span className="text-xs font-bold leading-tight">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ================================================================ */}
          {/* RIGHT COLUMN: FOREST ESSENTIALS LUXURY VIDEO BANNER / CAROUSEL */}
          {/* ================================================================ */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative w-full h-64 sm:h-72 lg:h-full min-h-[260px] rounded-3xl overflow-hidden shadow-lg border border-amber-900/30 group">
              {/* Background Image with Dark Golden Gradient */}
              <img
                src={currentSlide.bgImage}
                alt={currentSlide.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => handleImageError(e, 'facial')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />

              {/* Top Luxury Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentSlide.badge}</span>
              </div>

              {/* Center Interactive Play Button */}
              <button
                type="button"
                onClick={onOpenVideoModal}
                className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 text-slate-900 hover:bg-amber-400 hover:text-black flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 cursor-pointer z-10 group/btn"
                aria-label="Play video showcase"
              >
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1 text-amber-950 transition-colors" />
                <span className="sr-only">Watch Video</span>
              </button>

              {/* Carousel Left / Right Navigation Arrows */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevSlide();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all z-20 cursor-pointer backdrop-blur-xs"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextSlide();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all z-20 cursor-pointer backdrop-blur-xs"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Bottom Content & Details */}
              <div className="absolute bottom-4 inset-x-4 z-10 text-white">
                <div className="text-[10px] font-black tracking-widest text-amber-400 uppercase">
                  {currentSlide.title}
                </div>
                <h3 className="text-base sm:text-lg font-black text-amber-100 tracking-tight leading-snug">
                  {currentSlide.tagline}
                </h3>
                <p className="text-xs text-slate-200/90 line-clamp-1 mt-0.5">
                  {currentSlide.subtitle}
                </p>

                {/* Progress Indicators */}
                <div className="flex items-center gap-1.5 mt-2.5">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlide(idx);
                      }}
                      className={`h-1 rounded-full transition-all cursor-pointer ${
                        idx === activeSlide ? 'w-6 bg-amber-400' : 'w-2 bg-white/40'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
