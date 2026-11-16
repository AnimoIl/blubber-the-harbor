import useLanguage from '../hooks/useLanguage';
import { useState } from 'react';
import { ArrowUpRight, Image } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { gallery, galleryCategories } from '../data/gallery';
import SectionTitle from '../components/ui/SectionTitle';
import GalleryLightbox from '../components/ui/GalleryLightbox';
import ArtworkVisual from '../components/ui/ArtworkVisual';

export default function GallerySection() {
  const { t } = useLanguage();
  const [category, setCategory] = useState('All Artwork');
  const [selectedId, setSelectedId] = useState(null);
  const filtered =
    category === 'All Artwork' ? gallery : gallery.filter((item) => item.category === category);
  return (
    <section
      id="art-harbor"
      className="gallery-section section-space"
      aria-labelledby="gallery-title"
    >
      <div className="container">
        <SectionTitle
          number="04"
          eyebrow="LITTLE MOMENTS, LOVINGLY KEPT"
          title={<span id="gallery-title">Art Harbor</span>}
          subtitle="A little collection of Blubber’s precious memories."
        />
        <div className="gallery-filters" role="group" aria-label={t('Lọc theo loại artwork')}>
          {galleryCategories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              className={category === item ? 'selected' : ''}
              onClick={() => setCategory(item)}
            >
              {t(item)}
            </button>
          ))}
        </div>
        <div className="gallery-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((artwork) => (
              <motion.button
                layout
                key={artwork.id}
                type="button"
                className="gallery-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedId(artwork.id)}
                aria-label={t('Xem {title}', { title: t(artwork.title) })}
              >
                <ArtworkVisual artwork={artwork} />
                <div className="gallery-caption">
                  <div>
                    <span>{t(artwork.category)}</span>
                    <h3>{t(artwork.title)}</h3>
                  </div>
                  <span className="gallery-open">
                    <ArrowUpRight size={19} />
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
        {!filtered.length && (
          <p className="gallery-empty">
            {t('Góc này đang chờ một bức tranh mới. Ghé lại sau nhé!')}
          </p>
        )}
        <p className="gallery-note">
          <Image size={16} />{' '}
          {t('Những minh họa mẫu đang giữ chỗ cho artwork chính thức của Blubber.')}
        </p>
      </div>
      {selectedId && (
        <GalleryLightbox
          artworks={filtered}
          selectedId={selectedId}
          onChange={setSelectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </section>
  );
}
