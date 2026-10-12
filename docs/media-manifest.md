# Visual asset manifest — ONLY YOU WOULD

## Current direction and provenance

The three opening worlds now use **muted live-action editorial footage** with first-frame WebP posters. These are licensed stock clips, not completed ONLY YOU WOULD events or AI-generated video. [Source pages, creators and license](../assets/media/VIDEO_SOURCES.md) are recorded alongside the media. After Dark is intentionally dark; Stillness and Off Script are brighter and soft in colour.

The remaining photographic stills are AI-generated **illustrative concepts**. They do not document clients or completed work. There is no generated likeness of Natalia Efimova. The still source PNGs remain in the repository.

| ID | Live asset | Use | Subject and status |
| --- | --- | --- | --- |
| AD-FILM | `after-dark-loop.mp4` and `after-dark-film.webp` | After Dark hero | Older couple dancing at a celebration; licensed editorial footage. |
| ST-FILM | `stillness-loop.mp4` and `stillness-film.webp` | Stillness hero | Grandmother and grandchild preparing food; licensed editorial footage. |
| OS-FILM | `off-script-loop.mp4` and `off-script-film.webp` | Off Script hero | Two people on a sunny countryside road; licensed editorial footage. |
| AD-01 | `after-dark.webp` | After Dark transformation imagery | Dark private celebration; generated concept. |
| ST-01 | `stillness.webp` | Art-direction source | Sunlit family table; generated concept. |
| OS-01 | `off-script.webp` | Off Script transformation imagery | Open Spanish landscape; generated concept. |
| ST-02 | `stillness-chapter.webp` | Available editorial still | Tactile personal objects; generated concept. |
| OS-02 | `off-script-chapter.webp` | Off Script transformation imagery | Architectural threshold and landscape; generated concept. |
| MM-01–03 | `story-atlas.webp` | Stillness transformation and concept story | Recipe, hands making pasta and a shared lunch; generated concepts. |
| CS-01 | `story-atlas.webp` lower right | Second concept story | Film ticket and projector; generated concept. |
| BM-01 | HTML/CSS production board | Behind the magic | Illustrative process, identified as such. |
| FO-01 | Not supplied | Founder | Genuine approved portrait still needed. |

The three MP4 loops are approximately 0.4–1.0 MB each and the film-frame posters 51–109 KB. They are muted H.264 MP4 at 960px width. Only the selected world video loads; the poster remains a fallback when video cannot play, data saving is active, or reduced motion is preferred.

## Generation prompts and exclusions for the conceptual stills

**AD-01:** Candid private celebration in a Madrid interior after dark, adults of different ages caught in expressive believable movement, direct camera flash, warm crimson practical light, rich shadows, 35mm independent fashion magazine photography, asymmetrical frame with copy space. No posed luxury party, writing or logo.

**ST-01:** Older and younger people sharing a quiet gesture at a lived-in family table, sunlit window, worn linen and handmade ceramics, warm cream and muted yellow, high-key editorial realism. No wedding styling, candlelit darkness or plastic skin.

**OS-01:** Adults of different ages moving through an unusual Spanish landscape on a clear day, expansive perspective, pale sky, olive hills and warm earth, sense of discovery rather than tourism. No tourist landmark or dusk.

**ST-02:** Sunlit windowsill with an old postcard without readable writing, handmade paper boat, olive branch, ceramic cup and faded ribbon; warm ivory and taupe, tactile still life, large negative space. No people or wedding objects.

**OS-02:** Architectural threshold with sculptural stair and two small human figures, opening to Spanish hills on a bright day; strong wide perspective, soft stone, sage and pale sky. No resort or landmark.

**MM-01–03 + CS-01:** Four distinct editorial panels: sunlit family recipe with indistinct text; believable older and younger hands making pasta; relaxed intergenerational terrace lunch; film ticket and projector as private-story clues. Natural anatomy and soft daylight; no legible personal data or implied client documentation.

**Shared exclusions:** Artificially perfect faces, extra fingers, distorted objects, impossible architecture, excessive bokeh, generic luxury styling, stock poses, obvious AI symmetry, fake typography, testimonials or client documents.

## Video construction and future film direction

The live-action loops are reproducibly processed from [credited Pexels source clips](../assets/media/VIDEO_SOURCES.md) by `scripts/build-editorial-films.sh`. The source clips are trimmed, graded, muted and compressed. An approved one-time action committed the six outputs to this redesign branch; the workflow has since returned to read-only permissions.

The footage illustrates an atmosphere. It does not show the studio's work. A future commissioned or carefully directed AI film production can replace each loop under the same filename and poster contract:

- After Dark: 6–8 seconds of restrained candid movement and brief flash-lit cuts.
- Stillness: 8–12 seconds of slow daylight movement.
- Off Script: 7–10 seconds of travel or spatial reveal.
- Transformation: optional scroll-synced sequence replacing the current lightweight image-state treatment.

Keep videos muted, loopable, compressed and unnecessary for understanding the content. Never autoplay sound.

## Remaining media work

1. Create intentional 4:5 mobile compositions and responsive image sources; current mobile uses CSS cropping.
2. Review generated details and anatomy at full resolution.
3. Replace the founder placeholder with an approved genuine portrait and add only verified biography.
4. Replace/add documented real projects only when provenance and image permissions exist.
5. Measure real-device visual quality, LCP and data usage before release.
