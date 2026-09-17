export interface ServiceReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  serviceTag: string;
  comment: string;
  helpfulCount?: number;
}

export interface IdealForScenario {
  title: string;
  image: string;
}

export interface ServiceTechnique {
  title: string;
  description: string;
  image: string;
}

export interface FocusZone {
  label: string;
  description: string;
}

export interface ServiceRichDetail {
  bannerTag: string;
  bannerHeadline: string;
  bannerSubtitle: string;
  bannerImage: string;
  idealFor: IdealForScenario[];
  whenToAvoid: string[];
  techniques: ServiceTechnique[];
  focusZones?: FocusZone[];
  consultationTitle: string;
  consultationDesc: string;
  consultationPoints: string[];
  consultationImage: string;
  includesSteps: {
    step: number;
    title: string;
    description: string;
    image?: string;
  }[];
  setupTitle: string;
  setupDimensions: string;
  setupImage: string;
  expertBadgeTitle: string;
  expertPoints: string[];
  expertImage: string;
  beforeYouBookGuidelines: string[];
  bestExperienceTip: string;
  reviews: ServiceReview[];
}

// Dedicated custom database for services
export const RICH_DETAILS_REGISTRY: Record<string, Partial<ServiceRichDetail>> = {
  // SALON PRIME: Niacinamide Derma Facial with Cryofacial Cold Therapy (From Video 1)
  'prime-derma-niacinamide': {
    bannerTag: 'NEW LAUNCH: DERMA FACIALS',
    bannerHeadline: 'Niacinamide + Cryofacial Cold Therapy (-5°C)',
    bannerSubtitle: 'Targeted depigmentation actives locked into pores with medical cryo-wand',
    bannerImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80',
    idealFor: [
      {
        title: 'Stubborn sun spots & post-acne blemishes',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Open enlarged pores & uneven skin tone',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Dull texture needing medical active infusion',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&auto=format&fit=crop&q=80',
      },
    ],
    whenToAvoid: [
      'Active cystic acne flare-up with open bleeding',
      'Recent chemical peel or laser treatment within 7 days',
    ],
    techniques: [
      {
        title: 'Ultrasonic active transdermal infusion',
        description: 'High-frequency acoustic vibrations push medical-grade Niacinamide serum deep into dermal layers.',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Cryofacial -5°C thermal lock & lymphatic drainage',
        description: 'Sub-zero cryo-wand contracts capillaries, shrinks pores, locks in active hydration, and tightens contours.',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&auto=format&fit=crop&q=80',
      },
    ],
    consultationTitle: 'Skin analysis & active suitability check',
    consultationDesc: 'Therapist uses a digital skin moisture meter to inspect sensitivity before customizing serum potency.',
    consultationPoints: ['Moisture & barrier test', 'Sensitivity analysis', 'Hyperpigmentation depth'],
    consultationImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80',
    includesSteps: [
      {
        step: 1,
        title: 'Double cleanse & enzyme exfoliation',
        description: 'Salicylic-infused foam removes dead stratum corneum and clears sebum blockages.',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 2,
        title: 'Gentle ultrasonic blackhead extraction',
        description: 'Sonic spatula removes comedones without squeezing, bruising, or skin redness.',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 3,
        title: '10% Niacinamide + Zinc PCA ampoule infusion',
        description: 'Single-use sealed glass ampoule applied with ultrasound probe for deep absorption.',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 4,
        title: 'Cryofacial Cold Therapy Probe (-5°C)',
        description: 'Chilled titanium wand glides over face to constrict pores and seal active serum.',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 5,
        title: 'Bio-Cellulose barrier repair sheet mask',
        description: 'Hydrating mask with cryo-ice globe massage to soothe, tone, and leave lasting radiance.',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80',
      },
    ],
    setupTitle: 'Derma Medical Machine & Sealed Monodose Kit',
    setupDimensions: 'Cryofacial -5°C Wand + Sealed Monodose Kit + Sanitized Headband & Capes',
    setupImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=80',
    expertBadgeTitle: 'Certified Clinical Aesthetician',
    expertPoints: [
      'CIDESCO / CIBTAC trained clinical aesthetician with 500+ supervised facial hours',
      'All ampoules & probes 100% sealed, sterile & single-use monodosages',
      'Zero-redness, zero-downtime glow guarantee',
    ],
    expertImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    beforeYouBookGuidelines: [
      'Ensure a clean table near a wall power socket for the Cryofacial probe device.',
      'Refrain from heavy retinol or AHA/BHA applications 24 hours prior to service.',
    ],
    bestExperienceTip: 'Keep your room cool and fan running so your skin remains chilled and relaxed throughout.',
    reviews: [
      {
        id: 'rev-derma-1',
        userName: 'Aanya Sharma',
        rating: 5,
        date: 'Sep 03, 2024',
        serviceTag: 'For Niacinamide depigmentation derma facial',
        comment: 'The Cryo-wand feeling was so cold and refreshing! You can literally see pore size shrink immediately after the probe touches your skin. Incredible glow!',
        helpfulCount: 68,
      },
      {
        id: 'rev-derma-2',
        userName: 'Pooja Iyer',
        rating: 5,
        date: 'Aug 30, 2024',
        serviceTag: 'For Niacinamide depigmentation derma facial',
        comment: 'My dark sun spots look noticeably lighter after just one session. Sealed single-dose ampoules were opened in front of me. Highly recommend!',
        helpfulCount: 45,
      },
    ],
  },

  // SALON LUXE: Forest Essentials Soundarya 24K Gold Facial (From Video 2)
  'luxe-forest-soundarya-gold': {
    bannerTag: 'FOREST ESSENTIALS LUXURIOUS AYURVEDA',
    bannerHeadline: 'Soundarya 24K Gold Age-Defying Facial',
    bannerSubtitle: 'Pure 24K gold bhasma, Kashmiri saffron & Ayurvedic kansa wand facial marma lift',
    bannerImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80',
    idealFor: [
      {
        title: 'Pre-bridal royal glow & special ceremonies',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Mature skin with fine lines & loss of firmness',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Deep rejuvenation through authentic Ayurveda',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80',
      },
    ],
    whenToAvoid: [
      'Severe active pustular acne',
      'Severe sunburn within 48 hours',
    ],
    techniques: [
      {
        title: 'Ayurvedic Kansa Wand Marma Acupressure',
        description: 'Traditional bronze alloy wand balances doshas, detoxifies lymph, and chisels jawline contour.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Soundarya 24K Gold Bhasma Silk Penetration',
        description: 'Nano gold particles stimulate collagen regeneration and provide royal lit-from-within radiance.',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&auto=format&fit=crop&q=80',
      },
    ],
    consultationTitle: 'Ayurvedic Prakriti & skin dosha assessment',
    consultationDesc: 'Therapist assesses skin balance (Vata/Pitta/Kapha) to personalize saffron hydrosol temperature and massage tempo.',
    consultationPoints: ['Prakriti balance', 'Texture sensitivity', 'Marma pressure preference'],
    consultationImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&auto=format&fit=crop&q=80',
    includesSteps: [
      {
        step: 1,
        title: 'Rosewater & Cow Ghee cleansing milk',
        description: 'Gentle floral nectar melts surface pollution while conditioning lipid moisture.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 2,
        title: 'Kashmiri Walnut & Sandalwood Gommage',
        description: 'Crushed walnut kernels polish texture without micro-tears, followed by rose hydrosol steam.',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 3,
        title: 'Soundarya 24K Gold Serum with Kansa Wand',
        description: 'Acupressure marma strokes using pure gold serum and bronze wand to drain puffiness and lift jawline.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 4,
        title: 'Tejasvi Emulsion facial marma massage',
        description: 'Deep nourishing herbal ghee emulsion massaged across face, neck, and shoulders.',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 5,
        title: 'Soundarya Radiance 24K Gold Peel-off mask',
        description: 'Precious gold mask locks in nutrients, revealing luminous skin that lasts for weeks.',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80',
      },
    ],
    setupTitle: 'Forest Essentials Salon Luxe Mat & Brass Kit',
    setupDimensions: 'Pure Forest Essentials Monodose Jars + Kansa Wand + Disposable Velvet Mat',
    setupImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&auto=format&fit=crop&q=80',
    expertBadgeTitle: 'Top Rated Luxe Beautician (4.88+ Rated)',
    expertPoints: [
      'Elite beauticians trained directly in Forest Essentials Ayurvedic treatment protocols',
      'Authentic sealed Forest Essentials retail-grade products opened right in front of you',
      'Complimentary relaxing head, neck & shoulder massage included',
    ],
    expertImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    beforeYouBookGuidelines: [
      'Keep a comfortable chair or recliner ready with good lighting.',
      'Therapist brings all necessary sanitized towels, bowls, kansa wand, and disposables.',
    ],
    bestExperienceTip: 'Savor the intoxicating natural aroma of real sandalwood and Kashmiri saffron during the facial.',
    reviews: [
      {
        id: 'rev-luxe-1',
        userName: 'Meenakshi Sundaram',
        rating: 5,
        date: 'Sep 02, 2024',
        serviceTag: 'For Soundarya 24K Gold age-defying facial',
        comment: 'Booked this for my sister’s engagement. The glow was breathtaking! The Kansa wand massage was so relaxing I fell asleep. Pure luxury!',
        helpfulCount: 82,
      },
      {
        id: 'rev-luxe-2',
        userName: 'Divya Nair',
        rating: 5,
        date: 'Aug 28, 2024',
        serviceTag: 'For Soundarya 24K Gold age-defying facial',
        comment: 'True Forest Essentials quality. Smells like heaven and my skin feels plump and baby soft days later. Worth every rupee.',
        helpfulCount: 54,
      },
    ],
  },

  // 1. SPA FOR WOMEN - LEG RELIEF MASSAGE (Exact matches from the video)
  'spa-w-leg-relief': {
    bannerTag: 'BODY MASSAGE',
    bannerHeadline: 'Eucalyptus & Clove Essential Oil',
    bannerSubtitle: 'Soothes sore muscles & alleviates joint pain',
    bannerImage: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=80',
    idealFor: [
      {
        title: 'Trekkers with calf soreness',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Post-workout muscle stiffness',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Strain from daily long commute',
        image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80',
      },
    ],
    whenToAvoid: [
      'Pregnancy',
      'Recent surgery or fractures',
      'Need deep pressure massage',
    ],
    techniques: [
      {
        title: 'Deep leg strokes with firm pressure to ease muscles',
        description: 'Long gliding strokes with warm essential oil along the quadriceps and hamstring channels.',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Targeted kneading loosens tight thighs, knees & ankle area',
        description: 'Thumb pressure and palm kneading on pressure points to release trapped lactic acid.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80',
      },
    ],
    focusZones: [
      { label: 'Glute', description: 'Upper hip tension release' },
      { label: 'Hamstring', description: 'Deep muscle flexibility release' },
      { label: 'Calf', description: 'Lactic acid drainage & ache relief' },
      { label: 'Ankle & Foot', description: 'Reflexology acupressure points' },
    ],
    consultationTitle: 'Pre-massage consultation',
    consultationDesc: "Tell our therapists about your preferences. They'll personalise the service for you.",
    consultationPoints: ['Intensity', 'Focus area', 'Pain points'],
    consultationImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=80',
    includesSteps: [
      {
        step: 1,
        title: 'Foot cleansing & warm up',
        description: 'Warm wipe down and gentle pressure preparation to stimulate blood flow.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 2,
        title: 'Rhythmic movements to enhance flexibility & restore fluid movement',
        description: 'Swedish and Thai stretching techniques focusing on knees and ankle ligaments.',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 3,
        title: 'Legs: Suitable massage techniques with customizable pressure',
        description: 'Tailored as per the pain points & degree of pain detected during consultation.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 4,
        title: 'Hot towel wipe down & finishing',
        description: 'Gentle wipe down with aromatic towels leaving skin hydrated and calm.',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&auto=format&fit=crop&q=80',
      },
    ],
    setupTitle: 'Massage bed setup',
    setupDimensions: 'Massage bed: 6 x 2.5 ft',
    setupImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=80',
    expertBadgeTitle: 'Expertise you can trust, care you can feel',
    expertPoints: [
      'Police verified background check',
      '200+ hrs of rigorous training & certification',
      'Sensitivity & hygiene trained therapists',
    ],
    expertImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    beforeYouBookGuidelines: [
      'This service cannot be availed at a hotel or lodge.',
      'In case of surgery, fractures or severe medical conditions, consult your doctor before getting a massage.',
      'Inform the massage therapist about any specific tender spots or chronic pain points.',
    ],
    bestExperienceTip: 'Pick a quiet room with enough space for the 6x2.5 ft massage bed.',
    reviews: [
      {
        id: 'rev-1',
        userName: 'Sweety Jain',
        rating: 5,
        date: 'Aug 31, 2024',
        serviceTag: 'For Leg Pain relief therapy - spa',
        comment: 'Bhot bhot bhot accha massage tha, pain me turant relief mila. Anjali ji ne bahut ache se point dabaye, knee pain bhi kam hua. Very satisfied!',
        helpfulCount: 42,
      },
      {
        id: 'rev-2',
        userName: 'Ritika Thakur',
        rating: 5,
        date: 'Aug 31, 2024',
        serviceTag: 'For Leg Pain relief therapy - spa',
        comment: 'Excellent service! Very professional and polite. The pressure was relaxing and she did a great job. Satisfied with the service, highly recommended!',
        helpfulCount: 38,
      },
      {
        id: 'rev-3',
        userName: 'Grace',
        rating: 5,
        date: 'Aug 30, 2024',
        serviceTag: 'For Leg Pain relief therapy - spa',
        comment: 'She is experienced & she is awesome. This is my 5th time booking Anjani for Leg Pain Relief Massage. She knows how to go about things.',
        helpfulCount: 29,
      },
      {
        id: 'rev-4',
        userName: 'Sreeja',
        rating: 5,
        date: 'Aug 30, 2024',
        serviceTag: 'For Leg Pain relief therapy - spa',
        comment: 'Professional therapist, punctual and very good techniques. Really happy with the services.',
        helpfulCount: 21,
      },
      {
        id: 'rev-5',
        userName: 'Vanita',
        rating: 5,
        date: 'Aug 29, 2024',
        serviceTag: 'For Leg Pain relief therapy - spa',
        comment: 'Extremely attentive and empathetic therapist. Loved the massage. She paid attention to all the pain points I had and went out of her way to relieve the pain. Loved the little conversations I had with her too. Her energy was very calming and good. Someone I will definitely book again.',
        helpfulCount: 56,
      },
      {
        id: 'rev-6',
        userName: 'Sonia Barve',
        rating: 5,
        date: 'Aug 29, 2024',
        serviceTag: 'For Leg Pain relief therapy - spa',
        comment: 'She has done a great work on leg massage and she has a nice smile. I would recommend her to anyone who wants to take a massage from her.',
        helpfulCount: 19,
      },
      {
        id: 'rev-7',
        userName: 'Tulika',
        rating: 5,
        date: 'Aug 28, 2024',
        serviceTag: 'For Leg Pain relief therapy - spa',
        comment: 'Excellent service! Very professional! I would like to book her again!',
        helpfulCount: 15,
      },
      {
        id: 'rev-8',
        userName: 'Manon',
        rating: 5,
        date: 'Aug 30, 2024',
        serviceTag: 'For Leg Pain relief therapy - spa',
        comment: 'Nice person. Good massage. She adapted to the pressure I wanted.',
        helpfulCount: 12,
      },
      {
        id: 'rev-9',
        userName: 'Kriti Tiwari',
        rating: 5,
        date: 'Aug 30, 2024',
        serviceTag: 'For Leg Pain relief therapy - spa',
        comment: 'The service was extremely good on her part. Highly recommended for your next service.',
        helpfulCount: 34,
      },
      {
        id: 'rev-10',
        userName: 'Tasneem',
        rating: 5,
        date: 'Aug 30, 2024',
        serviceTag: 'For Leg Pain relief therapy - spa',
        comment: 'Excellent massaging technique. It has helped with my leg ache.',
        helpfulCount: 27,
      },
    ],
  },

  // 1.1 SPA FOR WOMEN - STRESS RELIEF SWEDISH MASSAGE
  'spa-stress-relief-swedish': {
    bannerTag: 'STRESS RELIEF',
    bannerHeadline: 'Lavender & Cold-Pressed Sesame Essential Oil',
    bannerSubtitle: 'A soothing full body experience for total relaxation',
    bannerImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&auto=format&fit=crop&q=80',
    idealFor: [
      {
        title: 'Work exhaustion & restless sleep',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Mild whole-body muscular fatigue',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Mental calm & unwinding after a busy week',
        image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80',
      },
    ],
    whenToAvoid: [
      'Pregnancy without prior physician consent',
      'Recent surgery or acute medical conditions',
      'If you need deep bone orthopedic cracking',
    ],
    techniques: [
      {
        title: 'Effleurage long gliding strokes with warm lavender oil',
        description: 'Synchronized palm strokes calm the autonomic nervous system and stimulate serotonin release.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Rhythmic circular friction on shoulders & neck',
        description: 'Releases tension stored in the trapezius and shoulder blades.',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&auto=format&fit=crop&q=80',
      },
    ],
    focusZones: [
      { label: 'Shoulders & Neck', description: 'De-stresses cervical and upper trapezius' },
      { label: 'Spine & Lumbar', description: 'Long rhythmic strokes along the spine' },
      { label: 'Arms & Hands', description: 'Releases keyboard and mouse fatigue' },
      { label: 'Legs & Calves', description: 'Improves circulation and drains fluid' },
    ],
    consultationTitle: 'Pre-massage relaxation consultation',
    consultationDesc: "Tell your therapist your preferred pressure level and focus areas before starting.",
    consultationPoints: ['Oil preference', 'Pressure intensity', 'Key tension zones'],
    consultationImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=80',
    includesSteps: [
      {
        step: 1,
        title: 'Warm foot wipe & aroma inhalation',
        description: 'Cleansing wipe and relaxing lavender breathing exercise to slow heart rate.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 2,
        title: 'Back, shoulders & neck gliding therapy',
        description: 'Warm sesame & lavender oil applied with rhythmic, fluid Swedish strokes.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 3,
        title: 'Legs, glutes & foot massage',
        description: 'Long effleurage strokes followed by gentle pressure point stimulation on soles.',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 4,
        title: 'Warm towel compress & finishing mist',
        description: 'Hot towel wipe-down leaving skin nourished and silky without sticky residue.',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&auto=format&fit=crop&q=80',
      },
    ],
    setupTitle: 'Comfort massage bed setup',
    setupDimensions: 'Massage bed: 6 x 2.5 ft + Disposables',
    setupImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=80',
    expertBadgeTitle: 'Expertise you can trust, care you can feel',
    expertPoints: [
      'Certified female therapists with 250+ spa training hours',
      '100% single-use disposable bedsheet, headrest and wipes',
      'Cold-pressed therapeutic certified essential oils',
    ],
    expertImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    beforeYouBookGuidelines: [
      'Choose a quiet, undisturbed room with room for the foldable massage bed.',
      'Ensure room temperature is comfortable (24°C - 26°C recommended).',
      'Please inform the therapist of any skin allergies or recent injuries.',
    ],
    bestExperienceTip: 'Avoid heavy meals 1 hour before and stay hydrated after the massage.',
    reviews: [
      {
        id: 'rev-sw-1',
        userName: 'Ayesha Merchant',
        rating: 5,
        date: 'Sep 1, 2024',
        serviceTag: 'For Stress relief Swedish massage',
        comment: 'Felt like being transported to a five star luxury resort right at home. The therapist was so respectful, gentle and skilled. Slept like a baby afterwards!',
        helpfulCount: 47,
      },
      {
        id: 'rev-sw-2',
        userName: 'Pooja Hegde',
        rating: 5,
        date: 'Aug 31, 2024',
        serviceTag: 'For Stress relief Swedish massage',
        comment: 'Warm lavender oil smelled divine. Exactly the relaxation I needed after non-stop office meetings this week. Highly recommended!',
        helpfulCount: 39,
      },
      {
        id: 'rev-sw-3',
        userName: 'Sneha R.',
        rating: 5,
        date: 'Aug 29, 2024',
        serviceTag: 'For Stress relief Swedish massage',
        comment: 'Super hygienic setup. She carried everything from the foldable bed to clean disposable covers. 10/10 service!',
        helpfulCount: 31,
      },
    ],
  },

  // 1.2 SPA FOR WOMEN - DEEP TISSUE MASSAGE
  'spa-deep-tissue': {
    bannerTag: 'PAIN RELIEF',
    bannerHeadline: 'Eucalyptus & Clove Herbal Therapeutic Oil',
    bannerSubtitle: 'Supports post-workout relaxation & tight knot release with firm strokes',
    bannerImage: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=500&auto=format&fit=crop&q=80',
    idealFor: [
      {
        title: 'Chronic posture stiffness & stiff shoulders',
        image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Post-workout knots & lactic acid build-up',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Lower back ache from long seated hours',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=80',
      },
    ],
    whenToAvoid: [
      'Acute spinal disc rupture or recent surgery',
      'Severe osteoporosis or brittle bones',
      'Recent open wounds or fractures',
    ],
    techniques: [
      {
        title: 'Deep myofascial knot release across muscle grain',
        description: 'Slow, firm strokes target deep connective tissues to break stubborn adhesions.',
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Thumb and forearm trigger point pressure',
        description: 'Concentrated compression to release hyper-contracted muscle fibers and increase local circulation.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80',
      },
    ],
    focusZones: [
      { label: 'Trapezius & Upper Back', description: 'Knots release from computer posture' },
      { label: 'Lumbar & Sacrum', description: 'Alleviates compression from sitting' },
      { label: 'Glutes & Piriformis', description: 'Sciatic nerve pressure easement' },
      { label: 'Hamstrings & IT Band', description: 'Deep muscle flexibility release' },
    ],
    consultationTitle: 'Musculoskeletal assessment',
    consultationDesc: "Therapist checks pain severity and tightness points to determine safe pressure thresholds.",
    consultationPoints: ['Pain threshold', 'Active knots', 'Prior injuries'],
    consultationImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=80',
    includesSteps: [
      {
        step: 1,
        title: 'Deep heat application & oil warming',
        description: 'Eucalyptus & clove warming balm applied to soften tough outer muscle fascia.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 2,
        title: 'Back & shoulder blade deep trigger release',
        description: 'Firm pressure strokes unwind knots around scapula, neck and lumbar.',
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 3,
        title: 'Lower body hamstring & glute compression',
        description: 'Thumb pressure and forearm friction along deep leg muscle fibers.',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 4,
        title: 'Steam-warmed compress & cooling balm',
        description: 'Thermal wrap to accelerate deep tissue recovery and soothe treated zones.',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&auto=format&fit=crop&q=80',
      },
    ],
    setupTitle: 'Orthopedic massage bed setup',
    setupDimensions: 'Massage bed: 6 x 2.5 ft + Ergonomic headrest',
    setupImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=80',
    expertBadgeTitle: 'Specialized deep tissue certified',
    expertPoints: [
      'Therapists trained in anatomical trigger point therapy',
      'Police verified with background check and identity cards',
      '100% genuine Ayurvedic medicinal pain relief oils',
    ],
    expertImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    beforeYouBookGuidelines: [
      'Pressure can feel intense on knots; communicate freely with therapist to modulate.',
      'Slight soreness the next morning is normal as muscles detoxify.',
    ],
    bestExperienceTip: 'Drink plenty of warm water following your session to flush released lactic acid.',
    reviews: [
      {
        id: 'rev-dt-1',
        userName: 'Dr. Shalini Mukhopadhyay',
        rating: 5,
        date: 'Sep 2, 2024',
        serviceTag: 'For Deep tissue massage',
        comment: 'As a surgeon standing 8 hours a day, my shoulder knots were unbearable. Therapist Priya worked through every knot systematically. Instant relief!',
        helpfulCount: 52,
      },
      {
        id: 'rev-dt-2',
        userName: 'Tanvi Kapoor',
        rating: 5,
        date: 'Aug 30, 2024',
        serviceTag: 'For Deep tissue massage',
        comment: 'Best deep tissue in Bangalore! Firm pressure exactly where I needed it. She was polite, professional and had great technique.',
        helpfulCount: 38,
      },
    ],
  },

  // 1.3 SPA FOR WOMEN - BACK RELIEF MASSAGE
  'spa-back-relief': {
    bannerTag: 'TARGETED RELIEF',
    bannerHeadline: 'Kottakkal Herbal Anti-Inflammatory Oil',
    bannerSubtitle: 'Focuses on lower back, spine & shoulder blades to ease tension & inflammation',
    bannerImage: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&auto=format&fit=crop&q=80',
    idealFor: [
      {
        title: 'Long desk work & forward neck slouch',
        image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Lower back morning stiffness',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Scapula & shoulder blade tightness',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80',
      },
    ],
    whenToAvoid: [
      'Acute slip disc requiring hospital surgery',
      'Recent spinal injections or fractures',
    ],
    techniques: [
      {
        title: 'Spinal column parallel friction strokes',
        description: 'Unwinds tight muscles along either side of the vertebral column.',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Rotator cuff and scapular lift kneading',
        description: 'Mobilizes the shoulder blades to relieve trapped tension in the upper back.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop&q=80',
      },
    ],
    focusZones: [
      { label: 'Cervical Spine & Neck', description: 'Tech neck and posture release' },
      { label: 'Scapula & Shoulder Blades', description: 'Trapped knot unwinding' },
      { label: 'Lumbar Spine', description: 'Chair slouch lower back easing' },
      { label: 'Sacrum Base', description: 'Hip and lower spine decompression' },
    ],
    consultationTitle: 'Back strain assessment',
    consultationDesc: "We map out whether your discomfort is concentrated in the upper, mid, or lower back.",
    consultationPoints: ['Desk hours', 'Specific back pain points', 'Heat tolerance'],
    consultationImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=80',
    includesSteps: [
      {
        step: 1,
        title: 'Warm herbal oil application along spine',
        description: 'Therapeutic warm oil infused with camphor and eucalyptus.',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 2,
        title: 'Shoulder blade and trapezius knot release',
        description: 'Acupressure thumb and palm kneading on stubborn tension points.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 3,
        title: 'Lumbar and sacral friction therapy',
        description: 'Focuses on the lower back muscles supporting your body weight.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 4,
        title: 'Hot towel lumbar compress',
        description: 'Steam-warmed towel placed over lumbar to lock in soothing herbal benefits.',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&auto=format&fit=crop&q=80',
      },
    ],
    setupTitle: 'Massage bed setup',
    setupDimensions: 'Massage bed: 6 x 2.5 ft',
    setupImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=80',
    expertBadgeTitle: 'Certified spinal relief therapy',
    expertPoints: [
      'Therapist trained in ergonomic back posture therapy',
      '100% single-use sanitised linen and disposable sheets',
      'All natural anti-inflammatory oils without chemicals',
    ],
    expertImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    beforeYouBookGuidelines: [
      'Wear loose, comfortable clothing before the session.',
      'Inform the therapist if you have had any spinal disc issues.',
    ],
    bestExperienceTip: 'Lie flat and breathe rhythmically to allow muscles to accept deep strokes easily.',
    reviews: [
      {
        id: 'rev-br-1',
        userName: 'Deepa Narayan',
        rating: 5,
        date: 'Sep 1, 2024',
        serviceTag: 'For Back relief massage',
        comment: 'My lower back had been killing me for 2 weeks from continuous WFH laptop use. 45 mins with Kavita and I can bend freely without pain! Outstanding!',
        helpfulCount: 44,
      },
      {
        id: 'rev-br-2',
        userName: 'Meghna Gupta',
        rating: 5,
        date: 'Aug 29, 2024',
        serviceTag: 'For Back relief massage',
        comment: 'Hot towel compress on the lower back felt heavenly. Polite, skilled and punctual therapist.',
        helpfulCount: 30,
      },
    ],
  },

  // 1.4 SPA FOR WOMEN - FULL BODY SCRUB & MASSAGE
  'spa-full-body-scrub': {
    bannerTag: 'SKIN CARE & GLOW',
    bannerHeadline: 'Walnut Granule Exfoliation & Rose Essence',
    bannerSubtitle: 'Removes dead skin & leaves skin soft, smooth & deeply hydrated',
    bannerImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=80',
    idealFor: [
      {
        title: 'Sun tan removal & rough dry skin',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Keratosis pilaris on arms and legs',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Bridal glow & pre-festive preparation',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80',
      },
    ],
    whenToAvoid: [
      'Active sunburn or peeling skin',
      'Open cuts, scratches or severe active rashes',
    ],
    techniques: [
      {
        title: 'Gentle circular micro-buffing scrub',
        description: 'Walnut and botanical beads polish away rough epidermal layers without scratching.',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Hydrating almond butter restorative massage',
        description: 'Nourishes newly revealed skin with vitamins A and E for a silky touch.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop&q=80',
      },
    ],
    focusZones: [
      { label: 'Back & Shoulders', description: 'Buffs back acne marks & sun tan' },
      { label: 'Arms & Elbows', description: 'Smoothens rough elbows & skin bumps' },
      { label: 'Legs & Knees', description: 'Removes dead skin and hyperpigmentation' },
      { label: 'Decollete', description: 'Restores brightness to sun-exposed neckline' },
    ],
    consultationTitle: 'Skin sensitivity consultation',
    consultationDesc: "Therapist checks skin type (dry, sensitive or normal) to calibrate exfoliation firmness.",
    consultationPoints: ['Skin type', 'Tan areas', 'Fragrance preference'],
    consultationImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80',
    includesSteps: [
      {
        step: 1,
        title: 'Full body walnut scrub application',
        description: 'Whole body gentle exfoliation with natural scrub beads to unclog pores.',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 2,
        title: 'Damp warm wipe-down',
        description: 'Microfiber wipes remove all scrub granules smoothly and mess-free.',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 3,
        title: 'Relaxing whole body oil massage',
        description: '45-minute Swedish flow with sweet almond & rose essential oil.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 4,
        title: 'Deep hydration body butter finish',
        description: 'Locks in moisture leaving skin baby-soft for days.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80',
      },
    ],
    setupTitle: 'Mess-free spa bed with disposable sheet',
    setupDimensions: 'Massage bed: 6 x 2.5 ft + Protective liner',
    setupImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=80',
    expertBadgeTitle: 'Certified spa aesthetician',
    expertPoints: [
      'Dermatologically tested scrubs and premium carrier oils',
      'Zero mess guarantee - all scrub residue cleaned before departure',
      'Single-use sealed hygiene package',
    ],
    expertImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    beforeYouBookGuidelines: [
      'Avoid shaving or waxing 24 hours prior to the scrub.',
      'A warm bathroom nearby for post-session shower is ideal.',
    ],
    bestExperienceTip: 'Use a gentle non-stripping body wash in the shower after the session.',
    reviews: [
      {
        id: 'rev-sc-1',
        userName: 'Priyanka Sen',
        rating: 5,
        date: 'Aug 30, 2024',
        serviceTag: 'For Full body massage & scrub',
        comment: 'My skin has literally never felt this soft! The dead skin on my elbows and back is gone. And the therapist was super neat, left zero granules on the floor.',
        helpfulCount: 46,
      },
      {
        id: 'rev-sc-2',
        userName: 'Rhea Chakraborty',
        rating: 5,
        date: 'Aug 28, 2024',
        serviceTag: 'For Full body massage & scrub',
        comment: 'Booked this for my sister before her wedding sangeet. She was glowing! Worth every single rupee.',
        helpfulCount: 33,
      },
    ],
  },

  // 1.5 SPA FOR WOMEN - POST NATAL MASSAGE
  'spa-post-natal': {
    bannerTag: 'MATERNITY CARE',
    bannerHeadline: 'Dhanwantharam Oil & Maternity Care',
    bannerSubtitle: 'Relieves post-delivery body ache, tones abdominal muscles & aids recovery',
    bannerImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&auto=format&fit=crop&q=80',
    idealFor: [
      {
        title: 'Post-delivery lower back and hip strain',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Swollen feet and fluid retention',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Nursing neck and shoulder tiredness',
        image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80',
      },
    ],
    whenToAvoid: [
      'Less than 4 weeks post C-section delivery without doctor permission',
      'Unhealed surgical incisions or high postpartum fever',
    ],
    techniques: [
      {
        title: 'Pelvic realignment & abdominal toning strokes',
        description: 'Gentle circular clockwise motion aids uterine involution and eases pelvic tension.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Lymphatic drainage for ankles and calves',
        description: 'Upward rhythmic strokes help eliminate post-pregnancy fluid retention.',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&auto=format&fit=crop&q=80',
      },
    ],
    focusZones: [
      { label: 'Lower Back & Pelvis', description: 'Post-delivery skeletal alignment support' },
      { label: 'Abdomen & Belly', description: 'Gentle warm oil toning strokes' },
      { label: 'Shoulders & Neck', description: 'Relieves breastfeeding tension' },
      { label: 'Calves & Feet', description: 'Drains edema and water retention' },
    ],
    consultationTitle: 'Postpartum recovery check',
    consultationDesc: "Certified maternity therapist reviews delivery mode (normal/C-sec) and recovery status.",
    consultationPoints: ['Delivery type', 'Weeks postpartum', 'Cesarean healing status'],
    consultationImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=80',
    includesSteps: [
      {
        step: 1,
        title: 'Warming sesame & Dhanwantharam oil preparation',
        description: 'Ayurvedic medicated oils heated to optimal body comfort temperature.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 2,
        title: 'Backache and pelvic floor relief massage',
        description: 'Specialized supportive side-lying or prone positioning with maternal bolsters.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 3,
        title: 'Gentle belly toning & stretch mark care',
        description: 'Soft herbal balm strokes to stimulate abdominal wall recovery.',
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 4,
        title: 'Foot edema drainage & warm wipe',
        description: 'Relieves heavy swollen feet and provides deeply restful relaxation.',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&auto=format&fit=crop&q=80',
      },
    ],
    setupTitle: 'Maternity comfort massage setup',
    setupDimensions: 'Massage bed with supportive maternity pillows',
    setupImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=80',
    expertBadgeTitle: 'Certified maternity therapist',
    expertPoints: [
      '200+ hours in prenatal & postnatal therapeutic training',
      'Police background checked female therapists only',
      'Authentic Kerala Ayurvedic Dhanwantharam formulation',
    ],
    expertImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    beforeYouBookGuidelines: [
      'For normal delivery, can be started after 2-3 weeks; for C-section, after 4-6 weeks with doctor approval.',
      'Feed your baby right before the session so you can relax completely.',
    ],
    bestExperienceTip: 'Keep baby resting nearby in a bassinet or with family so you have uninterrupted peace.',
    reviews: [
      {
        id: 'rev-pn-1',
        userName: 'Dr. Radhika Nair',
        rating: 5,
        date: 'Sep 2, 2024',
        serviceTag: 'For Post natal massage',
        comment: 'I was struggling with severe back pain post-delivery and nursing. Therapist Shanti was so gentle, patient, and knowledgeable. The belly strokes and foot massage gave me instant relief!',
        helpfulCount: 51,
      },
      {
        id: 'rev-pn-2',
        userName: 'Ankita Joshi',
        rating: 5,
        date: 'Aug 30, 2024',
        serviceTag: 'For Post natal massage',
        comment: 'Took a 7-day package after my 6th week post-delivery. Best decision ever. My swelling went down completely and I sleep so much better.',
        helpfulCount: 42,
      },
    ],
  },

  // 1.6 SPA FOR WOMEN - ELDERLY CARE MASSAGE
  'spa-elderly-care': {
    bannerTag: 'SENIOR WELLNESS',
    bannerHeadline: 'Warm Mahanarayan Therapeutic Oil',
    bannerSubtitle: 'Light-pressure full body massage easing senior aches, promoting restful sound sleep',
    bannerImage: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=500&auto=format&fit=crop&q=80',
    idealFor: [
      {
        title: 'Senior joint stiffness & knee soreness',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Restless nights & disturbed sleep patterns',
        image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Mild circulation issues & morning stiffness',
        image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80',
      },
    ],
    whenToAvoid: [
      'Uncontrolled fragile osteoporosis',
      'Recent joint replacement within 3 months',
    ],
    techniques: [
      {
        title: 'Light rhythmic effleurage with warm joint oil',
        description: 'Carefully measured gentle strokes lubricate joint capsules without putting pressure on fragile bones.',
        image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Passive range of motion limb rotation',
        description: 'Gentle assisted flexion of knees, ankles and shoulders keeps mobility fluid.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop&q=80',
      },
    ],
    focusZones: [
      { label: 'Knees & Ankles', description: 'Warming oil friction to ease joint stiffness' },
      { label: 'Lumbar & Upper Spine', description: 'Gentle strokes for spinal comfort' },
      { label: 'Shoulders & Elbows', description: 'Assisted movement for arm flexibility' },
      { label: 'Temples & Scalp', description: 'Soothing strokes to induce deep restful sleep' },
    ],
    consultationTitle: 'Senior comfort & health check',
    consultationDesc: "Therapist speaks with the elder (and family) to ensure positioning on the bed or sofa is 100% comfortable.",
    consultationPoints: ['Comfortable lying position', 'Knee sensitivity', 'Preferred warmth level'],
    consultationImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=80',
    includesSteps: [
      {
        step: 1,
        title: 'Comfortable positioning & warm towel foot wipe',
        description: 'Elderly person placed comfortably with supportive cushions under head and knees.',
        image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 2,
        title: 'Warm Mahanarayan oil massage for legs & knees',
        description: 'Light feather strokes to improve peripheral circulation and ease creaky joints.',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 3,
        title: 'Gentle back and shoulder soothing strokes',
        description: 'Calming circular friction to loosen stiffness without heavy pressure.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 4,
        title: 'Head, temple & neck relaxation',
        description: 'Gentle head massage to release mental tension and encourage restful sleep.',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&auto=format&fit=crop&q=80',
      },
    ],
    setupTitle: 'Gentle senior massage setup',
    setupDimensions: 'Low massage bed or comfortable home sofa/bed setup',
    setupImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=80',
    expertBadgeTitle: 'Geriatric trained female therapist',
    expertPoints: [
      'Trained specifically in senior care empathy and light-pressure techniques',
      'Police verified with background check',
      'Uses warm herbal Mahanarayan oil famous for joint care',
    ],
    expertImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    beforeYouBookGuidelines: [
      'Can be done on a regular home bed if getting onto a massage bed is inconvenient.',
      'A family member can be present in the room throughout the service.',
    ],
    bestExperienceTip: 'Keep a warm blanket ready for after the session as elders often feel pleasantly drowsy.',
    reviews: [
      {
        id: 'rev-ec-1',
        userName: 'Sunita Mehra (for Mother, 74 yrs)',
        rating: 5,
        date: 'Sep 1, 2024',
        serviceTag: 'For Elderly care massage',
        comment: 'Booked this for my 74-year-old mother. The therapist Sunita was so loving, respectful and gentle with her. My mother said her knee pain felt significantly lighter. Will book weekly!',
        helpfulCount: 48,
      },
      {
        id: 'rev-ec-2',
        userName: 'Ramanathan Swamy',
        rating: 5,
        date: 'Aug 29, 2024',
        serviceTag: 'For Elderly care massage',
        comment: 'Very patient and kind therapist. My grandmother had a sound 8-hour sleep for the first time in months. Blessed service.',
        helpfulCount: 37,
      },
    ],
  },

  // 1.7 SPA FOR WOMEN - FOOT REFLEXOLOGY MASSAGE
  'spa-foot-massage': {
    bannerTag: 'ADD-ON SERVICE',
    bannerHeadline: 'Camphor & Herbal Foot Reflexology',
    bannerSubtitle: 'Targeted pressure using reflexology to boost energy levels & reduce swelling',
    bannerImage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500&auto=format&fit=crop&q=80',
    idealFor: [
      {
        title: 'Tired, aching feet from prolonged standing',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Swollen ankles and heel spurs',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Restless legs before going to bed',
        image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80',
      },
    ],
    whenToAvoid: [
      'Active athlete foot or open blisters',
      'Recent foot fractures or acute sprains',
    ],
    techniques: [
      {
        title: 'Sole acupressure & heel friction',
        description: 'Thumb pressure on plantar reflex zones activates corresponding meridians.',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Calf drainage kneading',
        description: 'Ascending strokes from ankle to knee to remove accumulated lactic acid.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80',
      },
    ],
    focusZones: [
      { label: 'Heel & Arch', description: 'Plantar fascia strain relief' },
      { label: 'Ball of Foot & Toes', description: 'Acupressure energy point stimulation' },
      { label: 'Ankle Joint', description: 'Swelling reduction and flexibility' },
      { label: 'Calf Muscles', description: 'Relieves cramp tightness' },
    ],
    consultationTitle: 'Foot fatigue check',
    consultationDesc: "Therapist inquires about shoe habits, walking distance, and arch tenderness.",
    consultationPoints: ['Foot soreness location', 'Shoe wear habits', 'Balm cooling intensity'],
    consultationImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=80',
    includesSteps: [
      {
        step: 1,
        title: 'Sanitising warm foot wipe',
        description: 'Cleansing and warming the feet with herbal antiseptic wipes.',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 2,
        title: 'Reflexology trigger point acupressure',
        description: 'Thumb and finger walking across plantar reflexes on both feet.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 3,
        title: 'Calf kneading and ankle rotations',
        description: 'Deep upward strokes to release calf muscle cramps and stiffness.',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 4,
        title: 'Cooling herbal spray finish',
        description: 'Menthol and camphor spray to leave feet light, refreshed and odor-free.',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&auto=format&fit=crop&q=80',
      },
    ],
    setupTitle: 'Comfortable armchair or bed setup',
    setupDimensions: 'Requires standard chair, sofa, or bed',
    setupImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=80',
    expertBadgeTitle: 'Reflexology certified therapist',
    expertPoints: [
      'Certified in foot reflexology and plantar pressure mapping',
      'Disposable mat and single-use wipes provided',
      'Soothing herbal non-greasy foot balms',
    ],
    expertImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    beforeYouBookGuidelines: [
      'Can be enjoyed while reading a book or relaxing on your living room sofa.',
      'Combine with any other massage for the ultimate full body bliss.',
    ],
    bestExperienceTip: 'Rest your feet up on a stool for 15 minutes afterwards to prolong the lightness.',
    reviews: [
      {
        id: 'rev-ft-1',
        userName: 'Gauri Sharma',
        rating: 5,
        date: 'Sep 1, 2024',
        serviceTag: 'For Foot massage',
        comment: 'I stood in heels at an exhibition all day yesterday and my feet were throbbing. 30 minutes of this reflexology completely cured the ache. Magic in her fingers!',
        helpfulCount: 41,
      },
      {
        id: 'rev-ft-2',
        userName: 'Natasha Wadia',
        rating: 5,
        date: 'Aug 29, 2024',
        serviceTag: 'For Foot massage',
        comment: 'The acupressure point release on the arches was pure heaven. 10/10.',
        helpfulCount: 28,
      },
    ],
  },

  // 1.8 SPA FOR WOMEN - HEAD & SHOULDER MASSAGE
  'spa-head-shoulder': {
    bannerTag: 'ADD-ON SERVICE',
    bannerHeadline: 'Warm Brahmi & Rosemary Scalp Therapy',
    bannerSubtitle: 'Focused medium-pressure relief for head, neck & shoulders',
    bannerImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&auto=format&fit=crop&q=80',
    idealFor: [
      {
        title: 'Screen fatigue & tension headaches',
        image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Trapezius stiffness from laptop work',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Hair follicle nourishment & scalp stress',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80',
      },
    ],
    whenToAvoid: [
      'Open cuts or abrasions on scalp',
      'Severe migraine with light sensitivity',
    ],
    techniques: [
      {
        title: 'Trapezius & cervical spine knead',
        description: 'Firm thumb and palm pressure along the shoulder ridge releases built-up knot tension.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Circular acupressure scalp stimulation',
        description: 'Fingertip circular motions stimulate blood flow to hair roots and soothe cranial nerves.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80',
      },
    ],
    focusZones: [
      { label: 'Crown & Temples', description: 'Eases eye strain and headache tension' },
      { label: 'Occipital Ridge & Neck', description: 'Relieves cervical base tightness' },
      { label: 'Trapezius Muscles', description: 'Unwinds heavy shoulder weights' },
      { label: 'Upper Scapula', description: 'Releases mouse and typing stress' },
    ],
    consultationTitle: 'Desk fatigue check',
    consultationDesc: "Therapist asks about headache frequency and preferred oil (hair strengthening or aroma relaxation).",
    consultationPoints: ['Oil preference', 'Temple pressure level', 'Neck stiffness'],
    consultationImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=80',
    includesSteps: [
      {
        step: 1,
        title: 'Warm Brahmi oil scalp infusion',
        description: 'Warm herbal oil parted into hair sections and massaged deeply into scalp.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 2,
        title: 'Temple and forehead acupressure',
        description: 'Gentle pressure on key pressure points to instantly relieve mental fatigue.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 3,
        title: 'Deep neck & shoulder knot release',
        description: 'Firm kneading along trapezius and shoulder blades.',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 4,
        title: 'Hot towel neck wrap',
        description: 'Warm towel placed around the cervical spine for lasting relaxation.',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&auto=format&fit=crop&q=80',
      },
    ],
    setupTitle: 'Comfortable seated or lying setup',
    setupDimensions: 'Armchair, bed or massage table',
    setupImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=80',
    expertBadgeTitle: 'Certified head & neck therapist',
    expertPoints: [
      'Certified in Indian Head Massage (Champissage)',
      '100% pure cold-pressed Bringadi & Brahmi oils',
      'Disposable drape to protect your clothes',
    ],
    expertImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    beforeYouBookGuidelines: [
      'You can keep the oil in your hair for 2-3 hours after the session for maximum conditioning.',
      'Wear an open-neck t-shirt or loose top.',
    ],
    bestExperienceTip: 'Close your eyes and breathe deeply during the temple pressure phase.',
    reviews: [
      {
        id: 'rev-hs-1',
        userName: 'Zoya Akhtar',
        rating: 5,
        date: 'Sep 2, 2024',
        serviceTag: 'For Head & shoulder massage',
        comment: 'Instant cure for my migraine! The warm oil and shoulder pressure took away 100% of my stress. Booking this as an add-on every single time now.',
        helpfulCount: 45,
      },
      {
        id: 'rev-hs-2',
        userName: 'Kalyani Rao',
        rating: 5,
        date: 'Aug 31, 2024',
        serviceTag: 'For Head & shoulder massage',
        comment: 'Extremely relaxing. The therapist knows the exact trigger points on the scalp and neck. Amazing work!',
        helpfulCount: 36,
      },
    ],
  },

  // 2. APPLIANCE REPAIR - AC REPAIR & FOAM JET SERVICE
  'app-foam-jet-ac': {
    bannerTag: 'AIR CONDITIONER SERVICE',
    bannerHeadline: 'Power-Jet Foam Cleaning Technology',
    bannerSubtitle: '2X deeper cooling & 30% reduction in power bills',
    bannerImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80',
    idealFor: [
      {
        title: 'Weak cooling & hot air flow',
        image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Musty foul smell from blower',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'High monthly electricity bills',
        image: 'https://images.unsplash.com/photo-1558441719-79753c15ec97?w=400&auto=format&fit=crop&q=80',
      },
    ],
    whenToAvoid: [
      'AC unit physically damaged or fell',
      'Burnt compressor wiring requiring gas welding inside bedroom',
      'Non-functional remote sensor only (simple battery issue)',
    ],
    techniques: [
      {
        title: 'Spill-proof AC catchment jacket mounting',
        description: 'Guarantees zero splash or water marks on wallpaper and wooden flooring.',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'High-pressure foam jet & cooling coil descaling',
        description: 'Flushes out dust blocks, pet hair, and fungal growth trapped inside cooling fins.',
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&auto=format&fit=crop&q=80',
      },
    ],
    focusZones: [
      { label: 'Indoor Cooling Coil', description: 'Chemical foam deep flush' },
      { label: 'Blower Drum', description: 'De-molding and fungal eradication' },
      { label: 'Drain Tray & Pipe', description: 'Anti-choke clearing & sanitization' },
      { label: 'Outdoor Condenser', description: 'High PSI pressure wash' },
    ],
    consultationTitle: 'Pre-service diagnostic checkup',
    consultationDesc: 'Technician measures air throw temperature, gas pressure, and amp draw before touching tools.',
    consultationPoints: ['Amp draw', 'Gas PSI check', 'Temperature delta'],
    consultationImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
    includesSteps: [
      {
        step: 1,
        title: 'Pre-service airflow & temp testing',
        description: 'Digital anemometer check of cooling capacity and electrical load.',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 2,
        title: 'Catchment apron & spill-proof jacket setup',
        description: 'Complete protection of surrounding furniture, sofa, and painted walls.',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 3,
        title: 'Foam-jet deep wash of coils & blower',
        description: 'Special non-corrosive chemical foam dissolves grease and accumulated grime.',
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&auto=format&fit=crop&q=80',
      },
      {
        step: 4,
        title: 'Post-service temp check & 30-day warranty card',
        description: 'Verified drop in supply temperature (avg 18°C-21°C) with warranty activated.',
        image: 'https://images.unsplash.com/photo-1558441719-79753c15ec97?w=400&auto=format&fit=crop&q=80',
      },
    ],
    setupTitle: 'AC Tech Equipment Kit',
    setupDimensions: 'Pressure Washer (80 bar) + Spill Jacket',
    setupImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=500&auto=format&fit=crop&q=80',
    expertBadgeTitle: 'Certified AC Masters, UrgentLyfe Guarantee',
    expertPoints: [
      'Police verified & background cleared',
      'HVAC certified with 5+ years field experience',
      'Standard rate card with 30-day rework protection',
    ],
    expertImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    beforeYouBookGuidelines: [
      'Ensure uninterrupted water and power supply during service.',
      'Clear space around the indoor AC unit for ladder placement.',
      'Outdoor unit should be safely accessible without balcony hazard.',
    ],
    bestExperienceTip: 'Keep curtains drawn during post-cleaning test to verify room temperature drop.',
    reviews: [
      {
        id: 'rev-ac-1',
        userName: 'Amitabh Sen',
        rating: 5,
        date: 'Sep 2, 2024',
        serviceTag: 'For Foam-jet AC service',
        comment: 'Superb cleaning! The technician Rajesh brought a spill jacket, not a single water droplet fell on my newly painted wall. AC cooling is like day one!',
        helpfulCount: 51,
      },
      {
        id: 'rev-ac-2',
        userName: 'Pooja Hegde',
        rating: 5,
        date: 'Sep 1, 2024',
        serviceTag: 'For Foam-jet AC service',
        comment: 'Very polite professional. Checked the gas pressure in front of me and didn’t push for unnecessary gas refills like local mechanics do.',
        helpfulCount: 44,
      },
      {
        id: 'rev-ac-3',
        userName: 'Vikram Khurana',
        rating: 5,
        date: 'Aug 29, 2024',
        serviceTag: 'For AC repair',
        comment: 'Emergency SOS booking arrived in 25 mins during a scorching 42°C afternoon. Fixed capacitor on the spot. Lifesavers!',
        helpfulCount: 39,
      },
      {
        id: 'rev-ac-4',
        userName: 'Meenakshi Sundaram',
        rating: 5,
        date: 'Aug 27, 2024',
        serviceTag: 'For Foam-jet AC service',
        comment: 'The jet spray cleaning removed so much dirt and mold from inside the blower. Smell is completely gone. Very happy!',
        helpfulCount: 28,
      },
    ],
  },
};

// Generic fallback generator that builds authentic Urban Company style rich detail for ANY service
export function getServiceRichDetail(service: {
  id: string;
  title: string;
  categoryId: string;
  price: number;
  durationMinutes: number;
  description: string;
  includes: string[];
  excludes: string[];
  image: string;
  toolsUsed?: string[];
}): ServiceRichDetail {
  const normalizedTitle = (service.title || '').toLowerCase();
  let baseKey = service.id;

  if (!RICH_DETAILS_REGISTRY[baseKey]) {
    if (normalizedTitle.includes('leg relief') || service.id.includes('leg-relief')) {
      baseKey = 'spa-w-leg-relief';
    } else if (normalizedTitle.includes('swedish') || service.id.includes('swedish') || normalizedTitle.includes('stress relief')) {
      baseKey = 'spa-stress-relief-swedish';
    } else if (normalizedTitle.includes('deep tissue') || service.id.includes('deep-tissue')) {
      baseKey = 'spa-deep-tissue';
    } else if (normalizedTitle.includes('back relief') || service.id.includes('back-relief') || normalizedTitle.includes('back pain') || service.id.includes('back')) {
      baseKey = 'spa-back-relief';
    } else if (normalizedTitle.includes('scrub') || normalizedTitle.includes('polishing') || service.id.includes('scrub') || service.id.includes('polishing')) {
      baseKey = 'spa-full-body-scrub';
    } else if (normalizedTitle.includes('post natal') || normalizedTitle.includes('post-natal') || normalizedTitle.includes('belly') || service.id.includes('post-natal')) {
      baseKey = 'spa-post-natal';
    } else if (normalizedTitle.includes('elderly') || normalizedTitle.includes('senior') || normalizedTitle.includes('mobility') || service.id.includes('elderly')) {
      baseKey = 'spa-elderly-care';
    } else if (normalizedTitle.includes('foot') || service.id.includes('foot')) {
      baseKey = 'spa-foot-massage';
    } else if (normalizedTitle.includes('head') || normalizedTitle.includes('shoulder') || service.id.includes('head') || service.id.includes('shoulder')) {
      baseKey = 'spa-head-shoulder';
    } else if (normalizedTitle.includes('foam-jet') || normalizedTitle.includes('foam jet') || service.id.includes('foam-jet')) {
      baseKey = 'app-foam-jet-ac';
    }
  }

  // Check if explicit registry entry exists
  if (RICH_DETAILS_REGISTRY[baseKey]) {
    const base = RICH_DETAILS_REGISTRY[baseKey];
    // merge with defaults if missing
    return {
      bannerTag: base.bannerTag || 'VERIFIED HOME SERVICE',
      bannerHeadline: base.bannerHeadline || service.title,
      bannerSubtitle: base.bannerSubtitle || 'Professional certified execution with 30-day rework warranty',
      bannerImage: base.bannerImage || service.image,
      idealFor: base.idealFor || [
        { title: 'Immediate problem resolution', image: service.image },
        { title: 'Pre-event or deep maintenance', image: service.image },
        { title: 'Safe & standardized pricing', image: service.image },
      ],
      whenToAvoid: base.whenToAvoid || [
        'Structural modifications requiring civil construction',
        'Unsafe high-voltage live wire handling without master switch access',
      ],
      techniques: base.techniques || [
        {
          title: `Certified ${service.title} Protocol`,
          description: 'Carried out according to standard ISO safety & quality inspection checklists.',
          image: service.image,
        },
      ],
      focusZones: base.focusZones,
      consultationTitle: base.consultationTitle || 'Pre-service consultation & inspection',
      consultationDesc: base.consultationDesc || "Tell our specialist about your preferences and issues. They'll personalise the service for you.",
      consultationPoints: base.consultationPoints || ['Condition check', 'Priority pain points', 'Estimate verification'],
      consultationImage: base.consultationImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
      includesSteps: base.includesSteps || service.includes.map((inc, idx) => ({
        step: idx + 1,
        title: inc,
        description: `Carried out with specialized professional equipment and verified materials.`,
        image: service.image,
      })),
      setupTitle: base.setupTitle || 'Standard Professional Setup',
      setupDimensions: base.setupDimensions || 'Service Toolkit & Safety Floor Apron',
      setupImage: base.setupImage || service.image,
      expertBadgeTitle: base.expertBadgeTitle || 'Expertise you can trust, care you can feel',
      expertPoints: base.expertPoints || [
        'Police verified background check',
        '200+ hrs of skill training & standard protocol certification',
        '30-day rework warranty included at no extra charge',
      ],
      expertImage: base.expertImage || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      beforeYouBookGuidelines: base.beforeYouBookGuidelines || [
        'Ensure working electricity and clean water supply if needed.',
        'Keep fragile items stored away before specialist arrives.',
        'Payment can be made online or after service completion.',
      ],
      bestExperienceTip: base.bestExperienceTip || 'Keep adequate space clear around the service area for tools and testing.',
      reviews: base.reviews || [
        {
          id: `rev-${service.id}-1`,
          userName: 'Sweety Jain',
          rating: 5,
          date: 'Aug 31, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Bahut hi badhiya service thi! Professional time pe aaye, sab kuch neat & clean kar diya. 5 stars!',
          helpfulCount: 42,
        },
        {
          id: `rev-${service.id}-2`,
          userName: 'Ritika Thakur',
          rating: 5,
          date: 'Aug 30, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Excellent service! Very professional and polite. Satisfied with the quality, highly recommended!',
          helpfulCount: 38,
        },
        {
          id: `rev-${service.id}-3`,
          userName: 'Grace',
          rating: 5,
          date: 'Aug 29, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Experienced professional who knew exactly what they were doing. My 4th booking on the app!',
          helpfulCount: 29,
        },
      ],
    };
  }

  // Category specific smart templating
  const cat = (service.categoryId || '').toLowerCase();
  const title = (service.title || '').toLowerCase();

  const isSpaOrMassage = cat.includes('spa') || cat.includes('massage') || title.includes('massage') || title.includes('therapy');
  const isAC = cat === 'ac-appliance' || title.includes('ac ') || title.includes('air conditioner') || title.includes('foam jet') || title.includes('gas refill') || title.includes('inverter pcb');
  const isPainting = cat.includes('paint') || title.includes('wall panel') || title.includes('damp') || title.includes('seepage') || title.includes('texture') || title.includes('paint');
  const isPestControl = cat.includes('pest') || title.includes('termite') || title.includes('cockroach') || title.includes('bed bug') || title.includes('mosquito') || title.includes('rodent');
  const isCarpentry = cat.includes('carpent') || title.includes('furniture') || title.includes('hinge') || title.includes('mortise') || title.includes('wardrobe') || title.includes('drill & hang') || title.includes('curtain rod');
  const isPlumbing = cat.includes('plumb') || title.includes('pipe') || title.includes('tap') || title.includes('drain') || title.includes('flush') || title.includes('water tank') || title.includes('pump');
  const isElectrical = cat.includes('elect') || title.includes('mcb') || title.includes('switch') || title.includes('smart lock') || title.includes('earthing') || title.includes('chandelier') || title.includes('inverter ups');
  const isAppliance = cat.includes('appliance') || title.includes('ro ') || title.includes('water purifier') || title.includes('washing') || title.includes('fridge') || title.includes('chimney') || title.includes('geyser') || title.includes('microwave') || title.includes('cooler');
  const isCleaning = cat.includes('clean') || title.includes('clean') || title.includes('scrub') || title.includes('wash') || title.includes('sofa');
  const isSalon = cat.includes('salon') || title.includes('hair') || title.includes('facial') || title.includes('pedicure') || title.includes('waxing') || title.includes('beard');

  if (isSpaOrMassage) {
    return {
      bannerTag: 'BODY MASSAGE',
      bannerHeadline: 'Eucalyptus & Clove Essential Oil',
      bannerSubtitle: 'Soothes sore muscles & alleviates joint pain',
      bannerImage: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=80',
      idealFor: [
        {
          title: 'Trekkers with calf & body soreness',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Post-workout muscle stiffness',
          image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Strain from daily long commute & desk work',
          image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80',
        },
      ],
      whenToAvoid: [
        'Pregnancy',
        'Recent surgery or fractures',
        'Need deep medical orthopedic surgery',
      ],
      techniques: [
        {
          title: `Deep strokes with customized firm pressure`,
          description: 'Long gliding strokes with warm essential oil along the primary muscle channels.',
          image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Targeted acupressure kneading',
          description: 'Thumb pressure and palm kneading on stress points to release trapped lactic acid.',
          image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80',
        },
      ],
      focusZones: [
        { label: 'Upper Back & Neck', description: 'Desk stiffness release' },
        { label: 'Glute & Lumbar', description: 'Sciatic nerve pressure easing' },
        { label: 'Hamstring & Calf', description: 'Lactic acid drainage & ache relief' },
        { label: 'Sole & Ankle', description: 'Reflexology acupressure' },
      ],
      consultationTitle: 'Pre-massage consultation',
      consultationDesc: "Tell our therapists about your preferences. They'll personalise the service for you.",
      consultationPoints: ['Intensity', 'Focus area', 'Pain points'],
      consultationImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=80',
      includesSteps: [
        {
          step: 1,
          title: 'Foot cleansing & aromatic warm up',
          description: 'Warm wipe down and gentle pressure preparation to stimulate blood flow.',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 2,
          title: 'Rhythmic movements to enhance flexibility & restore fluid movement',
          description: 'Swedish and Thai stretching techniques focusing on key joints.',
          image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 3,
          title: 'Core tailored therapy with customizable pressure',
          description: 'Customized as per the pain points & degree of fatigue discussed in consultation.',
          image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 4,
          title: 'Hot towel wipe down & finishing',
          description: 'Gentle wipe down with aromatic towels leaving skin relaxed and hydrated.',
          image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&auto=format&fit=crop&q=80',
        },
      ],
      setupTitle: 'Massage bed setup',
      setupDimensions: 'Massage bed: 6 x 2.5 ft',
      setupImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=80',
      expertBadgeTitle: 'Expertise you can trust, care you can feel',
      expertPoints: [
        'Police verified background check',
        '200+ hrs of training & spa institute certified',
        'Sensitivity & discreet service trained',
      ],
      expertImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      beforeYouBookGuidelines: [
        'This service cannot be availed at a hotel.',
        'In case of surgery or severe medical condition, consult with your doctor before getting a massage.',
        'Inform the massage therapist about any pain points.',
      ],
      bestExperienceTip: 'Pick a quiet room with enough space for the 6x2.5 ft massage bed.',
      reviews: [
        {
          id: `rev-sp-1`,
          userName: 'Sweety Jain',
          rating: 5,
          date: 'Aug 31, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Bhot bhot bhot accha massage tha, pain me turant relief mila. Anjali ji ne bahut ache se point dabaye, knee pain bhi kam hua. Very satisfied!',
          helpfulCount: 42,
        },
        {
          id: `rev-sp-2`,
          userName: 'Ritika Thakur',
          rating: 5,
          date: 'Aug 31, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Excellent service! Very professional and polite. The pressure was relaxing and she did a great job. Satisfied with the service, highly recommended!',
          helpfulCount: 38,
        },
        {
          id: `rev-sp-3`,
          userName: 'Grace',
          rating: 5,
          date: 'Aug 30, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'She is experienced & she is awesome. This is my 5th time booking Anjani. She knows how to go about things.',
          helpfulCount: 29,
        },
        {
          id: `rev-sp-4`,
          userName: 'Sreeja',
          rating: 5,
          date: 'Aug 30, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Professional therapist, punctual and very good techniques. Really happy with the services.',
          helpfulCount: 21,
        },
        {
          id: `rev-sp-5`,
          userName: 'Vanita',
          rating: 5,
          date: 'Aug 29, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Extremely attentive and empathetic therapist. Loved the massage. She paid attention to all the pain points I had and went out of her way to relieve the pain.',
          helpfulCount: 56,
        },
        {
          id: `rev-sp-6`,
          userName: 'Sonia Barve',
          rating: 5,
          date: 'Aug 29, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'She has done a great work and she has a nice smile. I would recommend her to anyone who wants to take a massage from her.',
          helpfulCount: 19,
        },
        {
          id: `rev-sp-7`,
          userName: 'Tulika',
          rating: 5,
          date: 'Aug 28, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Excellent service! Very professional! I would like to book her again!',
          helpfulCount: 15,
        },
        {
          id: `rev-sp-8`,
          userName: 'Manon',
          rating: 5,
          date: 'Aug 30, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Nice person. Good massage. She adapted to the pressure I wanted.',
          helpfulCount: 12,
        },
        {
          id: `rev-sp-9`,
          userName: 'Kriti Tiwari',
          rating: 5,
          date: 'Aug 30, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'The service was extremely good on her part. I highly recommend her for your next service.',
          helpfulCount: 34,
        },
        {
          id: `rev-sp-10`,
          userName: 'Tasneem',
          rating: 5,
          date: 'Aug 30, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Excellent massaging technique. It has helped with my leg ache.',
          helpfulCount: 27,
        },
      ],
    };
  }

  if (isAppliance) {
    return {
      bannerTag: 'CERTIFIED APPLIANCE REPAIR',
      bannerHeadline: 'Original OEM Parts & Diagnostic Check',
      bannerSubtitle: 'Same-day resolution with 30-day rework warranty',
      bannerImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80',
      idealFor: [
        {
          title: 'Sudden breakdown or power trip',
          image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Excess noise, vibration or leakage',
          image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Low performance & high power bills',
          image: 'https://images.unsplash.com/photo-1558441719-79753c15ec97?w=400&auto=format&fit=crop&q=80',
        },
      ],
      whenToAvoid: [
        'Appliance dropped or dented body structure',
        'Unauthorized third party gas soldering without safety ventilation',
      ],
      techniques: [
        {
          title: 'Digital multimeter & gas pressure diagnostics',
          description: 'Pinpoints the exact faulty capacitor, thermostat or relay without guesswork.',
          image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Precision component replacement & sealing',
          description: 'Only 100% manufacturer verified spare parts installed with upfront pricing.',
          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
        },
      ],
      consultationTitle: 'Pre-service fault diagnosis',
      consultationDesc: 'Technician tests circuit load, checks error codes, and explains quote before beginning.',
      consultationPoints: ['Error code scan', 'Part health report', 'Upfront pricing quote'],
      consultationImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
      includesSteps: [
        {
          step: 1,
          title: 'Comprehensive multi-point inspection',
          description: 'Testing motor, thermostat, wiring harnesses, and drainage.',
          image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 2,
          title: 'Fault isolation & transparent quoting',
          description: 'Explaining the issue with digital rate card verification.',
          image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 3,
          title: 'Part replacement / deep servicing',
          description: 'Execution using certified torque tools and insulated safety gear.',
          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 4,
          title: 'Full load test & warranty activation',
          description: '15-minute uninterrupted trial in customer presence to verify zero noise or leaks.',
          image: 'https://images.unsplash.com/photo-1558441719-79753c15ec97?w=400&auto=format&fit=crop&q=80',
        },
      ],
      setupTitle: 'Appliance Repair Toolkit',
      setupDimensions: 'Heavy Duty Tech Kit + Protective Floor Mat',
      setupImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=500&auto=format&fit=crop&q=80',
      expertBadgeTitle: 'Expertise you can trust, care you can feel',
      expertPoints: [
        'Police verified and background checked',
        'Certified OEM technicians with 5+ yrs experience',
        '30-Day UrgentLyfe rework warranty',
      ],
      expertImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
      beforeYouBookGuidelines: [
        'Ensure appliance is connected to stable electrical power.',
        'Keep the area surrounding the appliance clear of obstacles.',
        'Spare parts cost will be confirmed with you before fitting.',
      ],
      bestExperienceTip: 'Turn off the appliance 15 minutes before the technician arrives so parts are cool.',
      reviews: [
        {
          id: `rev-ap-1`,
          userName: 'Amitabh Sen',
          rating: 5,
          date: 'Sep 2, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Very professional technician. Arrived in 25 minutes, identified the issue instantly and fixed it with original part. Great experience!',
          helpfulCount: 45,
        },
        {
          id: `rev-ap-2`,
          userName: 'Pooja Hegde',
          rating: 5,
          date: 'Sep 1, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Transparent pricing. They showed the standard rate card in the app before touching anything. No hidden charges!',
          helpfulCount: 39,
        },
        {
          id: `rev-ap-3`,
          userName: 'Vikram Khurana',
          rating: 5,
          date: 'Aug 29, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Fixed on the same day. Saved me from buying a new machine. Highly recommend UrgentLyfe repair team!',
          helpfulCount: 31,
        },
        {
          id: `rev-ap-4`,
          userName: 'Meenakshi Sundaram',
          rating: 5,
          date: 'Aug 27, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'The technician wore shoe covers and left the kitchen neat and clean. 5-star service.',
          helpfulCount: 24,
        },
      ],
    };
  }

  if (isCleaning) {
    return {
      bannerTag: 'DEEP CLEANING',
      bannerHeadline: 'Hospital-Grade Eco Disinfectants',
      bannerSubtitle: 'Stain extraction, mechanized buffing & 99.9% germ kill',
      bannerImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80',
      idealFor: [
        {
          title: 'Hard water stains & yellow tile grout',
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Deep sofa oil stains & dust mites',
          image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Pre-shift or post-renovation dust clearing',
          image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&auto=format&fit=crop&q=80',
        },
      ],
      whenToAvoid: [
        'Fresh wall paint not yet fully dry (under 7 days)',
        'Delicate antique silk fabric that requires specialized dry cleaning',
      ],
      techniques: [
        {
          title: 'Mechanized scrubbing & rotary brush machine',
          description: 'Removes deep limescale and grime without scratching ceramic or marble surfaces.',
          image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Industrial injection-extraction vacuuming',
          description: 'Pulls out embedded dust mites, pet dander and stains from deep upholstery layers.',
          image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&auto=format&fit=crop&q=80',
        },
      ],
      consultationTitle: 'Pre-cleaning surface assessment',
      consultationDesc: 'Supervisor checks tile types, delicate mirrors, and asks about priority stain areas.',
      consultationPoints: ['Surface sensitivity', 'Stain identification', 'High touch zones'],
      consultationImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=80',
      includesSteps: [
        {
          step: 1,
          title: 'Dry dust & cobweb eradication',
          description: 'High-reach microfiber poles to clear all ceiling corners and fan blades.',
          image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 2,
          title: 'Chemical foam application & dwell time',
          description: 'Diversey / Taski certified anti-bacterial solution breaks down tough scum.',
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 3,
          title: 'Mechanized rotary scrub & jet rinse',
          description: 'Floor tiles and walls buffed and rinsed to restore original shine.',
          image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 4,
          title: 'Wipe dry, chrome polish & quality walkthrough',
          description: 'Faucets polished with anti-watermark cream; complete customer inspection.',
          image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=80',
        },
      ],
      setupTitle: 'Cleaning Station & Diversey Kit',
      setupDimensions: 'Single Disc Scrubber + Wet Vacuum',
      setupImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80',
      expertBadgeTitle: 'Expertise you can trust, care you can feel',
      expertPoints: [
        'Police verified crew with identity cards',
        'Equipped with 6+ Diversey hospital grade chemicals',
        '30-day rework happiness guarantee',
      ],
      expertImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      beforeYouBookGuidelines: [
        'Please ensure continuous water supply and electrical sockets for machines.',
        'Keep jewelry and cash secured in lockers.',
      ],
      bestExperienceTip: 'Keep exhaust fan running during and 15 mins after cleaning to speed up drying.',
      reviews: [
        {
          id: `rev-cl-1`,
          userName: 'Ananya Sharma',
          rating: 5,
          date: 'Aug 30, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Bathrooms look completely brand new! The hard water stains on glass partition were stubborn, but they vanished completely. 10/10!',
          helpfulCount: 48,
        },
        {
          id: `rev-cl-2`,
          userName: 'Deepak Chopra',
          rating: 5,
          date: 'Aug 28, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Punctual team, brought all professional vacuum and scrubbing tools. Did not ask for anything except water.',
          helpfulCount: 35,
        },
        {
          id: `rev-cl-3`,
          userName: 'Sanyukta Patil',
          rating: 5,
          date: 'Aug 26, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Sofa cleaning removed year-old coffee stains. Smells fresh and clean. Very satisfied!',
          helpfulCount: 27,
        },
      ],
    };
  }

  if (isSalon) {
    return {
      bannerTag: "SALON & GROOMING",
      bannerHeadline: 'Monodose Kits & Sealed Disposables',
      bannerSubtitle: '100% hygienic salon experience in the comfort of home',
      bannerImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&auto=format&fit=crop&q=80',
      idealFor: [
        {
          title: 'Office grooming & pre-wedding preparation',
          image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Tired dull skin needing deep detan',
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Convenient home styling without salon waiting',
          image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&auto=format&fit=crop&q=80',
        },
      ],
      whenToAvoid: [
        'Active open wounds or severe skin rashes on face',
        'Chemical peels done within last 48 hours',
      ],
      techniques: [
        {
          title: 'Single-use sealed hygiene disposables',
          description: 'Towels, bedsheets, wax strips and blades opened right in front of you.',
          image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Acupressure facial & scalp muscle stimulation',
          description: 'Enhances micro-circulation to give natural radiance and glow.',
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80',
        },
      ],
      consultationTitle: 'Skin & hair type consultation',
      consultationDesc: 'Beautician inspects skin sensitivity and selects suitable products tailored for you.',
      consultationPoints: ['Skin sensitivity', 'Allergy check', 'Desired look / style'],
      consultationImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80',
      includesSteps: [
        {
          step: 1,
          title: 'Hygiene prep & disposable cape setup',
          description: 'Sanitizing hands and tools, setting up disposable floor sheet.',
          image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 2,
          title: 'Cleansing & gentle exfoliation',
          description: 'Single-dose sachet opened in front of you to clear dirt and oil.',
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 3,
          title: 'Core treatment & styling',
          description: 'Precision haircut, facial massage, or waxing with painless technique.',
          image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 4,
          title: 'Zero mess cleanup & mirror review',
          description: 'All cut hair and used disposables packed into waste bag leaving room spotless.',
          image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&auto=format&fit=crop&q=80',
        },
      ],
      setupTitle: 'Salon at Home Mat & Kit',
      setupDimensions: 'Salon Chair Drape + Disposable Kit',
      setupImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&auto=format&fit=crop&q=80',
      expertBadgeTitle: 'Expertise you can trust, care you can feel',
      expertPoints: [
        'Police verified professional stylists',
        'Top beauty academy certified with 5+ yrs experience',
        'Strict zero-mess cleanup pledge',
      ],
      expertImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      beforeYouBookGuidelines: [
        'Pick a well-lit chair near a mirror or electrical socket.',
        'Inform the professional about skin allergies or product sensitivities.',
      ],
      bestExperienceTip: 'Sit back and enjoy the relaxing head massage and steam.',
      reviews: [
        {
          id: `rev-sl-1`,
          userName: 'Kavita Joshi',
          rating: 5,
          date: 'Sep 1, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Best salon service at home! Single use kits were opened in front of me. Completely hygienic and safe.',
          helpfulCount: 52,
        },
        {
          id: `rev-sl-2`,
          userName: 'Rohan Mehra',
          rating: 5,
          date: 'Aug 29, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Great haircut and beard trim. Cleaned up all hair afterward, zero mess left on floor!',
          helpfulCount: 41,
        },
        {
          id: `rev-sl-3`,
          userName: 'Preeti Deshmukh',
          rating: 5,
          date: 'Aug 27, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Facial massage was so relaxing. My skin feels soft and radiant. Booking again next month.',
          helpfulCount: 33,
        },
      ],
    };
  }

  if (isAC) {
    return {
      bannerTag: 'AIR CONDITIONER EXPERT CARE',
      bannerHeadline: 'Power Jet Cleaning & Precision Gas Charging',
      bannerSubtitle: '2X deeper cooling with anti-bacterial foam jet & 30-day warranty',
      bannerImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80',
      idealFor: [
        {
          title: 'AC cooling slowly or low airflow',
          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Foul odor or water dripping indoors',
          image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Pre-summer tune-up to cut electricity bills',
          image: 'https://images.unsplash.com/photo-1558441719-79753c15ec97?w=400&auto=format&fit=crop&q=80',
        },
      ],
      whenToAvoid: [
        'Active heavy rain with outdoor condenser in open terrace without shelter',
        'Severe electrical short circuit tripping main meter immediately',
      ],
      techniques: [
        {
          title: '2X Deeper Power Foam Jet Technology',
          description: 'Penetrates deep into evaporator cooling coil fins, flushing stubborn micro-dust without fin bending.',
          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: '100% Weighed Refrigerant Gas Charging',
          description: 'Digital electronic weighing scale ensures exact gram-accurate gas charging as per manufacturer specs.',
          image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80',
        },
      ],
      consultationTitle: 'Pre-Service AC Diagnostic & Grill Temp Test',
      consultationDesc: 'Technician checks airflow velocity with anemometer, checks amp draw, and takes baseline temperature.',
      consultationPoints: ['Baseline Grill Temp', 'Airflow Velocity Test', 'Refrigerant Pressure Scan'],
      consultationImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
      includesSteps: [
        {
          step: 1,
          title: 'Pre-service 9-point health check',
          description: 'Testing starting voltage, current amps, and existing grill temperature differential.',
          image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 2,
          title: 'Full AC waterproof jacket mounting',
          description: 'Patented spill-proof jacket wraps around indoor unit, channeling dirty water into a bucket.',
          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 3,
          title: 'Foam spray & high-pressure jet wash',
          description: 'Active foam loosens caked dirt and high pressure pure jet rinses coils sparkling clean.',
          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 4,
          title: 'Post-service cooling verification',
          description: 'Measuring drop in grill temperature to ensure rapid, ice-cold room cooling.',
          image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80',
        },
      ],
      setupTitle: 'UrgentLyfe Pro AC Service Rig',
      setupDimensions: 'High-Pressure Jet + Spill-Proof Catchment Jacket',
      setupImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80',
      expertBadgeTitle: 'Certified Master Refrigeration Technicians',
      expertPoints: [
        'UrgentLyfe Certified HVAC Technicians with 5+ yrs field experience',
        'Use only company-sealed R32 / R410a genuine refrigerants',
        'Covered under 30-Day UrgentLyfe Happiness & Cooling Guarantee',
      ],
      expertImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
      beforeYouBookGuidelines: [
        'Keep continuous water supply and power connection available for the jet machine.',
        'Clear fragile decorative items beneath the indoor AC unit.',
      ],
      bestExperienceTip: 'Turn on the AC 10 minutes before the partner arrives so baseline coil temp can be measured immediately.',
      reviews: [
        {
          id: 'rev-ac-1',
          userName: 'Vikramaditya Roy',
          rating: 5,
          date: 'Sep 02, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Unbelievable difference! The foam jet brought out thick black muck from coils. Room cooled down from 32°C to 22°C in just 10 mins. Worth every rupee!',
          helpfulCount: 88,
        },
        {
          id: 'rev-ac-2',
          userName: 'Ananya Deshmukh',
          rating: 5,
          date: 'Aug 29, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Technician Amit had an awesome spill-proof jacket, not a single water droplet spilled on my wooden floor or wall. Very professional!',
          helpfulCount: 64,
        },
        {
          id: 'rev-ac-3',
          userName: 'Rohan Mehra',
          rating: 5,
          date: 'Aug 27, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Refilled gas using electronic weighing scale. Showed me the exact weight and pressure gauge before and after. 100% genuine.',
          helpfulCount: 42,
        },
      ],
    };
  }

  if (isPainting) {
    return {
      bannerTag: 'REVAMP WALLS & PAINTING',
      bannerHeadline: 'Laser-Measured, Dustless & 100% Asian Paints Genuine',
      bannerSubtitle: 'From fluted PVC wall panels to Royale luxury metallic textures',
      bannerImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=80',
      idealFor: [
        {
          title: 'Peeling paint, dampness or white efflorescence',
          image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Modern living room accent wall makeover',
          image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Rental handover or festive pre-Diwali repainting',
          image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop&q=80',
        },
      ],
      whenToAvoid: [
        'Active pipe bursting inside wall before plumber seals the core leak',
        'Direct heavy monsoon rainwater seeping through broken exterior roof',
      ],
      techniques: [
        {
          title: 'Dustless Mechanized Vacuum Sanding',
          description: 'Orbital sanders connected to HEPA vacuum catchers prevent toxic paint powder in your home.',
          image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: '3-Layer Damp-Proof Chemical Barrier',
          description: 'Waterproof polymer coating locks internal masonry moisture from reaching the top finish coat.',
          image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&auto=format&fit=crop&q=80',
        },
      ],
      consultationTitle: 'Free Laser Measurement & Digital Shade Visualizer',
      consultationDesc: 'Dedicated site manager measures square footage with laser precision and presents physical shade swatches.',
      consultationPoints: ['Exact Sq Ft Measurement', 'Physical Swatches', 'Fixed Itemized Quote'],
      consultationImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=80',
      includesSteps: [
        {
          step: 1,
          title: 'Complete furniture & floor masking',
          description: 'Heavy duty plastic drop sheets protect your sofa, TV, and flooring from any splatters.',
          image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 2,
          title: 'Putty repair & dustless sanding',
          description: 'Smoothing surface cracks and sanding with vacuum sanders for mirror-smooth adhesion.',
          image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 3,
          title: 'Primer & twin coat painting / paneling',
          description: 'Applying primer followed by two luxurious coats of Asian Paints or interlocking PVC panels.',
          image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 4,
          title: 'Post-paint deep cleanup & floor mop',
          description: 'Masking removal, furniture repositioning, and floor cleanup leaving home ready to live in.',
          image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&auto=format&fit=crop&q=80',
        },
      ],
      setupTitle: 'Mechanized Painting & Revamp Kit',
      setupDimensions: 'Dustless Sander + Airless Paint Spray + Floor Masking Roll',
      setupImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=80',
      expertBadgeTitle: 'Asian Paints Certified Master Painters',
      expertPoints: [
        'Dedicated Project Manager assigned for daily progress updates',
        '100% genuine sealed cans opened directly in front of you',
        'Up to 3-Year warranty against flaking and bubbling',
      ],
      expertImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
      beforeYouBookGuidelines: [
        'Ensure basic elevator or staircase access for material delivery.',
        'Inform site manager if walls have past history of severe seepage.',
      ],
      bestExperienceTip: 'Use natural sunlight and room night lighting to inspect the physical shade swatch before final approval.',
      reviews: [
        {
          id: 'rev-paint-1',
          userName: 'Sunil Varghese',
          rating: 5,
          date: 'Sep 01, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'We got the fluted wall panels and Royale Play texture done in our drawing room. It looks straight out of an architectural magazine! Zero mess left behind.',
          helpfulCount: 77,
        },
        {
          id: 'rev-paint-2',
          userName: 'Priya Nambiar',
          rating: 5,
          date: 'Aug 26, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'The dustless sander is a game changer! In our previous paint job our whole house was full of dust. UrgentLyfe painters were neat, polite and fast.',
          helpfulCount: 51,
        },
      ],
    };
  }

  if (isPestControl) {
    return {
      bannerTag: 'PEST CONTROL & TERMITE DEFENSE',
      bannerHeadline: 'Herbal, Odorless & Child-Safe Pest Elimination',
      bannerSubtitle: 'Government approved Bayer / Syngenta chemicals with warranty',
      bannerImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80',
      idealFor: [
        {
          title: 'German cockroaches crawling in kitchen drawers',
          image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Hollow wooden door frames with termite mud tubes',
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Bed bug bites and itchiness at night',
          image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&auto=format&fit=crop&q=80',
        },
      ],
      whenToAvoid: [
        'Severe chemical sensitivities without wearing recommended face mask',
        'Leaving open cooked food uncovered on kitchen countertop during misting',
      ],
      techniques: [
        {
          title: 'Herbal Gel Dot Matrix (No Emptying Cupboards)',
          description: 'Targeted gel droplets placed inside hinges and under sinks. Cockroaches consume bait and infect the entire colony.',
          image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Drill-Fill-Seal Anti-Termite Chemical Barrier',
          description: 'Holes drilled at 45° angle every 1 foot along wall-skirting, pressure-injected with termiticide and sealed flush.',
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80',
        },
      ],
      consultationTitle: 'Pest Infestation Audit & Breeding Point Mapping',
      consultationDesc: 'Specialist traces pest entry points along kitchen pipes, false ceilings, and wooden wardrobes.',
      consultationPoints: ['Kitchen Drain Scan', 'Termite Wood Knock Test', 'Entry Crevice Sealing'],
      consultationImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80',
      includesSteps: [
        {
          step: 1,
          title: 'Targeted gel baiting in kitchen & bathrooms',
          description: 'Applying odorless food-grade gel dots behind microwaves, hinges, and sink traps.',
          image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 2,
          title: 'Residual barrier spray along skirting boards',
          description: 'Spraying odorless synthetic pyrethroid along wall perimeter to eliminate moving insects.',
          image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 3,
          title: 'Drainage pipe granule treatment',
          description: 'Flushing kitchen sink pipe and bathroom drain traps with specialized larvae-neutralizing granules.',
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 4,
          title: 'Post-service warranty card handover',
          description: 'Providing pest protection certificate with free re-treatment if pests reappear within warranty.',
          image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&auto=format&fit=crop&q=80',
        },
      ],
      setupTitle: 'Pest Elimination Rig',
      setupDimensions: 'ULV Cold Mister + Precision Gel Gun + Rotary Masonry Drill',
      setupImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80',
      expertBadgeTitle: 'Govt. Licensed Urban Pest Management Officers',
      expertPoints: [
        '100% CIB (Central Insecticides Board) approved Bayer chemicals',
        'Safe for infants, elderly grandparents and indoor pets',
        'Up to 1 to 5 years warranty with free follow-up visits',
      ],
      expertImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
      beforeYouBookGuidelines: [
        'No need to empty kitchen cabinets for herbal gel cockroach treatment.',
        'Cover aquarium fish tanks and open drinking water jars during perimeter spray.',
      ],
      bestExperienceTip: 'Keep kitchen counters dry before sleeping for the first 3 days to force roaches toward the active gel bait.',
      reviews: [
        {
          id: 'rev-pest-1',
          userName: 'Arjun Bansal',
          rating: 5,
          date: 'Aug 30, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Cockroaches were rampant in our modular kitchen. The technician applied small gel dots without asking us to unpack everything. Within 48 hours, all roaches disappeared!',
          helpfulCount: 62,
        },
        {
          id: 'rev-pest-2',
          userName: 'Dr. Meenakshi Sundaram',
          rating: 5,
          date: 'Aug 24, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Done termite drill & seal treatment for our wooden door frames. Color-matched chalk seals made the drill holes invisible. Excellent workmanship.',
          helpfulCount: 45,
        },
      ],
    };
  }

  if (isCarpentry) {
    return {
      bannerTag: 'EXPERT CARPENTRY & FURNITURE FIX',
      bannerHeadline: 'Precision Woodworking, Hardware & Door Lock Fitting',
      bannerSubtitle: 'From Godrej mortise locks to hydraulic beds & smooth wardrobe sliders',
      bannerImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=80',
      idealFor: [
        {
          title: 'Sagging kitchen cabinet doors or creaking hinges',
          image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Stuck sliding wardrobe door jumping off tracks',
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'IKEA / Pepperfry flatpack furniture assembly',
          image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80',
        },
      ],
      whenToAvoid: [
        'Severely decayed rotting wood eaten completely by termites needing structural replacement',
        'Glass cutting or beveling work at site without factory machinery',
      ],
      techniques: [
        {
          title: 'Precision Router Template Chisel',
          description: 'Creates flawless mortise cavity for Godrej & Yale locks without splintering decorative door veneer.',
          image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Tandem Ball-Bearing Steel Roller Replacement',
          description: 'Replaces flimsy plastic wheels with twin heavy-duty steel bearings for effortless one-finger sliding.',
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop&q=80',
        },
      ],
      consultationTitle: 'Door Alignment & Plywood Health Check',
      consultationDesc: 'Master carpenter inspects door squareness, hinge screw tightness, and drawer telescopic channels.',
      consultationPoints: ['Hinge Screw Hold', 'Door Clearances', 'Hardware Specification'],
      consultationImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=80',
      includesSteps: [
        {
          step: 1,
          title: 'Measurement & alignment check',
          description: 'Assessing gap clearances with spirit level to prevent door rubbing on floor tiles.',
          image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 2,
          title: 'Hardware removal & screw hole reinforcement',
          description: 'Plugging stripped screw holes with hardwood dowels & epoxy glue for indestructible grip.',
          image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 3,
          title: 'High-torque screw mounting & fine tuning',
          description: 'Driving brass/SS screws and adjusting 3-way soft-close cam screws for seamless shut.',
          image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 4,
          title: 'Lubrication, sawdust vacuum & trial',
          description: 'Spraying silicone lube on rollers, vacuuming wood shavings, and testing smooth operation.',
          image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&auto=format&fit=crop&q=80',
        },
      ],
      setupTitle: 'Professional Carpenter Kit',
      setupDimensions: 'DeWalt Cordless High-Torque Drill + Wood Chisel Set + Laser Level',
      setupImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=80',
      expertBadgeTitle: 'Skilled Master Woodworkers',
      expertPoints: [
        'Background-verified carpenters trained in modular European fittings (Hafele/Hettich)',
        '30-Day Happiness Guarantee covering rework and alignment',
        'Standardized labor rate card with zero surprise charges',
      ],
      expertImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
      beforeYouBookGuidelines: [
        'If assembling new boxed furniture, keep all assembly instruction sheets and hardware bags together.',
        'Ensure power outlet is reachable for charging cordless tools.',
      ],
      bestExperienceTip: 'Keep replacement lock set or handles ready, or ask the carpenter to bring branded options from his vehicle.',
      reviews: [
        {
          id: 'rev-carp-1',
          userName: 'Mohit Chhabra',
          rating: 5,
          date: 'Sep 03, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Assembled a heavy king-sized hydraulic storage bed in under 90 minutes. Everything is solid, squeak-free, and lifts smoothly.',
          helpfulCount: 56,
        },
        {
          id: 'rev-carp-2',
          userName: 'Kavita Joshi',
          rating: 5,
          date: 'Aug 25, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Replaced jammed wardrobe rollers with heavy duty tandem ones. My wardrobe door now glides effortlessly like butter!',
          helpfulCount: 41,
        },
      ],
    };
  }

  if (isPlumbing) {
    return {
      bannerTag: 'MASTER PLUMBING & SANITARY',
      bannerHeadline: 'Rapid Pipe Fix, Drain Jetting & Tank Sanitation',
      bannerSubtitle: 'Acoustic leak pinpointing, zero tile breaking & genuine brass fittings',
      bannerImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&auto=format&fit=crop&q=80',
      idealFor: [
        {
          title: 'Burst pipe flooding or concealed ceiling seepage',
          image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Choked kitchen sink, bathroom gully trap or toilet',
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Continuous toilet cistern hiss & low tap water pressure',
          image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&auto=format&fit=crop&q=80',
        },
      ],
      whenToAvoid: [
        'Main municipal street supply water line burst outside your apartment compound wall',
      ],
      techniques: [
        {
          title: 'High-Torque Mechanical Drain Snaking',
          description: 'Electric spiral auger pulverizes hair knots, solidified cooking grease, and soap scum inside drain pipes.',
          image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Mechanized 6-Stage Water Tank UV Sanitization',
          description: 'Sludge extraction, high-pressure rotary scrub, anti-bacterial foam wash, and ultraviolet ray disinfection.',
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80',
        },
      ],
      consultationTitle: 'Pressure & Water Circuit Diagnosis',
      consultationDesc: 'Plumber isolates flow lines, tests water bar pressure, and checks concealed joints for hairline weeping.',
      consultationPoints: ['Angle Cock Health', 'Water Head Pressure', 'Concealed Joint Acoustic Scan'],
      consultationImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&auto=format&fit=crop&q=80',
      includesSteps: [
        {
          step: 1,
          title: 'Supply isolation & pressure bleed',
          description: 'Shutting inlet valve to prevent water splashing and depressurizing the line safely.',
          image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 2,
          title: 'Dismantling & heavy-duty thread prep',
          description: 'Extracting calcified washers and applying 15 layers of PTFE Teflon tape over threads.',
          image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 3,
          title: 'Precision installation with CPVC solvent weld',
          description: 'Tightening fittings with non-marring wrenches and solvent welding high-pressure pipe unions.',
          image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 4,
          title: 'Full flow pressure test & clean-up',
          description: 'Opening main valve, running high pressure test, and wiping all tiles spotless.',
          image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&auto=format&fit=crop&q=80',
        },
      ],
      setupTitle: 'Master Plumber Tool Arsenal',
      setupDimensions: 'Electric Drain Auger + Pipe Threader + Digital Pressure Gauge',
      setupImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&auto=format&fit=crop&q=80',
      expertBadgeTitle: 'Certified Master Plumbers',
      expertPoints: [
        'Trained in multi-brand fittings: Kohler, Jaquar, Hindware, Parryware',
        'Use only ISI-marked CPVC / UPVC pipes and brass spindle parts',
        '30-Day UrgentLyfe warranty against weeping or drip recurrences',
      ],
      expertImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
      beforeYouBookGuidelines: [
        'Know the location of your main water control valve so it can be shut off quickly in case of sudden burst leaks.',
      ],
      bestExperienceTip: 'Avoid pouring toxic chemical acid into drain pipes before technician arrives, as acid fumes can pit chrome fixtures.',
      reviews: [
        {
          id: 'rev-plumb-1',
          userName: 'Naveen Aggarwal',
          rating: 5,
          date: 'Sep 02, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Kitchen sink was completely backed up and overflowing. Plumber used an electric snaking cable and cleared the blockage in 15 minutes. Great relief!',
          helpfulCount: 68,
        },
        {
          id: 'rev-plumb-2',
          userName: 'Swati Kulkarni',
          rating: 5,
          date: 'Aug 28, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Fixed continuous leaking from concealed flush tank without breaking single tile. Replaced siphon washer and adjusted float. Highly skilled.',
          helpfulCount: 47,
        },
      ],
    };
  }

  if (isElectrical) {
    return {
      bannerTag: 'MASTER ELECTRICAL & SMART AUTOMATION',
      bannerHeadline: 'Shock-Proof Wiring, MCB Diagnosis & Smart Living',
      bannerSubtitle: 'From digital smart biometric locks to false ceiling chandelier fitting',
      bannerImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80',
      idealFor: [
        {
          title: 'MCB constantly tripping or burnt switchboard smell',
          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Smart door lock, CCTV or video doorbell installation',
          image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Heavy chandelier or profile strip ceiling lighting',
          image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop&q=80',
        },
      ],
      whenToAvoid: [
        'Main government electric pole line fault outside building boundary',
      ],
      techniques: [
        {
          title: 'True RMS Multimeter & Thermal Breaker Scan',
          description: 'Identifies phase load imbalances and hidden wire shorts inside conduit pipes without tearing down plaster.',
          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
        },
        {
          title: 'Laser Centering & Heavy Toggle Ceiling Anchors',
          description: 'Mounts 50kg crystal chandeliers and magnetic track lights securely to concrete slabs.',
          image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop&q=80',
        },
      ],
      consultationTitle: 'Home Electrical Health & Earthing Audit',
      consultationDesc: 'Electrician checks earth resistance, phase-neutral polarities, and calculates total kilowatt load.',
      consultationPoints: ['Phase Balancing', 'Neutral-to-Earth Voltage', 'RCCB 30mA Trip Test'],
      consultationImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80',
      includesSteps: [
        {
          step: 1,
          title: 'Double-pole safety isolation',
          description: 'Turning off main isolator switch and testing circuit deadness with neon voltage probe.',
          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 2,
          title: 'Flame-retardant cable wiring & terminal crimp',
          description: 'Stripping copper leads cleanly and crimping into heat-resistant ceramic or polycarbonate terminals.',
          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 3,
          title: 'Component installation & laser leveling',
          description: 'Securing modular switchboards, smart locks, or ceiling fixtures tightly flush against wall.',
          image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop&q=80',
        },
        {
          step: 4,
          title: 'Load stress test & app pairing handover',
          description: 'Switching on load, testing full current draw, and configuring mobile Wi-Fi app for smart devices.',
          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
        },
      ],
      setupTitle: 'Insulated Electrician Toolkit',
      setupDimensions: '1000V VDE Insulated Tools + Fluke Multimeter + Heavy Hammer Drill',
      setupImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80',
      expertBadgeTitle: 'Licensed Electrical Wiremen',
      expertPoints: [
        'Government wireman licensed technicians with 1000V rated safety gear',
        'Use only ISI-marked FRLS (Flame Retardant Low Smoke) copper wiring',
        '30-Day UrgentLyfe safety & workmanship warranty',
      ],
      expertImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
      beforeYouBookGuidelines: [
        'Ensure access to your apartment main electrical distribution box.',
        'Keep Wi-Fi name and password handy if installing smart locks or CCTV cameras.',
      ],
      bestExperienceTip: 'Always turn off power from the main MCB if you detect any burning wire smell or sparking before the technician reaches.',
      reviews: [
        {
          id: 'rev-elec-1',
          userName: 'Deepak Singhania',
          rating: 5,
          date: 'Sep 01, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'Installed Godrej smart biometric door lock and programmed all fingerprints in 30 minutes. Super clean installation and explained the phone app clearly.',
          helpfulCount: 73,
        },
        {
          id: 'rev-elec-2',
          userName: 'Neha Bakshi',
          rating: 5,
          date: 'Aug 29, 2024',
          serviceTag: `For ${service.title}`,
          comment: 'MCB was tripping every time we turned on the geyser. Electrician identified a neutral leakage inside the junction box and repaired it immediately. Very grateful!',
          helpfulCount: 59,
        },
      ],
    };
  }

  // Fallback for Plumbing / Electrical / General Repairs
  return {
    bannerTag: 'EXPRESS HOME REPAIR',
    bannerHeadline: 'Certified Tools & Transparent Rate Card',
    bannerSubtitle: 'Instant fix for leaks, wiring faults and fixture installation',
    bannerImage: service.image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
    idealFor: [
      {
        title: 'Emergency leak or power outage',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'New fixture mounting or upgrade',
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&auto=format&fit=crop&q=80',
      },
      {
        title: 'Safe standardized billing',
        image: 'https://images.unsplash.com/photo-1558441719-79753c15ec97?w=400&auto=format&fit=crop&q=80',
      },
    ],
    whenToAvoid: [
      'Unsafe main line live wire without meter access',
      'Structural foundation breaking without municipal permit',
    ],
    techniques: [
      {
        title: 'Acoustic leakage & voltage testing',
        description: 'Advanced non-destructive testing prevents unnecessary wall breaking.',
        image: service.image,
      },
      {
        title: 'Precision installation with heavy duty anchors',
        description: 'Ensures zero wobble, vibration, or leakage for years to come.',
        image: service.image,
      },
    ],
    consultationTitle: 'Pre-repair inspection & quotation',
    consultationDesc: 'Technician examines the fault and discusses replacement parts before starting work.',
    consultationPoints: ['Fault verification', 'Part requirement', 'Fixed rate card'],
    consultationImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
    includesSteps: [
      {
        step: 1,
        title: 'Inspection & safety shutdown',
        description: 'Turning off water valve or MCB before commencing work.',
        image: service.image,
      },
      {
        step: 2,
        title: 'Execution with certified tools',
        description: 'Pipe wrench, thread seal tape, or wire stripper with insulated grips.',
        image: service.image,
      },
      {
        step: 3,
        title: 'Pressure test & leak/continuity check',
        description: 'Verifying that water flows with full pressure and no seeping occurs.',
        image: service.image,
      },
      {
        step: 4,
        title: 'Area cleanup & 30-day rework warranty',
        description: 'Wiping down work area and handing over invoice with warranty.',
        image: service.image,
      },
    ],
    setupTitle: 'Certified Technician Toolkit',
    setupDimensions: 'Heavy Duty Tool Box + Drop Mat',
    setupImage: service.image,
    expertBadgeTitle: 'Expertise you can trust, care you can feel',
    expertPoints: [
      'Police verified background cleared technician',
      '200+ hrs of technical trade training',
      '30-Day UrgentLyfe rework warranty included',
    ],
    expertImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    beforeYouBookGuidelines: [
      'Ensure access to main water valve or main electrical distribution board.',
      'Replacement parts if needed can be procured by technician or provided by you.',
    ],
    bestExperienceTip: 'Turn off the main line if water is overflowing before the technician arrives.',
    reviews: [
      {
        id: `rev-rep-1`,
        userName: 'Saurabh Kumar',
        rating: 5,
        date: 'Aug 31, 2024',
        serviceTag: `For ${service.title}`,
        comment: 'Super fast arrival in 20 minutes! Plumber Ramesh fixed the leaking concealed pipe neatly without damaging tiles. Very happy!',
        helpfulCount: 54,
      },
      {
        id: `rev-rep-2`,
        userName: 'Ritika Thakur',
        rating: 5,
        date: 'Aug 30, 2024',
        serviceTag: `For ${service.title}`,
        comment: 'Professional electrician, had all the right tools and replacement parts in his kit. Finished the work in 15 mins!',
        helpfulCount: 39,
      },
      {
        id: `rev-rep-3`,
        userName: 'Grace',
        rating: 5,
        date: 'Aug 29, 2024',
        serviceTag: `For ${service.title}`,
        comment: 'Punctual, polite, and very clear with pricing. Will definitely use again for any home repair.',
        helpfulCount: 31,
      },
      {
        id: `rev-rep-4`,
        userName: 'Vanita',
        rating: 5,
        date: 'Aug 28, 2024',
        serviceTag: `For ${service.title}`,
        comment: 'Extremely attentive and skilled technician. Resolved the issue on the spot. Highly recommended!',
        helpfulCount: 26,
      },
    ],
  };
}
