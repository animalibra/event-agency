# ONLY YOU WOULD — cinematic editorial redesign

This branch is a proposed replacement for the current GitHub Pages website. It is **not published on the live homepage**. Review and approval are required before merging it into main.

## Run locally

The site is static HTML, CSS and JavaScript with no build step or dependencies. From the repository root, run **npm run dev** and open **http://127.0.0.1:4173/**. The server should support directory indexes for nested pages; GitHub Pages does so after deployment.

## Pages and architecture

- Home — eight-scene homepage, three visual worlds, scroll transformation and optional Event DNA.
- private-events-madrid/ — private celebrations and parties in Madrid.
- destination-celebrations-spain/ — celebrations involving a destination in Spain.
- bespoke-experiences-spain/ — experiences and journeys without a fixed event format.
- about/ — studio positioning and Natalia Efimova.
- contact/ — direct inquiry route.
- assets/site.css — design tokens, layout, responsive and world styles.
- assets/site.js — menu, world switching, progressive concept exercise and motion enhancement.
- docs/redesign-plan.md — audit and implementation plan.
- docs/media-manifest.md — concept asset provenance, prompts and missing production media.

The proposed private parties page was consolidated into private events to avoid a near-duplicate landing page. All page routes are real HTML directories and work under the /event-agency/ GitHub Pages base path. No client-side router or backend is required.

## Content integrity

Current images are AI-generated **conceptual editorial illustrations**. They are not evidence of completed client work. The two story examples and the memory transformation are labelled concept studies. The founder section uses a typographic placeholder; it does not invent Natalia's likeness, client history, reviews or career details. A genuine approved portrait and verified biography are needed before release.

## Interaction

World buttons change hero media, palette and motion without a reload or scroll reset. The selection persists in session storage. The other world posters load only when selected. The first visual remains dark; subsequent visual concepts are bright, soft and deliberately different in mood. Reduced-motion visitors get static images and no scroll reveal animation.

Event DNA has four optional prompts, back/edit controls and a transparent client-side interpretation. It is **not AI**. Answers stay in the current page until the visitor chooses to open an email draft or copy the text. Opening a draft does not send an inquiry. Direct email is always available: nataliaefimova.com@gmail.com.

## Media still needed

The current PNG concept posters require responsive AVIF/WebP exports, mobile art direction, full-resolution visual review and performance measurements. Video loops have **not** been produced. Details and production prompts are in docs/media-manifest.md.

## SEO and deployment

Each page has a unique title, meta description, visible H1, canonical URL, Open Graph metadata and crawlable links. robots.txt, sitemap.xml and 404.html are included. The experimental portrait-preview.html is set to noindex on this branch. Schema uses only factual Organization/Service data.

For a preview, deploy this branch to a separate GitHub Pages repository or other isolated static host with noindex, keeping the current main Pages site intact. Check direct nested page navigation and links under the preview base path. Do **not** change the live Pages branch or merge into main until the owner approves.

## Verification status

Static source checks can validate JavaScript syntax, page structure and file references. Browser, Safari, Lighthouse and real connection tests still need to run. Do not treat the target scores in the brief as measured results. See the delivery notes added before handoff for exact test outcomes and limitations.
