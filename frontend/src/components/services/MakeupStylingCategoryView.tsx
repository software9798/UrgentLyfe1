import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Star,
  Clock,
  Check,
  Search,
  MapPin,
  ShieldCheck,
  ShoppingCart,
  ChevronDown,
  Plus,
  Minus,
  Sparkles,
} from 'lucide-react';
import { ServiceItem, CartItem } from '../../types';
import { handleImageError } from '../../utils/imageFallback';
import {
  MAKEUP_CONFIG,
  MAKEUP_CATEGORIES,
  MAKEUP_SERVICES,
  MakeupServiceItem,
} from '../../data/makeupData';
import { MakeupStylingOptionsModal } from './MakeupStylingOptionsModal';

interface MakeupStylingCategoryViewProps {
  cartItems: CartItem[];
  onAddToCart: (service: ServiceItem, isUrgent?: boolean) => void;
  onUpdateCartQuantity: (serviceId: string, delta: number) => void;
  onBookNow: (service: ServiceItem, isUrgent?: boolean) => void;
  onSelectServiceDetail: (service: ServiceItem) => void;
  onClose: () => void;
  selectedCityName?: string;
  selectedLocality?: string;
}

export const MakeupStylingCategoryView: React.FC<MakeupStylingCategoryViewProps> = ({
  cartItems,
  onAddToCart,
  onUpdateCartQuantity,
  onBookNow,
  onSelectServiceDetail,
  onClose,
  selectedCityName = 'Noida',
  selectedLocality = 'Uttar Pradesh 201310',
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('packages');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [serviceForOptions, setServiceForOptions] = useState<MakeupServiceItem | null>(null);

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleSelectCategory = (catId: string) => {
    setActiveCategoryId(catId);
    const targetElement = sectionRefs.current[catId];
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Makeup specific cart items
  const makeupCartItems = cartItems.filter(
    (item) =>
      item.service.categoryId === 'makeup-saree-styling' ||
      item.service.id.startsWith('makeup-') ||
      item.service.id.startsWith('saree-') ||
      item.service.id.startsWith('wedding-') ||
      item.service.id.startsWith('party-') ||
      item.service.id.startsWith('styling-') ||
      item.service.id.startsWith('addon-') ||
      item.service.id.startsWith('duo-')
  );

  const makeupCartTotal = makeupCartItems.reduce(
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

  // Group services by category
  const servicesByCategory: { [key: string]: MakeupServiceItem[] } = {
    packages: MAKEUP_SERVICES.filter(
      (s) =>
        s.id.includes('package') ||
        s.isPackage ||
        s.id.startsWith('makeup-party-') ||
        s.id.startsWith('makeup-luxe-') ||
        s.id.startsWith('makeup-hd-') ||
        s.id.startsWith('makeup-saree-')
    ),
    'group-deals': MAKEUP_SERVICES.filter((s) => s.id.includes('duo')),
    'saree-draping': MAKEUP_SERVICES.filter(
      (s) => s.id.startsWith('saree-draping') && !s.isPackage
    ),
    'wedding-combos': MAKEUP_SERVICES.filter((s) => s.id.startsWith('wedding-')),
    'party-makeup': MAKEUP_SERVICES.filter(
      (s) => s.id.startsWith('party-') && !s.id.includes('package')
    ),
    'hair-styling': MAKEUP_SERVICES.filter((s) => s.id.startsWith('styling-')),
    'add-ons': MAKEUP_SERVICES.filter((s) => s.id.startsWith('addon-')),
  };

  const filteredServices = searchQuery.trim()
    ? MAKEUP_SERVICES.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.features?.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : null;

  return (
    <div id="makeup-styling-category-view" className="min-h-screen bg-[#fcfcfd] pb-24 text-slate-900 font-sans">
      {/* 1. TOP STICKY BAR: BACK, ADDRESS, SEARCH (Matching video 00:03-00:08) */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onClose}
              className="p-2 -ml-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Address bar matching video: "Noida, Uttar Pradesh 201310" */}
            <div className="flex items-center gap-1.5 text-xs text-slate-700 truncate max-w-xs sm:max-w-md">
              <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="font-semibold text-slate-900 truncate">
                {selectedCityName}, {selectedLocality}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* Search bar matching video: "Search in Makeup, Saree & Styling" */}
          <div className="relative w-64 sm:w-80 md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search in Makeup, Saree & Styling"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-600 focus:bg-white transition-all placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================================= */}
          {/* LEFT SIDEBAR / SELECT A SERVICE (Matching Video 00:04-00:23)              */}
          {/* ========================================================================= */}
          <div className="lg:col-span-3 xl:col-span-3 lg:sticky lg:top-20 space-y-6">
            <div>
              {/* Title: "Makeup, Saree & ..." */}
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {MAKEUP_CONFIG.shortTitle}
              </h1>

              {/* Rating & Bookings: "★ 4.75 (325K bookings)" */}
              <div className="flex items-center gap-2 mt-2">
                <span className="flex items-center gap-1 bg-purple-50 text-purple-900 text-xs font-bold px-2 py-0.5 rounded">
                  <Star className="w-3.5 h-3.5 fill-purple-700 text-purple-700" />
                  {MAKEUP_CONFIG.rating}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  ({MAKEUP_CONFIG.bookingsCount})
                </span>
              </div>

              {/* Earliest Slot Badge: "Earliest Fri, 8:00 AM" */}
              <div className="mt-3 inline-flex items-center gap-1.5 bg-slate-100/90 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200/60">
                <Clock className="w-3.5 h-3.5 text-purple-700" />
                <span>{MAKEUP_CONFIG.earliestSlot}</span>
              </div>
            </div>

            {/* Select a service header */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3.5">
                Select a service
              </h2>

              {/* 7 Vertical / Grid Categories matching video */}
              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-2 gap-2.5 sm:gap-3">
                {MAKEUP_CATEGORIES.map((cat) => {
                  const isActive = activeCategoryId === cat.id;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSelectCategory(cat.id)}
                      className={`relative flex flex-col items-center p-2 rounded-xl transition-all group text-center cursor-pointer ${
                        isActive
                          ? 'ring-2 ring-purple-600 bg-purple-50/50 shadow-xs'
                          : 'hover:bg-slate-50 border border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      {/* Image or Icon Container */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-slate-100 relative flex items-center justify-center border border-slate-200/60 shadow-2xs group-hover:scale-105 transition-transform">
                        {cat.discountBadge ? (
                          <div className="w-full h-full bg-emerald-50 text-emerald-800 flex flex-col items-center justify-center p-1 font-extrabold text-[10px] leading-tight text-center">
                            <span>Upto</span>
                            <span className="text-xs text-emerald-700">10%</span>
                            <span>OFF</span>
                          </div>
                        ) : cat.id === 'packages' ? (
                          <div className="w-full h-full bg-emerald-50 text-emerald-800 flex flex-col items-center justify-center p-1">
                            <Sparkles className="w-7 h-7 text-emerald-700" />
                          </div>
                        ) : (
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                            onError={(e) => handleImageError(e, 'salon')}
                          />
                        )}
                      </div>

                      {/* Text Label */}
                      <span
                        className={`text-xs font-bold mt-1.5 leading-snug line-clamp-2 ${
                          isActive ? 'text-purple-900 font-extrabold' : 'text-slate-700 group-hover:text-slate-900'
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

          {/* ========================================================================= */}
          {/* CENTER: SERVICES LIST (Matching Video 00:04-00:23)                        */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-10">
            {filteredServices ? (
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 mb-4">
                  Search Results for "{searchQuery}"
                </h2>
                <div className="space-y-4">
                  {filteredServices.map((service) => renderServiceCard(service))}
                </div>
              </div>
            ) : (
              MAKEUP_CATEGORIES.map((category) => {
                const services = servicesByCategory[category.id] || [];
                if (services.length === 0) return null;

                return (
                  <div
                    key={category.id}
                    ref={(el) => (sectionRefs.current[category.id] = el)}
                    className="scroll-mt-24"
                  >
                    {/* Section Header */}
                    <div className="mb-4">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        {category.name}
                      </h2>
                    </div>

                    {/* Section Services Cards */}
                    <div className="space-y-4">
                      {services.map((service) => renderServiceCard(service))}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* ========================================================================= */}
          {/* RIGHT PANEL: URGENTLYFE PROMISE + CART SUMMARY (Matching Video 00:04-00:23)*/}
          {/* ========================================================================= */}
          <div className="lg:col-span-3 xl:col-span-3 lg:sticky lg:top-20 space-y-6">
            {/* UrgentLyfe Promise matching video */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">
                UrgentLyfe Promise
              </h3>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Verified Professionals</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Hassle Free Booking</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Transparent Pricing</span>
                </div>
              </div>
            </div>

            {/* Cart Box matching video right side */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
              {makeupCartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-6 text-slate-400">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                    <ShoppingCart className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    No items in your cart
                  </span>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                      Cart ({makeupCartItems.reduce((s, i) => s + i.quantity, 0)})
                    </span>
                    <span className="text-xs font-black text-purple-700">
                      ₹{makeupCartTotal}
                    </span>
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-2.5 pr-1">
                    {makeupCartItems.map((item) => (
                      <div
                        key={item.service.id}
                        className="flex items-center justify-between text-xs gap-2"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-slate-800 truncate">
                            {item.service.name}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            ₹{item.service.price} each
                          </p>
                        </div>
                        <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 text-purple-700 px-2 py-0.5 rounded-lg text-xs font-bold">
                          <button
                            type="button"
                            onClick={() => onUpdateCartQuantity(item.service.id, -1)}
                            className="hover:text-purple-900 active:scale-95"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black min-w-3 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateCartQuantity(item.service.id, 1)}
                            className="hover:text-purple-900 active:scale-95"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 pt-3">
                    <div className="flex items-center justify-between text-sm font-black text-slate-900 mb-3">
                      <span>Total</span>
                      <span>₹{makeupCartTotal}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onBookNow(makeupCartItems[0].service)}
                      className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 active:scale-95 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      View Cart & Book
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RICH OPTIONS & PACKAGE CUSTOMIZER MODAL                                   */}
      {/* ========================================================================= */}
      {serviceForOptions && (
        <MakeupStylingOptionsModal
          isOpen={!!serviceForOptions}
          onClose={() => setServiceForOptions(null)}
          service={serviceForOptions}
          cartItems={cartItems}
          onAddToCart={onAddToCart}
          onUpdateCartQuantity={onUpdateCartQuantity}
          onBookNow={onBookNow}
        />
      )}
    </div>
  );

  // Helper to render each service card exactly as shown in the video
  function renderServiceCard(service: MakeupServiceItem) {
    const qty = getItemQuantity(service.id);
    const hasOptions = service.hasOptions !== false;

    return (
      <div
        key={service.id}
        className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-xs transition-shadow"
      >
        <div className="flex items-start justify-between gap-4 sm:gap-6">
          {/* Left Column: Details */}
          <div className="flex-1 min-w-0">
            {/* PACKAGE Tag if package */}
            {service.isPackage && (
              <span className="inline-block text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded mb-1.5">
                PACKAGE
              </span>
            )}

            {/* Service Name */}
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              {service.name}
            </h3>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-1.5 mt-1 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-900">{service.rating}</span>
              <span className="text-slate-500">({service.reviewsCount})</span>
            </div>

            {/* Price & Duration */}
            <div className="flex items-baseline gap-2 mt-2">
              {service.startsAtPrice && (
                <span className="text-xs text-slate-500 font-semibold">
                  Starts at
                </span>
              )}
              <span className="text-base sm:text-lg font-black text-slate-900">
                ₹{service.price}
              </span>
              {service.originalPrice && service.originalPrice > service.price && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{service.originalPrice}
                </span>
              )}
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">
                {service.duration}
              </span>
            </div>

            {/* Bullet points / features matching video */}
            {service.features && service.features.length > 0 && (
              <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                {service.features.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0 mt-1.5" />
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Edit your package or View details link matching video */}
            <div className="mt-3 flex items-center gap-4">
              {service.editPackageLabel ? (
                <button
                  type="button"
                  onClick={() => setServiceForOptions(service)}
                  className="text-xs font-bold text-purple-700 hover:text-purple-900 underline underline-offset-4 cursor-pointer"
                >
                  {service.editPackageLabel}
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

          {/* Right Column: Image & Add Button matching video */}
          <div className="flex flex-col items-center flex-shrink-0 w-28 sm:w-32">
            {service.image && (
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-2xs">
                <img
                  src={service.image}
                  alt={service.title || service.name}
                  className="w-full h-full object-cover"
                  onError={(e) => handleImageError(e, 'salon')}
                />
                {service.badge && (
                  <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs">
                    {service.badge}
                  </span>
                )}
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
                      <span className="text-[10px] text-purple-900 font-extrabold underline ml-0.5">
                        Edit
                      </span>
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
                      className="w-5 h-5 flex items-center justify-center rounded hover:bg-purple-100 active:scale-95"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="min-w-4 text-center text-sm font-extrabold text-slate-900">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateCartQuantity(service.id, 1)}
                      className="w-5 h-5 flex items-center justify-center rounded hover:bg-purple-100 active:scale-95"
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
                    Add
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
      </div>
    );
  }
};
