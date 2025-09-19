export const playAudio = async (file: string) => {
  try {
    // Always use relative path so it works on any port/host
    const url = `/audio/${file}`;
    console.log("🔊 Attempting to play:", url);

    const audio = new Audio(url);

    // For debugging: log when loaded
    audio.addEventListener("canplaythrough", () => {
      console.log("✅ Audio can play through:", url);
    });

    audio.addEventListener("error", (e) => {
      console.error("❌ Audio element error:", e, "for", url);
    });

    await audio.play();
    console.log("▶️ Playback started:", url);
  } catch (err) {
    console.error("Audio playback failed:", err);
  }
};