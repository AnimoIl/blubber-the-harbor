import useLanguage from '../hooks/useLanguage';
import { Anchor, Coffee, Heart, Scale, Sparkles, UserRound } from 'lucide-react';
import SectionTitle, { Reveal } from '../components/ui/SectionTitle';
import { CharacterImage } from '../components/ocean/WhaleShark';
import { character } from '../data/character';

export default function AboutSection() {
  const { t } = useLanguage();
  const facts = [
    { icon: UserRound, label: 'BẠN CÓ THỂ GỌI MÌNH', value: character.nicknames },
    { icon: Anchor, label: 'MỘT CHIẾC', value: character.species },
    { icon: Scale, label: 'CÂN NẶNG', value: character.weight },
    { icon: Coffee, label: 'CÔNG VIỆC', value: character.occupation },
  ];
  return (
    <section
      id="captains-log"
      className="about-section section-space"
      aria-labelledby="about-title"
    >
      <div className="container">
        <SectionTitle
          number="01"
          eyebrow="GET TO KNOW ME"
          title={<span id="about-title">Captain’s Log</span>}
          subtitle="Meet the harbor’s extra-big whale."
        />
        <div className="about-grid">
          <Reveal className="profile-card">
            <div className="tape" aria-hidden="true" />
            <div className="profile-portrait">
              <CharacterImage image={character.images.profile} />
              <span className="portrait-sparkle" aria-hidden="true">
                ✧
              </span>
            </div>
            <div className="profile-card-heading">
              <h3>Blubber The Harbor</h3>
              <Heart size={22} />
            </div>
            <span className="profile-badge">{t('✦ GOOD VIBES ABOARD ✦')}</span>
            <dl className="profile-facts">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <dt>
                    <Icon size={18} aria-hidden="true" />
                    <span>{t(label)}</span>
                  </dt>
                  <dd>{t(value)}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="journal-content" delay={0.1}>
            <span className="handwritten">{t('A page from my little journal...')}</span>
            <h3>
              {t('Một chiếc cá voi,')}
              <br />
              {t('thật nhiều điều dễ thương')}
              <span className="coral">.</span>
            </h3>
            <p>{t(character.personality)}</p>
            <p>
              {t(
                'Trên làn da xanh là những đốm nhỏ và họa tiết như một dải ngân hà lấp lánh. Có lẽ vì thế mà mình luôn thấy những điều bé xíu cũng thật đáng yêu.',
              )}{' '}
              <Sparkles className="inline-icon" size={16} />
            </p>
            <div className="origin-note">
              <div className="note-heading">
                <span className="note-icon">Aa</span>
                <h4>{t('Why Blubber?')}</h4>
                <span aria-hidden="true">✧</span>
              </div>
              <p>{t(character.origin)}</p>
              <span className="note-signature">{t('Và thế là… Blubber ra đời! ♡')}</span>
            </div>
            <div className="journal-bottom">
              <span>
                <Heart size={14} /> {t('LUÔN SẴN MỘT NỤ CƯỜI')}
              </span>
              <span className="journal-doodle" aria-hidden="true">
                〰 ✧ 〰
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
