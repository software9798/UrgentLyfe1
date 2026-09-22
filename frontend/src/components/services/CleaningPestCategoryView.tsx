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
  Calendar,
  Layers,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
import { ServiceItem, CartItem } from '../../types';
import {
  CleaningPestCategoryConfig,
  ALL_CLEANING_PEST_CONFIGS,
  BATHROOM_CLEANING_CONFIG,
  KITCHEN_CLEANING_CONFIG,
} from '../../data/cleaningPestData';
import { handleImageError } from '../../utils/imageFallback';

interface CleaningPestCategoryViewProps {
  initialCategoryId?: string;
  cartItems: CartItem[];
  onAddToCart: (service: ServiceItem, isUrgent?: boolean) => void;
  onUpdateCartQuantity: (serviceId: string, delta: number) => void;
  onBookNow: (service: ServiceItem, isUrgent?: boolean) => void;
  onSelectServiceDetail: (service: ServiceItem) => void;
  onClose: () => void;
  selectedCityName: string;
  selectedLocality: string;
}

export const CleaningPestCategoryView: React.FC<CleaningPestCategoryViewProps> = ({
  initialCategoryId = 'bathroom-cleaning',
  cartItems,
  onAddToCart,
  onUpdateCartQuantity,
  onBookNow,
  onSelectServiceDetail,
  onClose,
  selectedCityName,
  selectedLocality,
}) => {
  // Current active main category (e.g. bathroom-cleaning, kitchen-cleaning, etc.)
  const [currentCategoryId, setCurrentCategoryId] = useState<string>(initialCategoryId);
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);

  // Sync initialCategoryId
  useEffect(() => {
    if (initialCategoryId && ALL_CLEANING_PEST_CONFIGS[initialCategoryId]) {
      setCurrentCategoryId(initialCategoryId);
    }
  }, [initialCategoryId]);

  // Current configuration
  const currentConfig: CleaningPestCategoryConfig = useMemo(() => {
    return ALL_CLEANING_PEST_CONFIGS[currentCategoryId] || BATHROOM_CLEANING_CONFIG;
  }, [currentCategoryId]);

  // Set default active section whenever category changes
  useEffect(() => {
    if (currentConfig.subServices.length > 0) {
      setActiveSectionId(currentConfig.subServices[0].id);
    }
  }, [currentConfig]);

  // Cart helper: mapping serviceId to quantity
  const cartMap = useMemo(() => {
    const map = new Map<string, number>();
    cartItems.forEach((item) => {
      map.set(item.service.id, item.quantity);
    });
    return map;
  }, [cartItems]);

  // Cart summary for right sidebar
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
      const navOffset = 90;
      const elementPosition = elem.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  // Video Ref
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsVideoPlaying(true);
      }
    }
  };

  return (
    <div id="cleaning-pest-category-page" className="min-h-screen bg-[#fcfcfd] pb-24 text-slate-900">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER (Matching UrgentLyfe navigation bar in video 00:08 / 00:26) */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Back button + UrgentLyfe brand logo */}
          <div className="flex items-center gap-3">
            <button
              id="back-from-cleaning-pest-btn"
              onClick={onClose}
              className="p-1.5 -ml-1 rounded-xl hover:bg-slate-100 text-slate-800 transition-colors cursor-pointer"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* UrgentLyfe logo text badge */}
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={onClose}>
              <span className="bg-black text-white font-extrabold text-[13px] px-1.5 py-0.5 rounded tracking-tight">
                UL
              </span>
              <span className="font-black text-slate-900 text-base sm:text-lg tracking-tight hidden xs:inline-block">
                UrgentLyfe
              </span>
            </div>
          </div>

          {/* Center: Locality Selector */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-full max-w-[280px] truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="font-semibold text-slate-900 truncate">
              {selectedLocality ? `${selectedLocality}, ${selectedCityName}` : selectedCityName}
            </span>
          </div>

          {/* Right: Search in Category input */}
          <div className="flex items-center gap-3 flex-1 sm:flex-initial justify-end">
            <div className="relative w-full max-w-[240px] sm:max-w-[280px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search in ${currentConfig.title}`}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100/80 border border-transparent focus:border-slate-300 rounded-full focus:outline-hidden focus:bg-white transition-all text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Cart trigger button */}
            <button
              onClick={() => {
                const cartElem = document.getElementById('cleaning-pest-cart-summary');
                cartElem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative p-2 rounded-xl text-slate-700 hover:text-black hover:bg-slate-100 transition-colors cursor-pointer"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartSummary.count > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale-in">
                  {cartSummary.count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Sub-category Quick Navigation Switcher Pills */}
        <div className="border-t border-slate-100 bg-[#fbfbfb] px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto scrollbar-none flex items-center gap-2">
          {[
            { id: 'bathroom-cleaning', label: 'Bathroom Cleaning' },
            { id: 'kitchen-cleaning', label: 'Kitchen cleaning' },
            { id: 'living-bedroom-cleaning', label: 'Living & Bedroom' },
            { id: 'full-home-cleaning', label: 'Full Home / Rooms' },
            { id: 'termite-control', label: 'Termite Control' },
            { id: 'leak-gap-sealing', label: 'Leak & gap sealing' },
            { id: 'tile-grouting', label: 'Tile Grouting & Seal' },
          ].map((catTab) => {
            const isActive = currentCategoryId === catTab.id;
            return (
              <button
                key={catTab.id}
                onClick={() => {
                  setCurrentCategoryId(catTab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200/80'
                }`}
              >
                {catTab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. CATEGORY HEADER + HERO (Matching video 00:08 & 00:26)                  */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              {currentConfig.title}
            </h1>
            <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-slate-600 font-medium">
              <div className="flex items-center gap-1 font-bold text-slate-900 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>{currentConfig.rating}</span>
              </div>
              <span className="text-slate-400">•</span>
              <span className="font-semibold text-slate-700">{currentConfig.bookingsCount}</span>
            </div>
          </div>

          {/* Earliest Slot indicator with green pulsing dot */}
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Earliest slot:</span>
            <span className="font-bold text-emerald-950">{currentConfig.earliestSlot}</span>
          </div>
        </div>

        {/* Hero Video Player for Kitchen Cleaning (Matching video 00:33 - 00:35) */}
        {currentConfig.hasVideoPlayer ? (
          <div className="mt-6 rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 relative shadow-md aspect-21/9 max-h-[360px] group border border-slate-800">
            <video
              ref={videoRef}
              src={currentConfig.videoSrc}
              poster={currentConfig.videoPoster}
              muted={isVideoMuted}
              loop
              playsInline
              className="w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-opacity"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

            {/* Play / Pause central button */}
            <button
              onClick={toggleVideoPlay}
              className="absolute inset-0 flex items-center justify-center m-auto w-16 h-16 rounded-full bg-white/90 hover:bg-white text-slate-950 shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
              aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
            >
              {isVideoPlaying ? (
                <Pause className="w-7 h-7 fill-slate-950" />
              ) : (
                <Play className="w-7 h-7 fill-slate-950 ml-1" />
              )}
            </button>

            {/* Bottom video captions */}
            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white text-xs sm:text-sm">
              <div>
                <p className="font-black text-white text-base sm:text-lg tracking-tight drop-shadow-sm">
                  {currentConfig.videoTitle || 'Steam Degreasing & Filter Scrub'}
                </p>
                <p className="text-slate-300 text-xs sm:text-sm font-medium">
                  {currentConfig.videoSubtitle || 'High-temperature steam dislodges burnt oil and stubborn carbon'}
                </p>
              </div>

              {/* Mute/Unmute */}
              <button
                onClick={() => setIsVideoMuted(!isVideoMuted)}
                className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
                title={isVideoMuted ? 'Unmute' : 'Mute'}
              >
                {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ) : currentConfig.heroBanner ? (
          /* Bathroom Cleaning Hero Banner (Matching video 00:08 - 00:10) */
          <div className="mt-6 rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 relative shadow-md h-48 sm:h-64 border border-slate-200">
            <img
              src={currentConfig.heroBanner.image}
              alt={currentConfig.heroBanner.heading}
              className="w-full h-full object-cover opacity-45"
              referrerPolicy="no-referrer"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-transparent flex flex-col justify-center px-6 sm:px-12 text-white">
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 mb-2">
                UrgentLyfe Best Value
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight max-w-xl text-white">
                {currentConfig.heroBanner.heading}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md">
                {currentConfig.heroBanner.subtitle}
              </p>
            </div>
          </div>
        ) : null}
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN 3-COLUMN LAYOUT: Left Nav | Center Services | Right Cart/Promise  */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ------------------------------------------------------------------- */}
          {/* COLUMN 1: "Select a service" (Sticky Left Sidebar)                  */}
          {/* ------------------------------------------------------------------- */}
          <aside className="lg:col-span-3 space-y-3 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-400 mb-3 px-2">
                Select a service
              </h3>

              <nav className="space-y-1.5" aria-label="Service Sub-categories">
                {currentConfig.subServices.map((sub) => {
                  const isActive = activeSectionId === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => handleScrollToSection(sub.id)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-slate-900 text-white font-bold shadow-xs'
                          : 'hover:bg-slate-100 text-slate-700 font-semibold'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200/60 p-1">
                        <img
                          src={sub.iconImage}
                          alt={sub.name}
                          className="w-full h-full object-cover rounded"
                          referrerPolicy="no-referrer"
                          onError={handleImageError}
                        />
                      </div>
                      <span className="text-xs sm:text-sm leading-snug line-clamp-2">
                        {sub.name}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ------------------------------------------------------------------- */}
          {/* COLUMN 2: Center Services Feed (matching video lists)                */}
          {/* ------------------------------------------------------------------- */}
          <main className="lg:col-span-6 space-y-10">
            {currentConfig.subServices.map((sub) => {
              // Filter services by search if user is typing
              const filteredServices = sub.services.filter((srv) => {
                if (!searchQuery.trim()) return true;
                const query = searchQuery.toLowerCase();
                return (
                  srv.title.toLowerCase().includes(query) ||
                  srv.subtitle?.toLowerCase().includes(query) ||
                  srv.description.toLowerCase().includes(query)
                );
              });

              if (filteredServices.length === 0 && searchQuery.trim()) {
                return null;
              }

              return (
                <section
                  key={sub.id}
                  id={`section-${sub.id}`}
                  className="space-y-4 scroll-mt-28"
                >
                  {/* Sub-service Heading */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        {sub.name}
                      </h2>
                      {sub.banner?.subtitle && (
                        <p className="text-xs text-slate-500 mt-0.5">
                          {sub.banner.subtitle}
                        </p>
                      )}
                    </div>

                    {sub.banner?.badge && (
                      <span className="bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                        {sub.banner.badge}
                      </span>
                    )}
                  </div>

                  {/* List of Service Cards */}
                  <div className="space-y-4">
                    {filteredServices.map((srv) => {
                      const qty = cartMap.get(srv.id) || 0;

                      return (
                        <div
                          key={srv.id}
                          className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col sm:flex-row sm:items-start justify-between gap-5"
                        >
                          {/* Left Details */}
                          <div className="flex-1 space-y-2.5">
                            {/* Badges row */}
                            <div className="flex items-center gap-2 flex-wrap">
                              {srv.tags?.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                                    tag === 'BESTSELLER' || tag === 'Subscription' || tag === 'NEW'
                                      ? 'bg-purple-100 text-purple-900'
                                      : 'bg-slate-100 text-slate-700'
                                  }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Service Title */}
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                              {srv.title}
                            </h3>

                            {/* Rating and Reviews */}
                            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                              <div className="flex items-center gap-0.5 font-bold text-slate-900">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                                <span>{srv.rating}</span>
                              </div>
                              <span className="text-slate-400">•</span>
                              <span>({(srv.reviewCount / 1000).toFixed(0)}K reviews)</span>
                            </div>

                            {/* Price and Duration */}
                            <div className="flex items-baseline gap-2 pt-0.5">
                              <span className="text-base sm:text-lg font-black text-slate-900">
                                Starts at ₹{srv.price}
                              </span>
                              {srv.originalPrice && (
                                <span className="text-xs text-slate-400 line-through">
                                  ₹{srv.originalPrice}
                                </span>
                              )}
                              {srv.durationMinutes && (
                                <span className="text-xs text-slate-500 font-medium ml-1">
                                  • {srv.durationMinutes} mins
                                </span>
                              )}
                            </div>

                            {/* Bullet Point Features from Video */}
                            {srv.includes && srv.includes.length > 0 && (
                              <ul className="space-y-1 pt-1.5 text-xs text-slate-600">
                                {srv.includes.slice(0, 2).map((inc, i) => (
                                  <li key={i} className="flex items-start gap-1.5">
                                    <span className="text-slate-400">•</span>
                                    <span>{inc}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* View Details clickable text */}
                            <div className="pt-2">
                              <button
                                type="button"
                                onClick={() => onSelectServiceDetail(srv)}
                                className="text-xs font-bold text-slate-900 hover:text-indigo-600 underline underline-offset-2 transition-colors cursor-pointer"
                              >
                                View details
                              </button>
                            </div>
                          </div>

                          {/* Right Image + Add Button Container */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0">
                            {/* Service Image */}
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-2xs relative">
                              <img
                                src={srv.image}
                                alt={srv.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                referrerPolicy="no-referrer"
                                onError={handleImageError}
                              />
                            </div>

                            {/* Add / Quantity Button */}
                            {qty === 0 ? (
                              <button
                                onClick={() => onAddToCart(srv)}
                                className="w-24 sm:w-28 py-2 bg-white hover:bg-slate-50 text-indigo-700 font-extrabold text-xs rounded-xl border border-indigo-200 shadow-2xs hover:shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <span>Add</span>
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <div className="w-24 sm:w-28 py-1.5 bg-slate-900 text-white rounded-xl flex items-center justify-between px-2.5 shadow-sm">
                                <button
                                  onClick={() => onUpdateCartQuantity(srv.id, -1)}
                                  className="p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition-colors cursor-pointer"
                                  title="Decrease quantity"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-xs font-extrabold">{qty}</span>
                                <button
                                  onClick={() => onUpdateCartQuantity(srv.id, 1)}
                                  className="p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition-colors cursor-pointer"
                                  title="Increase quantity"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </main>

          {/* ------------------------------------------------------------------- */}
          {/* COLUMN 3: Right Sidebar (UrgentLyfe Promise & Live Cart Widget)     */}
          {/* ------------------------------------------------------------------- */}
          <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-24">
            {/* UrgentLyfe Promise Box (Exact layout from video 00:15 / 00:27) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <span className="bg-slate-900 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                  UL
                </span>
                <span>UrgentLyfe Promise</span>
              </h3>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] shrink-0" />
                  <span className="font-semibold">Verified Professionals</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] shrink-0" />
                  <span className="font-semibold">Hassle Free Booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] shrink-0" />
                  <span className="font-semibold">Transparent Pricing</span>
                </div>
              </div>
            </div>

            {/* Cart Widget */}
            <div
              id="cleaning-pest-cart-summary"
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-slate-800" />
                  <h4 className="text-sm font-bold text-slate-900">Your Cart</h4>
                </div>
                {cartSummary.count > 0 && (
                  <span className="text-xs bg-slate-100 font-bold px-2 py-0.5 rounded-full text-slate-700">
                    {cartSummary.count} {cartSummary.count === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>

              {cartSummary.count === 0 ? (
                <div className="text-center py-6 text-slate-400">
                  <p className="text-xs font-medium">No items in your cart</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Select services to see price breakdowns & discounts
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                    {cartItems.map((item) => (
                      <div
                        key={item.service.id}
                        className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50"
                      >
                        <div className="flex-1 pr-2">
                          <p className="font-semibold text-slate-900 truncate">
                            {item.service.title}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            ₹{item.service.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-100 px-1.5 py-0.5 rounded-md">
                          <button
                            onClick={() => onUpdateCartQuantity(item.service.id, -1)}
                            className="p-0.5 hover:text-black text-slate-600 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-[11px] min-w-[12px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateCartQuantity(item.service.id, 1)}
                            className="p-0.5 hover:text-black text-slate-600 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing subtotal */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-700">Total amount</span>
                    <span className="font-black text-slate-950 text-base">
                      ₹{cartSummary.total}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => {
                      if (cartItems.length > 0) {
                        onBookNow(cartItems[0].service);
                      }
                    }}
                    className="w-full py-2.5 bg-black hover:bg-neutral-900 text-white font-bold text-xs rounded-xl shadow-sm transition-all active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
