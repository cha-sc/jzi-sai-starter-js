'use client';

import { useSitecore } from '@sitecore-content-sdk/nextjs';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { LOCALE_COOKIE_NAME } from 'lib/locale-cookie';
import { Suspense, useCallback, useMemo, useState, JSX } from 'react';

// Hardcoded list — the switcher does not read the site's languages from
// Sitecore. Keep these codes in sync with the Seismic site's languages in
// Sitecore and with `locales` in src/i18n/routing.ts.
const AVAILABLE_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'fr-FR', label: 'Français' },
  { code: 'de-DE', label: 'Deutsch' },
] as const;

function getPathSuffix(path: string | string[] | undefined): string {
  if (path === undefined) {
    return '';
  }

  if (Array.isArray(path)) {
    return path.length > 0 ? `/${path.join('/')}` : '';
  }

  return path ? `/${path}` : '';
}

type LanguageSwitcherViewProps = {
  selectedLabel: string | undefined;
  showLanguageDropdown: boolean;
  onToggleDropdown: () => void;
  onSelectLanguage: (langCode: string) => void;
};

function LanguageSwitcherView({
  selectedLabel,
  showLanguageDropdown,
  onToggleDropdown,
  onSelectLanguage,
}: LanguageSwitcherViewProps): JSX.Element {
  return (
    <div
      className={`language-switcher ${showLanguageDropdown ? 'expanded' : ''}`}
      onClick={onToggleDropdown}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="globe-icon"
        viewBox="0 0 24 24"
        width={16}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
      <span className="selected-language">{selectedLabel}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="chevron-icon"
        viewBox="0 0 512 512"
        width={16}
        fill="currentColor"
      >
        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
      </svg>
      {showLanguageDropdown && (
        <div className="language-dropdown">
          {AVAILABLE_LANGUAGES.map((lang) => (
            <span
              key={lang.code}
              onClick={(event) => {
                event.stopPropagation();
                onSelectLanguage(lang.code);
              }}
            >
              {lang.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function LanguageSwitcherFallback(): JSX.Element {
  const { page } = useSitecore();
  const selectedLabel = AVAILABLE_LANGUAGES.find((lang) => lang.code === page.locale)?.label;

  return (
    <LanguageSwitcherView
      selectedLabel={selectedLabel}
      showLanguageDropdown={false}
      onToggleDropdown={() => {}}
      onSelectLanguage={() => {}}
    />
  );
}

function LanguageSwitcherInner(): JSX.Element {
  const { page } = useSitecore();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const selectedLabel = useMemo(
    () => AVAILABLE_LANGUAGES.find((lang) => lang.code === page.locale)?.label,
    [page.locale]
  );

  const changeLanguage = useCallback(
    (langCode: string) => {
      const pathSuffix = getPathSuffix(params.path);
      const query = searchParams.toString();
      // Build the public URL: no site segment (the proxy resolves the site
      // from the host and inserts site/locale into the internal route), and
      // no locale prefix for the default language (localePrefix: 'as-needed'
      // in src/i18n/routing.ts).
      const href =
        langCode === AVAILABLE_LANGUAGES[0].code
          ? pathSuffix || '/'
          : `/${langCode}${pathSuffix}`;
      const url = query ? `${href}?${query}` : href;

      // Remember the selection so StickyLocaleProxy (src/proxy.ts) can keep
      // prefix-less internal links in this language instead of falling back
      // to the default.
      document.cookie = `${LOCALE_COOKIE_NAME}=${langCode}; path=/; max-age=31536000; SameSite=Lax`;

      router.push(url);
      setShowLanguageDropdown(false);
    },
    [params.path, router, searchParams]
  );

  return (
    <LanguageSwitcherView
      selectedLabel={selectedLabel}
      showLanguageDropdown={showLanguageDropdown}
      onToggleDropdown={() => setShowLanguageDropdown(!showLanguageDropdown)}
      onSelectLanguage={changeLanguage}
    />
  );
}

export const Default = (): JSX.Element => (
  <Suspense fallback={<LanguageSwitcherFallback />}>
    <LanguageSwitcherInner />
  </Suspense>
);
