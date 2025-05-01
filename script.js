let scene, camera, renderer, particleSystem, fireTexture;

function initFireEffect() {
  // Créer une scène
  scene = new THREE.Scene();

  // Créer une caméra
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  // Créer un rendu WebGL
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);  // Ajout du rendu au body

  // Charger une texture pour les particules de feu
  const textureLoader = new THREE.TextureLoader();
  fireTexture = textureLoader.load('https://www.transparenttextures.com/patterns/fire.png'); // Texture de flamme simple

  // Créer un matériau pour les particules de feu
  const fireMaterial = new THREE.PointsMaterial({
    size: 0.15,
    map: fireTexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,  // Empêcher l'écriture dans le z-buffer pour éviter des artefacts visuels
  });

  // Créer des particules pour simuler le feu
  const fireGeometry = new THREE.BufferGeometry();
  const particleCount = 500; // Nombre de particules pour la flamme
  const positions = [];
  const velocities = [];

  for (let i = 0; i < particleCount; i++) {
    // Position des particules dans une zone en bas de la scène
    positions.push((Math.random() - 0.5) * 2);  // X
    positions.push(Math.random() * 2);           // Y (particules au bas de la scène)
    positions.push((Math.random() - 0.5) * 2);  // Z

    // Vitesse de chaque particule (elles montent légèrement pour simuler un feu)
    velocities.push(0);
    velocities.push(Math.random() * 0.05 + 0.02); // Vitesse verticale (montée du feu)
    velocities.push(0);
  }

  fireGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  // Création du système de particules
  particleSystem = new THREE.Points(fireGeometry, fireMaterial);
  scene.add(particleSystem);

  // Positionner la caméra pour voir l'effet du feu
  camera.position.z = 5;

  // Animer la scène
  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // Mettre à jour la position des particules pour simuler le mouvement du feu
  const positions = particleSystem.geometry.attributes.position.array;
  const velocities = particleSystem.geometry.attributes.velocity ? particleSystem.geometry.attributes.velocity.array : [];

  for (let i = 0; i < positions.length; i += 3) {
    // Bouger les particules vers le haut pour simuler l'ascension du feu
    positions[i + 1] += velocities[i + 1];

    // Si la particule dépasse le plafond, la remettre en bas pour recommencer
    if (positions[i + 1] > 2) {
      positions[i + 1] = Math.random() * 2; // Remettre la particule en bas
    }
  }

  particleSystem.geometry.attributes.position.needsUpdate = true;

  // Animer la scène avec une mise à jour du rendu
  renderer.render(scene, camera);
}

// Initialiser l'effet de feu
initFireEffect();
