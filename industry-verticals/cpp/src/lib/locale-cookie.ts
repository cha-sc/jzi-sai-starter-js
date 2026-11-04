/**
 * Cookie that remembers the visitor's selected language. Written by the
 * LanguageSwitcher (client) and by StickyLocaleProxy in src/proxy.ts, which
 * reads it to keep prefix-less internal links in the selected language.
 */
export const LOCALE_COOKIE_NAME = 'sc_locale';
