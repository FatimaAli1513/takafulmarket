#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."

# Load .env (keystore credentials)
if [ -f .env ]; then
  set -a
  source .env
  set +a
fi

if [ -z "$ANDROID_KEYSTORE_PASSWORD" ] || [ -z "$ANDROID_KEY_PASSWORD" ]; then
  echo "Error: .env must define ANDROID_KEYSTORE_PASSWORD and ANDROID_KEY_PASSWORD"
  exit 1
fi

echo "Building release AAB..."
cd android
./gradlew bundleRelease
cd ..

AAB_SRC="android/app/build/outputs/bundle/release/app-release.aab"
AAB_DST="takafulmarket-release.aab"

if [ -f "$AAB_SRC" ]; then
  cp "$AAB_SRC" "$AAB_DST"
  echo "Done. AAB copied to project root: $AAB_DST"
else
  echo "Error: AAB not found at $AAB_SRC"
  exit 1
fi
