import useLanguage from '../hooks/useLanguage';
import { character } from '../data/character';
import { Heart, Sparkles } from 'lucide-react';
import { CharacterImage } from '../components/ocean/WhaleShark';
import FloatingStars from '../components/ocean/FloatingStars';
import FloatingBubbles from '../components/ocean/FloatingBubbles';
import OceanWaves from '../components/ocean/OceanWaves';
import { Reveal } from '../components/ui/SectionTitle';

export default function StorySection() {
  const { t } = useLanguage();
  return (
    <section id="starry-waters" className="story-section" aria-labelledby="story-title">
      <FloatingStars count={13} />
      <FloatingBubbles count={6} />
      <div className="underwater-ray" aria-hidden="true" />
      <div className="container story-grid">
        <Reveal className="story-art">
          <div className="constellation" aria-hidden="true">
            <svg viewBox="0 0 520 390">
              <path
                d="m59 125 70-49 93 22 72-54 109 55 52 81-39 90"
                fill="none"
                stroke="#b9eff6"
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity=".4"
              />
              {[
                [59, 125],
                [129, 76],
                [222, 98],
                [294, 44],
                [403, 99],
                [455, 180],
                [416, 270],
              ].map(([cx, cy]) => (
                <g key={cx}>
                  <circle cx={cx} cy={cy} r="4" fill="#d6f5ef" />
                  <circle cx={cx} cy={cy} r="9" fill="#d6f5ef" opacity=".1" />
                </g>
              ))}
            </svg>
          </div>
          <CharacterImage image={character.images.story} />
          <span className="starry-label">
            <Sparkles size={15} /> {t('a little galaxy, a warm little heart')}
          </span>
        </Reveal>
        <Reveal className="story-copy">
          <div className="section-eyebrow">03 / {t('A LITTLE GALAXY UNDER THE SEA')}</div>
          <h2 id="story-title">
            Starry Waters<span aria-hidden="true">✧</span>
          </h2>
          <p className="story-lead">
            {t('Mang một chút ngân hà,')}
            <br />
            {t('bơi qua những ngày bình thường.')}
          </p>
          <p>
            {t(
              'Những đốm nhỏ trên cơ thể Blubber tựa như những vì sao rải khắp đại dương. Mỗi chấm sáng là một nét riêng, làm nên một chiếc cá voi thật dễ nhận ra.',
            )}
          </p>
          <p>
            {t(
              'Còn bên trong? Vẫn là mình thôi — một người bạn vui vẻ, thích giúp đỡ mọi người và luôn muốn mang đến một chút ấm áp.',
            )}
          </p>
          <div className="story-quote">
            <Heart size={19} />
            <span>
              {t('Không cần tỏa sáng rực rỡ.')}
              <br />
              {t('Chỉ cần làm ngày của ai đó dịu dàng hơn.')}
            </span>
          </div>
        </Reveal>
      </div>
      <OceanWaves color="var(--cream)" />
    </section>
  );
}
