import React, { useState, useEffect } from 'react';
import {
  Award,
  Crown,
  Sparkles,
  Gift,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Zap,
  Tag,
  Copy,
  Check,
  RefreshCw,
  Coins,
  ShieldCheck,
  Percent,
  History,
  Info,
} from 'lucide-react';
import { Booking, LoyaltySummary, LoyaltyTransaction } from '../../types';
import { api } from '../../api/client';

interface LoyaltySectionProps {
  loyaltyPoints: number;
  bookings: Booking[];
  onLoyaltyUpdated?: (newPoints: number) => void;
  onBookNow?: () => void;
}

export const LoyaltySection: React.FC<LoyaltySectionProps> = ({
  loyaltyPoints: propLoyaltyPoints,
  bookings,
  onLoyaltyUpdated,
  onBookNow,
}) => {
  const [summary, setSummary] = useState<LoyaltySummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterType, setFilterType] = useState<'ALL' | 'EARNED' | 'REDEEMED'>('ALL');
  
  // Redemption State
  const [redeemAmount, setRedeemAmount] = useState<number>(100);
  const [generatedVoucher, setGeneratedVoucher] = useState<{
    code: string;
    discountRupees: number;
    pointsUsed: number;
  } | null>(null);
  const [voucherCopied, setVoucherCopied] = useState<boolean>(false);
  const [isRedeeming, setIsRedeeming] = useState<boolean>(false);
  const [redemptionError, setRedemptionError] = useState<string | null>(null);

  // Simulation State
  const [selectedBookingForSim, setSelectedBookingForSim] = useState<string>(
    bookings.find((b) => b.status === 'COMPLETED' || b.status === 'CONFIRMED')?.id || bookings[0]?.id || 'UL-7430'
  );
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationToast, setSimulationToast] = useState<string | null>(null);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const data = await api.getLoyaltySummary();
      setSummary(data);
      if (onLoyaltyUpdated && data.points !== propLoyaltyPoints) {
        onLoyaltyUpdated(data.points);
      }
    } catch (e) {
      console.warn('Could not fetch loyalty summary, building local fallback:', e);
      // Local fallback
      const pts = propLoyaltyPoints;
      const isPlatinum = pts >= 601;
      const isGold = pts >= 201;
      setSummary({
        points: pts,
        rupeeValue: pts,
        tier: {
          tier: isPlatinum ? 'PLATINUM' : isGold ? 'GOLD' : 'SILVER',
          name: isPlatinum ? 'Platinum VIP' : isGold ? 'Gold Member' : 'Silver Member',
          minPoints: isPlatinum ? 601 : isGold ? 201 : 0,
          discountMultiplier: isPlatinum ? 1.5 : isGold ? 1.2 : 1.0,
          earningRate: isPlatinum ? '1.5x Points' : isGold ? '1.2x Points' : '1.0x Points',
          badgeColor: isPlatinum
            ? 'bg-purple-600 text-white'
            : isGold
            ? 'bg-amber-400 text-slate-950 font-black'
            : 'bg-slate-200 text-slate-800',
          perks: ['Earn 1 pt per ₹10 on completed jobs', 'Instant discount checkout redemption', 'Priority dispatch'],
        },
        nextTierPoints: isPlatinum ? 0 : isGold ? 601 - pts : 201 - pts,
        nextTierName: isPlatinum ? 'Max Tier' : isGold ? 'Platinum VIP' : 'Gold Member',
        progressPercent: isPlatinum ? 100 : isGold ? Math.round(((pts - 201) / 400) * 100) : Math.round((pts / 201) * 100),
        totalPointsEarnedLifetime: pts + 50,
        totalPointsRedeemedLifetime: 50,
        totalSavingsRupees: 50,
        conversionRate: { points: 1, rupees: 1 },
        transactions: [
          {
            id: 'lt-101',
            userId: 'usr-customer-101',
            type: 'EARNED',
            points: 120,
            bookingId: 'UL-7430',
            serviceTitle: 'Power Foam Jet AC Service',
            description: 'Earned 120 loyalty points for completed AC Foam Jet Service',
            createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
          },
          {
            id: 'lt-102',
            userId: 'usr-customer-101',
            type: 'EARNED',
            points: 85,
            bookingId: 'UL-8104',
            serviceTitle: 'Emergency Short Circuit Repair',
            description: 'Earned 85 loyalty points for completed Emergency Electrical Service',
            createdAt: new Date(Date.now() - 9 * 86400000).toISOString(),
          },
          {
            id: 'lt-103',
            userId: 'usr-customer-101',
            type: 'EARNED',
            points: 135,
            bookingId: 'UL-8921',
            serviceTitle: 'Full Home Deep Sanitization',
            description: 'Earned 135 loyalty points for completed Home Deep Cleaning',
            createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
          },
          {
            id: 'lt-104',
            userId: 'usr-customer-101',
            type: 'BONUS',
            points: 50,
            description: 'Referral reward bonus: Friend completed their first booking',
            createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
          },
          {
            id: 'lt-105',
            userId: 'usr-customer-101',
            type: 'REDEEMED',
            points: 50,
            bookingId: 'UL-9022',
            serviceTitle: 'Kitchen Water Leakage Drain Repair',
            description: 'Redeemed 50 loyalty points for ₹50 instant checkout discount',
            createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [propLoyaltyPoints]);

  const currentPoints = summary?.points ?? propLoyaltyPoints;

  // Handle Point Redemption for Voucher
  const handleGenerateVoucher = async () => {
    if (redeemAmount <= 0) {
      setRedemptionError('Please choose a valid points amount to redeem.');
      return;
    }
    if (redeemAmount > currentPoints) {
      setRedemptionError(`You only have ${currentPoints} points available.`);
      return;
    }

    setIsRedeeming(true);
    setRedemptionError(null);

    try {
      const code = `LOYALTY${redeemAmount}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      const res = await api.redeemLoyaltyPoints({
        points: redeemAmount,
        description: `Generated discount voucher ${code} for ₹${redeemAmount} OFF`,
      });

      setGeneratedVoucher({
        code,
        discountRupees: redeemAmount,
        pointsUsed: redeemAmount,
      });

      if (summary) {
        setSummary({
          ...summary,
          points: res.data.remainingPoints,
          rupeeValue: res.data.remainingPoints,
          totalPointsRedeemedLifetime: summary.totalPointsRedeemedLifetime + redeemAmount,
          totalSavingsRupees: summary.totalSavingsRupees + redeemAmount,
          transactions: [res.data.transaction, ...summary.transactions],
        });
      }

      onLoyaltyUpdated?.(res.data.remainingPoints);
    } catch (err: any) {
      setRedemptionError(err.message || 'Failed to redeem loyalty points.');
    } finally {
      setIsRedeeming(false);
    }
  };

  const handleCopyVoucher = () => {
    if (!generatedVoucher) return;
    navigator.clipboard.writeText(generatedVoucher.code);
    setVoucherCopied(true);
    setTimeout(() => setVoucherCopied(false), 3000);
  };

  // Handle Simulation of Earning Points on a Completed Booking
  const handleSimulateEarn = async () => {
    if (!selectedBookingForSim) return;
    setIsSimulating(true);
    try {
      const res = await api.simulateEarnLoyaltyPoints(selectedBookingForSim);
      setSimulationToast(`🎉 +${res.data.pointsEarned} Loyalty Points credited for booking #${selectedBookingForSim}!`);
      setTimeout(() => setSimulationToast(null), 5000);
      await fetchSummary();
    } catch (e: any) {
      setSimulationToast(`Notice: ${e.message || 'Booking points already credited or booking completed.'}`);
      setTimeout(() => setSimulationToast(null), 5000);
    } finally {
      setIsSimulating(false);
    }
  };

  const filteredTransactions = (summary?.transactions || []).filter((tx) => {
    if (filterType === 'EARNED') return tx.type === 'EARNED' || tx.type === 'BONUS';
    if (filterType === 'REDEEMED') return tx.type === 'REDEEMED';
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Simulation Feedback Toast */}
      {simulationToast && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-between shadow-lg animate-bounce">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 fill-slate-950" />
            <span>{simulationToast}</span>
          </div>
          <button
            onClick={() => setSimulationToast(null)}
            className="text-slate-950 font-bold hover:opacity-70 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* 1. HERO: LOYALTY BALANCE OVERVIEW */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 border border-indigo-900/50 shadow-2xl">
        {/* Glow ambient background circles */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-xs">
                <Crown className="w-3.5 h-3.5 fill-slate-950" />
                {summary?.tier.name || 'Gold Member'}
              </span>
              <span className="text-xs text-indigo-200/90 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                UrgentLyfe Privilege Rewards Program
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Available Loyalty Balance
              </p>
              <div className="flex items-baseline gap-3">
                <h2 className="text-4xl sm:text-5xl font-black text-amber-400 tracking-tight">
                  {currentPoints}
                  <span className="text-xl sm:text-2xl text-white font-extrabold ml-1.5">PTS</span>
                </h2>
                <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3 py-1 rounded-xl text-xs font-black">
                  = ₹{currentPoints} Discount Value
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Earn <strong>1 Point for every ₹10 spent</strong> on completed home services. Redeem points for instant
              discounts at checkout with guaranteed 1 Pt = ₹1 value.
            </p>

            {/* Tier Progress Bar */}
            <div className="pt-2 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold">
                  Progress to {summary?.nextTierName || 'Platinum VIP'}:
                </span>
                <span className="text-amber-400 font-black">
                  {summary?.nextTierPoints ? `${summary.nextTierPoints} pts needed` : 'Maximum Tier Reached!'}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700/60 p-0.5">
                <div
                  className="bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 h-full rounded-full transition-all duration-700 shadow-sm"
                  style={{ width: `${Math.min(100, Math.max(12, summary?.progressPercent || 50))}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Metrics & Actions Widget */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-4 lg:w-80 shrink-0">
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Lifetime Rewards Summary</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Earned</p>
                <p className="text-lg font-black text-amber-400">
                  +{summary?.totalPointsEarnedLifetime ?? currentPoints + 50}
                </p>
                <p className="text-[10px] text-slate-400">pts lifetime</p>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Redeemed</p>
                <p className="text-lg font-black text-emerald-400">
                  ₹{summary?.totalSavingsRupees ?? 50}
                </p>
                <p className="text-[10px] text-slate-400">savings enjoyed</p>
              </div>
            </div>

            <div className="pt-1 flex flex-col gap-2">
              <button
                onClick={() => {
                  const el = document.getElementById('redeem-points-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Redeem Points for Discount</span>
              </button>

              {onBookNow && (
                <button
                  onClick={onBookNow}
                  className="w-full bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold text-xs py-2 px-4 rounded-xl transition-all cursor-pointer border border-indigo-500/50 flex items-center justify-center gap-1.5"
                >
                  <span>Book Service to Earn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. THREE VIP TIERS BREAKDOWN */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <span>UrgentLyfe Membership Tiers & Privileges</span>
          </h3>
          <p className="text-xs text-slate-500">
            Higher tiers unlock points multipliers, priority SOS response, and exclusive zero-surcharge benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* SILVER TIER */}
          <div
            className={`p-5 rounded-2xl border-2 transition-all ${
              summary?.tier.tier === 'SILVER'
                ? 'bg-slate-50 border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                0 - 200 PTS
              </span>
              {summary?.tier.tier === 'SILVER' && (
                <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  Current Tier
                </span>
              )}
            </div>
            <h4 className="text-base font-black text-slate-900">Silver Member</h4>
            <p className="text-xs font-bold text-indigo-600 mt-0.5">1.0x Base Points Rate</p>
            <ul className="mt-3.5 space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Earn 1 Pt per ₹10 on all jobs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Instant ₹1 = 1 Pt checkout discount</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% Free Booking Rescheduling</span>
              </li>
            </ul>
          </div>

          {/* GOLD TIER */}
          <div
            className={`p-5 rounded-2xl border-2 transition-all relative overflow-hidden ${
              summary?.tier.tier === 'GOLD'
                ? 'bg-gradient-to-b from-amber-50/70 to-white border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                201 - 600 PTS
              </span>
              {summary?.tier.tier === 'GOLD' && (
                <span className="text-[10px] font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Crown className="w-3 h-3 fill-amber-700 text-amber-700" />
                  Your Active Tier
                </span>
              )}
            </div>
            <h4 className="text-base font-black text-slate-900">Gold Member</h4>
            <p className="text-xs font-bold text-amber-600 mt-0.5">1.2x Boosted Points Multiplier</p>
            <ul className="mt-3.5 space-y-2 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Top-Rated 4.8★+ technician priority</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>1.2x Points Multiplier on completed jobs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Zero cancellation penalty up to 30 mins</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>₹50 Birthday special voucher bonus</span>
              </li>
            </ul>
          </div>

          {/* PLATINUM TIER */}
          <div
            className={`p-5 rounded-2xl border-2 transition-all ${
              summary?.tier.tier === 'PLATINUM'
                ? 'bg-purple-50/70 border-purple-500 ring-2 ring-purple-500/20 shadow-md'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-purple-600 text-white">
                601+ PTS
              </span>
              {summary?.tier.tier === 'PLATINUM' && (
                <span className="text-[10px] font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                  Current Tier
                </span>
              )}
            </div>
            <h4 className="text-base font-black text-slate-900">Platinum VIP</h4>
            <p className="text-xs font-bold text-purple-600 mt-0.5">1.5x Maximum Rewards Multiplier</p>
            <ul className="mt-3.5 space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Zero Emergency SOS Surcharge (Free SOS)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>1.5x Points on every service booking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Dedicated 24/7 VIP Concierge Manager</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Free Annual Electrical & AC Filter Check</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE REDEEM POINTS CALCULATOR & VOUCHER GENERATOR */}
      <div id="redeem-points-section" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Instant Discount Voucher
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1 flex items-center gap-2">
              <Tag className="w-5 h-5 text-emerald-600" />
              <span>Redeem Points for Future Discounts</span>
            </h3>
            <p className="text-xs text-slate-500">
              Convert your loyalty points into an instant discount voucher code to use during checkout.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl flex items-center gap-3">
            <Coins className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Your Balance</p>
              <p className="text-base font-black text-slate-900">{currentPoints} Points (₹{currentPoints})</p>
            </div>
          </div>
        </div>

        {redemptionError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center justify-between">
            <span>{redemptionError}</span>
            <button onClick={() => setRedemptionError(null)} className="font-bold text-red-800">
              ✕
            </button>
          </div>
        )}

        {/* Voucher Success Display */}
        {generatedVoucher && (
          <div className="bg-gradient-to-r from-emerald-50 via-emerald-100/50 to-teal-50 border-2 border-emerald-500/80 rounded-2xl p-5 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                  Discount Voucher Successfully Generated!
                </span>
              </div>
              <span className="text-xs font-extrabold text-emerald-700">
                -₹{generatedVoucher.discountRupees} OFF Applied
              </span>
            </div>

            <div className="bg-white border-2 border-dashed border-emerald-400 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Your Promo Code</p>
                <p className="text-xl font-mono font-black text-slate-900 tracking-wider">
                  {generatedVoucher.code}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Valid on all services. Enter this code on Step 3 of checkout!
                </p>
              </div>

              <button
                onClick={handleCopyVoucher}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs shrink-0"
              >
                {voucherCopied ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Voucher Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Preset Redemption Chips */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Choose Points to Redeem
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { pts: 50, label: '50 Pts (₹50 OFF)' },
              { pts: 100, label: '100 Pts (₹100 OFF)' },
              { pts: 200, label: '200 Pts (₹200 OFF)' },
              { pts: currentPoints, label: `All (${currentPoints} Pts = ₹${currentPoints})` },
            ].map((preset) => {
              const isDisabled = preset.pts > currentPoints || preset.pts <= 0;
              const isSelected = redeemAmount === preset.pts;
              return (
                <button
                  key={preset.label}
                  disabled={isDisabled}
                  onClick={() => setRedeemAmount(preset.pts)}
                  className={`p-3.5 rounded-xl border text-xs text-left transition-all cursor-pointer font-bold ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20'
                      : isDisabled
                      ? 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <p className="font-extrabold text-sm">{preset.pts} PTS</p>
                  <p className="text-[11px] font-semibold text-emerald-600 mt-0.5">
                    = ₹{preset.pts} Discount
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Stepper & Generate Button */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-600 font-semibold">Custom Amount:</span>
            <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
              <button
                onClick={() => setRedeemAmount((prev) => Math.max(10, prev - 25))}
                disabled={redeemAmount <= 10}
                className="px-3 py-1.5 text-sm font-black text-slate-700 hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
              >
                -
              </button>
              <span className="px-4 py-1.5 text-xs font-mono font-black text-slate-900 bg-white">
                {redeemAmount} pts (₹{redeemAmount})
              </span>
              <button
                onClick={() => setRedeemAmount((prev) => Math.min(currentPoints, prev + 25))}
                disabled={redeemAmount >= currentPoints}
                className="px-3 py-1.5 text-sm font-black text-slate-700 hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleGenerateVoucher}
            disabled={isRedeeming || currentPoints <= 0}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white font-black text-xs py-3 px-6 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isRedeeming ? 'Generating...' : `Redeem ${redeemAmount} Points for ₹${redeemAmount} OFF`}</span>
          </button>
        </div>
      </div>

      {/* 4. HOW TO EARN MORE POINTS */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Gift className="w-5 h-5 text-indigo-600" />
            <span>How to Earn Points in UrgentLyfe</span>
          </h3>
          <p className="text-xs text-slate-500">
            Points are automatically credited directly to your balance across these activities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
              10%
            </div>
            <p className="text-xs font-black text-slate-900">Completed Bookings</p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Earn 1 point for every ₹10 spent on any completed technician service.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-black">
              ⚡
            </div>
            <p className="text-xs font-black text-slate-900">+15 Bonus on SOS</p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Emergency 30-min express dispatches reward an extra +15 points bonus.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
              🎁
            </div>
            <p className="text-xs font-black text-slate-900">+50 Referral Bonus</p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Earn +50 loyalty points plus ₹250 wallet cash whenever friends book their first job.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-black">
              🎙️
            </div>
            <p className="text-xs font-black text-slate-900">+25 Voice Review</p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Leave a voice or star rating feedback after your technician finishes the work.
            </p>
          </div>
        </div>
      </div>

      {/* 5. LOYALTY ACTIVITY LEDGER / TRANSACTION HISTORY */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-600" />
              <span>Points Activity & Transaction History</span>
            </h3>
            <p className="text-xs text-slate-500">
              Complete verifiable log of every point earned, bonus credited, and discount redeemed.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {(['ALL', 'EARNED', 'REDEEMED'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterType(tab)}
                className={`px-3 py-1 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                  filterType === tab
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'ALL' ? 'All Activity' : tab === 'EARNED' ? 'Earned & Bonus' : 'Redeemed'}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger List */}
        <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
          {filteredTransactions.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No transactions matching this filter.
            </div>
          ) : (
            filteredTransactions.map((tx) => {
              const isEarned = tx.type === 'EARNED' || tx.type === 'BONUS';
              return (
                <div
                  key={tx.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                        isEarned
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {isEarned ? '↗' : '↘'}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                            tx.type === 'EARNED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : tx.type === 'BONUS'
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {tx.type}
                        </span>
                        {tx.bookingId && (
                          <span className="text-[10px] font-mono font-bold text-slate-400">
                            #{tx.bookingId}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400">
                          {new Date(tx.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-1">{tx.description}</p>
                    </div>
                  </div>

                  <div className="text-right sm:shrink-0 pl-12 sm:pl-0">
                    <p
                      className={`text-base font-black ${
                        isEarned ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    >
                      {isEarned ? `+${tx.points}` : `-${tx.points}`} PTS
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {isEarned ? `₹${tx.points} value added` : `₹${tx.points} discount saved`}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 6. LIVE TEST / DEMO SIMULATION CONTROLLER */}
      <div className="bg-gradient-to-r from-indigo-50 to-slate-50 rounded-3xl border border-indigo-100 p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-600" />
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Loyalty Points Verification & Testing Tool
            </h4>
          </div>
          <span className="text-[10px] bg-indigo-100 text-indigo-700 font-extrabold px-2 py-0.5 rounded">
            Interactive Test Sandbox
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Simulate a completed booking to see loyalty points immediately credited to the user's balance and reflected in
          the activity ledger in real time.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
          <div className="w-full sm:w-auto flex-1">
            <select
              value={selectedBookingForSim}
              onChange={(e) => setSelectedBookingForSim(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
            >
              {bookings.map((b) => (
                <option key={b.id} value={b.id}>
                  Booking #{b.id} - {b.service.title} (₹{b.totalAmount}) [{b.status}]
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSimulateEarn}
            disabled={isSimulating}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Crediting Points...' : 'Simulate Service Completion -> Credit Points'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
