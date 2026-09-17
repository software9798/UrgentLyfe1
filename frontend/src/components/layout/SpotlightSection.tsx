import React, { useRef } from 'react';
import { Star, Users, ArrowRight, ArrowLeft, ChevronRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface SpotlightCardItem {
  id: string;
  categoryId: string;
  subServiceKey?: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  btnText: string;
  btnBg: string;
  btnTextColor: string;
  bgImage: string;
  gradientOverlay: string;
  customOverlay?: React.ReactNode;
}

interface SpotlightSectionProps {
  onSelectCategory?: (categoryId: string, subServiceKey?: string) => void;
  onExploreTopic?: (query: string) => void;
}

export const SpotlightSection: React.FC<SpotlightSectionProps> = ({
  onSelectCategory,
  onExploreTopic,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCardClick = (item: SpotlightCardItem) => {
    if (onSelectCategory) {
      onSelectCategory(item.categoryId, item.subServiceKey);
    } else if (onExploreTopic) {
      onExploreTopic(item.title);
    } else {
      const catalog = document.getElementById('services-catalog-grid');
      catalog?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const SPOTLIGHT_CARDS: SpotlightCardItem[] = [
    {
      id: 'ac-foam-jet',
      categoryId: 'ac-appliance',
      subServiceKey: 'power-foam-jet',
      badge: 'Best Seller',
      badgeColor: 'bg-sky-950 text-sky-200 border border-sky-600/40',
      title: 'Power Foam Jet AC Service',
      subtitle: '2x Cooling boost & antibacterial deep wash',
      btnText: 'Explore AC',
      btnBg: 'bg-white hover:bg-slate-100',
      btnTextColor: 'text-slate-900',
      bgImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      gradientOverlay: 'from-slate-950/90 via-slate-950/40 to-transparent',
      customOverlay: (
        <div className="absolute top-4 right-4 bg-sky-500/20 backdrop-blur-md border border-sky-400/30 text-sky-200 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
          <Zap className="w-3 h-3 text-sky-300" />
          <span>Starts ₹599</span>
        </div>
      ),
    },
    {
      id: 'm3-water-purifier',
      categoryId: 'appliance',
      subServiceKey: 'water-purifier',
      badge: 'New launch',
      badgeColor: 'bg-[#a0005a] text-white',
      title: 'M3 Pro & M3',
      subtitle: 'First ever ROs with 3-year filter life',
      btnText: 'Buy now',
      btnBg: 'bg-[#243761] hover:bg-[#1c2c4f]',
      btnTextColor: 'text-white',
      bgImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      gradientOverlay: 'from-slate-950 via-slate-950/85 to-blue-950/70',
      customOverlay: (
        <div className="absolute right-4 bottom-3 top-3 w-40 sm:w-44 bg-gradient-to-b from-slate-800 to-slate-950 rounded-xl border border-slate-700/60 p-3 shadow-2xl flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase tracking-wider">
            <span>UrgentLyfe</span>
            <span className="text-blue-400">NATIVE</span>
          </div>
          <div className="my-auto text-center">
            <div className="text-emerald-400 text-xs font-mono font-bold tracking-widest animate-pulse">
              HELLO!
            </div>
            <div className="flex justify-center gap-1 mt-1 text-[8px] text-slate-400">
              <span>•</span>
              <span>•</span>
              <span>•</span>
            </div>
          </div>
          <div className="text-[9px] text-slate-500 text-center font-semibold">
            3-Yr Filter Guard
          </div>
        </div>
      ),
    },
    {
      id: 'forest-essentials-facial',
      categoryId: 'salon',
      subServiceKey: 'facial-haircut',
      badge: 'Forest Essentials™ Luxurious Ayurveda',
      badgeColor: 'bg-amber-950/80 border border-amber-500/40 text-amber-200',
      title: 'Luxury facials by Forest Essentials',
      subtitle: 'Exclusively on UrgentLyfe',
      btnText: 'Book now',
      btnBg: 'bg-white hover:bg-slate-100',
      btnTextColor: 'text-slate-900',
      bgImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
      gradientOverlay: 'from-black/85 via-black/40 to-transparent',
    },
    {
      id: 'damp-walls-panels',
      categoryId: 'painting',
      subServiceKey: 'wall-panels',
      badge: 'Trending',
      badgeColor: 'bg-[#54082c] text-white',
      title: 'A beautiful fix for damp walls',
      subtitle: 'Waterproof fluted wall panels',
      btnText: 'Explore',
      btnBg: 'bg-white hover:bg-slate-100',
      btnTextColor: 'text-slate-900',
      bgImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      gradientOverlay: 'from-black/80 via-black/35 to-black/20',
      customOverlay: (
        <div className="absolute inset-y-0 left-[68%] w-0.5 bg-white/40 shadow-xs hidden sm:block pointer-events-none">
          <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-slate-700 shadow-md">
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      ),
    },
    {
      id: 'electrical-short-circuit',
      categoryId: 'electrical',
      subServiceKey: 'short-circuit-mcb',
      badge: '30-Min SOS',
      badgeColor: 'bg-amber-950/90 text-amber-300 border border-amber-500/40',
      title: 'Zero-Spark Electricals & MCB Fix',
      subtitle: 'Multimeter thermal inspection & wiring safety',
      btnText: 'Explore Electrical',
      btnBg: 'bg-white hover:bg-slate-100',
      btnTextColor: 'text-slate-900',
      bgImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      gradientOverlay: 'from-slate-950/90 via-slate-950/40 to-transparent',
    },
    {
      id: 'pipe-leak-plumbing',
      categoryId: 'plumbing',
      subServiceKey: 'pipe-leaks',
      badge: 'Urgent Fix',
      badgeColor: 'bg-blue-950/90 text-blue-200 border border-blue-500/40',
      title: 'Pipe Leakage & Clog Eradication',
      subtitle: 'Snake wire & Teflon sealing for burst taps',
      btnText: 'Explore Plumbing',
      btnBg: 'bg-white hover:bg-slate-100',
      btnTextColor: 'text-slate-900',
      bgImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
      gradientOverlay: 'from-slate-950/90 via-slate-950/40 to-transparent',
    },
    {
      id: 'full-home-cleaning',
      categoryId: 'cleaning',
      subServiceKey: 'full-apartment',
      badge: 'Top Rated',
      badgeColor: 'bg-emerald-950/90 text-emerald-200 border border-emerald-500/40',
      title: '360° Full Home Deep Cleaning',
      subtitle: 'Taski mechanized single-disc floor scrubbing',
      btnText: 'Explore Cleaning',
      btnBg: 'bg-white hover:bg-slate-100',
      btnTextColor: 'text-slate-900',
      bgImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
      gradientOverlay: 'from-slate-950/90 via-slate-950/40 to-transparent',
    },
    {
      id: 'herbal-pest-control',
      categoryId: 'pest-control',
      subServiceKey: 'pest-control',
      badge: '100% Odorless',
      badgeColor: 'bg-teal-950/90 text-teal-200 border border-teal-500/40',
      title: 'Herbal Cockroach & Termite Defense',
      subtitle: 'Kid & pet safe with 90-day eradication guarantee',
      btnText: 'Explore Pest',
      btnBg: 'bg-white hover:bg-slate-100',
      btnTextColor: 'text-slate-900',
      bgImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
      gradientOverlay: 'from-slate-950/90 via-slate-950/40 to-transparent',
    },
  ];

  return (
    <section id="trust-and-spotlight-section" className="mx-4 sm:mx-6 lg:mx-8 my-10 sm:my-12">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
        
        {/* TRUST & STATISTICS HEADER (Exact match to screenshot) */}
        <div className="flex items-center gap-10 sm:gap-16 pt-2 pb-2">
          {/* Rating Stat */}
          <div className="flex items-center gap-3 sm:gap-4 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-slate-900">
              <Star className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.7] fill-transparent text-slate-900" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
                4.8
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Service Rating*
              </div>
            </div>
          </div>

          {/* Customers Globally Stat */}
          <div className="flex items-center gap-3 sm:gap-4 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-slate-900">
              <Users className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.7] text-slate-900" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
                12M+
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Customers Globally*
              </div>
            </div>
          </div>
        </div>

        {/* "IN THE SPOTLIGHT" SECTION */}
        <div>
          {/* Section Heading & Arrow Controls */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                In the spotlight
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Click any service to view all specialized packages, live availability &amp; pricing
              </p>
            </div>

            {/* Desktop Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                title="Previous"
                aria-label="Previous"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-900 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                title="Next"
                aria-label="Next"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Carousel Container */}
          <div className="relative group/carousel">
            <div
              ref={scrollContainerRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none pb-3 pt-1 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {SPOTLIGHT_CARDS.map((card) => (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  className="w-[310px] sm:w-[380px] lg:w-[410px] shrink-0 h-[220px] sm:h-[240px] rounded-2xl overflow-hidden relative snap-start cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-800/20"
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${card.bgImage}')` }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${card.gradientOverlay}`} />

                  {/* Custom Graphic Overlay if present */}
                  {card.customOverlay}

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between z-10 max-w-[280px] sm:max-w-[320px]">
                    <div>
                      {/* Badge */}
                      <span
                        className={`inline-block ${card.badgeColor} text-[10px] sm:text-[11px] font-bold px-2.5 py-0.8 rounded-md shadow-xs tracking-wide uppercase`}
                      >
                        {card.badge}
                      </span>

                      {/* Headline & Subtitle */}
                      <h3 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight mt-2.5 leading-snug drop-shadow-sm">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-200 font-medium mt-1 drop-shadow-xs line-clamp-1">
                        {card.subtitle}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(card);
                        }}
                        className={`${card.btnBg} ${card.btnTextColor} text-xs sm:text-sm font-bold px-4 py-2 rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-1.5 group-hover:gap-2.5`}
                      >
                        <span>{card.btnText}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Circular Right Navigation Arrow */}
            <button
              type="button"
              onClick={() => scroll('right')}
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center text-slate-900 hover:bg-slate-50 active:scale-95 transition-all z-20 cursor-pointer hidden sm:flex group-hover/carousel:scale-105"
              title="Scroll next"
              aria-label="Scroll next"
            >
              <ArrowRight className="w-5 h-5 text-slate-900" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
