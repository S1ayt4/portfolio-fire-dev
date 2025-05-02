document.addEventListener("DOMContentLoaded", () => {
  const audioArrival = document.getElementById("audio-arrival");
  const audioAmbiance = document.getElementById("audio-ambiance");
  const audioClic = document.getElementById("audio-clic");
  const audioLang = document.getElementById("audio-lang");
  const audioToggle = document.getElementById("audio-toggle");
  const langSwitcher = document.getElementById("lang-switcher");

  let isMuted = false;
  let hasInteracted = false;

  function initAudioPlayback() {
    if (!hasInteracted) return;

    // Démarre l'audio d'arrivée
    if (!isMuted) {
      audioArrival.play().catch(() => {});
    }

    // Quand l'audio d’arrivée se termine, joue l’ambiance
    audioArrival.addEventListener("ended", () => {
      if (!isMuted) {
        audioAmbiance.play().catch(() => {});
      }
    });
  }

  // ⚠️ Déclencher le son uniquement après interaction utilisateur
  function setupFirstInteraction() {
    document.body.addEventListener("click", () => {
      if (!hasInteracted) {
        hasInteracted = true;
        initAudioPlayback();
      }
    }, { once: true });
  }

  setupFirstInteraction();

  // Clics navigation → son
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      if (!isMuted) audioClic.play().catch(() => {});
    });
  });

  // Changement de langue
  langSwitcher.addEventListener("change", (e) => {
    const lang = e.target.value;
    const dict = translations[lang];

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });

    if (!isMuted) audioLang.play().catch(() => {});
  });

  // Bouton mute / unmute
  audioToggle.addEventListener("click", () => {
    isMuted = !isMuted;
    [audioArrival, audioAmbiance, audioClic, audioLang].forEach(audio => {
      audio.muted = isMuted;
    });
    audioToggle.textContent = isMuted ? "🔇" : "🔊";
  });

  // Effet parallax mobile
  function handleParallax() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      const scrollPosition = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollPosition / maxScroll;
      const min = 48, max = 52;
      const offset = min + (max - min) * scrollPercent;
      document.body.style.backgroundPosition = `center ${offset}%`;
    } else {
      document.body.style.backgroundPosition = "center center";
    }
  }

  function updateParallaxListeners() {
    const isMobile = window.innerWidth <= 768;
    window.removeEventListener("scroll", handleParallax);
    if (isMobile) window.addEventListener("scroll", handleParallax);
    handleParallax();
  }

  window.addEventListener("resize", updateParallaxListeners);
  updateParallaxListeners();
});
