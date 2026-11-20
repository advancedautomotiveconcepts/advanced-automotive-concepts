# Advanced Automotive Concepts website

Static site for https://advancedautomotiveconcepts.net, hosted on Netlify. Plain HTML,
one stylesheet and one script; no build step. Netlify publishes the branch it watches.

## Pages
| File | Purpose |
|---|---|
| `index.html` | Dealer home: F&I pitch, gross calculator, dealer FAQ |
| `bicycle-gps.html` | Product page for the Safelink Bicycle GPS (GLS11): gallery, buy box, specs, comparison, rider FAQ |
| `lineup.html` | Shop: the full lineup, dealer programs and coming-soon products |
| `platform.html` | Dealer dashboard |
| `product.html` | GForce vehicle hardware |
| `contact.html` | Inquiry form (short for riders, full for dealers) |
| `shipping-returns.html`, `privacy.html` | Policies |
| `thank-you.html` | Order confirmation (not indexed) |
| `404.html` | Not-found page (Netlify serves it automatically) |

## The two switches (top of `assets/js/main.js`)
- `checkoutUrl`: Shopify or Stripe product link. Set: order buttons read "Buy now".
- `bookingUrl`: Microsoft Bookings link. Set: the contact page shows a calendar button.

## Search and AI visibility
- `sitemap.xml`, `robots.txt`, `llms.txt` (a plain summary for AI assistants).
- Structured data: Organization, WebSite and FAQPage on the home page; Product, BreadcrumbList
  and FAQPage on the product page. Keep the FAQ text on the page and in the JSON-LD identical.

## Brand
- Type: Barlow Condensed (headings), Barlow (body), Barlow Semi Condensed (labels).
- Color: charcoal `#1B1D21`, red `#A31E2C` / `#C7273A`, steel `#52565E`, cool gray `#F2F3F4`.
- Icon set: `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `assets/img/icon-*.png`.

## Copy rules
Spell it "Safelink". AAC is the agent, not the manufacturer. Use only facts Safelink has
confirmed in writing: no invented recovery rates, testimonials, prices or fit sizes.

## Quality checks used before every release
- `[hidden]` always wins over component `display` rules (see the top of `style.css`).
- HTML validated with html-validate; accessibility scanned with axe (WCAG 2.1 AA) at
  1280px and 390px; Lighthouse mobile run on the main pages.
- Images are WebP with 640w and 1100w versions; the JPEGs stay for social previews.
