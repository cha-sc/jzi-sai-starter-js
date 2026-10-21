'use client';

import { JSX } from 'react';

/**
 * Theme switcher removed. The site is always light, with the header
 * permanently styled dark (see `dark` class on <header> in Layout.tsx).
 * This component renders nothing so any rendering still placed in a
 * Page Design placeholder disappears without a missing-component error;
 * the placed rendering can be deleted in Pages at any time.
 */
export const Default = (): JSX.Element | null => {
  return null;
};
