import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Grid,
  Zap,
  PhoneCall,
  Wrench,
} from 'lucide-react';
import { ApplianceConfig, APPLIANCES_LIST, ApplianceRepairItem } from './ApplianceData';
import { ServiceItem, CartItem } from '../../types';

interface ApplianceDedicatedPageProps {
  appliance: ApplianceConfig;
  onBack: () => void;
  onOpenApplianceGrid: () => void;
  onSelectAnotherAppliance: (appliance: ApplianceConfig) => void;
  cartItems: CartItem[];
  onAddToCart: (service: ServiceItem, isUrgent?: boolean) => void;
  onUpdateCartQuantity: (serviceId: string, delta: number) => void;
  onBookNow: (service: ServiceItem, isUrgent?: boolean) => void;
  selectedCityName: string;
  selectedLocality: string;
}

export const ApplianceDedicatedPage: React.FC<ApplianceDedicatedPageProps> = ({
  appliance,
  onBack,
  onOpenApplianceGrid,
  onSelectAnotherAppliance,
  cartItems,
  onAddToCart,
  onUpdateCartQuantity,
  onBookNow,
  selectedCityName,
  selectedLocality,
}) => {
  const [selectedSymptom, setSelectedSymptom] = useState<string>('all');
  const Visual = appliance.visualComponent;

  // Helper to convert ApplianceRepairItem to ServiceItem for cart & checkout
  const mapToServiceItem = (item: ApplianceRepairItem): ServiceItem => {
    return {
      id: item.id,
      title: item.title,
      subtitle: item.warranty,
      description: item.description,
      price: item.price,
      originalPrice: item.originalPrice,
      discountPercent: item.discountPercentage,
      durationMinutes: parseInt(item.duration) || 45,
      rating: item.rating,
      reviewCount: parseInt(item.reviewsCount.replace(/\D/g, '')) * 1000 || 500,
      categoryId: 'ac-appliance',
      isUrgentAvailable: true,
      image: item.image,
      includes: item.includedPoints,
      tags: ['Appliance Repair', appliance.label, item.warranty],
    };
  };

  // Filter services by selected symptom if any
  const displayedServices =
    selectedSymptom === 'all'
      ? appliance.services
      : appliance.services.filter(
          (s) => s.symptomTags.includes(selectedSymptom) || s.popular
        );

  return (
    <div id="dedicated-appliance-page" className="min-h-screen bg-[#f8fafc] text-slate-900 pb-28">
      {/* Sticky Top Navigation Bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <button
            id="back-to-home-btn"
            onClick={onBack}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 truncate max-w-[180px] sm:max-w-none">
              {appliance.title}
            </span>
          </div>

          <button
            id="switch-appliance-grid-btn"
            onClick={onOpenApplianceGrid}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer border border-blue-200"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">All Appliances</span>
            <span className="sm:hidden">Switch</span>
          </button>
        </div>
      </div>

      {/* Appliance Hero Banner */}
      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8">
          {/* 3D Visual in highlighted elevated card */}
          <div className="w-32 h-28 sm:w-40 sm:h-36 shrink-0 bg-gradient-to-b from-slate-50 to-blue-50/40 rounded-3xl border border-slate-200/80 flex items-center justify-center p-3 shadow-md relative">
            <Visual className="w-24 h-20 sm:w-28 sm:h-24 drop-shadow-md" />
            <span className="absolute -bottom-2.5 bg-blue-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
              {appliance.label}
            </span>
          </div>

          {/* Details & Live ETA */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                {appliance.rating} ({appliance.totalBookings})
              </span>
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                Arriving in {appliance.eta}
              </span>
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                {appliance.warrantyBadge}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight mb-2">
              {appliance.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              {appliance.subtitle} in <strong className="text-slate-900">{selectedLocality}, {selectedCityName}</strong>.
            </p>

            {/* Service Guarantee Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-left">
                <span className="text-[11px] font-bold text-slate-500 block">Pricing</span>
                <span className="text-xs font-extrabold text-slate-900">Starts ₹249</span>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-left">
                <span className="text-[11px] font-bold text-slate-500 block">Warranty</span>
                <span className="text-xs font-extrabold text-slate-900">Up to 180 Days</span>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-left">
                <span className="text-[11px] font-bold text-slate-500 block">Spare Parts</span>
                <span className="text-xs font-extrabold text-slate-900">100% Genuine</span>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-left">
                <span className="text-[11px] font-bold text-slate-500 block">Safety</span>
                <span className="text-xs font-extrabold text-slate-900">Background Checked</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Issue / Symptom Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-blue-600" />
              Select your specific issue to filter solutions:
            </h3>
            {selectedSymptom !== 'all' && (
              <button
                onClick={() => setSelectedSymptom('all')}
                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Show all services
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSymptom('all')}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                selectedSymptom === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Repairs ({appliance.services.length})
            </button>
            {appliance.commonIssues.map((issue) => (
              <button
                key={issue}
                onClick={() => setSelectedSymptom(issue)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedSymptom === issue
                    ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/40'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {issue}
              </button>
            ))}
          </div>
        </div>

        {/* Services & Repairs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Columns: Services List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-black text-slate-900">
                Available Repair & Service Packages ({displayedServices.length})
              </h2>
              <span className="text-xs text-slate-500 font-semibold">Doorstep fixed rates</span>
            </div>

            {displayedServices.map((service) => {
              const serviceItem = mapToServiceItem(service);
              const inCart = cartItems.find((ci) => ci.service.id === service.id);
              const quantity = inCart ? inCart.quantity : 0;

              return (
                <div
                  key={service.id}
                  id={`service-card-${service.id}`}
                  className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
                >
                  {service.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-2xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Most Booked
                    </div>
                  )}

                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                        {service.title}
                      </h3>
                    </div>

                    {/* Meta info row */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-semibold mb-3">
                      <span className="flex items-center gap-1 text-slate-800 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        {service.rating} ({service.reviewsCount} reviews)
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {service.duration}
                      </span>
                      <span>•</span>
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                        {service.warranty}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* What's Included Points */}
                    <div className="bg-slate-50 rounded-xl p-3 sm:p-3.5 border border-slate-100 mb-4">
                      <span className="text-xs font-bold text-slate-800 block mb-2">
                        What's Included:
                      </span>
                      <ul className="space-y-1.5">
                        {service.includedPoints.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-normal">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Price and Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl sm:text-2xl font-black text-slate-950">
                          ₹{service.price}
                        </span>
                        {service.originalPrice > service.price && (
                          <>
                            <span className="text-xs sm:text-sm text-slate-400 line-through font-medium">
                              ₹{service.originalPrice}
                            </span>
                            {service.discountPercentage && (
                              <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                {service.discountPercentage}% OFF
                              </span>
                            )}
                          </>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium block">Inclusive of all taxes & visit</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {quantity > 0 ? (
                        <div className="flex items-center border border-blue-600 rounded-xl bg-blue-50 px-2 py-1 gap-2 shadow-xs">
                          <button
                            onClick={() => onUpdateCartQuantity(service.id, -1)}
                            className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-blue-700 hover:bg-blue-100 shadow-2xs cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-black text-blue-900 min-w-[16px] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateCartQuantity(service.id, 1)}
                            className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 shadow-2xs cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          id={`add-cart-btn-${service.id}`}
                          onClick={() => onAddToCart(serviceItem)}
                          className="px-4 py-2 rounded-xl bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-xs sm:text-sm font-black transition-all cursor-pointer shadow-xs active:scale-95"
                        >
                          Add to Cart
                        </button>
                      )}

                      <button
                        id={`book-now-btn-${service.id}`}
                        onClick={() => onBookNow(serviceItem)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-black transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Standard Checklist & Other Appliances Quick Switch */}
          <div className="space-y-6">
            {/* UrgentLyfe Standards Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <h3 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                UrgentLyfe Doorstep Standards
              </h3>
              <ul className="space-y-2.5">
                {appliance.technicianChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                <span>30-Day Happiness Guarantee</span>
                <span className="text-emerald-700 font-bold">100% Free Rework</span>
              </div>
            </div>

            {/* Quick Switch to Another Appliance */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Other Appliance Repairs
                </h3>
                <button
                  onClick={onOpenApplianceGrid}
                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {APPLIANCES_LIST.filter((a) => a.id !== appliance.id)
                  .slice(0, 6)
                  .map((other) => {
                    const OtherVisual = other.visualComponent;
                    return (
                      <button
                        key={other.id}
                        onClick={() => onSelectAnotherAppliance(other)}
                        className="flex flex-col items-center p-2 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/60 hover:border-blue-300 transition-all text-center cursor-pointer group"
                      >
                        <OtherVisual className="w-10 h-8 drop-shadow-2xs group-hover:scale-105 transition-transform" />
                        <span className="text-[11px] font-bold text-slate-800 group-hover:text-blue-600 mt-1 truncate max-w-full">
                          {other.label}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
