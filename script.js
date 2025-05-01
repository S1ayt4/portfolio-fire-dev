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
    nav_support: "Éxito del Cliente",
    scraping_title: "Scraping y Automatización",
    scraping_text: "Uso de Playwright, Selenium, CloudScraper, BeautifulSoup con integración Notion & n8n. Probado en GitHub Codespace, Google Colab y Docker.",
    dev_title: "Desarrollo Web y de Software",
    dev_text: "Diseño de proyectos web con Flask, Notion API, GitHub Actions. Experiencia en automatización de flujos y despliegue vía GitHub Pages & Codespace.",
    ux_title: "UX/UI y Diseño",
    ux_text: "Proyectos en Figma, integración de principios UX. Estilo visual inspirado en el anime japonés y universo shonen.",
    support_title: "Éxito del Cliente y Comunicación",
    support_text: "Experiencia en gestión de clientes, comunicación técnica clara, y documentación en Notion. Alta capacidad para acompañar un proyecto hasta el éxito.",
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

document.getElementById("lang-switcher").addEventListener("change", (e) => {
  const lang = e.target.value;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
});

// Init with English
document.getElementById("lang-switcher").value = "en";
document.getElementById("lang-switcher").dispatchEvent(new Event("change"));
