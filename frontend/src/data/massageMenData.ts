import { ServiceItem } from '../types';

export interface MassageMenSection {
  id: string;
  name: string;
  iconImage: string;
  banner?: {
    heading: string;
    subtitle: string;
    image: string;
  };
  services: ServiceItem[];
}

export const MASSAGE_MEN_SERVICES: ServiceItem[] = [
  // 1. Pain relief
  {
    id: 'men-massage-quick-comfort',
    categoryId: 'massage-men',
    title: 'Quick comfort therapy',
    subtitle: 'Includes: Back, neck & shoulder, head and feet/leg',
    price: 1199,
    originalPrice: 1499,
    discountPercent: 20,
    rating: 4.81,
    reviewCount: 24000,
    durationMinutes: 45,
    description:
      'Focus on tension areas / energy for stressed, fatigued body. Target back, neck & shoulder, head and feet/leg with customized medium-pressure strokes.',
    includes: [
      'Back, neck & shoulder tension relief',
      'Relaxing head and scalp acupressure',
      'Foot & calf tiredness alleviation',
      'Single-use sanitized hygiene kit and soothing essential oils',
    ],
    excludes: ['Deep orthopedic bone manipulation'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: true,
    urgentFee: 99,
    tags: ['BESTSELLER', 'Pain Relief', '45 mins'],
  },
  {
    id: 'men-massage-deep-tissue',
    categoryId: 'massage-men',
    title: 'Deep tissue pain relief massage',
    subtitle: 'Firm palm movements to ease muscle tightness & soreness',
    price: 1429,
    originalPrice: 1799,
    discountPercent: 21,
    rating: 4.83,
    reviewCount: 191000,
    durationMinutes: 60,
    description:
      'Firm palm movements to ease muscle tightness & soreness. Target deep muscle knots, chronic stress and back fatigue. Save more: Add a pack to unlock extra savings.',
    includes: [
      'Firm palm movements to ease muscle tightness & soreness',
      'Targeted deep tissue knot release on spine and upper traps',
      'Specialized warm therapeutic oil for deeper muscle penetration',
      'Save more: Add a pack to unlock extra savings',
    ],
    excludes: ['Medical orthopedic physical therapy'],
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: true,
    urgentFee: 99,
    tags: ['BESTSELLER', 'Deep Pressure', '60 mins', 'Pain Relief'],
  },
  {
    id: 'men-massage-leg-relief',
    categoryId: 'massage-men',
    title: 'Leg relief massage',
    subtitle: 'Customised massage with natural oils to alleviate leg pain',
    price: 919,
    originalPrice: 1199,
    discountPercent: 23,
    rating: 4.85,
    reviewCount: 19000,
    durationMinutes: 45,
    description:
      'Customised massage with natural oils to alleviate leg pain. Relieves calf tightness, sore hamstrings and swollen feet after long days.',
    includes: [
      'Customised massage with natural oils to alleviate leg pain',
      'Targeted calf and hamstring acupressure',
      'Foot arch reflexology to boost lower limb circulation',
      'Single-use sterile mat & warm towel wipe-down',
    ],
    excludes: ['Varicose vein surgical treatments'],
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: true,
    urgentFee: 99,
    tags: ['Leg Care', 'Natural Oils', '45 mins'],
  },

  // 2. Stress relief
  {
    id: 'men-massage-swedish-stress-relief',
    categoryId: 'massage-men',
    title: 'Swedish stress relief massage',
    subtitle: 'Full-body massage which improves blood circulation and sleep quality',
    price: 1299,
    originalPrice: 1699,
    discountPercent: 24,
    rating: 4.87,
    reviewCount: 129000,
    durationMinutes: 60,
    description:
      'Full-body massage which improves blood circulation and sleep quality. Gentle gliding strokes melt away mental exhaustion and bodily fatigue. Save more: Add a pack to unlock extra savings.',
    includes: [
      'Full-body massage which improves blood circulation and sleep quality',
      'Gentle to medium pressure continuous gliding strokes',
      'Pure soothing lavender & sesame essential oils',
      'Save more: Add a pack to unlock extra savings',
    ],
    excludes: ['Deep tissue heavy elbow pressure'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: true,
    urgentFee: 99,
    tags: ['BESTSELLER', 'Full Body', 'Stress Relief', '60 mins'],
  },
  {
    id: 'men-massage-top-to-toe',
    categoryId: 'massage-men',
    title: 'Top-to-toe stress relief massage',
    subtitle: 'Full body oil massage with scalp care & 20 min. foot reflexology',
    price: 1979,
    originalPrice: 2499,
    discountPercent: 21,
    rating: 4.83,
    reviewCount: 71000,
    durationMinutes: 80,
    description:
      'Full body oil massage with scalp care & 20 min. foot reflexology. A complete top-to-toe ritual for a longer, unhurried session.',
    includes: [
      'Full body oil massage with scalp care & 20 min. foot reflexology',
      'A complete top-to-toe ritual for a longer, unhurried session',
      'Warm aroma oil application with hot towel wrap',
      'Deep rejuvenation for mind, muscles, and soles',
    ],
    excludes: ['Medical orthopedic physical therapy'],
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: true,
    urgentFee: 99,
    tags: ['Complete Ritual', '80 mins', 'Top-to-Toe'],
  },

  // 3. Post workout
  {
    id: 'men-massage-sports-recovery',
    categoryId: 'massage-men',
    title: 'Sports recovery massage',
    subtitle: 'Full-body deep pressure massage with foam roller & targeted stretch sequence',
    price: 1769,
    originalPrice: 2199,
    discountPercent: 20,
    rating: 4.84,
    reviewCount: 60000,
    durationMinutes: 60,
    description:
      'Full-body deep pressure massage with foam roller & targeted stretch sequence. Designed for post a workout, working through stiff, overworked muscles.',
    includes: [
      'Full-body deep pressure massage with foam roller & targeted stretch sequence',
      'Designed for post a workout, working through stiff, overworked muscles',
      'Assisted athletic muscle stretches for back, glutes, and hamstrings',
      'Lactic acid flush and fast muscular recovery',
    ],
    excludes: ['Acute sports injury rehabilitation / fractures'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: true,
    urgentFee: 99,
    tags: ['Post Workout', 'Sports Recovery', 'Deep Stretch', '60 mins'],
  },

  // 4. Add-ons
  {
    id: 'men-massage-foot-addon',
    categoryId: 'massage-men',
    title: 'Foot massage',
    subtitle: 'Foot massage using micro-movements to target key pressure points / relaxes feet',
    price: 569,
    originalPrice: 699,
    discountPercent: 19,
    rating: 4.86,
    reviewCount: 41000,
    durationMinutes: 25,
    description:
      'Foot massage using micro-movements to target key pressure points / relaxes feet. Focused thumb and palm pressure on soles and ankles.',
    includes: [
      'Foot massage using micro-movements to target key pressure points',
      'Reflexology movements for sole, arch, and heel relief',
      'Warm herbal foot wipe & soothing cream',
    ],
    excludes: ['Pedicure nail trimming'],
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: true,
    urgentFee: 99,
    tags: ['Add-on', 'Foot Care', '25 mins'],
  },
  {
    id: 'men-massage-head-neck-shoulder',
    categoryId: 'massage-men',
    title: 'Head, neck & shoulder massage',
    subtitle: 'Focused medium pressure massage for stiff neck & shoulder',
    price: 669,
    originalPrice: 799,
    discountPercent: 16,
    rating: 4.86,
    reviewCount: 43000,
    durationMinutes: 30,
    description:
      'Focused medium pressure massage for stiff neck & shoulder. Relieves muscle tightness & leaves you refreshed.',
    includes: [
      'Focused medium pressure massage for stiff neck & shoulder',
      'Relieves muscle tightness & leaves you refreshed',
      'Acupressure relief for desk workers & chronic neck stiffness',
    ],
    excludes: ['Full spinal chiropractic adjustment'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: true,
    urgentFee: 99,
    tags: ['Add-on', 'Neck & Shoulder', '30 mins'],
  },
  {
    id: 'men-massage-head-addon',
    categoryId: 'massage-men',
    title: 'Head massage',
    subtitle: 'Relaxing head massage with oil / stress relief',
    price: 369,
    originalPrice: 499,
    discountPercent: 26,
    rating: 4.84,
    reviewCount: 24000,
    durationMinutes: 20,
    description:
      'Relaxing head massage with oil / stress relief. Calming circular scalp massage with cooling Ayurvedic oils to ease mental fatigue.',
    includes: [
      'Relaxing head massage with oil / stress relief',
      'Acupressure temple and crown relaxation',
      'Relieves headache pressure and tension',
    ],
    excludes: ['Hair wash and blow-dry'],
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: true,
    urgentFee: 99,
    tags: ['Add-on', 'Head Massage', '20 mins'],
  },
  {
    id: 'men-massage-hot-bed',
    categoryId: 'massage-men',
    title: 'Hot bed',
    subtitle: 'Enhanced heat therapy for relaxation / Maintains temperature / Relieves stiffness',
    price: 149,
    originalPrice: 249,
    discountPercent: 40,
    rating: 4.83,
    reviewCount: 8000,
    durationMinutes: 15,
    description:
      'Enhanced heat therapy for relaxation / Maintains temperature / Relieves stiffness & tension from muscles throughout the massage.',
    includes: [
      'Enhanced heat therapy for relaxation',
      'Maintains optimal soothing body temperature throughout session',
      'Relieves stiffness & tension from muscles',
    ],
    excludes: ['Sauna steam bath'],
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    isUrgentAvailable: true,
    urgentFee: 99,
    tags: ['Add-on', 'Thermal Comfort', 'Heat Therapy'],
  },
];

export const MASSAGE_MEN_SECTIONS: MassageMenSection[] = [
  {
    id: 'pain-relief',
    name: 'Pain relief',
    iconImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=240&q=80',
    banner: {
      heading: 'Instant comfort for tired muscles',
      subtitle: 'Medium pressure • Key body spots',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80',
    },
    services: [
      MASSAGE_MEN_SERVICES[0], // Quick comfort therapy
      MASSAGE_MEN_SERVICES[1], // Deep tissue pain relief massage
      MASSAGE_MEN_SERVICES[2], // Leg relief massage
    ],
  },
  {
    id: 'stress-relief',
    name: 'Stress relief',
    iconImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=240&q=80',
    banner: {
      heading: 'Let go of that built-up stress',
      subtitle: 'Medium pressure • Full body',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    },
    services: [
      MASSAGE_MEN_SERVICES[3], // Swedish stress relief massage
      MASSAGE_MEN_SERVICES[4], // Top-to-toe stress relief massage
    ],
  },
  {
    id: 'post-workout',
    name: 'Post workout',
    iconImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=240&q=80',
    banner: {
      heading: 'Post workout',
      subtitle: 'Sports recovery & deep muscle rehabilitation',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80',
    },
    services: [
      MASSAGE_MEN_SERVICES[5], // Sports recovery massage
    ],
  },
  {
    id: 'add-ons',
    name: 'Add-ons',
    iconImage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=240&q=80',
    services: [
      MASSAGE_MEN_SERVICES[6], // Foot massage
      MASSAGE_MEN_SERVICES[7], // Head, neck & shoulder massage
      MASSAGE_MEN_SERVICES[8], // Head massage
      MASSAGE_MEN_SERVICES[9], // Hot bed
    ],
  },
];
