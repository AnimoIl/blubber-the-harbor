import useLanguage from '../../hooks/useLanguage';
import { useState } from 'react';
import { ChevronDown, Gamepad2, Headphones, CupSoda, TentTree } from 'lucide-react';
import { motion } from 'motion/react';
import { Reveal } from './SectionTitle';

const icons = { food: CupSoda, music: Headphones, gaming: Gamepad2, outdoor: TentTree };

export default function InterestCard({ interest, index }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const Icon = icons[interest.icon];
  return (
    <Reveal delay={index * 0.06}>
      <motion.article
        className={`interest-card ${interest.color}`}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.2 }}
      >
        <div className="interest-art">
          <span className="interest-orbit" />
          <Icon size={56} strokeWidth={1.5} />
          <span className="interest-sparkle" aria-hidden="true">
            ✧
          </span>
          {interest.icon === 'music' && (
            <span className="music-note" aria-hidden="true">
              ♪
            </span>
          )}
        </div>
        <span className="card-eyebrow">{t(interest.eyebrow)}</span>
        <h3>{t(interest.title)}</h3>
        <p>{t(interest.description)}</p>
        <div className="interest-tags">
          {interest.tags.map((tag) => (
            <span key={tag}>{t(tag)}</span>
          ))}
        </div>
        <button
          className="detail-toggle"
          type="button"
          aria-expanded={expanded}
          aria-controls={`interest-${interest.id}`}
          onClick={() => setExpanded(!expanded)}
        >
          {t(expanded ? 'Thu gọn một chút' : 'Kể thêm một chút')}
          <ChevronDown size={15} className={expanded ? 'rotated' : ''} />
        </button>
        <div id={`interest-${interest.id}`} hidden={!expanded} className="interest-details">
          <p>{t(interest.details)}</p>
        </div>
      </motion.article>
    </Reveal>
  );
}
