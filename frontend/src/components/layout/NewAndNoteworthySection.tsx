import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export interface NoteworthyItem {
  id: string;
  title: string;
  categoryId: string;
  subServiceKey?: string;
  badge?: string;
  badgeColor?: string;
  imageUrl: string;
}

interface NewAndNoteworthySectionProps {
  onSelectService: (categoryId: string, subServiceKey?: string) => void;
}

export const NewAndNoteworthySection: React.FC<NewAndNoteworthySectionProps> = ({
  onSelectService,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const NOTEWORTHY_ITEMS: NoteworthyItem[] = [
    {
      id: 'full-home-cleaning',
      title: 'Full Home/ By Room Cleaning',
      categoryId: 'cleaning',
      subServiceKey: 'full-apartment',
      imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'furniture-shine',
      title: 'Furniture clean & shine',
      categoryId: 'cleaning',
      subServiceKey: 'furniture-shine',
      badge: 'New',
      badgeColor: 'bg-[#98144d] text-white',
      imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'full-home-painting',
      title: 'Full home painting',
      categoryId: 'painting',
      subServiceKey: 'full-home-painting',
      imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'living-bedroom-cleaning',
      title: 'Living & Bedroom Cleaning',
      categoryId: 'cleaning',
      subServiceKey: 'partial-home',
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'wall-panels-revamp',
      title: 'Wall Panels by Revamp',
      categoryId: 'painting',
      subServiceKey: 'wall-panels',
      badge: 'New',
      badgeColor: 'bg-[#98144d] text-white',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'smart-locks',
      title: 'Smart Locks',
      categoryId: 'electrical',
      subServiceKey: 'smart-locks',
      imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'kitchen-sink-cleaning',
      title: 'Kitchen & Sink Cleaning',
      categoryId: 'cleaning',
      subServiceKey: 'kitchen-bath',
      imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'gas-stove-chimney',
      title: 'Gas Stove & Chimney Repair',
      categoryId: 'appliance',
      subServiceKey: 'gas-stove-chimney',
      imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'laptop-electronics',
      title: 'Laptop & Electronics Repair',
      categoryId: 'electrical',
      subServiceKey: 'smart-locks',
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'spa-massage-women',
      title: 'Spa & Massage for Women',
      categoryId: 'salon',
      subServiceKey: 'spa-massage',
      imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
    },
  ];

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
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <section className="py-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            New and noteworthy
          </h2>
        </div>

        {/* Carousel / Cards Container with Navigation Arrow */}
        <div className="relative group">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scroll('left')}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:text-black hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Previous items"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Right Arrow (Screenshot 1 circular arrow) */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scroll('right')}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:text-black hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Next items"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Cards Row */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 scrollbar-none scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {NOTEWORTHY_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectService(item.categoryId, item.subServiceKey)}
                className="shrink-0 w-44 sm:w-52 cursor-pointer group/card snap-start select-none"
              >
                {/* Image Container with rounded corners */}
                <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 mb-2.5 transition-transform duration-300 group-hover/card:scale-[1.02] shadow-xs hover:shadow-md">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />

                  {/* Optional "New" Badge (Screenshot 1) */}
                  {item.badge && (
                    <div
                      className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-sm text-[11px] font-bold tracking-wide shadow-xs ${
                        item.badgeColor || 'bg-[#98144d] text-white'
                      }`}
                    >
                      {item.badge}
                    </div>
                  )}
                </div>

                {/* Card Title */}
                <h3 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover/card:text-blue-600 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
