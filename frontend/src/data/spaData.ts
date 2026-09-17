import { ServiceItem } from '../types';

export interface SpaSubCategory {
  id: string;
  name: string;
  thumbnailUrl: string;
  promoBanner?: {
    title: string;
    subtitle?: string;
    badge?: string;
    imageUrl: string;
  };
  services: ServiceItem[];
}

export interface SpaCategoryConfig {
  title: string;
  rating: number;
  reviewsCount: string;
  heroBanner: {
    title: string;
    subtitle?: string;
    imageUrl: string;
  };
  promiseList: string[];
  categories: SpaSubCategory[];
}

// ============================================================================
// MASSAGE THERAPY FOR WOMEN (Spa at Home)
// Matches Video Reference exactly:
// 4.82 rating (3.9 M bookings), "Bring spa to your home"
// Categories: Stress relief, Pain relief, Skin care scrubs, Post natal, Elderly care, Add-ons
// ============================================================================

export const SPA_SERVICES: ServiceItem[] = [
  // --------------------------------------------------------------------------
  // 1. STRESS RELIEF
  // --------------------------------------------------------------------------
  {
    id: 'spa-stress-relief-swedish',
    categoryId: 'spa-women',
    title: 'Stress relief Swedish massage',
    subtitle: 'Full-body massage which improves blood circulation & sleep quality',
    price: 1319,
    originalPrice: 1599,
    discountPercent: 18,
    rating: 4.81,
    reviewCount: 315000,
    durationMinutes: 60,
    optionsCount: 3,
    badge: 'BESTSELLER',
    description: 'Full-body massage which improves blood circulation & sleep quality. Save more: Add a pack to unlock extra savings.',
    includes: [
      'Full-body massage which improves blood circulation & sleep quality',
      'Save more: Add a pack to unlock extra savings',
      'Gentle to medium pressure full-body Swedish strokes',
      'Single-use sealed hygiene kit & disposable linen',
    ],
    excludes: ['Deep tissue medical physiotherapy'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: false,
    urgentFee: 0,
    tags: ['Bestseller', 'Medium pressure', 'Full body'],
  },
  {
    id: 'spa-quick-comfort-therapy',
    categoryId: 'spa-women',
    title: 'Quick comfort therapy',
    subtitle: 'Revitalising oil massage focused on key stress areas',
    price: 1199,
    originalPrice: 1399,
    discountPercent: 14,
    rating: 4.80,
    reviewCount: 25000,
    durationMinutes: 45,
    description: 'Revitalising oil massage focused on key stress areas. Eases tension & restores energy for a relaxed, refreshed feel.',
    includes: [
      'Revitalising oil massage focused on key stress areas',
      'Eases tension & restores energy for a relaxed, refreshed feel',
      'Focused strokes on upper back, neck, shoulders & arms',
      'Warm aroma oil application',
    ],
    excludes: ['Lower body or legs treatment'],
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: false,
    urgentFee: 0,
    tags: ['Medium pressure', 'Key body areas'],
  },
  {
    id: 'spa-swedish-with-foot',
    categoryId: 'spa-women',
    title: 'Swedish with foot massage',
    subtitle: '60 mins Swedish massage & 20 mins foot massage',
    price: 1769,
    originalPrice: 1869,
    discountPercent: 6,
    rating: 4.81,
    reviewCount: 15000,
    durationMinutes: 80,
    optionsCount: 2,
    badge: 'VALUE SAVER',
    description: '60 mins Swedish massage & 20 mins foot massage. Save more: Add a pack to unlock extra savings.',
    includes: [
      '60 mins Swedish massage & 20 mins foot massage',
      'Save more: Add a pack to unlock extra savings',
      'Soothing full body long strokes',
      'Targeted foot reflexology with acupressure for tired soles',
    ],
    excludes: ['Medical orthopedic manipulation'],
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: false,
    urgentFee: 0,
    tags: ['Value Saver', 'Combo', 'Full body + Foot'],
  },
  {
    id: 'spa-swedish-with-head-shoulder',
    categoryId: 'spa-women',
    title: 'Swedish with head & shoulder massage',
    subtitle: '60 mins Swedish massage & 20 mins head & shoulder massage',
    price: 1769,
    originalPrice: 1999,
    discountPercent: 12,
    rating: 4.80,
    reviewCount: 10000,
    durationMinutes: 80,
    optionsCount: 2,
    description: '60 mins Swedish massage and 20 mins concentrated head & shoulder massage for total stress release.',
    includes: [
      '60 mins Swedish massage',
      '20 mins head & shoulder massage',
      'Relieves cervical spine stiffness and tension headaches',
      'Aromatic warm oil scalp stimulation',
    ],
    excludes: ['Facial extraction or deep tissue work'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: false,
    urgentFee: 0,
    tags: ['De-stress', 'Head & Shoulder'],
  },
  {
    id: 'spa-top-to-toe-stress-relief',
    categoryId: 'spa-women',
    title: 'Top-to-toe stress relief massage',
    subtitle: 'Customisable pressure massage with scalp care & foot reflexology',
    price: 1929,
    originalPrice: 2299,
    discountPercent: 16,
    rating: 4.81,
    reviewCount: 64000,
    durationMinutes: 100,
    optionsCount: 2,
    description: 'Customisable pressure massage with scalp care & foot reflexology. Complete head to toe deep tranquility.',
    includes: [
      'Customisable pressure massage with scalp care & foot reflexology',
      'De-stress from head to toe',
      'Full body oil massage, scalp relaxation & foot acupressure',
      'Single-use luxury hygiene kit',
    ],
    excludes: ['Cross-gender service (female-only policy)'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: false,
    urgentFee: 0,
    tags: ['De-stress', 'Head to Toe', 'Customisable pressure'],
  },

  // --------------------------------------------------------------------------
  // 2. PAIN RELIEF
  // --------------------------------------------------------------------------
  {
    id: 'spa-deep-tissue',
    categoryId: 'spa-women',
    title: 'Deep tissue massage',
    subtitle: 'Supports post-workout relaxation & knot release',
    price: 1469,
    originalPrice: 1799,
    discountPercent: 18,
    rating: 4.80,
    reviewCount: 215000,
    durationMinutes: 60,
    optionsCount: 3,
    badge: 'BESTSELLER',
    description: 'Supports post-workout relaxation. Save more: Add a pack to unlock extra savings on each visit.',
    includes: [
      'Supports post-workout relaxation',
      'Save more: Add a pack to unlock extra savings on each visit',
      'High pressure targeted knot release on back, shoulders & glutes',
      'Warm eucalyptus & herbal therapeutic oil',
    ],
    excludes: ['Recent fractures or surgery within 3 months'],
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: false,
    urgentFee: 0,
    tags: ['Bestseller', 'High pressure', 'Full body', 'Pain relief'],
  },
  {
    id: 'spa-deep-tissue-with-foot',
    categoryId: 'spa-women',
    title: 'Deep tissue with foot massage',
    subtitle: '60 mins deep tissue massage & 20 mins foot massage',
    price: 1898,
    originalPrice: 1998,
    discountPercent: 5,
    rating: 4.81,
    reviewCount: 15000,
    durationMinutes: 80,
    optionsCount: 2,
    description: '60 mins deep tissue massage & 20 mins foot massage. Save more: Add a pack to unlock extra savings on each visit.',
    includes: [
      '60 mins deep tissue massage & 20 mins foot massage',
      'Save more: Add a pack to unlock extra savings on each visit',
      'Intense knot-busting strokes for tight back and shoulders',
      'Foot sole reflexology to relieve calf tiredness',
    ],
    excludes: ['Open skin wounds'],
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: false,
    urgentFee: 0,
    tags: ['High pressure', 'Deep Relief', 'Full body + Foot'],
  },
  {
    id: 'spa-back-relief',
    categoryId: 'spa-women',
    title: 'Back relief massage',
    subtitle: 'Focuses on lower back, spine & shoulder blades to ease tension',
    price: 929,
    originalPrice: 1199,
    discountPercent: 22,
    rating: 4.84,
    reviewCount: 12000,
    durationMinutes: 40,
    optionsCount: 2,
    description: 'Focuses on lower back, spine & shoulder blades to ease tension. Eliminates stiffness & inflammation in the affected areas.',
    includes: [
      'Focuses on lower back, spine & shoulder blades to ease tension',
      'Eliminates stiffness & inflammation in the affected areas',
      'Targeted spinal column and scapula muscle work',
      'Warm hot-towel compress for lumbar relief',
    ],
    excludes: ['Severe disc herniation requiring surgery'],
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: false,
    urgentFee: 0,
    tags: ['Targeted', 'Back relief', 'Lower back & spine'],
  },

  // --------------------------------------------------------------------------
  // 3. SKIN CARE SCRUBS
  // --------------------------------------------------------------------------
  {
    id: 'spa-full-body-scrub',
    categoryId: 'spa-women',
    title: 'Full body massage & scrub',
    subtitle: 'Full body scrub that exfoliates dead skin cells, followed by a relaxing massage',
    price: 1699,
    originalPrice: 2299,
    discountPercent: 26,
    rating: 4.83,
    reviewCount: 18000,
    durationMinutes: 90,
    optionsCount: 3,
    description: 'Full body scrub that exfoliates dead skin cells, followed by a relaxing massage for glowing, velvety-smooth skin.',
    includes: [
      'Full body scrub that exfoliates dead skin cells, followed by a relaxing massage',
      'Gentle granular buffing to unclog pores and remove tan',
      'Nourishing almond and cocoa butter massage',
      'Warm damp wipe and ultra-hydrating finish',
    ],
    excludes: ['Sunburn or active eczema flare-ups'],
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: false,
    urgentFee: 0,
    tags: ['Medium pressure', 'Full body', 'Exfoliation', 'Glowing skin'],
  },

  // --------------------------------------------------------------------------
  // 4. POST NATAL
  // --------------------------------------------------------------------------
  {
    id: 'spa-post-natal',
    categoryId: 'spa-women',
    title: 'Post natal massage',
    subtitle: 'Reduces water retention & eases muscle tension',
    price: 1369,
    originalPrice: 1799,
    discountPercent: 24,
    rating: 4.84,
    reviewCount: 5000,
    durationMinutes: 60,
    optionsCount: 2,
    description: 'Reduces water retention & eases muscle tension. Save more: Add a pack to unlock extra savings on each visit.',
    includes: [
      'Reduces water retention & eases muscle tension',
      'Save more: Add a pack to unlock extra savings on each visit',
      'Certified maternity therapist with specialized training',
      'Gentle abdominal strokes and pelvic muscle toning',
      'Warm sesame and herb-infused oil',
    ],
    excludes: ['Less than 4 weeks post-c-section without doctor approval'],
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: false,
    urgentFee: 0,
    tags: ['Maternity care', 'Post natal', 'Gentle pressure'],
  },

  // --------------------------------------------------------------------------
  // 5. ELDERLY CARE
  // --------------------------------------------------------------------------
  {
    id: 'spa-elderly-care',
    categoryId: 'spa-women',
    title: 'Elderly care massage',
    subtitle: 'Light-pressure full body massage tailored for elderly comfort',
    price: 1399,
    originalPrice: 1799,
    discountPercent: 22,
    rating: 4.85,
    reviewCount: 4000,
    durationMinutes: 60,
    optionsCount: 2,
    badge: 'NEWLY LAUNCHED',
    description: 'Light-pressure full body massage tailored for elderly comfort. Gentle joint mobilization & circulation boost.',
    includes: [
      'Light-pressure full body massage tailored for elderly comfort',
      'Gentle joint mobilization & circulation boost',
      'Warm therapeutic Mahanarayan joint oil',
      'Calming temple & scalp strokes for restful sleep',
    ],
    excludes: ['Severe fragile bone conditions'],
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: false,
    urgentFee: 0,
    tags: ['Newly Launched', 'Light pressure', 'Elderly care'],
  },

  // --------------------------------------------------------------------------
  // 6. ADD-ONS
  // --------------------------------------------------------------------------
  {
    id: 'spa-foot-massage',
    categoryId: 'spa-women',
    title: 'Foot massage',
    subtitle: 'Foot massage using micro-movements to target every pressure point',
    price: 549,
    originalPrice: 699,
    discountPercent: 21,
    rating: 4.81,
    reviewCount: 28000,
    durationMinutes: 20,
    optionsCount: 2,
    description: 'Foot massage using micro-movements to target every pressure point. Relieves stiffness & discomfort in your feet.',
    includes: [
      'Foot massage using micro-movements to target every pressure point',
      'Relieves stiffness & discomfort in your feet',
      'Warm water sanitising wipe & camphor herbal balm',
    ],
    excludes: ['Active fungal infections'],
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: false,
    urgentFee: 0,
    tags: ['Add-on', 'Foot care', '20 mins'],
  },
  {
    id: 'spa-face-massage',
    categoryId: 'spa-women',
    title: 'Face massage',
    subtitle: 'Gentle massage with upward & outward strokes',
    price: 349,
    originalPrice: 499,
    discountPercent: 30,
    rating: 4.82,
    reviewCount: 10000,
    durationMinutes: 15,
    description: 'Gentle massage with upward & outward strokes. Reduces fine lines & puffiness for a refreshed look.',
    includes: [
      'Gentle massage with upward & outward strokes',
      'Reduces fine lines & puffiness for a refreshed look',
      'Kumkumadi saffron oil lymphatic drainage',
    ],
    excludes: ['Severe cystic acne'],
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: false,
    urgentFee: 0,
    tags: ['Add-on', 'Facial care', '15 mins'],
  },
  {
    id: 'spa-scrub-addon',
    categoryId: 'spa-women',
    title: 'Scrub',
    subtitle: 'Gentle scrub to cleanse, smoothen & refresh your skin',
    price: 499,
    originalPrice: 649,
    discountPercent: 23,
    rating: 4.85,
    reviewCount: 12000,
    durationMinutes: 20,
    optionsCount: 2,
    description: 'Gentle scrub to cleanse, smoothen & refresh your skin. Natural granules buff away dead skin and reveal radiant glow.',
    includes: [
      'Gentle scrub to cleanse, smoothen & refresh your skin',
      'Choice of Robusta Coffee Scrub or Rose Walnut Scrub',
      'Targeted exfoliation for arms, legs or back',
    ],
    excludes: ['Active rashes or eczema'],
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: false,
    urgentFee: 0,
    tags: ['Add-on', 'Exfoliation', '2 options'],
  },
  {
    id: 'spa-stretch-therapy',
    categoryId: 'spa-women',
    title: 'Stretch therapy',
    subtitle: 'Full-body low-pressure stretch that eases tension & boosts mobility',
    price: 349,
    originalPrice: 499,
    discountPercent: 30,
    rating: 4.81,
    reviewCount: 15000,
    durationMinutes: 15,
    description: 'Full-body low-pressure stretch that eases tension & boosts mobility. Assisted gentle passive stretching.',
    includes: [
      'Full-body low-pressure stretch that eases tension & boosts mobility',
      'Passive stretching for hamstrings, hip flexors & lumbar spine',
    ],
    excludes: ['Acute ligament tears'],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: false,
    urgentFee: 0,
    tags: ['Add-on', 'Mobility', '15 mins'],
  },
  {
    id: 'spa-massage-topup',
    categoryId: 'spa-women',
    title: 'Massage top-up (15 mins)',
    subtitle: 'Extra 15 mins extension of your massage',
    price: 199,
    originalPrice: 299,
    discountPercent: 33,
    rating: 4.79,
    reviewCount: 27000,
    durationMinutes: 15,
    description: 'Extra 15 mins extension of your massage for targeted relief on your favorite spots.',
    includes: [
      'Extra 15 mins extension of your massage',
      'Customized focus on your tightest muscles',
    ],
    excludes: [],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: false,
    urgentFee: 0,
    tags: ['Add-on', 'Top-up', '15 mins'],
  },
];

export const SPA_CATEGORIES: SpaSubCategory[] = [
  {
    id: 'stress-relief',
    name: 'Stress relief',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=300&q=80',
    promoBanner: {
      title: 'Let go of that built-up stress',
      subtitle: 'Medium pressure • Full body',
      badge: 'Medium pressure',
      imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    },
    services: SPA_SERVICES.filter((s) =>
      [
        'spa-stress-relief-swedish',
        'spa-quick-comfort-therapy',
        'spa-swedish-with-foot',
        'spa-swedish-with-head-shoulder',
        'spa-top-to-toe-stress-relief',
      ].includes(s.id)
    ),
  },
  {
    id: 'pain-relief',
    name: 'Pain relief',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=300&q=80',
    promoBanner: {
      title: 'Targeted pain relief for body',
      subtitle: 'High pressure • Full body',
      badge: 'High pressure',
      imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80',
    },
    services: SPA_SERVICES.filter((s) =>
      ['spa-deep-tissue', 'spa-deep-tissue-with-foot', 'spa-back-relief'].includes(s.id)
    ),
  },
  {
    id: 'skin-care-scrubs',
    name: 'Skin care scrubs',
    thumbnailUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=300&q=80',
    promoBanner: {
      title: 'Gentle exfoliation for glowing skin',
      subtitle: 'Medium pressure • Full body',
      badge: 'Medium pressure',
      imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    },
    services: SPA_SERVICES.filter((s) => ['spa-full-body-scrub'].includes(s.id)),
  },
  {
    id: 'post-natal',
    name: 'Post natal',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=300&q=80',
    services: SPA_SERVICES.filter((s) => ['spa-post-natal'].includes(s.id)),
  },
  {
    id: 'elderly-care',
    name: 'Elderly care',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=300&q=80',
    services: SPA_SERVICES.filter((s) => ['spa-elderly-care'].includes(s.id)),
  },
  {
    id: 'add-ons',
    name: 'Add-ons',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=300&q=80',
    services: SPA_SERVICES.filter((s) =>
      [
        'spa-foot-massage',
        'spa-face-massage',
        'spa-scrub-addon',
        'spa-stretch-therapy',
        'spa-massage-topup',
      ].includes(s.id)
    ),
  },
];

export const SPA_CONFIG: SpaCategoryConfig = {
  title: 'Massage Therapy for Women',
  rating: 4.82,
  reviewsCount: '3.9 M bookings',
  heroBanner: {
    title: 'Bring spa to your home',
    subtitle: 'Relaxing therapies by 4.5+ rated certified female professionals',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
  },
  promiseList: [
    '4.5+ Rated Therapists',
    'Relaxation Assured',
    'Specialized Premium Oils',
  ],
  categories: SPA_CATEGORIES,
};
