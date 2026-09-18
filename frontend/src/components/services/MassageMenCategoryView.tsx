import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Star,
  Clock,
  Check,
  ShieldCheck,
  Plus,
  Minus,
  Sparkles,
  Search,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  MapPin,
  ShoppingBag,
  Zap,
  Info,
} from 'lucide-react';
import { ServiceItem, CartItem } from '../../types';
import { MASSAGE_MEN_SECTIONS, MASSAGE_MEN_SERVICES } from '../../data/massageMenData';
import { handleImageError } from '../../utils/imageFallback';

interface MassageMenCategoryViewProps {
  cartItems: CartItem[];
  onAddToCart: (service: ServiceItem, isUrgent?: boolean) => void;
  onUpdateCartQuantity: (serviceId: string, delta: number) => void;
  onBookNow: (service: ServiceItem, isUrgent?: boolean) => void;
  onSelectServiceDetail: (service: ServiceItem) => void;
  onClose: () => void;
  selectedCityName: string;
  selectedLocality: string;
}

export const MassageMenCategoryView: React.FC<MassageMenCategoryViewProps> = ({
  cartItems,
  onAddToCart,
  onUpdateCartQuantity,
  onBookNow,
  onSelectServiceDetail,
  onClose,
  selectedCityName,
  selectedLocality,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('pain-relief');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);

  // Cart helper: mapping serviceId to quantity
  const cartMap = useMemo(() => {
    const map = new Map<string, number>();
    cartItems.forEach((item) => {
      map.set(item.service.id, item.quantity);
    });
    return map;
  }, [cartItems]);

  // Total cart summary for right sidebar
  const cartSummary = useMemo(() => {
    let count = 0;
    let total = 0;
    cartItems.forEach((item) => {
      count += item.quantity;
      total += (item.service.price || 0) * item.quantity;
    });
    return { count, total };
  }, [cartItems]);

  // Scroll to section handler
  const handleScrollToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    const elem = document.getElementById(`section-${sectionId}`);
    if (elem) {
      const yOffset = -90;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Observe active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = MASSAGE_MEN_SECTIONS.map((sec) => ({
        id: sec.id,
        el: document.getElementById(`section-${sec.id}`),
      }));

      const scrollPosition = window.scrollY + 140;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveSectionId(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtered sections if search query is provided
  const displayedSections = useMemo(() => {
    if (!searchQuery.trim()) return MASSAGE_MEN_SECTIONS;
    const q = searchQuery.toLowerCase();
    return MASSAGE_MEN_SECTIONS.map((sec) => {
      const filtered = sec.services.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.subtitle.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q)
      );
      return { ...sec, services: filtered };
    }).filter((sec) => sec.services.length > 0);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 pb-28">
      {/* 1. TOP STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Back button & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Back to Services"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider uppercase text-indigo-600">
                  Urban Company
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-bold text-slate-600">Men's Care</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3 h-3 text-indigo-600" />
                <span className="font-semibold text-slate-700 truncate max-w-[200px] sm:max-w-xs">
                  {selectedLocality ? `${selectedLocality}, ${selectedCityName}` : selectedCityName}
                </span>
              </div>
            </div>
          </div>

          {/* Search bar matching video "Search in Massage for Men" */}
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in Massage for Men"
                className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Quick Cart Pill on mobile / header */}
          {cartSummary.count > 0 && (
            <button
              onClick={() => {
                const first = cartItems[0]?.service;
                if (first) onBookNow(first);
              }}
              className="flex items-center gap-2 bg-slate-950 text-white px-3.5 py-1.5 rounded-full text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{cartSummary.count}</span>
              <span className="text-slate-400">|</span>
              <span className="text-emerald-400 font-black">₹{cartSummary.total}</span>
            </button>
          )}
        </div>

        {/* Mobile Search input */}
        <div className="sm:hidden px-4 pb-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in Massage for Men"
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* 2. MAIN 3-COLUMN LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* =========================================================================
              LEFT COLUMN: Header Meta + "Select a service" Subcategory Selector (Cols 1-3)
              ========================================================================= */}
          <div className="lg:col-span-3 lg:sticky lg:top-20 space-y-6">
            {/* Category Meta Card */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Massage for Men
              </h1>

              <div className="flex items-center gap-3 mt-2 flex-wrap">
                {/* Rating Badge */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-0.5 bg-amber-50 text-amber-900 border border-amber-200/80 px-1.5 py-0.5 rounded-md">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>4.84</span>
                  </span>
                  <span className="text-slate-500">(2.9 M bookings)</span>
                </div>

                {/* Earliest Badge (matching video: "Earliest / Fri, 7:00 AM") */}
                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <Clock className="w-3 h-3 text-emerald-600" />
                  <span>Earliest: Today, 7:00 PM</span>
                </div>
              </div>
            </div>

            {/* Subcategory Picker: "Select a service" (matching video 00:07 - 00:08) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2.5">
                Select a service
              </p>

              <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-1 gap-2">
                {MASSAGE_MEN_SECTIONS.map((sec) => {
                  const isActive = activeSectionId === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => handleScrollToSection(sec.id)}
                      className={`flex flex-col lg:flex-row items-center gap-2 p-2 rounded-xl text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200/50 bg-slate-100">
                        <img
                          src={sec.iconImage}
                          alt={sec.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => handleImageError(e, 'spa')}
                        />
                      </div>
                      <span
                        className={`text-xs font-bold text-center lg:text-left line-clamp-1 ${
                          isActive ? 'text-white' : 'text-slate-800'
                        }`}
                      >
                        {sec.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* =========================================================================
              CENTER COLUMN: Hero Video/Player + All Service Sections (Cols 4-8 or 4-9)
              ========================================================================= */}
          <div className="lg:col-span-6 space-y-10">
            {/* HERO VIDEO BANNER (matching video 00:06 - 00:08) */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 aspect-video shadow-md group">
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80"
                alt="Massage for Men Therapy Preview"
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isVideoPlaying ? 'opacity-90' : 'opacity-80'
                }`}
                referrerPolicy="no-referrer"
                onError={(e) => handleImageError(e, 'spa')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

              {/* Central Play/Pause Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 hover:bg-white text-slate-950 flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-xs"
                  title={isVideoPlaying ? 'Pause Video' : 'Play Video'}
                >
                  {isVideoPlaying ? (
                    <Pause className="w-6 h-6 fill-slate-950 text-slate-950" />
                  ) : (
                    <Play className="w-6 h-6 fill-slate-950 text-slate-950 ml-1" />
                  )}
                </button>
              </div>

              {/* Bottom Video Controls & Info Overlay */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                <div>
                  <p className="font-black text-sm tracking-tight text-white drop-shadow-sm">
                    Urban Company Certified Therapists
                  </p>
                  <p className="text-[11px] text-slate-300 font-medium">
                    Sanitized single-use linen & specialized pressure therapy
                  </p>
                </div>

                <button
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                  className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors cursor-pointer"
                  title={isVideoMuted ? 'Unmute' : 'Mute'}
                >
                  {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Video Timeline Scrubber */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div
                  className={`h-full bg-indigo-500 transition-all duration-300 ${
                    isVideoPlaying ? 'w-2/3 animate-pulse' : 'w-1/4'
                  }`}
                />
              </div>
            </div>

            {/* SECTIONS RENDERING */}
            {displayedSections.map((section) => (
              <section
                key={section.id}
                id={`section-${section.id}`}
                className="space-y-4 pt-2 scroll-mt-24"
              >
                {/* Section Header */}
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {section.name}
                </h2>

                {/* Section Banner Card (matching video 00:09, 00:12, 00:14) */}
                {section.banner && (
                  <div className="relative rounded-2xl overflow-hidden aspect-[21/9] sm:aspect-[24/9] bg-slate-900 shadow-xs border border-slate-200/50 group">
                    <img
                      src={section.banner.image}
                      alt={section.banner.heading}
                      className="w-full h-full object-cover opacity-75 group-hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImageError(e, 'spa')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
                    <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-center max-w-sm">
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-400 mb-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Featured Therapy</span>
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-white leading-snug drop-shadow-sm">
                        {section.banner.heading}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                        {section.banner.subtitle}
                      </p>
                    </div>
                  </div>
                )}

                {/* Services List in Section */}
                <div className="space-y-4">
                  {section.services.map((service, index) => {
                    const quantity = cartMap.get(service.id) || 0;
                    const isDeepTissue = service.id === 'men-massage-deep-tissue';

                    return (
                      <React.Fragment key={service.id}>
                        {/* If this is Deep Tissue, show the middle banner "Targeted pain relief for body" as seen in video 00:11 */}
                        {isDeepTissue && (
                          <div className="relative rounded-2xl overflow-hidden aspect-[21/8] bg-slate-900 shadow-xs border border-slate-200/50 mt-4 mb-2">
                            <img
                              src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1000&q=80"
                              alt="Targeted pain relief for body"
                              className="w-full h-full object-cover opacity-70"
                              referrerPolicy="no-referrer"
                              onError={(e) => handleImageError(e, 'spa')}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
                            <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-center">
                              <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                                Targeted pain relief for body
                              </h3>
                              <p className="text-xs text-slate-300 font-medium mt-1">
                                Deep pressure • Full body knot alleviation
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Service Item Card */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col sm:flex-row gap-4 justify-between items-start">
                          {/* Left: Info & Details */}
                          <div className="flex-1 min-w-0 pr-0 sm:pr-4">
                            {/* Bestseller tag */}
                            {service.tags?.includes('BESTSELLER') && (
                              <div className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-[10px] font-black uppercase px-2 py-0.5 rounded-md mb-2">
                                <Sparkles className="w-2.5 h-2.5" />
                                <span>BESTSELLER</span>
                              </div>
                            )}

                            {/* Title */}
                            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                              {service.title}
                            </h3>

                            {/* Rating & Review count */}
                            <div className="flex items-center gap-2 mt-1">
                              <span className="flex items-center gap-0.5 text-xs font-bold text-slate-900">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                                <span>{service.rating}</span>
                              </span>
                              <span className="text-xs text-slate-500">
                                ({service.reviewCount ? (service.reviewCount >= 1000 ? `${(service.reviewCount / 1000).toFixed(0)}K` : service.reviewCount) : 0} reviews)
                              </span>
                            </div>

                            {/* Price & Duration (e.g. ₹1,199 • 45 mins) */}
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-base font-black text-slate-900">
                                {service.id.includes('deep-tissue') || service.id.includes('swedish') || service.id.includes('sports')
                                  ? `Starts at ₹${service.price}`
                                  : `₹${service.price}`}
                              </span>
                              {service.originalPrice && (
                                <span className="text-xs text-slate-400 line-through">
                                  ₹{service.originalPrice}
                                </span>
                              )}
                              <span className="text-slate-300">•</span>
                              <span className="text-xs text-slate-600 font-semibold flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span>{service.durationMinutes ? `${service.durationMinutes} mins` : 'Session'}</span>
                              </span>
                            </div>

                            {/* Inclusions or Description */}
                            <p className="text-xs text-slate-600 leading-relaxed mt-2.5 line-clamp-2">
                              {service.subtitle}
                            </p>

                            {/* Save more promo tag if applicable */}
                            {(service.id === 'men-massage-deep-tissue' ||
                              service.id === 'men-massage-swedish-stress-relief') && (
                              <p className="text-[11px] font-bold text-emerald-700 mt-1.5 flex items-center gap-1">
                                <Zap className="w-3 h-3 text-emerald-600" />
                                <span>Save more: Add a pack to unlock extra savings</span>
                              </p>
                            )}

                            {/* View details trigger */}
                            <button
                              type="button"
                              onClick={() => onSelectServiceDetail(service)}
                              className="mt-3 text-xs font-bold text-indigo-600 hover:text-indigo-800 underline decoration-indigo-200 hover:decoration-indigo-600 transition-colors cursor-pointer"
                            >
                              View details
                            </button>
                          </div>

                          {/* Right: Image thumbnail & Add button */}
                          <div className="w-full sm:w-32 flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0">
                            <div className="relative w-28 sm:w-32 h-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                              <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                                onError={(e) => handleImageError(e, 'spa')}
                              />
                            </div>

                            {/* Add Button or Quantity stepper */}
                            {quantity === 0 ? (
                              <button
                                type="button"
                                onClick={() => onAddToCart(service)}
                                className="w-24 sm:w-28 py-2 bg-white hover:bg-indigo-50/60 border-2 border-indigo-600 text-indigo-600 font-black text-xs rounded-xl shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1"
                              >
                                <span>Add</span>
                                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                              </button>
                            ) : (
                              <div className="w-24 sm:w-28 flex items-center justify-between bg-slate-900 text-white rounded-xl p-1 shadow-xs">
                                <button
                                  type="button"
                                  onClick={() => onUpdateCartQuantity(service.id, -1)}
                                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white cursor-pointer"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-xs font-black">{quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateCartQuantity(service.id, 1)}
                                  className="w-7 h-7 rounded-lg bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* =========================================================================
              RIGHT COLUMN: UC Promise Card + Sticky Cart Card (Cols 10-12)
              ========================================================================= */}
          <div className="lg:col-span-3 lg:sticky lg:top-20 space-y-4">
            {/* 1. UC Promise Card (matching video 00:09, 00:11, 00:14, 00:16) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 leading-tight">UC Promise</h4>
                  <p className="text-[10px] text-slate-500">Certified spa experience at home</p>
                </div>
              </div>

              <div className="space-y-2 pt-1 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                  <span className="font-semibold">4.5+ Rated Therapists</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                  <span className="font-semibold">Relaxation Assured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                  <span className="font-semibold">Specialized Premium Oils</span>
                </div>
              </div>
            </div>

            {/* 2. Cart Summary Box (matching video "No items in your cart") */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
              {cartSummary.count === 0 ? (
                <div className="text-center py-6 px-2 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-500">No items in your cart</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Select a therapy to see pricing, therapist availability, and slot timings.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                      Your Cart ({cartSummary.count})
                    </span>
                    <span className="text-sm font-black text-slate-900">₹{cartSummary.total}</span>
                  </div>

                  {/* Cart items list */}
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div
                        key={item.service.id}
                        className="flex items-center justify-between text-xs gap-2"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-900 truncate">{item.service.title}</p>
                          <p className="text-[10px] text-slate-500">
                            ₹{item.service.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateCartQuantity(item.service.id, -1)}
                            className="w-5 h-5 flex items-center justify-center rounded text-slate-700 hover:bg-white text-[10px]"
                          >
                            -
                          </button>
                          <span className="font-bold px-1 text-[11px]">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateCartQuantity(item.service.id, 1)}
                            className="w-5 h-5 flex items-center justify-center rounded text-slate-700 hover:bg-white text-[10px]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Checkout Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const first = cartItems[0]?.service;
                      if (first) onBookNow(first);
                    }}
                    className="w-full py-3 bg-slate-950 hover:bg-slate-800 text-white rounded-xl font-black text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-between px-4 cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <span className="text-amber-400 font-bold">₹{cartSummary.total} →</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
