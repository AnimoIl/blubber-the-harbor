export default function FloatingStars({ count = 7, className = '' }) {
  return (
    <div className={`floating-stars ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          style={{
            left: `${8 + ((i * 17) % 86)}%`,
            top: `${8 + ((i * 29) % 75)}%`,
            animationDelay: `${i * -0.7}s`,
            fontSize: `${13 + (i % 3) * 9}px`,
          }}
        >
          {i % 3 === 0 ? '✦' : '✧'}
        </span>
      ))}
    </div>
  );
}
