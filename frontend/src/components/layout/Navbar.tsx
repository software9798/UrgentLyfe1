import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  Search,
  Zap,
  ShoppingCart,
  UserCircle,
  User as UserIcon,
  ChevronDown,
  ShieldCheck,
  LogOut,
  Home,
  Wrench,
  Gift,
  ArrowRight,
  Plus,
  Check,
  XCircle,
  Navigation,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { City, User, ProviderProfile, ServiceItem, Category } from '../../types';
import { searchServices } from '../../utils/searchHelper';
import { handleImageError } from '../../utils/imageFallback';

interface NavbarProps {
  cities: City[];
  selectedCity: City;
  onSelectCity: (city: City) => void;
  selectedLocality: string;
  onSelectLocality: (locality: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  services?: ServiceItem[];
  categories?: Category[];
  onSelectService?: (service: ServiceItem) => void;
  onAddToCart?: (service: ServiceItem) => void;
  onOpenAIDoctor?: () => void;
  onOpenAIChat?: () => void;
  onOpenReferAndEarn?: () => void;
  onOpenAPIDocs?: () => void;
  cartItemCount: number;
  onOpenCart: () => void;
  walletBalance: number;
  onQuickSOS: () => void;
  // Geolocation & Auto-detection
  onDetectLocation?: () => Promise<void> | void;
  isDetectingLocation?: boolean;
  detectionMessage?: { text: string; type: 'success' | 'error' | 'info' } | null;
  onClearDetectionMessage?: () => void;
  // Auth & Roles Props
  currentUser: User | null;
  providerProfile?: ProviderProfile | null;
  onOpenAuth: () => void;
  onOpenAddresses: () => void;
  onOpenProviderModal: () => void;
  onOpenAdminModal: () => void;
  onLogout: () => void;
  onOpenHelpCenter?: () => void;
  onOpenMyBookings?: () => void;
  // Nav links
  onNavigateHome?: () => void;
  onNavigateServices?: () => void;
}

// Helper to highlight matching query text in bold
function highlightMatch(text: string, query: string) {
  if (!query || !query.trim()) return text;
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="font-black text-slate-950">
            {part}
          </span>
        ) : (
          <span key={i} className="font-normal text-slate-800">
            {part}
          </span>
        )
      )}
    </>
  );
}

// Helper to format review counts (e.g. 2.9M, 859K)
function formatReviewCount(count: number): string {
  if (!count) return '1.2K';
  if (count >= 1000000) return `${(count / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1).replace(/\.0$/, '')}K`;
  return `${(count * 8).toLocaleString()}`;
}

export const Navbar: React.FC<NavbarProps> = ({
  cities,
  selectedCity,
  onSelectCity,
  selectedLocality,
  onSelectLocality,
  searchQuery,
  onSearchChange,
  services = [],
  categories = [],
  onSelectService,
  onAddToCart,
  onOpenReferAndEarn,
  cartItemCount = 0,
  onOpenCart,
  walletBalance,
  onQuickSOS,
  currentUser,
  onOpenAuth,
  onOpenAddresses,
  onOpenProviderModal,
  onOpenAdminModal,
  onLogout,
  onOpenHelpCenter,
  onOpenMyBookings,
  onNavigateHome,
  onNavigateServices,
  onDetectLocation,
  isDetectingLocation = false,
  detectionMessage = null,
  onClearDetectionMessage,
}) => {
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [addedItemNoticeId, setAddedItemNoticeId] = useState<string | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const profileContainerRef = useRef<HTMLDivElement>(null);
  const cityContainerRef = useRef<HTMLDivElement>(null);

  const displayLocation = selectedLocality
    ? `${selectedLocality}, ${selectedCity.name}`
    : selectedCity.name;

  // Real-time suggestions for search
  const { filtered: matchingSuggestions } = searchServices(
    services,
    categories,
    searchQuery,
    'all'
  );
  const topSuggestions = matchingSuggestions.slice(0, 7);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
      if (
        profileContainerRef.current &&
        !profileContainerRef.current.contains(e.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        cityContainerRef.current &&
        !cityContainerRef.current.contains(e.target as Node)
      ) {
        setIsCityOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);
    if (onNavigateServices) {
      onNavigateServices();
    }
    setTimeout(() => {
      const catalog = document.getElementById('services-catalog-grid');
      catalog?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleSelectSuggestedService = (service: ServiceItem) => {
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);
    onSearchChange(service.title);
    if (onSelectService) {
      onSelectService(service);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent, service: ServiceItem) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(service);
      setAddedItemNoticeId(service.id);
      setTimeout(() => setAddedItemNoticeId(null), 1800);
    }
  };

  const getCategoryName = (catId: string) => {
    const found = categories.find((c) => c.id === catId);
    if (found) return found.name;
    if (catId.includes('ac')) return 'AC Service & Repair';
    if (catId.includes('plumb')) return 'Plumbing Services';
    if (catId.includes('electr')) return 'Electrical Services';
    if (catId.includes('clean')) return 'Cleaning & Pest';
    return 'Home Services';
  };

  return (
    <header id="main-navbar" className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* 1. LEFT: Brand Logo */}
          <div className="flex items-center space-x-4 lg:space-x-6 shrink-0">
            <button
              onClick={onNavigateHome}
              className="flex items-center space-x-2 text-left group cursor-pointer focus:outline-none"
              title="UrgentLyfe - Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-lg sm:text-xl italic shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
                U<span className="text-amber-300">L</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 leading-none">
                  Urgent<span className="text-blue-600">Lyfe</span>
                </span>
                <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">
                  Home Services & SOS
                </span>
              </div>
            </button>

            {/* Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-1 font-semibold text-xs text-slate-600">
              <button
                onClick={onNavigateHome}
                className="px-3 py-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={onNavigateServices || (() => {
                  const el = document.getElementById('services-catalog-grid');
                  el?.scrollIntoView({ behavior: 'smooth' });
                })}
                className="px-3 py-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Services
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('city-explorer-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Compass className="w-3.5 h-3.5 text-blue-600" />
                <span>City Explorer</span>
              </button>
              <button
                onClick={onQuickSOS}
                className="px-3 py-1.5 rounded-lg text-amber-700 hover:bg-amber-50 font-bold transition-colors cursor-pointer flex items-center gap-1"
              >
                <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>Emergency SOS</span>
              </button>
            </nav>
          </div>

          {/* 2. CENTER: Location Selector & UrgentLyfe Style Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl lg:max-w-3xl mx-2 lg:mx-4 gap-2">
            
            {/* Location Selector Pill */}
            <div ref={cityContainerRef} className="relative shrink-0">
              <button
                id="location-picker-btn"
                onClick={() => setIsCityOpen(!isCityOpen)}
                className={`flex items-center gap-1.5 text-slate-800 text-xs font-semibold px-3 py-2.5 rounded-xl border transition-all cursor-pointer shadow-2xs max-w-[160px] lg:max-w-[200px] ${
                  isDetectingLocation
                    ? 'bg-blue-50 border-blue-400 text-blue-800 animate-pulse'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-300'
                }`}
                title="Change Service Location"
              >
                {isDetectingLocation ? (
                  <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin shrink-0" />
                ) : (
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                )}
                <span className="truncate">
                  {isDetectingLocation ? 'Detecting...' : displayLocation}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400 shrink-0 ml-auto" />
              </button>

              {/* Desktop Location Dropdown */}
              {isCityOpen && (
                <div className="absolute left-0 mt-2 w-84 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-fadeIn">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-extrabold text-slate-900">Select Service Location</span>
                    </div>
                    <button
                      onClick={() => setIsCityOpen(false)}
                      className="text-xs text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  {/* 1. Browser Geolocation GPS Auto-Detect Button */}
                  {onDetectLocation && (
                    <button
                      type="button"
                      onClick={() => {
                        onDetectLocation();
                      }}
                      disabled={isDetectingLocation}
                      className="w-full flex items-center justify-between p-2.5 mb-3 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 hover:from-blue-100 hover:to-indigo-100 text-blue-900 rounded-xl border border-blue-200/80 text-xs font-semibold transition-all group cursor-pointer shadow-2xs disabled:opacity-80"
                    >
                      <div className="flex items-center gap-2.5 text-left">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                          {isDetectingLocation ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Navigation className="w-3.5 h-3.5" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-tight flex items-center gap-1.5">
                            <span>{isDetectingLocation ? 'Detecting your location...' : 'Use current location'}</span>
                            {isDetectingLocation && (
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                            )}
                          </p>
                          <p className="text-[10px] text-blue-700 font-medium">
                            Auto-detect city & locality via GPS
                          </p>
                        </div>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-200 shadow-2xs">
                        GPS
                      </span>
                    </button>
                  )}

                  {/* Detection Feedback Message */}
                  {detectionMessage && (
                    <div
                      className={`mb-3 p-2.5 rounded-xl border flex items-start justify-between gap-2 text-xs animate-fadeIn ${
                        detectionMessage.type === 'success'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-rose-50 border-rose-200 text-rose-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {detectionMessage.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                        <span className="text-[11px] font-medium leading-snug">
                          {detectionMessage.text}
                        </span>
                      </div>
                      {onClearDetectionMessage && (
                        <button
                          type="button"
                          onClick={onClearDetectionMessage}
                          className="text-slate-400 hover:text-slate-600 text-xs shrink-0"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  )}

                  {/* Search City / Locality Input */}
                  <div className="relative mb-3">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      placeholder="Search city or area (e.g. Indiranagar, Bandra)..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-7 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                    {locationSearch && (
                      <button
                        onClick={() => setLocationSearch('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Filtered Search Results */}
                  {locationSearch.trim().length > 0 ? (
                    <div className="max-h-56 overflow-y-auto space-y-1 divide-y divide-slate-100">
                      {(() => {
                        const q = locationSearch.toLowerCase().trim();
                        const matches: { city: City; locality: string; isCityMatch?: boolean }[] = [];
                        
                        cities.forEach((c) => {
                          if (c.name.toLowerCase().includes(q)) {
                            matches.push({ city: c, locality: c.localities[0] || 'Center', isCityMatch: true });
                          }
                          c.localities.forEach((loc) => {
                            if (loc.toLowerCase().includes(q)) {
                              matches.push({ city: c, locality: loc });
                            }
                          });
                        });

                        if (matches.length === 0) {
                          return (
                            <div className="py-6 text-center text-slate-400 text-xs">
                              No cities or localities matching &quot;{locationSearch}&quot;
                            </div>
                          );
                        }

                        return matches.slice(0, 8).map((m, idx) => (
                          <button
                            key={`${m.city.id}-${m.locality}-${idx}`}
                            onClick={() => {
                              onSelectCity(m.city);
                              onSelectLocality(m.locality);
                              setLocationSearch('');
                              setIsCityOpen(false);
                            }}
                            className="w-full text-left p-2 hover:bg-blue-50 rounded-lg text-xs flex items-center justify-between cursor-pointer transition-colors"
                          >
                            <div>
                              <span className="font-bold text-slate-800">{m.locality}</span>
                              <span className="text-slate-500 text-[10px] ml-1">
                                in {m.city.name}
                              </span>
                            </div>
                            <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded">
                              Select
                            </span>
                          </button>
                        ));
                      })()}
                    </div>
                  ) : (
                    <>
                      {/* City Selector Tabs */}
                      <div className="mb-2.5">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                          <span>Select City</span>
                          <span className="text-[9px] text-slate-400 font-normal">{cities.length} cities available</span>
                        </p>
                        <div className="max-h-36 overflow-y-auto space-y-0.5 pr-1">
                          {cities.map((city) => (
                            <button
                              key={city.id}
                              onClick={() => {
                                onSelectCity(city);
                                onSelectLocality(city.localities[0] || '');
                              }}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                                city.id === selectedCity.id
                                  ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                                  : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                              }`}
                            >
                              <span>{city.name}</span>
                              <div className="flex items-center gap-1">
                                {city.popular && (
                                  <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-semibold">
                                    Popular
                                  </span>
                                )}
                                {city.id === selectedCity.id && (
                                  <Check className="w-3 h-3 text-blue-600" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Locality Selector Grid for Selected City */}
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                          <span>Popular Localities in {selectedCity.name}</span>
                          <span className="text-[9px] text-blue-600 font-semibold">Instant 30m SOS</span>
                        </p>
                        <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto pr-1">
                          {selectedCity.localities.map((loc) => (
                            <button
                              key={loc}
                              onClick={() => {
                                onSelectLocality(loc);
                                setIsCityOpen(false);
                              }}
                              className={`text-[11px] px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                                loc === selectedLocality
                                  ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-2xs'
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                              }`}
                            >
                              {loc}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quick City Explorer Link in Dropdown */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCityOpen(false);
                            setTimeout(() => {
                              const el = document.getElementById('city-explorer-section');
                              el?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                          }}
                          className="w-full py-1.5 px-2 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-800 rounded-lg text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5 text-blue-600" />
                            <span>City Explorer for {selectedCity.name}</span>
                          </span>
                          <span className="text-[10px] text-blue-600 font-semibold">View Top Services →</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* URGENTLYFE STYLE SEARCH BAR */}
            <div ref={searchContainerRef} className="flex-1 relative">
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center bg-white border border-slate-300 hover:border-slate-400 focus-within:border-slate-800 rounded-xl transition-all shadow-2xs"
              >
                <div className="pl-3.5 pr-1 text-slate-400">
                  <Search className="w-4 h-4 text-slate-500" />
                </div>
                <input
                  id="search-services-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search for services..."
                  className="w-full bg-transparent py-2.5 pr-9 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      onSearchChange('');
                      setIsSearchFocused(false);
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 transition-colors p-0.5 cursor-pointer"
                    title="Clear search"
                  >
                    <XCircle className="w-4 h-4 text-slate-600 fill-slate-600" />
                  </button>
                )}
              </form>

              {/* URGENTLYFE STYLE LIVE SEARCH DROPDOWN */}
              {isSearchFocused && searchQuery.trim().length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl shadow-2xl border border-slate-200/95 overflow-hidden z-50 animate-fadeIn">
                  
                  {topSuggestions.length > 0 ? (
                    <div className="max-h-[420px] overflow-y-auto divide-y divide-slate-100">
                      {topSuggestions.map((srv) => {
                        const hasFreeCheck =
                          srv.title.toLowerCase().includes('ac') ||
                          srv.tags.some((t) => t.toLowerCase().includes('check') || t.toLowerCase().includes('gas'));

                        return (
                          <div
                            key={srv.id}
                            onClick={() => handleSelectSuggestedService(srv)}
                            className="p-3 sm:p-3.5 hover:bg-slate-50/90 transition-colors cursor-pointer flex items-center gap-3.5 group"
                          >
                            {/* Thumbnail */}
                            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden shrink-0 bg-slate-100 relative border border-slate-100">
                              <img
                                src={srv.image}
                                alt={srv.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                referrerPolicy="no-referrer"
                                onError={(e) => handleImageError(e, srv.categoryId || 'service')}
                              />
                              {hasFreeCheck && (
                                <span className="absolute top-1 left-1 bg-emerald-800 text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs leading-tight">
                                  Free gas check
                                </span>
                              )}
                              {!hasFreeCheck && srv.discountPercent && (
                                <span className="absolute top-1 left-1 bg-rose-600 text-white text-[8px] font-bold px-1 py-0.5 rounded shadow-xs">
                                  {srv.discountPercent}% OFF
                                </span>
                              )}
                            </div>

                            {/* Details with Bold Query Highlight */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs sm:text-[13.5px] leading-snug group-hover:text-blue-600 transition-colors truncate">
                                {highlightMatch(srv.title, searchQuery)}
                              </h4>

                              <div className="flex items-center flex-wrap gap-1 text-[11px] sm:text-xs text-slate-600 mt-1 font-medium">
                                <span className="text-amber-500 font-bold">★</span>
                                <span className="text-slate-800 font-semibold">{srv.rating}</span>
                                <span className="text-slate-500">
                                  ({formatReviewCount(srv.reviewCount)})
                                </span>
                                <span className="text-slate-300 mx-0.5">•</span>
                                <span className="text-slate-800 font-semibold">
                                  {srv.originalPrice ? `Starts at ₹${srv.price}` : `₹${srv.price}`}
                                </span>
                                <span className="text-slate-300 mx-0.5">•</span>
                                <span className="text-slate-500 truncate max-w-[140px]">
                                  {getCategoryName(srv.categoryId)}
                                </span>
                              </div>
                            </div>

                            {/* Quick Add / Book Action Button */}
                            <div className="shrink-0 pl-1">
                              <button
                                type="button"
                                onClick={(e) => handleQuickAdd(e, srv)}
                                className={`text-[11px] font-black px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                                  addedItemNoticeId === srv.id
                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-white hover:bg-slate-100 text-slate-900 border-slate-200'
                                }`}
                                title="Add to Cart"
                              >
                                {addedItemNoticeId === srv.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-white" />
                                    <span>Added</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3 h-3 text-slate-700" />
                                    <span>Add</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-5 text-center text-xs text-slate-500 space-y-1">
                      <p className="font-bold text-slate-700">No services found for "{searchQuery}"</p>
                      <p className="text-[11px]">Try searching for 'AC', 'Plumber', 'Fan', or 'Cleaning'</p>
                    </div>
                  )}

                  {/* Bottom Footer View All */}
                  <div className="p-2 bg-slate-50 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="w-full py-2 px-3 text-center text-xs font-bold text-blue-700 hover:text-blue-800 hover:bg-blue-50/70 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>View all {matchingSuggestions.length} matching packages</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* 3. RIGHT ACTIONS: ONLY CART OPTION & PROFILE (LOGIN PROMPT) */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            {/* Mobile Search Icon Toggle */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
              title="Search Services"
            >
              <Search className="w-5 h-5 text-slate-700" />
            </button>

            {/* ONLY CART OPTION - CIRCULAR ICON EXACTLY MATCHING USER SCREENSHOT, NO TEXT */}
            <button
              id="main-cart-btn"
              type="button"
              onClick={onOpenCart}
              className="relative w-11 h-11 rounded-full border-2 border-slate-200/90 hover:border-slate-400 bg-white hover:bg-slate-50 active:scale-95 transition-all cursor-pointer flex items-center justify-center text-slate-900 shadow-2xs group shrink-0"
              title="View Cart"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-5 h-5 text-slate-900 stroke-[1.9] group-hover:scale-105 transition-transform" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* PROFILE ICON (CLICK PROMPTS LOGIN IF NOT LOGGED IN) */}
            {currentUser ? (
              <div ref={profileContainerRef} className="relative">
                <button
                  id="profile-dropdown-btn"
                  type="button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-800 transition-all cursor-pointer active:scale-95"
                  title="Profile & Menu"
                  aria-label="Profile & Menu"
                >
                  <UserCircle className="w-6 h-6 sm:w-7 sm:h-7 text-slate-800 stroke-[1.75]" />
                </button>

                {/* Profile Popover Menu (Matching Video 1 & Video 2) */}
                {isProfileOpen && (
                  <div
                    id="profile-dropdown-menu"
                    className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <button
                      id="menu-help-center-btn"
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false);
                        if (onOpenHelpCenter) onOpenHelpCenter();
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span>Help Center</span>
                    </button>

                    <button
                      id="menu-my-bookings-btn"
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false);
                        if (onOpenMyBookings) onOpenMyBookings();
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span>My Bookings</span>
                    </button>

                    {/* Partner & Admin special portals if applicable */}
                    {currentUser.role === 'PROVIDER' && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          onOpenProviderModal();
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 flex items-center gap-2 cursor-pointer"
                      >
                        <Wrench className="w-3.5 h-3.5" />
                        <span>Partner Portal</span>
                      </button>
                    )}

                    {currentUser.role === 'ADMIN' && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          onOpenAdminModal();
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-purple-600 hover:bg-purple-50 flex items-center gap-2 cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Admin Panel</span>
                      </button>
                    )}

                    <div className="my-1 border-t border-slate-100" />

                    <button
                      id="menu-logout-btn"
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-800 hover:text-rose-600 hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span>Log out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Profile Icon when NOT logged in: Clicking prompts login (Matching video screenshot) */
              <button
                id="profile-login-btn"
                type="button"
                onClick={onOpenAuth}
                className="flex flex-col items-center justify-center text-slate-800 hover:text-slate-950 px-2 py-0.5 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group shrink-0 active:scale-95"
                title="Log In / Profile"
                aria-label="Log In"
              >
                <UserCircle className="w-6 h-6 sm:w-6 sm:h-6 text-slate-800 group-hover:scale-105 transition-transform stroke-[1.75]" />
                <span className="text-[11px] font-semibold text-slate-700 group-hover:text-slate-950 tracking-tight leading-none mt-0.5">
                  Login
                </span>
              </button>
            )}

          </div>
        </div>

        {/* Mobile Location & Search Row */}
        <div className="md:hidden pb-3 pt-1 space-y-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCityOpen(!isCityOpen)}
              className={`flex-1 flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl border transition-all ${
                isDetectingLocation
                  ? 'bg-blue-50 border-blue-400 text-blue-800 animate-pulse'
                  : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              {isDetectingLocation ? (
                <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin shrink-0" />
              ) : (
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              )}
              <span className="truncate">{isDetectingLocation ? 'Detecting location...' : displayLocation}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-auto" />
            </button>

            <button
              onClick={onQuickSOS}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-2.5 py-1.5 rounded-xl text-[11px] font-black flex items-center gap-1 shrink-0 shadow-xs"
            >
              <Zap className="w-3 h-3 fill-slate-950" />
              <span>30m SOS</span>
            </button>
          </div>

          {/* Mobile Location Picker Bottom Sheet / Modal */}
          {isCityOpen && (
            <div
              className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex flex-col justify-end p-0 animate-fadeIn"
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsCityOpen(false);
              }}
            >
              <div className="bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-4 shadow-2xl border-t border-slate-200 animate-slideUp">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                        Select Service Location
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        Doorstep services & 30m SOS dispatch
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsCityOpen(false)}
                    className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                {/* 1. GPS Auto-Detect Button */}
                {onDetectLocation && (
                  <button
                    type="button"
                    onClick={() => {
                      onDetectLocation();
                    }}
                    disabled={isDetectingLocation}
                    className="w-full flex items-center justify-between p-3 mb-3 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 hover:from-blue-100 text-blue-950 rounded-2xl border border-blue-200 text-xs font-semibold shadow-xs disabled:opacity-80"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        {isDetectingLocation ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Navigation className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-tight flex items-center gap-1.5">
                          <span>{isDetectingLocation ? 'Detecting your location...' : 'Use current location'}</span>
                          {isDetectingLocation && (
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                          )}
                        </p>
                        <p className="text-[10px] text-blue-700 font-medium">
                          Auto-detect city & locality via GPS
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                      GPS
                    </span>
                  </button>
                )}

                {/* Detection Feedback Message */}
                {detectionMessage && (
                  <div
                    className={`mb-3 p-2.5 rounded-xl border flex items-start justify-between gap-2 text-xs ${
                      detectionMessage.type === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-rose-50 border-rose-200 text-rose-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {detectionMessage.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span className="text-[11px] font-medium leading-snug">
                        {detectionMessage.text}
                      </span>
                    </div>
                    {onClearDetectionMessage && (
                      <button
                        type="button"
                        onClick={onClearDetectionMessage}
                        className="text-slate-400 hover:text-slate-600 text-xs shrink-0"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                )}

                {/* Search City / Locality Input */}
                <div className="relative mb-3">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    placeholder="Search city or area (e.g. Indiranagar, Bandra)..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8.5 pr-7 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                  {locationSearch && (
                    <button
                      onClick={() => setLocationSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Filtered Search Results */}
                {locationSearch.trim().length > 0 ? (
                  <div className="max-h-60 overflow-y-auto space-y-1 divide-y divide-slate-100">
                    {(() => {
                      const q = locationSearch.toLowerCase().trim();
                      const matches: { city: City; locality: string }[] = [];
                      
                      cities.forEach((c) => {
                        if (c.name.toLowerCase().includes(q)) {
                          matches.push({ city: c, locality: c.localities[0] || 'Center' });
                        }
                        c.localities.forEach((loc) => {
                          if (loc.toLowerCase().includes(q)) {
                            matches.push({ city: c, locality: loc });
                          }
                        });
                      });

                      if (matches.length === 0) {
                        return (
                          <div className="py-6 text-center text-slate-400 text-xs">
                            No cities or localities matching &quot;{locationSearch}&quot;
                          </div>
                        );
                      }

                      return matches.slice(0, 10).map((m, idx) => (
                        <button
                          key={`mobile-${m.city.id}-${m.locality}-${idx}`}
                          onClick={() => {
                            onSelectCity(m.city);
                            onSelectLocality(m.locality);
                            setLocationSearch('');
                            setIsCityOpen(false);
                          }}
                          className="w-full text-left p-2.5 hover:bg-blue-50 rounded-xl text-xs flex items-center justify-between cursor-pointer"
                        >
                          <div>
                            <span className="font-bold text-slate-900">{m.locality}</span>
                            <span className="text-slate-500 text-[10px] ml-1">
                              in {m.city.name}
                            </span>
                          </div>
                          <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-md">
                            Select
                          </span>
                        </button>
                      ));
                    })()}
                  </div>
                ) : (
                  <>
                    {/* City Selector Tabs */}
                    <div className="mb-3">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Select City
                      </p>
                      <div className="flex gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
                        {cities.map((city) => (
                          <button
                            key={`mobile-tab-${city.id}`}
                            onClick={() => {
                              onSelectCity(city);
                              onSelectLocality(city.localities[0] || '');
                            }}
                            className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                              city.id === selectedCity.id
                                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            {city.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Localities for Selected City */}
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Localities in {selectedCity.name}
                      </p>
                      <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
                        {selectedCity.localities.map((loc) => (
                          <button
                            key={`mobile-loc-${loc}`}
                            onClick={() => {
                              onSelectLocality(loc);
                              setIsCityOpen(false);
                            }}
                            className={`text-xs px-2.5 py-1 rounded-xl border transition-all ${
                              loc === selectedLocality
                                ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-2xs'
                                : 'bg-white text-slate-700 border-slate-200'
                            }`}
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick City Explorer Link in Mobile Picker */}
                    <div className="pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCityOpen(false);
                          setTimeout(() => {
                            const el = document.getElementById('city-explorer-section');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                        className="w-full py-2 px-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 text-blue-900 rounded-xl text-xs font-bold flex items-center justify-between transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <Compass className="w-4 h-4 text-blue-600" />
                          <span>Explore Top Services in {selectedCity.name}</span>
                        </span>
                        <span className="text-[11px] text-blue-600 font-extrabold">View →</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {isMobileSearchOpen && (
            <div className="relative animate-fadeIn">
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center bg-white border border-slate-300 rounded-xl"
              >
                <div className="pl-3 pr-1 text-slate-400">
                  <Search className="w-4 h-4 text-slate-500" />
                </div>
                <input
                  id="search-services-mobile-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search for services..."
                  autoFocus
                  className="w-full bg-transparent py-2 pr-8 text-xs font-medium text-slate-900 focus:outline-none placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="p-1.5 text-slate-500 hover:text-slate-800"
                  >
                    <XCircle className="w-4 h-4 text-slate-600 fill-slate-600" />
                  </button>
                )}
              </form>

              {/* Mobile Search Dropdown */}
              {searchQuery.trim().length > 0 && (
                <div className="mt-1 bg-white rounded-xl shadow-xl border border-slate-200 divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {topSuggestions.map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => handleSelectSuggestedService(srv)}
                      className="p-2.5 flex items-center gap-2.5 hover:bg-slate-50 cursor-pointer"
                    >
                      <img
                        src={srv.image}
                        alt={srv.title}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, srv.categoryId || 'service')}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-900 truncate">
                          {highlightMatch(srv.title, searchQuery)}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          ★ {srv.rating} • ₹{srv.price} • {getCategoryName(srv.categoryId)}
                        </p>
                      </div>
                      {onAddToCart && (
                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(e, srv)}
                          className="shrink-0 px-2.5 py-1 text-[10px] font-black bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg border border-blue-200 transition-colors"
                        >
                          + Add
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
