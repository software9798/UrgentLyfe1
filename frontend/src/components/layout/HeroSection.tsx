import React, { useState, useEffect } from 'react';
import {
  Clock,
  ArrowRight,
  ShieldCheck,
  Star,
  Award,
  Wrench,
  Zap,
} from 'lucide-react';
import {
  AcApplianceVisual,
  InstaHelpVisual,
  WomensSalonVisual,
  CarpenterToolsVisual,
  CleaningPestVisual,
  HomePaintingVisual,
  MensSalonVisual,
  WallPanelsVisual,
  EmergencyRepairsVisual,
  OtherServicesVisual,
} from './Category3DVisuals';

interface HeroSectionProps {
  selectedCityName: string;
  selectedLocality?: string;
  selectedCategoryId?: string;
  onSelectCategory: (categoryId: string) => void;
  onOpenApplianceRepair?: () => void;
  onBookService?: () => void;
  onQuickSOS: () => void;
  onOpenAIDoctor: () => void;
  onSearchFocus?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedCityName,
  selectedLocality,
  selectedCategoryId = 'carpentry-painting',
  onSelectCategory,
  onOpenApplianceRepair,
  onBookService,
  onQuickSOS,
  onOpenAIDoctor,
}) => {
  // Local state for active category selection (defaults to Electrician, Plumber & Carpenter as shown in reference image)
  const [activeCatId, setActiveCatId] = useState<string>(
    selectedCategoryId && selectedCategoryId !== 'all' ? selectedCategoryId : 'carpentry-painting'
  );

  useEffect(() => {
    if (selectedCategoryId && selectedCategoryId !== 'all') {
      setActiveCatId(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  // Service category definitions matching exact 3D reference image
  const HERO_CATEGORIES = [
    {
      id: 'ac-appliance',
      name: 'AC & Appliance Repair',
      arrival: '44 mins',
      visual: <AcApplianceVisual className="w-14 h-12 sm:w-16 sm:h-14" />,
      badgeColor: 'bg-[#e0f2fe] text-[#0284c7]',
    },
    {
      id: 'instahelp',
      name: 'InstaHelp',
      arrival: '49 mins',
      visual: <InstaHelpVisual className="w-14 h-12 sm:w-16 sm:h-14" />,
      badgeColor: 'bg-[#fef3c7] text-[#b45309]',
    },
    {
      id: 'salon',
      name: "Women's Salon & Spa",
      arrival: '45 mins',
      visual: <WomensSalonVisual className="w-14 h-12 sm:w-16 sm:h-14" />,
      badgeColor: 'bg-[#e0f2fe] text-[#0284c7]',
    },
    {
      id: 'carpentry-painting',
      name: 'Electrician, Plumber & Carpenter',
      arrival: '55 mins',
      visual: <CarpenterToolsVisual className="w-14 h-12 sm:w-16 sm:h-14" />,
      badgeColor: 'bg-[#ffedd5] text-[#9a3412]',
    },
    {
      id: 'pest-control',
      name: 'Cleaning & Pest Control',
      arrival: '50 mins',
      visual: <CleaningPestVisual className="w-14 h-12 sm:w-16 sm:h-14" />,
      badgeColor: 'bg-[#dcfce7] text-[#15803d]',
    },
    {
      id: 'painting',
      name: 'Home Painting & Upgrade',
      arrival: 'Tomorrow',
      visual: <HomePaintingVisual className="w-14 h-12 sm:w-16 sm:h-14" />,
      badgeColor: 'bg-[#dcfce7] text-[#15803d]',
    },
    {
      id: 'men-salon',
      name: "Men's Salon & Massage",
      arrival: '60 mins',
      visual: <MensSalonVisual className="w-14 h-12 sm:w-16 sm:h-14" />,
      badgeColor: 'bg-[#e0e7ff] text-[#4338ca]',
    },
    {
      id: 'wall-panels',
      name: 'Wall Panels by Revamp',
      arrival: '47 mins',
      visual: <WallPanelsVisual className="w-14 h-12 sm:w-16 sm:h-14" />,
      badgeColor: 'bg-[#ffe4e6] text-[#be123c]',
    },
    {
      id: 'all',
      name: 'Emergency Repairs',
      arrival: '30 mins SOS',
      isSOS: true,
      visual: <EmergencyRepairsVisual className="w-14 h-12 sm:w-16 sm:h-14" />,
      badgeColor: 'bg-[#fee2e2] text-[#dc2626]',
    },
    {
      id: 'appliance',
      name: 'Other Home Services',
      arrival: 'Instant',
      visual: <OtherServicesVisual className="w-14 h-12 sm:w-16 sm:h-14" />,
      badgeColor: 'bg-[#f3e8ff] text-[#7e22ce]',
    },
  ];

  return (
    <section className="relative bg-white pt-6 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Responsive Layout directly matching IMAGE 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Typography + Category Box + Action Buttons */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 pt-2">
            
            {/* Headline Area */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                <span>Verified Professionals in {selectedCityName}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Home services at your doorstep
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                Book verified professionals for AC repair, electrician visits, plumbing fixes, deep cleaning, and salon at home. Transparent upfront pricing with guaranteed 30-min express SOS arrival.
              </p>
            </div>

            {/* Prominent Category Grid Card (Directly matching user's reference image) */}
            <div id="select-category-section" className="bg-white border border-slate-200/90 rounded-[28px] p-4 sm:p-5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between mb-3.5 px-1">
                <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-slate-600">
                  SELECT CATEGORY
                </span>
                <span className="text-xs font-semibold text-blue-600 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" /> Live ETA enabled
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3">
                {HERO_CATEGORIES.map((cat) => {
                  const isSelected = activeCatId === cat.id;
                  const isSOS = cat.isSOS;

                  return (
                    <button
                      key={cat.id + cat.name}
                      onClick={() => {
                        setActiveCatId(cat.id);
                        if (cat.isSOS) {
                          onQuickSOS();
                        } else if (cat.id === 'ac-appliance') {
                          if (onOpenApplianceRepair) {
                            onOpenApplianceRepair();
                          } else {
                            onSelectCategory(cat.id);
                          }
                        } else if (cat.id === 'salon') {
                          onSelectCategory(cat.id);
                        } else {
                          onSelectCategory(cat.id);
                          const el = document.getElementById('services-catalog-grid');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className={`group flex flex-col items-center justify-between p-2 sm:p-2.5 md:p-3 rounded-2xl border transition-all duration-200 cursor-pointer text-center relative hover:-translate-y-0.5 hover:shadow-md min-h-[145px] sm:min-h-[155px] ${
                        isSOS
                          ? 'bg-[#fff1f2] border-[#fecdd3] hover:border-rose-300'
                          : isSelected
                          ? 'bg-[#f0f7ff] border-blue-500 ring-1 ring-blue-400 shadow-xs'
                          : 'bg-white border-slate-200/90 hover:border-slate-300'
                      }`}
                    >
                      {/* 3D Illustration matching reference */}
                      <div className="w-full flex items-center justify-center pt-0.5 pb-1 transition-transform duration-200 group-hover:scale-105">
                        {cat.visual}
                      </div>

                      {/* Live ETA / Time Badge */}
                      <div className="my-0.5">
                        <span
                          className={`inline-block text-[9.5px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-2xs ${cat.badgeColor}`}
                        >
                          {cat.arrival}
                        </span>
                      </div>

                      {/* Category Label */}
                      <span
                        className={`text-[11px] sm:text-xs font-bold leading-tight mt-1 transition-colors px-0.5 ${
                          isSelected
                            ? 'text-slate-950 font-extrabold'
                            : 'text-slate-800 group-hover:text-blue-600'
                        }`}
                      >
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-book-service-btn"
                onClick={onBookService || (() => {
                  const el = document.getElementById('services-catalog-grid');
                  el?.scrollIntoView({ behavior: 'smooth' });
                })}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
              >
                <span>Book a Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-quick-sos-btn"
                onClick={onQuickSOS}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs sm:text-sm px-5 py-3.5 rounded-2xl shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>30-Min Express SOS</span>
              </button>

              <button
                id="hero-ai-diagnostic-btn"
                onClick={onOpenAIDoctor}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs sm:text-sm font-bold px-4 py-3.5 rounded-2xl transition-all cursor-pointer flex items-center gap-2"
              >
                <Wrench className="w-4 h-4 text-indigo-600" />
                <span>Try AI Diagnostic</span>
              </button>
            </div>

            {/* Trust Micro-Metrics */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold text-slate-800">4.9★</span>
                <span>(45,000+ Reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>30-Day Job Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Verified Professionals</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Modern Image Collage Section (Urban Company Style from IMAGE 2) */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative">
              {/* Collage Grid */}
              <div className="grid grid-cols-12 gap-3 sm:gap-4">
                
                {/* 1. Large Tall Left Image (Beauty & Wellness / Doorstep Care) */}
                <div className="col-span-7 relative group overflow-hidden rounded-3xl border border-slate-100 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=700&q=80"
                    alt="Beauty & Wellness at home"
                    className="w-full h-[320px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  {/* Overlay Badge */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 text-white">
                    <span className="bg-white/20 backdrop-blur-md text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Doorstep Salon & Spa
                    </span>
                    <h3 className="text-sm sm:text-base font-black mt-1">Hygienic Beauty Care</h3>
                    <p className="text-[10px] sm:text-xs text-slate-200">100% single-use kits & certified pros</p>
                  </div>
                </div>

                {/* Right Stack: Top Image + Bottom Image */}
                <div className="col-span-5 flex flex-col gap-3 sm:gap-4">
                  
                  {/* 2. Top Right Image (Home Cleaning & Wellness) */}
                  <div className="relative group overflow-hidden rounded-3xl border border-slate-100 shadow-md flex-1">
                    <img
                      src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80"
                      alt="Relaxation and home massage"
                      className="w-full h-[152px] sm:h-[200px] object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                      <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full">
                        MOST POPULAR
                      </span>
                      <p className="text-xs font-bold mt-0.5">Therapy & Relax</p>
                    </div>
                  </div>

                  {/* 3. Bottom Right Image (AC Servicing & Appliance Repair) */}
                  <div className="relative group overflow-hidden rounded-3xl border border-slate-100 shadow-md flex-1">
                    <img
                      src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=80"
                      alt="AC technician servicing unit"
                      className="w-full h-[152px] sm:h-[200px] object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                      <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        FOAM JET TECH
                      </span>
                      <p className="text-xs font-bold mt-0.5">2X Deeper Cooling</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Trust Badge on Image Collage */}
              <div className="absolute -bottom-4 left-6 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
                  <Zap className="w-5 h-5 fill-amber-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-extrabold text-slate-900">30-Min Express Dispatch</span>
                    <span className="bg-rose-100 text-rose-700 text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                      SOS
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Live GPS tracking directly to your doorstep</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
