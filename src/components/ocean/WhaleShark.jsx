import useLanguage from '../../hooks/useLanguage';
import { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { character } from '../../data/character';
import { resolveImageSource } from '../../utils/images';

const spots = [
  [188, 149, 4],
  [209, 133, 4],
  [232, 122, 4],
  [258, 115, 5],
  [284, 113, 4],
  [310, 111, 4],
  [340, 116, 5],
  [366, 126, 4],
  [391, 140, 4],
  [415, 156, 4],
  [437, 178, 4],
  [209, 158, 3],
  [231, 146, 5],
  [258, 139, 4],
  [285, 137, 5],
  [311, 137, 3],
  [338, 143, 4],
  [362, 151, 5],
  [386, 166, 4],
  [409, 187, 4],
  [231, 173, 3],
  [259, 164, 4],
  [287, 165, 3],
  [316, 166, 4],
  [342, 175, 3],
  [369, 187, 4],
  [256, 190, 3],
  [282, 191, 4],
  [311, 195, 3],
  [335, 202, 4],
  [181, 172, 3],
  [163, 193, 3],
  [148, 212, 3],
];

export function WhaleIllustration({
  className = '',
  label = 'Chú cá mập voi xanh mũm mĩm với những đốm sao và nụ cười tươi',
}) {
  const { t } = useLanguage();
  const id = useId().replace(/:/g, '');
  return (
    <svg
      className={`whale-svg ${className}`}
      viewBox="0 0 600 440"
      role="img"
      aria-label={t(label)}
    >
      <defs>
        <linearGradient id={`${id}-body`} x1=".2" y1="0" x2=".65" y2="1">
          <stop stopColor="#7ac8ec" />
          <stop offset=".55" stopColor="#55b0df" />
          <stop offset="1" stopColor="#2e8fc7" />
        </linearGradient>
        <linearGradient id={`${id}-belly`} x2=".3" y2="1">
          <stop stopColor="#fffff2" />
          <stop offset="1" stopColor="#d4f0ee" />
        </linearGradient>
        <linearGradient id={`${id}-fin`} x2="1" y2="1">
          <stop stopColor="#60b9e2" />
          <stop offset="1" stopColor="#348ec3" />
        </linearGradient>
      </defs>
      <ellipse cx="318" cy="385" rx="165" ry="13" fill="#3c99b0" opacity=".1" />
      <g stroke="#337ca6" strokeWidth="3" strokeLinejoin="round">
        <path
          d="M167 214C113 214 103 172 66 163c10 28 16 45 4 60-8 18-36 35-43 62 43 1 64-20 86-23 26-3 43 17 63 15"
          fill={`url(#${id}-fin)`}
        />
        <path d="M263 122c6-38 19-57 39-62 8 26 27 37 54 56" fill={`url(#${id}-body)`} />
        <path
          d="M255 288c-8 40 5 62 32 73 1-23 15-39 37-49M390 290c15 32 43 47 62 39-16-15-18-37-20-53"
          fill={`url(#${id}-fin)`}
        />
        <path
          d="M145 208C165 134 228 104 304 105c98 0 177 60 190 132 12 66-43 107-145 108-111 1-226-39-204-137Z"
          fill={`url(#${id}-body)`}
        />
        <path
          d="M147 257c55 38 111 19 171 21 74 2 125 20 173-19-3 56-57 85-142 86-93 0-174-28-202-65"
          fill={`url(#${id}-belly)`}
          stroke="none"
        />
        <path d="M204 244c-41 5-63 30-73 55 29 5 63-3 88-20" fill={`url(#${id}-fin)`} />
        <path d="M419 258c25 20 47 26 76 17-14-17-31-28-51-32" fill={`url(#${id}-fin)`} />
      </g>
      <g fill="#e8faf3" opacity=".85">
        {spots.map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} />
        ))}
      </g>
      <g fill="#fffff2">
        <path d="m279 112 4 9 10 2-9 5-2 10-5-9-10-2 9-5Z" />
        <path d="m367 163 3 7 8 2-7 4-2 8-4-7-8-2 7-4Z" />
      </g>
      <g stroke="#316782" strokeWidth="3" strokeLinecap="round">
        <path d="m229 222-5 14m14-12-4 14m14-11-3 13" opacity=".65" />
      </g>
      <ellipse cx="296" cy="251" rx="17" ry="9" fill="#ffa9b5" opacity=".8" />
      <ellipse cx="438" cy="247" rx="16" ry="8" fill="#ffa9b5" opacity=".8" />
      <g fill="#183b56">
        <ellipse cx="313" cy="232" rx="7" ry="10" />
        <ellipse cx="423" cy="228" rx="7" ry="10" />
      </g>
      <g fill="#fff">
        <circle cx="315" cy="229" r="2.5" />
        <circle cx="425" cy="225" r="2.5" />
      </g>
      <path
        d="M341 251q24 29 49-3"
        fill="#234f6c"
        stroke="#234f6c"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M351 264q14-13 28-3-13 11-28 3" fill="#eea0aa" />
      <path
        d="M188 183q20-27 44-35"
        stroke="#c2edfa"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity=".5"
      />
    </svg>
  );
}

export function CharacterImage({ image, className = '', ...props }) {
  const { t } = useLanguage();
  const [failedSource, setFailedSource] = useState('');
  const source = resolveImageSource(image);
  return source && source !== failedSource ? (
    <img
      {...props}
      src={source}
      className={className}
      alt={t('Blubber, chú cá mập voi với những đốm sao')}
      onError={() => setFailedSource(source)}
    />
  ) : (
    <WhaleIllustration className={className} />
  );
}

const messages = [
  'Blub blub! 🫧',
  'Welcome to my harbor!',
  'Have a whale of a day!',
  'You’re always welcome here!',
  'Sending you ocean hugs!',
];

export default function WhaleShark({ image = character.images.hero, interactive = true }) {
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const [pops, setPops] = useState(0);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  function greet() {
    setMessage(messages[pops % messages.length]);
    setPops(pops + 1);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(''), 3500);
  }
  if (!interactive) return <CharacterImage image={image} />;
  return (
    <div className="whale-interaction">
      <div className={`whale-speech ${message ? 'visible' : ''}`} role="status">
        {t(message)}
      </div>
      <motion.button
        className="whale-button"
        type="button"
        aria-label={t('Chào Blubber — chạm để nhận một lời chào')}
        onClick={greet}
        whileTap={{ scale: 0.95 }}
      >
        <div className="whale-float">
          <div key={pops} className={pops ? 'whale-bounce' : ''}>
            <CharacterImage image={image} />
          </div>
        </div>
      </motion.button>
      {message && (
        <div key={pops} className="greeting-particles" aria-hidden="true">
          <span>♡</span>
          <span>◦</span>
          <span>✧</span>
          <span>♡</span>
        </div>
      )}
    </div>
  );
}
