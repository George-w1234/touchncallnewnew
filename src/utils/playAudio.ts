// src/utils/playAudio.ts
import player from 'play-sound';
import path from 'path';
import fs from 'fs';

const audioPlayer = player();

/**
 * Plays an audio file locally on the Pi (or any Node host)
 * @param fileName Name of the file in public/audio/, e.g. 'backstage_test.mp3'
 */
export const playAudio = (fileName: string) => {
  const filePath = path.join(__dirname, '..', '..', 'public', 'audio', fileName);

  // Check if file exists first
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Audio file not found: ${filePath}`);
    return;
  }

  audioPlayer.play(filePath, (err: any) => {
    if (err) {
      console.error(`❌ Failed to play audio: ${filePath}`, err);
    } else {
      console.log(`✅ Playing audio locally: ${filePath}`);
    }
  });
};