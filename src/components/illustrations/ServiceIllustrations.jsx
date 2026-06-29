/* All service illustrations — flat SVG, 280×168 viewBox, one gold accent each */

const GOLD = '#E8AB18';

/* ─── SOFA & CARPET ─────────────────────────────────────── */

export function FabricSofaSVG() {
  const c = '#009966';
  return (
    <svg viewBox="0 0 280 168" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="168" fill="#E4F7EE"/>
      {/* Decorative dots */}
      {[20,60,100,140,180,220,260].map(x => [30,140].map(y => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill={c} opacity="0.12"/>
      )))}
      {/* Sofa back */}
      <rect x="26" y="52" width="228" height="56" rx="12" fill="white" stroke={c} strokeWidth="2"/>
      {/* Back cushions */}
      <rect x="34" y="60" width="68" height="40" rx="8" fill="#E4F7EE" stroke={c} strokeWidth="1.5"/>
      <line x1="68" y1="66" x2="68" y2="94" stroke={c} strokeWidth="1" opacity="0.35" strokeDasharray="3 2.5"/>
      <rect x="108" y="60" width="64" height="40" rx="8" fill="#E4F7EE" stroke={c} strokeWidth="1.5"/>
      <line x1="140" y1="66" x2="140" y2="94" stroke={c} strokeWidth="1" opacity="0.35" strokeDasharray="3 2.5"/>
      <rect x="178" y="60" width="68" height="40" rx="8" fill="#E4F7EE" stroke={c} strokeWidth="1.5"/>
      <line x1="212" y1="66" x2="212" y2="94" stroke={c} strokeWidth="1" opacity="0.35" strokeDasharray="3 2.5"/>
      {/* Seat */}
      <rect x="26" y="104" width="228" height="26" rx="10" fill="white" stroke={c} strokeWidth="2"/>
      {/* Arms */}
      <rect x="14" y="70" width="18" height="58" rx="9" fill="white" stroke={c} strokeWidth="2"/>
      <rect x="14" y="66" width="20" height="14" rx="7" fill={c}/>
      <rect x="248" y="70" width="18" height="58" rx="9" fill="white" stroke={c} strokeWidth="2"/>
      <rect x="246" y="66" width="20" height="14" rx="7" fill={c}/>
      {/* Legs */}
      {[42, 100, 170, 228].map(x => (
        <rect key={x} x={x} y="128" width="10" height="18" rx="4" fill={c} opacity="0.45"/>
      ))}
      {/* Gold throw pillow */}
      <rect x="108" y="62" width="64" height="36" rx="6" fill={GOLD} opacity="0.18" className="gold-shine"/>
      <rect x="116" y="69" width="48" height="22" rx="4" fill="none" stroke={GOLD} strokeWidth="1.5" className="gold-shine"/>
    </svg>
  );
}

export function LeatherSofaSVG() {
  const c = '#009966';
  return (
    <svg viewBox="0 0 280 168" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="168" fill="#E4F7EE"/>
      {/* Sleek leather sofa */}
      <rect x="22" y="48" width="236" height="62" rx="8" fill="white" stroke={c} strokeWidth="2"/>
      {/* Leather tufting buttons */}
      {[60, 100, 140, 180, 220].map(x => (
        <circle key={x} cx={x} cy="79" r="4" fill={c} opacity="0.25"/>
      ))}
      {[60, 100, 140, 180, 220].map(x => (
        <line key={x} x1={x} y1="55" x2={x} y2="104" stroke={c} strokeWidth="1" opacity="0.2"/>
      ))}
      {/* Seat */}
      <rect x="22" y="104" width="236" height="24" rx="8" fill="white" stroke={c} strokeWidth="2"/>
      {/* Arms — more angular for leather */}
      <rect x="10" y="64" width="18" height="62" rx="4" fill={c} opacity="0.8"/>
      <rect x="252" y="64" width="18" height="62" rx="4" fill={c} opacity="0.8"/>
      {/* Leather shine streak */}
      <rect x="38" y="56" width="180" height="8" rx="4" fill={GOLD} opacity="0.22" className="gold-shine"/>
      {/* Legs — sleek chrome */}
      {[32, 90, 170, 228].map(x => (
        <rect key={x} x={x} y="126" width="12" height="20" rx="3" fill="#C0C8C2"/>
      ))}
    </svg>
  );
}

export function ReclinerSVG() {
  const c = '#009966';
  return (
    <svg viewBox="0 0 280 168" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="168" fill="#E4F7EE"/>
      {/* Footrest */}
      <rect x="170" y="110" width="90" height="28" rx="8" fill="white" stroke={c} strokeWidth="2"/>
      {/* Chair body */}
      <rect x="50" y="64" width="130" height="72" rx="10" fill="white" stroke={c} strokeWidth="2"/>
      {/* Back rest (angled) */}
      <rect x="50" y="30" width="36" height="88" rx="10" fill={c} opacity="0.85"/>
      {/* Head rest */}
      <rect x="52" y="24" width="32" height="22" rx="8" fill={c}/>
      {/* Arm */}
      <rect x="50" y="64" width="130" height="18" rx="8" fill={c} opacity="0.7"/>
      {/* Seat cushion detail */}
      <line x1="86" y1="82" x2="178" y2="82" stroke={c} strokeWidth="1.5" opacity="0.3"/>
      <line x1="86" y1="95" x2="178" y2="95" stroke={c} strokeWidth="1.5" opacity="0.3"/>
      {/* Pivot mechanism */}
      <circle cx="180" cy="120" r="8" fill="#DDE9E2" stroke={c} strokeWidth="1.5"/>
      {/* Gold accent on footrest */}
      <rect x="175" y="115" width="80" height="8" rx="4" fill={GOLD} opacity="0.25" className="gold-shine"/>
      {/* Leg */}
      <rect x="90" y="134" width="14" height="22" rx="4" fill={c} opacity="0.4"/>
      <rect x="140" y="134" width="14" height="22" rx="4" fill={c} opacity="0.4"/>
    </svg>
  );
}

export function SofaBedSVG() {
  const c = '#009966';
  return (
    <svg viewBox="0 0 280 168" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="168" fill="#E4F7EE"/>
      {/* Bed part (open) */}
      <rect x="20" y="88" width="240" height="50" rx="6" fill="white" stroke={c} strokeWidth="2"/>
      {/* Mattress quilting */}
      {[40,70,100,130,160,190,220].map(x => (
        <line key={x} x1={x} y1="90" x2={x} y2="136" stroke={c} strokeWidth="1" opacity="0.2"/>
      ))}
      {[100,118].map(y => (
        <line key={y} x1="22" y1={y} x2="258" y2={y} stroke={c} strokeWidth="1" opacity="0.2"/>
      ))}
      {/* Pillow */}
      <rect x="24" y="92" width="56" height="36" rx="8" fill={c} opacity="0.18"/>
      <rect x="30" y="98" width="44" height="24" rx="5" fill="white" stroke={c} strokeWidth="1.5"/>
      {/* Sofa back (folded up) */}
      <rect x="20" y="40" width="240" height="50" rx="10" fill={c} opacity="0.12" stroke={c} strokeWidth="2"/>
      {/* Sofa arm backs */}
      <rect x="18" y="36" width="22" height="60" rx="8" fill={c} opacity="0.7"/>
      <rect x="240" y="36" width="22" height="60" rx="8" fill={c} opacity="0.7"/>
      {/* Fold hinge line */}
      <line x1="20" y1="88" x2="260" y2="88" stroke={c} strokeWidth="2.5" strokeDasharray="6 4"/>
      {/* Gold accent */}
      <rect x="30" y="98" width="44" height="24" rx="5" fill={GOLD} opacity="0.15" className="gold-shine"/>
      {/* Legs */}
      {[40,230].map(x => (
        <rect key={x} x={x} y="136" width="10" height="18" rx="3" fill={c} opacity="0.4"/>
      ))}
    </svg>
  );
}

export function WoodenSofaSVG() {
  const c = '#009966';
  const wood = '#8B6443';
  return (
    <svg viewBox="0 0 280 168" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="168" fill="#E4F7EE"/>
      {/* Wooden frame */}
      <rect x="24" y="56" width="232" height="80" rx="6" fill={wood} opacity="0.2" stroke={wood} strokeWidth="2.5"/>
      {/* Arms */}
      <rect x="22" y="54" width="20" height="82" rx="6" fill={wood} opacity="0.7"/>
      <rect x="238" y="54" width="20" height="82" rx="6" fill={wood} opacity="0.7"/>
      {/* Back rail */}
      <rect x="24" y="54" width="232" height="18" rx="6" fill={wood} opacity="0.85"/>
      {/* Seat cushion */}
      <rect x="44" y="100" width="192" height="34" rx="6" fill="white" stroke={c} strokeWidth="1.5"/>
      {/* Back cushions */}
      <rect x="44" y="68" width="85" height="36" rx="6" fill="white" stroke={c} strokeWidth="1.5"/>
      <rect x="151" y="68" width="85" height="36" rx="6" fill="white" stroke={c} strokeWidth="1.5"/>
      {/* Wood grain lines */}
      {[28,34,40].map(y => (
        <line key={y} x1="26" y1={y+28} x2="254" y2={y+28} stroke={wood} strokeWidth="1" opacity="0.3"/>
      ))}
      {/* Gold cushion accent */}
      <rect x="108" y="100" width="64" height="34" rx="6" fill={GOLD} opacity="0.14" className="gold-shine"/>
      {/* Legs */}
      {[32,100,160,230].map(x => (
        <rect key={x} x={x} y="132" width="10" height="24" rx="3" fill={wood} opacity="0.8"/>
      ))}
    </svg>
  );
}

export function CarpetSVG() {
  const c = '#009966';
  return (
    <svg viewBox="0 0 280 168" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="168" fill="#E4F7EE"/>
      {/* Rug body (slightly angled to show 3D) */}
      <rect x="24" y="36" width="232" height="116" rx="6" fill="white" stroke={c} strokeWidth="2"/>
      {/* Border pattern */}
      <rect x="34" y="46" width="212" height="96" rx="4" fill="none" stroke={c} strokeWidth="1.5" opacity="0.5"/>
      <rect x="44" y="56" width="192" height="76" rx="4" fill="none" stroke={c} strokeWidth="1" opacity="0.3"/>
      {/* Center medallion */}
      <ellipse cx="140" cy="94" rx="44" ry="28" fill={c} opacity="0.1" stroke={c} strokeWidth="1.5"/>
      <ellipse cx="140" cy="94" rx="28" ry="16" fill={c} opacity="0.1" stroke={c} strokeWidth="1" opacity="0.4"/>
      {/* Corner ornaments */}
      {[[50,62],[222,62],[50,126],[222,126]].map(([x,y]) => (
        <rect key={`${x}-${y}`} x={x-6} y={y-6} width="12" height="12" rx="2" fill={c} opacity="0.3" transform={`rotate(45 ${x} ${y})`}/>
      ))}
      {/* Pile texture lines */}
      {[58,70,82,94,106].map(x => (
        <line key={x} x1={x} y1="58" x2={x} y2="130" stroke={c} strokeWidth="1" opacity="0.08"/>
      ))}
      {/* Fringes left */}
      {[46,56,66,76,86,96,106,116,126,136].map(y => (
        <line key={`l${y}`} x1="24" y1={y} x2="8" y2={y} stroke={c} strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
      ))}
      {/* Fringes right */}
      {[46,56,66,76,86,96,106,116,126,136].map(y => (
        <line key={`r${y}`} x1="256" y1={y} x2="272" y2={y} stroke={c} strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
      ))}
      {/* Gold center diamond */}
      <rect x="132" y="86" width="16" height="16" rx="2" fill={GOLD} opacity="0.5" transform="rotate(45 140 94)" className="gold-shine"/>
    </svg>
  );
}

export function DiningTableSVG() {
  const c = '#009966';
  const wood = '#7A5738';
  return (
    <svg viewBox="0 0 280 168" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="168" fill="#E4F7EE"/>
      {/* Table top (slightly perspective) */}
      <ellipse cx="140" cy="84" rx="100" ry="44" fill="white" stroke={wood} strokeWidth="2.5"/>
      <ellipse cx="140" cy="84" rx="88" ry="36" fill="none" stroke={wood} strokeWidth="1" opacity="0.3"/>
      {/* Table leg (center post) */}
      <rect x="134" y="118" width="12" height="28" rx="4" fill={wood} opacity="0.7"/>
      <ellipse cx="140" cy="146" rx="22" ry="6" fill={wood} opacity="0.4"/>
      {/* Chairs - top */}
      <rect x="115" y="26" width="50" height="28" rx="10" fill={c} opacity="0.8"/>
      <rect x="122" y="38" width="36" height="24" rx="6" fill="white" stroke={c} strokeWidth="1.5"/>
      {/* Chairs - bottom */}
      <rect x="115" y="126" width="50" height="28" rx="10" fill={c} opacity="0.8"/>
      <rect x="122" y="126" width="36" height="24" rx="6" fill="white" stroke={c} strokeWidth="1.5"/>
      {/* Chairs - left */}
      <rect x="22" y="64" width="28" height="44" rx="10" fill={c} opacity="0.75"/>
      <rect x="22" y="72" width="28" height="32" rx="6" fill="white" stroke={c} strokeWidth="1.5"/>
      {/* Chairs - right */}
      <rect x="230" y="64" width="28" height="44" rx="10" fill={c} opacity="0.75"/>
      <rect x="230" y="72" width="28" height="32" rx="6" fill="white" stroke={c} strokeWidth="1.5"/>
      {/* Place setting - gold accent */}
      <ellipse cx="140" cy="84" rx="18" ry="10" fill="none" stroke={GOLD} strokeWidth="1.5" className="gold-shine"/>
      <circle cx="140" cy="84" r="5" fill={GOLD} opacity="0.4" className="gold-shine"/>
    </svg>
  );
}

export function MattressSVG() {
  const c = '#009966';
  return (
    <svg viewBox="0 0 280 168" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="168" fill="#E4F7EE"/>
      {/* Mattress side thickness */}
      <rect x="22" y="98" width="236" height="22" rx="4" fill={c} opacity="0.25"/>
      {/* Mattress top surface */}
      <rect x="22" y="48" width="236" height="56" rx="10" fill="white" stroke={c} strokeWidth="2"/>
      {/* Quilted diamond grid */}
      {[48,64,80].map(y =>
        [40,80,120,160,200,240].map(x => (
          <rect key={`${x}-${y}`} x={x-10} y={y-8} width="20" height="16" rx="2" fill="none" stroke={c} strokeWidth="1" opacity="0.2" transform={`rotate(45 ${x} ${y})`}/>
        ))
      )}
      {/* Piping edge */}
      <rect x="22" y="48" width="236" height="10" rx="5" fill={c} opacity="0.15"/>
      <rect x="22" y="94" width="236" height="10" rx="5" fill={c} opacity="0.15"/>
      {/* Pillow */}
      <rect x="30" y="53" width="76" height="40" rx="10" fill={c} opacity="0.12" stroke={c} strokeWidth="1.5"/>
      <rect x="36" y="58" width="64" height="30" rx="7" fill="white" stroke={c} strokeWidth="1"/>
      {/* Gold pillow case accent */}
      <rect x="36" y="58" width="64" height="30" rx="7" fill={GOLD} opacity="0.12" className="gold-shine"/>
      {/* Care tag */}
      <rect x="240" y="60" width="14" height="22" rx="3" fill={GOLD} opacity="0.6"/>
      <line x1="247" y1="58" x2="247" y2="52" stroke={GOLD} strokeWidth="1.5"/>
    </svg>
  );
}

export function OtherFurnitureSVG() {
  const c = '#009966';
  return (
    <svg viewBox="0 0 280 168" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="168" fill="#E4F7EE"/>
      {/* Ottoman */}
      <rect x="24" y="92" width="96" height="48" rx="12" fill="white" stroke={c} strokeWidth="2"/>
      <line x1="72" y1="92" x2="72" y2="140" stroke={c} strokeWidth="1.5" opacity="0.3"/>
      <line x1="24" y1="116" x2="120" y2="116" stroke={c} strokeWidth="1.5" opacity="0.3"/>
      {/* Ottoman button */}
      <circle cx="72" cy="116" r="6" fill={c} opacity="0.25"/>
      <circle cx="72" cy="116" r="3" fill={c} opacity="0.5"/>
      {/* Office chair */}
      <rect x="148" y="68" width="96" height="72" rx="10" fill="white" stroke={c} strokeWidth="2"/>
      {/* Chair back */}
      <rect x="162" y="40" width="68" height="40" rx="8" fill={c} opacity="0.15" stroke={c} strokeWidth="1.5"/>
      {/* Chair adjustment */}
      <rect x="188" y="136" width="16" height="16" rx="3" fill="#C0C8C2"/>
      {/* Wheels */}
      {[168, 196, 224].map(x => (
        <circle key={x} cx={x} cy="152" r="5" fill={c} opacity="0.3"/>
      ))}
      {/* Gold accent - ottoman top */}
      <rect x="38" y="106" width="68" height="20" rx="6" fill={GOLD} opacity="0.12" className="gold-shine"/>
      {/* Curtain panel hint */}
      <rect x="24" y="20" width="16" height="68" rx="4" fill={c} opacity="0.2" stroke={c} strokeWidth="1"/>
      <line x1="32" y1="20" x2="32" y2="88" stroke={c} strokeWidth="1" opacity="0.2" strokeDasharray="4 4"/>
    </svg>
  );
}

/* ─── BATHROOM & KITCHEN ──────────────────────────────── */

export function BathroomComboSVG() {
  const c = '#0284C7';
  return (
    <svg viewBox="0 0 280 168" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="168" fill="#E0F2FE"/>
      {/* Divider */}
      <line x1="140" y1="20" x2="140" y2="152" stroke={c} strokeWidth="1.5" opacity="0.2" strokeDasharray="6 4"/>
      {/* LEFT — BATHROOM */}
      {/* Tiles */}
      {[32,54,76,98,120].map(x =>
        [28,52,76,100,124].map(y => (
          <rect key={`t${x}-${y}`} x={x} y={y} width="20" height="22" rx="1" fill="white" stroke={c} strokeWidth="0.8" opacity="0.5"/>
        ))
      )}
      {/* Shower head */}
      <ellipse cx="70" cy="44" rx="28" ry="10" fill={c} opacity="0.7"/>
      <circle cx="70" cy="44" r="4" fill="white"/>
      {[55,63,70,77,85].map(x => (
        <line key={x} x1={x} y1="44" x2={x} y2="44" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      ))}
      {/* Water drops */}
      {[[52,62],[62,68],[72,64],[82,70],[60,78],[75,76]].map(([x,y]) => (
        <ellipse key={`d${x}`} cx={x} cy={y} rx="3" ry="5" fill={c} opacity="0.4"/>
      ))}
      {/* RIGHT — KITCHEN */}
      {/* Counter */}
      <rect x="148" y="88" width="116" height="52" rx="6" fill="white" stroke={c} strokeWidth="1.5"/>
      {/* Stove burners */}
      {[[170,108],[198,108],[170,128],[198,128]].map(([x,y]) => (
        <circle key={`b${x}-${y}`} cx={x} cy={y} r="10" fill={c} opacity="0.12" stroke={c} strokeWidth="1.5"/>
      ))}
      {/* Flame on one burner */}
      <ellipse cx="170" cy="105" rx="5" ry="8" fill={GOLD} opacity="0.8" className="gold-shine"/>
      <ellipse cx="170" cy="108" rx="3" ry="5" fill="#F97316" opacity="0.7"/>
      {/* Sink on right side */}
      <rect x="220" y="96" width="36" height="28" rx="5" fill="#E0F2FE" stroke={c} strokeWidth="1.5"/>
      <circle cx="238" cy="110" r="5" fill="none" stroke={c} strokeWidth="1.5"/>
      <line x1="238" y1="92" x2="238" y2="96" stroke={c} strokeWidth="2"/>
    </svg>
  );
}

export function BathroomSVG() {
  const c = '#0284C7';
  return (
    <svg viewBox="0 0 280 168" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="168" fill="#E0F2FE"/>
      {/* Wall tiles background */}
      {[22,44,66,88,110,132,154,176,198,220,242].map(x =>
        [20,48,76,104,132].map(y => (
          <rect key={`t${x}-${y}`} x={x} y={y} width="20" height="26" rx="1.5" fill="white" stroke={c} strokeWidth="0.8" opacity="0.45"/>
        ))
      )}
      {/* Shower rose */}
      <ellipse cx="140" cy="42" rx="40" ry="14" fill={c} opacity="0.75"/>
      {/* Holes on rose */}
      {[[110,42],[120,38],[130,36],[140,35],[150,36],[160,38],[170,42],
        [115,46],[125,44],[135,44],[145,44],[155,44],[165,46]].map(([x,y]) => (
        <circle key={`h${x}-${y}`} cx={x} cy={y} r="2" fill="white" opacity="0.9"/>
      ))}
      {/* Shower arm pipe */}
      <rect x="136" y="20" width="8" height="24" rx="3" fill={c} opacity="0.6"/>
      {/* Water streams */}
      {[108,116,124,132,140,148,156,164,172].map((x,i) => (
        <line key={x} x1={x} y1="56" x2={x-(i%3-1)*2} y2={110} stroke={c} strokeWidth="1.5" opacity="0.35" strokeLinecap="round"/>
      ))}
      {/* Water drops at bottom */}
      {[108,120,132,144,156,168].map(x => (
        <ellipse key={x} cx={x} cy="118" rx="4" ry="6" fill={c} opacity="0.3"/>
      ))}
      {/* Steam wisps */}
      <path d="M90 32 Q86 22 92 16 Q88 10 94 4" stroke={c} strokeWidth="2" opacity="0.3" fill="none" strokeLinecap="round"/>
      <path d="M180 28 Q184 18 178 12 Q182 6 176 2" stroke={c} strokeWidth="2" opacity="0.3" fill="none" strokeLinecap="round"/>
      {/* Gold tap fixture */}
      <rect x="128" y="126" width="24" height="12" rx="4" fill={GOLD} opacity="0.7" className="gold-shine"/>
      <rect x="136" y="118" width="8" height="12" rx="3" fill={GOLD} opacity="0.6" className="gold-shine"/>
      {/* Floor tiles hint */}
      <rect x="22" y="138" width="236" height="24" rx="4" fill="white" opacity="0.4" stroke={c} strokeWidth="1" opacity="0.3"/>
    </svg>
  );
}

export function KitchenSVG() {
  const c = '#0284C7';
  return (
    <svg viewBox="0 0 280 168" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="168" fill="#E0F2FE"/>
      {/* Backsplash tiles */}
      {[22,54,86,118,150,182,214,246].map(x =>
        [20,46,72].map(y => (
          <rect key={`t${x}-${y}`} x={x} y={y} width="28" height="23" rx="1.5" fill="white" stroke={c} strokeWidth="0.8" opacity="0.45"/>
        ))
      )}
      {/* Counter */}
      <rect x="22" y="100" width="236" height="48" rx="8" fill="white" stroke={c} strokeWidth="2"/>
      <rect x="22" y="100" width="236" height="10" rx="5" fill={c} opacity="0.15"/>
      {/* Stove top */}
      <rect x="40" y="106" width="120" height="34" rx="6" fill="#EFF8FF" stroke={c} strokeWidth="1.5"/>
      {/* Burners */}
      {[[68,120],[100,120],[68,136],[100,136]].map(([x,y]) => (
        <g key={`b${x}-${y}`}>
          <circle cx={x} cy={y} r="11" fill="none" stroke={c} strokeWidth="2" opacity="0.5"/>
          <circle cx={x} cy={y} r="6" fill="none" stroke={c} strokeWidth="1.5" opacity="0.4"/>
          <circle cx={x} cy={y} r="2" fill={c} opacity="0.5"/>
        </g>
      ))}
      {/* Flame on front-left burner */}
      <path d="M66 133 Q64 126 68 120 Q70 125 74 122 Q72 129 75 132 Q70 134 66 133Z" fill={GOLD} opacity="0.85" className="gold-shine"/>
      <path d="M68 130 Q67 125 70 122 Q71 126 73 124 Q72 128 73 130Z" fill="#F97316" opacity="0.7"/>
      {/* Sink area */}
      <rect x="178" y="108" width="64" height="30" rx="6" fill="#EFF8FF" stroke={c} strokeWidth="1.5"/>
      <rect x="185" y="112" width="50" height="22" rx="4" fill="#E0F2FE" stroke={c} strokeWidth="1"/>
      {/* Tap */}
      <rect x="206" y="102" width="6" height="12" rx="3" fill={GOLD} opacity="0.8" className="gold-shine"/>
      <rect x="200" y="100" width="18" height="5" rx="2.5" fill={GOLD} opacity="0.7" className="gold-shine"/>
      {/* Water drop */}
      <ellipse cx="209" cy="114" rx="3" ry="5" fill={c} opacity="0.3"/>
    </svg>
  );
}

export function MiniServicesSVG() {
  const c = '#0284C7';
  return (
    <svg viewBox="0 0 280 168" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="168" fill="#E0F2FE"/>
      {/* Toilet */}
      <ellipse cx="68" cy="108" rx="34" ry="22" fill="white" stroke={c} strokeWidth="2"/>
      <ellipse cx="68" cy="102" rx="26" ry="16" fill="white" stroke={c} strokeWidth="1.5"/>
      <rect x="44" y="80" width="48" height="26" rx="10" fill="white" stroke={c} strokeWidth="2"/>
      {/* Flush button */}
      <circle cx="68" cy="76" r="6" fill={c} opacity="0.4"/>
      {/* Exhaust fan */}
      <circle cx="180" cy="56" r="36" fill="white" stroke={c} strokeWidth="2"/>
      {/* Fan blades */}
      {[0, 90, 180, 270].map(angle => (
        <rect key={angle} x="162" y="38" width="36" height="18" rx="9" fill={c} opacity="0.2" stroke={c} strokeWidth="1"
          transform={`rotate(${angle} 180 56)`}/>
      ))}
      <circle cx="180" cy="56" r="10" fill="white" stroke={c} strokeWidth="2"/>
      <circle cx="180" cy="56" r="4" fill={c} opacity="0.5"/>
      {/* Gold accent grill lines */}
      <circle cx="180" cy="56" r="28" fill="none" stroke={GOLD} strokeWidth="1.5" opacity="0.4" className="gold-shine"/>
      {/* Washbasin */}
      <ellipse cx="68" cy="54" rx="32" ry="18" fill="white" stroke={c} strokeWidth="2"/>
      <ellipse cx="68" cy="58" rx="22" ry="12" fill="#EFF8FF" stroke={c} strokeWidth="1"/>
      <rect x="60" y="36" width="5" height="20" rx="2.5" fill={GOLD} opacity="0.7" className="gold-shine"/>
      <rect x="54" y="34" width="16" height="5" rx="2.5" fill={GOLD} opacity="0.7" className="gold-shine"/>
      {/* Window */}
      <rect x="188" y="96" width="72" height="56" rx="6" fill="white" stroke={c} strokeWidth="2"/>
      <line x1="224" y1="96" x2="224" y2="152" stroke={c} strokeWidth="1.5" opacity="0.5"/>
      <line x1="188" y1="124" x2="260" y2="124" stroke={c} strokeWidth="1.5" opacity="0.5"/>
    </svg>
  );
}

export function ApplianceSVG() {
  const c = '#0284C7';
  return (
    <svg viewBox="0 0 280 168" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="168" fill="#E0F2FE"/>
      {/* Washing machine */}
      <rect x="24" y="24" width="106" height="130" rx="10" fill="white" stroke={c} strokeWidth="2"/>
      {/* Control panel */}
      <rect x="32" y="32" width="90" height="22" rx="5" fill="#EFF8FF" stroke={c} strokeWidth="1"/>
      {/* Dials */}
      <circle cx="52" cy="43" r="7" fill="white" stroke={c} strokeWidth="1.5"/>
      <circle cx="52" cy="43" r="3" fill={c} opacity="0.5"/>
      <circle cx="72" cy="43" r="5" fill="white" stroke={c} strokeWidth="1.5"/>
      {/* Door porthole */}
      <circle cx="77" cy="96" r="36" fill="#EFF8FF" stroke={c} strokeWidth="2"/>
      <circle cx="77" cy="96" r="29" fill="white" stroke={c} strokeWidth="1.5"/>
      {/* Bubbles inside drum */}
      {[[68,88],[84,92],[72,104],[88,98],[78,86]].map(([x,y]) => (
        <circle key={`bub${x}`} cx={x} cy={y} r="5" fill={c} opacity="0.2"/>
      ))}
      {/* Water line in drum */}
      <path d="M51 110 Q68 104 90 110" stroke={c} strokeWidth="2" opacity="0.4" fill="none" strokeLinecap="round"/>
      {/* Refrigerator */}
      <rect x="150" y="24" width="106" height="130" rx="10" fill="white" stroke={c} strokeWidth="2"/>
      <rect x="150" y="24" width="106" height="76" rx="10" fill="white" stroke={c} strokeWidth="1.5"/>
      <rect x="150" y="96" width="106" height="58" rx="0" fill="#EFF8FF"/>
      <rect x="150" y="96" width="106" height="58" rx="0" fill="none" stroke={c} strokeWidth="1.5"/>
      <line x1="150" y1="96" x2="256" y2="96" stroke={c} strokeWidth="2"/>
      {/* Fridge shelves */}
      {[50,65,80].map(y => (
        <line key={y} x1="158" y1={y} x2="248" y2={y} stroke={c} strokeWidth="1" opacity="0.2"/>
      ))}
      {/* Fridge handle - gold */}
      <rect x="246" y="52" width="6" height="32" rx="3" fill={GOLD} opacity="0.7" className="gold-shine"/>
      <rect x="246" y="108" width="6" height="22" rx="3" fill={GOLD} opacity="0.5" className="gold-shine"/>
      {/* Washing machine feet */}
      {[38,100].map(x => (
        <rect key={x} x={x} y="150" width="14" height="8" rx="3" fill={c} opacity="0.3"/>
      ))}
    </svg>
  );
}

/* ─── FULL HOME ──────────────────────────────────────── */

export function ApartmentSVG() {
  const c = '#7C3AED';
  return (
    <svg viewBox="0 0 280 168" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="168" fill="#EDE9FE"/>
      {/* Sky */}
      <rect width="280" height="168" fill="#EDE9FE"/>
      {/* Building body */}
      <rect x="60" y="20" width="160" height="140" rx="6" fill="white" stroke={c} strokeWidth="2"/>
      {/* Floor bands */}
      {[50,80,110,140].map(y => (
        <line key={y} x1="60" y1={y} x2="220" y2={y} stroke={c} strokeWidth="1" opacity="0.15"/>
      ))}
      {/* Windows — 4 cols × 5 rows */}
      {[82,110,138,166].map(y =>
        [78,112,146,180].map(x => (
          <rect key={`w${x}-${y}`} x={x} y={y} width="18" height="22" rx="3" fill={c} opacity="0.18"/>
        ))
      )}
      {/* Lit windows (gold) */}
      {[[112,82],[180,110],[78,138],[146,82],[180,166]].map(([x,y]) => (
        <rect key={`g${x}-${y}`} x={x} y={y} width="18" height="22" rx="3" fill={GOLD} opacity="0.55" className="gold-shine"/>
      ))}
      {/* Door */}
      <rect x="122" y="134" width="36" height="26" rx="4" fill={c} opacity="0.3"/>
      <circle cx="152" cy="147" r="3" fill={GOLD} opacity="0.7"/>
      {/* Rooftop detail */}
      <rect x="60" y="16" width="160" height="8" rx="3" fill={c} opacity="0.3"/>
      {/* Ground */}
      <rect x="22" y="156" width="236" height="8" rx="4" fill={c} opacity="0.12"/>
    </svg>
  );
}

export function BungalowSVG() {
  const c = '#7C3AED';
  return (
    <svg viewBox="0 0 280 168" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="168" fill="#EDE9FE"/>
      {/* Lawn */}
      <rect x="0" y="144" width="280" height="24" rx="0" fill={c} opacity="0.12"/>
      {/* House body */}
      <rect x="36" y="72" width="208" height="88" rx="6" fill="white" stroke={c} strokeWidth="2"/>
      {/* Roof */}
      <path d="M24 78 L140 20 L256 78Z" fill={c} opacity="0.8" stroke={c} strokeWidth="2"/>
      <path d="M34 78 L140 28 L246 78Z" fill={c} opacity="0.3"/>
      {/* Chimney */}
      <rect x="185" y="28" width="20" height="46" rx="3" fill={c} opacity="0.7"/>
      {/* Smoke */}
      <path d="M195 28 Q193 20 197 14 Q193 8 198 4" stroke={c} strokeWidth="2" opacity="0.3" fill="none" strokeLinecap="round"/>
      {/* Windows */}
      <rect x="52" y="88" width="48" height="44" rx="5" fill={c} opacity="0.15" stroke={c} strokeWidth="1.5"/>
      <line x1="76" y1="88" x2="76" y2="132" stroke={c} strokeWidth="1.5" opacity="0.5"/>
      <line x1="52" y1="110" x2="100" y2="110" stroke={c} strokeWidth="1.5" opacity="0.5"/>
      <rect x="180" y="88" width="48" height="44" rx="5" fill={GOLD} opacity="0.2" stroke={c} strokeWidth="1.5" className="gold-shine"/>
      <line x1="204" y1="88" x2="204" y2="132" stroke={c} strokeWidth="1.5" opacity="0.5"/>
      <line x1="180" y1="110" x2="228" y2="110" stroke={c} strokeWidth="1.5" opacity="0.5"/>
      {/* Door */}
      <rect x="116" y="108" width="48" height="52" rx="5" fill={c} opacity="0.2" stroke={c} strokeWidth="2"/>
      <rect x="120" y="112" width="40" height="44" rx="3" fill="white"/>
      <circle cx="150" cy="136" r="4" fill={GOLD} opacity="0.8"/>
      {/* Steps */}
      <rect x="108" y="153" width="64" height="7" rx="2" fill={c} opacity="0.2"/>
    </svg>
  );
}

export function ByRoomSVG() {
  const c = '#7C3AED';
  return (
    <svg viewBox="0 0 280 168" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="168" fill="#EDE9FE"/>
      {/* Floor plan outline */}
      <rect x="24" y="20" width="232" height="136" rx="6" fill="white" stroke={c} strokeWidth="2.5"/>
      {/* Room dividers */}
      <line x1="142" y1="20" x2="142" y2="156" stroke={c} strokeWidth="2"/>
      <line x1="24" y1="88" x2="142" y2="88" stroke={c} strokeWidth="2"/>
      <line x1="142" y1="110" x2="256" y2="110" stroke={c} strokeWidth="2"/>
      {/* Room fills */}
      {/* Living room - left bottom */}
      <rect x="26" y="90" width="114" height="64" rx="3" fill="#009966" opacity="0.1"/>
      {/* Bedroom - left top */}
      <rect x="26" y="22" width="114" height="64" rx="3" fill="#7C3AED" opacity="0.1"/>
      {/* Kitchen - right top */}
      <rect x="144" y="22" width="110" height="86" rx="3" fill="#0284C7" opacity="0.1"/>
      {/* Bathroom - right bottom */}
      <rect x="144" y="112" width="110" height="42" rx="3" fill={GOLD} opacity="0.15"/>
      {/* Room labels */}
      <text x="83" y="58" textAnchor="middle" fontSize="10" fill={c} opacity="0.7" fontFamily="Inter, sans-serif" fontWeight="600">BEDROOM</text>
      <text x="83" y="122" textAnchor="middle" fontSize="10" fill={c} opacity="0.7" fontFamily="Inter, sans-serif" fontWeight="600">LIVING</text>
      <text x="199" y="62" textAnchor="middle" fontSize="10" fill={c} opacity="0.7" fontFamily="Inter, sans-serif" fontWeight="600">KITCHEN</text>
      <text x="199" y="134" textAnchor="middle" fontSize="10" fill={c} opacity="0.7" fontFamily="Inter, sans-serif" fontWeight="600">BATH</text>
      {/* Door openings */}
      <path d="M142 144 A20 20 0 0 1 122 124" stroke={c} strokeWidth="1.5" fill="none" opacity="0.4"/>
      <path d="M142 60 A16 16 0 0 0 126 60" stroke={c} strokeWidth="1.5" fill="none" opacity="0.4"/>
      {/* Gold accent tick marks for selection */}
      {[83,199].map(x => (
        <circle key={x} cx={x} cy={x === 83 ? 44 : 44} r="8" fill={GOLD} opacity="0.4" className="gold-shine"/>
      ))}
    </svg>
  );
}

/* ─── COMMERCIAL ─────────────────────────────────────── */

export function CommercialBuildingSVG() {
  const c = '#C2410C';
  return (
    <svg viewBox="0 0 280 168" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="168" fill="#FFEDD5"/>
      {/* Main tower */}
      <rect x="70" y="16" width="100" height="148" rx="4" fill="white" stroke={c} strokeWidth="2"/>
      {/* Floor lines */}
      {[40,62,84,106,128,150].map(y => (
        <line key={y} x1="70" y1={y} x2="170" y2={y} stroke={c} strokeWidth="1" opacity="0.15"/>
      ))}
      {/* Window curtain-wall grid */}
      {[76,94,112,130,148].map(x =>
        [22,44,66,88,110,132].map(y => (
          <rect key={`w${x}-${y}`} x={x} y={y} width="14" height="17" rx="2" fill={c} opacity="0.12"/>
        ))
      )}
      {/* Gold lit windows */}
      {[[94,44],[130,66],[94,110],[148,88]].map(([x,y]) => (
        <rect key={`g${x}-${y}`} x={x} y={y} width="14" height="17" rx="2" fill={GOLD} opacity="0.5" className="gold-shine"/>
      ))}
      {/* Side building */}
      <rect x="170" y="56" width="68" height="108" rx="4" fill={c} opacity="0.08" stroke={c} strokeWidth="1.5"/>
      {/* Side windows */}
      {[72,92,112,132].map(y =>
        [178,198,218].map(x => (
          <rect key={`sw${x}-${y}`} x={x} y={y} width="12" height="14" rx="2" fill={c} opacity="0.15"/>
        ))
      )}
      {/* Entrance canopy */}
      <rect x="96" y="148" width="48" height="8" rx="3" fill={c} opacity="0.5"/>
      <rect x="100" y="142" width="2" height="8" fill={c} opacity="0.4"/>
      <rect x="138" y="142" width="2" height="8" fill={c} opacity="0.4"/>
      {/* Door */}
      <rect x="106" y="136" width="28" height="26" rx="2" fill={c} opacity="0.2" stroke={c} strokeWidth="1.5"/>
      <line x1="120" y1="136" x2="120" y2="162" stroke={c} strokeWidth="1" opacity="0.4"/>
      {/* Ground */}
      <rect x="22" y="160" width="236" height="6" rx="3" fill={c} opacity="0.1"/>
    </svg>
  );
}

/* ─── ILLUSTRATION MAP ──────────────────────────────── */

export const illustrationMap = {
  'fabric-sofa':      FabricSofaSVG,
  'leather-sofa':     LeatherSofaSVG,
  'recliner':         ReclinerSVG,
  'sofa-cum-bed':     SofaBedSVG,
  'wooden-sofa':      WoodenSofaSVG,
  'carpet':           CarpetSVG,
  'dining-set':       DiningTableSVG,
  'mattress':         MattressSVG,
  'other-furniture':  OtherFurnitureSVG,
  'bathroom-kitchen-combo': BathroomComboSVG,
  'bathroom':         BathroomSVG,
  'kitchen':          KitchenSVG,
  'mini-services':    MiniServicesSVG,
  'appliance-cleaning': ApplianceSVG,
  'apartment':        ApartmentSVG,
  'bungalow':         BungalowSVG,
  'by-room':          ByRoomSVG,
  'commercial':       CommercialBuildingSVG,
};

export function getIllustration(id) {
  return illustrationMap[id] || null;
}
