# Editorial moving-image sources

These clips illustrate atmospheres. They are licensed stock footage, **not footage of ONLY YOU WOULD client events**.

## Currently committed on the redesign branch

- After Dark: [Kampus Production, “Elderly Couple Dancing at a Party”](https://www.pexels.com/video/elderly-couple-dancing-at-a-party-7803494/).
- Stillness: [Mikhail Nilov, “Grandmother and Grandchild Cooking Together”](https://www.pexels.com/video/grandmother-and-grandchild-cooking-together-8308785/).
- Off Script: [Adolph Haben, “Two People Walking Along the Road”](https://www.pexels.com/video/two-people-walking-along-the-road-5924605/).

## Requested replacement footage, built as a read-only preview

- After Dark: [Yan Krukau, “People Dancing in a Club”](https://www.pexels.com/video/people-dancing-in-a-club-9003210/). Young adults dance with a DJ in a neon-lit nightclub.
- Off Script: [ROMAN ODINTSOV, “People Riding Horses at the Beach”](https://www.pexels.com/video/people-riding-horses-at-the-beach-7046507/). Aerial footage combines a visible horseback ride with coastal scenery.

The proposed replacements were built successfully by the [read-only preview workflow](https://github.com/animalibra/event-agency/actions/runs/38300042104). They are not yet committed to the site. Stillness is unchanged.

[Pexels license](https://www.pexels.com/license/) permits website use and modification. Attribution is voluntary; credits are preserved here. Do not present the people or scenes as clients or completed projects. The films are muted on the website.

Run `bash scripts/build-editorial-films.sh` with curl, ffmpeg and ffprobe to reproduce the preview clips and matching frame posters. The script currently selects the proposed After Dark and Off Script sources; the committed MP4 files remain the earlier versions until the replacement is authorized.
