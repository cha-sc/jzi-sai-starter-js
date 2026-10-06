'use client';

import { useEffect, useState, JSX } from 'react';

export const Default = (): JSX.Element => {
  // Always default to light; do not follow prefers-color-scheme / OS dark mode.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.classList.remove('dark');
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <label className="theme-switcher">
      <label htmlFor="theme-switcher" className="d-none">
        Switch theme
      </label>
      <input
        name="theme-switcher"
        id="theme-switcher"
        type="checkbox"
        checked={isDark}
        onChange={() => setIsDark(!isDark)}
      />
      <span className="theme-switcher-slider"></span>
    </label>
  );
};
