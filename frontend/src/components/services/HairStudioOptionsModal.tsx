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
  Layers,
  Sparkle,
  ThumbsUp,
} from 'lucide-react';
import { ServiceItem, CartItem } from '../../types';
import { handleImageError } from '../../utils/imageFallback';

export interface HairOptionVariant {
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
  theme?: 'purple' | 'amber' | 'green' | 'rose' | 'blue' | 'gold' | 'cyan' | 'default';
  keyIngredients?: string;
  keyBenefit?: string;
}

interface HairStudioOptionsModalProps {
  service: ServiceItem;
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (customizedService: ServiceItem) => void;
  cartItems?: CartItem[];
  onUpdateCartQuantity?: (serviceId: string, delta: number) => void;
}

interface HairReviewItem {
  id: string;
  author: string;
  date: string;
  serviceTag: string;
  rating: number;
  text: string;
  category: 'detailed' | 'area' | 'frequent';
}

const HAIR_REVIEWS_DATA: HairReviewItem[] = [
  {
    id: 'hrev-1',
    author: 'Priyanka Sen',
    date: 'Sep 12, 2025',
    serviceTag: 'For: Haircut + L\'Oréal Spa + Inoa Ammonia-Free Roots',
    rating: 5,
    text: 'Suman was exceptional! She listened carefully to how I wanted my face-framing curtain bangs. Zero smell from the Inoa colour, and the steam creambath was heavenly. She even cleaned up all hair snippets with her vacuum mat. Truly salon quality at home!',
    category: 'detailed',
  },
  {
    id: 'hrev-2',
    author: 'Aarti Keshri',
    date: 'Sep 14, 2025',
    serviceTag: 'For: Keratin Infusion Therapy (Shoulder Length)',
    rating: 5,
    text: 'Best keratin treatment ever! My frizzy postpartum hair feels silky, mirror-straight, and soft. She checked the heat settings thoroughly so there was zero burning.',
    category: 'detailed',
  },
  {
    id: 'hrev-3',
    author: 'Tanya Malhotra',
    date: 'Sep 15, 2025',
    serviceTag: 'For: Classic Straight, U & Feather Haircut',
    rating: 5,
    text: 'Very polite, professional, and on-time. Precision trimming without cutting away unnecessary length. Loved the bouncy blow-dry at the end!',
    category: 'area',
  },
  {
    id: 'hrev-4',
    author: 'Sunita Roy',
    date: 'Sep 17, 2025',
    serviceTag: 'For: L\'Oréal Majirel 100% Grey Coverage Roots',
    rating: 5,
    text: 'Clean sectioning, no forehead or ear staining, and she left the processing timer running accurately. High shine result!',
    category: 'frequent',
  },
  {
    id: 'hrev-5',
    author: 'Megha Agarwal',
    date: 'Sep 18, 2025',
    serviceTag: 'For: Mom & Daughter Twin Haircut Package',
    rating: 5,
    text: 'My 6-year-old daughter was so comfortable with Poonam! She gave her cute front bangs and handled her gently. Wonderful package for busy moms.',
    category: 'area',
  },
  {
    id: 'hrev-6',
    author: 'Shalini Verma',
    date: 'Sep 19, 2025',
    serviceTag: 'For: 30 mins Ayurvedic Bhringraj Herbal Head Massage',
    rating: 5,
    text: 'Relieved my week-long migraine! Warm herbal oil with acupressure on temples and neck was unbelievable relaxation. Must book!',
    category: 'frequent',
  },
];

const HAIR_FAQS_DATA = [
  {
    q: 'Do I need to wash my hair before the stylist arrives?',
    a: 'For haircuts and heat styling, clean damp or dry hair is recommended. For root touch-up or global hair colour, unwashed hair (24 to 48 hours post last wash) is actually preferred as natural scalp oils provide a protective barrier.',
  },
  {
    q: 'Will there be hair mess on my floor or furniture?',
    a: 'Not at all. UrgentLyfe stylists bring large waterproof floor sheets, sanitized cape wraps, and neck protective collars. After finishing, they sweep and vacuum all stray hair into a sealed disposal bag.',
  },
  {
    q: 'Are the L\'Oréal colour tubes and keratin products genuine?',
    a: 'Yes, 100% authentic. All L\'Oréal Professionnel (Majirel & Inoa) and Keratin/Botox formulations are in sealed manufacturer packs with batch verification codes, opened directly in front of you.',
  },
  {
    q: 'Can I show a photo or reference of the haircut I want?',
    a: 'Definitely! Every haircut begins with a complimentary 5-minute face-shape consultation. You can show any reference picture (butterfly layers, curtain bangs, blunt bob) and your stylist will adapt it to your hair density.',
  },
  {
    q: 'How long do the results of Keratin and Hair Botox last?',
    a: 'With sulfate-free shampoo care, Keratin smoothing lasts 3 to 4 months, while Hair Botox collagen plumping lasts 2 to 3 months, eliminating everyday frizz and styling hassle.',
  },
];

export function getHairVariants(service: ServiceItem): HairOptionVariant[] {
  // 1. Packages: Cut, trim, spa & style
  if (service.id === 'hair-pkg-cut-spa-style') {
    return [
      {
        id: 'hair-pkg-cut-spa-style-ayurvedic',
        name: 'Haircut + Ayurvedic Strengthening Spa',
        brand: 'UrgentLyfe Herbal',
        rating: 4.81,
        reviews: '374K',
        description: 'Personalized haircut with ancient herbal amla, bhringraj & warm sesame oil scalp therapy with hot towel steam.',
        price: 1698,
        originalPrice: 1848,
        durationMinutes: 105,
        tag: 'Popular',
        theme: 'green',
        keyIngredients: 'Bhringraj, Amla & Cold-Pressed Sesame',
        keyBenefit: 'Strengthens roots & relieves scalp stress',
      },
      {
        id: 'hair-pkg-cut-spa-style-loreal',
        name: 'Haircut + L\'Oréal Professionnel Hair Spa',
        brand: 'L\'Oréal Professionnel',
        rating: 4.83,
        reviews: '120K',
        description: 'Layer or feather haircut coupled with deep repair water lily steam infusion masque and glossy blowout.',
        price: 1898,
        originalPrice: 2098,
        durationMinutes: 110,
        tag: 'Recommended',
        theme: 'purple',
        keyIngredients: 'Water Lily & Purified Lipids',
        keyBenefit: 'Deep fiber repair & mirror shine',
      },
      {
        id: 'hair-pkg-cut-spa-style-moroccan',
        name: 'Haircut + Argan Oil Restorative Spa',
        brand: 'Moroccan Argan',
        rating: 4.86,
        reviews: '45K',
        description: 'Luxury styling cut paired with pure argan oil hydration treatment and thermal ceramic smoothing.',
        price: 2198,
        originalPrice: 2498,
        durationMinutes: 120,
        theme: 'gold',
        keyIngredients: '100% Pure Moroccan Argan Oil',
        keyBenefit: 'Ultra-hydration for dry, chemically treated hair',
      },
    ];
  }

  // 2. Packages: Cut, trim & style
  if (service.id === 'hair-pkg-cut-style') {
    return [
      {
        id: 'hair-pkg-cut-style-straight',
        name: 'Haircut + Straight & Smooth Styling',
        brand: 'UrgentLyfe Studio',
        rating: 4.81,
        reviews: '308K',
        description: 'Precision haircut followed by thermal ceramic flat-iron straightening with heat-protectant serum.',
        price: 998,
        originalPrice: 1098,
        durationMinutes: 90,
        tag: 'Best Value',
        theme: 'purple',
        keyIngredients: 'Thermal Silicone Defence Serum',
        keyBenefit: 'Sleek pin-straight finish with zero frizz',
      },
      {
        id: 'hair-pkg-cut-style-curls',
        name: 'Haircut + Voluminous Beach Waves / Curls',
        brand: 'UrgentLyfe Studio',
        rating: 4.80,
        reviews: '92K',
        description: 'Bespoke haircut paired with 32mm ceramic tong curls and flexible finish texture spray.',
        price: 1048,
        originalPrice: 1198,
        durationMinutes: 95,
        theme: 'rose',
        keyIngredients: 'Sea Salt & Flexible Hold Polymer',
        keyBenefit: 'Bouncy red-carpet volume and movement',
      },
    ];
  }

  // 3. Packages: Cut, trim, spa, style, colour
  if (service.id === 'hair-pkg-cut-spa-style-colour') {
    return [
      {
        id: 'hair-pkg-combo-majirel',
        name: 'Cut + L\'Oréal Spa + Majirel Roots + Style',
        brand: 'L\'Oréal Professionnel',
        rating: 4.80,
        reviews: '402K',
        description: 'Complete 4-in-1 makeover with 100% grey coverage roots, nourishing creambath, haircut and finish style.',
        price: 2172,
        originalPrice: 2397,
        durationMinutes: 150,
        tag: 'Best Seller',
        theme: 'gold',
        keyIngredients: 'Majirel Ionène G & Incell Active',
        keyBenefit: '100% grey coverage with rich nourishment',
      },
      {
        id: 'hair-pkg-combo-inoa',
        name: 'Cut + L\'Oréal Spa + Inoa Ammonia-Free Roots + Style',
        brand: 'L\'Oréal Inoa ODS2',
        rating: 4.84,
        reviews: '110K',
        description: 'Odourless oil-delivery root touch up with soothing spa masque, face-framing haircut and glamorous blow-dry.',
        price: 2499,
        originalPrice: 2799,
        durationMinutes: 150,
        tag: 'Ammonia Free',
        theme: 'green',
        keyIngredients: 'ODS2 Oil Delivery 60% Mineral Oil',
        keyBenefit: 'Scalp comfort, zero chemical smell & high shine',
      },
      {
        id: 'hair-pkg-combo-global',
        name: 'Cut + L\'Oréal Spa + Global Color (Shoulder) + Style',
        brand: 'L\'Oréal Professionnel',
        rating: 4.85,
        reviews: '78K',
        description: 'All-inclusive full transformation covering entire hair length with glossy blowout finish.',
        price: 3699,
        originalPrice: 4299,
        durationMinutes: 180,
        theme: 'purple',
        keyIngredients: 'Full Saturation Lipids & Color Lock',
        keyBenefit: 'Radiant full-length rich hue',
      },
      {
        id: 'hair-pkg-combo-fashion',
        name: 'Cut + L\'Oréal Spa + Fashion Accents + Style',
        brand: 'L\'Oréal Professionnel',
        rating: 4.86,
        reviews: '35K',
        description: 'Bespoke haircut with 6 highlight streaks, nourishment spa and Hollywood waves styling.',
        price: 3999,
        originalPrice: 4699,
        durationMinutes: 195,
        theme: 'cyan',
        keyIngredients: 'Blonde Studio Lightener & Tone Gloss',
        keyBenefit: 'Modern multidimensional contrast highlights',
      },
    ];
  }

  // 4. Packages: Haircut & botox/keratin
  if (service.id === 'hair-pkg-cut-botox-keratin') {
    return [
      {
        id: 'hair-pkg-cut-keratin-shoulder',
        name: 'Haircut + Shoulder Length Keratin Infusion',
        brand: 'Keratin Complex',
        rating: 4.83,
        reviews: '64K',
        description: 'Precision haircut with formaldehyde-safe smoothing keratin therapy for shoulder length hair.',
        price: 4499,
        originalPrice: 4899,
        durationMinutes: 180,
        tag: 'Popular',
        theme: 'purple',
        keyIngredients: 'Hydrolyzed Keratin & Wheat Protein',
        keyBenefit: 'Eliminates 95% frizz for up to 4 months',
      },
      {
        id: 'hair-pkg-cut-keratin-midback',
        name: 'Haircut + Mid-Back Length Keratin Infusion',
        brand: 'Keratin Complex',
        rating: 4.85,
        reviews: '41K',
        description: 'Precision styling cut paired with complete protein restructuring for mid-back length hair.',
        price: 5248,
        originalPrice: 5648,
        durationMinutes: 210,
        tag: 'Best Value',
        theme: 'purple',
        keyIngredients: 'Deep Keratin Polypeptide Chains',
        keyBenefit: 'Smooth manageable silk finish',
      },
      {
        id: 'hair-pkg-cut-botox-midback',
        name: 'Haircut + Hair Botox Collagen Filler',
        brand: 'Caviar & Botox Filler',
        rating: 4.88,
        reviews: '28K',
        description: 'Precision haircut with intensive hyaluronic & caviar oil Botox restoration for aging, limp or brittle hair.',
        price: 4999,
        originalPrice: 5499,
        durationMinutes: 210,
        theme: 'rose',
        keyIngredients: 'Hyaluronic Acid, Caviar Oil & Collagen',
        keyBenefit: 'Deep plumping, split-end sealing & natural bounce',
      },
    ];
  }

  // 5. Packages: Haircut & color
  if (service.id === 'hair-pkg-cut-color') {
    return [
      {
        id: 'hair-pkg-cut-color-majirel',
        name: 'Haircut + L\'Oréal Majirel Roots Touch Up',
        brand: 'L\'Oréal Majirel',
        rating: 4.81,
        reviews: '92K',
        description: 'Styling haircut paired with 100% grey coverage Majirel roots application and express blowout.',
        price: 2499,
        originalPrice: 2699,
        durationMinutes: 90,
        tag: 'Popular',
        theme: 'gold',
        keyIngredients: 'Ionène G Micro-Cationic Polymers',
        keyBenefit: 'Rich uniform color and high root shine',
      },
      {
        id: 'hair-pkg-cut-color-inoa',
        name: 'Haircut + L\'Oréal Inoa Ammonia-Free Roots',
        brand: 'L\'Oréal Inoa',
        rating: 4.84,
        reviews: '55K',
        description: 'Ammonia-free odourless root touch-up with customized face-framing haircut and smoothing serum.',
        price: 2697,
        originalPrice: 2847,
        durationMinutes: 90,
        tag: 'Recommended',
        theme: 'green',
        keyIngredients: 'Oil Delivery System 2 (No Ammonia)',
        keyBenefit: 'Gentle on scalp, zero stinging or fumes',
      },
      {
        id: 'hair-pkg-cut-color-global',
        name: 'Haircut + L\'Oréal Global Hair Color (Shoulder)',
        brand: 'L\'Oréal Professionnel',
        rating: 4.86,
        reviews: '38K',
        description: 'Uniform full-length color application from roots to tips with expert haircut.',
        price: 3199,
        originalPrice: 3499,
        durationMinutes: 120,
        theme: 'purple',
        keyIngredients: 'Full Coverage Gloss Formula',
        keyBenefit: 'Radiant all-over new shade',
      },
    ];
  }

  // 6. Blow-dry: In curl / Out curl blow-dry
  if (service.id === 'hair-blowdry-in-out-curl') {
    return [
      {
        id: 'hair-blowdry-in-curl',
        name: 'Classic In-Curl Voluminous Blow-Dry',
        brand: 'UrgentLyfe Studio',
        rating: 4.79,
        reviews: '28K',
        description: 'Inward rounded ends with voluminous root lift using ceramic round brush and gloss serum.',
        price: 499,
        originalPrice: 599,
        durationMinutes: 45,
        tag: 'Classic',
        theme: 'purple',
        keyIngredients: 'Thermal Shield & Argan Serum',
        keyBenefit: 'Soft rounded bounce for everyday elegance',
      },
      {
        id: 'hair-blowdry-out-curl',
        name: 'Flicked Out-Curl Glamour Blow-Dry',
        brand: 'UrgentLyfe Studio',
        rating: 4.81,
        reviews: '19K',
        description: 'Playful outward flicks at the ends with high mirror shine and flexible finish hold.',
        price: 499,
        originalPrice: 599,
        durationMinutes: 45,
        tag: 'Glamour',
        theme: 'rose',
        keyIngredients: 'Volumizing Root Booster & Shine Spray',
        keyBenefit: 'Chic outward flicked texture with 24hr hold',
      },
    ];
  }

  // 7. Blow-dry: Straight & smooth blow-dry
  if (service.id === 'hair-blowdry-straight-smooth') {
    return [
      {
        id: 'hair-blowdry-smooth-regular',
        name: 'Silky Smooth Paddle Brush Blow-Dry',
        brand: 'UrgentLyfe Studio',
        rating: 4.80,
        reviews: '55K',
        description: 'Paddle brush glide with thermal heat defence for natural, frizz-free straight hair.',
        price: 399,
        originalPrice: 499,
        durationMinutes: 45,
        theme: 'purple',
        keyIngredients: 'Heat Protectant Keratin Mist',
        keyBenefit: 'Smooth manageable hair without severe pin-straightening',
      },
      {
        id: 'hair-blowdry-smooth-anti-humidity',
        name: 'Mirror Glass Anti-Humidity Blow-Dry',
        brand: 'UrgentLyfe Studio',
        rating: 4.84,
        reviews: '27K',
        description: 'Advanced polymer seal blow-dry protecting against sweat and monsoon humidity for up to 48 hours.',
        price: 499,
        originalPrice: 649,
        durationMinutes: 50,
        tag: 'High Shine',
        theme: 'blue',
        keyIngredients: 'Polymer Moisture Barrier',
        keyBenefit: 'Glass-like reflective shine and humidity proofing',
      },
    ];
  }

  // 8. Advanced Styling
  if (service.id === 'hair-advanced-styling') {
    return [
      {
        id: 'hair-style-bun',
        name: 'Red Carpet Messy Bun / High Textured Updo',
        brand: 'Bridal & Party Studio',
        rating: 4.78,
        reviews: '8K',
        description: 'Effortless textured bridal or party updo with face-framing tendrils and secure concealed bobby pins.',
        price: 1000,
        originalPrice: 1200,
        durationMinutes: 60,
        tag: 'Party Favorite',
        theme: 'gold',
        keyIngredients: 'Texturizing Matte Powder & Finishing Mist',
        keyBenefit: 'Stays intact through dance and long events',
      },
      {
        id: 'hair-style-braids',
        name: 'Intricate Waterfall / Dutch Crown Braids',
        brand: 'Bridal & Party Studio',
        rating: 4.80,
        reviews: '4.5K',
        description: 'Ornate multi-strand braids with volume teasing and optional floral/baby\'s breath placement.',
        price: 1250,
        originalPrice: 1450,
        durationMinutes: 75,
        theme: 'purple',
        keyIngredients: 'Grip Setting Pomade',
        keyBenefit: 'Neat, intricate aesthetic for festive celebrations',
      },
      {
        id: 'hair-style-vintage-waves',
        name: 'Glam Hollywood Vintage Waves with Extension Setting',
        brand: 'Bridal & Party Studio',
        rating: 4.85,
        reviews: '2.5K',
        description: 'Ultra-glossy vintage S-waves aligned seamlessly with clip-in extensions.',
        price: 1499,
        originalPrice: 1799,
        durationMinutes: 90,
        tag: 'Bridal',
        theme: 'rose',
        keyIngredients: 'Luminous Mirror Shine Gloss',
        keyBenefit: 'Flawless camera-ready red carpet drama',
      },
    ];
  }

  // 9. Hair straightening
  if (service.id === 'hair-straightening') {
    return [
      {
        id: 'hair-straight-classic',
        name: 'Classic Ceramic Flat-Iron Straightening',
        brand: 'UrgentLyfe Studio',
        rating: 4.86,
        reviews: '20K',
        description: 'Section-by-section ceramic iron pass with heat protector for straight, manageable and soft hair.',
        price: 549,
        originalPrice: 699,
        durationMinutes: 45,
        theme: 'purple',
        keyIngredients: 'Ceramic Heat Shielding Spray',
        keyBenefit: 'Sleek, glossy pin-straight texture',
      },
      {
        id: 'hair-straight-glass',
        name: 'Glass Hair Thermal Silk Press',
        brand: 'UrgentLyfe Studio',
        rating: 4.89,
        reviews: '11K',
        description: 'Precision titanium press with moisture sealant for maximum reflective mirror shine without damage.',
        price: 699,
        originalPrice: 899,
        durationMinutes: 60,
        tag: 'Mirror Finish',
        theme: 'blue',
        keyIngredients: 'Silk Protein Infusion Drops',
        keyBenefit: 'Deep liquid glass shine that lasts until next wash',
      },
    ];
  }

  // 10. Curls & waves
  if (service.id === 'hair-curls-waves') {
    return [
      {
        id: 'hair-curls-beach',
        name: 'Bouncy Beach Waves / Textured Mermaid Curls',
        brand: 'UrgentLyfe Studio',
        rating: 4.75,
        reviews: '12K',
        description: 'Loose, natural waves styled with 32mm wide curling tong and sea salt texturizing mist.',
        price: 549,
        originalPrice: 699,
        durationMinutes: 60,
        tag: 'Trending',
        theme: 'rose',
        keyIngredients: 'Texturizing Sea Salt & Argan Blend',
        keyBenefit: 'Effortless lived-in bounce with movement',
      },
      {
        id: 'hair-curls-spiral',
        name: 'Defined Spiral Curls with Long-Lasting Setting',
        brand: 'UrgentLyfe Studio',
        rating: 4.79,
        reviews: '5K',
        description: 'Tight, defined curls pinned and set with flexible hold finishing mist for all-day events.',
        price: 699,
        originalPrice: 849,
        durationMinutes: 70,
        theme: 'gold',
        keyIngredients: 'Curl Lock Memory Polymers',
        keyBenefit: 'Holds definition for 24+ hours even in warm weather',
      },
    ];
  }

  // 11. Haircut for women
  if (service.id === 'hair-cut-women') {
    return [
      {
        id: 'hair-cut-women-classic',
        name: 'Classic Haircut (Straight, U, V, Blunt)',
        brand: 'UrgentLyfe Salon',
        rating: 4.81,
        reviews: '140K',
        description: 'Clean uniform cut to maintain volume, even out edges and eliminate dead split-ends.',
        price: 549,
        originalPrice: 699,
        durationMinutes: 45,
        tag: 'Popular',
        theme: 'purple',
        keyIngredients: 'Sectioning Mist & Argan Shine Serum',
        keyBenefit: 'Even, healthy density with clean perimeter',
      },
      {
        id: 'hair-cut-women-advanced',
        name: 'Multi-Layer / Feather Cut / Curtain Bangs',
        brand: 'UrgentLyfe Salon',
        rating: 4.83,
        reviews: '85K',
        description: 'Texturized face-framing layers or soft feathers with curtain bangs for maximum bounce and movement.',
        price: 649,
        originalPrice: 799,
        durationMinutes: 55,
        tag: 'Trending',
        theme: 'rose',
        keyIngredients: 'Texturizing Polish & Volumizer',
        keyBenefit: 'Soft, bouncy layers that frame face contours',
      },
    ];
  }

  // 12. Haircut for girls
  if (service.id === 'hair-cut-girls') {
    return [
      {
        id: 'hair-cut-girls-bob',
        name: 'Classic Girl Bob / Straight Blunt Trim (Ages 1-8)',
        brand: 'Junior Hair Salon',
        rating: 4.82,
        reviews: '14K',
        description: 'Gentle, patient handling with sterile scissors, neat even edge trimming and detangling spray.',
        price: 449,
        originalPrice: 549,
        durationMinutes: 30,
        theme: 'green',
        keyIngredients: 'Tear-Free Detangling Aloe Mist',
        keyBenefit: 'Quick, pain-free haircut for little ones',
      },
      {
        id: 'hair-cut-girls-layers',
        name: 'Butterfly Layers & Fringe Cut (Ages 9-15)',
        brand: 'Junior Hair Salon',
        rating: 4.85,
        reviews: '7K',
        description: 'Trendy layered haircut with face-framing curtain bangs suitable for school and parties.',
        price: 499,
        originalPrice: 599,
        durationMinutes: 40,
        tag: 'Popular',
        theme: 'purple',
        keyIngredients: 'Light Conditioning Gloss',
        keyBenefit: 'Chic modern school-friendly styling',
      },
    ];
  }

  // 13. Haircut for mom & daughter
  if (service.id === 'hair-cut-mom-daughter') {
    return [
      {
        id: 'hair-cut-md-classic',
        name: 'Classic Mother Haircut + Girl Blunt Trim',
        brand: 'Family Salon',
        rating: 4.80,
        reviews: '4.2K',
        description: 'Two separate haircuts in one sitting: 1 adult women haircut + 1 girl haircut with express styling.',
        price: 1049,
        originalPrice: 1199,
        durationMinutes: 90,
        theme: 'purple',
        keyBenefit: 'Convenient home session with ₹150 combo savings',
      },
      {
        id: 'hair-cut-md-styled',
        name: 'Layered Mother Haircut + Girl Stylish Bangs & Layers',
        brand: 'Family Salon',
        rating: 4.86,
        reviews: '1.8K',
        description: 'Full layered styling for mother and tailored chic haircut with bangs for daughter with mini blow-dries.',
        price: 1199,
        originalPrice: 1399,
        durationMinutes: 100,
        tag: 'Twin Makeover',
        theme: 'rose',
        keyBenefit: 'Dual makeover with personalized face framing',
      },
    ];
  }

  // 14. Hair trim (Split ends)
  if (service.id === 'hair-trim-split-ends') {
    return [
      {
        id: 'hair-trim-dusting',
        name: 'Split-End Dusting (Preserve Full Length)',
        brand: 'UrgentLyfe Salon',
        rating: 4.80,
        reviews: '95K',
        description: 'Micro-trimming only frayed split tips along the perimeter without cutting overall hair length.',
        price: 449,
        originalPrice: 549,
        durationMinutes: 20,
        theme: 'purple',
        keyBenefit: 'Removes dry split ends while retaining length',
      },
      {
        id: 'hair-trim-perimeter',
        name: 'Deep Split-End Clean & Perimeter Re-shaping',
        brand: 'UrgentLyfe Salon',
        rating: 4.83,
        reviews: '49K',
        description: 'Thorough dusting across inner layers followed by neat boundary alignment for thicker appearance.',
        price: 549,
        originalPrice: 699,
        durationMinutes: 30,
        tag: 'Recommended',
        theme: 'rose',
        keyBenefit: 'Eliminates mid-shaft splits for fuller looking hair',
      },
    ];
  }

  // 15. L'Oréal hair spa
  if (service.id === 'hair-spa-loreal') {
    return [
      {
        id: 'hair-spa-deep-repair',
        name: 'L\'Oréal Deep Nourishing Creambath Spa',
        brand: 'L\'Oréal Professionnel',
        rating: 4.80,
        reviews: '62K',
        description: 'Water lily & purified water rich masque with hot towel steam infusion and 20 mins scalp massage.',
        price: 999,
        originalPrice: 1299,
        durationMinutes: 60,
        tag: 'Bestseller',
        theme: 'purple',
        keyIngredients: 'Water Lily & Cationic Softening Agent',
        keyBenefit: 'Restores moisture to chemically treated dry hair',
      },
      {
        id: 'hair-spa-anti-dandruff',
        name: 'L\'Oréal Scalp Purifying & Anti-Dandruff Spa',
        brand: 'L\'Oréal Professionnel',
        rating: 4.82,
        reviews: '24K',
        description: 'Zinc pyrithione clarifying formula to eliminate flakes, soothe itchiness and balance scalp sebum.',
        price: 1099,
        originalPrice: 1399,
        durationMinutes: 65,
        theme: 'blue',
        keyIngredients: 'Zinc Pyrithione & Tea Tree Extract',
        keyBenefit: 'Eliminates visible dandruff & calms itchy scalp',
      },
      {
        id: 'hair-spa-mythic-oil',
        name: 'L\'Oréal Mythic Royal Argan Oil Spa',
        brand: 'L\'Oréal Mythic Oil',
        rating: 4.86,
        reviews: '12K',
        description: 'Luxury botanical lipid nourishment for bleached, colored or severely brittle damaged hair.',
        price: 1299,
        originalPrice: 1599,
        durationMinutes: 70,
        tag: 'Premium',
        theme: 'gold',
        keyIngredients: 'Fair Trade Argan & Myrrh Oil',
        keyBenefit: 'Intense silky suppleness and weightless fluid touch',
      },
    ];
  }

  // 16. Head massage
  if (service.id === 'hair-head-massage') {
    return [
      {
        id: 'hair-massage-20m',
        name: '20 mins Warm Almond Oil Scalp Massage',
        brand: 'UrgentLyfe Wellness',
        rating: 4.78,
        reviews: '25K',
        description: 'Gentle acupressure strokes to promote blood circulation and ease work tension.',
        price: 349,
        originalPrice: 449,
        durationMinutes: 20,
        theme: 'amber',
        keyIngredients: 'Pure Sweet Almond Oil',
        keyBenefit: 'Calms tension headaches & promotes sound sleep',
      },
      {
        id: 'hair-massage-30m',
        name: '30 mins Ayurvedic Bhringraj Herbal Massage',
        brand: 'UrgentLyfe Wellness',
        rating: 4.82,
        reviews: '10K',
        description: 'Deep therapeutic root massage with warm herb-infused oil covering scalp, neck & upper shoulders.',
        price: 499,
        originalPrice: 599,
        durationMinutes: 30,
        tag: 'Popular',
        theme: 'green',
        keyIngredients: 'Bhringraj, Brahmi & Amla Extract',
        keyBenefit: 'Nourishes hair roots & releases neck knots',
      },
      {
        id: 'hair-massage-40m',
        name: '40 mins Virgin Coconut & Kansa Wand Acupressure',
        brand: 'UrgentLyfe Wellness',
        rating: 4.87,
        reviews: '4K',
        description: 'Intense relaxation with authentic kansa wand scalp stimulation for cooling and deep sleep.',
        price: 649,
        originalPrice: 799,
        durationMinutes: 40,
        tag: 'Ultimate Relief',
        theme: 'gold',
        keyIngredients: 'Cold-Pressed Virgin Coconut & Kansa Metal',
        keyBenefit: 'Draws out excess body heat and relieves mental fatigue',
      },
    ];
  }

  // 17. Keratin treatment
  if (service.id === 'hair-keratin-treatment') {
    return [
      {
        id: 'hair-keratin-shoulder',
        name: 'Shoulder Length Keratin Therapy',
        brand: 'Keratin Complex Pro',
        rating: 4.81,
        reviews: '9K',
        description: 'Deep formaldehyde-safe smoothing for hair reaching shoulder level with heat-locked protein.',
        price: 3999,
        originalPrice: 4999,
        durationMinutes: 150,
        tag: 'Popular',
        theme: 'purple',
        keyIngredients: 'Hydrolyzed Keratin & Silk Amino Acids',
        keyBenefit: '3-4 months frizz-free smooth manageable hair',
      },
      {
        id: 'hair-keratin-midback',
        name: 'Mid-Back Length Keratin Therapy',
        brand: 'Keratin Complex Pro',
        rating: 4.83,
        reviews: '5K',
        description: 'Complete frizz elimination for medium-long strands reaching mid-back with mirror finish.',
        price: 4899,
        originalPrice: 5999,
        durationMinutes: 180,
        theme: 'purple',
        keyIngredients: 'Bio-Polymer Keratin Seal',
        keyBenefit: 'Dramatic reduction in daily blowout & styling time',
      },
      {
        id: 'hair-keratin-waist',
        name: 'Waist Length / Dense Hair Keratin',
        brand: 'Keratin Complex Pro',
        rating: 4.86,
        reviews: '3K',
        description: 'Intense protein restructuring for waist-length voluminous hair with deep cuticle seal.',
        price: 5799,
        originalPrice: 6999,
        durationMinutes: 210,
        theme: 'purple',
        keyIngredients: 'High Density Protein Matrix',
        keyBenefit: 'Tames stubborn, thick, coarse wave patterns',
      },
    ];
  }

  // 18. Botox treatment
  if (service.id === 'hair-botox-treatment') {
    return [
      {
        id: 'hair-botox-shoulder',
        name: 'Shoulder/Mid-Back Length Botox Hair Filler',
        brand: 'Botox Collagen Filler',
        rating: 4.88,
        reviews: '3.5K',
        description: 'Caviar extract and collagen filler treatment restores natural elasticity and seals split cuticle layers without harsh chemicals.',
        price: 4499,
        originalPrice: 5499,
        durationMinutes: 180,
        tag: 'Bestseller',
        theme: 'rose',
        keyIngredients: 'Caviar Extract, Hyaluronic & Collagen',
        keyBenefit: 'Rejuvenates damaged hair with volume & soft bounce',
      },
      {
        id: 'hair-botox-waist',
        name: 'Waist-Length / Extra Dense Botox Therapy',
        brand: 'Botox Collagen Filler',
        rating: 4.91,
        reviews: '2K',
        description: 'Deep nutrient restructuring for very long or dense damaged hair with intense bounce restoration.',
        price: 5299,
        originalPrice: 6299,
        durationMinutes: 210,
        theme: 'rose',
        keyIngredients: 'Concentrated Hyaluronic Acid & Lipids',
        keyBenefit: 'Restores anti-aging vibrancy and silky movement',
      },
    ];
  }

  // 19. Hair colour (application only)
  if (service.id === 'hair-colour-application-only') {
    return [
      {
        id: 'hair-col-app-root',
        name: 'Root Touch-Up Application Only',
        brand: 'UrgentLyfe Pro Brush',
        rating: 4.80,
        reviews: '54K',
        description: 'Even brush application of your provided color on up to 2 inches of roots regrowth with neat protective cape.',
        price: 399,
        originalPrice: 499,
        durationMinutes: 40,
        tag: 'Bestseller',
        theme: 'amber',
        keyBenefit: 'Zero scalp staining with neat sectioning',
      },
      {
        id: 'hair-col-app-shoulder',
        name: 'Shoulder Length Full Application',
        brand: 'UrgentLyfe Pro Brush',
        rating: 4.81,
        reviews: '26K',
        description: 'Full root-to-tip application of customer\'s color box/bottle for shoulder-length hair.',
        price: 499,
        originalPrice: 599,
        durationMinutes: 50,
        theme: 'amber',
        keyBenefit: 'Uniform coverage without missed patches',
      },
      {
        id: 'hair-col-app-midback',
        name: 'Mid-Back Length Full Application',
        brand: 'UrgentLyfe Pro Brush',
        rating: 4.80,
        reviews: '18K',
        description: 'Thorough section-by-section application for hair falling below shoulder blades.',
        price: 649,
        originalPrice: 749,
        durationMinutes: 60,
        theme: 'amber',
        keyBenefit: 'Full back coverage with ear and forehead shields',
      },
      {
        id: 'hair-col-app-waist',
        name: 'Waist Length Full Application',
        brand: 'UrgentLyfe Pro Brush',
        rating: 4.79,
        reviews: '9K',
        description: 'High-coverage application across waist-length voluminous hair without misses.',
        price: 799,
        originalPrice: 949,
        durationMinutes: 75,
        theme: 'amber',
        keyBenefit: 'Meticulous saturation on long dense hair',
      },
      {
        id: 'hair-col-app-henna-short',
        name: 'Henna/Mehndi Application (Short/Medium)',
        brand: 'UrgentLyfe Pro Brush',
        rating: 4.82,
        reviews: '34K',
        description: 'Natural herbal mehndi paste application with gloves, barrier petroleum jelly and shower cap.',
        price: 349,
        originalPrice: 449,
        durationMinutes: 45,
        theme: 'green',
        keyBenefit: 'Mess-free herbal application with clean hairline',
      },
      {
        id: 'hair-col-app-henna-long',
        name: 'Henna/Mehndi Application (Long Hair)',
        brand: 'UrgentLyfe Pro Brush',
        rating: 4.83,
        reviews: '22K',
        description: 'Generous scalp to tip herbal pack covering long thick strands completely.',
        price: 499,
        originalPrice: 599,
        durationMinutes: 60,
        theme: 'green',
        keyBenefit: 'Thorough coverage with shower wrap and cleanup',
      },
      {
        id: 'hair-col-app-bleach',
        name: 'Pre-Lighten Bleach Section Application',
        brand: 'UrgentLyfe Pro Brush',
        rating: 4.77,
        reviews: '8K',
        description: 'Precise application of lightener/developer on streaks or target crown sections.',
        price: 599,
        originalPrice: 749,
        durationMinutes: 60,
        theme: 'gold',
        keyBenefit: 'Controlled lift timing with professional foil wrap',
      },
    ];
  }

  // 20. L'Oréal Global color
  if (service.id === 'hair-colour-loreal-global') {
    return [
      {
        id: 'hair-col-global-shoulder',
        name: 'Shoulder Length L\'Oréal Global Color',
        brand: 'L\'Oréal Majirel / Inoa',
        rating: 4.84,
        reviews: '4.2K',
        description: 'Complete uniform shade transformation from roots to tips for hair reaching shoulder length.',
        price: 2399,
        originalPrice: 2899,
        durationMinutes: 60,
        tag: 'Popular',
        theme: 'purple',
        keyIngredients: 'Incell & Ionène G High Shine Active',
        keyBenefit: 'Rich uniform color and high cuticle gloss',
      },
      {
        id: 'hair-col-global-midback',
        name: 'Mid-Back Length L\'Oréal Global Color',
        brand: 'L\'Oréal Majirel / Inoa',
        rating: 4.86,
        reviews: '1.5K',
        description: 'Rich saturation across full hair volume reaching mid-back with color lock wash treatment.',
        price: 2899,
        originalPrice: 3499,
        durationMinutes: 75,
        theme: 'purple',
        keyIngredients: 'Lipid Bonding Color Masque',
        keyBenefit: 'Full saturation with prolonged vibrancy',
      },
      {
        id: 'hair-col-global-waist',
        name: 'Waist Length L\'Oréal Global Color',
        brand: 'L\'Oréal Majirel / Inoa',
        rating: 4.88,
        reviews: '800',
        description: 'Extensive full-coverage formulation for long, dense hair with mirror shine wash.',
        price: 3399,
        originalPrice: 3999,
        durationMinutes: 90,
        theme: 'purple',
        keyIngredients: 'Concentrated Pigment Delivery',
        keyBenefit: 'Flawless root-to-tip richness on long hair',
      },
    ];
  }

  // 21. L'Oréal Global fashion hair colour
  if (service.id === 'hair-colour-loreal-global-fashion') {
    return [
      {
        id: 'hair-fashion-burgundy',
        name: 'Rich Burgundy / Wine Tone Global Color',
        brand: 'L\'Oréal Fashion Color',
        rating: 4.76,
        reviews: '600',
        description: 'Deep violet-red tones with multidimensional light reflection and gloss sealant.',
        price: 2599,
        originalPrice: 3199,
        durationMinutes: 120,
        tag: 'Bestseller',
        theme: 'rose',
        keyIngredients: 'Multidimensional Violet-Red Pigment',
        keyBenefit: 'Luminous wine reflection in daylight',
      },
      {
        id: 'hair-fashion-caramel',
        name: 'Warm Caramel / Golden Copper Tone',
        brand: 'L\'Oréal Fashion Color',
        rating: 4.78,
        reviews: '300',
        description: 'Subtle sun-kissed golden brown and copper reflections beautifully tailored for Indian skin tones.',
        price: 2799,
        originalPrice: 3399,
        durationMinutes: 120,
        theme: 'gold',
        keyIngredients: 'Warm Gold Copper Micro-Dyes',
        keyBenefit: 'Warm golden shimmer and radiant healthy glow',
      },
      {
        id: 'hair-fashion-ruby',
        name: 'Vibrant Ruby / Plum Red Accent Global',
        brand: 'L\'Oréal Fashion Color',
        rating: 4.75,
        reviews: '200',
        description: 'High-pigment bold fashion hue with gentle pre-lightening and vibrant deposit.',
        price: 2999,
        originalPrice: 3599,
        durationMinutes: 140,
        theme: 'cyan',
        keyIngredients: 'High-Deposit Ruby Pigment',
        keyBenefit: 'Bold, statement-making party shade',
      },
    ];
  }

  // 22. L'Oréal root touch up
  if (service.id === 'hair-colour-loreal-root-touchup') {
    return [
      {
        id: 'hair-root-touchup-majirel',
        name: 'L\'Oréal Majirel (Rich Color & High Shine)',
        brand: 'L\'Oréal Majirel',
        rating: 4.81,
        reviews: '85K',
        description: 'Up to 2 inches grey regrowth coverage with Ionène G nourishing formula for 100% grey coverage.',
        price: 999,
        originalPrice: 1199,
        durationMinutes: 45,
        tag: 'Popular',
        theme: 'gold',
        keyIngredients: 'Ionène G & Incell Precision Bond',
        keyBenefit: '100% stubborn grey coverage with lasting shine',
      },
      {
        id: 'hair-root-touchup-inoa',
        name: 'L\'Oréal Inoa (100% Ammonia-Free)',
        brand: 'L\'Oréal Inoa ODS2',
        rating: 4.85,
        reviews: '48K',
        description: 'Odourless oil-delivery formulation preserving natural lipids and optimal scalp comfort.',
        price: 1499,
        originalPrice: 1799,
        durationMinutes: 45,
        tag: 'Odourless',
        theme: 'green',
        keyIngredients: 'ODS2 Oil Delivery System (Ammonia-Free)',
        keyBenefit: 'Zero smell, zero scalp irritation & gentle coverage',
      },
      {
        id: 'hair-root-touchup-excellence',
        name: 'L\'Oréal Excellence Crème (Triple Care)',
        brand: 'L\'Oréal Excellence',
        rating: 4.78,
        reviews: '29K',
        description: 'Pro-keratin infused grey coverage for soft, supple and nourished hair roots.',
        price: 899,
        originalPrice: 1099,
        durationMinutes: 45,
        theme: 'purple',
        keyIngredients: 'Pro-Keratin & Ceramide Conditioner',
        keyBenefit: 'Affordable quick grey coverage with softness',
      },
    ];
  }

  // 23. L'Oréal Majirel root touch-up specific shades
  if (service.id === 'hair-colour-loreal-majirel-touchup') {
    return [
      {
        id: 'hair-majirel-black',
        name: 'Majirel Natural Black / Deep Espresso (Shades 1-2)',
        brand: 'L\'Oréal Majirel',
        rating: 4.81,
        reviews: '40K',
        description: '100% seamless white hair coverage with natural dark reflections and scalp comfort.',
        price: 1299,
        originalPrice: 1499,
        durationMinutes: 45,
        tag: 'Popular',
        theme: 'gold',
        keyIngredients: 'Natural Black Micro-Pigment',
        keyBenefit: 'Seamless blend with untreated natural dark roots',
      },
      {
        id: 'hair-majirel-brown',
        name: 'Majirel Dark / Medium Brown (Shades 3-4)',
        brand: 'L\'Oréal Majirel',
        rating: 4.82,
        reviews: '18K',
        description: 'Warm natural chocolate brown tone matching untreated root regrowth.',
        price: 1299,
        originalPrice: 1499,
        durationMinutes: 45,
        theme: 'gold',
        keyIngredients: 'Warm Chocolate Pigment',
        keyBenefit: 'Natural brown coverage without red cast',
      },
      {
        id: 'hair-majirel-light-chestnut',
        name: 'Majirel Light Brown / Chestnut (Shade 5)',
        brand: 'L\'Oréal Majirel',
        rating: 4.79,
        reviews: '4K',
        description: 'Subtle lighter root shade for previously highlighted or light brown colored hair.',
        price: 1399,
        originalPrice: 1599,
        durationMinutes: 45,
        theme: 'gold',
        keyIngredients: 'Chestnut Amber Pigment',
        keyBenefit: 'Matches lighter brown lengths without line of demarcation',
      },
    ];
  }

  // 24. L'Oréal Inoa root touch-up
  if (service.id === 'hair-colour-loreal-inoa-touchup') {
    return [
      {
        id: 'hair-inoa-black-brown',
        name: 'Inoa Ammonia-Free Natural Black / Brown (Shades 1-3)',
        brand: 'L\'Oréal Inoa',
        rating: 4.85,
        reviews: '60K',
        description: 'Odourless ammonia-free oil delivery grey coverage preserving optimal scalp balance.',
        price: 1499,
        originalPrice: 1799,
        durationMinutes: 45,
        tag: 'ODS2 Tech',
        theme: 'green',
        keyIngredients: 'ODS2 60% Oil Base (Zero Ammonia)',
        keyBenefit: 'No eye stinging, no ammonia scent & silky roots',
      },
      {
        id: 'hair-inoa-golden-brown',
        name: 'Inoa Ammonia-Free Light Golden Brown (Shades 4-5)',
        brand: 'L\'Oréal Inoa',
        rating: 4.87,
        reviews: '28K',
        description: 'Warm golden shimmer with zero ammonia smell and soft fiber nutrition.',
        price: 1549,
        originalPrice: 1849,
        durationMinutes: 45,
        theme: 'green',
        keyIngredients: 'Inoa Golden Shimmer Oil',
        keyBenefit: 'Soft golden reflections with gentle scalp care',
      },
      {
        id: 'hair-inoa-supreme',
        name: 'Inoa High-Resist Stubborn Grey Formulation',
        brand: 'L\'Oréal Inoa Supreme',
        rating: 4.89,
        reviews: '10K',
        description: 'Specialized formulation for coarse, resistant white hair with double conditioning.',
        price: 1599,
        originalPrice: 1899,
        durationMinutes: 45,
        tag: 'Stubborn Greys',
        theme: 'green',
        keyIngredients: 'Densilum & ODS2 High Density Matrix',
        keyBenefit: '100% coverage on coarse white hair that rejects color',
      },
    ];
  }

  // 25. Highlights
  if (service.id === 'hair-highlights') {
    return [
      {
        id: 'hair-hl-4-crown',
        name: '4 Crown Streak Foils',
        brand: 'Blonde Studio',
        rating: 4.80,
        reviews: '12K',
        description: 'Subtle accent streaks on top crown to illuminate face and create depth.',
        price: 1999,
        originalPrice: 2499,
        durationMinutes: 90,
        theme: 'purple',
        keyBenefit: 'Quick face-illuminating contrast',
      },
      {
        id: 'hair-hl-8-foils',
        name: '8 Dimensional Streak Foils',
        brand: 'Blonde Studio',
        rating: 4.84,
        reviews: '8K',
        description: 'Evenly distributed highlights through top and side layers with toner wash.',
        price: 3499,
        originalPrice: 4299,
        durationMinutes: 150,
        tag: 'Most Popular',
        theme: 'gold',
        keyBenefit: 'Harmonious multi-angle dimension and bounce',
      },
      {
        id: 'hair-hl-12-foils',
        name: '12 Rich Contrast Foils',
        brand: 'Blonde Studio',
        rating: 4.83,
        reviews: '4K',
        description: 'Medium coverage multidimensional foils blending honey, caramel or copper shades.',
        price: 4499,
        originalPrice: 5499,
        durationMinutes: 180,
        theme: 'amber',
        keyBenefit: 'Rich sun-kissed ribbons throughout hair',
      },
      {
        id: 'hair-hl-half-head',
        name: 'Half-Head Highlights',
        brand: 'Blonde Studio',
        rating: 4.86,
        reviews: '2.5K',
        description: 'Comprehensive transformation covering front, sides and upper crown with custom toning.',
        price: 5499,
        originalPrice: 6699,
        durationMinutes: 200,
        tag: 'Trending',
        theme: 'rose',
        keyBenefit: 'Major color transformation visible from all angles',
      },
      {
        id: 'hair-hl-money-piece',
        name: 'Face Framing "Money Piece" Streaks',
        brand: 'Blonde Studio',
        rating: 4.82,
        reviews: '3.2K',
        description: 'Two bright front face-framing strands for instantly striking modern look.',
        price: 1499,
        originalPrice: 1899,
        durationMinutes: 60,
        tag: 'Viral Look',
        theme: 'cyan',
        keyBenefit: 'Brightens face contours with minimal bleach exposure',
      },
      {
        id: 'hair-hl-caramel-balayage',
        name: 'Caramel Melt Balayage',
        brand: 'Blonde Studio',
        rating: 4.85,
        reviews: '2.1K',
        description: 'Seamless warm caramel brush melt without harsh foil lines.',
        price: 4999,
        originalPrice: 5999,
        durationMinutes: 180,
        theme: 'gold',
        keyBenefit: 'Zero regrowth line for low maintenance grow-out',
      },
    ];
  }

  // 26. Balayage / Ombre
  if (service.id === 'hair-balayage-ombre') {
    return [
      {
        id: 'hair-bal-honey-caramel',
        name: 'Honey Caramel Balayage Melt',
        brand: 'Balayage Atelier',
        rating: 4.82,
        reviews: '600',
        description: 'Freehand painted gradual gradient melting from natural roots into warm caramel tips.',
        price: 3899,
        originalPrice: 4699,
        durationMinutes: 180,
        tag: 'Popular',
        theme: 'gold',
        keyIngredients: 'Ammonia-Free Clay Lightener & Toner',
        keyBenefit: 'Natural sun-bleached look that grows out invisibly',
      },
      {
        id: 'hair-bal-hazelnut-ombre',
        name: 'Sun-Kissed Hazelnut Ombre Transition',
        brand: 'Balayage Atelier',
        rating: 4.84,
        reviews: '250',
        description: 'Soft horizontal gradient with seamless blending for a natural grown-out beach look.',
        price: 4299,
        originalPrice: 4999,
        durationMinutes: 180,
        theme: 'amber',
        keyIngredients: 'Hazelnut Glaze Toner',
        keyBenefit: 'Gentle transition between natural and bright ends',
      },
      {
        id: 'hair-bal-rose-gold',
        name: 'Rose Gold / Subtle Burgundy Balayage',
        brand: 'Balayage Atelier',
        rating: 4.86,
        reviews: '120',
        description: 'Pastel metallic pink-burgundy ribbon highlights painted across length and ends.',
        price: 4899,
        originalPrice: 5699,
        durationMinutes: 210,
        tag: 'Chic',
        theme: 'rose',
        keyIngredients: 'Rose Gold Metallic Pigment',
        keyBenefit: 'Fashion-forward romantic metallic hue',
      },
    ];
  }

  // 27. Scalp toppers
  if (service.id === 'hair-extensions-scalp-toppers') {
    return [
      {
        id: 'hair-topper-12in',
        name: '2.5x5 inch Silk Base Topper (12 inches)',
        brand: 'UrgentLyfe Remy Hair',
        rating: 4.87,
        reviews: '3K',
        description: 'Natural hairline cover with 100% human hair, free scalp parting & seamless silicone clips.',
        price: 6499,
        originalPrice: 7999,
        durationMinutes: 60,
        tag: 'Popular',
        theme: 'purple',
        keyIngredients: '100% Virgin Remy Human Hair',
        keyBenefit: 'Instant volume for crown thinning with realistic scalp parting',
      },
      {
        id: 'hair-topper-16in',
        name: '3x5 inch Silk Base Topper (16 inches)',
        brand: 'UrgentLyfe Remy Hair',
        rating: 4.89,
        reviews: '1.5K',
        description: 'Medium length topper delivering instant volume and density around crown & temples.',
        price: 8499,
        originalPrice: 9999,
        durationMinutes: 60,
        tag: 'Best Value',
        theme: 'purple',
        keyIngredients: 'Multi-Directional Silk Base',
        keyBenefit: 'Bends naturally with medium-length hairstyles',
      },
      {
        id: 'hair-topper-20in',
        name: '4x5 inch Broad Parting Topper (20 inches)',
        brand: 'UrgentLyfe Remy Hair',
        rating: 4.92,
        reviews: '800',
        description: 'Extra long flowing human hair topper covering broad crown thinning effortlessly.',
        price: 11999,
        originalPrice: 13999,
        durationMinutes: 75,
        theme: 'gold',
        keyIngredients: '100% Cuticle-Intact Remy Hair',
        keyBenefit: 'Full-density lush volume for long hair transformations',
      },
    ];
  }

  // Fallback variant
  return [
    {
      id: `${service.id}-standard`,
      name: service.title,
      brand: 'UrgentLyfe Studio',
      rating: service.rating,
      reviews: `${service.reviewCount ? Math.round(service.reviewCount / 1000) : 10}K`,
      description: service.description || service.subtitle || 'Expert hair salon service at your home doorstep.',
      price: service.price,
      originalPrice: service.originalPrice,
      durationMinutes: service.durationMinutes || 45,
      theme: 'purple',
    },
  ];
}

export const HairStudioOptionsModal: React.FC<HairStudioOptionsModalProps> = ({
  service,
  isOpen,
  onClose,
  onSelectOption,
  cartItems = [],
  onUpdateCartQuantity,
}) => {
  const [activeReviewTab, setActiveReviewTab] = useState<'detailed' | 'area' | 'frequent'>('detailed');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);

  const variants = getHairVariants(service);

  if (!isOpen) return null;

  const handleAddVariant = (variant: HairOptionVariant) => {
    const customized: ServiceItem = {
      ...service,
      id: variant.id,
      title: `${service.title} (${variant.name})`,
      price: variant.price,
      originalPrice: variant.originalPrice,
      durationMinutes: variant.durationMinutes,
      description: variant.description,
    };
    onSelectOption(customized);
  };

  // Determine Category Theme & Banner Content
  const isPackages = service.categoryId === 'hair-packages' || service.id.startsWith('hair-pkg');
  const isColor =
    service.id.includes('colour') ||
    service.id.includes('majirel') ||
    service.id.includes('inoa') ||
    service.id.includes('highlights') ||
    service.id.includes('balayage');
  const isKeratinBotox =
    service.id.includes('keratin') ||
    service.id.includes('botox');
  const isHaircut =
    service.id.includes('cut') ||
    service.id.includes('trim');
  const isSpaMassage =
    service.id.includes('spa') ||
    service.id.includes('massage');
  const isBlowdryStyling =
    service.id.includes('blowdry') ||
    service.id.includes('styling') ||
    service.id.includes('curls') ||
    service.id.includes('straightening');
  const isTopper =
    service.id.includes('toppers') ||
    service.id.includes('extensions');

  const filteredReviews = HAIR_REVIEWS_DATA.filter((r) => r.category === activeReviewTab);
  const reviewsToDisplay = showAllReviews ? filteredReviews : filteredReviews.slice(0, 3);

  // Total quantity of this service in cart
  const totalInCart = variants.reduce((acc, v) => {
    const item = cartItems.find((ci) => ci.service.id === v.id);
    return acc + (item ? item.quantity : 0);
  }, 0);

  const totalCartAmount = variants.reduce((acc, v) => {
    const item = cartItems.find((ci) => ci.service.id === v.id);
    return acc + (item ? item.quantity * v.price : 0);
  }, 0);

  return (
    <div
      id="hair-studio-options-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl lg:max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] border border-slate-200/80 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-30 w-9 h-9 bg-white/90 hover:bg-white text-slate-700 hover:text-slate-950 rounded-full shadow-md flex items-center justify-center transition-all cursor-pointer border border-slate-200/60 active:scale-90"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1 divide-y divide-slate-100">

          {/* ================================================================= */}
          {/* 1. DYNAMIC CATEGORY HEADER BANNER */}
          {/* ================================================================= */}
          {isPackages ? (
            <div className="relative bg-gradient-to-br from-[#2a133d] via-[#3b1754] to-[#1c0b2b] text-white p-6 sm:p-8 overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-purple-500/20 blur-2xl" />
              <div className="relative z-10 max-w-md">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-400/20 text-purple-200 border border-purple-300/30 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                  All-In-One Makeover Packages
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                  Salon Haircut, Steam Spa & Finish Styling
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-purple-200">
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                    <Scissors className="w-3.5 h-3.5 text-purple-300" />
                    Bespoke Styling
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                    <Droplets className="w-3.5 h-3.5 text-purple-300" />
                    L\'Oréal Creambath Spa
                  </span>
                  <span className="flex items-center gap-1 bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded">
                    Save up to 25%
                  </span>
                </div>
              </div>
            </div>
          ) : isColor ? (
            <div className="relative bg-gradient-to-br from-[#2b101c] via-[#48122c] to-[#1a0812] text-white p-6 sm:p-8 overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-44 h-44 rounded-full bg-rose-500/20 blur-2xl" />
              <div className="relative z-10 max-w-md">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-400/20 text-rose-200 border border-rose-300/30 mb-2">
                  <Crown className="w-3.5 h-3.5 text-amber-300" />
                  L\'Oréal Professionnel Paris
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                  100% Grey Coverage & Ammonia-Free Inoa
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-rose-200">
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                    <CheckCheck className="w-3.5 h-3.5 text-rose-300" />
                    Sealed Salon Tubes
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                    Zero Scalp Staining
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                    ODS2 Oil Delivery
                  </span>
                </div>
              </div>
            </div>
          ) : isKeratinBotox ? (
            <div className="relative bg-gradient-to-br from-[#12192b] via-[#1c2744] to-[#0d121f] text-white p-6 sm:p-8 overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-44 h-44 rounded-full bg-blue-500/20 blur-2xl" />
              <div className="relative z-10 max-w-md">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-400/20 text-blue-200 border border-blue-300/30 mb-2">
                  <Flame className="w-3.5 h-3.5 text-blue-300" />
                  Intense Frizz Reversal
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                  Keratin Infusion & Botox Collagen Filler
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-blue-200">
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                    Formaldehyde Safe
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                    3-4 Months Silk Finish
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                    Thermal Heat Shield
                  </span>
                </div>
              </div>
            </div>
          ) : isSpaMassage ? (
            <div className="relative bg-gradient-to-br from-[#0c2419] via-[#163828] to-[#081811] text-white p-6 sm:p-8 overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-44 h-44 rounded-full bg-emerald-500/20 blur-2xl" />
              <div className="relative z-10 max-w-md">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 mb-2">
                  <Flower2 className="w-3.5 h-3.5 text-emerald-300" />
                  Scalp Wellness & Creambath
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                  L\'Oréal Hair Spa & Acupressure Head Massages
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-200">
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                    <Wind className="w-3.5 h-3.5 text-emerald-300" />
                    Hot Towel Steam
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                    Purifying Water Lily
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                    20 mins Temple Massage
                  </span>
                </div>
              </div>
            </div>
          ) : isTopper ? (
            <div className="relative bg-gradient-to-br from-[#2a1708] via-[#3d2410] to-[#1f0f04] text-white p-6 sm:p-8 overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-44 h-44 rounded-full bg-amber-500/20 blur-2xl" />
              <div className="relative z-10 max-w-md">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30 mb-2">
                  <Crown className="w-3.5 h-3.5 text-amber-300" />
                  100% Remy Human Hair
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                  Seamless Silk Scalp Toppers & Volume Clip-Ins
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-200">
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                    Real Scalp Parting
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                    Zero Damage Clips
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative bg-gradient-to-br from-[#1f162e] via-[#2f1f47] to-[#170e24] text-white p-6 sm:p-8 overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-44 h-44 rounded-full bg-purple-500/20 blur-2xl" />
              <div className="relative z-10 max-w-md">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-400/20 text-purple-200 border border-purple-300/30 mb-2">
                  <Scissors className="w-3.5 h-3.5 text-purple-300" />
                  Bespoke Hair Studio
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                  {service.title}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-purple-200">
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                    Autoclaved Shears
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                    Clean Floor Sweep
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                    5-Min Face Consultation
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* 2. HEADER DETAILS: RATING, DURATION & SUBTITLE */}
          {/* ================================================================= */}
          <div className="p-5 sm:p-6 bg-white space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  {service.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                  <span className="flex items-center gap-1 font-bold text-slate-800">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {service.rating}
                  </span>
                  <span>•</span>
                  <span>{service.reviewCount ? `${Math.round(service.reviewCount / 1000)}K reviews` : '18K reviews'}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-600 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {service.durationMinutes} mins
                  </span>
                </div>
              </div>

              {/* Verified Stylist Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200/80 text-purple-900 text-xs font-bold w-fit">
                <Award className="w-4 h-4 text-purple-700 shrink-0" />
                <span>UrgentLyfe Certified Hair Stylist</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {service.description || service.subtitle || 'Select from our tailored studio options below. Customized for your hair length and texture.'}
            </p>
          </div>

          {/* ================================================================= */}
          {/* 3. OPTION CARDS GRID (Rich Cards with Badges, Technique, Qty) */}
          {/* ================================================================= */}
          <div className="p-5 sm:p-6 space-y-4 bg-slate-50/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                Select Option ({variants.length} available)
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Prices inclusive of all taxes
              </span>
            </div>

            <div className={`grid gap-4 ${
              variants.length >= 3
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2'
            }`}>
              {variants.map((v) => {
                const inCart = cartItems.find((item) => item.service.id === v.id);
                const qty = inCart ? inCart.quantity : 0;
                const isSelected = qty > 0;

                // Color Theme Accents
                const borderClass = isSelected
                  ? 'border-purple-600 ring-2 ring-purple-600/20 bg-purple-50/30'
                  : 'border-slate-200 hover:border-purple-300 bg-white';

                return (
                  <div
                    key={v.id}
                    className={`rounded-2xl border transition-all duration-200 p-4 flex flex-col justify-between shadow-xs hover:shadow-md relative overflow-hidden ${borderClass}`}
                  >
                    {/* Top Visual Badge / Card Header */}
                    <div className="mb-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {v.brand && (
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                              {v.brand}
                            </span>
                          )}
                          {v.tag && (
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                              {v.tag}
                            </span>
                          )}
                        </div>

                        {/* Duration Chip */}
                        <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 shrink-0 bg-slate-100 px-1.5 py-0.5 rounded">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {v.durationMinutes}m
                        </span>
                      </div>

                      {/* Variant Name */}
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                        {v.name}
                      </h4>

                      {/* Rating */}
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500 shrink-0" />
                        <span className="font-bold text-slate-800">{v.rating || 4.8}</span>
                        <span>({v.reviews || '25K'})</span>
                      </div>

                      {/* Description */}
                      <p className="text-[11px] text-slate-600 leading-relaxed mt-2 line-clamp-2">
                        {v.description}
                      </p>

                      {/* Ingredients / Key Benefit Pill if available */}
                      {v.keyIngredients && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] text-slate-500 space-y-0.5">
                          <div className="font-semibold text-purple-900 flex items-center gap-1">
                            <Sparkle className="w-2.5 h-2.5 text-purple-600" />
                            <span>{v.keyIngredients}</span>
                          </div>
                          {v.keyBenefit && (
                            <div className="text-slate-600 flex items-center gap-1">
                              <Check className="w-2.5 h-2.5 text-emerald-600" />
                              <span>{v.keyBenefit}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom: Price & Stepper Button */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                      <div>
                        <div className="text-sm sm:text-base font-black text-slate-900">
                          ₹{v.price}
                        </div>
                        {v.originalPrice && v.originalPrice > v.price && (
                          <div className="text-[10px] text-slate-400 line-through">
                            ₹{v.originalPrice}
                          </div>
                        )}
                      </div>

                      {/* Action Button: Add or Stepper */}
                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => handleAddVariant(v)}
                          className="bg-white hover:bg-purple-50 text-purple-700 border-2 border-purple-600 px-3 py-1 rounded-xl font-black text-xs shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      ) : (
                        <div className="bg-purple-900 text-white rounded-xl flex items-center shadow-xs border border-purple-800">
                          <button
                            type="button"
                            onClick={() => onUpdateCartQuantity?.(v.id, -1)}
                            className="p-1 hover:bg-white/20 transition-colors rounded-l-xl cursor-pointer"
                            title="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-black">{qty}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateCartQuantity?.(v.id, 1)}
                            className="p-1 hover:bg-white/20 transition-colors rounded-r-xl cursor-pointer"
                            title="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
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
          {/* 4. DECIDE THE RIGHT HAIR SERVICE FOR YOU (Comparison Section) */}
          {/* ================================================================= */}
          <div className="p-5 sm:p-6 bg-slate-50/60 space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-700" />
              Decide the Right Hair Option for You
            </h3>

            {isColor ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Majirel Card */}
                <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">
                      CLASSIC SALON
                    </span>
                    <span className="text-xs font-bold text-slate-700">From ₹999</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">L\'Oréal Majirel</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Formulated with Ionène G & Incell. Delivers 100% opaque grey coverage on the most stubborn white roots with rich, uniform tonal depth.
                  </p>
                  <ul className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-amber-200/50">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                      100% white hair coverage
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                      High durability & rich pigment
                    </li>
                  </ul>
                </div>

                {/* Inoa Card */}
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded">
                      100% AMMONIA FREE
                    </span>
                    <span className="text-xs font-bold text-slate-700">From ₹1499</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">L\'Oréal Inoa ODS2</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Revolutionary Oil Delivery System (60% oil base). Completely odourless with zero eye stinging and maximum scalp comfort.
                  </p>
                  <ul className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-emerald-200/50">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                      No chemical fumes or stinging
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Maintains natural hair lipid balance
                    </li>
                  </ul>
                </div>
              </div>
            ) : isKeratinBotox ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Keratin Card */}
                <div className="rounded-2xl border border-purple-200 bg-purple-50/40 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-purple-800 bg-purple-200/60 px-2 py-0.5 rounded">
                      MAX SMOOTHING
                    </span>
                    <span className="text-xs font-bold text-slate-700">From ₹3999</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Keratin Protein Therapy</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Best for coarse, unruly, intensely frizzy hair. Chemical protein restructuring infuses hydrolyzed keratin deep into hair cuticles for a straight, smooth silk press.
                  </p>
                  <ul className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-purple-200/50">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Eliminates 95% curl & frizz
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Results last 3 to 4 months
                    </li>
                  </ul>
                </div>

                {/* Hair Botox Card */}
                <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-rose-800 bg-rose-200/60 px-2 py-0.5 rounded">
                      VOLUME & REPAIR
                    </span>
                    <span className="text-xs font-bold text-slate-700">From ₹4499</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Hair Botox Collagen Filler</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Non-chemical deep hydration filler enriched with caviar oil and hyaluronic acid. Reconstructs thinning, aging or bleach-damaged hair while preserving natural body and bounce.
                  </p>
                  <ul className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-rose-200/50">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Deep repair without flattening volume
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Seals split ends & rough cuticles
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-2">
                    1
                  </div>
                  <h5 className="font-bold text-xs text-slate-900">Bespoke Face Shape Analysis</h5>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Every session begins with a customized consultation adapting the look to your forehead, jawline and hair density.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-2">
                    2
                  </div>
                  <h5 className="font-bold text-xs text-slate-900">Authentic L\'Oréal Products</h5>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Zero local dilution. Sealed branded masques, serums and toners unsealed right before application.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-2">
                    3
                  </div>
                  <h5 className="font-bold text-xs text-slate-900">Spotless Floor Cleanup</h5>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Stylists place a floor drop sheet and vacuum all clipped hair before packing up, leaving zero home mess.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ================================================================= */}
          {/* 5. URGENTLYFE HAIR STUDIO SAFETY & HYGIENE PROMISE */}
          {/* ================================================================= */}
          <div className="p-5 sm:p-6 bg-purple-950 text-white space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <h3 className="font-black text-sm sm:text-base tracking-wide">
                UrgentLyfe Hair Studio Hygiene Promise
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <Scissors className="w-5 h-5 text-purple-300 mx-auto mb-1" />
                <div className="text-xs font-bold text-white">Autoclaved Shears</div>
                <div className="text-[10px] text-purple-200 mt-0.5">Medical UV sanitization</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <Droplets className="w-5 h-5 text-purple-300 mx-auto mb-1" />
                <div className="text-xs font-bold text-white">100% Sealed Tubes</div>
                <div className="text-[10px] text-purple-200 mt-0.5">Genuine L\'Oréal packaging</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <div className="text-xs font-bold text-white">Single-Use Capes</div>
                <div className="text-[10px] text-purple-200 mt-0.5">Fresh disposable sheets</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <Sparkles className="w-5 h-5 text-purple-300 mx-auto mb-1" />
                <div className="text-xs font-bold text-white">Zero Floor Mess</div>
                <div className="text-[10px] text-purple-200 mt-0.5">Clean sweep & vacuum</div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 6. VERIFIED CUSTOMER REVIEWS WITH FILTER TABS */}
          {/* ================================================================= */}
          <div className="p-5 sm:p-6 space-y-4 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Customer Reviews
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span className="flex items-center gap-1 font-bold text-slate-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    4.83 out of 5
                  </span>
                  <span>•</span>
                  <span>Based on 140K+ verified bookings</span>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setActiveReviewTab('detailed');
                    setShowAllReviews(false);
                  }}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeReviewTab === 'detailed'
                      ? 'bg-white text-purple-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Detailed
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveReviewTab('area');
                    setShowAllReviews(false);
                  }}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeReviewTab === 'area'
                      ? 'bg-white text-purple-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  In My Area
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveReviewTab('frequent');
                    setShowAllReviews(false);
                  }}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeReviewTab === 'frequent'
                      ? 'bg-white text-purple-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Frequent Users
                </button>
              </div>
            </div>

            {/* Reviews Cards List */}
            <div className="space-y-3">
              {reviewsToDisplay.map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-purple-200 text-purple-900 font-black text-xs flex items-center justify-center">
                        {r.author[0]}
                      </div>
                      <div>
                        <span className="font-bold text-xs text-slate-900">{r.author}</span>
                        <div className="text-[10px] text-slate-400">{r.date}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] font-semibold text-purple-800 bg-purple-50 px-2 py-0.5 rounded w-fit">
                    {r.serviceTag}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    "{r.text}"
                  </p>
                </div>
              ))}
            </div>

            {filteredReviews.length > 3 && (
              <button
                type="button"
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="w-full py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                {showAllReviews ? 'Show fewer reviews' : `View all ${filteredReviews.length} reviews`}
              </button>
            )}
          </div>

          {/* ================================================================= */}
          {/* 7. FREQUENTLY ASKED QUESTIONS (Accordion) */}
          {/* ================================================================= */}
          <div className="p-5 sm:p-6 space-y-3 bg-slate-50/40">
            <h3 className="text-base font-black text-slate-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-2">
              {HAIR_FAQS_DATA.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl bg-white overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-4 py-3 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-purple-700 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-3.5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 8. STICKY MODAL FOOTER WITH CART SUMMARY */}
        {/* ================================================================= */}
        <div className="px-5 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between gap-4 z-20">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-medium">
                {totalInCart > 0
                  ? `${totalInCart} hair option${totalInCart > 1 ? 's' : ''} in cart`
                  : 'Select options to add'}
              </span>
              {totalCartAmount > 0 && (
                <span className="text-sm sm:text-base font-black text-slate-900">
                  Total: ₹{totalCartAmount}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-purple-900 hover:bg-purple-950 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
