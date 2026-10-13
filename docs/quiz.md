# Event personality quiz

The quiz is part of the static GitHub Pages site at `/event-agency/quiz/`. The homepage links to it through a dedicated editorial invitation and navigation item. It uses the same fonts and site header as the rest of ONLY YOU WOULD. No framework, build step, backend, cookie, registration or analytics service is required.

## Source map

- `quiz/index.html`: semantic page shell, introduction, progressive question area, result area and contact links.
- `assets/quiz-data.js`: seven questions, option weights, profile copy, example concepts and media paths.
- `assets/quiz-scoring.js`: deterministic weighted scoring, lead-choice tie break and optional secondary influence.
- `assets/quiz.js`: accessible controls, state, transitions, world-aware film, result rendering, share and mail draft.
- `assets/quiz.css`: responsive editorial composition with styles scoped to `.quiz-*` and three existing visual worlds.
- `tests/quiz-logic.mjs`: validates questions, weights, tie behavior and reachability of all five results.
- `tests/browser-smoke.mjs`: desktop and mobile integration checks in Chromium and WebKit.

The quiz page loads `../assets/site.css` and `../assets/site.js` before its own files. The shared script applies the selected world from session storage. The quiz observes this state and loads only that world's muted hero video. A still image remains visible when video is unavailable, reduced motion is requested, or data saving is active.

## Changing content and images

Edit only `assets/quiz-data.js` to change prompts, outcomes, examples and image paths. Keep each answer's weights mapped to known profiles and rerun `node tests/quiz-logic.mjs`. Image files belong under `assets/media/`; update the relative path in the data file and provide appropriate alt text. Existing stills are AI-generated illustrative concepts and existing hero film frames are licensed editorial footage. Neither represents completed client work. Their provenance is in `docs/media-manifest.md` and `assets/media/VIDEO_SOURCES.md`.

Edit `assets/quiz.css` for color, spacing and motion. The world palettes are set near the top of that file. Edit the email address in `assets/quiz.js` and `quiz/index.html` if the approved contact channel changes. The result CTA opens an email draft with the profile and selected options. The visitor must send that draft from their own mail app; the site does not claim to send it.

The share action creates a URL containing only the public profile slug. It does not expose individual answers. No responses are saved or transmitted automatically. A visitor may skip the quiz and contact Natalia directly.

## Local run and deployment

Run `npm run dev` at the repository root, then open `http://127.0.0.1:4173/quiz/`. GitHub Pages serves the real `quiz/index.html` route without client-side routing. The path also works under the `/event-agency/` repository base because internal asset and page links are relative. `sitemap.xml` includes the new page. The existing CI checks the HTML routes and quiz scoring; the PR browser workflow exercises answers, back navigation, world switching and mobile layout.

