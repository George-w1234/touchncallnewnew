export const playAudio = (fileName: string) => {
  const audio = new Audio(`/public/audio/${fileName}`);
  audio.play().catch((err) => {
    console.error('Audio playback failed:', err);
  });
};