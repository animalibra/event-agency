#!/usr/bin/env bash
set -euo pipefail
mkdir -p assets/media
for name in after-dark stillness off-script stillness-chapter off-script-chapter story-atlas; do
  ffmpeg -hide_banner -loglevel error -y -i "assets/media/${name}.png" -vf "scale=1280:-2" -frames:v 1 -c:v libwebp -q:v 82 "assets/media/${name}.webp"
done
ffmpeg -hide_banner -loglevel error -y -loop 1 -framerate 24 -i assets/media/after-dark.png \
  -vf "scale=1400:900:force_original_aspect_ratio=increase,crop=1400:900,zoompan=z='min(zoom+0.0005,1.08)':d=1:s=1280x720:fps=24,format=yuv420p" \
  -t 7 -an -c:v libx264 -preset veryfast -crf 30 -movflags +faststart assets/media/after-dark-loop.mp4
ffmpeg -hide_banner -loglevel error -y -loop 1 -framerate 24 -i assets/media/stillness.png \
  -vf "scale=1400:900:force_original_aspect_ratio=increase,crop=1400:900,zoompan=z='min(zoom+0.0002,1.05)':d=1:s=1280x720:fps=24,format=yuv420p" \
  -t 10 -an -c:v libx264 -preset veryfast -crf 30 -movflags +faststart assets/media/stillness-loop.mp4
ffmpeg -hide_banner -loglevel error -y -loop 1 -framerate 24 -i assets/media/off-script.png \
  -vf "scale=1400:900:force_original_aspect_ratio=increase,crop=1400:900,zoompan=z='1.06':x='min(on*1.3,iw-iw/zoom)':y='ih/2-(ih/zoom/2)':d=1:s=1280x720:fps=24,format=yuv420p" \
  -t 9 -an -c:v libx264 -preset veryfast -crf 30 -movflags +faststart assets/media/off-script-loop.mp4
