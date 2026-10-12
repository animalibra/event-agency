# Delivery notes — cinematic editorial redesign

## Review state

This redesign lives on `redesign/cinematic-editorial`. The live GitHub Pages site still serves `main`; the redesign has not been merged or published to production. Review the branch and the four browser screenshots in `docs/screenshots/`. An isolated hosted preview has not been configured, so there is no public interactive preview URL yet.

## Implemented

- Eight-scene English homepage with editorial hierarchy and direct inquiry route.
- Three distinct worlds: dark, flash-lit After Dark; sunny, intimate Stillness; sunny, expansive Off Script. The world switch changes media, palette and motion in place without resetting scroll; selection persists for the session.
- Three muted, small MP4 hero loops with WebP posters and reduced-motion/data-saving fallback. These are camera-motion treatments of generated conceptual stills, not documentary event films.
- Responsive mobile layout, self-hosted fonts, keyboard controls, visible focus and reduced-motion alternatives.
- Illustrative detail-to-experience transformation, two clearly labelled concept studies, illustrative production process, founder section with a typographic portrait placeholder, optional four-step Event DNA and direct email.
- Distinct static service, about and contact pages, plus crawlable internal links, metadata, sitemap, robots, canonical URLs and factual structured data.

## Verification

- `Verify redesign` GitHub Action runs JavaScript syntax and static structure/reference checks.
- `Browser smoke test` GitHub Action runs Playwright Chromium and WebKit at desktop and iPhone 13 viewport sizes. It checks the three world states and no scroll reset, Event DNA progression/back/edit, mobile navigation and horizontal overflow, direct contact navigation, browser errors, and MP4 response/content type.
- Latest completed browser pass before the final mobile spacing refinement: [run 38219034424](https://github.com/animalibra/event-agency/actions/runs/38219034424). The revised layout will be checked in a subsequent run.
- Four low-weight screenshots are committed in `docs/screenshots/` for visual review.

These are headless engine and viewport checks. Real iPhone Safari, Android Chrome, slow-network behavior, screen-reader usability and Lighthouse/Core Web Vitals have **not** been measured. The performance and accessibility targets in the brief are goals, not achieved scores.

## Before production release

1. Approve a genuine founder portrait and verified short biography.
2. Review generated media at full resolution, including anatomy and artifacts; create separate mobile compositions if the final crop needs them.
3. Replace illustrative studies with documented work only after verifying provenance and permissions. Keep concept-study labels until then.
4. Test on physical phones and slow connections; run Lighthouse and correct measured regressions.
5. Configure an isolated, `noindex` preview if a public interactive review is required. Then review contact and SEO behavior under the actual `/event-agency/` base path.
6. Merge only after owner approval.
