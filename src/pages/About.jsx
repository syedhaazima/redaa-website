import { useLang } from '../lib/i18n.jsx';
import { VALS, FOCUS, GP, CERTS } from '../data/content.js';
import { num, img } from '../lib/format.js';
import { Eyebrow, Heading, Banner, CtaBlock, Kpis } from '../components/Common.jsx';

export default function About() {
  const { t, pick } = useLang();
  const grid = (rows) => rows.map((v, i) => (
    <div key={v[0]} data-fade><span className="n">{num(i + 1)}</span><b>{pick(v[0], v[2])}</b><span>{pick(v[1], v[3])}</span></div>
  ));
  return (
    <>
      <Banner titleHtml={t('abH')} lead={t('abP')} crumbs={[[t('about')]]} image="about" />

      <section className="sec">
        <div className="wrap two">
          <div className="stack"><Eyebrow>{t('storyE')}</Eyebrow><Heading html={t('storyH')} /></div>
          <div className="stack"><p className="lead" data-fade>{t('storyP1')}</p><p className="mut" data-fade>{t('storyP2')}</p></div>
        </div>
        <div className="wrap">
          <Kpis items={[['2012', t('k1'), 2012], ['900', t('k2'), 900, '+'], ['2', t('k3')], ['3', t('k4'), 3]]} />
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--bg2)' }}>
        <div className="wrap two">
          <div className="rev ph" data-rev><img src={img('hero')} alt="" /></div>
          <div className="stack">
            <Eyebrow>{t('ceoE')}</Eyebrow>
            <p className="quote" data-fade>{t('ceoQ')}</p>
            <div className="sig" data-fade><i>MD</i><span><b>{t('ceoN')}</b><small>{t('ceoR')}</small></span></div>
            <div className="cols" style={{ marginTop: 30 }} data-fade>
              <p>{t('ceo1')}</p><p>{t('ceo2')}</p><p>{t('ceo3')}</p><p>{t('ceo4')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sh"><Eyebrow>{t('vmE')}</Eyebrow><Heading html={t('vmH')} /></div>
          <div className="vm">
            <article data-fade><h3>{t('vK')}</h3><p className="lead">{t('vP')}</p></article>
            <article data-fade><h3 style={{ color: 'var(--gold)' }}>{t('mK')}</h3><p className="lead">{t('mP')}</p></article>
          </div>
          <div className="g4" style={{ marginTop: 80 }}>{grid(VALS)}</div>
          <div style={{ margin: '70px 0 26px' }}><Eyebrow>{t('foE')}</Eyebrow></div>
          <div className="g4">{grid(FOCUS)}</div>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--bg2)' }}>
        <div className="wrap two">
          <div className="stack">
            <Eyebrow>{t('grE')}</Eyebrow><Heading html={t('grH')} />
            <p className="lead" data-fade>{t('grP')}</p>
            <div className="stack" style={{ gap: 18, marginTop: 10 }}>
              {GP.map((g) => (
                <div key={g[0]} data-fade style={{ borderInlineStart: '1px solid var(--gold)', paddingInlineStart: 18 }}>
                  <b>{pick(g[0], g[2])}</b><p className="mut">{pick(g[1], g[3])}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="chart" id="chart" role="img" aria-label="Growth 24% in 2023-24, 38% in 2024-25, 48% projected for 2025-26">
              {[[24, ''], [38, ''], [48, ' p']].map(([v, c]) => (
                <div key={v} className={`b${c}`} style={{ '--v': v }}><div className="f"><span>{v}%</span></div></div>
              ))}
            </div>
            <div className="chx">
              <div><b dir="ltr">2023–24</b>{t('g1')}</div>
              <div><b dir="ltr">2024–25</b>{t('g2')}</div>
              <div><b dir="ltr">2025–26</b>{t('g3')}</div>
            </div>
            <p className="mut" style={{ fontSize: '.82rem', marginTop: 16 }}>{t('gN')}</p>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sh"><Eyebrow>{t('ceE')}</Eyebrow><Heading html={t('ceH')} /></div>
          <div className="certs">
            {CERTS.map((c) => (
              <div className="cert" key={c[0]} data-fade>
                <span className="seal">
                  <svg viewBox="0 0 92 92" aria-hidden="true">
                    <defs><path id={`cp${c[0]}`} d="M46 46m-36 0a36 36 0 1 1 72 0a36 36 0 1 1-72 0" /></defs>
                    <circle cx="46" cy="46" r="44" fill="none" stroke="var(--gold)" strokeWidth="1" />
                    <text><textPath href={`#cp${c[0]}`}>CERTIFIED · MANAGEMENT SYSTEM · CERTIFIED ·</textPath></text>
                  </svg>
                  ISO<br />{c[0]}
                </span>
                <div><b dir="ltr">{c[1]}</b><span className="mut">{pick(c[2], c[3])}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
