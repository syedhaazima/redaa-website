import { useState } from 'react';
import { useLang } from '../lib/i18n.jsx';
import { useUI } from '../lib/ui.jsx';
import { SECTORS } from '../data/content.js';
import { Banner } from '../components/Common.jsx';
import { Arrow } from '../components/Icons.jsx';
import SaudiMap from '../components/SaudiMap.jsx';

function CopyButton({ value }) {
  const { t } = useLang();
  const [done, setDone] = useState(false);
  const copy = async (e) => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
    } catch (err) {
      const v = e.currentTarget.previousElementSibling?.querySelector('.v');
      if (v) { const r = document.createRange(); r.selectNodeContents(v); const s = window.getSelection(); s.removeAllRanges(); s.addRange(r); }
    }
    setTimeout(() => setDone(false), 1600);
  };
  return <button className="cp" type="button" onClick={copy} data-hov>{done ? t('copied') : t('copy')}</button>;
}

const EMPTY = { name: '', company: '', email: '', phone: '', message: '', type: 't1' };

export default function Contact() {
  const { t, lang } = useLang();
  const { pendingSector } = useUI();
  const [form, setForm] = useState(EMPTY);
  const [sector, setSector] = useState(pendingSector === null ? '' : String(pendingSector));
  const [msg, setMsg] = useState(null);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const ok = form.name.trim() && /^\S+@\S+\.\S+$/.test(form.email.trim());
    setMsg(ok ? 'fOk' : 'fErr');
    if (ok) { setForm(EMPTY); setSector(''); }
    // To receive enquiries, send `form` + `sector` to your email service or backend here.
  };

  return (
    <>
      <Banner titleHtml={t('coH')} lead={t('coP')} crumbs={[[t('contact')]]} />
      <section className="sec" style={{ paddingTop: 20 }}>
        <div className="wrap cg">
          <div className="stack">
            <div className="cinf">
              <div className="ci"><span><small>{t('hq')}</small><span className="v">{t('addr')}</span></span><span /></div>
              <div className="ci"><span><small>{t('phL')}</small><span className="v" dir="ltr">+966 13 826 6626</span></span><CopyButton value="+966138266626" /></div>
              <div className="ci"><span><small>{t('emL')}</small><span className="v" dir="ltr">info@alredaa.net</span></span><CopyButton value="info@alredaa.net" /></div>
              <div className="ci"><span><small>{t('wbL')}</small><span className="v" dir="ltr">www.alredaa.net</span></span><span /></div>
            </div>
            <div className="mapc"><SaudiMap hqOnly city={0} label="Map showing the Dammam head office" /></div>
          </div>

          <form className="enq" noValidate onSubmit={submit}>
            <h3 style={{ fontSize: 'clamp(1.4rem,2.2vw,1.9rem)' }}>{t('fH')}</h3>
            <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="mut" style={{ fontSize: '.84rem', marginBottom: 12 }}>{t('fT')}</legend>
              <div className="types">
                {['t1', 't2', 't3', 't4'].map((k, i) => (
                  <label key={k}>
                    <input type="radio" name="ty" id={`ty${i}`} value={k} checked={form.type === k} onChange={set('type')} />
                    <span>{t(k)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="r2">
              <div className="fl"><input id="f1" placeholder=" " autoComplete="name" value={form.name} onChange={set('name')} /><label htmlFor="f1">{t('fN')}</label></div>
              <div className="fl"><input id="f2" placeholder=" " autoComplete="organization" value={form.company} onChange={set('company')} /><label htmlFor="f2">{t('fC')}</label></div>
            </div>
            <div className="r2">
              <div className="fl"><input id="f3" type="email" placeholder=" " dir="ltr" autoComplete="email" value={form.email} onChange={set('email')} /><label htmlFor="f3">{t('fE')}</label></div>
              <div className="fl"><input id="f4" type="tel" placeholder=" " dir="ltr" autoComplete="tel" value={form.phone} onChange={set('phone')} /><label htmlFor="f4">{t('fP')}</label></div>
            </div>
            <div className="fl s">
              <select id="f5" value={sector} onChange={(e) => setSector(e.target.value)}>
                <option value="">{t('pick')}</option>
                {SECTORS.map((s, i) => <option key={i} value={String(i)}>{s[lang].t}</option>)}
              </select>
              <label htmlFor="f5">{t('fS')}</label>
            </div>
            <div className="fl"><textarea id="f6" placeholder=" " value={form.message} onChange={set('message')} /><label htmlFor="f6">{t('fM')}</label></div>
            <button className="btn gold big mag" type="submit" style={{ justifySelf: 'start' }} data-hov><span>{t('fB')}</span><Arrow /></button>
            {msg && <p className="fmsg">{t(msg)}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
