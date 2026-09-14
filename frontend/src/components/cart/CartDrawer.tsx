import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Tag,
  ArrowRight,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';
import { CartItem, ServiceItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (serviceId: string, delta: number) => void;
  onRemoveItem: (serviceId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  onBrowseServices: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  onBrowseServices,
}) => {
  const [couponCode, setCouponCode] = useState('URGENT100');
  const [isCouponApplied, setIsCouponApplied] = useState(true);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  // Calculate bill totals
  const subtotal = items.reduce((sum, item) => sum + item.service.price * item.quantity, 0);
  const discountAmount = isCouponApplied ? Math.min(100, Math.round(subtotal * 0.15)) : 0;
  const safetyAndGovtTaxes = items.length > 0 ? Math.round(subtotal * 0.05) + 39 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + safetyAndGovtTaxes);
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }
    if (couponCode.toUpperCase() === 'URGENT100' || couponCode.toUpperCase() === 'FIRST50') {
      setIsCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try URGENT100');
      setIsCouponApplied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slideLeft">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200/90 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  Your Cart
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {totalItemCount} {totalItemCount === 1 ? 'service' : 'services'} selected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-xs text-slate-500 hover:text-rose-600 font-bold px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Empty Cart"
                >
                  Clear All
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-50 border-2 border-dashed border-blue-200 flex items-center justify-center text-blue-500">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900">Your cart is empty</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    You haven't added any services yet. Explore our verified home repairs, cleaning, and AC services.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBrowseServices();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-600/20 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <>
                {/* List of Cart Items */}
                <div className="space-y-3">
                  {items.map(({ service, quantity }) => (
                    <div
                      key={service.id}
                      className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-3.5 shadow-xs flex gap-3 items-center hover:border-slate-300 transition-colors"
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100 bg-slate-100"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate leading-snug">
                            {service.title}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(service.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span className="flex items-center gap-0.5">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {service.durationMinutes}m
                          </span>
                          {service.isUrgentAvailable && (
                            <span className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5">
                              <Zap className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                              SOS Ready
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                          <div className="flex items-baseline gap-1">
                            <span className="text-sm font-black text-slate-900">
                              ₹{service.price * quantity}
                            </span>
                            {quantity > 1 && (
                              <span className="text-[10px] text-slate-400">
                                (₹{service.price} each)
                              </span>
                            )}
                          </div>

                          {/* Quantity selector */}
                          <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-0.5">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(service.id, -1)}
                              className="w-6 h-6 rounded-lg bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                              title="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-black text-slate-800">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(service.id, 1)}
                              className="w-6 h-6 rounded-lg bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                              title="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Box */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-blue-600" />
                      Promo Code & Offers
                    </span>
                    {isCouponApplied && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        ₹{discountAmount} SAVED
                      </span>
                    )}
                  </div>

                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter code (e.g. URGENT100)"
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 uppercase placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
                    />
                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      {isCouponApplied ? 'Applied' : 'Apply'}
                    </button>
                  </form>

                  {couponError && (
                    <p className="text-[11px] text-rose-600 font-semibold">{couponError}</p>
                  )}
                </div>

                {/* Bill Breakdown */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-2 text-xs">
                  <h4 className="font-black text-slate-900 pb-1 border-b border-slate-100 text-xs uppercase tracking-wider">
                    Payment Summary
                  </h4>

                  <div className="flex justify-between text-slate-600">
                    <span>Item Total ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})</span>
                    <span className="font-bold text-slate-900">₹{subtotal}</span>
                  </div>

                  {isCouponApplied && discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promo Discount</span>
                      <span>- ₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      Safety & Service Taxes (GST)
                    </span>
                    <span className="font-bold text-slate-900">₹{safetyAndGovtTaxes}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-black text-sm text-slate-900">
                    <span>Total Amount</span>
                    <span className="text-base text-blue-600 font-mono">₹{finalTotal}</span>
                  </div>
                </div>

                {/* Safety & 30-Day Guarantee Notice */}
                <div className="p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-emerald-900">
                    <p className="font-bold">UrgentLyfe 30-Day Guarantee</p>
                    <p className="text-emerald-700/90 mt-0.5">
                      Free rework if not 100% satisfied. Background-verified specialists with upfront fixed pricing.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout CTA */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200/90 bg-white space-y-2">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Amount to Pay
                  </p>
                  <p className="text-xl font-black text-slate-900 font-mono">
                    ₹{finalTotal}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBrowseServices();
                  }}
                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  + Add More Items
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-black py-3.5 px-4 rounded-2xl text-sm transition-all shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Book ({totalItemCount})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
