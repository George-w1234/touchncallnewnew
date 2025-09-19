// src/utils/playAudio.ts

export const playAudio = (fileName: string) => {
  const path = `/audio/${fileName}`;
  const audio = new Audio(path);

  // Add detailed error logging
  audio.addEventListener('error', () => {
    const error = audio.error;
    if (error) {
      const messages: Record<number, string> = {
        1: 'MEDIA_ERR_ABORTED – fetching process aborted by user',
        2: 'MEDIA_ERR_NETWORK – a network error occurred while fetching audio',
        3: 'MEDIA_ERR_DECODE – audio decoding failed',
        4: 'MEDIA_ERR_SRC_NOT_SUPPORTED – unsupported audio format or bad path',
      };
      console.error(`Audio error (code ${error.code}) for ${path}: ${messages[error.code]}`);
    } else {
      console.error(`Unknown audio error for ${path}`);
    }
  });

  audio.play()
    .then(() => {
      console.log(`✅ Playing audio: ${path}`);
    })
    .catch((err) => {
      console.error(`❌ Could not play audio: ${path}`, err);
    });
};