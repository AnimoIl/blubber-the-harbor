import useLanguage from '../../hooks/useLanguage';
import { Moon, Sun } from 'lucide-react';

export default function OceanModeToggle({ mode, onToggle }) {
  const { t } = useLanguage();
  const night = mode === 'night';
  return (
    <button
      type="button"
      className="ocean-mode-toggle"
      aria-label={t('Chế độ đại dương ban đêm')}
      aria-pressed={night}
      title={t(night ? 'Chuyển sang đại dương ban ngày' : 'Chuyển sang đại dương ban đêm')}
      onClick={onToggle}
    >
      <span className="mode-toggle-track" aria-hidden="true">
        <span className="mode-toggle-thumb" />
        <Sun size={15} />
        <Moon size={14} />
      </span>
      <span className="mode-toggle-label" aria-hidden="true">
        {t(night ? 'Night' : 'Day')}
      </span>
    </button>
  );
}
