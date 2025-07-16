const juegos = [
  {
    titulo: "Shoot",
    descripcion: "Lo suficientemente adictivo.",
    icono: "assets/games/shoot.png",
    url: "games/shoot/index.html",
  },
  {
    titulo: "ProtoMetyd",
    descripcion: "Versión prototipo del universo Metyd",
    icono: "assets/games/protometyd.png",
    url: "games/metyd/index.html",
  },
  // más juegos...
];

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
