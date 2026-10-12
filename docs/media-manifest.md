# Visual asset manifest — ONLY YOU WOULD

## Current direction and provenance

The first **After Dark** image is intentionally dark and energetic. All other photographic images are sunny, soft in colour and different in mood: Stillness is tactile and intimate; Off Script is open and exploratory; the story sequence is nostalgic and social. The homepage does not repeat the first photograph in the world chapters.

All photographs are AI-generated **editorial concepts**. They do not document completed client work. There is no generated likeness of Natalia Efimova. Source PNGs remain in the repository; the website serves optimized WebP posters. The muted MP4 loops are motion treatments of the concept photographs, **not** AI-generated footage of real events.

| ID | Live asset / source | Scene | Subject and composition | Light, colour and movement | Alt / status |
| --- | --- | --- | --- | --- | --- |
| AD-01 | assets/media/after-dark.webp / .png | First hero, After Dark | Mixed-age guests in a candid private celebration, wide image with copy space | Direct flash, crimson practical light, dark shadows; seven-second edited motion loop | Conceptual editorial celebration scene. |
| ST-01 | assets/media/stillness.webp / .png | Stillness hero, selected on demand | Older woman sharing a quiet personal gesture at a family table | Gentle sunlight, cream, warm yellow and soft taupe; ten-second slow motion loop | Conceptual sunlit family table. |
| OS-01 | assets/media/off-script.webp / .png | Off Script hero, selected on demand | Age-diverse small group in a Spanish landscape | Clear sunshine, pale sky, sage and earth; nine-second horizontal motion loop | Conceptual sunlit journey. |
| ST-02 | assets/media/stillness-chapter.webp / .png | Stillness chapter | Postcard, paper boat, ceramic cup and olive branch on a windowsill; no person | Soft golden daylight, intimate still life | Conceptual sunlit personal objects. |
| OS-02 | assets/media/off-script-chapter.webp / .png | Off Script chapter | Two people small in frame at an architectural threshold overlooking a landscape | Bright sunshine, light stone and muted blue; broad perspective | Conceptual place of discovery. |
| MM-01 | assets/media/story-atlas.webp / upper left | Transformation, memory | Handwritten recipe, overhead detail | Warm daylight | Generated illustrative concept. |
| MM-02 | assets/media/story-atlas.webp / upper right | Transformation, gesture | Older and younger hands preparing pasta | Soft window light | Generated illustrative concept. |
| MM-03 | assets/media/story-atlas.webp / lower left | Transformation and first story | Different generations sharing a Madrid terrace lunch | Bright sunlight, sociable warmth | Generated illustrative concept. |
| CS-01 | assets/media/story-atlas.webp / lower right | Second story | Film ticket and projector as clues to a reunion | Sunlit playful still life | Generated illustrative concept. |
| BM-01 | HTML/CSS production board | Behind the magic | Illustrative production framework and timeline | Warm paper, lines and typography | Clearly labelled illustrative studio process. |
| FO-01 | Not supplied | Founder | Genuine approved portrait of Natalia Efimova | Natural editorial portrait | Missing; typographic placeholder in site. |

Live image resolution is 1280px wide. The source PNGs are 1536×1024. The WebP files are approximately 79–212 KB each. Homepage world videos are approximately 49–154 KB each at 1280×720, muted H.264 MP4. The default world poster loads first; other hero media is requested when selected. Motion is disabled under reduced-motion preferences and the poster remains the fallback if video fails or data saving is active.

## Generation prompts and exclusions

**AD-01:** Candid private celebration in a Madrid interior after dark, adults of different ages caught in expressive believable movement, direct camera flash, warm crimson practical light, rich shadows, 35mm independent fashion magazine photography, asymmetrical frame with copy space. No posed luxury party, writing or logo.

**ST-01:** Older and younger people sharing a quiet gesture at a lived-in family table, sunlit window, worn linen and handmade ceramics, warm cream and muted yellow, high-key editorial realism. No wedding styling, candlelit darkness or plastic skin.

**OS-01:** Adults of different ages moving through an unusual Spanish landscape on a clear day, expansive perspective, pale sky, olive hills and warm earth, sense of discovery rather than tourism. No tourist landmark or dusk.

**ST-02:** Sunlit windowsill with an old postcard without readable writing, handmade paper boat, olive branch, ceramic cup and faded ribbon; warm ivory and taupe, tactile still life, large negative space. No people or wedding objects.

**OS-02:** Architectural threshold with sculptural stair and two small human figures, opening to Spanish hills on a bright day; strong wide perspective, soft stone, sage and pale sky. No resort or landmark.

**MM-01–03 + CS-01:** Four distinct editorial panels: sunlit family recipe with indistinct text; believable older and younger hands making pasta; relaxed intergenerational terrace lunch; film ticket and projector as private-story clues. Natural anatomy and soft daylight; no legible personal data or implied client documentation.

**Shared exclusions:** Artificially perfect faces, extra fingers, distorted objects, impossible architecture, excessive bokeh, generic luxury styling, stock poses, obvious AI symmetry, fake typography, testimonials or client documents.

## Video construction and future film direction

The three delivered MP4 loops are reproducibly rendered from the hero posters by scripts/render-media.sh in the dedicated branch. They use slow framing motion and no soundtrack. This provides actual video in the site while keeping a static fallback and small transfer size. It is an interim film treatment; no camera-shot or AI-generated moving scene was available.

A future filmed or AI-generated media production can replace each loop using the same filename and poster contract:

- After Dark: 6–8 seconds of restrained candid movement and brief flash-lit cuts.
- Stillness: 8–12 seconds of very slow daylight camera movement.
- Off Script: 7–10 seconds of a landscape or spatial reveal.
- Transformation: optional scroll-synced short sequence replacing the current lightweight image-state treatment.

Keep all videos muted, loopable, compressed and unnecessary for understanding the content. Never autoplay sound.

## Remaining media work

1. Create intentional 4:5 mobile compositions and responsive image sources; current mobile uses CSS cropping.
2. Review generated details and anatomy at full resolution.
3. Replace the founder placeholder with an approved genuine portrait and add only verified biography.
4. Replace/add documented real projects only when provenance and image permissions exist.
5. Measure real-device visual quality, LCP and data usage before release.
