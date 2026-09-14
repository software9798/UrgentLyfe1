import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Star,
  Clock,
  Check,
  ShieldCheck,
  Zap,
  Plus,
  Minus,
  Sparkles,
  Scissors,
  Crown,
  Heart,
  Footprints,
  Package,
  Search,
} from 'lucide-react';
import { ServiceItem, CartItem } from '../../types';

interface SalonMenCategoryViewProps {
  initialTier?: 'royale' | 'prime';
  cartItems: CartItem[];
  onAddToCart: (service: ServiceItem, isUrgent?: boolean) => void;
  onUpdateCartQuantity: (serviceId: string, delta: number) => void;
  onBookNow: (service: ServiceItem, isUrgent?: boolean) => void;
  onSelectServiceDetail: (service: ServiceItem) => void;
  onClose: () => void;
  onOpenPreferenceModal?: () => void;
  selectedCityName: string;
  selectedLocality: string;
}

export const MEN_SALON_SERVICES: Record<'royale' | 'prime', ServiceItem[]> = {
  royale: [
    {
      id: 'men-royale-master-haircut',
      categoryId: 'salon-men',
      title: 'Royale master haircut & styling',
      subtitle: 'Precision fade & texture shearing by top 1% barber specialists',
      price: 449,
      originalPrice: 599,
      discountPercent: 25,
      rating: 4.94,
      reviewCount: 8920,
      durationMinutes: 45,
      description: 'Delivered only by top 1% master barbers with Ikonic tools. Includes consultation, gradient fade, texture shear finishing, hot towel neck press, and scalp stimulation.',
      includes: [
        'Personal hair profile & lifestyle consultation',
        'Ikonic imported steel shear cut & clipper blend',
        'Hot towel neck relaxation & straight razor edging',
        'Organic hair styling wax & post-cut vacuum cleanup',
      ],
      toolsUsed: ['Ikonic Carbon Clippers', 'Japanese 440C Shears', 'UV Sterilizer'],
      image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
      tags: ['Top Rated Pro', 'Royale Exclusive', 'Ikonic'],
    },
    {
      id: 'men-royale-beard-sculpt-hot-towel',
      categoryId: 'salon-men',
      title: 'Royale beard sculpt & hot towel ritual',
      subtitle: 'Multi-blade edging, steam hot towel softening & argan butter',
      price: 299,
      originalPrice: 399,
      discountPercent: 25,
      rating: 4.91,
      reviewCount: 6140,
      durationMinutes: 30,
      description: 'Multi-blade edging, steam hot towel softening, argan beard butter massage, and razor-sharp contouring.',
      includes: [
        'Hot eucalyptus steam towel beard softening',
        'Precision clipper shaping & scissor tapering',
        'Sharp cheek line single-blade razor finish',
        'Argan & tea tree conditioning beard butter rub',
      ],
      toolsUsed: ['Straight Razor', 'Steam Towel Heater', 'Ikonic Beard Trimmer'],
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
      tags: ['Top Rated Pro', 'Luxury Ritual'],
    },
    {
      id: 'men-royale-head-shoulder-massage',
      categoryId: 'salon-men',
      title: 'Royale acupressure head & shoulder massage',
      subtitle: '45-min deep tissue knot release with warm Ayurvedic Brahmi oil',
      price: 499,
      originalPrice: 699,
      discountPercent: 28,
      rating: 4.92,
      reviewCount: 7800,
      durationMinutes: 45,
      description: 'Extended 45-minute deep tissue marma therapy with warm herbal oils, neck traction stretch, and warm lavender eye pillow.',
      includes: [
        'Warm Brahmi & Bhringraj therapeutic oil infusion',
        'Cervical spine & trapezius knot release',
        'Scalp marma point acupressure therapy',
        'Warm herbal steam wrap for deep hair nourishment',
      ],
      toolsUsed: ['Ayurvedic Herbal Oil', 'Hot Steamer Towel', 'Acupressure Tool'],
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
      tags: ['Stress Relief', '45 Mins'],
    },
    {
      id: 'men-royale-o3-radiance-detan-facial',
      categoryId: 'salon-men',
      title: "O3+ Men's Radiance & D-Tan Facial",
      subtitle: 'Oxygen-infused glycolic exfoliation & ultrasonic pore detox',
      price: 1099,
      originalPrice: 1499,
      discountPercent: 26,
      rating: 4.93,
      reviewCount: 5210,
      durationMinutes: 60,
      description: 'Signature O3+ oxygen-infused glycolic exfoliation, ultrasonic pore extractor, active peel-off brightening mask, and ice globe sculpting.',
      includes: [
        'O3+ Meladerm brightening cleanser & ozone steam',
        'Ultrasonic skin scrubber blackhead removal',
        'Oxygen active whitening booster serum infusion',
        'Cooling cryo-globe lymphatic drainage massage',
      ],
      toolsUsed: ['O3+ Monodose Kit', 'Ultrasonic Scrubber', 'Cryo Ice Globes'],
      image: 'https://images.unsplash.com/photo-1512290900672-1f41d911b306?auto=format&fit=crop&w=800&q=80',
      tags: ['O3+ Professional', 'Instant Glow'],
    },
    {
      id: 'men-royale-repechage-seaweed-treatment',
      categoryId: 'salon-men',
      title: 'Repêchage Seaweed Anti-Pollution Facial',
      subtitle: 'French eco-certified seaweed mask & trace minerals for skin defense',
      price: 1499,
      originalPrice: 1999,
      discountPercent: 25,
      rating: 4.95,
      reviewCount: 3980,
      durationMinutes: 70,
      description: 'Imported French sea kelp & trace minerals detoxify smoker/pollution skin, unclog pores, and restore firm dermal elasticity.',
      includes: [
        'Pure marine seaweed extract wash & mineral peel',
        'Firming facial acupressure with Vitamin C serum',
        'Repêchage cooling thermal seaweed mask',
        'Sun protection SPF 50 anti-pollution barrier',
      ],
      toolsUsed: ['Repêchage French Marine Kit', 'Cooling Jade Stone', 'Ultrasonic Wand'],
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
      tags: ['Repêchage Paris', 'Anti-Pollution'],
    },
    {
      id: 'men-royale-pedicure-deep-cleanse',
      categoryId: 'salon-men',
      title: 'Brightening lemon deep cleanse pedicure',
      subtitle: 'Aromatic lemon salt bath, electronic callus buffing & mint massage',
      price: 849,
      originalPrice: 1099,
      discountPercent: 22,
      rating: 4.88,
      reviewCount: 4210,
      durationMinutes: 55,
      description: 'Luxury lemon bubble bath soak, diamond heel file callus removal, dead skin enzymatic peel, and shea butter leg massage.',
      includes: [
        'Warm lemon salt foot soak & bubble bath',
        'Electronic diamond heel file & callus scraper',
        'Cuticle grooming & nail shaping',
        'Peppermint cream relaxing foot massage',
      ],
      toolsUsed: ['Electronic Foot File', 'Lemon Foot Crystals', 'Hydrating Cream'],
      image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80',
      tags: ['Deep Cleanse', 'Callus Removal'],
    },
    {
      id: 'men-royale-king-grooming-package',
      categoryId: 'salon-men',
      title: 'Royale King Grooming Package',
      subtitle: 'Haircut + Beard sculpt + O3+ Detan face pack + Head massage',
      price: 1499,
      originalPrice: 2199,
      discountPercent: 32,
      rating: 4.96,
      reviewCount: 9240,
      durationMinutes: 90,
      description: 'Royale Master Haircut + Beard Sculpting + O3+ D-Tan Face Pack + 20-min Head & Shoulder Acupressure Massage.',
      includes: [
        'Royale master styling haircut',
        'Hot towel beard shaping & edging',
        'O3+ Radiance D-Tan mask application',
        '20-min stress relief head & neck massage',
      ],
      toolsUsed: ['Full Royale Pro Kit', 'O3+ Pack', 'Hot Towel Steamer'],
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      tags: ['Best Value', 'Save 32%', 'All-In-One'],
    },
  ],
  prime: [
    {
      id: 'men-haircut-for-men',
      categoryId: 'salon-men',
      title: 'Haircut for men',
      subtitle: 'Professional barber haircut with sanitized tools & clean cape',
      price: 259,
      originalPrice: 299,
      discountPercent: 13,
      rating: 4.86,
      reviewCount: 6540,
      durationMinutes: 30,
      description: 'Precision styling haircut at home by licensed barbers using UV-sanitized clippers, imported scissors, disposable neck tape, and cape.',
      includes: [
        'Hair consultation & custom style haircut',
        'Disinfected Wahl clippers & scissors',
        'Disposable cape & floor protection sheet',
        'Neck cleaning & vacuum cleanup post cut',
      ],
      toolsUsed: ['Wahl Pro Clippers', 'Japanese Steel Scissors', 'UV Sterilization Bag'],
      image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
      tags: ['Bestseller', 'Starts ₹259'],
    },
    {
      id: 'men-haircut-for-boys',
      categoryId: 'salon-men',
      title: 'Haircut for boys',
      subtitle: 'Gentle, patient haircut for kids with low-noise clippers',
      price: 259,
      originalPrice: 299,
      discountPercent: 13,
      rating: 4.83,
      reviewCount: 4210,
      durationMinutes: 25,
      description: 'Gentle, patient haircut for kids and boys at home with rounded-tip child-safe scissors, quiet clippers, and favorite styles.',
      includes: [
        'Kid-friendly gentle hair styling',
        'Ultra-quiet clippers & child-safe scissors',
        'Disposable cape & neck tape',
        'Zero-mess floor cleanup',
      ],
      toolsUsed: ['Low-Noise Child Clippers', 'Blunt Tip Shears', 'Sanitized Cape'],
      image: 'https://images.unsplash.com/photo-1595454223600-91fbdd77e20b?auto=format&fit=crop&w=800&q=80',
      tags: ['Kids Safe', 'Quiet Clippers'],
    },
    {
      id: 'men-head-neck-shoulder-massage',
      categoryId: 'salon-men',
      title: 'Head, neck & shoulder massage',
      subtitle: 'Ayurvedic cooling Brahmi herbal oil & scalp acupressure',
      price: 349,
      originalPrice: 449,
      discountPercent: 22,
      rating: 4.81,
      reviewCount: 5670,
      durationMinutes: 30,
      description: 'Ayurvedic cooling Brahmi hair oil head massage combined with deep neck & shoulder knot kneading to eliminate stress and mental exhaustion.',
      includes: [
        'Warm Brahmi/Bhringraj herbal oil application',
        'Scalp acupressure point stimulation',
        'Cervical neck & shoulder blade knot release',
        'Hot towel wrap for scalp nourishment',
      ],
      toolsUsed: ['Ayurvedic Herbal Oil', 'Hot Steamer Towel', 'Scalp Stimulator'],
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
      tags: ['Stress Relief', 'Brahmi Oil'],
    },
    {
      id: 'men-brightening-lemon-deep-cleanse-pedicure',
      categoryId: 'salon-men',
      title: 'Brightening lemon deep cleanse pedicure',
      subtitle: 'Lemon foot bath, electronic heel buffing & soothing mint cream',
      price: 849,
      originalPrice: 999,
      discountPercent: 15,
      rating: 4.78,
      reviewCount: 3120,
      durationMinutes: 45,
      description: 'Detoxifying lemon soak, mechanized heel callus buffing, cuticle trimming, and nourishing mint massage for cracked, tired feet.',
      includes: [
        'Warm lemon salt foot soak & bubble bath',
        'Electronic heel callus file & scraper',
        'Cuticle grooming & nail shaping',
        'Peppermint cream relaxing foot massage',
      ],
      toolsUsed: ['Electronic Foot File', 'Lemon Foot Soak Crystals', 'Hydrating Foot Cream'],
      image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80',
      tags: ['Heel Care', 'Lemon Soak'],
    },
    {
      id: 'men-brightening-lemon-express-pedicure',
      categoryId: 'salon-men',
      title: 'Brightening lemon express pedicure',
      subtitle: 'Quick lemon antiseptic soak, nail buffing & moisturizing',
      price: 649,
      originalPrice: 799,
      discountPercent: 18,
      rating: 4.76,
      reviewCount: 2890,
      durationMinutes: 30,
      description: 'Quick lemon antiseptic soak, nail trimming, buffing, and gentle foot moisturizing for clean, hygienic feet on busy schedules.',
      includes: [
        'Antiseptic lemon foot cleanse',
        'Toe nail trimming, filing & buffing',
        'Dead skin gentle scrub',
        'Quick hydrating foot cream rub',
      ],
      toolsUsed: ['Sanitized Nail Clippers', 'Nail Buffer & Emery Board', 'Moisturizing Cream'],
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      tags: ['Express Care', 'Quick 30 Min'],
    },
    {
      id: 'men-beard-trim-shape',
      categoryId: 'salon-men',
      title: 'Beard trim & styling',
      subtitle: 'Clipper trim, clean cheek line definition & organic beard oil',
      price: 149,
      originalPrice: 199,
      discountPercent: 25,
      rating: 4.84,
      reviewCount: 7890,
      durationMinutes: 20,
      description: 'Sharp beard trimming with precision clipper guards, clean cheek/neck lines, and organic beard oil conditioning.',
      includes: [
        'Beard grooming consultation',
        'Length fading with adjustable clipper guards',
        'Clean mustache & chin line definition',
        'Beard softening oil application',
      ],
      toolsUsed: ['Wahl Trimmer', 'Detailing Blade', 'Beard Balm'],
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
      tags: ['Starts ₹149', 'Quick 20 Min'],
    },
    {
      id: 'men-loreal-hair-color',
      categoryId: 'salon-men',
      title: "L'Oreal Inoa ammonia-free hair color",
      subtitle: '100% natural grey coverage with scalp protection barrier',
      price: 499,
      originalPrice: 699,
      discountPercent: 28,
      rating: 4.85,
      reviewCount: 3410,
      durationMinutes: 45,
      description: "100% natural grey coverage with L'Oreal ammonia-free developer, scalp barrier cream, and color-lock shampoo wash.",
      includes: [
        "L'Oreal ammonia-free professional color mix",
        'Pre-color hairline barrier cream protection',
        'Even root and strand application',
        'Anti-color fade shampoo rinse',
      ],
      toolsUsed: ["L'Oreal Inoa Kit", 'Tint Brush', 'Scalp Shield'],
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      tags: ["L'Oreal Paris", 'Ammonia Free'],
    },
    {
      id: 'men-bombay-shaving-charcoal-cleanup',
      categoryId: 'salon-men',
      title: 'Bombay Shaving Co. Activated Charcoal Cleanup',
      subtitle: 'Ultrasonic blackhead pore vacuum & detoxifying tea tree pack',
      price: 599,
      originalPrice: 799,
      discountPercent: 25,
      rating: 4.82,
      reviewCount: 4120,
      durationMinutes: 40,
      description: 'Deep pore suction & charcoal scrub removes blackheads, oiliness, and dead cells, finished with tea tree calming gel.',
      includes: [
        'Activated charcoal foaming face scrub',
        'Herbal steam & ultrasonic blackhead extraction',
        'Cooling tea tree anti-pollution pack',
        'Calming aloe vera moisturizer massage',
      ],
      toolsUsed: ['Bombay Shaving Kit', 'Ultrasonic Spatula', 'Face Steamer'],
      image: 'https://images.unsplash.com/photo-1512290900672-1f41d911b306?auto=format&fit=crop&w=800&q=80',
      tags: ['Bombay Shaving Co', 'Pore Cleansing'],
    },
  ],
};

export const SalonMenCategoryView: React.FC<SalonMenCategoryViewProps> = ({
  initialTier = 'royale',
  cartItems,
  onAddToCart,
  onUpdateCartQuantity,
  onBookNow,
  onSelectServiceDetail,
  onClose,
  onOpenPreferenceModal,
  selectedCityName,
  selectedLocality,
}) => {
  const [activeTier, setActiveTier] = useState<'royale' | 'prime'>(initialTier);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const services = useMemo(() => {
    return MEN_SALON_SERVICES[activeTier];
  }, [activeTier]);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        !searchQuery ||
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'haircut') return service.title.toLowerCase().includes('haircut');
      if (selectedFilter === 'beard') return service.title.toLowerCase().includes('beard');
      if (selectedFilter === 'massage') return service.title.toLowerCase().includes('massage');
      if (selectedFilter === 'pedicure') return service.title.toLowerCase().includes('pedicure');
      if (selectedFilter === 'facial') return service.title.toLowerCase().includes('facial') || service.title.toLowerCase().includes('cleanup') || service.title.toLowerCase().includes('color');
      if (selectedFilter === 'package') return service.title.toLowerCase().includes('package') || service.title.toLowerCase().includes('combo');

      return true;
    });
  }, [services, selectedFilter, searchQuery]);

  const getCartQuantity = (serviceId: string) => {
    const item = cartItems.find((c) => c.service.id === serviceId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 animate-fadeIn" id="salon-men-category-view">
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onClose}
              className="p-2 -ml-2 rounded-xl hover:bg-slate-100 text-slate-700 hover:text-black transition-colors cursor-pointer"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 truncate">
                Salon for men
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 hidden sm:inline-block">
                  {selectedLocality}, {selectedCityName}
                </span>
              </h1>
            </div>
          </div>

          {/* Switch Preference Button */}
          {onOpenPreferenceModal && (
            <button
              type="button"
              onClick={onOpenPreferenceModal}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              Change Preference
            </button>
          )}
        </div>
      </div>

      {/* Hero / Tier Selector Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        {/* Tier Toggle matching Image 2 */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Selected Preference</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                {activeTier === 'royale' ? 'Royale Men Grooming' : 'Prime Everyday Grooming'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {activeTier === 'royale'
                  ? 'Delivered exclusively by top rated professionals for advanced cuts, beard styling & clinical facials.'
                  : 'Affordable doorstep haircuts, beard styling, hair coloring and refreshing cleanup packages.'}
              </p>
            </div>

            {/* Pill Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-2xl shrink-0 self-start sm:self-auto border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTier('royale')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTier === 'royale'
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Crown className="w-4 h-4" />
                Royale (From ₹449)
              </button>

              <button
                type="button"
                onClick={() => setActiveTier('prime')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTier === 'prime'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Scissors className="w-4 h-4" />
                Prime (From ₹249)
              </button>
            </div>
          </div>

          {/* Brand Assurance Banner */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-500 uppercase text-[11px] tracking-wider">Official Brands:</span>
              {activeTier === 'royale' ? (
                <div className="flex items-center gap-2.5 font-black text-slate-800 tracking-widest text-xs">
                  <span className="bg-slate-100 px-2.5 py-1 rounded-lg">IKONIC</span>
                  <span className="text-slate-300">|</span>
                  <span className="bg-slate-100 px-2.5 py-1 rounded-lg">REPÊCHAGE</span>
                  <span className="text-slate-300">|</span>
                  <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-blue-900">O3+</span>
                </div>
              ) : (
                <div className="flex items-center gap-2.5 font-black text-slate-800 tracking-widest text-xs">
                  <span className="bg-slate-100 px-2.5 py-1 rounded-lg">L'OREAL</span>
                  <span className="text-slate-300">|</span>
                  <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-emerald-800">BOMBAY SHAVING CO.</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Single-use Disposables
              </span>
              <span className="flex items-center gap-1 text-slate-700 font-bold">
                <Zap className="w-4 h-4 text-amber-600" /> UV Sterilized Tools
              </span>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Services', icon: Sparkles },
              { id: 'haircut', label: 'Haircuts', icon: Scissors },
              { id: 'beard', label: 'Beard Care', icon: Crown },
              { id: 'massage', label: 'Massage', icon: Heart },
              { id: 'pedicure', label: 'Pedicures', icon: Footprints },
              { id: 'facial', label: 'Facials & Detan', icon: Sparkles },
              { id: 'package', label: 'Combos & Packages', icon: Package },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative shrink-0 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search grooming services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredServices.map((service) => {
            const quantity = getCartQuantity(service.id);
            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                id={`salon-men-card-${service.id}`}
              >
                <div>
                  <div className="flex gap-4">
                    {/* Thumbnail Image */}
                    <div
                      onClick={() => onSelectServiceDetail(service)}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 shrink-0 cursor-pointer relative"
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {service.discountPercent && (
                        <span className="absolute top-1.5 left-1.5 bg-emerald-600 text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow-xs">
                          {service.discountPercent}% OFF
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                        <div className="flex items-center gap-0.5 text-slate-900 font-bold">
                          <Star className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
                          <span>{service.rating.toFixed(2)}</span>
                        </div>
                        <span className="text-slate-300">•</span>
                        <span>({service.reviewCount.toLocaleString('en-IN')} reviews)</span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-0.5 text-slate-700">
                          <Clock className="w-3 h-3" /> {service.durationMinutes}m
                        </span>
                      </div>

                      <h3
                        onClick={() => onSelectServiceDetail(service)}
                        className="text-base sm:text-lg font-extrabold text-slate-900 mt-1 cursor-pointer hover:text-blue-600 transition-colors line-clamp-2 leading-snug"
                      >
                        {service.title}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Includes preview pills */}
                  {service.includes && service.includes.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                      {service.includes.slice(0, 2).map((inc, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{inc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Row: Price + Add Button */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                        ₹{service.price.toLocaleString('en-IN')}
                      </span>
                      {service.originalPrice && service.originalPrice > service.price && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{service.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 block font-medium">Inclusive of all taxes</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectServiceDetail(service)}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                    >
                      Details
                    </button>

                    {quantity > 0 ? (
                      <div className="flex items-center bg-slate-900 text-white rounded-xl overflow-hidden shadow-xs">
                        <button
                          type="button"
                          onClick={() => onUpdateCartQuantity(service.id, -1)}
                          className="px-2.5 py-1.5 hover:bg-slate-800 transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 font-bold text-xs">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateCartQuantity(service.id, 1)}
                          className="px-2.5 py-1.5 hover:bg-slate-800 transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onAddToCart(service)}
                        className="flex items-center gap-1.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 mt-6">
            <Scissors className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No grooming services found</h3>
            <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting another filter.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
              }}
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
