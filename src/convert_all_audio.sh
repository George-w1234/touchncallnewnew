#!/bin/bash
# convert_all_to_mp3.sh
# Converts all WAV files in public/audio to MP3

INPUT_DIR="public/audio"

if [ ! -d "$INPUT_DIR" ]; then
  echo "❌ Directory $INPUT_DIR not found. Run this script from your project root."
  exit 1
fi

echo "🔄 Converting all WAV files in $INPUT_DIR to MP3..."

for f in "$INPUT_DIR"/*.wav; do
  if [ -f "$f" ]; then
    base=$(basename "$f" .wav)
    output="$INPUT_DIR/${base}.mp3"
    echo "🎵 Converting $f → $output"
    ffmpeg -y -i "$f" -codec:a libmp3lame -qscale:a 2 "$output"
  fi
done

echo "✅ Conversion complete! All files now have .mp3 versions."