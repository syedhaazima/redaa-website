import { useState } from 'react';
import { useLang } from '../lib/i18n.jsx';
import { useUI } from '../lib/ui.jsx';
import { PROJ, CATS, CITIES } from '../data/content.js';
import { projName } from '../lib/format.js';
import { Eyebrow, Banner, CtaBlock, ProjectRow } from '../components/Common.jsx';
import { Search } from '../components/Icons.jsx';
import SaudiMap from '../components/SaudiMap.jsx';
import { ScrollTrigger } from '../lib/motion.js';

export default function Projects() {
  const { t, ar, pick } = useLang();
  const { openProject } = useUI();
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [view, setView] = useState('list');
  const [city, setCity] = useState(1);

  const counts = { all: PROJ.length };
  PROJ.forEach((p) => { counts[p[0]] = (counts[p[0]] || 0) + 1; });
  const q = query.trim().toLowerCase();
  const list = PROJ.map((p, i) => i).filter((i) =>
    (filter === 'all' || PROJ[i][0] === filter) && (!q || PROJ[i].slice(1).join(' ').toLowerCase().includes(q)));
  const chips = [['all', [t('all'), t('all')]], ...Object.entries(CATS)];
  const c = CITIES[city];
  const switchView = (v) => { setView(v); requestAnimationFrame(() => ScrollTrigger.refresh()); };

  return (
    <>
      <Banner titleHtml={t('prH')} lead={t('prP')} crumbs={[[t('projects')]]} />
      <section className="sec" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="tool">
            <div className="chips">
              {chips.map(([k, v]) => (
                <button key={k} className="chip" aria-pressed={filter === k} onClick={() => setFilter(k)} data-hov>
                  {ar ? v[1] : v[0]}<i>{counts[k]}</i>
                </button>
              ))}
            </div>
            <label className="srch">
              <Search />
              <input id="q" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('srch')} aria-label={t('srch')} />
            </label>
            <div className="views">
              <button aria-pressed={view === 'list'} onClick={() => switchView('list')}>{t('list')}</button>
              <button aria-pressed={view === 'map'} onClick={() => switchView('map')}>{t('map')}</button>
            </div>
          </div>

          <div hidden={view !== 'list'}>
            <ul className="prj">
              {list.length ? list.map((i) => <ProjectRow key={i} i={i} />) : <li className="empty">{t('none')}</li>}
            </ul>
          </div>

          <div className="mapw" hidden={view !== 'map'}>
            <div className="mapc"><SaudiMap city={city} onCity={setCity} label="Map of project locations" /></div>
            <div className="mside">
              <Eyebrow>{t('pLoc')}</Eyebrow>
              <h3 className="pl">{pick(c[0], c[1])}</h3>
              <ul>
                {c[5]
                  ? <li><button>{t('hq')}: {t('addr')}</button></li>
                  : c[4].map((i) => <li key={i}><button onClick={() => openProject(i)}>{projName(i, ar)}</button></li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
