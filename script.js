document.addEventListener("DOMContentLoaded", () => {
  const audioArrival = document.getElementById("audio-arrival");
  const audioAmbiance = document.getElementById("audio-ambiance");
  const audioClic = document.getElementById("audio-clic");
  const audioLang = document.getElementById("audio-lang");
  const audioToggle = document.getElementById("audio-toggle");
  const langSwitcher = document.getElementById("lang-switcher");

  let isMuted = false;
  let hasInteracted = false;
  const defaultLang = "en";

  const translations = {
    en: {
      title: "MY PORTFOLIO",
      nav_scraping: "Scraping",
      nav_dev: "Development",
      nav_ux: "UX/UI",
      nav_support: "Customer Success",
      scraping_title: "Scraping & Automation",
      scraping_text:
        "Using Playwright, Selenium, CloudScraper, BeautifulSoup with Notion & n8n integration. Tested in GitHub Codespace, Google Colab, and Docker.",
      dev_title: "Web & Software Development",
      dev_text:
        "Web project design with Flask, Notion API, GitHub Actions. Experience in workflow automation and deployment via GitHub Pages & Codespace.",
      ux_title: "UX/UI & Design",
      ux_text:
        "Projects designed in Figma, integrating UX principles for improved experience. Visual style influenced by Japanimation and the shonen universe.",
      support_title: "Customer Success & Communication",
      support_text:
        "Experience in client management, clear technical communication, and project documentation in Notion. Strong ability to see projects through to success.",
      rights: "All rights reserved",
    },
    fr: {
      title: "MON PORTFOLIO",
      nav_scraping: "Scraping",
      nav_dev: "Développement",
      nav_ux: "UX/UI",
      nav_support: "Relation client",
      scraping_title: "Scraping & Automatisation",
      scraping_text:
        "Utilisation de Playwright, Selenium, CloudScraper, BeautifulSoup avec intégration Notion & n8n. Testé sur GitHub Codespace, Google Colab et Docker.",
      dev_title: "Développement Web & Logiciel",
      dev_text:
        "Conception de projets web avec Flask, Notion API, GitHub Actions. Expérience en automatisation et déploiement via GitHub Pages & Codespace.",
      ux_title: "UX/UI & Design",
      ux_text:
        "Projets conçus sur Figma, intégrant les principes UX. Style visuel inspiré de la japanimation et de l’univers shōnen.",
      support_title: "Relation client & Communication",
      support_text:
        "Expérience en gestion client, communication technique claire, documentation de projets sur Notion. Capacité à mener les projets à bien.",
      rights: "Tous droits réservés",
    },
    es: {
      title: "MI PORTAFOLIO",
      nav_scraping: "Scraping",
      nav_dev: "Desarrollo",
      nav_ux: "UX/UI",
      nav_support: "Atención al cliente",
      scraping_title: "Scraping y Automatización",
      scraping_text:
        "Uso de Playwright, Selenium, CloudScraper, BeautifulSoup con integración Notion y n8n. Probado en GitHub Codespace, Google Colab y Docker.",
      dev_title: "Desarrollo Web y Software",
      dev_text:
        "Diseño de proyectos con Flask, API de Notion, GitHub Actions. Experiencia en automatización y despliegue con GitHub Pages y Codespace.",
      ux_title: "UX/UI y Diseño",
      ux_text:
        "Proyectos diseñados en Figma con principios UX. Estilo visual influenciado por la animación japonesa y el universo shōnen.",
      support_title: "Atención al cliente y Comunicación",
      support_text:
        "Experiencia en gestión de clientes, comunicación técnica clara y documentación en Notion. Alta capacidad para llevar proyectos al éxito.",
      rights: "Todos los derechos reservados",
    },
  };

  function updateTranslations(lang) {
    const dict = translations[lang];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });
  }

  function initAudioPlayback() {
    if (!hasInteracted) return;

    if (!isMuted) {
      audioArrival.play().catch(() => {});
    }

    audioArrival.addEventListener("ended", () => {
      if (!isMuted) {
        audioAmbiance.volume = 0.05;
        audioAmbiance.loop = true;
        audioAmbiance.play().catch(() => {});
      }
    });
  }

  function setupFirstInteraction() {
    document.body.addEventListener(
      "click",
      () => {
        if (!hasInteracted) {
          hasInteracted = true;
          initAudioPlayback();
        }
      },
      { once: true }
    );
  }

  setupFirstInteraction();

  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!isMuted) {
        audioClic.play().catch(() => {});
      }
    });
  });

  langSwitcher.addEventListener("change", (e) => {
    const lang = e.target.value;
    updateTranslations(lang);

    if (!isMuted) {
      audioLang.play().catch(() => {});
    }
  });

  audioToggle.addEventListener("click", () => {
    isMuted = !isMuted;
    [audioArrival, audioAmbiance, audioClic, audioLang].forEach((audio) => {
      audio.muted = isMuted;
    });
    audioToggle.textContent = isMuted ? "🔇" : "🔊";
  });

  langSwitcher.value = defaultLang;
  updateTranslations(defaultLang);

  // 🎯 Parallax avec image de fond ancrée au bas de la page sans dépasser le bas
  function handleParallax() {
    const scrollY = window.scrollY;
    const documentHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;

    // Calcul du défilement total et ajustement de l'image de fond
    const scrollPercent = (scrollY / (documentHeight - windowHeight));

    // Limiter le défilement de l'image pour qu'elle ne dépasse pas le bas
    const maxOffset = windowHeight * 0.3; // Ajuste la vitesse du fond
    const offset = Math.min(scrollPercent * maxOffset, maxOffset);

    // Assurer que l'image de fond reste ancrée au bas sans dépasser le bas
    document.body.style.backgroundPosition = `center ${-offset}px`;
  }

  function updateParallaxListeners() {
    window.removeEventListener("scroll", handleParallax);
    window.addEventListener("scroll", handleParallax);
    handleParallax();
  }

  window.addEventListener("resize", updateParallaxListeners);
  updateParallaxListeners();
});
