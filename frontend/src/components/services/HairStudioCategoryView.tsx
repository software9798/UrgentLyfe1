import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Star,
  Clock,
  Check,
  Search,
  MapPin,
  Sparkles,
  ShieldCheck,
  ShoppingCart,
  ChevronRight,
  Plus,
  Minus,
  Play,
  Volume2,
  VolumeX,
  Heart,
  Percent,
} from 'lucide-react';
import { ServiceItem, CartItem } from '../../types';
import { handleImageError } from '../../utils/imageFallback';
import {
  HAIR_STUDIO_CONFIG,
  HAIR_STUDIO_CATEGORIES,
  HAIR_STUDIO_SERVICES,
} from '../../data/hairStudioData';
import { HairStudioOptionsModal } from './HairStudioOptionsModal';

interface HairStudioCategoryViewProps {
  cartItems: CartItem[];
  onAddToCart: (service: ServiceItem, isUrgent?: boolean) => void;
  onUpdateCartQuantity: (serviceId: string, delta: number) => void;
  onBookNow: (service: ServiceItem, isUrgent?: boolean) => void;
  onSelectServiceDetail: (service: ServiceItem) => void;
  onClose: () => void;
  selectedCityName?: string;
  selectedLocality?: string;
}

export const HairStudioCategoryView: React.FC<HairStudioCategoryViewProps> = ({
  cartItems,
  onAddToCart,
  onUpdateCartQuantity,
  onBookNow,
  onSelectServiceDetail,
  onClose,
  selectedCityName = 'Patna',
  selectedLocality = 'Fraser Road • Budh Vihar',
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('packages');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [serviceForOptions, setServiceForOptions] = useState<ServiceItem | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isConsultationMuted, setIsConsultationMuted] = useState<boolean>(true);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleSelectCategory = (catId: string) => {
    setActiveCategoryId(catId);
    const targetElement = sectionRefs.current[catId];
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Hair studio specific cart items
  const hairCartItems = cartItems.filter(
    (item) =>
      item.service.categoryId === 'hair-studio-women' ||
      item.service.id.startsWith('hair-')
  );

  const hairCartTotal = hairCartItems.reduce(
    (acc, item) => acc + item.service.price * item.quantity,
    0
  );

  const getItemQuantity = (serviceId: string) => {
    const direct = cartItems.find((item) => item.service.id === serviceId);
    if (direct) return direct.quantity;
    const matchingVariants = cartItems.filter(
      (item) =>
        item.service.id.startsWith(`${serviceId}-`) ||
        item.service.id.startsWith(`${serviceId}_`)
    );
    if (matchingVariants.length > 0) {
      return matchingVariants.reduce((sum, item) => sum + item.quantity, 0);
    }
    return 0;
  };

  return (
    <div id="hair-studio-category-view" className="min-h-screen bg-[#fcfcfd] pb-24 text-slate-900">
      {/* 1. TOP STICKY BAR: BACK, ADDRESS, SEARCH */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onClose}
              className="p-2 -ml-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Address bar matching video */}
            <div className="flex items-center gap-1.5 text-xs text-slate-700 truncate max-w-xs sm:max-w-md">
              <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="font-semibold text-slate-900 truncate">
                {selectedLocality || 'S/9, Fraser Road • Budh Vihar'}
              </span>
              <span className="text-slate-400">, {selectedCityName}</span>
            </div>
          </div>

          {/* Search bar matching video */}
          <div className="relative w-64 sm:w-80 md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search in Hair Studio for Women"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-600 focus:bg-white transition-all placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 2. HERO HEADER: TITLE, RATING, GUIDE BANNER + SELECT A SERVICE + HERO VIDEO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8">
          {/* Left: Title + Guide banner + Category Selector */}
          <div className="lg:col-span-6 xl:col-span-5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {HAIR_STUDIO_CONFIG.title}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex items-center gap-1 bg-purple-50 text-purple-900 text-xs font-bold px-2 py-0.5 rounded">
                <Star className="w-3.5 h-3.5 fill-purple-700 text-purple-700" />
                {HAIR_STUDIO_CONFIG.rating}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                ({HAIR_STUDIO_CONFIG.reviewsCount})
              </span>
            </div>

            {/* UrgentLyfe Guide - Professionals and Hairstyles > matching video at 00:05 */}
            <div
              onClick={() => setShowGuideModal(true)}
              className="mt-4 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer flex items-center justify-between transition-colors shadow-xs group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                  <Heart className="w-4 h-4 fill-purple-700 text-purple-700" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-purple-900">
                  {HAIR_STUDIO_CONFIG.guideBanner.title}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
            </div>

            {/* "Select a service" Label */}
            <div className="mt-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Select a service
              </h2>

              {/* 8 Category Items Grid matching video 00:06-00:08 */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {HAIR_STUDIO_CATEGORIES.map((cat) => {
                  const isActive = activeCategoryId === cat.id;
                  const isPackages = cat.id === 'packages';

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSelectCategory(cat.id)}
                      className={`flex flex-col items-center p-2 rounded-xl border transition-all text-center group ${
                        isActive
                          ? 'border-purple-600 bg-purple-50/50 shadow-xs ring-1 ring-purple-600'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden mb-1.5 bg-slate-100 flex-shrink-0 relative flex items-center justify-center">
                        {isPackages ? (
                          // Green/teal bookmark ribbon icon for Packages as seen in video
                          <div className="w-full h-full bg-[#e8f6f5] flex items-center justify-center text-[#168a7f]">
                            <svg
                              className="w-7 h-7"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M5 3C3.89543 3 3 3.89543 3 5V21C3 21.5523 3.44772 22 4 22C4.2435 22 4.4789 21.9109 4.6617 21.7481L12 15.2263L19.3383 21.7481C19.5211 21.9109 19.7565 22 20 22C20.5523 22 21 21.5523 21 21V5C21 3.89543 20.1046 3 19 3H5Z" />
                            </svg>
                          </div>
                        ) : (
                          <img
                            src={cat.thumbnailUrl}
                            alt={cat.name}
                            onError={handleImageError}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <span
                        className={`text-[11px] sm:text-xs font-medium leading-tight ${
                          isActive ? 'text-purple-950 font-bold' : 'text-slate-800'
                        }`}
                      >
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Hero Video Preview Card with UrgentLyfe logo & play button matching video 00:06-00:08 */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-sm aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/9] bg-slate-900 group">
              <img
                src={HAIR_STUDIO_CONFIG.heroVideo.videoThumbnail}
                alt={HAIR_STUDIO_CONFIG.heroVideo.title}
                onError={handleImageError}
                className="w-full h-full object-cover object-center opacity-85 group-hover:scale-102 transition-transform duration-700"
              />

              {/* UrgentLyfe Logo Badge in top right */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-900 font-extrabold text-xs px-2.5 py-1 rounded-md shadow-md tracking-wider flex items-center gap-1">
                <span>UrgentLyfe</span>
              </div>

              {/* Big Play Button Overlay */}
              <button
                type="button"
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform"
                title="Play Hair Studio showcase video"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 text-purple-950 flex items-center justify-center shadow-xl hover:bg-white transition-all pl-1">
                  <Play className="w-7 h-7 fill-purple-950" />
                </div>
              </button>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 sm:p-6 flex flex-col justify-end pointer-events-none">
                <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300 mb-1">
                  Salon At Home
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {HAIR_STUDIO_CONFIG.heroVideo.title}
                </h2>
                <p className="text-xs text-slate-200 mt-1 max-w-md">
                  {HAIR_STUDIO_CONFIG.heroVideo.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. MAIN CONTENT: SERVICES FEED (LEFT) + RIGHT STICKY (COUPON, PROMISE, CART) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Services Feed (Col 8) */}
          <div className="lg:col-span-8 space-y-10">
            {HAIR_STUDIO_CATEGORIES.map((category) => {
              // Filter services if search query is active
              const filteredServices = category.services.filter((s) => {
                if (!searchQuery) return true;
                const q = searchQuery.toLowerCase();
                return (
                  s.title.toLowerCase().includes(q) ||
                  s.subtitle?.toLowerCase().includes(q) ||
                  s.description?.toLowerCase().includes(q)
                );
              });

              if (searchQuery && filteredServices.length === 0) {
                return null;
              }

              const isPackagesSection = category.id === 'packages';
              const isCutTrimSection = category.id === 'cut-trim';
              const isHairColourSection = category.id === 'hair-colour';

              return (
                <div
                  key={category.id}
                  ref={(el) => {
                    sectionRefs.current[category.id] = el;
                  }}
                  id={`hair-sec-${category.id}`}
                  className="scroll-mt-20"
                >
                  {/* Category Header */}
                  <div className="mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {category.name}
                    </h3>
                  </div>

                  {/* Cut & Trim Video Preview Banner matching video 00:22 */}
                  {isCutTrimSection && !searchQuery && (
                    <div className="relative rounded-2xl overflow-hidden mb-6 bg-slate-900 aspect-[16/7] sm:aspect-[21/7] shadow-xs group">
                      <img
                        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80"
                        alt="Cut & Trim precision shears"
                        onError={handleImageError}
                        className="w-full h-full object-cover opacity-75"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 text-purple-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform pl-0.5">
                          <Play className="w-5 h-5 fill-purple-950" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Hair Colour "Get expert consultation" video card matching video 00:30 */}
                  {isHairColourSection && !searchQuery && (
                    <div className="relative rounded-2xl overflow-hidden mb-6 bg-slate-900 aspect-[16/7] sm:aspect-[21/7] shadow-xs group">
                      <img
                        src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1000&q=80"
                        alt="Get expert consultation"
                        onError={handleImageError}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent flex items-center justify-between p-6">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                            Custom Shades
                          </span>
                          <h4 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                            Get expert consultation
                          </h4>
                          <p className="text-xs text-slate-200 mt-1">
                            Find your ideal undertone before applying global or fashion tones
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setIsConsultationMuted(!isConsultationMuted)}
                            className="p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm transition-all"
                            title="Toggle audio"
                          >
                            {isConsultationMuted ? (
                              <VolumeX className="w-4 h-4" />
                            ) : (
                              <Volume2 className="w-4 h-4" />
                            )}
                          </button>
                          <div className="w-11 h-11 rounded-full bg-white text-purple-950 flex items-center justify-center shadow-lg group-hover:scale-105 transition-all pl-0.5">
                            <Play className="w-5 h-5 fill-purple-950" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Services List */}
                  <div className="space-y-6 divide-y divide-slate-100">
                    {filteredServices.map((service, index) => {
                      const qty = getItemQuantity(service.id);
                      const hasOptions = (service.optionsCount ?? 0) > 1;

                      // Discount tag calculation for packages (10% OFF / 15% OFF)
                      const discountTag = service.tags?.find((t) => t.includes('OFF'));

                      return (
                        <div
                          key={service.id}
                          className={`pt-6 ${index === 0 ? 'pt-0' : ''} flex flex-col sm:flex-row items-start justify-between gap-6 group`}
                        >
                          {/* Left Details */}
                          <div className="flex-1 min-w-0">
                            {/* Badges: VALUE-SAVER or BESTSELLER matching video */}
                            <div className="flex items-center gap-2 mb-1.5">
                              {service.badge && (
                                <span className="text-[10px] sm:text-xs font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-900 uppercase tracking-wide">
                                  {service.badge}
                                </span>
                              )}
                            </div>

                            {/* Service Title */}
                            <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-purple-950 transition-colors">
                              {service.title}
                            </h4>

                            {/* Rating & Reviews */}
                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                              <span className="flex items-center gap-1 font-bold text-slate-800">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                {service.rating}
                              </span>
                              <span>•</span>
                              <span>
                                {service.reviewCount
                                  ? `${Math.round(service.reviewCount / 1000)}K reviews`
                                  : '10K reviews'}
                              </span>
                            </div>

                            {/* Price & Duration */}
                            <div className="flex items-baseline gap-2 mt-2">
                              <span className="text-sm sm:text-base font-extrabold text-slate-900">
                                {hasOptions && !isPackagesSection ? 'Starts at ' : ''}₹{service.price}
                              </span>
                              {service.originalPrice && service.originalPrice > service.price && (
                                <span className="text-xs text-slate-400 line-through">
                                  ₹{service.originalPrice}
                                </span>
                              )}
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs text-slate-600 font-medium">
                                {service.durationMinutes >= 60
                                  ? `${Math.floor(service.durationMinutes / 60)} hr ${
                                      service.durationMinutes % 60 > 0
                                        ? `${service.durationMinutes % 60} mins`
                                        : ''
                                    }`
                                  : `${service.durationMinutes} mins`}
                              </span>
                            </div>

                            {/* Bullet Points */}
                            {service.includes && service.includes.length > 0 && (
                              <ul className="mt-3 space-y-1 text-xs text-slate-600">
                                {service.includes.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-slate-400 font-bold">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Links: "Edit your package" for packages, or "View details" for others */}
                            <div className="mt-3.5 flex items-center gap-4">
                              {isPackagesSection ? (
                                <button
                                  type="button"
                                  onClick={() => setServiceForOptions(service)}
                                  className="text-xs font-bold text-purple-700 hover:text-purple-900 underline underline-offset-4 cursor-pointer"
                                >
                                  Edit your package
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (hasOptions) {
                                      setServiceForOptions(service);
                                    } else {
                                      onSelectServiceDetail(service);
                                    }
                                  }}
                                  className="text-xs font-bold text-purple-700 hover:text-purple-900 hover:underline cursor-pointer"
                                >
                                  {hasOptions ? 'View details & options' : 'View details'}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Right: Discount Badge + Image + Add Button */}
                          <div className="relative flex-shrink-0 w-full sm:w-36 flex flex-col items-center">
                            {/* In Packages, some cards show 10% / 15% OFF badge above or on top of Add */}
                            {discountTag && (
                              <div className="mb-2 w-full flex justify-end sm:justify-center">
                                <span className="text-xs font-black text-slate-900 border border-slate-300 rounded px-2 py-0.5 bg-slate-50 uppercase tracking-tight">
                                  {discountTag}
                                </span>
                              </div>
                            )}

                            {/* Image (for non-package cards or package cards with image) */}
                            {service.image && (
                              <div className="w-full h-28 sm:w-36 sm:h-28 rounded-xl overflow-hidden bg-slate-100 shadow-xs border border-slate-100">
                                <img
                                  src={service.image}
                                  alt={service.title}
                                  onError={handleImageError}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}

                            {/* Add / Quantity Button */}
                            <div className={`${service.image ? '-mt-4 z-10' : 'mt-1'} flex flex-col items-center`}>
                              {qty > 0 ? (
                                hasOptions ? (
                                  <div className="flex flex-col items-center">
                                    <button
                                      type="button"
                                      onClick={() => setServiceForOptions(service)}
                                      className="flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 border-2 border-purple-600 text-purple-700 px-3 py-1 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                                    >
                                      <span>{qty} in cart</span>
                                      <span className="text-[10px] text-purple-900 font-extrabold underline ml-0.5">Edit</span>
                                    </button>
                                    <span className="text-[10px] text-slate-500 font-medium mt-1">
                                      {service.optionsCount || 2} options available
                                    </span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-3 bg-white border border-purple-600 text-purple-700 px-3 py-1.5 rounded-lg shadow-md text-xs font-bold">
                                    <button
                                      type="button"
                                      onClick={() => onUpdateCartQuantity(service.id, -1)}
                                      className="hover:text-purple-950 p-0.5 cursor-pointer"
                                    >
                                      <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span>{qty}</span>
                                    <button
                                      type="button"
                                      onClick={() => onUpdateCartQuantity(service.id, 1)}
                                      className="hover:text-purple-950 p-0.5 cursor-pointer"
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                )
                              ) : (
                                <div className="flex flex-col items-center">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (hasOptions) {
                                        setServiceForOptions(service);
                                      } else {
                                        onAddToCart(service);
                                      }
                                    }}
                                    className="px-6 py-1.5 bg-white border border-purple-600 text-purple-700 hover:bg-purple-50 active:scale-95 text-xs font-bold rounded-lg shadow-md transition-all uppercase tracking-wider cursor-pointer"
                                  >
                                    {hasOptions && !isPackagesSection
                                      ? `${service.optionsCount || 2} options`
                                      : 'Add'}
                                  </button>
                                  {hasOptions && (
                                    <span className="text-[10px] text-slate-500 font-medium mt-1">
                                      Customizable
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Sticky Sidebar (Col 4): Coupon, UrgentLyfe Promise & Cart */}
          <div className="lg:col-span-4 sticky top-20 space-y-5">
            {/* Offer / Coupon Card: HAIRSTUDIO25 matching video 00:10-00:30 */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50/50 rounded-2xl p-4 border border-purple-200/70 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                  <Percent className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-purple-950 tracking-wider">
                    {HAIR_STUDIO_CONFIG.coupon.code}
                  </div>
                  <div className="text-[11px] text-purple-800 font-medium">
                    {HAIR_STUDIO_CONFIG.coupon.discount}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase text-purple-700 bg-white px-2.5 py-1 rounded-full border border-purple-200 shadow-2xs">
                Applied
              </span>
            </div>

            {/* UrgentLyfe Promise Card matching video 00:11 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900">UrgentLyfe Promise</h3>
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-[10px] border border-blue-200">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <ul className="space-y-3 text-xs text-slate-700">
                {HAIR_STUDIO_CONFIG.promiseList.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cart Box matching video 00:11-00:35 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              {hairCartItems.length === 0 ? (
                <div className="py-8 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  {/* 4 dots indicator matching video */}
                  <div className="flex gap-1.5 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  </div>
                  <p className="text-xs font-semibold text-slate-500">No items in your cart</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h4 className="text-sm font-bold text-slate-900">Cart Summary</h4>
                    <span className="text-xs text-purple-700 font-semibold">
                      {hairCartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto my-3">
                    {hairCartItems.map((item) => (
                      <div key={item.service.id} className="py-2.5 flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {item.service.title}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            ₹{item.service.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 border border-slate-200 rounded px-2 py-0.5 text-xs font-bold">
                          <button
                            type="button"
                            onClick={() => onUpdateCartQuantity(item.service.id, -1)}
                            className="text-slate-500 hover:text-slate-800"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateCartQuantity(item.service.id, 1)}
                            className="text-slate-500 hover:text-slate-800"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-slate-600">Total amount</span>
                    <span className="text-base font-extrabold text-slate-900">₹{hairCartTotal}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (hairCartItems.length > 0) {
                        onBookNow(hairCartItems[0].service);
                      }
                    }}
                    className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 active:scale-98 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Book</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Options / Package Customizer Modal */}
      {serviceForOptions && (
        <HairStudioOptionsModal
          service={serviceForOptions}
          isOpen={!!serviceForOptions}
          onClose={() => setServiceForOptions(null)}
          onSelectOption={(customized) => {
            onAddToCart(customized);
          }}
          cartItems={cartItems}
          onUpdateCartQuantity={onUpdateCartQuantity}
        />
      )}

      {/* UrgentLyfe Guide Modal */}
      {showGuideModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowGuideModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-600 fill-purple-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  UrgentLyfe Guide - Professionals & Hairstyles
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-100">
                <h4 className="font-bold text-purple-950 mb-1">
                  1. Face Profile & Length Guide
                </h4>
                <p>
                  Round & Oval faces look stunning with long texturized layers or curtain bangs. Square and Heart shapes pair elegantly with soft bob cuts or feathered ends.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-1">
                  2. Skin Undertone & Shade Matching
                </h4>
                <p>
                  Warm undertones shine in honey, rich caramel, and golden brown tones. Cool undertones complement mocha, ash brown, and deep burgundy highlights.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
                <h4 className="font-bold text-emerald-950 mb-1">
                  3. Rigorous 7-Stage Stylist Certification
                </h4>
                <p>
                  Every UrgentLyfe hair artist carries minimum 5+ years of salon experience and uses sealed, sanitized professional kits and tools.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              className="mt-6 w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Explore Hairstyles
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
