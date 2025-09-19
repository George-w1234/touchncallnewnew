#!/bin/bash
# convert_all_audio.sh
# Converts all WAVs in public/audio to browser-friendly 16-bit PCM WAVs

INPUT_DIR="public/audio"

if [ ! -d "$INPUT_DIR" ]; then
  echo "❌ Directory $INPUT_DIR not found. Run this script from your project root."
  exit 1
fi

echo "🔄 Converting WAV files in $INPUT_DIR ..."

for f in "$INPUT_DIR"/*.wav; do
  if [ -f "$f" ]; then
    base=$(basename "$f" .wav)
    output="$INPUT_DIR/${base}_friendly.wav"
    echo "🎵 Converting $f → $output"
    ffmpeg -y -i "$f" -acodec pcm_s16le -ar 44100 "$output"
  fi
done

echo "✅ Conversion complete! All files now have *_friendly.wav versions."