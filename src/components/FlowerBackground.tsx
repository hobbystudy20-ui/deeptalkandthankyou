import { useEffect, useState } from 'react';

const FLOWER_SVGS: Record<string, string> = {
  sakura: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="%23FFB7C5" opacity="0.5"><circle cx="50" cy="50" r="14"/><circle cx="35" cy="38" r="12"/><circle cx="65" cy="38" r="12"/><circle cx="40" cy="65" r="12"/><circle cx="60" cy="65" r="12"/></g><circle cx="50" cy="50" r="5" fill="%23FF8FA3"/></svg>`,
  daisy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="%23FFF59D" opacity="0.5"><ellipse cx="50" cy="25" rx="8" ry="16"/><ellipse cx="50" cy="75" rx="8" ry="16"/><ellipse cx="25" cy="50" rx="16" ry="8"/><ellipse cx="75" cy="50" rx="16" ry="8"/><ellipse cx="32" cy="32" rx="14" ry="8" transform="rotate(-45 32 32)"/><ellipse cx="68" cy="32" rx="14" ry="8" transform="rotate(45 68 32)"/><ellipse cx="32" cy="68" rx="14" ry="8" transform="rotate(45 32 68)"/><ellipse cx="68" cy="68" rx="14" ry="8" transform="rotate(-45 68 68)"/></g><circle cx="50" cy="50" r="10" fill="%23FBC02D"/></svg>`,
  rose: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="%23E91E63" opacity="0.45"><circle cx="50" cy="50" r="20"/><circle cx="50" cy="50" r="14" fill="%23F8BBD0"/><circle cx="50" cy="50" r="8" fill="%23F48FB1"/></g><path d="M50 70 Q50 90 50 100" stroke="%23668F3A" stroke-width="3" fill="none" opacity="0.4"/></svg>`,
  peony: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="%23F48FB1" opacity="0.45"><circle cx="50" cy="50" r="25"/><circle cx="50" cy="50" r="18" fill="%23F8BBD0"/><circle cx="50" cy="50" r="12" fill="%23FCE4EC"/><circle cx="50" cy="50" r="6" fill="%23F48FB1"/></g></svg>`,
  tulip: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="%23FF8FA3" opacity="0.5"><path d="M50 20 Q30 30 35 55 Q50 50 65 55 Q70 30 50 20Z"/></g><path d="M50 55 Q50 80 50 100" stroke="%23668F3A" stroke-width="3" fill="none" opacity="0.4"/></svg>`,
  baby: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="%23F5F5F5" opacity="0.6"><circle cx="30" cy="30" r="3"/><circle cx="35" cy="28" r="3"/><circle cx="25" cy="28" r="3"/><circle cx="30" cy="35" r="3"/><circle cx="35" cy="35" r="3"/><circle cx="25" cy="35" r="3"/><circle cx="32" cy="32" r="2" fill="%23B2DFDB"/></g><g fill="%23F5F5F5" opacity="0.6"><circle cx="70" cy="70" r="3"/><circle cx="75" cy="68" r="3"/><circle cx="65" cy="68" r="3"/><circle cx="70" cy="75" r="3"/><circle cx="75" cy="75" r="3"/><circle cx="65" cy="75" r="3"/><circle cx="72" cy="72" r="2" fill="%23B2DFDB"/></g></svg>`,
  wild: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g opacity="0.45"><circle cx="30" cy="30" r="6" fill="%23FFB74D"/><circle cx="30" cy="30" r="3" fill="%23FF8A65"/><circle cx="70" cy="60" r="6" fill="%23BA68C8"/><circle cx="70" cy="60" r="3" fill="%239575CD"/><circle cx="50" cy="80" r="5" fill="%234DB6AC"/><circle cx="50" cy="80" r="2" fill="%2380CBC4"/></g></svg>`,
};

const FLOWER_TYPES = Object.keys(FLOWER_SVGS);

interface Flower {
  id: number;
  type: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  floatDelay: number;
}

function generateFlowers(count: number): Flower[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    type: FLOWER_TYPES[Math.floor(Math.random() * FLOWER_TYPES.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 40 + Math.random() * 70,
    rotation: Math.random() * 360,
    opacity: 0.35 + Math.random() * 0.35,
    floatDelay: Math.random() * 6,
  }));
}

export function FlowerBackground({ count = 14 }: { count?: number }) {
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    setFlowers(generateFlowers(count));
  }, [count]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-cream" />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at top, rgba(167,139,250,0.12), transparent 60%), radial-gradient(ellipse at bottom, rgba(108,99,255,0.08), transparent 60%)',
      }} />
      {flowers.map((f) => (
        <div
          key={f.id}
          className="absolute animate-float"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            opacity: f.opacity,
            transform: `rotate(${f.rotation}deg)`,
            animationDelay: `${f.floatDelay}s`,
            filter: 'blur(1.5px)',
          }}
          dangerouslySetInnerHTML={{ __html: FLOWER_SVGS[f.type] }}
        />
      ))}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-white/20" />
    </div>
  );
}
