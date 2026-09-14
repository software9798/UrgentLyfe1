import React from 'react';
import { Search, UserCheck, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

interface HowItWorksSectionProps {
  onBookService: () => void;
  onQuickSOS: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onBookService,
  onQuickSOS,
}) => {
  const STEPS = [
    {
      step: '01',
      title: 'Select Service or 30-Min SOS',
      desc: 'Browse upfront-priced packages or request instant 30-min SOS emergency dispatch for leaks, short circuits, or AC breakdowns.',
      icon: <Search className="w-5 h-5 text-blue-600" />,
      bg: 'bg-blue-50',
    },
    {
      step: '02',
      title: 'AI Matches Verified Pro',
      desc: 'Our intelligent dispatch algorithms match the nearest background-checked specialist equipped with genuine spare parts.',
      icon: <UserCheck className="w-5 h-5 text-indigo-600" />,
      bg: 'bg-indigo-50',
    },
    {
      step: '03',
      title: 'Pay Post-Service with Warranty',
      desc: 'Pay securely via UPI, Card, Cash, or Wallet only after you are completely satisfied. Backed by our 30-day rework guarantee.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50',
    },
  ];

  return (
    <section id="how-it-works-section" className="mx-4 sm:mx-6 lg:mx-8 my-12">
      <div className="max-w-7xl mx-auto bg-slate-50/70 border border-slate-200/90 rounded-3xl p-6 sm:p-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            SIMPLE & TRANSPARENT
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How UrgentLyfe Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Professional home maintenance and emergency repairs completed in 3 hassle-free steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${step.bg} flex items-center justify-center font-bold`}>
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-200">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onBookService}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 rounded-2xl shadow-xs transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={onQuickSOS}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black px-5 py-3 rounded-2xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Need Emergency Help?</span>
          </button>
        </div>

      </div>
    </section>
  );
};
