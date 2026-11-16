import useLanguage from '../../hooks/useLanguage';
import { ArrowUp, Heart, Waves } from 'lucide-react';
import OceanWaves from '../ocean/OceanWaves';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <OceanWaves color="var(--footer-water)" />
      <div className="container">
        <div className="footer-main">
          <a className="brand" href="#the-dock">
            <span className="brand-icon">
              <Waves size={27} />
            </span>
            <span>
              blubber<span className="brand-subtitle">THE HARBOR</span>
            </span>
          </a>
          <div className="footer-message">
            <strong>{t('Thanks for swimming by!')}</strong>
            <span>{t('See you somewhere in the ocean! 🐳')}</span>
          </div>
          <a href="#the-dock" className="back-top" aria-label={t('Về đầu trang')}>
            <ArrowUp size={20} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Blubber The Harbor</span>
          <span>
            {t('Made with')} <Heart size={12} /> {t('love, stars & ocean bubbles.')}
          </span>
          <span className="footer-tail" aria-hidden="true">
            <svg width="60" height="25" viewBox="0 0 60 25">
              <path
                d="M25 21q5-9-4-12-9-3-10-8 17-2 19 9Q35-1 49 1q-1 6-10 8-9 3-4 12"
                fill="#9ebbb0"
              />
              <path
                d="M3 23q12-3 24 0m7 0q12-3 23 0"
                fill="none"
                stroke="#9ebbb0"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </footer>
  );
}
