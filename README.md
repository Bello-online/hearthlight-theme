# Hearthlight theme

Shopify theme for **Hearthlight** (`16pepb-3z.myshopify.com`, Canada, CAD). A fork of Shopify Dawn 16.0.0 with a conversion layer and a dark, warm-lit brand applied on top.

Hearthlight sells small, well-made smart-home upgrades that make a house feel finished. Lighting first (motion-sensor cabinet, hallway and wardrobe lights, smart lamps), plus quiet-home essentials (humidifier, air purifier, warming mug). The voice is confident, practical and spec-forward, with no hype and honest delivery estimates: most orders arrive in 8–15 business days; the estimate at checkout is the real one.

## Brand

| Token | Value |
| --- | --- |
| Heading font | Rubik 500 (`rubik_n5`) |
| Body font | Nunito Sans 400 (`nunito_sans_n4`) |
| scheme-1 (default, dark) | background `#0F1419`, text `#F2F4F7`, button `#F5A524`, button label `#0F1419` |
| scheme-2 (dark panel) | background `#161C23`, text `#F2F4F7`, button `#F5A524` |
| scheme-3 (raised panel) | background `#1E2630`, text `#F2F4F7`, button `#F2F4F7` |
| scheme-4 (light band) | background `#F6F5F2`, text `#0F1419`, button `#0F1419` |
| scheme-5 (amber band) | background `#F5A524`, text `#0F1419`, button `#0F1419` |
| Radii | buttons 8, inputs 8, cards 12, media 12 |
| Page width | 1400 px |
| Cart | drawer, scheme-2, free-shipping progress bar at $75 |

All text-on-background pairs above meet WCAG AA (4.5:1 or better). Brand CSS lives in `assets/custom.css` (loaded after `base.css`); everything else is Dawn's own CSS driven by `config/settings_data.json`.

## What is in the theme

Dawn 16.0.0, unchanged, plus:

**Conversion layer (shared, reusable)**

- `sections/trust-bar.liquid`: icon, heading and one line of text per item, 2–6 items.
- `sections/testimonials.liquid`: star rating, title, quote, author, optional "Verified buyer" tag, 2–4 columns.
- `sections/comparison-table.liquid`: us-versus-them feature rows with check marks or short text.
- `sections/stats-strip.liquid`: up to four large value/label pairs.
- `snippets/sticky-atc.liquid` + `assets/sticky-atc.js/.css`: sticky add-to-cart bar on product pages (Theme settings → Conversion).
- `snippets/free-shipping-bar.liquid`: progress bar in the cart drawer (Theme settings → Conversion).
- `assets/cro.css`: styles for the above.

**Hearthlight build**

- `config/settings_data.json`: colour schemes, fonts, radii, cart drawer, predictive search, footer brand copy, conversion settings. Preset is named `Hearthlight`.
- `sections/header-group.json`: amber announcement bar, sticky header, `main-menu`.
- `sections/footer-group.json`: brand block, footer menu, help links, newsletter, payment icons, policy links.
- `templates/index.json`: hero → trust bar → best sellers → "Why it works" → featured sensor lamp → shop by room → stats → testimonials → comparison → FAQ → newsletter.
- `templates/product.json`: eyebrow, title, price, variant buttons, quantity, buy buttons with dynamic checkout, three trust icons, description, Specs / What's in the box / Shipping & returns tabs, share; then related products, testimonials, trust bar.
- `templates/collection.json`: banner with description, 3-column grid with vertical filters and quick add, trust bar.
- `templates/page.json`: page content plus trust bar.
- `assets/custom.css`: amber button glow, 2 px card lift, translucent hero box, tighter headings, 48 px buy buttons, badge styling, visible focus ring, reduced-motion fallbacks.
- `.github/workflows/theme-check.yml`: `shopify/theme-check-action@v2` on every push and pull request to `main`, failing on errors.

## Local development

Requires Shopify CLI 3.x or later and a staff or collaborator login on the store.

```sh
shopify theme dev --store 16pepb-3z.myshopify.com
```

Before committing:

```sh
shopify theme check --fail-level error
```

## Connecting to the store

1. Shopify admin → **Online Store → Themes → Add theme → Connect from GitHub**.
2. Authorise the `Bello-online` GitHub account if prompted, pick the `hearthlight-theme` repository and the `main` branch.
3. Shopify imports the branch as an unpublished theme and keeps it in sync: every commit to `main` updates the theme, and changes saved in the theme editor are committed back to `main`.
4. Preview, then **Publish** when the content below is in place.

Alternatively, download the repository as a zip and use **Add theme → Upload zip file**.

## What the merchant still needs to add

The theme ships with structure and copy, not media. Before publishing:

- **Logo** (Theme settings → Logo) and a favicon. Aim for a light-coloured mark that reads on `#0F1419`.
- **Hero image** for the homepage banner (Sections → Image banner): a lifestyle shot of a lit hallway or under-cabinet run, dark and warm to match the palette. The text box is translucent, so mid-tone images work best.
- **Collection images** for Kitchen, Cleaning, Organization and Comfort so "Shop by room" has something to show.
- **Product photos on dark backgrounds**, consistent across products, and the real photos for the sensor lamp's colour and length variants.
- **Real specs** in the product template's "Specs" tab: the bracketed rows (battery capacity, charge time, sensor range, lumens) are placeholders to replace with the supplier's figures.
- **Real testimonials.** The three quotes on the homepage and product page are placeholder copy written to show the layout. Replace them with real customer reviews before publishing, and only tick "Verified" for people who bought through the store.
- **Menus and pages** already referenced: `main-menu`, `footer`, `how-we-choose`, `track-order`, `contact`. Fill in the page bodies.
- **Shipping and policy pages** in Shopify settings so the footer policy links resolve, and a shipping rate that is free at $75 so the cart-drawer bar and the announcement bar match what checkout charges.

## Licence

Dawn is released under the MIT licence; see `LICENSE.md`. Hearthlight-specific files follow the same licence.

## Custom sections (Hearthlight-specific)

Hand-coded sections with their own markup and CSS. Each has a preset so it appears under "Add section" in the theme editor.

- **Hearthlight hero** (`sections/hearthlight-hero.liquid`): full-bleed cinematic image with a scheme-aware gradient overlay, eyebrow, headline, one-line paragraph, two buttons and a row of spec chips (blocks: `chip` with an inline icon and label). Settings include `image`, optional `mobile_image`, `overlay_strength`, `content_position` and colour scheme. Icons are drawn by `snippets/icon-hearthlight.liquid`.
- **Spec sheet** (`sections/spec-sheet.liquid`): product-page technical grid rendered as a `<dl>` of cards (blocks: `spec` with icon, label, value, note) plus an optional "What's in the box" checklist. If a product has no spec blocks and a `custom.specs` rich-text metafield, that metafield renders instead, so specs can be filled per product in the admin.
- **Room scenes** (`sections/room-scenes.liquid` + `assets/room-scenes.js`): horizontal scroll-snap strip of room cards (blocks: `scene` with image, room label, heading, text, link). Prev/next buttons scroll one card at a time; keyboard accessible; respects reduced motion.

The homepage uses the hero and room scenes (hallway and kitchen images from Files, wardrobe on a placeholder until a photo is added). The product template adds the spec sheet directly under the product with bracketed placeholder values that must be replaced with real figures.
