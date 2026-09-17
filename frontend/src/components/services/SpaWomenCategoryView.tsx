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
  CheckCircle2,
  Award,
} from 'lucide-react';
import { ServiceItem, CartItem } from '../../types';
import { handleImageError } from '../../utils/imageFallback';
import { SPA_CONFIG, SPA_CATEGORIES, SPA_SERVICES, SpaSubCategory } from '../../data/spaData';
import { SpaServiceOptionsModal } from './SpaServiceOptionsModal';

interface SpaWomenCategoryViewProps {
  cartItems: CartItem[];
  onAddToCart: (service: ServiceItem, isUrgent?: boolean) => void;
  onUpdateCartQuantity: (serviceId: string, delta: number) => void;
  onBookNow: (service: ServiceItem, isUrgent?: boolean) => void;
  onSelectServiceDetail: (service: ServiceItem) => void;
  onClose: () => void;
  selectedCityName?: string;
  selectedLocality?: string;
}

export const SpaWomenCategoryView: React.FC<SpaWomenCategoryViewProps> = ({
  cartItems,
  onAddToCart,
  onUpdateCartQuantity,
  onBookNow,
  onSelectServiceDetail,
  onClose,
  selectedCityName = 'Patna',
  selectedLocality = 'Fraser Road • Budh Vihar',
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('stress-relief');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [serviceForOptions, setServiceForOptions] = useState<ServiceItem | null>(null);

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleSelectCategory = (catId: string) => {
    setActiveCategoryId(catId);
    const targetElement = sectionRefs.current[catId];
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Spa specific cart items
  const spaCartItems = cartItems.filter(
    (item) =>
      item.service.categoryId === 'spa-women' ||
      item.service.id.startsWith('spa-')
  );

  const spaCartTotal = spaCartItems.reduce(
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
    <div id="spa-women-category-view" className="min-h-screen bg-[#fcfcfd] pb-24 text-slate-900">
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
              placeholder="Search in Massage Therapy for Women"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-600 focus:bg-white transition-all placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 2. HERO HEADER: TITLE, RATING, SELECT A SERVICE + HERO BANNER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8">
          {/* Left: Title + Category Selector */}
          <div className="lg:col-span-6 xl:col-span-5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {SPA_CONFIG.title}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex items-center gap-1 bg-purple-50 text-purple-900 text-xs font-bold px-2 py-0.5 rounded">
                <Star className="w-3.5 h-3.5 fill-purple-700 text-purple-700" />
                {SPA_CONFIG.rating}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                ({SPA_CONFIG.reviewsCount})
              </span>
            </div>

            {/* "Select a service" Label */}
            <div className="mt-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Select a service
              </h2>

              {/* 6 Category Pills Grid matching video */}
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
                {SPA_CATEGORIES.map((cat) => {
                  const isActive = activeCategoryId === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSelectCategory(cat.id)}
                      className={`flex flex-col items-center p-2.5 rounded-xl border transition-all text-center group ${
                        isActive
                          ? 'border-purple-600 bg-purple-50/50 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden mb-2 bg-slate-100 flex-shrink-0 relative">
                        <img
                          src={cat.thumbnailUrl}
                          alt={cat.name}
                          onError={handleImageError}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <span
                        className={`text-xs font-medium leading-tight ${
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

          {/* Right: Big Hero Banner ("Bring spa to your home") */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-sm aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/8] bg-slate-900 group">
              <img
                src={SPA_CONFIG.heroBanner.imageUrl}
                alt={SPA_CONFIG.heroBanner.title}
                onError={handleImageError}
                className="w-full h-full object-cover object-center opacity-85 group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <span className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-1">
                  At-Home Wellness
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {SPA_CONFIG.heroBanner.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-md">
                  {SPA_CONFIG.heroBanner.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. MAIN CONTENT: SERVICES FEED (LEFT) + URGENTLYFE PROMISE & CART (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Services Feed (Col 8) */}
          <div className="lg:col-span-8 space-y-10">
            {SPA_CATEGORIES.map((category) => {
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

              return (
                <div
                  key={category.id}
                  ref={(el) => {
                    sectionRefs.current[category.id] = el;
                  }}
                  id={`spa-sec-${category.id}`}
                  className="scroll-mt-20"
                >
                  {/* Category Header */}
                  <div className="mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {category.name}
                    </h3>
                  </div>

                  {/* Promo Banner Card inside Section if present */}
                  {category.promoBanner && !searchQuery && (
                    <div className="relative rounded-2xl overflow-hidden mb-6 bg-slate-900 aspect-[16/7] sm:aspect-[21/7] shadow-xs">
                      <img
                        src={category.promoBanner.imageUrl}
                        alt={category.promoBanner.title}
                        onError={handleImageError}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent flex flex-col justify-center p-6">
                        {category.promoBanner.badge && (
                          <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 mb-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            <span>{category.promoBanner.subtitle || category.promoBanner.badge}</span>
                          </div>
                        )}
                        <h4 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                          {category.promoBanner.title}
                        </h4>
                      </div>
                    </div>
                  )}

                  {/* Services List in this Category */}
                  <div className="space-y-6 divide-y divide-slate-100">
                    {filteredServices.map((service, index) => {
                      const qty = getItemQuantity(service.id);
                      const hasOptions = (service.optionsCount ?? 0) > 1;

                      return (
                        <div
                          key={service.id}
                          className={`pt-6 ${index === 0 ? 'pt-0' : ''} flex flex-col sm:flex-row items-start justify-between gap-6 group`}
                        >
                          {/* Left Details */}
                          <div className="flex-1 min-w-0">
                            {/* Badges */}
                            <div className="flex items-center gap-2 mb-1.5">
                              {service.badge && (
                                <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 uppercase tracking-wide">
                                  {service.badge}
                                </span>
                              )}
                              {service.tags?.includes('Value Saver') && (
                                <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 uppercase tracking-wide">
                                  VALUE SAVER
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
                                {hasOptions ? 'Starts at ' : ''}₹{service.price}
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
                                {service.includes.slice(0, 2).map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-slate-400 font-bold">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* View details button */}
                            <div className="mt-3">
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
                                View details
                              </button>
                            </div>
                          </div>

                          {/* Right: Service Image + Add Button */}
                          <div className="relative flex-shrink-0 w-full sm:w-36 flex flex-col items-center">
                            <div className="w-full h-28 sm:w-36 sm:h-28 rounded-xl overflow-hidden bg-slate-100 shadow-xs border border-slate-100">
                              <img
                                src={service.image}
                                alt={service.title}
                                onError={handleImageError}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>

                            {/* Add / Quantity Button overlaid at bottom of image */}
                            <div className="-mt-4 z-10 flex flex-col items-center">
                              {qty > 0 ? (
                                hasOptions ? (
                                  <button
                                    type="button"
                                    onClick={() => setServiceForOptions(service)}
                                    className="flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 border-2 border-purple-600 text-purple-700 px-3 py-1 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                                  >
                                    <span>{qty} in cart</span>
                                    <span className="text-[10px] text-purple-800 underline ml-0.5">Edit</span>
                                  </button>
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
                                  {hasOptions ? `${service.optionsCount} options` : 'Add'}
                                </button>
                              )}

                              {/* Options count indicator below Add button */}
                              {hasOptions && qty > 0 && (
                                <button
                                  type="button"
                                  onClick={() => setServiceForOptions(service)}
                                  className="text-[10px] text-slate-500 font-semibold hover:text-purple-700 mt-1 cursor-pointer underline"
                                >
                                  {service.optionsCount} options available
                                </button>
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

          {/* Right Sticky Sidebar (Col 4): UrgentLyfe Promise + Cart */}
          <div className="lg:col-span-4 sticky top-20 space-y-6">
            {/* UrgentLyfe Promise Card matching video */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900">UrgentLyfe Promise</h3>
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-[10px] border border-blue-200">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <ul className="space-y-3 text-xs text-slate-700">
                {SPA_CONFIG.promiseList.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cart Box matching video */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              {spaCartItems.length === 0 ? (
                <div className="py-8 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
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
                      {spaCartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto my-3">
                    {spaCartItems.map((item) => (
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
                    <span className="text-base font-extrabold text-slate-900">₹{spaCartTotal}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (spaCartItems.length > 0) {
                        onBookNow(spaCartItems[0].service);
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

      {/* Spa Options Modal */}
      {serviceForOptions && (
        <SpaServiceOptionsModal
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
    </div>
  );
};
