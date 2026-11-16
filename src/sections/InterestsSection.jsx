import useLanguage from '../hooks/useLanguage';
import { interests } from '../data/interests';
import SectionTitle from '../components/ui/SectionTitle';
import InterestCard from '../components/ui/InterestCard';

export default function InterestsSection() {
  const { t } = useLanguage();
  return (
    <section
      id="treasure-cove"
      className="interests-section section-space"
      aria-labelledby="interests-title"
    >
      <div className="container">
        <SectionTitle
          number="02"
          eyebrow="LITTLE THINGS, BIG JOY"
          title={<span id="interests-title">Treasure Cove</span>}
          subtitle="Những kho báu nho nhỏ khiến Blubber vui mỗi ngày."
        />
        <div className="interests-grid">
          {interests.map((interest, index) => (
            <InterestCard key={interest.id} interest={interest} index={index} />
          ))}
        </div>
        <p className="section-postscript">
          {t('Không cần kho báu lớn. Chỉ cần những điều mình thích.')}{' '}
          <span aria-hidden="true">♡</span>
        </p>
      </div>
    </section>
  );
}
