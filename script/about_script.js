
const skillsData = [
  {
    name: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    mastery: 75,
    category: "Programming Language",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    mastery: 80,
    category: "Programming Language",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    mastery: 76,
    category: "Programming Language",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    mastery: 70,
    category: "Web Framework",
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    mastery: 80,
    category: "Database",
  },
  {
    name: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    mastery: 78,
    category: "Database",
  },
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    mastery: 70,
    category: "DevOps",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    mastery: 82,
    category: "Version Control",
  },
  {
    name: "FastAPI",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    mastery: 83,
    category: "Backend Framework",
  },
  {
    name: "NumPy",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
    mastery: 85,
    category: "Data Science",
  },
  {
    name: "Pandas",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    mastery: 87,
    category: "Data Science",
  },
  {
    name: "Matplotlib",
    logo: "https://logotic.me/system/assets/uploads/vector-files/matplotlib-icon-1669123416-logotic-brand.svg",
    mastery: 78,
    category: "Data Science",
  },
  {
    name: "Scikit-Learn",
    logo: "https://th.bing.com/th/id/R.09ba0105b3bc11dac5b7c09443812189?rik=7UmhMl5FciECwQ&riu=http%3a%2f%2famueller.github.io%2fsklearn_014_015_pydata%2fsklearn-logo.png&ehk=%2fdoHlCDrKDgQK%2bMOem6eU3lvCRQHqQrt9J%2f3veiO1Pw%3d&risl=&pid=ImgRaw&r=0",
    mastery: 73,
    category: "Data Science",
  },
  {
    name: "TailwindCSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    mastery: 70,
    category: "CSS Framework",
  },
  {
    name: "Spring Boot",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    mastery: 82,
    category: "Backend Framework",
  },
  {
    name: "HTML",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    mastery: 90,
    category: "Web Technology",
  },
  {
    name: "CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    mastery: 84,
    category: "Web Technology",
  },
  {
    name: "GitHub",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    mastery: 80,
    category: "Version Control",
  },
  {
    name: "LangChain",
    logo: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/langchain-color.png",
    mastery: 80,
    category: "AI Framework",
  },
  {
    name: "LangGraph",
    logo: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/langgraph-color.png",
    mastery: 75,
    category: "AI Framework",
  },
  {
    name: "n8n",
    logo: "https://static1.xdaimages.com/wordpress/wp-content/uploads/2025/01/n8n-symbol-only.png",
    mastery: 75,
    category: "Automation",
  },
  {
    name: "Hugging Face",
    logo: "https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/hf-logo.png",
    mastery: 70,
    category: "AI Framework",
  },
]
const THREE = window.THREE
const globeThemes = {
  dark: {
    background: 0x1a1f2e,
    wireframe: 0x82ffff,
    spriteTint: 0xffffff,
  },
  light: {
    background: 0xf8fafc,
    wireframe: 0x2563eb,
    spriteTint: 0xffffff,
  },
};

let scene, camera, renderer, globe, globeMaterial;
let skills = [];
let isDragging = false
let previousMousePosition = { x: 0, y: 0 }
const rotationVelocity = { x: 0.001, y: 0.002 }
const raycaster = new THREE.Raycaster();

document.addEventListener("DOMContentLoaded", () => {
  initGlobe();
  applyGlobeTheme();
  populateSkillsCategories();
  document.getElementById("modalClose").addEventListener("click", hideSkillModal)
  document.getElementById("skillModal").addEventListener("click", (e) => {
    if (e.target.id === "skillModal") {
      hideSkillModal()
    }
  })
})
function initGlobe() {
  const container = document.getElementById("skillsGlobe")
  const width = container.clientWidth
  const height = container.clientHeight

  console.log("[v0] Initializing globe with dimensions:", width, height)

  // Scene setup
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x1a1f2e)

  // Camera setup
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

  if (width < 480) {
    camera.position.z = 10
  } else if (width < 768) {
    camera.position.z = 12
  } else {
    camera.position.z = 15
  }

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.appendChild(renderer.domElement)

  // Create globe sphere
  const geometry = new THREE.SphereGeometry(5, 32, 32)
  globeMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });

  globe = new THREE.Mesh(geometry, globeMaterial);

  scene.add(globe)

  // Add skill icons as sprites on the globe
  skillsData.forEach((skill, index) => {
    const sprite = createSkillSprite(skill, index)
    globe.add(sprite)
    skills.push({ sprite, skill })
  })

  // Add ambient lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)

  // Mouse interaction
  setupMouseInteraction(container)

  // Handle window resize
  window.addEventListener("resize", onWindowResize)

  // Start animation
  animate()
}
function applyGlobeTheme() {
  const isLight = document.documentElement.classList.contains("light");
  const theme = isLight ? globeThemes.light : globeThemes.dark;

  scene.background = new THREE.Color(theme.background);
  globeMaterial.color.setHex(theme.wireframe);

  skills.forEach(({ sprite }) => {
    sprite.material.color.setHex(theme.spriteTint);
  });

  renderer.render(scene, camera);
}

const themeObserver = new MutationObserver(() => {
  applyGlobeTheme();
});

themeObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["class"],
});

function createSkillSprite(skill, index) {
  // Load the logo image
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load(skill.logo, (loadedTexture) => {
    // Update sprite material once texture is loaded
    sprite.material.map = loadedTexture
    sprite.material.needsUpdate = true
  })

  // Create sprite with image texture
  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
  })
  const sprite = new THREE.Sprite(spriteMaterial)

  // Position on sphere surface
  const phi = Math.acos(-1 + (2 * index) / skillsData.length)
  const theta = Math.sqrt(skillsData.length * Math.PI) * phi

  sprite.position.setFromSphericalCoords(5.5, phi, theta)

  const isMobile = window.innerWidth < 768
  const scale = isMobile ? 1.0 : 1.2
  sprite.scale.set(scale, scale, 1)

  // Store skill data in sprite
  sprite.userData = skill

  return sprite
}

function setupMouseInteraction(container) {

  const mouse = new THREE.Vector2()

  container.addEventListener("mousedown", (e) => {
    isDragging = true
    previousMousePosition = { x: e.clientX, y: e.clientY }
  })

  container.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const deltaX = e.clientX - previousMousePosition.x
      const deltaY = e.clientY - previousMousePosition.y

      rotationVelocity.y = deltaX * 0.005
      rotationVelocity.x = deltaY * 0.005

      previousMousePosition = { x: e.clientX, y: e.clientY }
    }
  })

  container.addEventListener("mouseup", () => {
    isDragging = false
  })

  container.addEventListener("mouseleave", () => {
    isDragging = false
  })

  // Click detection for skills
  container.addEventListener("click", (e) => {
    const rect = container.getBoundingClientRect()
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.setFromCamera(mouse, camera)

    const sprites = skills.map((s) => s.sprite)
    const intersects = raycaster.intersectObjects(sprites)

    if (intersects.length > 0) {
      const clickedSkill = intersects[0].object.userData
      showSkillModal(clickedSkill)
    }
  })
}

function showSkillModal(skill) {
  const modal = document.getElementById("skillModal")
  const modalIcon = document.getElementById("modalIcon")
  const modalSkillName = document.getElementById("modalSkillName")
  const masteryFill = document.getElementById("masteryFill")
  const masteryPercentage = document.getElementById("masteryPercentage")
  const skillCategory = document.getElementById("skillCategory")

  // Display logo as image instead of text
  modalIcon.innerHTML = `<img src="${skill.logo}" alt="${skill.name}" style="width: 80px; height: 80px;">`
  modalSkillName.textContent = skill.name
  masteryFill.style.width = skill.mastery + "%"
  masteryPercentage.textContent = skill.mastery + "%"
  skillCategory.textContent = skill.category

  modal.classList.remove("hidden")
}

function hideSkillModal() {
  const modal = document.getElementById("skillModal")
  modal.classList.add("hidden")
}

function animate() {
  requestAnimationFrame(animate)

  // Auto-rotate globe
  if (!isDragging) {
    globe.rotation.y += rotationVelocity.y
    globe.rotation.x += rotationVelocity.x

    // Damping
    rotationVelocity.x *= 0.98
    rotationVelocity.y *= 0.98

    // Minimum rotation
    if (Math.abs(rotationVelocity.y) < 0.001) rotationVelocity.y = 0.001
  } else {
    globe.rotation.y += rotationVelocity.y
    globe.rotation.x += rotationVelocity.x
  }

  renderer.render(scene, camera)
}

function onWindowResize() {
  const container = document.getElementById("skillsGlobe")
  const width = container.clientWidth
  const height = container.clientHeight

  console.log("[v0] Resizing globe to:", width, height)

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)

  if (width < 480) {
    camera.position.z = 10
    skills.forEach(({ sprite }) => {
      sprite.scale.set(0.8, 0.8, 1)
    })
  } else if (width < 768) {
    camera.position.z = 12
    skills.forEach(({ sprite }) => {
      sprite.scale.set(1.0, 1.0, 1)
    })
  } else {
    camera.position.z = 15
    skills.forEach(({ sprite }) => {
      sprite.scale.set(1.2, 1.2, 1)
    })
  }
}
function populateSkillsCategories() {
  const categoriesContainer = document.getElementById("skillsCategories")

  // Group skills by category
  const groupedSkills = {}
  skillsData.forEach((skill) => {
    if (!groupedSkills[skill.category]) {
      groupedSkills[skill.category] = []
    }
    groupedSkills[skill.category].push(skill)
  })

  // Create category cards
  Object.keys(groupedSkills).forEach((category) => {
    const categoryCard = document.createElement("div")
    categoryCard.className = "skill-category-card"

    const categoryTitle = document.createElement("h3")
    categoryTitle.textContent = category
    categoryCard.appendChild(categoryTitle)

    const skillTagsContainer = document.createElement("div")
    skillTagsContainer.className = "skill-tags"

    groupedSkills[category].forEach((skill) => {
      const skillTag = document.createElement("span")
      skillTag.className = "skill-tag"
      skillTag.setAttribute("data-skill", skill.name)

      // Add logo
      const logo = document.createElement("img")
      logo.src = skill.logo
      logo.alt = skill.name
      logo.className = "skill-tag-logo"
      skillTag.appendChild(logo)

      // Add name
      const name = document.createElement("span")
      name.textContent = skill.name
      skillTag.appendChild(name)

      // Add click event to show modal
      skillTag.addEventListener("click", () => {
        showSkillModal(skill)
      })

      skillTagsContainer.appendChild(skillTag)
    })

    categoryCard.appendChild(skillTagsContainer)
    categoriesContainer.appendChild(categoryCard)
  })
}

