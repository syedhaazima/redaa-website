import { useLang } from '../lib/i18n.jsx';
import { useUI } from '../lib/ui.jsx';
import { SECTORS, SLUG, SIMG, SREL } from '../data/content.js';
import { num, img, sector } from '../lib/format.js';
import { Eyebrow, Banner, ProjectRow } from '../components/Common.jsx';
import { Arrow } from '../components/Icons.jsx';

export default function SectorDetail({ index: i }) {
  const { t, lang } = useLang();
  const { setPendingSector } = useUI();
  const s = sector(i, lang);
  const rel = SREL[i];
  const pv = (i + 7) % 8, nx = (i + 1) % 8;
  return (
    <>
      <Banner title={s.t} lead={s.i} crumbs={[[t('sectors'), 'sectors'], [s.t]]} image={SIMG[i][0]} />
      <section className="sec">
        <div className="wrap sd">
          <div>
            <Eyebrow>{t('svcIn')}</Eyebrow>
            <div className="sv">{s.l.map((x) => <div key={x[0]} data-fade><b>{x[0]}</b><span>{x[1]}</span></div>)}</div>
            <div style={{ marginTop: 90 }}><Eyebrow>{t('gall')}</Eyebrow></div>
            <div className="gal">
              <div className="rev" data-rev><img src={img(SIMG[i][1])} alt="" /></div>
              <div className="rev" data-rev><img src={img(SIMG[i][2])} alt="" /></div>
            </div>
            <div style={{ margin: '90px 0 26px' }}><Eyebrow>{t('relP')}</Eyebrow></div>
            {rel.length
              ? <ul className="prj">{rel.map((p) => <ProjectRow key={p} i={p} />)}</ul>
              : <p className="mut">{t('noRel')}</p>}
            <div className="pager">
              <a href={`#sector-${SLUG[pv]}`} data-hov><small>{t('prev')}</small><b>{sector(pv, lang).t}</b></a>
              <a href={`#sector-${SLUG[nx]}`} data-hov><small>{t('next')}</small><b>{sector(nx, lang).t}</b></a>
            </div>
          </div>
          <aside className="side">
            <div className="box">
              <h4>{t('otherS')}</h4>
              <ul>
                {SECTORS.map((x, j) => (
                  <li key={j}><a href={`#sector-${SLUG[j]}`} className={j === i ? 'on' : undefined}><span>{x[lang].t}</span><span>{num(j + 1)}</span></a></li>
                ))}
              </ul>
            </div>
            <div className="gbox">
              <b>{t('talk')}</b>
              <p>{t('talkP')}</p>
              <a className="btn" href="#contact" onClick={() => setPendingSector(i)} data-hov><span>{t('rfp')}</span><Arrow /></a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
