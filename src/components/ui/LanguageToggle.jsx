import { Languages } from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return (
    <button
      type="button"
      className="language-toggle"
      aria-label="Đổi ngôn ngữ / Switch language"
      title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
      onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
    >
      <Languages size={16} aria-hidden="true" />
      <span aria-hidden="true">{language.toUpperCase()}</span>
    </button>
  );
}
