import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Wrench,
  ChevronRight,
  Clock,
  Flame,
  Zap,
  Droplets,
  AirVent,
  Bug,
  Paintbrush,
  Scissors,
  Check,
  Gauge,
  ThermometerSnowflake,
  Search,
} from 'lucide-react';
import { WorkStep } from '../../types';
import { handleImageError } from '../../utils/imageFallback';

interface ServiceVideoPlayerProps {
  videoUrl?: string;
  posterImage?: string;
  title: string;
  subtitle?: string;
  categoryName?: string;
  workSteps?: WorkStep[];
  toolsUsed?: string[];
  autoPlay?: boolean;
  className?: string;
}

interface StepScene {
  stepNum: number;
  stageName: string;
  title: string;
  hindiCaption: string;
  englishDetail: string;
  toolName: string;
  metricLabel: string;
  metricValue: string;
  image: string;
  animationType: 'ac' | 'plumbing' | 'electric' | 'cleaning' | 'painting' | 'pest' | 'salon' | 'carpentry' | 'default';
}

export const ServiceVideoPlayer: React.FC<ServiceVideoPlayerProps> = ({
  videoUrl,
  posterImage,
  title,
  subtitle,
  categoryName = '',
  workSteps,
  toolsUsed = [],
  autoPlay = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0); // 0 to 30 seconds
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeStepTab, setActiveStepTab] = useState<number>(0);

  // Total duration fixed to exactly 30 seconds as requested
  const TOTAL_DURATION = 30;
  const STEP_DURATION = 7.5; // 30s / 4 steps = 7.5s per step

  // Detect domain category
  const getCategoryTheme = useCallback((): StepScene['animationType'] => {
    const text = `${title} ${subtitle || ''} ${categoryName}`.toLowerCase();
    if (text.includes('ac') || text.includes('air condition') || text.includes('cooling') || text.includes('jet') || text.includes('gas') || text.includes('refrigerant') || text.includes('ro water') || text.includes('purifier')) {
      return 'ac';
    }
    if (text.includes('plumb') || text.includes('pipe') || text.includes('leak') || text.includes('tap') || text.includes('drain') || text.includes('unclog') || text.includes('flush') || text.includes('tank')) {
      return 'plumbing';
    }
    if (text.includes('electric') || text.includes('wiring') || text.includes('mcb') || text.includes('switch') || text.includes('short circuit') || text.includes('smart lock') || text.includes('fan') || text.includes('inverter') || text.includes('cctv')) {
      return 'electric';
    }
    if (text.includes('clean') || text.includes('deep clean') || text.includes('sofa') || text.includes('carpet') || text.includes('scrub') || text.includes('kitchen') || text.includes('bathroom') || text.includes('balcony') || text.includes('apartment') || text.includes('villa')) {
      return 'cleaning';
    }
    if (text.includes('paint') || text.includes('wall panel') || text.includes('damp') || text.includes('seepage') || text.includes('waterproof') || text.includes('emulsion') || text.includes('revamp')) {
      return 'painting';
    }
    if (text.includes('pest') || text.includes('termite') || text.includes('cockroach') || text.includes('herbal') || text.includes('bedbug') || text.includes('mosquito')) {
      return 'pest';
    }
    if (text.includes('salon') || text.includes('spa') || text.includes('massage') || text.includes('facial') || text.includes('haircut') || text.includes('waxing') || text.includes('pedicure') || text.includes('grooming')) {
      return 'salon';
    }
    if (text.includes('carpent') || text.includes('furniture') || text.includes('hinge') || text.includes('drawer') || text.includes('assembly') || text.includes('wood') || text.includes('polish')) {
      return 'carpentry';
    }
    return 'default';
  }, [title, subtitle, categoryName]);

  const animationType = getCategoryTheme();

  // Curated domain visual scenes for the 4 steps of each service category
  const getDomainScenes = useCallback((): StepScene[] => {
    switch (animationType) {
      case 'ac':
        return [
          {
            stepNum: 1,
            stageName: 'DIAGNOSTICS & TEMPERATURE',
            title: workSteps?.[0]?.title || 'Pre-Service Diagnostic & Airflow Check',
            hindiCaption: 'Step 1: AC ki baseline cooling, airflow speed aur gas pressure ka digital sensor test',
            englishDetail: 'Fluke thermal sensor records intake vs vent temp; indoor electrical components inspected.',
            toolName: toolsUsed[0] || 'Digital Anemometer & Temp Gun',
            metricLabel: 'Air Vent Temp',
            metricValue: '28.4°C → Target 16°C',
            image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85',
            animationType: 'ac',
          },
          {
            stepNum: 2,
            stageName: 'POWER FOAM JET WASH',
            title: workSteps?.[1]?.title || 'Indoor Unit Foam Jet Cleaning',
            hindiCaption: 'Step 2: Waterproof jacket laga kar 120 PSI Power Foam Jet se indoor cooling coils aur blower deep wash',
            englishDetail: 'Zero-spill indoor jacket shields walls; antibacterial active foam eliminates 100% dust & fungus.',
            toolName: toolsUsed[1] || '120 PSI Power Foam Jet Machine',
            metricLabel: 'Jet Pressure',
            metricValue: '120 PSI High Blast',
            image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85',
            animationType: 'ac',
          },
          {
            stepNum: 3,
            stageName: 'OUTDOOR UNIT & GAS REFILL',
            title: workSteps?.[2]?.title || 'Outdoor Condenser Wash & Gas Top-Up',
            hindiCaption: 'Step 3: Outdoor condenser fins ki power washing aur 100% pure refrigerant gas pressure calibration',
            englishDetail: 'High pressure fin flush dissolves heat blockage; electronic manifold verifies 140 PSI standing gas.',
            toolName: toolsUsed[2] || 'Pure Refrigerant Cylinder & Manifold',
            metricLabel: 'Gas Pressure',
            metricValue: '140 PSI (100% Pure R32)',
            image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85',
            animationType: 'ac',
          },
          {
            stepNum: 4,
            stageName: '2X COOLING AUDIT & SIGN-OFF',
            title: workSteps?.[3]?.title || '2x Turbo Cooling Benchmark & Sign-Off',
            hindiCaption: 'Step 4: 16°C par 2x colder airflow verification aur 30-day rework warranty card handover',
            englishDetail: 'Digital anemometer verifies 2x cooling thrust; spotless workspace wiped down and certified.',
            toolName: toolsUsed[3] || 'Certified Quality Checklist & Seal',
            metricLabel: 'Final Chilled Temp',
            metricValue: '16.1°C (2x Colder)',
            image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=85',
            animationType: 'ac',
          },
        ];

      case 'plumbing':
        return [
          {
            stepNum: 1,
            stageName: 'ACOUSTIC LEAK PINPOINTING',
            title: workSteps?.[0]?.title || 'Ultrasonic Leak Detection & Isolation',
            hindiCaption: 'Step 1: Concealed pipe leak, hairline cracks aur tap dripping ka acoustic sonar sensor check',
            englishDetail: 'Ultrasonic ground microphone detects sub-surface moisture and isolates water supply line.',
            toolName: toolsUsed[0] || 'Acoustic Sonar Leak Detector',
            metricLabel: 'Leak Depth',
            metricValue: 'Concealed at 3.5cm',
            image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=85',
            animationType: 'plumbing',
          },
          {
            stepNum: 2,
            stageName: 'HIGH TORQUE UNCLOGGING',
            title: workSteps?.[1]?.title || 'Motorized Snake Drain Cleaning',
            hindiCaption: 'Step 2: 2000 RPM motorized rotary snake machine se drain aur pipe ka 100% stubborn blockage clear',
            englishDetail: 'Spiral steel core clears hair, soap scum, grease deposits without scratching ceramic or PVC walls.',
            toolName: toolsUsed[1] || 'Motorized Drain Auger (2000 RPM)',
            metricLabel: 'Rotary Speed',
            metricValue: '2000 RPM Torque',
            image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
            animationType: 'plumbing',
          },
          {
            stepNum: 3,
            stageName: 'CPVC JOINT HEAT-FUSION',
            title: workSteps?.[2]?.title || 'Pipe Replacement & Zero-Leak Fusion',
            hindiCaption: 'Step 3: Burst pipe replacement aur heavy-duty CPVC socket joint heat welding with Teflon wrap',
            englishDetail: 'Heavy-duty pipe cutters deliver clean 90° cuts; multi-layer Teflon and solvent bond ensure lifetime seal.',
            toolName: toolsUsed[2] || 'CPVC Heat Fusion Kit & Wrench',
            metricLabel: 'Joint Weld',
            metricValue: '100% Watertight Bond',
            image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=85',
            animationType: 'plumbing',
          },
          {
            stepNum: 4,
            stageName: '8-BAR HYDROSTATIC TEST',
            title: workSteps?.[3]?.title || '8-Bar Pressure Test & Zero-Leak Sign-Off',
            hindiCaption: 'Step 4: 8-bar pressure test par zero leakage report aur 30-day free rework warranty handover',
            englishDetail: 'Hydrostatic pressure pump verifies 8-bar load stability with 0.00% seepage across all fittings.',
            toolName: toolsUsed[3] || 'Hydrostatic Pressure Test Gauge',
            metricLabel: 'Test Pressure',
            metricValue: '8.0 Bar (Zero Drop)',
            image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
            animationType: 'plumbing',
          },
        ];

      case 'electric':
        return [
          {
            stepNum: 1,
            stageName: 'THERMAL INFRARED SCAN',
            title: workSteps?.[0]?.title || 'Thermal Imaging & MCB Diagnostic',
            hindiCaption: 'Step 1: Thermal imaging camera se MCB tripping, loose wiring aur burnt hotspots ka digital test',
            englishDetail: 'Fluke thermal sensor identifies overheating circuits (>65°C) and measures phase-to-neutral voltage.',
            toolName: toolsUsed[0] || 'Infrared Thermal Camera & Multimeter',
            metricLabel: 'Voltage & Temp',
            metricValue: '232V AC | 68°C Hotspot',
            image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85',
            animationType: 'electric',
          },
          {
            stepNum: 2,
            stageName: 'FIRE-RETARDANT WIRING',
            title: workSteps?.[1]?.title || 'Burnt Wire & MCB Replacement',
            hindiCaption: 'Step 2: Circuit de-energize karke 4 sq mm fire-retardant copper conduits aur certified MCB fitting',
            englishDetail: 'VDE-insulated 1000V tools replace fatigued connections with heavy copper wire and arc-resistant breakers.',
            toolName: toolsUsed[1] || 'VDE 1000V Insulated Toolkit',
            metricLabel: 'Conduit Grade',
            metricValue: 'FR-LSH 4 sq mm Copper',
            image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=85',
            animationType: 'electric',
          },
          {
            stepNum: 3,
            stageName: 'SMART LOCK & EARTHING SETUP',
            title: workSteps?.[2]?.title || 'Digital Calibration & Earth Loop Test',
            hindiCaption: 'Step 3: Smart lock fingerprint sensor alignment aur zero-surge earthing resistance test (<2 Ohm)',
            englishDetail: 'Digital earth tester verifies protective grounding resistance < 1.8 Ohms for entire household protection.',
            toolName: toolsUsed[2] || 'Digital Earth Tester & Calibrator',
            metricLabel: 'Earth Resistance',
            metricValue: '1.4 Ω (Surge Safe)',
            image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
            animationType: 'electric',
          },
          {
            stepNum: 4,
            stageName: 'ZERO-SPARK AUDIT & WARRANTY',
            title: workSteps?.[3]?.title || 'Full Load Zero-Spark Sign-Off',
            hindiCaption: 'Step 4: Full electrical appliance load par zero-spark audit aur 30-day free rework warranty',
            englishDetail: 'High wattage test verifies zero voltage fluctuation under continuous 16A air conditioner load.',
            toolName: toolsUsed[3] || 'Zero-Spark Safety Certification',
            metricLabel: 'Safety Rating',
            metricValue: '100% Spark Free Pass',
            image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85',
            animationType: 'electric',
          },
        ];

      case 'cleaning':
        return [
          {
            stepNum: 1,
            stageName: 'HEPA DUST EXTRACTION',
            title: workSteps?.[0]?.title || 'High-Power HEPA Dust Extraction',
            hindiCaption: 'Step 1: 2400W HEPA vacuum se sofa, mattress aur room ke deep dust mites aur micro-particles nikalna',
            englishDetail: 'Industrial multi-cyclone vacuum pulls deep allergen buildup from upholstery fabric, carpets and corners.',
            toolName: toolsUsed[0] || '2400W Multi-Cyclone HEPA Extractor',
            metricLabel: 'Suction Force',
            metricValue: '2400W (99.8% Allergen Free)',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
            animationType: 'cleaning',
          },
          {
            stepNum: 2,
            stageName: 'MECHANIZED FLOOR SCRUBBING',
            title: workSteps?.[1]?.title || 'Rotary Disc Mechanized Scrubbing',
            hindiCaption: 'Step 2: Motorized single-disc machine se marble aur tile grout ke stubborn stains aur oil ki deep scrubbing',
            englishDetail: '175 RPM rotary nylon brushes distribute non-corrosive foaming solution into tile grout crevices.',
            toolName: toolsUsed[1] || 'Rotary Floor Scrubber (175 RPM)',
            metricLabel: 'Scrubber Speed',
            metricValue: '175 RPM Deep Scrub',
            image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=85',
            animationType: 'cleaning',
          },
          {
            stepNum: 3,
            stageName: 'CAUSTIC-FREE DESCALING',
            title: workSteps?.[2]?.title || 'Hard Water & Oil Descaling',
            hindiCaption: 'Step 3: Caustic-free eco chemicals se bathroom tiles, chrome taps aur kitchen grease ka instant descaling',
            englishDetail: 'Eco-certified foam descaler dissolves tough calcium limescale deposits on glass and fittings without etching.',
            toolName: toolsUsed[2] || 'Eco-Certified Descaling Gel & Lance',
            metricLabel: 'Limescale Removal',
            metricValue: '100% Sparkling Chrome',
            image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
            animationType: 'cleaning',
          },
          {
            stepNum: 4,
            stageName: 'DIAMOND BUFF & AROMA MIST',
            title: workSteps?.[3]?.title || 'Diamond Buffing & Sanitization Sign-Off',
            hindiCaption: 'Step 4: Microfiber diamond buffing, refreshing natural aroma mist aur final customer audit',
            englishDetail: 'Ultra-dense microfiber pads dry-buff surfaces to a mirror sheen with hospital-grade sanitization spray.',
            toolName: toolsUsed[3] || 'Microfiber Buffer & Herbal Fragrance Mist',
            metricLabel: 'Surface Sheen',
            metricValue: 'Diamond Gloss Mirror Finish',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
            animationType: 'cleaning',
          },
        ];

      case 'painting':
        return [
          {
            stepNum: 1,
            stageName: 'LASER MOISTURE SCAN',
            title: workSteps?.[0]?.title || 'Laser Moisture & Dampness Mapping',
            hindiCaption: 'Step 1: Laser moisture meter se deewar ki seelan aur dampness level ka digital scan',
            englishDetail: 'Digital pinless moisture sensor pinpoints wall dampness percentage and detects internal pipe leaks.',
            toolName: toolsUsed[0] || 'Digital Laser Moisture Meter',
            metricLabel: 'Wall Moisture',
            metricValue: '11% (Optimal for Coating)',
            image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=85',
            animationType: 'painting',
          },
          {
            stepNum: 2,
            stageName: 'DUST-FREE SANDING',
            title: workSteps?.[1]?.title || 'Mechanized Dust-Free Surface Sanding',
            hindiCaption: 'Step 2: Vacuum-attached mechanized sander se 0% airborne dust ke sath smooth acrylic putty leveling',
            englishDetail: 'Orbital power sander directly vacuums fine dust particles while creating a mirror-level flat surface.',
            toolName: toolsUsed[1] || 'Vacuum-Assisted Orbital Sander',
            metricLabel: 'Dust Emission',
            metricValue: '0% Airborne Dust (HEPA Catch)',
            image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=85',
            animationType: 'painting',
          },
          {
            stepNum: 3,
            stageName: 'FLUTED WATERPROOF PANELS',
            title: workSteps?.[2]?.title || 'Waterproof Panel & Primer Installation',
            hindiCaption: 'Step 3: Seelan wali deewaron ke liye 100% waterproof fluted PVC panels ka permanent interlocking setup',
            englishDetail: 'Damp-resistant primer barrier and fluted architectural panels protect interior walls from future seepage.',
            toolName: toolsUsed[2] || 'Waterproof Fluted PVC Cladding & Laser Guide',
            metricLabel: 'Water Resistance',
            metricValue: '100% Waterproof Barrier',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
            animationType: 'painting',
          },
          {
            stepNum: 4,
            stageName: 'LUXURY EMULSION ROLLER COAT',
            title: workSteps?.[3]?.title || 'Dual-Coat Luxury Emulsion & 1-Yr Warranty',
            hindiCaption: 'Step 4: Asian Paints Royale luxury emulsion roller finish aur zero-mess floor cleanup with 1-yr warranty',
            englishDetail: 'Uniform roller application delivers rich, washable paint sheen backed by 1-year seepage warranty certificate.',
            toolName: toolsUsed[3] || 'Asian Paints Royale & Microfiber Roller Kit',
            metricLabel: 'Paint Finish',
            metricValue: 'Rich Silk Sheen (Washable)',
            image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=85',
            animationType: 'painting',
          },
        ];

      case 'pest':
        return [
          {
            stepNum: 1,
            stageName: 'CREVICE RADAR DETECTION',
            title: workSteps?.[0]?.title || 'Infestation Mapping & Entry Point Audit',
            hindiCaption: 'Step 1: Kitchen cabinets aur wooden doors me termite aur cockroach hideouts ka radar borescope check',
            englishDetail: 'High-sensitivity endoscope camera maps deep nests behind kitchen tiles, appliances and door jambs.',
            toolName: toolsUsed[0] || 'High-Resolution Crevice Borescope',
            metricLabel: 'Nesting Activity',
            metricValue: '3 Critical Hotspots Mapped',
            image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=85',
            animationType: 'pest',
          },
          {
            stepNum: 2,
            stageName: 'ODORLESS HERBAL GEL DOTS',
            title: workSteps?.[1]?.title || 'Bayer Maxforce Odorless Herbal Gel',
            hindiCaption: 'Step 2: Bina kitchen khali kiye 100% odorless Bayer Maxforce herbal gel dots lagana (100% Food-Safe)',
            englishDetail: 'Syringe applicator deposits targeted micro-dots inside hinges and drawers that wipe out pest colonies.',
            toolName: toolsUsed[1] || 'Bayer Maxforce Herbal Gel Syringe',
            metricLabel: 'Toxicity & Odor',
            metricValue: '0% Odor | 100% Food Safe',
            image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
            animationType: 'pest',
          },
          {
            stepNum: 3,
            stageName: '5-YEAR DRILL-FILL-SEAL',
            title: workSteps?.[2]?.title || 'Anti-Termite Drill Chemical Barrier',
            hindiCaption: 'Step 3: Skirting aur chaukhat me chemical injection karke 5-saal ka permanent termite barrier banana',
            englishDetail: 'Rotary hammer drill injects govt-approved non-repellent termiticide deep into walls at 12mm intervals.',
            toolName: toolsUsed[2] || 'Rotary Hammer Drill & Pressure Injector',
            metricLabel: 'Barrier Depth',
            metricValue: '12mm Deep Chemical Seal',
            image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=85',
            animationType: 'pest',
          },
          {
            stepNum: 4,
            stageName: 'PET-SAFE MIST & 5-YR WARRANTY',
            title: workSteps?.[3]?.title || 'Safe Mist Spray & 5-Year Written Seal',
            hindiCaption: 'Step 4: Child aur pet-friendly safe mist spray aur 5-saal ki written warranty handover with free rework',
            englishDetail: 'Cold ULV fogger treats air volume with herbal extracts safe for infants, puppies and elderly residents.',
            toolName: toolsUsed[3] || 'ULV Cold Fogger & 5-Yr Warranty Card',
            metricLabel: 'Warranty Period',
            metricValue: '5 Years Written Guarantee',
            image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=85',
            animationType: 'pest',
          },
        ];

      case 'salon':
        return [
          {
            stepNum: 1,
            stageName: 'STERILE HYGIENE UNBOXING',
            title: workSteps?.[0]?.title || '100% Single-Use Sterile Kit Unboxing',
            hindiCaption: 'Step 1: Client ke samne 100% single-use sealed disposable hygienic kit unbox karna',
            englishDetail: 'Disposable sheets, salon gown, sanitized stainless steel tools and sealed cosmetic pouches opened.',
            toolName: toolsUsed[0] || 'Single-Use Sealed Sterile Hygiene Kit',
            metricLabel: 'Sanitization',
            metricValue: '100% Single-Use Monodose',
            image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85',
            animationType: 'salon',
          },
          {
            stepNum: 2,
            stageName: 'BOTANICAL STEAM CLEANSE',
            title: workSteps?.[1]?.title || 'Cheryls / O3+ Deep Herbal Exfoliation',
            hindiCaption: 'Step 2: Cheryls / O3+ herbal scrub aur gentle steam se pores ki deep dirt extraction aur dead skin scrub',
            englishDetail: 'Warm ozone mist softens pores while micro-bead herbal formulation dissolves blackheads without irritation.',
            toolName: toolsUsed[1] || 'Ozone Face Steamer & Cheryls O3+ Scrub',
            metricLabel: 'Pore Cleansing',
            metricValue: 'Deep Botanical Exfoliation',
            image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85',
            animationType: 'salon',
          },
          {
            stepNum: 3,
            stageName: 'AYURVEDIC ACUPRESSURE',
            title: workSteps?.[2]?.title || 'Forest Essentials Essential Oil Massage',
            hindiCaption: 'Step 3: Forest Essentials aroma oils se relaxing acupressure massage aur expert hair styling',
            englishDetail: 'Certified aesthetician applies Swedish acupressure strokes to neck, shoulders and face to relieve stress.',
            toolName: toolsUsed[2] || 'Forest Essentials Pure Botanical Oils',
            metricLabel: 'Relaxation Index',
            metricValue: 'Aromatherapy Acupressure',
            image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=85',
            animationType: 'salon',
          },
          {
            stepNum: 4,
            stageName: 'RADIANT GLOW & CLEANUP',
            title: workSteps?.[3]?.title || 'Instant Radiance Audit & Mess-Free Packup',
            hindiCaption: 'Step 4: Instant radiant glow inspection aur floor ka 100% sanitized cleanup (Zero Mess Guarantee)',
            englishDetail: 'Client mirrors verify glowing skin texture; therapist bags all disposables leaving workspace spotless.',
            toolName: toolsUsed[3] || 'UV Mirror & Eco-Safe Waste Disposal Bag',
            metricLabel: 'Glow Result',
            metricValue: 'Instant Radiant Luster',
            image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85',
            animationType: 'salon',
          },
        ];

      case 'carpentry':
        return [
          {
            stepNum: 1,
            stageName: 'BOSCH LASER ALIGNMENT',
            title: workSteps?.[0]?.title || 'Bosch Laser Level Alignment Diagnostic',
            hindiCaption: 'Step 1: Bosch laser leveler se sagging door, bed aur drawer alignment ka 0.1mm digital check',
            englishDetail: 'Green crosshair laser guides identify exact hinge drop and drawer channel misalignment.',
            toolName: toolsUsed[0] || 'Bosch Crosshair Laser Leveler',
            metricLabel: 'Alignment Accuracy',
            metricValue: '0.1mm Precision Crosshair',
            image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85',
            animationType: 'carpentry',
          },
          {
            stepNum: 2,
            stageName: 'PRECISION ROUTER GROOVING',
            title: workSteps?.[1]?.title || 'Mortise Lock & Router Wood Routing',
            hindiCaption: 'Step 2: Router tool se mortise lock aur smart digital lock ke liye accurate flush groove banana',
            englishDetail: 'High-speed router bit creates crisp 45mm mortise cavity without chipping delicate hardwood veneer.',
            toolName: toolsUsed[1] || 'High-Speed Wood Router & Chisel Kit',
            metricLabel: 'Router Depth',
            metricValue: '45mm Precision Mortise Cut',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
            animationType: 'carpentry',
          },
          {
            stepNum: 3,
            stageName: 'HYDRAULIC SOFT-CLOSE FIT',
            title: workSteps?.[2]?.title || 'Soft-Close Hinges & Telescopic Rails',
            hindiCaption: 'Step 3: Hydraulic soft-close hinges aur 45kg load-bearing telescopic rails fitting with torque screws',
            englishDetail: 'Triple-hole mounting brackets secured with hardened steel screws; soft-close damper tested 5 times.',
            toolName: toolsUsed[2] || 'Cordless Impact Driver & Soft-Close Damper',
            metricLabel: 'Load Capacity',
            metricValue: '45kg Heavy Duty Ball Bearings',
            image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85',
            animationType: 'carpentry',
          },
          {
            stepNum: 4,
            stageName: 'BEESWAX BUFF & GLIDE TEST',
            title: workSteps?.[3]?.title || 'Beeswax Polish & Silent Glide Sign-Off',
            hindiCaption: 'Step 4: Carnauba beeswax polish se wood shine aur zero-creak smooth drawer glide test with warranty',
            englishDetail: 'Natural wax seals wood grain against moisture expansion; whisper-quiet door swing verified.',
            toolName: toolsUsed[3] || 'Carnauba Beeswax & Wool Buffing Pad',
            metricLabel: 'Acoustic Sound',
            metricValue: '0 dB (Whisper Quiet Glide)',
            image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85',
            animationType: 'carpentry',
          },
        ];

      default:
        return [
          {
            stepNum: 1,
            stageName: 'EXPERT INSPECTION',
            title: workSteps?.[0]?.title || 'Pre-Service Diagnostic & Setup',
            hindiCaption: 'Step 1: Certified technician dwara service area ka complete inspection aur testing',
            englishDetail: 'Full multi-point checklist audit to evaluate exact scope and prepare protective floor sheets.',
            toolName: toolsUsed[0] || 'Multi-Point Inspection Scanner',
            metricLabel: 'Inspection Status',
            metricValue: 'Safety Protocol Verified',
            image: posterImage || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=85',
            animationType: 'default',
          },
          {
            stepNum: 2,
            stageName: 'CORE PROCEDURE',
            title: workSteps?.[1]?.title || 'Mechanized High-Grade Execution',
            hindiCaption: 'Step 2: High-grade professional tools se mechanized standard procedure execution',
            englishDetail: 'Certified specialist carries out core restoration with zero mess and premium grade supplies.',
            toolName: toolsUsed[1] || 'Commercial Grade Master Machine',
            metricLabel: 'Execution Speed',
            metricValue: 'High Precision Standard',
            image: posterImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85',
            animationType: 'default',
          },
          {
            stepNum: 3,
            stageName: 'DEEP TREATMENT',
            title: workSteps?.[2]?.title || 'Component Refill & Deep Treatment',
            hindiCaption: 'Step 3: Component renewal, hygiene polish aur surface treatment',
            englishDetail: 'All parts calibrated and treated with non-hazardous, long-lasting protective solutions.',
            toolName: toolsUsed[2] || 'Precision Treatment Toolkit',
            metricLabel: 'Treatment Grade',
            metricValue: 'Hospital Grade Safe',
            image: posterImage || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
            animationType: 'default',
          },
          {
            stepNum: 4,
            stageName: 'QUALITY AUDIT',
            title: workSteps?.[3]?.title || 'Quality Verification & 30-Day Warranty',
            hindiCaption: 'Step 4: Customer satisfaction check, clean-up aur 30-day rework warranty handover',
            englishDetail: 'Comprehensive audit against company standards with written 30-day happiness warranty.',
            toolName: toolsUsed[3] || 'Official Quality Certification',
            metricLabel: 'Warranty Protection',
            metricValue: '30-Day Free Rework Included',
            image: posterImage || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=85',
            animationType: 'default',
          },
        ];
    }
  }, [animationType, workSteps, toolsUsed, posterImage]);

  const scenes = getDomainScenes();

  // Current active step index (0 to 3) calculated from currentTime
  const currentStepIdx = Math.min(3, Math.floor(currentTime / STEP_DURATION));
  const activeScene = scenes[currentStepIdx] || scenes[0];

  // Procedural audio synthesizer for subtle, realistic work sound effects when unmuted
  const playProceduralSound = useCallback((phase: number) => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      const ctx = audioCtxRef.current;
      if (!ctx || ctx.state === 'suspended') {
        ctx?.resume().catch(() => {});
        return;
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (phase === 0) {
        // Diagnostic radar beep
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (phase === 1) {
        // High-pressure jet / tool sound simulation
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(330, now + 0.25);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (phase === 2) {
        // Mechanical click & calibration
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else {
        // Harmonious completion chime (Celebration)
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(783.99, now + 0.15); // G5
        osc2.frequency.setValueAtTime(1046.50, now + 0.25); // C6
        gain2.gain.setValueAtTime(0.04, now + 0.15);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.start(now);
        osc.stop(now + 0.4);
        osc2.start(now + 0.15);
        osc2.stop(now + 0.5);
      }
    } catch {
      // Audio autoplay policy or failure - ignore gracefully
    }
  }, [isMuted]);

  // Main 30-Second Video Clock Loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let lastStep = Math.min(3, Math.floor(currentTime / STEP_DURATION));

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.1 * playbackSpeed;
          if (next >= TOTAL_DURATION) {
            // Loop back to start smoothly
            playProceduralSound(0);
            return 0;
          }

          // Trigger sound when step changes
          const currentStep = Math.min(3, Math.floor(next / STEP_DURATION));
          if (currentStep !== lastStep) {
            lastStep = currentStep;
            playProceduralSound(currentStep);
          }

          return next;
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed, playProceduralSound]);

  // Handle Scrubbing on the 30s Timeline
  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * TOTAL_DURATION;
    setCurrentTime(newTime);
    const step = Math.min(3, Math.floor(newTime / STEP_DURATION));
    playProceduralSound(step);
  };

  // Jump to specific step
  const handleJumpToStep = (index: number) => {
    const targetTime = index * STEP_DURATION + 0.1;
    setCurrentTime(targetTime);
    setActiveStepTab(index);
    playProceduralSound(index);
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (!isPlaying) {
      playProceduralSound(currentStepIdx);
    }
    setIsPlaying(!isPlaying);
  };

  // Toggle Mute / Sound
  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (!newMuted) {
      playProceduralSound(currentStepIdx);
    }
  };

  // Restart 30s Video
  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    playProceduralSound(0);
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Format MM:SS for 30s clock
  const curSeconds = Math.floor(currentTime);
  const curFraction = Math.floor((currentTime % 1) * 10);
  const formattedCurTime = `00:${curSeconds < 10 ? '0' : ''}${curSeconds}`;
  const progressPercent = (currentTime / TOTAL_DURATION) * 100;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 1. Main 30-Second Explainer Video Screen */}
      <div
        ref={containerRef}
        className="relative aspect-16/10 sm:aspect-16/9 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl select-none group"
      >
        {/* Background Action Photo with Ken-Burns Cinematic Zoom Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            key={activeScene.image}
            src={activeScene.image}
            alt={activeScene.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.06] scale-105 animate-[pulse_8s_ease-in-out_infinite] transition-all duration-1000"
            onError={(e) => handleImageError(e, 'service')}
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
        </div>

        {/* Dynamic Category-Specific Kinetic Animated Work Layer */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {animationType === 'ac' && (
            <>
              {/* Cold Airflow Waves */}
              <div className="absolute top-1/4 left-1/4 right-1/4 h-24 opacity-40 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent blur-xl animate-pulse" />
              {/* Blue Laser Scanning Beam */}
              <div
                className="absolute left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_12px_#38bdf8] opacity-75"
                style={{
                  top: `${25 + Math.sin(currentTime * 3) * 20}%`,
                }}
              />
              {/* Foam Spray Droplets Effect */}
              {currentStepIdx === 1 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-56 h-56 rounded-full border border-cyan-300/40 animate-ping opacity-30" />
                  <div className="w-36 h-36 rounded-full bg-cyan-400/10 backdrop-blur-xs animate-pulse" />
                </div>
              )}
            </>
          )}

          {animationType === 'plumbing' && (
            <>
              {/* Acoustic Sonar Detection Pulse */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-2 border-emerald-400/40 animate-ping opacity-40" />
                <div className="w-24 h-24 rounded-full border border-cyan-400/60 animate-pulse" />
              </div>
              {/* Flowing Water Ripple */}
              <div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60"
                style={{ top: `${40 + Math.sin(currentTime * 2.5) * 15}%` }}
              />
            </>
          )}

          {animationType === 'electric' && (
            <>
              {/* Thermal Infrared Scan Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731615_1px,transparent_1px),linear-gradient(to_bottom,#f9731615_1px,transparent_1px)] bg-[size:28px_28px] opacity-40" />
              {/* Voltage Spark Safe Shield Pulse */}
              <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full border border-amber-400/40 animate-ping opacity-30" />
            </>
          )}

          {animationType === 'cleaning' && (
            <>
              {/* Rotary Floor Scrubber Motion */}
              <div className="absolute bottom-16 right-1/4 w-40 h-40 rounded-full border-2 border-purple-400/30 border-dashed animate-spin opacity-40" />
              {/* Sparkling Diamond Wipe */}
              <div className="absolute top-1/3 left-1/3 w-32 h-32 rounded-full bg-indigo-400/10 blur-xl animate-pulse" />
            </>
          )}

          {animationType === 'painting' && (
            <>
              {/* Laser Plumb Level Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-0.5 bg-emerald-400/50 shadow-[0_0_8px_#34d399]" />
                <div className="h-full w-0.5 bg-emerald-400/50 shadow-[0_0_8px_#34d399]" />
              </div>
            </>
          )}

          {animationType === 'pest' && (
            <>
              {/* Radar Crevice Scanner */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border border-amber-400/30 animate-pulse" />
                <div className="w-40 h-40 rounded-full border border-red-400/40 animate-ping opacity-25" />
              </div>
            </>
          )}

          {animationType === 'salon' && (
            <>
              {/* Herbal Radiance Glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 rounded-full bg-amber-400/15 blur-2xl animate-pulse" />
                <div className="w-32 h-32 rounded-full border border-amber-300/30 animate-ping opacity-30" />
              </div>
            </>
          )}

          {animationType === 'carpentry' && (
            <>
              {/* Crosshair Laser Plumb */}
              <div
                className="absolute left-0 right-0 h-0.5 bg-emerald-400 opacity-70 shadow-[0_0_10px_#10b981]"
                style={{ top: `${35 + Math.sin(currentTime * 2) * 15}%` }}
              />
            </>
          )}
        </div>

        {/* Top-Left: Brand Watermark & "30-Sec Verified Demo" Badge */}
        <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 pointer-events-none">
          <div className="bg-black/90 backdrop-blur-md text-white font-black text-xs px-2.5 py-1 rounded-lg border border-white/20 shadow-lg tracking-wider">
            UL
          </div>
          <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-400/30 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>30s Field Work Reel</span>
          </div>
        </div>

        {/* Top-Right: Active Step Pill & Live Diagnostic Metric Tag */}
        <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-2">
          {/* Diagnostic Sensor Gauge Metric */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-[11px] font-bold px-3 py-1 rounded-full shadow-lg">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <span>{activeScene.metricValue}</span>
          </div>

          {/* Current Step Counter Badge */}
          <div className="flex items-center gap-1.5 bg-indigo-600/95 backdrop-blur-md border border-indigo-400/40 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>STEP {currentStepIdx + 1}/4</span>
          </div>
        </div>

        {/* Center Screen: Interactive Play / Pause Overlay Trigger */}
        <div
          onClick={togglePlay}
          className={`absolute inset-0 z-20 flex items-center justify-center bg-black/25 transition-opacity cursor-pointer ${
            isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-white/95 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform border border-white/40">
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-slate-950" />
            ) : (
              <Play className="w-7 h-7 fill-slate-950 ml-1" />
            )}
          </div>
        </div>

        {/* Floating Subtitle Lower-Third Banner (Explains EXACTLY what is being done in Hindi & English) */}
        <div className="absolute inset-x-3 bottom-14 sm:bottom-16 z-25 pointer-events-none">
          <div className="bg-slate-950/85 backdrop-blur-md border border-white/15 rounded-xl p-2.5 sm:p-3 shadow-xl max-w-2xl mx-auto text-center space-y-1">
            {/* Step Stage & Tool Used */}
            <div className="flex items-center justify-center gap-2 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
              <span className="bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/30">
                {activeScene.stageName}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-cyan-300 flex items-center gap-1">
                <Wrench className="w-3 h-3" />
                {activeScene.toolName}
              </span>
            </div>

            {/* Hindi Real-Action Narration (Answers user's "kaise kya kon sa service hoti h") */}
            <p className="text-xs sm:text-sm font-bold text-white leading-snug drop-shadow-md">
              {activeScene.hindiCaption}
            </p>

            {/* English Detail */}
            <p className="text-[10px] sm:text-xs text-slate-300 line-clamp-1">
              {activeScene.englishDetail}
            </p>
          </div>
        </div>

        {/* Bottom Video Controls & Chaptered 30s Scrubber */}
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black via-black/80 to-transparent px-3 py-2 sm:px-4 sm:py-2.5 flex flex-col gap-2">
          {/* Chaptered 4-Segment Progress Bar */}
          <div
            onClick={handleScrub}
            className="w-full h-2.5 bg-white/20 hover:bg-white/30 rounded-full overflow-hidden cursor-pointer relative transition-all"
            title="Click or drag to scrub 30s video"
          >
            {/* Filled Progress Gradient */}
            <div
              className="bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 h-full rounded-full transition-all duration-100 relative"
              style={{ width: `${progressPercent}%` }}
            >
              {/* Glow Leading Head */}
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_8px_#ffffff]" />
            </div>

            {/* 4 Segment Dividers (7.5s, 15s, 22.5s) */}
            <div className="absolute inset-0 flex justify-between pointer-events-none px-0.5">
              <div className="w-0.5 h-full bg-slate-950/60" style={{ left: '25%' }} />
              <div className="w-0.5 h-full bg-slate-950/60" style={{ left: '50%' }} />
              <div className="w-0.5 h-full bg-slate-950/60" style={{ left: '75%' }} />
            </div>
          </div>

          {/* Action Row: Play/Pause, 30s Timer, Restart, Audio, Speed, Fullscreen */}
          <div className="flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-3">
              {/* Play / Pause Toggle */}
              <button
                type="button"
                onClick={togglePlay}
                className="hover:text-amber-300 transition-colors cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              {/* Restart from 0s */}
              <button
                type="button"
                onClick={handleRestart}
                className="hover:text-amber-300 transition-colors cursor-pointer"
                title="Restart 30s Video"
                aria-label="Restart"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Precise Time Counter (00:00 to 00:30) */}
              <div className="font-mono text-[11px] text-slate-300 flex items-center gap-1">
                <span className="text-amber-300 font-bold">{formattedCurTime}</span>
                <span>/</span>
                <span>00:30</span>
                <span className="hidden sm:inline text-slate-400 text-[10px] ml-1">
                  (30s Explainer)
                </span>
              </div>
            </div>

            {/* Right Controls: Audio Toggle, Speed, Fullscreen */}
            <div className="flex items-center gap-2.5">
              {/* Audio Toggle (Uses Web Audio procedural sound cues) */}
              <button
                type="button"
                onClick={toggleMute}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  !isMuted
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-white/10 hover:bg-white/20 text-slate-300'
                }`}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Muted</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Audio ON</span>
                  </>
                )}
              </button>

              {/* Playback Speed (1x / 1.5x) */}
              <button
                type="button"
                onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.5 : 1))}
                className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] font-bold text-slate-300 transition-colors cursor-pointer"
                title="Toggle playback speed"
              >
                {playbackSpeed}x
              </button>

              {/* Fullscreen Button */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="hover:text-amber-300 transition-colors cursor-pointer"
                title="Toggle Fullscreen"
                aria-label="Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive 4-Step Chapter Selector Pills (Click to jump immediately in the 30s video) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {scenes.map((scene, idx) => {
          const isActive = currentStepIdx === idx;
          return (
            <button
              key={scene.stepNum}
              type="button"
              onClick={() => handleJumpToStep(idx)}
              className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400/40 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                    isActive
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  STEP {scene.stepNum}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {idx * 7.5}s - {(idx + 1) * 7.5}s
                </span>
              </div>

              <p
                className={`text-xs font-bold line-clamp-1 leading-snug ${
                  isActive ? 'text-amber-950' : 'text-slate-800'
                }`}
              >
                {scene.title}
              </p>

              <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-500 line-clamp-1">
                <Wrench className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                <span>{scene.toolName}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Detailed Work Breakdown & Tools Used Accordion */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Standard Operating Procedure (SOP)
            </h4>
          </div>
          <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
            30-Day Free Rework Included
          </span>
        </div>

        {/* Tools Badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-slate-600">Equipment Used:</span>
          {toolsUsed.map((tool, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[11px] font-medium shadow-2xs"
            >
              <Wrench className="w-3 h-3 text-slate-400" />
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
