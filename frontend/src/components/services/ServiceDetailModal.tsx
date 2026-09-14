import React, { useState } from 'react';
import {
  X,
  Star,
  Clock,
  ShieldCheck,
  Zap,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRightLeft,
  Check,
  Plus,
  Minus,
  Award,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  MapPin,
  HelpCircle,
} from 'lucide-react';
import { ServiceItem, CartItem } from '../../types';
import { getServiceRichDetail, ServiceRichDetail, ServiceReview } from '../../data/richServiceDetails';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onProceedBooking: (service: ServiceItem, isUrgent: boolean) => void;
  onOpenAIDoctorForCategory: (categoryName: string) => void;
  isComparing?: boolean;
  onToggleCompare?: (service: ServiceItem) => void;
  cartItems?: CartItem[];
  onAddToCart?: (service: ServiceItem, isUrgent?: boolean) => void;
  onUpdateCartQuantity?: (serviceId: string, delta: number) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onProceedBooking,
  onOpenAIDoctorForCategory,
  isComparing = false,
  onToggleCompare,
  cartItems = [],
  onAddToCart,
  onUpdateCartQuantity,
}) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>({});

  if (!service) return null;

  // Retrieve or generate rich Urban Company details
  const detail: ServiceRichDetail = getServiceRichDetail(service);

  // Cart status for this service
  const cartItem = cartItems.find((ci) => ci.service.id === service.id);
  const cartQuantity = cartItem?.quantity || 0;

  const handleAddService = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(service, false);
    }
  };

  const handleDelta = (e: React.MouseEvent, delta: number) => {
    e.stopPropagation();
    if (onUpdateCartQuantity) {
      onUpdateCartQuantity(service.id, delta);
    }
  };

  const toggleHelpful = (reviewId: string) => {
    setHelpfulClicked((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const displayedReviews = showAllReviews ? detail.reviews : detail.reviews.slice(0, 3);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button & Top Actions */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {detail.bannerTag}
            </span>
            {isComparing && (
              <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                Comparing
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onToggleCompare && (
              <button
                type="button"
                onClick={() => onToggleCompare(service)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                  isComparing
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {isComparing ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>In Compare</span>
                  </>
                ) : (
                  <>
                    <ArrowRightLeft className="w-3.5 h-3.5 text-amber-500" />
                    <span>Compare</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="bg-slate-100 text-slate-700 hover:text-black hover:bg-slate-200 p-2 rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* 1. TOP BANNER (Exact layout matching video) */}
          <div className="bg-[#f8f7f5] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 border border-stone-200/80 relative overflow-hidden">
            <div className="space-y-1 z-10 max-w-[62%]">
              <span className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest">
                {detail.bannerTag}
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                {detail.bannerHeadline}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {detail.bannerSubtitle}
              </p>
            </div>
            <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-200 shadow-xs bg-white">
              <img
                src={detail.bannerImage}
                alt={detail.bannerHeadline}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* 2. TITLE, RATING, PRICE & ADD BUTTON */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {service.title}
              </h1>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{service.rating.toFixed(2)}</span>
                  <span className="text-slate-400 font-normal">
                    ({service.reviewCount ? `${(service.reviewCount / 1000).toFixed(0)}K` : '15K'} reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-base sm:text-lg font-black text-slate-950">
                  ₹{service.price}
                </span>
                {service.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    ₹{service.originalPrice}
                  </span>
                )}
                <span className="text-xs text-slate-500 font-medium">
                  • {service.durationMinutes} mins
                </span>
              </div>
            </div>

            {/* Urban Company style Add / Quantity Button */}
            <div className="shrink-0 pt-1">
              {cartQuantity === 0 ? (
                <button
                  type="button"
                  onClick={handleAddService}
                  className="px-5 py-2 rounded-xl border border-purple-600 text-purple-700 hover:bg-purple-50 font-black text-sm transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Add</span>
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-purple-50 border border-purple-300 text-purple-800 rounded-xl px-2.5 py-1.5 shadow-xs">
                  <button
                    type="button"
                    onClick={(e) => handleDelta(e, -1)}
                    className="w-6 h-6 rounded-lg bg-white text-purple-700 flex items-center justify-center font-bold hover:bg-purple-100 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-black w-4 text-center">{cartQuantity}</span>
                  <button
                    type="button"
                    onClick={(e) => handleDelta(e, 1)}
                    className="w-6 h-6 rounded-lg bg-purple-700 text-white flex items-center justify-center font-bold hover:bg-purple-800 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* AI Doctor Diagnostic banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Unsure if this fixes your exact issue?</p>
                <p className="text-[11px] text-slate-500">Run Gemini AI Diagnostic test with photo/symptoms</p>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenAIDoctorForCategory(service.title);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-all"
            >
              Test with AI
            </button>
          </div>

          {/* 3. IDEAL FOR (Visual cards matching video) */}
          {detail.idealFor && detail.idealFor.length > 0 && (
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3">
                Ideal for
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {detail.idealFor.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 flex flex-col group"
                  >
                    <div className="h-24 sm:h-28 w-full overflow-hidden bg-slate-200">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-2.5 text-xs font-bold text-slate-800 leading-snug">
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. WHEN TO AVOID (List matching video) */}
          {detail.whenToAvoid && detail.whenToAvoid.length > 0 && (
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3">
                When to avoid
              </h3>
              <div className="space-y-2.5 bg-rose-50/50 border border-rose-100 rounded-2xl p-4">
                {detail.whenToAvoid.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-800">
                    <span className="text-rose-500 font-bold text-sm leading-none shrink-0 mt-0.5">✕</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. KEY STROKES & TECHNIQUES (Cards matching video) */}
          {detail.techniques && detail.techniques.length > 0 && (
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3">
                Key strokes & techniques
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detail.techniques.map((tech, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl overflow-hidden border border-slate-200/80 bg-white flex flex-col shadow-2xs"
                  >
                    <div className="h-28 w-full overflow-hidden bg-slate-100">
                      <img
                        src={tech.image}
                        alt={tech.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-black text-slate-900 leading-snug">
                        {tech.title}
                      </p>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Anatomy / Focus Points Map if present */}
              {detail.focusZones && detail.focusZones.length > 0 && (
                <div className="mt-4 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Target Focus Zones
                    </span>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                      Customized Pressure
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {detail.focusZones.map((fz, idx) => (
                      <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-2.5 text-center">
                        <p className="text-xs font-bold text-slate-900">{fz.label}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{fz.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 6. PRE-MASSAGE / PRE-SERVICE CONSULTATION (Matching video) */}
          <div className="bg-[#f7f6f2] border border-stone-200 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-slate-900 text-amber-400 font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                FREE
              </span>
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                {detail.consultationTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              {detail.consultationDesc}
            </p>

            <div className="flex items-center justify-between gap-4 bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-stone-200/60">
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  Consultation Touchpoints
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {detail.consultationPoints.map((point, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-bold bg-stone-100 text-stone-800 px-2.5 py-1 rounded-lg border border-stone-200"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                <img
                  src={detail.consultationImage}
                  alt="Consultation"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* 7. SERVICE INCLUDES (Numbered steps matching video) */}
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3">
              Service includes
            </h3>
            <div className="space-y-3">
              {detail.includesSteps.map((step) => (
                <div
                  key={step.step}
                  className="bg-white border border-slate-200/80 rounded-2xl p-3.5 flex items-start gap-3 shadow-2xs"
                >
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {step.image && (
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 8. SETUP REQUIREMENTS / DIMENSIONS (Matching video) */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Space Requirement
              </span>
              <h4 className="text-sm font-black text-slate-900 mt-0.5">
                {detail.setupDimensions}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Professional arrives with complete sanitized equipment & clean linen.
              </p>
            </div>
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-white">
              <img
                src={detail.setupImage}
                alt={detail.setupTitle}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* 9. EXPERTISE YOU CAN TRUST (Matching video) */}
          <div className="bg-[#f9f9fb] border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
            <div className="space-y-2 max-w-[70%]">
              <h4 className="text-sm font-black text-slate-900">
                {detail.expertBadgeTitle}
              </h4>
              <ul className="space-y-1.5">
                {detail.expertPoints.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md bg-slate-100">
              <img
                src={detail.expertImage}
                alt="Verified Professional"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* 10. BEFORE YOU BOOK GUIDELINES (Matching video) */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
            <h4 className="text-sm font-black text-slate-900">
              Before you book
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {detail.beforeYouBookGuidelines.map((g, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-slate-200/80">
              <p className="text-[11px] font-bold text-slate-700">For best experience:</p>
              <p className="text-xs text-slate-600 mt-0.5">{detail.bestExperienceTip}</p>
            </div>
          </div>

          {/* 11. CUSTOMER RATINGS & REAL FEEDBACK (Matching video with Sweety Jain, Ritika, Grace, Sreeja, Vanita, etc.) */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Customer Reviews & Feedback
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  ★ {service.rating.toFixed(2)} based on verified bookings
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                100% Verified
              </span>
            </div>

            {/* List of customer reviews */}
            <div className="space-y-3">
              {displayedReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-2 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-black text-slate-900">{rev.userName}</h5>
                      <p className="text-[11px] text-slate-400">
                        {rev.date} • <span className="text-slate-500">{rev.serviceTag}</span>
                      </p>
                    </div>

                    {/* Green Star Rating Box */}
                    <div className="flex items-center gap-1 bg-emerald-700 text-white px-2 py-0.5 rounded-md text-xs font-black shadow-xs">
                      <span>★</span>
                      <span>{rev.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {rev.comment}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 border-t border-slate-100">
                    <span>Verified UrgentLyfe Customer</span>
                    <button
                      type="button"
                      onClick={() => toggleHelpful(rev.id)}
                      className={`flex items-center gap-1 text-[11px] font-bold cursor-pointer transition-colors ${
                        helpfulClicked[rev.id] ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>
                        Helpful ({(rev.helpfulCount || 20) + (helpfulClicked[rev.id] ? 1 : 0)})
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Show more button matching video */}
            {detail.reviews.length > 3 && (
              <div className="text-center mt-3">
                <button
                  type="button"
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="text-xs font-bold text-slate-700 hover:text-black py-2 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer inline-flex items-center gap-1"
                >
                  <span>
                    {showAllReviews
                      ? 'Show less reviews'
                      : `Show more (${detail.reviews.length - 3} more reviews)`}
                  </span>
                  {showAllReviews ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal Sticky Footer Actions: Schedule Slot & 30-Min Emergency SOS */}
        <div className="sticky bottom-0 z-40 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={() => onProceedBooking(service, false)}
            className="flex-1 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold py-3 px-4 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
          >
            <Clock className="w-4 h-4 text-slate-500" />
            <span>Schedule Slot</span>
          </button>

          {service.isUrgentAvailable && (
            <button
              onClick={() => onProceedBooking(service, true)}
              className="flex-1 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md shadow-red-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-200 animate-bounce" />
              <span>Express 30-Min SOS (+₹{service.urgentFee})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
