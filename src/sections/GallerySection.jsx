import useLanguage from '../hooks/useLanguage';
import { useState } from 'react';
import { ArrowUpRight, Image, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { gallery, galleryCategories, galleryPageSize } from '../data/gallery';
import { getArtworkText } from '../utils/gallery';
import SectionTitle from '../components/ui/SectionTitle';
import GalleryLightbox from '../components/ui/GalleryLightbox';
import ArtworkVisual from '../components/ui/ArtworkVisual';

export default function GallerySection() {
  const { t, language } = useLanguage();
  const [category, setCategory] = useState('All Artwork');
  const [selectedId, setSelectedId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(galleryPageSize);
  const filtered =
    category === 'All Artwork' ? gallery : gallery.filter((item) => item.category === category);
  const visible = filtered.slice(0, visibleCount);
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
              aria-label={t(item)}
              onClick={() => {
                setCategory(item);
                setVisibleCount(galleryPageSize);
              }}
            >
              {t(item)}
              <span className="gallery-filter-count" aria-hidden="true">
                {item === 'All Artwork'
                  ? gallery.length
                  : gallery.filter((artwork) => artwork.category === item).length}
              </span>
            </button>
          ))}
        </div>
        <div className="gallery-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((artwork) => (
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
                aria-label={t('Xem {title}', {
                  title: getArtworkText(artwork, 'title', language, t),
                })}
              >
                <ArtworkVisual artwork={artwork} />
                <div className="gallery-caption">
                  <div>
                    <span>{t(artwork.category)}</span>
                    <h3>{getArtworkText(artwork, 'title', language, t)}</h3>
                  </div>
                  <span className="gallery-open">
                    <ArrowUpRight size={19} />
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
        {visible.length < filtered.length && (
          <div className="gallery-load-more">
            <p role="status">
              {t('Đang hiển thị {shown} / {total} artwork', {
                shown: visible.length,
                total: filtered.length,
              })}
            </p>
            <button
              type="button"
              className="button secondary"
              onClick={() => setVisibleCount((count) => count + galleryPageSize)}
            >
              <Plus size={17} /> {t('Xem thêm artwork')}
            </button>
          </div>
        )}
        {!filtered.length && (
          <p className="gallery-empty">
            {t('Góc này đang chờ một bức tranh mới. Ghé lại sau nhé!')}
          </p>
        )}
        <p className="gallery-note">
          <Image size={16} /> {t('Chọn artwork để xem lớn hơn và khám phá từng chi tiết.')}
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
