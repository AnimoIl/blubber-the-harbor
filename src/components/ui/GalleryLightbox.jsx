import useLanguage from '../../hooks/useLanguage';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Maximize2,
  Minimize2,
  Scan,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import ArtworkVisual from './ArtworkVisual';
import { safeExternalUrl } from '../../data/character';
import { resolveImageSource } from '../../utils/images';
import { getArtworkText } from '../../utils/gallery';

export default function GalleryLightbox({ artworks, selectedId, onChange, onClose }) {
  const { t, language } = useLanguage();
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const viewport = useRef(null);
  const closeRef = useRef(onClose);
  const [expanded, setExpanded] = useState(false);
  const [zoomState, setZoomState] = useState({ id: selectedId, value: 1 });
  closeRef.current = onClose;
  const index = artworks.findIndex((artwork) => artwork.id === selectedId);
  const artwork = artworks[index];
  const hasArtwork = Boolean(artwork);
  const zoom = zoomState.id === selectedId ? zoomState.value : 1;

  function setZoom(value) {
    setZoomState({ id: selectedId, value: Math.min(4, Math.max(1, value)) });
  }
  function navigate(direction) {
    onChange(artworks[(index + direction + artworks.length) % artworks.length].id);
  }

  useEffect(() => {
    if (!hasArtwork) {
      closeRef.current();
      return;
    }
    const previous = document.activeElement;
    const scroll = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const handleKey = (event) => {
      if (event.key === 'Escape') closeRef.current();
      if (event.key === 'Tab') {
        const focusable = [
          ...dialog.current.querySelectorAll('button:not(:disabled), a[href], [tabindex="0"]'),
        ].filter((element) => element.getClientRects().length > 0);
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = scroll;
      document.removeEventListener('keydown', handleKey);
      if (previous?.isConnected) previous.focus();
    };
  }, [hasArtwork]);

  useEffect(() => {
    const handleArrow = (event) => {
      if (index < 0 || (event.target === viewport.current && zoom > 1)) return;
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
  }, [artworks, index, onChange, zoom]);

  useEffect(() => {
    const frame = viewport.current;
    if (frame) {
      frame.scrollLeft = (frame.scrollWidth - frame.clientWidth) / 2;
      frame.scrollTop = (frame.scrollHeight - frame.clientHeight) / 2;
    }
  }, [zoom, selectedId, expanded]);

  if (!artwork) return null;
  const title = getArtworkText(artwork, 'title', language, t);
  const description = getArtworkText(artwork, 'description', language, t);
  const artistUrl = safeExternalUrl(artwork.artistUrl);
  const original = resolveImageSource(artwork.image);

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
        aria-describedby={description ? 'lightbox-description' : undefined}
        className={`lightbox ${expanded ? 'is-expanded' : ''}`}
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
        <div className="lightbox-toolbar">
          <div
            className="lightbox-zoom-controls"
            role="group"
            aria-label={t('Điều chỉnh kích thước ảnh')}
          >
            <button
              type="button"
              className="lightbox-tool"
              onClick={() => setZoom(zoom - 0.5)}
              disabled={zoom <= 1}
              aria-label={t('Thu nhỏ ảnh')}
              title={t('Thu nhỏ ảnh')}
            >
              <ZoomOut size={19} />
            </button>
            <output
              className="lightbox-zoom-level"
              aria-live="polite"
              aria-label={t('Mức phóng to')}
            >
              {Math.round(zoom * 100)}%
            </output>
            <button
              type="button"
              className="lightbox-tool"
              onClick={() => setZoom(zoom + 0.5)}
              disabled={zoom >= 4}
              aria-label={t('Phóng to ảnh')}
              title={t('Phóng to ảnh')}
            >
              <ZoomIn size={19} />
            </button>
            <button
              type="button"
              className="lightbox-tool"
              onClick={() => setZoom(1)}
              disabled={zoom === 1}
              aria-label={t('Vừa khung ảnh')}
              title={t('Vừa khung ảnh')}
            >
              <Scan size={19} />
            </button>
          </div>
          <div className="lightbox-view-controls">
            {original && (
              <a
                className="lightbox-tool"
                href={original}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('Mở ảnh gốc trong tab mới')}
                title={t('Mở ảnh gốc trong tab mới')}
              >
                <ExternalLink size={18} />
              </a>
            )}
            <button
              type="button"
              className="lightbox-tool"
              aria-label={t('Mở rộng khung xem ảnh')}
              aria-pressed={expanded}
              title={t(expanded ? 'Thu gọn khung xem ảnh' : 'Mở rộng khung xem ảnh')}
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded ? <Minimize2 size={19} /> : <Maximize2 size={19} />}
            </button>
          </div>
        </div>
        <div className="lightbox-body">
          <div
            ref={viewport}
            className={`lightbox-viewport ${zoom > 1 ? 'is-zoomed' : ''}`}
            role="region"
            tabIndex={0}
            aria-label={t('Ảnh artwork, cuộn để xem khi phóng to')}
          >
            <div
              className="lightbox-canvas"
              style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }}
            >
              <ArtworkVisual key={artwork.id} artwork={artwork} full />
            </div>
          </div>
          <div className="lightbox-info" aria-live="polite">
            <span className="card-eyebrow">
              {t(artwork.category)} · {index + 1} / {artworks.length}
            </span>
            <h3 id="lightbox-title">{title}</h3>
            {description && <p id="lightbox-description">{description}</p>}
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
            <p className="lightbox-pan-hint">
              {t('Phóng to để xem chi tiết. Cuộn hoặc vuốt để di chuyển trong ảnh.')}
            </p>
          </div>
        </div>
        <div className="lightbox-controls">
          <button
            type="button"
            className="button secondary"
            aria-label={t('Ảnh trước')}
            disabled={artworks.length <= 1}
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} /> {t('Trước')}
          </button>
          <span>{t('← → để khám phá')}</span>
          <button
            type="button"
            className="button secondary"
            aria-label={t('Ảnh tiếp theo')}
            disabled={artworks.length <= 1}
            onClick={() => navigate(1)}
          >
            {t('Tiếp')} <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
