import { useMemo } from 'react';
import { useLang } from '../lib/i18n.jsx';
import { CITIES, KSA } from '../data/content.js';

export const px = (lo) => (lo - 34) * 20;
export const py = (la) => (32.5 - la) * 20;
export function inPoly(x, y, P) {
  let c = false;
  for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
    const [xi, yi] = P[i], [xj, yj] = P[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

let DOTS = null;
function mapDots() {
  if (DOTS) return DOTS;
  const P = KSA.map(([a, b]) => [px(a), py(b)]);
  DOTS = [];
  for (let y = 4; y < 330; y += 7)
    for (let x = 4; x < 450; x += 7) {
      const o = (Math.floor(y / 7) % 2) * 3.5;
      if (inPoly(x + o, y, P)) DOTS.push([x + o, y]);
    }
  return DOTS;
}

/* Dotted Saudi Arabia map with project pins. hqOnly shows just the Dammam head office. */
export default function SaudiMap({ hqOnly = false, city, onCity, label }) {
  const { pick, t } = useLang();
  const dots = useMemo(mapDots, []);
  const select = (i) => onCity && onCity(i);
  return (
    <svg viewBox="0 0 450 330" role="img" aria-label={label}>
      {dots.map(([x, y], k) => <circle key={k} className="dt" cx={x} cy={y} r="1.6" />)}
      {CITIES.map((c, i) => {
        if (hqOnly && !c[5]) return null;
        const x = px(c[2]), y = py(c[3]), tx = c[6] > 0 ? x + 9 : x - 9;
        const interactive = !hqOnly;
        return (
          <g key={i}
            className={`pin${c[5] ? ' hq' : ''}${i === city ? ' on' : ''}`}
            {...(interactive ? {
              tabIndex: 0, role: 'button',
              onClick: () => select(i),
              onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i); } },
            } : {})}
            aria-label={pick(c[0], c[1])}>
            <circle className="r" cx={x} cy={y} r="4" />
            <circle className="c" cx={x} cy={y} r="4.5" />
            <text x={tx} y={y + 3} textAnchor={c[6] > 0 ? 'start' : 'end'}>
              {pick(c[0], c[1])}{hqOnly ? ` · ${t('hq')}` : ''}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
