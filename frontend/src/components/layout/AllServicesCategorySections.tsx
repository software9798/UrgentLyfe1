import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Star, Zap, Plus, Check } from 'lucide-react';
import { ServiceItem } from '../../types';
import { handleImageError } from '../../utils/imageFallback';

export interface CategoryCarouselItem {
  id: string;
  title: string;
  categoryId: string;
  subServiceKey?: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string; // e.g. "20% OFF", "17% OFF"
  rating: number;
  reviewCount?: number;
  durationMinutes: number;
  isInstant?: boolean;
  imageUrl: string;
  description: string;
  includes: string[];
  toolsUsed?: string[];
}

export interface CategoryCarouselSectionData {
  id: string;
  title: string;
  subtitle?: string;
  categoryId: string;
  seeAllAction?: boolean;
  items: CategoryCarouselItem[];
}

interface AllServicesCategorySectionsProps {
  selectedLocality: string;
  cityName: string;
  searchQuery: string;
  onClearSearch: () => void;
  onSelectCategory: (categoryId: string) => void;
  onOpenServiceDetail: (service: ServiceItem) => void;
  onAddToCart?: (service: ServiceItem) => void;
  onOpenSalonMenPreference?: () => void;
}

// 12 Full curated sections matching Screenshots 1 to 5 + every major service category in the app
export const ALL_CATEGORY_SECTIONS: CategoryCarouselSectionData[] = [
  // 1. Screenshot 1: Spa for Women
  {
    id: 'spa-for-women',
    title: 'Spa for Women',
    subtitle: 'Holistic relaxation & Ayurvedic wellness at home',
    categoryId: 'salon',
    seeAllAction: true,
    items: [
      {
        id: 'women-leg-relief-massage',
        title: 'Leg relief massage',
        categoryId: 'salon',
        price: 929,
        rating: 4.83,
        reviewCount: 3420,
        durationMinutes: 30,
        imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
        description: 'Therapeutic lower leg, calf, and foot pressure-point massage using Ayurvedic warm herbal oil to relieve soreness, swelling, and muscle fatigue.',
        includes: [
          'Warm herbal pain-relief oil application',
          'Deep tissue calf & ankle reflexology strokes',
          'Hot towel wrap & muscle relaxation',
          'Single-use disposable hygienic sheets',
        ],
        toolsUsed: ['Kottakkal Herbal Oil', 'Hot Towel Steamer', 'Acupressure Foot Roller'],
      },
      {
        id: 'women-quick-comfort-therapy',
        title: 'Quick comfort therapy',
        categoryId: 'salon',
        price: 999,
        originalPrice: 1249,
        discountBadge: '20% OFF',
        rating: 4.80,
        reviewCount: 4510,
        durationMinutes: 45,
        imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
        description: 'Targeted neck, shoulder, and upper back tension-relief massage designed to melt away work-from-home stiffness and posture aches.',
        includes: [
          'De-stressing neck & cervical spine alignment',
          'Scapula & shoulder knot release massage',
          'Aromatherapy lavender essential oils',
          'Post-massage soothing herbal wipe',
        ],
        toolsUsed: ['Organic Lavender Essential Oil', 'Heated Herbal Pack', 'Silicone Cupping Device'],
      },
      {
        id: 'women-top-to-toe-stress-relief',
        title: 'Top-to-toe stress relief massage',
        categoryId: 'salon',
        price: 1929,
        rating: 4.81,
        reviewCount: 5120,
        durationMinutes: 75,
        imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80',
        description: 'Full body restorative Swedish & deep-tissue massage focusing on 12 vital energy centers to revitalize your mind and loosen all tightened muscles.',
        includes: [
          'Full body Swedish relaxing rhythmic strokes',
          'Warm olive & almond oil body nourishment',
          'Head & scalp rejuvenation pressure therapy',
          'Disposable bed cover, spa gown & slippers',
        ],
        toolsUsed: ['Virgin Cold-Pressed Almond Oil', 'Rosemary Calming Mist', 'Steam Face Towel'],
      },
      {
        id: 'women-full-body-massage-scrub',
        title: 'Full body massage & scrub',
        categoryId: 'salon',
        price: 1699,
        rating: 4.82,
        reviewCount: 3890,
        durationMinutes: 60,
        imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
        description: 'Deep exfoliating botanical walnut & brown sugar body polish followed by an invigorating aromatherapeutic body massage for luminous, silky-soft skin.',
        includes: [
          'Exfoliating botanical body scrub & dead cell removal',
          'Moisturizing full body almond oil massage',
          'Gentle skin polish buffing with warm towels',
          'Full cleanup with zero mess in your home',
        ],
        toolsUsed: ['Walnut Shell Exfoliant', 'Hydrating Shea Butter', 'Disposable Protective Sheet'],
      },
      {
        id: 'women-back-relief-massage',
        title: 'Back relief massage',
        categoryId: 'salon',
        price: 929,
        rating: 4.84,
        reviewCount: 4120,
        durationMinutes: 30,
        imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
        description: 'Intense trigger-point pressure therapy focusing strictly on lower back spine stiffness, lumbar tightness, and thoracic muscular spasms.',
        includes: [
          'Lumbar & spine warm oil lubrication',
          'Trigger point knuckle & thumb friction therapy',
          'Hot compress application for chronic spasm relief',
          'Disposable underpads & linen protection',
        ],
        toolsUsed: ['Mahanarayan Herbal Liniment', 'Hot Ceramic Stone', 'Moist Heat Compress'],
      },
      {
        id: 'women-candle-oil-therapy',
        title: 'Warm candle oil relaxing therapy',
        categoryId: 'salon',
        price: 1499,
        originalPrice: 1799,
        discountBadge: '15% OFF',
        rating: 4.88,
        reviewCount: 2310,
        durationMinutes: 60,
        imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
        description: 'Luxurious melted soy and coconut massage candle butter drizzled warmly over the skin for deep hydration, muscular bliss, and subtle scent.',
        includes: [
          'Organic soy & shea butter candle melting',
          'Warm drizzle full-body smooth strokes',
          'Deep skin hydration & tension softening',
          'Aromatherapy calming floral notes',
        ],
        toolsUsed: ['Soy Candle Pourer', 'Hot Towel Wrap', 'Silk Body Veil'],
      },
      {
        id: 'women-head-neck-acupressure',
        title: 'Head, shoulder & neck acupressure',
        categoryId: 'salon',
        price: 649,
        rating: 4.84,
        reviewCount: 3120,
        durationMinutes: 30,
        imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80',
        description: 'Targeted acupressure for mental clarity, migraine ease, and computer-screen cervical stiffness using cooling herbal Brahmi oils.',
        includes: [
          'Brahmi oil scalp stimulation',
          'Occipital nerve tension release',
          'Trapezius muscle decompression',
          'Warm towel herbal compress',
        ],
        toolsUsed: ['Cooling Herbal Elixir', 'Jade Acupressure Comb', 'Steamed Linen'],
      },
      {
        id: 'women-ayurvedic-potli-therapy',
        title: 'Ayurvedic Potli joint pain therapy',
        categoryId: 'salon',
        price: 1349,
        originalPrice: 1599,
        discountBadge: '15% OFF',
        rating: 4.86,
        reviewCount: 1980,
        durationMinutes: 60,
        imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
        description: 'Heated medicated herbal pouches (Potli) stamped along meridians to alleviate joint stiffness, spondylitis, and knee inflammation.',
        includes: [
          'Steam-heated herbal leaf pouch application',
          'Medicated analgesic oil massage',
          'Localized joint fomentation',
          'Post-treatment soothing balm',
        ],
        toolsUsed: ['Kizhi Potli Pouches', 'Electric Herbal Warmer', 'Ayurvedic Tailam'],
      },
    ],
  },

  // 2. Screenshot 2: Appliance repair & service
  {
    id: 'appliance-repair-and-service',
    title: 'Appliance repair & service',
    subtitle: 'Certified technicians with 90-day spare parts warranty',
    categoryId: 'ac-appliance',
    seeAllAction: true,
    items: [
      {
        id: 'appliance-ac-repair',
        title: 'AC repair',
        categoryId: 'ac-appliance',
        price: 299,
        originalPrice: 399,
        rating: 4.73,
        reviewCount: 8210,
        durationMinutes: 45,
        isInstant: true,
        imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
        description: 'Complete fault diagnostics for AC not cooling, fan motor noise, water dripping, PCB error code, or frequent MCB tripping with upfront parts pricing.',
        includes: [
          '10-point electrical & refrigeration check',
          'Refrigerant gas pressure & leak detection',
          'Blower coil & sensor testing',
          'Transparent spare parts estimate with 90-day warranty',
        ],
        toolsUsed: ['Digital Manifold Gauge', 'Fluke Multimeter', 'Halogen Leak Sniffer'],
      },
      {
        id: 'appliance-foam-jet-ac-service',
        title: 'Foam-jet AC service',
        categoryId: 'ac-appliance',
        price: 699,
        originalPrice: 899,
        rating: 4.75,
        reviewCount: 11200,
        durationMinutes: 45,
        isInstant: true,
        imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        description: '2x cooling power foam jet cleaning with zero-spill indoor jacket, outdoor condenser unit pressure wash, and airflow velocity check.',
        includes: [
          'Indoor cooling coil & blower foam jet wash',
          'Zero-mess waterproof wall jacket mounted',
          'Outdoor condenser unit pressurized jet wash',
          'Free 10-point health audit & 30-day warranty',
        ],
        toolsUsed: ['120 PSI Pressure Jet Pump', 'Anti-Corrosive Chemical Foam', 'Zero-Spill Catchment Jacket'],
      },
      {
        id: 'appliance-water-purifier-service',
        title: 'Water Purifier Service & Installation',
        categoryId: 'appliance',
        price: 299,
        originalPrice: 399,
        rating: 4.80,
        reviewCount: 6450,
        durationMinutes: 40,
        imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
        description: 'Complete inspection of RO, UV & UF water purifiers. TDS measurement, pre-filter bowl descaling, sediment candle flush, and pump check.',
        includes: [
          'Digital TDS test before & after servicing',
          'Pre-filter chamber washing & sediment purge',
          'Booster pump pressure & adapter health test',
          'Silicon tube leak sealing & sanitization',
        ],
        toolsUsed: ['Digital TDS Meter', 'Filter Housing Spanner', 'Pressure Gauge'],
      },
      {
        id: 'appliance-foam-jet-service-2-acs',
        title: 'Foam-jet service (2 ACs)',
        categoryId: 'ac-appliance',
        price: 1298,
        originalPrice: 1398,
        rating: 4.75,
        reviewCount: 7890,
        durationMinutes: 80,
        isInstant: true,
        imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        description: 'Complete high-pressure foam jet service for 2 split ACs. Intensive coil wash, outdoor condenser unit cleaning, and gas check for both units.',
        includes: [
          'Deep foam jet wash for 2 indoor AC coils',
          'Zero-spill waterproof jackets for both ACs',
          'Both outdoor condenser units power washed',
          'Free cooling temperature measurement report',
        ],
        toolsUsed: ['High Pressure Jet Machine', 'Dual AC Wash Jackets', 'Airflow Gauge'],
      },
      {
        id: 'appliance-tv-check-up',
        title: 'TV check-up',
        categoryId: 'appliance',
        price: 249,
        originalPrice: 349,
        rating: 4.77,
        reviewCount: 3820,
        durationMinutes: 30,
        imageUrl: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80',
        description: 'Diagnosis of display panel lines, sound issues, motherboard faults, HDMI port failure, or power supply short circuit for LED/OLED TVs.',
        includes: [
          'Backlight & LED strip health diagnostics',
          'Power supply board (SMPS) voltage testing',
          'Motherboard & processor signals check',
          'Upfront quote with 90-day warranty on genuine parts',
        ],
        toolsUsed: ['Digital Multimeter', 'Backlight Tester', 'Precision Anti-Static Tool Set'],
      },
      {
        id: 'appliance-washing-machine-repair',
        title: 'Washing machine check-up & repair',
        categoryId: 'appliance',
        price: 299,
        originalPrice: 399,
        rating: 4.82,
        reviewCount: 5620,
        durationMinutes: 45,
        isInstant: true,
        imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
        description: 'Front load & top load motor vibration, drum bearing noise, drain pump blockage, or PCB error code troubleshooting with certified parts.',
        includes: [
          'Drum suspension & shock absorber check',
          'Drain motor & inlet solenoid valve test',
          'Drive belt & motor capacitor diagnosis',
          '30-day warranty on workmanship',
        ],
        toolsUsed: ['Digital Vibration Meter', 'Solenoid Tester', 'Drum Pulley Wrench'],
      },
      {
        id: 'appliance-refrigerator-repair',
        title: 'Refrigerator gas & cooling repair',
        categoryId: 'appliance',
        price: 349,
        originalPrice: 449,
        rating: 4.79,
        reviewCount: 4780,
        durationMinutes: 45,
        isInstant: true,
        imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
        description: 'Single and double door frost-free fridge repair. Compressor start relay check, thermostat calibration, capillary unfreezing, and R600a gas charging.',
        includes: [
          'Compressor winding & PTC relay testing',
          'Evaporator coil defrost heater diagnosis',
          'Capillary tube leak sniff & gas recharge test',
          'Door magnetic gasket seal inspection',
        ],
        toolsUsed: ['Piercing Valve', 'Digital Thermocouple', 'Leak Detector Sniffer'],
      },
      {
        id: 'appliance-geyser-repair',
        title: 'Geyser heating element repair & descaling',
        categoryId: 'appliance',
        price: 299,
        originalPrice: 399,
        rating: 4.81,
        reviewCount: 4120,
        durationMinutes: 40,
        isInstant: true,
        imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
        description: 'Instant & storage geyser heating failure, electric shock earth-leakage check, thermostat cut-off testing, and tank calcium descaling.',
        includes: [
          'Heavy-duty copper heating element test',
          'Thermostat & thermal cutout reset',
          'Internal tank hard water scale flush',
          'Multi-point earth grounding safety check',
        ],
        toolsUsed: ['Element Spanner Wrench', 'Megger Insulation Tester', 'Descaling Acid Kit'],
      },
      {
        id: 'appliance-microwave-repair',
        title: 'Microwave oven repair & heating check',
        categoryId: 'appliance',
        price: 249,
        originalPrice: 349,
        rating: 4.75,
        reviewCount: 2980,
        durationMinutes: 35,
        imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
        description: 'Fixing not heating, sparking inside cavity, turntable glass plate stuck, or touchpad button failure for solo, grill, and convection microwaves.',
        includes: [
          'High-voltage diode & magnetron testing',
          'Waveguide mica sheet spark cleaning',
          'Turntable motor & roller ring check',
          'Door interlock microswitch safety test',
        ],
        toolsUsed: ['High-Voltage Probe', 'RF Radiation Monitor', 'Precision Screwdriver Set'],
      },
      {
        id: 'appliance-chimney-deep-service',
        title: 'Kitchen chimney deep service & degreasing',
        categoryId: 'appliance',
        price: 599,
        originalPrice: 799,
        discountBadge: '25% OFF',
        rating: 4.78,
        reviewCount: 3890,
        durationMinutes: 60,
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
        description: 'Complete dismantling of baffle filters, motor blower chemical degreasing, carbon filter check, and exhaust duct airflow restoration.',
        includes: [
          'Baffle filter chemical steam degreasing',
          'Blower fan motor cleaning & oiling',
          'Oil collector cup chemical descaling',
          'Duct suction power test & wall seal',
        ],
        toolsUsed: ['Steam Degreaser Gun', 'Industrial Oil Solvent', 'Air Velocity Anemometer'],
      },
    ],
  },

  // 3. Screenshot 3: Quick home repairs & consultations
  {
    id: 'quick-home-repairs',
    title: 'Quick home repairs',
    subtitle: 'Standardized upfront rates with instant doorstep arrival',
    categoryId: 'electrical',
    seeAllAction: true,
    items: [
      {
        id: 'home-book-a-carpenter',
        title: 'Book a carpenter',
        categoryId: 'carpentry-painting',
        price: 99,
        originalPrice: 149,
        rating: 4.66,
        reviewCount: 5410,
        durationMinutes: 30,
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        description: 'On-demand visit by a background-verified skilled carpenter with full power toolkit for furniture repairs, door lock fitting, or hinge adjustments.',
        includes: [
          'On-site inspection of woodwork & hardware',
          'Upfront standardized transparent quote',
          'Standard 30-min minor fix included',
          'Post-work wood dust cleanup',
        ],
        toolsUsed: ['Bosch Cordless Drill', 'Chisel Set', 'Precision Leveler'],
      },
      {
        id: 'home-electrician-consultation',
        title: 'Electrician consultation',
        categoryId: 'electrical',
        price: 49,
        originalPrice: 99,
        rating: 4.75,
        reviewCount: 9240,
        durationMinutes: 30,
        imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
        description: 'Doorstep visit by licensed electrician with voltage detector, multimeter & thermal scanner for electrical faults, tripping MCBs, or new wiring.',
        includes: [
          'Switchboard & wiring earthing check',
          'Thermal scan for overheating joints',
          'Transparent upfront pricing before doing work',
          'Zero-shock safety protocol',
        ],
        toolsUsed: ['Fluke Multimeter', 'VDE Insulated Screwdrivers', 'Voltage Detector'],
      },
      {
        id: 'home-plumber-consultation',
        title: 'Plumber consultation',
        categoryId: 'plumbing',
        price: 49,
        originalPrice: 99,
        rating: 4.74,
        reviewCount: 8710,
        durationMinutes: 30,
        isInstant: true,
        imageUrl: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
        description: 'Verified professional plumber at your doorstep within 30 minutes for pipeline leaks, slow drainage, bathroom fittings, or motor issues.',
        includes: [
          'Full plumbing pipeline leak diagnosis',
          'Water pressure & blockage assessment',
          'Clear fixed upfront repair quote',
          'No service charge if work booked on the spot',
        ],
        toolsUsed: ['Plumber Basin Wrench', 'Pipe Caliper', 'Pressure Test Pump'],
      },
      {
        id: 'home-fan-repair',
        title: 'Fan repair',
        categoryId: 'electrical',
        price: 149,
        originalPrice: 199,
        rating: 4.80,
        reviewCount: 7120,
        durationMinutes: 30,
        imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
        description: 'Resolution of slow fan speed, capacitor replacement, wobbling downrod balancing, or noisy bearing lubrication for ceiling & exhaust fans.',
        includes: [
          'Capacitor voltage check & replacement',
          'Downrod safety bolt tightening',
          'Blade pitch angle alignment',
          'Bearing lubrication for silent rotation',
        ],
        toolsUsed: ['Capacitor Tester', 'Blade Balancing Clip Set', 'Lubricant Spray'],
      },
      {
        id: 'home-flush-tank-repair',
        title: 'Flush tank repair',
        categoryId: 'plumbing',
        price: 199,
        originalPrice: 249,
        rating: 4.76,
        reviewCount: 5630,
        durationMinutes: 30,
        isInstant: true,
        imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
        description: 'Repair of continuously running flush water, broken siphon button, loose flush handle, or faulty concealed cistern inlet valves.',
        includes: [
          'Inspection of ballcock, siphon & flapper seal',
          'Inlet valve descaling & debris cleaning',
          'Button linkage mechanism adjustment',
          '30-day no-leak guarantee',
        ],
        toolsUsed: ['Concealed Cistern Spanner', 'Replacement Seal Gaskets', 'Teflon Tape'],
      },
      {
        id: 'home-tap-replacement',
        title: 'Water tap repair & replacement',
        categoryId: 'plumbing',
        price: 129,
        rating: 4.84,
        reviewCount: 6810,
        durationMinutes: 25,
        isInstant: true,
        imageUrl: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
        description: 'Fixing dripping kitchen sink taps, bathroom bib cocks, angle valves, or health faucets with Teflon thread sealing.',
        includes: [
          'Washer cartridge replacement',
          'Angle valve thread joint seal with Teflon tape',
          'Pressure test for zero drippage',
          'Cleanup of work area',
        ],
        toolsUsed: ['Adjustable Basin Wrench', 'PTFE Teflon Tape', 'Thread Sealant'],
      },
      {
        id: 'home-switchboard-repair',
        title: 'Switchboard button & socket repair',
        categoryId: 'electrical',
        price: 99,
        rating: 4.82,
        reviewCount: 8190,
        durationMinutes: 20,
        isInstant: true,
        imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
        description: 'Repair of sparky switches, burnt sockets, loose modular faceplates, or 16A power plugs with safety earthing check.',
        includes: [
          'Modular switch & socket replacement',
          'Tightening wire terminals to stop sparking',
          'Earthing connectivity test',
          'Shockproof safety verification',
        ],
        toolsUsed: ['VDE Insulated Screwdriver', 'Voltage Tester', 'Wire Stripper'],
      },
      {
        id: 'home-drain-unclogging',
        title: 'Bathroom floor drain unclogging',
        categoryId: 'plumbing',
        price: 249,
        originalPrice: 349,
        rating: 4.86,
        reviewCount: 7320,
        durationMinutes: 30,
        isInstant: true,
        imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
        description: 'Clearing hair clogs, soap residue, and slow drainage in bathroom jali and traps using high-torque snake augers.',
        includes: [
          'Manual steel wire snake auger insertion',
          'Chemical sludge dissolution purge',
          'Full trap debris extraction',
          'High pressure hot water flush',
        ],
        toolsUsed: ['Plumber Spiral Snake Auger', 'Enzymatic Drain Cleaner', 'Drain Cover Puller'],
      },
      {
        id: 'home-door-lock-fix',
        title: 'Door lock & latch handle installation',
        categoryId: 'carpentry-painting',
        price: 199,
        originalPrice: 249,
        rating: 4.80,
        reviewCount: 4210,
        durationMinutes: 30,
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        description: 'Installation or repair of Godrej mortise door locks, cylindrical knobs, latches, or sliding door rollers.',
        includes: [
          'Precision wood mortise chiseling',
          'Lock mechanism alignment & key testing',
          'Striker plate screw reinforcement',
          'Smooth latch operation guaranteed',
        ],
        toolsUsed: ['Wood Chisel Set', 'Cordless Screw Gun', 'Mortise Hole Saw'],
      },
      {
        id: 'home-wall-drill-hang',
        title: 'Drill hanging & wall shelf mounting',
        categoryId: 'carpentry-painting',
        price: 149,
        rating: 4.78,
        reviewCount: 5120,
        durationMinutes: 25,
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        description: 'Mounting paintings, bathroom mirrors, curtain rods, clocks, and wall shelves with laser leveler alignment.',
        includes: [
          'Laser spirit level alignment',
          'Hammer drill masonry holes',
          'Fischer nylon wall plugs & screws',
          'Dust-free drilling with vacuum shield',
        ],
        toolsUsed: ['Bosch Hammer Drill', 'Laser Level Meter', 'Dust Catcher Cup'],
      },
    ],
  },

  // 4. Screenshot 4: Massage for Men
  {
    id: 'massage-for-men',
    title: 'Massage for Men',
    subtitle: 'Deep tissue & sports relaxation therapies',
    categoryId: 'salon',
    seeAllAction: true,
    items: [
      {
        id: 'men-quick-comfort-therapy',
        title: 'Quick comfort therapy',
        categoryId: 'salon',
        price: 999,
        originalPrice: 1199,
        discountBadge: '17% OFF',
        rating: 4.81,
        reviewCount: 4210,
        durationMinutes: 45,
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
        description: 'Intense upper body decompression massage for stiff shoulders, tight trapezius, and neck strain using warming Ayurvedic clove oil.',
        includes: [
          'Upper back & shoulder blade knot release',
          'Deep neck traction & temple massage',
          'Warming clove & sesame herbal oil',
          'Single-use sterile bedsheet & linen',
        ],
        toolsUsed: ['Herbal Sesame Oil', 'Warming Herbal Compress', 'Neck Pillow'],
      },
      {
        id: 'men-leg-relief-massage',
        title: 'Leg relief massage',
        categoryId: 'salon',
        price: 919,
        rating: 4.85,
        reviewCount: 3980,
        durationMinutes: 30,
        imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
        description: 'Deep tissue pressure massage on calves, quadriceps, and soles of feet to flush lactic acid after intense workouts or long driving hours.',
        includes: [
          'Calf muscle kneading & circulation strokes',
          'Plantar fascia acupressure foot massage',
          'Cooling menthol herbal balm finish',
          'Hygienic foot wipe & towels',
        ],
        toolsUsed: ['Cooling Herbal Balm', 'Acupressure Wand', 'Steamed Towel'],
      },
      {
        id: 'men-top-to-toe-stress-relief',
        title: 'Top-to-toe stress relief massage',
        categoryId: 'salon',
        price: 1979,
        rating: 4.83,
        reviewCount: 4790,
        durationMinutes: 75,
        imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
        description: 'Complete full body stress relief therapy combining firm pressure kneading, spinal mobilization, and scalp stimulation for deep physical rejuvenation.',
        includes: [
          'Head, neck, back, arms & legs full coverage',
          'Deep pressure strokes to eliminate chronic tension',
          'Warm almond and olive oil treatment',
          'Disposable underwear, sheet & sanitization',
        ],
        toolsUsed: ['Aromatic Body Oil', 'Heated Compress', 'Scalp Massager'],
      },
      {
        id: 'men-back-relief-massage',
        title: 'Back relief massage',
        categoryId: 'salon',
        price: 919,
        rating: 4.85,
        reviewCount: 5120,
        durationMinutes: 30,
        imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
        description: 'Focused spinal column & lumbar muscle deep tissue massage. Eliminates lower back ache, stiffness from sitting, and sciatica discomfort.',
        includes: [
          'Lower back & lumbar myofascial release',
          'Warm herbal liniment deep friction massage',
          'Spinal decompression stretching technique',
          'Clean towels & mess-free cleanup',
        ],
        toolsUsed: ['Herbal Pain Relief Oil', 'Thumb Knuckle Tool', 'Moist Heat Pad'],
      },
      {
        id: 'men-deep-tissue-sports-massage',
        title: 'Deep tissue sports recovery massage',
        categoryId: 'salon',
        price: 1499,
        originalPrice: 1799,
        discountBadge: '16% OFF',
        rating: 4.87,
        reviewCount: 2940,
        durationMinutes: 60,
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
        description: 'Targeted high-intensity sports massage for athletes and gym-goers to break fascia adhesions and accelerate muscular lactic clearance.',
        includes: [
          'Myofascial cross-fiber friction strokes',
          'Hamstring, hip flexor & shoulder mobility stretches',
          'Arnica anti-inflammatory herbal oil',
          'Hot towel muscle relaxant compress',
        ],
        toolsUsed: ['Arnica Extract Oil', 'Theragun Percussion Tool', 'Hot Towel Warmer'],
      },
      {
        id: 'men-swedish-relaxation-massage',
        title: 'Swedish relaxation body oil therapy',
        categoryId: 'salon',
        price: 1399,
        rating: 4.82,
        reviewCount: 3180,
        durationMinutes: 60,
        imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
        description: 'Gentle, flowing Swedish effleurage and petrissage strokes to induce deep tranquil sleep and ease generalized body fatigue.',
        includes: [
          'Full body long rhythmic strokes',
          'Warm sweet almond and jojoba oil',
          'Calming cedarwood aromatherapy diffuser',
          'Disposable towels & hygienic setup',
        ],
        toolsUsed: ['Sweet Almond Oil', 'Aroma Diffuser', 'Warm Linen'],
      },
      {
        id: 'men-ayurvedic-potli-massage',
        title: 'Ayurvedic warm sesame Potli massage',
        categoryId: 'salon',
        price: 1299,
        originalPrice: 1549,
        discountBadge: '15% OFF',
        rating: 4.84,
        reviewCount: 2210,
        durationMinutes: 50,
        imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
        description: 'Traditional Ayurvedic warm herbal poultice stamped over tense joints, shoulder blades, and lower lumbar region.',
        includes: [
          'Medicated warm sesame oil application',
          'Heated herbal Potli compression',
          'Post-treatment herbal wipedown',
          'Immediate stiffness reduction',
        ],
        toolsUsed: ['Herbal Kizhi Pouches', 'Potli Heating Pan', 'Balaswagandhadi Oil'],
      },
    ],
  },

  // 5. Screenshot 5: Salon for men
  {
    id: 'salon-for-men',
    title: 'Salon for men',
    subtitle: 'Grooming essentials',
    categoryId: 'salon-men',
    seeAllAction: true,
    items: [
      {
        id: 'men-haircut-for-men',
        title: 'Haircut for men',
        categoryId: 'salon-men',
        price: 259,
        rating: 4.86,
        reviewCount: 6540,
        durationMinutes: 30,
        imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
        description: 'Precision styling haircut at home by licensed barbers using UV-sanitized clippers, imported scissors, disposable neck tape, and cape.',
        includes: [
          'Hair consultation & custom style haircut',
          'Disinfected Wahl clippers & scissors',
          'Disposable cape & floor protection sheet',
          'Neck cleaning & vacuum cleanup post cut',
        ],
        toolsUsed: ['Wahl Pro Clippers', 'Japanese Steel Scissors', 'UV Sterilization Bag'],
      },
      {
        id: 'men-haircut-for-boys',
        title: 'Haircut for boys',
        categoryId: 'salon-men',
        price: 259,
        rating: 4.83,
        reviewCount: 4210,
        durationMinutes: 25,
        imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
        description: 'Gentle, patient haircut for kids and boys at home with rounded-tip child-safe scissors, quiet clippers, and favorite styles.',
        includes: [
          'Kid-friendly gentle hair styling',
          'Ultra-quiet clippers & child-safe scissors',
          'Disposable cape & neck tape',
          'Zero-mess floor cleanup',
        ],
        toolsUsed: ['Low-Noise Child Clippers', 'Blunt Tip Shears', 'Sanitized Cape'],
      },
      {
        id: 'men-head-neck-shoulder-massage',
        title: 'Head, neck & shoulder massage',
        categoryId: 'salon-men',
        price: 349,
        rating: 4.81,
        reviewCount: 5670,
        durationMinutes: 30,
        imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
        description: 'Ayurvedic cooling Brahmi hair oil head massage combined with deep neck & shoulder knot kneading to eliminate stress and mental exhaustion.',
        includes: [
          'Warm Brahmi/Bhringraj herbal oil application',
          'Scalp acupressure point stimulation',
          'Cervical neck & shoulder blade knot release',
          'Hot towel wrap for scalp nourishment',
        ],
        toolsUsed: ['Ayurvedic Herbal Oil', 'Hot Steamer Towel', 'Scalp Stimulator'],
      },
      {
        id: 'men-brightening-lemon-deep-cleanse-pedicure',
        title: 'Brightening lemon deep cleanse pedicure',
        categoryId: 'salon-men',
        price: 849,
        rating: 4.78,
        reviewCount: 3120,
        durationMinutes: 45,
        imageUrl: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80',
        description: 'Detoxifying lemon soak, mechanized heel callus buffing, cuticle trimming, and nourishing mint massage for cracked, tired feet.',
        includes: [
          'Warm lemon salt foot soak & bubble bath',
          'Electronic heel callus file & scraper',
          'Cuticle grooming & nail shaping',
          'Peppermint cream relaxing foot massage',
        ],
        toolsUsed: ['Electronic Foot File', 'Lemon Foot Soak Crystals', 'Hydrating Foot Cream'],
      },
      {
        id: 'men-brightening-lemon-express-pedicure',
        title: 'Brightening lemon express pedicure',
        categoryId: 'salon-men',
        price: 649,
        rating: 4.76,
        reviewCount: 2890,
        durationMinutes: 30,
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        description: 'Quick lemon antiseptic soak, nail trimming, buffing, and gentle foot moisturizing for clean, hygienic feet on busy schedules.',
        includes: [
          'Antiseptic lemon foot cleanse',
          'Toe nail trimming, filing & buffing',
          'Dead skin gentle scrub',
          'Quick hydrating foot cream rub',
        ],
        toolsUsed: ['Sanitized Nail Clippers', 'Nail Buffer & Emery Board', 'Moisturizing Cream'],
      },
      {
        id: 'men-beard-shaping-hot-towel',
        title: 'Beard shaping & styling with hot towel',
        categoryId: 'salon',
        price: 149,
        rating: 4.84,
        reviewCount: 5420,
        durationMinutes: 20,
        imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
        description: 'Sharp razor lines, beard trimmer length balancing, moisturizing beard oil, and relaxing hot towel facial compress.',
        includes: [
          'Precision line alignment with straight razor',
          'Trimmer comb fade & length tapering',
          'Hot towel pore opening compress',
          'Nourishing cedarwood beard oil finish',
        ],
        toolsUsed: ['Single-Blade Razor', 'Beard Trimmer', 'Hot Towel Steamer'],
      },
      {
        id: 'men-charcoal-detan-cleanup',
        title: 'Charcoal detan & face cleanup',
        categoryId: 'salon',
        price: 499,
        originalPrice: 649,
        discountBadge: '23% OFF',
        rating: 4.82,
        reviewCount: 3810,
        durationMinutes: 35,
        imageUrl: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80',
        description: 'Deep pore unclogging with activated bamboo charcoal scrub, steam blackhead extraction, and tan removal mask for sun-exposed skin.',
        includes: [
          'Charcoal botanical exfoliating scrub',
          'Warm facial steam & blackhead extraction',
          'Detan clay pack application',
          'Hydrating aloe vera skin gel massage',
        ],
        toolsUsed: ['Facial Steamer', 'Blackhead Extractor', 'Bamboo Charcoal Peel'],
      },
      {
        id: 'men-grooming-all-in-one-combo',
        title: "Men's grooming combo (Haircut + Beard + Head massage)",
        categoryId: 'salon',
        price: 549,
        originalPrice: 707,
        discountBadge: '22% OFF',
        rating: 4.90,
        reviewCount: 7890,
        durationMinutes: 50,
        imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
        description: 'Complete royal grooming experience: tailored men haircut, sharp beard trim, followed by a 15-min relaxing Ayurvedic head massage.',
        includes: [
          'Professional haircuts & styling',
          'Sharp beard line trimming & shaping',
          '15-min Ayurvedic cooling head massage',
          'Full cleanup with vacuuming',
        ],
        toolsUsed: ['Wahl Pro Clippers', 'Straight Razor', 'Ayurvedic Herbal Oil'],
      },
    ],
  },

  // 6. Home & bathroom cleaning
  {
    id: 'home-cleaning-section',
    title: 'Home & bathroom cleaning',
    subtitle: 'Mechanized rotary drill scrubbing & stain removal',
    categoryId: 'cleaning',
    seeAllAction: true,
    items: [
      {
        id: 'clean-intense-cleaning-2-bathroom',
        title: 'Intense cleaning (2 bathroom)',
        categoryId: 'cleaning',
        price: 958,
        originalPrice: 1098,
        rating: 4.80,
        reviewCount: 4890,
        durationMinutes: 90,
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        description: 'High-torque mechanized drill scrubbing for tiles, hard water descaling with Taski chemicals, toilet bowl sanitization, and mirror shine.',
        includes: [
          'Mechanized rotary brush scrubbing for wall & floor tiles',
          'Caustic-free hard-water tile descaling (Taski R1/R6)',
          'Commode, cistern & washbasin deep sterilization',
          'Chrome taps, shower heads & mirror streak-free polish',
        ],
        toolsUsed: ['Rotary Power Drill Scrubber', 'Taski Hard-Water Descaler', 'Diamond Buffing Cloth'],
      },
      {
        id: 'clean-intense-cleaning-3-bathroom',
        title: 'Intense cleaning (3 bathroom)',
        categoryId: 'cleaning',
        price: 1377,
        originalPrice: 1647,
        rating: 4.80,
        reviewCount: 3910,
        durationMinutes: 120,
        imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
        description: 'Intense mechanized scrubbing for 3 bathrooms. Complete lime grout cleaning, yellow stain removal, exhaust fan degreasing, and chrome buffing.',
        includes: [
          'Deep machine scrubbing of floors & walls for 3 bathrooms',
          'Yellow stain & hard water scaling removal',
          'Sanitization of 3 commodes, cisterns & washbasins',
          'Chrome & brass fitting sparkle polish',
        ],
        toolsUsed: ['Heavy Rotary Floor Scrubber', 'Tile Grout Steamer', 'Biodegradable Chemicals'],
      },
      {
        id: 'clean-sofa-deep-cleaning-3seater',
        title: 'Sofa deep cleaning (3 seater)',
        categoryId: 'cleaning',
        price: 699,
        originalPrice: 849,
        rating: 4.84,
        reviewCount: 3820,
        durationMinutes: 60,
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
        description: 'Deep extraction vacuuming, shampoo injection, food stain removal, and anti-dust mite treatment for 3-seater fabric or leather sofas.',
        includes: [
          'High-power 2400W vacuuming for dust & mites',
          'Non-bleach fabric shampoo scrub',
          'Industrial extraction for 85% fast dry finish',
          'Citrus anti-microbial fragrance spray',
        ],
        toolsUsed: ['Kärcher Extraction Machine', 'Soft Fabric Foam Brush', 'Stain Lifter Solvent'],
      },
      {
        id: 'clean-kitchen-deep-cleaning',
        title: 'Kitchen deep cleaning & degreasing',
        categoryId: 'cleaning',
        price: 899,
        originalPrice: 1199,
        discountBadge: '25% OFF',
        rating: 4.79,
        reviewCount: 4120,
        durationMinutes: 90,
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
        description: 'Industrial heavy degreasing of chimney filters, gas stovetop, tile splashbacks, cabinet exteriors, sink sanitization, and floor buffing.',
        includes: [
          'Heavy degreaser application for oil buildup',
          'Chimney filter mesh soak & steam degreasing',
          'Slab, sink & chrome faucet descaling',
          'Floor machine scrub & sanitization',
        ],
        toolsUsed: ['Steam Degreaser Machine', 'Industrial Oil Solvent', 'Microfiber Polish Kit'],
      },
      {
        id: 'clean-full-home-1bhk',
        title: 'Full home deep cleaning (1 BHK)',
        categoryId: 'cleaning',
        price: 2199,
        originalPrice: 2599,
        discountBadge: '15% OFF',
        rating: 4.83,
        reviewCount: 2940,
        durationMinutes: 180,
        imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
        description: 'Thorough floor machine buffing, window pane wiping, bedroom wardrobe dusting, bathroom tile scrubbing, and kitchen degreasing.',
        includes: [
          'Mechanized single disc floor buffing & scrubbing',
          'All ceiling fans, switchboards & doors sanitized',
          'Complete bathroom deep descaling & washbasin polish',
          'Kitchen slab, cabinets & chimney exterior degreasing',
        ],
        toolsUsed: ['Single Disc Floor Scrubber', 'Kärcher Vacuum Cleaner', 'Steam Cleaner'],
      },
      {
        id: 'clean-balcony-deep-wash',
        title: 'Balcony floor wash & pigeon net clean',
        categoryId: 'cleaning',
        price: 499,
        originalPrice: 699,
        rating: 4.78,
        reviewCount: 1890,
        durationMinutes: 45,
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        description: 'High-pressure water blast to eliminate bird droppings, moss, algae, and grime from balcony railings and floors.',
        includes: [
          'Disinfectant soak for pigeon dropping sterilization',
          'High-pressure water jet balcony wash',
          'Glass and railing streak-free cleaning',
          'Floor drain unclog & fragrance mop',
        ],
        toolsUsed: ['High Pressure Jet Machine', 'Bio-Enzymatic Cleaner', 'Hard Bristle Scrubber'],
      },
    ],
  },

  // 7. Plumbing & Water Leaks
  {
    id: 'plumbing-water-leaks',
    title: 'Plumbing & Water Leaks',
    subtitle: 'Emergency water stoppage, drainage & modern fixture fittings',
    categoryId: 'plumbing',
    seeAllAction: true,
    items: [
      {
        id: 'plumb-blocked-drain-sink',
        title: 'Kitchen sink & drain unclogging',
        categoryId: 'plumbing',
        price: 299,
        originalPrice: 399,
        rating: 4.87,
        reviewCount: 6540,
        durationMinutes: 35,
        isInstant: true,
        imageUrl: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
        description: 'High-torque motorized auger snaking to remove grease, food particles, and stubborn blockages from kitchen sink pipes.',
        includes: [
          'Rotary power snake cable pipe insertion',
          'Bottle trap dismantling & scale removal',
          'Drain line grease dissolution purge',
          '30-day free unclog guarantee',
        ],
        toolsUsed: ['Electric Drain Snake', 'Pipe Wrench', 'Degreaser Solution'],
      },
      {
        id: 'plumb-overhead-tank-clean',
        title: 'Overhead water tank mechanized cleaning',
        categoryId: 'plumbing',
        price: 799,
        originalPrice: 999,
        discountBadge: '20% OFF',
        rating: 4.83,
        reviewCount: 3890,
        durationMinutes: 60,
        imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
        description: '6-stage scientific cleaning: sludge dewatering, high pressure wall washing, vacuuming, and UV antibacterial sterilization for up to 1000L tanks.',
        includes: [
          'Submersible slurry pumping & sludge extraction',
          'High pressure rotary jet wall wash',
          'Anti-bacterial spray treatment',
          'UV germicidal radiator disinfection',
        ],
        toolsUsed: ['Slurry Sump Pump', 'High Pressure Jet Machine', 'UV Germicidal Radiator'],
      },
      {
        id: 'plumb-concealed-leak-detection',
        title: 'Concealed pipe leakage acoustic detection',
        categoryId: 'plumbing',
        price: 599,
        rating: 4.88,
        reviewCount: 2890,
        durationMinutes: 45,
        imageUrl: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
        description: 'Precision acoustic & thermal imaging inspection to pinpoint hidden pipe leakage behind wall tiles without breaking tiles.',
        includes: [
          'Electro-acoustic ground microphone listening',
          'Thermal imaging camera wall scan',
          'Exact point-of-leak demarcation',
          'Non-destructive diagnostic report',
        ],
        toolsUsed: ['Acoustic Leak Locator', 'FLIR Thermal Camera', 'Pipe Pressure Tester'],
      },
      {
        id: 'plumb-water-motor-repair',
        title: 'Submersible water pump / motor repair',
        categoryId: 'plumbing',
        price: 349,
        originalPrice: 449,
        rating: 4.79,
        reviewCount: 4120,
        durationMinutes: 40,
        isInstant: true,
        imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
        description: 'Repair of water pump not lifting water, starter panel capacitor burning, priming failure, or noisy impeller bearing.',
        includes: [
          'Starter control panel capacitor check',
          'Foot valve seal & priming suction inspection',
          'Impeller rotation check & de-jamming',
          '30-day warranty on pump servicing',
        ],
        toolsUsed: ['Multimeter', 'Priming Wrench Set', 'Capacitor Tester'],
      },
      {
        id: 'plumb-commode-installation',
        title: 'Toilet commode replacement & wax seal',
        categoryId: 'plumbing',
        price: 699,
        rating: 4.82,
        reviewCount: 2780,
        durationMinutes: 60,
        imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
        description: 'Complete replacement of Western commode, installing leak-proof heavy wax ring seal, floor grouting, and flush pipe setup.',
        includes: [
          'Old commode safe uninstallation',
          'New wax ring gasket gas-tight mounting',
          'White cement / silicone boundary sealing',
          'Inlet cistern angle valve connection',
        ],
        toolsUsed: ['Wax Ring Flange Kit', 'Masonry Chisel', 'Level Meter'],
      },
    ],
  },

  // 8. Electrical & Wiring
  {
    id: 'electrical-wiring-section',
    title: 'Electrical & Wiring',
    subtitle: 'Zero-shock certified electricians for all home wiring needs',
    categoryId: 'electrical',
    seeAllAction: true,
    items: [
      {
        id: 'elec-mcb-tripping-diagnostics',
        title: 'MCB tripping & fuse diagnostics',
        categoryId: 'electrical',
        price: 199,
        rating: 4.86,
        reviewCount: 5890,
        durationMinutes: 30,
        isInstant: true,
        imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
        description: 'Diagnostic investigation of recurring circuit breaker trips, overloaded sub-circuits, phase imbalance, or burnt neutral wires.',
        includes: [
          'Circuit load calculation & phase balancing check',
          'Megger insulation resistance wire testing',
          'Burnt MCB pole replacement (parts extra)',
          'Complete distribution board safety audit',
        ],
        toolsUsed: ['Clamp Meter', 'Megger Tester', 'Insulated Screwdrivers'],
      },
      {
        id: 'elec-led-ceiling-light-install',
        title: 'False ceiling LED spotlight & COB install',
        categoryId: 'electrical',
        price: 149,
        rating: 4.82,
        reviewCount: 4210,
        durationMinutes: 25,
        imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
        description: 'Drilling Gypsum board ceiling holes with hole saw cutter, driver choke connection, and spring clip fitting for downlights.',
        includes: [
          'Ceiling hole saw cut with dust catcher',
          'LED driver & heat-resistant wire connection',
          'Spring clip locking into false ceiling',
          'Light testing & color temperature check',
        ],
        toolsUsed: ['Adjustable Hole Saw', 'Wire Strippers', 'Phase Tester'],
      },
      {
        id: 'elec-inverter-wiring-setup',
        title: 'Inverter & battery wiring installation',
        categoryId: 'electrical',
        price: 399,
        originalPrice: 499,
        rating: 4.85,
        reviewCount: 3670,
        durationMinutes: 45,
        isInstant: true,
        imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
        description: 'Safe connection of home UPS inverter, heavy 16mm battery cables, distilled water check, and main panel bypass changeover switch.',
        includes: [
          'Heavy gauge copper battery cable crimping',
          'Terminal petroleum jelly anti-corrosion coating',
          'MCB bypass switch connection in main board',
          'Mains cutover simulation test',
        ],
        toolsUsed: ['Hydraulic Cable Crimper', 'Hydrometer', 'Heavy Duty Spanners'],
      },
      {
        id: 'elec-cctv-smart-doorbell',
        title: 'Smart video doorbell & CCTV camera install',
        categoryId: 'electrical',
        price: 499,
        originalPrice: 649,
        discountBadge: '23% OFF',
        rating: 4.80,
        reviewCount: 2980,
        durationMinutes: 45,
        imageUrl: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80',
        description: 'Wall mounting smart doorbells or Wi-Fi security cameras, concealed adapter wiring, Wi-Fi pairing, and mobile app live view config.',
        includes: [
          'Precision wall masonry drilling & plug mounting',
          'Concealed power cable routing',
          'Wi-Fi 2.4GHz network pairing & phone setup',
          'Motion alert zone configuration walkthrough',
        ],
        toolsUsed: ['Impact Drill', 'Cable Tacker', 'Network Wi-Fi Analyzer'],
      },
      {
        id: 'elec-heavy-appliance-powerpoint',
        title: 'Geyser & AC 16A/25A power point wiring',
        categoryId: 'electrical',
        price: 249,
        rating: 4.81,
        reviewCount: 4890,
        durationMinutes: 30,
        isInstant: true,
        imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
        description: 'Installation of high-load 16A or 25A modular switchboard with heavy 4 sq mm copper wiring to prevent overheating.',
        includes: [
          'Fire-retardant 4mm wiring connection',
          'Heavy duty modular socket & switch box mounting',
          'Dedicated earth wire connection',
          'Thermal load testing under full power',
        ],
        toolsUsed: ['Wire Gauge Caliper', 'Insulated Hand Tools', 'Thermal Sensor'],
      },
    ],
  },

  // 9. Salon for Women
  {
    id: 'salon-for-women',
    title: 'Salon for women',
    subtitle: 'Prime & Luxe salon experiences at home with 100% single-use kits',
    categoryId: 'salon',
    seeAllAction: true,
    items: [
      {
        id: 'prime-spatula-waxing-arms-legs',
        title: 'Spatula waxing (Full arms, legs & underarms)',
        categoryId: 'salon',
        price: 1039,
        originalPrice: 1299,
        discountBadge: '20% OFF',
        rating: 4.87,
        reviewCount: 310200,
        durationMinutes: 50,
        imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
        description: 'Painless honey & aloe vera spatula waxing for full arms, legs, and underarms with pre & post wax lotions.',
        includes: [
          'Full arms honey & aloe vera waxing',
          'Full legs gentle spatula waxing',
          'Underarms painless waxing',
          'Soothing post-wax coconut lotion',
        ],
        toolsUsed: ['Single-use wooden spatulas', 'Wax heater', 'Pre-wax antiseptic lotion'],
      },
      {
        id: 'luxe-rejuvenating-crystal-spa-pedicure',
        title: 'Crystal rose spa pedicure',
        categoryId: 'salon',
        price: 899,
        originalPrice: 1149,
        discountBadge: '22% OFF',
        rating: 4.90,
        reviewCount: 94200,
        durationMinutes: 55,
        imageUrl: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80',
        description: 'Luxurious crystal jelly rose bath soak, volcanic pumice scrubbing, cuticle detailing, and shea butter foot massage.',
        includes: [
          'Warm aromatic crystal rose jelly soak',
          'Callus buffering & dead skin smoothing',
          'Cuticle trimming & nail shape perfection',
          '15-min relaxing shea butter foot massage',
        ],
        toolsUsed: ['Single-use pedicure file', 'Sealed cuticle pusher', 'Disposable tub liner'],
      },
      {
        id: 'prime-anti-tan-brightening-cleanup',
        title: 'Pore-clearing anti-tan cleanup',
        categoryId: 'salon',
        price: 799,
        originalPrice: 999,
        discountBadge: '20% OFF',
        rating: 4.86,
        reviewCount: 184000,
        durationMinutes: 45,
        imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
        description: 'Deep micro-pore steam, ultrasonic blackhead whitehead removal, anti-tan scrub & cooling pack for instant glow.',
        includes: [
          'Gentle foaming milk cleanser',
          'Herbal steam & ultrasonic blackhead extraction',
          'Anti-tan de-pigmentation scrub',
          'Cooling aloe vera tan-removal pack',
        ],
        toolsUsed: ['Ultrasonic skin spatula', 'Steamer', 'Single-use sponge wipes'],
      },
      {
        id: 'prime-roll-on-waxing-combo',
        title: 'Roll-on waxing (Full arms, legs & underarms)',
        categoryId: 'salon',
        price: 549,
        originalPrice: 749,
        discountBadge: '26% OFF',
        rating: 4.88,
        reviewCount: 220000,
        durationMinutes: 40,
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        description: 'Clean, no-spill hygienic cartridge roll-on waxing for smooth skin without burns or stickiness.',
        includes: [
          'Full arms cartridge roll-on waxing',
          'Full legs roll-on waxing',
          'Underarms wax strip finish',
          'Post-wax cooling gel application',
        ],
        toolsUsed: ['Wax cartridge heater', 'Sanitized non-woven strips', 'Disposable gloves'],
      },
      {
        id: 'luxe-forest-soundarya-24k-gold',
        title: 'Soundarya 24K Gold age-defying facial',
        categoryId: 'salon',
        price: 2999,
        originalPrice: 3699,
        discountBadge: '19% OFF',
        rating: 4.94,
        reviewCount: 42000,
        durationMinutes: 75,
        imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
        description: 'Pure 24 Karat gold bhasma with Kashmiri saffron, walnut gommage scrub, and Ayurvedic cold marble stone massage.',
        includes: [
          'Soundarya pure gold ubtan cleansing',
          'Walnut peel micro-gommage exfoliating ritual',
          '24K Gold bhasma radiance cream marma massage',
          'Ayurvedic kansa wand lifting technique',
        ],
        toolsUsed: ['Kansa wand', 'Ayurvedic bell-metal face roller', 'Forest Essentials sealed monodose kit'],
      },
      {
        id: 'prime-korean-glass-skin-facial',
        title: 'Korean Glass Skin Hydration Facial',
        categoryId: 'salon',
        price: 1599,
        originalPrice: 1999,
        discountBadge: '20% OFF',
        rating: 4.93,
        reviewCount: 142000,
        durationMinutes: 65,
        imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
        description: 'Hyaluronic acid essence ampoule, snail mucin peptide sheet mask, and ice globe lymphatic drainage for dewy glass skin.',
        includes: [
          'Double cleansing with rice water & camellia oil',
          'Hyaluronic acid ampoule ultrasound infusion',
          'Bio-collagen soothing jelly sheet mask',
          'Cryo ice globe sculpting massage',
        ],
        toolsUsed: ['Cryo ice globes', 'Ultrasound ion infuser', 'Korean single-use essence pack'],
      },
    ],
  },

  // 10. Pest Control
  {
    id: 'pest-control-section',
    title: 'Pest Control',
    subtitle: '100% Odorless & Govt-approved herbal gel solutions',
    categoryId: 'pest-control',
    seeAllAction: true,
    items: [
      {
        id: 'pest-cockroach-ant-control',
        title: 'Cockroach & ant odorless gel treatment',
        categoryId: 'pest-control',
        price: 799,
        originalPrice: 999,
        discountBadge: '20% OFF',
        rating: 4.85,
        reviewCount: 6890,
        durationMinutes: 45,
        isInstant: true,
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        description: 'Bayer Maxforce odorless gel dots placed along cabinet hinges, under sinks, and corners. 100% infant and pet safe with no need to empty kitchen.',
        includes: [
          'Bayer gel dots in kitchen cabinets & drawers',
          'Drain line residual barrier spray',
          'Cockroach egg capsule inspection',
          '90-day free rework warranty',
        ],
        toolsUsed: ['Bayer Gel Applicator Gun', 'Crack & Crevice Probe', 'ULV Cold Sprayer'],
      },
      {
        id: 'pest-bed-bug-eradication',
        title: 'Bed bug double-shot chemical eradication',
        categoryId: 'pest-control',
        price: 1499,
        originalPrice: 1899,
        discountBadge: '21% OFF',
        rating: 4.88,
        reviewCount: 3410,
        durationMinutes: 60,
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
        description: '2-round intensive treatment: deep steam heat to kill bug eggs in mattress seams, plus residual synthetic pyrethroid spray for total wipeout.',
        includes: [
          'Mattress, headboard & sofa seam spraying',
          'Steam blast for immediate egg destruction',
          'Second follow-up visit after 15 days included',
          'Full room defense barrier guarantee',
        ],
        toolsUsed: ['High-Temp Steam Wand', 'Bayer K-Othrine Chemical', 'Protective Respirator'],
      },
      {
        id: 'pest-termite-barrier-protection',
        title: 'Termite drill-fill-seal barrier protection',
        categoryId: 'pest-control',
        price: 2499,
        rating: 4.90,
        reviewCount: 2780,
        durationMinutes: 120,
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        description: 'Drilling precision 12mm holes at 45-degree angles into door frames and skirting, injecting Termidor chemical, and sealing with color-matched wax.',
        includes: [
          'Drill-fill-seal barrier technology',
          'Sub-surface wood preservation chemical',
          'Color-matched wax chalk hole sealing',
          '1-year or 3-year warranty certificate',
        ],
        toolsUsed: ['Rotary Hammer Drill', 'Chemical Injection Gun', 'Moisture Meter'],
      },
      {
        id: 'pest-rodent-rat-control',
        title: 'Rodent & rat baiting & trap setup',
        categoryId: 'pest-control',
        price: 899,
        rating: 4.79,
        reviewCount: 2190,
        durationMinutes: 40,
        imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
        description: 'Tamper-proof bait stations with anti-coagulant bromadiolone blocks placed along perimeter runways to eliminate rats without indoor odor.',
        includes: [
          'Tamper-proof lockable bait station placement',
          'Heavy industrial adhesive glue boards',
          'Ceiling duct entry point inspection',
          'Dead rodent safe disposal protocol',
        ],
        toolsUsed: ['Lockable Bait Stations', 'Catchmaster Glue Boards', 'Runway Detector'],
      },
    ],
  },

  // 11. Painting & Waterproofing
  {
    id: 'painting-waterproofing-section',
    title: 'Painting & Waterproofing',
    subtitle: 'Laser moisture checks & Asian Paints certified finishes',
    categoryId: 'painting',
    seeAllAction: true,
    items: [
      {
        id: 'paint-wall-dampness-leakage-treatment',
        title: 'Wall dampness & efflorescence treatment',
        categoryId: 'painting',
        price: 1499,
        originalPrice: 1899,
        discountBadge: '21% OFF',
        rating: 4.87,
        reviewCount: 3890,
        durationMinutes: 90,
        imageUrl: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
        description: 'Removal of peeling paint & salt efflorescence, deep chemical injection with Dr. Fixit Dampguard, fiber mesh reinforcement, and smooth putty coat.',
        includes: [
          'Scraping loose paint & salt crystallization',
          'Dr. Fixit 2-component epoxy barrier coat',
          'Glass fiber reinforcement mesh application',
          'Waterproof polymer putty smooth leveling',
        ],
        toolsUsed: ['Digital Moisture Meter', 'Electric Wall Sander', 'Epoxy Application Kit'],
      },
      {
        id: 'paint-1-room-express-repaint',
        title: '1 Room fresh express repainting',
        categoryId: 'painting',
        price: 2499,
        originalPrice: 2999,
        discountBadge: '16% OFF',
        rating: 4.82,
        reviewCount: 4210,
        durationMinutes: 180,
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        description: 'Fast 1-day room makeover using Asian Paints Royale/Apcolite with airless mechanized rollers, laser straight masking, and floor sheet cover.',
        includes: [
          'Full furniture & floor plastic sheet masking',
          'Nail hole & crack putty filling',
          '2 coats of Asian Paints premium emulsion',
          'Complete floor vacuum cleanup post painting',
        ],
        toolsUsed: ['Airless Paint Sprayer', 'Laser Masking Tape', 'Dust-Free Sander'],
      },
      {
        id: 'paint-balcony-terrace-waterproofing',
        title: 'Balcony & terrace PU waterproofing coat',
        categoryId: 'painting',
        price: 3499,
        rating: 4.85,
        reviewCount: 2310,
        durationMinutes: 180,
        imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
        description: 'High-durability polyurethane elastomeric seamless waterproofing membrane to prevent terrace water seepage into ceilings.',
        includes: [
          'Pressure cleaning terrace tile joints',
          'Polyurethane crack sealant groove filling',
          '3-coat elastomeric UV-resistant barrier membrane',
          '5-year written leakproof warranty',
        ],
        toolsUsed: ['Pressure Jet Washer', 'PU Sealant Gun', 'High-Build Roller'],
      },
      {
        id: 'paint-laser-moisture-consultation',
        title: 'Laser moisture wall inspection & consultation',
        categoryId: 'painting',
        price: 199,
        originalPrice: 399,
        discountBadge: '50% OFF',
        rating: 4.89,
        reviewCount: 5120,
        durationMinutes: 30,
        isInstant: true,
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        description: 'Certified paint consultant inspects wall moisture levels with digital pinless scanner and provides transparent sq ft cost estimate.',
        includes: [
          'Pinless RF wall moisture scanning',
          'Surface adhesion cross-cut test',
          'Square footage measurement with laser tape',
          'Detailed shade card & material estimate',
        ],
        toolsUsed: ['FLIR Pinless Moisture Meter', 'Laser Distance Measurer', 'Shade Fan Deck'],
      },
    ],
  },

  // 12. Carpentry & Furniture Assembly
  {
    id: 'carpentry-furniture-section',
    title: 'Carpentry & Furniture Assembly',
    subtitle: 'Skilled carpenters with precision power toolkits',
    categoryId: 'carpentry-painting',
    seeAllAction: true,
    items: [
      {
        id: 'carp-furniture-assembly-ikea',
        title: 'IKEA & modular wardrobe assembly',
        categoryId: 'carpentry-painting',
        price: 699,
        originalPrice: 899,
        discountBadge: '22% OFF',
        rating: 4.85,
        reviewCount: 4120,
        durationMinutes: 90,
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        description: 'Expert assembly of flat-pack furniture (IKEA, Pepperfry, Urban Ladder) including multi-door wardrobes, bookshelves, and study desks.',
        includes: [
          'Careful box unboxing & hardware tally',
          'Cam-lock, dowel & screw structural assembly',
          'Drawer rail alignment & soft close leveling',
          'Wall anti-tip safety bracket anchoring',
        ],
        toolsUsed: ['Bosch Cordless Screwdriver', 'Magnetic Bit Holder', 'Rubber Mallet'],
      },
      {
        id: 'carp-hydraulic-bed-fitting',
        title: 'Hydraulic bed lift channel fitting & repair',
        categoryId: 'carpentry-painting',
        price: 499,
        rating: 4.83,
        reviewCount: 2980,
        durationMinutes: 45,
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
        description: 'Replacement of jammed hydraulic gas pump shock absorbers, bed frame hinge tightening, and smooth lift alignment.',
        includes: [
          'Gas spring piston pressure rating matching (100N - 250N)',
          'Heavy angle bracket screw reinforcement',
          'Smooth bed lifting balance calibration',
          'Safety locking pin installation',
        ],
        toolsUsed: ['Heavy Torque Wrench', 'Pilot Drill Bits', 'Gas Strut Puller'],
      },
      {
        id: 'carp-kitchen-drawer-channel',
        title: 'Modular kitchen drawer channel repair',
        categoryId: 'carpentry-painting',
        price: 249,
        originalPrice: 349,
        rating: 4.84,
        reviewCount: 3890,
        durationMinutes: 30,
        isInstant: true,
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
        description: 'Fixing stuck, sagging, or misaligned kitchen drawers by replacing ball bearing telescopic channels or soft-close hinges.',
        includes: [
          'Telescopic channel track ball-bearing replacement',
          'Soft-close damper alignment',
          'Drawer fascia gap leveling',
          'Smooth push-to-open operation test',
        ],
        toolsUsed: ['Self-Centering Hinge Bit', 'Spirit Level', 'Magnetic Screwdriver'],
      },
      {
        id: 'carp-wall-tv-unit-mount',
        title: 'Wall mounted TV unit & floating shelf setup',
        categoryId: 'carpentry-painting',
        price: 399,
        rating: 4.80,
        reviewCount: 3450,
        durationMinutes: 40,
        imageUrl: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80',
        description: 'Heavy duty anchoring of floating TV consoles, set-top box shelves, and wire conduit covers into concrete or brick walls.',
        includes: [
          'Heavy-duty expansion rawlbolt anchoring',
          'Laser horizontal leveling',
          'Concealed wire management channel setup',
          'Up to 50kg load weight guarantee',
        ],
        toolsUsed: ['Impact Rotary Drill', 'Laser Spirit Level', 'Metal Stud Finder'],
      },
    ],
  },
];

// Convert a category carousel item to full ServiceItem
export const toServiceItem = (item: CategoryCarouselItem): ServiceItem => {
  return {
    id: item.id,
    categoryId: item.categoryId,
    title: item.title,
    subtitle: `${item.durationMinutes} mins • Rated ${item.rating.toFixed(2)} ★ (${(item.reviewCount || 3000).toLocaleString()} verified reviews)`,
    price: item.price,
    originalPrice: item.originalPrice,
    discountPercent: item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0,
    rating: item.rating,
    reviewCount: item.reviewCount || 3200,
    durationMinutes: item.durationMinutes,
    description: item.description,
    includes: item.includes,
    excludes: ['Parts replacement unless quoted in advance', 'Civil modifications'],
    image: item.imageUrl,
    videoPoster: item.imageUrl,
    toolsUsed: item.toolsUsed || ['Professional Equipment Kit', 'Safety Gear', 'Sanitizer'],
    workSteps: [
      {
        step: 1,
        title: 'Diagnostic & Pre-Service Inspection',
        desc: `Complete assessment & checkup before commencing ${item.title}`,
        duration: '5 mins',
        tool: item.toolsUsed?.[0] || 'Inspection Tool',
      },
      {
        step: 2,
        title: 'Core Professional Execution',
        desc: `Executing service with certified techniques & verified equipment`,
        duration: `${Math.round(item.durationMinutes * 0.5)} mins`,
        tool: item.toolsUsed?.[1] || 'Main Power Equipment',
      },
      {
        step: 3,
        title: 'Deep Cleanup & Finishing',
        desc: `Sanitization, mess removal, and quality inspection`,
        duration: `${Math.round(item.durationMinutes * 0.3)} mins`,
        tool: item.toolsUsed?.[2] || 'Finishing Kit',
      },
      {
        step: 4,
        title: 'Testing & Warranty Activation',
        desc: `Walkthrough with customer & 30-day rework warranty enabled`,
        duration: '5 mins',
        tool: 'Digital Checklist',
      },
    ],
    isUrgentAvailable: item.isInstant || false,
    urgentFee: 149,
    tags: ['Verified Partner', 'Standardized Pricing', item.isInstant ? 'Express SOS' : 'Top Rated'],
  };
};

// Returns all unique services across all category sections
export const getAllCategoryServices = (): ServiceItem[] => {
  const map = new Map<string, ServiceItem>();
  for (const section of ALL_CATEGORY_SECTIONS) {
    for (const item of section.items) {
      if (!map.has(item.id)) {
        map.set(item.id, toServiceItem(item));
      }
    }
  }
  return Array.from(map.values());
};

// Reusable horizontal row component for each category
const CategoryCarouselRow: React.FC<{
  section: CategoryCarouselSectionData;
  onSelectCategory: (categoryId: string) => void;
  onOpenServiceDetail: (service: ServiceItem) => void;
  onAddToCart?: (service: ServiceItem) => void;
  onOpenSalonMenPreference?: () => void;
}> = ({ section, onSelectCategory, onOpenServiceDetail, onAddToCart, onOpenSalonMenPreference }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  const handleAddClick = (e: React.MouseEvent, item: CategoryCarouselItem) => {
    e.stopPropagation();
    const serviceItem = toServiceItem(item);
    if (onAddToCart) {
      onAddToCart(serviceItem);
      setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
      setTimeout(() => {
        setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
      }, 2000);
    } else {
      onOpenServiceDetail(serviceItem);
    }
  };

  return (
    <div className="py-6 border-b border-slate-100 last:border-b-0" id={`category-row-${section.id}`}>
      {/* Header Container matching Screenshots */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{section.subtitle}</p>
          )}
        </div>

        {section.seeAllAction && (
          <button
            type="button"
            onClick={() => {
              if (section.id === 'salon-for-men' && onOpenSalonMenPreference) {
                onOpenSalonMenPreference();
              } else {
                onSelectCategory(section.categoryId);
              }
            }}
            className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-blue-600 border border-slate-200 hover:border-slate-300 px-3.5 py-1.5 rounded-xl hover:bg-slate-50 transition-all cursor-pointer whitespace-nowrap"
          >
            See all
          </button>
        )}
      </div>

      {/* Carousel Container with screenshot's circular navigation button */}
      <div className="relative group">
        {/* Left Arrow Button */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center text-slate-800 hover:text-black hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Previous items"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Right Arrow Button (exact circular white button with black chevron from screenshots) */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center text-slate-800 hover:text-black hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Next items"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Cards Row (Horizontal Scrollable Carousel) */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-3 scrollbar-none scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {section.items.map((item) => {
            const isAdded = addedItemIds[item.id];
            return (
              <div
                key={item.id}
                onClick={() => onOpenServiceDetail(toServiceItem(item))}
                className="shrink-0 w-48 sm:w-56 md:w-60 cursor-pointer group/card snap-start select-none"
                id={`carousel-card-${item.id}`}
              >
                {/* Image Container with rounded-2xl corners, exactly matching screenshots */}
                <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 mb-2 transition-transform duration-300 group-hover/card:scale-[1.02] shadow-xs hover:shadow-md">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => handleImageError(e, 'service')}
                  />

                  {/* Green Discount Pill Top-Left (Exact match from Screenshots 1 & 4 e.g. 20% OFF, 17% OFF) */}
                  {item.discountBadge && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="bg-[#007f5f] text-white text-[10px] sm:text-[11px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm tracking-wider">
                        {item.discountBadge}
                      </span>
                    </div>
                  )}

                  {/* Hover Quick Add to Cart Button */}
                  <div className="absolute bottom-2 right-2 z-20">
                    <button
                      type="button"
                      onClick={(e) => handleAddClick(e, item)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-md transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white scale-105'
                          : 'bg-white/95 text-slate-900 hover:bg-slate-900 hover:text-white backdrop-blur-xs border border-slate-200 hover:border-slate-900'
                      }`}
                      aria-label={`Add ${item.title} to cart`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" /> Add
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Service Title (Screenshot: Bold title directly below image) */}
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover/card:text-blue-600 transition-colors line-clamp-1 leading-snug">
                  {item.title}
                </h3>

                {/* Rating Row (Screenshot: ★ 4.80 or ★ 4.73 • ⚡ Instant) */}
                <div className="flex items-center gap-1.5 text-xs text-slate-700 mt-1 font-medium flex-wrap">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
                    <span className="font-bold text-slate-900">{item.rating.toFixed(2)}</span>
                  </div>

                  {item.isInstant && (
                    <>
                      <span className="text-slate-300 text-[10px]">•</span>
                      <span className="inline-flex items-center gap-0.5 text-emerald-700 font-bold text-[11px]">
                        <Zap className="w-3 h-3 fill-emerald-600 text-emerald-600" /> Instant
                      </span>
                    </>
                  )}
                </div>

                {/* Pricing Row (Screenshot: ₹929 or ₹1,298  ₹1,398) */}
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-900 mt-1">
                  <span>₹{item.price.toLocaleString('en-IN')}</span>

                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="text-xs text-slate-400 line-through font-normal">
                      ₹{item.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const AllServicesCategorySections: React.FC<AllServicesCategorySectionsProps> = ({
  selectedLocality,
  cityName,
  searchQuery,
  onClearSearch,
  onSelectCategory,
  onOpenServiceDetail,
  onAddToCart,
  onOpenSalonMenPreference,
}) => {
  // If user searched for something, filter the sections & cards matching the search term
  const query = searchQuery.trim().toLowerCase();

  const filteredSections = React.useMemo(() => {
    if (!query) return ALL_CATEGORY_SECTIONS;
    return ALL_CATEGORY_SECTIONS.map((sec) => {
      const matchingItems = sec.items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          sec.title.toLowerCase().includes(query) ||
          item.includes.some((inc) => inc.toLowerCase().includes(query))
      );
      return {
        ...sec,
        items: matchingItems,
      };
    }).filter((sec) => sec.items.length > 0);
  }, [query]);

  return (
    <section id="all-services-sections" className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
        {/* If searching, show search status header */}
        {query && (
          <div className="mb-4 flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Services matching "{searchQuery}" in {selectedLocality}, {cityName}
              </h3>
              <p className="text-xs text-slate-500">
                Found {filteredSections.reduce((acc, s) => acc + s.items.length, 0)} services across {filteredSections.length} categories
              </p>
            </div>
            <button
              type="button"
              onClick={onClearSearch}
              className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Render all category rows */}
        {filteredSections.length > 0 ? (
          filteredSections.map((section) => (
            <CategoryCarouselRow
              key={section.id}
              section={section}
              onSelectCategory={onSelectCategory}
              onOpenServiceDetail={onOpenServiceDetail}
              onAddToCart={onAddToCart}
              onOpenSalonMenPreference={onOpenSalonMenPreference}
            />
          ))
        ) : (
          <div className="py-12 text-center bg-slate-50 border border-slate-200 rounded-2xl p-8">
            <p className="text-base font-bold text-slate-800">No services found for "{searchQuery}"</p>
            <p className="text-xs text-slate-500 mt-1">Try searching for 'Massage', 'AC', 'Haircut', 'Plumber', or clear filter.</p>
            <button
              type="button"
              onClick={onClearSearch}
              className="mt-4 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Show All Services
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
