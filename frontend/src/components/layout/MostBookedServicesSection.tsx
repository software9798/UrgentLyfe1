import React, { useRef, useState, useEffect, useMemo } from 'react';
import { ChevronRight, ChevronLeft, Star, Zap, Flame, MapPin, Check, Plus, ShieldCheck, Clock } from 'lucide-react';
import { City, ServiceItem } from '../../types';
import { handleImageError } from '../../utils/imageFallback';

export interface MostBookedServiceConfig {
  id: string;
  title: string;
  categoryId: string;
  subServiceKey?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  durationMinutes: number;
  isInstant: boolean;
  imageUrl: string;
  description: string;
  includes: string[];
  toolsUsed?: string[];
  // Area-specific demand multiplier or highlight
  baseBookingsPerWeek: number;
  demandTag?: string;
}

interface MostBookedServicesSectionProps {
  selectedCity: City;
  selectedLocality: string;
  onSelectLocality?: (locality: string) => void;
  onSelectService: (categoryId: string, subServiceKey?: string) => void;
  onOpenServiceDetail: (service: ServiceItem) => void;
  onAddToCart?: (service: ServiceItem) => void;
  onQuickBook?: (service: ServiceItem) => void;
}

// Exact services shown in Screenshot 2026-09-06 111818.png + supplementary top performers
const RAW_SERVICES: MostBookedServiceConfig[] = [
  {
    id: 'intense-cleaning-2-bathroom',
    title: 'Intense cleaning (2 bathroom)',
    categoryId: 'cleaning',
    subServiceKey: 'bathroom-cleaning',
    price: 958,
    originalPrice: 1098,
    rating: 4.80,
    reviewCount: 4890,
    durationMinutes: 90,
    isInstant: false,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    description: 'Deep tile scrubbing with mechanized rotary drill brush, hard water stain removal, toilet descaling, mirror buffing, and chrome polish.',
    includes: [
      'Mechanized rotary brush scrubbing for wall & floor tiles',
      'Caustic-free hard-water tile descaling (Taski R1/R6)',
      'Commode, cistern & washbasin deep sterilization',
      'Chrome taps, shower heads & mirror streak-free polish',
    ],
    toolsUsed: ['High-Torque Cordless Drill Scrubber', 'Taski Descaling Solvent', 'Diamond Buffing Pad', 'Steam Sanitizer'],
    baseBookingsPerWeek: 420,
    demandTag: '🔥 High demand in your area',
  },
  {
    id: 'ac-repair',
    title: 'AC repair',
    categoryId: 'ac-appliance',
    subServiceKey: 'ac-repair',
    price: 299,
    originalPrice: 399,
    rating: 4.73,
    reviewCount: 8210,
    durationMinutes: 45,
    isInstant: true,
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    description: 'Accurate fault diagnosis for AC not cooling, PCB error codes, water leakage, strange noises, or frequent tripping with genuine spare guarantee.',
    includes: [
      'Complete thermal & refrigerant pressure diagnostic',
      'PCB electrical circuit & capacitor testing',
      'Blower motor, fan coil & drain tray inspection',
      'Transparent upfront spare parts quote with 90-day warranty',
    ],
    toolsUsed: ['Fluke Thermal Imager', 'Digital Refrigerant Manifold', 'Multimeter', 'Gas Leak Sniffer'],
    baseBookingsPerWeek: 580,
    demandTag: '🔥 #1 Most Booked in your area',
  },
  {
    id: 'haircut-for-men',
    title: 'Haircut for men',
    categoryId: 'salon-men',
    subServiceKey: 'haircut-men',
    price: 259,
    originalPrice: 299,
    rating: 4.86,
    reviewCount: 6540,
    durationMinutes: 30,
    isInstant: false,
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    description: 'Professional grooming at your doorstep by licensed barbers with single-use sanitized kits, scissor styling, and zero-mess floor cleanup.',
    includes: [
      'Personalized hair styling consultation',
      'Disinfected scissors, clippers & razor styling',
      'Disposable hygienic cape & neck tape',
      'Post-cut hair vacuum & mess-free cleanup',
    ],
    toolsUsed: ['Wahl Pro Clipper Set', 'Japanese Steel Barber Scissors', 'UV Sterilizer Kit', 'Hygienic Hair Cape'],
    baseBookingsPerWeek: 490,
    demandTag: 'Weekend favorite in your area',
  },
  {
    id: 'foam-jet-ac-service',
    title: 'Foam-jet AC service',
    categoryId: 'ac-appliance',
    subServiceKey: 'foam-jet',
    price: 699,
    originalPrice: 899,
    rating: 4.75,
    reviewCount: 11200,
    durationMinutes: 45,
    isInstant: true,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Intense 2x cooling service using high-pressure foam jet wash, zero-mess waterproof jacket, outdoor condenser wash, and gas level check.',
    includes: [
      'Indoor unit coil & blower power foam-jet wash',
      'Zero-spill waterproof wall jacket mounted',
      'Outdoor condenser unit pressurized water jet cleaning',
      'Free 10-point cooling & gas pressure audit',
    ],
    toolsUsed: ['120 PSI High Pressure Jet Gun', 'Foam Chemical Sprayer', 'Waterproof Catchment Jacket', 'Air Flow Gauge'],
    baseBookingsPerWeek: 730,
    demandTag: '🔥 Surging demand in your area',
  },
  {
    id: 'intense-cleaning-3-bathroom',
    title: 'Intense cleaning (3 bathroom)',
    categoryId: 'cleaning',
    subServiceKey: 'bathroom-cleaning',
    price: 1377,
    originalPrice: 1647,
    rating: 4.80,
    reviewCount: 3910,
    durationMinutes: 120,
    isInstant: false,
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    description: 'Heavy mechanized descaling for 3 full bathrooms using heavy-duty rotary scrubbers, grout lime remover, exhaust degreasing, and chrome buffing.',
    includes: [
      'Deep machine scrubbing of floors & tiled walls for 3 bathrooms',
      'Yellow stain & hard water scaling removal',
      'Sanitization of 3 commodes, cisterns & washbasins',
      'Chrome & brass fitting sparkle polish',
    ],
    toolsUsed: ['Mechanized Rotary Floor Scrubber', 'Rotary Tile Buffer', 'Steam Descaler', 'Biodegradable Acid-Free Foam'],
    baseBookingsPerWeek: 310,
    demandTag: 'Value pack in your area',
  },
  {
    id: 'ro-water-purifier-service',
    title: 'RO water purifier service',
    categoryId: 'ac-appliance',
    subServiceKey: 'water-purifier',
    price: 399,
    originalPrice: 499,
    rating: 4.85,
    reviewCount: 5120,
    durationMinutes: 45,
    isInstant: true,
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    description: 'TDS water quality check, pre-filter candle cleaning, RO membrane flush, leak inspection, and electrical booster pump health test.',
    includes: [
      'Digital TDS test before & after servicing',
      'Sediment pre-filter housing wash & carbon flush',
      'Booster pump pressure & solenoid valve inspection',
      'Food-grade silicone tube leak sealing',
    ],
    toolsUsed: ['Digital TDS Meter', 'Pressure Test Gauge', 'Filter Spanner Set', 'Food-Grade Sealant'],
    baseBookingsPerWeek: 360,
    demandTag: 'High demand in your area',
  },
  {
    id: 'switchboard-mcb-repair',
    title: 'Switchboard & MCB repair',
    categoryId: 'electrical',
    subServiceKey: 'switchboard-repair',
    price: 199,
    originalPrice: 249,
    rating: 4.82,
    reviewCount: 6410,
    durationMinutes: 30,
    isInstant: true,
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    description: 'Repair of sparking switches, burnt sockets, tripping MCBs, and thermal load balancing by verified electricians with safety gear.',
    includes: [
      'Thermal scan of switchboard to spot overload points',
      'Replacement of faulty modular switches or sockets',
      'Neutral-phase earthing voltage check',
      'Flame-retardant wiring insulation check',
    ],
    toolsUsed: ['Fluke Multimeter', 'Insulated VDE Screwdrivers', 'Non-Contact Voltage Detector', 'Wire Stripper'],
    baseBookingsPerWeek: 410,
    demandTag: '15-min arrival in your area',
  },
  {
    id: 'tap-pipe-leakage-repair',
    title: 'Tap & pipe leakage repair',
    categoryId: 'plumbing',
    subServiceKey: 'tap-leakage',
    price: 149,
    originalPrice: 199,
    rating: 4.78,
    reviewCount: 7890,
    durationMinutes: 30,
    isInstant: true,
    imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    description: 'Fast resolution of dripping faucets, cracked waste coupling, under-sink pipe leakages, or angle valve replacements with zero mess.',
    includes: [
      'Diagnosis of leak source under pressure',
      'Washer, spindle, or cartridge replacement',
      'Teflon tape sealing & hydrostatic test',
      'No-leak 30-day warranty',
    ],
    toolsUsed: ['Plumber Basin Wrench', 'Thread Seal Tape', 'Pipe Cutter', 'Teflon Packing Cord'],
    baseBookingsPerWeek: 450,
    demandTag: '20-min arrival in your area',
  },
  {
    id: 'sofa-deep-cleaning-3seater',
    title: 'Sofa deep cleaning (3 seater)',
    categoryId: 'cleaning',
    subServiceKey: 'sofa-cleaning',
    price: 699,
    originalPrice: 849,
    rating: 4.84,
    reviewCount: 3820,
    durationMinutes: 60,
    isInstant: false,
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    description: 'Dry vacuuming, shampoo injection, fabric stain extraction, and anti-allergen sanitization for 3-seater sofas and cushions.',
    includes: [
      'High-power HEPA vacuuming to pull deep dust & mites',
      'Foam shampoo application for oil & food stains',
      'Industrial moisture extraction for 85% dry finish',
      'Pleasant citrus fragrance spray',
    ],
    toolsUsed: ['2400W Industrial Extraction Vacuum', 'Soft Fabric Foam Brush', 'Kärcher Extraction Machine'],
    baseBookingsPerWeek: 280,
    demandTag: 'Popular in your area',
  },
];

export const MostBookedServicesSection: React.FC<MostBookedServicesSectionProps> = ({
  selectedCity,
  selectedLocality,
  onSelectLocality,
  onSelectService,
  onOpenServiceDetail,
  onAddToCart,
  onQuickBook,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  // Active locality filter state: Defaults to the passed selectedLocality, or 'all'
  const [activeAreaFilter, setActiveAreaFilter] = useState<string>(selectedLocality || 'all');

  // Keep activeAreaFilter in sync if parent selectedLocality changes
  useEffect(() => {
    if (selectedLocality) {
      setActiveAreaFilter(selectedLocality);
    }
  }, [selectedLocality]);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  // Convert config into full ServiceItem for detail modal & cart compatibility
  const toServiceItem = (item: MostBookedServiceConfig): ServiceItem => {
    return {
      id: item.id,
      categoryId: item.categoryId,
      title: item.title,
      subtitle: `${item.durationMinutes} mins • Rated ${item.rating.toFixed(2)} ★ (${item.reviewCount.toLocaleString()} verified reviews)`,
      price: item.price,
      originalPrice: item.originalPrice,
      discountPercent: item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0,
      rating: item.rating,
      reviewCount: item.reviewCount,
      durationMinutes: item.durationMinutes,
      description: item.description,
      includes: item.includes,
      excludes: ['Parts replacement unless quoted in advance', 'Structural civil modifications'],
      image: item.imageUrl,
      videoPoster: item.imageUrl,
      toolsUsed: item.toolsUsed || ['Professional Multi-Tool Kit', 'Safety Gear', 'Sanitizer'],
      workSteps: [
        {
          step: 1,
          title: 'Pre-Service Diagnostic & Area Prep',
          desc: `Inspection of equipment & baseline check before beginning ${item.title}`,
          duration: '5 mins',
          tool: item.toolsUsed?.[0] || 'Diagnostic Tool',
        },
        {
          step: 2,
          title: 'Core Mechanized Execution',
          desc: `Primary professional service using industry-certified techniques`,
          duration: `${Math.round(item.durationMinutes * 0.5)} mins`,
          tool: item.toolsUsed?.[1] || 'Power Tool',
        },
        {
          step: 3,
          title: 'Deep Finishing & Cleaning',
          desc: `Sanitization, mess cleanup, and component sealing`,
          duration: `${Math.round(item.durationMinutes * 0.3)} mins`,
          tool: item.toolsUsed?.[2] || 'Finishing Kit',
        },
        {
          step: 4,
          title: 'Quality Testing & Guarantee Sign-Off',
          desc: `Customer walkthrough, performance verification & 30-day warranty activation`,
          duration: '5 mins',
          tool: 'Digital Checklist',
        },
      ],
      isUrgentAvailable: item.isInstant,
      urgentFee: 149,
      tags: ['Most Booked', 'Top Rated', 'Verified Partner', item.isInstant ? 'Express SOS' : 'Standard'],
    };
  };

  const handleCardClick = (item: MostBookedServiceConfig) => {
    const serviceItem = toServiceItem(item);
    onOpenServiceDetail(serviceItem);
  };

  const handleAddClick = (e: React.MouseEvent, item: MostBookedServiceConfig) => {
    e.stopPropagation();
    const serviceItem = toServiceItem(item);
    if (onAddToCart) {
      onAddToCart(serviceItem);
      setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
      setTimeout(() => {
        setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
      }, 2000);
    } else {
      onOpenServiceDetail(serviceItem);
    }
  };

  // Generate dynamic area metrics based on locality name hash for realistic variation
  const localityStats = useMemo(() => {
    const loc = activeAreaFilter === 'all' ? selectedLocality : activeAreaFilter;
    const charSum = loc.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const totalBookings = 1200 + (charSum % 650);
    const avgArrivalMins = 16 + (charSum % 9);
    const satisfactionScore = (4.78 + (charSum % 15) * 0.01).toFixed(2);
    return {
      name: loc,
      totalBookings,
      avgArrivalMins,
      satisfactionScore,
    };
  }, [activeAreaFilter, selectedLocality]);

  // Available locality pills for fast switching
  const localityPills = useMemo(() => {
    const defaultLocalities = selectedCity.localities?.slice(0, 6) || ['Indiranagar', 'Koramangala', 'HSR Layout', 'Whitefield'];
    return defaultLocalities;
  }, [selectedCity]);

  return (
    <section id="most-booked-services-section" className="py-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Container matching Screenshot 2026-09-06 111818.png */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Most booked services
              </h2>

              {/* Area-Wise High Demand Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200/80 shadow-xs">
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-pulse shrink-0" />
                <span>
                  High demand in <span className="underline decoration-amber-400 font-extrabold">{localityStats.name}</span>
                </span>
              </div>
            </div>

            {/* Area Demand Live Metric Subtitle */}
            <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
              <span>Over <strong>{localityStats.totalBookings.toLocaleString()}+</strong> services booked in {localityStats.name} this week</span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                <Clock className="w-3.5 h-3.5" /> {localityStats.avgArrivalMins} mins avg arrival
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1 text-amber-700 font-medium">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {localityStats.satisfactionScore}/5 local rating
              </span>
            </p>
          </div>

          {/* Area Selector Quick Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
              <MapPin className="w-3 h-3 text-slate-400" /> Area:
            </span>
            {localityPills.map((loc) => {
              const isActive = activeAreaFilter === loc;
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => {
                    setActiveAreaFilter(loc);
                    if (onSelectLocality) {
                      onSelectLocality(loc);
                    }
                  }}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {loc}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel / Cards Container with Screenshot's Circular Navigation Arrow */}
        <div className="relative group">
          {/* Left Arrow (Appears when scrolled) */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scroll('left')}
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center text-slate-800 hover:text-black hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Previous services"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Right Arrow (Directly from Screenshot 2026-09-06 111818.png) */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scroll('right')}
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center text-slate-800 hover:text-black hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Next services"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Cards Row (Horizontal Scrollable Carousel) */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 scrollbar-none scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {RAW_SERVICES.map((item, idx) => {
              const isAdded = addedItemIds[item.id];
              // Calculate dynamic local demand for this specific service in active locality
              const localOrderCount = Math.round(item.baseBookingsPerWeek * (1 + (idx % 3) * 0.15));

              return (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className="shrink-0 w-48 sm:w-56 md:w-60 cursor-pointer group/card snap-start select-none"
                  id={`most-booked-card-${item.id}`}
                >
                  {/* Image Container with rounded-2xl corners, matching screenshot */}
                  <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 mb-2 transition-transform duration-300 group-hover/card:scale-[1.02] shadow-xs hover:shadow-md">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => handleImageError(e, item.categoryId || 'service')}
                    />

                    {/* Subtle Area High-Demand Tag Top-Left */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10 pointer-events-none">
                      {idx === 0 && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/80 text-white backdrop-blur-xs shadow-xs">
                          🔥 #1 in {localityStats.name}
                        </span>
                      )}
                      {idx === 1 && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-600/90 text-white backdrop-blur-xs shadow-xs">
                          High Demand
                        </span>
                      )}
                    </div>

                    {/* Quick "+ Add" button overlay on hover */}
                    <div className="absolute bottom-2 right-2 z-20">
                      <button
                        type="button"
                        onClick={(e) => handleAddClick(e, item)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-md transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white scale-105'
                            : 'bg-white/95 text-slate-900 hover:bg-slate-900 hover:text-white backdrop-blur-xs border border-slate-200 hover:border-slate-900'
                        }`}
                        aria-label={`Add ${item.title} to cart`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" /> Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Service Title (Screenshot: Bold title directly below image) */}
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover/card:text-blue-600 transition-colors line-clamp-1 leading-snug">
                    {item.title}
                  </h3>

                  {/* Rating Row (Screenshot: ★ 4.80 or ★ 4.73 • ⚡ Instant) */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-700 mt-1 font-medium flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
                      <span className="font-bold text-slate-900">{item.rating.toFixed(2)}</span>
                    </div>

                    {item.isInstant && (
                      <>
                        <span className="text-slate-300 text-[10px]">•</span>
                        <span className="inline-flex items-center gap-0.5 text-emerald-700 font-bold text-[11px]">
                          <Zap className="w-3 h-3 fill-emerald-600 text-emerald-600" /> Instant
                        </span>
                      </>
                    )}

                    <span className="text-slate-400 text-[10px] hidden sm:inline">
                      ({localOrderCount} in {localityStats.name})
                    </span>
                  </div>

                  {/* Pricing Row (Screenshot: ₹958 ₹1,098 or ₹299) */}
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-900 mt-1">
                    <span>₹{item.price.toLocaleString('en-IN')}</span>

                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="text-xs text-slate-400 line-through font-normal">
                        ₹{item.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}

                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="text-[10px] font-bold text-emerald-600 ml-1">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
