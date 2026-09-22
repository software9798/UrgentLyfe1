import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Star,
  Clock,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize2,
  Sparkles,
  ShieldCheck,
  Zap,
  PhoneCall,
  MapPin,
  ShoppingCart,
  Plus,
  Minus,
} from 'lucide-react';
import { Category, ServiceItem, CartItem } from '../../types';
import { handleImageError } from '../../utils/imageFallback';
import { ServiceVideoPlayer } from './ServiceVideoPlayer';
import { SalonWomenCategoryView } from './SalonWomenCategoryView';
import { SpaWomenCategoryView } from './SpaWomenCategoryView';
import { HairStudioCategoryView } from './HairStudioCategoryView';
import { MakeupStylingCategoryView } from './MakeupStylingCategoryView';
import { SalonMenCategoryView } from './SalonMenCategoryView';
import { MassageMenCategoryView } from './MassageMenCategoryView';
import { CleaningPestCategoryView } from './CleaningPestCategoryView';

interface SubServiceConfig {
  id: string;
  label: string;
  thumbnailUrl?: string;
  discountBadge?: string;
  promoBanner: {
    badge?: string;
    title: string;
    price: number;
    originalPrice?: number;
    subtitle: string;
    image: string;
  };
  filterTags?: string[];
  filterServiceIds?: string[];
}

interface CategoryDisplayConfig {
  headline: string;
  earliestSlot: string;
  rating: number;
  bookingsCount: string;
  videoSrc: string;
  videoPoster: string;
  subServices: SubServiceConfig[];
  promisePoints: string[];
}

interface CategoryPageViewProps {
  category: Category;
  initialSubService?: string;
  allCategories: Category[];
  services: ServiceItem[];
  cartItems: CartItem[];
  onAddToCart: (service: ServiceItem, isUrgent?: boolean) => void;
  onUpdateCartQuantity: (serviceId: string, delta: number) => void;
  onBookNow: (service: ServiceItem, isUrgent?: boolean) => void;
  onSelectServiceDetail: (service: ServiceItem) => void;
  onClose: () => void;
  onSelectOtherCategory: (category: Category, subServiceKey?: string) => void;
  onOpenPreferenceModal?: () => void;
  selectedCityName: string;
  selectedLocality: string;
}

export const CategoryPageView: React.FC<CategoryPageViewProps> = ({
  category,
  initialSubService,
  allCategories,
  services,
  cartItems,
  onAddToCart,
  onUpdateCartQuantity,
  onBookNow,
  onSelectServiceDetail,
  onClose,
  onSelectOtherCategory,
  onOpenPreferenceModal,
  selectedCityName,
  selectedLocality,
}) => {
  // Video player controls state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(35);
  const [videoTime, setVideoTime] = useState('0:14 / 0:30');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Determine category-specific rich configuration
  const getCategoryConfig = (catId: string): CategoryDisplayConfig => {
    switch (catId) {
      case 'cleaning':
        return {
          headline: 'Full Home/ By Room Cleaning',
          earliestSlot: 'Today, 3:30 PM',
          rating: 4.81,
          bookingsCount: '1.7 M bookings',
          videoSrc: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
          videoPoster: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
          promisePoints: [
            'Verified Professionals',
            'Safe Chemicals',
            'Superior Stain Removal',
            '30-Day Free Rework Guarantee',
          ],
          subServices: [
            {
              id: 'full-apartment',
              label: 'Full apartment',
              thumbnailUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Best value',
                title: 'Full home cleaning',
                price: 3199,
                originalPrice: 4795,
                subtitle: 'More affordable than picking services one by one',
                image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['unfurnished-apartment-cleaning', 'furnished-apartment-cleaning', 'full-home-deep-cleaning'],
            },
            {
              id: 'bungalow-duplex',
              label: 'Full bungalow/duplex',
              thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Villa Special',
                title: 'Bungalow & Villa Deep Cleaning',
                price: 5999,
                originalPrice: 7999,
                subtitle: '4 to 5 master crew members with industrial scrubbers',
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['bungalow-duplex-cleaning', 'full-home-deep-cleaning'],
            },
            {
              id: 'partial-home',
              label: 'Partial home cleaning',
              discountBadge: '10% OFF',
              promoBanner: {
                badge: '10% OFF',
                title: 'Partial Room Cleaning',
                price: 1599,
                originalPrice: 2199,
                subtitle: 'Deep clean selected rooms, bathrooms & balconies',
                image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['partial-home-cleaning', 'kitchen-bathroom-deep-scrub', 'balcony-window-glass-deep-clean'],
            },
            {
              id: 'furniture-shine',
              label: 'Furniture clean & shine',
              thumbnailUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Wood Nourish',
                title: 'Furniture Clean, Polish & Shine',
                price: 899,
                originalPrice: 1299,
                subtitle: 'Wax buffing, scratch masking & sofa foam shampooing',
                image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['furniture-clean-and-shine', 'sofa-carpet-shampooing'],
            },
            {
              id: 'kitchen-bath',
              label: 'Kitchen & Bathroom',
              thumbnailUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Stain Descale',
                title: 'Kitchen & Washroom Deep Scrub',
                price: 399,
                originalPrice: 599,
                subtitle: 'Caustic oil degrease & hard water tile descaling',
                image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['kitchen-bathroom-deep-scrub', 'gas-stove-chimney-deep-clean', 'overhead-tank-cleaning-mechanized'],
            },
            {
              id: 'balcony-glass',
              label: 'Balcony & Glass Cleaning',
              thumbnailUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Streak Free',
                title: 'Balcony Pressure Wash & Window Glass',
                price: 499,
                originalPrice: 799,
                subtitle: 'Floor jet spray, railing rust-removal & magnetic double glass wipe',
                image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['balcony-window-glass-deep-clean', 'partial-home-cleaning'],
            },
          ],
        };

      case 'ac-appliance':
        return {
          headline: 'Power Foam Jet AC Service & Repair',
          earliestSlot: 'Today, 4:00 PM',
          rating: 4.88,
          bookingsCount: '2.4 M bookings',
          videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          videoPoster: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
          promisePoints: [
            '2x Superior Cooling Guarantee',
            'Zero Mess Indoor Cleaning Jacket',
            '100% Pure Refrigerant Gas Tested',
            '30-Day Free Rework Guarantee',
          ],
          subServices: [
            {
              id: 'power-foam-jet',
              label: 'Power foam jet',
              thumbnailUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Best value',
                title: 'Power Foam Jet AC Service (Split)',
                price: 599,
                originalPrice: 899,
                subtitle: 'High-pressure foam spray restores 2x cooling efficiency',
                image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['ac-foam-jet-service', 'ac-foam-jet-window'],
            },
            {
              id: 'gas-leak-refill',
              label: 'Gas leak & refill',
              discountBadge: '10% OFF',
              promoBanner: {
                badge: 'Genuine Gas',
                title: 'AC Gas Leak Repair & Pure Refill',
                price: 2199,
                originalPrice: 2899,
                subtitle: 'Nitrogen leak test, copper brazing & weigh-based refill',
                image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['ac-gas-refill', 'ac-nitrogen-leak-test'],
            },
            {
              id: 'ac-split-installation',
              label: 'Installation & Unmount',
              thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Master Fit',
                title: 'Split AC Master Mounting & Gas Lock Uninstallation',
                price: 699,
                originalPrice: 999,
                subtitle: 'Vibration-free heavy bracket drill, core hole & pump-down',
                image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['ac-split-installation-mounting', 'ac-uninstallation-relocation'],
            },
            {
              id: 'inverter-pcb-repair',
              label: 'Inverter PCB Repair',
              discountBadge: '20% OFF',
              promoBanner: {
                badge: 'Micro Chip',
                title: 'Inverter AC Motherboard & Sensor Diagnostics',
                price: 999,
                originalPrice: 1499,
                subtitle: 'Solid state relay fix, display error codes & capacitor testing',
                image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['ac-inverter-pcb-repair', 'ac-nitrogen-leak-test'],
            },
            {
              id: 'ro-water-purifier',
              label: 'RO Purifier Service',
              thumbnailUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Pure Water',
                title: 'RO Water Purifier Check & Filter Flush',
                price: 399,
                originalPrice: 599,
                subtitle: 'Digital TDS check, UV lamp check & booster pump test',
                image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['ro-water-purifier-repair', 'ro-water-purifier-native-m3'],
            },
            {
              id: 'senior-warranty-audit',
              label: '₹0 Supervisor Audit',
              discountBadge: '100% FREE',
              promoBanner: {
                badge: 'Free Warranty',
                title: 'Senior Master Technician ₹0 Inspection',
                price: 0,
                originalPrice: 299,
                subtitle: 'Zero-cost visit under 30-Day UrgentLyfe Happiness Guarantee',
                image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['senior-technician-free-audit'],
            },
          ],
        };

      case 'painting':
        return {
          headline: 'Full home painting & Wall Panels',
          earliestSlot: 'Tomorrow, 10:00 AM',
          rating: 4.91,
          bookingsCount: '950 K bookings',
          videoSrc: 'https://media.w3.org/2010/05/bunny/movie.mp4',
          videoPoster: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
          promisePoints: [
            'Laser Measurement & Accurate Quotes',
            '100% Waterproof Fluted Wall Panels',
            'Zero Construction Dust & Odor',
            '1-Year Paint & Seepage Warranty',
          ],
          subServices: [
            {
              id: 'wall-panels',
              label: 'Wall Panels by Revamp',
              thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Best value',
                title: 'Wall Panels by Revamp',
                price: 1899,
                originalPrice: 2799,
                subtitle: 'Waterproof fluted PVC panels permanent fix for damp walls',
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['wall-panels-by-revamp', 'wall-panels-damp-walls'],
            },
            {
              id: 'full-home-painting',
              label: 'Full home painting',
              thumbnailUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Dust Free',
                title: 'Mechanized Wall Painting',
                price: 1499,
                originalPrice: 2200,
                subtitle: 'Asian Paints / Berger emulsion with roller leveling',
                image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['express-wall-painting', 'waterproof-wall-seepage-treatment'],
            },
            {
              id: 'damp-waterproofing',
              label: 'Dampness Treatment',
              discountBadge: '15% OFF',
              promoBanner: {
                badge: '15% OFF',
                title: 'Wall Dampness & Moisture Seal',
                price: 1899,
                originalPrice: 2799,
                subtitle: 'Moisture barrier treatment & fluted cladding protection',
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['wall-panels-damp-walls', 'waterproof-wall-seepage-treatment'],
            },
            {
              id: 'designer-textures',
              label: 'Royale Play Textures',
              thumbnailUrl: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Designer Finish',
                title: 'Asian Paints Royale Play Metallic Texture',
                price: 2499,
                originalPrice: 3499,
                subtitle: 'Artistic metallic stencils, spatual & dune pattern feature walls',
                image: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['royale-play-metallic-textures', 'express-wall-painting'],
            },
            {
              id: 'wood-metal-polish',
              label: 'Wood & Grill Polish',
              discountBadge: '10% OFF',
              promoBanner: {
                badge: 'Anti-Rust',
                title: 'PU Wood Polish & Balcony Grill Enamel',
                price: 899,
                originalPrice: 1299,
                subtitle: 'Melamine wood spray & anti-corrosion gloss enamel coating',
                image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['pu-wood-polish-balcony-grill', 'express-wall-painting'],
            },
          ],
        };

      case 'electrical':
        return {
          headline: 'Zero-Spark Electrical & Smart Locks',
          earliestSlot: 'Today, 3:30 PM',
          rating: 4.92,
          bookingsCount: '1.9 M bookings',
          videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          videoPoster: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
          promisePoints: [
            'Govt Licensed Master Electricians',
            'Precision Multimeter Diagnostics',
            '30-Minute SOS Dispatch for Sparks',
            '30-Day Free Rework Guarantee',
          ],
          subServices: [
            {
              id: 'smart-locks',
              label: 'Smart Locks',
              thumbnailUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Best value',
                title: 'Smart Locks Installation & Setup',
                price: 899,
                originalPrice: 1299,
                subtitle: 'Digital fingerprint, face recognition & app configuration',
                image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['smart-locks-installation', 'cctv-smart-doorbell-setup'],
            },
            {
              id: 'short-circuit-mcb',
              label: 'Short Circuit & MCB',
              thumbnailUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: '30 Min SOS',
                title: 'MCB Tripping & Short Circuit Diagnostic',
                price: 349,
                originalPrice: 499,
                subtitle: 'Emergency thermal check for burnt wires & tripped circuits',
                image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['mcb-switchboard-electrical', 'switchboard-wiring-socket-fix'],
            },
            {
              id: 'switches-fans',
              label: 'Switches & Fans',
              discountBadge: '10% OFF',
              promoBanner: {
                badge: '10% OFF',
                title: 'Switchboard, Fans & Lighting Fix',
                price: 149,
                originalPrice: 249,
                subtitle: 'Sparking switch replacement & heavy fan mounting',
                image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['switchboard-wiring-socket-fix', 'ceiling-fan-installation'],
            },
            {
              id: 'lighting-chandeliers',
              label: 'Chandeliers & Lights',
              thumbnailUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Designer Fit',
                title: 'Chandelier, COB & Profile Light Fitting',
                price: 399,
                originalPrice: 599,
                subtitle: 'Ceiling anchor drilling, transformer test & balanced hanging',
                image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['decorative-chandelier-light-fitting', 'ceiling-fan-installation'],
            },
            {
              id: 'earthing-leakage',
              label: 'Earthing & Shock Audit',
              discountBadge: 'Safety First',
              promoBanner: {
                badge: 'Zero Shock',
                title: 'Home Earthing & Current Leakage Inspection',
                price: 499,
                originalPrice: 799,
                subtitle: 'Digital megger leakage test & neutral-earth voltage calibration',
                image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['earthing-leakage-audit', 'mcb-switchboard-electrical'],
            },
            {
              id: 'inverter-ups',
              label: 'Inverter & Battery',
              thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Power Backup',
                title: 'Inverter, UPS & Battery Diagnostic',
                price: 349,
                originalPrice: 499,
                subtitle: 'Specific gravity acid check, relay bypass & terminal de-sulfation',
                image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['inverter-ups-battery-repair', 'mcb-switchboard-electrical'],
            },
          ],
        };

      case 'plumbing':
        return {
          headline: 'Plumbing & Emergency Pipe Leaks',
          earliestSlot: '30 Mins Express',
          rating: 4.95,
          bookingsCount: '2.1 M bookings',
          videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
          videoPoster: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
          promisePoints: [
            'High-Pressure Unclogging Machines',
            'Zero Leakage Guarantee Seals',
            '30-Min Rapid SOS Arrival',
            '30-Day Free Rework Guarantee',
          ],
          subServices: [
            {
              id: 'pipe-leaks',
              label: 'Pipe Leakage & Bursts',
              thumbnailUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Best value',
                title: 'Emergency Pipe Leak & Tap Fix (SOS)',
                price: 299,
                originalPrice: 450,
                subtitle: 'Instant arrival for leaking valves, burst pipes & faucets',
                image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['urgent-pipe-leak-repair', 'tap-repair-pipe-leak'],
            },
            {
              id: 'drain-unclog',
              label: 'Drain & Basin unclog',
              thumbnailUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'High Pressure',
                title: 'High Pressure Drain & Toilet Unclogging',
                price: 499,
                originalPrice: 799,
                subtitle: 'Snake wire & chemical flush for stubborn blockages',
                image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['drain-unclogging-express', 'tap-repair-pipe-leak'],
            },
            {
              id: 'taps-fixtures',
              label: 'Taps & Sanitary Fitting',
              discountBadge: '10% OFF',
              promoBanner: {
                badge: '10% OFF',
                title: 'Tap Leakage & Pipe Fitting Repair',
                price: 199,
                originalPrice: 299,
                subtitle: 'Washer replacement, spindle fix & leak sealing',
                image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['tap-repair-pipe-leak', 'urgent-pipe-leak-repair'],
            },
            {
              id: 'toilet-flush-repair',
              label: 'Toilet & Flush Tank',
              thumbnailUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'No Overflow',
                title: 'Toilet Commode & Flush Tank Repair',
                price: 249,
                originalPrice: 399,
                subtitle: 'Ball-valve renewal, siphon flush washer & silicone seal',
                image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['toilet-commode-flush-tank-repair', 'jet-spray-health-faucet-fix'],
            },
            {
              id: 'motor-pump-geyser',
              label: 'Water Motor Pump',
              discountBadge: 'Heavy Duty',
              promoBanner: {
                badge: 'Full Pressure',
                title: 'Water Motor Pump Installation & Bypass Fix',
                price: 499,
                originalPrice: 799,
                subtitle: 'Crompton/Kirloskar motor priming, check valve & wiring fix',
                image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['water-motor-pump-install-repair', 'urgent-pipe-leak-repair'],
            },
            {
              id: 'overhead-tank',
              label: 'Water Tank Cleaning',
              thumbnailUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'UV Sanitized',
                title: 'Mechanized Overhead Water Tank Cleaning',
                price: 699,
                originalPrice: 999,
                subtitle: '6-stage deep sludge pump, high-pressure rotary wash & UV sterilization',
                image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['overhead-tank-cleaning-mechanized', 'drain-unclogging-express'],
            },
          ],
        };

      case 'pest-control':
        return {
          headline: 'Anti-Termite & Herbal Pest Control',
          earliestSlot: 'Today, 4:00 PM',
          rating: 4.93,
          bookingsCount: '890 K bookings',
          videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          videoPoster: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
          promisePoints: [
            '100% Odorless Herbal Gels & Sprays',
            'Govt Approved Safe Chemicals',
            '5-Year Written Termite Warranty',
            'Zero Kitchen Dismantling Needed',
          ],
          subServices: [
            {
              id: 'cockroach-herbal',
              label: 'Cockroach Herbal Shield',
              thumbnailUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: '90-Day Rework',
                title: 'Herbal Cockroach & Pest Shield',
                price: 799,
                originalPrice: 1199,
                subtitle: 'Odorless Maxforce gel dot treatment for kitchen & washrooms',
                image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['pest-control-herbal-shield'],
            },
            {
              id: 'termite-barrier',
              label: 'Anti-Termite 5-Yr Drill',
              thumbnailUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: '5-Yr Warranty',
                title: 'Anti-Termite Drill-Fill-Seal Wood Barrier',
                price: 2199,
                originalPrice: 3200,
                subtitle: 'Govt approved chemical barrier injected into skirting & door frames',
                image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['termite-drill-barrier-treatment'],
            },
            {
              id: 'bed-bugs-treatment',
              label: 'Bed Bugs 2-Visit Heat',
              discountBadge: 'Intensive',
              promoBanner: {
                badge: '100% Elimination',
                title: 'Bed Bugs Intensive Thermal & Chemical Treatment',
                price: 1499,
                originalPrice: 2199,
                subtitle: '2-visit protocol targeting hidden mattresses, seams & headboards',
                image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['bed-bugs-intensive-treatment'],
            },
            {
              id: 'mosquito-fogging',
              label: 'Mosquito Cold Fogging',
              thumbnailUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Safe Misting',
                title: 'Mosquito & Vector Cold Fogging Treatment',
                price: 699,
                originalPrice: 999,
                subtitle: 'Dengue & malaria prevention fine misting for indoor & balconies',
                image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['mosquito-fly-fogging-shield', 'pest-control-herbal-shield'],
            },
            {
              id: 'rodent-rat-control',
              label: 'Rodent Bait Defense',
              discountBadge: 'Bait Stations',
              promoBanner: {
                badge: 'Tamper Proof',
                title: 'Rodent & Rat Proofing Bait Station Defense',
                price: 899,
                originalPrice: 1299,
                subtitle: 'Lockable bait boxes & entry-point metal mesh sealing',
                image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['rodent-rat-proofing-control', 'pest-control-herbal-shield'],
            },
          ],
        };

      case 'carpentry':
        return {
          headline: 'Master Carpentry & Furniture Fix',
          earliestSlot: 'Today, 2:30 PM',
          rating: 4.91,
          bookingsCount: '1.1 M bookings',
          videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          videoPoster: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
          promisePoints: [
            'Precision Laser & Router Tooling',
            'Genuine Heavy-Duty Soft-Close Fittings',
            '90-Minute Express Doorstep Visit',
            '30-Day Free Rework Guarantee',
          ],
          subServices: [
            {
              id: 'furniture-assembly',
              label: 'Furniture & Lock Assembly',
              thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Best value',
                title: 'Furniture Assembly & Door Lock Setup',
                price: 499,
                originalPrice: 799,
                subtitle: 'Precision alignment for IKEA, Pepperfry, beds & mortise locks',
                image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['furniture-assembly-doorlock', 'smart-locks-installation'],
            },
            {
              id: 'hinge-drawer-fix',
              label: 'Door Hinges & Drawers',
              thumbnailUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Smooth Glide',
                title: 'Sagging Door Hinge & Telescopic Rail Fix',
                price: 249,
                originalPrice: 399,
                subtitle: 'Soft-close hinge calibration & ball-bearing drawer channel renewal',
                image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['carpentry-hinge-drawer-fix'],
            },
            {
              id: 'door-locks-latches',
              label: 'Locks & Mortise Latches',
              thumbnailUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'High Security',
                title: 'Godrej Mortise Lock & Brass Handle Fitting',
                price: 349,
                originalPrice: 499,
                subtitle: 'Chisel mortise cavity, key cylinder replacement & strike plate adjustment',
                image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['godrej-mortise-lock-install', 'furniture-assembly-doorlock'],
            },
            {
              id: 'drill-wall-hangings',
              label: 'Drill & Wall Hangings',
              discountBadge: 'Precision Fit',
              promoBanner: {
                badge: 'Zero Tilt',
                title: 'Drill & Hang: Curtain Rods, Mirrors & Artworks',
                price: 199,
                originalPrice: 299,
                subtitle: 'Heavy-duty wall anchors, level alignment & concealed cable drill detection',
                image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['curtain-rod-mirror-wall-hang', 'furniture-assembly-doorlock'],
            },
            {
              id: 'sliding-wardrobe-wheels',
              label: 'Sliding Wardrobe Tracks',
              thumbnailUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Effortless Roll',
                title: 'Sliding Wardrobe Roller Wheels & Aluminum Track Fix',
                price: 399,
                originalPrice: 599,
                subtitle: 'Heavy nylon roller bearing replacement & de-railed track leveling',
                image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['sliding-wardrobe-roller-fix', 'carpentry-hinge-drawer-fix'],
            },
            {
              id: 'furniture-polish',
              label: 'Furniture Clean & Wax',
              discountBadge: '15% OFF',
              promoBanner: {
                badge: '15% OFF',
                title: 'Furniture Clean, Polish & Beeswax Shine',
                price: 899,
                originalPrice: 1299,
                subtitle: 'Carnauba beeswax nourishment & scratch blemish masking',
                image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['furniture-clean-and-shine'],
            },
          ],
        };

      case 'appliance':
        return {
          headline: 'Appliance Repair & Gas Stove Chimney',
          earliestSlot: 'Today, 4:30 PM',
          rating: 4.88,
          bookingsCount: '1.5 M bookings',
          videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          videoPoster: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
          promisePoints: [
            'Certified Multi-Brand Technicians',
            '100% Genuine OEM Spare Parts',
            'Upfront Fixed Quotations',
            '90-Day Parts & Service Warranty',
          ],
          subServices: [
            {
              id: 'gas-stove-chimney',
              label: 'Gas Stove & Chimney',
              thumbnailUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Best value',
                title: 'Gas Stove & Chimney Repair',
                price: 699,
                originalPrice: 999,
                subtitle: 'Baffle filter caustic degrease & flame nozzle restoration',
                image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['gas-stove-chimney-deep-clean', 'appliance-repair-geyser-wm-fridge'],
            },
            {
              id: 'wm-fridge',
              label: 'Washing Machine & Fridge',
              thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Genuine Parts',
                title: 'Appliance Repair (Washing Machine & Fridge)',
                price: 299,
                originalPrice: 499,
                subtitle: 'Drum vibration, cooling coil & thermostat root fix',
                image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['appliance-repair-geyser-wm-fridge'],
            },
            {
              id: 'water-purifier',
              label: 'Native M3 Pro Smart RO',
              discountBadge: '15% OFF',
              promoBanner: {
                badge: '3-Yr Filter Guard',
                title: 'UrgentLyfe Native M3 Pro RO',
                price: 399,
                originalPrice: 599,
                subtitle: 'Filter check, membrane flush & TDS water testing',
                image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['ro-water-purifier-repair', 'ro-water-purifier-native-m3'],
            },
            {
              id: 'microwave-otg',
              label: 'Microwave & OTG Oven',
              thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Rapid Heating',
                title: 'Microwave Oven Magnetron & Spark Fix',
                price: 349,
                originalPrice: 549,
                subtitle: 'High voltage diode, mica plate replacement & turntable motor check',
                image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['microwave-otg-repair-service', 'appliance-repair-geyser-wm-fridge'],
            },
            {
              id: 'geyser-water-heater',
              label: 'Water Geyser & Heater',
              discountBadge: 'No Shock',
              promoBanner: {
                badge: 'Hot Water',
                title: 'Geyser Heating Element & Descaling',
                price: 399,
                originalPrice: 599,
                subtitle: 'Heavy copper element replacement, thermostat cutoff & tank descaling',
                image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['geyser-element-thermostat-repair', 'appliance-repair-geyser-wm-fridge'],
            },
            {
              id: 'air-cooler-repair',
              label: 'Desert Air Cooler Fix',
              thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Instant Chill',
                title: 'Air Cooler Motor, Pump & Honeycomb Pad Service',
                price: 299,
                originalPrice: 449,
                subtitle: 'Submersible water pump replacement, motor rewinding & pad descaling',
                image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['air-cooler-motor-pump-repair', 'appliance-repair-geyser-wm-fridge'],
            },
          ],
        };

      case 'spa-women':
        return {
          headline: 'Spa Prime',
          earliestSlot: 'Mon, 8:00 AM',
          rating: 4.82,
          bookingsCount: '1.6 M bookings',
          videoSrc: 'https://vjs.zencdn.net/v/oceans.mp4',
          videoPoster: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
          promisePoints: [
            '4.5+ Rated Therapists',
            'Relaxation Assured',
            'Specialized Premium Oils',
            'Single-Use Sanitized Kits',
          ],
          subServices: [
            {
              id: 'stress-relief',
              label: 'Stress relief',
              thumbnailUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Medium pressure',
                title: 'Let go of that built-up stress',
                price: 1119,
                originalPrice: 1499,
                subtitle: 'A soothing full body experience for total relaxation',
                image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['spa-stress-relief-swedish', 'spa-swedish-with-foot'],
            },
            {
              id: 'pain-relief',
              label: 'Pain relief',
              thumbnailUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Medium-high pressure',
                title: 'Targeted pain relief for body',
                price: 929,
                originalPrice: 1199,
                subtitle: 'Deep tissue therapy & targeted relief for lower back, spine & legs',
                image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: [
                'spa-deep-tissue',
                'spa-deep-tissue-with-foot',
                'spa-back-relief',
                'spa-leg-relief',
                'women-leg-relief-massage',
              ],
            },
            {
              id: 'skin-care-scrubs',
              label: 'Skin care scrubs',
              thumbnailUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Exfoliation',
                title: 'Exfoliate & rejuvenate',
                price: 1699,
                originalPrice: 2299,
                subtitle: 'Removes dead skin & leaves skin soft, smooth & hydrated',
                image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['spa-full-body-scrub', 'spa-body-polishing-glow'],
            },
            {
              id: 'post-natal',
              label: 'Post-natal',
              thumbnailUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Maternity Care',
                title: 'Gentle restorative care for new mothers',
                price: 1369,
                originalPrice: 1799,
                subtitle: 'Tones abdominal muscles, relieves lower back strain & aids recovery',
                image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['spa-post-natal', 'spa-post-natal-belly-care'],
            },
            {
              id: 'elderly-care',
              label: 'Elderly care',
              thumbnailUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Newly Launched',
                title: 'Comfort & mobility for seniors',
                price: 1399,
                originalPrice: 1799,
                subtitle: 'Light-pressure full body massage easing senior aches, promoting restful sound sleep',
                image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['spa-elderly-care', 'spa-gentle-joint-mobility'],
            },
            {
              id: 'add-ons',
              label: 'Add-ons',
              thumbnailUrl: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Extra Pampering',
                title: 'Add extra pampering to your booking',
                price: 349,
                originalPrice: 449,
                subtitle: 'Foot reflexology, head & shoulder massage, scrubs & stretch therapy',
                image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: [
                'spa-foot-massage',
                'spa-head-shoulder',
                'spa-head-massage',
                'spa-face-massage',
                'spa-scrub-addon',
                'spa-stretch-therapy',
              ],
            },
          ],
        };

      case 'salon':
        return {
          headline: 'Luxury Ayurvedic Salon & Spa at Home',
          earliestSlot: 'Today, 5:00 PM',
          rating: 4.96,
          bookingsCount: '3.2 M bookings',
          videoSrc: 'https://vjs.zencdn.net/v/oceans.mp4',
          videoPoster: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
          promisePoints: [
            '100% Single-Use Sealed Hygiene Kits',
            'Certified Female Therapists & Estheticians',
            'Premium Cheryls / Forest Essentials™ Products',
            'Mess-Free Clean-Up Guarantee',
          ],
          subServices: [
            {
              id: 'spa-massage',
              label: 'Spa & Massage for Women',
              thumbnailUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Best value',
                title: 'Spa & Massage for Women',
                price: 1499,
                originalPrice: 2199,
                subtitle: 'Deep tissue aromatherapy, Swedish relaxing massage & steam',
                image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['spa-massage-for-women', 'forest-essentials-luxury-facial'],
            },
            {
              id: 'facial-haircut',
              label: 'Facial & Haircut Package',
              thumbnailUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Radiant Glow',
                title: 'Glowing Skin Facial & Hair Style',
                price: 1299,
                originalPrice: 1999,
                subtitle: 'Cheryls / O3+ facial, style haircut & brow threading',
                image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['haircut-glowing-facial-at-home', 'forest-essentials-luxury-facial'],
            },
            {
              id: 'men-grooming',
              label: "Men's Haircut & Beard",
              thumbnailUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Master Barber',
                title: "Men's Haircut, Beard Sculpt & Head Massage",
                price: 349,
                originalPrice: 499,
                subtitle: 'Precision fade haircut, beard trim with hot towel & cooling head massage',
                image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['men-haircut-beard-styling-grooming', 'express-doorstep-haircut-grooming'],
            },
            {
              id: 'waxing-pedicure',
              label: 'Waxing & Pedicure',
              discountBadge: '20% OFF',
              promoBanner: {
                badge: '20% OFF',
                title: 'Express Doorstep Grooming & Waxing',
                price: 349,
                originalPrice: 499,
                subtitle: 'Rica roll-on waxing, manicure & sanitized pedicure kit',
                image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['express-doorstep-haircut-grooming', 'haircut-glowing-facial-at-home'],
            },
            {
              id: 'hair-spa-keratin',
              label: 'Hair Spa & Keratin',
              thumbnailUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=200&q=80',
              promoBanner: {
                badge: 'Silky Shine',
                title: "L'Oreal Professional Deep Nourish Hair Spa",
                price: 899,
                originalPrice: 1299,
                subtitle: 'Hydrating mask, ozone hair steam & scalp follicle revitalizer',
                image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['hair-spa-keratin-nourish', 'haircut-glowing-facial-at-home'],
            },
            {
              id: 'forest-luxury-facial',
              label: 'Forest Essentials™ Facial',
              discountBadge: 'Pure Ayurvedic',
              promoBanner: {
                badge: 'Gold Glow',
                title: 'Forest Essentials™ Tejasvi Ayurvedic Facial',
                price: 1799,
                originalPrice: 2499,
                subtitle: '24K gold bhasma, saffron oil massage & herbal steam pack',
                image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80',
              },
              filterServiceIds: ['forest-essentials-luxury-facial', 'spa-massage-for-women'],
            },
          ],
        };

      case 'carpentry-painting':
        return getCategoryConfig('carpentry');

      default:
        return {
          headline: `${category.name} in ${selectedCityName}`,
          earliestSlot: 'Today, 3:30 PM',
          rating: 4.88,
          bookingsCount: '1.2 M bookings',
          videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          videoPoster: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
          promisePoints: [
            'Verified Background Checked Technicians',
            'Standardized Upfront Transparent Pricing',
            '30-Minute SOS Dispatch Available',
            '30-Day Free Rework Guarantee',
          ],
          subServices: [
            {
              id: 'standard-service',
              label: 'Standard Packages',
              promoBanner: {
                badge: 'Best value',
                title: category.name,
                price: 499,
                originalPrice: 799,
                subtitle: 'Certified technician visit with 30-day happiness warranty',
                image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
              },
            },
          ],
        };
    }
  };

  const config = getCategoryConfig(category.id);

  // Active sub-service selection (e.g. "Full apartment")
  const [selectedSubServiceId, setSelectedSubServiceId] = useState<string>(() => {
    if (initialSubService) {
      const match = config.subServices.find((s) => s.id === initialSubService || s.id.includes(initialSubService));
      if (match) return match.id;
    }
    return config.subServices[0]?.id || 'full-apartment';
  });

  // Keep state in sync if category changes
  useEffect(() => {
    if (initialSubService) {
      const match = config.subServices.find((s) => s.id === initialSubService || s.id.includes(initialSubService));
      if (match) {
        setSelectedSubServiceId(match.id);
        return;
      }
    }
    setSelectedSubServiceId(config.subServices[0]?.id || 'full-apartment');
  }, [category.id, initialSubService]);

  const activeSubService =
    config.subServices.find((s) => s.id === selectedSubServiceId) || config.subServices[0];

  // Filter services to show in the list
  const categoryServices = services.filter((srv) => {
    if (srv.categoryId === category.id) return true;
    if (category.id === 'spa-women' && (srv.categoryId === 'spa-women' || srv.id.startsWith('spa-') || srv.id.includes('leg-relief'))) return true;
    if (category.id === 'salon' && (srv.categoryId === 'salon' || srv.id.startsWith('spa-'))) return true;
    return false;
  });

  const displayedServices = services.filter((srv) => {
    if (activeSubService?.filterServiceIds && activeSubService.filterServiceIds.length > 0) {
      return activeSubService.filterServiceIds.includes(srv.id);
    }
    return srv.categoryId === category.id;
  });

  // Fallback to all category services if filter produces 0
  const finalServiceList = displayedServices.length > 0 ? displayedServices : categoryServices;

  const heroService = finalServiceList[0] || categoryServices[0];
  const currentVideoSrc = heroService?.videoUrl || config.videoSrc;
  const currentVideoPoster = heroService?.videoPoster || config.videoPoster;

  // Cart quantity helper
  const getCartQuantity = (serviceId: string) => {
    const found = cartItems.find((item) => item.service.id === serviceId);
    return found ? found.quantity : 0;
  };

  // Cart total sum
  const cartTotal = cartItems.reduce((acc, item) => acc + item.service.price * item.quantity, 0);

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle audio
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    } else {
      setIsMuted(!isMuted);
    }
  };

  // Handle video time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 30;
      setVideoProgress((current / total) * 100);

      const curM = Math.floor(current / 60);
      const curS = Math.floor(current % 60);
      const totM = Math.floor(total / 60);
      const totS = Math.floor(total % 60);

      setVideoTime(
        `${curM}:${curS < 10 ? '0' : ''}${curS} / ${totM}:${totS < 10 ? '0' : ''}${totS}`
      );
    }
  };

  // If category is Makeup, Saree & Styling, render the dedicated MakeupStylingCategoryView matching the video
  if (
    category.id === 'makeup-saree-styling' ||
    category.id === 'makeup' ||
    category.id === 'saree-draping' ||
    category.slug === 'makeup-saree-styling' ||
    category.name.toLowerCase().includes('makeup') ||
    category.name.toLowerCase().includes('saree') ||
    category.name.toLowerCase().includes('styling')
  ) {
    return (
      <MakeupStylingCategoryView
        cartItems={cartItems}
        onAddToCart={onAddToCart}
        onUpdateCartQuantity={onUpdateCartQuantity}
        onBookNow={onBookNow}
        onSelectServiceDetail={onSelectServiceDetail}
        onClose={onClose}
        selectedCityName={selectedCityName}
        selectedLocality={selectedLocality}
      />
    );
  }

  // If category is Hair Studio for Women, render the dedicated HairStudioCategoryView matching the video
  if (
    category.id === 'hair-studio-women' ||
    category.id === 'hair-studio' ||
    category.id === 'hair-studio-for-women' ||
    category.slug === 'hair-studio-for-women' ||
    category.name.toLowerCase().includes('hair studio')
  ) {
    return (
      <HairStudioCategoryView
        cartItems={cartItems}
        onAddToCart={onAddToCart}
        onUpdateCartQuantity={onUpdateCartQuantity}
        onBookNow={onBookNow}
        onSelectServiceDetail={onSelectServiceDetail}
        onClose={onClose}
        selectedCityName={selectedCityName}
        selectedLocality={selectedLocality}
      />
    );
  }

  // If category is Spa for Women, render the dedicated SpaWomenCategoryView matching the video
  if (
    category.id === 'spa-women' ||
    category.id === 'spa' ||
    category.id === 'spa-for-women' ||
    category.slug === 'spa-for-women' ||
    category.name.toLowerCase().includes('spa for women') ||
    category.name.toLowerCase().includes('massage therapy for women')
  ) {
    return (
      <SpaWomenCategoryView
        cartItems={cartItems}
        onAddToCart={onAddToCart}
        onUpdateCartQuantity={onUpdateCartQuantity}
        onBookNow={onBookNow}
        onSelectServiceDetail={onSelectServiceDetail}
        onClose={onClose}
        selectedCityName={selectedCityName}
        selectedLocality={selectedLocality}
      />
    );
  }

  // If category is Salon for Women, render the dedicated SalonWomenCategoryView matching both videos
  if (
    category.id === 'salon' ||
    category.id === 'salon-women' ||
    category.id === 'salon-for-women'
  ) {
    const isLuxe =
      initialSubService === 'luxe' ||
      initialSubService?.startsWith('luxe-') ||
      initialSubService?.toLowerCase().includes('luxe');
    const matchedSubCategory =
      initialSubService === 'prime' || initialSubService?.toLowerCase().includes('prime')
        ? 'prime-derma-facials'
        : isLuxe
        ? 'luxe-forest-essentials'
        : initialSubService;

    return (
      <SalonWomenCategoryView
        initialTier={isLuxe ? 'luxe' : 'prime'}
        initialSubCategory={matchedSubCategory}
        cartItems={cartItems}
        onAddToCart={onAddToCart}
        onUpdateCartQuantity={onUpdateCartQuantity}
        onBookNow={onBookNow}
        onSelectServiceDetail={onSelectServiceDetail}
        onClose={onClose}
        selectedCityName={selectedCityName}
        selectedLocality={selectedLocality}
      />
    );
  }

  // If category is Men's Salon & Massage, render SalonMenCategoryView
  if (
    category.id === 'salon-men' ||
    category.id === 'men-salon' ||
    category.id === 'massage-men' ||
    category.id === 'massage-for-men'
  ) {
    const isPrime =
      initialSubService === 'prime' ||
      initialSubService?.toLowerCase().includes('prime');
    const isMassage =
      category.id === 'massage-men' ||
      category.id === 'massage-for-men' ||
      initialSubService === 'massage' ||
      initialSubService === 'massage-men' ||
      initialSubService?.toLowerCase().includes('massage');

    if (isMassage) {
      return (
        <MassageMenCategoryView
          cartItems={cartItems}
          onAddToCart={onAddToCart}
          onUpdateCartQuantity={onUpdateCartQuantity}
          onBookNow={onBookNow}
          onSelectServiceDetail={onSelectServiceDetail}
          onClose={onClose}
          selectedCityName={selectedCityName}
          selectedLocality={selectedLocality}
        />
      );
    }

    return (
      <SalonMenCategoryView
        initialTier={isPrime ? 'prime' : 'royale'}
        initialFilter="all"
        cartItems={cartItems}
        onAddToCart={onAddToCart}
        onUpdateCartQuantity={onUpdateCartQuantity}
        onBookNow={onBookNow}
        onSelectServiceDetail={onSelectServiceDetail}
        onClose={onClose}
        onOpenPreferenceModal={onOpenPreferenceModal}
        selectedCityName={selectedCityName}
        selectedLocality={selectedLocality}
      />
    );
  }

  // If category is Cleaning & Pest Control (or bathroom-cleaning, kitchen-cleaning, etc.)
  if (
    category.id === 'cleaning' ||
    category.id === 'pest-control' ||
    category.id === 'cleaning-pest' ||
    category.id === 'cleaning-pest-control' ||
    category.id === 'bathroom-cleaning' ||
    category.id === 'kitchen-cleaning' ||
    category.id === 'living-bedroom-cleaning' ||
    category.id === 'full-home-cleaning' ||
    category.id === 'termite-control' ||
    category.id === 'leak-gap-sealing' ||
    category.id === 'tile-grouting'
  ) {
    const subCat = initialSubService || category.id;
    return (
      <CleaningPestCategoryView
        initialCategoryId={subCat}
        cartItems={cartItems}
        onAddToCart={onAddToCart}
        onUpdateCartQuantity={onUpdateCartQuantity}
        onBookNow={onBookNow}
        onSelectServiceDetail={onSelectServiceDetail}
        onClose={onClose}
        selectedCityName={selectedCityName}
        selectedLocality={selectedLocality}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] pb-24 text-slate-900">
      {/* 1. TOP STICKY BAR: BACK BUTTON & BREADCRUMB */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 -ml-1 rounded-xl text-slate-700 hover:text-black hover:bg-slate-100 transition-colors flex items-center gap-1.5 font-bold text-xs sm:text-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate">
              <span>Home</span>
              <span>/</span>
              <span className="font-semibold text-slate-900 truncate">{config.headline}</span>
            </div>
          </div>

          {/* Location Badge */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full shrink-0">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold text-slate-900">{selectedLocality}</span>
            <span className="text-slate-400">, {selectedCityName}</span>
          </div>
        </div>

        {/* Other Categories Switcher Ribbon */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto scrollbar-none flex items-center gap-2 border-t border-slate-100">
          {allCategories.map((cat) => {
            const isActive = cat.id === category.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectOtherCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-8">
        {/* ========================================================================= */}
        {/* 2. TOP HERO SECTION (SCREENSHOT 2 EXACT LAYOUT) */}
        {/* Left: Title, Earliest badge, Rating, "Select a service" tiles */}
        {/* Right: Real Interactive Video Player with UL logo badge & scrubber */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Title + Earliest + Select a service box */}
          <div className="lg:col-span-6 space-y-6">
            {/* Title & Earliest Slot */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {config.headline}
                </h1>

                {/* Earliest Slot Pill (Screenshot 2: Green pill) */}
                <div className="inline-flex items-center gap-1.5 bg-[#eefaf4] border border-[#d1f2e1] text-[#0f8b4d] px-3 py-1 rounded-md text-xs font-bold shrink-0">
                  <Clock className="w-3.5 h-3.5 text-[#0f8b4d]" />
                  <span>Earliest | {config.earliestSlot}</span>
                </div>
              </div>

              {/* Rating & Bookings (Screenshot 2: 4.81 (1.7 M bookings)) */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-1 font-bold text-slate-900">
                  <Star className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
                  <span>{config.rating.toFixed(2)}</span>
                </div>
                <span className="border-b border-dotted border-slate-400 text-slate-600">
                  ({config.bookingsCount})
                </span>
              </div>
            </div>

            {/* "Select a service" Box (Screenshot 2 exact box) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Select a service
                </span>
                <span className="text-[11px] text-blue-600 font-bold">
                  {config.subServices.length} Options Available
                </span>
              </div>

              {/* Sub-service visual tiles row */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {config.subServices.map((sub) => {
                  const isSelected = sub.id === selectedSubServiceId;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setSelectedSubServiceId(sub.id)}
                      className={`flex flex-col items-center text-center p-2 rounded-xl transition-all cursor-pointer group ${
                        isSelected
                          ? 'ring-2 ring-black bg-slate-50/80 shadow-xs'
                          : 'hover:bg-slate-50 border border-transparent hover:border-slate-200'
                      }`}
                    >
                      {/* Image Thumbnail or Discount Badge Icon */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 mb-2 border border-slate-200/80 flex items-center justify-center shrink-0 relative">
                        {sub.thumbnailUrl ? (
                          <img
                            src={sub.thumbnailUrl}
                            alt={sub.label}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                            onError={(e) => handleImageError(e, 'service')}
                          />
                        ) : sub.discountBadge ? (
                          <div className="w-full h-full bg-emerald-50 text-emerald-700 flex flex-col items-center justify-center font-black text-xs leading-none">
                            <span className="text-sm font-extrabold text-emerald-700">10%</span>
                            <span className="text-[9px] uppercase tracking-wider text-emerald-600 font-bold mt-0.5">
                              OFF
                            </span>
                          </div>
                        ) : (
                          <Sparkles className="w-6 h-6 text-blue-600" />
                        )}

                        {/* Top tag if discount badge exists on top of thumbnail */}
                        {sub.thumbnailUrl && sub.discountBadge && (
                          <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[9px] font-bold px-1 rounded-xs">
                            {sub.discountBadge}
                          </span>
                        )}
                      </div>

                      {/* Label */}
                      <span
                        className={`text-[11px] leading-tight line-clamp-2 ${
                          isSelected ? 'font-bold text-slate-900' : 'font-medium text-slate-700'
                        }`}
                      >
                        {sub.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: 30-SECOND SERVICE EXPLAINER VIDEO PLAYER SHOWCASE */}
          <div className="lg:col-span-6">
            <ServiceVideoPlayer
              key={heroService?.id || category.id}
              title={heroService?.title || config.headline}
              subtitle={activeSubService?.promoBanner?.subtitle || `Expert ${category.name} in 4 certified steps`}
              categoryName={category.name}
              posterImage={currentVideoPoster}
              workSteps={heroService?.workSteps}
              toolsUsed={heroService?.toolsUsed}
              autoPlay={true}
              className="w-full"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. BOTTOM SECTION (SCREENSHOT 3 EXACT LAYOUT) */}
        {/* Left: Sub-service heading, Best value hero card, Service packages */}
        {/* Right: UL Promise card, Cart card */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-slate-200">
          {/* Main Left Content: Packages list */}
          <div className="lg:col-span-8 space-y-6">
            {/* Sub-Service Heading (Screenshot 3: "Full apartment") */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {activeSubService?.label || 'Full apartment'}
              </h2>
            </div>

            {/* Best Value Promotional Hero Card (Screenshot 3 exact card) */}
            {activeSubService?.promoBanner && (
              <div className="bg-[#f8f9fa] rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs relative overflow-hidden">
                <div className="space-y-2 z-10 max-w-md">
                  {/* Badge */}
                  <div className="inline-block bg-[#0f8b4d] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm">
                    {activeSubService.promoBanner.badge || 'Best value'}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    {activeSubService.promoBanner.title}
                  </h3>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                      Starts at ₹{activeSubService.promoBanner.price.toLocaleString('en-IN')}
                    </span>
                    {activeSubService.promoBanner.originalPrice && (
                      <span className="text-xs sm:text-sm text-slate-400 line-through">
                        ₹{activeSubService.promoBanner.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Subtext */}
                  <p className="text-xs text-slate-500 font-normal">
                    {activeSubService.promoBanner.subtitle}
                  </p>
                </div>

                {/* Right Image: Floor scrubber machine buffer */}
                <div className="w-48 sm:w-56 aspect-4/3 rounded-xl overflow-hidden shrink-0 border border-slate-200/80 shadow-xs bg-white">
                  <img
                    src={activeSubService.promoBanner.image}
                    alt={activeSubService.promoBanner.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => handleImageError(e, 'service')}
                  />
                </div>
              </div>
            )}

            {/* Service Package Cards List (Screenshot 3 exact layout) */}
            <div className="space-y-5 pt-2">
              {finalServiceList.map((service) => {
                const cartQty = getCartQuantity(service.id);
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4 hover:border-slate-300 transition-colors"
                  >
                    {/* Top Row: Title, Rating, Price, Add Button */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          {service.title}
                        </h4>

                        {/* Rating with purple circular star badge */}
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#6a3cb5] text-white text-[10px]">
                            ★
                          </span>
                          <span className="font-semibold text-slate-700">
                            {service.rating.toFixed(2)}
                          </span>
                          <span className="text-slate-400">
                            ({service.reviewCount.toLocaleString('en-IN')} reviews)
                          </span>
                        </div>

                        {/* Pricing & Duration (Screenshot 3: Starts at ₹3,199 • 3 hrs) */}
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-900 pt-0.5">
                          <span>Starts at ₹{service.price.toLocaleString('en-IN')}</span>
                          {service.originalPrice && (
                            <span className="text-xs text-slate-400 line-through font-normal">
                              ₹{service.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500 font-normal">
                            {service.durationMinutes ? `${Math.round(service.durationMinutes / 60 * 10) / 10} hrs` : '2 hrs'}
                          </span>
                        </div>
                      </div>

                      {/* Add Button or Stepper (Screenshot 3: White button with purple border) */}
                      <div className="shrink-0">
                        {cartQty === 0 ? (
                          <button
                            type="button"
                            onClick={() => onAddToCart(service)}
                            className="px-6 py-2 rounded-lg border border-[#7a4ecb] text-[#6b35bf] hover:bg-[#f6f2fd] font-bold text-xs sm:text-sm transition-all shadow-2xs active:scale-95 cursor-pointer"
                          >
                            Add
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 bg-[#f6f2fd] border border-[#7a4ecb] text-[#6b35bf] rounded-lg px-2 py-1 shadow-2xs font-bold text-xs sm:text-sm">
                            <button
                              type="button"
                              onClick={() => onUpdateCartQuantity(service.id, -1)}
                              className="p-1 hover:bg-[#ebdffc] rounded-md transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-5 text-center">{cartQty}</span>
                            <button
                              type="button"
                              onClick={() => onUpdateCartQuantity(service.id, 1)}
                              className="p-1 hover:bg-[#ebdffc] rounded-md transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Dotted Divider */}
                    <div className="border-t border-dotted border-slate-200" />

                    {/* Bullet Points Checklist (Screenshot 3 bullets) */}
                    <div className="space-y-1.5 text-xs text-slate-600">
                      {service.includes && service.includes.length > 0 ? (
                        service.includes.slice(0, 3).map((inc, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-slate-400">•</span>
                            <span>{inc}</span>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="flex items-start gap-2">
                            <span className="text-slate-400">•</span>
                            <span>Cleaning &amp; stain removal from rooms, kitchen, bathroom &amp; balcony</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-slate-400">•</span>
                            <span>Machine floor scrubbing &amp; dusting of walls &amp; ceilings</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* View Details & Watch Demo Links */}
                    <div className="pt-1 flex items-center justify-between gap-3 flex-wrap">
                      <button
                        type="button"
                        onClick={() => onSelectServiceDetail(service)}
                        className="text-xs font-bold text-[#6b35bf] hover:underline cursor-pointer"
                      >
                        View details
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectServiceDetail(service)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold transition-colors cursor-pointer border border-purple-200/70"
                      >
                        <Play className="w-3 h-3 fill-current text-purple-700" />
                        <span>Watch Demo ({service.workSteps?.length || 4} Steps)</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Sidebar: UL Promise + Cart Widget (Screenshot 3 exact layout) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-36">
            {/* UL Promise Card (Screenshot 3: Checkmarks) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs relative overflow-hidden space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-slate-900">UL Promise</h3>
                {/* Sparkle circular badge */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-200 via-sky-200 to-emerald-200 flex items-center justify-center text-xs shadow-2xs">
                  ✨
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700">
                {config.promisePoints.map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-slate-900 stroke-[2.5] shrink-0" />
                    <span className="font-medium">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Widget Card (Screenshot 3: Empty trolley or items) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs text-center space-y-4">
              {cartItems.length === 0 ? (
                /* Empty Cart State (Screenshot 3: Cute trolley icon + "No items in your cart") */
                <div className="py-6 flex flex-col items-center justify-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
                    <ShoppingCart className="w-8 h-8 text-slate-300 stroke-[1.5]" />
                  </div>
                  <p className="text-sm text-slate-500 font-medium">No items in your cart</p>
                </div>
              ) : (
                /* Populated Cart State */
                <div className="text-left space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="text-sm font-bold text-slate-900">
                      Your Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                    </h4>
                    <span className="text-xs font-semibold text-emerald-600">Free Warranty</span>
                  </div>

                  {/* Items list */}
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div
                        key={item.service.id}
                        className="flex items-center justify-between gap-2 text-xs border-b border-slate-50 pb-2"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-slate-800 truncate">{item.service.title}</p>
                          <p className="text-slate-400">
                            ₹{item.service.price.toLocaleString('en-IN')} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 bg-slate-100 rounded-md px-1.5 py-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateCartQuantity(item.service.id, -1)}
                            className="text-slate-600 hover:text-black"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-slate-800 text-[11px] px-1">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateCartQuantity(item.service.id, 1)}
                            className="text-slate-600 hover:text-black"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Subtotal */}
                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between font-bold text-sm text-slate-900">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Book / Checkout Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (cartItems.length > 0) {
                        onBookNow(cartItems[0].service, false);
                      }
                    }}
                    className="w-full py-3 bg-black hover:bg-neutral-800 text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Book</span>
                    <span>•</span>
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </button>

                  <p className="text-[10px] text-center text-slate-400">
                    30-Day Happiness Guarantee &amp; ₹0 Rework included
                  </p>
                </div>
              )}
            </div>

            {/* Quick Emergency Assistance Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-900">Need urgent help?</p>
                <p className="text-slate-500">Call our 24x7 SOS Home Helpdesk at 1800-URGENT</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. FREQUENTLY ASKED QUESTIONS */}
        <div className="pt-8 border-t border-slate-200 space-y-4">
          <h3 className="text-xl font-extrabold text-slate-900">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {[
              {
                q: 'What is included in the deep cleaning / service package?',
                a: 'Every package covers end-to-end execution with professional single-disc machines, verified safe chemicals, sanitized equipment, and 100% dust-free wipe down.',
              },
              {
                q: 'How does the 30-Day Free Rework Guarantee work?',
                a: 'If any issue persists or recurs within 30 days after the service, simply click Request Rework in your dashboard or call us. A senior master technician will visit and resolve it at ₹0 cost.',
              },
              {
                q: 'Are your professionals background-verified?',
                a: 'Yes, 100% of UrgentLyfe partners undergo thorough Aadhaar, police verification, and a 14-day technical certification program before joining.',
              },
            ].map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full text-left p-4 font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
