import React, { useState } from 'react';
import { X, Check, Package, Sparkles } from 'lucide-react';
import { ServiceItem } from '../../types';

interface SalonEditPackageModalProps {
  service: ServiceItem;
  isOpen: boolean;
  onClose: () => void;
  onSavePackage: (updatedService: ServiceItem) => void;
}

export const SalonEditPackageModal: React.FC<SalonEditPackageModalProps> = ({
  service,
  isOpen,
  onClose,
  onSavePackage,
}) => {
  if (!isOpen) return null;

  const isPrime = service.id.startsWith('prime');

  // Choices tailored for Prime & Luxe
  const waxChoices = isPrime
    ? [
        { name: 'Honey Classic Spatula (Full arms + legs)', priceDiff: 0 },
        { name: 'RICA Gold Liposoluble Spatula (Full arms + legs)', priceDiff: 150 },
        { name: 'Honey Roll-on Cartridge (Full arms + legs)', priceDiff: 200 },
        { name: 'RICA Gold Roll-on Cartridge (Full arms + legs)', priceDiff: 300 },
      ]
    : [
        { name: 'RICA gold tin (Full arms + legs)', priceDiff: 0 },
        { name: 'Cirépil Mojito Roll-on (Full arms + legs)', priceDiff: 250 },
        { name: 'RICA Gold Roll-on (Full arms + legs)', priceDiff: 200 },
      ];

  const facialChoices = isPrime
    ? [
        { name: 'Raaga De-Tan Pack & Cleanup', priceDiff: 0 },
        { name: 'O3+ Seaweed Brightening Cleanup', priceDiff: 250 },
        { name: 'Derma Niacinamide + Cryofacial Ice Therapy', priceDiff: 600 },
        { name: 'Pure Uji Matcha Detox Facial', priceDiff: 500 },
      ]
    : [
        { name: 'Hydra Mud Glow Cleanup', priceDiff: 0 },
        { name: 'Detox Mud Cleanup', priceDiff: 200 },
        { name: 'Korean Glass Skin Facial', priceDiff: 850 },
      ];

  const threadingChoices = [
    { name: 'Eyebrow shaping + Upper lip threading', priceDiff: 0 },
    { name: 'Eyebrow + Upper lip + Chin threading', priceDiff: 50 },
    { name: 'Full face threading', priceDiff: 120 },
    { name: 'Peel-off upper lip wax', priceDiff: 60 },
  ];

  const addOnChoices = isPrime
    ? [
        { name: 'Cut, file & polish (Feet)', priceDiff: 0 },
        { name: 'Crystal Rose Spa Pedicure', priceDiff: 350 },
        { name: 'Face & Neck Raaga De-Tan', priceDiff: 200 },
        { name: 'Warm Almond Scalp Massage (15 mins)', priceDiff: 180 },
      ]
    : [
        { name: 'Cut, file & polish (Feet)', priceDiff: 0 },
        { name: 'Warm Shea Candle Spa Pedicure', priceDiff: 450 },
        { name: 'Deep Heel Callus Peel', priceDiff: 300 },
      ];

  const [selectedWax, setSelectedWax] = useState(waxChoices[0].name);
  const [selectedFacial, setSelectedFacial] = useState(facialChoices[0].name);
  const [selectedThreading, setSelectedThreading] = useState(threadingChoices[0].name);
  const [selectedAddOn, setSelectedAddOn] = useState(addOnChoices[0].name);

  const currentWaxDiff = waxChoices.find((w) => w.name === selectedWax)?.priceDiff || 0;
  const currentFacialDiff = facialChoices.find((f) => f.name === selectedFacial)?.priceDiff || 0;
  const currentThreadingDiff = threadingChoices.find((t) => t.name === selectedThreading)?.priceDiff || 0;
  const currentAddOnDiff = addOnChoices.find((a) => a.name === selectedAddOn)?.priceDiff || 0;

  const calculatedPrice =
    service.price + currentWaxDiff + currentFacialDiff + currentThreadingDiff + currentAddOnDiff;

  const handleSave = () => {
    const customized: ServiceItem = {
      ...service,
      id: `${service.id}-customized-${Date.now()}`,
      title: `${service.title} (Customized)`,
      price: calculatedPrice,
      packageDetails: {
        waxing: selectedWax,
        cleanup: selectedFacial,
        facialHair: selectedThreading,
        maniPedi: selectedAddOn,
      },
      includes: [
        `Waxing: ${selectedWax}`,
        `Facial / Cleanup: ${selectedFacial}`,
        `Facial grooming: ${selectedThreading}`,
        `Add-on care: ${selectedAddOn}`,
      ],
    };
    onSavePackage(customized);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">
                Package Customizer
              </span>
              <h3 className="text-base font-black text-slate-900 leading-tight">
                {service.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customization Options */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Waxing Section */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700">
              1. Choose Waxing Formula
            </label>
            <div className="space-y-1.5">
              {waxChoices.map((w) => (
                <div
                  key={w.name}
                  onClick={() => setSelectedWax(w.name)}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                    selectedWax === w.name
                      ? 'border-emerald-600 bg-emerald-50/70 font-bold text-emerald-950 ring-1 ring-emerald-600'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <span>{w.name}</span>
                  <span className="text-slate-500 font-semibold">
                    {w.priceDiff === 0 ? 'Included' : `+₹${w.priceDiff}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Facial/Cleanup Section */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700">
              2. Choose Facial / Cleanup
            </label>
            <div className="space-y-1.5">
              {facialChoices.map((f) => (
                <div
                  key={f.name}
                  onClick={() => setSelectedFacial(f.name)}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                    selectedFacial === f.name
                      ? 'border-emerald-600 bg-emerald-50/70 font-bold text-emerald-950 ring-1 ring-emerald-600'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <span>{f.name}</span>
                  <span className="text-slate-500 font-semibold">
                    {f.priceDiff === 0 ? 'Included' : `+₹${f.priceDiff}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Facial Hair Removal */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700">
              3. Choose Facial Hair Removal
            </label>
            <div className="space-y-1.5">
              {threadingChoices.map((t) => (
                <div
                  key={t.name}
                  onClick={() => setSelectedThreading(t.name)}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                    selectedThreading === t.name
                      ? 'border-emerald-600 bg-emerald-50/70 font-bold text-emerald-950 ring-1 ring-emerald-600'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <span>{t.name}</span>
                  <span className="text-slate-500 font-semibold">
                    {t.priceDiff === 0 ? 'Included' : `+₹${t.priceDiff}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mani-Pedi / Add-on Section */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700">
              4. Add-on Care / Mani-Pedi
            </label>
            <div className="space-y-1.5">
              {addOnChoices.map((a) => (
                <div
                  key={a.name}
                  onClick={() => setSelectedAddOn(a.name)}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                    selectedAddOn === a.name
                      ? 'border-emerald-600 bg-emerald-50/70 font-bold text-emerald-950 ring-1 ring-emerald-600'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <span>{a.name}</span>
                  <span className="text-slate-500 font-semibold">
                    {a.priceDiff === 0 ? 'Included' : `+₹${a.priceDiff}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-slate-500 font-medium">Total Package Price</div>
            <div className="text-lg font-black text-slate-900">₹{calculatedPrice}</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer transition-all active:scale-95"
            >
              Save & Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
