import React, { useState } from 'react';
import {
  X,
  Check,
  Star,
  ShieldCheck,
  Clock,
  Plus,
  Minus,
  Sparkles,
  Award,
  Crown,
  HeartHandshake,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Flame,
  Droplets,
  Wind,
  Flower2,
  Scissors,
  CheckCheck,
} from 'lucide-react';
import { ServiceItem, CartItem } from '../../types';
import { handleImageError } from '../../utils/imageFallback';

export interface OptionVariant {
  id: string;
  name: string;
  brand?: string;
  rating?: number;
  reviews?: string;
  description: string;
  price: number;
  originalPrice?: number;
  durationMinutes: number;
  tag?: string;
  theme?: 'green' | 'gold' | 'mint' | 'blue' | 'rose' | 'purple' | 'amber' | 'default';
  keyIngredients?: string;
  keyBenefit?: string;
}

interface SalonServiceOptionsModalProps {
  service: ServiceItem;
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (customizedService: ServiceItem) => void;
  cartItems?: CartItem[];
  onUpdateCartQuantity?: (serviceId: string, delta: number) => void;
}

interface ReviewItem {
  id: string;
  author: string;
  date: string;
  serviceTag: string;
  rating: number;
  text: string;
  category: 'detailed' | 'area' | 'frequent';
}

const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Radhika Shanker',
    date: 'Sep 8, 2025',
    serviceTag: 'For: Full arms, full legs • Cirépil mojito roll-on',
    rating: 5,
    text: 'Fantastic experience! Geetika was amazing. She maintained pristine hygiene with disposable sheets and sealed cartridges. I will definitely book her again 🥰',
    category: 'detailed',
  },
  {
    id: 'rev-2',
    author: 'Ankur Gupta',
    date: 'Sep 9, 2025',
    serviceTag: 'For: Full arms, full legs • RICA gold roll-on • Threading: Eyebrows',
    rating: 5,
    text: 'Excellent service and a great overall experience! Very gentle technique, no redness or burning.',
    category: 'area',
  },
  {
    id: 'rev-3',
    author: 'Deepika',
    date: 'Sep 9, 2025',
    serviceTag: 'For: Waxing & Cleanup',
    rating: 4,
    text: 'Prompt arrival and very clean work. Appreciated the soothing after-wax pressing massage.',
    category: 'detailed',
  },
  {
    id: 'rev-4',
    author: 'Roma',
    date: 'Sep 20, 2025',
    serviceTag: 'For: Full arms, full legs • Cirépil mojito roll-on • Pedicure',
    rating: 5,
    text: 'I had a wonderful experience with Kirti today! She arrived on time, was extremely professional and maintained excellent hygiene throughout the session. Her waxing technique was smooth and painless, and the pedicure was relaxing and thorough, my feet feel so soft and refreshed. Kirti made sure I was comfortable the entire time and paid attention to every little detail. Highly recommend her for anyone looking for a calm, efficient, and top-quality beauty service at home.',
    category: 'detailed',
  },
  {
    id: 'rev-5',
    author: 'Suman Mishra',
    date: 'Sep 20, 2025',
    serviceTag: 'For: Full arms, full legs • RICA gold roll-on • Threading: Eyebrows',
    rating: 5,
    text: 'She is the best! Very quick, clean, and polite.',
    category: 'frequent',
  },
  {
    id: 'rev-6',
    author: 'Shubhra Singh',
    date: 'Sep 20, 2025',
    serviceTag: 'For: Full arms, full legs • RICA gold roll-on',
    rating: 5,
    text: 'Anita was very polite and professional, she was very patient during my wax and helped me relax. She is very well trained and did a clean waxing without missed patches.',
    category: 'detailed',
  },
  {
    id: 'rev-7',
    author: 'Sweta Kumari',
    date: 'Sep 20, 2025',
    serviceTag: 'For: Derma Facial & Detan pack',
    rating: 5,
    text: 'The cryofacial cold therapy was heavenly! My pores shrunk visibly and the instant glow stayed for over 2 weeks.',
    category: 'area',
  },
  {
    id: 'rev-8',
    author: 'Anita Tripathy',
    date: 'Sep 20, 2025',
    serviceTag: 'For: Full arms, full legs • RICA gold roll-on • Relaxing crystals spa pedicure with heel peel',
    rating: 5,
    text: 'Outstanding service and excellent attitude. The warm candle wax on feet removed all rough calluses effortlessly.',
    category: 'frequent',
  },
  {
    id: 'rev-9',
    author: 'Ritu Khirani',
    date: 'Sep 20, 2025',
    serviceTag: 'For: Full arms, full legs • Cirépil intimate peel-off',
    rating: 5,
    text: 'Wonderful service. Much better than going to an offline salon in traffic.',
    category: 'area',
  },
  {
    id: 'rev-10',
    author: 'Jhuma Mukherjee',
    date: 'Sep 20, 2025',
    serviceTag: 'For: Full arms, full legs • Cirépil mojito roll-on, Threading: Upper lip, Eyebrows',
    rating: 5,
    text: 'Very satisfied with the cleanliness and service quality.',
    category: 'frequent',
  },
  {
    id: 'rev-11',
    author: 'Sneha Gadagoni',
    date: 'Sep 20, 2025',
    serviceTag: 'For: Threading & De-tan pack',
    rating: 5,
    text: 'Very neat brow shaping! No thread cuts and the cooling aloe vera gel was so soothing.',
    category: 'area',
  },
  {
    id: 'rev-12',
    author: 'Nikita',
    date: 'Sep 20, 2025',
    serviceTag: 'For: Full arms, full legs • Cirépil mojito roll-on, Detan: Full face',
    rating: 5,
    text: 'Bharati is always on time and always does a great job.',
    category: 'detailed',
  },
];

export const SalonServiceOptionsModal: React.FC<SalonServiceOptionsModalProps> = ({
  service,
  isOpen,
  onClose,
  onSelectOption,
  cartItems = [],
  onUpdateCartQuantity,
}) => {
  if (!isOpen) return null;

  // Active reviews filter tab
  const [activeReviewTab, setActiveReviewTab] = useState<'detailed' | 'area' | 'frequent'>('detailed');
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Categorization flags
  const isRollOn =
    service.id.includes('roll-on') ||
    service.id.includes('rollon') ||
    service.title.toLowerCase().includes('roll-on');

  const isSpatula =
    service.id.includes('spatula') ||
    service.title.toLowerCase().includes('spatula') ||
    service.id === 'prime-full-arms-underarms-waxing' ||
    service.id === 'prime-full-legs-waxing' ||
    service.id === 'prime-half-legs-waxing' ||
    service.id === 'prime-back-waxing' ||
    service.id === 'prime-stomach-waxing' ||
    service.id === 'prime-butt-waxing' ||
    service.id === 'prime-bikini-line-waxing' ||
    service.id === 'prime-underarms-waxing' ||
    service.id === 'prime-full-body-waxing';

  const isThreading =
    service.id.includes('threading') ||
    service.title.toLowerCase().includes('threading');

  const isPeelOffFaceWax =
    service.id.includes('peel-off-face') ||
    service.title.toLowerCase().includes('peel-off face');

  const isDermaFacial =
    service.id.includes('derma') ||
    service.title.toLowerCase().includes('derma');

  const isJapanese =
    service.id.includes('japanese') ||
    service.title.toLowerCase().includes('japanese') ||
    service.id.includes('matcha') ||
    service.id.includes('cherry-blossom');

  const isPedicure =
    service.id.includes('pedicure') ||
    service.id.includes('manicure') ||
    service.title.toLowerCase().includes('pedicure');

  const isDetan =
    service.id === 'prime-detan' ||
    service.title.toLowerCase().startsWith('detan');

  const isBleach =
    service.id === 'prime-bleach' ||
    service.title.toLowerCase().startsWith('bleach');

  const isHeadMassage =
    service.id.includes('head-massage') ||
    service.title.toLowerCase().includes('head massage');

  // Generate contextual variants tailored to specific service
  const getVariants = (): OptionVariant[] => {
    // 1. PRIME: Roll-on waxing
    if (service.id === 'prime-roll-on-waxing') {
      return [
        {
          id: 'prime-rollon-honey',
          name: 'Regular Honey Roll-on',
          brand: 'Salon Prime',
          rating: 4.88,
          reviews: '48K reviews',
          description: 'Single-use cartridge with gentle warm honey formula for rapid, mess-free hair removal.',
          price: 899,
          originalPrice: 1149,
          durationMinutes: 45,
          theme: 'gold',
          tag: 'Starts at ₹899',
          keyIngredients: 'Warm Honey & Lemon Extract',
          keyBenefit: 'Mess-free, fast & even hair removal',
        },
        {
          id: 'prime-rollon-rica-gold',
          name: 'RICA Gold Roll-on',
          brand: 'RICA Italy',
          rating: 4.93,
          reviews: '85K reviews',
          description: 'Italian colophony-free roll-on with gold mica. Painless glide and radiant smooth skin.',
          price: 1099,
          originalPrice: 1399,
          durationMinutes: 50,
          theme: 'gold',
          tag: 'Most Popular',
          keyIngredients: 'Italian Gold Dust & Mica',
          keyBenefit: 'Luminous glow & sensitive skin comfort',
        },
      ];
    }

    // 2. LUXE: Roll-on waxing
    if (service.id === 'luxe-roll-on-waxing-arms-legs') {
      return [
        {
          id: 'luxe-rollon-cirepil-mojito',
          name: 'Cirépil mojito roll-on',
          brand: 'Cirépil Paris',
          rating: 4.91,
          reviews: '12K reviews',
          description: 'Gel-based wax from France. Infused with mint essential oil to soothe & calm skin.',
          price: 1949,
          originalPrice: 2499,
          durationMinutes: 50,
          theme: 'green',
          keyIngredients: 'Mint Essential Oil',
          keyBenefit: 'Soothes skin & reduces discomfort',
          tag: 'French Gel Wax',
        },
        {
          id: 'luxe-rollon-rica-gold',
          name: 'RICA gold roll-on',
          brand: 'RICA Italy',
          rating: 4.9,
          reviews: '25K reviews',
          description: 'Italian colophony-free wax with fine gold dust & mica for luminous, long-lasting hair-free skin.',
          price: 1699,
          originalPrice: 2199,
          durationMinutes: 50,
          theme: 'gold',
          keyIngredients: 'Gold Dust / Mica',
          keyBenefit: 'Adds a luminous glow to the skin',
          tag: 'Most Popular',
        },
        {
          id: 'luxe-rollon-jasmine',
          name: 'Jasmine roll-on',
          brand: 'Cirépil Paris',
          rating: 4.91,
          reviews: '9K reviews',
          description: 'Natural soothing jasmine extracts. Smooth and painless glide ideal for delicate skin.',
          price: 1399,
          originalPrice: 1799,
          durationMinutes: 45,
          theme: 'mint',
          keyIngredients: 'Pure Jasmine Extract',
          keyBenefit: 'Floral relaxation & deep softening',
          tag: 'Starts at ₹1,399',
        },
      ];
    }

    // 3. PRIME: Spatula waxing
    if (service.id === 'prime-spatula-waxing') {
      return [
        {
          id: 'prime-spatula-honey',
          name: 'Honey Classic Spatula Wax',
          brand: 'Organic Blend',
          rating: 4.88,
          reviews: '34K reviews',
          description: 'Gentle sugar & lemon base with single-use wooden spatulas. Ideal for normal skin.',
          price: 699,
          originalPrice: 999,
          durationMinutes: 45,
          theme: 'gold',
          tag: 'Budget Friendly',
          keyIngredients: 'Pure Sugar & Honey',
          keyBenefit: 'Economical, clean hair removal',
        },
        {
          id: 'prime-spatula-rica-gold',
          name: 'RICA Gold Liposoluble Spatula Wax',
          brand: 'RICA Italy',
          rating: 4.92,
          reviews: '56K reviews',
          description: 'Premium Italian wax with titanium dioxide. Painless removal and silky finish for sensitive skin.',
          price: 899,
          originalPrice: 1199,
          durationMinutes: 50,
          theme: 'gold',
          tag: 'Most Popular',
          keyIngredients: 'Liposoluble Minerals & Mica',
          keyBenefit: 'Gentle on skin, zero redness',
        },
        {
          id: 'prime-spatula-chocolate',
          name: 'Dark Chocolate Nourishing Spatula Wax',
          brand: 'RICA Italy',
          rating: 4.9,
          reviews: '22K reviews',
          description: 'Rich cocoa butter extract that hydrates dry skin while thoroughly removing coarse hair.',
          price: 999,
          originalPrice: 1299,
          durationMinutes: 50,
          theme: 'amber',
          tag: 'Deep Hydration',
          keyIngredients: 'Organic Cocoa Butter',
          keyBenefit: 'Intense moisture & silkiness',
        },
      ];
    }

    // 4. PRIME: Full arms + underarms
    if (service.id === 'prime-full-arms-underarms-waxing') {
      return [
        {
          id: 'prime-fau-honey-spatula',
          name: 'Honey Spatula Wax',
          description: 'Classic warm honey formula applied with disposable wooden spatulas.',
          price: 349,
          originalPrice: 449,
          durationMinutes: 30,
          rating: 4.86,
          reviews: '41K reviews',
          theme: 'gold',
          tag: 'Starts at ₹349',
        },
        {
          id: 'prime-fau-rica-spatula',
          name: 'RICA Gold Spatula Wax',
          description: 'Colophony-free Italian liposoluble wax, reduces pain and avoids redness.',
          price: 449,
          originalPrice: 549,
          durationMinutes: 30,
          rating: 4.91,
          reviews: '62K reviews',
          theme: 'gold',
          tag: 'Sensitive Skin',
        },
        {
          id: 'prime-fau-honey-rollon',
          name: 'Honey Cartridge Roll-on',
          description: 'Single-use cartridge applicator for ultra-quick, mess-free coverage.',
          price: 499,
          originalPrice: 599,
          durationMinutes: 25,
          rating: 4.89,
          reviews: '28K reviews',
          theme: 'mint',
          tag: 'Mess Free',
        },
        {
          id: 'prime-fau-rica-rollon',
          name: 'RICA Gold Roll-on',
          description: 'Italian gold cartridge glide with soothing after-wax calming oil.',
          price: 599,
          originalPrice: 699,
          durationMinutes: 25,
          rating: 4.94,
          reviews: '71K reviews',
          theme: 'gold',
          tag: 'Top Rated',
        },
      ];
    }

    // 5. PRIME: Full legs waxing
    if (service.id === 'prime-full-legs-waxing') {
      return [
        {
          id: 'prime-fl-honey-spatula',
          name: 'Honey Spatula Wax',
          description: 'Classic warm honey wax for smooth legs from thighs to toes.',
          price: 399,
          originalPrice: 499,
          durationMinutes: 35,
          rating: 4.87,
          reviews: '39K reviews',
          theme: 'gold',
          tag: 'Value Pick',
        },
        {
          id: 'prime-fl-rica-spatula',
          name: 'RICA Gold Spatula Wax',
          description: 'Italian liposoluble wax, prevents ingrown hair and strawberry legs.',
          price: 549,
          originalPrice: 649,
          durationMinutes: 35,
          rating: 4.92,
          reviews: '55K reviews',
          theme: 'gold',
          tag: 'Sensitive Legs',
        },
        {
          id: 'prime-fl-honey-rollon',
          name: 'Honey Cartridge Roll-on',
          description: 'Even roll-on layer across legs for faster, uniform hair removal.',
          price: 599,
          originalPrice: 699,
          durationMinutes: 30,
          rating: 4.89,
          reviews: '25K reviews',
          theme: 'mint',
          tag: 'Faster Process',
        },
        {
          id: 'prime-fl-rica-rollon',
          name: 'RICA Gold Roll-on',
          description: 'Luxury Italian gold cartridge glide for radiant, silky legs.',
          price: 699,
          originalPrice: 799,
          durationMinutes: 30,
          rating: 4.94,
          reviews: '68K reviews',
          theme: 'gold',
          tag: 'Bestseller',
        },
      ];
    }

    // 6. PRIME: Half legs waxing
    if (service.id === 'prime-half-legs-waxing') {
      return [
        {
          id: 'prime-hl-honey',
          name: 'Honey Wax (Half Legs)',
          description: 'Gentle honey formula from knees to ankles.',
          price: 219,
          originalPrice: 299,
          durationMinutes: 20,
          rating: 4.86,
          reviews: '29K reviews',
          theme: 'gold',
          tag: 'Quick',
        },
        {
          id: 'prime-hl-rica',
          name: 'RICA Liposoluble Wax (Half Legs)',
          description: 'Italian colophony-free wax for sensitive calves.',
          price: 319,
          originalPrice: 399,
          durationMinutes: 20,
          rating: 4.91,
          reviews: '38K reviews',
          theme: 'gold',
          tag: 'No Redness',
        },
      ];
    }

    // 7. PRIME: Back waxing
    if (service.id === 'prime-back-waxing') {
      return [
        {
          id: 'prime-bw-honey-spatula',
          name: 'Honey Spatula Wax',
          description: 'Warm honey wax covering upper and lower back.',
          price: 409,
          originalPrice: 519,
          durationMinutes: 25,
          rating: 4.85,
          reviews: '19K reviews',
          theme: 'gold',
        },
        {
          id: 'prime-bw-rica-spatula',
          name: 'RICA Gold Spatula Wax',
          description: 'Gentle Italian liposoluble wax preventing back acne and bumpiness.',
          price: 549,
          originalPrice: 649,
          durationMinutes: 25,
          rating: 4.91,
          reviews: '31K reviews',
          theme: 'gold',
          tag: 'Acne Safe',
        },
        {
          id: 'prime-bw-honey-rollon',
          name: 'Honey Cartridge Roll-on',
          description: 'Quick roller glide for uniform back waxing with zero sticky residue.',
          price: 549,
          originalPrice: 649,
          durationMinutes: 20,
          rating: 4.88,
          reviews: '15K reviews',
          theme: 'mint',
        },
        {
          id: 'prime-bw-rica-rollon',
          name: 'RICA Gold Roll-on',
          description: 'Flawless Italian gold roll-on for glowing, clean back skin.',
          price: 649,
          originalPrice: 749,
          durationMinutes: 20,
          rating: 4.93,
          reviews: '42K reviews',
          theme: 'gold',
          tag: 'Most Popular',
        },
      ];
    }

    // 8. PRIME: Stomach waxing
    if (service.id === 'prime-stomach-waxing') {
      return [
        {
          id: 'prime-sw-honey-spatula',
          name: 'Honey Spatula Wax',
          description: 'Warm honey wax for midriff and stomach.',
          price: 319,
          originalPrice: 399,
          durationMinutes: 20,
          rating: 4.84,
          reviews: '12K reviews',
          theme: 'gold',
        },
        {
          id: 'prime-sw-rica-spatula',
          name: 'RICA Gold Spatula Wax',
          description: 'Soothing Italian wax for delicate abdominal skin.',
          price: 419,
          originalPrice: 499,
          durationMinutes: 20,
          rating: 4.9,
          reviews: '23K reviews',
          theme: 'gold',
          tag: 'Sensitive',
        },
        {
          id: 'prime-sw-rica-rollon',
          name: 'RICA Gold Roll-on',
          description: 'Fast roller cartridge glide with gold shimmer.',
          price: 499,
          originalPrice: 599,
          durationMinutes: 15,
          rating: 4.93,
          reviews: '27K reviews',
          theme: 'gold',
          tag: 'Express',
        },
      ];
    }

    // 9. PRIME: Butt waxing
    if (service.id === 'prime-butt-waxing') {
      return [
        {
          id: 'prime-btw-honey',
          name: 'Honey Wax',
          description: 'Gentle warm honey wax with disposable wooden spatulas.',
          price: 299,
          originalPrice: 399,
          durationMinutes: 20,
          rating: 4.85,
          reviews: '14K reviews',
          theme: 'gold',
        },
        {
          id: 'prime-btw-rica',
          name: 'RICA White Chocolate / Gold',
          description: 'Italian liposoluble wax with calming aloe vera.',
          price: 399,
          originalPrice: 499,
          durationMinutes: 20,
          rating: 4.91,
          reviews: '26K reviews',
          theme: 'gold',
          tag: 'Sensitive Zone',
        },
        {
          id: 'prime-btw-cirepil',
          name: 'Cirépil French Peel-off',
          description: 'French hot film stripless wax, shrink-wraps hair with zero skin pull.',
          price: 499,
          originalPrice: 599,
          durationMinutes: 25,
          rating: 4.95,
          reviews: '31K reviews',
          theme: 'green',
          tag: 'Painless',
        },
      ];
    }

    // 10. PRIME: Bikini line waxing
    if (service.id === 'prime-bikini-line-waxing') {
      return [
        {
          id: 'prime-bl-honey',
          name: 'Honey Wax (Bikini Line)',
          description: 'Warm honey wax along panty perimeter.',
          price: 249,
          originalPrice: 329,
          durationMinutes: 15,
          rating: 4.85,
          reviews: '21K reviews',
          theme: 'gold',
        },
        {
          id: 'prime-bl-rica',
          name: 'RICA Sensitive Wax (Bikini Line)',
          description: 'Formulated with titanium dioxide to calm delicate skin.',
          price: 349,
          originalPrice: 429,
          durationMinutes: 15,
          rating: 4.92,
          reviews: '34K reviews',
          theme: 'gold',
          tag: 'Gentle',
        },
      ];
    }

    // 11. PRIME: Underarms waxing
    if (service.id === 'prime-underarms-waxing') {
      return [
        {
          id: 'prime-uw-honey',
          name: 'Honey Wax',
          description: 'Traditional warm honey wax with disposable strips.',
          price: 69,
          originalPrice: 99,
          durationMinutes: 10,
          rating: 4.86,
          reviews: '85K reviews',
          theme: 'gold',
          tag: '₹69 only',
        },
        {
          id: 'prime-uw-rica',
          name: 'RICA Peel-off Wax',
          description: 'Italian stripless wax gentle on sensitive underarms.',
          price: 119,
          originalPrice: 149,
          durationMinutes: 10,
          rating: 4.92,
          reviews: '110K reviews',
          theme: 'gold',
          tag: 'Most Popular',
        },
        {
          id: 'prime-uw-cirepil',
          name: 'Cirépil Intimate Peel-off',
          description: 'Premium French stripless wax, shrink-wraps hair only.',
          price: 149,
          originalPrice: 199,
          durationMinutes: 10,
          rating: 4.95,
          reviews: '48K reviews',
          theme: 'green',
          tag: 'Painless',
        },
      ];
    }

    // 12. PRIME: Full body waxing
    if (service.id === 'prime-full-body-waxing') {
      return [
        {
          id: 'prime-fbw-honey',
          name: 'Honey Classic Spatula Wax',
          description: 'Full body coverage (arms, legs, back, stomach, underarms) with warm honey wax.',
          price: 1419,
          originalPrice: 1799,
          durationMinutes: 75,
          rating: 4.87,
          reviews: '22K reviews',
          theme: 'gold',
          tag: 'Best Value',
        },
        {
          id: 'prime-fbw-rica',
          name: 'RICA Liposoluble Spatula Wax',
          description: 'Italian gold formula across full body, preventing redness and bumps.',
          price: 1899,
          originalPrice: 2299,
          durationMinutes: 80,
          rating: 4.93,
          reviews: '49K reviews',
          theme: 'gold',
          tag: 'Most Booked',
        },
        {
          id: 'prime-fbw-rollon',
          name: 'Cartridge Roll-on Full Body',
          description: 'High-speed hygienic roller cartridges for maximum comfort and zero mess.',
          price: 1999,
          originalPrice: 2499,
          durationMinutes: 65,
          rating: 4.94,
          reviews: '38K reviews',
          theme: 'green',
          tag: 'Fast & Mess-Free',
        },
        {
          id: 'prime-fbw-chocolate',
          name: 'Chocolate Indulgence Body Wax',
          description: 'Cocoa butter enriched deep hydration for soft, glowing skin.',
          price: 2199,
          originalPrice: 2699,
          durationMinutes: 80,
          rating: 4.92,
          reviews: '17K reviews',
          theme: 'amber',
          tag: 'Luxury Glow',
        },
      ];
    }

    // 13. PRIME: Threading (8 options)
    if (service.id === 'prime-threading' || service.id === 'luxe-threading') {
      return [
        {
          id: 'prime-th-eyebrows',
          name: 'Eyebrow Shaping + Threading',
          description: 'Clean arch shaping with antibacterial organic thread.',
          price: 49,
          originalPrice: 69,
          durationMinutes: 10,
          rating: 4.91,
          reviews: '65K reviews',
          tag: 'Quick',
          theme: 'purple',
        },
        {
          id: 'prime-th-upperlip',
          name: 'Upper Lip Threading',
          description: 'Removes fine hair along upper lip and cupid\'s bow.',
          price: 39,
          originalPrice: 49,
          durationMinutes: 5,
          rating: 4.89,
          reviews: '48K reviews',
          theme: 'purple',
        },
        {
          id: 'prime-th-chin',
          name: 'Chin Threading',
          description: 'Removes coarse and fine hair on chin.',
          price: 39,
          originalPrice: 49,
          durationMinutes: 5,
          rating: 4.88,
          reviews: '23K reviews',
          theme: 'purple',
        },
        {
          id: 'prime-th-forehead',
          name: 'Forehead Threading',
          description: 'Hairline definition and smooth forehead.',
          price: 49,
          originalPrice: 69,
          durationMinutes: 5,
          rating: 4.89,
          reviews: '29K reviews',
          theme: 'purple',
        },
        {
          id: 'prime-th-sideburns',
          name: 'Sideburns / Sidelocks Threading',
          description: 'Neat cheek contouring along both sideburns.',
          price: 69,
          originalPrice: 89,
          durationMinutes: 10,
          rating: 4.9,
          reviews: '18K reviews',
          theme: 'purple',
        },
        {
          id: 'prime-th-eyebrows-upperlip',
          name: 'Eyebrows + Upper Lip Threading',
          description: 'Essential duo for a refreshed facial look.',
          price: 79,
          originalPrice: 109,
          durationMinutes: 15,
          rating: 4.93,
          reviews: '92K reviews',
          tag: 'Bestseller',
          theme: 'purple',
        },
        {
          id: 'prime-th-eyebrows-upperlip-chin',
          name: 'Eyebrows + Upper Lip + Chin',
          description: 'Complete lower face and brow grooming.',
          price: 109,
          originalPrice: 149,
          durationMinutes: 15,
          rating: 4.92,
          reviews: '34K reviews',
          tag: 'Popular Trio',
          theme: 'purple',
        },
        {
          id: 'prime-th-full-face',
          name: 'Full Face Threading',
          description: 'Complete peach fuzz removal across forehead, cheeks, chin & upper lip.',
          price: 199,
          originalPrice: 269,
          durationMinutes: 20,
          rating: 4.94,
          reviews: '51K reviews',
          tag: 'Complete Look',
          theme: 'purple',
        },
      ];
    }

    // 14. PRIME: Peel-off face waxing (7 options)
    if (service.id === 'prime-peel-off-face-waxing' || service.id === 'luxe-peel-off-face-wax') {
      return [
        {
          id: 'prime-pfw-upperlip',
          name: 'Upper Lip Peel-off Wax',
          description: 'Gentle stripless wax without thread friction.',
          price: 89,
          originalPrice: 129,
          durationMinutes: 10,
          rating: 4.88,
          reviews: '24K reviews',
          theme: 'rose',
        },
        {
          id: 'prime-pfw-chin',
          name: 'Chin Peel-off Wax',
          description: 'Stripless hot film wax targeting stubborn chin hair.',
          price: 89,
          originalPrice: 129,
          durationMinutes: 10,
          rating: 4.87,
          reviews: '16K reviews',
          theme: 'rose',
        },
        {
          id: 'prime-pfw-forehead',
          name: 'Forehead Peel-off Wax',
          description: 'Smooth hairline and clear forehead.',
          price: 99,
          originalPrice: 139,
          durationMinutes: 10,
          rating: 4.89,
          reviews: '14K reviews',
          theme: 'rose',
        },
        {
          id: 'prime-pfw-sideburns',
          name: 'Sideburns Peel-off Wax',
          description: 'Clean cheekline grooming with low heat film wax.',
          price: 119,
          originalPrice: 159,
          durationMinutes: 10,
          rating: 4.9,
          reviews: '12K reviews',
          theme: 'rose',
        },
        {
          id: 'prime-pfw-jawline',
          name: 'Jawline Peel-off Wax',
          description: 'Defines jaw contour and removes chin shadow.',
          price: 119,
          originalPrice: 159,
          durationMinutes: 10,
          rating: 4.89,
          reviews: '11K reviews',
          theme: 'rose',
        },
        {
          id: 'prime-pfw-trio',
          name: 'Upper Lip + Chin + Jawline Peel-off',
          description: 'Targeted lower face smoothing combo.',
          price: 249,
          originalPrice: 329,
          durationMinutes: 15,
          rating: 4.93,
          reviews: '29K reviews',
          tag: 'Save 24%',
          theme: 'rose',
        },
        {
          id: 'prime-pfw-fullface',
          name: 'Full Face Peel-off Wax',
          description: 'Complete peel-off facial hair removal for porcelain smooth skin.',
          price: 399,
          originalPrice: 499,
          durationMinutes: 20,
          rating: 4.95,
          reviews: '41K reviews',
          tag: 'Porcelain Glow',
          theme: 'rose',
        },
      ];
    }

    // 15. PRIME: Derma Niacinamide
    if (service.id === 'prime-derma-niacinamide') {
      return [
        {
          id: 'prime-dn-cryo',
          name: 'Niacinamide + Cryofacial Ice Therapy',
          description: '10% Niacinamide serum driven with -5°C cold probe for pore refinement and instant brightening.',
          price: 1599,
          originalPrice: 1999,
          durationMinutes: 85,
          rating: 4.89,
          reviews: '42K reviews',
          theme: 'blue',
          tag: 'Bestseller',
          keyIngredients: '10% Niacinamide & Zinc',
          keyBenefit: 'Fades spots & shrinks open pores',
        },
        {
          id: 'prime-dn-led',
          name: 'Niacinamide + Cryo + Amber LED Phototherapy',
          description: 'Adds medical-grade amber phototherapy to fade stubborn dark spots and stimulate cellular repair.',
          price: 1899,
          originalPrice: 2399,
          durationMinutes: 95,
          rating: 4.94,
          reviews: '28K reviews',
          theme: 'amber',
          tag: 'Intense Glow',
          keyIngredients: 'Amber LED & Alpha Arbutin',
          keyBenefit: 'Deep pigmentation correction',
        },
      ];
    }

    // 16. PRIME: Derma Salicylic
    if (service.id === 'prime-derma-salicylic') {
      return [
        {
          id: 'prime-ds-cryo',
          name: 'Salicylic Acid + Cryofacial Ice Therapy',
          description: '2% BHA salicylic complex with cold probe to clear deep blackheads & calm active breakouts.',
          price: 1799,
          originalPrice: 2199,
          durationMinutes: 85,
          rating: 4.88,
          reviews: '31K reviews',
          theme: 'blue',
          tag: 'Anti-Acne',
          keyIngredients: '2% Salicylic Acid & Zinc PCA',
          keyBenefit: 'Unclogs pores & controls oil',
        },
        {
          id: 'prime-ds-blue-led',
          name: 'Salicylic + Cryo + Blue LED Anti-Microbial',
          description: 'Blue LED wavelength sterilizes acne bacteria and prevents future breakouts.',
          price: 2099,
          originalPrice: 2599,
          durationMinutes: 95,
          rating: 4.93,
          reviews: '23K reviews',
          theme: 'blue',
          tag: 'Clinical Grade',
          keyIngredients: 'Blue LED 415nm Light',
          keyBenefit: 'Eliminates acne-causing bacteria',
        },
      ];
    }

    // 17. PRIME: Derma Retinol
    if (service.id === 'prime-derma-retinol') {
      return [
        {
          id: 'prime-dr-cryo',
          name: 'Retinol + Cryofacial Ice Therapy',
          description: 'Encapsulated Retinol with cold therapy for rapid cellular renewal with zero peeling.',
          price: 1899,
          originalPrice: 2299,
          durationMinutes: 85,
          rating: 4.9,
          reviews: '19K reviews',
          theme: 'purple',
          tag: 'Youth Boost',
          keyIngredients: 'Encapsulated Retinol & Peptides',
          keyBenefit: 'Smoothes fine lines & firms skin',
        },
        {
          id: 'prime-dr-red-led',
          name: 'Retinol + Cryo + Red LED Collagen Boost',
          description: 'Deep red 633nm photon therapy stimulates fibroblast collagen synthesis.',
          price: 2199,
          originalPrice: 2699,
          durationMinutes: 95,
          rating: 4.95,
          reviews: '24K reviews',
          theme: 'rose',
          tag: 'Firming Lift',
          keyIngredients: 'Red LED 633nm & Matrixyl',
          keyBenefit: 'Accelerates collagen production',
        },
      ];
    }

    // 18. PRIME: Derma Ceramides
    if (service.id === 'prime-derma-ceramides') {
      return [
        {
          id: 'prime-dc-cryo',
          name: 'Ceramide + Multimolecular HA Cryo Infusion',
          description: 'Repairs damaged skin barrier and locks 72-hr deep dermal hydration.',
          price: 1699,
          originalPrice: 2099,
          durationMinutes: 85,
          rating: 4.91,
          reviews: '27K reviews',
          theme: 'blue',
          tag: 'Barrier Repair',
          keyIngredients: 'Ceramide NP & 2% Hyaluronic Acid',
          keyBenefit: 'Soothes eczema & redness',
        },
        {
          id: 'prime-dc-hydrojelly',
          name: 'Ceramide + Cryo + Electrolyte Hydro-Jelly Mask',
          description: 'Cooling peel-off alginate mask seals botanical hydration into skin.',
          price: 1999,
          originalPrice: 2499,
          durationMinutes: 95,
          rating: 4.96,
          reviews: '33K reviews',
          theme: 'mint',
          tag: 'Glass Skin',
          keyIngredients: 'Spirulina & Marine Collagen',
          keyBenefit: 'Ultra-plump dewy glow',
        },
      ];
    }

    // 19. PRIME: Japanese Matcha Detox
    if (service.id === 'prime-japanese-matcha-detox') {
      return [
        {
          id: 'prime-jmd-matcha',
          name: 'Pure Uji Matcha Detox Facial',
          description: 'Ceremonial grade Kyoto matcha mask with antioxidant purifying ozone steam.',
          price: 1399,
          originalPrice: 1699,
          durationMinutes: 60,
          rating: 4.88,
          reviews: '16K reviews',
          theme: 'green',
          tag: 'Detox Glow',
          keyIngredients: 'Uji Matcha & Green Tea Polyphenols',
          keyBenefit: 'Clears pollution & dullness',
        },
        {
          id: 'prime-jmd-kansa',
          name: 'Matcha Detox + Bronze Kansa Wand Massage',
          description: 'Adds ancient bell-metal kansa acupressure drainage for a contoured jawline.',
          price: 1699,
          originalPrice: 2099,
          durationMinutes: 75,
          rating: 4.94,
          reviews: '28K reviews',
          theme: 'gold',
          tag: 'Complete Ritual',
          keyIngredients: 'Bronze Kansa Wand & Camellia Oil',
          keyBenefit: 'Lymphatic drainage & facial sculpting',
        },
      ];
    }

    // 20. PRIME: Japanese Cherry Blossom
    if (service.id === 'prime-japanese-cherry-blossom') {
      return [
        {
          id: 'prime-jcb-sakura',
          name: 'Sakura Cherry Blossom Petal Glow',
          description: 'Fermented Japanese sakura petal essence with fermented rice water mist.',
          price: 1499,
          originalPrice: 1799,
          durationMinutes: 60,
          rating: 4.89,
          reviews: '18K reviews',
          theme: 'rose',
          tag: 'Mochi Soft',
          keyIngredients: 'Sakura Petals & Fermented Rice',
          keyBenefit: 'Bouncy, translucent mochi skin',
        },
        {
          id: 'prime-jcb-rosequartz',
          name: 'Sakura Glow + Rose Quartz Cold Contouring',
          description: 'Chilled rose quartz crystal roller drainage for luminous depuffed skin.',
          price: 1799,
          originalPrice: 2199,
          durationMinutes: 75,
          rating: 4.95,
          reviews: '31K reviews',
          theme: 'rose',
          tag: 'Sculpt & Glow',
          keyIngredients: 'Chilled Rose Quartz & Peony Extract',
          keyBenefit: 'Depuffs face & enhances cheekbones',
        },
      ];
    }

    // 21. PRIME: Crystal Rose Pedicure
    if (service.id === 'prime-crystal-rose-pedicure') {
      return [
        {
          id: 'prime-crp-pedicure',
          name: 'Crystal Rose Spa Pedicure',
          description: 'Rose petal foot soak, sugar crystal exfoliation, cuticle care, and nail shaping.',
          price: 759,
          originalPrice: 899,
          durationMinutes: 55,
          rating: 4.89,
          reviews: '45K reviews',
          theme: 'rose',
          tag: 'Bestseller',
          keyIngredients: 'Rose Petals & Dead Sea Salt',
          keyBenefit: 'Softens skin & refreshes tired feet',
        },
        {
          id: 'prime-crp-heelpeel',
          name: 'Crystal Rose Pedicure with Deep Heel Peel',
          description: 'Adds medical-grade AHA heel softening pack and glass callus buffing for baby-soft heels.',
          price: 999,
          originalPrice: 1199,
          durationMinutes: 70,
          rating: 4.95,
          reviews: '62K reviews',
          theme: 'rose',
          tag: 'Cracked Heel Care',
          keyIngredients: 'Lactic Acid & Shea Butter Heel Balm',
          keyBenefit: 'Eliminates hard calluses & cracks',
        },
      ];
    }

    // 22. PRIME: Detan (8 options)
    if (service.id === 'prime-detan') {
      return [
        {
          id: 'prime-dt-face-neck',
          name: 'Face & Neck Detan',
          description: 'Raaga professional kojic & milk protein pack.',
          price: 349,
          originalPrice: 399,
          durationMinutes: 30,
          rating: 4.88,
          reviews: '65K reviews',
          theme: 'amber',
          tag: 'Starts at ₹349',
        },
        {
          id: 'prime-dt-arms',
          name: 'Full Arms Detan',
          description: 'Removes sun tanning across arms and elbows.',
          price: 399,
          originalPrice: 499,
          durationMinutes: 30,
          rating: 4.87,
          reviews: '43K reviews',
          theme: 'amber',
        },
        {
          id: 'prime-dt-legs',
          name: 'Full Legs Detan',
          description: 'Even skin tone and tan removal across thighs and calves.',
          price: 499,
          originalPrice: 599,
          durationMinutes: 35,
          rating: 4.86,
          reviews: '38K reviews',
          theme: 'amber',
        },
        {
          id: 'prime-dt-back',
          name: 'Full Back Detan',
          description: 'Restores natural complexion across full back.',
          price: 449,
          originalPrice: 549,
          durationMinutes: 30,
          rating: 4.89,
          reviews: '26K reviews',
          theme: 'amber',
        },
        {
          id: 'prime-dt-stomach',
          name: 'Stomach Detan',
          description: 'Gentle de-tanning pack for stomach area.',
          price: 399,
          originalPrice: 499,
          durationMinutes: 25,
          rating: 4.85,
          reviews: '17K reviews',
          theme: 'amber',
        },
        {
          id: 'prime-dt-underarms',
          name: 'Underarms Detan',
          description: 'Lightens dark pigmentation on underarms.',
          price: 149,
          originalPrice: 199,
          durationMinutes: 15,
          rating: 4.9,
          reviews: '55K reviews',
          theme: 'amber',
          tag: 'Express',
        },
        {
          id: 'prime-dt-feet-hands',
          name: 'Feet & Hands Detan',
          description: 'Removes slipper tan lines and hydrates cuticles.',
          price: 199,
          originalPrice: 249,
          durationMinutes: 20,
          rating: 4.88,
          reviews: '29K reviews',
          theme: 'amber',
        },
        {
          id: 'prime-dt-full-body',
          name: 'Full Body Detan',
          description: 'Comprehensive whole-body kojic de-tan application and sponge cleanse.',
          price: 1499,
          originalPrice: 1899,
          durationMinutes: 75,
          rating: 4.93,
          reviews: '36K reviews',
          theme: 'amber',
          tag: 'Whole Body Glow',
        },
      ];
    }

    // 23. PRIME: Bleach (6 options)
    if (service.id === 'prime-bleach') {
      return [
        {
          id: 'prime-bl-face-neck',
          name: 'Face & Neck Gold Oxy-Bleach',
          description: 'Blends facial hair with natural skin tone while enhancing fairness.',
          price: 399,
          originalPrice: 499,
          durationMinutes: 25,
          rating: 4.87,
          reviews: '48K reviews',
          theme: 'gold',
          tag: 'Instant Glow',
        },
        {
          id: 'prime-bl-arms',
          name: 'Full Arms Bleach',
          description: 'Gold oxy-bleach formulation for full arms.',
          price: 449,
          originalPrice: 549,
          durationMinutes: 30,
          rating: 4.86,
          reviews: '31K reviews',
          theme: 'gold',
        },
        {
          id: 'prime-bl-legs',
          name: 'Full Legs Bleach',
          description: 'Lightens leg hair and blends with skin tone.',
          price: 549,
          originalPrice: 649,
          durationMinutes: 35,
          rating: 4.85,
          reviews: '27K reviews',
          theme: 'gold',
        },
        {
          id: 'prime-bl-back',
          name: 'Full Back Bleach',
          description: 'Seamless blending for low-back outfits.',
          price: 499,
          originalPrice: 599,
          durationMinutes: 30,
          rating: 4.89,
          reviews: '22K reviews',
          theme: 'gold',
        },
        {
          id: 'prime-bl-stomach',
          name: 'Stomach Bleach',
          description: 'Gentle midriff bleaching with pre-bleach skin barrier.',
          price: 449,
          originalPrice: 549,
          durationMinutes: 25,
          rating: 4.84,
          reviews: '15K reviews',
          theme: 'gold',
        },
        {
          id: 'prime-bl-fullbody',
          name: 'Full Body Bleach',
          description: 'Complete body oxy-bleach session with soothing post-wash lotion.',
          price: 1599,
          originalPrice: 1999,
          durationMinutes: 75,
          rating: 4.92,
          reviews: '29K reviews',
          theme: 'gold',
          tag: 'Bridal Pick',
        },
      ];
    }

    // 24. PRIME: Head massage (2 options)
    if (service.id === 'prime-head-massage') {
      return [
        {
          id: 'prime-hm-almond-coconut',
          name: 'Warm Almond & Coconut Herbal Oil Massage',
          description: 'Deeply nourishing hair root massage with scalp acupressure.',
          price: 249,
          originalPrice: 299,
          durationMinutes: 20,
          rating: 4.89,
          reviews: '52K reviews',
          theme: 'amber',
          tag: 'Scalp Health',
          keyIngredients: 'Sweet Almond & Virgin Coconut Oil',
          keyBenefit: 'Deep nourishment & hair shine',
        },
        {
          id: 'prime-hm-brahmi',
          name: 'Ayurvedic Brahmi Anti-Stress Oil Massage',
          description: 'Warm medicinal Brahmi oil releasing headache, tension and neck fatigue.',
          price: 349,
          originalPrice: 429,
          durationMinutes: 30,
          rating: 4.95,
          reviews: '74K reviews',
          theme: 'green',
          tag: 'Deep Sleep & Stress Relief',
          keyIngredients: 'Brahmi, Bhringraj & Camphor',
          keyBenefit: 'Calms central nervous system & relieves stress',
        },
      ];
    }

    // Default 2-variant fallback if nothing above matched
    return [
      {
        id: `${service.id}-standard`,
        name: `Standard ${service.title}`,
        description: service.subtitle || service.description,
        price: service.price,
        originalPrice: service.originalPrice,
        durationMinutes: service.durationMinutes,
        rating: service.rating || 4.88,
        reviews: `${(service.reviewCount ? service.reviewCount / 1000 : 25).toFixed(0)}K reviews`,
        theme: 'gold',
        tag: 'Standard',
      },
      {
        id: `${service.id}-premium-upgrade`,
        name: `Premium Upgrade: ${service.title}`,
        description: 'Includes premium actives, extended soothing massage, and certified specialist pro.',
        price: Math.round(service.price * 1.25),
        originalPrice: Math.round((service.originalPrice || service.price) * 1.35),
        durationMinutes: service.durationMinutes + 10,
        rating: 4.94,
        reviews: '19K reviews',
        theme: 'purple',
        tag: 'Recommended',
      },
    ];
  };

  const variants = getVariants();

  // Helper to check item quantity in cart
  const getVariantQuantity = (variantId: string) => {
    const item = cartItems.find((ci) => ci.service.id === variantId);
    return item ? item.quantity : 0;
  };

  const handleAddVariant = (variant: OptionVariant) => {
    const customized: ServiceItem = {
      ...service,
      id: variant.id,
      title: `${service.title} (${variant.name})`,
      price: variant.price,
      originalPrice: variant.originalPrice,
      durationMinutes: variant.durationMinutes,
    };
    onSelectOption(customized);
  };

  const filteredReviews = REVIEWS_DATA.filter((rev) => {
    if (activeReviewTab === 'detailed') return rev.category === 'detailed' || rev.rating >= 4;
    if (activeReviewTab === 'area') return rev.category === 'area';
    if (activeReviewTab === 'frequent') return rev.category === 'frequent';
    return true;
  });

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, 5);

  // Dynamic banner data matching service category
  const getBannerDetails = () => {
    if (isRollOn) {
      return {
        tagline1: 'Even coverage.',
        tagline2: 'Mess-free.',
        tagline3: 'Hygienic.',
        bg: 'bg-[#f6f2ec] border-amber-100/80',
        textColor: 'text-slate-900',
        type: 'rollon',
      };
    }
    if (isSpatula) {
      return {
        tagline1: 'Gentle on skin.',
        tagline2: 'Temperature safe.',
        tagline3: '100% disposable.',
        bg: 'bg-[#faf6ee] border-amber-200/60',
        textColor: 'text-amber-950',
        type: 'spatula',
      };
    }
    if (isThreading || isPeelOffFaceWax) {
      return {
        tagline1: 'Precision shaping.',
        tagline2: 'Zero redness.',
        tagline3: 'Organic cotton.',
        bg: 'bg-[#f8f5fd] border-purple-100',
        textColor: 'text-purple-950',
        type: 'threading',
      };
    }
    if (isDermaFacial) {
      return {
        tagline1: 'Clinical actives.',
        tagline2: '-5°C Cryotherapy.',
        tagline3: 'Instant radiance.',
        bg: 'bg-[#f0f6fe] border-blue-100',
        textColor: 'text-blue-950',
        type: 'derma',
      };
    }
    if (isJapanese) {
      return {
        tagline1: 'Uji Matcha detox.',
        tagline2: 'Fermented rice.',
        tagline3: 'Mochi skin finish.',
        bg: 'bg-[#f4faf4] border-emerald-100',
        textColor: 'text-emerald-950',
        type: 'japanese',
      };
    }
    if (isPedicure) {
      return {
        tagline1: 'Warm candle wax.',
        tagline2: 'Cracked heel peel.',
        tagline3: 'Deep foot spa.',
        bg: 'bg-[#fdf5f5] border-rose-100',
        textColor: 'text-rose-950',
        type: 'pedicure',
      };
    }
    if (isDetan || isBleach) {
      return {
        tagline1: 'Milk protein active.',
        tagline2: 'Zero irritation.',
        tagline3: 'Sun tan removal.',
        bg: 'bg-[#fffaf0] border-amber-100',
        textColor: 'text-amber-950',
        type: 'detan',
      };
    }
    if (isHeadMassage) {
      return {
        tagline1: 'Warm herbal oils.',
        tagline2: 'Marma acupressure.',
        tagline3: 'Stress relief.',
        bg: 'bg-[#f5fbf7] border-emerald-100',
        textColor: 'text-emerald-950',
        type: 'massage',
      };
    }
    return {
      tagline1: 'Curated beauty.',
      tagline2: 'Certified experts.',
      tagline3: 'Salon at home.',
      bg: 'bg-slate-50 border-slate-200',
      textColor: 'text-slate-900',
      type: 'default',
    };
  };

  const banner = getBannerDetails();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col">
        {/* Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-white/95 hover:bg-white shadow-md border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-slate-950 transition-all cursor-pointer active:scale-95"
          aria-label="Close"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
          {/* ================================================================= */}
          {/* 1. TOP HEADER BANNER (Dynamic based on Category) */}
          {/* ================================================================= */}
          <div className={`relative overflow-hidden border-b ${banner.bg}`}>
            <div className="p-6 sm:p-8 flex items-center justify-between gap-4">
              <div className="space-y-1 z-10">
                <h2 className={`text-xl sm:text-2xl font-black tracking-tight leading-snug ${banner.textColor}`}>
                  {banner.tagline1}
                  <br />
                  {banner.tagline2}
                  <br />
                  {banner.tagline3}
                </h2>
              </div>

              {/* Dynamic Header Illustration */}
              {banner.type === 'rollon' && (
                <div className="relative w-44 sm:w-56 h-28 sm:h-32 shrink-0 flex items-center justify-end">
                  <div className="absolute right-0 bottom-6 w-36 h-7 bg-gradient-to-r from-transparent via-amber-200/70 to-amber-300/80 rounded-l-md flex items-center px-2">
                    <div className="text-[9px] font-bold text-amber-900/80 flex items-center gap-1">
                      <span>Clean glide</span>
                      <span className="text-amber-700">→</span>
                    </div>
                  </div>
                  <div className="relative z-10 flex flex-col items-center drop-shadow-md">
                    <div className="w-14 h-16 bg-gradient-to-b from-slate-100 to-white rounded-t-xl border border-slate-300 flex items-center justify-center shadow-inner">
                      <span className="text-[8px] font-black tracking-widest text-slate-400 uppercase">
                        Cartridge
                      </span>
                    </div>
                    <div className="w-16 h-6 bg-white border-2 border-slate-300 rounded-b-md shadow-xs flex items-center justify-center -mt-1">
                      <div className="w-12 h-3 bg-amber-400/90 rounded-sm" />
                    </div>
                  </div>
                </div>
              )}

              {banner.type === 'spatula' && (
                <div className="relative w-36 sm:w-44 h-24 sm:h-28 shrink-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-amber-100 border border-amber-300 shadow-inner flex flex-col items-center justify-center relative">
                    <div className="w-14 h-8 bg-amber-400/80 rounded-t-md shadow-xs" />
                    <span className="text-[8px] font-black uppercase text-amber-900 mt-1">Warm Wax</span>
                    <div className="absolute -top-3 -right-2 w-8 h-16 bg-amber-800/80 rounded-sm rotate-45 shadow-sm border border-amber-900" />
                  </div>
                </div>
              )}

              {banner.type === 'threading' && (
                <div className="relative w-36 sm:w-44 h-24 sm:h-28 shrink-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-purple-100 border border-purple-300 shadow-inner flex flex-col items-center justify-center relative">
                    <Scissors className="w-8 h-8 text-purple-700" />
                    <span className="text-[8px] font-black uppercase text-purple-900 mt-1">Precise Arch</span>
                  </div>
                </div>
              )}

              {banner.type === 'derma' && (
                <div className="relative w-36 sm:w-44 h-24 sm:h-28 shrink-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-blue-100 border border-blue-300 shadow-inner flex flex-col items-center justify-center relative">
                    <Droplets className="w-8 h-8 text-blue-600" />
                    <span className="text-[8px] font-black uppercase text-blue-900 mt-1">-5°C Cryo</span>
                  </div>
                </div>
              )}

              {banner.type === 'japanese' && (
                <div className="relative w-36 sm:w-44 h-24 sm:h-28 shrink-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-emerald-100 border border-emerald-300 shadow-inner flex flex-col items-center justify-center relative">
                    <Flower2 className="w-8 h-8 text-emerald-700" />
                    <span className="text-[8px] font-black uppercase text-emerald-900 mt-1">Uji Matcha</span>
                  </div>
                </div>
              )}

              {banner.type === 'pedicure' && (
                <div className="relative w-36 sm:w-44 h-24 sm:h-28 shrink-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-rose-100 border border-rose-300 shadow-inner flex flex-col items-center justify-center relative">
                    <Flame className="w-8 h-8 text-rose-600" />
                    <span className="text-[8px] font-black uppercase text-rose-900 mt-1">Candle Spa</span>
                  </div>
                </div>
              )}

              {(banner.type === 'detan' || banner.type === 'massage' || banner.type === 'default') && (
                <div className="relative w-36 sm:w-44 h-24 sm:h-28 shrink-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-amber-100 border border-amber-300 shadow-inner flex flex-col items-center justify-center relative">
                    <Sparkles className="w-8 h-8 text-amber-700" />
                    <span className="text-[8px] font-black uppercase text-amber-900 mt-1">Salon Pro</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ================================================================= */}
          {/* 2. TITLE & RATING */}
          {/* ================================================================= */}
          <div className="p-5 sm:p-6 bg-white">
            <h1 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
              {service.title}
            </h1>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-600">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span className="font-bold text-slate-900">{service.rating || 4.91}</span>
              <span className="text-slate-500">
                ({service.reviewCount ? (service.reviewCount / 1000).toFixed(0) : '46'}K reviews)
              </span>
            </div>

            {/* =============================================================== */}
            {/* 3. OPTION CARDS GRID (Responsive layout) */}
            {/* =============================================================== */}
            <div className={`mt-5 grid gap-3 ${variants.length > 2 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
              {variants.map((v) => {
                const qty = getVariantQuantity(v.id);

                return (
                  <div
                    key={v.id}
                    className={`rounded-2xl border transition-all p-3.5 flex flex-col justify-between bg-white relative overflow-hidden ${
                      qty > 0
                        ? 'border-purple-600 ring-2 ring-purple-600/20 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs'
                    }`}
                  >
                    {/* Visual representation banner / badge */}
                    <div className="h-24 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center relative overflow-hidden mb-3">
                      {isRollOn ? (
                        v.theme === 'green' ? (
                          <div className="w-14 h-18 rounded-lg bg-gradient-to-b from-emerald-600 to-emerald-700 text-white shadow-md flex flex-col items-center justify-between p-1 border border-emerald-500">
                            <span className="text-[6px] font-black uppercase text-emerald-100">CIRÉPIL</span>
                            <div className="w-full h-6 bg-emerald-800/40 rounded flex items-center justify-center text-[7px] font-bold text-emerald-200">
                              Mojito
                            </div>
                            <div className="w-8 h-1.5 bg-emerald-400/80 rounded-full" />
                          </div>
                        ) : v.theme === 'mint' ? (
                          <div className="w-14 h-18 rounded-lg bg-gradient-to-b from-teal-500 to-teal-700 text-white shadow-md flex flex-col items-center justify-between p-1 border border-teal-400">
                            <span className="text-[6px] font-black uppercase text-teal-100">CIRÉPIL</span>
                            <div className="w-full h-6 bg-teal-800/40 rounded flex items-center justify-center text-[7px] font-bold text-teal-100">
                              Jasmine
                            </div>
                            <div className="w-8 h-1.5 bg-teal-300 rounded-full" />
                          </div>
                        ) : (
                          <div className="w-14 h-18 rounded-lg bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 text-amber-950 shadow-md flex flex-col items-center justify-between p-1 border border-amber-300">
                            <span className="text-[6px] font-black uppercase text-amber-900">RICA</span>
                            <div className="w-full h-6 bg-amber-600/30 rounded flex items-center justify-center text-[7px] font-black text-amber-950">
                              GOLD
                            </div>
                            <div className="w-8 h-1.5 bg-amber-200 rounded-full" />
                          </div>
                        )
                      ) : isSpatula ? (
                        <div className="flex flex-col items-center gap-1">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-xs border ${
                            v.theme === 'amber'
                              ? 'bg-amber-900 text-amber-100 border-amber-800'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}>
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <span className="text-[8px] font-black uppercase tracking-wider text-slate-500">
                            {v.durationMinutes} mins
                          </span>
                        </div>
                      ) : isThreading || isPeelOffFaceWax ? (
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 border border-purple-200 flex items-center justify-center shadow-xs">
                            <Scissors className="w-5 h-5" />
                          </div>
                          <span className="text-[8px] font-black uppercase tracking-wider text-purple-700">
                            Precision
                          </span>
                        </div>
                      ) : isDermaFacial ? (
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center shadow-xs">
                            <Droplets className="w-5 h-5" />
                          </div>
                          <span className="text-[8px] font-black uppercase tracking-wider text-blue-700">
                            Clinical Active
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center shadow-xs">
                            <Award className="w-5 h-5 text-purple-700" />
                          </div>
                          <span className="text-[8px] font-black uppercase tracking-wider text-slate-600">
                            {v.durationMinutes} mins
                          </span>
                        </div>
                      )}

                      {/* Tag pill if available */}
                      {v.tag && (
                        <div className="absolute top-1.5 right-1.5">
                          <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-white/95 text-slate-800 shadow-2xs border border-slate-200">
                            {v.tag}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Variant Info */}
                    <div className="space-y-1 mb-3">
                      <h4 className="font-bold text-xs text-slate-900 leading-tight">
                        {v.name}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-slate-600">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500 shrink-0" />
                        <span className="font-bold text-slate-900">{v.rating || 4.9}</span>
                        <span className="text-slate-400">({v.reviews || '10K reviews'})</span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {v.description}
                      </p>
                    </div>

                    {/* Price & Add Button */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-sm font-black text-slate-900">₹{v.price}</div>
                        {v.originalPrice && (
                          <div className="text-[10px] text-slate-400 line-through">
                            ₹{v.originalPrice}
                          </div>
                        )}
                      </div>

                      {/* Action Button: Add or - Qty + */}
                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => handleAddVariant(v)}
                          className="bg-white hover:bg-purple-50 text-purple-700 border-2 border-purple-600 px-3 py-1 rounded-xl font-black text-xs shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      ) : (
                        <div className="bg-purple-900 text-white rounded-xl flex items-center shadow-xs border border-purple-800">
                          <button
                            type="button"
                            onClick={() => onUpdateCartQuantity?.(v.id, -1)}
                            className="p-1 hover:bg-white/20 transition-colors rounded-l-xl cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-black">{qty}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateCartQuantity?.(v.id, 1)}
                            className="p-1 hover:bg-white/20 transition-colors rounded-r-xl cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================================================================= */}
          {/* 4. DECIDE THE RIGHT OPTION FOR YOU (Contextual Comparison) */}
          {/* ================================================================= */}
          <div className="p-5 sm:p-6 bg-slate-50/50 space-y-4">
            <h3 className="text-base font-black text-slate-900">
              {isRollOn || isSpatula
                ? 'Decide the right wax for you'
                : isThreading || isPeelOffFaceWax
                ? 'Decide the right facial grooming for you'
                : isDermaFacial
                ? 'Why Clinical Cryotherapy Facials?'
                : isJapanese
                ? 'The Japanese Glow Philosophy'
                : isPedicure
                ? 'Why Spa Pedicure Care?'
                : isDetan || isBleach
                ? 'Safe Brightening Promise'
                : 'Why Choose Our Salon Service?'}
            </h3>

            {isRollOn ? (
              <div className="space-y-3">
                {/* Cirépil Mojito Card */}
                <div className="rounded-2xl border border-emerald-200/80 bg-[#f4f9f5] p-5 relative overflow-hidden shadow-2xs">
                  <div className="absolute top-4 right-4 w-14 h-14 rounded-full border-2 border-emerald-600/40 flex flex-col items-center justify-center text-center p-1 bg-white/80 shadow-2xs rotate-6">
                    <span className="text-[6px] font-black uppercase text-emerald-700 tracking-tighter">
                      MADE IN PARIS
                    </span>
                    <span className="text-[8px] font-black text-emerald-900 leading-none">SINCE</span>
                    <span className="text-[7px] font-black text-emerald-800">1936</span>
                  </div>

                  <div className="space-y-1 max-w-[70%]">
                    <h4 className="text-base font-black text-slate-900">Cirépil Mojito Roll-on</h4>
                    <p className="text-xs text-emerald-800 font-medium">Gel-based wax from France</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-emerald-200/60 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-black text-slate-900">Mint Essential Oil</div>
                      <div className="text-xs text-slate-600 font-medium">
                        Soothes skin & reduces discomfort
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white border border-emerald-200 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=200&q=80"
                        alt="Mint essential oil"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, 'salon')}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-px bg-slate-200 flex-1" />
                  <span className="text-[11px] font-black text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                    OR
                  </span>
                  <div className="h-px bg-slate-200 flex-1" />
                </div>

                {/* Rica Gold Card */}
                <div className="rounded-2xl border border-amber-200/80 bg-[#fbf7ee] p-5 relative overflow-hidden shadow-2xs">
                  <div className="space-y-1 max-w-[70%]">
                    <h4 className="text-base font-black text-slate-900">Rica Gold Roll-on</h4>
                    <p className="text-xs text-amber-800 font-medium">Long lasting hair-free skin</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-black text-slate-900">Gold Dust / Mica</div>
                      <div className="text-xs text-slate-600 font-medium">
                        Adds a luminous glow to the skin
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white border border-amber-200 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=200&q=80"
                        alt="Gold Dust Mica"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, 'salon')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : isSpatula ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <h4 className="text-sm font-black text-amber-950">Honey Classic Wax</h4>
                  <p className="text-xs text-amber-900/80 leading-relaxed">
                    Natural sugar, lemon & honey blend. Perfect for regular waxing cycles with economical pricing.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-100/50 border border-amber-300 space-y-2">
                  <h4 className="text-sm font-black text-amber-950">RICA Gold Liposoluble Wax</h4>
                  <p className="text-xs text-amber-900/80 leading-relaxed">
                    Colophony-free formulation from Italy. Sticks only to hair, never to skin, preventing redness.
                  </p>
                </div>
              </div>
            ) : isDermaFacial ? (
              <div className="rounded-2xl bg-gradient-to-r from-blue-950 to-indigo-950 text-white p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-400" />
                  <h4 className="text-sm font-black text-white">-5°C Cryofacial Cold Infusion</h4>
                </div>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  Cold therapy immediately closes open pores, locks concentrated active serums into the dermal layer, and reduces facial inflammation with zero downtime.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                  <CheckCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Sealed Single-Use Kits Opened In Front Of You</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All sanitization disposables, wax strips, wooden spatulas, and cotton threads are single-use and disposed immediately after your session.
                </p>
              </div>
            )}
          </div>

          {/* ================================================================= */}
          {/* 5. QUALITY / SERVICE DIFFERENCE */}
          {/* ================================================================= */}
          <div className="p-5 sm:p-6 bg-white">
            <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-5 flex items-center justify-between gap-4">
              <div className="space-y-3 flex-1">
                <h3 className="text-base font-black text-slate-900">The Salon Difference</h3>
                <ul className="space-y-2 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-700 shrink-0" />
                    <span>Top-rated certified beauticians (4.85+ average rating)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Sealed single-use kits & authentic brands only</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Zero mess left behind • Complete floor cleanup</span>
                  </li>
                </ul>
              </div>

              <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80"
                  alt="Salon Experience"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, 'salon')}
                />
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 6. HOW IT WORKS */}
          {/* ================================================================= */}
          <div className="p-5 sm:p-6 bg-white space-y-4">
            <h3 className="text-base font-black text-slate-900">How it works</h3>

            <div className="space-y-3">
              {/* Step 1 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-black text-slate-900">Pre-service preparation</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Skin is cleansed thoroughly. Followed by soothing prep lotion and disposable sheet placement.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-slate-900">Core application</h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Precision service execution using single-use tools, certified techniques, and temperature checks.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <div className="w-14 h-12 rounded-lg overflow-hidden border border-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=200&q=80"
                      alt="Service technique"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImageError(e, 'waxing')}
                    />
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-black text-slate-900">Sensitive zone care</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Special low-heat, gentle formulations applied on delicate zones to avoid redness and skin pull.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                  4
                </span>
                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-black text-slate-900">Post-service nourishment</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Residue is cleansed with soothing calming oils or cool mist to soothe the treated skin.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                  5
                </span>
                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-black text-slate-900">Comfort pressing massage</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Relaxing light acupressure massage given to restore blood flow, relax muscles, and leave skin calm.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 7. BEST RESULTS & AFTERCARE TIPS */}
          {/* ================================================================= */}
          <div className="p-5 sm:p-6 bg-slate-50/60 space-y-4">
            <div className="rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 text-white p-5 flex items-center justify-between gap-4 border border-amber-800/40">
              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded">
                  Best results
                </span>
                <h4 className="text-base font-black text-white">
                  Smooth, glowing & hydrated skin
                </h4>
                <ul className="space-y-1 text-xs text-slate-200 font-medium">
                  <li className="flex items-center gap-1.5">
                    <span className="text-amber-400">•</span>
                    <span>Noticeably finer regrowth over repeated sessions</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-amber-400">•</span>
                    <span>Zero sticky mess or irritation at home</span>
                  </li>
                </ul>
              </div>

              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=300&q=80"
                  alt="Smooth skin"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, 'salon')}
                />
              </div>
            </div>

            {/* Aftercare tips card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Aftercare tips</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-black">✓</span>
                  <span>Moisturise your skin with soothing aloe or calming lotion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-black">✓</span>
                  <span>Avoid direct sun exposure or hot water showers for 4-6 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-black">✓</span>
                  <span>Avoid using chemical perfumes or heavy alcohol-based scrubs immediately</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 8. ALL REVIEWS */}
          {/* ================================================================= */}
          <div className="p-5 sm:p-6 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">All reviews</h3>
              <div className="text-xs font-bold text-slate-500">
                ★ {service.rating || 4.91} ({service.reviewCount ? (service.reviewCount / 1000).toFixed(0) : '46'}K verified reviews)
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveReviewTab('detailed')}
                className={`text-xs font-black pb-1 px-1 transition-all cursor-pointer whitespace-nowrap ${
                  activeReviewTab === 'detailed'
                    ? 'text-slate-900 border-b-2 border-slate-900'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Most detailed
              </button>
              <button
                type="button"
                onClick={() => setActiveReviewTab('area')}
                className={`text-xs font-black pb-1 px-1 transition-all cursor-pointer whitespace-nowrap ${
                  activeReviewTab === 'area'
                    ? 'text-slate-900 border-b-2 border-slate-900'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                In my area
              </button>
              <button
                type="button"
                onClick={() => setActiveReviewTab('frequent')}
                className={`text-xs font-black pb-1 px-1 transition-all cursor-pointer whitespace-nowrap ${
                  activeReviewTab === 'frequent'
                    ? 'text-slate-900 border-b-2 border-slate-900'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Frequent users
              </button>
            </div>

            {/* Review Cards */}
            <div className="space-y-3">
              {displayedReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/60 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-black text-slate-900">{rev.author}</div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        {rev.date} • {rev.serviceTag}
                      </div>
                    </div>

                    <div
                      className={`px-2 py-0.5 rounded-md text-xs font-black flex items-center gap-1 ${
                        rev.rating >= 4
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 text-white'
                      }`}
                    >
                      <span>{rev.rating}</span>
                      <Star className="w-2.5 h-2.5 fill-white" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    {rev.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Show more button */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="text-xs font-black text-purple-700 hover:text-purple-900 underline cursor-pointer inline-flex items-center gap-1"
              >
                <span>{showAllReviews ? 'Show less' : 'Show more reviews'}</span>
                {showAllReviews ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-600 font-medium">
            Single-use cartridges & disposables • 100% hygienic
          </div>

          <button
            type="button"
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-xl text-xs font-black shadow-md cursor-pointer transition-all active:scale-95"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
