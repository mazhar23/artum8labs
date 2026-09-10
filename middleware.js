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
  '/about': '/content/about.md',
  '/about.html': '/content/about.md',
  '/contact': '/content/contact.md',
  '/contact.html': '/content/contact.md',
  '/inquiry': '/content/contact.md',
  '/inquiry.html': '/content/contact.md',
  '/start': '/content/contact.md',
  '/transformation': '/content/contact.md',
  '/privacy': '/content/privacy.md',
  '/privacy.html': '/content/privacy.md',
  '/terms': '/content/terms.md',
  '/terms.html': '/content/terms.md',
  '/services': '/content/services.md',
  '/services.html': '/content/services.md',
  '/services/web-applications-cloud-architecture': '/content/services/web-apps.md',
  '/services/web-applications-cloud-architecture.html': '/content/services/web-apps.md',
  '/services/web-apps': '/content/services/web-apps.md',
  '/services/web-apps.html': '/content/services/web-apps.md',
  '/services/3d-websites-webgl-experiences': '/content/services/3d-webgl.md',
  '/services/3d-websites-webgl-experiences.html': '/content/services/3d-webgl.md',
  '/services/3d-webgl': '/content/services/3d-webgl.md',
  '/services/3d-webgl.html': '/content/services/3d-webgl.md',
  '/services/fintech-solutions-payment-infrastructure': '/content/services/fintech.md',
  '/services/fintech-solutions-payment-infrastructure.html': '/content/services/fintech.md',
  '/services/fintech-solutions': '/content/services/fintech.md',
  '/services/fintech-solutions.html': '/content/services/fintech.md',
  '/services/healthtech-platforms-clinical-portals': '/content/services/healthtech.md',
  '/services/healthtech-platforms-clinical-portals.html': '/content/services/healthtech.md',
  '/services/healthtech-platforms': '/content/services/healthtech.md',
  '/services/healthtech-platforms.html': '/content/services/healthtech.md',
  '/services/seo': '/content/services/seo.md',
  '/services/seo.html': '/content/services/seo.md',
  '/services/aeo': '/content/services/aeo.md',
  '/services/aeo.html': '/content/services/aeo.md',
  '/services/ai-automation': '/content/services/ai-automation.md',
  '/services/ai-automation.html': '/content/services/ai-automation.md',
  '/automations': '/content/automations.md',
  '/automations.html': '/content/automations.md',
  '/a8-automations': '/content/automations.md',
  '/a8-automations.html': '/content/automations.md',
  '/portfolio': '/content/portfolio.md',
  '/portfolio.html': '/content/portfolio.md',
  '/404': '/404.md',
  '/404.html': '/404.md',
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
