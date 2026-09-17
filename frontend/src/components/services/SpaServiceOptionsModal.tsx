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
  CheckCheck,
  Heart,
  Volume2,
  Smile,
} from 'lucide-react';
import { ServiceItem, CartItem } from '../../types';
import { handleImageError } from '../../utils/imageFallback';

export interface SpaOptionVariant {
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

interface SpaServiceOptionsModalProps {
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

const SPA_REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'spa-rev-1',
    author: 'Priyanka Sen',
    date: 'Sep 12, 2025',
    serviceTag: 'For: 75 mins Stress relief Swedish massage • Lavender aroma',
    rating: 5,
    text: 'Pooja was exceptional! She arrived on time with a completely sealed kit, laid down disposable sheets on my bed, and set up a soothing lavender aroma diffuser with soft spa music. Her pressure was perfect throughout the 75 mins. My neck and shoulder stiffness completely vanished. Highly recommend! 🥰',
    category: 'detailed',
  },
  {
    id: 'spa-rev-2',
    author: 'Ananya Deshmukh',
    date: 'Sep 14, 2025',
    serviceTag: 'For: 90 mins Deep tissue massage • Eucalyptus muscle recovery',
    rating: 5,
    text: 'I had severe back knots from working 12-hour desk shifts. Deepa applied firm trigger point pressure on my shoulder blades and lower spine. The eucalyptus oil gave a warm soothing sensation. Woke up the next morning feeling 10 years lighter!',
    category: 'area',
  },
  {
    id: 'spa-rev-3',
    author: 'Kavita Sundaram',
    date: 'Sep 15, 2025',
    serviceTag: 'For: 90 mins Post natal restorative care with belly wrap',
    rating: 5,
    text: 'Sunita is a certified maternity specialist and it shows. She was so gentle yet effective with my abdominal muscles and lower back aches. The warm herbal compress and belly wrapping felt divine after months of nursing strain.',
    category: 'detailed',
  },
  {
    id: 'spa-rev-4',
    author: 'Meenakshi Iyer',
    date: 'Sep 16, 2025',
    serviceTag: 'For: 60 mins Senior comfort massage • Mahanarayan warm oil',
    rating: 5,
    text: 'Booked this for my 68-year-old mother who suffers from knee joint pain. The therapist, Aarti, was exceptionally patient, polite, and gentle. She used warm Mahanarayan oil and my mother had the best uninterrupted night of sleep in months.',
    category: 'detailed',
  },
  {
    id: 'spa-rev-5',
    author: 'Rhea Kapoor',
    date: 'Sep 18, 2025',
    serviceTag: 'For: 90 mins Robusta coffee body scrub & Swedish massage',
    rating: 5,
    text: 'The coffee scrub smelled intoxicating! It removed all dead skin and tan, followed by the smoothest almond oil massage. My skin feels like silk and glowing even 5 days later.',
    category: 'frequent',
  },
  {
    id: 'spa-rev-6',
    author: 'Bhavna Sharma',
    date: 'Sep 18, 2025',
    serviceTag: 'For: 60 mins Swedish + 20 mins Foot reflexology',
    rating: 5,
    text: 'UrgentLyfe spa at home is way better than luxury hotel spas. Zero travel hassle, single-use sealed sheets, and the foot acupressure with cooling peppermint cream melted all calf fatigue away.',
    category: 'frequent',
  },
  {
    id: 'spa-rev-7',
    author: 'Shalini Verma',
    date: 'Sep 19, 2025',
    serviceTag: 'For: 40 mins Back relief massage • Lumbar focus',
    rating: 5,
    text: 'Quick, targeted, and highly effective. In just 40 mins, my persistent lower back spasm was relieved. The hot towel compress at the end was wonderful.',
    category: 'area',
  },
  {
    id: 'spa-rev-8',
    author: 'Dr. Radhika Menon',
    date: 'Sep 20, 2025',
    serviceTag: 'For: 100 mins Royal Top-to-toe luxury massage',
    rating: 5,
    text: 'As a surgeon standing for long hours, I book UrgentLyfe every 2 weeks. The consistency in therapist quality and hygiene standards is outstanding. 5 stars without hesitation.',
    category: 'frequent',
  },
];

export function getSpaVariants(service: ServiceItem): SpaOptionVariant[] {
  // 1. STRESS RELIEF: Swedish massage (3 options)
  if (service.id === 'spa-stress-relief-swedish') {
    return [
      {
        id: 'spa-swedish-60m',
        name: '60 mins Swedish massage',
        brand: 'UrgentLyfe Aromatherapy',
        rating: 4.81,
        reviews: '210K reviews',
        description: 'Standard 60 mins full body relaxing Swedish strokes with warm essential lavender aroma oil.',
        price: 1319,
        originalPrice: 1599,
        durationMinutes: 60,
        tag: 'Starts at ₹1319',
        theme: 'purple',
        keyIngredients: 'Pure French Lavender & Sweet Almond',
        keyBenefit: 'Soothes nervous system & improves sleep',
      },
      {
        id: 'spa-swedish-75m',
        name: '75 mins Swedish massage (Extended)',
        brand: 'UrgentLyfe Aromatherapy',
        rating: 4.84,
        reviews: '85K reviews',
        description: '75 mins immersive full body session with extra 15 mins dedicated to upper back, neck & shoulders.',
        price: 1549,
        originalPrice: 1849,
        durationMinutes: 75,
        tag: 'Most Popular',
        theme: 'purple',
        keyIngredients: 'Lavender & Cold-Pressed Sesame Oil',
        keyBenefit: 'Extra focus on desk-fatigue shoulder knots',
      },
      {
        id: 'spa-swedish-90m',
        name: '90 mins Swedish massage (Complete)',
        brand: 'UrgentLyfe Aromatherapy',
        rating: 4.86,
        reviews: '45K reviews',
        description: '90 mins deep relaxation covering crown to soles with warm lavender soothing oil and hot towel compress.',
        price: 1799,
        originalPrice: 2199,
        durationMinutes: 90,
        tag: 'Best Value',
        theme: 'purple',
        keyIngredients: 'Lavender, Chamomile & Warm Sesame',
        keyBenefit: 'Complete head-to-toe sensory tranquility',
      },
    ];
  }

  // 2. PAIN RELIEF: Deep tissue massage (3 options)
  if (service.id === 'spa-deep-tissue') {
    return [
      {
        id: 'spa-deep-tissue-60m',
        name: '60 mins Deep tissue massage',
        brand: 'Deep Recovery Pro',
        rating: 4.80,
        reviews: '150K reviews',
        description: 'Firm trigger-point pressure on stubborn muscle knots, tight shoulder blades & lower back.',
        price: 1469,
        originalPrice: 1799,
        durationMinutes: 60,
        tag: 'Starts at ₹1469',
        theme: 'green',
        keyIngredients: 'Steam-Distilled Nilgiri Eucalyptus',
        keyBenefit: 'Dissolves deep muscle knots & lactic acid',
      },
      {
        id: 'spa-deep-tissue-75m',
        name: '75 mins Deep tissue massage (Extended)',
        brand: 'Deep Recovery Pro',
        rating: 4.83,
        reviews: '55K reviews',
        description: 'Extended 75 mins session with focused myofascial release for lower back, glutes & hamstrings.',
        price: 1729,
        originalPrice: 2099,
        durationMinutes: 75,
        tag: 'Most Popular',
        theme: 'green',
        keyIngredients: 'Eucalyptus, Wintergreen & Camphor',
        keyBenefit: 'Deep myofascial release for intense tension',
      },
      {
        id: 'spa-deep-tissue-90m',
        name: '90 mins Deep tissue massage (Complete)',
        brand: 'Deep Recovery Pro',
        rating: 4.85,
        reviews: '32K reviews',
        description: 'Comprehensive 90 mins recovery session to eliminate chronic tightness, spasms & post-workout fatigue.',
        price: 1999,
        originalPrice: 2399,
        durationMinutes: 90,
        tag: 'Maximum Knot Relief',
        theme: 'green',
        keyIngredients: 'Eucalyptus, Arnica & Warm Herbal Oil',
        keyBenefit: 'Complete musculoskeletal reset & recovery',
      },
    ];
  }

  // 3. STRESS RELIEF: Swedish with foot massage (2 options)
  if (service.id === 'spa-swedish-with-foot') {
    return [
      {
        id: 'spa-sw-foot-80m',
        name: '80 mins: 60m Swedish + 20m Foot Reflexology',
        brand: 'UrgentLyfe Combo',
        rating: 4.82,
        reviews: '15K reviews',
        description: 'Full body relaxing Swedish strokes paired with targeted foot sole acupressure for tired feet.',
        price: 1769,
        originalPrice: 1869,
        durationMinutes: 80,
        tag: 'Value Saver',
        theme: 'cyan',
        keyIngredients: 'Lavender Oil & Peppermint Foot Balm',
        keyBenefit: 'Relieves tired calves & stimulates reflex points',
      },
      {
        id: 'spa-sw-foot-100m',
        name: '100 mins: 75m Swedish + 25m Deep Foot Acupressure',
        brand: 'UrgentLyfe Combo',
        rating: 4.86,
        reviews: '8K reviews',
        description: 'Extended full body Swedish relaxation with intensive foot sole massage and warm hot towel compress.',
        price: 2099,
        originalPrice: 2399,
        durationMinutes: 100,
        tag: 'Ultimate Comfort',
        theme: 'cyan',
        keyIngredients: 'Lavender, Camphor & Peppermint',
        keyBenefit: 'Deep foot nerve relaxation & body de-stress',
      },
    ];
  }

  // 4. STRESS RELIEF: Swedish with head & shoulder massage (2 options)
  if (service.id === 'spa-swedish-with-head-shoulder') {
    return [
      {
        id: 'spa-sw-head-80m',
        name: '80 mins: 60m Swedish + 20m Head & Shoulder',
        brand: 'UrgentLyfe Combo',
        rating: 4.81,
        reviews: '12K reviews',
        description: 'Full body Swedish strokes with dedicated cervical spine, upper trapezius & scalp acupressure.',
        price: 1769,
        originalPrice: 1999,
        durationMinutes: 80,
        tag: 'Headache & Neck Relief',
        theme: 'amber',
        keyIngredients: 'Warm Almond & Lavender Scalp Oil',
        keyBenefit: 'Clears mental fog and releases neck stiffness',
      },
      {
        id: 'spa-sw-head-100m',
        name: '100 mins: 70m Swedish + 30m Ayurvedic Brahmi Scalp Care',
        brand: 'UrgentLyfe Combo',
        rating: 4.87,
        reviews: '9K reviews',
        description: 'Complete body massage paired with Ayurvedic Brahmi oil scalp therapy for profound sleep and mental calm.',
        price: 2149,
        originalPrice: 2499,
        durationMinutes: 100,
        tag: 'Sleep Induction',
        theme: 'amber',
        keyIngredients: 'Brahmi, Bhringraj & Warm Sesame',
        keyBenefit: 'Deeply nourishes hair roots & eliminates insomnia',
      },
    ];
  }

  // 5. STRESS RELIEF: Top-to-toe stress relief (2 options)
  if (service.id === 'spa-top-to-toe-stress-relief') {
    return [
      {
        id: 'spa-ttt-90m',
        name: '90 mins Top-to-Toe Stress Relief',
        brand: 'UrgentLyfe Signature',
        rating: 4.83,
        reviews: '64K reviews',
        description: 'Full body customized massage covering back, legs, arms, soothing head massage & foot reflexology.',
        price: 1929,
        originalPrice: 2299,
        durationMinutes: 90,
        tag: 'Starts at ₹1929',
        theme: 'gold',
        keyIngredients: 'Multi-Aroma Botanical Elixir',
        keyBenefit: '360° head-to-toe tension elimination',
      },
      {
        id: 'spa-ttt-120m',
        name: '120 mins Royal Head-to-Toe Luxury Spa',
        brand: 'UrgentLyfe Signature',
        rating: 4.88,
        reviews: '28K reviews',
        description: 'Complete 2-hour royal ritual: full body massage, deep scalp acupressure, foot care & warm herbal compress.',
        price: 2499,
        originalPrice: 2999,
        durationMinutes: 120,
        tag: 'Luxury Indulgence',
        theme: 'gold',
        keyIngredients: 'Warm Herbal Potli & Pure Essential Oils',
        keyBenefit: 'Unmatched 2-hour full-body renewal',
      },
    ];
  }

  // 6. PAIN RELIEF: Deep tissue with foot massage (2 options)
  if (service.id === 'spa-deep-tissue-with-foot') {
    return [
      {
        id: 'spa-dt-foot-80m',
        name: '80 mins: 60m Deep Tissue + 20m Foot Reflexology',
        brand: 'Deep Recovery Pro',
        rating: 4.82,
        reviews: '15K reviews',
        description: 'Intense knot-busting back & shoulder strokes combined with foot reflexology to relieve calf tiredness.',
        price: 1898,
        originalPrice: 1998,
        durationMinutes: 80,
        tag: 'Athlete & Desk Pick',
        theme: 'green',
        keyIngredients: 'Nilgiri Eucalyptus & Peppermint',
        keyBenefit: 'Eliminates muscle knots and leg heaviness',
      },
      {
        id: 'spa-dt-foot-100m',
        name: '100 mins: 75m Deep Tissue + 25m Intensive Foot Recovery',
        brand: 'Deep Recovery Pro',
        rating: 4.85,
        reviews: '7K reviews',
        description: 'Extended deep pressure therapy for lower back and hamstrings with deep heel & arch acupressure.',
        price: 2249,
        originalPrice: 2499,
        durationMinutes: 100,
        tag: 'Full Recovery',
        theme: 'green',
        keyIngredients: 'Eucalyptus, Wintergreen & Camphor',
        keyBenefit: 'Total lower body & spinal tension release',
      },
    ];
  }

  // 7. PAIN RELIEF: Back relief massage (2 options)
  if (service.id === 'spa-back-relief') {
    return [
      {
        id: 'spa-back-40m',
        name: '40 mins Targeted Lumbar & Spine Relief',
        brand: 'Spine & Lumbar Care',
        rating: 4.84,
        reviews: '12K reviews',
        description: 'Focuses on lower back, spine column & shoulder blades to ease sitting fatigue and posture ache.',
        price: 929,
        originalPrice: 1199,
        durationMinutes: 40,
        tag: 'Starts at ₹929',
        theme: 'amber',
        keyIngredients: 'Warm Herbal Muscle Relief Oil',
        keyBenefit: 'Fast targeted spinal spasm relief',
      },
      {
        id: 'spa-back-60m',
        name: '60 mins Back, Neck & Shoulder Intensive + Hot Towel',
        brand: 'Spine & Lumbar Care',
        rating: 4.88,
        reviews: '8K reviews',
        description: 'Extended deep tissue strokes covering entire dorsal chain with warm hot-towel compress for lumbar comfort.',
        price: 1249,
        originalPrice: 1549,
        durationMinutes: 60,
        tag: 'Most Recommended',
        theme: 'amber',
        keyIngredients: 'Wintergreen, Eucalyptus & Warm Compress',
        keyBenefit: 'Deep spinal decompression & knot dissolving',
      },
    ];
  }

  // 8. SKIN CARE SCRUBS: Full body massage & scrub (3 options)
  if (service.id === 'spa-full-body-scrub') {
    return [
      {
        id: 'spa-scrub-coffee-90m',
        name: '90 mins Robusta Coffee Glow & Relaxing Massage',
        brand: 'Skin Glow Polish',
        rating: 4.84,
        reviews: '18K reviews',
        description: '30 mins freshly ground Robusta coffee dead skin exfoliation followed by 60 mins soothing oil massage.',
        price: 1699,
        originalPrice: 2299,
        durationMinutes: 90,
        tag: 'Bestseller Glow',
        theme: 'amber',
        keyIngredients: 'Robusta Coffee & Raw Cane Sugar',
        keyBenefit: 'Boosts microcirculation & leaves skin glowing',
      },
      {
        id: 'spa-scrub-rose-90m',
        name: '90 mins Ayurvedic Rose Petal & Walnut Polish',
        brand: 'Skin Glow Polish',
        rating: 4.86,
        reviews: '11K reviews',
        description: 'Micro-walnut beads and pure rose water scrub to remove deep tan, followed by 60 mins aroma oil massage.',
        price: 1849,
        originalPrice: 2449,
        durationMinutes: 90,
        tag: 'Velvet Skin',
        theme: 'rose',
        keyIngredients: 'Rose Hydrosol & Walnut Granules',
        keyBenefit: 'Ultra-gentle tan removal & silky soft texture',
      },
      {
        id: 'spa-scrub-himalayan-105m',
        name: '105 mins Himalayan Pink Salt Detox & Deep Massage',
        brand: 'Skin Glow Polish',
        rating: 4.89,
        reviews: '6K reviews',
        description: 'Mineral-rich Himalayan pink salt full-body buffing followed by 75 mins nourishing warm shea oil massage.',
        price: 2199,
        originalPrice: 2799,
        durationMinutes: 105,
        tag: 'Luxury Detox',
        theme: 'rose',
        keyIngredients: 'Himalayan Pink Salt & Pure Shea Oil',
        keyBenefit: 'Deep pore detoxification & radiant luminosity',
      },
    ];
  }

  // 9. POST NATAL: Post natal massage (2 options)
  if (service.id === 'spa-post-natal') {
    return [
      {
        id: 'spa-postnatal-60m',
        name: '60 mins Post Natal Gentle Circulation & Tone',
        brand: 'Maternity Certified',
        rating: 4.84,
        reviews: '5K reviews',
        description: 'Gentle maternity strokes to reduce water retention, tone abdominal muscles & relieve nursing shoulder strain.',
        price: 1369,
        originalPrice: 1799,
        durationMinutes: 60,
        tag: 'Starts at ₹1369',
        theme: 'rose',
        keyIngredients: 'Warm Sesame & Ayurvedic Herbal Decoction',
        keyBenefit: 'Reduces post-delivery swelling & fatigue',
      },
      {
        id: 'spa-postnatal-90m',
        name: '90 mins Post Natal Complete Care + Belly Wrap',
        brand: 'Maternity Certified',
        rating: 4.88,
        reviews: '3.2K reviews',
        description: 'Full maternity therapy including warm herbal potli compress, pelvic comfort strokes & traditional belly wrap.',
        price: 1899,
        originalPrice: 2399,
        durationMinutes: 90,
        tag: 'Complete Maternity Care',
        theme: 'rose',
        keyIngredients: 'Warm Herbal Potli, Sesame & Almond Oil',
        keyBenefit: 'Supports uterine involution & lumbar strength',
      },
    ];
  }

  // 10. ELDERLY CARE: Elderly care massage (2 options)
  if (service.id === 'spa-elderly-care') {
    return [
      {
        id: 'spa-elderly-60m',
        name: '60 mins Senior Gentle Comfort Full Body Massage',
        brand: 'Senior Wellness Pro',
        rating: 4.85,
        reviews: '4K reviews',
        description: 'Light-pressure full body soothing strokes with warm Mahanarayan oil to ease joints & promote restful sleep.',
        price: 1399,
        originalPrice: 1799,
        durationMinutes: 60,
        tag: 'Starts at ₹1399',
        theme: 'gold',
        keyIngredients: 'Warm Ayurvedic Mahanarayan Joint Oil',
        keyBenefit: 'Eases stiff joints & calms nervous system',
      },
      {
        id: 'spa-elderly-45m',
        name: '45 mins Gentle Joint Mobility & Knee Care',
        brand: 'Senior Wellness Pro',
        rating: 4.87,
        reviews: '2.1K reviews',
        description: 'Focused passive range of motion rotations for knees, hips & shoulders with warm herbal compress.',
        price: 1199,
        originalPrice: 1499,
        durationMinutes: 45,
        tag: 'Mobility Boost',
        theme: 'gold',
        keyIngredients: 'Mahanarayan Oil & Warm Compress',
        keyBenefit: 'Improves knee flexibility and walking ease',
      },
    ];
  }

  // 11. ADD-ONS: Scrub add-on (2 options)
  if (service.id === 'spa-scrub-addon') {
    return [
      {
        id: 'spa-addon-scrub-coffee',
        name: 'Robusta Coffee & Brown Sugar Scrub (20 mins)',
        brand: 'Skin Glow Polish',
        rating: 4.85,
        reviews: '7.5K reviews',
        description: 'Antioxidant-rich coffee grounds to buff away dead skin, increase circulation and leave skin glowing.',
        price: 499,
        originalPrice: 649,
        durationMinutes: 20,
        tag: 'Most Popular',
        theme: 'amber',
        keyIngredients: 'Robusta Coffee & Cane Sugar',
        keyBenefit: 'Rapid exfoliation & tan removal',
      },
      {
        id: 'spa-addon-scrub-rose',
        name: 'Ayurvedic Rose Petal & Walnut Granule Scrub (20 mins)',
        brand: 'Skin Glow Polish',
        rating: 4.86,
        reviews: '4.5K reviews',
        description: 'Gentle micro-walnut exfoliating beads with pure rose water hydrosol for silky soft radiance.',
        price: 599,
        originalPrice: 749,
        durationMinutes: 20,
        tag: 'Gentle Polish',
        theme: 'rose',
        keyIngredients: 'Rose Hydrosol & Walnut Granules',
        keyBenefit: 'Velvety smooth skin with zero irritation',
      },
    ];
  }

  // 12. ADD-ONS: Foot massage (2 options)
  if (service.id === 'spa-foot-massage') {
    return [
      {
        id: 'spa-foot-20m',
        name: '20 mins Reflexology with Cooling Peppermint',
        brand: 'Foot Reflexology Pro',
        rating: 4.81,
        reviews: '28K reviews',
        description: 'Micro-movements targeting pressure points on soles to relieve calf fatigue and swelling.',
        price: 549,
        originalPrice: 699,
        durationMinutes: 20,
        tag: 'Quick Relief',
        theme: 'cyan',
        keyIngredients: 'Peppermint & Camphor Cooling Cream',
        keyBenefit: 'Instantly revives tired, aching feet',
      },
      {
        id: 'spa-foot-35m',
        name: '35 mins Deep Foot & Calf Acupressure + Hot Towel',
        brand: 'Foot Reflexology Pro',
        rating: 4.87,
        reviews: '12K reviews',
        description: 'Extended plantar fascia work, Achilles tendon stretching and hot towel wipe.',
        price: 799,
        originalPrice: 999,
        durationMinutes: 35,
        tag: 'Intensive Foot Care',
        theme: 'cyan',
        keyIngredients: 'Peppermint, Wintergreen & Hot Towel',
        keyBenefit: 'Relieves plantar fascia tightness & leg cramps',
      },
    ];
  }

  // Fallback 2-variant structure
  return [
    {
      id: `${service.id}-standard`,
      name: `Standard ${service.title}`,
      brand: 'UrgentLyfe Spa at Home',
      rating: service.rating || 4.82,
      reviews: `${service.reviewCount ? Math.round(service.reviewCount / 1000) : 25}K reviews`,
      description: service.subtitle || service.description,
      price: service.price,
      originalPrice: service.originalPrice,
      durationMinutes: service.durationMinutes || 60,
      theme: 'purple',
      tag: 'Standard',
      keyIngredients: 'Cold-Pressed Botanical Oil',
      keyBenefit: 'Muscle relaxation & stress relief',
    },
    {
      id: `${service.id}-extended`,
      name: `Extended Session: ${service.title}`,
      brand: 'UrgentLyfe Spa at Home',
      rating: 4.88,
      reviews: '18K reviews',
      description: 'Adds extra 20 minutes for deeper trigger-point release and warm hot-towel compress.',
      price: Math.round(service.price * 1.3),
      originalPrice: Math.round((service.originalPrice || service.price) * 1.4),
      durationMinutes: (service.durationMinutes || 60) + 20,
      theme: 'gold',
      tag: 'Recommended',
      keyIngredients: 'Warm Herbal Essential Oil & Hot Towel',
      keyBenefit: 'Deep tissue decompression & prolonged tranquility',
    },
  ];
}

export const SpaServiceOptionsModal: React.FC<SpaServiceOptionsModalProps> = ({
  service,
  isOpen,
  onClose,
  onSelectOption,
  cartItems = [],
  onUpdateCartQuantity,
}) => {
  if (!isOpen) return null;

  // Active reviews tab
  const [activeReviewTab, setActiveReviewTab] = useState<'detailed' | 'area' | 'frequent'>('detailed');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Category detection flags
  const isSwedish =
    service.id.includes('swedish') ||
    service.title.toLowerCase().includes('swedish') ||
    service.id.includes('stress-relief') ||
    service.id.includes('quick-comfort');

  const isDeepTissue =
    service.id.includes('deep-tissue') ||
    service.title.toLowerCase().includes('deep tissue');

  const isPostNatal =
    service.id.includes('post-natal') ||
    service.title.toLowerCase().includes('post natal');

  const isElderly =
    service.id.includes('elderly') ||
    service.title.toLowerCase().includes('elderly');

  const isScrub =
    service.id.includes('scrub') ||
    service.title.toLowerCase().includes('scrub');

  const isFoot =
    service.id.includes('foot') ||
    service.title.toLowerCase().includes('foot');

  const isBack =
    service.id.includes('back') ||
    service.title.toLowerCase().includes('back');

  const variants = getSpaVariants(service);

  // Helper to check item quantity in cart
  const getVariantQuantity = (variantId: string) => {
    const item = cartItems.find((ci) => ci.service.id === variantId);
    return item ? item.quantity : 0;
  };

  const handleAddVariant = (variant: SpaOptionVariant) => {
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

  const filteredReviews = SPA_REVIEWS_DATA.filter((rev) => {
    if (activeReviewTab === 'detailed') return rev.category === 'detailed' || rev.rating >= 4;
    if (activeReviewTab === 'area') return rev.category === 'area';
    if (activeReviewTab === 'frequent') return rev.category === 'frequent';
    return true;
  });

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, 4);

  // Dynamic banner data matching massage therapy type
  const getBannerDetails = () => {
    if (isDeepTissue) {
      return {
        tagline1: 'Deep pressure.',
        tagline2: 'Knot release.',
        tagline3: 'Zero muscle fatigue.',
        bg: 'bg-[#f0fdf4] border-emerald-100',
        textColor: 'text-emerald-950',
        type: 'deeptissue',
      };
    }
    if (isPostNatal) {
      return {
        tagline1: 'Certified maternity care.',
        tagline2: 'Gentle abdominal recovery.',
        tagline3: 'Safe & nurturing.',
        bg: 'bg-[#fffbeb] border-amber-100',
        textColor: 'text-amber-950',
        type: 'postnatal',
      };
    }
    if (isElderly) {
      return {
        tagline1: 'Gentle joint mobility.',
        tagline2: 'Warm Mahanarayan oil.',
        tagline3: 'Elder-friendly comfort.',
        bg: 'bg-[#fefce8] border-yellow-200/60',
        textColor: 'text-amber-950',
        type: 'elderly',
      };
    }
    if (isScrub) {
      return {
        tagline1: 'Exfoliating polish.',
        tagline2: 'Natural botanical beads.',
        tagline3: 'Radiant silky skin.',
        bg: 'bg-[#fff7ed] border-orange-100',
        textColor: 'text-orange-950',
        type: 'scrub',
      };
    }
    if (isFoot) {
      return {
        tagline1: 'Pressure-point reflexology.',
        tagline2: 'Peppermint cooling.',
        tagline3: 'Tired soles relief.',
        bg: 'bg-[#ecfeff] border-cyan-100',
        textColor: 'text-cyan-950',
        type: 'foot',
      };
    }
    if (isBack) {
      return {
        tagline1: 'Spinal column relief.',
        tagline2: 'Hot compress comfort.',
        tagline3: 'Ease posture ache.',
        bg: 'bg-[#faf5ff] border-purple-100',
        textColor: 'text-purple-950',
        type: 'back',
      };
    }
    // Default Swedish / Stress relief
    return {
      tagline1: 'Gentle strokes.',
      tagline2: 'Calming lavender aroma.',
      tagline3: 'Restorative deep sleep.',
      bg: 'bg-[#faf5ff] border-purple-100',
      textColor: 'text-purple-950',
      type: 'swedish',
    };
  };

  const banner = getBannerDetails();

  const faqs = [
    {
      q: 'Do I need to arrange or prepare anything beforehand?',
      a: 'Not at all! Your certified UrgentLyfe female therapist brings a complete sealed kit including disposable single-use bedsheets, pillow covers, headbands, portable aroma diffuser, and soothing spa music speaker. You just need a quiet room with a bed or floor mattress.',
    },
    {
      q: 'Are male clients or cross-gender massages allowed?',
      a: 'UrgentLyfe maintains a strict female-only therapist and female-only client policy for all women’s spa services to ensure complete comfort, security, and privacy at all times.',
    },
    {
      q: 'Can I customize the pressure during the session?',
      a: 'Absolutely! Our therapists check with you at the start and throughout the massage to ensure the pressure is exactly how you like it — whether gentle relaxing Swedish or firm trigger-point knot release.',
    },
    {
      q: 'What type of oils are used in the massage?',
      a: 'We use 100% pure, cold-pressed botanical oils (such as sweet almond, virgin sesame, French lavender, and steam-distilled eucalyptus) packed in single-use sealed bottles. No synthetic mineral oils or artificial fragrances.',
    },
  ];

  return (
    <div
      id="spa-service-options-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog Window */}
      <div className="relative w-full max-w-2xl lg:max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] border border-slate-200/80 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-white/90 hover:bg-white text-slate-700 hover:text-slate-950 rounded-full shadow-md flex items-center justify-center transition-all cursor-pointer border border-slate-200/60 active:scale-90"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
          {/* ================================================================= */}
          {/* 1. TOP HEADER BANNER (Dynamic based on Category) */}
          {/* ================================================================= */}
          <div className={`relative overflow-hidden border-b ${banner.bg}`}>
            <div className="p-6 sm:p-8 flex items-center justify-between gap-4">
              <div className="space-y-1 z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 border border-slate-200/60 text-[10px] font-black uppercase tracking-wider text-purple-900 shadow-2xs mb-1">
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  <span>UrgentLyfe Spa at Home</span>
                </div>
                <h2 className={`text-xl sm:text-2xl font-black tracking-tight leading-snug ${banner.textColor}`}>
                  {banner.tagline1}
                  <br />
                  {banner.tagline2}
                  <br />
                  {banner.tagline3}
                </h2>
              </div>

              {/* Dynamic Header Illustration Artwork */}
              {banner.type === 'swedish' && (
                <div className="relative w-36 sm:w-44 h-24 sm:h-28 shrink-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-purple-100 border border-purple-300 shadow-inner flex flex-col items-center justify-center relative">
                    <Droplets className="w-8 h-8 text-purple-700 animate-pulse" />
                    <span className="text-[8px] font-black uppercase text-purple-900 mt-1">Lavender</span>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-[9px] font-black shadow-sm">
                      Zzz
                    </div>
                  </div>
                </div>
              )}

              {banner.type === 'deeptissue' && (
                <div className="relative w-36 sm:w-44 h-24 sm:h-28 shrink-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-emerald-100 border border-emerald-300 shadow-inner flex flex-col items-center justify-center relative">
                    <Flame className="w-8 h-8 text-emerald-700" />
                    <span className="text-[8px] font-black uppercase text-emerald-900 mt-1">Deep Relief</span>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[8px] font-black shadow-sm">
                      Pro
                    </div>
                  </div>
                </div>
              )}

              {banner.type === 'postnatal' && (
                <div className="relative w-36 sm:w-44 h-24 sm:h-28 shrink-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-amber-100 border border-amber-300 shadow-inner flex flex-col items-center justify-center relative">
                    <Heart className="w-8 h-8 text-amber-700" />
                    <span className="text-[8px] font-black uppercase text-amber-900 mt-1">Maternity</span>
                  </div>
                </div>
              )}

              {banner.type === 'elderly' && (
                <div className="relative w-36 sm:w-44 h-24 sm:h-28 shrink-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-yellow-100 border border-yellow-300 shadow-inner flex flex-col items-center justify-center relative">
                    <HeartHandshake className="w-8 h-8 text-amber-800" />
                    <span className="text-[8px] font-black uppercase text-amber-900 mt-1">Senior Care</span>
                  </div>
                </div>
              )}

              {banner.type === 'scrub' && (
                <div className="relative w-36 sm:w-44 h-24 sm:h-28 shrink-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-orange-100 border border-orange-300 shadow-inner flex flex-col items-center justify-center relative">
                    <Flower2 className="w-8 h-8 text-orange-700" />
                    <span className="text-[8px] font-black uppercase text-orange-900 mt-1">Skin Polish</span>
                  </div>
                </div>
              )}

              {banner.type === 'foot' && (
                <div className="relative w-36 sm:w-44 h-24 sm:h-28 shrink-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-cyan-100 border border-cyan-300 shadow-inner flex flex-col items-center justify-center relative">
                    <Wind className="w-8 h-8 text-cyan-700" />
                    <span className="text-[8px] font-black uppercase text-cyan-900 mt-1">Reflexology</span>
                  </div>
                </div>
              )}

              {banner.type === 'back' && (
                <div className="relative w-36 sm:w-44 h-24 sm:h-28 shrink-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-purple-100 border border-purple-300 shadow-inner flex flex-col items-center justify-center relative">
                    <ShieldCheck className="w-8 h-8 text-purple-700" />
                    <span className="text-[8px] font-black uppercase text-purple-900 mt-1">Spine Focus</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ================================================================= */}
          {/* 2. TITLE & RATING BAR */}
          {/* ================================================================= */}
          <div className="p-5 sm:p-6 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h1 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  {service.title}
                </h1>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-600">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span className="font-bold text-slate-900">{service.rating || 4.82}</span>
                  <span className="text-slate-500">
                    ({service.reviewCount ? (service.reviewCount / 1000).toFixed(0) : '315'}K bookings)
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-purple-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Female therapists only
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold shrink-0">
                <Crown className="w-3.5 h-3.5 text-purple-600" />
                <span>UrgentLyfe Promise</span>
              </div>
            </div>

            {/* =============================================================== */}
            {/* 3. OPTION CARDS GRID (Responsive layout matching Salon modal) */}
            {/* =============================================================== */}
            <div
              className={`mt-6 grid gap-4 ${
                variants.length > 2
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-2'
              }`}
            >
              {variants.map((v) => {
                const qty = getVariantQuantity(v.id);
                const discount = v.originalPrice
                  ? Math.round(((v.originalPrice - v.price) / v.originalPrice) * 100)
                  : 0;

                return (
                  <div
                    key={v.id}
                    className={`rounded-2xl border transition-all p-4 flex flex-col justify-between bg-white relative overflow-hidden ${
                      qty > 0
                        ? 'border-purple-600 ring-2 ring-purple-600/20 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs'
                    }`}
                  >
                    {/* Visual Card Header */}
                    <div className="h-24 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between p-3 relative overflow-hidden mb-3">
                      {/* Left: Duration Badge */}
                      <div className="flex flex-col gap-1 z-10">
                        <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-purple-600" />
                          <span>{v.durationMinutes} mins</span>
                        </span>
                        {v.brand && (
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                            {v.brand}
                          </span>
                        )}
                      </div>

                      {/* Right: Theme Emblem */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-xs border ${
                          v.theme === 'green'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : v.theme === 'rose'
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : v.theme === 'amber'
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : v.theme === 'cyan'
                            ? 'bg-cyan-100 text-cyan-800 border-cyan-300'
                            : v.theme === 'gold'
                            ? 'bg-amber-50 text-amber-900 border-amber-300'
                            : 'bg-purple-100 text-purple-800 border-purple-200'
                        }`}
                      >
                        {v.theme === 'green' ? (
                          <Flame className="w-5 h-5" />
                        ) : v.theme === 'rose' ? (
                          <Flower2 className="w-5 h-5" />
                        ) : v.theme === 'cyan' ? (
                          <Wind className="w-5 h-5" />
                        ) : (
                          <Droplets className="w-5 h-5" />
                        )}
                      </div>

                      {/* Top Tag Pill */}
                      {v.tag && (
                        <div className="absolute top-2 right-2">
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-900 text-white shadow-xs">
                            {v.tag}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Variant Information */}
                    <div className="space-y-2 flex-1">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                          {v.name}
                        </h4>
                      </div>

                      {/* Rating & Reviews */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-800">{v.rating || 4.84}</span>
                        <span>•</span>
                        <span>{v.reviews || '25K reviews'}</span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {v.description}
                      </p>

                      {/* Key Actives / Ingredients & Benefits */}
                      {(v.keyIngredients || v.keyBenefit) && (
                        <div className="space-y-1.5 pt-2 border-t border-slate-100">
                          {v.keyIngredients && (
                            <div className="flex items-start gap-1.5 text-[11px] text-slate-700">
                              <Droplets className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                              <span className="font-medium line-clamp-1">{v.keyIngredients}</span>
                            </div>
                          )}
                          {v.keyBenefit && (
                            <div className="flex items-start gap-1.5 text-[11px] text-emerald-800 bg-emerald-50/70 p-1.5 rounded-lg border border-emerald-100">
                              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="font-semibold line-clamp-1">{v.keyBenefit}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Price & Action Row */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-black text-slate-900">
                            ₹{v.price}
                          </span>
                          {v.originalPrice && v.originalPrice > v.price && (
                            <span className="text-xs text-slate-400 line-through">
                              ₹{v.originalPrice}
                            </span>
                          )}
                        </div>
                        {discount > 0 && (
                          <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                            {discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* Quantity Selector / Add Button */}
                      {qty > 0 ? (
                        <div className="flex items-center gap-2 border-2 border-purple-600 bg-purple-900 text-white px-3 py-1 rounded-xl text-xs font-black shadow-md">
                          <button
                            type="button"
                            onClick={() => {
                              if (onUpdateCartQuantity) onUpdateCartQuantity(v.id, -1);
                            }}
                            className="hover:text-purple-200 transition-colors p-0.5 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-1">{qty}</span>
                          <button
                            type="button"
                            onClick={() => {
                              if (onUpdateCartQuantity) onUpdateCartQuantity(v.id, 1);
                            }}
                            className="hover:text-purple-200 transition-colors p-0.5 cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAddVariant(v)}
                          className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-1.5 rounded-xl font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================================================================= */}
          {/* 4. DECIDE THE RIGHT MASSAGE FOR YOU (Contextual Comparison) */}
          {/* ================================================================= */}
          <div className="p-5 sm:p-6 bg-slate-50/50 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Decide the right massage for you
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Compare techniques, pressure levels, and oil bases tailored to your body
                </p>
              </div>
              <span className="hidden sm:inline-flex text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                100% Certified Therapists
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Swedish vs Deep Tissue comparison */}
              <div className="rounded-2xl border border-purple-200/80 bg-white p-5 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-purple-700 uppercase tracking-wide">
                    Swedish Massage
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    Light to Medium Pressure
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900">
                  Best for stress, desk anxiety & insomnia
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Long flowing gliding strokes with warm lavender aroma oil that stimulate blood circulation, relieve mental fatigue, and encourage deep restorative sleep.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Target: Full body circulation</span>
                  <span className="font-bold text-slate-800">Soothing finish</span>
                </div>
              </div>

              {/* Card 2: Deep Tissue comparison */}
              <div className="rounded-2xl border border-emerald-200/80 bg-white p-5 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-700 uppercase tracking-wide">
                    Deep Tissue Therapy
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Firm Trigger-Point Pressure
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900">
                  Best for stubborn knots & athletic soreness
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  High-pressure thumb and knuckle work targeting myofascial layers to break down lactic acid, relieve shoulder blade knots, and loosen tight lower backs.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Target: Chronic muscle stiffness</span>
                  <span className="font-bold text-slate-800">Knot release</span>
                </div>
              </div>
            </div>

            {/* Pure Therapeutic Oils Standard */}
            <div className="rounded-2xl border border-amber-200/80 bg-[#fffbeb] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-black text-amber-900">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>100% Pure Cold-Pressed Oils Guarantee</span>
                </div>
                <p className="text-xs text-amber-800/90 leading-relaxed">
                  We never use recycled or synthetic mineral oils. Each massage kit includes a sealed, tamper-evident bottle of cold-pressed oil formulated exclusively for UrgentLyfe.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="px-3 py-1.5 bg-white/90 rounded-xl border border-amber-200 text-center shadow-2xs">
                  <span className="text-[10px] font-extrabold text-amber-900 block">French Lavender</span>
                  <span className="text-[9px] text-slate-500">Calming</span>
                </div>
                <div className="px-3 py-1.5 bg-white/90 rounded-xl border border-amber-200 text-center shadow-2xs">
                  <span className="text-[10px] font-extrabold text-amber-900 block">Nilgiri Eucalyptus</span>
                  <span className="text-[9px] text-slate-500">Decongesting</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 5. URGENTLYFE SPA PROMISE & HYGIENE (What to expect) */}
          {/* ================================================================= */}
          <div className="p-5 sm:p-6 bg-white space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-700" />
              <h3 className="text-base font-black text-slate-900">
                UrgentLyfe Spa Hygiene & Safety Standards
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">100% Single-Use Linen</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Disposable bedsheet, pillow protector, headband & briefs unsealed in front of you.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">5-Star Spa Ambiance</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Therapist sets up a portable ultrasonic essential oil diffuser & soft ambient spa music.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Sealed Pure Oils</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Tamper-proof single-use bottles of cold-pressed oil ensuring total hygiene and purity.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Female Only & Verified</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Strict female-only policy. Background-verified professionals with 500+ training hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 6. AUTHENTIC REVIEWS SYSTEM */}
          {/* ================================================================= */}
          <div className="p-5 sm:p-6 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">Verified Customer Reviews</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span className="font-bold text-slate-900">4.82 out of 5</span>
                  <span>•</span>
                  <span>Based on 315,000+ bookings</span>
                </div>
              </div>
            </div>

            {/* Review Category Filter Tabs */}
            <div className="flex items-center gap-4 border-b border-slate-100 pb-2">
              <button
                type="button"
                onClick={() => setActiveReviewTab('detailed')}
                className={`text-xs font-black pb-1 px-1 transition-all cursor-pointer whitespace-nowrap ${
                  activeReviewTab === 'detailed'
                    ? 'text-purple-700 border-b-2 border-purple-700'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Detailed reviews
              </button>
              <button
                type="button"
                onClick={() => setActiveReviewTab('area')}
                className={`text-xs font-black pb-1 px-1 transition-all cursor-pointer whitespace-nowrap ${
                  activeReviewTab === 'area'
                    ? 'text-purple-700 border-b-2 border-purple-700'
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
                    ? 'text-purple-700 border-b-2 border-purple-700'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Frequent users
              </button>
            </div>

            {/* Reviews List */}
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
                <span>{showAllReviews ? 'Show less reviews' : 'Show all verified reviews'}</span>
                {showAllReviews ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 7. FREQUENTLY ASKED QUESTIONS (Accordion) */}
          {/* ================================================================= */}
          <div className="p-5 sm:p-6 bg-slate-50/50 space-y-3">
            <h3 className="text-base font-black text-slate-900">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {faqs.map((faq, i) => {
                const isOpen = openFaqIndex === i;
                return (
                  <div
                    key={i}
                    className="border border-slate-200 rounded-xl bg-white overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                      className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs font-extrabold text-slate-900 hover:text-purple-900 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-purple-700 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-3.5 pb-3.5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 8. MODAL BOTTOM FOOTER (Sticky) */}
        {/* =================================================================== */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
            <span className="hidden sm:inline">Single-use kits & disposable linen • 100% hygienic & private</span>
            <span className="sm:hidden">100% hygienic & private</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-xl text-xs font-black shadow-md cursor-pointer transition-all active:scale-95"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
