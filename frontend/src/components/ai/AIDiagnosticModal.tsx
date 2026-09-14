import React, { useState } from 'react';
import {
  X,
  Stethoscope,
  Sparkles,
  Upload,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Wrench,
  IndianRupee,
  Loader2,
  Zap,
} from 'lucide-react';
import { AIDiagnosis } from '../../types';
import { api } from '../../api/client';

interface AIDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryHint?: string;
  onBookDiagnosis: (diagnosis: AIDiagnosis) => void;
}

export const AIDiagnosticModal: React.FC<AIDiagnosticModalProps> = ({
  isOpen,
  onClose,
  categoryHint = '',
  onBookDiagnosis,
}) => {
  const [problemText, setProblemText] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<AIDiagnosis | null>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunDiagnostic = async () => {
    const textToSubmit = problemText.trim() || (imagePreview ? 'Uploaded photo of home issue for visual diagnosis' : '');
    if (!textToSubmit) {
      setError('Please describe the issue or upload a photo of the appliance or damage.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await api.diagnoseIssue({
        problemDescription: textToSubmit,
        imageBase64: imagePreview || undefined,
        categoryHint,
      });

      setDiagnosis(result);
    } catch (err: any) {
      console.error('Diagnostic failed:', err);
      setError(err.message || 'AI Diagnosis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-600 text-white animate-pulse';
      case 'HIGH':
        return 'bg-orange-500 text-white';
      case 'MEDIUM':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const getActionLabel = (diag: any) => {
    const text = `${diag.suggestedCategory || ''} ${diag.issueSummary || ''} ${diag.rootCause || ''}`.toLowerCase();
    if (text.includes('plumb') || text.includes('pipe') || text.includes('tap') || text.includes('drain') || text.includes('basin') || text.includes('water leak')) {
      return 'Find a Plumber';
    }
    if (text.includes('electr') || text.includes('mcb') || text.includes('switch') || text.includes('spark') || text.includes('socket') || text.includes('circuit')) {
      return 'Find an Electrician';
    }
    if (text.includes('ac') || text.includes('cooling') || text.includes('air condition') || text.includes('compressor')) {
      return 'Find an AC Specialist';
    }
    if (text.includes('washing') || text.includes('refrigerat') || text.includes('appliance') || text.includes('fridge') || text.includes('ro purifier')) {
      return 'Find an Appliance Specialist';
    }
    if (text.includes('paint') || text.includes('seepage') || text.includes('wall') || text.includes('waterproof')) {
      return 'Find a Wall & Seepage Expert';
    }
    return 'Find Verified Specialist';
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-amber-500 flex items-center justify-center text-white shadow-md">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Google Gemini AI Intelligence
              </span>
              <h2 className="text-xl font-black">AI Repair Diagnostic & Fix Estimator</h2>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Describe symptoms or upload a photo of the leaking AC, tripping MCB, or broken pipe to get an instant AI root-cause report & cost estimate.
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {!diagnosis ? (
            /* Input Form */
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Describe the Issue / Error Code / Noise / Leakage *
                </label>
                <textarea
                  id="ai-diagnostic-problem-input"
                  rows={4}
                  value={problemText}
                  onChange={(e) => setProblemText(e.target.value)}
                  placeholder="E.g., Split AC in master bedroom is making clicking noise and dropping water on wall. Cooling stopped 2 hours ago."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Photo Upload Option */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Upload Photo of Appliance / Issue (Optional)
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {imagePreview ? (
                    <div className="flex items-center justify-center gap-3">
                      <img
                        src={imagePreview}
                        alt="Issue Preview"
                        className="h-16 w-16 object-cover rounded-lg border border-slate-300"
                      />
                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-800">Photo Attached!</p>
                        <p className="text-[10px] text-slate-500">Gemini vision will analyze visual defects</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 text-slate-500">
                      <Upload className="w-6 h-6 text-indigo-600" />
                      <span className="text-xs font-semibold text-slate-700">Click to upload photo</span>
                      <span className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 10MB</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 5 Core Problem Presets from Prompt */}
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Quick Select Common Home Problems (AI Pre-trained):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {[
                    { label: '🚰 1. Leaking Pipe / Basin Drain Leak', text: 'Water pipe leaking under kitchen basin and dripping continuously' },
                    { label: '⚡ 2. Damaged Switch / Sparking Socket', text: 'Wall switch damaged, sparking when turning on, MCB tripping' },
                    { label: '❄️ 3. AC Water Leak / Cooling Issue', text: 'Split AC leaking water inside room and not cooling properly' },
                    { label: '🧺 4. Appliance Fault (Washer / Fridge)', text: 'Washing machine not spinning and making loud grinding noise' },
                    { label: '🧱 5. Wall Seepage / Moisture Damage', text: 'Wall seepage with damp patches, bubbling paint and water marks' },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setProblemText(preset.text)}
                      className="text-[11px] text-left bg-slate-50 hover:bg-indigo-50 text-slate-800 hover:text-indigo-700 p-2 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors cursor-pointer font-medium"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                id="run-ai-diagnostic-submit-btn"
                onClick={handleRunDiagnostic}
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-500/25 text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Gemini AI Engine Analyzing Defect...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Run Gemini AI Diagnostic Report</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Diagnostic Output View */
            <div className="space-y-6">
              {/* Top Summary Banner */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider ${getSeverityBadge(
                      diagnosis.severity
                    )}`}
                  >
                    SEVERITY: {diagnosis.severity}
                  </span>
                  <span className="text-[11px] text-slate-400">Est. Time: {diagnosis.estimatedDurationMinutes} Mins</span>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Possible Issue Detected</p>
                  <h3 className="text-lg font-black text-white">{diagnosis.issueSummary}</h3>
                </div>

                <div className="bg-white/10 p-3 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Recommended Service</span>
                    <span className="font-extrabold text-amber-300">
                      {diagnosis.suggestedCategory || 'Professional Home Repair'}
                    </span>
                  </div>
                  <span className="text-[11px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded">
                    Preliminary AI Estimate
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{diagnosis.explanation}</p>
              </div>

              {/* Transparent Uncertainty Notice */}
              <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-950 flex items-start gap-2.5 shadow-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold text-amber-900">Transparent AI Diagnostics Notice</p>
                  <p className="text-amber-800 text-[11px] leading-relaxed">
                    This is a preliminary diagnosis based on symptoms and visual cues. Complex home appliances and electrical/plumbing circuits often contain concealed parts that cannot be diagnosed with 100% certainty remotely. A certified technician will carry out a physical inspection on-site before initiating work.
                  </p>
                </div>
              </div>

              {/* Root Cause */}
              <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-4">
                <h4 className="text-xs font-bold text-indigo-900 mb-1 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-indigo-600" />
                  <span>Identified Root Cause</span>
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">{diagnosis.rootCause}</p>
              </div>

              {/* Safety Precautions */}
              {diagnosis.safetyPrecautions?.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-red-900 mb-2 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    <span>Safety Precautions Before Technician Arrival</span>
                  </h4>
                  <ul className="space-y-1">
                    {diagnosis.safetyPrecautions.map((sec, i) => (
                      <li key={i} className="text-xs text-red-800 flex items-start gap-2">
                        <span className="font-bold">•</span>
                        <span>{sec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommended Parts */}
              {diagnosis.recommendedParts?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Recommended Spare Parts
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {diagnosis.recommendedParts.map((part, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-lg border border-slate-200">
                        {part}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Estimated Pricing Breakdown */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">AI Cost Estimate Breakdown</h4>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Technician Labor Charge</span>
                  <span className="font-semibold text-slate-900">₹{diagnosis.estimatedLaborCost}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Estimated Hardware / Spare Parts</span>
                  <span className="font-semibold text-slate-900">₹{diagnosis.estimatedPartsCost}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                  <span>Estimated Total</span>
                  <span className="text-indigo-600 font-black">₹{diagnosis.estimatedTotalCost}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setDiagnosis(null)}
                  className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold px-4 py-3 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Re-analyze
                </button>

                <button
                  id="book-ai-diagnosis-cta-btn"
                  onClick={() => {
                    onBookDiagnosis(diagnosis);
                    onClose();
                  }}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md shadow-indigo-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>{getActionLabel(diagnosis)} (₹{diagnosis.estimatedTotalCost})</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
