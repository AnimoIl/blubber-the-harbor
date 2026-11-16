import useLanguage from '../../hooks/useLanguage';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, ExternalLink, X } from 'lucide-react';
import ArtworkVisual from './ArtworkVisual';
import { safeExternalUrl } from '../../data/character';

export default function GalleryLightbox({ artworks, selectedId, onChange, onClose }) {
  const { t } = useLanguage();
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const index = artworks.findIndex((artwork) => artwork.id === selectedId);
  const artwork = artworks[index];
  useEffect(() => {
    const previous = document.activeElement;
    const scroll = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const handleKey = (event) => {
      if (event.key === 'Escape') closeRef.current();
      if (event.key === 'Tab') {
        const focusable = [...dialog.current.querySelectorAll('button, a[href]')];
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = scroll;
      document.removeEventListener('keydown', handleKey);
      previous?.focus();
    };
  }, []);
  useEffect(() => {
    const handleArrow = (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        onChange(
          artworks[
            (index + (event.key === 'ArrowRight' ? 1 : -1) + artworks.length) % artworks.length
          ].id,
        );
      }
    };
    document.addEventListener('keydown', handleArrow);
    return () => document.removeEventListener('keydown', handleArrow);
  }, [artworks, index, onChange]);
  if (!artwork) return null;
  const artistUrl = safeExternalUrl(artwork.artistUrl);
  return createPortal(
    <div
      className="lightbox-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        aria-describedby="lightbox-description"
        className="lightbox"
      >
        <button
          ref={closeButton}
          type="button"
          className="lightbox-close icon-button"
          onClick={onClose}
          aria-label={t('Đóng ảnh')}
        >
          <X />
        </button>
        <ArtworkVisual key={artwork.id} artwork={artwork} full />
        <div className="lightbox-info" aria-live="polite">
          <span className="card-eyebrow">
            {t(artwork.category)} · {index + 1} / {artworks.length}
          </span>
          <h3 id="lightbox-title">{t(artwork.title)}</h3>
          <p id="lightbox-description">{t(artwork.description)}</p>
          {artwork.artistName && (
            <p className="artist-credit">
              {t('Artwork by')}{' '}
              {artistUrl ? (
                <a href={artistUrl} target="_blank" rel="noopener noreferrer">
                  {artwork.artistName} <ExternalLink size={13} />
                </a>
              ) : (
                artwork.artistName
              )}
            </p>
          )}
        </div>
        <div className="lightbox-controls">
          <button
            type="button"
            className="button secondary"
            aria-label={t('Ảnh trước')}
            onClick={() => onChange(artworks[(index - 1 + artworks.length) % artworks.length].id)}
          >
            <ArrowLeft size={18} /> {t('Trước')}
          </button>
          <span>{t('← → để khám phá')}</span>
          <button
            type="button"
            className="button secondary"
            aria-label={t('Ảnh tiếp theo')}
            onClick={() => onChange(artworks[(index + 1) % artworks.length].id)}
          >
            {t('Tiếp')} <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
