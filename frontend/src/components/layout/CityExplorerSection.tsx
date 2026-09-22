import React, { useState, useMemo, useEffect } from 'react';
import {
  MapPin,
  Sparkles,
  Zap,
  ShieldCheck,
  Clock,
  Star,
  Plus,
  Minus,
  Check,
  ChevronRight,
  TrendingUp,
  Building2,
  SlidersHorizontal,
  Flame,
  Info,
} from 'lucide-react';
import { City, ServiceItem, CartItem } from '../../types';
import { getCityProfile, CityServiceHighlight, CityProfile } from '../../data/cityExplorerData';
import { handleImageError } from '../../utils/imageFallback';

interface CityExplorerSectionProps {
  selectedCity: City;
  selectedLocality: string;
  cities: City[];
  onSelectCity: (city: City) => void;
  onSelectLocality: (locality: string) => void;
  onSelectService: (categoryId: string, subServiceKey?: string) => void;
  onOpenServiceDetail: (service: ServiceItem) => void;
  onAddToCart?: (service: ServiceItem) => void;
  onUpdateCartQuantity?: (serviceId: string, delta: number) => void;
  onQuickBook?: (service: ServiceItem) => void;
  cartItems?: CartItem[];
}

export const CityExplorerSection: React.FC<CityExplorerSectionProps> = ({
  selectedCity,
  selectedLocality,
  cities,
  onSelectCity,
  onSelectLocality,
  onSelectService,
  onOpenServiceDetail,
  onAddToCart,
  onUpdateCartQuantity,
  onQuickBook,
  cartItems = [],
}) => {
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('all');
  const [activeLocalityFilter, setActiveLocalityFilter] = useState<string>('all');

  // Load current city profile
  const cityProfile: CityProfile = useMemo(() => {
    return getCityProfile(selectedCity);
  }, [selectedCity]);

  // Keep locality filter in sync with selectedLocality when parent changes
  useEffect(() => {
    if (selectedLocality && selectedCity.localities.includes(selectedLocality)) {
      setActiveLocalityFilter(selectedLocality);
    } else {
      setActiveLocalityFilter('all');
    }
  }, [selectedCity, selectedLocality]);

  // Filter services by category and optional locality
  const filteredServices = useMemo(() => {
    return cityProfile.topServices.filter((service) => {
      // Category filter
      if (selectedFilterCategory !== 'all') {
        if (selectedFilterCategory === 'ac-appliance' && service.categoryId !== 'ac-appliance') return false;
        if (selectedFilterCategory === 'cleaning' && service.categoryId !== 'cleaning') return false;
        if (selectedFilterCategory === 'salon' && !['salon', 'salon-men', 'massage-men'].includes(service.categoryId)) return false;
      }
      // Locality filter (if active and not 'all')
      if (activeLocalityFilter !== 'all') {
        const matchesLoc = service.neighborhoodsHot.some((loc) =>
          loc.toLowerCase().includes(activeLocalityFilter.toLowerCase()) ||
          activeLocalityFilter.toLowerCase().includes(loc.toLowerCase())
        );
        // If locality doesn't strictly match hot neighborhoods, still keep if general popularity
        return matchesLoc || service.neighborhoodsHot.length === 0;
      }
      return true;
    });
  }, [cityProfile, selectedFilterCategory, activeLocalityFilter]);

  // Helper to convert highlight item to full ServiceItem
  const highlightToServiceItem = (srv: CityServiceHighlight): ServiceItem => {
    return {
      id: srv.id,
      title: srv.title,
      subtitle: srv.whyPopularInCity,
      description: srv.whyPopularInCity,
      price: srv.price,
      originalPrice: srv.originalPrice,
      durationMinutes: srv.durationMinutes,
      isUrgentAvailable: srv.isInstant,
      rating: srv.rating,
      reviewCount: srv.reviewCount,
      image: srv.imageUrl,
      categoryId: srv.categoryId,
      includes: srv.features,
    };
  };

  // Helper to check cart quantity for this service
  const getCartQuantity = (serviceId: string): number => {
    const item = cartItems.find((it) => it.service.id === serviceId);
    return item ? item.quantity : 0;
  };

  return (
    <section
      id="city-explorer-section"
      className="py-12 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 border-y border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold rounded-full">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                City Explorer & Metropolitan Guide
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live in {selectedCity.name}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Top Services in <span className="text-blue-600">{selectedCity.name}</span>
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {cityProfile.tagline}. Curated by real booking trends, housing layouts, and seasonal weather patterns across {selectedCity.name}.
            </p>
          </div>

          {/* Quick city pulse summary */}
          <div className="flex items-center gap-3 self-start md:self-auto bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm text-xs text-slate-700">
            <div className="flex items-center gap-1.5 px-2">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <span className="font-bold text-slate-900">{cityProfile.avgResponseMinutes}m</span>
                <span className="text-slate-500 ml-1">avg SOS</span>
              </div>
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5 px-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-900">{cityProfile.activeProsCount}+</span>
                <span className="text-slate-500 ml-1">verified pros</span>
              </div>
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5 px-2">
              <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-900">{cityProfile.dailyBookingsCount}+</span>
                <span className="text-slate-500 ml-1">booked today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metropolitan City Switcher Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Switch Metropolitan Area:
            </span>
            <span className="text-[11px] text-slate-400">
              Services dynamically adjust to your selected city
            </span>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
            {cities.map((city) => {
              const isCurrent = city.id === selectedCity.id;
              return (
                <button
                  key={city.id}
                  onClick={() => {
                    onSelectCity(city);
                    if (city.localities && city.localities.length > 0) {
                      onSelectLocality(city.localities[0]);
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 ring-2 ring-blue-600 ring-offset-1'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/60'
                  }`}
                >
                  {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                  {city.name}
                  {city.state && (
                    <span
                      className={`text-[10px] ${
                        isCurrent ? 'text-blue-100' : 'text-slate-400'
                      }`}
                    >
                      ({city.state.split('/')[0].trim()})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Neighborhood quick filter in selected city */}
          {selectedCity.localities && selectedCity.localities.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap">
                Neighborhoods in {selectedCity.name}:
              </span>
              <button
                onClick={() => {
                  setActiveLocalityFilter('all');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeLocalityFilter === 'all'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All Neighborhoods
              </button>
              {selectedCity.localities.map((loc) => {
                const isActive = activeLocalityFilter.toLowerCase() === loc.toLowerCase();
                return (
                  <button
                    key={loc}
                    onClick={() => {
                      setActiveLocalityFilter(loc);
                      onSelectLocality(loc);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-blue-100 text-blue-700 border border-blue-300 font-bold'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {loc}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Local Insights Banner */}
        <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50/40 rounded-2xl border border-blue-100 p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                  {selectedCity.name} Climate & Housing Insight
                </span>
                <span className="text-slate-400 text-xs">·</span>
                <span className="text-xs font-semibold text-slate-600">
                  Trending in {cityProfile.topTrendingLocality}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium mt-0.5">
                {cityProfile.climateTip}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            {/* Category Sub-Filters */}
            <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
              <button
                onClick={() => setSelectedFilterCategory('all')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedFilterCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilterCategory('cleaning')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedFilterCategory === 'cleaning'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cleaning & Pest
              </button>
              <button
                onClick={() => setSelectedFilterCategory('ac-appliance')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedFilterCategory === 'ac-appliance'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                AC & Appliance
              </button>
              <button
                onClick={() => setSelectedFilterCategory('salon')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedFilterCategory === 'salon'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Salon & Spa
              </button>
            </div>
          </div>
        </div>

        {/* City Popular Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const qty = getCartQuantity(service.id);
            const fullServiceItem = highlightToServiceItem(service);
            const discountPercent = service.originalPrice
              ? Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)
              : 0;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col group"
              >
                {/* Card Top: Image & Badge */}
                <div className="relative h-48 sm:h-52 bg-slate-100 overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    onError={(e) => handleImageError(e, service.categoryId)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Localized City Demand Pill */}
                  <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 border border-white/10">
                    <span>{service.citySpecificTag}</span>
                  </div>

                  {/* 30m Express SOS indicator if instant */}
                  {service.isInstant && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5">
                      <Zap className="w-3 h-3 fill-slate-950" />
                      30m SOS
                    </div>
                  )}

                  {/* Rating Overlay */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold px-2 py-0.5 rounded-lg shadow-sm flex items-center gap-1 border border-slate-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{service.rating.toFixed(2)}</span>
                    <span className="text-slate-400 font-normal">({service.reviewCount})</span>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-slate-700 text-xs font-medium px-2 py-0.5 rounded-lg shadow-sm flex items-center gap-1 border border-slate-200">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{service.durationMinutes} mins</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Booking count */}
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1.5">
                      <span className="font-semibold text-blue-600 uppercase tracking-wider text-[10px]">
                        {service.categoryName}
                      </span>
                      <span>{service.bookingCountCity}+ booked in {selectedCity.name}</span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onOpenServiceDetail(fullServiceItem)}
                      className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
                    >
                      {service.title}
                    </h3>

                    {/* Why Popular in City explanation */}
                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {service.whyPopularInCity}
                    </p>

                    {/* Top Neighborhoods badge list */}
                    {service.neighborhoodsHot && service.neighborhoodsHot.length > 0 && (
                      <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Hotspots:
                        </span>
                        {service.neighborhoodsHot.map((loc) => (
                          <span
                            key={loc}
                            className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md"
                          >
                            {loc}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Key Features Bullet points */}
                    <div className="mt-3 space-y-1">
                      {service.features.slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Price & Actions */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    {/* Price */}
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-slate-900">
                          ₹{service.price}
                        </span>
                        {service.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{service.originalPrice}
                          </span>
                        )}
                      </div>
                      {discountPercent > 0 && (
                        <span className="text-[11px] font-bold text-emerald-600">
                          {discountPercent}% savings
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      {/* View Details Button */}
                      <button
                        onClick={() => onOpenServiceDetail(fullServiceItem)}
                        className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                        title="View details"
                      >
                        Details
                      </button>

                      {/* Add to Cart or Quantity Stepper */}
                      {qty > 0 ? (
                        <div className="flex items-center bg-blue-50 border border-blue-200 rounded-xl px-1.5 py-1 shadow-sm">
                          <button
                            onClick={() => onUpdateCartQuantity?.(service.id, -1)}
                            className="w-6 h-6 rounded-lg bg-white text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black text-blue-700 px-2 min-w-[20px] text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => onUpdateCartQuantity?.(service.id, 1)}
                            className="w-6 h-6 rounded-lg bg-white text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => onAddToCart?.(fullServiceItem)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add
                        </button>
                      )}

                      {/* Quick Book Button */}
                      {onQuickBook && (
                        <button
                          onClick={() => onQuickBook(fullServiceItem)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer hidden sm:flex items-center gap-1"
                        >
                          Book
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state if filter yields zero items */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              No services match the current filter in {selectedCity.name}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try resetting the neighborhood filter or selecting "All" to browse all top-rated services in {selectedCity.name}.
            </p>
            <button
              onClick={() => {
                setSelectedFilterCategory('all');
                setActiveLocalityFilter('all');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom City Switch Banner Callout */}
        <div className="mt-10 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5 mb-2">
              <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              Moving or Traveling Across India?
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              UrgentLyfe is active across 14+ Indian metropolitan areas
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
              Whenever you switch cities in the navbar or using GPS auto-detect, your catalog, localized discounts, and 30-minute Express SOS teams update automatically to your new home.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                const pickerBtn = document.getElementById('location-picker-btn');
                pickerBtn?.click();
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              Change Location in Navbar
            </button>
          </div>

          {/* Subtle background decoration */}
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
