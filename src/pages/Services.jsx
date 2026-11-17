import { useLang } from '../lib/i18n.jsx';
import { CAPS, CAPIMG, STEPS } from '../data/content.js';
import { num, img, capName, capDesc, capList } from '../lib/format.js';
import { Eyebrow, Heading, Banner, CtaBlock, Marquee } from '../components/Common.jsx';

export default function Services() {
  const { t, ar, pick } = useLang();
  return (
    <>
      <Banner titleHtml={t('svH')} lead={t('svP')} crumbs={[[t('services')]]} image="piperack" />
      <section className="sec">
        <div className="wrap">
          <div className="svl">
            {CAPS.map((c, i) => (
              <div className="svr" key={i} data-fade>
                <span className="n">{num(i + 1)}</span>
                <div><h3>{capName(i, ar)}</h3><p>{capDesc(i, ar)}</p></div>
                <ul>{capList(i, ar).map((x) => <li key={x}>{x}</li>)}</ul>
                <div className="im"><img src={img(CAPIMG[i])} alt="" loading="lazy" /></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="sec" style={{ background: 'var(--bg2)' }}>
        <div className="wrap">
          <div className="sh"><Eyebrow>{t('lcE')}</Eyebrow><Heading html={t('lcH')} /></div>
          <div className="life" id="life">
            <span className="rail" />
            {STEPS.map((s, i) => (
              <div key={s[0]} data-fade><span className="k">{num(i + 1)}</span><b>{pick(s[0], s[2])}</b><span>{pick(s[1], s[3])}</span></div>
            ))}
          </div>
        </div>
      </section>
      <Marquee />
      <CtaBlock />
    </>
  );
}
