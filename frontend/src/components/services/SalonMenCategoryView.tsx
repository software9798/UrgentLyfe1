import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  ChevronRight,
  X,
  Tag,
  ThumbsUp,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import { ServiceItem, CartItem } from '../../types';
import { handleImageError } from '../../utils/imageFallback';

interface SalonMenCategoryViewProps {
  initialTier?: 'royale' | 'prime';
  initialFilter?: string;
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

export interface SalonSubCategory {
  id: string;
  name: string;
  iconImage: string;
  services: ServiceItem[];
}

// ============================================================================
// SALON ROYALE SERVICES (Accurate to Video 00:08 - 00:32)
// ============================================================================
export const SALON_ROYALE_SECTIONS: SalonSubCategory[] = [
  {
    id: 'packages',
    name: 'Packages',
    iconImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=160&q=80',
    services: [
      {
        id: 'royale-pkg-grooming-essentials',
        categoryId: 'salon-men',
        title: 'Grooming essentials',
        subtitle: 'Essential haircut & beard styling combo by top rated pros',
        price: 758,
        rating: 4.89,
        reviewCount: 254000,
        durationMinutes: 75,
        description: 'Includes precision haircut tailored to face profile and custom beard trimming with sharp line edging.',
        isPackage: true,
        badge: 'PACKAGE',
        packageDetails: [
          { label: 'Haircut', text: 'Haircut for men' },
          { label: 'Shave/beard grooming', text: 'Beard trimming & styling' },
        ],
        includes: [
          'Haircut for men by Royale stylist',
          'Beard trimming & styling with single-use blade',
          'Post-cut hair vacuum & styling wax',
        ],
        toolsUsed: ['Ikonic Carbon Pro Trimmer', 'Japanese Steel Shears'],
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80',
        tags: ['Top Rated Pro', 'Royale Package'],
      },
      {
        id: 'royale-pkg-complete-care',
        categoryId: 'salon-men',
        title: 'Complete care',
        subtitle: 'Haircut and O3+ patented face & neck detan package',
        price: 1158,
        rating: 4.90,
        reviewCount: 121000,
        durationMinutes: 75,
        description: 'Complete grooming refresh with master haircut and O3+ professional detan pack for face and neck.',
        isPackage: true,
        badge: 'PACKAGE',
        packageDetails: [
          { label: 'Haircut', text: 'Haircut for men' },
          { label: 'Detan (O3+)', text: 'Face & neck areas' },
        ],
        includes: [
          'Haircut for men with scalp refresh',
          'O3+ professional detan pack application',
          'Cooling ice roller massage & sun shield SPF',
        ],
        toolsUsed: ['O3+ Professional Kit', 'Ikonic Shears'],
        image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=400&q=80',
        tags: ['Top Rated Pro', 'Royale Package', 'O3+'],
      },
      {
        id: 'royale-pkg-glow-getter',
        categoryId: 'salon-men',
        title: 'Glow getter',
        subtitle: 'Repechage sea brightening facial + beard styling + haircut',
        price: 2198,
        originalPrice: 2858,
        discountPercent: 23,
        rating: 4.89,
        reviewCount: 114000,
        durationMinutes: 135,
        description: 'Power packed seaweed facial to improve skin texture & lighten pigmentation, combined with beard contouring and master haircut.',
        isPackage: true,
        badge: 'PACKAGE',
        packageDetails: [
          { label: 'Face care', text: 'Repechage skin brightening facial' },
          { label: 'Shave/beard grooming', text: 'Beard trimming & styling' },
          { label: 'Haircut', text: 'Haircut for men' },
        ],
        includes: [
          'Repechage 4-layer marine seaweed facial',
          'Custom beard shaping with hot towel ritual',
          'Royale master haircut & styling',
        ],
        toolsUsed: ['Repechage Marine Kit', 'Steam Towel', 'Ikonic Shears'],
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        tags: ['Top Rated Pro', 'Repechage', 'Royale Package'],
      },
      {
        id: 'royale-pkg-haircut-color',
        categoryId: 'salon-men',
        title: 'Haircut & color',
        subtitle: 'Haircut for men with Inoa ammonia-free hair color',
        price: 1108,
        originalPrice: 1208,
        discountPercent: 8,
        rating: 4.88,
        reviewCount: 152000,
        durationMinutes: 75,
        description: "Ammonia-free Inoa hair color by L'Oreal Professionnel with precision tailored haircut.",
        isPackage: true,
        badge: 'PACKAGE',
        packageDetails: [
          { label: 'Haircut', text: 'Haircut for men' },
          { label: "Inoa colors (L'Oreal)", text: 'Dark brown (shade 3)' },
        ],
        includes: [
          'Haircut for men with style finish',
          "L'Oreal Inoa ammonia-free color application",
          'Deep conditioning wash & scalp rinse',
        ],
        toolsUsed: ["Inoa L'Oreal Professional", 'Tint Brush', 'Scalp Shield'],
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        tags: ['Top Rated Pro', 'Inoa', "L'Oreal"],
      },
      {
        id: 'royale-pkg-hair-and-care',
        categoryId: 'salon-men',
        title: 'Hair & care',
        subtitle: 'Haircut + 15 mins head massage + Aroma bomb pedicure',
        price: 1977,
        originalPrice: 2407,
        discountPercent: 18,
        rating: 4.89,
        reviewCount: 193000,
        durationMinutes: 135,
        description: 'Complete head-to-toe relaxation with haircut, 15-min scalp oil massage, and soothing aroma bomb pedicure.',
        isPackage: true,
        badge: 'PACKAGE',
        packageDetails: [
          { label: 'Haircut', text: 'Haircut for men' },
          { label: 'Massage', text: '15 mins head massage' },
          { label: 'Pedicure', text: 'Aroma bomb pedicure' },
        ],
        includes: [
          'Haircut for men with style blow dry',
          '15-min deep scalp acupressure massage',
          'Aroma bomb foot soak, scrub & massage',
        ],
        toolsUsed: ['Aroma Bomb Kit', 'Brahmi Oil', 'Foot Spa Tub'],
        image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=400&q=80',
        tags: ['Top Rated Pro', 'Relaxation', 'Pedicure'],
      },
    ],
  },
  {
    id: 'pedicure',
    name: 'Pedicure',
    iconImage: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=160&q=80',
    services: [
      {
        id: 'royale-pedicure-aroma-bomb',
        categoryId: 'salon-men',
        title: 'Aroma bomb pedicure',
        subtitle: 'Revitalise your feet with a soothing aroma bomb pedicure for fresh, soft soles',
        price: 1299,
        originalPrice: 1349,
        discountPercent: 4,
        rating: 4.82,
        reviewCount: 14000,
        durationMinutes: 75,
        description: 'Revitalise your feet with a soothing aroma bomb pedicure for fresh, soft soles. Warm effervescent bath, dead skin removal, heel buffing, and relaxing foot massage.',
        includes: [
          'Aroma bomb fizzy foot soak in warm water',
          'Dead skin filing & callus reduction',
          'Gentle sugar exfoliating scrub',
          'Aromatic moisturizing cream foot massage',
        ],
        toolsUsed: ['Single-use Pedicure Kit', 'Callus Buffer', 'Aroma Bomb'],
        image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=400&q=80',
        tags: ['Top Rated Pro', 'Foot Care'],
      },
      {
        id: 'royale-pedicure-express',
        categoryId: 'salon-men',
        title: 'Express pedicure',
        subtitle: 'Gentle exfoliation & relaxing massage for deep hydration',
        price: 899,
        rating: 4.83,
        reviewCount: 297,
        durationMinutes: 40,
        description: 'Foot care using natural ingredients to leave your feet soft, smooth & refreshed. Gentle exfoliation & a relaxing massage for deep hydration.',
        includes: [
          'Cleansing herbal foot soak',
          'Nail trimming, shaping & cuticle care',
          'Exfoliating foot scrub',
          'Hydrating foot massage',
        ],
        toolsUsed: ['Sterilized Foot File', 'Cuticle Pusher'],
        image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=400&q=80',
        tags: ['Express', 'Quick Care'],
      },
      {
        id: 'royale-nail-cut-file-feet',
        categoryId: 'salon-men',
        title: 'Nail cut & file (feet)',
        subtitle: 'Quick & basic nail grooming of your feet',
        price: 120,
        rating: 4.85,
        reviewCount: 14000,
        durationMinutes: 10,
        description: 'Quick & basic nail grooming of your feet with sanitized clippers and precision emery board file.',
        includes: ['Precision nail clipping', 'Edge smoothing and shaping'],
        toolsUsed: ['Sanitized Nail Clipper', 'Emery Board'],
        image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'royale-nail-cut-file-hands',
        categoryId: 'salon-men',
        title: 'Nail cut & file (hands)',
        subtitle: 'Quick & basic nail grooming of your hands',
        price: 100,
        rating: 4.85,
        reviewCount: 14000,
        durationMinutes: 10,
        description: 'Quick & basic nail grooming of your hands. Clean trim, cuticle care, and smooth edge shaping.',
        includes: ['Sanitized hand nail trimming', 'Uniform edge filing'],
        toolsUsed: ['Precision Hand Clipper', 'Nail Buffer'],
        image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'hair-care',
    name: 'Hair care',
    iconImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
    services: [
      {
        id: 'royale-haircut-men',
        categoryId: 'salon-men',
        title: 'Haircut for men',
        subtitle: 'Includes 10-min head massage with hair tonic & styling',
        price: 449,
        rating: 4.89,
        reviewCount: 381000,
        durationMinutes: 45,
        isBestseller: true,
        badge: 'BESTSELLER',
        description: 'Precision haircut customized to your face structure by top-rated Royale pros. Includes 10-min head massage with hair tonic & premium matte finish styling.',
        includes: [
          'Consultation & precision haircut with Ikonic shears',
          'Neck shave with single-use blade',
          '10-min therapeutic head massage with hair tonic',
          'Hair vacuum cleanup & matte clay styling',
        ],
        toolsUsed: ['Ikonic Shears', 'Sanitized Clippers', 'Neck Duster'],
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        tags: ['Bestseller', 'Top Rated Pro', 'Royale'],
      },
      {
        id: 'royale-haircut-boys',
        categoryId: 'salon-men',
        title: 'Haircut for boys',
        subtitle: 'Specially trained stylists for boys aged 2 years & above',
        price: 459,
        rating: 4.88,
        reviewCount: 180000,
        durationMinutes: 45,
        description: 'Gentle, patient, specially trained stylists for boys aged 2 years & above. Fun, stress-free cut with sanitized child-safe scissors.',
        includes: [
          'Child-friendly haircut styling',
          'Gentle neck trimming with mini clippers',
          'Clean hair wipe and dust off',
        ],
        toolsUsed: ['Child-safe Round-tip Scissors', 'Silent Mini Clipper'],
        image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=400&q=80',
        tags: ['Kids & Boys', 'Child Safe'],
      },
    ],
  },
  {
    id: 'face-care',
    name: 'Face care',
    iconImage: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=160&q=80',
    services: [
      {
        id: 'royale-facial-beardo-golden-glow',
        categoryId: 'salon-men',
        title: 'Beardo Golden glow facial',
        subtitle: 'Instant glow & boosted collagen, leaving skin bright & supple',
        price: 1599,
        rating: 4.80,
        reviewCount: 3000,
        durationMinutes: 65,
        description: 'Instant glow & boosted collagen, leaving skin bright, supple & hydrated. Powered with turmeric & citrus lemon peel for deep skin revitalization.',
        includes: [
          'Cleansing with turmeric milk wash',
          'Steam & ultrasonic dead skin extraction',
          'Collagen boosting golden glow massage',
          'Hydrating peel-off gold mask',
        ],
        toolsUsed: ['Beardo Professional Gold Kit', 'Face Steamer'],
        image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=400&q=80',
        tags: ['Beardo', 'Golden Glow', 'Brightening'],
      },
      {
        id: 'royale-facial-o3-brightening',
        categoryId: 'salon-men',
        title: 'O3+ skin brightening facial',
        subtitle: 'Tan removal, skin brightening & flawless glow with O3+ patented formula',
        price: 2000,
        rating: 4.79,
        reviewCount: 100000,
        durationMinutes: 75,
        description: 'Tan removal, skin brightening & flawless glow with O3+ patented formula. Dermatologically proven to fade stubborn tanning and blemishes.',
        includes: [
          'O3+ D-tan face cleanse',
          'Micro-dermabrasion scrub and steam',
          'O3+ whitening tonic infusion',
          'Rubber cooling glow mask',
        ],
        toolsUsed: ['O3+ Whitening Kit', 'Ultrasonic Spatula'],
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        tags: ['O3+', 'Brightening', 'Clinical'],
      },
      {
        id: 'royale-facial-repechage-brightening',
        categoryId: 'salon-men',
        title: 'Repechage skin brightening facial',
        subtitle: 'Power packed seaweed to improve skin texture & lightens pigmentation',
        price: 2100,
        rating: 4.85,
        reviewCount: 5000,
        durationMinutes: 70,
        description: 'Power packed seaweed to improve skin texture & lightens pigmentation. Premium French marine extracts provide intense mineral nourishment.',
        includes: [
          'Repechage seaweed deep cleansing',
          'Marine honey almond scrub',
          'Cellular regeneration cream massage',
          'Cooling marine algae mask',
        ],
        toolsUsed: ['Repechage French Seaweed Kit', 'Hot Towels'],
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        tags: ['Repechage', 'Luxury Marine', 'Skin Glow'],
      },
      {
        id: 'royale-detan-o3-face-neck',
        categoryId: 'salon-men',
        title: 'O3+ face & neck detan',
        subtitle: 'Tan removal with reduction of dark spots & blemishes & pigmentation',
        price: 699,
        rating: 4.81,
        reviewCount: 15000,
        durationMinutes: 30,
        description: 'Tan removal with reduction of dark spots & blemishes & pigmentation. Fast acting clinical detan pack applied evenly across face and neck.',
        includes: [
          'Deep face cleansing with warm towel',
          'O3+ patented detan cream application',
          '15-minute penetration & gentle wipe',
          'Sun protection SPF 50 shield',
        ],
        toolsUsed: ['O3+ Professional Detan Pack'],
        image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=400&q=80',
        tags: ['O3+', 'Detan', 'Fast Acting'],
      },
      {
        id: 'royale-o3-cleanup',
        categoryId: 'salon-men',
        title: 'O3+ cleanup',
        subtitle: 'A routine deep cleansing ritual to remove dirt, oil & dead skin cells',
        price: 1299,
        rating: 4.83,
        reviewCount: 15000,
        durationMinutes: 45,
        description: 'A routine deep cleansing ritual to remove dirt, oil & dead skin cells. Unclogs congested pores and provides instant freshness.',
        includes: [
          'Exfoliating cleansing foam',
          'Steam & blackhead vacuum extraction',
          'O3+ pore tightening toner',
          'Hydrating light moisturizer',
        ],
        toolsUsed: ['O3+ Professional Cleanser', 'Pore Extractor'],
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        tags: ['Cleanup', 'O3+', 'Deep Cleansing'],
      },
    ],
  },
  {
    id: 'shave-beard',
    name: 'Shave/beard grooming',
    iconImage: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=160&q=80',
    services: [
      {
        id: 'royale-beard-trim-style',
        categoryId: 'salon-men',
        title: 'Beard trimming & styling',
        subtitle: 'Precision trimming, line shaping with single-use blade & aftershave splash',
        price: 299,
        rating: 4.87,
        reviewCount: 95000,
        durationMinutes: 30,
        description: 'Precision trimming, line shaping with single-use blade & aftershave splash. Custom beard shaping according to your jawline profile.',
        includes: [
          'Consultation on beard neckline & cheeklines',
          'Ikonic precision clipper trim',
          'Straight razor single-blade cheek shaping',
          'Cooling sandalwood aftershave splash',
        ],
        toolsUsed: ['Ikonic Beard Trimmer', 'Single-use Blade Razor'],
        image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=400&q=80',
        tags: ['Royale', 'Beard Care'],
      },
      {
        id: 'royale-clean-shave',
        categoryId: 'salon-men',
        title: 'Clean shave',
        subtitle: 'Double-pass smooth shave with hot towel prep and calming balm',
        price: 299,
        rating: 4.88,
        reviewCount: 45000,
        durationMinutes: 30,
        description: 'Double-pass smooth shave with hot towel prep and calming balm. Eliminates stubble with zero razor burns or irritation.',
        includes: [
          'Eucalyptus hot towel pre-shave steam',
          'Rich lather foaming cream brush',
          'Fresh single-use razor glide',
          'Calming aloe aftershave balm',
        ],
        toolsUsed: ['Hot Towel Steamer', 'Single-use Blade', 'Shaving Brush'],
        image: 'https://images.unsplash.com/photo-1584297091622-af8e5bd80b13?auto=format&fit=crop&w=400&q=80',
        tags: ['Clean Shave', 'Smooth Finish'],
      },
      {
        id: 'royale-beard-color',
        categoryId: 'salon-men',
        title: 'Beard colour (only application)',
        subtitle: 'Even & mess-free beard color application by master stylists',
        price: 249,
        rating: 4.82,
        reviewCount: 12000,
        durationMinutes: 20,
        description: 'Even & mess-free beard color application by master stylists. Ensures natural-looking coverage with zero skin staining.',
        includes: ['Precision tint brush application', 'Skin barrier cream', 'Neat boundary edging'],
        toolsUsed: ['Micro Tint Brush', 'Skin Barrier Cream'],
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80',
        tags: ['Beard Color', 'Even Tone'],
      },
    ],
  },
  {
    id: 'hair-color',
    name: 'Hair color',
    iconImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
    services: [
      {
        id: 'royale-hair-color-app',
        categoryId: 'salon-men',
        title: 'Hair colour (only application)',
        subtitle: 'Mess-free hair color application, precision root touchup',
        price: 349,
        rating: 4.86,
        reviewCount: 65000,
        durationMinutes: 35,
        description: 'Mess-free hair color application, precision root touchup with uniform grey coverage and clean scalp wash.',
        includes: ['Forehead & ear barrier protection', 'Even root-to-tip application', 'Shampoo & rinse'],
        toolsUsed: ['Tint Bowl & Brush', 'Protective Ear Covers'],
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'royale-hair-color-inoa',
        categoryId: 'salon-men',
        title: "Inoa L'Oreal ammonia-free hair color",
        subtitle: "Premium ammonia-free Inoa color by L'Oreal Professionnel",
        price: 699,
        rating: 4.89,
        reviewCount: 42000,
        durationMinutes: 45,
        description: "100% ammonia-free oil-delivery hair color by L'Oreal Professionnel. Nourishing formula that preserves hair softness and shine.",
        includes: ["Inoa L'Oreal professional color mix", 'Even strand application', 'Color-lock shampoo wash'],
        toolsUsed: ["Inoa L'Oreal Professional Kit"],
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        tags: ["L'Oreal", 'Inoa', 'Ammonia Free'],
      },
    ],
  },
  {
    id: 'massage',
    name: 'Massage',
    iconImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=160&q=80',
    services: [
      {
        id: 'royale-head-neck-shoulder-massage',
        categoryId: 'salon-men',
        title: 'Head, neck & shoulder massage',
        subtitle: 'Head oil massage along with neck and shoulder dry massage',
        price: 449,
        rating: 4.86,
        reviewCount: 20000,
        durationMinutes: 40,
        optionsCount: 7,
        tags: ['7 options', 'Popular', 'Royale'],
        description: 'Head oil massage along with neck and shoulder dry massage. Perfect to maintain upper body health for people who sit & work for longer hours.',
        includes: [
          'Warm therapeutic oil head massage',
          'Cervical spine & neck tension release',
          'Trapezius and shoulder blade acupressure',
          'Hot towel neck press',
        ],
        toolsUsed: ['Therapeutic Herbal Oil', 'Hot Towels'],
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
];

// ============================================================================
// SALON PRIME SERVICES (Accurate to Video 00:38 - 00:56)
// ============================================================================
export const SALON_PRIME_SECTIONS: SalonSubCategory[] = [
  {
    id: 'packages',
    name: 'Packages',
    iconImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=160&q=80',
    services: [
      {
        id: 'prime-pkg-grooming-essentials',
        categoryId: 'salon-men',
        title: 'Grooming essentials',
        subtitle: 'Haircut + Beard trimming & styling + 10 mins Head massage',
        price: 512,
        originalPrice: 569,
        discountPercent: 10,
        rating: 4.85,
        reviewCount: 1000000,
        durationMinutes: 55,
        isPackage: true,
        badge: 'VALUE SAVER',
        packageDetails: [
          { label: 'Haircut', text: 'Haircut for men' },
          { label: 'Beard or shaving grooming', text: 'Beard trimming & styling' },
          { label: 'Massage', text: 'Head massage (10 mins)' },
        ],
        description: 'Everyday essential grooming with tailored haircut, customized beard styling, and relaxing 10-minute head massage.',
        includes: [
          'Haircut for men tailored to face shape',
          'Beard trimming & styling with single blade finish',
          '10 mins relaxing head oil massage',
        ],
        toolsUsed: ['Sanitized Hair Clipper', 'Single-use Razor Blade'],
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80',
        tags: ['Value Saver', '10% OFF', 'Prime'],
      },
      {
        id: 'prime-pkg-haircut-color',
        categoryId: 'salon-men',
        title: 'Haircut & color',
        subtitle: 'Haircut for men + Garnier Black (shade 3) hair color',
        price: 553,
        originalPrice: 614,
        discountPercent: 10,
        rating: 4.85,
        reviewCount: 549000,
        durationMinutes: 55,
        isPackage: true,
        badge: 'VALUE SAVER',
        packageDetails: [
          { label: 'Haircut', text: 'Haircut for men' },
          { label: 'Hair color', text: 'Garnier | Black (shade 3)' },
        ],
        description: 'Everyday tailored haircut plus mess-free application of Garnier black (shade 3) hair color.',
        includes: [
          'Haircut for men with hair wash',
          'Garnier shade 3 black color application',
          'Post-color rinse and styling',
        ],
        toolsUsed: ['Garnier Hair Color Kit', 'Hair Scissors'],
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        tags: ['Value Saver', '10% OFF'],
      },
      {
        id: 'prime-pkg-hair-care',
        categoryId: 'salon-men',
        title: 'Hair & care',
        subtitle: 'Haircut for men + Brightening lemon express pedicure',
        price: 778,
        originalPrice: 865,
        discountPercent: 10,
        rating: 4.81,
        reviewCount: 85000,
        durationMinutes: 80,
        isPackage: true,
        badge: 'VALUE SAVER',
        packageDetails: [
          { label: 'Haircut', text: 'Haircut for men' },
          { label: 'Pedicure', text: 'Brightening lemon express pedicure' },
        ],
        description: 'Refreshing combo of professional men haircut and brightening lemon express pedicure to revive tired feet.',
        includes: [
          'Professional face-shaped haircut',
          'Lemon foot soak, exfoliation scrub and massage',
        ],
        toolsUsed: ['Foot Spa Kit', 'Clippers'],
        image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=400&q=80',
        tags: ['Value Saver', '10% OFF'],
      },
      {
        id: 'prime-pkg-face-care-beyond',
        categoryId: 'salon-men',
        title: 'Face care & beyond',
        subtitle: 'Office-ready cleanup + Haircut for men + 10 mins Head massage',
        price: 1148,
        originalPrice: 1275,
        discountPercent: 10,
        rating: 4.82,
        reviewCount: 62000,
        durationMinutes: 95,
        isPackage: true,
        badge: 'VALUE SAVER',
        packageDetails: [
          { label: 'Facial or cleanup', text: 'Office-ready cleanup' },
          { label: 'Haircut', text: 'Haircut for men' },
          { label: 'Massage', text: 'Head massage (10 mins)' },
        ],
        description: 'Complete grooming refresh with botanical office-ready cleanup, haircut, and soothing 10-minute head massage.',
        includes: [
          'Office-ready face cleanup with dead skin removal',
          'Tailored men haircut and neck trim',
          '10-min tension release head massage',
        ],
        toolsUsed: ['Botanical Cleanser', 'Hair Shears'],
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        tags: ['Value Saver', '10% OFF'],
      },
    ],
  },
  {
    id: 'haircut-beard',
    name: 'Haircut & beard styling',
    iconImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
    services: [
      {
        id: 'prime-haircut-men',
        categoryId: 'salon-men',
        title: 'Haircut for men',
        subtitle: 'Professional haircut tailored to your face shape',
        price: 259,
        rating: 4.86,
        reviewCount: 40000000,
        durationMinutes: 30,
        isBestseller: true,
        badge: 'BESTSELLER',
        description: 'Professional haircut tailored to your face shape. Delivered by verified Prime barbers with sanitized tools.',
        includes: [
          'Face profile consultation',
          'Machine clipper cut and scissor texture',
          'Straight razor neck cleanup',
          'Dry dust off and styling wax',
        ],
        toolsUsed: ['Sanitized Hair Clipper', 'Single-use Disposables'],
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        tags: ['Bestseller', 'Prime Favorite'],
      },
      {
        id: 'prime-haircut-boys',
        categoryId: 'salon-men',
        title: 'Haircut for boys',
        subtitle: 'Specially trained stylists for boys aged 2 years and above',
        price: 259,
        rating: 4.83,
        reviewCount: 108000,
        durationMinutes: 30,
        description: 'Specially trained stylists for boys aged 2 years and above. Patient, gentle, and fun styling experience.',
        includes: ['Child friendly haircut', 'Soft clipper blending', 'Clean neck wipe'],
        toolsUsed: ['Silent Clipper', 'Child Scissors'],
        image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=400&q=80',
        tags: ['Kids', 'Gentle Care'],
      },
      {
        id: 'prime-clean-shave',
        categoryId: 'salon-men',
        title: 'Clean shave',
        subtitle: 'Ultra shave with a single-use blade for the cleanest shave',
        price: 199,
        rating: 4.85,
        reviewCount: 18000,
        durationMinutes: 20,
        description: 'Ultra shave with a single-use blade for the cleanest shave. Fresh blade opened in front of you with soothing aftershave lotion.',
        includes: ['Foam lather application', 'Single-use blade clean shave', 'Soothing lotion splash'],
        toolsUsed: ['Single-use Blade', 'Lather Brush'],
        image: 'https://images.unsplash.com/photo-1584297091622-af8e5bd80b13?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'prime-beard-trim-style',
        categoryId: 'salon-men',
        title: 'Beard trimming & styling',
        subtitle: 'Get customized beard shaping from trained stylists',
        price: 199,
        rating: 4.85,
        reviewCount: 153000,
        durationMinutes: 25,
        isBestseller: true,
        badge: 'BESTSELLER',
        description: 'Get customized beard shaping from trained stylists. Precision trimmer work with neat cheek and neckline definition.',
        includes: ['Beard length trimming', 'Neckline clipper edging', 'Cheek line definition', 'Conditioning oil'],
        toolsUsed: ['Beard Clipper', 'Razor Line Trimmer'],
        image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=400&q=80',
        tags: ['Bestseller', 'Beard Styling'],
      },
      {
        id: 'prime-beard-color',
        categoryId: 'salon-men',
        title: 'Beard color (with product)',
        subtitle: 'Even & mess free colour application',
        price: 199,
        rating: 4.81,
        reviewCount: 8000,
        durationMinutes: 30,
        description: 'Even & mess free colour application. Product included for full beard coverage and sharp look.',
        includes: ['Beard color application', 'Skin protection barrier', 'Clean boundary wipe'],
        toolsUsed: ['Beard Tint Brush'],
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'detan',
    name: 'Detan',
    iconImage: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=160&q=80',
    services: [
      {
        id: 'prime-detan-face-neck',
        categoryId: 'salon-men',
        title: 'Face & neck detan',
        subtitle: 'Tan removal with deep cleansing for face and neck areas',
        price: 499,
        rating: 4.79,
        reviewCount: 351000,
        durationMinutes: 25,
        description: 'Tan removal with deep cleansing for face and neck areas. Clears sun damage, dullness, and dead skin layers.',
        includes: ['Face cleansing with warm wipe', 'Detan pack application', '15-min absorption', 'Cooling moisturizer'],
        toolsUsed: ['Professional Detan Cream', 'Cotton Towel'],
        image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=400&q=80',
        tags: ['Detan', 'Popular'],
      },
      {
        id: 'prime-detan-hands',
        categoryId: 'salon-men',
        title: 'Hands detan',
        subtitle: 'Even skin tone and tan removal for hands up to wrists',
        price: 498,
        rating: 4.74,
        reviewCount: 16000,
        durationMinutes: 30,
        description: 'Even skin tone and tan removal for hands up to wrists. Brightens skin and removes deep bike/driving tan.',
        includes: ['Exfoliating hand scrub', 'Detan pack up to wrists', 'Rinse and hydrating lotion'],
        toolsUsed: ['Hand Detan Pack'],
        image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'facial-cleanup',
    name: 'Facial & cleanup',
    iconImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    services: [
      {
        id: 'prime-facial-skin-brightening',
        categoryId: 'salon-men',
        title: 'Skin brightening facial',
        subtitle: 'Powered with turmeric & vitamin C for instant glow & boosted hydration',
        price: 1449,
        rating: 4.77,
        reviewCount: 1200,
        durationMinutes: 60,
        description: 'Powered with turmeric & vitamin C for instant glow & boosted hydration. Deeply purifies skin and restores moisture balance.',
        includes: [
          'Turmeric face cleansing',
          'Gentle walnut scrub exfoliation',
          'Vitamin C radiance cream massage',
          'Cooling hydrating peel mask',
        ],
        toolsUsed: ['Vitamin C Radiance Kit'],
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        tags: ['Vitamin C', 'Glow'],
      },
      {
        id: 'prime-cleanup-office-ready',
        categoryId: 'salon-men',
        title: 'Office-ready cleanup',
        subtitle: 'Botanical extracts deeply cleanses buildup to cleanse & soften the skin',
        price: 699,
        rating: 4.75,
        reviewCount: 38000,
        durationMinutes: 30,
        description: 'Botanical extracts deeply cleanses buildup to cleanse & soften the skin. Quick 30-minute refresh before meetings or events.',
        includes: [
          'Botanical deep face wash',
          'Dead cell scrub & gentle extraction',
          'Pore tight toner & soothing aloe gel',
        ],
        toolsUsed: ['Botanical Cleanser Pack'],
        image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=400&q=80',
        tags: ['Quick Refresh', 'Office Ready'],
      },
      {
        id: 'prime-cleanup-oil-free',
        categoryId: 'salon-men',
        title: 'Oil-free vacation cleanup',
        subtitle: 'Deep sebum extraction and refreshing cooling mask',
        price: 699,
        rating: 4.77,
        reviewCount: 54,
        durationMinutes: 30,
        description: 'Deep sebum extraction and refreshing cooling mask. Keeps face matte, oil-free and glowing throughout the day.',
        includes: ['Oil control tea-tree wash', 'Charcoal scrub & steam', 'Cooling mint mud pack'],
        toolsUsed: ['Tea Tree Oil Control Kit'],
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'manicure-pedicure',
    name: 'Manicure & pedicure',
    iconImage: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=160&q=80',
    services: [
      {
        id: 'prime-pedicure-choc-vanilla',
        categoryId: 'salon-men',
        title: 'Chocolate & vanilla sole rejuvenating pedicure',
        subtitle: 'Rich chocolate & vanilla extracts to soothe and soften dry soles',
        price: 699,
        rating: 4.78,
        reviewCount: 1200,
        durationMinutes: 45,
        description: 'Foot care using rich chocolate & vanilla extracts to soothe and soften dry soles. Relieves cracked heels and softens dry skin.',
        includes: ['Warm foot soak', 'Dead skin filing & scrub', 'Vanilla cream foot massage'],
        toolsUsed: ['Single-use Pedicure Kit'],
        image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'prime-pedicure-brightening-lemon',
        categoryId: 'salon-men',
        title: 'Brightening lemon deep cleanse pedicure',
        subtitle: 'Lemon extract soak, gentle scrub & relaxing massage to revive tired feet',
        price: 799,
        rating: 4.79,
        reviewCount: 90,
        durationMinutes: 50,
        isBestseller: true,
        badge: 'BESTSELLER',
        description: 'Lemon extract soak, gentle scrub & relaxing massage to revive tired feet. Removes accumulated grime and provides fresh scent.',
        includes: ['Fresh lemon slice foot soak', 'Pumice callus smoothing', 'Citrus exfoliating scrub', 'Massage'],
        toolsUsed: ['Lemon Spa Salt', 'Foot Buffer'],
        image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=400&q=80',
        tags: ['Bestseller', 'Deep Cleanse'],
      },
      {
        id: 'prime-nail-cut-hands',
        categoryId: 'salon-men',
        title: 'Nail cut & file (hands)',
        subtitle: 'Quick & basic nail grooming of your hands',
        price: 99,
        rating: 4.71,
        reviewCount: 10000,
        durationMinutes: 10,
        description: 'Quick & basic nail grooming of your hands by verified Prime barbers.',
        includes: ['Sanitized nail clipping', 'Emery file smoothing'],
        toolsUsed: ['Sanitized Nail Clipper'],
        image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'prime-nail-cut-feet',
        categoryId: 'salon-men',
        title: 'Nail cut & file (feet)',
        subtitle: 'Quick & basic nail grooming of your feet',
        price: 99,
        rating: 4.71,
        reviewCount: 10000,
        durationMinutes: 10,
        description: 'Quick & basic nail grooming of your feet with clean clippers.',
        includes: ['Sanitized toenail trimming', 'Edge shaping'],
        toolsUsed: ['Sanitized Toe Clipper'],
        image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'hair-color',
    name: 'Hair color',
    iconImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
    services: [
      {
        id: 'prime-hair-color-with-prod',
        categoryId: 'salon-men',
        title: 'Hair color (with product)',
        subtitle: "Mess-free hair color application with Garnier/L'Oreal black or brown",
        price: 299,
        rating: 4.81,
        reviewCount: 45000,
        durationMinutes: 30,
        description: "Mess-free hair color application with Garnier/L'Oreal black or brown included. Natural looking finish with zero mess.",
        includes: ['Hairline barrier cream', 'Full grey hair coverage', 'Shampoo and rinse'],
        toolsUsed: ['Garnier/Loreal Kit', 'Tint Brush'],
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'prime-hair-color-only-app',
        categoryId: 'salon-men',
        title: 'Hair color (only application)',
        subtitle: 'Expert application of your own hair color kit',
        price: 249,
        rating: 4.80,
        reviewCount: 28000,
        durationMinutes: 25,
        description: 'Expert application of your own hair color kit. Professional even application without staining forehead or ears.',
        includes: ['Sectioning & application', 'Barrier cream', 'Post-wash guidance'],
        toolsUsed: ['Tint Bowl', 'Applicator Brush'],
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'massage',
    name: 'Massage',
    iconImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=160&q=80',
    services: [
      {
        id: 'prime-face-massage',
        categoryId: 'salon-men',
        title: 'Hydrating face massage (10 mins)',
        subtitle: 'Gentle pressure-point face massage with hydrating aloe gel',
        price: 199,
        rating: 4.80,
        reviewCount: 5200,
        durationMinutes: 10,
        description: 'Gentle pressure-point face massage with hydrating aloe gel. Relieves facial muscle tension and refreshes tired eyes.',
        includes: ['Gentle facial wipe', 'Acupressure face glide', 'Hydrating aloe gel finish'],
        toolsUsed: ['Organic Aloe Gel'],
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'prime-neck-shoulder-massage',
        categoryId: 'salon-men',
        title: 'Neck & shoulder massage',
        subtitle: 'Quick tension release dry massage for upper back, neck and shoulders',
        price: 249,
        rating: 4.80,
        reviewCount: 20000,
        durationMinutes: 20,
        description: 'Quick tension release dry massage for upper back, neck and shoulders. Ideal for desk workers to ease stiffness.',
        includes: ['Upper back pressure point therapy', 'Neck stiffness release', 'Shoulder blade roll'],
        toolsUsed: ['Acupressure Knot Relief'],
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
];

// Flat lookup for all men salon services
export const ALL_MEN_SERVICES: ServiceItem[] = [
  ...SALON_ROYALE_SECTIONS.flatMap((s) => s.services),
  ...SALON_PRIME_SECTIONS.flatMap((s) => s.services),
];

// Legacy export compatibility
export const MEN_SALON_SERVICES: Record<'royale' | 'prime', ServiceItem[]> = {
  royale: SALON_ROYALE_SECTIONS.flatMap((s) => s.services),
  prime: SALON_PRIME_SECTIONS.flatMap((s) => s.services),
};

export const SalonMenCategoryView: React.FC<SalonMenCategoryViewProps> = ({
  initialTier = 'royale',
  initialFilter = 'all',
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
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [packageModalService, setPackageModalService] = useState<ServiceItem | null>(null);

  const sectionsRef = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (initialTier) {
      setActiveTier(initialTier);
    }
  }, [initialTier]);

  useEffect(() => {
    if (initialFilter && initialFilter !== 'all') {
      setSelectedSubCategory(initialFilter);
    }
  }, [initialFilter]);

  const currentSections = useMemo(() => {
    return activeTier === 'royale' ? SALON_ROYALE_SECTIONS : SALON_PRIME_SECTIONS;
  }, [activeTier]);

  const getCartQuantity = (serviceId: string) => {
    const item = cartItems.find((c) => c.service.id === serviceId);
    return item ? item.quantity : 0;
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.service.price * item.quantity, 0);
  }, [cartItems]);

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Scroll to section when a sidebar category is clicked
  const handleSelectSubCategory = (sectionId: string) => {
    setSelectedSubCategory(sectionId);
    if (sectionId !== 'all') {
      const el = sectionsRef.current[sectionId];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] pb-24 text-slate-900" id="salon-men-category-view">
      {/* ===================================================================== */}
      {/* TOP HEADER (Matching UrgentLyfe navigation bar in video)              */}
      {/* ===================================================================== */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3 sm:gap-6">
          {/* Back button & Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 -ml-1 rounded-xl hover:bg-slate-100 text-slate-800 transition-colors cursor-pointer"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* UrgentLyfe logo text badge */}
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={onClose}>
              <span className="bg-black text-white font-extrabold text-[13px] px-1.5 py-0.5 rounded tracking-tight">
                UL
              </span>
              <span className="font-black text-slate-900 text-base sm:text-lg tracking-tight hidden xs:inline-block">
                UrgentLyfe
              </span>
            </div>
          </div>

          {/* Locality Selector Dropdown */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-full max-w-[280px] truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="font-semibold text-slate-900 truncate">
              {selectedLocality || 'Noida, Uttar Pradesh'}
            </span>
          </div>

          {/* Search bar matching video: "Search in Salon Royale" / "Search in Salon Prime" */}
          <div className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in Salon ${activeTier === 'royale' ? 'Royale' : 'Prime'}`}
              className="w-full bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-xs text-slate-900 placeholder:text-slate-500 pl-9 pr-8 py-2 rounded-xl border border-transparent focus:border-slate-300 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Preference Switch Button */}
          {onOpenPreferenceModal && (
            <button
              type="button"
              id="switch-preference-btn"
              onClick={onOpenPreferenceModal}
              className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 border border-blue-200/90 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs whitespace-nowrap"
            >
              <Crown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preference:</span>
              <span className="capitalize">{activeTier}</span>
            </button>
          )}
        </div>
      </header>

      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-5">
        {/* ===================================================================== */}
        {/* HERO CARD: "Salon Royale" or "Salon Prime" (Exact Video 00:08 / 00:38) */}
        {/* ===================================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 mb-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                {activeTier === 'royale' ? 'Salon Royale' : 'Salon Prime'}
              </h1>
              {activeTier === 'royale' ? (
                <span className="bg-amber-100 text-amber-900 border border-amber-300/80 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Top Rated Pros
                </span>
              ) : (
                <span className="bg-slate-100 text-slate-700 border border-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Value Saver
                </span>
              )}
            </div>

            {/* Rating row: e.g. ★ 4.87 (1.2 M bookings) */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 font-medium">
              <div className="flex items-center gap-1 text-slate-900 font-bold">
                <Star className="w-4 h-4 fill-slate-900 text-slate-900" />
                <span>{activeTier === 'royale' ? '4.87' : '4.83'}</span>
              </div>
              <span className="text-slate-400">({activeTier === 'royale' ? '1.2 M' : '8.0 M'} bookings)</span>
            </div>

            {/* Brand partners tag */}
            <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500 font-semibold tracking-wider">
              <span>POWERED BY:</span>
              {activeTier === 'royale' ? (
                <span className="text-slate-900 font-bold">IKONIC • REPÊCHAGE • O3+</span>
              ) : (
                <span className="text-slate-900 font-bold">L'ORÉAL • BOMBAY SHAVING CO.</span>
              )}
            </div>
          </div>

          {/* Earliest Slot Badge (Matching Video Top Right Badge) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 self-start sm:self-auto flex flex-col items-start sm:items-end">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Earliest
            </span>
            <span className="text-sm font-bold text-slate-900 mt-0.5">
              {activeTier === 'royale' ? 'Fri, 3:00 PM' : 'Fri, 7:00 AM'}
            </span>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* THREE COLUMN WORKSPACE (Video Layout: Categories | Services | Cart)   */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ------------------------------------------------------------------- */}
          {/* COLUMN 1: "Select a service" Subcategory Grid (Left Sidebar)        */}
          {/* ------------------------------------------------------------------- */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs lg:sticky lg:top-20">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">
              Select a service
            </h2>

            {/* 2-column icon grid matching video */}
            <div className="grid grid-cols-2 gap-2.5">
              {currentSections.map((sec) => {
                const isSelected = selectedSubCategory === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => handleSelectSubCategory(sec.id)}
                    className={`flex flex-col items-center text-center p-2.5 rounded-xl border transition-all cursor-pointer group ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white shadow-2xs'
                        : 'border-slate-100 bg-[#f8fafc] hover:bg-slate-100/90 text-slate-800'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden mb-1.5 bg-slate-200 shrink-0 border border-slate-200/60">
                      <img
                        src={sec.iconImage}
                        alt={sec.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, 'men')}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[11px] font-semibold leading-tight line-clamp-2">
                      {sec.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* "Show All" toggle button if user filtered */}
            {selectedSubCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedSubCategory('all')}
                className="w-full mt-3 py-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 text-center transition-colors cursor-pointer"
              >
                View all categories
              </button>
            )}
          </aside>

          {/* ------------------------------------------------------------------- */}
          {/* COLUMN 2: Services List with Section Headers                        */}
          {/* ------------------------------------------------------------------- */}
          <section className="lg:col-span-6 space-y-8 min-w-0">
            {currentSections.map((section) => {
              // If a filter is selected and doesn't match this section, skip
              if (selectedSubCategory !== 'all' && selectedSubCategory !== section.id) {
                return null;
              }

              // Search query filter
              const visibleServices = section.services.filter((svc) => {
                if (!searchQuery) return true;
                const q = searchQuery.toLowerCase();
                return (
                  svc.title.toLowerCase().includes(q) ||
                  svc.description.toLowerCase().includes(q) ||
                  svc.tags?.some((t) => t.toLowerCase().includes(q))
                );
              });

              if (visibleServices.length === 0) return null;

              return (
                <div
                  key={section.id}
                  id={`section-${section.id}`}
                  ref={(el) => {
                    sectionsRef.current[section.id] = el;
                  }}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs"
                >
                  {/* Section Title matching video: "Packages", "Pedicure", etc. */}
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight mb-5 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span>{section.name}</span>
                    <span className="text-xs font-medium text-slate-400">
                      {visibleServices.length} {visibleServices.length === 1 ? 'service' : 'services'}
                    </span>
                  </h2>

                  {/* List of services in this category */}
                  <div className="divide-y divide-slate-100">
                    {visibleServices.map((service) => {
                      const qty = getCartQuantity(service.id);

                      // =======================================================
                      // PACKAGE CARD TEMPLATE (Matching UrgentLyfe Video)
                      // =======================================================
                      if (service.isPackage) {
                        return (
                          <div
                            key={service.id}
                            id={`package-card-${service.id}`}
                            className="py-5 first:pt-0 last:pb-0"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                {/* Top Badge Row: PACKAGE / VALUE SAVER + 10% OFF */}
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                    {service.badge || 'PACKAGE'}
                                  </span>
                                  {service.discountPercent && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                                      {service.discountPercent}% OFF
                                    </span>
                                  )}
                                </div>

                                {/* Title */}
                                <h3
                                  onClick={() => onSelectServiceDetail(service)}
                                  className="text-lg sm:text-xl font-bold text-slate-950 hover:text-blue-600 transition-colors cursor-pointer leading-snug"
                                >
                                  {service.title}
                                </h3>

                                {/* Rating & Review Count */}
                                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium my-1">
                                  <span className="inline-flex items-center gap-0.5 font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                                    <Star className="w-3 h-3 fill-slate-900 text-slate-900" />
                                    {service.rating.toFixed(2)}
                                  </span>
                                  <span className="text-slate-400">
                                    ({service.reviewCount.toLocaleString('en-IN')} reviews)
                                  </span>
                                </div>

                                {/* Price & Duration: e.g. ₹758 • 1 hr 15 mins */}
                                <div className="flex items-baseline gap-2 text-sm font-semibold text-slate-900 my-1.5">
                                  <span className="text-base font-bold text-slate-950">
                                    ₹{service.price.toLocaleString('en-IN')}
                                  </span>
                                  {service.originalPrice && service.originalPrice > service.price && (
                                    <span className="text-xs text-slate-400 line-through font-normal">
                                      ₹{service.originalPrice.toLocaleString('en-IN')}
                                    </span>
                                  )}
                                  <span className="text-slate-300">•</span>
                                  <span className="text-xs text-slate-600 font-normal">
                                    {service.durationMinutes >= 60
                                      ? `${Math.floor(service.durationMinutes / 60)} hr ${
                                          service.durationMinutes % 60 ? `${service.durationMinutes % 60} mins` : ''
                                        }`
                                      : `${service.durationMinutes} mins`}
                                  </span>
                                </div>

                                {/* Package Inclusions Bullets (Matching Video) */}
                                {service.packageDetails && service.packageDetails.length > 0 && (
                                  <ul className="mt-2.5 space-y-1 text-xs text-slate-700 pl-1 border-l-2 border-slate-200">
                                    {service.packageDetails.map((item, idx) => (
                                      <li key={idx} className="flex items-start gap-1.5">
                                        <span className="text-slate-400">•</span>
                                        <span>
                                          <strong className="font-semibold text-slate-900">{item.label}</strong>: {item.text}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                )}

                                {/* "Edit your package" button */}
                                <div className="mt-3">
                                  <button
                                    type="button"
                                    onClick={() => setPackageModalService(service)}
                                    className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer inline-flex items-center gap-1"
                                  >
                                    Edit your package
                                    <ChevronRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              {/* Right side: Add button & optional 10% OFF badge */}
                              <div className="flex flex-col items-end gap-2 shrink-0 pt-1">
                                {activeTier === 'prime' && service.discountPercent && (
                                  <span className="text-[11px] font-black tracking-tight text-slate-900 text-right">
                                    10%<br />
                                    <span className="text-[9px] font-semibold text-slate-500 uppercase">OFF</span>
                                  </span>
                                )}

                                {qty > 0 ? (
                                  <div className="flex items-center bg-white border border-slate-300 text-slate-900 rounded-lg shadow-2xs">
                                    <button
                                      type="button"
                                      onClick={() => onUpdateCartQuantity(service.id, -1)}
                                      className="px-2.5 py-1.5 hover:bg-slate-100 text-blue-600 font-bold"
                                      aria-label="Decrease quantity"
                                    >
                                      -
                                    </button>
                                    <span className="px-2 font-bold text-xs">{qty}</span>
                                    <button
                                      type="button"
                                      onClick={() => onUpdateCartQuantity(service.id, 1)}
                                      className="px-2.5 py-1.5 hover:bg-slate-100 text-blue-600 font-bold"
                                      aria-label="Increase quantity"
                                    >
                                      +
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => onAddToCart(service)}
                                    className="px-6 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-blue-600 hover:text-blue-700 font-bold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer"
                                  >
                                    Add
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      }

                      // =======================================================
                      // STANDARD SERVICE CARD TEMPLATE (Matching Video Layout)
                      // =======================================================
                      return (
                        <div
                          key={service.id}
                          id={`service-card-${service.id}`}
                          className="py-5 first:pt-0 last:pb-0"
                        >
                          <div className="flex items-start justify-between gap-4">
                            {/* Left Text Column */}
                            <div className="flex-1 min-w-0 pr-2">
                              {/* Bestseller Badge */}
                              {service.isBestseller && (
                                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded mb-1">
                                  BESTSELLER
                                </span>
                              )}

                              {/* Title */}
                              <h3
                                onClick={() => onSelectServiceDetail(service)}
                                className="text-base sm:text-lg font-bold text-slate-950 hover:text-blue-600 transition-colors cursor-pointer leading-snug"
                              >
                                {service.title}
                              </h3>

                              {/* Rating & Review count */}
                              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium my-1">
                                <span className="inline-flex items-center gap-0.5 font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                                  <Star className="w-3 h-3 fill-slate-900 text-slate-900" />
                                  {service.rating.toFixed(2)}
                                </span>
                                <span className="text-slate-400">
                                  ({service.reviewCount.toLocaleString('en-IN')} reviews)
                                </span>
                              </div>

                              {/* Price and Duration */}
                              <div className="flex items-baseline gap-2 text-sm font-semibold text-slate-900 my-1">
                                <span className="text-base font-bold text-slate-950">
                                  ₹{service.price.toLocaleString('en-IN')}
                                </span>
                                {service.originalPrice && service.originalPrice > service.price && (
                                  <span className="text-xs text-slate-400 line-through font-normal">
                                    ₹{service.originalPrice.toLocaleString('en-IN')}
                                  </span>
                                )}
                                <span className="text-slate-300">•</span>
                                <span className="text-xs text-slate-600 font-normal">
                                  {service.durationMinutes} mins
                                </span>
                              </div>

                              {/* Description Text */}
                              <p className="text-xs sm:text-[13px] text-slate-600 font-normal leading-relaxed mt-1 line-clamp-2">
                                {service.description}
                              </p>

                              {/* "View details" link */}
                              <button
                                type="button"
                                onClick={() => onSelectServiceDetail(service)}
                                className="mt-2 text-xs font-semibold text-slate-700 hover:text-slate-950 underline decoration-slate-300 underline-offset-4 cursor-pointer block"
                              >
                                View details
                              </button>
                            </div>

                            {/* Right Image Column with Add Button */}
                            <div className="flex flex-col items-center shrink-0 w-24 sm:w-28">
                              <div
                                onClick={() => onSelectServiceDetail(service)}
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 cursor-pointer shadow-2xs group"
                              >
                                <img
                                  src={service.image}
                                  alt={service.title}
                                  referrerPolicy="no-referrer"
                                  onError={(e) => handleImageError(e, 'men')}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>

                              {/* Add Button underneath or overlaid */}
                              <div className="-mt-3.5 z-10">
                                {qty > 0 ? (
                                  <div className="flex items-center bg-white border border-slate-300 text-slate-900 rounded-lg shadow-md">
                                    <button
                                      type="button"
                                      onClick={() => onUpdateCartQuantity(service.id, -1)}
                                      className="px-2.5 py-1 text-blue-600 font-bold hover:bg-slate-100"
                                      aria-label="Decrease quantity"
                                    >
                                      -
                                    </button>
                                    <span className="px-2 font-bold text-xs">{qty}</span>
                                    <button
                                      type="button"
                                      onClick={() => onUpdateCartQuantity(service.id, 1)}
                                      className="px-2.5 py-1 text-blue-600 font-bold hover:bg-slate-100"
                                      aria-label="Increase quantity"
                                    >
                                      +
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => onAddToCart(service)}
                                    className="px-5 py-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-blue-600 hover:text-blue-700 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                                  >
                                    Add
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>

          {/* ------------------------------------------------------------------- */}
          {/* COLUMN 3: Right Sidebar (UrgentLyfe Promise & Live Cart Widget)     */}
          {/* ------------------------------------------------------------------- */}
          <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-20">
            {/* UrgentLyfe Promise Box (Exact layout from video 00:15 / 00:40) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <span className="bg-slate-900 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                  UL
                </span>
                <span>UrgentLyfe Promise</span>
              </h3>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] shrink-0" />
                  <span className="font-semibold">Verified Professionals</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] shrink-0" />
                  <span className="font-semibold">Hassle Free Booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] shrink-0" />
                  <span className="font-semibold">Transparent Pricing</span>
                </div>
              </div>
            </div>

            {/* Cart Box (Exact layout from video: "No items in your cart") */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
              {cartItems.length === 0 ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 mx-auto mb-2 text-slate-300 flex items-center justify-center">
                    <Package className="w-10 h-10 stroke-[1.2]" />
                  </div>
                  <p className="text-xs font-semibold text-slate-500">No items in your cart</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <span className="text-xs font-bold text-slate-900">
                      Cart ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'})
                    </span>
                    <span className="text-sm font-bold text-slate-950">
                      ₹{cartTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div key={item.service.id} className="flex items-center justify-between text-xs gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-slate-900 truncate">{item.service.title}</p>
                          <p className="text-slate-500 text-[11px]">
                            ₹{item.service.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center bg-slate-50 border border-slate-200 rounded shrink-0">
                          <button
                            type="button"
                            onClick={() => onUpdateCartQuantity(item.service.id, -1)}
                            className="px-1.5 py-0.5 text-slate-600 hover:text-slate-900 font-bold"
                          >
                            -
                          </button>
                          <span className="px-1.5 text-xs font-bold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateCartQuantity(item.service.id, 1)}
                            className="px-1.5 py-0.5 text-slate-600 hover:text-slate-900 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (cartItems.length > 0) {
                        onBookNow(cartItems[0].service);
                      }
                    }}
                    className="w-full mt-4 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    View Cart • ₹{cartTotal.toLocaleString('en-IN')}
                  </button>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>

      {/* ===================================================================== */}
      {/* "EDIT YOUR PACKAGE" MODAL                                             */}
      {/* ===================================================================== */}
      {packageModalService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setPackageModalService(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
                  Customize Package
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {packageModalService.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPackageModalService(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <p className="text-xs text-slate-600 font-medium">Included in this bundle:</p>
              <div className="space-y-2">
                {packageModalService.packageDetails?.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/70"
                  >
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{d.label}</span>
                      <span className="text-xs text-slate-600">{d.text}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Duration: {packageModalService.durationMinutes} mins</span>
                <span className="text-base font-bold text-slate-900">
                  ₹{packageModalService.price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="pt-3 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  onAddToCart(packageModalService);
                  setPackageModalService(null);
                }}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Add Package to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
