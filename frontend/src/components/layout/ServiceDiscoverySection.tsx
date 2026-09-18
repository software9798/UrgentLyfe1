import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Sparkles,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Plus,
  Minus,
  Check,
  Star,
  Clock,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { ServiceItem, Category } from '../../types';
import { searchServices } from '../../utils/searchHelper';
import { handleImageError } from '../../utils/imageFallback';

interface ServiceDiscoverySectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectSuggestion: (query: string) => void;
  matchCount?: number;
  onClearSearch?: () => void;
  services?: ServiceItem[];
  categories?: Category[];
  onSelectService?: (service: ServiceItem) => void;
  onAddToCart?: (service: ServiceItem) => void;
  cartItems?: { service: ServiceItem; quantity: number }[];
  onUpdateCartQuantity?: (serviceId: string, delta: number) => void;
  onBookNow?: (service: ServiceItem) => void;
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
          <span key={i} className="font-black text-slate-950 underline decoration-blue-500/40">
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

export const ServiceDiscoverySection: React.FC<ServiceDiscoverySectionProps> = ({
  searchQuery,
  onSearchChange,
  onSelectSuggestion,
  matchCount,
  onClearSearch,
  services = [],
  categories = [],
  onSelectService,
  onAddToCart,
  cartItems = [],
  onUpdateCartQuantity,
  onBookNow,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [addedNoticeId, setAddedNoticeId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const QUICK_PROMPTS = [
    { label: 'AC not cooling', category: 'ac-appliance' },
    { label: 'Water leakage', category: 'plumbing' },
    { label: 'Fan not working', category: 'electrical' },
    { label: 'MCB keeps tripping', category: 'electrical' },
    { label: 'Plumber required', category: 'plumbing' },
    { label: 'Washing machine repair', category: 'appliance' },
    { label: 'Deep bathroom cleaning', category: 'cleaning' },
    { label: 'Salon facial & wax', category: 'salon' },
  ];

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsFocused(false);
    const catalog = document.getElementById('services-catalog-grid');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChipClick = (label: string) => {
    if (searchQuery.toLowerCase().trim() === label.toLowerCase().trim()) {
      if (onClearSearch) onClearSearch();
      else onSearchChange('');
    } else {
      onSelectSuggestion(label);
      setIsFocused(false);
      // Small timeout to allow state to settle, then scroll to results if desired
      setTimeout(() => {
        const catalog = document.getElementById('services-catalog-grid');
        if (catalog) {
          catalog.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  // Compute matched services
  const { filtered: matchingSuggestions } = searchServices(
    services,
    categories,
    searchQuery,
    'all'
  );
  const topDropdownSuggestions = matchingSuggestions.slice(0, 6);
  const topDirectResults = matchingSuggestions.slice(0, 4);

  const getCategoryName = (catId: string) => {
    const found = categories.find((c) => c.id === catId);
    if (found) return found.name;
    if (catId.includes('ac')) return 'AC Service & Repair';
    if (catId.includes('plumb')) return 'Plumbing Services';
    if (catId.includes('electr')) return 'Electrical Services';
    if (catId.includes('clean')) return 'Cleaning & Pest';
    return 'Home Services';
  };

  const isSearching = searchQuery.trim().length > 0;

  const getItemCartQty = (serviceId: string) => {
    const item = cartItems.find((i) => i.service.id === serviceId);
    return item ? item.quantity : 0;
  };

  return (
    <section id="service-discovery-section" className="mx-4 sm:mx-6 lg:mx-8 my-8">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 shadow-xs max-w-5xl mx-auto transition-all">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-5">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>INSTANT SMART SEARCH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            What service do you need?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Type any home service, issue or appliance to instantly see verified prices and book top specialists.
          </p>
        </div>

        {/* Large Urban Company Style Search Input Form */}
        <div ref={containerRef} className="max-w-2xl mx-auto mb-5 relative">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center bg-white border-2 border-slate-300 hover:border-slate-400 focus-within:border-slate-900 rounded-2xl transition-all shadow-xs"
          >
            <div className="pl-4 pr-1 text-slate-400">
              <Search className="w-5 h-5 text-slate-500" />
            </div>

            <input
              ref={inputRef}
              id="discovery-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setIsFocused(true);
              }}
              onFocus={() => setIsFocused(true)}
              placeholder="Search for 'AC service', 'Plumber', 'Fan repair'..."
              className="w-full bg-transparent py-3.5 pr-28 text-sm sm:text-base font-medium text-slate-900 focus:outline-none placeholder:text-slate-400"
            />

            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    if (onClearSearch) onClearSearch();
                    else onSearchChange('');
                    setIsFocused(false);
                    inputRef.current?.focus();
                  }}
                  className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                  title="Clear search"
                >
                  <XCircle className="w-4 h-4 fill-slate-500 text-white" />
                </button>
              )}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Urban Company Live Suggestion Dropdown */}
          {isFocused && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200/95 overflow-hidden z-50 animate-fadeIn">
              {topDropdownSuggestions.length > 0 ? (
                <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100">
                  {topDropdownSuggestions.map((srv) => {
                    const hasFreeCheck =
                      srv.title.toLowerCase().includes('ac') ||
                      srv.tags.some((t) => t.toLowerCase().includes('check') || t.toLowerCase().includes('gas'));
                    const cartQty = getItemCartQty(srv.id);

                    return (
                      <div
                        key={srv.id}
                        onClick={() => {
                          setIsFocused(false);
                          onSearchChange(srv.title);
                          if (onSelectService) {
                            onSelectService(srv);
                          }
                        }}
                        className="p-3 sm:p-3.5 hover:bg-slate-50/90 transition-colors cursor-pointer flex items-center gap-3.5 group text-left"
                      >
                        {/* Thumbnail */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 relative border border-slate-100">
                          <img
                            src={srv.image}
                            alt={srv.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                            onError={(e) => handleImageError(e, srv.categoryId || 'service')}
                          />
                          {hasFreeCheck && (
                            <span className="absolute top-1 left-1 bg-emerald-800 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-xs leading-tight">
                              Free gas check
                            </span>
                          )}
                          {!hasFreeCheck && srv.discountPercent && (
                            <span className="absolute top-1 left-1 bg-rose-600 text-white text-[8px] font-bold px-1 py-0.5 rounded shadow-xs">
                              {srv.discountPercent}% OFF
                            </span>
                          )}
                        </div>

                        {/* Details */}
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
                            <span className="text-slate-900 font-bold">
                              ₹{srv.price}
                            </span>
                            {srv.originalPrice && (
                              <span className="text-slate-400 line-through text-[10px]">
                                ₹{srv.originalPrice}
                              </span>
                            )}
                            <span className="text-slate-300 mx-0.5">•</span>
                            <span className="text-slate-500 truncate max-w-[130px]">
                              {getCategoryName(srv.categoryId)}
                            </span>
                          </div>
                        </div>

                        {/* Action: Add to Cart */}
                        <div className="shrink-0 pl-1">
                          {cartQty > 0 ? (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-2 py-1"
                            >
                              <button
                                type="button"
                                onClick={() => onUpdateCartQuantity && onUpdateCartQuantity(srv.id, -1)}
                                className="w-5 h-5 rounded flex items-center justify-center text-blue-700 hover:bg-blue-100 font-bold text-xs cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-black text-blue-900 min-w-[14px] text-center">
                                {cartQty}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateCartQuantity && onUpdateCartQuantity(srv.id, 1)}
                                className="w-5 h-5 rounded flex items-center justify-center text-blue-700 hover:bg-blue-100 font-bold text-xs cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          ) : onAddToCart ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(srv);
                                setAddedNoticeId(srv.id);
                                setTimeout(() => setAddedNoticeId(null), 1800);
                              }}
                              className={`text-[11px] font-black px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                                addedNoticeId === srv.id
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : 'bg-white hover:bg-slate-100 text-slate-900 border-slate-200 shadow-2xs'
                              }`}
                              title="Add to Cart"
                            >
                              {addedNoticeId === srv.id ? (
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
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-5 text-center text-xs text-slate-500">
                  <p className="font-bold text-slate-700">No services found for "{searchQuery}"</p>
                  <p className="text-[11px] mt-0.5">Try searching for 'AC', 'Plumber', 'Fan', or 'Cleaning'</p>
                </div>
              )}

              <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="w-full py-2 px-3 text-xs font-bold text-blue-700 hover:text-blue-800 hover:bg-blue-100/60 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>View all {matchingSuggestions.length} matching packages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ACTIVE SEARCH STATE: Instant Matching Results Directly in this Section */}
        {isSearching ? (
          <div className="space-y-4 animate-fadeIn">
            {/* Live Search Status Header */}
            <div className="bg-blue-50/80 border border-blue-200/90 rounded-2xl p-3 sm:px-4 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  Found <strong>{matchingSuggestions.length} verified packages</strong> for{' '}
                  <span className="text-blue-700 font-bold underline">"{searchQuery}"</span>
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="text-blue-700 font-bold hover:underline cursor-pointer flex items-center gap-1 text-xs"
                >
                  <span>Full Catalog</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <span className="text-slate-300">•</span>
                <button
                  type="button"
                  onClick={() => {
                    if (onClearSearch) onClearSearch();
                    else onSearchChange('');
                  }}
                  className="text-slate-600 hover:text-rose-600 font-bold cursor-pointer transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Instant Direct Results Grid */}
            {topDirectResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
                {topDirectResults.map((srv) => {
                  const cartQty = getItemCartQty(srv.id);
                  const isAdded = addedNoticeId === srv.id;

                  return (
                    <div
                      key={srv.id}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all p-3 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Service Thumbnail */}
                        <div className="relative h-32 rounded-xl overflow-hidden bg-slate-100 mb-2.5">
                          <img
                            src={srv.image}
                            alt={srv.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                            onError={(e) => handleImageError(e, srv.categoryId || 'service')}
                          />
                          {srv.discountPercent && (
                            <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                              {srv.discountPercent}% OFF
                            </span>
                          )}
                          <span className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-400" />
                            <span>{srv.durationMinutes || 45}m</span>
                          </span>
                        </div>

                        {/* Title & Category */}
                        <div className="flex items-center gap-1 text-[10px] text-blue-600 font-bold uppercase tracking-wider mb-1">
                          <span>{getCategoryName(srv.categoryId)}</span>
                        </div>
                        <h4
                          onClick={() => onSelectService && onSelectService(srv)}
                          className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
                        >
                          {srv.title}
                        </h4>

                        {/* Rating */}
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-600">
                          <span className="flex items-center text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                            {srv.rating}
                          </span>
                          <span className="text-slate-400 text-[11px]">
                            ({formatReviewCount(srv.reviewCount)})
                          </span>
                        </div>
                      </div>

                      {/* Pricing & Add to Cart Button */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-sm font-black text-slate-900">
                              ₹{srv.price}
                            </span>
                            {srv.originalPrice && (
                              <span className="text-[11px] text-slate-400 line-through">
                                ₹{srv.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          {cartQty > 0 ? (
                            <div className="flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-lg px-1.5 py-0.5">
                              <button
                                type="button"
                                onClick={() => onUpdateCartQuantity && onUpdateCartQuantity(srv.id, -1)}
                                className="w-5 h-5 rounded flex items-center justify-center text-blue-700 hover:bg-blue-100 font-bold text-xs cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-black text-blue-900 min-w-[14px] text-center">
                                {cartQty}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateCartQuantity && onUpdateCartQuantity(srv.id, 1)}
                                className="w-5 h-5 rounded flex items-center justify-center text-blue-700 hover:bg-blue-100 font-bold text-xs cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          ) : onAddToCart ? (
                            <button
                              type="button"
                              onClick={() => {
                                onAddToCart(srv);
                                setAddedNoticeId(srv.id);
                                setTimeout(() => setAddedNoticeId(null), 1800);
                              }}
                              className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1 ${
                                isAdded
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : 'bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border-blue-200 hover:border-blue-600'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>Added</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3 h-3" />
                                  <span>Add</span>
                                </>
                              )}
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-sm font-bold text-slate-800">
                  No direct matches found for "{searchQuery}"
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Try common terms like "AC", "Water leak", "Fan", "Plumber", or tap a chip below:
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-3">
                  {QUICK_PROMPTS.slice(0, 4).map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => handleChipClick(p.label)}
                      className="text-xs bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-blue-600 font-semibold hover:bg-blue-50 cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* IDLE STATE: Quick Prompt Chips */
          <div className="space-y-3 pt-1">
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                Popular searches:
              </span>

              {QUICK_PROMPTS.map((prompt) => {
                const isSelected = searchQuery.toLowerCase().trim() === prompt.label.toLowerCase().trim();
                return (
                  <button
                    key={prompt.label}
                    type="button"
                    onClick={() => handleChipClick(prompt.label)}
                    className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1 ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs scale-105'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300 font-medium'
                    }`}
                  >
                    <span>{prompt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
