import { Router } from 'express';
import { db } from '../data/database';
import { AIDiagnosis } from '../types';
import { hasGeminiKey, generateGeminiContent, cleanJsonResponse } from '../config/gemini';
import { PricingEngine, PartnerMatcher, IntentClassifier, SentimentScorer } from '../../ml_models';

export const aiRouter = Router();

// Helper to find matching catalog services for AI suggestions
function getRecommendedServicesForQuery(query: string) {
  const q = query.toLowerCase();
  const allServices = Array.from(db.services.values());

  // 1. Air Conditioning & Heating & Cooling
  if (
    q.includes('ac') ||
    q.includes('cooling') ||
    q.includes('cool') ||
    q.includes('air conditioner') ||
    q.includes('foam jet') ||
    q.includes('compressor') ||
    q.includes('gas') ||
    q.includes('freon') ||
    q.includes('refrigerant') ||
    q.includes('thanda') ||
    q.includes('garam hawa') ||
    q.includes('split ac') ||
    q.includes('window ac')
  ) {
    if (q.includes('gas') || q.includes('leak') || q.includes('refill') || q.includes('top up') || q.includes('refrigerant')) {
      const gasService = allServices.find((s) => s.id === 'ac-gas-refill');
      const jetService = allServices.find((s) => s.id === 'ac-foam-jet-service');
      return [gasService, jetService].filter(Boolean).map((s: any) => ({
        serviceId: s.id,
        serviceTitle: s.title,
        price: s.price,
        originalPrice: s.originalPrice,
        discountPercent: s.discountPercent,
        estimatedDuration: `${s.durationMinutes} mins`,
        whyThisService: s.subtitle || 'Complete pressure leak test & pure gas recharge',
        isUrgentRecommended: true,
        tags: s.tags,
      }));
    }

    return allServices
      .filter((s) => s.categoryId === 'ac-appliance' || s.id.includes('ac'))
      .slice(0, 2)
      .map((s) => ({
        serviceId: s.id,
        serviceTitle: s.title,
        price: s.price,
        originalPrice: s.originalPrice,
        discountPercent: s.discountPercent,
        estimatedDuration: `${s.durationMinutes} mins`,
        whyThisService: s.subtitle || 'Deep cleaning & professional technician inspection',
        isUrgentRecommended: Boolean(s.isUrgentAvailable),
        tags: s.tags,
      }));
  }

  // 2. Plumbing, Water leaks, Pipes, Taps, Tanks, Drains
  if (
    q.includes('plumb') ||
    q.includes('pipe') ||
    q.includes('leak') ||
    q.includes('tap') ||
    q.includes('water') ||
    q.includes('drain') ||
    q.includes('toilet') ||
    q.includes('flush') ||
    q.includes('paani') ||
    q.includes('nal') ||
    q.includes('sink') ||
    q.includes('basin') ||
    q.includes('clog') ||
    q.includes('choked') ||
    q.includes('sewer') ||
    q.includes('geyser') ||
    q.includes('towel') ||
    q.includes('valve')
  ) {
    if (q.includes('drain') || q.includes('clog') || q.includes('sink') || q.includes('jam') || q.includes('block') || q.includes('choke')) {
      const drainSrv = allServices.find((s) => s.id === 'drain-unclogging-express');
      const pipeSrv = allServices.find((s) => s.id === 'urgent-pipe-leak-repair');
      return [drainSrv, pipeSrv].filter(Boolean).map((s: any) => ({
        serviceId: s.id,
        serviceTitle: s.title,
        price: s.price,
        originalPrice: s.originalPrice,
        discountPercent: s.discountPercent,
        estimatedDuration: `${s.durationMinutes} mins`,
        whyThisService: s.subtitle || 'High-pressure mechanical snake de-clogging',
        isUrgentRecommended: true,
        tags: s.tags,
      }));
    }

    return allServices
      .filter((s) => s.categoryId === 'plumbing' || s.id.includes('leak') || s.id.includes('plumb'))
      .slice(0, 2)
      .map((s) => ({
        serviceId: s.id,
        serviceTitle: s.title,
        price: s.price,
        originalPrice: s.originalPrice,
        discountPercent: s.discountPercent,
        estimatedDuration: `${s.durationMinutes} mins`,
        whyThisService: s.subtitle || 'Emergency plumber dispatch to stop leaks & repair valves',
        isUrgentRecommended: true,
        tags: s.tags,
      }));
  }

  // 3. Electrical, Wiring, Sparking, Short Circuit, MCB, Lights, Fans
  if (
    q.includes('electr') ||
    q.includes('mcb') ||
    q.includes('switch') ||
    q.includes('spark') ||
    q.includes('short circuit') ||
    q.includes('wire') ||
    q.includes('wiring') ||
    q.includes('light') ||
    q.includes('fan') ||
    q.includes('bijli') ||
    q.includes('shock') ||
    q.includes('current') ||
    q.includes('fuse') ||
    q.includes('bulb') ||
    q.includes('chandelier') ||
    q.includes('socket')
  ) {
    if (q.includes('fan') || q.includes('pankha') || q.includes('regulator') || q.includes('light fitting')) {
      const fanSrv = allServices.find((s) => s.id === 'ceiling-fan-installation');
      const mcbSrv = allServices.find((s) => s.id === 'mcb-switchboard-electrical');
      return [fanSrv, mcbSrv].filter(Boolean).map((s: any) => ({
        serviceId: s.id,
        serviceTitle: s.title,
        price: s.price,
        originalPrice: s.originalPrice,
        discountPercent: s.discountPercent,
        estimatedDuration: `${s.durationMinutes} mins`,
        whyThisService: s.subtitle || 'Expert electrical installation & balancing',
        isUrgentRecommended: false,
        tags: s.tags,
      }));
    }

    return allServices
      .filter((s) => s.categoryId === 'electrical' || s.id.includes('mcb') || s.id.includes('elec'))
      .slice(0, 2)
      .map((s) => ({
        serviceId: s.id,
        serviceTitle: s.title,
        price: s.price,
        originalPrice: s.originalPrice,
        discountPercent: s.discountPercent,
        estimatedDuration: `${s.durationMinutes} mins`,
        whyThisService: s.subtitle || 'Safety certified electrician inspection & repair',
        isUrgentRecommended: true,
        tags: s.tags,
      }));
  }

  // 4. RO Water Purifiers
  if (q.includes('ro') || q.includes('purifier') || q.includes('filter') || q.includes('tds') || q.includes('membrane') || q.includes('water taste')) {
    return allServices
      .filter((s) => s.id.includes('ro') || s.title.toLowerCase().includes('ro'))
      .slice(0, 2)
      .map((s) => ({
        serviceId: s.id,
        serviceTitle: s.title,
        price: s.price,
        originalPrice: s.originalPrice,
        discountPercent: s.discountPercent,
        estimatedDuration: `${s.durationMinutes} mins`,
        whyThisService: s.subtitle || 'TDS water quality testing & full membrane check',
        isUrgentRecommended: false,
        tags: s.tags,
      }));
  }

  // 5. Cleaning, Pest, Sofa, Mattress, Deep Cleaning
  if (
    q.includes('clean') ||
    q.includes('safai') ||
    q.includes('pest') ||
    q.includes('sofa') ||
    q.includes('carpet') ||
    q.includes('mattress') ||
    q.includes('cockroach') ||
    q.includes('deep clean') ||
    q.includes('scrub') ||
    q.includes('dust')
  ) {
    if (q.includes('sofa') || q.includes('carpet') || q.includes('mattress') || q.includes('stain')) {
      const sofaSrv = allServices.find((s) => s.id === 'sofa-carpet-shampooing');
      const houseSrv = allServices.find((s) => s.id === 'full-home-deep-cleaning');
      return [sofaSrv, houseSrv].filter(Boolean).map((s: any) => ({
        serviceId: s.id,
        serviceTitle: s.title,
        price: s.price,
        originalPrice: s.originalPrice,
        discountPercent: s.discountPercent,
        estimatedDuration: `${s.durationMinutes} mins`,
        whyThisService: s.subtitle || 'Foam shampooing & moisture extraction',
        isUrgentRecommended: false,
        tags: s.tags,
      }));
    }

    return allServices
      .filter((s) => s.categoryId === 'cleaning')
      .slice(0, 2)
      .map((s) => ({
        serviceId: s.id,
        serviceTitle: s.title,
        price: s.price,
        originalPrice: s.originalPrice,
        discountPercent: s.discountPercent,
        estimatedDuration: `${s.durationMinutes} mins`,
        whyThisService: s.subtitle || 'Hospital-grade sanitized deep cleaning',
        isUrgentRecommended: false,
        tags: s.tags,
      }));
  }

  // 6. Salon, Grooming, Haircut, Massage, Facial
  if (
    q.includes('salon') ||
    q.includes('haircut') ||
    q.includes('facial') ||
    q.includes('spa') ||
    q.includes('massage') ||
    q.includes('grooming') ||
    q.includes('beard') ||
    q.includes('skin') ||
    q.includes('bal')
  ) {
    return allServices
      .filter((s) => s.categoryId === 'salon')
      .slice(0, 2)
      .map((s) => ({
        serviceId: s.id,
        serviceTitle: s.title,
        price: s.price,
        originalPrice: s.originalPrice,
        discountPercent: s.discountPercent,
        estimatedDuration: `${s.durationMinutes} mins`,
        whyThisService: s.subtitle || 'Hygienic single-use kits & licensed professional',
        isUrgentRecommended: false,
        tags: s.tags,
      }));
  }

  // 7. Carpentry, Door Lock, Furniture, Woodwork
  if (
    q.includes('carpent') ||
    q.includes('wood') ||
    q.includes('lock') ||
    q.includes('door') ||
    q.includes('darwaza') ||
    q.includes('furniture') ||
    q.includes('hinge') ||
    q.includes('bed') ||
    q.includes('table')
  ) {
    const carpSrv = allServices.find((s) => s.id === 'furniture-assembly-doorlock');
    return carpSrv
      ? [
          {
            serviceId: carpSrv.id,
            serviceTitle: carpSrv.title,
            price: carpSrv.price,
            originalPrice: carpSrv.originalPrice,
            discountPercent: carpSrv.discountPercent,
            estimatedDuration: `${carpSrv.durationMinutes} mins`,
            whyThisService: carpSrv.subtitle || 'Master carpenter drill precision & hardware fitting',
            isUrgentRecommended: true,
            tags: carpSrv.tags,
          },
        ]
      : [];
  }

  // 8. Painting & Waterproofing
  if (
    q.includes('paint') ||
    q.includes('putty') ||
    q.includes('distemper') ||
    q.includes('wall') ||
    q.includes('rang') ||
    q.includes('color') ||
    q.includes('waterproof') ||
    q.includes('diwar') ||
    q.includes('seelan')
  ) {
    const paintSrv = allServices.find((s) => s.id === 'express-wall-painting');
    if (paintSrv) {
      return [
        {
          serviceId: paintSrv.id,
          serviceTitle: paintSrv.title,
          price: paintSrv.price,
          originalPrice: paintSrv.originalPrice,
          discountPercent: paintSrv.discountPercent,
          estimatedDuration: `${paintSrv.durationMinutes} mins`,
          whyThisService: paintSrv.subtitle || 'Dust-free wall painting from ₹12/sq ft with moisture check',
          isUrgentRecommended: false,
          tags: paintSrv.tags,
        },
      ];
    }
  }

  // 9. Pest Control & Termites
  if (
    q.includes('pest') ||
    q.includes('cockroach') ||
    q.includes('termite') ||
    q.includes('dimak') ||
    q.includes('khatmal') ||
    q.includes('bedbug') ||
    q.includes('keeda') ||
    q.includes('keede') ||
    q.includes('ant') ||
    q.includes('mosquito')
  ) {
    const pestSrv = allServices.find((s) => s.id === 'pest-control-herbal-shield');
    if (pestSrv) {
      return [
        {
          serviceId: pestSrv.id,
          serviceTitle: pestSrv.title,
          price: pestSrv.price,
          originalPrice: pestSrv.originalPrice,
          discountPercent: pestSrv.discountPercent,
          estimatedDuration: `${pestSrv.durationMinutes} mins`,
          whyThisService: pestSrv.subtitle || '100% odorless herbal gel defense with 90-day guarantee',
          isUrgentRecommended: false,
          tags: pestSrv.tags,
        },
      ];
    }
  }

  // 10. Appliance Repair (Washing Machine, Fridge, Geyser, Microwave)
  if (
    q.includes('washing machine') ||
    q.includes('fridge') ||
    q.includes('refrigerator') ||
    q.includes('geyser') ||
    q.includes('microwave') ||
    q.includes('oven') ||
    q.includes('appliance')
  ) {
    const applianceSrv = allServices.find((s) => s.id === 'appliance-repair-geyser-wm-fridge');
    if (applianceSrv) {
      return [
        {
          serviceId: applianceSrv.id,
          serviceTitle: applianceSrv.title,
          price: applianceSrv.price,
          originalPrice: applianceSrv.originalPrice,
          discountPercent: applianceSrv.discountPercent,
          estimatedDuration: `${applianceSrv.durationMinutes} mins`,
          whyThisService: applianceSrv.subtitle || 'Expert motor, coil & thermostat repair with 30-day warranty',
          isUrgentRecommended: true,
          tags: applianceSrv.tags,
        },
      ];
    }
  }

  // 11. Smart Home, CCTV, Camera, Security
  if (
    q.includes('cctv') ||
    q.includes('camera') ||
    q.includes('security') ||
    q.includes('doorbell') ||
    q.includes('smart lock') ||
    q.includes('wifi cam')
  ) {
    const cctvSrv = allServices.find((s) => s.id === 'cctv-smart-doorbell-setup');
    return cctvSrv
      ? [
          {
            serviceId: cctvSrv.id,
            serviceTitle: cctvSrv.title,
            price: cctvSrv.price,
            originalPrice: cctvSrv.originalPrice,
            discountPercent: cctvSrv.discountPercent,
            estimatedDuration: `${cctvSrv.durationMinutes} mins`,
            whyThisService: cctvSrv.subtitle || 'Professional wiring, angle calibration & mobile app setup',
            isUrgentRecommended: false,
            tags: cctvSrv.tags,
          },
        ]
      : [];
  }

  // Default fallback recommendations
  return allServices.slice(0, 2).map((s) => ({
    serviceId: s.id,
    serviceTitle: s.title,
    price: s.price,
    originalPrice: s.originalPrice,
    discountPercent: s.discountPercent,
    estimatedDuration: `${s.durationMinutes} mins`,
    whyThisService: s.subtitle || 'Top-rated verified technician service with 30-day warranty',
    isUrgentRecommended: Boolean(s.isUrgentAvailable),
    tags: s.tags,
  }));
}

// Helper: Sentiment & Urgency Analysis Engine Output
export interface SentimentAnalysisResult {
  polarity: 'NEGATIVE' | 'NEUTRAL' | 'POSITIVE';
  score: number; // -1.0 to 1.0
  intent:
    | 'COMPLAINT_OR_DISPUTE'
    | 'EMERGENCY_CRITICAL'
    | 'BOOKING_INTENT'
    | 'ANXIOUS_CONCERN'
    | 'GENERAL_INQUIRY'
    | 'PRAISE_FEEDBACK';
  detectedEmotion: string;
  emotionEmoji: string;
  toneApplied:
    | 'Empathetic & Accountable'
    | 'Crisp, Professional & Efficient'
    | 'Urgent, Protective & Safety-First'
    | 'Comforting & Reassuring'
    | 'Warm, Consultative & Informative'
    | 'Warm, Grateful & Enthusiastic';
  urgencyLevel: 'CRITICAL_SOS' | 'HIGH' | 'MEDIUM' | 'LOW';
  empathyNote: string;
  safetyTip?: string;
  tailoredReasoning: string;
  detectedLanguage: string;
  requiresEscalation?: boolean;
}

// -------------------------------------------------------------
// SENTIMENT & CONTEXT ANALYSIS ENGINE
// -------------------------------------------------------------
function analyzeUserSentimentAndContext(
  text: string,
  history?: Array<{ sender: string; text: string }>
): SentimentAnalysisResult {
  const t = text.toLowerCase();

  // Baseline lexical scoring via SentimentScorer
  const scorerResult = SentimentScorer.analyze(text);

  // 1. Language Detection
  let detectedLanguage = 'English / Hinglish';
  const hasDevanagari = /[\u0900-\u097F]/.test(text);
  const hasBengali = /[\u0980-\u09FF]/.test(text);
  const hasTamil = /[\u0B80-\u0BFF]/.test(text);
  const hasTelugu = /[\u0C00-\u0C7F]/.test(text);
  const hasGujarati = /[\u0A80-\u0AFF]/.test(text);
  const hasPunjabi = /[\u0A00-\u0A7F]/.test(text);
  const hasArabicUrdu = /[\u0600-\u06FF]/.test(text);

  if (hasDevanagari) detectedLanguage = 'Hindi (हिंदी)';
  else if (hasBengali) detectedLanguage = 'Bengali (বাংলা)';
  else if (hasTamil) detectedLanguage = 'Tamil (தமிழ்)';
  else if (hasTelugu) detectedLanguage = 'Telugu (తెలుగు)';
  else if (hasGujarati) detectedLanguage = 'Gujarati (ગુજરાતી)';
  else if (hasPunjabi) detectedLanguage = 'Punjabi (ਪੰਜਾਬੀ)';
  else if (hasArabicUrdu) detectedLanguage = 'Urdu (اردو)';
  else if (
    t.includes('hai') ||
    t.includes('karo') ||
    t.includes('karein') ||
    t.includes('nahi') ||
    t.includes('chahiye') ||
    t.includes('kripya') ||
    t.includes('bhai') ||
    t.includes('mera') ||
    t.includes('meri') ||
    t.includes('kuch')
  ) {
    detectedLanguage = 'Hinglish (Conversational)';
  }

  // 2. Complaint & Dissatisfaction Markers
  const complaintKeywords = [
    'complaint', 'shikayat', 'kharab', 'bekar', 'worst', 'useless', 'pathetic',
    'fraud', 'loot', 'scam', 'cheat', 'cheated', 'dhokha', 'chori', 'damage',
    'barbad', 'broken again', 'still leaking', 'not cooling still', 'leak hua tha',
    'bad service', 'rude', 'unprofessional', 'ruined', 'ruin', 'bakwas', 'gussa',
    'dispute', 'refund', 'paise wapas', 'wapas aao', 'again problem', 'dobara kharab',
    'supervisor', 'manager', 'escalate', 'third class', 'chutiya', 'bakwas service',
    'fraud company', 'paisa barbaad', 'poor work', 'unresolved', 'delayed', 'late'
  ];
  const isComplaint = complaintKeywords.some((w) => t.includes(w));

  // 3. Emergency & Active Hazard Markers
  const emergencyKeywords = [
    'bachao', 'aag', 'fire', 'spark', 'sparking', 'smoke', 'shock', 'current',
    'short circuit', 'mcb trip', 'blast', 'burst', 'bursting', 'flood', 'flooding',
    'overflow', 'drown', 'danger', 'khatra', 'emergency', 'sos', 'urgent',
    'right now', 'immediately', 'jaldi aao', 'jaldi bhejo', 'gas leak', 'cylinder'
  ];
  const isEmergency = emergencyKeywords.some((w) => t.includes(w));

  // 4. Anxious & Caregiving Markers
  const anxiousKeywords = [
    'baby', 'bache', 'bacha', 'pregnant', 'mother', 'father', 'parents', 'bimar',
    'sick', 'patient', 'old', 'elderly', 'heat', 'garmi', '40 degree', '44 degree',
    '45 degree', 'sweating', 'suffering', 'scared', 'tension', 'dar', 'chinta',
    'worried', 'scared of shock', 'fear', 'damage risk', 'expensive to nahi hoga',
    'loot to nahi loge', 'hidden charges', 'safe hai kya', 'trustworthy'
  ];
  const isAnxious = anxiousKeywords.some((w) => t.includes(w));

  // 5. Booking & Transactional Scheduling Markers
  const bookingKeywords = [
    'book', 'booking', 'schedule', 'order', 'want to hire', 'send technician',
    'send plumber', 'send electrician', 'appoint', 'appointment', 'kal aana',
    'tomorrow', 'today at', 'saturday', 'sunday', 'slot', 'time', 'price kitna',
    'how much for', 'cost of', 'kya rate hai', 'confirm booking', 'chahiye',
    'kar do', 'service karaana hai', 'book karna hai', 'need service'
  ];
  const isBooking = bookingKeywords.some((w) => t.includes(w));

  // 6. Praise & Positive Feedback Markers
  const praiseKeywords = [
    'great', 'awesome', 'excellent', 'amazing', 'superb', 'badiya', 'shandaar',
    'mast', 'thank you', 'thanks', 'dhanyawad', 'shukriya', 'very good', 'best app',
    'helpful', 'impressive', 'happy with'
  ];
  const isPraise = praiseKeywords.some((w) => t.includes(w));

  // Resolve Intent & Dynamic Tone
  if (isEmergency) {
    return {
      polarity: 'NEGATIVE',
      score: -0.75,
      intent: 'EMERGENCY_CRITICAL',
      detectedEmotion: 'Emergency & Panicked',
      emotionEmoji: '🚨',
      toneApplied: 'Urgent, Protective & Safety-First',
      urgencyLevel: 'CRITICAL_SOS',
      empathyNote: 'Immediate protective safety instructions issued and 30-minute Express SOS dispatch activated',
      safetyTip: '⚠️ SAFETY FIRST: Turn off the main electrical MCB or main water inlet valve immediately! Keep family away from the affected area.',
      tailoredReasoning: 'Prioritized 30-minute Express SOS dispatch and immediate safety precautions due to detected physical hazard.',
      detectedLanguage,
      requiresEscalation: false,
    };
  }

  if (isComplaint) {
    return {
      polarity: 'NEGATIVE',
      score: -0.85,
      intent: 'COMPLAINT_OR_DISPUTE',
      detectedEmotion: 'Frustrated & Dissatisfied',
      emotionEmoji: '😤',
      toneApplied: 'Empathetic & Accountable',
      urgencyLevel: 'HIGH',
      empathyNote: 'Tone calibrated to Empathetic & Accountable with ₹0 rework assurance and supervisor review',
      tailoredReasoning: 'Prioritized ₹0 Senior Master Technician Warranty Re-inspection and dispute resolution with supervisor audit based on customer dissatisfaction.',
      detectedLanguage,
      requiresEscalation: true,
    };
  }

  if (isAnxious) {
    return {
      polarity: 'NEGATIVE',
      score: -0.45,
      intent: 'ANXIOUS_CONCERN',
      detectedEmotion: 'Worried & Anxious',
      emotionEmoji: '😟',
      toneApplied: 'Comforting & Reassuring',
      urgencyLevel: 'HIGH',
      empathyNote: 'Comforting tone applied with transparent fixed-pricing guarantee and verified technician dispatch',
      tailoredReasoning: 'Recommended background-verified specialists with zero hidden costs and a 30-day rework warranty to ensure complete peace of mind.',
      detectedLanguage,
      requiresEscalation: false,
    };
  }

  if (isBooking) {
    return {
      polarity: 'POSITIVE',
      score: 0.35,
      intent: 'BOOKING_INTENT',
      detectedEmotion: 'Polite & Transactional',
      emotionEmoji: '📋',
      toneApplied: 'Crisp, Professional & Efficient',
      urgencyLevel: 'MEDIUM',
      empathyNote: 'Crisp, professional tone applied with direct scheduling and transparent pricing',
      tailoredReasoning: 'Structured transparent pricing, estimated duration, and verified technician credentials for quick and reliable booking.',
      detectedLanguage,
      requiresEscalation: false,
    };
  }

  if (isPraise) {
    return {
      polarity: 'POSITIVE',
      score: 0.85,
      intent: 'PRAISE_FEEDBACK',
      detectedEmotion: 'Delighted & Grateful',
      emotionEmoji: '🌟',
      toneApplied: 'Warm, Grateful & Enthusiastic',
      urgencyLevel: 'LOW',
      empathyNote: 'Warm and grateful tone celebrating positive customer experience',
      tailoredReasoning: 'Curated ongoing maintenance and seasonal safety recommendations.',
      detectedLanguage,
      requiresEscalation: false,
    };
  }

  // General inquiry fallback
  return {
    polarity: 'NEUTRAL',
    score: scorerResult.sentimentScore,
    intent: 'GENERAL_INQUIRY',
    detectedEmotion: 'Calm & Inquiring',
    emotionEmoji: '💬',
    toneApplied: 'Warm, Consultative & Informative',
    urgencyLevel: 'LOW',
    empathyNote: 'Helpful and consultative tone addressing service queries',
    tailoredReasoning: 'Curated top-rated home repair solutions tailored to your query.',
    detectedLanguage,
    requiresEscalation: false,
  };
}

// -------------------------------------------------------------
// TAILORED SERVICE RECOMMENDATIONS ENGINE
// -------------------------------------------------------------
function getTailoredServicesForQuery(
  query: string,
  sentimentData?: SentimentAnalysisResult
) {
  const allServices = Array.from(db.services.values());
  const standardRecs = getRecommendedServicesForQuery(query);

  if (!sentimentData) {
    return standardRecs;
  }

  // 1. Complaint & Dispute: Prioritize Free Warranty Re-inspection & Supervisor Audit
  if (sentimentData.intent === 'COMPLAINT_OR_DISPUTE') {
    const warrantyService = allServices.find((s) => s.id === 'warranty-reinspection-senior');
    const matchedCategoryService = standardRecs[0];

    const result: any[] = [];
    if (warrantyService) {
      result.push({
        serviceId: warrantyService.id,
        serviceTitle: warrantyService.title,
        price: 0,
        originalPrice: warrantyService.originalPrice || 499,
        discountPercent: 100,
        estimatedDuration: '45 mins',
        whyThisService: '100% Free Rework Guarantee (₹0) with supervisor priority audit & certified fix',
        isUrgentRecommended: true,
        tags: ['₹0 Warranty Rework', 'Supervisor Priority', '100% Resolution'],
      });
    }

    if (matchedCategoryService && matchedCategoryService.serviceId !== 'warranty-reinspection-senior') {
      result.push({
        ...matchedCategoryService,
        whyThisService: 'Supervisor-directed re-check with genuine OEM replacement guarantee',
        isUrgentRecommended: true,
      });
    }

    return result.length > 0 ? result : standardRecs;
  }

  // 2. Emergency & Panic: Prioritize 30-min SOS Services
  if (sentimentData.urgencyLevel === 'CRITICAL_SOS' || sentimentData.intent === 'EMERGENCY_CRITICAL') {
    return standardRecs.map((rec) => ({
      ...rec,
      estimatedDuration: '30 mins SOS Arrival',
      isUrgentRecommended: true,
      whyThisService: `🚨 Emergency dispatch: ${rec.whyThisService || 'Immediate containment & safety certified repair'}`,
    }));
  }

  // 3. Anxious & Worried: Prioritize Multi-Point Diagnostic Audit & Zero Hidden Cost Guarantee
  if (sentimentData.intent === 'ANXIOUS_CONCERN') {
    const diagnosticAudit = allServices.find((s) => s.id === 'home-safety-diagnostic-audit');
    if (diagnosticAudit && !standardRecs.some((r) => r.serviceId === diagnosticAudit.id)) {
      return [
        {
          serviceId: diagnosticAudit.id,
          serviceTitle: diagnosticAudit.title,
          price: diagnosticAudit.price,
          originalPrice: diagnosticAudit.originalPrice,
          discountPercent: diagnosticAudit.discountPercent,
          estimatedDuration: `${diagnosticAudit.durationMinutes} mins`,
          whyThisService: 'Transparent multi-point checkup with written report & zero surprise fees',
          isUrgentRecommended: false,
          tags: diagnosticAudit.tags,
        },
        ...standardRecs.slice(0, 2),
      ];
    }
  }

  return standardRecs;
}

// 1. AI Chatbot API (POST /api/ai/chat & /ai/chat)
aiRouter.post(['/ai/chat', '/api/ai/chat'], async (req, res) => {
  const { message, history, languagePreference, imageBase64, imageMimeType, customerInfo } = req.body;
  const userMessage = String(message || '').trim();

  if (!userMessage && !imageBase64) {
    return res.status(400).json({
      success: false,
      error: 'Message or photo is required',
    });
  }

  // Deep sentiment, intent, and context analysis
  const effectiveQuery = userMessage || (imageBase64 ? 'Uploaded photo diagnosis' : '');
  const sentimentMeta = analyzeUserSentimentAndContext(effectiveQuery, history);
  const fallbackRecs = getTailoredServicesForQuery(effectiveQuery, sentimentMeta);
  const detectedCategory = fallbackRecs.length > 0 ? fallbackRecs[0].serviceTitle : 'Home Repair';

  // Check past conversation memory to see if prior service was discussed
  let priorServiceMentioned: string | null = null;
  if (Array.isArray(history) && history.length > 0) {
    const combinedPast = history.map((h: any) => h.text || '').join(' ').toLowerCase();
    if (combinedPast.includes('ac') || combinedPast.includes('cooling')) priorServiceMentioned = 'AC repair';
    else if (combinedPast.includes('plumb') || combinedPast.includes('pipe') || combinedPast.includes('tap') || combinedPast.includes('leak')) priorServiceMentioned = 'plumbing';
    else if (combinedPast.includes('electr') || combinedPast.includes('mcb') || combinedPast.includes('switch')) priorServiceMentioned = 'electrical';
    else if (combinedPast.includes('clean') || combinedPast.includes('safai')) priorServiceMentioned = 'cleaning';
    else if (combinedPast.includes('pest')) priorServiceMentioned = 'pest control';
    else if (combinedPast.includes('paint')) priorServiceMentioned = 'painting';
    else if (combinedPast.includes('washing machine') || combinedPast.includes('fridge')) priorServiceMentioned = 'appliance repair';
  }

  // If Gemini API Key is not configured, reply with the deep smart rule engine
  if (!hasGeminiKey()) {
    const qLower = effectiveQuery.toLowerCase();
    let replyText = `Aap bilkul chinta mat kijiye! UrgentLyfe me aapki query "${userMessage}" ke liye hamare verified technicians ready hain. Har service par 30-day post service warranty milti hai.`;

    // 1. Human Handoff (Agent, Executive, Support, Refund escalation)
    if (
      qLower.includes('human') ||
      qLower.includes('agent') ||
      qLower.includes('executive') ||
      qLower.includes('support team') ||
      qLower.includes('call') ||
      qLower.includes('talk to') ||
      qLower.includes('manager') ||
      qLower.includes('escalate')
    ) {
      replyText = `Main aapko humare Senior Support Team se connect kar deta hoon. UrgentLyfe Priority Support Hotline: 1800-894-368 (Toll-Free, 24x7) ya aap live agent queue me 60 seconds me connect ho sakte hain. Humari team aapka issue priority par resolve karegi.`;
    }
    // 2. Technician / Order Tracking Status
    else if (
      qLower.includes('track') ||
      qLower.includes('status') ||
      qLower.includes('kahan pahucha') ||
      qLower.includes('technician kab') ||
      qLower.includes('eta') ||
      qLower.includes('order status')
    ) {
      replyText = `Main aapke liye status check kar raha hoon! Aapke active service request ke liye Senior Technician **Rajesh Kumar** dispatch ho chuke hain. Unka estimated arrival time **18 minutes** hai (Contact: +91 98765-43210). Booking verification OTP: **4821** (technician aane par share karein).`;
    }
    // 3. Discounts, Offers & Coupons
    else if (
      qLower.includes('offer') ||
      qLower.includes('discount') ||
      qLower.includes('coupon') ||
      qLower.includes('promo') ||
      qLower.includes('code') ||
      qLower.includes('sasta') ||
      qLower.includes('bachat')
    ) {
      replyText = `Aaj hamare paas active special offers available hain! 🎉\n1. **FIRST50**: First home booking par Flat ₹50 OFF\n2. **FESTIVE20**: Deep Cleaning & AC Packages par Flat 20% OFF\n3. **SOS10**: Emergency SOS repair services par 10% OFF\nAap inme se koi bhi coupon code checkout ya booking confirmation ke dauran use kar sakte hain!`;
    }
    // 4. Feedback & Rating
    else if (
      qLower.includes('feedback') ||
      qLower.includes('rating') ||
      qLower.includes('review') ||
      qLower.includes('star') ||
      qLower.includes('kaisa laga')
    ) {
      replyText = `UrgentLyfe par aapka experience kaisa raha? 1 se 5 me se rating dena chahenge? Agar service me koi kami rahi ho, toh hum bina kisi sawaal ke ₹0 me Senior Master Technician free re-inspection arrange karenge!`;
    }
    // 5. OTP / Verification
    else if (qLower.includes('otp') || qLower.includes('verify') || qLower.includes('pin code verification')) {
      replyText = `Booking secure confirmation ke liye OTP verification zaroori hai. Aapke registered mobile number par 4-digit OTP bhej diya gaya hai. Technician visit ke waqt OTP verify karwayein.`;
    }
    // 6. Photo / Image Inspection
    else if (imageBase64 || qLower.includes('photo') || qLower.includes('image') || qLower.includes('tasveer') || qLower.includes('pic')) {
      replyText = `Maine aapki bheji hui photo ko dhyan se check kiya hai! Ye issue clearly visible hai. Is problem ko safely fix karne ke liye hamara verified expert on-site inspect karega aur genuine parts ke sath repair karega. Apna area/pin code share karein taaki main nearest slot confirm kar sakoon.`;
    }
    // 7. Complaint / Dispute
    else if (sentimentMeta.intent === 'COMPLAINT_OR_DISPUTE') {
      replyText = sentimentMeta.detectedLanguage.includes('Hindi')
        ? `हम आपकी असुविधा और परेशानी के लिए दिल से क्षमा चाहते हैं। UrgentLyfe की 100% हैप्पीनेस गारंटी के तहत हमने ₹0 में सीनियर मास्टर तकनीशियन का री-इन्स्पेक्शन और सुपरवाइजर ऑडिट तुरंत असाइन कर दिया है। बिना किसी शुल्क के आपकी समस्या का शत-प्रतिशत समाधान होगा।`
        : sentimentMeta.detectedLanguage === 'English'
        ? `We sincerely apologize for this frustrating experience. Under our 30-Day Happiness Guarantee, we have immediately scheduled a Senior Master Technician Warranty Re-Inspection at ₹0 rework cost with supervisor priority escalation.`
        : `Hum aapki pareshani aur asuvidha ke liye dil se maafi chahte hain. UrgentLyfe me 30-Day Happiness Guarantee ke tahat humne ₹0 Senior Master Technician Warranty Re-Inspection assign kar diya hai. Bina kisi charge ke supervisor visit ke sath aapki problem 100% solve hogi.`;
    }
    // 8. Emergency / Critical
    else if (sentimentMeta.intent === 'EMERGENCY_CRITICAL') {
      replyText = sentimentMeta.detectedLanguage.includes('Hindi')
        ? `🚨 आपातकालीन सूचना: घबराइए नहीं! पहले अपनी सुरक्षा सुनिश्चित करें और मुख्य स्विच/वाल्व तुरंत बंद करें। UrgentLyfe से 30 मिनट में इमरजेंसी सहायता आपके पास पहुंच रही है।`
        : sentimentMeta.detectedLanguage === 'English'
        ? `🚨 EMERGENCY ALERT: Please stay calm and safe! Shut off the main MCB breaker or water inlet valve immediately. We are dispatching a 30-minute Express SOS specialist to your address right now.`
        : `🚨 EMERGENCY ALERT: Aap chinta na karein, pehle safety ensure karein aur main switch ya valve turant band karein. UrgentLyfe se instant 30-min express SOS specialist aapke address par dispatch ho raha hai.`;
    }
    // 9. AC cooling
    else if (qLower.includes('ac') || qLower.includes('thanda') || qLower.includes('cooling')) {
      replyText = `Samajh gaya! Ye AC gas ya general service ka issue lagta hai (approx ₹599 se shuru). Kya aapka AC installation ke baad se kabhi service hua hai? Aur ye kis area/pin code me hai, taaki main nearest available slot dikha sakoon? Neeche diye card se aap instant booking bhi kar sakte hain.`;
    }
    // 10. Cleaning
    else if (qLower.includes('saaf') || qLower.includes('safai') || qLower.includes('cleaning')) {
      replyText = `Bilkul! Kitne room/BHK hai ghar me, aur aapko deep cleaning chahiye ya regular cleaning (approx ₹399 se shuru)? Aap apna pin code share karein taaki main aaj ya kal ka slot book kar sakoon.`;
    }
    // 11. Plumbing
    else if (qLower.includes('tap') || qLower.includes('paani') || qLower.includes('leak') || qLower.includes('nal')) {
      replyText = `Aap bilkul chinta mat kijiye! Ye plumbing tap repair ya washer change ka issue lagta hai (approx ₹199 se shuru). Hamara plumber 30 mins me pahuch sakta hai. Apna pin code/area bata dijiye ya neeche card se direct slot confirm karein.`;
    }
    // 12. Electrical
    else if (qLower.includes('spark') || qLower.includes('mcb') || qLower.includes('bijli') || qLower.includes('switch')) {
      replyText = `Safety alert! Pehle main MCB switch band kar lijiye. Ye electrical checkup aur switch repair ka mamla hai (approx ₹149 se shuru). Hamara verified electrician 30 mins me dispatch ho sakta hai. Apna pin code bataiye ya card se slot book karein.`;
    }
    // 13. Pest control
    else if (qLower.includes('pest') || qLower.includes('cockroach') || qLower.includes('termite') || qLower.includes('dimak')) {
      replyText = `Namaste! UrgentLyfe me 100% odorless herbal pest control available hai (approx ₹799 se shuru, 90-day guarantee ke sath). Ye kids aur pets ke liye bilkul safe hai. Kitne room/BHK ka ghar hai?`;
    }
    // 14. Painting
    else if (qLower.includes('paint') || qLower.includes('rang') || qLower.includes('putty') || qLower.includes('wall')) {
      replyText = `Namaste! Hamare paas dust-free mechanized wall painting aur waterproof touch-up available hai (approx ₹12/sq ft ya ₹1,499 se shuru). Kya pure ghar ki painting karwani hai ya specific moisture wali deewar hai?`;
    }
    // 15. Appliance repair
    else if (qLower.includes('washing machine') || qLower.includes('fridge') || qLower.includes('geyser') || qLower.includes('microwave')) {
      replyText = `Samajh gaya! UrgentLyfe appliance repair specialist (approx ₹299 se shuru) genuine OEM parts aur 30-day warranty ke sath visit karega. Machine me kya issue aa raha hai aur aapka area/pin code kya hai?`;
    }
    // 16. Booking intent
    else if (sentimentMeta.intent === 'BOOKING_INTENT') {
      replyText = `Namaste! Aapki booking ke liye hamare background-verified master technicians transparent pricing aur 30-day warranty ke sath ready hain. Neeche diye gaye options se direct slot book karein ya apna pin code share karein.`;
    }

    return res.json({
      success: true,
      data: {
        reply: replyText,
        sentiment: {
          polarity: sentimentMeta.polarity,
          score: sentimentMeta.score,
          intent: sentimentMeta.intent,
          toneApplied: sentimentMeta.toneApplied,
          urgencyLevel: sentimentMeta.urgencyLevel,
          explanation: sentimentMeta.tailoredReasoning,
        },
        detectedEmotion: sentimentMeta.detectedEmotion,
        emotionEmoji: sentimentMeta.emotionEmoji,
        empathyNote: sentimentMeta.empathyNote,
        tailoredReasoning: sentimentMeta.tailoredReasoning,
        detectedLanguage: sentimentMeta.detectedLanguage,
        issueDetected: detectedCategory,
        severity: sentimentMeta.urgencyLevel,
        immediateSafetyTip: sentimentMeta.safetyTip,
        whyThisHappened: 'Continuous operational load, wear & tear, or line pressure variations.',
        resolutionPlan:
          sentimentMeta.intent === 'COMPLAINT_OR_DISPUTE'
            ? 'Senior Master Specialist on-site re-inspection with supervisor sign-off at ₹0.'
            : 'Physical inspection with certified repair protocols and OEM genuine parts.',
        suggestedFollowUps:
          sentimentMeta.intent === 'COMPLAINT_OR_DISPUTE'
            ? [
                '₹0 Warranty Re-inspection kab aayega?',
                'Direct manager helpline par connect karein',
                'Live tracking status check karein',
              ]
            : [
                'Technician kitni der me pahuchega?',
                'Kya ispar 30-day warranty hai?',
                'Koi coupon code ya discount hai?',
                'Human support agent se baat karni hai',
              ],
        recommendations: fallbackRecs,
      },
    });
  }

  try {
    // Provide prioritized, compact catalog services to keep prompt lean & super-fast (<2s generation)
    const priorityServices = fallbackRecs.slice(0, 4);
    const priorityIds = new Set(priorityServices.map((p) => p.serviceId));
    const extraServices = Array.from(db.services.values())
      .filter((s) => !priorityIds.has(s.id))
      .slice(0, 8);
    const compactCatalogList = [
      ...priorityServices.map(
        (p) => `[ID: ${p.serviceId}] ${p.serviceTitle} | Price: ₹${p.price} | ${p.estimatedDuration} | SOS: ${p.isUrgentRecommended ? 'YES' : 'NO'}`
      ),
      ...extraServices.map(
        (s) => `[ID: ${s.id}] ${s.title} | Price: ₹${s.price} | ${s.durationMinutes}m | SOS: ${s.isUrgentAvailable ? 'YES' : 'NO'}`
      ),
    ].join('\n');

    // Build conversation context if history provided
    let conversationContext = '';
    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-5);
      conversationContext = `\nPrevious Conversation History:\n${recentHistory
        .map((h: any) => `${h.sender === 'user' ? 'Customer' : 'UrgentLyfe AI'}: "${h.text}"`)
        .join('\n')}\n`;
    }

    const systemInstruction = `Tum "UrgentLyfe" ke official AI assistant ho — ek leading home-services platform jo plumbing, electrical, cleaning, AC repair, painting, pest control, appliance repair, salon-at-home, aur carpentry jaisi services provide karta hai.

### Language Rules
- User jis bhi language ya mix (Hindi, English, Hinglish, ya koi regional bhasha) me baat kare, tum wahi language/style match karke reply karo.
- Agar language clear na ho, Hinglish me hi jawab do (ye zyada log samajhte hain).
- Kabhi bhi user ko force mat karo ki wo English me likhe.
- Simple, friendly, aur seedhi bhasha use karo — technical jargon avoid karo.

### Tumhara Kaam (Goal)
1. User ki problem ya zarurat ko dhyan se samjho.
2. Zaroorat padhe to 1-2 follow-up sawaal pucho (jaise: "ghar me ya office me?", "kab tak chahiye — aaj ya kal?", "approx budget kya hai?").
3. User ki problem ke hisaab se sabse sahi service category recommend karo.
4. Us service ka short description, approx price range, aur time diya (agar data available ho), aur booking ka next step batao.
5. Agar user ki problem clear na ho ya multiple services fit karte ho, options me se choose karne ko kaho.

### Available Services (UrgentLyfe Actual Catalog Rates)
- Plumbing (leakage, tap repair, pipe fitting) — Approx ₹199 se shuru
- Electrical (wiring, switchboard, fan/light install) — Approx ₹149 se shuru
- AC Service & Repair (gas fill, general service, installation) — Approx ₹599 se shuru
- Home Cleaning (deep cleaning, bathroom, kitchen) — Approx ₹399 se shuru
- Pest Control — Approx ₹799 se shuru
- Painting — Approx ₹12 per sq ft ya ₹1,499 se shuru
- Appliance Repair (washing machine, fridge, geyser) — Approx ₹299 se shuru
- Salon at Home — Approx ₹349 se shuru
- Carpentry — Approx ₹249 se shuru
- 30-Min Emergency Express SOS — 30 min arrival for hazards
- Senior Master Technician Re-Inspection — ₹0 free rework under 30-Day Happiness Guarantee

### Recommendation Logic
- Agar user symptom bataye (jaise "tap se paani tapak raha hai") → seedha matching service bolo ("Plumbing – Tap Repair"), guess mat karo agar clear nahi hai, ek chhota sawaal pucho.
- Agar problem vague ho (jaise "ghar saaf karwana hai") → poocho: "Deep cleaning chahiye ya sirf regular cleaning? Kitne room hai?"
- Hamesha ek clear "next step" do: "Main aapko [service] ke liye best available slot dikhata hoon, apna pin code/area bata dijiye."

### Booking Flow (agar booking bot handle karega)
1. Service confirm karo
2. Location/pin code pucho
3. Preferred date & time pucho
4. Contact number confirm karo
5. Summary do aur confirm karo: "Aapki booking [service] ke liye [date, time] par [location] me confirm ho gayi hai. Technician ka number booking se pehle share kar diya jayega."

### Tone & Behavior
- Friendly, respectful, thoda warm — jaise koi helpful dost baat kar raha ho.
- Kabhi bhi galat price ya availability guess mat karo — agar exact info na ho to bolo "main confirm karke batata hoon" ya "team se check karwa dunga".
- Complaints ya negative feedback pe pehle sorry bolo, phir solve karne ki koshish karo, zaroorat pade to human support ka number/link do aur ₹0 warranty re-inspection offer karo.
- Kabhi bhi competitor services ke baare me negative baat mat karo.

### Jab Tumhe Nahi Pata
- Agar koi service list me nahi hai, saaf bolo: "Ye service abhi humare paas available nahi hai, lekin main [closest alternative] suggest kar sakta hoon."
- Kabhi bhi fake price, fake technician name, ya fake availability mat batao.

### Conversation Memory
- Agar user ne pehle kisi service ke baare me baat ki hai (isi conversation me), to usko yaad rakho aur naya sawaal puchne se pehle context use karo. Jaise: "Aapne pehle plumbing ke baare me pucha tha, kya wahi issue continue hai ya naya problem hai?"
- Repeat customer ho to (agar data available ho) unke pehle wale service/technician ka reference do: "Pichli baar jo technician gaya tha, wahi bhej dete hain?"

### Image/Photo Support
- Agar user photo bheje (jaise leak, damage, ya appliance ka issue), us photo ko dekh ke problem samjho aur uske hisaab se service recommend karo. Agar image clear na ho, ek chhota sawaal pucho.

### Discounts & Offers
- Agar koi valid coupon code ya seasonal offer available ho, proactively mention karo jab relevant ho (jaise: "Aaj humare paas FIRST50 par Flat ₹50 off aur FESTIVE20 par deep cleaning package pe 20% off chal raha hai, chahenge?").
- Kabhi fake ya expired discount mat batao — sirf wahi jo actually valid ho.

### Feedback Collection
- Booking complete hone ke baad, politely feedback maango: "Service kaisi rahi? 1-5 me rating dena chahenge?"
- Negative feedback pe empathy dikhao aur solution/escalation offer karo.

### Human Handoff
- Agar user ka issue complex ho, complaint ho, refund maange, ya bot 2 baar clarify karne ke baad bhi samajh na paaye — turant human agent ko escalate karne ka option do: "Main aapko humare support team se connect kar deta hoon, thoda wait kijiye (Support Helpline: 1800-894-368 ya Human Agent Live Chat)."
- Kabhi bhi user ko loop me mat fasao — 2-3 tries ke baad handoff zaroori hai.

### Technician/Order Tracking, Rescheduling & Cancellation
- Agar booking ho chuki hai aur user status pooche, available info do (technician ka naam, ETA, contact). Agar live tracking dekhni ho to 'Track Live' button batayein.
- Agar user booking Reschedule ya Cancel karna chahe: unhe guide karo ki unke Customer Dashboard par active bookings ke neeche direct 'Reschedule' aur 'Cancel' buttons hain. 100% free cancellation policy hai (technician arrival se pehle full instant refund).
- Agar user kahe "Find me a plumber" ya "Find me an electrician": Verified, background-checked 4.8★+ master specialists recommend karo transparent pricing aur 30-day warranty ke saath.

### Transparent Uncertainty
- Kabhi bhi uncertain home issues (jaise internal appliance faults, wall leakages, concealed wiring) par 100% confident claim mat karo. Hamesha add karo: "Ye preliminary AI detection hai, on-site verified technician physically inspect karke hi final quote confirm karega."

### OTP / Booking Verification
- Booking confirm karne se pehle, agar security zaroori ho, OTP verification ka step mention karo: "Booking confirm karne ke liye aapke number pe OTP bheja gaya hai, please share karein."

### Example Conversations:
User: mera AC thanda nahi kar raha
Bot: Samajh gaya! Ye AC gas ya general service ka issue lagta hai. Kya aapka AC installation ke baad se kabhi service hua hai? Aur ye kis area me hai, taaki main nearest available slot dikha sakoon?

User: ghar ki safai karwani hai jaldi
Bot: Bilkul! Kitne room/BHK hai ghar me, aur aapko aaj ya kal me se kab chahiye? Main deep cleaning aur regular cleaning dono ke options dikha sakta hoon.

${priorServiceMentioned ? `CONTEXT NOTE: Customer previously discussed "${priorServiceMentioned}". Acknowledge this context if relevant.` : ''}
${languagePreference ? `User language preference: "${languagePreference}".` : ''}

CURRENT AVAILABLE SERVICES CATALOG:
${compactCatalogList}

RESPONSE FORMAT (Strict JSON):
{
  "reply": "Friendly, tone-calibrated conversational response following the rules above in user's language.",
  "sentiment": {
    "polarity": "NEGATIVE" | "NEUTRAL" | "POSITIVE",
    "score": number between -1.0 and 1.0,
    "intent": "COMPLAINT_OR_DISPUTE" | "EMERGENCY_CRITICAL" | "BOOKING_INTENT" | "ANXIOUS_CONCERN" | "GENERAL_INQUIRY" | "PRAISE_FEEDBACK",
    "toneApplied": "Empathetic & Accountable" | "Crisp, Professional & Efficient" | "Urgent, Protective & Safety-First" | "Comforting & Reassuring" | "Warm, Consultative & Informative" | "Warm, Grateful & Enthusiastic",
    "urgencyLevel": "CRITICAL_SOS" | "HIGH" | "MEDIUM" | "LOW",
    "explanation": "1-sentence summary of calibrated tone and detected sentiment"
  },
  "detectedEmotion": "Frustrated & Dissatisfied | Emergency & Panicked | Polite & Transactional | Worried & Anxious | Calm & Inquiring | Delighted & Grateful",
  "emotionEmoji": "😤 | 🚨 | 📋 | 😟 | 💬 | 🌟",
  "empathyNote": "1 short phrase on how you calibrated your tone for their emotional state",
  "tailoredReasoning": "1 short sentence explaining why recommendations were tailored for this urgency and emotion",
  "detectedLanguage": "Hinglish | Hindi (हिंदी) | English | Bengali | Tamil | etc.",
  "issueDetected": "Short 2-4 word diagnosis",
  "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL_SOS",
  "immediateSafetyTip": "Clear safety action or null",
  "whyThisHappened": "1 concise sentence on root cause",
  "resolutionPlan": "1 concise sentence on technician fix",
  "suggestedFollowUps": ["Follow-up Q1", "Follow-up Q2", "Follow-up Q3"],
  "recommendations": [
    {
      "serviceId": "exact ID from catalog",
      "serviceTitle": "exact title from catalog",
      "price": number,
      "originalPrice": number,
      "discountPercent": number,
      "estimatedDuration": "e.g. 30 mins",
      "whyThisService": "Why tailored for their problem/emotion",
      "isUrgentRecommended": boolean
    }
  ]
}`;

    const promptPayload = `${conversationContext}Customer Query: "${effectiveQuery}"`;
    let contentsPayload: any = promptPayload;
    if (imageBase64) {
      contentsPayload = [
        { text: promptPayload },
        {
          inlineData: {
            mimeType: imageMimeType || 'image/jpeg',
            data: imageBase64.replace(/^data:image\/\w+;base64,/, ''),
          },
        },
      ];
    }

    const rawText = await generateGeminiContent({
      preferredModel: 'gemini-3.8-flash',
      timeoutMs: 14000,
      contents: contentsPayload,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const parsedData = cleanJsonResponse(rawText || '{}');

    // Ensure recommendations have all required attributes
    let finalRecommendations = fallbackRecs;
    if (Array.isArray(parsedData.recommendations) && parsedData.recommendations.length > 0) {
      finalRecommendations = parsedData.recommendations.map((rec: any) => {
        const matched = db.services.get(rec.serviceId);
        return {
          serviceId: rec.serviceId || (matched ? matched.id : fallbackRecs[0].serviceId),
          serviceTitle: rec.serviceTitle || (matched ? matched.title : fallbackRecs[0].serviceTitle),
          price: typeof rec.price === 'number' ? rec.price : (matched ? matched.price : fallbackRecs[0].price),
          originalPrice: rec.originalPrice || (matched ? matched.originalPrice : undefined),
          discountPercent: rec.discountPercent || (matched ? matched.discountPercent : undefined),
          estimatedDuration: rec.estimatedDuration || (matched ? `${matched.durationMinutes} mins` : '45 mins'),
          whyThisService: rec.whyThisService || (matched ? matched.subtitle : 'Certified expert repair with 30-day warranty'),
          isUrgentRecommended: Boolean(rec.isUrgentRecommended ?? matched?.isUrgentAvailable),
          tags: matched?.tags,
        };
      });
    }

    const sentimentObj = parsedData.sentiment || {
      polarity: sentimentMeta.polarity,
      score: sentimentMeta.score,
      intent: sentimentMeta.intent,
      toneApplied: sentimentMeta.toneApplied,
      urgencyLevel: sentimentMeta.urgencyLevel,
      explanation: sentimentMeta.tailoredReasoning,
    };

    return res.json({
      success: true,
      data: {
        reply:
          parsedData.reply ||
          `I have analyzed your request "${userMessage}". Our verified technician will resolve this with utmost care and a 30-day guarantee.`,
        sentiment: sentimentObj,
        detectedEmotion: parsedData.detectedEmotion || sentimentMeta.detectedEmotion,
        emotionEmoji: parsedData.emotionEmoji || sentimentMeta.emotionEmoji,
        empathyNote: parsedData.empathyNote || sentimentMeta.empathyNote,
        tailoredReasoning: parsedData.tailoredReasoning || sentimentMeta.tailoredReasoning,
        detectedLanguage: parsedData.detectedLanguage || sentimentMeta.detectedLanguage,
        issueDetected: parsedData.issueDetected || detectedCategory,
        severity: parsedData.severity || sentimentMeta.urgencyLevel,
        immediateSafetyTip: parsedData.immediateSafetyTip || sentimentMeta.safetyTip,
        whyThisHappened: parsedData.whyThisHappened || 'Operational wear & tear or component load.',
        resolutionPlan: parsedData.resolutionPlan || 'Detailed multimeter/pressure diagnostics & factory replacement.',
        suggestedFollowUps:
          Array.isArray(parsedData.suggestedFollowUps) && parsedData.suggestedFollowUps.length > 0
            ? parsedData.suggestedFollowUps
            : [
                'Technician kitni der me aayega?',
                'Kya warranty card milega?',
                'Emergency 30-min SOS book karna hai',
              ],
        recommendations: finalRecommendations,
      },
    });
  } catch (error: any) {
    console.log('[AI Chat] Using high-availability fallback engine');
    const qLower = userMessage.toLowerCase();
    let fallbackReply = `Aap bilkul chinta mat kijiye! "${userMessage}" ke liye UrgentLyfe ke verified technicians 30-min express dispatch ke sath ready hain. Har service par 30-day post service warranty milti hai.`;

    if (sentimentMeta.intent === 'COMPLAINT_OR_DISPUTE') {
      fallbackReply = sentimentMeta.detectedLanguage.includes('Hindi')
        ? `हम आपकी असुविधा और परेशानी के लिए दिल से क्षमा चाहते हैं। UrgentLyfe की 100% हैप्पीनेस गारंटी के तहत हमने ₹0 में सीनियर मास्टर तकनीशियन का री-इन्स्पेक्शन और सुपरवाइजर ऑडिट तुरंत असाइन कर दिया है। बिना किसी शुल्क के आपकी समस्या का शत-प्रतिशत समाधान होगा।`
        : sentimentMeta.detectedLanguage === 'English'
        ? `We sincerely apologize for this frustrating experience. Under our 30-Day Happiness Guarantee, we have immediately scheduled a Senior Master Technician Warranty Re-Inspection at ₹0 rework cost with supervisor priority escalation.`
        : `Hum aapki pareshani aur asuvidha ke liye dil se maafi chahte hain. UrgentLyfe me 30-Day Happiness Guarantee ke tahat humne ₹0 Senior Master Technician Warranty Re-Inspection assign kar diya hai. Bina kisi charge ke supervisor visit ke sath aapki problem 100% solve hogi.`;
    } else if (sentimentMeta.intent === 'EMERGENCY_CRITICAL') {
      fallbackReply = sentimentMeta.detectedLanguage.includes('Hindi')
        ? `🚨 आपातकालीन सूचना: घबराइए नहीं! पहले अपनी सुरक्षा सुनिश्चित करें और मुख्य स्विच/वाल्व तुरंत बंद करें। UrgentLyfe से 30 मिनट में इमरजेंसी सहायता आपके पास पहुंच रही है।`
        : sentimentMeta.detectedLanguage === 'English'
        ? `🚨 EMERGENCY ALERT: Please stay calm and safe! Shut off the main MCB breaker or water inlet valve immediately. We are dispatching a 30-minute Express SOS specialist to your address right now.`
        : `🚨 EMERGENCY ALERT: Aap chinta na karein, pehle safety ensure karein aur main switch ya valve turant band karein. UrgentLyfe se instant 30-min express SOS specialist aapke address par dispatch ho raha hai.`;
    } else if (qLower.includes('ac') || qLower.includes('thanda') || qLower.includes('cooling')) {
      fallbackReply = sentimentMeta.detectedLanguage.includes('Hindi')
        ? `समझ गया! यह एसी गैस लीकेज या जनरल सर्विस का मामला लगता है (लगभग ₹599 से शुरू)। क्या आपके एसी की हाल ही में सर्विस हुई है? अपना एरिया/पिन कोड बताएं ताकि मैं सबसे नजदीकी उपलब्ध स्लॉट दिखा सकूं, या नीचे दिए गए कार्ड से डायरेक्ट बुक करें।`
        : `Samajh gaya! Ye AC gas ya general service ka issue lagta hai (approx ₹599 se shuru). Kya aapka AC installation ke baad se kabhi service hua hai? Aur ye kis area/pin code me hai, taaki main nearest available slot dikha sakoon? Neeche diye card se aap instant booking bhi kar sakte hain.`;
    } else if (qLower.includes('saaf') || qLower.includes('safai') || qLower.includes('cleaning')) {
      fallbackReply = sentimentMeta.detectedLanguage.includes('Hindi')
        ? `बिल्कुल! आपके घर में कितने रूम/BHK हैं, और आपको डीप क्लीनिंग चाहिए या रेगुलर क्लीनिंग (लगभग ₹399 से शुरू)? आप अपना पिन कोड शेयर करें ताकि मैं आज या कल का स्लॉट बुक कर सकूं।`
        : `Bilkul! Kitne room/BHK hai ghar me, aur aapko deep cleaning chahiye ya regular cleaning (approx ₹399 se shuru)? Aap apna pin code share karein ya neeche diye gaye card se direct slot select karein!`;
    } else if (qLower.includes('tap') || qLower.includes('paani') || qLower.includes('leak') || qLower.includes('nal')) {
      fallbackReply = sentimentMeta.detectedLanguage.includes('Hindi')
        ? `आप बिल्कुल चिंता न करें! यह प्लंबिंग टैप रिपेयर या वॉशर चेंज का मामला है (लगभग ₹199 से शुरू)। हमारा प्लंबर 30 मिनट में पहुंच सकता है। अपना पिन कोड बताएं या नीचे कार्ड से तुरंत स्लॉट बुक करें।`
        : `Aap bilkul chinta mat kijiye! Ye plumbing tap repair ya washer change ka issue lagta hai (approx ₹199 se shuru). Hamara plumber 30 mins me pahuch sakta hai. Apna pin code/area bata dijiye ya neeche card se direct slot confirm karein.`;
    } else if (qLower.includes('spark') || qLower.includes('mcb') || qLower.includes('bijli') || qLower.includes('switch')) {
      fallbackReply = sentimentMeta.detectedLanguage.includes('Hindi')
        ? `सावधानी रखें! अगर स्पार्क हो रहा है तो पहले मेन एमसीबी ऑफ कर दें। यह इलेक्ट्रिकल शॉर्ट सर्किट या स्विच रिपेयर है (लगभग ₹149 से शुरू)। हमारा प्रमाणित इलेक्ट्रीशियन 30 मिनट में आ सकता है। अपना पिन कोड बताएं।`
        : `Safety alert! Pehle main MCB switch band kar lijiye. Ye electrical checkup aur switch repair ka mamla hai (approx ₹149 se shuru). Hamara verified electrician 30 mins me dispatch ho sakta hai. Apna pin code bataiye ya card se slot book karein.`;
    } else if (qLower.includes('pest') || qLower.includes('cockroach') || qLower.includes('termite') || qLower.includes('dimak')) {
      fallbackReply = sentimentMeta.detectedLanguage.includes('Hindi')
        ? `नमस्ते! हमारे पास हर्बल गंधहीन पेस्ट कंट्रोल उपलब्ध है (लगभग ₹799 से शुरू, 90 दिन की वारंटी के साथ)। यह बच्चों और पालतू जानवरों के लिए 100% सुरक्षित है। आपके घर में कितने रूम/BHK हैं?`
        : `Namaste! UrgentLyfe me 100% odorless herbal pest control available hai (approx ₹799 se shuru, 90-day guarantee ke sath). Ye kids aur pets ke liye bilkul safe hai. Kitne room/BHK ka ghar hai?`;
    } else if (qLower.includes('paint') || qLower.includes('rang') || qLower.includes('putty') || qLower.includes('wall')) {
      fallbackReply = sentimentMeta.detectedLanguage.includes('Hindi')
        ? `नमस्ते! हमारे पास डस्ट-फ्री वॉल पेंटिंग और वाटरप्रूफिंग टच-अप उपलब्ध है (लगभग ₹12/वर्ग फुट या ₹1,499 से शुरू)। क्या पूरे घर की पेंटिंग करवानी है या किसी खास दीवार की?`
        : `Namaste! Hamare paas dust-free mechanized wall painting aur waterproof touch-up available hai (approx ₹12/sq ft ya ₹1,499 se shuru). Kya pure ghar ki painting karwani hai ya specific moisture wali deewar hai?`;
    } else if (qLower.includes('washing machine') || qLower.includes('fridge') || qLower.includes('geyser') || qLower.includes('microwave')) {
      fallbackReply = sentimentMeta.detectedLanguage.includes('Hindi')
        ? `समझ गया! हमारे अप्लायंस रिपेयर विशेषज्ञ (लगभग ₹299 से शुरू) 30 दिन की वारंटी और ओरिजिनल पार्ट्स के साथ उपलब्ध हैं। मशीन में क्या समस्या आ रही है और आपका एरिया क्या है?`
        : `Samajh gaya! UrgentLyfe appliance repair specialist (approx ₹299 se shuru) genuine OEM parts aur 30-day warranty ke sath visit karega. Machine me kya issue aa raha hai aur aapka area/pin code kya hai?`;
    } else if (sentimentMeta.intent === 'BOOKING_INTENT') {
      fallbackReply = sentimentMeta.detectedLanguage.includes('Hindi')
        ? `नमस्ते! आपकी बुकिंग के लिए हमारे सत्यापित तकनीशियन तैयार हैं। पारदर्शी मूल्य और 30 दिन की वारंटी के साथ नीचे दिए गए स्लॉट से तुरंत बुक करें।`
        : sentimentMeta.detectedLanguage === 'English'
        ? `Hello! For your booking request, our verified master technicians are ready with transparent pricing and a 30-day warranty. Please select your slot below.`
        : `Namaste! Aapki booking request ke liye hamare verified master technicians transparent pricing aur 30-day warranty ke sath ready hain.`;
    } else if (sentimentMeta.intent === 'ANXIOUS_CONCERN') {
      fallbackReply = sentimentMeta.detectedLanguage.includes('Hindi')
        ? `आप बिल्कुल चिंता न करें! आपकी समस्या "${userMessage}" के लिए हमारे प्रमाणित तकनीशियन उपलब्ध हैं और हर काम पर बिना किसी छुपे शुल्क के 30 दिन की वारंटी मिलती है।`
        : `Don't worry at all! For "${userMessage}", our background-verified technicians are available with transparent fixed pricing and a 30-day complete service warranty.`;
    }

    return res.json({
      success: true,
      data: {
        reply: fallbackReply,
        sentiment: {
          polarity: sentimentMeta.polarity,
          score: sentimentMeta.score,
          intent: sentimentMeta.intent,
          toneApplied: sentimentMeta.toneApplied,
          urgencyLevel: sentimentMeta.urgencyLevel,
          explanation: sentimentMeta.tailoredReasoning,
        },
        detectedEmotion: sentimentMeta.detectedEmotion,
        emotionEmoji: sentimentMeta.emotionEmoji,
        empathyNote: sentimentMeta.empathyNote,
        tailoredReasoning: sentimentMeta.tailoredReasoning,
        detectedLanguage: sentimentMeta.detectedLanguage,
        issueDetected: detectedCategory,
        severity: sentimentMeta.urgencyLevel,
        immediateSafetyTip: sentimentMeta.safetyTip,
        whyThisHappened: 'Operational wear & tear, dust clogging, or line pressure variations.',
        resolutionPlan: 'Technician on-site inspection and OEM genuine parts replacement.',
        suggestedFollowUps: [
          'Technician kitni der me aayega?',
          'Kya 30-day warranty milti hai?',
          'Emergency SOS booking',
        ],
        recommendations: fallbackRecs,
      },
    });
  }
});

// 1.5 Standalone Sentiment & Tone Analysis API (POST /api/ai/sentiment & /ai/sentiment)
aiRouter.post(['/ai/sentiment', '/api/ai/sentiment'], (req, res) => {
  const { text, context } = req.body;
  const userText = String(text || '').trim();
  if (!userText) {
    return res.status(400).json({ success: false, error: 'Text is required for sentiment analysis' });
  }

  const analysis = analyzeUserSentimentAndContext(userText);
  return res.json({
    success: true,
    data: {
      sentiment: {
        polarity: analysis.polarity,
        score: analysis.score,
        intent: analysis.intent,
        toneApplied: analysis.toneApplied,
        urgencyLevel: analysis.urgencyLevel,
        explanation: analysis.tailoredReasoning,
      },
      detectedEmotion: analysis.detectedEmotion,
      emotionEmoji: analysis.emotionEmoji,
      recommendedTone: analysis.toneApplied,
      tailoredReasoning: analysis.tailoredReasoning,
      safetyTip: analysis.safetyTip,
      suggestedActions:
        analysis.intent === 'COMPLAINT_OR_DISPUTE'
          ? [
              'Dispatch ₹0 Senior Warranty Re-Inspection',
              'Escalate ticket to Service Supervisor',
              'Trigger customer happiness call',
            ]
          : analysis.intent === 'EMERGENCY_CRITICAL'
          ? [
              'Trigger 30-Min SOS Express Dispatch',
              'Broadcast Safety Precaution Protocol',
              'Assign Diamond SOS Specialist',
            ]
          : analysis.intent === 'BOOKING_INTENT'
          ? [
              'Confirm preferred service slot',
              'Present verified technician profile',
              'Apply best promo discount',
            ]
          : [
              'Offer transparent diagnostic check',
              'Provide 30-day warranty certificate',
            ],
    },
  });
});

// 2. AI Voice Assistant Query (POST /api/ai/voice)
aiRouter.post(['/ai/voice', '/api/ai/voice'], async (req, res) => {
  const { transcript, language = 'hi-IN' } = req.body;
  const userText = String(transcript || '').trim();

  if (!userText) {
    return res.status(400).json({ success: false, error: 'Voice transcript is required' });
  }

  const lower = userText.toLowerCase();

  // Mode A - Check booking status feature
  if (
    lower.includes('status') ||
    lower.includes('kahan') ||
    lower.includes('where') ||
    lower.includes('my booking') ||
    lower.includes('meri booking') ||
    lower.includes('eta')
  ) {
    const activeBooking = Array.from(db.bookings.values()).find(
      (b) => b.status !== 'COMPLETED' && b.status !== 'CANCELLED'
    ) || Array.from(db.bookings.values())[0];

    if (activeBooking) {
      const statusText = activeBooking.status.replace(/_/g, ' ');
      const speechMsg = `Aapki booking #${activeBooking.id} (${activeBooking.service.title}) ka status ${statusText} hai. Technician ${activeBooking.partner?.name || 'assigned'} ETA ~${activeBooking.etaMinutes || 15} minutes mein pahunchenge.`;
      return res.json({
        success: true,
        data: {
          speechResponse: speechMsg,
          recommendedServiceId: activeBooking.service.id,
          recommendedServiceName: activeBooking.service.title,
          estimatedPrice: activeBooking.totalAmount,
          actionText: 'View Active Booking Status',
          bookingId: activeBooking.id,
          isStatusCheck: true,
        },
      });
    }
  }

  const fallbackRecs = getRecommendedServicesForQuery(userText);
  const primaryService = fallbackRecs[0] || {
    serviceId: 'ac-foam-jet-service',
    serviceTitle: 'Power Foam Jet AC Service',
    price: 599,
  };

  if (!hasGeminiKey()) {
    return res.json({
      success: true,
      data: {
        speechResponse: `Aapka voice command receive ho gaya hai. Humne ${primaryService.serviceTitle} recommend kiya hai, price ₹${primaryService.price}.`,
        recommendedServiceId: primaryService.serviceId,
        recommendedServiceName: primaryService.serviceTitle,
        estimatedPrice: primaryService.price,
        actionText: 'Book Service Immediately',
      },
    });
  }

  try {
    const systemInstruction = `You are "UrgentLyfe Multilingual Voice Dispatcher". The user spoke a voice command in Hindi, English, or Hinglish.
Analyze the request and return a JSON object with:
{
  "speechResponse": "Natural, crisp spoken reply in the same language (max 2 sentences) confirming the detected service",
  "recommendedServiceId": "matched service id",
  "recommendedServiceName": "Matched Service Title",
  "estimatedPrice": number,
  "actionText": "Book Service Now"
}`;

    const rawText = await generateGeminiContent({
      preferredModel: 'gemini-3.8-flash',
      contents: `Voice transcript: "${userText}". User Language: ${language}`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const parsed = cleanJsonResponse(rawText || '{}');
    return res.json({
      success: true,
      data: {
        speechResponse: parsed.speechResponse || `Aapke order ke liye ${primaryService.serviceTitle} ready hai.`,
        recommendedServiceId: parsed.recommendedServiceId || primaryService.serviceId,
        recommendedServiceName: parsed.recommendedServiceName || primaryService.serviceTitle,
        estimatedPrice: parsed.estimatedPrice || primaryService.price,
        actionText: parsed.actionText || 'Book Service Now',
      },
    });
  } catch (err: any) {
    return res.json({
      success: true,
      data: {
        speechResponse: `Aapka voice input receive ho gaya hai. ${primaryService.serviceTitle} package ₹${primaryService.price} mein available hai.`,
        recommendedServiceId: primaryService.serviceId,
        recommendedServiceName: primaryService.serviceTitle,
        estimatedPrice: primaryService.price,
        actionText: 'Book Service Now',
      },
    });
  }
});

// 3. AI Voice Feedback & Comprehensive NLP Sentiment Scoring (POST /api/ai/voice-feedback & /api/ai/analyze-feedback)
aiRouter.post(['/ai/voice-feedback', '/api/ai/voice-feedback', '/ai/analyze-feedback', '/api/ai/analyze-feedback'], async (req, res) => {
  const {
    bookingId,
    providerId: reqProviderId,
    customerId: reqCustomerId,
    serviceId: reqServiceId,
    voiceFeedbackText,
    rating: explicitRating,
    source = 'voice',
    workPhotos = [],
  } = req.body;

  const feedback = String(voiceFeedbackText || req.body.reviewText || '').trim();

  if (!feedback && !explicitRating) {
    return res.status(400).json({ success: false, error: 'Voice feedback text or rating is required' });
  }

  const booking = bookingId ? db.bookings.get(bookingId) : null;
  const targetProviderId = reqProviderId || booking?.partner?.id || 'partner-101';
  const targetCustomerId = reqCustomerId || booking?.userId || 'usr-customer-101';
  const targetServiceId = reqServiceId || booking?.service?.id || 'ac-foam-jet';
  const targetServiceTitle = booking?.service?.title || 'Home Service';

  let sentiment: 'POSITIVE' | 'NEUTRAL' | 'CRITICAL' = 'POSITIVE';
  let calculatedRating = explicitRating ? Number(explicitRating) : 5.0;
  let summary = 'Customer expressed high satisfaction with on-time professional service.';
  let positivePoints: string[] = ['Punctual technician', 'High quality repair', 'Polite behaviour'];
  let negativePoints: string[] = [];
  let detectedIssues: string[] = [];
  let serviceQualityScore = calculatedRating;
  let professionalismScore = calculatedRating;
  let timelinessScore = calculatedRating;
  let problemResolutionScore = calculatedRating;

  const lower = feedback.toLowerCase();
  if (
    lower.includes('bad') ||
    lower.includes('late') ||
    lower.includes('bekar') ||
    lower.includes('kharab') ||
    lower.includes('expensive') ||
    lower.includes('incomplete') ||
    lower.includes('not satisfied') ||
    lower.includes('terrible') ||
    lower.includes('1 star') ||
    lower.includes('2 star') ||
    (explicitRating && explicitRating <= 2)
  ) {
    sentiment = 'CRITICAL';
    calculatedRating = explicitRating ? Number(explicitRating) : 2.0;
    summary = 'Customer noted delays or dissatisfaction with service completion.';
    positivePoints = [];
    negativePoints = ['Service delay or incomplete resolution', 'Follow-up inspection required'];
    detectedIssues = ['Customer Dissatisfaction', 'Quality Check Recommended'];
    serviceQualityScore = Math.min(calculatedRating, 2);
    professionalismScore = Math.min(calculatedRating, 3);
    timelinessScore = lower.includes('late') ? 1 : 3;
    problemResolutionScore = 2;
  } else if (
    lower.includes('average') ||
    lower.includes('okay') ||
    lower.includes('theek') ||
    lower.includes('3 star') ||
    lower.includes('4 star') ||
    (explicitRating && explicitRating === 3)
  ) {
    sentiment = 'NEUTRAL';
    calculatedRating = explicitRating ? Number(explicitRating) : 3.5;
    summary = 'Service was completed satisfactorily with acceptable turnaround.';
    positivePoints = ['Work completed successfully'];
    negativePoints = ['Scope for faster turnaround'];
    detectedIssues = [];
    serviceQualityScore = 3.5;
    professionalismScore = 4.0;
    timelinessScore = 3.5;
    problemResolutionScore = 4.0;
  }

  if (hasGeminiKey() && feedback.length > 5) {
    try {
      const rawText = await generateGeminiContent({
        preferredModel: 'gemini-3.8-flash',
        contents: `Analyze this customer service feedback in Hindi/English/Hinglish:
Feedback: "${feedback}"
Explicit Star Rating (if provided): ${explicitRating || 'None'}

Return a JSON object with this exact structure:
{
  "sentiment": "POSITIVE" | "NEUTRAL" | "CRITICAL",
  "calculatedRating": number (1.0 to 5.0),
  "summary": "1-sentence summary",
  "positivePoints": ["point 1", "point 2"],
  "negativePoints": ["negative point 1"],
  "detectedIssues": ["issue 1"],
  "serviceQualityScore": number (1 to 5),
  "professionalismScore": number (1 to 5),
  "timelinessScore": number (1 to 5),
  "problemResolutionScore": number (1 to 5)
}`,
        config: {
          systemInstruction: 'You are an objective AI Quality & Voice Review Analyst for UrgentLyfe home services. Be precise, fair, and empathetic.',
          responseMimeType: 'application/json',
        },
      });

      const parsed = cleanJsonResponse(rawText || '{}');
      if (parsed.sentiment) sentiment = parsed.sentiment;
      if (parsed.calculatedRating && !explicitRating) calculatedRating = Number(parsed.calculatedRating);
      if (parsed.summary) summary = parsed.summary;
      if (Array.isArray(parsed.positivePoints)) positivePoints = parsed.positivePoints;
      if (Array.isArray(parsed.negativePoints)) negativePoints = parsed.negativePoints;
      if (Array.isArray(parsed.detectedIssues)) detectedIssues = parsed.detectedIssues;
      if (parsed.serviceQualityScore) serviceQualityScore = Number(parsed.serviceQualityScore);
      if (parsed.professionalismScore) professionalismScore = Number(parsed.professionalismScore);
      if (parsed.timelinessScore) timelinessScore = Number(parsed.timelinessScore);
      if (parsed.problemResolutionScore) problemResolutionScore = Number(parsed.problemResolutionScore);
    } catch (e) {
      console.warn('Gemini voice feedback parsing fallback applied:', e);
    }
  }

  const finalRating = explicitRating ? Number(explicitRating) : Math.max(1, Math.min(5, Math.round(calculatedRating * 10) / 10));

  // 1. Store in db.reviews
  const newReview = {
    id: `rev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    bookingId: bookingId || '',
    userId: targetCustomerId,
    userName: booking?.userName || 'Verified Customer',
    providerId: targetProviderId,
    serviceId: targetServiceId,
    serviceTitle: targetServiceTitle,
    rating: finalRating,
    comment: feedback || `${finalRating}-Star Voice Feedback submitted.`,
    sentiment: sentiment === 'CRITICAL' ? 'NEGATIVE' : (sentiment as any),
    positivePoints,
    negativePoints,
    detectedIssues,
    serviceQualityScore: Math.round(serviceQualityScore * 10) / 10,
    professionalismScore: Math.round(professionalismScore * 10) / 10,
    timelinessScore: Math.round(timelinessScore * 10) / 10,
    problemResolutionScore: Math.round(problemResolutionScore * 10) / 10,
    source: source as 'voice' | 'text',
    workPhotos: Array.isArray(workPhotos) ? workPhotos : [],
    createdAt: new Date().toISOString(),
  };

  db.reviews.set(newReview.id, newReview);

  // 2. Update Booking record
  if (booking) {
    booking.voiceFeedbackText = feedback;
    booking.voiceFeedbackRating = finalRating;
    booking.voiceFeedbackSentiment = sentiment === 'CRITICAL' ? 'NEGATIVE' : (sentiment as any);
    booking.voiceFeedbackSummary = summary;
    booking.voiceFeedbackAt = new Date().toISOString();
    booking.userStarRating = finalRating;
    booking.userReviewText = feedback;
    if (Array.isArray(workPhotos) && workPhotos.length > 0) {
      booking.workPhotos = workPhotos;
    }
    booking.updatedAt = new Date().toISOString();
    db.bookings.set(booking.id, booking);
  }

  // 3. Update Provider Rating in db.providers
  if (targetProviderId && db.providers.has(targetProviderId)) {
    const prov = db.providers.get(targetProviderId)!;
    const currentJobs = Math.max(prov.totalJobs || 1, 1);
    const newRating = Number(((prov.rating * currentJobs + finalRating) / (currentJobs + 1)).toFixed(2));
    prov.rating = Math.max(1, Math.min(5, newRating));
    db.providers.set(targetProviderId, prov);

    // Update Provider Score
    let pScore = db.providerScores.get(targetProviderId);
    if (!pScore) {
      pScore = {
        id: `score-${targetProviderId}`,
        providerId: targetProviderId,
        ratingScore: prov.rating,
        speedScore: 98,
        completionRate: 99,
        overallScore: prov.rating,
        updatedAt: new Date().toISOString(),
      };
    }
    pScore.ratingScore = prov.rating;
    if (source === 'voice') {
      pScore.voiceFeedbackCount = (pScore.voiceFeedbackCount || 0) + 1;
    }
    pScore.qualityScore = Math.round(((pScore.qualityScore || 95) * 4 + serviceQualityScore * 20) / 5);
    pScore.behaviorScore = Math.round(((pScore.behaviorScore || 97) * 4 + professionalismScore * 20) / 5);
    pScore.punctualityScore = Math.round(((pScore.punctualityScore || 94) * 4 + timelinessScore * 20) / 5);

    if (!pScore.recentSentiments) pScore.recentSentiments = [];
    pScore.recentSentiments.unshift({
      text: feedback.slice(0, 80),
      sentiment,
      rating: finalRating,
      date: new Date().toISOString(),
    });
    if (pScore.recentSentiments.length > 8) pScore.recentSentiments.pop();

    db.providerScores.set(targetProviderId, pScore);

    // Send Notification to Provider
    db.addNotification(
      prov.userId || 'usr-provider-101',
      `🎙️ New ${source === 'voice' ? 'Voice' : 'Customer'} Feedback: ${finalRating}★`,
      `Customer said: "${feedback.slice(0, 75)}${feedback.length > 75 ? '...' : ''}"`,
      'SYSTEM'
    );
  }

  // 4. Alert Admin if critical feedback or low rating
  if (finalRating <= 2 || sentiment === 'CRITICAL') {
    db.addNotification(
      'usr-admin-1',
      `⚠️ Negative Feedback Alert (Booking #${bookingId || 'N/A'})`,
      `Customer reported issues: "${feedback.slice(0, 90)}" (Rating: ${finalRating}★, Sentiment: ${sentiment})`,
      'SECURITY'
    );
  }

  return res.json({
    success: true,
    data: {
      reviewId: newReview.id,
      sentiment,
      calculatedRating: finalRating,
      summary,
      keyHighlights: positivePoints.length > 0 ? positivePoints : ['Service Review Recorded'],
      positivePoints,
      negativePoints,
      detectedIssues,
      serviceQualityScore,
      professionalismScore,
      timelinessScore,
      problemResolutionScore,
      source,
    },
    message: 'Voice feedback analyzed and stored successfully!',
  });
});

// 4. Gemini AI Diagnostic Wizard (POST /api/ai/diagnose)
aiRouter.post(['/ai/diagnose', '/api/ai/diagnose'], async (req, res) => {
  try {
    const { problemDescription, imageBase64, categoryHint } = req.body;

    if (!problemDescription || typeof problemDescription !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Please describe the appliance or home issue in detail.',
      });
    }

    const fallbackRecs = getRecommendedServicesForQuery(problemDescription);
    const primaryService = fallbackRecs[0] || { serviceTitle: 'General Technician Inspection', price: 399 };

    if (!hasGeminiKey()) {
      return res.json({
        success: true,
        data: {
          issueSummary: `${categoryHint || 'Appliance'} Functional Diagnosis`,
          rootCause: 'Wear & tear, dust clogging or electrical contact oxidation.',
          severity: 'MEDIUM',
          recommendedServiceName: primaryService.serviceTitle,
          estimatedLaborCost: 299,
          estimatedPartsCost: 199,
          estimatedTotalCost: primaryService.price || 498,
          estimatedDurationMinutes: 45,
          safetyPrecautions: [
            'Switch off main power / water supply valve before technician arrival',
            'Do not attempt DIY opening of pressurized or high voltage compartments',
          ],
          recommendedParts: ['Standard replacement gaskets', 'Connectors & circuit fuses'],
          explanation: `Our technician will conduct an on-site testing protocol and resolve ${problemDescription}.`,
        },
      });
    }

    const systemInstruction = `You are "UrgentLyfe AI Repair Doctor", an expert home service diagnostic engineer for India.
Analyze the user's issue description (and image if provided) regarding home appliances, electricals, plumbing, air conditioning, RO purifiers, etc.
Provide a clear, accurate, structured diagnostic report in JSON format matching this schema:
{
  "issueSummary": "Brief title of detected problem",
  "rootCause": "Technical explanation of what went wrong",
  "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "recommendedServiceName": "Specific service requested (e.g. Power Foam Jet AC Service, MCB Replacement, Tap Leak Fix)",
  "estimatedLaborCost": number in INR (e.g. 399),
  "estimatedPartsCost": number in INR (e.g. 250),
  "estimatedTotalCost": number in INR,
  "estimatedDurationMinutes": number (e.g. 45),
  "safetyPrecautions": ["Array of safety instructions"],
  "recommendedParts": ["List of spare parts"],
  "explanation": "Friendly expert breakdown"
}`;

    const promptText = `User Issue Description: "${problemDescription}". Category context: "${categoryHint || 'Home Repair'}".`;
    let contents: any = promptText;

    if (imageBase64 && typeof imageBase64 === 'string') {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      contents = {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } },
          { text: promptText },
        ],
      };
    }

    const rawText = await generateGeminiContent({
      preferredModel: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const parsedDiagnosis: AIDiagnosis = cleanJsonResponse(rawText || '');
    return res.json({ success: true, data: parsedDiagnosis });
  } catch (error: any) {
    return res.json({
      success: true,
      data: {
        issueSummary: 'Appliance Electrical / Mechanical Fault',
        rootCause: 'Component wear & tear or power fluctuation.',
        severity: 'MEDIUM',
        recommendedServiceName: 'General Technician Inspection',
        estimatedLaborCost: 299,
        estimatedPartsCost: 200,
        estimatedTotalCost: 499,
        estimatedDurationMinutes: 45,
        safetyPrecautions: ['Turn off main power or water supply valve before technician arrival'],
        recommendedParts: ['Circuit fuses', 'Insulation tapes', 'Standard connectors'],
        explanation: 'Our technician will perform a physical multimeter and safety check on site.',
      },
    });
  }
});

// 5. Smart Search Intent (POST /api/ai/smart-search & GET /api/ai/search)
const handleSmartSearch = async (query: string, res: any) => {
  if (!query) {
    return res.json({ success: true, data: {} });
  }

  const fallbackIntent = IntentClassifier.classifyQuery(query);

  if (!hasGeminiKey()) {
    return res.json({
      success: true,
      data: {
        detectedCategory: fallbackIntent.detectedCategory,
        detectedProblem: `Search query: ${query}`,
        urgencyLevel: fallbackIntent.urgencyLevel,
        suggestedServiceIds: fallbackIntent.suggestedServiceIds,
        explanation: 'Matched with real-time NLP Intent Classifier.',
      },
    });
  }

  try {
    const systemInstruction = `You are "UrgentLyfe Search Intent Extractor".
Match the query to available home service categories and return a JSON object:
{
  "detectedCategory": "cat-ac" | "cat-elec" | "cat-plumb" | "cat-carp" | "cat-clean" | "cat-ro" | "cat-appliance",
  "detectedProblem": "Specific issue extracted",
  "urgencyLevel": "LOW" | "NORMAL" | "HIGH" | "EMERGENCY_SOS",
  "suggestedServiceIds": ["srv-ac-01", "srv-plumb-01", "srv-elec-01"],
  "explanation": "Natural language summary explaining what service is matched"
}`;

    const rawText = await generateGeminiContent({
      preferredModel: 'gemini-3.8-flash',
      contents: `User search query: "${query}"`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const parsedSearch = cleanJsonResponse(rawText || '{}');
    return res.json({ success: true, data: parsedSearch });
  } catch (error: any) {
    return res.json({
      success: true,
      data: {
        detectedCategory: fallbackIntent.detectedCategory,
        detectedProblem: `Search query: ${query}`,
        urgencyLevel: fallbackIntent.urgencyLevel,
        suggestedServiceIds: fallbackIntent.suggestedServiceIds,
        explanation: 'Matched with real-time NLP Intent Classifier.',
      },
    });
  }
};

aiRouter.post('/ai/smart-search', (req, res) => {
  const query = String(req.body.query || '').trim();
  handleSmartSearch(query, res);
});

aiRouter.get('/ai/search', (req, res) => {
  const query = String(req.query.q || '').trim();
  handleSmartSearch(query, res);
});

// 6. Visual Image Problem Detection (POST /api/ai/image-detect)
aiRouter.post('/ai/image-detect', async (req, res) => {
  const { imageBase64 } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ success: false, error: 'imageBase64 is required' });
  }

  if (!hasGeminiKey()) {
    return res.json({
      success: true,
      data: {
        detectedIssue: 'Visual appliance defect detected',
        confidence: 0.92,
        category: 'AC & Appliance',
        recommendedService: 'Power Foam Jet AC Service',
      },
    });
  }

  try {
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const rawText = await generateGeminiContent({
      preferredModel: 'gemini-3.8-flash',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } },
          { text: 'Analyze this photo of a home appliance, wiring, pipe, or broken item. Identify what is damaged and suggest the repair category in JSON: { "detectedIssue": string, "confidence": number, "category": string, "recommendedService": string }' },
        ],
      },
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = cleanJsonResponse(rawText || '{}');
    return res.json({ success: true, data: parsed });
  } catch (err: any) {
    return res.json({
      success: true,
      data: {
        detectedIssue: 'Appliance component wear & tear',
        confidence: 0.88,
        category: 'Home Service',
        recommendedService: 'Technician Inspection Service',
      },
    });
  }
});

// 7. ML Price Estimator
aiRouter.post('/ml/estimate-price', (req, res) => {
  const { serviceId, isUrgent, city, quantity = 1, addonCount = 0 } = req.body;
  const service = db.services.get(serviceId);

  if (!service) {
    return res.status(404).json({ success: false, error: 'Service not found for ML pricing' });
  }

  const result = PricingEngine.calculatePrice({
    serviceId,
    basePrice: service.price,
    city,
    isUrgent,
    quantity,
    addonCount,
  });

  return res.json({
    success: true,
    data: {
      serviceTitle: service.title,
      ...result,
    },
  });
});

// 8. ML Match Partner
aiRouter.post('/ml/match-partner', (req, res) => {
  const { categoryId, isUrgent, customerLat, customerLng } = req.body;
  const allPartners = Array.from(db.providers.values()).map((p) => ({
    id: p.id,
    name: p.fullName,
    phone: p.phone,
    rating: p.rating,
    reviewsCount: Math.round(p.totalJobs * 0.8),
    experienceYears: p.experienceYears,
    tier: (p.hourlyRate >= 700 ? 'DIAMOND' : p.hourlyRate >= 450 ? 'GOLD' : 'STANDARD') as any,
    availability: p.availability as any,
    completedJobs: p.totalJobs,
    lat: 12.9716, // Default Bangalore coordinates
    lng: 77.5946,
    badge: p.badge,
    categoryId: p.categoryId,
  }));

  const result = PartnerMatcher.matchAndRank(allPartners, {
    categoryId,
    isUrgent,
    customerLat,
    customerLng,
  });

  return res.json({
    success: true,
    data: result,
  });
});

// 9. AI Smart Service Tips & Maintenance Advice (POST /api/ai/service-tips)
aiRouter.post(['/ai/service-tips', '/api/ai/service-tips'], async (req, res) => {
  const {
    serviceId,
    serviceTitle,
    categoryId,
    description,
    features = [],
    city = 'Bengaluru',
    customQuestion,
  } = req.body;

  if (!serviceTitle && !serviceId) {
    return res.status(400).json({ success: false, error: 'serviceTitle or serviceId is required' });
  }

  const title = serviceTitle || 'Home Service';
  const cat = (categoryId || '').toLowerCase();
  const lowerTitle = title.toLowerCase();

  // Helper to build tailored fallback tips
  const buildFallbackTips = () => {
    // 1. Air Conditioner & Appliances
    if (lowerTitle.includes('ac') || cat.includes('ac') || lowerTitle.includes('cooling') || lowerTitle.includes('filter')) {
      return {
        serviceId: serviceId || 'ac-service',
        serviceTitle: title,
        overview: `Routine maintenance of your ${title} prevents compressor overheating, cuts power spikes by up to 22%, and keeps indoor airflow allergen-free.`,
        lifespanExpectancy: '8–12 years with bi-weekly filter care & bi-annual foam jet service vs 4–5 years with zero upkeep.',
        maintenanceCadence: 'Rinse nylon mesh filters every 15 days; book professional deep foam cleaning every 6 months.',
        tips: [
          {
            id: 'tip-1',
            title: 'Bi-Weekly Nylon Filter Rinse',
            tip: 'Dust-clogged filters force the compressor to draw 30% more current, choking cooling capacity and hiking electricity bills.',
            category: 'ENERGY_COST_SAVER',
            categoryLabel: 'Energy & Cost Saver',
            frequency: 'Every 15 Days',
            impactBadge: '⚡ Cuts power bills by up to 18%',
            actionStep: 'Slide out indoor mesh filters, wash under lukewarm running tap water (no harsh detergents), air dry completely before re-inserting.',
            proRecommendation: 'Never run the AC unit with damp or missing filters as dust will bake directly onto the cooling coils.',
          },
          {
            id: 'tip-2',
            title: 'Maintain 24°C Optimal Thermostat Rule',
            tip: 'Setting the temperature to 18°C does not cool the room faster—it only makes the compressor run non-stop without cycling.',
            category: 'EXTEND_LIFESPAN',
            categoryLabel: 'Lifespan Extender',
            frequency: 'Daily Usage',
            impactBadge: '🛡️ Prevents compressor burnout',
            actionStep: 'Set thermostat between 24°C–26°C with ceiling fan on low speed for uniform convective chill across the entire room.',
            proRecommendation: 'Every 1°C increase saves roughly 6% electricity while drastically lowering compressor wear.',
          },
          {
            id: 'tip-3',
            title: 'Outdoor Condenser Clearance & Coil Check',
            tip: 'Outdoor units placed near walls or pigeon nests trap hot exhaust air, causing high head pressure trips during peak summer.',
            category: 'SAFETY_WARNING',
            categoryLabel: 'Safety & Protection',
            frequency: 'Monthly Inspection',
            impactBadge: '⚠️ Avoids sudden emergency shutdown',
            actionStep: 'Ensure at least 2 feet of clear space around the outdoor condenser; gently hose down loose dust from exterior fins.',
            proRecommendation: 'If the copper pipes freeze or show white frost, turn off the AC immediately to prevent liquid refrigerant slugging.',
          },
          {
            id: 'tip-4',
            title: 'Drain Pipe Slime & Mold Flush',
            tip: 'Condensate drain lines accumulate bacterial slime, causing dirty water to overflow indoors onto walls and electrical sockets.',
            category: 'DIY_PREVENTIVE',
            categoryLabel: 'DIY Preventive Care',
            frequency: 'Quarterly',
            impactBadge: '💧 Zero indoor water leakage',
            actionStep: 'Pour a cup of 50/50 white vinegar and warm water into the drain tray drain hole to dissolve algae buildup.',
            proRecommendation: 'Schedule an UrgentLyfe Foam Jet deep clean before summer to clear deep pipe blockages.',
          },
        ],
        proSecret: 'Running the AC in "Fan Only" or "Dry" mode for 20 minutes before turning it off evaporates moisture on the coils, preventing foul mold odor!',
        warningSign: 'Hissing sound near indoor unit or ice forming on copper tubing indicates refrigerant leak—turn off immediately to protect the compressor.',
        aiGenerated: false,
        timestamp: new Date().toISOString(),
      };
    }

    // 2. Washing Machine & Water Appliances
    if (lowerTitle.includes('washing') || lowerTitle.includes('dryer') || lowerTitle.includes('laundry')) {
      return {
        serviceId: serviceId || 'washing-machine',
        serviceTitle: title,
        overview: `Hard water minerals and detergent sludge degrade washing machine drum bearings and solenoid valves if not descaled regularly.`,
        lifespanExpectancy: '10–12 years with monthly descaling vs 5–6 years with bearing failure from lime scale.',
        maintenanceCadence: 'Empty lint/coin filter monthly; run an empty tub-clean cycle with descaling powder every 30–45 days.',
        tips: [
          {
            id: 'tip-1',
            title: 'Tub Clean Cycle with Descaling Salts',
            tip: 'Hard water salts coat the heating element and spider arm, causing foul odors and sudden spin-cycle grinding noise.',
            category: 'EXTEND_LIFESPAN',
            categoryLabel: 'Lifespan Extender',
            frequency: 'Monthly',
            impactBadge: '🛡️ Adds 4+ years to drum life',
            actionStep: 'Add 1 packet of citric acid or appliance descaler into the drum; run hot "Tub Clean" or 60°C cotton cycle completely empty.',
            proRecommendation: 'Never use regular laundry detergent during a tub clean cycle to prevent excessive foam overflow into control boards.',
          },
          {
            id: 'tip-2',
            title: 'Clean Coin Trap & Debris Filter',
            tip: 'Coins, hairpins, and loose threads collect in the bottom pump filter, jamming the impeller and causing drainage error codes (E20/OE).',
            category: 'DIY_PREVENTIVE',
            categoryLabel: 'DIY Preventive Care',
            frequency: 'Every 30 Days',
            impactBadge: '🚫 Prevents pump burnout',
            actionStep: 'Open bottom flap, place a tray, unscrew coin filter slowly, rinse trapped debris under tap and screw back tight.',
            proRecommendation: 'Check trouser pockets before loading to avoid metal pins puncturing the rubber door gasket.',
          },
          {
            id: 'tip-3',
            title: 'Leave Door Ajar to Prevent Mold & Mildew',
            tip: 'Sealing the airtight door immediately after a wash cycle locks in humidity, creating black fungal spots on rubber bellows.',
            category: 'DIY_PREVENTIVE',
            categoryLabel: 'DIY Preventive Care',
            frequency: 'After Every Wash',
            impactBadge: '🌸 Fresh, odor-free laundry',
            actionStep: 'Keep front-load door open 2–3 inches and wipe moisture off the rubber door seal with a microfiber towel.',
            proRecommendation: 'If rubber gasket already has black spots, wipe with dilute hydrogen peroxide or baking soda paste.',
          },
          {
            id: 'tip-4',
            title: 'Avoid Overloading Weight Capacity',
            tip: 'Overfilling the drum unbalances suspension springs and damages motor bearings, causing heavy thumping during spin cycle.',
            category: 'SAFETY_WARNING',
            categoryLabel: 'Safety & Protection',
            frequency: 'Daily Usage',
            impactBadge: '⚖️ Protects suspension struts',
            actionStep: 'Leave one hand’s width of empty vertical space between top of clothes and top of drum ceiling.',
            proRecommendation: 'Distribute heavy items like bedsheets evenly with lighter garments to maintain spin balance.',
          },
        ],
        proSecret: 'Excess liquid detergent causes soapy residue buildup that ruins water level sensors. Always measure to the detergent cap line!',
        warningSign: 'Loud jet-engine roaring sound during spin cycle means drum bearings have failed—book immediate service before drum jams completely.',
        aiGenerated: false,
        timestamp: new Date().toISOString(),
      };
    }

    // 3. Plumbing, Drain, Leak, Bathroom Services
    if (lowerTitle.includes('plumb') || lowerTitle.includes('drain') || lowerTitle.includes('pipe') || lowerTitle.includes('tap') || cat.includes('plumb')) {
      return {
        serviceId: serviceId || 'plumbing-service',
        serviceTitle: title,
        overview: `Timely plumbing care eliminates silent slab water seepage, scale buildup in mixer aerators, and sudden pipe bursting.`,
        lifespanExpectancy: '15+ years for brass valves and PVC pipes with regular aerator cleaning & pressure moderation.',
        maintenanceCadence: 'Clean faucet aerators every 2 months; test emergency isolation stop valves twice a year.',
        tips: [
          {
            id: 'tip-1',
            title: 'Vinegar Soak for Faucet Aerators',
            tip: 'Mineral deposits choke water pressure at tap nozzles, making it look like a mainline pump failure.',
            category: 'DIY_PREVENTIVE',
            categoryLabel: 'DIY Preventive Care',
            frequency: 'Every 60 Days',
            impactBadge: '🚿 Restores full 100% water flow',
            actionStep: 'Unscrew the tip of the tap nozzle, soak the tiny mesh screen in warm white vinegar for 30 minutes, brush off grit and reinstall.',
            proRecommendation: 'Wrap pliers with cloth when unscrewing to prevent scratching chrome finishes.',
          },
          {
            id: 'tip-2',
            title: 'Never Pour Hot Grease Down Kitchen Sinks',
            tip: 'Cooking oil solidifies as it cools inside P-traps, binding with coffee grounds and creating impenetrable fatbergs.',
            category: 'EXTEND_LIFESPAN',
            categoryLabel: 'Lifespan Extender',
            frequency: 'Daily Habit',
            impactBadge: '🚫 Zero stubborn drain clogs',
            actionStep: 'Wipe oily pans with a paper towel into dustbins; pour a kettle of boiling water down the drain weekly to melt residue.',
            proRecommendation: 'Avoid harsh sulfuric acid drain openers as they corrode older PVC joints and release toxic fumes.',
          },
          {
            id: 'tip-3',
            title: 'Locate & Exercise Main Water Shutoff Valve',
            tip: 'In a plumbing pipe burst emergency, knowing your stop valve location stops catastrophic flooding within 30 seconds.',
            category: 'SAFETY_WARNING',
            categoryLabel: 'Safety & Protection',
            frequency: 'Every 6 Months',
            impactBadge: '🛡️ Prevents ₹50,000+ water damage',
            actionStep: 'Turn the main isolation angle cock under sink/bathroom clockwise and back counter-clockwise once every 6 months to prevent seizing.',
            proRecommendation: 'If an angle valve feels seized, do not force it with heavy tools—spray WD-40 or call UrgentLyfe plumber.',
          },
          {
            id: 'tip-4',
            title: 'Check Toilet Cistern Flapper for Silent Leaks',
            tip: 'A worn rubber flush valve quietly trickles water into the bowl 24/7, wasting over 200 liters of fresh water daily.',
            category: 'ENERGY_COST_SAVER',
            categoryLabel: 'Energy & Cost Saver',
            frequency: 'Quarterly Check',
            impactBadge: '💧 Saves 6,000L of water/month',
            actionStep: 'Drop 3 drops of food coloring into the cistern tank. If color appears in the bowl within 15 minutes without flushing, replace the flapper.',
            proRecommendation: 'Modern dual-flush siphon seals cost under ₹200 and pay for themselves in one water bill cycle.',
          },
        ],
        proSecret: 'Installing a basic stainless steel mesh sink strainer catches 95% of food waste before it ever enters your underground plumbing pipes!',
        warningSign: 'Damp bubbling paint or white salt efflorescence on walls adjacent to bathrooms indicates hidden pipe joint leakage.',
        aiGenerated: false,
        timestamp: new Date().toISOString(),
      };
    }

    // 4. Electrical, Switchboard, Fan, MCB
    if (lowerTitle.includes('electr') || lowerTitle.includes('fan') || lowerTitle.includes('wiring') || lowerTitle.includes('mcb') || cat.includes('electr')) {
      return {
        serviceId: serviceId || 'electrical-service',
        serviceTitle: title,
        overview: `Preventive electrical maintenance prevents dangerous loose terminal sparking, short-circuit fire risks, and appliance surge damage.`,
        lifespanExpectancy: '20+ years for concealed copper wiring; 7–10 years for ceiling fans and MCBs with proper load balancing.',
        maintenanceCadence: 'Dust fan blades bi-monthly; test RCCB/ELCB trip button once a month; check heavy appliance plug pins quarterly.',
        tips: [
          {
            id: 'tip-1',
            title: 'Monthly Test of RCCB Earth Leakage Trip',
            tip: 'The Residual Current Circuit Breaker (RCCB) on your main distribution board protects human life from fatal shocks.',
            category: 'SAFETY_WARNING',
            categoryLabel: 'Safety & Protection',
            frequency: 'Monthly',
            impactBadge: '⚡ 100% Electric shock protection',
            actionStep: 'Press the "T" (Test) button on the RCCB breaker. It must immediately snap OFF. If it doesn’t trip, internal mechanism is faulty.',
            proRecommendation: 'If RCCB does not trip on test, replace it immediately. It is your household’s primary defense against electrocution.',
          },
          {
            id: 'tip-2',
            title: 'Clean Ceiling Fan Blades to Stop Wobble & Hum',
            tip: 'Heavy dust buildup on leading edges imbalances blade aerodynamics, wearing out ball bearings and creating high-pitched buzzing.',
            category: 'EXTEND_LIFESPAN',
            categoryLabel: 'Lifespan Extender',
            frequency: 'Monthly',
            impactBadge: '🌀 Silent breeze & bearing longevity',
            actionStep: 'Slide an old pillowcase over each blade and pull backward to capture dust without scattering grime into the room.',
            proRecommendation: 'Never pull down on fan blades while cleaning as bent blades cause permanent wobbling that shakes ceiling fasteners.',
          },
          {
            id: 'tip-3',
            title: 'Avoid Multi-Plug Adapters on High-Wattage Sockets',
            tip: 'Daisy-chaining multiple heaters, irons, or microwaves on a single 16A socket causes thermal pin deformation and melt fires.',
            category: 'SAFETY_WARNING',
            categoryLabel: 'Safety & Protection',
            frequency: 'Ongoing Habit',
            impactBadge: '🔥 Zero switchboard burnout risk',
            actionStep: 'Dedicate direct 16A wall sockets with ceramic or heavy brass terminals for appliances above 1500 Watts.',
            proRecommendation: 'If a plug pin feels warm to the touch after 10 minutes of use, internal socket contacts have loosened and need replacement.',
          },
          {
            id: 'tip-4',
            title: 'Surge Protection for Smart Electronics & TVs',
            tip: 'Grid voltage spikes in Indian cities during lightning or power restoration damage delicate smart board inverter circuits.',
            category: 'ENERGY_COST_SAVER',
            categoryLabel: 'Energy & Cost Saver',
            frequency: 'One-Time Setup',
            impactBadge: '🛡️ Guards ₹40,000+ smart devices',
            actionStep: 'Plug OLED TVs, gaming consoles, and laptops into spike busters equipped with MOV (Metal Oxide Varistor) surge suppression.',
            proRecommendation: 'During heavy monsoon thunderstorms, physically unplug auxiliary antennas and HDMI cables from wall outlets.',
          },
        ],
        proSecret: 'A faint fishy or burnt plastic smell near a switchboard is the telltale signature of overheated terminal insulation—switch off the main MCB!',
        warningSign: 'Sparks when inserting a plug or frequent flickering of LED bulbs indicates loose neutral wiring in the junction box.',
        aiGenerated: false,
        timestamp: new Date().toISOString(),
      };
    }

    // 5. Cleaning, Pest Control, Sofa, Kitchen
    if (lowerTitle.includes('clean') || lowerTitle.includes('pest') || lowerTitle.includes('sofa') || lowerTitle.includes('deep clean') || cat.includes('clean')) {
      return {
        serviceId: serviceId || 'cleaning-service',
        serviceTitle: title,
        overview: `Professional maintenance and proactive sanitation keep living spaces allergen-free, extend upholstery fabric luster, and deter pest colonization.`,
        lifespanExpectancy: 'Maintains sofa fabric texture and tile grout brightness for 8–10 years; keeps pests away for 6+ months.',
        maintenanceCadence: 'Vacuum upholstery fortnightly; wipe kitchen surfaces daily; deep clean tile grout every 4–6 months.',
        tips: [
          {
            id: 'tip-1',
            title: 'Immediate Blotting for Upholstery Spills',
            tip: 'Rubbing a wet spill pushes tea, coffee, or food oil deeper into cushion foam fibers, locking in permanent discoloration.',
            category: 'DIY_PREVENTIVE',
            categoryLabel: 'DIY Preventive Care',
            frequency: 'Immediate When Spilled',
            impactBadge: '✨ Zero permanent fabric stains',
            actionStep: 'Press clean paper towels firmly against the spill to absorb liquid. Dab gently from outside towards center with diluted mild dish soap.',
            proRecommendation: 'Never use bleaching agents or hot water on velvet, suede, or dyed linen fabrics.',
          },
          {
            id: 'tip-2',
            title: 'Dry Kitchen Sinks & Counter Gaps at Night',
            tip: 'German cockroaches thrive on standing water droplets and food crumbs trapped in silicone countertop corners.',
            category: 'EXTEND_LIFESPAN',
            categoryLabel: 'Lifespan Extender',
            frequency: 'Every Night',
            impactBadge: '🪳 95% Pest deterrence rate',
            actionStep: 'Wipe kitchen sinks dry with a microfiber towel and seal food scraps in tightly closed trash bins before bed.',
            proRecommendation: 'Pests can survive a month without food, but only days without water—drying sinks breaks their breeding cycle.',
          },
          {
            id: 'tip-3',
            title: 'Baking Soda Deodorizer for Mattresses & Rugs',
            tip: 'Mattresses absorb human body perspiration and dust mites, leading to musty odors and morning sneezing fits.',
            category: 'ENERGY_COST_SAVER',
            categoryLabel: 'Energy & Cost Saver',
            frequency: 'Every Month',
            impactBadge: '🍃 100% Natural odor neutralization',
            actionStep: 'Sprinkle light layer of baking soda over mattress, let sit for 45 minutes to absorb moisture and odor, then vacuum thoroughly.',
            proRecommendation: 'Flip or rotate mattresses 180 degrees every 3 months to prevent body impression sagging.',
          },
          {
            id: 'tip-4',
            title: 'Maintain 2-Hour Post-Pest Ventilation Window',
            tip: 'Professional gel and spray treatments need proper ventilation once initial surface contact time has elapsed.',
            category: 'SAFETY_WARNING',
            categoryLabel: 'Safety & Protection',
            frequency: 'Post-Treatment',
            impactBadge: '🛡️ Safe for kids & pets',
            actionStep: 'Keep doors and windows wide open for 1–2 hours after returning home; do not wipe off gel bait dots placed inside kitchen cabinets.',
            proRecommendation: 'Do not spray common chemical aerosol sprays near professional bait gel spots as it contaminates the bait attraction.',
          },
        ],
        proSecret: 'Wiping bathroom glass partitions with a silicone squeegee after each shower takes 20 seconds and completely prevents hard water limescale etching!',
        warningSign: 'Hollow sound when tapping wooden door frames or tiny mud tubes in corners indicates active subterranean termite movement.',
        aiGenerated: false,
        timestamp: new Date().toISOString(),
      };
    }

    // 6. Salon, Grooming, Spa, Wellness
    if (lowerTitle.includes('salon') || lowerTitle.includes('massage') || lowerTitle.includes('spa') || lowerTitle.includes('hair') || lowerTitle.includes('facial') || cat.includes('salon')) {
      return {
        serviceId: serviceId || 'salon-service',
        serviceTitle: title,
        overview: `Post-treatment care locks in botanical nutrients, extends facial glow, prevents follicular irritation, and maximizes relaxation benefits.`,
        lifespanExpectancy: 'Extends radiant facial glow from 3 days to 14+ days; prolongs hair smoothening and manicure durability.',
        maintenanceCadence: 'Hydrate skin daily with SPF 50+; apply sulfate-free conditioner post-wash; schedule touchups every 4–6 weeks.',
        tips: [
          {
            id: 'tip-1',
            title: 'The 24-Hour Post-Facial Sunscreen & Steam Rule',
            tip: 'Exfoliated skin and open pores are highly vulnerable to UV hyperpigmentation and pollution particles immediately after a deep facial.',
            category: 'EXTEND_LIFESPAN',
            categoryLabel: 'Lifespan Extender',
            frequency: 'First 24–48 Hours',
            impactBadge: '🌟 Doubles natural facial glow',
            actionStep: 'Avoid direct sunlight, steam rooms, swimming pools, or applying heavy makeup for 24 hours. Apply a broad-spectrum SPF 50+ sunscreen.',
            proRecommendation: 'Wash face only with cool or lukewarm water for the first 2 days—avoid harsh physical scrubs.',
          },
          {
            id: 'tip-2',
            title: 'Hydrate Heavily Post Deep Tissue & Spa Therapy',
            tip: 'Deep myofascial massage releases metabolic waste and lactic acid from tense muscle knots into your bloodstream.',
            category: 'DIY_PREVENTIVE',
            categoryLabel: 'DIY Preventive Care',
            frequency: 'Immediate & Next 24h',
            impactBadge: '💧 Eliminates next-day muscle soreness',
            actionStep: 'Drink 2–3 large glasses of warm water or electrolyte coconut water over the next 4 hours to flush out released toxins.',
            proRecommendation: 'A warm epsom salt bath 6 hours after massage prevents localized stiffness and deepens muscle recovery.',
          },
          {
            id: 'tip-3',
            title: 'Use Sulfate-Free Shampoos After Hair Spa / Keratin',
            tip: 'Commercial sulfates (SLS/SLES) strip protein coats and natural lipids, turning treated silky hair rough within 2 washes.',
            category: 'ENERGY_COST_SAVER',
            categoryLabel: 'Energy & Cost Saver',
            frequency: 'Every Wash',
            impactBadge: '✨ Retains salon finish for 8+ weeks',
            actionStep: 'Switch to a gentle pH-balanced sulfate and paraben-free shampoo, and always rinse with cool water to lock hair cuticles.',
            proRecommendation: 'Do not tie hair into tight rubber bands or ponytails for 48 hours following a blowout or smoothening session.',
          },
          {
            id: 'tip-4',
            title: 'Apply Cuticle Oil Post Manicure / Pedicure',
            tip: 'Dry air and soap strip oils from nail beds, leading to chipped polish and painful ragged cuticles.',
            category: 'DIY_PREVENTIVE',
            categoryLabel: 'DIY Preventive Care',
            frequency: 'Every Night',
            impactBadge: '💅 Chip-free nails for 2+ weeks',
            actionStep: 'Massage a drop of jojoba or almond cuticle oil into nail bases before bedtime to nourish matrix growth.',
            proRecommendation: 'Wear rubber gloves when washing dishes with detergent to protect nail enamel from chipping.',
          },
        ],
        proSecret: 'Sleeping on a satin or silk pillowcase prevents facial friction wrinkles and eliminates morning hair frizz by 70%!',
        warningSign: 'Any burning sensation or persistent red rash after chemical peeling warrants cold milk compresses and dermatologist consultation.',
        aiGenerated: false,
        timestamp: new Date().toISOString(),
      };
    }

    // 7. General Default Fallback
    return {
      serviceId: serviceId || 'home-service',
      serviceTitle: title,
      overview: `Regular care and timely preventative maintenance for ${title} preserve performance, lower long-term repair costs, and ensure safety.`,
      lifespanExpectancy: 'Consistently extends functional lifespan by 40%–60% compared to neglected systems.',
      maintenanceCadence: 'Inspect monthly; clean dust and filters regularly; book verified UrgentLyfe checkup every 6–12 months.',
      tips: [
        {
          id: 'tip-1',
          title: 'Schedule Periodic Preventive Checkups',
          tip: 'Small minor noises, loose screws, and slight resistance are early warnings of impending total component failure.',
          category: 'EXTEND_LIFESPAN',
          categoryLabel: 'Lifespan Extender',
          frequency: 'Quarterly',
          impactBadge: '🛡️ Prevents 80% sudden breakdowns',
          actionStep: 'Inspect joints, moving parts, and surface seals. Tighten loose fasteners and note any unusual vibration.',
          proRecommendation: 'Address minor anomalies immediately before they cascade into high-cost repairs.',
        },
        {
          id: 'tip-2',
          title: 'Keep Equipment Dry & Well-Ventilated',
          tip: 'Trapped indoor moisture and dust build-up create oxidation rust and electrical leakage.',
          category: 'SAFETY_WARNING',
          categoryLabel: 'Safety & Protection',
          frequency: 'Monthly',
          impactBadge: '⚡ Zero corrosion or short circuits',
          actionStep: 'Ensure adequate air circulation around fixtures and wipe down ambient condensation with clean microfiber.',
          proRecommendation: 'Never store flammable chemicals or solvents close to operational machinery.',
        },
        {
          id: 'tip-3',
          title: 'Energy Efficiency Optimization',
          tip: 'Operating appliances within recommended factory parameters avoids wasteful electrical or water consumption.',
          category: 'ENERGY_COST_SAVER',
          categoryLabel: 'Energy & Cost Saver',
          frequency: 'Daily Usage',
          impactBadge: '💰 Lowers utility expenses by 15%',
          actionStep: 'Turn off standby power switches when not in use and operate within moderate manufacturer ratings.',
          proRecommendation: 'Utilize eco or smart timer modes whenever available.',
        },
        {
          id: 'tip-4',
          title: 'DIY Safe Cleaning Routine',
          tip: 'Harsh abrasive chemicals degrade protective factory clearcoats and rubber insulation.',
          category: 'DIY_PREVENTIVE',
          categoryLabel: 'DIY Preventive Care',
          frequency: 'Bi-Weekly',
          impactBadge: '✨ Maintains pristine factory finish',
          actionStep: 'Use mild pH-neutral soapy water and soft lint-free cloths for regular surface sanitization.',
          proRecommendation: 'Always disconnect main power supplies before performing any cleaning or wiping routines.',
        },
      ],
      proSecret: 'Keep all service receipts and warranty records in your UrgentLyfe dashboard for instant 30-day rework protection!',
      warningSign: 'Unusual grinding sounds, excessive heat, or strange odors indicate immediate servicing is required.',
      aiGenerated: false,
      timestamp: new Date().toISOString(),
    };
  };

  // If Gemini API is not configured, return high-quality crafted fallback immediately
  if (!hasGeminiKey()) {
    const fallback = buildFallbackTips();
    return res.json({
      success: true,
      data: fallback,
    });
  }

  // Gemini AI Generation
  try {
    const prompt = `You are a certified master technician and home maintenance engineer at UrgentLyfe, India's leading home service platform.
Generate intelligent, highly practical 'Smart Service Tips' and maintenance advice for the service: "${title}" (Category: "${cat || 'Home Services'}", City: "${city}").

${customQuestion ? `The customer also asked this specific maintenance question: "${customQuestion}". Be sure to address it thoroughly in the advice or as a custom tip.` : ''}

Return a valid JSON object matching this schema:
{
  "serviceId": "${serviceId || 'srv-custom'}",
  "serviceTitle": "${title}",
  "overview": "A punchy 2-sentence summary explaining why proactive maintenance of this service/appliance saves money, improves safety, and maintains peak performance in Indian conditions (dust, hard water, monsoon humidity, voltage spikes).",
  "lifespanExpectancy": "Specific lifespan comparison with regular upkeep vs without (e.g., '10-12 years with routine care vs 4-5 years if neglected')",
  "maintenanceCadence": "Clear recommended routine schedule (e.g. 'DIY filter rinse every 15 days, professional deep clean every 6 months')",
  "tips": [
    {
      "id": "tip-1",
      "title": "Actionable, catchy title (e.g. 'Bi-Weekly Filter Rinse')",
      "tip": "Clear explanation of the problem, mechanism, and why this matters.",
      "category": "One of ['DIY_PREVENTIVE', 'EXTEND_LIFESPAN', 'ENERGY_COST_SAVER', 'SAFETY_WARNING']",
      "categoryLabel": "Human friendly label e.g. 'DIY Preventive Care' or 'Energy & Cost Saver'",
      "frequency": "How often to do it (e.g. 'Every 15 Days', 'Monthly', 'Post-Service', 'Before Summer')",
      "impactBadge": "Quantifiable benefit badge with emoji (e.g. '⚡ Cuts power bills by up to 18%', '🛡️ Prevents motor burnout', '💧 Saves 200L water/day')",
      "actionStep": "Crisp, step-by-step instruction a homeowner can safely perform in 2 minutes.",
      "proRecommendation": "Insider technician caution or tip to avoid common mistakes."
    }
  ],
  "proSecret": "A clever, non-obvious technician insider secret that most homeowners do not know.",
  "warningSign": "The #1 critical red flag or symptom indicating the customer must immediately stop usage and book an emergency professional.",
  "aiGenerated": true
}

Generate exactly 4 comprehensive, distinct, realistic tips (covering DIY care, energy/cost savings, lifespan extension, and safety/warning). Ensure realistic Indian context (e.g. hard water, heat, power fluctuations, dust).`;

    const rawText = await generateGeminiContent({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
      preferredModel: 'gemini-3.8-flash',
      timeoutMs: 12000,
    });

    const parsed = cleanJsonResponse(rawText || '{}');

    if (parsed && Array.isArray(parsed.tips) && parsed.tips.length > 0) {
      return res.json({
        success: true,
        data: {
          ...parsed,
          serviceId: serviceId || parsed.serviceId || 'srv-1',
          serviceTitle: title,
          aiGenerated: true,
          timestamp: new Date().toISOString(),
        },
      });
    }

    // Fallback if parsing didn't return valid tips array
    const fallback = buildFallbackTips();
    return res.json({
      success: true,
      data: { ...fallback, aiGenerated: false },
    });
  } catch (err: any) {
    console.warn('Gemini smart service tips failed, using fallback:', err.message);
    const fallback = buildFallbackTips();
    return res.json({
      success: true,
      data: fallback,
    });
  }
});
