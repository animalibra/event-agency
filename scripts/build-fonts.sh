#!/usr/bin/env bash
set -euo pipefail
npm install --no-save @fontsource-variable/space-grotesk@5.3.0 @fontsource/instrument-serif@5.3.0
mkdir -p assets/fonts
cp node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2 assets/fonts/space-grotesk-latin-variable.woff2
cp node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2 assets/fonts/instrument-serif-latin-normal.woff2
cp node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2 assets/fonts/instrument-serif-latin-italic.woff2
cp node_modules/@fontsource-variable/space-grotesk/LICENSE assets/fonts/LICENSE-space-grotesk.txt
cp node_modules/@fontsource/instrument-serif/LICENSE assets/fonts/LICENSE-instrument-serif.txt
