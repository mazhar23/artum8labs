/**
 * Automated Verification Suite for Agent Compliance, Content & SEO Standards
 */

const fs = require('fs');
const path = require('path');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
    totalTests++;
    if (condition) {
        passedTests++;
        console.log(`  \x1b[32m✓\x1b[0m ${message}`);
    } else {
        failedTests++;
        console.error(`  \x1b[31m✗ FAIL:\x1b[0m ${message}`);
    }
}

console.log('\n======================================================================');
console.log('🧪 RUNNING VERIFICATION SUITE: AGENT & SEO COMPLIANCE');
console.log('======================================================================\n');

// 1. Content Without JavaScript (index.html)
console.log('1. Testing Content Without JavaScript:');
const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const textWithoutTags = indexHtml.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                                .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                                .replace(/<[^>]+>/g, ' ')
                                .replace(/\s+/g, ' ')
                                .trim();

assert(textWithoutTags.length >= 500, `Homepage raw text content is ${textWithoutTags.length} chars (>= 500 required)`);

const h1Matches = indexHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
assert(h1Matches.length === 1, `Homepage has exactly 1 H1 heading (found: ${h1Matches.length})`);
assert(!indexHtml.includes('window.location.href = \'pages/homepage.html\''), 'Homepage does not contain JS redirect stub');
assert(!indexHtml.includes('http-equiv="refresh"'), 'Homepage does not contain meta-refresh redirect');

// 2. Agent-Friendly 404s
console.log('\n2. Testing Agent-Friendly 404s:');
const has404Html = fs.existsSync(path.join(__dirname, '../404.html'));
assert(has404Html, '404.html exists at project root');

if (has404Html) {
    const content404 = fs.readFileSync(path.join(__dirname, '../404.html'), 'utf8');
    assert(content404.includes('sitemap.xml'), '404.html links to sitemap.xml');
    assert(content404.includes('llms.txt'), '404.html links to llms.txt');
    assert(content404.includes('404'), '404.html contains 404 status indicator');
}

const vercelJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../vercel.json'), 'utf8'));
const hasCatchAllSpaRoute = (vercelJson.routes || []).some(r => r.src === '/(.*)' && r.dest === '/index.html');
assert(!hasCatchAllSpaRoute, 'vercel.json does not use SPA catch-all route (avoids soft-404s)');

// 3. Redirect Hygiene
console.log('\n3. Testing Redirect Hygiene:');
assert(fs.existsSync(path.join(__dirname, '../index.html')), 'Root index.html is served directly with 200 OK');
assert(vercelJson.rewrites && vercelJson.rewrites.length > 0, 'Clean rewrites configured in vercel.json');

// 4. Markdown Content Negotiation (acceptmarkdown.com)
console.log('\n4. Testing Markdown Content Negotiation:');
const globalHeaders = (vercelJson.headers || []).find(h => h.source === '/(.*)');
const varyHeader = (globalHeaders?.headers || []).find(h => h.key === 'Vary');
assert(varyHeader && varyHeader.value.includes('Accept'), 'Global Vary header includes "Accept" (acceptmarkdown.com compliant)');

const mdFiles = [
    'index.md',
    'llms.txt',
    'llms-full.txt',
    'content/about.md',
    'content/contact.md',
    'content/privacy.md',
    'content/terms.md',
    'content/services.md',
    'content/services/web-apps.md',
    'content/services/3d-webgl.md',
    'content/services/fintech.md',
    'content/services/healthtech.md',
    'content/services/seo.md',
    'content/services/aeo.md',
    'content/services/ai-automation.md',
    'content/automations.md',
    'content/portfolio.md',
    '404.md'
];

mdFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    const exists = fs.existsSync(filePath);
    const size = exists ? fs.statSync(filePath).size : 0;
    assert(exists && size > 100, `Markdown file ${file} exists and is populated (${size} bytes)`);
});

// Testing Individual Service HTML Pages
console.log('\n4b. Testing Service HTML Pages:');
const serviceHtmlPages = [
    'services/web-applications-cloud-architecture.html',
    'services/3d-websites-webgl-experiences.html',
    'services/fintech-solutions-payment-infrastructure.html',
    'services/healthtech-platforms-clinical-portals.html',
    'services/seo.html',
    'services/aeo.html',
    'services/ai-automation.html',
    'automations.html'
];

serviceHtmlPages.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    const exists = fs.existsSync(filePath);
    if (exists) {
        const content = fs.readFileSync(filePath, 'utf8');
        assert(content.length >= 1000, `Service page ${file} content length is ${content.length} chars (>= 1000 required)`);
        assert(content.includes('application/ld+json'), `Service page ${file} includes JSON-LD structured data`);
        assert(content.includes('<h1'), `Service page ${file} has an H1 heading`);
    } else {
        assert(false, `Service page ${file} exists`);
    }
});

assert(fs.existsSync(path.join(__dirname, '../middleware.js')), 'middleware.js exists for Edge content negotiation');

// 5. Agent Instructions / When-To-Use
console.log('\n5. Testing Agent Instructions / When-to-Use Guidance:');
const llmsTxt = fs.readFileSync(path.join(__dirname, '../llms.txt'), 'utf8');
assert(llmsTxt.toLowerCase().includes('when to use'), 'llms.txt contains "When to Use" guidance');
assert(llmsTxt.toLowerCase().includes('when not to use') || llmsTxt.toLowerCase().includes('out of scope'), 'llms.txt contains "When NOT to Use" guidance');
assert(llmsTxt.includes('mazharkhan@programmer.net'), 'llms.txt contains primary engineering contact');

assert(fs.existsSync(path.join(__dirname, '../.well-known/agent-instructions.txt')), '.well-known/agent-instructions.txt exists');

// 6. Trust Anchor Pages
console.log('\n6. Testing Trust Anchor Pages (About, Contact, Privacy, Terms):');
const trustPages = [
    { file: 'about.html', name: 'About' },
    { file: 'contact.html', name: 'Contact' },
    { file: 'privacy.html', name: 'Privacy' },
    { file: 'terms.html', name: 'Terms' }
];

trustPages.forEach(tp => {
    const filePath = path.join(__dirname, '..', tp.file);
    assert(fs.existsSync(filePath), `${tp.name} page exists (${tp.file})`);
    if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8');
        const text = raw.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                        .replace(/<[^>]+>/g, ' ')
                        .replace(/\s+/g, ' ')
                        .trim();
        assert(text.length >= 500, `${tp.name} page raw content length is ${text.length} chars (>= 500 required)`);
    }
});

// 7 & 8. JSON-LD Structured Data & Organization Completeness
console.log('\n7 & 8. Testing JSON-LD Structured Data & Organization Completeness:');
const jsonLdMatch = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
assert(jsonLdMatch !== null, 'Homepage contains JSON-LD structured data script');

if (jsonLdMatch) {
    try {
        const parsed = JSON.parse(jsonLdMatch[1]);
        const org = (parsed['@graph'] || [parsed]).find(item => 
            (Array.isArray(item['@type']) && item['@type'].includes('Organization')) || 
            item['@type'] === 'Organization' ||
            item['@type'] === 'ProfessionalService'
        );

        assert(org !== undefined, 'JSON-LD contains Organization / ProfessionalService type');
        assert(org.name === 'Artum8 Labs', 'JSON-LD Organization has valid name');
        assert(org.description && org.description.length > 20, 'JSON-LD Organization has descriptive description');
        assert(org.url === 'https://www.artum8labs.com/', 'JSON-LD Organization has valid URL');
        assert(org.address && org.address['@type'] === 'PostalAddress', 'JSON-LD Organization has PostalAddress');
        assert(Array.isArray(org.contactPoint) && org.contactPoint.length > 0, 'JSON-LD Organization has contactPoint array');
        
        if (org.contactPoint && org.contactPoint.length > 0) {
            const cp = org.contactPoint[0];
            assert(cp.telephone && cp.email && cp.contactType, 'contactPoint has telephone, email, and contactType');
        }

        assert(org.founder && org.founder.name === 'Mazhar Khan', 'JSON-LD Organization includes Founder details');

        // Self-serving review markup (Google policy) must NOT be present
        assert(org.aggregateRating === undefined, 'JSON-LD Organization omits self-serving AggregateRating');
        assert(org.review === undefined || org.review.length === 0, 'JSON-LD Organization omits self-serving Review nodes');

        const graph = parsed['@graph'] || [parsed];

        // Standalone Service nodes
        const services = graph.filter(item => item['@type'] === 'Service');
        assert(services.length >= 4, `JSON-LD @graph contains at least 4 standalone Service nodes (found ${services.length})`);
        services.forEach((svc, i) => {
            assert(svc.name && svc.description, `Service[${i}] has name and description`);
            assert(svc.provider && svc.provider['@id'], `Service[${i}] has linked provider`);
        });

        // FAQPage node
        const faq = graph.find(item => item['@type'] === 'FAQPage');
        assert(faq !== undefined, 'JSON-LD @graph contains FAQPage node');
        assert(Array.isArray(faq.mainEntity) && faq.mainEntity.length >= 3, `FAQPage has at least 3 Q&A entries (found ${faq.mainEntity ? faq.mainEntity.length : 0})`);
        faq.mainEntity.forEach((qa, i) => {
            assert(qa['@type'] === 'Question' && qa.acceptedAnswer, `FAQ entry[${i}] is a Question with acceptedAnswer`);
        });

        // BreadcrumbList node
        const breadcrumb = graph.find(item => item['@type'] === 'BreadcrumbList');
        assert(breadcrumb !== undefined, 'JSON-LD @graph contains BreadcrumbList node');
        assert(Array.isArray(breadcrumb.itemListElement) && breadcrumb.itemListElement.length >= 3, `BreadcrumbList has at least 3 items (found ${breadcrumb.itemListElement ? breadcrumb.itemListElement.length : 0})`);
        breadcrumb.itemListElement.forEach((item, i) => {
            assert(item['@type'] === 'ListItem' && item.position && item.name && item.item, `BreadcrumbList item[${i}] has position, name, and item URL`);
        });

    } catch (e) {
        assert(false, `JSON-LD parsing error: ${e.message}`);
    }
}

// Summary
console.log('\n======================================================================');
console.log(`📊 TEST SUMMARY: ${passedTests} passed, ${failedTests} failed out of ${totalTests} total tests.`);
console.log('======================================================================\n');

if (failedTests > 0) {
    process.exit(1);
} else {
    console.log('🎉 ALL COMPLIANCE AND SEO TESTS PASSED SUCCESSFULLY!\n');
}
