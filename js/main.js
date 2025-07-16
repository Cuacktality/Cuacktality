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
      } else {
        entrada.target.classList.remove("mostrar"); // Ocultar al salir de la vista
      }
    });
  },
  {
    threshold: 0.15, // porcentaje de visibilidad que activa el efecto
  }
);

secciones.forEach((seccion) => {
  observer.observe(seccion);
});
