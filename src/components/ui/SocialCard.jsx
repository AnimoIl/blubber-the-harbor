import useLanguage from '../../hooks/useLanguage';
import { useState } from 'react';
import { ArrowUpRight, Camera, Check, Copy, Globe2, MessageCircle } from 'lucide-react';
import { safeExternalUrl } from '../../data/character';

function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" width="23" height="23" fill="currentColor" aria-hidden="true">
      <path d="M14.3 21v-8h2.8l.5-3.2h-3.3V7.7c0-.9.4-1.7 1.8-1.7H18V3.2c-.5-.1-1.7-.2-2.8-.2-2.9 0-4.8 1.7-4.8 4.9v1.9H7.5V13h2.9v8Z" />
    </svg>
  );
}
const icons = { facebook: FacebookMark, instagram: Camera, discord: MessageCircle, other: Globe2 };

export default function SocialCard({ social }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const Icon = icons[social.id] || Globe2;
  const url = safeExternalUrl(social.url);
  const content = (
    <>
      <span className={`social-icon ${social.id}`}>
        <Icon size={23} />
      </span>
      <span className="social-text">
        <strong>{t(social.name)}</strong>
        <span>{t(social.label)}</span>
      </span>
    </>
  );
  if (url)
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="social-card">
        {content}
        <ArrowUpRight size={18} />
        <span className="sr-only">{t(' (mở trong tab mới)')}</span>
      </a>
    );
  if (social.id === 'discord' && social.username)
    return (
      <div>
        <button
          className="social-card"
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(social.username);
              setCopied(true);
              setError(false);
            } catch {
              setError(true);
            }
          }}
        >
          {content}
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
        <p role="status" className="copy-status">
          {error
            ? t('Bạn có thể sao chép thủ công: {username}', { username: social.username })
            : copied
              ? t('Đã sao chép {username}', { username: social.username })
              : social.username}
        </p>
      </div>
    );
  return (
    <div className="social-card unconfigured">
      {content}
      <span className="soon-badge">{t('Sắp có')}</span>
    </div>
  );
}
