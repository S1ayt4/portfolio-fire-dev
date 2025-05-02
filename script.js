// === Sons ===
const arriverSound = new Howl({
  src: ['assets/sounds/arriver-sur-le-site-web.ogg', 'assets/sounds/arriver-sur-le-site-web.mp3'],
  volume: 0.6,
  onend: () => {
    ambianceSound.play();
  }
});

const ambianceSound = new Howl({
  src: ['assets/sounds/ambiance.ogg', 'assets/sounds/ambiance.mp3'],
  volume: 0.3,
  loop: true
});

const clicSound = new Howl({
  src: ['assets/sounds/clic.ogg', 'assets/sounds/clic.mp3'],
  volume: 0.5
});

const changementPageSound = new Howl({
  src: ['assets/sounds/changement-de-page.ogg', 'assets/sounds/changement-de-page.mp3'],
  volume: 0.5
});

// Joue le son d’arrivée dès que la page est chargée
document.addEventListener("DOMContentLoaded", () => {
  arriverSound.play();
  updateParallaxListeners(); // init parallax ici aussi
});

// === Sons sur les clics de la navbar ===
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    clicSound.play();
  });
});

// === Changement de langue avec son ===
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
  // (coller ici ton objet translations tel quel, inchangé)
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
