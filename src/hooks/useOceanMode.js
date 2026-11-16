import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'blubber-ocean-mode';
const isMode = (value) => value === 'day' || value === 'night';

function savedMode() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return isMode(value) ? value : null;
  } catch {
    return null;
  }
}

export default function useOceanMode() {
  const [mode, setMode] = useState(() =>
    document.documentElement.dataset.oceanMode === 'night' ? 'night' : 'day',
  );
  const preference = useRef(savedMode());

  useEffect(() => {
    document.documentElement.dataset.oceanMode = mode;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', mode === 'night' ? '#102b41' : '#B9F0FA');
  }, [mode]);

  useEffect(() => {
    const system = window.matchMedia('(prefers-color-scheme: dark)');
    const followSystem = () => {
      if (!preference.current) setMode(system.matches ? 'night' : 'day');
    };
    const syncPreference = (event) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      preference.current = isMode(event.newValue) ? event.newValue : null;
      setMode(preference.current || (system.matches ? 'night' : 'day'));
    };
    system.addEventListener('change', followSystem);
    window.addEventListener('storage', syncPreference);
    return () => {
      system.removeEventListener('change', followSystem);
      window.removeEventListener('storage', syncPreference);
    };
  }, []);

  function toggleMode() {
    const next = mode === 'night' ? 'day' : 'night';
    preference.current = next;
    setMode(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The toggle still works for this visit when browser storage is unavailable.
    }
  }

  return { mode, toggleMode };
}
