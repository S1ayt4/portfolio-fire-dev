// === Gestion des sons ===
document.addEventListener("DOMContentLoaded", () => {
  const audioArrival = document.getElementById("audio-arrival");
  const audioAmbiance = document.getElementById("audio-ambiance");
  const audioClic = document.getElementById("audio-clic");
  const audioLang = document.getElementById("audio-lang");
  const audioToggle = document.getElementById("audio-toggle");

  let isMuted = false;

  // Quand le son d’arrivée est terminé, lancer l’ambiance
  audioArrival.addEventListener("ended", () => {
    if (!isMuted) audioAmbiance.play().catch(() => {});
  });

  // Son au clic sur la navbar
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      if (!isMuted) audioClic.play().catch(() => {});
    });
  });

  // Son au changement de langue
  document.getElementById("lang-switcher").addEventListener("change", () => {
    if (!isMuted) audioLang.play().catch(() => {});
  });

  // Toggle mute
  audioToggle.addEventListener("click", () => {
    isMuted = !isMuted;

    [audioArrival, audioAmbiance, audioClic, audioLang].forEach(audio => {
      audio.muted = isMuted;
    });

    audioToggle.textContent = isMuted ? "🔇" : "🔊";
  });
});
