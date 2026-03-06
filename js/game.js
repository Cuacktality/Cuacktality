let juegoActual = 0;

// Función para mostrar un juego por índice
function mostrarJuego(indice) {
  const juego = juegos[indice];
  const iframe = document.getElementById("iframeJuego");
  const icono = document.getElementById("iconoJuego");
  const titulo = document.getElementById("tituloJuego");
  const descripcion = document.getElementById("descripcionJuego");

  // Actualizar información
  icono.src = juego.icono;
  titulo.textContent = juego.titulo;
  descripcion.textContent = juego.descripcion;

  // Reiniciar iframe
  iframe.src = "";
  setTimeout(() => {
    iframe.src = juego.url;

    // 💡 Efecto de iluminación
    const iframeWrapper = document.querySelector(".iframe-wrapper");
    if (iframeWrapper) {
      iframeWrapper.classList.add("iluminando");
      setTimeout(() => {
        iframeWrapper.classList.remove("iluminando");
      }, 600);
    }
  }, 100);
}

// Función para cambiar de juego con flechas
function cambiarJuego(direccion) {
  const contenedor = document.querySelector(".contenedor-juego");

  // 🔄 Animación de fade-out
  contenedor.style.opacity = "0";

  setTimeout(() => {
    juegoActual = (juegoActual + direccion + juegos.length) % juegos.length;

    mostrarJuego(juegoActual);

    // 🔄 Recuperar visibilidad
    contenedor.style.opacity = "1";
  }, 400);
}

// Mostrar juego inicial al cargar
window.addEventListener("DOMContentLoaded", () => {
  const contenedorJuegos = document.querySelector(".contenedor-juego");
  if (contenedorJuegos) {
    contenedorJuegos.offsetWidth;
  }
  mostrarJuego(0);
});
/* ═══════════════════════════════════════════════════════
   game.js — Lógica de la sección Videojuegos
   ═══════════════════════════════════════════════════════ */

const juegos = [
  {
    id: "STAGE_01",
    nombre: "SHOOT",
    descripcion: "Lo suficientemente adictivo.",
    icono: "assets/games/shoot.png",
    url: "games/shoot/index.html",
  },
  {
    id: "STAGE_02",
    nombre: "Nombre del Juego 2",
    descripcion: "Descripción del juego...",
    icono: "assets/icons/juego2.png",
    url: "https://itch.io/embed/TU_ID_2",
  },
  {
    id: "STAGE_03",
    nombre: "Nombre del Juego 3",
    descripcion: "Descripción del juego...",
    icono: "assets/icons/juego3.png",
    url: "https://itch.io/embed/TU_ID_3",
  },
];

function renderCarousel() {
  const carousel = document.getElementById("gameCarousel");
  if (!carousel) return;
  carousel.innerHTML = "";

  juegos.forEach((juego, i) => {
    const card = document.createElement("div");
    card.classList.add("game-card");
    if (i === juegoActual) card.classList.add("activo");

    card.innerHTML = `
      <span class="game-card-num">${juego.id}</span>
      <img class="game-card-icon"
           src="${juego.icono}"
           alt="${juego.nombre}"
           onerror="this.src='https://placehold.co/40x40/111D2E/1A6EFF?text=?'" />
      <span class="game-card-name">${juego.nombre}</span>
    `;

    card.addEventListener("click", () => seleccionarJuego(i));
    carousel.appendChild(card);
  });
}

function seleccionarJuego(index) {
  // Reset iframe al cambiar
  resetPantalla();

  juegoActual = index;
  const juego = juegos[juegoActual];

  // Actualizar info
  document.getElementById("iconoJuego").src = juego.icono;
  document.getElementById("tituloJuego").textContent = juego.nombre;
  document.getElementById("descripcionJuego").textContent = juego.descripcion;
  document.getElementById("arcadeStage").textContent = String(
    juegoActual + 1,
  ).padStart(2, "0");
  document.getElementById("arcadeGameName").textContent = juego.nombre;

  renderCarousel();
}

function cambiarJuego(dir) {
  const nuevo = (juegoActual + dir + juegos.length) % juegos.length;
  seleccionarJuego(nuevo);
}

function activarJuego() {
  const juego = juegos[juegoActual];
  const idle = document.getElementById("screenIdle");
  const wrapper = document.getElementById("iframeWrapper");
  const iframe = document.getElementById("iframeJuego");

  if (!juego.url || juego.url.includes("TU_ID")) {
    // Sin URL real — mensaje en pantalla
    idle.innerHTML = `
      <div class="idle-grid"></div>
      <div class="idle-text">
        <span class="idle-blink-error">[ SIN ENLACE CONFIGURADO ]</span>
      </div>`;
    idle.style.display = "flex";
    wrapper.style.display = "none";
    return;
  }

  idle.style.display = "none";
  wrapper.style.display = "block";
  iframe.src = juego.url;
}

function resetPantalla() {
  const idle = document.getElementById("screenIdle");
  const wrapper = document.getElementById("iframeWrapper");
  const iframe = document.getElementById("iframeJuego");

  idle.innerHTML = `
    <div class="idle-grid"></div>
    <div class="idle-text">
      <span class="idle-blink">▶ PRESS PLAY TO START ◀</span>
    </div>`;
  idle.style.display = "flex";
  wrapper.style.display = "none";
  iframe.src = "";
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  renderCarousel();
  seleccionarJuego(0);
});
