import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  User,
  ShieldCheck,
  Wrench,
  Lock,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  UserPlus,
  LogIn,
  Smartphone,
  KeyRound,
  ChevronDown,
  Check,
  MapPin,
  Building,
} from 'lucide-react';
import { api } from '../../api/client';
import { UserRole, AuthResponse, Category } from '../../types';
import { CloudflareTurnstile } from './CloudflareTurnstile';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (authData: AuthResponse) => void;
  categories: Category[];
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  categories,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [loginMethod, setLoginMethod] = useState<'phone_otp' | 'password'>('phone_otp');
  const [phoneStep, setPhoneStep] = useState<'phone' | 'otp'>('phone');
  const [role, setRole] = useState<UserRole>('CUSTOMER');

  // Phone + Cloudflare States
  const [loginPhone, setLoginPhone] = useState('');
  const [cloudflareToken, setCloudflareToken] = useState<string | null>(null);
  const [otpBoxes, setOtpBoxes] = useState<string[]>(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(0);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Password Login States
  const [loginEmailOrPhone, setLoginEmailOrPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup States
  const [fullName, setFullName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [addressLine, setAddressLine] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [pincode, setPincode] = useState('');
  const [addressLabel, setAddressLabel] = useState<'Home' | 'Work' | 'Other'>('Home');

  // Provider Specific Fields
  const [skills, setSkills] = useState<string>('Electrical, AC Repair, Appliance Maintenance');
  const [experienceYears, setExperienceYears] = useState<number>(4);
  const [categoryId, setCategoryId] = useState<string>(categories[0]?.id || 'ac-appliance');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sync mode if initialMode changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setLoginMethod('phone_otp');
      setPhoneStep('phone');
      setError(null);
      setSuccessMessage(null);
      setCloudflareToken(null);
    }
  }, [isOpen, initialMode]);

  // OTP Countdown Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  if (!isOpen) return null;

  // Clean phone number
  const cleanPhone = loginPhone.replace(/[^0-9]/g, '');
  const isPhoneValid = cleanPhone.length === 10;
  const canContinue = isPhoneValid && Boolean(cloudflareToken);

  // Handle Send OTP (Transition to Step 2)
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!isPhoneValid) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!cloudflareToken) {
      setError('Please complete the Cloudflare security verification.');
      return;
    }

    setLoading(true);
    try {
      await api.sendOtp(cleanPhone);
      setPhoneStep('otp');
      setOtpTimer(30);
      setSuccessMessage(`OTP sent to +91 ${cleanPhone}`);
      setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      // Fallback demo mode
      setPhoneStep('otp');
      setOtpTimer(30);
      setSuccessMessage(`Demo OTP 123456 sent to +91 ${cleanPhone}`);
      setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP Box Change & Auto-Advance
  const handleOtpBoxChange = (index: number, val: string) => {
    const numericVal = val.replace(/[^0-9]/g, '');
    const newBoxes = [...otpBoxes];

    if (numericVal.length > 1) {
      // Pasted multiple digits
      const digits = numericVal.slice(0, 6).split('');
      digits.forEach((d, i) => {
        if (i < 6) newBoxes[i] = d;
      });
      setOtpBoxes(newBoxes);
      const nextIndex = Math.min(digits.length, 5);
      otpInputRefs.current[nextIndex]?.focus();
      return;
    }

    newBoxes[index] = numericVal;
    setOtpBoxes(newBoxes);

    if (numericVal && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpBoxes[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Fill demo code
  const handleFillDemoOtp = () => {
    setOtpBoxes(['1', '2', '3', '4', '5', '6']);
  };

  // Handle Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const fullOtp = otpBoxes.join('').trim();
    if (fullOtp.length < 6) {
      setError('Please enter the complete 6-digit verification code.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.verifyOtp({
        phone: cleanPhone,
        otp: fullOtp,
        role,
      });

      localStorage.setItem('urgentlyfe_jwt', response.token);
      onSuccess(response);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Invalid verification code. Please enter 123456 for demo.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Password Login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!loginEmailOrPhone.trim() || !loginPassword.trim()) {
      setError('Please enter both Email/Phone and Password.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.login({
        emailOrPhone: loginEmailOrPhone.trim(),
        password: loginPassword,
        role,
      });

      localStorage.setItem('urgentlyfe_jwt', response.token);
      onSuccess(response);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Signup
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!fullName.trim() || !signupEmail.trim() || !signupPhone.trim() || !signupPassword.trim()) {
      setError('Please fill in all required personal details.');
      return;
    }

    if (signupPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (signupPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const skillsArray = skills.split(',').map((s) => s.trim()).filter(Boolean);
      const response = await api.signup({
        email: signupEmail.trim(),
        password: signupPassword,
        fullName: fullName.trim(),
        phone: signupPhone.trim(),
        role,
        city,
        locality: locality || 'Koramangala',
        addressLine: addressLine || 'Main Road',
        pincode: pincode || '560001',
        addressLabel,
        skills: role === 'PROVIDER' ? skillsArray : undefined,
        experienceYears: role === 'PROVIDER' ? experienceYears : undefined,
        categoryId: role === 'PROVIDER' ? categoryId : undefined,
      });

      localStorage.setItem('urgentlyfe_jwt', response.token);
      onSuccess(response);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="auth-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* URBAN COMPANY STYLE MOBILE LOGIN + CLOUDFLARE TURNSTILE MODAL */}
      {mode === 'login' && loginMethod === 'phone_otp' ? (
        <div
          id="urban-company-login-card"
          className="relative w-full max-w-md bg-white rounded-3xl sm:rounded-[32px] shadow-2xl border border-slate-100 p-6 sm:p-8 transition-all animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Top-Right Circular Close Button (Matches video at 00:07 - 00:10) */}
          <button
            id="auth-modal-close-btn"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* STEP 1: ENTER PHONE NUMBER + CLOUDFLARE TURNSTILE (Exact layout from user's video) */}
          {phoneStep === 'phone' ? (
            <div>
              {/* Top-Left Phone Icon Badge (Soft Indigo Tint) */}
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 mb-4 shadow-2xs">
                <Phone className="w-5 h-5 text-indigo-600" />
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Enter your phone number
              </h2>
              <p className="text-xs text-slate-500 font-normal leading-relaxed mt-1 mb-5">
                We'll send you a text with a verification code. Standard tariff may apply.
              </p>

              {/* Error Alert */}
              {error && (
                <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Phone Input Box with +91 country prefix */}
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="border border-slate-300 focus-within:border-slate-800 focus-within:ring-1 focus-within:ring-slate-800 rounded-2xl flex items-center bg-white px-3.5 py-1 transition-all shadow-2xs">
                  <div className="flex items-center gap-1 text-slate-900 font-bold text-sm select-none pr-3 border-r border-slate-200">
                    <span>+91</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <input
                    id="user-phone-input"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={loginPhone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      setLoginPhone(val);
                      if (error) setError(null);
                    }}
                    placeholder="Enter your phone number"
                    autoFocus
                    className="w-full pl-3 py-2.5 text-sm sm:text-base font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none bg-transparent"
                  />
                </div>

                {/* Cloudflare Turnstile Security Verification Widget */}
                <div className="pt-1">
                  <CloudflareTurnstile
                    onVerify={(token) => {
                      setCloudflareToken(token);
                      if (error) setError(null);
                    }}
                    onReset={() => setCloudflareToken(null)}
                    autoVerify={true}
                  />
                </div>

                {/* Full-width Continue Button */}
                <button
                  id="phone-continue-btn"
                  type="submit"
                  disabled={!canContinue || loading}
                  className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all shadow-xs flex items-center justify-center gap-2 ${
                    canContinue && !loading
                      ? 'bg-slate-900 hover:bg-black text-white cursor-pointer active:scale-[0.99]'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span>Continue</span>
                  )}
                </button>
              </form>

              {/* T&C and Privacy policy disclaimer */}
              <p className="text-[11px] text-slate-500 text-center mt-5 leading-relaxed">
                By continuing, you agree to our{' '}
                <a href="#terms" className="font-semibold text-slate-800 hover:underline">
                  T&C
                </a>{' '}
                and{' '}
                <a href="#privacy" className="font-semibold text-slate-800 hover:underline">
                  Privacy policy
                </a>
              </p>

              {/* Alternative sign in switcher */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <button
                  type="button"
                  onClick={() => setLoginMethod('password')}
                  className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                >
                  Sign in with Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRole('PROVIDER');
                    setMode('signup');
                  }}
                  className="font-semibold text-amber-700 hover:text-amber-900 hover:underline cursor-pointer"
                >
                  Join as Partner →
                </button>
              </div>
            </div>
          ) : (
            /* STEP 2: ENTER VERIFICATION CODE (OTP) */
            <div>
              {/* Back to Phone Button */}
              <button
                type="button"
                onClick={() => {
                  setPhoneStep('phone');
                  setError(null);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 mb-3 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Change number</span>
              </button>

              {/* Top-Left Key Icon Badge */}
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 mb-4 shadow-2xs">
                <KeyRound className="w-5 h-5 text-indigo-600" />
              </div>

              {/* Title & Subtitle with dynamic phone */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Enter verification code
              </h2>
              <p className="text-xs text-slate-500 font-normal leading-relaxed mt-1 mb-5">
                We've sent a 6-digit verification code to{' '}
                <strong className="text-slate-800 font-bold">+91 {cleanPhone}</strong>
                <button
                  type="button"
                  onClick={() => setPhoneStep('phone')}
                  className="text-indigo-600 font-bold ml-1.5 hover:underline cursor-pointer"
                >
                  Edit
                </button>
              </p>

              {/* Error Alert */}
              {error && (
                <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Success Alert */}
              {successMessage && !error && (
                <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* 6 Discrete OTP Input Boxes */}
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div className="flex items-center justify-between gap-2">
                  {otpBoxes.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpBoxChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-black text-slate-900 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-600 focus:outline-none transition-all shadow-2xs"
                    />
                  ))}
                </div>

                {/* Quick Demo Helper & Resend Timer */}
                <div className="flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={handleFillDemoOtp}
                    className="text-[11px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Demo OTP: 123456</span>
                    <span className="underline">Auto-fill</span>
                  </button>

                  <div>
                    {otpTimer > 0 ? (
                      <span className="text-slate-400 font-medium text-[11px]">
                        Resend in <strong className="text-slate-700">00:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}</strong>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-[11px] font-bold text-slate-800 hover:text-indigo-600 hover:underline cursor-pointer"
                      >
                        Resend Code
                      </button>
                    )}
                  </div>
                </div>

                {/* Verify Button */}
                <button
                  id="otp-verify-submit-btn"
                  type="submit"
                  disabled={otpBoxes.join('').length < 6 || loading}
                  className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all shadow-xs flex items-center justify-center gap-2 ${
                    otpBoxes.join('').length === 6 && !loading
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer active:scale-[0.99]'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span>Verify & Continue</span>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        /* SECONDARY: PASSWORD LOGIN / SIGNUP VIEW */
        <div
          id="auth-modal-card"
          className="relative w-full max-w-lg bg-white rounded-3xl sm:rounded-[32px] shadow-2xl border border-slate-200/80 overflow-hidden my-4 sm:my-8 transition-all"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-2xl font-black text-white">
              {mode === 'login' ? 'Account Login' : 'Create an Account'}
            </h2>
            <p className="text-slate-300 text-xs mt-1">
              {mode === 'login'
                ? 'Sign in with your email or mobile password credentials.'
                : 'Join UrgentLyfe as a Customer or Verified Service Partner.'}
            </p>

            {/* Quick switcher back to Phone OTP Login */}
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setLoginMethod('phone_otp');
                setPhoneStep('phone');
              }}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>← Switch to Mobile OTP (Cloudflare Verified)</span>
            </button>
          </div>

          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {mode === 'login' ? (
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email or Phone Number</label>
                  <input
                    type="text"
                    value={loginEmailOrPhone}
                    onChange={(e) => setLoginEmailOrPhone(e.target.value)}
                    placeholder="user@example.com or 9876543210"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-800 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => setRole(role === 'CUSTOMER' ? 'PROVIDER' : 'CUSTOMER')}
                    className="text-slate-600 font-semibold hover:underline"
                  >
                    Role: <strong className="text-indigo-600">{role}</strong> (Click to toggle)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginEmailOrPhone('aarav.mehta@gmail.com');
                      setLoginPassword('password123');
                    }}
                    className="text-indigo-600 font-bold hover:underline"
                  >
                    Fill Demo User
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : 'Log In'}
                </button>
              </form>
            ) : (
              /* Signup Form */
              <form onSubmit={handleSignupSubmit} className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setRole('CUSTOMER')}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                      role === 'CUSTOMER' ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('PROVIDER')}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                      role === 'PROVIDER' ? 'bg-amber-50 border-amber-600 text-amber-800' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Service Partner
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="rahul@gmail.com"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Password *</label>
                    <input
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Confirm Password *</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>
                </div>

                {role === 'PROVIDER' && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                    <p className="text-xs font-bold text-amber-900">Partner Profession</p>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-amber-300 rounded-xl text-xs font-medium text-slate-900"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : 'Complete Registration'}
                </button>
              </form>
            )}

            <div className="pt-2 text-center text-xs text-slate-500">
              {mode === 'login' ? (
                <p>
                  Need an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-indigo-600 font-bold hover:underline"
                  >
                    Register here
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-indigo-600 font-bold hover:underline"
                  >
                    Log In
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
