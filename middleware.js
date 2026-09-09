/**
 * Vercel Edge Middleware for Markdown Content Negotiation (acceptmarkdown.com)
 * Intercepts requests with Accept: text/markdown and serves markdown versions with Vary headers.
 * For nonexistent paths with Accept: text/markdown, returns 404.md with HTTP 404 status.
 */

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|css|js|videos|public).*)',
  ],
};

const MARKDOWN_ROUTES = {
  '': '/index.md',
  '/': '/index.md',
  '/index.html': '/index.md',
  '/pages/homepage.html': '/index.md',
  '/about': '/content/about.md',
  '/pages/about.html': '/content/about.md',
  '/pages/about_team_universe.html': '/content/about.md',
  '/contact': '/content/contact.md',
  '/inquiry': '/content/contact.md',
  '/start': '/content/contact.md',
  '/transformation': '/content/contact.md',
  '/pages/contact.html': '/content/contact.md',
  '/pages/inquiry.html': '/content/contact.md',
  '/privacy': '/content/privacy.md',
  '/pages/privacy.html': '/content/privacy.md',
  '/terms': '/content/terms.md',
  '/pages/terms.html': '/content/terms.md',
  '/services': '/content/services.md',
  '/pages/services_deep_dive.html': '/content/services.md',
  '/portfolio': '/content/portfolio.md',
  '/pages/portfolio_showcase.html': '/content/portfolio.md',
  '/404': '/404.md',
};

export default async function middleware(request) {
  const url = new URL(request.url);
  const acceptHeader = request.headers.get('accept') || '';
  const pathname = url.pathname.replace(/\/$/, '');

  // Only negotiate when client explicitly asks for text/markdown
  if (acceptHeader.includes('text/markdown')) {
    const isKnown = Boolean(MARKDOWN_ROUTES[pathname] || MARKDOWN_ROUTES[pathname + '.html']);
    const targetFile = MARKDOWN_ROUTES[pathname] || MARKDOWN_ROUTES[pathname + '.html'] || '/404.md';

    const targetUrl = new URL(targetFile, request.url);
    try {
      const response = await fetch(targetUrl);
      if (response.ok) {
        const body = await response.text();
        return new Response(body, {
          status: isKnown ? 200 : 404,
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Vary': 'Accept, Accept-Encoding',
            'Cache-Control': isKnown ? 'public, max-age=3600, s-maxage=86400' : 'no-cache, no-store',
            'X-Content-Type-Options': 'nosniff',
          },
        });
      }
    } catch (err) {
      // Fallback
    }
  }

  // Standard passthrough
  return;
}
