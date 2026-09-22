import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Clock,
  CheckCircle2,
  Copy,
  Check,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Send,
  Wrench,
  TrendingUp,
  Flame,
  Info,
} from 'lucide-react';
import { ServiceItem, SmartServiceTip, SmartServiceTipsResponse, TipCategoryType } from '../../types';
import { api } from '../../api/client';

interface SmartServiceTipsProps {
  service: ServiceItem;
  city?: string;
  onBookUrgentService?: () => void;
}

export const SmartServiceTips: React.FC<SmartServiceTipsProps> = ({
  service,
  city = 'Bengaluru',
  onBookUrgentService,
}) => {
  const [data, setData] = useState<SmartServiceTipsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'ALL' | TipCategoryType>('ALL');
  const [completedTips, setCompletedTips] = useState<Record<string, boolean>>({});
  const [copiedTipId, setCopiedTipId] = useState<string | null>(null);

  // Custom question state
  const [showAskBox, setShowAskBox] = useState<boolean>(false);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [askingCustom, setAskingCustom] = useState<boolean>(false);
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);

  // Fetch AI tips when service changes
  const fetchTips = async (question?: string) => {
    try {
      if (question) {
        setAskingCustom(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const res = await api.getServiceSmartTips({
        serviceId: service.id,
        serviceTitle: service.title,
        categoryId: service.categoryId,
        description: service.description,
        features: service.features,
        city,
        customQuestion: question,
      });

      setData(res);
      if (question) {
        // If the user asked a question, craft a clear notification
        setCustomAnswer(
          `Technician advice for "${question}": Check the updated tips above and pro-secret below tailored for ${service.title}.`
        );
      }
    } catch (err: any) {
      console.error('Error fetching smart service tips:', err);
      setError('Could not load AI maintenance advice. Showing expert baseline guidelines.');
    } finally {
      setLoading(false);
      setRefreshing(false);
      setAskingCustom(false);
    }
  };

  useEffect(() => {
    fetchTips();
  }, [service.id]);

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRefreshing(true);
    fetchTips();
  };

  const handleToggleComplete = (tipId: string) => {
    setCompletedTips((prev) => ({
      ...prev,
      [tipId]: !prev[tipId],
    }));
  };

  const handleCopyTip = (tip: SmartServiceTip) => {
    const textToCopy = `[UrgentLyfe Maintenance Tip: ${tip.title}]\n${tip.tip}\nFrequency: ${tip.frequency}\nAction: ${tip.actionStep}\nImpact: ${tip.impactBadge}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedTipId(tip.id);
    setTimeout(() => setCopiedTipId(null), 2000);
  };

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim() || askingCustom) return;
    fetchTips(customQuestion.trim());
  };

  const quickQuestions = [
    'How do I clean this without opening delicate parts?',
    'What preventive step is crucial before the monsoon season?',
    'How can I tell if this is a minor fix or an emergency?',
  ];

  const getCategoryColor = (cat: TipCategoryType) => {
    switch (cat) {
      case 'ENERGY_COST_SAVER':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          badge: 'bg-emerald-600 text-white',
          border: 'border-emerald-200',
        };
      case 'EXTEND_LIFESPAN':
        return {
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          badge: 'bg-indigo-600 text-white',
          border: 'border-indigo-200',
        };
      case 'SAFETY_WARNING':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          badge: 'bg-amber-600 text-white',
          border: 'border-amber-200',
        };
      case 'DIY_PREVENTIVE':
      default:
        return {
          bg: 'bg-sky-50 text-sky-700 border-sky-200',
          badge: 'bg-sky-600 text-white',
          border: 'border-sky-200',
        };
    }
  };

  const filteredTips =
    data?.tips.filter((t) => activeFilter === 'ALL' || t.category === activeFilter) || [];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-4 sm:p-6 shadow-xl border border-indigo-900/40 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with AI Badge & Actions */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/60">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">
            <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                Smart Service Tips
              </h3>
              <span className="text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 px-2 py-0.5 rounded-full shadow-xs">
                AI Powered
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Proactive maintenance & lifecycle longevity for {service.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading || refreshing}
            className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            title="Refresh maintenance advice"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing || loading ? 'animate-spin text-amber-400' : ''}`} />
            <span>{refreshing ? 'Updating...' : 'Regenerate'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAskBox(!showAskBox)}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 ${
              showAskBox
                ? 'bg-amber-400 text-slate-950 border-amber-300 font-black'
                : 'bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border-indigo-500/40'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showAskBox ? 'Close Q&A' : 'Ask AI'}</span>
          </button>
        </div>
      </div>

      {/* Ask AI Custom Maintenance Question Drawer */}
      {showAskBox && (
        <div className="mt-4 p-4 rounded-2xl bg-slate-800/95 border border-amber-500/30 backdrop-blur-md animate-in fade-in slide-in-from-top-2 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              Ask AI Maintenance Specialist
            </span>
            <span className="text-[10px] text-slate-400">Gemini 3.8 Flash</span>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            Have a question about strange sounds, weather care, or DIY cleaning for this service?
          </p>

          {/* Quick chip options */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setCustomQuestion(q);
                  fetchTips(q);
                }}
                className="text-[11px] font-medium bg-slate-700/80 hover:bg-slate-700 text-slate-200 hover:text-white px-2.5 py-1 rounded-lg border border-slate-600/80 transition-colors text-left"
              >
                "{q}"
              </button>
            ))}
          </div>

          <form onSubmit={handleAskSubmit} className="flex gap-2">
            <input
              type="text"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder={`E.g. Is it safe to run ${service.title} during high voltage or heavy rain?`}
              className="flex-1 bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button
              type="submit"
              disabled={!customQuestion.trim() || askingCustom}
              className="bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              {askingCustom ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              <span>Ask</span>
            </button>
          </form>

          {customAnswer && (
            <div className="mt-3 p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs text-amber-200 leading-relaxed flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-300">AI Advice Note:</p>
                <p>{customAnswer}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && !data && (
        <div className="py-8 space-y-4 animate-pulse">
          <div className="h-16 bg-slate-800/80 rounded-2xl border border-slate-700/60" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-20 bg-slate-800/80 rounded-2xl border border-slate-700/60" />
            <div className="h-20 bg-slate-800/80 rounded-2xl border border-slate-700/60" />
          </div>
          <div className="space-y-3">
            <div className="h-24 bg-slate-800/80 rounded-2xl border border-slate-700/60" />
            <div className="h-24 bg-slate-800/80 rounded-2xl border border-slate-700/60" />
          </div>
        </div>
      )}

      {/* Main Content when loaded */}
      {data && (
        <div className="space-y-5 mt-4">
          {/* 1. Overview & Lifespan Expectancy Banner */}
          <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-4 border border-slate-700/70 space-y-3">
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {data.overview}
            </p>

            {/* Metric highlight badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-700/80 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-indigo-300 uppercase tracking-wider block">
                    Longevity Potential
                  </span>
                  <p className="text-xs text-slate-200 font-medium mt-0.5 leading-snug">
                    {data.lifespanExpectancy}
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-700/80 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider block">
                    Maintenance Cadence
                  </span>
                  <p className="text-xs text-slate-200 font-medium mt-0.5 leading-snug">
                    {data.maintenanceCadence}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Filter Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveFilter('ALL')}
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer shrink-0 ${
                activeFilter === 'ALL'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/70'
              }`}
            >
              All Tips ({data.tips.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('ENERGY_COST_SAVER')}
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer shrink-0 ${
                activeFilter === 'ENERGY_COST_SAVER'
                  ? 'bg-emerald-500 text-white font-black shadow-sm'
                  : 'bg-slate-800/80 text-emerald-300 hover:text-white border border-slate-700/70'
              }`}
            >
              ⚡ Energy & Cost
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('EXTEND_LIFESPAN')}
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer shrink-0 ${
                activeFilter === 'EXTEND_LIFESPAN'
                  ? 'bg-indigo-500 text-white font-black shadow-sm'
                  : 'bg-slate-800/80 text-indigo-300 hover:text-white border border-slate-700/70'
              }`}
            >
              🛡️ Lifespan Care
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('SAFETY_WARNING')}
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer shrink-0 ${
                activeFilter === 'SAFETY_WARNING'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                  : 'bg-slate-800/80 text-amber-300 hover:text-white border border-slate-700/70'
              }`}
            >
              ⚠️ Safety First
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('DIY_PREVENTIVE')}
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer shrink-0 ${
                activeFilter === 'DIY_PREVENTIVE'
                  ? 'bg-sky-500 text-white font-black shadow-sm'
                  : 'bg-slate-800/80 text-sky-300 hover:text-white border border-slate-700/70'
              }`}
            >
              🛠️ DIY Routine
            </button>
          </div>

          {/* 3. Interactive Tip Cards */}
          <div className="space-y-3">
            {filteredTips.map((tip, idx) => {
              const colors = getCategoryColor(tip.category);
              const isCompleted = completedTips[tip.id];
              const isCopied = copiedTipId === tip.id;

              return (
                <div
                  key={tip.id || idx}
                  className={`rounded-2xl p-4 transition-all duration-200 border ${
                    isCompleted
                      ? 'bg-slate-900/60 border-slate-700/40 opacity-70'
                      : 'bg-slate-800/90 hover:bg-slate-800 border-slate-700/80 shadow-md hover:border-slate-600'
                  }`}
                >
                  {/* Top Bar of Tip Card */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <button
                        type="button"
                        onClick={() => handleToggleComplete(tip.id)}
                        className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center cursor-pointer transition-all shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                            : 'border-slate-500 hover:border-amber-400 bg-slate-900/60'
                        }`}
                        title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
                      >
                        {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${colors.badge}`}
                          >
                            {tip.categoryLabel}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-700/70">
                            {tip.frequency}
                          </span>
                          <span className="text-[11px] font-black text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                            {tip.impactBadge}
                          </span>
                        </div>

                        <h4
                          className={`text-sm sm:text-base font-black leading-snug ${
                            isCompleted ? 'line-through text-slate-400' : 'text-white'
                          }`}
                        >
                          {tip.title}
                        </h4>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyTip(tip)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/80 transition-colors cursor-pointer shrink-0"
                      title="Copy tip to clipboard"
                    >
                      {isCopied ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Body explanation */}
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed pl-8">
                    {tip.tip}
                  </p>

                  {/* Action Step Card */}
                  <div className="mt-3 ml-8 p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-black text-amber-400 uppercase tracking-wide">
                      <Wrench className="w-3.5 h-3.5" />
                      <span>How to do it (2-Minute Action)</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium leading-relaxed">
                      {tip.actionStep}
                    </p>
                    {tip.proRecommendation && (
                      <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800 flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">Pro Tip:</span>
                        <span>{tip.proRecommendation}</span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4. Technician Insider Secret Box */}
          {data.proSecret && (
            <div className="rounded-2xl p-4 bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/15 border border-amber-400/40 relative overflow-hidden">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 block">
                    UrgentLyfe Technician Insider Secret
                  </span>
                  <p className="text-xs text-amber-100 font-medium leading-relaxed">
                    {data.proSecret}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 5. Emergency Warning Sign Box */}
          {data.warningSign && (
            <div className="rounded-2xl p-4 bg-rose-950/40 border border-rose-500/40 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-rose-300 block">
                    Critical Red Flag — Stop & Inspect
                  </span>
                  <p className="text-xs text-rose-200 leading-relaxed">
                    {data.warningSign}
                  </p>
                </div>
              </div>

              {onBookUrgentService && (
                <button
                  type="button"
                  onClick={onBookUrgentService}
                  className="shrink-0 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-md shadow-rose-600/30 flex items-center gap-1.5 self-center"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>Get Urgent Help</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
