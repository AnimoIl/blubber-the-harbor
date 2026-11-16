import useLanguage from '../../hooks/useLanguage';
import LanguageToggle from '../ui/LanguageToggle';
import { useEffect, useRef, useState } from 'react';
import { Anchor, Menu, Waves, X } from 'lucide-react';
import { harborStops } from '../../data/character';
import OceanModeToggle from '../ui/OceanModeToggle';

export default function Navbar({ oceanMode, onToggleOceanMode }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('the-dock');
  const menuButton = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: 0 },
    );
    harborStops.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const closeOutside = (event) => {
      if (!event.target.closest('.navbar')) setOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
    };
  }, [open]);
  return (
    <header className="site-header">
      <nav className="navbar" aria-label={t('Điều hướng bến cảng')}>
        <a
          href="#the-dock"
          className="brand"
          aria-label={t('Blubber The Harbor — về đầu trang')}
          onClick={() => setOpen(false)}
        >
          <span className="brand-icon">
            <Waves size={28} strokeWidth={2} />
          </span>
          <span>
            blubber<span className="brand-subtitle">THE HARBOR</span>
          </span>
        </a>
        <div id="harbor-menu" className={`nav-links ${open ? 'open' : ''}`}>
          {harborStops.map((stop) => (
            <a
              key={stop.id}
              href={`#${stop.id}`}
              className={active === stop.id ? 'active' : ''}
              aria-current={active === stop.id ? 'location' : undefined}
              onClick={() => setOpen(false)}
            >
              {stop.id === 'the-dock' && <Anchor size={13} />} {stop.label}
            </a>
          ))}
        </div>
        <div className="nav-controls">
          <OceanModeToggle mode={oceanMode} onToggle={onToggleOceanMode} />
          <LanguageToggle />
          <button
            ref={menuButton}
            className="menu-toggle"
            type="button"
            aria-label={t(open ? 'Đóng menu' : 'Mở menu')}
            aria-expanded={open}
            aria-controls="harbor-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    </header>
  );
}
