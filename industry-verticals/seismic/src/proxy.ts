import { NextFetchEvent, NextResponse, type NextRequest } from 'next/server';
import {
  defineProxy,
  AppRouterMultisiteProxy,
  PersonalizeProxy,
  RedirectsProxy,
  LocaleProxy,
  BotTrackingProxy,
  PreviewProxy,
  ProxyBase,
} from '@sitecore-content-sdk/nextjs/proxy';
import sites from '.sitecore/sites.json';
import scConfig from 'sitecore.config';
import { routing } from './i18n/routing';
import { LOCALE_COOKIE_NAME } from './lib/locale-cookie';
import client from './lib/sitecore-client';

/**
 * Keeps visitors in the language they selected. Internal links rendered from
 * Sitecore carry no locale prefix, and LocaleProxy would fall back to the
 * default language for such paths. This proxy remembers the locale from the
 * URL (or the LanguageSwitcher's cookie) and redirects prefix-less page
 * requests back into the selected language.
 */
class StickyLocaleProxy extends ProxyBase {
  get name(): string {
    return 'StickyLocaleProxy';
  }

  async handle(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    if (req.method !== 'GET' || this.isPreview(req)) {
      return res;
    }

    const { pathname } = req.nextUrl;
    // Ignore files and asset-like paths
    if (pathname.includes('.')) {
      return res;
    }

    const locales = routing.locales.slice();
    const pathLocale = locales.find(
      (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    );

    if (pathLocale) {
      // Sync the cookie with the language in the URL (covers direct visits
      // and shared links, not just switcher clicks).
      if (req.cookies.get(LOCALE_COOKIE_NAME)?.value !== pathLocale) {
        res.cookies.set(LOCALE_COOKIE_NAME, pathLocale, {
          path: '/',
          maxAge: 60 * 60 * 24 * 365,
          sameSite: 'lax',
        });
      }
      return res;
    }

    const cookieLocale = req.cookies.get(LOCALE_COOKIE_NAME)?.value;
    if (
      cookieLocale &&
      cookieLocale !== routing.defaultLocale &&
      locales.includes(cookieLocale as (typeof locales)[number])
    ) {
      const url = req.nextUrl.clone();
      url.pathname = pathname === '/' ? `/${cookieLocale}` : `/${cookieLocale}${pathname}`;
      return NextResponse.redirect(url, 307);
    }

    return res;
  }
}

export default function proxy(req: NextRequest, event: NextFetchEvent) {
  // PreviewProxy authorizes preview requests
  const preview = new PreviewProxy({
    client: client,
    ...scConfig.api.edge,
  });

  // BotTrackingProxy will detect and track bots before any other proxies run
  const botTracking = new BotTrackingProxy({
    ...scConfig.api.edge,
    sites,
    fetchEvent: event,
  });

  // LocaleProxy and AppRouterMultisiteProxy must always run for App Router routing
  const locale = new LocaleProxy({
    /**
     * List of sites for site resolver to work with
     */
    sites,
    /**
     * List of all supported locales configured in routing.ts
     */
    locales: routing.locales.slice(),
    // This function determines if the proxy should be turned off on per-request basis.
    // Certain paths are ignored by default (e.g. files and Next.js API routes), but you may wish to disable more.
    // This is an important performance consideration since Next.js Edge proxy runs on every request.
    // in multilanguage scenarios, we need locale proxy to always run first to ensure locale is set and used correctly by the rest of the proxies
    skip: () => false,
  });

  const multisite = new AppRouterMultisiteProxy({
    /**
     * List of sites for site resolver to work with
     */
    sites,
    ...scConfig.multisite,
    // This function determines if the proxy should be turned off on per-request basis.
    // Certain paths are ignored by default (e.g. files and Next.js API routes), but you may wish to disable more.
    // This is an important performance consideration since Next.js Edge proxy runs on every request.
    skip: () => false,
  });

  // Instantiate proxies - they will use Edge config if available, otherwise fall back to local config
  // Each proxy will skip processing if required API configuration is not available
  const redirects = new RedirectsProxy({
    /**
     * List of sites for site resolver to work with
     */
    sites,
    ...scConfig.api.edge,
    ...scConfig.api.local,
    ...scConfig.redirects,
    // This function determines if the proxy should be turned off on per-request basis.
    // Certain paths are ignored by default (e.g. Next.js API routes), but you may wish to disable more.
    // By default it is disabled while in development mode.
    // This is an important performance consideration since Next.js Edge proxy runs on every request.
    skip: () => false,
  });

  const personalize = new PersonalizeProxy({
    /**
     * List of sites for site resolver to work with
     */
    sites,
    ...scConfig.api.edge,
    ...scConfig.personalize,
    // This function determines if the proxy should be turned off on per-request basis.
    // Certain paths are ignored by default (e.g. Next.js API routes), but you may wish to disable more.
    // By default it is disabled while in development mode.
    // This is an important performance consideration since Next.js Edge proxy runs on every request.
    // NOTE: Personalize requires Edge configuration and cannot work with local containers.
    // The proxy will disable itself if Edge config is not present.
    skip: () => false,
    // This is an example of how to provide geo data for personalization.
    // The provided callback will be called on each request to extract geo data.
    // extractGeoDataCb: () => {
    //   return {
    //     city: 'Athens',
    //     country: 'Greece',
    //     region: 'Attica',
    //   };
    // },
  });

  const stickyLocale = new StickyLocaleProxy({ sites });

  return defineProxy(preview, botTracking, stickyLocale, locale, multisite, redirects, personalize).exec(
    req
  );
}

export const config = {
  /*
   * Match all paths except for:
   * 1. API route handlers
   * 2. /_next (Next.js internals)
   * 3. /sitecore/api (Sitecore API routes)
   * 4. /- (Sitecore media)
   * 5. /healthz (Health check)
   * 7. all root files inside /public
   */
  matcher: [
    '/',
    '/((?!api/|sitemap|robots|_next/|healthz|sitecore/api/|-/|favicon.ico|sc_logo.svg).*)',
  ],
};
