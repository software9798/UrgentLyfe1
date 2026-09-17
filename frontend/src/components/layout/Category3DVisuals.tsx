import React from 'react';

/**
 * High-fidelity 3D claymorphic/volumetric vector visuals matching the
 * exact reference screenshot for UrgentLyfe "SELECT CATEGORY".
 */

// 1. AC & Appliance Repair (Sleek indoor split AC unit with "22" digital display)
export const AcApplianceVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-14' }) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="acHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.8" />
        <stop offset="60%" stopColor="#e0f2fe" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="acShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.28" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="acBodyGrad" x1="50" y1="20" x2="50" y2="54" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="35%" stopColor="#f8fafc" />
        <stop offset="85%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
      <linearGradient id="acRim" x1="14" y1="22" x2="86" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient id="acLouver" x1="50" y1="47" x2="50" y2="53" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>
    </defs>

    {/* Soft blue circular halo */}
    <circle cx="50" cy="40" r="32" fill="url(#acHalo)" />

    {/* Drop shadow underneath */}
    <ellipse cx="50" cy="58" rx="34" ry="4.5" fill="url(#acShadow)" />

    {/* Main AC Body */}
    <rect x="15" y="23" width="70" height="29" rx="5.5" fill="url(#acBodyGrad)" stroke="#cbd5e1" strokeWidth="0.8" />

    {/* Front beveled fascia plate */}
    <path
      d="M17 25 Q50 24 83 25 C84 25 84.5 25.5 84.5 26.5 V46 C84.5 48.5 82.5 50.5 80 50.5 H20 C17.5 50.5 15.5 48.5 15.5 46 V26.5 C15.5 25.5 16 25 17 25 Z"
      fill="url(#acBodyGrad)"
    />

    {/* Top glossy reflection line */}
    <path d="M19 25 H81" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />

    {/* Air outlet flap / Louver groove at bottom */}
    <rect x="20" y="47" width="60" height="3" rx="1.5" fill="url(#acLouver)" />
    <path d="M22 47.5 H78" stroke="#ffffff" strokeWidth="0.5" opacity="0.4" />

    {/* Digital LED Display panel on the right */}
    <rect x="66" y="29" width="13" height="8" rx="2" fill="#0f172a" />
    {/* LED Temperature '22' */}
    <text
      x="72.5"
      y="35.5"
      fill="#38bdf8"
      fontSize="6"
      fontFamily="monospace"
      fontWeight="bold"
      textAnchor="middle"
      letterSpacing="0.5"
    >
      22
    </text>

    {/* Subtle indicator LED dot */}
    <circle cx="63" cy="33" r="0.9" fill="#22c55e" />
  </svg>
);

// 2. InstaHelp (Friendly 3D helper avatar in purple uniform with white collar and bun hair)
export const InstaHelpVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-14' }) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="instaHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#fef3c7" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="instaSkin" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="60%" stopColor="#fba668" />
        <stop offset="100%" stopColor="#e07a3f" />
      </radialGradient>
      <linearGradient id="instaHair" x1="30" y1="12" x2="70" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#5c3826" />
        <stop offset="60%" stopColor="#3d2215" />
        <stop offset="100%" stopColor="#25130b" />
      </linearGradient>
      <linearGradient id="instaDress" x1="50" y1="46" x2="50" y2="72" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#818cf8" />
        <stop offset="40%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#4338ca" />
      </linearGradient>
    </defs>

    {/* Soft warm amber circular halo */}
    <circle cx="50" cy="40" r="32" fill="url(#instaHalo)" />

    {/* Hair Bun at back */}
    <circle cx="50" cy="18" r="9" fill="url(#instaHair)" />
    <circle cx="50" cy="18" r="7.5" stroke="#784528" strokeWidth="0.8" fill="none" opacity="0.6" />

    {/* Purple Uniform / Dress */}
    <path
      d="M31 72 C31 56 36 50 43 48 L46 47 H54 L57 48 C64 50 69 56 69 72 Z"
      fill="url(#instaDress)"
    />

    {/* Neck */}
    <rect x="46" y="38" width="8" height="12" rx="3.5" fill="#fba668" />

    {/* White Peter Pan rounded collar */}
    <path
      d="M45 47 C40 47 37 51 41 55 C44 56 48 53 49 48 Z"
      fill="#ffffff"
      stroke="#e2e8f0"
      strokeWidth="0.5"
    />
    <path
      d="M55 47 C60 47 63 51 59 55 C56 56 52 53 51 48 Z"
      fill="#ffffff"
      stroke="#e2e8f0"
      strokeWidth="0.5"
    />
    {/* Uniform tie / badge button */}
    <circle cx="50" cy="57" r="1.3" fill="#ffffff" />
    <circle cx="50" cy="63" r="1.3" fill="#ffffff" />

    {/* Ears */}
    <circle cx="37" cy="33" r="3.2" fill="#fba668" />
    <circle cx="63" cy="33" r="3.2" fill="#fba668" />

    {/* Head */}
    <ellipse cx="50" cy="32" rx="12" ry="13.5" fill="url(#instaSkin)" />

    {/* Hair front & parted bangs */}
    <path
      d="M38 28 C38 20 44 16 50 16 C56 16 62 20 62 28 C60 22 55 21 50 23 C45 21 40 22 38 28 Z"
      fill="url(#instaHair)"
    />

    {/* Eyes */}
    <ellipse cx="45" cy="32" rx="1.6" ry="2.2" fill="#291810" />
    <circle cx="45.5" cy="31.2" r="0.6" fill="#ffffff" />
    <ellipse cx="55" cy="32" rx="1.6" ry="2.2" fill="#291810" />
    <circle cx="55.5" cy="31.2" r="0.6" fill="#ffffff" />

    {/* Eyebrows */}
    <path d="M43 28.5 Q45.5 27.5 48 28.5" stroke="#3d2215" strokeWidth="0.9" strokeLinecap="round" fill="none" />
    <path d="M52 28.5 Q54.5 27.5 57 28.5" stroke="#3d2215" strokeWidth="0.9" strokeLinecap="round" fill="none" />

    {/* Cheerful Smile */}
    <path d="M46.5 37 Q50 40.5 53.5 37" stroke="#9a3412" strokeWidth="1.2" strokeLinecap="round" fill="none" />

    {/* Subtle Rosy Cheeks */}
    <ellipse cx="43" cy="36" rx="2.5" ry="1.4" fill="#fb7185" opacity="0.35" />
    <ellipse cx="57" cy="36" rx="2.5" ry="1.4" fill="#fb7185" opacity="0.35" />
  </svg>
);

// 3. Women's Salon & Spa (Woman avatar with hair towel wrap, green face mask & cucumber eye slices)
export const WomensSalonVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-14' }) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="spaHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.8" />
        <stop offset="60%" stopColor="#e0f2fe" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="spaTowel" cx="40%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="65%" stopColor="#f1f5f9" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </radialGradient>
      <radialGradient id="spaMask" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#86efac" />
        <stop offset="70%" stopColor="#4ade80" />
        <stop offset="100%" stopColor="#22c55e" />
      </radialGradient>
      <radialGradient id="cukeGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#dcfce7" />
        <stop offset="50%" stopColor="#86efac" />
        <stop offset="100%" stopColor="#15803d" />
      </radialGradient>
    </defs>

    {/* Soft light blue circular halo */}
    <circle cx="50" cy="40" r="32" fill="url(#spaHalo)" />

    {/* White Spa Robe / Towel over shoulders */}
    <path
      d="M30 72 C30 57 37 51 43 49 L46 48 H54 L57 49 C63 51 70 57 70 72 Z"
      fill="url(#spaTowel)"
      stroke="#cbd5e1"
      strokeWidth="0.8"
    />
    <path d="M44 49 L50 64 L56 49" stroke="#94a3b8" strokeWidth="0.8" fill="none" />

    {/* Neck */}
    <rect x="46" y="40" width="8" height="11" rx="3.5" fill="#fcd34d" opacity="0.9" />

    {/* Ears */}
    <circle cx="37" cy="35" r="3" fill="#fcd34d" />
    <circle cx="63" cy="35" r="3" fill="#fcd34d" />

    {/* Head Face Base */}
    <ellipse cx="50" cy="35" rx="12" ry="13" fill="#fcd34d" />

    {/* Green Face Mask clay coating */}
    <path
      d="M40 27 C45 26 55 26 60 27 C61 34 61 41 58 45 C54 48 46 48 42 45 C39 41 39 34 40 27 Z"
      fill="url(#spaMask)"
      opacity="0.92"
    />

    {/* Cucumber Eye Pads */}
    <g transform="translate(44.5, 34)">
      <circle cx="0" cy="0" r="3.4" fill="url(#cukeGrad)" stroke="#15803d" strokeWidth="0.6" />
      <circle cx="0" cy="0" r="2.2" stroke="#bbf7d0" strokeWidth="0.4" strokeDasharray="1 1" fill="none" />
      <circle cx="0" cy="0" r="0.7" fill="#15803d" />
    </g>
    <g transform="translate(55.5, 34)">
      <circle cx="0" cy="0" r="3.4" fill="url(#cukeGrad)" stroke="#15803d" strokeWidth="0.6" />
      <circle cx="0" cy="0" r="2.2" stroke="#bbf7d0" strokeWidth="0.4" strokeDasharray="1 1" fill="none" />
      <circle cx="0" cy="0" r="0.7" fill="#15803d" />
    </g>

    {/* Relaxed Smile */}
    <path d="M47 42 Q50 44 53 42" stroke="#14532d" strokeWidth="1" strokeLinecap="round" fill="none" />

    {/* High 3D Spa Towel Turban / Wrap */}
    <path
      d="M38 27 C36 17 41 12 50 12 C59 12 64 17 62 27 C60 25 56 24 50 24 C44 24 40 25 38 27 Z"
      fill="url(#spaTowel)"
      stroke="#cbd5e1"
      strokeWidth="0.8"
    />
    {/* Turban Twist knot on top */}
    <ellipse cx="50" cy="15" rx="5" ry="3.5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.7" />
    <path d="M46 16 Q50 13 54 16" stroke="#94a3b8" strokeWidth="0.7" fill="none" />
  </svg>
);

// 4. Electrician, Plumber & Carpenter (Hammer resting on stacked wood blocks with warm peach backdrop)
export const CarpenterToolsVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-14' }) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="woodDisc" cx="45%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#ffedd5" />
        <stop offset="60%" stopColor="#fed7aa" />
        <stop offset="100%" stopColor="#fdba74" />
      </radialGradient>
      <linearGradient id="hammerSteel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="45%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <linearGradient id="hammerWood" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="20%" stopColor="#d97706" />
        <stop offset="80%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
      <linearGradient id="blockFront" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#92400e" />
      </linearGradient>
      <linearGradient id="blockTop" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <radialGradient id="hammerShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#7c2d12" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Warm peach circular disc backdrop */}
    <circle cx="50" cy="40" r="30" fill="url(#woodDisc)" />

    {/* Shadow under wood blocks and hammer */}
    <ellipse cx="54" cy="62" rx="28" ry="4" fill="url(#hammerShadow)" />

    {/* 3D Stacked Wood Blocks / Lumber (bottom right) */}
    {/* Bottom block */}
    <g transform="translate(46, 44)">
      {/* Top face */}
      <polygon points="4,0 26,0 22,-4 0,-4" fill="url(#blockTop)" />
      {/* Front face */}
      <rect x="0" y="0" width="22" height="7" rx="0.5" fill="url(#blockFront)" />
      {/* Right side face */}
      <polygon points="22,0 26,0 26,7 22,7" fill="#78350f" />
    </g>
    {/* Top block (slightly shifted) */}
    <g transform="translate(49, 38)">
      {/* Top face */}
      <polygon points="3,0 22,0 19,-4 0,-4" fill="url(#blockTop)" />
      {/* Front face */}
      <rect x="0" y="0" width="19" height="6" rx="0.5" fill="url(#blockFront)" />
      {/* Right side face */}
      <polygon points="19,0 22,0 22,6 19,6" fill="#78350f" />
    </g>

    {/* 3D Claw Hammer (tilted ~35 deg) */}
    <g transform="rotate(-38 48 38)">
      {/* Wooden handle */}
      <rect x="45" y="16" width="6" height="38" rx="2.5" fill="url(#hammerWood)" stroke="#78350f" strokeWidth="0.5" />
      {/* Handle rubberized/brass grip tip */}
      <rect x="45" y="46" width="6" height="8" rx="2" fill="#451a03" />

      {/* Steel Hammer Head */}
      <g transform="translate(36, 12)">
        {/* Striking face (front cylinder) */}
        <rect x="18" y="3" width="13" height="9" rx="1.5" fill="url(#hammerSteel)" stroke="#334155" strokeWidth="0.5" />
        <rect x="30" y="3.5" width="2.5" height="8" rx="0.8" fill="#e2e8f0" />

        {/* Center eye housing */}
        <rect x="11" y="2" width="10" height="11" rx="2" fill="url(#hammerSteel)" stroke="#334155" strokeWidth="0.5" />

        {/* Curved claw at back */}
        <path
          d="M12 4 C6 5 2 9 0 16 C3 14 7 11 12 11 Z"
          fill="url(#hammerSteel)"
          stroke="#334155"
          strokeWidth="0.5"
        />
        {/* Claw notch split */}
        <path d="M2 14 L8 10" stroke="#0f172a" strokeWidth="0.8" />
      </g>
    </g>
  </svg>
);

// 5. Cleaning & Pest Control (3D Red Canister Vacuum Cleaner)
export const CleaningPestVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-14' }) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="cleanHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#bbf7d0" stopOpacity="0.8" />
        <stop offset="60%" stopColor="#dcfce7" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#dcfce7" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="vacRed" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#f87171" />
        <stop offset="40%" stopColor="#ef4444" />
        <stop offset="85%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#991b1b" />
      </radialGradient>
      <radialGradient id="vacShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="chromeTube" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    </defs>

    {/* Soft mint green halo */}
    <circle cx="50" cy="40" r="32" fill="url(#cleanHalo)" />

    {/* Floor shadow */}
    <ellipse cx="50" cy="62" rx="30" ry="4.5" fill="url(#vacShadow)" />

    {/* Vacuum Floor Nozzle (left) */}
    <g transform="translate(24, 58)">
      <polygon points="0,3 16,3 13,-1 3,-1" fill="#1e293b" />
      <rect x="6" y="-3" width="4" height="3" fill="#64748b" />
    </g>

    {/* Chrome Wand / Extension pipe */}
    <path
      d="M32 56 L33 32 L39 30"
      stroke="url(#chromeTube)"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Flexible Ribbed Hose looping from wand to vacuum body */}
    <path
      d="M39 30 C45 22 49 20 54 28 C57 32 58 37 60 41"
      stroke="#1e293b"
      strokeWidth="3.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M39 30 C45 22 49 20 54 28 C57 32 58 37 60 41"
      stroke="#475569"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="1.5 1.5"
      fill="none"
    />

    {/* Vacuum Canister Main Red Body */}
    <g transform="translate(56, 33)">
      {/* Big Black Rear Wheel */}
      <circle cx="16" cy="18" r="8" fill="#1e293b" stroke="#0f172a" strokeWidth="0.8" />
      <circle cx="16" cy="18" r="4.5" fill="#475569" />
      <circle cx="16" cy="18" r="2" fill="#94a3b8" />

      {/* Glossy Red Canister Capsule */}
      <path
        d="M2 19 C2 10 9 4 17 4 C22 4 25 7 26 12 C27 17 26 21 21 23 C17 25 4 25 2 19 Z"
        fill="url(#vacRed)"
        stroke="#991b1b"
        strokeWidth="0.8"
      />

      {/* Top Gloss Highlight */}
      <path d="M6 10 C10 6 16 6 20 8" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />

      {/* Black Top Carry Handle */}
      <path d="M10 6 C10 2 18 2 18 6" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Power switch button */}
      <circle cx="11" cy="8" r="1.5" fill="#f87171" stroke="#991b1b" strokeWidth="0.5" />
    </g>
  </svg>
);

// 6. Home Painting & Upgrade (3D Paint Roller with yellow foam and wooden handle)
export const HomePaintingVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-14' }) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="paintHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#bbf7d0" stopOpacity="0.8" />
        <stop offset="60%" stopColor="#dcfce7" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#dcfce7" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="rollerFoam" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="35%" stopColor="#fde047" />
        <stop offset="85%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#ca8a04" />
      </radialGradient>
      <linearGradient id="metalRod" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="40%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>
      <linearGradient id="rollerHandle" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="40%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#92400e" />
      </linearGradient>
      <radialGradient id="rollerShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Soft mint green halo */}
    <circle cx="50" cy="40" r="32" fill="url(#paintHalo)" />

    {/* Drop shadow */}
    <ellipse cx="50" cy="62" rx="26" ry="4" fill="url(#rollerShadow)" />

    {/* 3D Paint Roller Sponge Sleeve (Horizontal cylinder) */}
    <g transform="translate(34, 21)">
      {/* Roller Left Endcap */}
      <ellipse cx="4" cy="7" rx="3.5" ry="7" fill="#ca8a04" stroke="#a16207" strokeWidth="0.5" />
      {/* Roller Cylinder Body */}
      <rect x="4" y="0" width="30" height="14" rx="2" fill="url(#rollerFoam)" />
      {/* Roller Right Endcap */}
      <ellipse cx="34" cy="7" rx="3.5" ry="7" fill="#fde047" stroke="#ca8a04" strokeWidth="0.5" />
      {/* Top Gloss Highlight */}
      <path d="M6 3 H32" stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />
    </g>

    {/* Steel Metal Wire Rod Frame */}
    <path
      d="M68 28 L72 28 C74 28 75 30 75 32 L75 42 C75 44 73 46 70 46 L50 46 C48 46 47 47 47 49 L47 52"
      stroke="url(#metalRod)"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Brass collar ferrule */}
    <rect x="45.5" y="52" width="3" height="3" rx="0.5" fill="#facc15" stroke="#ca8a04" strokeWidth="0.4" />

    {/* Ergonomic Natural Wooden Grip Handle */}
    <rect x="45" y="55" width="4" height="15" rx="2" fill="url(#rollerHandle)" stroke="#78350f" strokeWidth="0.5" />
    {/* Hanging hole at end of handle */}
    <circle cx="47" cy="67.5" r="0.9" fill="#451a03" />
  </svg>
);

// 7. Men's Salon & Massage (Male avatar with facial mask, cucumber eye slices, white towel/robe)
export const MensSalonVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-14' }) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="menHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#e0e7ff" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="menSkin" cx="45%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="60%" stopColor="#fba668" />
        <stop offset="100%" stopColor="#ea580c" />
      </radialGradient>
      <linearGradient id="menHair" x1="30" y1="12" x2="70" y2="30" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#451a03" />
        <stop offset="70%" stopColor="#291102" />
        <stop offset="100%" stopColor="#1a0a01" />
      </linearGradient>
      <radialGradient id="menCuke" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#dcfce7" />
        <stop offset="50%" stopColor="#86efac" />
        <stop offset="100%" stopColor="#15803d" />
      </radialGradient>
    </defs>

    {/* Soft lavender/blue circular halo */}
    <circle cx="50" cy="40" r="32" fill="url(#menHalo)" />

    {/* White Spa Bathrobe / Towel draped over shoulders */}
    <path
      d="M30 72 C30 58 36 52 42 50 L46 49 H54 L58 50 C64 52 70 58 70 72 Z"
      fill="#f8fafc"
      stroke="#cbd5e1"
      strokeWidth="0.8"
    />
    {/* V-neck robe collar lapels */}
    <path d="M43 50 L50 66 L57 50" stroke="#94a3b8" strokeWidth="1" fill="none" />

    {/* Strong Neck */}
    <rect x="45.5" y="42" width="9" height="10" rx="3.5" fill="#fba668" />

    {/* Ears */}
    <circle cx="37" cy="35" r="3.2" fill="#fba668" />
    <circle cx="63" cy="35" r="3.2" fill="#fba668" />

    {/* Head Face Base */}
    <ellipse cx="50" cy="35" rx="12" ry="13.5" fill="url(#menSkin)" />

    {/* Groomed Dark Hair */}
    <path
      d="M38 28 C37 18 43 14 50 14 C57 14 63 18 62 28 C61 24 57 20 50 20 C44 20 40 23 38 28 Z"
      fill="url(#menHair)"
    />
    {/* Sideburns */}
    <rect x="37" y="27" width="2" height="6" rx="0.8" fill="url(#menHair)" />
    <rect x="61" y="27" width="2" height="6" rx="0.8" fill="url(#menHair)" />

    {/* White Shaving / Facial Care Cream Mask around lower face */}
    <path
      d="M40 37 C40 45 44 48 50 48 C56 48 60 45 60 37 C58 39 55 40 50 40 C45 40 42 39 40 37 Z"
      fill="#ffffff"
      stroke="#e2e8f0"
      strokeWidth="0.6"
    />

    {/* Cucumber Eye Pads */}
    <g transform="translate(44.5, 33.5)">
      <circle cx="0" cy="0" r="3.5" fill="url(#menCuke)" stroke="#15803d" strokeWidth="0.6" />
      <circle cx="0" cy="0" r="2.2" stroke="#bbf7d0" strokeWidth="0.4" strokeDasharray="1 1" fill="none" />
      <circle cx="0" cy="0" r="0.7" fill="#15803d" />
    </g>
    <g transform="translate(55.5, 33.5)">
      <circle cx="0" cy="0" r="3.5" fill="url(#menCuke)" stroke="#15803d" strokeWidth="0.6" />
      <circle cx="0" cy="0" r="2.2" stroke="#bbf7d0" strokeWidth="0.4" strokeDasharray="1 1" fill="none" />
      <circle cx="0" cy="0" r="0.7" fill="#15803d" />
    </g>

    {/* Relaxed Smile */}
    <path d="M47.5 43 Q50 45 52.5 43" stroke="#9a3412" strokeWidth="1" strokeLinecap="round" fill="none" />
  </svg>
);

// 8. Wall Panels by Revamp (Architectural fluted acoustic wood slat sample board)
export const WallPanelsVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-14' }) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="panelHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.7" />
        <stop offset="60%" stopColor="#fef3c7" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="marbleBack" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f1f5f9" />
        <stop offset="40%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
      <linearGradient id="woodSlat" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#b45309" />
        <stop offset="25%" stopColor="#d97706" />
        <stop offset="60%" stopColor="#f59e0b" />
        <stop offset="85%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
      <radialGradient id="panelShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Soft warm ivory circular halo */}
    <circle cx="50" cy="40" r="32" fill="url(#panelHalo)" />

    {/* Floor shadow */}
    <ellipse cx="50" cy="62" rx="26" ry="4" fill="url(#panelShadow)" />

    {/* Background sample board (e.g. travertine / architectural stone slab) */}
    <rect x="42" y="19" width="30" height="38" rx="2" fill="url(#marbleBack)" stroke="#94a3b8" strokeWidth="0.6" />
    <path d="M46 22 L68 34" stroke="#ffffff" strokeWidth="0.6" opacity="0.6" />

    {/* Foreground Fluted Wooden Slat Acoustic Board */}
    <g transform="translate(30, 23)">
      {/* Felt acoustic black backing */}
      <rect x="0" y="0" width="26" height="34" rx="1.5" fill="#1e293b" />

      {/* Vertical Wood Slats with 3D bevels */}
      {[0, 4.5, 9, 13.5, 18, 22.5].map((xOffset, i) => (
        <g key={i}>
          {/* Slat body */}
          <rect x={xOffset} y="0" width="3.2" height="34" rx="0.8" fill="url(#woodSlat)" />
          {/* Left edge highlight */}
          <line x1={xOffset + 0.4} y1="0" x2={xOffset + 0.4} y2="34" stroke="#fde68a" strokeWidth="0.4" opacity="0.8" />
          {/* Right edge shadow */}
          <line x1={xOffset + 2.8} y1="0" x2={xOffset + 2.8} y2="34" stroke="#451a03" strokeWidth="0.4" opacity="0.7" />
        </g>
      ))}
    </g>
  </svg>
);

// 9. Emergency Repairs (3D Glossy Red Toolkit / SOS Briefcase with bold white "SOS")
export const EmergencyRepairsVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-14' }) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="sosHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fecdd3" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#ffe4e6" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#ffe4e6" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="sosRed" cx="40%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#f87171" />
        <stop offset="35%" stopColor="#ef4444" />
        <stop offset="80%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#991b1b" />
      </radialGradient>
      <linearGradient id="sosMetal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="50%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>
      <radialGradient id="sosShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#881337" stopOpacity="0.32" />
        <stop offset="100%" stopColor="#881337" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Soft red circular halo */}
    <circle cx="50" cy="40" r="32" fill="url(#sosHalo)" />

    {/* Drop shadow */}
    <ellipse cx="50" cy="62" rx="26" ry="4.5" fill="url(#sosShadow)" />

    {/* Dark Carrying Handle at top */}
    <path
      d="M42 27 V20 C42 18 44 16 46 16 H54 C56 16 58 18 58 20 V27"
      stroke="#1e293b"
      strokeWidth="3.2"
      strokeLinecap="round"
      fill="none"
    />
    <rect x="40.5" y="24" width="3" height="4" rx="1" fill="url(#sosMetal)" />
    <rect x="56.5" y="24" width="3" height="4" rx="1" fill="url(#sosMetal)" />

    {/* Red Suitcase / Toolkit Box */}
    <rect x="26" y="24" width="48" height="34" rx="7" fill="url(#sosRed)" stroke="#991b1b" strokeWidth="1" />

    {/* Top glossy reflection curved bevel */}
    <path
      d="M30 26 H70 C72 26 73 27 73 28.5 C73 30 71 31 69 31 H31 C29 31 27 30 27 28.5 C27 27 28 26 30 26 Z"
      fill="#ffffff"
      opacity="0.35"
    />

    {/* Center Horizontal Latch Seam */}
    <line x1="26" y1="41" x2="74" y2="41" stroke="#991b1b" strokeWidth="1" opacity="0.6" />

    {/* Metallic latches on left and right */}
    <rect x="33" y="38" width="5" height="6" rx="1" fill="url(#sosMetal)" stroke="#475569" strokeWidth="0.4" />
    <rect x="62" y="38" width="5" height="6" rx="1" fill="url(#sosMetal)" stroke="#475569" strokeWidth="0.4" />

    {/* Bold 3D White "SOS" Text on front */}
    <text
      x="50"
      y="47"
      fill="#ffffff"
      fontSize="14"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      textAnchor="middle"
      letterSpacing="1"
    >
      SOS
    </text>
  </svg>
);

// 10. Other Home Services (3D Tool Caddy Gift Box with golden ribbon & bow and tools sticking out)
export const OtherServicesVisual: React.FC<{ className?: string }> = ({ className = 'w-16 h-14' }) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="otherHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f3e8ff" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#f3e8ff" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#f3e8ff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="boxCoral" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="40%" stopColor="#e11d48" />
        <stop offset="100%" stopColor="#be123c" />
      </radialGradient>
      <linearGradient id="goldRibbon" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>
      <linearGradient id="toolSteel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <radialGradient id="otherShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Soft lilac circular halo */}
    <circle cx="50" cy="40" r="32" fill="url(#otherHalo)" />

    {/* Floor shadow */}
    <ellipse cx="50" cy="62" rx="26" ry="4" fill="url(#otherShadow)" />

    {/* Tools sticking out of the box */}
    {/* Silver Wrench on the left */}
    <g transform="translate(34, 18) rotate(-22)">
      <rect x="2" y="4" width="4.5" height="18" rx="1.5" fill="url(#toolSteel)" stroke="#334155" strokeWidth="0.5" />
      {/* Wrench open head */}
      <circle cx="4.2" cy="4" r="4.2" fill="url(#toolSteel)" stroke="#334155" strokeWidth="0.5" />
      <polygon points="2,0 6.5,0 5.5,5 3,5" fill="#1e293b" />
    </g>

    {/* Blue Screwdriver in center */}
    <g transform="translate(50, 15) rotate(8)">
      <line x1="0" y1="12" x2="0" y2="2" stroke="url(#toolSteel)" strokeWidth="2" strokeLinecap="round" />
      <rect x="-2" y="10" width="4" height="10" rx="1.5" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.5" />
    </g>

    {/* Pliers on the right */}
    <g transform="translate(62, 17) rotate(24)">
      <rect x="-3" y="10" width="3" height="12" rx="1" fill="#ef4444" />
      <rect x="1" y="10" width="3" height="12" rx="1" fill="#ef4444" />
      <path d="M-2 10 L-2 4 L2 4 L2 10 Z" fill="url(#toolSteel)" stroke="#334155" strokeWidth="0.5" />
    </g>

    {/* Pink / Coral Tool Caddy Box */}
    <g transform="translate(32, 34)">
      {/* Box main front body */}
      <rect x="0" y="4" width="36" height="23" rx="4" fill="url(#boxCoral)" stroke="#9f1239" strokeWidth="0.8" />

      {/* Top rim / lid border */}
      <rect x="-1" y="2" width="38" height="5" rx="1.5" fill="#fb7185" stroke="#9f1239" strokeWidth="0.6" />

      {/* Vertical Golden Ribbon */}
      <rect x="15" y="2" width="6" height="25" fill="url(#goldRibbon)" stroke="#ca8a04" strokeWidth="0.4" />

      {/* Horizontal Golden Ribbon */}
      <rect x="0" y="12" width="36" height="5" fill="url(#goldRibbon)" stroke="#ca8a04" strokeWidth="0.4" />

      {/* Golden Bow in center */}
      <g transform="translate(18, 14)">
        {/* Left loop */}
        <ellipse cx="-4.5" cy="-1.5" rx="4.5" ry="3" transform="rotate(-15 -4.5 -1.5)" fill="url(#goldRibbon)" stroke="#a16207" strokeWidth="0.5" />
        {/* Right loop */}
        <ellipse cx="4.5" cy="-1.5" rx="4.5" ry="3" transform="rotate(15 4.5 -1.5)" fill="url(#goldRibbon)" stroke="#a16207" strokeWidth="0.5" />
        {/* Center knot */}
        <circle cx="0" cy="0" r="2.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
);
