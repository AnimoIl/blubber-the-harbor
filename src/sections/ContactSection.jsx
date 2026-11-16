import useLanguage from '../hooks/useLanguage';
import { Heart, Mail } from 'lucide-react';
import { socials } from '../data/socials';
import SocialCard from '../components/ui/SocialCard';
import SectionTitle, { Reveal } from '../components/ui/SectionTitle';
import FloatingStars from '../components/ocean/FloatingStars';

function BottleIllustration() {
  const { t } = useLanguage();
  return (
    <svg viewBox="0 0 230 300" role="img" aria-label={t('Chai thủy tinh đựng một lá thư nhỏ')}>
      <ellipse cx="119" cy="271" rx="85" ry="13" fill="#87cfd0" opacity=".3" />
      <g transform="rotate(14 115 145)">
        <path
          d="M92 55v53c-1 15-30 28-31 55v76q0 21 22 21h67q22 0 22-21v-76c0-27-29-40-30-55V55"
          fill="#c4eee5"
          fillOpacity=".75"
          stroke="#69b4b5"
          strokeWidth="3"
        />
        <path d="M85 60h63V41H85Z" fill="#f7e0c1" stroke="#ba9b7f" strokeWidth="2" />
        <path d="M88 40h57V25H88Z" fill="#d7b18f" stroke="#ba9b7f" strokeWidth="2" />
        <path d="M71 199q46-15 91 0v38q0 12-15 13H87q-16 0-16-13Z" fill="#9ddfd7" opacity=".8" />
        <rect
          x="83"
          y="147"
          width="67"
          height="73"
          rx="4"
          fill="#fffff2"
          stroke="#d3c8ab"
          strokeWidth="1.5"
          transform="rotate(-12 115 185)"
        />
        <path
          d="M94 167h36m-34 9h34m-33 9h24"
          stroke="#b2bdba"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="m115 197-6-5q-8-8-11-1-2 5 17 13 18-15 12-18-7-2-12 11" fill="#df969a" />
        <path
          d="M75 170v49m0 11v5m25-163v27"
          stroke="#fff"
          strokeWidth="5"
          opacity=".7"
          strokeLinecap="round"
        />
      </g>
      <path
        d="m29 121 3 9 10 2-9 4-2 10-5-9-9-2 8-5m168 40 3 9 10 2-9 4-2 10-4-9-10-2 8-4"
        fill="#e6bd6d"
      />
      <path d="M22 264q14-10 28 0m130-1q14-10 28 0" stroke="#74b9bc" strokeWidth="2" fill="none" />
    </svg>
  );
}

export default function ContactSection() {
  const { t } = useLanguage();
  return (
    <section
      id="message-in-a-bottle"
      className="contact-section section-space"
      aria-labelledby="contact-title"
    >
      <FloatingStars count={5} />
      <div className="container">
        <SectionTitle
          number="05"
          eyebrow="A LITTLE HELLO GOES A LONG WAY"
          title={<span id="contact-title">Message in a Bottle</span>}
          subtitle="Want to say hello? Send a little wave!"
        />
        <div className="contact-grid">
          <Reveal className="bottle-art">
            <BottleIllustration />
            <span className="handwritten">{t('a little note, a lot of love ♡')}</span>
          </Reveal>
          <Reveal className="contact-content">
            <div className="contact-greeting">
              <span className="mail-icon">
                <Mail size={22} />
              </span>
              <h3>
                {t('Đại dương rộng thế,')}
                <br />
                {t('gặp được nhau thật vui.')}
              </h3>
            </div>
            <p>
              {t(
                'Mình luôn vui khi có thêm một người bạn. Ghé qua những bến nhỏ này, để lại một lời chào, hoặc đơn giản là cùng chia sẻ một ngày bình yên nhé.',
              )}
            </p>
            <div className="social-grid">
              {socials.map((social) => (
                <SocialCard key={social.id} social={social} />
              ))}
            </div>
            <div className="contact-note">
              <Heart size={15} /> {t('Bạn luôn được chào đón ở đây.')}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
