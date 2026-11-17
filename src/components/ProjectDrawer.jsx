import { useEffect, useRef } from 'react';
import { useLang } from '../lib/i18n.jsx';
import { PROJ, PIMG, PSEC, SLUG } from '../data/content.js';
import { img, num, projName, projCat, projLoc, sector } from '../lib/format.js';
import { gsap } from '../lib/motion.js';
import { Arrow, Close } from './Icons.jsx';
import { Eyebrow } from './Common.jsx';

/* Slide-in panel with a project's details */
export default function ProjectDrawer({ index, onClose, onGo }) {
  const { t, ar, lang } = useLang();
  const open = index !== null;
  const bodyRef = useRef(null), closeRef = useRef(null);
  const last = useRef(null);
  if (open) last.current = index; // keep content visible while the panel slides out
  const i = last.current ?? 0;
  const sec = PSEC[i];

  useEffect(() => {
    if (!open) return;
    if (bodyRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      gsap.fromTo(bodyRef.current.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.05, delay: 0.2 });
    const tm = setTimeout(() => closeRef.current && closeRef.current.focus(), 80);
    return () => clearTimeout(tm);
  }, [open, index]);

  return (
    <>
      <div className={`scrim${open ? ' on' : ''}`} onClick={onClose} />
      <aside className={`pd${open ? ' on' : ''}`} aria-hidden={!open} aria-label="Project details" data-lenis-prevent>
        {last.current !== null && (
          <>
            <div className="im">
              <img src={img(PIMG[i])} alt="" />
              <button className="x" ref={closeRef} aria-label={t('close')} onClick={onClose} data-hov><Close /></button>
            </div>
            <div className="bd" ref={bodyRef}>
              <Eyebrow>{`${t('pRef')} ${num(i + 1)} / ${PROJ.length}`}</Eyebrow>
              <h3>{projName(i, ar)}</h3>
              <div className="facts">
                <div><small>{t('pSec')}</small><b>{projCat(i, ar)}</b></div>
                <div><small>{t('pLoc')}</small><b>{projLoc(i, ar)}</b></div>
                <div style={{ gridColumn: '1/-1' }}><small>{t('pSector')}</small><b>{sector(sec, lang).t}</b></div>
              </div>
              <p className="mut">{sector(sec, lang).i}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <a className="btn gold" href={`#sector-${SLUG[sec]}`} data-hov><span>{t('viewSec')}</span><Arrow /></a>
                <a className="btn out" href="#contact" data-hov><span>{t('rfp')}</span></a>
              </div>
              <div className="nv">
                <button className="btn out" onClick={() => onGo(-1)} data-hov><span>{t('prev')}</span></button>
                <button className="btn out" onClick={() => onGo(1)} data-hov><span>{t('next')}</span></button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
