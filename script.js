const translations = {
  en: {
    title: "MY PORTFOLIO",
    nav_scraping: "Scraping",
    nav_dev: "Development",
    nav_ux: "UX/UI",
    nav_support: "Customer Success",
    scraping_title: "Scraping & Automation",
    scraping_text: "Using Playwright, Selenium, CloudScraper, BeautifulSoup with Notion & n8n integration. Tested in GitHub Codespace, Google Colab, and Docker.",
    dev_title: "Web & Software Development",
    dev_text: "Web project design with Flask, Notion API, GitHub Actions. Experience in workflow automation and deployment via GitHub Pages & Codespace.",
    ux_title: "UX/UI & Design",
    ux_text: "Projects designed in Figma, integrating UX principles for improved experience. Visual style influenced by Japanimation and the shonen universe.",
    support_title: "Customer Success & Communication",
    support_text: "Experience in client management, clear technical communication, and project documentation in Notion. Strong ability to see projects through to success.",
    rights: "All rights reserved"
  },
  es: {
    title: "MI PORTAFOLIO",
    nav_scraping: "Scraping",
    nav_dev: "Desarrollo",
    nav_ux: "UX/UI",
    nav_support: "Atención al Cliente",
    scraping_title: "Scraping y Automatización",
    scraping_text: "Uso de Playwright, Selenium, CloudScraper, BeautifulSoup e integración con Notion & n8n. Probado en GitHub Codespace, Google Colab y Docker.",
    dev_title: "Desarrollo Web y de Software",
    dev_text: "Diseño de proyectos web con Flask, Notion API, GitHub Actions. Experiencia en automatización de flujos de trabajo y despliegue vía GitHub Pages & Codespace.",
    ux_title: "UX/UI y Diseño",
    ux_text: "Proyectos diseñados en Figma, integrando principios de UX para mejorar la experiencia. Estilo visual influenciado por la animación japonesa y el universo shonen.",
    support_title: "Atención al Cliente y Comunicación",
    support_text: "Experiencia en gestión de clientes, comunicación técnica clara y documentación de proyectos en Notion.",
    rights: "Todos los derechos reservados"
  },
  fr: {
    title: "MON PORTFOLIO",
    nav_scraping: "Scraping",
    nav_dev: "Développement",
    nav_ux: "UX/UI",
    nav_support: "Customer Success",
    scraping_title: "Scraping & Automatisation",
    scraping_text: "Utilisation de Playwright, Selenium, CloudScraper, BeautifulSoup et intégration avec Notion & n8n. Réalisations testées dans GitHub Codespace, Google Colab et Docker.",
    dev_title: "Développement Web & Logiciel",
    dev_text: "Conception de projets web avec Flask, Notion API, GitHub Actions. Expérience dans l'automatisation de workflows, déploiement via GitHub Pages & Codespace.",
    ux_title: "UX/UI & Design",
    ux_text: "Projets conçus dans Figma, intégration de principes UX pour améliorer l'expérience utilisateur. Style visuel influencé par la japanimation et l'univers shonen.",
    support_title: "Customer Success & Communication",
    support_text: "Expérience dans la gestion de clients, communication technique claire, et documentation des projets sur Notion. Forte capacité à accompagner un projet jusqu’à sa réussite.",
    rights: "Tous droits réservés"
  }
};

// Code de changement de langue (inchangé)
document.getElementById("lang-switcher").addEventListener("change", (e) => {
  const lang = e.target.value;
  const dict = translations[lang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
});

// Ajout du code Three.js pour l'effet de feu 3D
let scene, camera, renderer, particles, particleSystem;

function initFireEffect() {
  // Créer une scène
  scene = new THREE.Scene();

  // Créer une caméra
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  // Créer un rendu WebGL
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Créer des particules
  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 1000;
  const positions = [];
  const colors = [];

  // Définir les positions et couleurs des particules
  for (let i = 0; i < particleCount; i++) {
    positions.push(Math.random() * 2 - 1); // X
    positions.push(Math.random() * 2 - 1); // Y
    positions.push(Math.random() * 2 - 1); // Z

    colors.push(Math.random(), Math.random(), Math.random()); // Couleurs RGB
  }

  particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  // Matériau des particules (feu)
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true
  });

  particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);

  // Positionner la caméra
  camera.position.z = 5;

  // Animer la scène
  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // Animer les particules pour simuler un feu
  particleSystem.rotation.x += 0.01;
  particleSystem.rotation.y += 0.01;

  // Mettre à jour le rendu
  renderer.render(scene, camera);
}

// Initialiser l'effet de feu 3D
initFireEffect();
