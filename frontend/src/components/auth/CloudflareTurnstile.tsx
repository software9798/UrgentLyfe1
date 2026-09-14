import React, { useState, useEffect } from 'react';
import { Check, RotateCw } from 'lucide-react';

interface CloudflareTurnstileProps {
  onVerify: (token: string) => void;
  onReset?: () => void;
  autoVerify?: boolean;
}

export const CloudflareTurnstile: React.FC<CloudflareTurnstileProps> = ({
  onVerify,
  onReset,
  autoVerify = true,
}) => {
  const [status, setStatus] = useState<'initial' | 'verifying' | 'success'>('initial');

  const triggerVerification = () => {
    if (status === 'verifying' || status === 'success') return;
    setStatus('verifying');

    // Simulate Cloudflare cryptographic challenge solving (approx 1.2s - 1.8s)
    const delay = Math.floor(1100 + Math.random() * 500);
    const timer = setTimeout(() => {
      const generatedToken = `0.cf-turnstile-${Math.random().toString(36).substring(2, 15)}-${Date.now()}`;
      setStatus('success');
      onVerify(generatedToken);
    }, delay);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (autoVerify) {
      const initialTimer = setTimeout(() => {
        triggerVerification();
      }, 400);
      return () => clearTimeout(initialTimer);
    }
  }, [autoVerify]);

  const handleManualClick = () => {
    if (status === 'initial') {
      triggerVerification();
    } else if (status === 'success') {
      // already verified
    }
  };

  return (
    <div
      id="cloudflare-turnstile-widget"
      className={`w-full bg-slate-50/90 border rounded-2xl p-3 sm:px-4 sm:py-3 flex items-center justify-between select-none transition-all ${
        status === 'success'
          ? 'border-emerald-200/90 bg-emerald-50/20'
          : status === 'verifying'
          ? 'border-indigo-200/80 bg-indigo-50/20 shadow-2xs'
          : 'border-slate-200/90 hover:border-slate-300'
      }`}
    >
      {/* Left interactive challenge state */}
      <div className="flex items-center gap-3">
        {status === 'initial' && (
          <button
            type="button"
            onClick={handleManualClick}
            className="w-6 h-6 rounded-md border-2 border-slate-300 bg-white hover:border-slate-400 hover:shadow-xs flex items-center justify-center transition-all cursor-pointer group"
            title="Verify you are human"
          >
            <div className="w-2.5 h-2.5 rounded-xs bg-transparent group-hover:bg-slate-200 transition-colors" />
          </button>
        )}

        {status === 'verifying' && (
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
          </div>
        )}

        {status === 'success' && (
          <div className="w-6 h-6 rounded-md bg-emerald-500 text-white flex items-center justify-center shadow-xs animate-in zoom-in-75 duration-200">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        )}

        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-800 tracking-tight">
            {status === 'initial' && 'Verify you are human'}
            {status === 'verifying' && 'Verifying...'}
            {status === 'success' && 'Success!'}
          </span>
          {status === 'verifying' && (
            <span className="text-[10px] text-slate-400">Secured challenge verification</span>
          )}
        </div>
      </div>

      {/* Right official Cloudflare Turnstile branding */}
      <div className="flex items-center gap-2 pl-3 border-l border-slate-200/70">
        {/* Authentic Cloudflare Cloud Vector */}
        <svg
          className="w-7 h-5 shrink-0"
          viewBox="0 0 120 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Cloudflare Logo"
        >
          <path
            d="M87.8 28.5C85.5 12.3 71.6 0 54.8 0 41.2 0 29.5 8.1 24.3 19.8 10.6 21.2 0 32.8 0 47.1 0 62.5 12.5 75 27.9 75h61.8c16.7 0 30.3-13.6 30.3-30.3 0-14.8-10.7-27.1-25-29.6l-7.2 13.4z"
            fill="#F6821F"
          />
          <path
            d="M93.3 28.5c-2.3 0-4.5.3-6.6.9l-2.6 4.9 3.7 6.8c1.7-.5 3.6-.8 5.5-.8 11.2 0 20.3 9.1 20.3 20.3 0 1.2-.1 2.3-.3 3.5 4.1-2.9 6.7-7.6 6.7-12.9 0-12.5-10.2-22.7-22.7-22.7z"
            fill="#FAAD3F"
          />
        </svg>

        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-black text-slate-800 tracking-wider">CLOUDFLARE</span>
          <div className="flex items-center gap-1 text-[9px] text-slate-400 mt-0.5">
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noreferrer"
              className="hover:underline hover:text-slate-600"
            >
              Privacy
            </a>
            <span>•</span>
            <a
              href="https://www.cloudflare.com/website-terms/"
              target="_blank"
              rel="noreferrer"
              className="hover:underline hover:text-slate-600"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
