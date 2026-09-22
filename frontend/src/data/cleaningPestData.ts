import { ServiceItem } from '../types';

export interface CleaningPestSubService {
  id: string;
  name: string;
  iconImage: string;
  banner?: {
    heading: string;
    subtitle: string;
    image: string;
    badge?: string;
  };
  services: ServiceItem[];
}

export interface CleaningPestCategoryConfig {
  id: string;
  title: string;
  rating: number;
  bookingsCount: string;
  earliestSlot: string;
  heroBanner?: {
    heading: string;
    subtitle: string;
    image: string;
  };
  hasVideoPlayer?: boolean;
  videoTitle?: string;
  videoSubtitle?: string;
  videoSrc?: string;
  videoPoster?: string;
  subServices: CleaningPestSubService[];
}

// ============================================================================
// 1. BATHROOM CLEANING (Matching Video 00:08 - 00:18)
// ============================================================================
export const BATHROOM_CLEANING_CONFIG: CleaningPestCategoryConfig = {
  id: 'bathroom-cleaning',
  title: 'Bathroom Cleaning',
  rating: 4.83,
  bookingsCount: '9.4 M bookings',
  earliestSlot: 'Fri, 8:00 AM',
  heroBanner: {
    heading: 'Weekly plans starting at ₹215/service',
    subtitle: 'Intense descaling, sanitized mirrors & germ-free tiles',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
  },
  subServices: [
    // Sub-service 1: Weekly plans: Best value
    {
      id: 'weekly-plans',
      name: 'Weekly plans: Best value',
      iconImage: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=160&q=80',
      banner: {
        heading: 'Weekly bathroom cleaning',
        subtitle: 'Save up to 54% with flexible weekly recurring subscriptions',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        badge: 'Subscription',
      },
      services: [
        {
          id: 'bathroom-weekly-intense-2',
          categoryId: 'cleaning',
          title: 'Intense cleaning (2 bathroom)',
          subtitle: '2 intense cleanings with steam • 54% OFF',
          price: 418,
          originalPrice: 918,
          discountPercent: 54,
          rating: 4.79,
          reviewCount: 33000,
          durationMinutes: 115,
          description:
            'Two complete bathrooms intensely scrubbed with mechanized tile buffer, steam sanitization, Taski R1/R6 descaling, toilet bowl decalcification, and streak-free mirror polishing.',
          includes: [
            'Tile descaling & grout cleaning using Taski chemicals',
            'WC & washbasin stain removal with high-pressure steam',
            'Mirror & glass shower partition streak-free wipe',
            'Floor scrubbing & chrome tap buffing',
          ],
          excludes: ['Tile regrouting or crack repair'],
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['Subscription', 'BESTSELLER', '54% OFF'],
        },
        {
          id: 'bathroom-weekly-intense-1',
          categoryId: 'cleaning',
          title: 'Intense cleaning (1 bathroom)',
          subtitle: 'Single bathroom intense descaling • 53% OFF',
          price: 215,
          originalPrice: 459,
          discountPercent: 53,
          rating: 4.81,
          reviewCount: 118000,
          durationMinutes: 60,
          description:
            'Single bathroom intense descaling with steam machine and acid-free descaling chemicals. Removes stubborn yellow water stains, soap scum, and sanitizes touchpoints.',
          includes: [
            'Deep scrubbing of wall & floor tiles',
            'Sanitization of WC, washbasin & faucets',
            'Mirror buffing with microfiber cloth',
            'Exhaust fan wiping (1 fan included)',
          ],
          excludes: ['Hard tile replacement'],
          image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['Subscription', 'Starts ₹215', 'Popular'],
        },
        {
          id: 'bathroom-weekly-intense-3',
          categoryId: 'cleaning',
          title: 'Intense cleaning (3 bathroom)',
          subtitle: 'Three full bathrooms deep scrubbing • 54% OFF',
          price: 627,
          originalPrice: 1377,
          discountPercent: 54,
          rating: 4.8,
          reviewCount: 22000,
          durationMinutes: 165,
          description:
            'Three full bathrooms thoroughly scrubbed by our certified cleaning partner. Comprehensive hard water stain removal across walls, bathtubs, showers, and vanity counters.',
          includes: [
            'Complete cleaning for 3 master/guest bathrooms',
            'High-pressure steam dislodges hidden grime behind fixtures',
            'Limescale removal from chrome showers & spouts',
            'Odor neutralizing bio-treatment',
          ],
          excludes: ['Ceiling paint peeling work'],
          image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['Subscription', 'Large Home', '54% OFF'],
        },
      ],
    },

    // Sub-service 2: Value deals
    {
      id: 'value-deals',
      name: 'Value deals',
      iconImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=160&q=80',
      banner: {
        heading: 'Value Deals & Multi-Bath Combos',
        subtitle: 'Save maximum when combining multiple washroom deep cleans',
        image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
        badge: 'COMBO DEALS',
      },
      services: [
        {
          id: 'bathroom-deal-4-bath',
          categoryId: 'cleaning',
          title: 'Intense cleaning (4 bathroom)',
          subtitle: 'Complete 4-bathroom deep scrubbing package',
          price: 836,
          originalPrice: 1836,
          discountPercent: 54,
          rating: 4.82,
          reviewCount: 14000,
          durationMinutes: 210,
          description:
            'Ultimate package for 4BHKs and villas. Four full bathrooms washed, descaled, buffed, and disinfected with commercial equipment and specialized Taski chemicals.',
          includes: [
            'Deep cleaning of 4 complete washrooms',
            'Mechanized floor scrubbing & grout cleaning',
            'Disinfection of 4 toilet commodes & washbasins',
            'Chrome fittings and shower partition buffing',
          ],
          excludes: ['Plumbing repairs'],
          image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 149,
          tags: ['COMBO DEALS', 'Villa Value'],
        },
        {
          id: 'bathroom-deal-2-bath',
          categoryId: 'cleaning',
          title: 'Intense cleaning (2 bathroom)',
          subtitle: 'Best selling 2-washroom combo deal',
          price: 418,
          originalPrice: 918,
          discountPercent: 54,
          rating: 4.83,
          reviewCount: 56000,
          durationMinutes: 115,
          description:
            'High-efficiency double bathroom combo deal. Two complete washrooms cleaned with hot steam and Taski descalers for long-lasting freshness.',
          includes: [
            'Complete cleaning of 2 bathrooms',
            'Hard water stain removal from tiles & faucets',
            'Mirror & vanity counter polishing',
          ],
          excludes: ['Drain re-piping'],
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['COMBO DEALS', 'BESTSELLER'],
        },
      ],
    },

    // Sub-service 3: One time service
    {
      id: 'one-time-service',
      name: 'One time service',
      iconImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=160&q=80',
      banner: {
        heading: 'One Time Service',
        subtitle: 'Single visit deep scrubbing, hard-water stain removal and disinfection',
        image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
      },
      services: [
        {
          id: 'bathroom-classic-onetime',
          categoryId: 'cleaning',
          title: 'Classic bathroom cleaning',
          subtitle: 'Standard dry/wet wash for regular maintenance',
          price: 399,
          originalPrice: 499,
          discountPercent: 20,
          rating: 4.77,
          reviewCount: 89000,
          durationMinutes: 45,
          description:
            'Essential cleaning for regular upkeep. Includes manual tile scrubbing, toilet bowl cleaning, mirror wiping, and floor washing with disinfectant.',
          includes: [
            'Manual tile scrubbing with cleaning solution',
            'Toilet pot & washbasin cleaning',
            'Mirror wiping and floor drying',
          ],
          excludes: ['Heavy hard water scaling removal'],
          image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['One Time', 'Affordable'],
        },
        {
          id: 'bathroom-intense-onetime',
          categoryId: 'cleaning',
          title: 'Intense bathroom cleaning',
          subtitle: 'Deep scrub with steam machine & Taski chemicals',
          price: 459,
          originalPrice: 599,
          discountPercent: 23,
          rating: 4.82,
          reviewCount: 240000,
          durationMinutes: 60,
          description:
            'Deep cleaning with motorized scrubbing brush and steam machine. Removes tough hard water stains, soap scum, and yellow tiles.',
          includes: [
            'Motorized scrubbing machine for tile joints',
            'Steam machine for toilet rim & corners',
            'Limescale removal from taps and shower head',
            'Exhaust fan wiping',
          ],
          excludes: ['Grout replacement'],
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['BESTSELLER', 'Deep Clean'],
        },
        {
          id: 'bathroom-move-in-onetime',
          categoryId: 'cleaning',
          title: 'Move-in deep bathroom cleaning',
          subtitle: 'Heavy-duty revival for newly rented or renovated homes',
          price: 599,
          originalPrice: 799,
          discountPercent: 25,
          rating: 4.85,
          reviewCount: 42000,
          durationMinutes: 75,
          description:
            'Specialized revival cleaning for new tenants or post-paint work. Removes cement splatters, paint marks, and deep cleans the entire bathroom from ceiling to drain.',
          includes: [
            'Removal of paint/cement residue on tiles',
            'Complete chemical wash of vanity, door, and fittings',
            'High-grade antimicrobial disinfection mist',
            'Full glass shower cubicle restoration',
          ],
          excludes: ['Structural tile cracks'],
          image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['Move-In', 'Heavy Duty'],
        },
      ],
    },

    // Sub-service 4: Mini services (Matching Video 00:12 - 00:14)
    {
      id: 'mini-services',
      name: 'Mini services',
      iconImage: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=160&q=80',
      banner: {
        heading: 'Mini services & quick add-ons',
        subtitle: 'Targeted single spot cleaning to add to your bathroom package',
        image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80',
      },
      services: [
        {
          id: 'bathroom-mini-balcony',
          categoryId: 'cleaning',
          title: 'Balcony cleaning',
          subtitle: 'Starts at ₹549 • Floor & railing deep wash',
          price: 549,
          originalPrice: 699,
          discountPercent: 21,
          rating: 4.76,
          reviewCount: 92000,
          durationMinutes: 30,
          description:
            'High-pressure water jet and scrubbing of balcony tiles, grills, glass railings, and drainage outlet. Removes bird droppings, mud, and dust stains.',
          includes: [
            'Floor scrubbing with eco detergent',
            'Railing & grill wipe down',
            'Glass railing streak-free cleaning',
          ],
          excludes: ['Bird net installation'],
          image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['Mini Service', '2 options'],
        },
        {
          id: 'bathroom-mini-exhaust',
          categoryId: 'cleaning',
          title: 'Bathroom exhaust fan cleaning (additional)',
          subtitle: '₹89 • 15 mins • Additional fan cleaning',
          price: 89,
          originalPrice: 129,
          discountPercent: 31,
          rating: 4.79,
          reviewCount: 116000,
          durationMinutes: 15,
          description:
            'Additional exhaust fan deep degreasing. Note: One exhaust fan is already covered in standard bathroom cleaning. Add this if you have an extra fan.',
          includes: [
            'Disassembly of exhaust fan grill',
            'Degreasing blades and motor casing',
            'Sanitization and re-assembly',
          ],
          excludes: ['Motor rewiring'],
          image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 49,
          tags: ['Add-on', '₹89 only'],
        },
        {
          id: 'bathroom-mini-disinfection',
          categoryId: 'cleaning',
          title: 'Bathroom disinfection',
          subtitle: '₹129 • 15 mins • Hospital grade antimicrobial spray',
          price: 129,
          originalPrice: 199,
          discountPercent: 35,
          rating: 4.82,
          reviewCount: 35000,
          durationMinutes: 15,
          description:
            'Hospital-grade cold fogging disinfection mist covering the entire bathroom. Kills 99.9% germs, viruses, mold spores, and leaves a fresh citrus aroma.',
          includes: [
            'ULV cold mist fogging machine',
            'Coverage of WC, flush handle, faucets, and doorknobs',
            'Residual anti-bacterial barrier',
          ],
          excludes: ['Manual grime scrubbing'],
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 49,
          tags: ['Disinfection', 'Quick Add-on'],
        },
        {
          id: 'bathroom-mini-drain',
          categoryId: 'cleaning',
          title: 'Drain Cleaning',
          subtitle: 'Starts at ₹59 • Free flow & anti-odour clearance',
          price: 59,
          originalPrice: 99,
          discountPercent: 40,
          rating: 4.81,
          reviewCount: 28000,
          durationMinutes: 15,
          description:
            'Clean buried inside floor drain for free flow of water and no odour. Removes hair lumps, soap sludge, and cleans jali trap. Not covered in regular bathroom service.',
          includes: [
            'Jali removal and trap cleaning',
            'Bio-enzyme clog buster fluid application',
            'Odor eliminating flush',
          ],
          excludes: ['Main pipeline excavation'],
          image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 49,
          tags: ['Starts ₹59', 'Anti-Odour'],
        },
        {
          id: 'bathroom-mini-ceiling-fan',
          categoryId: 'cleaning',
          title: 'Ceiling fan cleaning',
          subtitle: 'Starts at ₹99 • 15 mins • Blade wipe & sanitization',
          price: 99,
          originalPrice: 149,
          discountPercent: 33,
          rating: 4.78,
          reviewCount: 143000,
          durationMinutes: 15,
          description:
            '1 ceiling fan thoroughly wiped with microfiber mitt & sanitized with antistatic solution to prevent dust accumulation. Safe dust collection without dirtying the bed.',
          includes: [
            'Both sides of 3/4 blades wiped',
            'Canopy & motor housing dusting',
            'Antistatic dust repellent polish',
          ],
          excludes: ['Motor regulator repair'],
          image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 49,
          tags: ['₹99 only', 'Antistatic'],
        },
      ],
    },
  ],
};

// ============================================================================
// 2. KITCHEN CLEANING (Matching Video 00:26 - 00:35)
// ============================================================================
export const KITCHEN_CLEANING_CONFIG: CleaningPestCategoryConfig = {
  id: 'kitchen-cleaning',
  title: 'Kitchen Cleaning',
  rating: 4.81,
  bookingsCount: '2.6 M bookings',
  earliestSlot: 'Fri, 8:00 AM',
  hasVideoPlayer: true,
  videoTitle: 'Kitchen Degreasing & Steam Treatment',
  videoSubtitle: 'High-temp steam dislodges burnt oil & greasy chimney filters',
  videoSrc: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
  videoPoster: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  subServices: [
    // Sub-service 1: Value packs (Matching Video 00:26)
    {
      id: 'value-packs',
      name: 'Value packs',
      iconImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=160&q=80',
      banner: {
        heading: 'Kitchen value packs',
        subtitle: 'Save more by bundling chimney filter wash, stove cleaning & slab degreasing',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
        badge: 'COMBO DEALS',
      },
      services: [
        {
          id: 'kitchen-regular-chimney-stove',
          categoryId: 'cleaning',
          title: 'Regular chimney & stove cleaning',
          subtitle: 'Starts at ₹549 • 1 hr 25 mins • Steam cleaning',
          price: 549,
          originalPrice: 799,
          discountPercent: 31,
          rating: 4.84,
          reviewCount: 41000,
          durationMinutes: 85,
          description:
            'Comprehensive maintenance for cooking zones. Includes: Stove/burners wash & filter cleaning with steam. Excludes inside chimney & outer chimney wiping.',
          includes: [
            'Stove & burners: wash & filter cleaning with steam',
            'Baffle / mesh filter degreasing with eco-chemical dip',
            'Knobs, drip tray & burner cap carbon removal',
          ],
          excludes: ['Inside motor chamber dismantling', 'Outer chimney hood exterior buffing'],
          image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['BESTSELLER', '1 hr 25 mins', 'Steam Clean'],
        },
        {
          id: 'kitchen-deep-chimney-stove',
          categoryId: 'cleaning',
          title: 'Deep cleaning & stove service',
          subtitle: 'Starts at ₹1,498 • Dismantling internal wiping',
          price: 1498,
          originalPrice: 1999,
          discountPercent: 25,
          rating: 4.72,
          reviewCount: 818,
          durationMinutes: 130,
          description:
            'Complete deep overhaul for heavily oiled kitchens. Includes: Dismantling for internal wiping of inside chimney & filters, deep burner unclogging, and slab restoration.',
          includes: [
            'Chimney dismantling & internal housing degreasing',
            'Motor blower & filter oil sludge extraction',
            'Stove burners descaling with brass wire brush',
            'Countertop steam wipe and splashback tile scrubbing',
          ],
          excludes: ['Chimney motor replacement'],
          image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 149,
          tags: ['Deep Service', 'Dismantling Clean'],
        },
      ],
    },

    // Sub-service 2: Chimney cleaning
    {
      id: 'chimney-cleaning',
      name: 'Chimney cleaning',
      iconImage: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=160&q=80',
      banner: {
        heading: 'Chimney cleaning & degreasing',
        subtitle: 'Baffle, mesh and filterless chimneys cleaned with high-temp steam',
        image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
      },
      services: [
        {
          id: 'chimney-filter-clean-basic',
          categoryId: 'cleaning',
          title: 'Basic chimney filter cleaning',
          subtitle: 'Starts at ₹399 • 45 mins • Eco-degreaser steam',
          price: 399,
          originalPrice: 499,
          discountPercent: 20,
          rating: 4.8,
          reviewCount: 32000,
          durationMinutes: 45,
          description:
            'Removal and deep degreasing of baffle or mesh filters in hot degreasing tank. Cleans oil collection cup and wipes outer stainless steel body.',
          includes: [
            'Filter dip in hot carbon-cutting solution',
            'Outer stainless steel / glass hood degreasing',
            'Oil collector cup cleaning',
          ],
          excludes: ['Internal motor dismantling'],
          image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['Chimney', '45 mins'],
        },
        {
          id: 'chimney-deep-dismantling',
          categoryId: 'cleaning',
          title: 'Deep chimney degreasing & duct cleaning',
          subtitle: 'Starts at ₹899 • 90 mins • Complete internal clean',
          price: 899,
          originalPrice: 1199,
          discountPercent: 25,
          rating: 4.83,
          reviewCount: 19000,
          durationMinutes: 90,
          description:
            'Comprehensive dismantling of front panel, blower wheel, duct opening, and motor housing. Restores 100% suction efficiency and eliminates burnt oil odor.',
          includes: [
            'Full blower wheel & rotor blade scraping',
            'Hot caustic dip for heavy grease deposits',
            'Duct pipe mouth inspection & suction test',
          ],
          excludes: ['New duct pipe installation'],
          image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['Full Suction', 'Dismantling'],
        },
      ],
    },

    // Sub-service 3: Complete kitchen cleaning
    {
      id: 'complete-kitchen',
      name: 'Complete kitchen cleaning',
      iconImage: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=160&q=80',
      banner: {
        heading: 'Complete kitchen cleaning',
        subtitle: 'Everything from ceiling fans, tiles, cabinets to sinks & slabs sparkling clean',
        image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80',
      },
      services: [
        {
          id: 'kitchen-complete-classic',
          categoryId: 'cleaning',
          title: 'Classic kitchen cleaning',
          subtitle: 'Starts at ₹999 • 2 hrs • External surface scrub',
          price: 999,
          originalPrice: 1299,
          discountPercent: 23,
          rating: 4.78,
          reviewCount: 64000,
          durationMinutes: 120,
          description:
            'Full external scrub of kitchen countertops, backsplash tiles, gas stove, sink, and cabinet exteriors. Eliminates grime and leaves surfaces spotless.',
          includes: [
            'Backsplash tile & countertop degreasing',
            'Exterior cabinet wipedown & handle sanitization',
            'Sink descaling & chrome tap polishing',
            'Floor scrubbing with disinfectant',
          ],
          excludes: ['Interior cabinet emptying & cleaning'],
          image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 149,
          tags: ['Complete', 'Classic'],
        },
        {
          id: 'kitchen-complete-intense',
          categoryId: 'cleaning',
          title: 'Intense full kitchen degreasing & sanitization',
          subtitle: 'Starts at ₹1,499 • 3 hrs • Inside & outside cabinets',
          price: 1499,
          originalPrice: 1999,
          discountPercent: 25,
          rating: 4.85,
          reviewCount: 112000,
          durationMinutes: 180,
          description:
            'Master kitchen deep overhaul. Covers both inside and outside of all modular cabinets, chimney filter steam blast, microwave & fridge exterior, and tile grout scrub.',
          includes: [
            'Inside & outside wiping of all modular cabinets',
            'High-pressure steam dislodges grease in corner crevices',
            'Chimney filters & gas stove deep degrease',
            'Complete floor buffing with neutralizer',
          ],
          excludes: ['Pest control spray'],
          image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 149,
          tags: ['BESTSELLER', '3 Hours', 'Intense Deep'],
        },
      ],
    },

    // Sub-service 4: Appliance cleaning (Matching Video 00:28 - 00:32)
    {
      id: 'appliance-cleaning',
      name: 'Appliance cleaning',
      iconImage: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=160&q=80',
      banner: {
        heading: 'Kitchen appliance cleaning',
        subtitle: 'Dedicated food-safe deep sanitization for microwaves, fridges, air fryers & stoves',
        image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
      },
      services: [
        {
          id: 'appliance-microwave',
          categoryId: 'cleaning',
          title: 'Microwave cleaning',
          subtitle: '₹199 • 15 mins • Deep wiping of interior',
          price: 199,
          originalPrice: 249,
          discountPercent: 20,
          rating: 4.84,
          reviewCount: 38000,
          durationMinutes: 15,
          description:
            'Deep wiping of interior to remove burnt stains & odour. Turntable glass plate washed, interior roof scraped, and door glass buffed crystal clear.',
          includes: [
            'Steam softening of stubborn food splatter',
            'Interior cavity degreasing with food-safe lemon cleaner',
            'Turntable glass tray washed with warm water',
            'Exterior button panel sanitized',
          ],
          excludes: ['Magnetron electrical repair'],
          image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 49,
          tags: ['₹199 only', '15 mins', 'Food-Safe'],
        },
        {
          id: 'appliance-gas-stove',
          categoryId: 'cleaning',
          title: 'Gas stove cleaning',
          subtitle: 'Starts at ₹199 • Stovetop, burners & knobs',
          price: 199,
          originalPrice: 299,
          discountPercent: 33,
          rating: 4.83,
          reviewCount: 16000,
          durationMinutes: 20,
          description:
            'Stovetop, burners & knobs cleaning with steam. Deep wiping of exterior glass/steel surface to remove sticky oil residue, food burns, and yellow carbon marks.',
          includes: [
            'Burner heads soaked & carbon brushed out',
            'Knob removal and grease degreasing',
            'Spill tray and pan support wire scrubbing',
          ],
          excludes: ['Gas cylinder hose replacement'],
          image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 49,
          tags: ['Starts ₹199', 'Steam Clean'],
        },
        {
          id: 'appliance-package-all',
          categoryId: 'cleaning',
          title: 'Appliance cleaning package',
          subtitle: 'Starts at ₹1,096 • Chimney, fridge, stove & microwave',
          price: 1096,
          originalPrice: 1599,
          discountPercent: 31,
          rating: 4.78,
          reviewCount: 11000,
          durationMinutes: 105,
          description:
            'Includes cleaning of chimney, fridge, gas stove & microwave. Complete all-in-one appliance rejuvenation package with food-safe certification.',
          includes: [
            'Chimney baffle filter hot dip wash',
            'Full refrigerator internal shelves & crisper wash',
            'Gas stove burner descaling & glass polish',
            'Microwave interior burnt splatter removal',
          ],
          excludes: ['Commercial size cold storage'],
          image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['BEST VALUE', '1 options', 'Bundle Deal'],
        },
        {
          id: 'appliance-air-fryer',
          categoryId: 'cleaning',
          title: 'Air fryer cleaning',
          subtitle: '₹199 • 20 mins • Deep wiping of interior',
          price: 199,
          originalPrice: 249,
          discountPercent: 20,
          rating: 4.87,
          reviewCount: 8000,
          durationMinutes: 20,
          description:
            'Deep wiping of interior to remove oil stains & odour. Non-stick basket degreased without abrasive scratching, heating coil dusted, and vent cleared.',
          includes: [
            'Non-stick fry basket gentle eco-degrease',
            'Heating coil carbon deposit wiping',
            'Exterior body degrease and smudge removal',
          ],
          excludes: ['Electronic motherboard service'],
          image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 49,
          tags: ['₹199 only', '20 mins', 'Non-Stick Safe'],
        },
        {
          id: 'appliance-sandwich-maker',
          categoryId: 'cleaning',
          title: 'Sandwich Maker/Griller cleaning',
          subtitle: '₹119 • 15 mins • Non-stick plate cleaning',
          price: 119,
          originalPrice: 169,
          discountPercent: 30,
          rating: 4.82,
          reviewCount: 8000,
          durationMinutes: 15,
          description:
            'Non-stick grill plates cleaned of melted cheese and burnt butter crust. Safe food-grade sanitizer applied to eliminate cross-contamination.',
          includes: [
            'Grill plate steam degreasing',
            'Crumb tray removal and wash',
            'Hinges and exterior handle wipe',
          ],
          excludes: ['Teflon recoating'],
          image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 49,
          tags: ['₹119 only', '15 mins'],
        },
        {
          id: 'appliance-fridge-clean',
          categoryId: 'cleaning',
          title: 'Fridge cleaning',
          subtitle: 'Starts at ₹399 • 45 mins • Shelves & trays removal',
          price: 399,
          originalPrice: 499,
          discountPercent: 20,
          rating: 4.81,
          reviewCount: 38000,
          durationMinutes: 45,
          description:
            'All shelves, egg trays, and crisper boxes removed, washed with organic wash, and dried. Gaskets disinfected to stop black mold growth and bad smell.',
          includes: [
            'All shelves, door pockets & vegetable box washed',
            'Door rubber gasket mold treatment',
            'Defrost tray wiping and odor-neutralizing deodorizer',
          ],
          excludes: ['Compressor gas refill'],
          image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['Starts ₹399', 'Anti-Bacterial'],
        },
      ],
    },

    // Sub-service 5: Cabinets & tiles (Matching Video 00:30)
    {
      id: 'cabinets-tiles',
      name: 'Cabinets & tiles',
      iconImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=160&q=80',
      banner: {
        heading: 'Cabinets & tiles degreasing',
        subtitle: 'Remove grease and oil stains using steam machine & fresh chemicals',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      },
      services: [
        {
          id: 'cabinets-tiles-slabs',
          categoryId: 'cleaning',
          title: 'Tiles & slabs cleaning',
          subtitle: '₹399 • 45 mins • Steam machine & fresh chemicals',
          price: 399,
          originalPrice: 499,
          discountPercent: 20,
          rating: 4.74,
          reviewCount: 26000,
          durationMinutes: 45,
          description:
            'Remove grease and oil stains using steam machine. Tile grout cleaning using fresh chemicals. Leaves cooking backsplash and granite counter shiny and smooth.',
          includes: [
            'Remove grease and oil stains using steam machine',
            'Tile grout cleaning using fresh chemicals',
            'Granite slab descaling and buffing',
          ],
          excludes: ['Granite re-polishing with diamond pads'],
          image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['BESTSELLER', 'Steam Machine', '45 mins'],
        },
        {
          id: 'cabinets-interior-exterior',
          categoryId: 'cleaning',
          title: 'Modular cabinet deep wipe (In & Out)',
          subtitle: 'Starts at ₹599 • 75 mins • Shelves, hinges & shutters',
          price: 599,
          originalPrice: 799,
          discountPercent: 25,
          rating: 4.79,
          reviewCount: 18000,
          durationMinutes: 75,
          description:
            'Wiping and sanitizing inside and outside of all kitchen cabinets. Cleans oily dust on top of tall cabinets, drawer channels, and glass shutters.',
          includes: [
            'Inside shelves wiped clean (customer to empty items)',
            'Exterior laminate and acrylic shutters degreased',
            'Drawer channels and handles cleaned',
          ],
          excludes: ['Cabinet carpentry realignment'],
          image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['Cabinets', 'In & Out'],
        },
      ],
    },

    // Sub-service 6: Mini services
    {
      id: 'kitchen-mini-services',
      name: 'Mini services',
      iconImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=160&q=80',
      banner: {
        heading: 'Kitchen mini add-ons',
        subtitle: 'Quick single spot cleaning to complement your kitchen service',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      },
      services: [
        {
          id: 'kitchen-mini-exhaust',
          categoryId: 'cleaning',
          title: 'Kitchen exhaust fan cleaning',
          subtitle: '₹89 • 15 mins • Sticky grease removal',
          price: 89,
          originalPrice: 129,
          discountPercent: 31,
          rating: 4.79,
          reviewCount: 34000,
          durationMinutes: 15,
          description:
            'Heavy grease and oil film removed from exhaust fan louvers and fan blades using carbon dissolving spray and hot water rinse.',
          includes: [
            'Exhaust fan blades dismounted & wiped',
            'Outer frame & mesh cleaning',
            'Re-assembly and test run',
          ],
          excludes: ['Motor capacitor replacement'],
          image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 49,
          tags: ['₹89 only', '15 mins'],
        },
        {
          id: 'kitchen-mini-sink-drain',
          categoryId: 'cleaning',
          title: 'Kitchen sink & drain unclog wash',
          subtitle: '₹99 • 20 mins • Limescale & odour purge',
          price: 99,
          originalPrice: 149,
          discountPercent: 33,
          rating: 4.8,
          reviewCount: 21000,
          durationMinutes: 20,
          description:
            'Stainless steel / quartz sink scrubbed with abrasive-free cream. Trapped food particles in drain coupling removed with high-temp bio-enzyme flush.',
          includes: [
            'Sink basin stain and water mark buffing',
            'Drain strainer basket deep cleaning',
            'Hot enzyme flush for grease lines',
          ],
          excludes: ['Under-sink pipe leakage repair'],
          image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 49,
          tags: ['₹99 only', 'Odor-Free'],
        },
      ],
    },
  ],
};

// ============================================================================
// 3. LIVING & BEDROOM CLEANING
// ============================================================================
export const LIVING_BEDROOM_CONFIG: CleaningPestCategoryConfig = {
  id: 'living-bedroom-cleaning',
  title: 'Living & Bedroom Cleaning',
  rating: 4.82,
  bookingsCount: '3.1 M bookings',
  earliestSlot: 'Fri, 8:00 AM',
  heroBanner: {
    heading: 'Living & Bedroom Deep Scrubbing',
    subtitle: 'Sofa shampooing, carpet extraction & dust-free bedrooms',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
  },
  subServices: [
    {
      id: 'sofa-carpet',
      name: 'Sofa & carpet cleaning',
      iconImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=160&q=80',
      banner: {
        heading: 'Sofa & carpet shampooing',
        subtitle: 'Injection-extraction wet vacuuming removes deep food stains and dust mites',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      },
      services: [
        {
          id: 'sofa-shampoo-3seater',
          categoryId: 'cleaning',
          title: '3-Seater Sofa Cleaning',
          subtitle: 'Starts at ₹599 • Wet vacuum extraction',
          price: 599,
          originalPrice: 799,
          discountPercent: 25,
          rating: 4.84,
          reviewCount: 95000,
          durationMinutes: 45,
          description:
            'Mechanized foam shampooing and powerful moisture suction for 3-seater fabric sofa. Removes coffee, sweat stains, and dust mites. Dries in 3-4 hours.',
          includes: [
            'Dry vacuuming to extract loose dust',
            'Foam shampooing with fabric conditioner',
            'High-power moisture extraction',
          ],
          excludes: ['Torn fabric restoration'],
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['BESTSELLER', 'Fabric Care'],
        },
        {
          id: 'carpet-shampoo-standard',
          categoryId: 'cleaning',
          title: 'Carpet & Rug Deep Cleaning',
          subtitle: 'Starts at ₹449 • Steam & stain removal',
          price: 449,
          originalPrice: 599,
          discountPercent: 25,
          rating: 4.81,
          reviewCount: 42000,
          durationMinutes: 40,
          description:
            'Deep cleaning of living room rugs and carpets up to 50 sq ft. High-pressure steam and extraction lifts pet dander, dirt, and beverage marks.',
          includes: [
            'Deep pile dry vacuuming',
            'Spot stain pre-treatment',
            'Mechanized wet extraction and grooming',
          ],
          excludes: ['Fringe thread re-weaving'],
          image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['Pet Safe', 'Deep Pile'],
        },
      ],
    },
    {
      id: 'mattress-curtain',
      name: 'Mattress & curtains',
      iconImage: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=160&q=80',
      banner: {
        heading: 'Mattress sanitization & curtain steam',
        subtitle: 'UV-C sanitization and steam for allergen-free sleep',
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
      },
      services: [
        {
          id: 'mattress-king-deep-clean',
          categoryId: 'cleaning',
          title: 'King Size Mattress Cleaning & Sanitization',
          subtitle: 'Starts at ₹699 • Dual side UV treatment',
          price: 699,
          originalPrice: 899,
          discountPercent: 22,
          rating: 4.86,
          reviewCount: 51000,
          durationMinutes: 60,
          description:
            'Dual-side vacuuming and sanitization of king size mattress. Eliminates dead skin, dust mites, and bacteria using high-suction HEPA filtration.',
          includes: [
            'Dual-sided HEPA vacuuming',
            'Spot stain lifting treatment',
            'Antimicrobial mist protection',
          ],
          excludes: ['Permanent chemical dye bleach marks'],
          image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['Hypoallergenic', 'UV Safe'],
        },
      ],
    },
  ],
};

// ============================================================================
// 4. FULL HOME / BY ROOM CLEANING
// ============================================================================
export const FULL_HOME_CONFIG: CleaningPestCategoryConfig = {
  id: 'full-home-cleaning',
  title: 'Full Home/ By Room Cleaning',
  rating: 4.84,
  bookingsCount: '1.9 M bookings',
  earliestSlot: 'Fri, 8:00 AM',
  heroBanner: {
    heading: 'Complete Full Home Deep Cleaning',
    subtitle: 'Expert 3-5 member crew with single-disc floor scrubbers and steam units',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  subServices: [
    {
      id: 'full-apartment',
      name: 'Full apartment deep clean',
      iconImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=160&q=80',
      banner: {
        heading: 'Complete apartment cleaning',
        subtitle: 'Living room, bedrooms, bathrooms, kitchen & balconies completely scrubbed',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      },
      services: [
        {
          id: 'full-home-2bhk-intense',
          categoryId: 'cleaning',
          title: '2 BHK Full Home Deep Cleaning',
          subtitle: 'Starts at ₹3,199 • 4-5 hrs • Crew of 3',
          price: 3199,
          originalPrice: 4299,
          discountPercent: 25,
          rating: 4.85,
          reviewCount: 165000,
          durationMinutes: 240,
          description:
            'All-inclusive deep cleaning for 2BHK flat. Includes 2 bathrooms, kitchen degreasing, living room, 2 bedrooms, balcony, and floor buffing with single-disc scrubber machine.',
          includes: [
            'All rooms floor buffing with Taski R2 chemical',
            'Full kitchen deep scrub with chimney filter steam',
            'Both bathrooms descaled & disinfected',
            'Balcony floor & glass window streak-free clean',
          ],
          excludes: ['Painting or wall seepage repair'],
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 199,
          tags: ['BESTSELLER', 'Full Home', '2 BHK'],
        },
        {
          id: 'full-home-3bhk-intense',
          categoryId: 'cleaning',
          title: '3 BHK Full Home Deep Cleaning',
          subtitle: 'Starts at ₹4,199 • 5-6 hrs • Crew of 4',
          price: 4199,
          originalPrice: 5699,
          discountPercent: 26,
          rating: 4.86,
          reviewCount: 110000,
          durationMinutes: 300,
          description:
            'Heavy-duty deep scrub for 3BHK flat. Covers 3 washrooms, modular kitchen, all 3 bedrooms with ceiling fans, window tracks, and balconies.',
          includes: [
            '4 master cleaning technicians equipped with industrial equipment',
            'Kitchen, 3 bathrooms, and living room detailed cleaning',
            'Window tracks and sliding door channels vacuumed',
            'Whole home antibacterial air spray',
          ],
          excludes: ['Heavy exterior window rappelling'],
          image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 199,
          tags: ['Popular', '3 BHK', 'Crew of 4'],
        },
      ],
    },
  ],
};

// ============================================================================
// 5. TERMITE CONTROL (Pest Control Section)
// ============================================================================
export const TERMITE_CONTROL_CONFIG: CleaningPestCategoryConfig = {
  id: 'termite-control',
  title: 'Termite Control',
  rating: 4.88,
  bookingsCount: '840 K bookings',
  earliestSlot: 'Fri, 8:00 AM',
  heroBanner: {
    heading: 'Govt. Approved Termite Drill-Fill-Seal',
    subtitle: '1-Year & 2-Year warranty with 100% odorless chemical barrier',
    image: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?auto=format&fit=crop&w=1200&q=80',
  },
  subServices: [
    {
      id: 'drill-fill-seal',
      name: 'Drill-fill-seal warranty plans',
      iconImage: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?auto=format&fit=crop&w=160&q=80',
      banner: {
        heading: 'Termite drill-fill-seal treatment',
        subtitle: 'Precision drilling at 45-degree angle in skirting & door frames with odorless termiticide',
        image: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?auto=format&fit=crop&w=800&q=80',
      },
      services: [
        {
          id: 'termite-1bhk-1yr',
          categoryId: 'pest-control',
          title: '1 BHK Termite Treatment (1-Year Warranty)',
          subtitle: 'Starts at ₹1,499 • Drill-fill-seal protection',
          price: 1499,
          originalPrice: 1999,
          discountPercent: 25,
          rating: 4.87,
          reviewCount: 38000,
          durationMinutes: 90,
          description:
            'Govt. approved Fipronil/Imidacloprid odorless chemical pumped into skirting tiles and wooden door frames. Complete 1-year guarantee with free revisit if termites appear.',
          includes: [
            'Precision 12mm drilling along wall skirting joints',
            'Pressure injection of subterranean termite blocker',
            'Holes color-matched and sealed with white cement/silicone',
            '1-Year written warranty certificate',
          ],
          excludes: ['Replacement of hollow eaten wood'],
          image: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['1-Yr Warranty', '100% Odorless'],
        },
        {
          id: 'termite-2bhk-2yr',
          categoryId: 'pest-control',
          title: '2 BHK Termite Treatment (2-Year Warranty)',
          subtitle: 'Starts at ₹2,499 • Comprehensive 2-year defense',
          price: 2499,
          originalPrice: 3299,
          discountPercent: 24,
          rating: 4.89,
          reviewCount: 52000,
          durationMinutes: 120,
          description:
            'Full 2-year anti-termite shield for 2BHK homes. Covers all wardrobes, kitchen cabinets, wooden skirting, and main door frames with zero odor.',
          includes: [
            'Entire house perimeter and internal door frames protected',
            'Wardrobe back panel oil-based termite spray',
            'Free mid-year inspection audit',
            '2-Year full warranty certificate',
          ],
          excludes: ['Pre-construction soil excavation'],
          image: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['BESTSELLER', '2-Yr Warranty'],
        },
      ],
    },
  ],
};

// ============================================================================
// 6. LEAK & GAP SEALING (Pest Control Section with "New" Badge)
// ============================================================================
export const LEAK_GAP_SEALING_CONFIG: CleaningPestCategoryConfig = {
  id: 'leak-gap-sealing',
  title: 'Leak & gap sealing',
  rating: 4.86,
  bookingsCount: '420 K bookings',
  earliestSlot: 'Fri, 8:00 AM',
  heroBanner: {
    heading: 'Waterproof Leak & Gap Sealing',
    subtitle: 'Nano silicone & polymer sealant stops cockroach entry and water seepages',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80',
  },
  subServices: [
    {
      id: 'waterproof-seal',
      name: 'Waterproof sealant & pest barrier',
      iconImage: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=160&q=80',
      banner: {
        heading: 'Anti-leak & pest gap sealing',
        subtitle: 'Seal washbasin gaps, kitchen countertop edges, shower corners & pipeline breaches',
        image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
        badge: 'New',
      },
      services: [
        {
          id: 'seal-bathroom-sink-tub',
          categoryId: 'pest-control',
          title: 'Bathroom Gap & Leak Sealing',
          subtitle: 'Starts at ₹349 • Anti-fungal RTV silicone',
          price: 349,
          originalPrice: 499,
          discountPercent: 30,
          rating: 4.85,
          reviewCount: 29000,
          durationMinutes: 35,
          description:
            'Professional gap sealing along bathtub, shower partition, vanity counter, and toilet base. Uses mold-resistant neutral cure RTV silicone to prevent water dripping and pests.',
          includes: [
            'Old deteriorated silicone scraped clean',
            'Sanitization of joint with isopropyl alcohol',
            'Uniform application of anti-fungal waterproof silicone bead',
          ],
          excludes: ['Wall plumbing pipe welding'],
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 49,
          tags: ['NEW', 'Anti-Fungal', 'Waterproof'],
        },
        {
          id: 'seal-kitchen-sink-slab',
          categoryId: 'pest-control',
          title: 'Kitchen Sink & Slab Gap Sealing',
          subtitle: 'Starts at ₹299 • Food-grade barrier',
          price: 299,
          originalPrice: 399,
          discountPercent: 25,
          rating: 4.88,
          reviewCount: 34000,
          durationMinutes: 30,
          description:
            'Stops cockroach entry from gaps under the kitchen sink and behind granite countertop. 100% waterproof food-grade white silicone barrier.',
          includes: [
            'Under-sink rim and drain pipe junction sealing',
            'Backsplash-to-granite joint air-tight filling',
            'Smooth tooling with silicone bead profile',
          ],
          excludes: ['Granite countertop leveling'],
          image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 49,
          tags: ['BESTSELLER', 'Cockroach Block'],
        },
      ],
    },
  ],
};

// ============================================================================
// 7. TILE GROUTING & SEALANT (Deep Restore Section)
// ============================================================================
export const TILE_GROUTING_CONFIG: CleaningPestCategoryConfig = {
  id: 'tile-grouting',
  title: 'Tile Grouting & Sealant',
  rating: 4.87,
  bookingsCount: '310 K bookings',
  earliestSlot: 'Fri, 8:00 AM',
  heroBanner: {
    heading: 'Epoxy Tile Grouting & Deep Restoration',
    subtitle: 'Stain-free, waterproof epoxy resin grouting that never discolors or cracks',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80',
  },
  subServices: [
    {
      id: 'epoxy-grout',
      name: 'Epoxy grouting restoration',
      iconImage: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=160&q=80',
      banner: {
        heading: 'Epoxy tile grout restoration',
        subtitle: '100% stain proof and acid resistant grouting for bathrooms, balconies & kitchens',
        image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
      },
      services: [
        {
          id: 'grout-bathroom-epoxy',
          categoryId: 'cleaning',
          title: 'Bathroom Epoxy Tile Regrouting',
          subtitle: 'Starts at ₹999 • 100% waterproof & stain proof',
          price: 999,
          originalPrice: 1299,
          discountPercent: 23,
          rating: 4.88,
          reviewCount: 22000,
          durationMinutes: 90,
          description:
            'Old discolored cement grout removed with oscillating tool. Replaced with heavy-duty 2-part epoxy resin grout that resists fungus, black mold, and harsh cleaning acids forever.',
          includes: [
            'Raking out loose dirty grout down to 3mm depth',
            'Dust extraction with industrial vacuum',
            'Application of premium dual-component epoxy grout',
            'Water sponge cleaning and surface polish',
          ],
          excludes: ['Broken tile replacement'],
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
          isUrgentAvailable: true,
          urgentFee: 99,
          tags: ['Deep Restore', 'Epoxy Resin', 'Lifetime Value'],
        },
      ],
    },
  ],
};

// Map of all configs by ID
export const ALL_CLEANING_PEST_CONFIGS: Record<string, CleaningPestCategoryConfig> = {
  'bathroom-cleaning': BATHROOM_CLEANING_CONFIG,
  'kitchen-cleaning': KITCHEN_CLEANING_CONFIG,
  'living-bedroom-cleaning': LIVING_BEDROOM_CONFIG,
  'full-home-cleaning': FULL_HOME_CONFIG,
  'termite-control': TERMITE_CONTROL_CONFIG,
  'leak-gap-sealing': LEAK_GAP_SEALING_CONFIG,
  'tile-grouting': TILE_GROUTING_CONFIG,
  // Fallbacks
  'cleaning': BATHROOM_CLEANING_CONFIG,
  'pest-control': TERMITE_CONTROL_CONFIG,
};
