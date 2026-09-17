import React from 'react';

/**
 * 3D High-Fidelity Claymorphic & Realistic Vector Illustrations
 * for all 11 appliances shown in Screenshot 2026-09-17 011019.png:
 *
 * Large Appliances:
 * 1. AC
 * 2. Washing Machine
 * 3. Refrigerator
 * 4. Television
 *
 * Other Appliances:
 * 5. Chimney
 * 6. Microwave
 * 7. Stove
 * 8. Laptop
 * 9. RO/Water Purifier
 * 10. Geyser
 * 11. Air Cooler
 */

// 1. AC (Split Air Conditioner Unit with 22°C LED Display)
export const ACApplianceCardVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg viewBox="0 0 100 65" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="acMainGrad" x1="50" y1="12" x2="50" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="40%" stopColor="#f8fafc" />
        <stop offset="85%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
      <linearGradient id="acLouverGrad" x1="50" y1="42" x2="50" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>
      <radialGradient id="acCardShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Drop shadow underneath */}
    <ellipse cx="50" cy="52" rx="34" ry="4" fill="url(#acCardShadow)" />

    {/* Main AC Body Housing */}
    <rect x="12" y="14" width="76" height="32" rx="5" fill="url(#acMainGrad)" stroke="#cbd5e1" strokeWidth="0.8" />

    {/* Front beveled fascia curve */}
    <path
      d="M14 16 Q50 15 86 16 C87 16 87.5 16.5 87.5 17.5 V39 C87.5 41.5 85.5 43.5 83 43.5 H17 C14.5 43.5 12.5 41.5 12.5 39 V17.5 C12.5 16.5 13 16 14 16 Z"
      fill="url(#acMainGrad)"
    />

    {/* Top gloss white specular reflection */}
    <path d="M16 16.5 H84" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />

    {/* Bottom air outlet flap louver */}
    <rect x="18" y="40" width="64" height="3" rx="1.5" fill="url(#acLouverGrad)" />
    <path d="M20 40.8 H80" stroke="#ffffff" strokeWidth="0.5" opacity="0.4" />

    {/* Digital LED Display with 22 */}
    <rect x="70" y="21" width="13" height="8" rx="2" fill="#0f172a" />
    <text
      x="76.5"
      y="27.2"
      fill="#38bdf8"
      fontSize="5.5"
      fontFamily="monospace"
      fontWeight="bold"
      textAnchor="middle"
      letterSpacing="0.5"
    >
      22
    </text>
    <circle cx="67" cy="25" r="0.8" fill="#22c55e" />
  </svg>
);

// 2. Washing Machine (Front-loading silver metallic washer with tinted glass circular door)
export const WashingMachineVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="wmBody" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="25%" stopColor="#f1f5f9" />
        <stop offset="70%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
      <radialGradient id="wmDrum" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="50%" stopColor="#334155" />
        <stop offset="90%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#020617" />
      </radialGradient>
      <linearGradient id="wmDoorRim" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="50%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <radialGradient id="wmShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Drop shadow */}
    <ellipse cx="40" cy="73" rx="24" ry="4" fill="url(#wmShadow)" />

    {/* Cabinet body */}
    <rect x="18" y="10" width="44" height="60" rx="6" fill="url(#wmBody)" stroke="#94a3b8" strokeWidth="0.8" />

    {/* Top glossy edge */}
    <path d="M21 11 H59" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />

    {/* Top control console panel */}
    <rect x="20" y="13" width="40" height="12" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />

    {/* Detergent drawer (left) */}
    <rect x="22" y="15" width="10" height="8" rx="1.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5" />
    <line x1="24" y1="19" x2="30" y2="19" stroke="#64748b" strokeWidth="0.8" />

    {/* Rotary program knob in center */}
    <circle cx="40" cy="19" r="3.2" fill="#cbd5e1" stroke="#475569" strokeWidth="0.8" />
    <circle cx="40" cy="19" r="1.5" fill="#334155" />

    {/* Digital LED display / Buttons on right */}
    <rect x="47" y="15" width="11" height="8" rx="1" fill="#0f172a" />
    <circle cx="50" cy="18" r="0.7" fill="#38bdf8" />
    <circle cx="53" cy="18" r="0.7" fill="#38bdf8" />
    <circle cx="56" cy="18" r="0.7" fill="#38bdf8" />

    {/* Big front circular porthole door rim */}
    <circle cx="40" cy="46" r="18" fill="url(#wmDoorRim)" stroke="#475569" strokeWidth="0.8" />
    <circle cx="40" cy="46" r="15" fill="#e2e8f0" />

    {/* Tinted glass drum window */}
    <circle cx="40" cy="46" r="13" fill="url(#wmDrum)" />

    {/* Stainless steel drum baffle spiral inside */}
    <ellipse cx="38" cy="45" rx="9" ry="8" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="4 2" fill="none" opacity="0.4" />
    <circle cx="40" cy="46" r="4" fill="#1e293b" opacity="0.8" />

    {/* Door glass reflection glint */}
    <path
      d="M32 38 C35 35 41 34 46 36"
      stroke="#ffffff"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.8"
    />

    {/* Door Handle */}
    <rect x="54" y="43" width="2.5" height="6" rx="1" fill="#cbd5e1" stroke="#475569" strokeWidth="0.5" />

    {/* Bottom service filter flap */}
    <rect x="47" y="65" width="11" height="3.5" rx="1" fill="#cbd5e1" />
  </svg>
);

// 3. Refrigerator (Double-door metallic gray fridge with top freezer and vertical recessed handles)
export const RefrigeratorVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg viewBox="0 0 70 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="fridgeBody" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#f1f5f9" />
        <stop offset="25%" stopColor="#cbd5e1" />
        <stop offset="65%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>
      <radialGradient id="fridgeShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Drop shadow */}
    <ellipse cx="35" cy="74" rx="20" ry="3.5" fill="url(#fridgeShadow)" />

    {/* Main Refrigerator Body */}
    <rect x="20" y="8" width="30" height="64" rx="3.5" fill="url(#fridgeBody)" stroke="#64748b" strokeWidth="0.8" />

    {/* Top gloss line */}
    <path d="M22 9 H48" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />

    {/* Upper Freezer Door */}
    <rect x="21" y="9.5" width="28" height="20" rx="2.5" fill="url(#fridgeBody)" />
    <path d="M22 10.5 H47" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
    {/* Freezer handle groove on left */}
    <rect x="22" y="22" width="1.8" height="6" rx="0.9" fill="#334155" />

    {/* Horizontal divider gap between freezer and main fridge */}
    <rect x="20" y="30.5" width="30" height="2" fill="#334155" />

    {/* Lower Fresh Food Refrigerator Door */}
    <rect x="21" y="33" width="28" height="37" rx="2.5" fill="url(#fridgeBody)" />
    <path d="M22 34 H47" stroke="#ffffff" strokeWidth="0.8" opacity="0.7" />
    {/* Main fridge handle groove on left */}
    <rect x="22" y="36" width="1.8" height="12" rx="0.9" fill="#334155" />

    {/* Stainless steel vertical brushed highlight */}
    <line x1="30" y1="11" x2="30" y2="68" stroke="#ffffff" strokeWidth="1" opacity="0.35" />

    {/* Base feet */}
    <rect x="23" y="72" width="4" height="2" rx="0.5" fill="#1e293b" />
    <rect x="43" y="72" width="4" height="2" rx="0.5" fill="#1e293b" />
  </svg>
);

// 4. Television (Flat-screen sleek widescreen TV with dual stand legs)
export const TelevisionVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg viewBox="0 0 90 65" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="tvScreen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="40%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#020617" />
      </linearGradient>
      <radialGradient id="tvShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Drop shadow */}
    <ellipse cx="45" cy="54" rx="30" ry="3.5" fill="url(#tvShadow)" />

    {/* Left and Right Stand Legs */}
    <polygon points="22,46 20,53 24,53 25,46" fill="#334155" />
    <polygon points="68,46 70,53 66,53 65,46" fill="#334155" />
    <line x1="18" y1="53" x2="26" y2="53" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="64" y1="53" x2="72" y2="53" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />

    {/* Outer Television Bezel */}
    <rect x="15" y="12" width="60" height="35" rx="2.5" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />

    {/* Widescreen Display Panel */}
    <rect x="17" y="14" width="56" height="31" rx="1.5" fill="url(#tvScreen)" />

    {/* Diagonal Glossy Glass Screen Glare Reflection */}
    <path
      d="M20 15 L45 15 L28 44 L20 44 Z"
      fill="#ffffff"
      opacity="0.08"
    />

    {/* Power LED indicator at bottom center */}
    <circle cx="45" cy="46" r="0.6" fill="#ef4444" />
  </svg>
);

// 5. Chimney (Kitchen stainless steel chimney hood with pyramid canopy and baffle filters)
export const ChimneyVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="chimneySteel" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="25%" stopColor="#e2e8f0" />
        <stop offset="70%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
      <radialGradient id="chimneyShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Shadow */}
    <ellipse cx="40" cy="62" rx="24" ry="3.5" fill="url(#chimneyShadow)" />

    {/* Upper Vertical Duct / Flue Shaft */}
    <rect x="33" y="10" width="14" height="24" fill="url(#chimneySteel)" stroke="#94a3b8" strokeWidth="0.6" />
    <line x1="36" y1="10" x2="36" y2="34" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />

    {/* Pyramid Canopy Hood */}
    <polygon points="33,34 47,34 65,49 15,49" fill="url(#chimneySteel)" stroke="#94a3b8" strokeWidth="0.8" />

    {/* Light reflection facet */}
    <polygon points="33,34 40,34 44,49 26,49" fill="#ffffff" opacity="0.25" />

    {/* Bottom Rim / Fascia Bar */}
    <rect x="14" y="49" width="52" height="7" rx="1.5" fill="url(#chimneySteel)" stroke="#64748b" strokeWidth="0.8" />

    {/* Front touch control / power buttons */}
    <circle cx="34" cy="52.5" r="1" fill="#0f172a" />
    <circle cx="38" cy="52.5" r="1" fill="#0f172a" />
    <circle cx="42" cy="52.5" r="1" fill="#38bdf8" />
    <circle cx="46" cy="52.5" r="1" fill="#0f172a" />

    {/* Baffle Filter Grill Bottom Plate */}
    <rect x="18" y="56" width="44" height="2" fill="#475569" />
  </svg>
);

// 6. Microwave (Metallic microwave oven with window, rotary dial and handle)
export const MicrowaveVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg viewBox="0 0 85 65" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="microBody" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="40%" stopColor="#e2e8f0" />
        <stop offset="85%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
      <radialGradient id="microShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Drop shadow */}
    <ellipse cx="42.5" cy="54" rx="28" ry="3.5" fill="url(#microShadow)" />

    {/* Main Oven Chassis */}
    <rect x="16" y="15" width="53" height="34" rx="4" fill="url(#microBody)" stroke="#94a3b8" strokeWidth="0.8" />

    {/* Top highlight */}
    <path d="M19 16 H66" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />

    {/* Tinted Glass Door on left */}
    <rect x="19" y="18" width="33" height="28" rx="2.5" fill="#0f172a" stroke="#64748b" strokeWidth="0.8" />
    {/* Inner cavity window & mesh */}
    <rect x="22" y="21" width="27" height="22" rx="1.5" fill="#1e293b" />
    <path d="M24 23 L36 23 L28 41 L24 41 Z" fill="#ffffff" opacity="0.12" />

    {/* Vertical Door Pull Handle */}
    <rect x="49.5" y="22" width="2" height="20" rx="1" fill="#e2e8f0" stroke="#64748b" strokeWidth="0.5" />

    {/* Right Control Panel */}
    <rect x="54" y="18" width="13" height="28" rx="1.5" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.5" />

    {/* Digital clock display */}
    <rect x="56" y="20" width="9" height="5" rx="1" fill="#0f172a" />
    <text x="60.5" y="24" fill="#22c55e" fontSize="3.5" fontFamily="monospace" textAnchor="middle">12:00</text>

    {/* Rotary Dial / Buttons */}
    <circle cx="60.5" cy="30" r="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.6" />
    <circle cx="60.5" cy="30" r="1" fill="#475569" />

    {/* Push to open button at bottom */}
    <rect x="56" y="37" width="9" height="6" rx="1" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5" />

    {/* Bottom Rubber Feet */}
    <rect x="19" y="49" width="4" height="2" rx="0.5" fill="#1e293b" />
    <rect x="62" y="49" width="4" height="2" rx="0.5" fill="#1e293b" />
  </svg>
);

// 7. Stove (Stainless steel 2-burner gas cooktop with black brass pan supports & front knobs)
export const StoveVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg viewBox="0 0 90 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="stoveSteel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="35%" stopColor="#e2e8f0" />
        <stop offset="75%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
      <radialGradient id="stoveShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Drop shadow */}
    <ellipse cx="45" cy="51" rx="32" ry="4" fill="url(#stoveShadow)" />

    {/* Stove Legs */}
    <rect x="17" y="44" width="4" height="4" rx="1" fill="#1e293b" />
    <rect x="69" y="44" width="4" height="4" rx="1" fill="#1e293b" />

    {/* Main Stainless Steel Cooktop Body (Perspective angle) */}
    {/* Top Surface */}
    <polygon points="18,24 72,24 76,40 14,40" fill="url(#stoveSteel)" stroke="#94a3b8" strokeWidth="0.8" />
    {/* Front Facia Edge */}
    <rect x="14" y="40" width="62" height="6" rx="1.5" fill="#94a3b8" stroke="#64748b" strokeWidth="0.8" />

    {/* Left Burner Assembly */}
    <g transform="translate(31, 32)">
      {/* Pan support drip tray ring */}
      <ellipse cx="0" cy="0" rx="9" ry="4.5" fill="#64748b" stroke="#334155" strokeWidth="0.8" />
      {/* Burner Brass Core */}
      <ellipse cx="0" cy="0" rx="4" ry="2" fill="#d97706" />
      {/* 4 Pan support prongs */}
      <line x1="-8" y1="-2" x2="8" y2="2" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="-8" y1="2" x2="8" y2="-2" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* Right Burner Assembly */}
    <g transform="translate(59, 32)">
      {/* Pan support drip tray ring */}
      <ellipse cx="0" cy="0" rx="9" ry="4.5" fill="#64748b" stroke="#334155" strokeWidth="0.8" />
      {/* Burner Brass Core */}
      <ellipse cx="0" cy="0" rx="4" ry="2" fill="#d97706" />
      {/* 4 Pan support prongs */}
      <line x1="-8" y1="-2" x2="8" y2="2" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="-8" y1="2" x2="8" y2="-2" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* Front Control Knobs */}
    <circle cx="31" cy="43" r="2.5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="0.6" />
    <line x1="31" y1="41" x2="31" y2="43" stroke="#ef4444" strokeWidth="0.8" strokeLinecap="round" />

    <circle cx="59" cy="43" r="2.5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="0.6" />
    <line x1="59" y1="41" x2="59" y2="43" stroke="#ef4444" strokeWidth="0.8" strokeLinecap="round" />
  </svg>
);

// 8. Laptop (Slim modern metallic notebook open showing screen and keyboard base)
export const LaptopVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg viewBox="0 0 85 65" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="laptopDisplay" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="50%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#020617" />
      </linearGradient>
      <linearGradient id="laptopBase" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#e2e8f0" />
        <stop offset="50%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
      <radialGradient id="laptopShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Drop shadow */}
    <ellipse cx="42.5" cy="53" rx="30" ry="3.5" fill="url(#laptopShadow)" />

    {/* Laptop Screen Lid (Tilted back) */}
    <g transform="translate(24, 15)">
      {/* Outer lid casing */}
      <rect x="0" y="0" width="37" height="24" rx="2" fill="#334155" stroke="#64748b" strokeWidth="0.6" />
      {/* Glass screen */}
      <rect x="1.8" y="1.8" width="33.4" height="20.4" rx="1" fill="url(#laptopDisplay)" />
      {/* Screen reflection highlight */}
      <path d="M4 3 L20 3 L12 21 L4 21 Z" fill="#ffffff" opacity="0.1" />
      {/* Webcam dot */}
      <circle cx="18.5" cy="0.9" r="0.4" fill="#ffffff" opacity="0.7" />
    </g>

    {/* Laptop Lower Keyboard Base Unit */}
    <polygon points="18,39 67,39 74,49 11,49" fill="url(#laptopBase)" stroke="#64748b" strokeWidth="0.6" />

    {/* Keyboard Well */}
    <polygon points="22,40 63,40 67,45 18,45" fill="#1e293b" />
    {/* Trackpad */}
    <polygon points="37,46 48,46 49,48 36,48" fill="#94a3b8" stroke="#64748b" strokeWidth="0.4" />

    {/* Front lip edge */}
    <rect x="11" y="49" width="63" height="2" rx="1" fill="#94a3b8" />
  </svg>
);

// 9. RO/Water Purifier (Wall-mounted modern domestic RO with transparent blue water reservoir & dispenser tap)
export const ROWaterPurifierVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg viewBox="0 0 70 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="roCabinet" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="35%" stopColor="#f1f5f9" />
        <stop offset="80%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
      <linearGradient id="roWaterTank" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
        <stop offset="40%" stopColor="#7dd3fc" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.85" />
      </linearGradient>
      <radialGradient id="roShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0284c7" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Shadow */}
    <ellipse cx="35" cy="73" rx="18" ry="3.5" fill="url(#roShadow)" />

    {/* Upper White Electronics & Filter Housing */}
    <rect x="22" y="10" width="26" height="24" rx="3.5" fill="url(#roCabinet)" stroke="#cbd5e1" strokeWidth="0.8" />
    <path d="M23 11 H47" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />

    {/* Front Digital Status Panel / LED Dots */}
    <rect x="27" y="14" width="16" height="7" rx="1.5" fill="#0f172a" />
    <circle cx="31" cy="17.5" r="0.9" fill="#22c55e" />
    <circle cx="35" cy="17.5" r="0.9" fill="#38bdf8" />
    <circle cx="39" cy="17.5" r="0.9" fill="#eab308" />

    {/* Transparent Blue Water Storage Tank Bottom Half */}
    <rect x="22" y="34" width="26" height="30" rx="3" fill="url(#roWaterTank)" stroke="#38bdf8" strokeWidth="0.8" />

    {/* Water Level Line & Ripple */}
    <path d="M23 44 Q28 42 35 44 T47 44" stroke="#ffffff" strokeWidth="0.8" fill="none" opacity="0.7" />

    {/* Specular curved gloss reflection on water tank */}
    <path d="M24 36 L24 60" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />

    {/* Push Tap at bottom center */}
    <g transform="translate(35, 62)">
      <rect x="-1.5" y="0" width="3" height="4" rx="0.5" fill="#64748b" />
      <path d="M0 4 V7 M-2 7 H2" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  </svg>
);

// 10. Geyser (Vertical electric water heater cylinder with LED indicators and plumbing pipes)
export const GeyserVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg viewBox="0 0 70 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="geyserCylinder" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="35%" stopColor="#f8fafc" />
        <stop offset="70%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
      <radialGradient id="geyserShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Shadow */}
    <ellipse cx="35" cy="74" rx="16" ry="3.5" fill="url(#geyserShadow)" />

    {/* Main Cylinder Water Tank Body */}
    <rect x="24" y="10" width="22" height="48" rx="8" fill="url(#geyserCylinder)" stroke="#cbd5e1" strokeWidth="0.8" />

    {/* Cylindrical lighting highlight */}
    <line x1="28" y1="12" x2="28" y2="56" stroke="#ffffff" strokeWidth="1.6" opacity="0.8" strokeLinecap="round" />

    {/* Brand / Temperature dial badge on front */}
    <ellipse cx="35" cy="34" rx="4" ry="4" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="0.6" />
    <circle cx="35" cy="34" r="1.5" fill="#3b82f6" />

    {/* Dual LED Indicators (Power Red, Heating Green) */}
    <circle cx="32" cy="46" r="1.2" fill="#ef4444" />
    <circle cx="38" cy="46" r="1.2" fill="#22c55e" />

    {/* Bottom Inlet & Outlet Plumbing Pipes */}
    {/* Cold Water In (Blue Ring) */}
    <rect x="28" y="58" width="3" height="10" rx="1" fill="#94a3b8" stroke="#475569" strokeWidth="0.5" />
    <circle cx="29.5" cy="62" r="1" fill="#3b82f6" />

    {/* Hot Water Out (Red Ring) */}
    <rect x="39" y="58" width="3" height="10" rx="1" fill="#94a3b8" stroke="#475569" strokeWidth="0.5" />
    <circle cx="40.5" cy="62" r="1" fill="#ef4444" />
  </svg>
);

// 11. Air Cooler (Evaporative desert/room air cooler with horizontal front louvers and castor wheels)
export const AirCoolerVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg viewBox="0 0 70 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="coolerBody" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="40%" stopColor="#f1f5f9" />
        <stop offset="85%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
      <radialGradient id="coolerShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.28" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Shadow */}
    <ellipse cx="35" cy="74" rx="18" ry="3.5" fill="url(#coolerShadow)" />

    {/* 4 Castor Wheels at bottom */}
    <rect x="23" y="66" width="4" height="6" rx="1.5" fill="#1e293b" />
    <rect x="43" y="66" width="4" height="6" rx="1.5" fill="#1e293b" />

    {/* Main Cooler Cabinet */}
    <rect x="21" y="10" width="28" height="57" rx="4" fill="url(#coolerBody)" stroke="#94a3b8" strokeWidth="0.8" />

    {/* Top highlight */}
    <path d="M23 11 H47" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />

    {/* Top Control Knobs Bar */}
    <rect x="23" y="12" width="24" height="7" rx="1.5" fill="#334155" />
    <circle cx="28" cy="15.5" r="1.5" fill="#94a3b8" />
    <circle cx="35" cy="15.5" r="1.5" fill="#94a3b8" />
    <circle cx="42" cy="15.5" r="1.5" fill="#38bdf8" />

    {/* Oscillating Louvers Air Grill Window */}
    <rect x="23" y="21" width="24" height="24" rx="2" fill="#0f172a" stroke="#475569" strokeWidth="0.6" />

    {/* Horizontal louvers slats */}
    {[24, 27, 30, 33, 36, 39, 42].map((yVal, i) => (
      <line key={i} x1="24.5" y1={yVal} x2="45.5" y2={yVal} stroke="#64748b" strokeWidth="1" strokeLinecap="round" />
    ))}

    {/* Lower Water Tank Reservoir */}
    <rect x="23" y="47" width="24" height="18" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.6" />

    {/* Vertical Water Level Gauge Indicator */}
    <rect x="33.5" y="50" width="3" height="12" rx="1" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="0.5" />
    <rect x="34" y="54" width="2" height="7" rx="0.5" fill="#0284c7" />
  </svg>
);
