import { useState } from 'react';
import { useLang } from '../lib/i18n.jsx';
import { NAV, NAVIMG } from '../data/content.js';
import { img, num } from '../lib/format.js';

/* Full-screen menu with large links and a photo preview per page */
export default function MenuOverlay({ active }) {
  const { t } = useLang();
  const [hover, setHover] = useState('home');
  return (
    <div className="ovl" id="ovl" data-lenis-prevent>
      <div className="wrap">
        <ol>
          {NAV.map((k, i) => (
            <li key={k}>
              <a href={`#${k}`} className={active === k ? 'on' : undefined}
                style={{ transitionDelay: `${0.05 * i + 0.25}s` }}
                onPointerOver={() => setHover(k)}>
                <small>{num(i + 1)}</small>{t(k)}
              </a>
            </li>
          ))}
        </ol>
        <div className="aside">
          <div className="pv">
            {NAV.map((k) => <img key={k} src={img(NAVIMG[k])} alt="" loading="lazy" className={hover === k ? 'on' : undefined} />)}
          </div>
          <div className="ct">
            <b>{t('addr')}</b>
            <span dir="ltr" style={{ textAlign: 'start' }}>+966 13 826 6626</span>
            <span dir="ltr" style={{ textAlign: 'start' }}>info@alredaa.net</span>
          </div>
        </div>
      </div>
    </div>
  );
}
