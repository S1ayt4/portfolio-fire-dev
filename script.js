// === Sons ===
const arriverSound = new Howl({
  src: ['sounds/arriver-sur-le-site-web.ogg', 'sounds/arriver-sur-le-site-web.mp3'],
  volume: 0.6,
  onend: () => {
    ambianceSound.play();
  }
});

const ambianceSound = new Howl({
  src: ['sounds/ambiance.ogg', 'sounds/ambiance.mp3'],
  volume: 0.3,
  loop: true
});

const clicSound = new Howl({
  src: ['sounds/clic.ogg', 'sounds/clic.mp3'],
  volume: 0.5
});

const changementPageSound = new Howl({
  src: ['sounds/changement-de-page.ogg', 'sounds/changement-de-page.mp3'],
  volume: 0.5
});

// Joue le son d’arrivée dès que la page est chargée
document.addEventListener("DOMContentLoaded", () => {
  arriverSound.play();
});

// === Ajout du son lors des clics dans la navbar ===
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    clicSound.play();
  });
});

// === Ajout du son lors du changement de langue ===
document.getElementById("lang-switcher").addEventListener("change", (e) => {
  changementPageSound.play();

  const lang = e.target.value;
  const dict = translations[lang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
});

// === Traductions ===
const translations = {
  /* (inchangé) */
};

// === Parallax doux sur mobile uniquement ===
function handleParallax() {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = scrollPosition / maxScroll;

    const min = 48;
    const max = 52;
    const offset = min + (max - min) * scrollPercent;

    document.body.style.backgroundPosition = `center ${offset}%`;
  } else {
    document.body.style.backgroundPosition = "center center";
  }
}

function updateParallaxListeners() {
  const isMobile = window.innerWidth <= 768;

  window.removeEventListener("scroll", handleParallax);

  if (isMobile) {
    window.addEventListener("scroll", handleParallax);
  }

  handleParallax();
}

window.addEventListener("resize", updateParallaxListeners);
document.addEventListener("DOMContentLoaded", updateParallaxListeners);
