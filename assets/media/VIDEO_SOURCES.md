# Editorial moving-image sources

These clips illustrate atmospheres. They are licensed stock footage, **not footage of ONLY YOU WOULD client events**.

## Current footage in the redesign

- After Dark: [Yan Krukau, “People Dancing in a Club”](https://www.pexels.com/video/people-dancing-in-a-club-9003210/). Young adults dance with a DJ in a neon-lit nightclub.
- Stillness: [Mikhail Nilov, “Grandmother and Grandchild Cooking Together”](https://www.pexels.com/video/grandmother-and-grandchild-cooking-together-8308785/). The earlier approved clip is unchanged.
- Off Script: [ROMAN ODINTSOV, “People Riding Horses at the Beach”](https://www.pexels.com/video/people-riding-horses-at-the-beach-7046507/). Aerial footage combines a horseback ride with coastal scenery.

The earlier After Dark and Off Script sources were replaced on the redesign branch. This change affects the films and matching frame posters only; Stillness retained its exact asset files.

[Pexels license](https://www.pexels.com/license/) permits website use and modification. Attribution is voluntary; credits are preserved here. Do not present the people or scenes as clients or completed projects. The films are muted on the website.

Run `bash scripts/build-editorial-films.sh` with curl, ffmpeg and ffprobe to reproduce the preview clips and matching frame posters. The script selects the current sources. An approved one-time GitHub Action committed the two requested replacements; the workflow then returned to read-only permissions.
