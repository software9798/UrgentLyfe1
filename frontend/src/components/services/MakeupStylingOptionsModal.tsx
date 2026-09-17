import React, { useState } from 'react';
import {
  X,
  Star,
  Clock,
  Check,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  CheckCircle2,
  Heart,
  Palette,
  Sparkle,
} from 'lucide-react';
import { ServiceItem, CartItem } from '../../types';
import { handleImageError } from '../../utils/imageFallback';
import {
  MakeupServiceItem,
  MAKEUP_HYGIENE_PROMISE,
  MAKEUP_FAQS,
} from '../../data/makeupData';

interface MakeupStylingOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: MakeupServiceItem | null;
  cartItems: CartItem[];
  onAddToCart: (service: ServiceItem) => void;
  onUpdateCartQuantity: (serviceId: string, delta: number) => void;
  onBookNow: (service: ServiceItem) => void;
}

export const MakeupStylingOptionsModal: React.FC<MakeupStylingOptionsModalProps> = ({
  isOpen,
  onClose,
  service,
  cartItems,
  onAddToCart,
  onUpdateCartQuantity,
  onBookNow,
}) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'area' | 'frequent'>('all');

  if (!isOpen || !service) return null;

  // Variants list or fallback to service itself
  const variants = service.variants && service.variants.length > 0
    ? service.variants
    : [
        {
          id: service.id,
          name: service.name,
          tagline: service.description || 'Professional makeup and styling at doorstep',
          price: service.price,
          originalPrice: service.originalPrice,
          duration: service.duration,
          rating: service.rating,
          reviewsCount: service.reviewsCount,
          features: service.features,
          isPopular: true,
        },
      ];

  const getVariantQuantity = (variantId: string) => {
    const direct = cartItems.find((item) => item.service.id === variantId);
    if (direct) return direct.quantity;
    if (variantId === service.id) {
      const match = cartItems.find((item) => item.service.id === service.id);
      if (match) return match.quantity;
    }
    return 0;
  };

  const handleAddVariant = (v: (typeof variants)[0]) => {
    const itemToAdd: ServiceItem = {
      id: v.id,
      categoryId: service.categoryId,
      title: `${service.title || service.name} - ${v.name}`,
      subtitle: v.tagline || service.subtitle || 'Professional styling',
      price: v.price,
      originalPrice: v.originalPrice,
      rating: v.rating || service.rating,
      reviewCount: service.reviewCount || 1000,
      durationMinutes: service.durationMinutes || 60,
      description: v.description || v.tagline || service.description,
      includes: v.features || service.includes || [],
      image: v.image || service.image,
    };
    onAddToCart(itemToAdd);
  };

  const totalSelectedQty = variants.reduce((sum, v) => sum + getVariantQuantity(v.id), 0);

  // Dynamic hero banner styling
  const isWedding = service.categoryId === 'makeup-saree-styling' && (service.id.includes('wedding') || service.name.toLowerCase().includes('wedding'));
  const isSaree = service.id.includes('saree') || service.name.toLowerCase().includes('saree');
  const isHair = service.id.includes('hair') || service.name.toLowerCase().includes('hair');

  return (
    <div
      id="makeup-styling-options-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Blurred dark backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-20 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-30">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
              {service.isPackage ? 'Package Customizer' : 'Select Option & Style'}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
              {service.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="overflow-y-auto px-6 py-5 space-y-6">
          {/* Top Visual Card Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-rose-900 via-purple-900 to-slate-900 text-white p-5 sm:p-6 shadow-md">
            <div className="relative z-10 max-w-md">
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-rose-100 mb-2">
                <Sparkle className="w-3.5 h-3.5 fill-rose-300 text-rose-300" />
                <span>Certified UrgentLyfe Glam Artist</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                {isWedding
                  ? 'Royal Bridal & Event Couture'
                  : isSaree
                  ? 'Precision Pleats & Flawless Drape'
                  : isHair
                  ? 'Designer Voluminous Hairstyling'
                  : 'Luminous HD Camera Finish'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                {service.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px] font-semibold text-white/90">
                <span className="bg-black/30 px-2 py-0.5 rounded-md border border-white/15">
                  100% Genuine Cosmetics
                </span>
                <span className="bg-black/30 px-2 py-0.5 rounded-md border border-white/15">
                  Sterilized Brushes & Sponges
                </span>
                <span className="bg-black/30 px-2 py-0.5 rounded-md border border-white/15">
                  12-Hour Sweat Resistant
                </span>
              </div>
            </div>

            {/* Background art image accent */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-30 sm:opacity-40 pointer-events-none mix-blend-overlay">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
                onError={(e) => handleImageError(e, 'salon')}
              />
            </div>
          </div>

          {/* Variants Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800">
                Choose your preferred styling ({variants.length} available)
              </h3>
              <span className="text-xs font-bold text-purple-700">
                Doorstep service
              </span>
            </div>

            <div className="space-y-3.5">
              {variants.map((v) => {
                const qty = getVariantQuantity(v.id);

                return (
                  <div
                    key={v.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      qty > 0
                        ? 'border-purple-600 bg-purple-50/40 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-bold text-slate-900">
                            {v.name}
                          </h4>
                          {v.isPopular && (
                            <span className="bg-amber-100 text-amber-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Most Booked
                            </span>
                          )}
                        </div>

                        {v.tagline && (
                          <p className="text-xs font-medium text-purple-900 mt-1">
                            {v.tagline}
                          </p>
                        )}

                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1 font-bold text-slate-800">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            {v.rating || 4.75}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {v.duration || service.duration}
                          </span>
                        </div>

                        {/* Bullets/features */}
                        {v.features && v.features.length > 0 && (
                          <ul className="mt-2.5 space-y-1">
                            {v.features.map((feat, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Product Brands Pill */}
                        {v.productBrands && v.productBrands.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap mt-3">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                              Brands:
                            </span>
                            {v.productBrands.map((brand, bIdx) => (
                              <span
                                key={bIdx}
                                className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md"
                              >
                                {brand}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Price & Add / Quantity Button */}
                      <div className="flex flex-col items-end justify-between flex-shrink-0">
                        <div className="text-right">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base sm:text-lg font-black text-slate-900">
                              ₹{v.price}
                            </span>
                            {v.originalPrice && v.originalPrice > v.price && (
                              <span className="text-xs text-slate-400 line-through">
                                ₹{v.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-4">
                          {qty > 0 ? (
                            <div className="flex items-center gap-3 bg-white border border-purple-600 text-purple-700 px-3 py-1.5 rounded-xl shadow-xs text-xs font-bold">
                              <button
                                type="button"
                                onClick={() => onUpdateCartQuantity(v.id, -1)}
                                className="w-5 h-5 flex items-center justify-center rounded hover:bg-purple-100 active:scale-95"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="min-w-4 text-center text-sm font-extrabold text-slate-900">
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateCartQuantity(v.id, 1)}
                                className="w-5 h-5 flex items-center justify-center rounded hover:bg-purple-100 active:scale-95"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleAddVariant(v)}
                              className="px-5 py-2 bg-purple-700 hover:bg-purple-800 active:scale-95 text-white font-bold text-xs rounded-xl shadow-sm transition-all uppercase tracking-wider cursor-pointer"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* UrgentLyfe Hygiene & Safety Promise */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-purple-700" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                UrgentLyfe Makeup & Styling Safety Promise
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MAKEUP_HYGIENE_PROMISE.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {item.title}
                    </span>
                    <span className="text-slate-600 leading-relaxed">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews Preview */}
          <div className="border border-slate-200 rounded-2xl p-4 sm:p-5 bg-white">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                Verified Customer Reviews
              </h4>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{service.rating} ({service.reviewsCount})</span>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 mb-3">
              <button
                type="button"
                onClick={() => setReviewFilter('all')}
                className={`text-xs font-bold px-3 py-1 rounded-full transition-colors ${
                  reviewFilter === 'all'
                    ? 'bg-purple-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Detailed reviews
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter('area')}
                className={`text-xs font-bold px-3 py-1 rounded-full transition-colors ${
                  reviewFilter === 'area'
                    ? 'bg-purple-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                In my area
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter('frequent')}
                className={`text-xs font-bold px-3 py-1 rounded-full transition-colors ${
                  reviewFilter === 'frequent'
                    ? 'bg-purple-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Frequent users
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 bg-slate-50 rounded-xl text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Ananya Sen</span>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </div>
                </div>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  "Booked for a family wedding reception. The makeup artist was on time, used sealed palettes and my saree draping stayed intact throughout the sangeet dancing. Highly recommended!"
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block">Verified Customer • 2 days ago</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Pooja Sharma</span>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </div>
                </div>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  "The HD foundation matched my skin tone seamlessly with no flashback in camera photos. The hair artist made an incredible textured low bun."
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block">Verified Customer • 5 days ago</span>
              </div>
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="border border-slate-200 rounded-2xl p-4 sm:p-5 bg-white">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3">
              Frequently Asked Questions
            </h4>
            <div className="divide-y divide-slate-100">
              {MAKEUP_FAQS.map((faq, idx) => {
                const isExp = expandedFaq === idx;
                return (
                  <div key={idx} className="py-2.5">
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isExp ? null : idx)}
                      className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-800 hover:text-purple-700 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isExp ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" />
                      )}
                    </button>
                    {isExp && (
                      <p className="text-xs text-slate-600 mt-2 pl-0.5 leading-relaxed animate-in fade-in">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer: Done / View in Cart */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">
              {totalSelectedQty > 0
                ? `${totalSelectedQty} styling option(s) in cart`
                : 'Select options above to add'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
