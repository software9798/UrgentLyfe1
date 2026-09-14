import React, { useState } from 'react';
import {
  Instagram,
  Linkedin,
  Facebook,
  X as CloseIcon,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  Users,
  Briefcase,
  TrendingUp,
  Star,
  CheckCircle2,
  ExternalLink,
  Smartphone,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface FooterProps {
  onOpenProviderModal?: () => void;
  onNavigateCategories?: () => void;
  selectedCityName?: string;
  selectedLocality?: string;
}

type FooterModalType =
  | 'about'
  | 'investor'
  | 'terms'
  | 'privacy'
  | 'anti-discrimination'
  | 'careers'
  | 'reviews'
  | 'contact'
  | 'app-download'
  | null;

export const Footer: React.FC<FooterProps> = ({
  onOpenProviderModal,
  onNavigateCategories,
  selectedCityName = 'Bengaluru',
  selectedLocality = 'Koramangala',
}) => {
  const [activeModal, setActiveModal] = useState<FooterModalType>(null);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const handleCopyLink = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedNotification(`Copied link to clipboard!`);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  const handleCategoriesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateCategories) {
      onNavigateCategories();
    } else {
      const el = document.getElementById('services-catalog-grid');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="bg-[#f5f5f5] text-slate-800 border-t border-slate-200/80 pt-12 pb-16 px-4 sm:px-8 lg:px-12 mt-auto select-none">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* TOP: Brand Logo matching screenshot layout */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white font-black text-base shadow-sm tracking-tight">
              UL
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                Urgent<span className="text-slate-950 font-bold">Lyfe</span>
              </span>
            </div>
          </div>

          {/* MAIN 4 COLUMNS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6 lg:gap-12">
            
            {/* COLUMN 1: Company */}
            <div className="space-y-3.5">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Company
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-600 font-normal">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal('about')}
                    className="hover:text-black hover:underline transition-colors text-left cursor-pointer"
                  >
                    About us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal('investor')}
                    className="hover:text-black hover:underline transition-colors text-left cursor-pointer"
                  >
                    Investor Relations
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal('terms')}
                    className="hover:text-black hover:underline transition-colors text-left cursor-pointer"
                  >
                    Terms &amp; conditions
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal('privacy')}
                    className="hover:text-black hover:underline transition-colors text-left cursor-pointer"
                  >
                    Privacy policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal('anti-discrimination')}
                    className="hover:text-black hover:underline transition-colors text-left cursor-pointer"
                  >
                    Anti-discrimination policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal('careers')}
                    className="hover:text-black hover:underline transition-colors text-left cursor-pointer"
                  >
                    Careers
                  </button>
                </li>
              </ul>
            </div>

            {/* COLUMN 2: For customers */}
            <div className="space-y-3.5">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                For customers
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-600 font-normal">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal('reviews')}
                    className="hover:text-black hover:underline transition-colors text-left cursor-pointer"
                  >
                    UrgentLyfe reviews
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleCategoriesClick}
                    className="hover:text-black hover:underline transition-colors text-left cursor-pointer"
                  >
                    Categories near you
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal('contact')}
                    className="hover:text-black hover:underline transition-colors text-left cursor-pointer"
                  >
                    Contact us
                  </button>
                </li>
              </ul>
            </div>

            {/* COLUMN 3: For professionals */}
            <div className="space-y-3.5">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                For professionals
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-600 font-normal">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenProviderModal) {
                        onOpenProviderModal();
                      } else {
                        setActiveModal('careers');
                      }
                    }}
                    className="hover:text-black hover:underline transition-colors text-left cursor-pointer font-medium text-slate-800"
                  >
                    Register as a professional
                  </button>
                </li>
              </ul>
            </div>

            {/* COLUMN 4: Social links & App Badges */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Social links
              </h3>

              {/* 4 Circular Social Icon Buttons */}
              <div className="flex items-center gap-2.5">
                {/* X (formerly Twitter) */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (formerly Twitter)"
                  className="w-10 h-10 rounded-full bg-white border border-slate-300/80 flex items-center justify-center text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all shadow-2xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-white border border-slate-300/80 flex items-center justify-center text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all shadow-2xs"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-white border border-slate-300/80 flex items-center justify-center text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all shadow-2xs"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-white border border-slate-300/80 flex items-center justify-center text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all shadow-2xs"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>

              {/* App Store & Play Store Download Badges */}
              <div className="space-y-2.5 pt-1">
                {/* App Store Button */}
                <button
                  type="button"
                  onClick={() => setActiveModal('app-download')}
                  className="w-44 bg-black hover:bg-neutral-900 text-white px-3.5 py-1.5 rounded-lg flex items-center gap-2.5 transition-transform active:scale-95 shadow-sm border border-neutral-800 cursor-pointer"
                >
                  {/* Apple Icon */}
                  <svg className="w-6 h-6 fill-white shrink-0" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.66-7.79-11.89-14.24-5.23-8.05-9.48-17.26-12.76-27.63-3.28-10.37-4.92-20.47-4.92-30.3 0-14.43 3.63-26.6 10.89-36.5 7.26-9.9 16.59-14.93 27.99-15.09 5.42 0 11.2 1.34 17.34 4.02 6.13 2.68 10.02 4.07 11.66 4.17 1.48 0 5.48-1.42 12-4.26 6.52-2.84 12.28-4.04 17.28-3.6 13.08 1.08 23.36 6.25 30.84 15.5-11.53 6.97-17.18 16.52-16.94 28.65.26 9.47 3.86 17.47 10.81 24 3.73 3.51 7.97 6.13 12.72 7.86-2.1 6.23-4.72 12.69-7.85 19.38zM119.22 31.84c0-7.23 2.64-14.19 7.92-20.87 5.28-6.68 11.8-10.97 19.56-12.87.5 3.7.35 7.42-.45 11.16-.8 3.74-2.38 7.37-4.74 10.89-2.58 3.84-5.83 6.94-9.75 9.3-3.92 2.36-7.86 3.62-11.82 3.79-.24-.46-.46-.94-.72-1.4z" />
                  </svg>
                  <div className="text-left leading-none">
                    <span className="text-[9px] uppercase tracking-wider block text-slate-300 font-normal">
                      Download on the
                    </span>
                    <span className="text-xs font-bold text-white tracking-wide">
                      App Store
                    </span>
                  </div>
                </button>

                {/* Google Play Button */}
                <button
                  type="button"
                  onClick={() => setActiveModal('app-download')}
                  className="w-44 bg-black hover:bg-neutral-900 text-white px-3.5 py-1.5 rounded-lg flex items-center gap-2.5 transition-transform active:scale-95 shadow-sm border border-neutral-800 cursor-pointer"
                >
                  {/* Google Play Icon */}
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 512 512">
                    <path fill="#4285F4" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" />
                    <path fill="#34A853" d="M47 38.6c-4.2 7.7-6.6 16.9-6.6 27v380.8c0 10.1 2.4 19.3 6.6 27l239.5-239.5L47 38.6z" />
                    <path fill="#FBBC04" d="M325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z" />
                    <path fill="#EA4335" d="M465.1 230.9L385.4 185l-60.1 60.1 60.1 60.1 79.7-45.9c14.2-8.2 14.2-20.2 0-28.4z" />
                  </svg>
                  <div className="text-left leading-none">
                    <span className="text-[9px] uppercase tracking-wider block text-slate-300 font-normal">
                      GET IT ON
                    </span>
                    <span className="text-xs font-bold text-white tracking-wide">
                      Google Play
                    </span>
                  </div>
                </button>
              </div>
            </div>

          </div>

          {/* DIVIDER LINE */}
          <div className="border-t border-slate-300 pt-6 space-y-2">
            <p className="text-xs text-slate-500 font-normal">
              * As on December 31, 2024
            </p>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              © Copyright 2026 UrgentLyfe Limited (formerly known as UrgentLyfe Technologies India Limited and UrgentLyfe Technologies India Private Limited) All rights reserved.
            </p>
          </div>

        </div>
      </footer>

      {/* ========================================================================= */}
      {/* INTERACTIVE MODALS FOR ALL FOOTER LINKS ("aur sari work kare") */}
      {/* ========================================================================= */}

      {/* 1. ABOUT US MODAL */}
      {activeModal === 'about' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-black text-sm">
                  UL
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">About UrgentLyfe</h2>
                  <p className="text-xs text-slate-500">Transforming home services with trust and 30-min SOS speed</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-900">UrgentLyfe</strong> is India's premier hyper-local home services platform, connecting millions of homeowners with certified, background-verified professionals for AC repair, electrical emergencies, plumbing, salon &amp; spa, and home maintenance.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
                <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-200">
                  <div className="text-xl font-black text-slate-900">12M+</div>
                  <div className="text-[11px] text-slate-500">Homes Served</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-200">
                  <div className="text-xl font-black text-slate-900">4.8★</div>
                  <div className="text-[11px] text-slate-500">Service Rating</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-200">
                  <div className="text-xl font-black text-slate-900">45,000+</div>
                  <div className="text-[11px] text-slate-500">Certified Pros</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-200">
                  <div className="text-xl font-black text-slate-900">50+</div>
                  <div className="text-[11px] text-slate-500">Cities in India</div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-slate-900">Our Core Principles</h4>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>30-Day Free Rework Guarantee:</strong> If anything recurs, we send our top senior tech at ₹0 cost.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Standardized Fixed Pricing:</strong> Zero hidden surge charges, upfront transparency.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>30-Minute SOS Dispatch:</strong> Urgent electrical and pipe bursts handled instantly.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. INVESTOR RELATIONS MODAL */}
      {activeModal === 'investor' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Investor Relations</h2>
                  <p className="text-xs text-slate-500">Financial Reports, Governance &amp; Filings</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between font-semibold text-slate-800">
                  <span>Registrar &amp; Transfer Agent</span>
                  <span>Link Intime India Pvt Ltd</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-800">
                  <span>Auditors</span>
                  <span>Deloitte Haskins &amp; Sells LLP</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-slate-900 text-sm">Key Investor Announcements</h4>
                <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">Q3 FY26 Financial Results</p>
                    <p className="text-[11px] text-slate-500">Revenue up 42% YoY with positive operating cash flow</p>
                  </div>
                  <span className="text-emerald-600 font-bold text-[11px] bg-emerald-50 px-2 py-1 rounded">Audited</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">Annual ESG &amp; Worker Safety Report</p>
                    <p className="text-[11px] text-slate-500">100% health &amp; life insurance coverage for service partners</p>
                  </div>
                  <span className="text-blue-600 font-bold text-[11px] bg-blue-50 px-2 py-1 rounded">PDF</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 pt-2">
                For queries, reach out to our Investor Relations desk at <span className="text-blue-600 font-semibold">investor.relations@urgentlyfe.com</span>.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. TERMS & CONDITIONS MODAL */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Terms &amp; Conditions</h2>
                <p className="text-xs text-slate-500">Effective Date: January 1, 2026</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600 leading-relaxed max-h-96 overflow-y-auto pr-2">
              <section className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">1. Introduction &amp; Scope</h4>
                <p>
                  These Terms of Service govern your usage of the UrgentLyfe application and website. By accessing or booking any home services, you acknowledge and agree to comply with these terms.
                </p>
              </section>

              <section className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">2. 30-Day Free Rework Warranty</h4>
                <p>
                  Services marked with the 30-Day Guarantee badge entitle the customer to a free re-inspection and rework visit if the exact reported defect re-occurs within 30 calendar days from the completion timestamp.
                </p>
              </section>

              <section className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">3. Pricing &amp; Transparent Billing</h4>
                <p>
                  All quotes provided in-app are standardized. Spare parts required for replacement (e.g., capacitors, faucets, filters) are billed strictly at genuine OEM manufacturer rates with digital itemized invoices.
                </p>
              </section>

              <section className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">4. Cancellation &amp; Rescheduling</h4>
                <p>
                  Cancellations requested before the professional is dispatched incur ₹0 penalty. Instant SOS bookings canceled after the technician has traveled more than 50% distance may carry a nominal ₹49 travel fee.
                </p>
              </section>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-colors"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. PRIVACY POLICY MODAL */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Privacy Policy</h2>
                <p className="text-xs text-slate-500">Your data privacy and security are our top priority</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600 leading-relaxed max-h-96 overflow-y-auto pr-2">
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-2xl flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                <p>
                  UrgentLyfe complies with ISO/IEC 27001 standards and the Digital Personal Data Protection Act (DPDP). Your numbers and address are masked and never sold.
                </p>
              </div>

              <section className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Data We Collect</h4>
                <p>
                  We collect service address coordinates, phone numbers for OTP authorization, and optional diagnostics photos uploaded for AI fault detection.
                </p>
              </section>

              <section className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Number Masking on Calls</h4>
                <p>
                  When you or your assigned technician initiate a call, our virtual PBX masks both phone numbers to protect your personal privacy.
                </p>
              </section>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. ANTI-DISCRIMINATION POLICY MODAL */}
      {activeModal === 'anti-discrimination' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Anti-Discrimination Policy</h2>
                <p className="text-xs text-slate-500">Zero tolerance for bias, prejudice, and disrespect</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                UrgentLyfe is committed to maintaining a dignified, safe, and respectful environment for both customers and service partners.
              </p>
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <p className="font-bold text-slate-900">Zero Tolerance Guidelines:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>No discrimination based on religion, caste, race, disability, gender identity, or sexual orientation.</li>
                  <li>Service partners have the fundamental right to respectful treatment and clean drinking water while working on-site.</li>
                  <li>Any violation results in immediate deactivation from the UrgentLyfe platform.</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. CAREERS MODAL */}
      {activeModal === 'careers' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Careers at UrgentLyfe</h2>
                  <p className="text-xs text-slate-500">Build the future of doorstep home services with us</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              <p className="text-sm font-semibold text-slate-800">
                Join our mission to empower over 100,000 blue-collar professionals with dignified earnings and cutting-edge tech tools.
              </p>

              <div className="space-y-2.5 pt-1">
                <h4 className="font-bold text-slate-900 text-sm">Open Positions (HQ &amp; Tech)</h4>
                
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">Senior Full-Stack Engineer (React + Node)</h5>
                    <p className="text-[11px] text-slate-500">Bengaluru • Full Time • Engineering</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyLink('careers@urgentlyfe.com')}
                    className="text-xs font-bold text-blue-600 hover:underline px-3 py-1.5 bg-white rounded-lg border border-slate-200"
                  >
                    Apply Now
                  </button>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">City Operations Manager (North Region)</h5>
                    <p className="text-[11px] text-slate-500">Delhi NCR • Full Time • Operations</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyLink('careers@urgentlyfe.com')}
                    className="text-xs font-bold text-blue-600 hover:underline px-3 py-1.5 bg-white rounded-lg border border-slate-200"
                  >
                    Apply Now
                  </button>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">Product Designer (Design Systems &amp; Mobile)</h5>
                    <p className="text-[11px] text-slate-500">Remote / Bengaluru • Full Time • Design</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyLink('careers@urgentlyfe.com')}
                    className="text-xs font-bold text-blue-600 hover:underline px-3 py-1.5 bg-white rounded-lg border border-slate-200"
                  >
                    Apply Now
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 text-blue-950 p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs">Are you a technician or beautician?</p>
                  <p className="text-[11px] text-blue-700">Join as an independent service partner and earn ₹45,000+/mo</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null);
                    onOpenProviderModal?.();
                  }}
                  className="px-3.5 py-1.5 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700"
                >
                  Join as Pro
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. URGENTLYFE REVIEWS MODAL */}
      {activeModal === 'reviews' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">UrgentLyfe Customer Reviews</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-slate-900 text-sm">4.88 out of 5</span>
                  <span className="text-xs text-slate-400">(Based on 2,45,000+ verified ratings)</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 max-h-96 overflow-y-auto pr-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">Ananya Sharma</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Verified User</span>
                  </div>
                  <span className="text-xs text-slate-400">Bengaluru • 2 days ago</span>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "Booked the Power Foam Jet AC service. The technician Rajesh arrived in exactly 35 minutes with full high-pressure equipment. My AC is cooling like brand new now. Super clean work!"
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">Vikramaditya Rao</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Verified User</span>
                  </div>
                  <span className="text-xs text-slate-400">Mumbai • 4 days ago</span>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "Emergency plumbing request at 9 PM for a burst bathroom pipe. Plumber arrived with Teflon seals and fixed the main valve smoothly. Life saver!"
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">Pooja Nair</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Verified User</span>
                  </div>
                  <span className="text-xs text-slate-400">Delhi NCR • 1 week ago</span>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "The Forest Essentials luxury facial at home was sensational! Completely hygienic single-use kit opened in front of me. Highly recommend UrgentLyfe!"
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. CONTACT US MODAL */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Contact UrgentLyfe</h2>
                <p className="text-xs text-slate-500">24x7 Customer Helpline &amp; Emergency Assistance</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">24x7 SOS Support Hotline</h4>
                  <p className="text-slate-500">Toll Free: 1800-420-9999 / +91 80 4719 3300</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Customer Email Helpdesk</h4>
                  <p className="text-slate-500">support@urgentlyfe.com (Avg response: 15 mins)</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Corporate Headquarters</h4>
                  <p className="text-slate-500">UrgentLyfe Tower, Outer Ring Road, Bellandur, Bengaluru 560103</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. APP DOWNLOAD MODAL */}
      {activeModal === 'app-download' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 text-center">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-black text-white mx-auto flex items-center justify-center font-black text-2xl shadow-md">
              UL
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900">Get the UrgentLyfe App</h3>
              <p className="text-xs text-slate-500">
                Fastest booking, live partner GPS tracking, and exclusive in-app offers
              </p>
            </div>

            {/* Simulated QR Code */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block mx-auto">
              <div className="w-36 h-36 bg-white p-2 border border-slate-300 rounded-xl flex items-center justify-center">
                <div className="grid grid-cols-6 gap-1 w-full h-full p-1 bg-slate-900 rounded">
                  {[...Array(36)].map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        (i % 2 === 0 && i % 3 === 0) || i === 0 || i === 5 || i === 30 || i === 35
                          ? 'bg-white'
                          : 'bg-transparent'
                      } rounded-xs`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 font-medium">Scan with camera to install</p>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  handleCopyLink('https://urgentlyfe.com/download');
                  setActiveModal(null);
                }}
                className="w-full py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-colors shadow-sm"
              >
                Copy Download Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST FEEDBACK */}
      {copiedNotification && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-black text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl border border-slate-800 animate-in fade-in duration-200">
          {copiedNotification}
        </div>
      )}
    </>
  );
};
