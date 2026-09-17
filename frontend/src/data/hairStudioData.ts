import { ServiceItem } from '../types';

export interface HairStudioCategory {
  id: string;
  name: string;
  thumbnailUrl: string;
  services: ServiceItem[];
  promoBanner?: {
    title: string;
    subtitle?: string;
    imageUrl: string;
    badge?: string;
    videoUrl?: string;
  };
}

export const HAIR_STUDIO_CONFIG = {
  title: 'Hair Studio for Women',
  rating: 4.78,
  reviewsCount: '2.2 M bookings',
  heroVideo: {
    title: 'Transform your look with certified hair artists',
    subtitle: 'From trend-forward precision cuts to salon-grade global coloring & keratin',
    videoThumbnail: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80',
  },
  guideBanner: {
    title: 'UrgentLyfe Guide - Professionals and Hairstyles',
    subtitle: 'Find your perfect hair length, color tone & styling professional',
  },
  coupon: {
    code: 'HAIRSTUDIO25',
    discount: '25% off on hair services',
  },
  promiseList: [
    'Verified Professionals',
    'Hassle Free Booking',
    'Transparent Pricing',
  ],
};

export const HAIR_STUDIO_SERVICES: ServiceItem[] = [
  // --- PACKAGES ---
  {
    id: 'hair-pkg-cut-spa-style',
    categoryId: 'hair-studio-women',
    title: 'Cut, trim, spa & style',
    subtitle: 'Haircut + Ayurvedic strengthening spa',
    description: 'Comprehensive hair rejuvenation package including customized haircut, deep nourishment hair spa and finishing style.',
    price: 1698,
    originalPrice: 1848,
    durationMinutes: 105,
    rating: 4.81,
    reviewCount: 374000,
    badge: 'VALUE-SAVER',
    tags: ['Value Saver', '10% OFF', 'Packages'],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Haircut or trim: Haircut',
      'Hair spa: Ayurvedic strengthening spa',
    ],
    optionsCount: 3,
  },
  {
    id: 'hair-pkg-cut-style',
    categoryId: 'hair-studio-women',
    title: 'Cut, trim & style',
    subtitle: 'Haircut + Hair styling (Straightening)',
    description: 'Fresh haircut matched with professional thermal straightening for polished, sleek everyday styling.',
    price: 998,
    originalPrice: 1098,
    durationMinutes: 90,
    rating: 4.81,
    reviewCount: 308000,
    badge: 'VALUE-SAVER',
    tags: ['Value Saver', '10% OFF', 'Packages'],
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Haircut or trim: Haircut',
      'Hair styling: Straightening',
    ],
    optionsCount: 2,
  },
  {
    id: 'hair-pkg-cut-spa-style-colour',
    categoryId: 'hair-studio-women',
    title: 'Cut, trim, spa, style, colour (roots touch up)',
    subtitle: 'Haircut + L\'Oreal hair spa + Roots touch up + Styling',
    description: 'Full hair revival package covering expert cut, L\'Oréal nourishing spa, grey-coverage root touch-up and finish blow-dry/curling.',
    price: 2172,
    originalPrice: 2397,
    durationMinutes: 150,
    rating: 4.80,
    reviewCount: 402000,
    badge: 'VALUE-SAVER',
    tags: ['Value Saver', '15% OFF', 'Packages'],
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Haircut or trim: Haircut',
      'Hair spa: L\'Oreal hair spa',
      'Hair styling: Straightening / Curling',
    ],
    optionsCount: 4,
  },
  {
    id: 'hair-pkg-cut-botox-keratin',
    categoryId: 'hair-studio-women',
    title: 'Haircut & botox/keratin',
    subtitle: 'Haircut + Long length keratin / botox infusion',
    description: 'Eliminate 95% frizz with long-lasting salon keratin or botox treatment followed by a precision shape haircut.',
    price: 5248,
    originalPrice: 5648,
    durationMinutes: 225,
    rating: 4.81,
    reviewCount: 180000,
    badge: 'VALUE-SAVER',
    tags: ['Value Saver', 'Packages'],
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Keratin: Long length',
      'Haircut or trim: Haircut',
    ],
    optionsCount: 3,
  },
  {
    id: 'hair-pkg-cut-color',
    categoryId: 'hair-studio-women',
    title: 'Haircut & color',
    subtitle: 'Roots: Color (L\'Oreal Inoa/Majirel) + Haircut',
    description: 'Ammonia-free root touch up with Dark Brown shade 3 combined with custom haircut and style.',
    price: 2697,
    originalPrice: 2847,
    durationMinutes: 105,
    rating: 4.80,
    reviewCount: 105000,
    badge: 'VALUE-SAVER',
    tags: ['Value Saver', '15% OFF', 'Packages'],
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Roots: Color (L\'Oreal Inoa): Shade 3: Dark brown',
      'Haircut or trim: Haircut',
    ],
    optionsCount: 3,
  },

  // --- BLOW-DRY & STYLE ---
  {
    id: 'hair-blowdry-in-out-curl',
    categoryId: 'hair-studio-women',
    title: 'In curl/out curl blow-dry',
    subtitle: 'Voluminous bouncy curls styled in or out',
    description: 'Beautiful curls, styled in or out, with a perfect blow-dry finish using ceramic round brushes.',
    price: 499,
    originalPrice: 599,
    durationMinutes: 45,
    rating: 4.78,
    reviewCount: 47000,
    tags: ['Blow-dry', 'Styling'],
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Shampoo wash is not included (must have clean damp hair)',
      'Heat protectant serum & long-lasting hold spray',
    ],
    optionsCount: 2,
  },
  {
    id: 'hair-blowdry-straight-smooth',
    categoryId: 'hair-studio-women',
    title: 'Straight & smooth blow-dry',
    subtitle: 'Sleek, glossy straight blow-dry finish',
    description: 'Sleek, smooth & straight hair with a professional blow-dry that adds mirror-like shine and frizz control.',
    price: 399,
    originalPrice: 499,
    durationMinutes: 45,
    rating: 4.80,
    reviewCount: 82000,
    tags: ['Blow-dry', 'Straightening'],
    image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Professional paddle brush technique with anti-frizz serum',
      'Suitable for all hair textures',
    ],
    optionsCount: 2,
  },
  {
    id: 'hair-advanced-styling',
    categoryId: 'hair-studio-women',
    title: 'Advanced Styling',
    subtitle: 'Bridal updos, messy buns, French braids & gala styling',
    description: 'Intricate occasion hairstyles crafted with professional pins, texturizers, and hair accessories.',
    price: 1000,
    originalPrice: 1200,
    durationMinutes: 60,
    rating: 4.75,
    reviewCount: 15000,
    tags: ['Occasion', 'Updos'],
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Consultation with reference photo',
      'Styling pins, hair donuts, setting spray included',
    ],
    optionsCount: 3,
  },
  {
    id: 'hair-straightening',
    categoryId: 'hair-studio-women',
    title: 'Hair straightening',
    subtitle: 'Thermal flat-iron sleek styling',
    description: 'Transform your hair into a sleek, straight look with long-lasting results using ceramic ion flat irons.',
    price: 549,
    originalPrice: 699,
    durationMinutes: 45,
    rating: 4.86,
    reviewCount: 20000,
    tags: ['Thermal', 'Sleek'],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Heat defence shield application',
      'Section-by-section flat iron glide',
    ],
    optionsCount: 2,
  },
  {
    id: 'hair-curls-waves',
    categoryId: 'hair-studio-women',
    title: 'Curls & waves',
    subtitle: 'Soft beach waves or defined spiral curls',
    description: 'Soft curls or waves for a natural, voluminous hairstyle using curling tongs and texturizing mist.',
    price: 549,
    originalPrice: 699,
    durationMinutes: 60,
    rating: 4.73,
    reviewCount: 17000,
    tags: ['Waves', 'Curls'],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Curling wand with heat shield protection',
      'Flexible finish hold spray for bounce',
    ],
    optionsCount: 2,
  },

  // --- CUT & TRIM ---
  {
    id: 'hair-cut-women',
    categoryId: 'hair-studio-women',
    title: 'Haircut for women',
    subtitle: 'Layers, feather, bob, blunt cut tailored to face shape',
    description: 'Expert haircut tailored to your style. Blow dry not included.',
    price: 549,
    originalPrice: 699,
    durationMinutes: 45,
    rating: 4.81,
    reviewCount: 140000,
    tags: ['Haircut', 'Women'],
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Face shape consultation and style recommendation',
      'Precision section cutting with sterilized professional shears',
    ],
    optionsCount: 2,
  },
  {
    id: 'hair-cut-girls',
    categoryId: 'hair-studio-women',
    title: 'Haircut for girls',
    subtitle: 'Gentle, neat haircut for ages 1 to 15 years',
    description: 'A gentle, stylish haircut with smooth precision for girls aged 1 to 15.',
    price: 449,
    originalPrice: 549,
    durationMinutes: 35,
    rating: 4.80,
    reviewCount: 21000,
    tags: ['Kids', 'Girls Haircut'],
    image: 'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Kid-friendly gentle handling with sterile comb and scissors',
      'Neat fringe / bangs trim or split-ends clean up',
    ],
    optionsCount: 2,
  },
  {
    id: 'hair-cut-mom-daughter',
    categoryId: 'hair-studio-women',
    title: 'Haircut for mom & daughter',
    subtitle: 'Twin styling session for both mother and daughter',
    description: 'Mother and daughter combo session with individual consultations, precision haircuts and quick finish styling.',
    price: 1049,
    originalPrice: 1199,
    durationMinutes: 120,
    rating: 4.80,
    reviewCount: 6000,
    tags: ['Combo', 'Mom & Daughter'],
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    includes: [
      '1 Adult Women haircut tailored to face profile',
      '1 Girl haircut (ages 1 to 15)',
    ],
    optionsCount: 2,
  },
  {
    id: 'hair-trim-split-ends',
    categoryId: 'hair-studio-women',
    title: 'Hair trim',
    subtitle: 'Split end removal without losing hair length',
    description: 'Split end removal with minimal length reduction. Blow dry not included.',
    price: 449,
    originalPrice: 549,
    durationMinutes: 20,
    rating: 4.80,
    reviewCount: 144000,
    tags: ['Trim', 'Split Ends'],
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Micro-trimming damaged ends to maintain healthy growth',
      'Keeps hair density intact without shortening overall length',
    ],
    optionsCount: 2,
  },

  // --- HAIR CARE ---
  {
    id: 'hair-spa-loreal',
    categoryId: 'hair-studio-women',
    title: 'L\'Oréal hair spa',
    subtitle: 'Deep nourishing scalp massage and steam infusion',
    description: 'Intense repair therapy to strengthen hair fibers, deep nourish hair and scalp.',
    price: 999,
    originalPrice: 1299,
    durationMinutes: 60,
    rating: 4.79,
    reviewCount: 98000,
    badge: 'BESTSELLER',
    tags: ['Hair Spa', 'Bestseller'],
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Deep cleansing & scalp nourishment with L\'Oréal Professionnel masque',
      'Steam & 20 mins restorative acupressure massage',
    ],
    optionsCount: 3,
  },
  {
    id: 'hair-head-massage',
    categoryId: 'hair-studio-women',
    title: 'Head massage',
    subtitle: 'Warm Ayurvedic scalp, neck and shoulder massage',
    description: 'Gentle massage to help promote blood flow, reduce stress & nourish the scalp. Hair wash & dry not included.',
    price: 349,
    originalPrice: 449,
    durationMinutes: 20,
    rating: 4.78,
    reviewCount: 39000,
    tags: ['Relaxation', 'Head Massage'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Warm nourishing almond/sesame oil application',
      'Hair wash & dry not included',
    ],
    optionsCount: 3,
  },

  // --- KERATIN & BOTOX ---
  {
    id: 'hair-keratin-treatment',
    categoryId: 'hair-studio-women',
    title: 'Hair keratin',
    subtitle: 'Keratin smoothing treatment for frizz-free mirror shine',
    description: 'Single-session treatment to repair damaged, frizzy hair & promote healthy scalp.',
    price: 3999,
    originalPrice: 4999,
    durationMinutes: 180,
    rating: 4.61,
    reviewCount: 9000,
    tags: ['Keratin', 'Smoothing'],
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Formaldehyde-safe premium keratin protein infusion',
      'Blow dry and ceramic flat-iron heat sealing for up to 3-4 months',
    ],
    optionsCount: 3,
  },
  {
    id: 'hair-botox-treatment',
    categoryId: 'hair-studio-women',
    title: 'Hair botox treatment',
    subtitle: 'Deep peptide conditioning to plump thinning strands',
    description: 'Non-chemical deep conditioning treatment that coats hair fibers with collagen and proteins to restore volume, elasticity and eliminate frizz.',
    price: 4499,
    originalPrice: 5499,
    durationMinutes: 210,
    rating: 4.68,
    reviewCount: 5500,
    tags: ['Botox', 'Restoration'],
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Hyaluronic acid and caviar oil hair filler masque',
      'Restores dull aging hair with 100% natural movement',
    ],
    optionsCount: 2,
  },

  // --- HAIR COLOUR ---
  {
    id: 'hair-colour-application-only',
    categoryId: 'hair-studio-women',
    title: 'Hair colour (application only)',
    subtitle: 'Expert application of customer provided color pack',
    description: 'Even application of the chosen shade from root to tip. Customer provides the hair color box.',
    price: 399,
    originalPrice: 499,
    durationMinutes: 45,
    rating: 4.80,
    reviewCount: 54000,
    tags: ['Application Only', 'Hair Color'],
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Professional sectioning and mess-free application from root to tips',
      'Disposable cape, gloves, ear caps & barrier cream applied',
    ],
    optionsCount: 7,
  },
  {
    id: 'hair-colour-loreal-global',
    categoryId: 'hair-studio-women',
    title: 'L\'Oréal Global color',
    subtitle: 'Full length uniform color with L\'Oréal Professionnel',
    description: 'Even application of the chosen shade from root to tip with ammonia-free L\'Oreal formulation.',
    price: 2399,
    originalPrice: 2899,
    durationMinutes: 60,
    rating: 4.64,
    reviewCount: 6000,
    tags: ['Global Color', 'L\'Oreal'],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    includes: [
      'L\'Oréal Professionnel color product included',
      'Shampoo & color lock conditioning treatment',
    ],
    optionsCount: 3,
  },
  {
    id: 'hair-colour-loreal-global-fashion',
    categoryId: 'hair-studio-women',
    title: 'L\'Oréal Global fashion hair colour',
    subtitle: 'Vibrant modern fashion tones (Burgundy, Copper, Caramel)',
    description: 'Vibrant fashion tones applied seamlessly with pre-lightening or direct deposit for rich multidimensional luster.',
    price: 2599,
    originalPrice: 3199,
    durationMinutes: 120,
    rating: 4.76,
    reviewCount: 1000,
    tags: ['Fashion Color', 'L\'Oreal'],
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Fashion shade selection consultation',
      'Color protection rinse and glossy blow dry',
    ],
    optionsCount: 3,
  },
  {
    id: 'hair-colour-loreal-root-touchup',
    categoryId: 'hair-studio-women',
    title: 'L\'Oréal root touch up',
    subtitle: 'Up to 2 inches grey coverage touch-up at crown and hairline',
    description: 'Hair wash not included. Base hair color of L\'Oreal Inoa or L\'Oreal Majirel will be used with fashion shade.',
    price: 999,
    originalPrice: 1199,
    durationMinutes: 45,
    rating: 4.69,
    reviewCount: 85000,
    tags: ['Root Touch Up', 'Grey Coverage'],
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Up to 2 inches regrowth coverage',
      'Hair wash not included',
    ],
    optionsCount: 3,
  },
  {
    id: 'hair-colour-loreal-majirel-touchup',
    categoryId: 'hair-studio-women',
    title: 'L\'Oréal Majirel root touch-up',
    subtitle: 'Deep, rich grey coverage with high shine Majirel',
    description: 'Hair wash not included. Base hair color of L\'Oreal Majirel will be used with chosen shade.',
    price: 1299,
    originalPrice: 1499,
    durationMinutes: 45,
    rating: 4.69,
    reviewCount: 62000,
    tags: ['Majirel', 'Root Touch Up'],
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80',
    includes: [
      '100% white hair coverage with Ionène G & Incell technology',
      'Hair wash not included',
    ],
    optionsCount: 3,
  },
  {
    id: 'hair-colour-loreal-inoa-touchup',
    categoryId: 'hair-studio-women',
    title: 'L\'Oréal Inoa root touch-up',
    subtitle: 'Ammonia-free ODS2 oil delivery system root touch-up',
    description: 'Hair wash not included. Odorless ammonia-free formula respecting scalp comfort and hair fibers.',
    price: 1499,
    originalPrice: 1799,
    durationMinutes: 45,
    rating: 4.69,
    reviewCount: 98000,
    tags: ['Inoa', 'Ammonia-Free'],
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80',
    includes: [
      '100% ammonia-free oil delivery system for maximum scalp comfort',
      'Hair wash not included',
    ],
    optionsCount: 3,
  },

  // --- FASHION COLOR ---
  {
    id: 'hair-highlights',
    categoryId: 'hair-studio-women',
    title: 'Highlights',
    subtitle: 'Foil streaks and dimensional highlights',
    description: 'Precise application of chosen shade on closely spaced sections. Blow dry & hair wash not included.',
    price: 3499,
    originalPrice: 4299,
    durationMinutes: 150,
    rating: 4.74,
    reviewCount: 12000,
    tags: ['Highlights', 'Streaks'],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Crown or full head sectioning with salon foils',
      'Blow dry & hair wash not included',
    ],
    optionsCount: 8,
  },
  {
    id: 'hair-balayage-ombre',
    categoryId: 'hair-studio-women',
    title: 'L\'Oréal balayage/ombre color',
    subtitle: 'Freehand painted gradient melt from darker roots to sun-kissed ends',
    description: 'Seamless application of the chosen shade with a soft color transition. Blow dry & hair wash is not included.',
    price: 3899,
    originalPrice: 4699,
    durationMinutes: 180,
    rating: 4.51,
    reviewCount: 1000,
    tags: ['Balayage', 'Ombre'],
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Customized freehand painting for natural transition',
      'Blow dry & hair wash is not included',
    ],
    optionsCount: 4,
  },

  // --- HAIR EXTENSIONS ---
  {
    id: 'hair-extensions-scalp-toppers',
    categoryId: 'hair-studio-women',
    title: 'Scalp toppers',
    subtitle: '100% human hair & silk base toppers by Hair Originals',
    description: 'Conceals thinning & bald patches on your scalp. 100% human hair & silk base toppers by Hair Originals.',
    price: 6499,
    originalPrice: 7999,
    durationMinutes: 60,
    rating: 4.82,
    reviewCount: 3000,
    tags: ['Extensions', 'Scalp Toppers'],
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=600&q=80',
    includes: [
      'Natural silk base that mimics real scalp and allows multi-directional parting',
      'Clip-in attachment with personalized blending and styling consultation',
    ],
    optionsCount: 3,
  },
];

export const HAIR_STUDIO_CATEGORIES: HairStudioCategory[] = [
  {
    id: 'packages',
    name: 'Packages',
    // Bookmark/ribbon icon visual style matching video
    thumbnailUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=150&q=80',
    services: HAIR_STUDIO_SERVICES.filter((s) => s.tags?.includes('Packages')),
  },
  {
    id: 'blow-dry-style',
    name: 'Blow-dry & style',
    thumbnailUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=150&q=80',
    services: HAIR_STUDIO_SERVICES.filter(
      (s) =>
        s.id.includes('blowdry') ||
        s.id.includes('straightening') ||
        s.id.includes('curls') ||
        s.id.includes('advanced-styling')
    ),
  },
  {
    id: 'cut-trim',
    name: 'Cut & trim',
    thumbnailUrl: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=150&q=80',
    services: HAIR_STUDIO_SERVICES.filter(
      (s) =>
        s.id.includes('cut-women') ||
        s.id.includes('cut-girls') ||
        s.id.includes('cut-mom-daughter') ||
        s.id.includes('trim-split-ends')
    ),
    promoBanner: {
      title: 'Precision cut crafted to frame your features',
      subtitle: 'Sterilized Japanese steel shears with zero tugging',
      imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80',
    },
  },
  {
    id: 'hair-care',
    name: 'Hair care',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=150&q=80',
    services: HAIR_STUDIO_SERVICES.filter(
      (s) => s.id.includes('spa-loreal') || s.id.includes('head-massage')
    ),
  },
  {
    id: 'keratin-botox',
    name: 'Keratin & botox',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=150&q=80',
    services: HAIR_STUDIO_SERVICES.filter(
      (s) => s.id.includes('keratin') || s.id.includes('botox')
    ),
  },
  {
    id: 'hair-colour',
    name: 'Hair colour',
    thumbnailUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=150&q=80',
    services: HAIR_STUDIO_SERVICES.filter(
      (s) =>
        s.id.includes('hair-colour') ||
        s.id.includes('root-touchup') ||
        s.id.includes('majirel') ||
        s.id.includes('inoa')
    ),
    promoBanner: {
      title: 'Get expert consultation',
      subtitle: 'Color specialists help match your skin undertones',
      imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1000&q=80',
    },
  },
  {
    id: 'fashion-color',
    name: 'Fashion color',
    thumbnailUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=150&q=80',
    services: HAIR_STUDIO_SERVICES.filter(
      (s) => s.id.includes('highlights') || s.id.includes('balayage')
    ),
  },
  {
    id: 'hair-extensions',
    name: 'Hair extensions',
    thumbnailUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=150&q=80',
    services: HAIR_STUDIO_SERVICES.filter((s) => s.id.includes('extensions')),
  },
];
