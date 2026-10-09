// Original flat-style vehicle illustrations (not photographs — drawn in brand colors)
// so there's no licensing risk from using a real manufacturer's photo.
// Swap any of these for a real photo later: drop a .jpg into src/assets and use
// <img src={photo} className="fleet-illustration" /> in place of <SedanArt />.

export function SedanArt(props) {
  return (
    <svg viewBox="0 0 320 150" className="fleet-illustration fleet-illustration--sedan" {...props}>
      <ellipse cx="160" cy="128" rx="118" ry="9" fill="#000" opacity="0.15" />
      <path d="M44 100 Q40 86 58 82 L74 78 L96 52 Q106 42 122 42 L182 42 Q196 42 206 52 L224 78 L250 82 Q268 86 264 102 Q264 108 256 108 L52 108 Q44 108 44 100 Z" fill="var(--car-body, #0a1628)" />
      <path d="M100 76 L116 54 Q122 48 130 48 L176 48 Q184 48 190 54 L212 76 Z" fill="var(--car-glass, #cfe0f5)" opacity="0.92" />
      <path d="M100 76 L212 76" stroke="var(--car-body,#0a1628)" strokeWidth="3" />
      <path d="M156 48 L156 76" stroke="var(--car-body,#0a1628)" strokeWidth="3" />
      <rect x="44" y="94" width="220" height="12" fill="var(--car-accent,#f5a623)" opacity="0.95" />
      <circle cx="94" cy="122" r="20" fill="#1b1f27" />
      <circle cx="94" cy="122" r="9" fill="#c9ced6" />
      <circle cx="222" cy="122" r="20" fill="#1b1f27" />
      <circle cx="222" cy="122" r="9" fill="#c9ced6" />
      <rect x="244" y="80" width="13" height="7" rx="2" fill="#ffd77a" />
      <rect x="50" y="80" width="11" height="6" rx="2" fill="#ff6b6b" />
    </svg>
  );
}

export function SuvArt(props) {
  return (
    <svg viewBox="0 0 320 168" className="fleet-illustration fleet-illustration--suv" {...props}>
      <ellipse cx="160" cy="146" rx="126" ry="9" fill="#000" opacity="0.15" />
      <path d="M34 112 Q30 68 60 64 L70 38 Q76 28 90 28 L228 28 Q242 28 248 38 L258 64 Q288 68 286 112 Q286 120 276 120 L44 120 Q34 120 34 112 Z" fill="var(--car-body, #112240)" />
      <path d="M84 60 L94 42 Q98 34 108 34 L210 34 Q220 34 224 42 L234 60 Z" fill="var(--car-glass, #cfe0f5)" opacity="0.92" />
      <path d="M84 60 L234 60" stroke="var(--car-body,#112240)" strokeWidth="3" />
      <path d="M128 34 L128 60 M190 34 L190 60" stroke="var(--car-body,#112240)" strokeWidth="3" />
      <rect x="32" y="104" width="256" height="14" fill="var(--car-accent,#f5a623)" opacity="0.95" />
      <rect x="60" y="22" width="200" height="7" rx="3" fill="var(--car-body,#112240)" opacity="0.6" />
      <circle cx="96" cy="140" r="23" fill="#1b1f27" />
      <circle cx="96" cy="140" r="10.5" fill="#c9ced6" />
      <circle cx="224" cy="140" r="23" fill="#1b1f27" />
      <circle cx="224" cy="140" r="10.5" fill="#c9ced6" />
      <rect x="252" y="88" width="15" height="8" rx="2" fill="#ffd77a" />
      <rect x="40" y="88" width="12" height="7" rx="2" fill="#ff6b6b" />
    </svg>
  );
}

export function XuvArt(props) {
  return (
    <svg viewBox="0 0 320 180" className="fleet-illustration fleet-illustration--xuv" {...props}>
      <ellipse cx="160" cy="156" rx="134" ry="10" fill="#000" opacity="0.15" />
      <path d="M22 118 Q18 62 52 58 L62 34 Q68 22 84 22 L240 22 Q256 22 262 34 L272 58 Q302 62 300 118 Q300 128 288 128 L34 128 Q22 128 22 118 Z" fill="var(--car-body, #0a1628)" />
      <path d="M76 54 L84 38 Q89 28 100 28 L150 28 L150 54 Z" fill="var(--car-glass, #cfe0f5)" opacity="0.92" />
      <path d="M156 28 L204 28 L204 54 L156 54 Z" fill="var(--car-glass, #cfe0f5)" opacity="0.92" />
      <path d="M210 28 L222 28 Q233 28 238 38 L246 54 L210 54 Z" fill="var(--car-glass, #cfe0f5)" opacity="0.92" />
      <path d="M76 54 L246 54" stroke="var(--car-body,#0a1628)" strokeWidth="3" />
      <path d="M152 26 L152 54 M207 26 L207 54" stroke="var(--car-body,#0a1628)" strokeWidth="3" />
      <rect x="20" y="110" width="280" height="16" fill="var(--car-accent,#f5a623)" opacity="0.95" />
      <rect x="46" y="15" width="228" height="8" rx="3" fill="var(--car-accent,#f5a623)" opacity="0.85" />
      <rect x="46" y="15" width="4" height="22" fill="var(--car-accent,#f5a623)" opacity="0.85" />
      <rect x="270" y="15" width="4" height="22" fill="var(--car-accent,#f5a623)" opacity="0.85" />
      <circle cx="92" cy="150" r="26" fill="#1b1f27" />
      <circle cx="92" cy="150" r="12" fill="#c9ced6" />
      <circle cx="234" cy="150" r="26" fill="#1b1f27" />
      <circle cx="234" cy="150" r="12" fill="#c9ced6" />
      <rect x="262" y="92" width="17" height="9" rx="2" fill="#ffd77a" />
      <rect x="26" y="92" width="14" height="8" rx="2" fill="#ff6b6b" />
    </svg>
  );
}
