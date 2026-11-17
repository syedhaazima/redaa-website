import { useLang } from '../lib/i18n.jsx';
import { PARTNERS, CLIENTS } from '../data/content.js';
import { Eyebrow, Heading, Banner, CtaBlock } from '../components/Common.jsx';

export default function Partners() {
  const { t, pick } = useLang();
  return (
    <>
      <Banner titleHtml={t('paH')} lead={t('paP')} crumbs={[[t('partners')]]} image="refinery" />
      <section className="sec">
        <div className="wrap">
          <div className="sh"><Eyebrow>{t('ptE')}</Eyebrow><Heading html={t('ptH')} /></div>
          <div className="ptn">
            {PARTNERS.map((p) => (
              <article className="ptc" key={p[0]} data-fade>
                <span className="mk">{p[0]}</span>
                <b>{pick(p[1], p[4])}</b>
                <span className="t">{pick(p[2], p[5])}</span>
                <p>{pick(p[3], p[6])}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="sec" style={{ background: 'var(--bg2)' }}>
        <div className="wrap">
          <div className="sh"><Eyebrow>{t('clE')}</Eyebrow><Heading html={t('clH')} /></div>
          <div className="cw">{CLIENTS.map((c) => <div key={c[0]} data-fade><b>{pick(c[0], c[1])}</b><span>{pick(c[1], c[0])}</span></div>)}</div>
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
