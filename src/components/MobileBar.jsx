import { useLang } from '../lib/i18n.jsx';
import { Phone, Mail } from './Icons.jsx';

/* Phone-only bottom action bar: call, email, request a proposal */
export default function MobileBar() {
  const { t, pick } = useLang();
  return (
    <nav className="mbar" aria-label="Quick actions">
      <a href="tel:+966138266626"><Phone /><span>{pick('Call', 'اتصال')}</span></a>
      <a href="mailto:info@alredaa.net"><Mail /><span>{pick('Email', 'بريد')}</span></a>
      <a className="g" href="#contact"><span>{t('rfp')}</span></a>
    </nav>
  );
}
