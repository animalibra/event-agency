# Cinematic editorial redesign — implementation plan

## Audit of main (11 October 2026)
- Static HTML, CSS, and vanilla JavaScript, published by GitHub Pages from main at repository root. Relative paths already support the /event-agency/ base path.
- Current site has a bold voice, one working photo interaction, a browser-only guided inquiry, and a direct email fallback. These are useful behavioral references.
- Main repeats a card/grid rhythm, uses collage sprites as final imagery, has limited search metadata, and has no sitemap, robots file, or dedicated service pages.
- portrait-preview.html explores an editorial direction and three atmosphere selectors, but is a single inline-code prototype. Its canonical points to itself and it is currently indexable on main; it is a reference, not production code.
- No verified project case studies, founder portrait, testimonials, video, or measured performance data are available. Concept work must be labelled.

## Architecture
Keep a static, progressively enhanced site. Real HTML files in directories give direct navigation on GitHub Pages and crawlable content without a framework or router. Shared CSS and JavaScript hold design tokens, world behavior, motion, navigation, and Event DNA. Content and SEO metadata are authored per page. No backend is required.

Implement homepage plus distinct pages for private events in Madrid, destination celebrations in Spain, bespoke experiences in Spain, About, and Contact. Private parties in Madrid belongs within the private-events page until there is enough unique content for a separate route.

## Creative system
- Core: deep charcoal, warm paper, tactile editorial rules, expressive display sans and readable editorial body.
- After Dark: near-black, crimson, flash white, short image cuts.
- Stillness: ivory, brown, muted gold, slower dissolves.
- Off Script: forest, blue-gray, earth, spatial reveals.
- World switch changes the hero, palette, image treatment, typography emphasis, and transition rhythm without reloading or moving scroll. The choice persists for the session.
- Each of the eight homepage scenes has a different composition and density. Motion always has a static and reduced-motion path.

## Eight-scene homepage
1. Invitation: service and geography visible in HTML, cinematic slogan, two CTAs, prominent world switch.
2. Manifesto: large editorial typography and intentional pause.
3. Transformation: labelled illustrative memory-to-experience sequence, scroll progress without trapping.
4. Worlds: immersive atmosphere chapters, not service packages.
5. Stories: clearly labelled concept studies, no invented clients or results.
6. Behind the magic: illustrative production notes and factual process.
7. Natalia: founder-led, no invented credentials or fictional portrait.
8. Event DNA: optional progressive questions, transparent rule-based interpretation, editable answers, mailto and copy fallback.

## Media direction
Create a new coherent media set, with a manifest describing every asset and production prompt. Prefer still image sequences and light CSS motion for the first version. Video loops remain planned assets until generated, optimized, and tested; do not present them as delivered. New imagery is conceptual and never a claim of completed client work.

## SEO and quality
Unique visible H1 and page titles; canonical links, Open Graph, Organization and factual Service schema; robots.txt and sitemap.xml; semantic links and accessible controls. The prototype receives noindex in the redesign branch. Test nested routes, keyboard operation, reduced motion, mobile layout, image loading, and contact flow. Report measured performance only after a real audit.

## Release safety
All work stays on redesign/cinematic-editorial. Do not merge to main. Review the branch and preview before production release. Keep existing assets and main history for rollback.
