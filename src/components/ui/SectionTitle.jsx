import useLanguage from '../../hooks/useLanguage';
import { motion } from 'motion/react';
import useReducedMotion from '../../hooks/useReducedMotion';

export function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function SectionTitle({ number, eyebrow, title, subtitle, light = false }) {
  const { t } = useLanguage();
  return (
    <Reveal className={`section-title ${light ? 'light' : ''}`}>
      <div className="section-eyebrow">
        <span className="small-star">✦</span> {number} / {t(eyebrow)}{' '}
        <span className="small-star">✦</span>
      </div>
      <h2>{title}</h2>
      <p>{t(subtitle)}</p>
    </Reveal>
  );
}
