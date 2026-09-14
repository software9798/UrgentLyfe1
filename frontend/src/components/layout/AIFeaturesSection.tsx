import React from 'react';
import {
  Wrench,
  Mic,
  Navigation,
  Sparkles,
  ArrowRight,
  Bot,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface AIFeaturesSectionProps {
  onOpenAIDoctor: () => void;
  onOpenVoiceAssistant: () => void;
  onQuickSOS: () => void;
}

export const AIFeaturesSection: React.FC<AIFeaturesSectionProps> = ({
  onOpenAIDoctor,
  onOpenVoiceAssistant,
  onQuickSOS,
}) => {
  return (
    <section className="mx-4 sm:mx-6 lg:mx-8 my-10">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>INTELLIGENT HOME CARE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              AI-Powered Diagnostics & Dispatch
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Harnessing Google Gemini AI to accurately diagnose home repairs, support voice booking, and track technician dispatches in real-time.
            </p>
          </div>
        </div>

        {/* 3 Modern Clean Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: AI Fault Diagnostic */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  Instant Diagnostics
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-2 group-hover:text-indigo-600 transition-colors">
                  AI Fault Diagnostic
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Describe the problem. Let AI identify the issue and find the right technician. Pinpoint root causes, required spare parts, and estimated fair labor cost.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Interactive question breakdown</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Fair price range estimation</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={onOpenAIDoctor}
                className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-bold py-3 rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Try AI Diagnostic</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: AI Voice Assistant */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mic className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                  Hands-Free Voice AI
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-2 group-hover:text-amber-600 transition-colors">
                  AI Voice Assistant
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Speak in English, Hindi, or Hinglish. Effortlessly book visits, describe emergencies, or leave voice feedback without typing a single word.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Multilingual speech recognition</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Instant voice intent to booking cart</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={onOpenVoiceAssistant}
                className="w-full bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-xs font-bold py-3 rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Talk to AI Voice</span>
                <Mic className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Card 3: Real-Time Technician Dispatch */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Navigation className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                  Turn-by-Turn GPS
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-2 group-hover:text-blue-600 transition-colors">
                  Real-Time Technician Dispatch
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Track your assigned technician in real-time on live map. Direct phone connection, secure OTP authentication, and transparent post-job invoicing.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Live arrival countdown & OTP locks</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Verified technician photo ID & badges</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={onQuickSOS}
                className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold py-3 rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Instant SOS Dispatch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
