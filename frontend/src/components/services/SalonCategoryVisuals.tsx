import React from 'react';

/**
 * 4 stylized, detailed vector-style icons for Women's Salon & Spa modal:
 * 1. A woman's head with a facial mask and head towel ("Salon for Women")
 * 2. A pink professional massage table ("Spa for Women")
 * 3. A modern purple hair dryer ("Hair Studio for Women")
 * 4. A stylized lipstick tube ("Makeup, Saree & Styling")
 */

// 1. Salon for Women (Woman with facial clay mask, eyes closed, white head towel & robe)
export const SalonForWomenVisual: React.FC<{ className?: string }> = ({
  className = 'w-16 h-16',
}) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      {/* Soft circular background glow */}
      <radialGradient id="sfwGlow" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.8" />
        <stop offset="70%" stopColor="#fef9c3" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#fef9c3" stopOpacity="0" />
      </radialGradient>
      {/* Face skin tone */}
      <radialGradient id="sfwSkin" cx="45%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#fde047" stopOpacity="0.2" />
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="70%" stopColor="#fdba74" />
        <stop offset="100%" stopColor="#fb923c" />
      </radialGradient>
      {/* Green herbal facial mask */}
      <linearGradient id="sfwMask" x1="30" y1="35" x2="70" y2="65" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#bbf7d0" />
        <stop offset="40%" stopColor="#86efac" />
        <stop offset="100%" stopColor="#4ade80" />
      </linearGradient>
      {/* Fluffy white towel headwrap */}
      <linearGradient id="sfwTowel" x1="50" y1="8" x2="50" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#f1f5f9" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>
      {/* Spa robe shoulders */}
      <linearGradient id="sfwRobe" x1="50" y1="68" x2="50" y2="96" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="70%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>
      {/* Shadow */}
      <radialGradient id="sfwShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Drop shadow */}
    <ellipse cx="50" cy="94" rx="34" ry="4" fill="url(#sfwShadow)" />

    {/* Spa robe chest & shoulders */}
    <path
      d="M20 95 C20 78 30 70 42 67 L50 78 L58 67 C70 70 80 78 80 95 Z"
      fill="url(#sfwRobe)"
      stroke="#cbd5e1"
      strokeWidth="1"
    />
    {/* Robe collar folds */}
    <path d="M38 68 L50 83 L62 68" stroke="#cbd5e1" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M50 83 V95" stroke="#cbd5e1" strokeWidth="1" />

    {/* Neck */}
    <path d="M43 58 H57 V70 C57 73 54 75 50 75 C46 75 43 73 43 70 Z" fill="#fdba74" />

    {/* Head & Face base */}
    <path
      d="M32 40 C32 28 40 22 50 22 C60 22 68 28 68 40 C68 53 60 63 50 63 C40 63 32 53 32 40 Z"
      fill="url(#sfwSkin)"
    />

    {/* Ears */}
    <circle cx="31" cy="42" r="3.5" fill="#fba668" />
    <circle cx="69" cy="42" r="3.5" fill="#fba668" />

    {/* Facial Mask Layer (soft soothing green clay) */}
    <path
      d="M35 37 C35 31 41 27 50 27 C59 27 65 31 65 37 C65 47 62 58 50 58 C38 58 35 47 35 37 Z"
      fill="url(#sfwMask)"
      opacity="0.95"
    />

    {/* Peaceful closed eyes (eyelashes) */}
    <path d="M40 39 Q44 42 47 39" stroke="#15803d" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    <path d="M53 39 Q56 42 60 39" stroke="#15803d" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    {/* Eyebrows */}
    <path d="M39 34 Q43 32 47 34" stroke="#166534" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    <path d="M53 34 Q57 32 61 34" stroke="#166534" strokeWidth="1.2" strokeLinecap="round" fill="none" />

    {/* Cute nose bridge */}
    <path d="M50 40 V45 Q48 46 50 47" stroke="#15803d" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />

    {/* Gentle serene smile */}
    <path d="M45 51 Q50 55 55 51" stroke="#e11d48" strokeWidth="1.8" strokeLinecap="round" fill="none" />

    {/* Volumetric White Towel / Headwrap */}
    {/* Main wrap dome */}
    <path
      d="M27 30 C27 15 36 8 50 8 C64 8 73 15 73 30 C73 35 69 36 67 36 C61 31 39 31 33 36 C31 36 27 35 27 30 Z"
      fill="url(#sfwTowel)"
      stroke="#cbd5e1"
      strokeWidth="0.8"
    />
    {/* Headwrap twist knot / turban folds */}
    <path
      d="M32 28 C37 18 63 18 68 28 C64 30 56 31 50 31 C44 31 36 30 32 28 Z"
      fill="#ffffff"
      stroke="#cbd5e1"
      strokeWidth="0.6"
    />
    <path
      d="M44 14 C47 9 53 9 56 14 C54 17 46 17 44 14 Z"
      fill="#f1f5f9"
      stroke="#cbd5e1"
      strokeWidth="0.8"
    />
    {/* Towel texture fold lines */}
    <path d="M36 22 Q50 16 64 22" stroke="#cbd5e1" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    <path d="M38 26 Q50 21 62 26" stroke="#cbd5e1" strokeWidth="0.6" fill="none" strokeLinecap="round" />
  </svg>
);

// 2. Spa for Women (Pink professional massage table with face cradle, wooden legs & towel)
export const SpaForWomenVisual: React.FC<{ className?: string }> = ({
  className = 'w-16 h-16',
}) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      {/* Drop shadow */}
      <radialGradient id="spaShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
      {/* Pink mattress gradient */}
      <linearGradient id="pinkTable" x1="15" y1="40" x2="85" y2="52" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f472b6" />
        <stop offset="50%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#db2777" />
      </linearGradient>
      {/* Table top cushion highlight */}
      <linearGradient id="pinkTop" x1="15" y1="36" x2="85" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fbcfe8" />
        <stop offset="60%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#db2777" />
      </linearGradient>
      {/* Wooden legs */}
      <linearGradient id="woodLegs" x1="0" y1="45" x2="0" y2="85" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#b45309" />
        <stop offset="60%" stopColor="#92400e" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
    </defs>

    {/* Shadow beneath massage table */}
    <ellipse cx="50" cy="85" rx="38" ry="4" fill="url(#spaShadow)" />

    {/* Wooden Support Legs & Cross Braces */}
    {/* Left leg pair */}
    <path d="M24 48 L17 84 H21 L28 48 Z" fill="url(#woodLegs)" />
    <path d="M30 48 L37 84 H33 L26 48 Z" fill="url(#woodLegs)" />
    {/* Right leg pair */}
    <path d="M68 48 L61 84 H65 L72 48 Z" fill="url(#woodLegs)" />
    <path d="M74 48 L81 84 H77 L70 48 Z" fill="url(#woodLegs)" />

    {/* Horizontal wooden stretcher beam */}
    <rect x="22" y="66" width="54" height="3" rx="1" fill="#78350f" />
    <rect x="23" y="66.5" width="52" height="1" fill="#b45309" />

    {/* Diagonal cross cable tension wires */}
    <line x1="28" y1="50" x2="68" y2="76" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" />
    <line x1="68" y1="50" x2="28" y2="76" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" />

    {/* Pink Massage Bed Main Mattress */}
    {/* Rounded padded block */}
    <rect x="18" y="38" width="60" height="12" rx="4" fill="url(#pinkTable)" stroke="#be185d" strokeWidth="0.8" />

    {/* Beveled top cushion layer */}
    <path
      d="M21 38 H75 C77 38 78 39 78 41 V45 C78 46.5 76.5 47.5 75 47.5 H21 C19.5 47.5 18 46.5 18 45 V41 C18 39 19 38 21 38 Z"
      fill="url(#pinkTop)"
    />

    {/* Subtle stitch / seam indentation across center */}
    <line x1="48" y1="38.5" x2="48" y2="47" stroke="#be185d" strokeWidth="0.8" opacity="0.7" strokeDasharray="1 1.5" />

    {/* Face Cradle / Headrest Extension on the right side */}
    <rect x="78" y="41" width="4" height="2" fill="#78350f" rx="0.5" />
    <ellipse cx="85" cy="42" rx="4.5" ry="3.5" fill="#f472b6" stroke="#db2777" strokeWidth="0.8" />
    <ellipse cx="85" cy="42" rx="2" ry="1.5" fill="#fbcfe8" />

    {/* Rolled / Folded White Towel on top of the bed */}
    <rect x="36" y="32" width="14" height="6" rx="2.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.7" />
    <ellipse cx="50" cy="35" rx="1.5" ry="3" fill="#e2e8f0" />
    <ellipse cx="36" cy="35" rx="1.5" ry="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
    <path d="M37 34 H49" stroke="#cbd5e1" strokeWidth="0.6" />
  </svg>
);

// 3. Hair Studio for Women (Modern purple hairdryer with nozzle and ergonomic handle)
export const HairStudioVisual: React.FC<{ className?: string }> = ({
  className = 'w-16 h-16',
}) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      {/* Drop shadow */}
      <radialGradient id="dryerShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
      {/* Modern metallic purple body */}
      <linearGradient id="dryerBody" x1="25" y1="26" x2="75" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#e9d5ff" />
        <stop offset="25%" stopColor="#c084fc" />
        <stop offset="65%" stopColor="#9333ea" />
        <stop offset="100%" stopColor="#6b21a8" />
      </linearGradient>
      {/* Ergonomic handle */}
      <linearGradient id="dryerHandle" x1="45" y1="42" x2="60" y2="78" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="50%" stopColor="#7e22ce" />
        <stop offset="100%" stopColor="#581c87" />
      </linearGradient>
      {/* Rose-gold / metallic accent ring */}
      <linearGradient id="roseGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="50%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#fb7185" />
      </linearGradient>
    </defs>

    {/* Shadow beneath hairdryer */}
    <ellipse cx="52" cy="85" rx="26" ry="3.5" fill="url(#dryerShadow)" />

    {/* Ergonomic angled handle */}
    <path
      d="M48 44 L58 75 C59 78 57 81 54 81 C51 81 48 79 46 76 L38 46 Z"
      fill="url(#dryerHandle)"
      stroke="#581c87"
      strokeWidth="0.8"
    />

    {/* Power Switch on handle */}
    <rect x="44" y="56" width="3" height="7" rx="1.5" fill="#1e1b4b" />
    <rect x="44.5" y="58" width="2" height="3" rx="1" fill="#a855f7" />

    {/* Flexible cord loop protector at base */}
    <path d="M53 81 C55 86 52 89 48 88" stroke="#334155" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Main Barrel / Cylinder Body */}
    <rect
      x="30"
      y="28"
      width="34"
      height="18"
      rx="9"
      fill="url(#dryerBody)"
      stroke="#6b21a8"
      strokeWidth="0.8"
    />

    {/* Top specular highlight reflection */}
    <path d="M36 30 Q47 28 58 30" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

    {/* Rose gold accent trim band around barrel */}
    <rect x="42" y="27.5" width="2.5" height="19" rx="1" fill="url(#roseGold)" />

    {/* Rear Air Intake Cap / Filter mesh */}
    <path
      d="M62 29 C65 29 67 32 67 37 C67 42 65 45 62 45 Z"
      fill="#475569"
      stroke="#334155"
      strokeWidth="0.8"
    />
    <circle cx="64" cy="37" r="1.5" fill="#94a3b8" />

    {/* Front Air Concentrator Nozzle Attachment */}
    <path
      d="M31 31 L20 33 C18.5 33.3 18 34.2 18 35.5 V38.5 C18 39.8 18.5 40.7 20 41 L31 43 Z"
      fill="#3b0764"
      stroke="#581c87"
      strokeWidth="0.8"
    />
    {/* Nozzle opening slit */}
    <rect x="18" y="34.5" width="1.5" height="5" rx="0.75" fill="#1e1b4b" />
  </svg>
);

// 4. Makeup, Saree & Styling (Stylized lipstick tube with gold band & ruby red bullet)
export const MakeupStylingVisual: React.FC<{ className?: string }> = ({
  className = 'w-16 h-16',
}) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      {/* Drop shadow */}
      <radialGradient id="lipShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
      {/* Glossy black casing */}
      <linearGradient id="blackCase" x1="40" y1="56" x2="60" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="25%" stopColor="#1e293b" />
        <stop offset="60%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#020617" />
      </linearGradient>
      {/* Metallic Gold Ring Ferrule */}
      <linearGradient id="goldRing" x1="40" y1="46" x2="60" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="35%" stopColor="#eab308" />
        <stop offset="70%" stopColor="#ca8a04" />
        <stop offset="100%" stopColor="#854d0e" />
      </linearGradient>
      {/* Classic Ruby Red Lipstick Bullet */}
      <linearGradient id="rubyBullet" x1="42" y1="20" x2="58" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fb7185" />
        <stop offset="25%" stopColor="#e11d48" />
        <stop offset="70%" stopColor="#be123c" />
        <stop offset="100%" stopColor="#881337" />
      </linearGradient>
    </defs>

    {/* Shadow beneath lipstick */}
    <ellipse cx="50" cy="85" rx="16" ry="3.5" fill="url(#lipShadow)" />

    {/* Glossy Black Bottom Tube Base */}
    <rect x="42" y="54" width="16" height="28" rx="2.5" fill="url(#blackCase)" stroke="#0f172a" strokeWidth="0.8" />
    {/* Base shine reflection */}
    <line x1="45" y1="56" x2="45" y2="80" stroke="#64748b" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

    {/* Gold Metallic Middle Collar Ring */}
    <rect x="42" y="47" width="16" height="7" rx="1" fill="url(#goldRing)" stroke="#a16207" strokeWidth="0.7" />
    <line x1="45" y1="48" x2="45" y2="53" stroke="#fef9c3" strokeWidth="1" strokeLinecap="round" opacity="0.8" />

    {/* Inner Gold Swivel Cylinder */}
    <rect x="44" y="38" width="12" height="10" rx="1" fill="url(#goldRing)" stroke="#a16207" strokeWidth="0.6" />

    {/* Ruby Red Angled Lipstick Bullet */}
    <path
      d="M45 40 V30 C45 28 47 24 50 20 C51 20 54 23 55 27 L55 40 Z"
      fill="url(#rubyBullet)"
      stroke="#9f1239"
      strokeWidth="0.8"
    />
    {/* Angled slant cut highlight */}
    <path
      d="M45.5 30 C47 26 49 22 50 20.5 C51 20.5 53 23 54.5 27 C52 29 48 30 45.5 30 Z"
      fill="#f43f5e"
      opacity="0.9"
    />
    {/* Specular sheen down the side */}
    <line x1="47" y1="28" x2="47" y2="39" stroke="#fda4af" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
  </svg>
);

// 5. Salon for Men (Male avatar with facial mask, cucumber eye slices, white spa robe)
export const SalonForMenVisual: React.FC<{ className?: string }> = ({
  className = 'w-16 h-16',
}) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="sfmGlow" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.8" />
        <stop offset="70%" stopColor="#eef2ff" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#eef2ff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="sfmSkin" cx="48%" cy="38%" r="60%">
        <stop offset="0%" stopColor="#ffedd5" />
        <stop offset="40%" stopColor="#fed7aa" />
        <stop offset="80%" stopColor="#fdba74" />
        <stop offset="100%" stopColor="#fb923c" />
      </radialGradient>
      <linearGradient id="sfmHair" x1="30" y1="14" x2="70" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#451a03" />
        <stop offset="40%" stopColor="#291102" />
        <stop offset="100%" stopColor="#1a0a01" />
      </linearGradient>
      <linearGradient id="sfmRobe" x1="50" y1="68" x2="50" y2="96" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="70%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>
      <radialGradient id="sfmCuke" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#dcfce7" />
        <stop offset="50%" stopColor="#86efac" />
        <stop offset="100%" stopColor="#16a34a" />
      </radialGradient>
      <radialGradient id="sfmShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Drop shadow */}
    <ellipse cx="50" cy="94" rx="34" ry="4" fill="url(#sfmShadow)" />

    {/* White Spa Robe & Shoulders */}
    <path
      d="M20 95 C20 76 32 68 43 65 L50 78 L57 65 C68 68 80 76 80 95 Z"
      fill="url(#sfmRobe)"
      stroke="#cbd5e1"
      strokeWidth="1"
    />
    {/* V-neck robe collar folds */}
    <path d="M40 66 L50 82 L60 66" stroke="#94a3b8" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M50 82 V95" stroke="#cbd5e1" strokeWidth="1" />

    {/* Neck */}
    <rect x="44.5" y="52" width="11" height="15" rx="4" fill="#fdba74" />

    {/* Ears */}
    <circle cx="34" cy="45" r="4.2" fill="#fdba74" />
    <circle cx="34" cy="45" r="2.2" fill="#fb923c" opacity="0.6" />
    <circle cx="66" cy="45" r="4.2" fill="#fdba74" />
    <circle cx="66" cy="45" r="2.2" fill="#fb923c" opacity="0.6" />

    {/* Head base */}
    <ellipse cx="50" cy="44" rx="15" ry="17" fill="url(#sfmSkin)" />

    {/* Well-groomed Hair */}
    <path
      d="M35 36 C34 22 41 15 50 15 C59 15 66 22 65 36 C63 30 58 24 50 24 C42 24 37 29 35 36 Z"
      fill="url(#sfmHair)"
    />
    {/* Sideburns */}
    <rect x="34.5" y="34" width="2.5" height="8" rx="1" fill="url(#sfmHair)" />
    <rect x="63" y="34" width="2.5" height="8" rx="1" fill="url(#sfmHair)" />

    {/* White Clay / Foam Facial Mask across cheeks & jaw */}
    <path
      d="M37.5 46 C37.5 56 42 61 50 61 C58 61 62.5 56 62.5 46 C60 48.5 56 50 50 50 C44 50 40 48.5 37.5 46 Z"
      fill="#ffffff"
      stroke="#e2e8f0"
      strokeWidth="0.8"
    />

    {/* Fresh Green Cucumber Eye Slices */}
    <g transform="translate(43, 42)">
      <circle cx="0" cy="0" r="4.5" fill="url(#sfmCuke)" stroke="#15803d" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="2.8" stroke="#bbf7d0" strokeWidth="0.5" strokeDasharray="1 1.2" fill="none" />
      <circle cx="0" cy="0" r="1" fill="#15803d" />
    </g>
    <g transform="translate(57, 42)">
      <circle cx="0" cy="0" r="4.5" fill="url(#sfmCuke)" stroke="#15803d" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="2.8" stroke="#bbf7d0" strokeWidth="0.5" strokeDasharray="1 1.2" fill="none" />
      <circle cx="0" cy="0" r="1" fill="#15803d" />
    </g>

    {/* Relaxed serene smile */}
    <path d="M47 55 Q50 57.5 53 55" stroke="#9a3412" strokeWidth="1.2" strokeLinecap="round" fill="none" />
  </svg>
);

// 6. Massage for Men (3D wooden massage bed with black leather cushion, white folded towel, face cradle)
export const MassageForMenVisual: React.FC<{ className?: string }> = ({
  className = 'w-16 h-16',
}) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      {/* Drop shadow */}
      <radialGradient id="menBedShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
      {/* Rich dark wood legs */}
      <linearGradient id="menWoodLegs" x1="0" y1="45" x2="0" y2="85" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#a16207" />
        <stop offset="40%" stopColor="#78350f" />
        <stop offset="80%" stopColor="#451a03" />
        <stop offset="100%" stopColor="#291102" />
      </linearGradient>
      {/* Black leather mattress cushion */}
      <linearGradient id="blackBedCushion" x1="20" y1="36" x2="20" y2="52" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="35%" stopColor="#1e293b" />
        <stop offset="80%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#020617" />
      </linearGradient>
      <linearGradient id="blackBedTop" x1="18" y1="36" x2="78" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="50%" stopColor="#334155" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
      {/* White folded towel */}
      <linearGradient id="whiteTowelFold" x1="38" y1="28" x2="38" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>
    </defs>

    {/* Ground contact shadow beneath massage table */}
    <ellipse cx="50" cy="85" rx="38" ry="4.5" fill="url(#menBedShadow)" />

    {/* Sturdy Wood Support Legs & Cross Bracing */}
    {/* Left leg pair */}
    <path d="M23 48 L16 84 H20 L27 48 Z" fill="url(#menWoodLegs)" />
    <path d="M29 48 L36 84 H32 L25 48 Z" fill="url(#menWoodLegs)" />
    {/* Right leg pair */}
    <path d="M67 48 L60 84 H64 L71 48 Z" fill="url(#menWoodLegs)" />
    <path d="M73 48 L80 84 H76 L69 48 Z" fill="url(#menWoodLegs)" />

    {/* Horizontal wooden stretcher support beam */}
    <rect x="21" y="66" width="55" height="3" rx="1" fill="#451a03" />
    <rect x="22" y="66.5" width="53" height="1" fill="#a16207" opacity="0.8" />

    {/* Diagonal cross tension wires */}
    <line x1="27" y1="50" x2="67" y2="76" stroke="#94a3b8" strokeWidth="0.8" opacity="0.5" />
    <line x1="67" y1="50" x2="27" y2="76" stroke="#94a3b8" strokeWidth="0.8" opacity="0.5" />

    {/* Premium Black Leather Mattress Body */}
    <rect
      x="17"
      y="38"
      width="61"
      height="12"
      rx="3.5"
      fill="url(#blackBedCushion)"
      stroke="#0f172a"
      strokeWidth="0.8"
    />

    {/* Beveled top cushion contour with leather sheen */}
    <path
      d="M20 38 H75 C76.5 38 78 39 78 40.5 V44 C78 45.5 76.5 46.5 75 46.5 H20 C18.5 46.5 17 45.5 17 44 V40.5 C17 39 18.5 38 20 38 Z"
      fill="url(#blackBedTop)"
    />
    <line x1="19" y1="39" x2="76" y2="39" stroke="#64748b" strokeWidth="0.6" opacity="0.6" />

    {/* Leather seam stitch indentation across center */}
    <line x1="47.5" y1="38.5" x2="47.5" y2="47" stroke="#020617" strokeWidth="0.8" strokeDasharray="1 1.5" />

    {/* Adjustable Face Cradle / Headrest on right side */}
    <rect x="78" y="41" width="3.5" height="2" fill="#451a03" rx="0.5" />
    <ellipse cx="84.5" cy="42" rx="4.5" ry="3.5" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
    <ellipse cx="84.5" cy="42" rx="2" ry="1.5" fill="#020617" />
    <line x1="82" y1="41" x2="87" y2="41" stroke="#475569" strokeWidth="0.6" />

    {/* Crisp White Folded Bath Towel in Center of Bed */}
    <rect
      x="36"
      y="32"
      width="14"
      height="6.5"
      rx="2"
      fill="url(#whiteTowelFold)"
      stroke="#cbd5e1"
      strokeWidth="0.7"
    />
    {/* Towel fold crease lines */}
    <ellipse cx="50" cy="35.2" rx="1.5" ry="3.2" fill="#e2e8f0" />
    <ellipse cx="36" cy="35.2" rx="1.5" ry="3.2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
    <path d="M37 34 H49" stroke="#cbd5e1" strokeWidth="0.6" />
    <path d="M38 36.5 H48" stroke="#e2e8f0" strokeWidth="0.5" />
  </svg>
);

