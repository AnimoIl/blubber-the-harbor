import FloatingStars from './FloatingStars';

export default function OceanBackground() {
  return (
    <div className="ocean-scenery" aria-hidden="true">
      <div className="sun-glow" />
      <svg className="ocean-moon" viewBox="0 0 80 80">
        <path d="M63 48A29 29 0 0 1 31 9 30 30 0 1 0 63 48Z" fill="currentColor" />
        <circle cx="19" cy="45" r="3" fill="#d8cba1" opacity=".4" />
        <circle cx="29" cy="57" r="2" fill="#d8cba1" opacity=".4" />
      </svg>
      <div className="cloud cloud-one" />
      <div className="cloud cloud-two" />
      <FloatingStars count={8} />
      <svg className="seagulls" viewBox="0 0 160 60">
        <g fill="none" stroke="#6c9fa8" strokeWidth="2" strokeLinecap="round">
          <path d="M5 30q10-10 20 0 10-10 20 0m50-13q7-7 14 0 7-7 14 0m-57 28q6-7 13 0 6-7 13 0" />
        </g>
      </svg>
      <svg className="sailboat" viewBox="0 0 120 140">
        <path d="M25 107h83q-10 20-45 20-27 0-38-20" fill="#d9958e" />
        <path d="M65 15v90" stroke="#7d9e9f" strokeWidth="3" />
        <path d="M60 24 24 96h36" fill="#fffff2" />
        <path d="M70 40v56h31" fill="#f8d8bc" />
        <path d="M9 132q32-5 58 0t47-1" stroke="#6ebcbe" strokeWidth="2" fill="none" />
      </svg>
      <svg className="little-fish" viewBox="0 0 100 60">
        <path d="M67 30 88 14v32L67 30q-24 30-54 0 30-30 54 0" fill="#f5c9aa" />
        <circle cx="30" cy="27" r="3" fill="#7c8d94" />
      </svg>
      <div className="buoy">
        <span />
        <i />
      </div>
    </div>
  );
}
