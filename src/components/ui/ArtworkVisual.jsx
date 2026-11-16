import useLanguage from '../../hooks/useLanguage';
import { useState } from 'react';
import { resolveImageSource } from '../../utils/images';
import { WhaleIllustration } from '../ocean/WhaleShark';

export default function ArtworkVisual({ artwork, full = false }) {
  const { t } = useLanguage();
  const [failedSource, setFailedSource] = useState('');
  const source = resolveImageSource(artwork.image);
  if (source && source !== failedSource)
    return (
      <div className={`artwork-image ${full ? 'full' : ''}`}>
        <img
          src={source}
          alt={t(artwork.title)}
          loading={full ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailedSource(source)}
        />
      </div>
    );
  return (
    <div className={`artwork-scene scene-${artwork.scene || 'hug'} ${full ? 'full' : ''}`}>
      <div className="scene-orb" />
      <span className="scene-star star-a" aria-hidden="true">
        ✧
      </span>
      <span className="scene-star star-b" aria-hidden="true">
        ✦
      </span>
      <WhaleIllustration label={t('Minh họa mẫu: {title}', { title: t(artwork.title) })} />
      {artwork.scene === 'reference' && (
        <>
          <div className="reference-swatches" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
          <span className="scene-handwritten">{t('a little guide to Blubber')}</span>
        </>
      )}
      {artwork.scene === 'friend' && (
        <span className="scene-heart" aria-hidden="true">
          ♡
        </span>
      )}
      {artwork.scene === 'harbor' && (
        <div className="scene-waves" aria-hidden="true">
          〰 〰 〰
        </div>
      )}
      <span className="sample-label">{t('SVG STUDY · ARTWORK COMING LATER')}</span>
    </div>
  );
}
