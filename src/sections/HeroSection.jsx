import { Anchor, ArrowDown, ArrowUpRight, Heart, Sparkles } from 'lucide-react';
import WhaleShark from '../components/ocean/WhaleShark';
import OceanBackground from '../components/ocean/OceanBackground';
import OceanWaves from '../components/ocean/OceanWaves';
import FloatingBubbles from '../components/ocean/FloatingBubbles';
import Lighthouse from '../components/ocean/Lighthouse';
import { character } from '../data/character';
import useLanguage from '../hooks/useLanguage';

export default function HeroSection({ oceanMode }) {
  const { t } = useLanguage();
  return (
    <section id="the-dock" className="hero-section" aria-labelledby="hero-title">
      <OceanBackground />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="welcome-pill">
            <span className="live-dot" /> {t('Somewhere under the sea...')}
          </div>
          <h1 id="hero-title">
            Welcome to
            <br />
            <span>Blubber’s</span>
            <br />
            <span className="harbor-word">
              Harbor!
              <svg viewBox="0 0 300 14" aria-hidden="true">
                <path
                  d="M3 9q140-13 293-2M22 13q132-10 253-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="heading-sparkle" aria-hidden="true">
              ✧
            </span>
          </h1>
          <p className="hero-tagline">{character.tagline}</p>
          <p className="hero-description">{t(character.welcome)}</p>
          <div className="hero-actions">
            <a href="#captains-log" className="button primary">
              {t('Meet Blubber')} <ArrowUpRight size={18} />
            </a>
            <a href="#treasure-cove" className="button secondary">
              {t('Explore the Harbor')} <Anchor size={17} />
            </a>
          </div>
          <div className="hero-footnote">
            <Heart size={15} /> {t('Một bến cảng nhỏ, một đại dương yêu thương.')}
          </div>
        </div>
        <div className="hero-art">
          <div className="character-halo" />
          <div className="hello-sticker">
            {t('Oh, hello there!')} <span aria-hidden="true">♡</span>
          </div>
          <FloatingBubbles count={6} interactive />
          <WhaleShark />
          <div className="character-label">
            <Sparkles size={17} />
            <span>{t('A little chubby. A lot of love.')}</span>
          </div>
          <span className="tap-hint">
            {t('Psst... chạm vào mình nhé!')}{' '}
            <svg viewBox="0 0 45 35" aria-hidden="true">
              <path
                d="M2 29q39 7 35-24m-7 5 8-7 5 9"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
      </div>
      <Lighthouse oceanMode={oceanMode} />
      <a href="#captains-log" className="scroll-indicator">
        <span>{t('LET’S MAKE A LITTLE SPLASH')}</span>
        <ArrowDown size={17} />
      </a>
      <div className="hero-waterline" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <OceanWaves color="var(--cream)" />
    </section>
  );
}
