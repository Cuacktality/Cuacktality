// Script para el efecto de blur y zoom en el hero
window.addEventListener("scroll", () => {
  const heroImg = document.querySelector(".hero img");
  if (window.scrollY > 50) {
    heroImg.style.filter = "blur(8px) brightness(0.8) saturate(1.2)";
    heroImg.style.transform = "scale(1.05)";
  } else {
    heroImg.style.filter = "none";
    heroImg.style.transform = "scale(1)";
  }
});

// Funciones para el menú hamburguesa y lateral
function toggleMenu() {
  // Solo activar en pantallas pequeñas
  if (window.innerWidth > 768) return;

  const menu = document.getElementById("mobileMenu");
  const logo = document.getElementById("logoMetyd");

  menu.classList.toggle("open");

  if (menu.classList.contains("open")) {
    logo.classList.add("logo-transformada");
  } else {
    logo.classList.remove("logo-transformada");
  }
}

function closeMenu() {
  const menu = document.getElementById("mobileMenu");
  const logo = document.getElementById("logoMetyd");

  menu.classList.remove("open");
  logo.classList.remove("logo-transformada");
}

// Cerrar menú al hacer clic en un enlace de navegación
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("mobileMenu");
    const logo = document.getElementById("logoMetyd");
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
      logo.classList.remove("logo-transformada");
    }
  });
});

// Animación de entrada de la página
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const overlay = document.getElementById("introOverlay");
    overlay.style.display = "none";
  }, 2100); // espera a que termine animación
});

// Observador para animaciones de secciones al hacer scroll
const secciones = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("mostrar");
        console.log("Mostrando sección Intersección:", entrada.target.id);
      } else {
        entrada.target.classList.remove("mostrar"); // Ocultar al salir de la vista
        console.log("Mostrando sección:", entrada.target.id);
      }
    });
  },
  {
    threshold: 0.15, // porcentaje de visibilidad que activa el efecto
  },
);

secciones.forEach((seccion) => {
  observer.observe(seccion);
  console.log("Observando sección:", seccion.id);
});

// js/software.js  (o al final de main.js)

const SOFTWARE_PROJECTS = {
  PROJ_001: {
    nombre: "ACTivamente",
    imagen: "assets/software/activamente.png", // tu screenshot/imagen
    logs: [
      "> init ACTivamente.project",
      "> loading Unity 2022 LTS...",
      "[ OK ] PlayFab SDK conectado",
      "[ OK ] 6 islas cargadas",
      "[ OK ] Sistema de jardín: ONLINE",
      "> BUILD READY — Android APK",
    ],
  },
  PROJ_002: {
    nombre: "Epimoni RDA FHIR",
    imagen: "assets/software/epimoni.png",
    logs: [
      "> init Epimoni.RDA",
      "> loading HL7 FHIR R4...",
      "[ OK ] Bundle FHIR generado",
      "[ OK ] Validación Minsalud: PASS",
      "[ OK ] Endpoint ASP.NET activo",
      "> DEPLOY — Producción",
    ],
  },
  PROJ_003: {
    nombre: "Unity Game Tools",
    imagen: "assets/software/unitytools.png",
    logs: [
      "> init UnityTools.suite",
      "> loading módulos...",
      "[ OK ] AES Encryption: ACTIVO",
      "[ OK ] UIPanel Manager: LISTO",
      "[ OK ] Android Notifications: OK",
      "> SUITE COMPLETA — v2.6",
    ],
  },
};

let isAnimating = false;

document.querySelectorAll(".software-card").forEach((card) => {
  card.addEventListener("click", () => {
    if (isAnimating) return;
    const id = card.getAttribute("data-id");
    const project = SOFTWARE_PROJECTS[id];
    if (!project) return;

    // Highlight card activa
    document
      .querySelectorAll(".software-card")
      .forEach((c) => c.classList.remove("activo"));
    card.classList.add("activo");

    animarCargaProyecto(project);
  });
});

async function animarCargaProyecto(project) {
  isAnimating = true;
  const logsContainer = document.querySelector(".terminal-logs");
  const body = document.querySelector(".terminal-body");

  const softwareSection = document.getElementById("software");
  if (softwareSection) {
    softwareSection.classList.add("mostrar");
    softwareSection.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Limpiar logs
  logsContainer.innerHTML = "";

  // Mostrar estado "cargando" en el body
  body.innerHTML = `
    <div class="terminal-loading">
      <div class="terminal-spinner"></div>
      <span class="terminal-cmd">cargando ${project.nombre}...</span>
    </div>
  `;

  // Animar cada línea de log con delay
  for (const linea of project.logs) {
    await delay(320);
    const div = document.createElement("div");
    div.classList.add("terminal-line");
    div.innerHTML = linea.startsWith("[ OK ]")
      ? `<span class="terminal-output">${linea}</span>`
      : `<span class="terminal-prompt">DC@portfolio:~$</span><span class="terminal-cmd"> ${linea.replace("> ", "")}</span>`;
    logsContainer.appendChild(div);
    logsContainer.scrollTop = logsContainer.scrollHeight;
  }

  // Mostrar imagen al terminar
  await delay(400);
  body.innerHTML = `
    <img 
      src="${project.imagen}" 
      alt="${project.nombre}"
      style="width:100%;height:100%;object-fit:contain;opacity:0;transition:opacity 0.5s;"
      onload="this.style.opacity=1"
      onerror="this.outerHTML='<div class=\\'terminal-loading\\'><span class=\\'terminal-error\\'>[ IMAGE NOT FOUND ] ${project.imagen}</span></div>'"
    />
  `;

  // Agregar cursor al final de logs
  const cursor = document.createElement("div");
  cursor.classList.add("terminal-line");
  cursor.innerHTML = `<span class="terminal-prompt">DC@portfolio:~$</span><span class="terminal-cursor"></span>`;
  logsContainer.appendChild(cursor);

  isAnimating = false;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
