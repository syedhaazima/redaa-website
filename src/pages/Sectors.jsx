import { useLang } from '../lib/i18n.jsx';
import { SECTORS } from '../data/content.js';
import { Banner, CtaBlock, SectorCard } from '../components/Common.jsx';

export default function Sectors() {
  const { t } = useLang();
  return (
    <>
      <Banner titleHtml={t('seH')} lead={t('seP')} crumbs={[[t('sectors')]]} />
      <section className="sec" style={{ paddingTop: 20 }}>
        <div className="wrap"><div className="sgrid">{SECTORS.map((s, i) => <SectorCard key={i} i={i} />)}</div></div>
      </section>
      <CtaBlock />
    </>
  );
}
