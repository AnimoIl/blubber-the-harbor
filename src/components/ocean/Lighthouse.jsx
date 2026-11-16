import useLanguage from '../../hooks/useLanguage';
import { useState } from 'react';

export default function Lighthouse({ oceanMode = 'day' }) {
  const { t } = useLanguage();
  const [light, setLight] = useState(null);
  const lit = light?.mode === oceanMode ? light.lit : oceanMode === 'night';
  return (
    <div className={`lighthouse ${lit ? 'is-lit' : ''}`}>
      <button
        type="button"
        onClick={() => setLight({ mode: oceanMode, lit: !lit })}
        aria-pressed={lit}
        aria-label={t('Bật hoặc tắt đèn hải đăng')}
      >
        <svg viewBox="0 0 200 240" role="img" aria-label={t('Ngọn hải đăng nhỏ trên đảo')}>
          <ellipse cx="100" cy="220" rx="94" ry="13" fill="#84cfcd" />
          <path d="M14 215q20-24 50-18 37-30 71-2 32-3 50 20" fill="#b0d6bd" />
          <path className="light-beam" d="M99 57 0 12v87Z" fill="#fff6b7" opacity=".5" />
          <path d="m72 202 8-127h39l11 127Z" fill="#fffff2" stroke="#6798a0" strokeWidth="2" />
          <path d="m78 109 43 14 3 30-48-16Zm-4 57 53 17 2 19H72Z" fill="#dc8f8a" />
          <path d="M77 76h46V47H77Z" fill="#9acbd2" stroke="#608f9b" strokeWidth="2" />
          <path d="m70 47 30-24 30 24Z" fill="#dc8f8a" stroke="#b87778" strokeWidth="2" />
          <path d="M100 23V13M70 79h60M91 50v24m18-24v24" stroke="#608f9b" strokeWidth="3" />
          <path d="M91 202v-20q9-14 18 0v20" fill="#6896a1" />
          <path d="M32 211q-12-25-3-30 15 1 12 30m117-4q0-24 9-22 13 7-1 25" fill="#79b7a3" />
        </svg>
      </button>
      <span className="lighthouse-message" role="status">
        {lit && light?.mode === oceanMode ? t('A little light to guide you home.') : ''}
      </span>
    </div>
  );
}
