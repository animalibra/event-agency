#!/usr/bin/env bash
set -euo pipefail

# Licensed editorial footage, used as atmosphere only. These are not client events.
# Source pages and license are documented in assets/media/VIDEO_SOURCES.md.
repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"
mkdir -p assets/media
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

download() {
  local name="$1" url="$2" fallback="$3"
  if ! curl --fail --location --silent --show-error --retry 2 --max-time 240 "$url" -o "$work/$name.mp4"; then
    curl --fail --location --silent --show-error --retry 2 --max-time 240 "$fallback" -o "$work/$name.mp4"
  fi
  ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=noprint_wrappers=1 "$work/$name.mp4" | grep -q codec_name
}
render() {
  local name="$1" seconds="$2" grade="$3" start="${4:-0.4}" poster="${5:-1.2}"
  ffmpeg -hide_banner -loglevel error -y -ss "$start" -i "$work/$name.mp4" -t "$seconds" \
    -vf "scale=960:-2:flags=lanczos,fps=25,$grade" -an \
    -c:v libx264 -preset medium -crf 25 -pix_fmt yuv420p \
    -movflags +faststart "assets/media/$name-loop.mp4"
  ffmpeg -hide_banner -loglevel error -y -ss "$poster" -i "$work/$name.mp4" -frames:v 1 \
    -vf "scale=1536:-2:flags=lanczos,$grade" -quality 82 \
    "assets/media/$name-film.webp"
  test -s "assets/media/$name-loop.mp4"
  test -s "assets/media/$name-film.webp"
}

download after-dark \
  "https://videos.pexels.com/video-files/9003210/9003210-hd_1920_1080_25fps.mp4" \
  "https://www.pexels.com/download/video/9003210/"
render after-dark 7 "eq=contrast=1.12:saturation=1.06:brightness=-0.025" 2.0 2.8
download stillness \
  "https://videos.pexels.com/video-files/8308785/8308785-hd_1920_1080_25fps.mp4" \
  "https://videos.pexels.com/video-files/8308785/8308785-uhd_3840_2160_25fps.mp4"
render stillness 8 "eq=contrast=0.96:saturation=0.85:brightness=0.025"
download off-script \
  "https://videos.pexels.com/video-files/7046507/7046507-uhd_4096_1974_30fps.mp4" \
  "https://www.pexels.com/download/video/7046507/"
render off-script 8 "eq=contrast=1.02:saturation=0.92:brightness=0.02" 2.0 2.8

du -h assets/media/*-loop.mp4
