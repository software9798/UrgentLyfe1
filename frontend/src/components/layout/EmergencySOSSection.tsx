import React from 'react';
import {
  Zap,
  Droplets,
  AirVent,
  AlertTriangle,
  Flame,
  Wrench,
  Clock,
  ShieldCheck,
  PhoneCall,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface EmergencySOSSectionProps {
  selectedCityName: string;
  selectedLocality: string;
  onQuickSOS: (serviceHint?: string) => void;
  onSelectServiceQuery?: (query: string) => void;
}

export const EmergencySOSSection: React.FC<EmergencySOSSectionProps> = ({
  selectedCityName,
  selectedLocality,
  onQuickSOS,
  onSelectServiceQuery,
}) => {
  const EMERGENCY_CARDS = [
    {
      id: 'emergency-electrician',
      title: 'Emergency Electrician',
      desc: 'Short circuit, spark, total power blackout or burning wire smell',
      time: '20-30 mins',
      tag: 'CRITICAL',
      icon: <Zap className="w-6 h-6 text-amber-500 fill-amber-400" />,
      bg: 'bg-amber-50/70 border-amber-200/80',
      tagColor: 'bg-amber-500 text-slate-950',
      query: 'Electrician MCB repair',
    },
    {
      id: 'emergency-plumber',
      title: 'Emergency Plumber',
      desc: 'Burst pipe, sudden tap overflow, drainage backup & flooding',
      time: '25-30 mins',
      tag: 'URGENT',
      icon: <Droplets className="w-6 h-6 text-blue-500" />,
      bg: 'bg-blue-50/70 border-blue-200/80',
      tagColor: 'bg-blue-600 text-white',
      query: 'Plumber pipe leakage repair',
    },
    {
      id: 'emergency-ac',
      title: 'AC Emergency',
      desc: 'AC burning smell, sudden gas leakage, water gushing or fan locked',
      time: '30-40 mins',
      tag: 'PRIORITY',
      icon: <AirVent className="w-6 h-6 text-sky-500" />,
      bg: 'bg-sky-50/70 border-sky-200/80',
      tagColor: 'bg-sky-600 text-white',
      query: 'AC Foam Jet repair',
    },
    {
      id: 'water-leakage',
      title: 'Water Leakage',
      desc: 'Ceiling seepage, bathroom valve rupture, continuous leak',
      time: '25-30 mins',
      tag: 'URGENT',
      icon: <AlertTriangle className="w-6 h-6 text-rose-500" />,
      bg: 'bg-rose-50/70 border-rose-200/80',
      tagColor: 'bg-rose-600 text-white',
      query: 'Plumbing leak inspection',
    },
    {
      id: 'short-circuit',
      title: 'Short Circuit',
      desc: 'Sparking switchboards, MCB constantly tripping, appliance fuse blown',
      time: '20-30 mins',
      tag: 'CRITICAL',
      icon: <Flame className="w-6 h-6 text-orange-500" />,
      bg: 'bg-orange-50/70 border-orange-200/80',
      tagColor: 'bg-orange-600 text-white',
      query: 'MCB short circuit wiring',
    },
    {
      id: 'urgent-repairs',
      title: 'Other Urgent Repairs',
      desc: 'Door lock jammed, main gate hinges broken, urgent fixture fixing',
      time: '30 mins',
      tag: 'EXPRESS',
      icon: <Wrench className="w-6 h-6 text-indigo-500" />,
      bg: 'bg-indigo-50/70 border-indigo-200/80',
      tagColor: 'bg-indigo-600 text-white',
      query: 'Carpentry door lock repair',
    },
  ];

  return (
    <section id="emergency-sos-section" className="mx-4 sm:mx-6 lg:mx-8 my-10">
      <div className="bg-gradient-to-b from-amber-50/50 via-white to-orange-50/20 border-2 border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-100">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
              <span>UrgentLyfe Differentiator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Need Help Right Now?
            </h2>
            <p className="text-sm text-slate-600">
              <span className="font-bold text-amber-700">30-Min Express SOS</span> • Instant dispatch of certified emergency technicians in <span className="font-semibold text-slate-800">{selectedLocality}, {selectedCityName}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-amber-200 shadow-xs text-xs font-medium text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span><strong>14 SOS Pros</strong> nearby</span>
            </div>

            <button
              onClick={() => onQuickSOS()}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-md shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Book Express SOS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 6 Quick Emergency Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
          {EMERGENCY_CARDS.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                if (onSelectServiceQuery) {
                  onSelectServiceQuery(card.query);
                }
                onQuickSOS(card.title);
              }}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-0.5 group bg-white ${card.bg}`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${card.tagColor}`}>
                    {card.tag}
                  </span>
                  <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-md border border-slate-200/60">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {card.time}
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {card.desc}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-extrabold text-slate-700">Dispatch in 30 Mins</span>
                <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Book SOS →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Reassurance Bar */}
        <div className="mt-6 pt-4 border-t border-amber-100/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Upfront Emergency Price Lock • No Surprise Hidden Surcharges</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Real-time GPS Tracking with OTP verification at doorstep</span>
          </div>
        </div>

      </div>
    </section>
  );
};
