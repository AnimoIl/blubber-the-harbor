import useLanguage from '../../hooks/useLanguage';
import { useState } from 'react';

export default function FloatingBubbles({ count = 6, interactive = false }) {
  const { t } = useLanguage();
  const [popped, setPopped] = useState([]);
  return (
    <div className="floating-bubbles" aria-hidden={!interactive}>
      {Array.from({ length: count }, (_, i) => {
        const props = {
          className: `bubble bubble-${i} ${popped.includes(i) ? 'popped' : ''}`,
          style: {
            left: `${10 + i * 15}%`,
            top: `${15 + ((i * 23) % 65)}%`,
            width: `${14 + (i % 3) * 12}px`,
            height: `${14 + (i % 3) * 12}px`,
            animationDelay: `${i * -0.9}s`,
          },
        };
        return interactive ? (
          <button
            key={i}
            {...props}
            type="button"
            aria-label={t('Làm vỡ bong bóng {number}', { number: i + 1 })}
            tabIndex={popped.includes(i) ? -1 : 0}
            disabled={popped.includes(i)}
            onClick={() => setPopped([...popped, i])}
          />
        ) : (
          <span key={i} {...props} />
        );
      })}
    </div>
  );
}
