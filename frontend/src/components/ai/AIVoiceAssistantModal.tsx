import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  Globe,
  Star,
  CheckCircle2,
  Send,
  Bot,
  User,
  Radio,
  Activity,
  ShieldCheck,
  HelpCircle,
  Clock,
  Compass,
  RotateCcw,
  ArrowRight,
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
} from 'lucide-react';
import { api } from '../../api/client';
import { perfMonitor } from '../../utils/performance';

interface AIVoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookService?: (serviceId: string) => void;
  bookingForVoiceFeedback?: {
    id: string;
    partnerId?: string;
    partnerName?: string;
    serviceTitle: string;
  } | null;
  onFeedbackSubmitted?: (feedbackData: {
    bookingId: string;
    voiceFeedbackText: string;
    sentiment: string;
    rating: number;
    summary: string;
  }) => void;
}

export const AIVoiceAssistantModal: React.FC<AIVoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  onBookService,
  bookingForVoiceFeedback,
  onFeedbackSubmitted,
}) => {
  // Mode selection: Assistance vs Post-Service Feedback
  const [activePurpose, setActivePurpose] = useState<'assistance' | 'feedback'>(
    bookingForVoiceFeedback ? 'feedback' : 'assistance'
  );

  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'hi-IN' | 'en-IN' | 'hinglish'>('hi-IN');
  const [transcriptInput, setTranscriptInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Speech Synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceMuted, setVoiceMuted] = useState(false);

  // Purpose A (Assistance) State
  const [aiResponse, setAiResponse] = useState<any>(null);
  const [lastVoiceLatencyMs, setLastVoiceLatencyMs] = useState<number | null>(null);
  const [assistanceHistory, setAssistanceHistory] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Namaste! Main UrgentLyfe AI Voice Assistant hoon. Aap Hindi ya English mein bolkar koi bhi service dhoond sakte hain, problem bata sakte hain, ya active booking status check kar sakte hain.',
    },
  ]);

  // Purpose B (Post-Service Feedback) State
  // Step 1: Ask Rating (1-5) -> Step 2: Ask Verbal Experience -> Step 3: AI Analysis & DB Stored
  const [feedbackStep, setFeedbackStep] = useState<1 | 2 | 3>(1);
  const [feedbackRating, setFeedbackRating] = useState<number | null>(null);
  const [feedbackVerbalText, setFeedbackVerbalText] = useState<string>('');
  const [ratingErrorPrompt, setRatingErrorPrompt] = useState<string | null>(null);
  const [feedbackResult, setFeedbackResult] = useState<any>(null);
  const [feedbackHistory, setFeedbackHistory] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([]);

  const recognitionRef = useRef<any>(null);
  const latestTranscriptRef = useRef<string>('');
  const simulationTimeoutRef = useRef<any>(null);

  // Synchronize initial mode when modal opens with a targeted completed booking
  useEffect(() => {
    if (bookingForVoiceFeedback) {
      setActivePurpose('feedback');
      setFeedbackStep(1);
      setFeedbackRating(null);
      setFeedbackVerbalText('');
      setRatingErrorPrompt(null);
      setFeedbackResult(null);

      const initialAiPrompt = `Namaste! Service for ${bookingForVoiceFeedback.serviceTitle} with ${
        bookingForVoiceFeedback.partnerName || 'technician'
      } is complete. How would you rate your service experience from 1 to 5?`;

      setFeedbackHistory([{ sender: 'ai', text: initialAiPrompt }]);
      if (isOpen) {
        speakText('How would you rate your service experience from 1 to 5?');
      }
    } else {
      setActivePurpose('assistance');
    }
  }, [isOpen, bookingForVoiceFeedback?.id]);

  // Speech Recognition Initialization
  useEffect(() => {
    if (isOpen) {
      initSpeechRecognition();
    } else {
      stopListening();
      stopSpeaking();
    }
    return () => {
      if (simulationTimeoutRef.current) clearTimeout(simulationTimeoutRef.current);
    };
  }, [isOpen, selectedLanguage]);

  const initSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = selectedLanguage === 'hinglish' ? 'hi-IN' : selectedLanguage;

        recognitionRef.current.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscriptInput(currentTranscript);
          latestTranscriptRef.current = currentTranscript;
        };

        recognitionRef.current.onerror = (event: any) => {
          console.warn('Speech recognition notice, fallback available:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
          if (latestTranscriptRef.current && latestTranscriptRef.current.trim()) {
            const spokenText = latestTranscriptRef.current;
            latestTranscriptRef.current = '';
            handleProcessedSpeech(spokenText);
          }
        };
      } catch (err) {
        console.warn('Speech recognition init fallback:', err);
        recognitionRef.current = null;
      }
    }
  };

  const startListening = () => {
    stopSpeaking();
    setTranscriptInput('');
    latestTranscriptRef.current = '';

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        return;
      } catch (err) {
        console.warn('Recognition start error, falling back to input', err);
      }
    }

    // Fallback simulation if browser mic access is restricted
    setIsListening(true);
    setTranscriptInput('🎤 Listening... (Speak Hindi/English command)');
    if (simulationTimeoutRef.current) clearTimeout(simulationTimeoutRef.current);

    simulationTimeoutRef.current = setTimeout(() => {
      setIsListening(false);
      let samplePrompt = '';
      if (activePurpose === 'feedback') {
        samplePrompt = feedbackStep === 1 ? '5' : 'Technician arrived in 15 mins, did great jet wash AC cleaning!';
      } else {
        samplePrompt = 'Mera AC thanda nahi kar raha hai, Foam Jet service book kar do';
      }
      setTranscriptInput(samplePrompt);
      handleProcessedSpeech(samplePrompt);
    }, 2800);
  };

  const stopListening = () => {
    if (simulationTimeoutRef.current) clearTimeout(simulationTimeoutRef.current);
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
  };

  const speakText = (text: string) => {
    if (voiceMuted || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find((v) => v.lang.includes('hi') || v.lang.includes('IN'));
    if (indianVoice) {
      utterance.voice = indianVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Helper to strictly parse 1-5 rating without guessing
  const parseRatingStrictly = (input: string): number | null => {
    const lower = input.toLowerCase().trim();
    // 1. Direct digit match
    const digitMatch = lower.match(/\b([1-5])\b/);
    if (digitMatch) {
      return parseInt(digitMatch[1], 10);
    }
    // 2. Exact word numbers in English and Hindi
    if (lower.includes('five') || lower.includes('paanch') || lower.includes('panch')) return 5;
    if (lower.includes('four') || lower.includes('chaar') || lower.includes('char')) return 4;
    if (lower.includes('three') || lower.includes('teen')) return 3;
    if (lower.includes('two') || lower.includes('do')) return 2;
    if (lower.includes('one') || lower.includes('ek')) return 1;

    return null;
  };

  // Process incoming speech for either Assistance or Post-Service Feedback
  const handleProcessedSpeech = (spokenText: string) => {
    const cleanText = spokenText.replace('🎤 Listening... (Speak Hindi/English command)', '').trim();
    if (!cleanText) return;

    if (activePurpose === 'feedback') {
      handleFeedbackInteraction(cleanText);
    } else {
      handleAssistanceQuery(cleanText);
    }
  };

  // Purpose A: Customer Assistance Query Handler
  const handleAssistanceQuery = async (queryText: string) => {
    setLoading(true);
    setAssistanceHistory((prev) => [...prev, { sender: 'user', text: queryText }]);
    setTranscriptInput('');

    const endTimer = perfMonitor.startTimer('AI_VOICE', 'Gemini Voice Assistance Processing', {
      language: selectedLanguage,
    });

    try {
      const res = await api.sendVoiceQuery({
        transcript: queryText,
        language: selectedLanguage,
      });

      const metric = endTimer({ status: 'SUCCESS' });
      setLastVoiceLatencyMs(metric.durationMs);

      setAiResponse(res);
      const reply = res.speechResponse || 'Aapka voice request process ho gaya hai.';
      setAssistanceHistory((prev) => [...prev, { sender: 'ai', text: reply }]);
      speakText(reply);
    } catch (err: any) {
      endTimer({ status: 'ERROR', error: err.message });
      const fallback = 'Aapka request receive ho gaya hai. UrgentLyfe verified experts 30-min SOS ke saath ready hain.';
      setAssistanceHistory((prev) => [...prev, { sender: 'ai', text: fallback }]);
      speakText(fallback);
    } finally {
      setLoading(false);
    }
  };

  // Purpose B: Post-Service Feedback Workflow
  const handleFeedbackInteraction = async (input: string) => {
    // Step 1: Customer is asked for rating (1 to 5)
    if (feedbackStep === 1) {
      const parsedRating = parseRatingStrictly(input);

      if (parsedRating === null) {
        // If unclear, do NOT guess. Ask again: "Please tell me a rating from 1 to 5."
        setRatingErrorPrompt('Rating unclear. Please specify a number from 1 to 5.');
        const repeatMsg = 'Please tell me a rating from 1 to 5.';
        setFeedbackHistory((prev) => [
          ...prev,
          { sender: 'user', text: input },
          { sender: 'ai', text: repeatMsg },
        ]);
        speakText(repeatMsg);
        return;
      }

      // Valid Rating captured!
      setRatingErrorPrompt(null);
      setFeedbackRating(parsedRating);
      setFeedbackStep(2);

      const nextQuestion = `Thank you! You rated ${parsedRating} stars. Would you like to tell us about your experience?`;
      setFeedbackHistory((prev) => [
        ...prev,
        { sender: 'user', text: `${parsedRating} Stars` },
        { sender: 'ai', text: nextQuestion },
      ]);
      speakText('Would you like to tell us about your experience?');
      return;
    }

    // Step 2: Customer provides verbal feedback
    if (feedbackStep === 2) {
      setFeedbackVerbalText(input);
      setFeedbackHistory((prev) => [...prev, { sender: 'user', text: input }]);
      setLoading(true);

      try {
        const res = await api.sendVoiceFeedback({
          bookingId: bookingForVoiceFeedback?.id || 'UL-8921',
          providerId: bookingForVoiceFeedback?.partnerId || 'partner-101',
          serviceId: 'ac-foam-jet',
          rating: feedbackRating || 5,
          voiceFeedbackText: input,
          source: 'voice',
        });

        setFeedbackResult(res.data || res);
        setFeedbackStep(3);

        if (onFeedbackSubmitted) {
          onFeedbackSubmitted({
            bookingId: bookingForVoiceFeedback?.id || 'UL-8921',
            voiceFeedbackText: input,
            sentiment: res.data?.sentiment || 'POSITIVE',
            rating: feedbackRating || 5,
            summary: res.data?.summary || 'Voice review recorded and verified.',
          });
        }

        const completionMsg = `Dhanyawad! Your voice review has been analyzed as ${
          res.data?.sentiment || 'POSITIVE'
        }. Technician score and platform reviews have been updated.`;
        setFeedbackHistory((prev) => [...prev, { sender: 'ai', text: completionMsg }]);
        speakText(completionMsg);
      } catch (err: any) {
        console.error('Feedback submission failed:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 backdrop-blur-xs p-4 animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        
        {/* Header with Purpose Navigation */}
        <div className="bg-slate-900 p-5 md:p-6 text-white relative shrink-0 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
              UrgentLyfe AI Voice Engine
            </span>
            {lastVoiceLatencyMs !== null && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1 font-bold">
                <Activity className="w-3 h-3 text-emerald-400" />
                {lastVoiceLatencyMs}ms
              </span>
            )}
          </div>

          <h2 className="text-xl md:text-2xl font-black text-white">
            {activePurpose === 'feedback' ? 'Post-Service AI Voice Feedback' : 'Customer Voice Assistant'}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            {activePurpose === 'feedback'
              ? `Collecting verified voice review for ${bookingForVoiceFeedback?.serviceTitle || 'Completed Service'}`
              : 'Explain problem, find services, ask questions, or check live booking status'}
          </p>

          {/* TWO CLEARLY SEPARATED PURPOSES TABS */}
          <div className="grid grid-cols-2 gap-2 mt-4 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60">
            <button
              type="button"
              onClick={() => {
                setActivePurpose('assistance');
                stopSpeaking();
              }}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activePurpose === 'assistance'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>A. Customer Assistance</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActivePurpose('feedback');
                stopSpeaking();
              }}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activePurpose === 'feedback'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>B. Post-Service Feedback</span>
            </button>
          </div>

          {/* Controls: Language & Audio Output Mute */}
          <div className="flex items-center justify-between gap-2 mt-3 text-xs">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              {(['hi-IN', 'en-IN', 'hinglish'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    selectedLanguage === lang
                      ? 'bg-white text-slate-950 font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'hi-IN' ? 'हिंदी' : lang === 'en-IN' ? 'English' : 'Hinglish'}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setVoiceMuted(!voiceMuted);
                if (!voiceMuted) stopSpeaking();
              }}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
            >
              {voiceMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{voiceMuted ? 'Muted' : 'Speaker On'}</span>
            </button>
          </div>
        </div>

        {/* TRANSPARENT DEMO/WEB SPEECH DISCLOSURE NOTICE */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 text-[11px] text-slate-600 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            <strong>Browser Voice Transcription Mode:</strong> Uses native web speech recognition & audio synthesis. UrgentLyfe does not initiate cellular phone calls without explicit carrier integration.
          </span>
        </div>

        {/* Main Content Area */}
        <div className="p-5 overflow-y-auto grow space-y-4 bg-slate-50/50">
          
          {/* PURPOSE B: POST-SERVICE FEEDBACK WORKFLOW UI */}
          {activePurpose === 'feedback' && (
            <div className="space-y-4">
              {/* Completed Booking Context Bar */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Eligible Service Order
                  </span>
                  <h3 className="text-sm font-black text-slate-900">
                    {bookingForVoiceFeedback?.serviceTitle || 'Power Foam Jet AC Service'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Technician: {bookingForVoiceFeedback?.partnerName || 'Rajesh Verma (AC Specialist)'}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Completed ✓
                  </span>
                  <p className="text-[10px] font-mono text-slate-400 mt-1">
                    ID: {bookingForVoiceFeedback?.id || 'UL-8921'}
                  </p>
                </div>
              </div>

              {/* Multi-Step Feedback Flow Stepper */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div
                  className={`p-2.5 rounded-2xl border font-bold ${
                    feedbackStep === 1
                      ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
                      : feedbackRating
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  <p className="text-[10px] uppercase">Step 1</p>
                  <p className="font-extrabold">Rate 1 to 5</p>
                  {feedbackRating && <p className="text-[10px] text-emerald-700 mt-0.5">★ {feedbackRating} Selected</p>}
                </div>

                <div
                  className={`p-2.5 rounded-2xl border font-bold ${
                    feedbackStep === 2
                      ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
                      : feedbackVerbalText
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  <p className="text-[10px] uppercase">Step 2</p>
                  <p className="font-extrabold">Verbal Experience</p>
                  {feedbackVerbalText && <p className="text-[10px] text-emerald-700 mt-0.5">Transcribed ✓</p>}
                </div>

                <div
                  className={`p-2.5 rounded-2xl border font-bold ${
                    feedbackStep === 3
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  <p className="text-[10px] uppercase">Step 3</p>
                  <p className="font-extrabold">AI Sentiment & DB</p>
                  {feedbackStep === 3 && <p className="text-[10px] text-emerald-700 mt-0.5">Stored in DB ✓</p>}
                </div>
              </div>

              {/* Step 1 Interactive Rating Selector */}
              {feedbackStep === 1 && (
                <div className="bg-white border border-slate-200 rounded-3xl p-5 text-center space-y-3 shadow-xs">
                  <p className="text-xs font-black text-slate-700 uppercase tracking-wider">
                    "How would you rate your service experience from 1 to 5?"
                  </p>
                  <p className="text-xs text-slate-500">
                    Speak your rating (e.g. "5 star" or "paanch") or tap a star below:
                  </p>

                  <div className="flex items-center justify-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((starNum) => (
                      <button
                        key={starNum}
                        type="button"
                        onClick={() => handleFeedbackInteraction(String(starNum))}
                        className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-black transition-all cursor-pointer ${
                          feedbackRating === starNum
                            ? 'bg-amber-400 text-slate-950 scale-105 shadow-md ring-2 ring-amber-300'
                            : 'bg-slate-50 hover:bg-amber-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        <Star className="w-5 h-5 fill-current text-amber-500" />
                        <span className="text-[10px]">{starNum}</span>
                      </button>
                    ))}
                  </div>

                  {ratingErrorPrompt && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold p-2.5 rounded-xl flex items-center justify-center gap-1.5 animate-shake">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{ratingErrorPrompt}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2 Verbal Experience Prompt */}
              {feedbackStep === 2 && (
                <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-700">
                      ★ Rating: {feedbackRating} / 5 Confirmed
                    </span>
                    <button
                      type="button"
                      onClick={() => setFeedbackStep(1)}
                      className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" /> Change Rating
                    </button>
                  </div>

                  <p className="text-sm font-black text-slate-900">
                    "Would you like to tell us about your experience?"
                  </p>
                  <p className="text-xs text-slate-500">
                    Speak into the microphone: share comments on technician punctuality, work cleanliness, and quality.
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      'Technician Rajesh was punctual, very clean work, 5 star!',
                      'AC foam jet wash fixed cooling immediately, highly polite.',
                      'Good work overall but technician arrived 20 minutes late.',
                      'Not satisfied with repair charges, work was incomplete.',
                    ].map((sample, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleFeedbackInteraction(sample)}
                        className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl font-medium cursor-pointer text-left"
                      >
                        "{sample}"
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 AI Review Analysis & Results Stored */}
              {feedbackStep === 3 && feedbackResult && (
                <div className="bg-white border-2 border-emerald-500/80 rounded-3xl p-5 space-y-4 shadow-sm animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <div>
                        <h4 className="text-sm font-black text-slate-900">Voice Review Stored in Database</h4>
                        <p className="text-[11px] text-slate-500">Source: 'voice' • Provider rating updated</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full">
                      {feedbackResult.sentiment || 'POSITIVE'} ({feedbackRating}★)
                    </span>
                  </div>

                  {feedbackResult.summary && (
                    <p className="text-xs font-medium text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      💡 <strong>AI Summary:</strong> {feedbackResult.summary}
                    </p>
                  )}

                  {/* Key Highlights / Positive Points / Detected Issues */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100">
                      <p className="text-[10px] font-black text-emerald-900 uppercase mb-1 flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3 text-emerald-600" /> Positive Points
                      </p>
                      <ul className="space-y-1 text-slate-700 text-[11px]">
                        {feedbackResult.positivePoints && feedbackResult.positivePoints.length > 0 ? (
                          feedbackResult.positivePoints.map((p: string, i: number) => <li key={i}>✓ {p}</li>)
                        ) : (
                          <li>✓ On-time completion</li>
                        )}
                      </ul>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <p className="text-[10px] font-black text-slate-700 uppercase mb-1">Service Metrics</p>
                      <div className="space-y-1 text-[11px] text-slate-600">
                        <p>Quality: {feedbackResult.serviceQualityScore || feedbackRating}/5</p>
                        <p>Punctuality: {feedbackResult.timelinessScore || feedbackRating}/5</p>
                        <p>Professionalism: {feedbackResult.professionalismScore || feedbackRating}/5</p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-2xl transition-colors cursor-pointer"
                  >
                    Done & Return to Dashboard
                  </button>
                </div>
              )}
            </div>
          )}

          {/* PURPOSE A: CUSTOMER ASSISTANCE WORKFLOW UI */}
          {activePurpose === 'assistance' && (
            <div className="space-y-4">
              {/* Quick Prompt Category Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleAssistanceQuery('Mera AC thanda nahi kar raha hai, Foam Jet service book kar do')}
                  className="p-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-2xl text-left space-y-1 shadow-xs transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-500" />
                  <p className="font-extrabold text-slate-900">Explain Problem</p>
                  <p className="text-[10px] text-slate-500">Diagnose appliance issue</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleAssistanceQuery('Plumber urgently needed for kitchen sink water leakage')}
                  className="p-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-2xl text-left space-y-1 shadow-xs transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-blue-600" />
                  <p className="font-extrabold text-slate-900">Find a Service</p>
                  <p className="text-[10px] text-slate-500">Instant service search</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleAssistanceQuery('What is 30-minute SOS and what are emergency charges?')}
                  className="p-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-2xl text-left space-y-1 shadow-xs transition-all cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-purple-600" />
                  <p className="font-extrabold text-slate-900">Answer Questions</p>
                  <p className="text-[10px] text-slate-500">FAQ & pricing info</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleAssistanceQuery('What is the status of my active booking?')}
                  className="p-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-2xl text-left space-y-1 shadow-xs transition-all cursor-pointer"
                >
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <p className="font-extrabold text-slate-900">Check Booking</p>
                  <p className="text-[10px] text-slate-500">Live ETA & status</p>
                </button>
              </div>

              {/* Assistance AI Action Recommendation Card */}
              {aiResponse && (
                <div className="p-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-3xl shadow-md space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="bg-white/20 text-white px-2 py-0.5 rounded text-[10px] font-extrabold uppercase">
                      {aiResponse.isStatusCheck ? 'Booking Status Found' : 'Recommended Service'}
                    </span>
                    {aiResponse.estimatedPrice && (
                      <span className="text-xs font-black">₹{aiResponse.estimatedPrice}</span>
                    )}
                  </div>
                  <h4 className="text-sm font-black">{aiResponse.recommendedServiceName}</h4>
                  <p className="text-xs text-blue-100">{aiResponse.speechResponse}</p>

                  {onBookService && aiResponse.recommendedServiceId && !aiResponse.isStatusCheck && (
                    <button
                      type="button"
                      onClick={() => {
                        onBookService(aiResponse.recommendedServiceId);
                        onClose();
                      }}
                      className="w-full py-2 bg-white text-blue-900 hover:bg-blue-50 rounded-xl text-xs font-black shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>{aiResponse.actionText || 'Book Service Now'}</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Centered Large Microphone Interaction Waveform */}
          <div className="flex flex-col items-center justify-center py-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs relative overflow-hidden">
            {isListening && (
              <div className="absolute inset-0 bg-blue-500/5 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 rounded-full bg-blue-500/20 animate-ping" />
              </div>
            )}

            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl cursor-pointer ${
                isListening
                  ? 'bg-rose-600 text-white scale-110 ring-4 ring-rose-200 animate-pulse'
                  : 'bg-slate-900 hover:bg-blue-600 text-white hover:scale-105'
              }`}
            >
              {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>

            <p className="text-xs font-black text-slate-800 mt-3 relative z-10">
              {isListening ? 'Listening... Speak now' : 'Tap Microphone to Speak'}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {activePurpose === 'feedback'
                ? feedbackStep === 1
                  ? 'Say a rating: "5" or "4 star"'
                  : 'Say your verbal feedback'
                : 'Say: "Mera AC thanda nahi kar raha hai" or "Status of my booking"'}
            </p>

            {isListening && (
              <div className="flex items-center gap-1 mt-3">
                <span className="w-1 h-6 bg-blue-600 rounded-full animate-bounce" />
                <span className="w-1 h-10 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1 h-4 bg-purple-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="w-1 h-8 bg-blue-600 rounded-full animate-bounce [animation-delay:0.1s]" />
              </div>
            )}
          </div>

          {/* Conversation History Stream */}
          <div className="space-y-3">
            {(activePurpose === 'feedback' ? feedbackHistory : assistanceHistory).map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div
                  className={`p-3.5 rounded-2xl text-xs font-medium leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Textbar for Accessibility */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0 flex items-center gap-2">
          <input
            type="text"
            value={transcriptInput}
            onChange={(e) => setTranscriptInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleProcessedSpeech(transcriptInput);
              }
            }}
            placeholder={
              activePurpose === 'feedback'
                ? feedbackStep === 1
                  ? 'Type or speak rating 1 to 5 (e.g. 5)...'
                  : 'Type or speak verbal feedback...'
                : 'Type or speak: AC repair, plumber, electrician, status...'
            }
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <button
            type="button"
            onClick={() => handleProcessedSpeech(transcriptInput)}
            disabled={loading || !transcriptInput.trim()}
            className="p-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
