# Delivery notes — cinematic editorial redesign

## Review state

This redesign lives on `redesign/cinematic-editorial`. The live GitHub Pages site still serves `main`; the redesign has not been merged or published to production. Review the branch, the four browser screenshots in `docs/screenshots/`, and the [commit-pinned interactive preview](https://rawcdn.githack.com/animalibra/event-agency/af3880f2c23afdc0b095121febb0f740a72dc491/index.html). The preview is separate from the live GitHub Pages site.

## Implemented

- Eight-scene English homepage with editorial hierarchy and direct inquiry route.
- Three distinct worlds: dark, flash-lit After Dark; sunny, intimate Stillness; sunny, expansive Off Script. The world switch changes media, palette and motion in place without resetting scroll; selection persists for the session.
- Three muted live-action MP4 hero loops with matching WebP frame posters and reduced-motion/data-saving fallback. These are [credited licensed editorial clips](../assets/media/VIDEO_SOURCES.md), not documentary films of studio events.
- Responsive mobile layout, self-hosted fonts, keyboard controls, visible focus and reduced-motion alternatives.
- Illustrative detail-to-experience transformation, two clearly labelled concept studies, illustrative production process, founder section with a typographic portrait placeholder, optional four-step Event DNA and direct email.
- Distinct static service, about and contact pages, plus crawlable internal links, metadata, sitemap, robots, canonical URLs and factual structured data.

## Verification

- `Verify redesign` GitHub Action runs JavaScript syntax and static structure/reference checks.
- `Browser smoke test` GitHub Action runs Playwright Chromium and WebKit at desktop and iPhone 13 viewport sizes. It checks the three world states and no scroll reset, three distinct transformation stories, prominent first-screen switcher, Event DNA progression/back/edit, mobile navigation and horizontal overflow, direct contact navigation, browser errors, all three MP4 responses and selected-film playback.
- Latest browser pass with live-action films: [run 38299239831](https://github.com/animalibra/event-agency/actions/runs/38299239831). The test confirms that the selector appears in the first screen on desktop and mobile.
- Four low-weight screenshots are committed in `docs/screenshots/` for visual review.

These are headless engine and viewport checks. Real iPhone Safari, Android Chrome, slow-network behavior, screen-reader usability and Lighthouse/Core Web Vitals have **not** been measured. The performance and accessibility targets in the brief are goals, not achieved scores.

## Before production release

1. Approve a genuine founder portrait and verified short biography.
2. Review generated media at full resolution, including anatomy and artifacts; create separate mobile compositions if the final crop needs them.
3. Replace illustrative studies with documented work only after verifying provenance and permissions. Keep concept-study labels until then.
4. Test on physical phones and slow connections; run Lighthouse and correct measured regressions.
5. Configure a controlled `noindex` preview host before wider public review. Then review contact and SEO behavior under the actual `/event-agency/` base path.
6. Merge only after owner approval.
