# ONLY YOU WOULD — cinematic editorial redesign

This branch is a proposed replacement for the current GitHub Pages website. It is **not published on the live homepage**. Review and approval are required before merging it into main.

## Run locally

The site is static HTML, CSS and JavaScript with no production build step or runtime dependencies. The self-hosted WOFF2 fonts and optimized media are already included. From the repository root, run **npm run dev** and open **http://127.0.0.1:4173/**. The included server resolves nested directory indexes; GitHub Pages does so after deployment.

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

Most still images are AI-generated **conceptual editorial illustrations**. The three hero films are licensed editorial stock footage, credited in [VIDEO_SOURCES.md](assets/media/VIDEO_SOURCES.md). They are not evidence of completed client work. The two story examples and the memory transformation are labelled concept studies. The founder section uses a typographic placeholder; it does not invent Natalia's likeness, client history, reviews or career details. A genuine approved portrait and verified biography are needed before release.

## Interaction

World buttons change hero media, palette and motion without a reload or scroll reset. The selection persists in session storage. The other world posters load only when selected. The first visual remains dark; subsequent visual concepts are bright, soft and deliberately different in mood. Reduced-motion visitors get static images and no scroll reveal animation.

Event DNA has four optional prompts, back/edit controls and a transparent client-side interpretation. It is **not AI**. Answers stay in the current page until the visitor chooses to open an email draft or copy the text. Opening a draft does not send an inquiry. Direct email is always available: nataliaefimova.com@gmail.com.

## Moving image and remaining media

Three muted live-action hero films and matching WebP frame posters are included on this branch. They show editorial stock footage, **not** ONLY YOU WOULD events. The [source notes](assets/media/VIDEO_SOURCES.md) credit all three committed clips. [build-editorial-films.sh](scripts/build-editorial-films.sh) reproduces the optimized media. After Dark now uses a neon club scene and Off Script a scenic horseback ride; Stillness is unchanged. Only the selected world video loads. Reduced-motion and data-saving visitors see a static poster.

The older AI concept photographs remain in editorial story sections. Commissioned footage, mobile-specific compositions, a genuine founder portrait and full-resolution media review are still needed for a final release.

## SEO and deployment

Each page has a unique title, meta description, visible H1, canonical URL, Open Graph metadata and crawlable links. robots.txt, sitemap.xml and 404.html are included. The experimental portrait-preview.html is set to noindex on this branch. Schema uses only factual Organization/Service data.

For a preview, deploy this branch to a separate GitHub Pages repository or other isolated static host with noindex, keeping the current main Pages site intact. Check direct nested page navigation and links under the preview base path. Do **not** change the live Pages branch or merge into main until the owner approves.

## Verification status

Static source checks validate JavaScript syntax, page structure and file references. GitHub Actions runs source checks and Playwright smoke tests in Chromium and WebKit at desktop and iPhone 13 viewport sizes. The smoke test covers world switching, Event DNA, mobile navigation and width, and all three MP4 responses and playback of the selected film. Four review screenshots are saved in docs/screenshots/. These browser engines are useful proxies, but real iPhone Safari, Lighthouse and field performance have not been measured. Do not treat the target scores in the brief as measured results. See docs/delivery-notes.md for exact outcomes and limitations.
