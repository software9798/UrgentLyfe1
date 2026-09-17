import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Star,
  Clock,
  Check,
  ShieldCheck,
  Zap,
  MapPin,
  ShoppingCart,
  Plus,
  Minus,
  Crown,
  Flower2,
  Heart,
  Smile,
  Footprints,
  Scissors,
  Flame,
  Package,
  ChevronRight,
  Search,
  X,
  Gift,
} from 'lucide-react';
import { ServiceItem, CartItem } from '../../types';
import {
  SALON_PRIME_CATEGORIES,
  SALON_LUXE_CATEGORIES,
  SalonSubCategory,
} from '../../data/salonData';
import { handleImageError } from '../../utils/imageFallback';
import { SalonLuxeHero } from './SalonLuxeHero';
import { SalonServiceOptionsModal } from './SalonServiceOptionsModal';
import { SalonEditPackageModal } from './SalonEditPackageModal';

interface SalonWomenCategoryViewProps {
  initialTier?: 'prime' | 'luxe';
  initialSubCategory?: string;
  cartItems: CartItem[];
  onAddToCart: (service: ServiceItem, isUrgent?: boolean) => void;
  onUpdateCartQuantity: (serviceId: string, delta: number) => void;
  onBookNow: (service: ServiceItem, isUrgent?: boolean) => void;
  onSelectServiceDetail: (service: ServiceItem) => void;
  onClose: () => void;
  selectedCityName: string;
  selectedLocality: string;
}

export const SalonWomenCategoryView: React.FC<SalonWomenCategoryViewProps> = ({
  initialTier = 'luxe',
  initialSubCategory,
  cartItems,
  onAddToCart,
  onUpdateCartQuantity,
  onBookNow,
  onSelectServiceDetail,
  onClose,
  selectedCityName,
  selectedLocality,
}) => {
  // Active tier: 'prime' (Video 1) or 'luxe' (Video 2)
  const [activeTier, setActiveTier] = useState<'prime' | 'luxe'>(initialTier);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterTag, setSelectedFilterTag] = useState<string>('All');
  const [isGoldRitualOpen, setIsGoldRitualOpen] = useState(false);
  
  // Interactive options & package customizers
  const [serviceForOptions, setServiceForOptions] = useState<ServiceItem | null>(null);
  const [packageToEdit, setPackageToEdit] = useState<ServiceItem | null>(null);
  const [couponApplied, setCouponApplied] = useState(false);

  // Categories based on active tier
  const categories: SalonSubCategory[] =
    activeTier === 'luxe' ? SALON_LUXE_CATEGORIES : SALON_PRIME_CATEGORIES;

  // Active subcategory
  const [activeCategoryId, setActiveCategoryId] = useState<string>(() => {
    if (initialSubCategory) {
      const match = categories.find((c) => c.id === initialSubCategory || c.id.includes(initialSubCategory));
      if (match) return match.id;
    }
    return categories[0]?.id || 'luxe-packages';
  });

  // Keep active category synced if tier changes
  useEffect(() => {
    setActiveCategoryId(categories[0]?.id || 'luxe-packages');
    setSelectedFilterTag('All');
  }, [activeTier]);

  // Reset filter tag when category changes
  useEffect(() => {
    setSelectedFilterTag('All');
  }, [activeCategoryId]);

  // Cart quantity helper
  const getCartQuantity = (serviceId: string) => {
    const found = cartItems.find((item) => item.service.id === serviceId);
    return found ? found.quantity : 0;
  };

  // Cart total sum
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.service.price * item.quantity,
    0
  );
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Coupon calculations (25% off up to ₹200)
  const couponDiscount = couponApplied ? Math.min(200, Math.round(cartSubtotal * 0.25)) : 0;
  const finalCartTotal = Math.max(0, cartSubtotal - couponDiscount);

  // Salon specific items count in cart (for "Make your own package" 3+ services unlock)
  const salonItemsInCart = cartItems.filter(
    (item) =>
      item.service.categoryId === 'salon' ||
      item.service.id.startsWith('prime-') ||
      item.service.id.startsWith('luxe-')
  );
  const salonCount = salonItemsInCart.reduce((sum, item) => sum + item.quantity, 0);
  const isPackageDiscountUnlocked = salonCount >= 3;

  // Helper to get subcategory filter tags
  const getCategoryFilterTags = (catId: string, tier: 'prime' | 'luxe'): string[] => {
    if (catId.includes('waxing')) {
      return tier === 'luxe'
        ? ['All', 'Rica Liposoluble', 'Chocolate Wax', 'Full Arms & Legs', 'Bikini & Brazilian']
        : ['All', 'Roll-on Wax', 'Honey Spatula', 'Arms & Legs', 'Underarms', 'Threading', 'Bikini/Brazilian'];
    }
    if (catId.includes('derma')) {
      return ['All', 'Niacinamide', 'Salicylic Acid', 'Cryo-Wand'];
    }
    if (catId.includes('forest-essentials')) {
      return ['All', 'Soundarya 24K Gold', 'Tejasvi Glow', 'Kansa Wand'];
    }
    if (catId.includes('packages')) {
      return ['All', 'Make Your Own', 'Waxing Combos', 'Full Radiance'];
    }
    if (catId.includes('korean')) {
      return ['All', 'Glass Skin', 'Collagen Infusion', 'Cryo Globes'];
    }
    if (catId.includes('japanese')) {
      return ['All', 'Matcha Detox', 'Yuzu Brightening'];
    }
    if (catId.includes('pedi') || catId.includes('mani')) {
      return ['All', 'Pedicure', 'Manicure', 'Jelly Spa', 'Paraffin'];
    }
    if (catId.includes('signature') || catId.includes('cleanup')) {
      return ['All', 'O3+ Bridal', 'Cheryls Tan Clear', 'Pore Cleanup'];
    }
    return ['All'];
  };

  // Helper to render lucide icon by name
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Package':
        return <Package className="w-4 h-4" />;
      case 'Sparkles':
        return <Crown className="w-4 h-4" />;
      case 'Crown':
        return <Crown className="w-4 h-4" />;
      case 'Zap':
        return <Zap className="w-4 h-4" />;
      case 'Flower2':
        return <Flower2 className="w-4 h-4" />;
      case 'Heart':
        return <Heart className="w-4 h-4" />;
      case 'Smile':
        return <Smile className="w-4 h-4" />;
      case 'Footprints':
        return <Footprints className="w-4 h-4" />;
      case 'Scissors':
        return <Scissors className="w-4 h-4" />;
      case 'Flame':
        return <Flame className="w-4 h-4" />;
      default:
        return <Crown className="w-4 h-4" />;
    }
  };

  // Filtered categories and services if search query is provided
  const activeCategory =
    categories.find((c) => c.id === activeCategoryId) || categories[0];

  const filterTags = getCategoryFilterTags(activeCategory.id, activeTier);

  const displayedServices = activeCategory.services.filter((srv) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        srv.title.toLowerCase().includes(q) ||
        srv.subtitle?.toLowerCase().includes(q) ||
        srv.description?.toLowerCase().includes(q);
      if (!matchSearch) return false;
    }

    if (selectedFilterTag !== 'All') {
      const tagLower = selectedFilterTag.toLowerCase();
      const matchTag =
        srv.title.toLowerCase().includes(tagLower) ||
        srv.subtitle?.toLowerCase().includes(tagLower) ||
        srv.description?.toLowerCase().includes(tagLower) ||
        srv.tags?.some((t) => t.toLowerCase().includes(tagLower)) ||
        srv.includes?.some((inc) => inc.toLowerCase().includes(tagLower));
      if (!matchTag) return false;
    }

    return true;
  });

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    setSearchQuery('');
    const targetElement = document.getElementById('services-list-container');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] pb-28 text-slate-900">
      {/* 1. TOP STICKY BAR: BACK BUTTON, SEARCH & LOCATION */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 -ml-1 rounded-xl text-slate-700 hover:text-black hover:bg-slate-100 transition-colors flex items-center gap-1.5 font-bold text-xs sm:text-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate">
              <span>Home</span>
              <span>/</span>
              <span>Salon for Women</span>
              <span>/</span>
              <span className="font-semibold text-slate-900 truncate">
                {activeTier === 'luxe' ? 'Salon Luxe' : 'Salon Prime'}
              </span>
            </div>
          </div>

          {/* Tier Switcher in top navigation bar */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTier('prime')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTier === 'prime'
                    ? 'bg-white text-blue-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Prime
              </button>
              <button
                type="button"
                onClick={() => setActiveTier('luxe')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeTier === 'luxe'
                    ? 'bg-amber-950 text-amber-300 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Crown className="w-3 h-3 text-amber-400" />
                <span>Luxe</span>
              </button>
            </div>

            {/* Location Badge */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full shrink-0">
              <MapPin className="w-3.5 h-3.5 text-purple-600" />
              <span className="font-semibold text-slate-900">{selectedLocality}</span>
              <span className="text-slate-400">, {selectedCityName}</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${activeTier === 'luxe' ? 'Salon Luxe' : 'Salon Prime'} (e.g. Waxing, Facial, Pedicure)`}
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-purple-600 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm outline-none transition-all placeholder:text-slate-400 font-medium"
            />
          </div>

          {/* Mobile Horizontal Category Pills */}
          <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
            {categories.map((cat) => {
              const isSelected = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategoryId(cat.id);
                    setSearchQuery('');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 border ${
                    isSelected
                      ? activeTier === 'luxe'
                        ? 'bg-amber-950 text-amber-300 border-amber-800 shadow-xs'
                        : 'bg-blue-900 text-white border-blue-900 shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                  }`}
                >
                  <span className="scale-75 origin-center shrink-0">
                    {renderCategoryIcon(cat.iconName)}
                  </span>
                  <span className="truncate whitespace-nowrap">{cat.name}</span>
                  {cat.badge && (
                    <span className="text-[8px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full font-black">
                      {cat.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. TOP HERO FOR SALON LUXE (Exact from Video 2) */}
      {activeTier === 'luxe' ? (
        <SalonLuxeHero
          categories={categories}
          activeCategoryId={activeCategoryId}
          onSelectCategory={handleCategorySelect}
          onOpenVideoModal={() => setIsGoldRitualOpen(true)}
        />
      ) : (
        /* SALON PRIME HEADER */
        <div className="bg-gradient-to-b from-blue-50/60 to-[#fcfcfd] border-b border-slate-200/80 pt-6 pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-900 border border-blue-200">
                  Affordable Branded Salon
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                  Salon Prime
                </h1>
                <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                  <div className="flex items-center gap-1 font-bold text-slate-900">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>4.86</span>
                  </div>
                  <span>•</span>
                  <span>1.9M bookings</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                    Single-use sealed kits
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. MAIN CONTENT: 3-COLUMN LAYOUT DIRECTLY MATCHING VIDEOS */}
      <div id="services-list-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ===================================================================== */}
          {/* COLUMN 1: LEFT SUB-CATEGORIES SIDEBAR (STICKY ON DESKTOP) */}
          {/* ===================================================================== */}
          <div className="lg:col-span-3 lg:sticky lg:top-36 space-y-2">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Categories ({categories.length})
              </span>
              <span className="text-[11px] text-purple-700 font-bold">
                {activeTier === 'luxe' ? 'Luxe Rituals' : 'Prime Services'}
              </span>
            </div>

            {/* Sub-categories Buttons List */}
            <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isSelected = cat.id === activeCategoryId;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveCategoryId(cat.id);
                      setSearchQuery('');
                      const el = document.getElementById('services-main-content');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`flex items-center justify-between p-3 rounded-2xl text-left text-xs font-bold transition-all cursor-pointer shrink-0 lg:w-full border ${
                      isSelected
                        ? activeTier === 'luxe'
                          ? 'bg-amber-950 text-amber-200 border-amber-900 shadow-md ring-2 ring-amber-400/20'
                          : 'bg-blue-900 text-white border-blue-900 shadow-md ring-2 ring-blue-400/30'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`p-1.5 rounded-xl shrink-0 ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {renderCategoryIcon(cat.iconName)}
                      </div>
                      <span className="truncate">{cat.name}</span>
                    </div>

                    {cat.badge && (
                      <span
                        className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ml-2 shrink-0 ${
                          isSelected
                            ? 'bg-white text-slate-900 font-black'
                            : cat.badgeColor || 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {cat.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Hygiene Badge */}
            <div className="hidden lg:flex items-center gap-2 p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs text-amber-950 mt-4">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                All female therapists are 100% background checked with sealed monodosage kits.
              </span>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* COLUMN 2: CENTER SERVICE CARDS & PROMO BANNERS */}
          {/* ===================================================================== */}
          <div id="services-main-content" className="lg:col-span-6 space-y-6">
            {/* In-category Promo Banner if configured */}
            {activeCategory.promoBanner && (
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between gap-4 shadow-sm border border-slate-800">
                <div className="space-y-1 max-w-sm">
                  {activeCategory.promoBanner.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-500/30 text-purple-300 border border-purple-400/40 px-2 py-0.5 rounded">
                      {activeCategory.promoBanner.badge}
                    </span>
                  )}
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">
                    {activeCategory.promoBanner.title}
                  </h3>
                  {activeCategory.promoBanner.subtitle && (
                    <p className="text-xs text-slate-300 leading-normal">
                      {activeCategory.promoBanner.subtitle}
                    </p>
                  )}
                  {activeCategory.promoBanner.startingPrice && (
                    <p className="text-xs font-bold text-amber-300 pt-1">
                      Starting at ₹{activeCategory.promoBanner.startingPrice}
                      {activeCategory.promoBanner.originalPrice && (
                        <span className="line-through text-slate-400 font-normal ml-2">
                          ₹{activeCategory.promoBanner.originalPrice}
                        </span>
                      )}
                    </p>
                  )}
                </div>
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/20">
                  <img
                    src={activeCategory.promoBanner.imageUrl}
                    alt={activeCategory.promoBanner.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageError(e, 'salon')}
                  />
                </div>
              </div>
            )}

            {/* Category Title Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {activeCategory.name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {displayedServices.length} options available with 100% single-use monodosages
                </p>
              </div>

              {activeCategory.badge && (
                <span
                  className={`text-xs font-black px-3 py-1 rounded-full ${
                    activeCategory.badgeColor || 'bg-purple-100 text-purple-800'
                  }`}
                >
                  {activeCategory.badge}
                </span>
              )}
            </div>

            {/* Quick Subcategory Filter Chips */}
            {filterTags.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {filterTags.map((tag) => {
                  const isActive = selectedFilterTag === tag;
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSelectedFilterTag(tag)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                        isActive
                          ? activeTier === 'luxe'
                            ? 'bg-amber-950 text-amber-300 border-amber-800 shadow-xs'
                            : 'bg-blue-900 text-white border-blue-900 shadow-xs'
                          : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            )}

            {/* "Make Your Own Package" Interactive Progress Banner */}
            {activeCategory.id.includes('packages') && (
              <div className="rounded-2xl border border-purple-200/90 bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 p-4 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-xs">
                      %
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-purple-950">
                        Make Your Own Package
                      </h4>
                      <p className="text-[11px] text-purple-800 font-medium">
                        Select any 3+ services & save flat 20% on checkout
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      isPackageDiscountUnlocked
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-purple-200 text-purple-900'
                    }`}
                  >
                    {isPackageDiscountUnlocked ? '20% OFF Active' : `${salonCount}/3 Selected`}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-purple-200/70 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-purple-700 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (salonCount / 3) * 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-purple-900 font-semibold pt-0.5">
                  {isPackageDiscountUnlocked ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      🎉 20% package discount activated! Code GLOW20 applied.
                    </span>
                  ) : (
                    <span>
                      Add {Math.max(1, 3 - salonCount)} more salon service{3 - salonCount === 1 ? '' : 's'} to unlock 20% bundle discount
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      const wax = categories.find((c) => c.id.includes('waxing'));
                      if (wax) setActiveCategoryId(wax.id);
                    }}
                    className="text-purple-700 hover:text-purple-950 font-bold underline cursor-pointer"
                  >
                    + Browse services
                  </button>
                </div>
              </div>
            )}

            {/* Services List matching Video Cards */}
            <div className="space-y-4">
              {displayedServices.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
                  <p className="text-sm font-semibold text-slate-600">
                    No services found matching "{searchQuery}".
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-3 text-xs font-bold text-purple-700 underline"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                displayedServices.map((service) => {
                  const qty = getCartQuantity(service.id);
                  const isPackage = service.isPackage || service.id.includes('package');

                  return (
                    <React.Fragment key={service.id}>
                      {/* Secondary In-line Banners matching video */}
                      {(service.id === 'luxe-roll-on-waxing-arms-legs' || service.id === 'prime-roll-on-waxing') && (
                        <div
                          onClick={() => setServiceForOptions(service)}
                          className="rounded-3xl overflow-hidden bg-[#f7f2ec] border border-amber-200/80 p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:border-amber-300 transition-all shadow-xs"
                        >
                          <div className="space-y-1">
                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                              Roll-on
                              <br />
                              waxing
                            </h3>
                            <p className="text-xs sm:text-sm font-bold text-amber-950/80 pt-1">
                              Full arms, full legs
                              <br />
                              & underarms
                            </p>
                          </div>
                          <div className="w-28 sm:w-36 h-24 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-white/80 shadow-xs">
                            <img
                              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80"
                              alt="Roll-on waxing"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                              onError={(e) => handleImageError(e, 'waxing')}
                            />
                          </div>
                        </div>
                      )}

                      {(service.id === 'luxe-jp-rice-water' || service.id === 'prime-japanese-matcha-detox') && (
                        <div
                          onClick={() => setServiceForOptions(service)}
                          className="rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white p-4 flex items-center justify-between gap-4 border border-emerald-800/40 shadow-xs cursor-pointer hover:border-emerald-600 transition-all"
                        >
                          <div>
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                              Japanese Ritual
                            </span>
                            <h4 className="text-sm font-black text-white mt-1">
                              Kyoto Uji Matcha Detox • Mochi Soft Finish
                            </h4>
                            <p className="text-xs text-emerald-200/80 mt-0.5">
                              Organic ceremonial green tea with bronze kansa wand contouring
                            </p>
                          </div>
                          <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/20">
                            <img
                              src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=200&q=80"
                              alt="Japanese matcha facial"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                              onError={(e) => handleImageError(e, 'facial')}
                            />
                          </div>
                        </div>
                      )}

                      {service.id === 'prime-derma-niacinamide' && (
                        <div
                          onClick={() => setServiceForOptions(service)}
                          className="rounded-2xl overflow-hidden bg-gradient-to-r from-blue-950 to-indigo-950 text-white p-4 flex items-center justify-between gap-4 border border-blue-800/40 shadow-xs cursor-pointer hover:border-blue-700 transition-all"
                        >
                          <div>
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-blue-400/20 text-blue-300 border border-blue-400/30">
                              Clinical Active
                            </span>
                            <h4 className="text-sm font-black text-white mt-1">
                              -5°C Cryofacial Ice Therapy • 10% Niacinamide
                            </h4>
                            <p className="text-xs text-blue-200/80 mt-0.5">
                              Instantly tightens pores & fades dark spots with zero downtime
                            </p>
                          </div>
                          <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/20">
                            <img
                              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80"
                              alt="Clinical Derma Facial"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                              onError={(e) => handleImageError(e, 'facial')}
                            />
                          </div>
                        </div>
                      )}

                      {/* Main Service Card */}
                      <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start justify-between gap-4 relative">
                        {/* Left: Info & Inclusions */}
                        <div className="space-y-2 flex-1 min-w-0">
                          {/* Badges / Tags */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            {isPackage && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md">
                                <Package className="w-3 h-3" />
                                PACKAGE
                              </span>
                            )}
                            {service.isExclusive && (
                              <span className="text-[10px] font-black uppercase text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md">
                                UC EXCLUSIVE
                              </span>
                            )}
                            {service.isBestseller && (
                              <span className="text-[10px] font-black uppercase text-slate-900 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-md">
                                BESTSELLER
                              </span>
                            )}
                            {service.isFreeGift && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-purple-900 bg-purple-100 border border-purple-300 px-2 py-0.5 rounded-md">
                                <Gift className="w-3 h-3" />
                                FREE GIFT INCLUDED
                              </span>
                            )}
                          </div>

                          <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                            {service.title}
                          </h3>

                          {/* Rating & Reviews */}
                          <div className="flex items-center gap-2 text-xs text-slate-600">
                            <div className="flex items-center gap-1 font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                              <span>{service.rating}</span>
                            </div>
                            <span>({(service.reviewCount / 1000).toFixed(1)}K reviews)</span>
                          </div>

                          {/* Price & Duration */}
                          <div className="flex items-baseline gap-2 pt-1">
                            <span className="text-base sm:text-lg font-black text-slate-900">
                              {service.startsAt ? `Starts at ₹${service.price}` : `₹${service.price}`}
                            </span>
                            {service.originalPrice && (
                              <span className="text-xs text-slate-400 line-through">
                                ₹{service.originalPrice}
                              </span>
                            )}
                            {service.discountPercent && (
                              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                {service.discountPercent}% OFF
                              </span>
                            )}
                            <span className="text-slate-300">•</span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {service.durationMinutes} mins
                            </span>
                          </div>

                          {/* Inclusions List */}
                          {service.includes && service.includes.length > 0 && (
                            <ul className="space-y-1 pt-2 border-t border-slate-100 text-xs text-slate-600">
                              {service.includes.slice(0, 4).map((item, idx) => (
                                <li key={idx} className="flex items-start gap-1.5 leading-snug">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Links: Edit package or View details */}
                          <div className="pt-1 flex items-center gap-4">
                            {isPackage && (
                              <button
                                type="button"
                                onClick={() => setPackageToEdit(service)}
                                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
                              >
                                Edit your package
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                if (service.optionsCount && service.optionsCount > 1) {
                                  setServiceForOptions(service);
                                } else {
                                  onSelectServiceDetail(service);
                                }
                              }}
                              className="text-xs font-bold text-purple-700 hover:text-purple-900 underline cursor-pointer"
                            >
                              View details
                            </button>
                          </div>
                        </div>

                        {/* Right: Service Image, Discount Pill & Add Button */}
                        <div className="relative shrink-0 flex flex-col items-center w-full sm:w-auto">
                          {/* Discount Pill for packages on top right */}
                          {isPackage && service.discountPercent && (
                            <div className="self-end mb-1 text-[10px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md">
                              {service.discountPercent}% OFF
                            </div>
                          )}

                          <div className="w-full sm:w-32 h-36 sm:h-32 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              referrerPolicy="no-referrer"
                              onError={(e) => handleImageError(e, 'salon')}
                            />
                          </div>

                          {/* Add / Quantity Button */}
                          <div className="-mt-4 relative z-10 flex flex-col items-center">
                            {qty === 0 ? (
                              <button
                                type="button"
                                onClick={() => {
                                  if (service.optionsCount && service.optionsCount > 1) {
                                    setServiceForOptions(service);
                                  } else {
                                    onAddToCart(service);
                                  }
                                }}
                                className="bg-white hover:bg-purple-50 text-purple-700 border-2 border-purple-600 hover:border-purple-700 px-6 py-1.5 rounded-xl font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add</span>
                              </button>
                            ) : (
                              <div className="bg-purple-900 text-white rounded-xl flex items-center shadow-lg border border-purple-800">
                                <button
                                  type="button"
                                  onClick={() => onUpdateCartQuantity(service.id, -1)}
                                  className="p-1.5 hover:bg-white/20 transition-colors rounded-l-xl cursor-pointer"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="px-3 text-xs font-black">{qty}</span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateCartQuantity(service.id, 1)}
                                  className="p-1.5 hover:bg-white/20 transition-colors rounded-r-xl cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}

                            {/* Options count text below Add button */}
                            {service.optionsCount && (
                              <button
                                type="button"
                                onClick={() => setServiceForOptions(service)}
                                className="text-[10px] text-slate-500 font-semibold hover:text-purple-700 mt-1 cursor-pointer underline"
                              >
                                {service.optionsCount} options
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })
              )}
            </div>
          </div>

          {/* ===================================================================== */}
          {/* COLUMN 3: RIGHT COLUMN (OFFERS, PROMISES & ACTIVE CART) */}
          {/* ===================================================================== */}
          <div className="lg:col-span-3 lg:sticky lg:top-36 space-y-4">
            {/* Offer Card (NEWSALON 25% off) */}
            <div className="bg-gradient-to-br from-purple-900 to-indigo-950 text-white rounded-3xl p-5 shadow-sm space-y-2 border border-purple-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider bg-purple-400/20 text-purple-300 border border-purple-300/30 px-2.5 py-0.5 rounded-md inline-block">
                  Exclusive Voucher
                </span>
                {couponApplied && (
                  <span className="text-[10px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-md">
                    APPLIED
                  </span>
                )}
              </div>
              <h3 className="text-base font-black tracking-tight leading-snug">
                Get 25% off upto ₹200
              </h3>
              <p className="text-xs text-purple-200 leading-relaxed font-medium">
                Valid on first salon booking with code <strong className="text-white font-bold">NEWSALON</strong>
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setCouponApplied(!couponApplied)}
                  className={`w-full py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    couponApplied
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      : 'bg-white hover:bg-slate-100 text-purple-950 shadow-md'
                  }`}
                >
                  {couponApplied ? `✓ Voucher Applied (-₹${couponDiscount})` : 'Apply Code: NEWSALON'}
                </button>
              </div>
            </div>

            {/* UC Promise Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  UC Promise
                </h4>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 fill-amber-400" />
                  <span>
                    <strong className="text-slate-900">4.8+ Rated Beauticians</strong>: Rigorous background check & trade tests.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">100% Sealed Hygiene Kits</strong>: Opened directly in front of you.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Crown className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Premium Branded Products</strong>: Genuine Forest Essentials, Rica, Cheryls.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Mess-free Clean-up</strong>: Post-service sanitization guarantee.
                  </span>
                </li>
              </ul>
            </div>

            {/* Active Cart Drawer Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-purple-700" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Your Cart
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'}
                </span>
              </div>

              {totalCartCount === 0 ? (
                <div className="py-6 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-slate-600">
                    No items in your cart
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Explore salon services & add them to your cart
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1 scrollbar-none">
                    {cartItems.map((item) => (
                      <div
                        key={item.service.id}
                        className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-b-0"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="font-bold text-slate-900 truncate">
                            {item.service.title}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            ₹{item.service.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => onUpdateCartQuantity(item.service.id, -1)}
                            className="w-5 h-5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
                          >
                            -
                          </button>
                          <span className="font-bold text-xs">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateCartQuantity(item.service.id, 1)}
                            className="w-5 h-5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-200 space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>Subtotal:</span>
                      <span className="font-bold text-slate-900">₹{cartSubtotal}</span>
                    </div>

                    {couponApplied && (
                      <div className="flex items-center justify-between text-xs text-emerald-700 font-bold">
                        <span>NEWSALON Voucher:</span>
                        <span>-₹{couponDiscount}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                      <span className="font-bold text-slate-800">To Pay:</span>
                      <span className="text-base font-black text-slate-900">₹{finalCartTotal}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (cartItems[0]) {
                        onBookNow(cartItems[0].service);
                      }
                    }}
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2.5 rounded-xl font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Proceed to Checkout</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Cart Summary Bar */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 p-3 sm:hidden z-40 shadow-2xl flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-slate-500 font-bold">
              {totalCartCount} items in cart
            </div>
            <div className="text-base font-black text-slate-900">₹{finalCartTotal}</div>
          </div>
          <button
            type="button"
            onClick={() => {
              if (cartItems[0]) {
                onBookNow(cartItems[0].service);
              }
            }}
            className="bg-purple-700 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span>Checkout</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Options Selection Modal */}
      {serviceForOptions && (
        <SalonServiceOptionsModal
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

      {/* Package Customization Modal */}
      {packageToEdit && (
        <SalonEditPackageModal
          service={packageToEdit}
          isOpen={!!packageToEdit}
          onClose={() => setPackageToEdit(null)}
          onSavePackage={(customized) => {
            onAddToCart(customized);
            setPackageToEdit(null);
          }}
        />
      )}

      {/* Interactive Video Showcase: Forest Essentials */}
      {isGoldRitualOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
            <div className="relative bg-gradient-to-r from-amber-950 via-stone-900 to-slate-950 text-white p-6">
              <button
                type="button"
                onClick={() => setIsGoldRitualOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-300/30 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2">
                <Crown className="w-3 h-3 text-amber-300" />
                FOREST ESSENTIALS LUXURIOUS AYURVEDA
              </div>

              <h3 className="text-xl font-black text-amber-100 leading-tight">
                4-Step Soundarya 24K Gold Ritual
              </h3>
              <p className="text-xs text-amber-200/80 mt-1">
                Pure 24K gold bhasma, Kashmiri saffron & Ayurvedic kansa wand facial marma lift
              </p>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-amber-800/60 text-center">
                <div className="bg-amber-900/30 rounded-xl p-2">
                  <div className="text-base font-black text-amber-200">24 Karat</div>
                  <div className="text-[10px] text-amber-300/80">Pure gold bhasma</div>
                </div>
                <div className="bg-amber-900/30 rounded-xl p-2">
                  <div className="text-base font-black text-amber-200">Kansa</div>
                  <div className="text-[10px] text-amber-300/80">Marma wand</div>
                </div>
                <div className="bg-amber-900/30 rounded-xl p-2">
                  <div className="text-base font-black text-amber-200">100%</div>
                  <div className="text-[10px] text-amber-300/80">Sealed jars</div>
                </div>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                4-Step Ayurvedic Royal Journey
              </h4>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/70">
                  <div className="w-7 h-7 rounded-xl bg-amber-700 text-white font-black text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <div className="text-xs font-black text-amber-950">
                      Floral Hydrosol & Cow Ghee Cleansing Milk
                    </div>
                    <div className="text-[11px] text-amber-900/90 leading-snug mt-0.5">
                      Fresh steam-distilled Kashmiri rosewater and desi cow's ghee melt away pollution while replenishing natural lipids.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/70">
                  <div className="w-7 h-7 rounded-xl bg-amber-700 text-white font-black text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <div className="text-xs font-black text-amber-950">
                      Kashmiri Walnut & Sandalwood Gommage
                    </div>
                    <div className="text-[11px] text-amber-900/90 leading-snug mt-0.5">
                      Ultra-fine crushed walnut kernels gently polish texture and remove stubborn tan with zero microscopic abrasion.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/70">
                  <div className="w-7 h-7 rounded-xl bg-amber-800 text-white font-black text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <div className="text-xs font-black text-amber-950">
                      Soundarya 24K Gold Serum with Kansa Wand
                    </div>
                    <div className="text-[11px] text-amber-900/90 leading-snug mt-0.5">
                      Ancient bell-metal bronze wand balances skin pH, detoxifies facial lymphatic pathways, and chisels jawline contours.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/70">
                  <div className="w-7 h-7 rounded-xl bg-amber-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div>
                    <div className="text-xs font-black text-amber-950">
                      Soundarya Radiance Silk Peel-Off 24K Mask
                    </div>
                    <div className="text-[11px] text-amber-900/90 leading-snug mt-0.5">
                      Pure 24K gold bhasma seals in botanical nutrients, revealing breathtaking bridal luminosity that lasts for weeks.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsGoldRitualOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsGoldRitualOpen(false);
                  const target = categories.find((c) => c.id.includes('forest-essentials'));
                  if (target) handleCategorySelect(target.id);
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <span>Explore 24K Gold Rituals</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
