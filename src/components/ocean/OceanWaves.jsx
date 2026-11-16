export default function OceanWaves({ className = '', color = 'currentColor' }) {
  return (
    <div className={`ocean-waves ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 110" preserveAspectRatio="none">
        <path fill={color} opacity=".3" d="M0 55Q180 5 360 50T720 45t360 0 360-10V110H0Z" />
        <path fill={color} opacity=".5" d="M0 70q170-55 360-15t360 5 360-8 360 8v50H0Z" />
        <path fill={color} d="M0 85q180-40 360-12t360 0 360 0 360-5v42H0Z" />
      </svg>
    </div>
  );
}
