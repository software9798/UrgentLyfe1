import React, { useState } from 'react';
import { Crown, Sparkles, ArrowRight, Tag, Coins, Zap, CheckCircle2, TrendingUp } from 'lucide-react';
import { Booking } from '../../types';
import { api } from '../../api/client';

interface LoyaltyBalanceCardProps {
  loyaltyPoints: number;
  bookings?: Booking[];
  onViewRewards?: () => void;
  onRedeemPoints?: () => void;
  onPointsUpdated?: (newPoints: number) => void;
}

export const LoyaltyBalanceCard: React.FC<LoyaltyBalanceCardProps> = ({
  loyaltyPoints,
  bookings = [],
  onViewRewards,
  onRedeemPoints,
  onPointsUpdated,
}) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Compute tier
  const isPlatinum = loyaltyPoints >= 601;
  const isGold = loyaltyPoints >= 201;
  const tierName = isPlatinum ? 'Platinum VIP' : isGold ? 'Gold Member' : 'Silver Member';
  const tierColor = isPlatinum
    ? 'bg-purple-600 text-white'
    : isGold
    ? 'bg-amber-400 text-slate-950 font-black'
    : 'bg-slate-200 text-slate-800';

  const nextTierNeeded = isPlatinum ? 0 : isGold ? 601 - loyaltyPoints : 201 - loyaltyPoints;
  const nextTierName = isPlatinum ? 'Maximum Level' : isGold ? 'Platinum VIP' : 'Gold Member';
  const progressPercent = isPlatinum
    ? 100
    : isGold
    ? Math.min(100, Math.round(((loyaltyPoints - 201) / 400) * 100))
    : Math.min(100, Math.round((loyaltyPoints / 201) * 100));

  const handleSimulateQuickEarn = async () => {
    const bookingToComplete = bookings.find((b) => b.status === 'CONFIRMED' || b.status === 'PARTNER_EN_ROUTE') || bookings[0];
    const bId = bookingToComplete ? bookingToComplete.id : 'UL-7430';

    setIsSimulating(true);
    setSuccessMsg(null);
    try {
      const res = await api.simulateEarnLoyaltyPoints(bId);
      setSuccessMsg(`+${res.data.pointsEarned} Points Credited on #${bId}! New Balance: ${res.data.newBalance} pts`);
      onPointsUpdated?.(res.data.newBalance);
      setTimeout(() => setSuccessMsg(null), 4500);
    } catch (e: any) {
      setSuccessMsg(e.message || 'Service completed! Points credited.');
      setTimeout(() => setSuccessMsg(null), 4500);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div
      id="loyalty-balance-section"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 border border-indigo-900/60 shadow-xl"
    >
      {/* Decorative background glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

      {/* Success Notification Alert */}
      {successMsg && (
        <div className="mb-4 bg-amber-400 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-black flex items-center justify-between shadow-md animate-fadeIn">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 fill-slate-950" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-slate-950 hover:opacity-75">
            ✕
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Left: Balance & Tier */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs ${tierColor}`}>
              <Crown className="w-3 h-3 fill-current" />
              {tierName}
            </span>
            <span className="text-xs text-indigo-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Loyalty Rewards Balance
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <h3 className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
              {loyaltyPoints}
              <span className="text-lg text-white font-extrabold ml-1.5">Points</span>
            </h3>
            <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-black px-2.5 py-0.5 rounded-lg">
              = ₹{loyaltyPoints} Discount Value
            </span>
          </div>

          <p className="text-xs text-slate-300 max-w-md leading-relaxed">
            Every 10 spent earns 1 loyalty point on completed bookings. Redeem points for instant discounts on future services.
          </p>

          {/* Progress bar to next tier */}
          <div className="pt-1 space-y-1 max-w-md">
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span>Tier Progress ({nextTierName}):</span>
              <span className="text-amber-400 font-bold">
                {nextTierNeeded > 0 ? `${nextTierNeeded} pts to next tier` : 'Top VIP Tier!'}
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 sm:items-center md:items-end shrink-0">
          <button
            onClick={onRedeemPoints || onViewRewards}
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Redeem for Discount</span>
          </button>

          <button
            onClick={onViewRewards}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer border border-white/15 flex items-center justify-center gap-1.5"
          >
            <span>View Rewards & Ledger</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleSimulateQuickEarn}
            disabled={isSimulating}
            className="w-full sm:w-auto text-[11px] text-indigo-300 hover:text-white font-semibold py-1 px-2 transition-colors cursor-pointer flex items-center justify-center gap-1"
            title="Simulate service completion to test earning loyalty points"
          >
            <Zap className={`w-3 h-3 text-amber-400 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Crediting Points...' : '⚡ Test: Simulate Earn Booking Points'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
