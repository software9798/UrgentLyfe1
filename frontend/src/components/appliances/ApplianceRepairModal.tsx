import React, { useEffect } from 'react';
import { X, MapPin, Search, ChevronDown } from 'lucide-react';
import { APPLIANCES_LIST, ApplianceConfig } from './ApplianceData';

interface ApplianceRepairModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAppliance: (appliance: ApplianceConfig) => void;
  selectedCityName?: string;
  selectedLocality?: string;
}

export const ApplianceRepairModal: React.FC<ApplianceRepairModalProps> = ({
  isOpen,
  onClose,
  onSelectAppliance,
  selectedCityName = 'New Delhi',
  selectedLocality = 'Saket',
}) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const largeAppliances = APPLIANCES_LIST.filter((a) => a.group === 'large');
  const otherAppliances = APPLIANCES_LIST.filter((a) => a.group === 'other');

  return (
    <div
      id="ac-appliance-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ac-appliance-modal-title"
    >
      {/* Blurred Backdrop representing the home services app page as required */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Simulated top bar visible through the backdrop matching screenshot */}
      <div className="fixed top-0 left-0 right-0 h-16 pointer-events-none z-10 flex items-center justify-between px-4 sm:px-8 opacity-40 blur-[1px]">
        <span className="text-sm font-bold text-white">Beauty</span>
        <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-xs text-white">
          <MapPin className="w-3.5 h-3.5 text-white/80" />
          <span>H37, Block H- Saket- Ne...</span>
          <ChevronDown className="w-3.5 h-3.5 text-white/70" />
        </div>
        <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-xs text-white w-36">
          <Search className="w-3.5 h-3.5 text-white/70" />
          <span>Search AC</span>
        </div>
      </div>

      {/* Modal Container Wrapper with Top Right Close Button */}
      <div className="relative z-20 w-full max-w-[620px] md:max-w-[680px] my-auto">
        {/* Specific Floating Circular 'X' Button at the top right as shown in reference */}
        <div className="flex justify-end mb-2 sm:mb-3">
          <button
            id="close-appliance-modal-button"
            onClick={onClose}
            aria-label="Close AC & Appliance Repair Modal"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-2xl flex items-center justify-center text-slate-900 hover:bg-slate-100 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer border border-slate-200/60"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Card Content */}
        <div className="bg-white rounded-[28px] sm:rounded-[34px] p-5 sm:p-7 md:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100">
          {/* Prominent Bold Title */}
          <h2
            id="ac-appliance-modal-title"
            className="text-2xl sm:text-[28px] md:text-3xl font-extrabold text-slate-950 tracking-tight mb-5 sm:mb-6"
          >
            AC & Appliance Repair
          </h2>

          {/* Section 1: Large appliances */}
          <div className="mb-6 sm:mb-7">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
              Large appliances
            </h3>
            <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-3.5">
              {largeAppliances.map((appliance) => {
                const Visual = appliance.visualComponent;
                return (
                  <button
                    key={appliance.id}
                    id={`appliance-btn-${appliance.id}`}
                    onClick={() => onSelectAppliance(appliance)}
                    className="group flex flex-col items-center cursor-pointer text-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
                    title={`View dedicated ${appliance.title} services & prices`}
                  >
                    {/* Rounded Icon Tile */}
                    <div className="w-full bg-[#f8fafc] group-hover:bg-[#f1f5f9] group-hover:border-blue-200 group-hover:shadow-sm group-active:scale-95 rounded-2xl p-2 sm:p-3 flex items-center justify-center aspect-4/3 min-h-[85px] sm:min-h-[100px] border border-slate-100 transition-all duration-200">
                      <Visual className="w-12 h-10 sm:w-16 sm:h-12 drop-shadow-xs transition-transform duration-200 group-hover:scale-105" />
                    </div>
                    {/* Appliance Text Label */}
                    <span className="text-[11px] sm:text-xs md:text-[13px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors mt-2 text-center leading-tight">
                      {appliance.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Other appliances */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
              Other appliances
            </h3>
            <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-3.5">
              {otherAppliances.map((appliance) => {
                const Visual = appliance.visualComponent;
                return (
                  <button
                    key={appliance.id}
                    id={`appliance-btn-${appliance.id}`}
                    onClick={() => onSelectAppliance(appliance)}
                    className="group flex flex-col items-center cursor-pointer text-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
                    title={`View dedicated ${appliance.title} services & prices`}
                  >
                    {/* Rounded Icon Tile */}
                    <div className="w-full bg-[#f8fafc] group-hover:bg-[#f1f5f9] group-hover:border-blue-200 group-hover:shadow-sm group-active:scale-95 rounded-2xl p-2 sm:p-3 flex items-center justify-center aspect-4/3 min-h-[85px] sm:min-h-[100px] border border-slate-100 transition-all duration-200">
                      <Visual className="w-12 h-10 sm:w-16 sm:h-12 drop-shadow-xs transition-transform duration-200 group-hover:scale-105" />
                    </div>
                    {/* Appliance Text Label */}
                    <span className="text-[11px] sm:text-xs md:text-[13px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors mt-2 text-center leading-tight">
                      {appliance.label}
                    </span>
                  </button>
                );
              })}
              {/* Empty placeholder for the 8th grid position to maintain optical alignment */}
              <div className="hidden sm:block" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
