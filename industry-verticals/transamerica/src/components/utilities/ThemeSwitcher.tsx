'use client';

import { useEffect, JSX } from 'react';

/**
 * Theme switcher disabled for Transamerica — always light mode.
 * Component stays registered so Sitecore placeholders that still
 * reference ThemeSwitcher render nothing instead of a dark-mode toggle.
 */
export const Default = (): JSX.Element | null => {
  useEffect(() => {
    document.body.classList.remove('dark');
  }, []);

  return null;
};
