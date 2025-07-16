/**
 * @fileoverview illustration.js: Gestiona la interactividad de la sección de Ilustración,
 * incluyendo la carga de proyectos, la navegación entre ilustraciones y la funcionalidad del lightbox.
 * También integra la extracción de color para un efecto de resplandor dinámico.
 */

// Datos de los proyectos de Ilustración
const datosIlustracionesProyectos = {
  bocetosConceptuales: {
    nombre: "En Tiempos de Estrés...",
    subtitulo: "",
    ilustraciones: [
      {
        id: "boceto-1",
        src: "assets/illustrations/fondoDibujo.jpg",
        alt: "Boceto de personaje fantástico",
        nombre: "En Tiempos de Estrés Haz lo que Importa",
        subtitulo: "Portada",
        description:
          "Este boceto representa una exploración inicial de un personaje para un RPG de fantasía, centrándome en la silueta y la pose dinámica. Buscaba una figura que combinara agilidad con una presencia imponente, pensando en sus movimientos en combate.",
      },
      {
        id: "boceto-2",
        src: "assets/illustrations/astro.png",
        alt: "Concepto de entorno futurista",
        nombre: "Ciudad Flotante",
        subtitulo: "Estudio de Ambiente",
        description:
          "Un estudio de ambiente para un nivel de ciencia ficción, experimentando con iluminación y arquitectura modular. La idea era capturar la sensación de una metrópolis suspendida, con detalles que sugirieran su funcionalidad y vida cotidiana.",
      },
      {
        id: "boceto-3",
        src: "https://placehold.co/300x400/8A2BE2/FFFFFF?text=Boceto+3",
        alt: "Ilustración de criatura mítica",
        nombre: "Dragón Antiguo",
        subtitulo: "Criatura Mítica",
        description:
          "Una ilustración detallada de una criatura alada, combinando elementos orgánicos y fantásticos en su diseño. Me enfoqué en la textura de las escamas y la expresión para transmitir su sabiduría ancestral y poder latente.",
      },
      {
        id: "boceto-4",
        src: "https://placehold.co/300x400/FF6347/FFFFFF?text=Boceto+4",
        alt: "Boceto de arma de ciencia ficción",
        nombre: "Rifle de Plasma",
        subtitulo: "Diseño de Arma",
        description:
          "Diseño conceptual de un arma energética, explorando formas ergonómicas y detalles tecnológicos. Quería que se sintiera potente y futurista, pero también práctica para un personaje humano.",
      },
      {
        id: "boceto-5",
        src: "https://placehold.co/300x400/4682B4/FFFFFF?text=Boceto+5",
        alt: "Escena de batalla épica",
        nombre: "Confrontación Cósmica",
        subtitulo: "Composición Narrativa",
        description:
          "Una composición de una escena de acción, enfocada en la narrativa visual y el movimiento de los personajes. El desafío fue guiar la mirada del espectador a través de la tensión del momento, usando líneas de fuerza y contraste.",
      },
    ],
  },
  ilustracionesFinales: {
    nombre: "Ilustraciones Finales",
    subtitulo: "Arte pulido y detallado",
    ilustraciones: [
      {
        id: "final-1",
        src: "https://placehold.co/300x400/FF4500/FFFFFF?text=Final+1",
        alt: "Ilustración de paisaje fantástico",
        nombre: "Valle de los Ecos",
        subtitulo: "Paisaje Místico",
        description:
          "Ilustración final de un valle místico, donde la luz y la sombra juegan un papel crucial para crear una atmósfera de misterio y asombro. Cada elemento fue pensado para contribuir a la sensación de un lugar inexplorado.",
      },
      {
        id: "final-2",
        src: "https://placehold.co/300x400/DA70D6/000000?text=Final+2",
        alt: "Retrato de personaje principal",
        nombre: "Comandante Anya",
        subtitulo: "Retrato Heroico",
        description:
          "Retrato detallado de un personaje principal, capturando su determinación y liderazgo. Me centré en los detalles de la armadura y la expresión facial para transmitir su personalidad.",
      },
    ],
  },
};

let proyectoIlustracionActualKey = "bocetosConceptuales"; // Proyecto de ilustración inicialmente seleccionado
let ilustracionActualIndex = 0; // Índice de la ilustración actual dentro del proyecto

// Elementos del DOM
const listaProyectosIlustracion = document.getElementById(
  "listaProyectosIlustracion"
);
const ilustracionCardStack = document.getElementById("ilustracionCardStack");
const ilustracionPrincipal = document.getElementById("ilustracionPrincipal"); // Renombrado para consistencia
const nombreIlustracion = document.getElementById("nombreIlustracion"); // Renombrado para consistencia
const subtituloIlustracion = document.getElementById("subtituloIlustracion"); // Renombrado para consistencia
const descripcionIlustracion = document.getElementById(
  "descripcionIlustracion"
); // Renombrado para consistencia

// Lightbox Elements
const lightboxOverlay = document.getElementById("lightboxOverlay");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxNombreIlustracion = document.getElementById(
  "lightboxNombreIlustracion"
);
const lightboxSubtituloIlustracion = document.getElementById(
  "lightboxSubtituloIlustracion"
);
const lightboxDescripcionIlustracion = document.getElementById(
  "lightboxDescripcionIlustracion"
);
const lightboxClose = document.getElementById("lightboxClose"); // Renombrado para consistencia
const lightboxPrev = document.getElementById("lightboxPrev"); // Renombrado para consistencia
const lightboxNext = document.getElementById("lightboxNext"); // Renombrado para consistencia

// Variable para almacenar el índice de la imagen actual en el lightbox
let currentLightboxImageIndex = 0; // Se mantiene, ya que el lightbox usa un índice global

/**
 * Obtiene el objeto del proyecto de ilustración actualmente seleccionado.
 * @returns {object} El objeto del proyecto de ilustración actual.
 */
function obtenerProyectoIlustracionActual() {
  return datosIlustracionesProyectos[proyectoIlustracionActualKey];
}

/**
 * Obtiene el objeto de la ilustración actual dentro del proyecto seleccionado.
 * @returns {object|null} El objeto de la ilustración actual, o null si no hay.
 */
function obtenerIlustracionActual() {
  const proyecto = obtenerProyectoIlustracionActual();
  if (
    !proyecto ||
    !proyecto.ilustraciones ||
    proyecto.ilustraciones.length === 0
  ) {
    return null;
  }
  return proyecto.ilustraciones[ilustracionActualIndex];
}

/**
 * Carga y muestra la lista de proyectos de ilustración en el menú lateral.
 * @function cargarListaProyectosIlustracion
 */
function cargarListaProyectosIlustracion() {
  listaProyectosIlustracion.innerHTML = ""; // Limpiar lista existente

  for (const key in datosIlustracionesProyectos) {
    const proyecto = datosIlustracionesProyectos[key];
    const li = document.createElement("li");
    li.setAttribute("data-proyecto-key", key);
    li.classList.add("proyecto-item");
    if (key === proyectoIlustracionActualKey) {
      li.classList.add("activo");
    }

    li.innerHTML = `
      <span class="proyecto-nombre">${proyecto.nombre}</span>
      <span class="proyecto-subtitulo-lista">${proyecto.subtitulo}</span>
    `;
    li.onclick = () => seleccionarProyectoIlustracion(key);
    listaProyectosIlustracion.appendChild(li);
  }
}

/**
 * Selecciona un proyecto de ilustración por su clave y actualiza el visor.
 * @param {string} key - La clave del proyecto a seleccionar (ej. "bocetosConceptuales").
 * @function seleccionarProyectoIlustracion
 */
function seleccionarProyectoIlustracion(key) {
  proyectoIlustracionActualKey = key;
  ilustracionActualIndex = 0; // Reiniciar al primer elemento del nuevo proyecto

  // Actualizar clase 'activo' en la lista de proyectos
  document
    .querySelectorAll("#listaProyectosIlustracion .proyecto-item")
    .forEach((item) => {
      item.classList.remove("activo");
    });
  document
    .querySelector(`#listaProyectosIlustracion [data-proyecto-key="${key}"]`)
    .classList.add("activo");

  actualizarVisorIlustracion();
}

/**
 * Actualiza el visor de ilustraciones, incluyendo la imagen principal y el stack de cartas 3D.
 * @function actualizarVisorIlustracion
 */
function actualizarVisorIlustracion() {
  const proyecto = obtenerProyectoIlustracionActual();
  ilustracionCardStack.innerHTML = ""; // Limpiar cartas existentes

  if (
    !proyecto ||
    !proyecto.ilustraciones ||
    proyecto.ilustraciones.length === 0
  ) {
    ilustracionPrincipal.src =
      "https://placehold.co/400x300/000000/FFFFFF?text=Sin+Ilustraciones";
    ilustracionPrincipal.alt = "Sin ilustraciones disponibles";
    nombreIlustracion.textContent = "Sin Ilustración";
    subtituloIlustracion.textContent = "N/A";
    descripcionIlustracion.textContent =
      "Este proyecto no tiene ilustraciones asociadas.";
    return;
  }

  const currentIlustracion = proyecto.ilustraciones[ilustracionActualIndex];

  // Actualizar la imagen principal y la información
  ilustracionPrincipal.src = currentIlustracion.src;
  ilustracionPrincipal.alt = currentIlustracion.alt;
  nombreIlustracion.textContent = currentIlustracion.nombre;
  subtituloIlustracion.textContent = currentIlustracion.subtitulo;
  descripcionIlustracion.textContent = currentIlustracion.description;

  // Trigger a pulse animation on the main image
  ilustracionPrincipal.classList.remove("pulse-active"); // Remove to allow re-triggering
  void ilustracionPrincipal.offsetWidth; // Trigger reflow
  ilustracionPrincipal.classList.add("pulse-active");

  // Llama a la función de extracción de color para actualizar el box-shadow
  ilustracionPrincipal.onload = () => {
    // Asegúrate de que getDominantColor esté definido (de color-extractor.js)
    if (typeof getDominantColor === "function") {
      const dominantColor = getDominantColor(ilustracionPrincipal);
      // Ajusta la opacidad del color extraído para el box-shadow si es necesario
      const shadowColor = dominantColor.replace(/,(\s*\d+\.?\d*)\)/, ", 0.6)"); // Asegura opacidad de 0.6
      ilustracionPrincipal.style.boxShadow = `0 10px 30px ${shadowColor}`;
    } else {
      console.warn(
        "getDominantColor no está definido. Asegúrate de que color-extractor.js esté cargado."
      );
      ilustracionPrincipal.style.boxShadow = `0 10px 30px rgba(147, 249, 185, 0.6)`; // Fallback color
    }
  };
  // Si la imagen ya está en caché, onload no se dispara, así que la llamamos directamente
  if (ilustracionPrincipal.complete) {
    if (typeof getDominantColor === "function") {
      const dominantColor = getDominantColor(ilustracionPrincipal);
      const shadowColor = dominantColor.replace(/,(\s*\d+\.?\d*)\)/, ", 0.6)");
      ilustracionPrincipal.style.boxShadow = `0 10px 30px ${shadowColor}`;
    }
  }

  // Crear las cartas de fondo
  const numIlustraciones = proyecto.ilustraciones.length;
  const maxCards = 2; // Mostrar 2 cartas a cada lado (prev y next)

  for (let i = -maxCards; i <= maxCards; i++) {
    const cardIndex = ilustracionActualIndex + i;

    // Asegurarse de que el índice esté dentro de los límites del array y no sea la carta central
    if (cardIndex >= 0 && cardIndex < numIlustraciones && i !== 0) {
      const cardData = proyecto.ilustraciones[cardIndex];
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("ilustracion-card");
      cardDiv.setAttribute("data-index", cardIndex); // Guardar el índice real

      const img = document.createElement("img");
      img.src = cardData.src; // Usa 'src' de tu estructura original
      img.alt = cardData.alt;
      cardDiv.appendChild(img);

      // Asignar clases para posicionamiento y opacidad
      if (i < 0) {
        cardDiv.classList.add(`prev-${Math.abs(i)}`);
      } else if (i > 0) {
        cardDiv.classList.add(`next-${i}`);
      }
      // Add click event listener to background cards for smooth transition
      cardDiv.addEventListener("click", () => {
        const clickedIndex = parseInt(cardDiv.getAttribute("data-index"));
        seleccionarIlustracionPorIndiceConAnimacion(clickedIndex);
      });
      ilustracionCardStack.appendChild(cardDiv);
    }
  }

  // Añadir evento de clic a la imagen principal para abrir el lightbox
  ilustracionPrincipal.onclick = () => abrirLightbox(ilustracionActualIndex);
}

/**
 * Navega entre ilustraciones (cambia la carta central).
 * @param {number} direccion - -1 para anterior, 1 para siguiente.
 * @function navegarIlustracion
 */
function navegarIlustracion(direccion) {
  const proyecto = obtenerProyectoIlustracionActual();
  if (
    !proyecto ||
    !proyecto.ilustraciones ||
    proyecto.ilustraciones.length === 0
  )
    return;

  ilustracionActualIndex =
    (ilustracionActualIndex + direccion + proyecto.ilustraciones.length) %
    proyecto.ilustraciones.length;
  actualizarVisorIlustracion();
}

/**
 * Selecciona una ilustración por su índice con una animación de desplazamiento.
 * @param {number} index - El índice de la ilustración a seleccionar.
 * @function seleccionarIlustracionPorIndiceConAnimacion
 */
function seleccionarIlustracionPorIndiceConAnimacion(index) {
  const oldIndex = ilustracionActualIndex;
  ilustracionActualIndex = index;

  const direction = index > oldIndex ? 1 : -1; // 1 para derecha, -1 para izquierda
  if (direction === 1) {
    ilustracionCardStack.classList.add("scroll-right");
  } else {
    ilustracionCardStack.classList.add("scroll-left");
  }

  // Eliminar la clase de animación después de que se complete y luego actualizar el contenido
  setTimeout(() => {
    ilustracionCardStack.classList.remove("scroll-left", "scroll-right");
    actualizarVisorIlustracion();
  }, 300); // Esta duración debe coincidir con la duración de la animación CSS
}

// =================================================================
// Lógica del Lightbox
// =================================================================

/**
 * Abre el lightbox con la ilustración especificada.
 * @param {number} index - El índice de la ilustración a mostrar en el lightbox.
 * @function abrirLightbox
 */
function abrirLightbox(index) {
  currentLightboxImageIndex = index; // Sincroniza el índice del lightbox
  const proyecto = obtenerProyectoIlustracionActual();
  const ilustracion = proyecto.ilustraciones[currentLightboxImageIndex];

  if (!ilustracion) return;

  lightboxImage.src = ilustracion.src; // Usa 'src' de tu estructura original
  lightboxImage.alt = ilustracion.alt;
  lightboxNombreIlustracion.textContent = ilustracion.nombre;
  lightboxSubtituloIlustracion.textContent = ilustracion.subtitulo;
  lightboxDescripcionIlustracion.textContent = ilustracion.description;

  lightboxOverlay.classList.add("active");
  document.body.style.overflow = "hidden"; // Evitar scroll en el body
}

/**
 * Cierra el lightbox.
 * @function cerrarLightbox
 */
function cerrarLightbox() {
  lightboxOverlay.classList.remove("active");
  document.body.style.overflow = ""; // Restaurar scroll en el body
}

/**
 * Navega a la ilustración anterior/siguiente en el lightbox.
 * @param {number} direccion - -1 para anterior, 1 para siguiente.
 * @function navegarLightbox
 */
function navegarLightbox(direccion) {
  const proyecto = obtenerProyectoIlustracionActual();
  if (
    !proyecto ||
    !proyecto.ilustraciones ||
    proyecto.ilustraciones.length === 0
  )
    return;

  currentLightboxImageIndex =
    (currentLightboxImageIndex + direccion + proyecto.ilustraciones.length) %
    proyecto.ilustraciones.length;

  const ilustracion = proyecto.ilustraciones[currentLightboxImageIndex];
  lightboxImage.src = ilustracion.src; // Usa 'src' de tu estructura original
  lightboxImage.alt = ilustracion.alt;
  lightboxNombreIlustracion.textContent = ilustracion.nombre;
  lightboxSubtituloIlustracion.textContent = ilustracion.subtitulo;
  lightboxDescripcionIlustracion.textContent = ilustracion.description;
}

// Event Listeners para el Lightbox
lightboxClose.addEventListener("click", cerrarLightbox);
lightboxPrev.addEventListener("click", () => navegarLightbox(-1));
lightboxNext.addEventListener("click", () => navegarLightbox(1));

// Cerrar lightbox al hacer clic fuera del contenido
lightboxOverlay.addEventListener("click", (e) => {
  if (e.target === lightboxOverlay) {
    cerrarLightbox();
  }
});

// Cerrar lightbox con la tecla ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightboxOverlay.classList.contains("active")) {
    cerrarLightbox();
  }
});

// Inicialización
window.addEventListener("DOMContentLoaded", () => {
  cargarListaProyectosIlustracion();
  seleccionarProyectoIlustracion(proyectoIlustracionActualKey); // Cargar el proyecto inicial
});
