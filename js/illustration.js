/* ═══════════════════════════════════════════════════════
   illustration.js — Sección Ilustración (Tablet Deco 03)
   ═══════════════════════════════════════════════════════ */

const PACKS_ILUSTRACION = {
  bocetosConceptuales: {
    nombre: "En Tiempos de Estrés...",
    subtitulo: "Bocetos Conceptuales",
    icono: "✏",
    ilustraciones: [
      {
        id: "boceto-1",
        src: "assets/illustrations/fondoDibujo.jpg",
        alt: "Boceto de personaje fantástico",
        nombre: "En Tiempos de Estrés Haz lo que Importa",
        subtitulo: "Portada",
        description: "Este boceto representa una exploración inicial de un personaje para un RPG de fantasía, centrándome en la silueta y la pose dinámica. Buscaba una figura que combinara agilidad con una presencia imponente, pensando en sus movimientos en combate.",
      },
      {
        id: "boceto-2",
        src: "assets/illustrations/astro.png",
        alt: "Concepto de entorno futurista",
        nombre: "Ciudad Flotante",
        subtitulo: "Estudio de Ambiente",
        description: "Un estudio de ambiente para un nivel de ciencia ficción, experimentando con iluminación y arquitectura modular. La idea era capturar la sensación de una metrópolis suspendida, con detalles que sugirieran su funcionalidad y vida cotidiana.",
      },
      {
        id: "boceto-3",
        src: "https://placehold.co/300x400/8A2BE2/FFFFFF?text=Boceto+3",
        alt: "Ilustración de criatura mítica",
        nombre: "Dragón Antiguo",
        subtitulo: "Criatura Mítica",
        description: "Una ilustración detallada de una criatura alada, combinando elementos orgánicos y fantásticos en su diseño. Me enfoqué en la textura de las escamas y la expresión para transmitir su sabiduría ancestral y poder latente.",
      },
      {
        id: "boceto-4",
        src: "https://placehold.co/300x400/FF6347/FFFFFF?text=Boceto+4",
        alt: "Boceto de arma de ciencia ficción",
        nombre: "Rifle de Plasma",
        subtitulo: "Diseño de Arma",
        description: "Diseño conceptual de un arma energética, explorando formas ergonómicas y detalles tecnológicos. Quería que se sintiera potente y futurista, pero también práctica para un personaje humano.",
      },
      {
        id: "boceto-5",
        src: "https://placehold.co/300x400/4682B4/FFFFFF?text=Boceto+5",
        alt: "Escena de batalla épica",
        nombre: "Confrontación Cósmica",
        subtitulo: "Composición Narrativa",
        description: "Una composición de una escena de acción, enfocada en la narrativa visual y el movimiento de los personajes. El desafío fue guiar la mirada del espectador a través de la tensión del momento, usando líneas de fuerza y contraste.",
      },
    ],
  },
  ilustracionesFinales: {
    nombre: "Ilustraciones Finales",
    subtitulo: "Arte pulido y detallado",
    icono: "◈",
    ilustraciones: [
      {
        id: "final-1",
        src: "https://placehold.co/300x400/FF4500/FFFFFF?text=Final+1",
        alt: "Ilustración de paisaje fantástico",
        nombre: "Valle de los Ecos",
        subtitulo: "Paisaje Místico",
        description: "Ilustración final de un valle místico, donde la luz y la sombra juegan un papel crucial para crear una atmósfera de misterio y asombro. Cada elemento fue pensado para contribuir a la sensación de un lugar inexplorado.",
      },
      {
        id: "final-2",
        src: "https://placehold.co/300x400/DA70D6/000000?text=Final+2",
        alt: "Retrato de personaje principal",
        nombre: "Comandante Anya",
        subtitulo: "Retrato Heroico",
        description: "Retrato detallado de un personaje principal, capturando su determinación y liderazgo. Me centré en los detalles de la armadura y la expresión facial para transmitir su personalidad.",
      },
    ],
  },
};

/* ── Estado ── */
let packActivo = null;
let ilustrActivo = 0;
let lbIndex = 0;

const $ = id => document.getElementById(id);

/* ─────────────────────────────────────────────
   Scroll a la sección — mismo patrón que software.js
───────────────────────────────────────────── */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  section.classList.add("mostrar");
  section.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ─────────────────────────────────────────────
   Inicializar botones de packs
───────────────────────────────────────────── */
function inicializarPacks() {
  const container = $("tabletButtons");
  if (!container) return;
  container.innerHTML = "";
  const keys = Object.keys(PACKS_ILUSTRACION);
  keys.forEach((key, i) => {
    const pack = PACKS_ILUSTRACION[key];
    const btn = document.createElement("button");
    btn.classList.add("pack-btn");
    btn.title = pack.nombre;
    btn.dataset.key = key;
    btn.innerHTML = `
      <span class="pack-btn-num">B${i + 1}</span>
      <span class="pack-btn-icon">${pack.icono}</span>
      <span class="pack-btn-label">${pack.nombre}</span>
    `;
    btn.addEventListener("click", () => seleccionarPack(key));
    container.appendChild(btn);
  });
}

/* ─────────────────────────────────────────────
   Seleccionar pack — hace scroll a la sección
───────────────────────────────────────────── */
function seleccionarPack(key) {
  packActivo = key;
  ilustrActivo = 0;

  document.querySelectorAll(".pack-btn").forEach(btn => {
    btn.classList.toggle("activo", btn.dataset.key === key);
  });

  scrollToSection("dibujo");
  mostrarIlustracion();
}

/* ─────────────────────────────────────────────
   Mostrar ilustración activa
───────────────────────────────────────────── */
function mostrarIlustracion() {
  if (!packActivo) return;

  const pack = PACKS_ILUSTRACION[packActivo];
  const ilust = pack.ilustraciones[ilustrActivo];
  const total = pack.ilustraciones.length;

  $("canvasEmpty").style.display = "none";

  const img = $("ilustracionPrincipal");
  img.style.display = "block";
  img.src = ilust.src;
  img.alt = ilust.alt;
  img.onclick = () => abrirLightbox(ilustrActivo);

  $("canvasHint").style.display = "block";

  const aplicarColor = () => {
    if (typeof getDominantColor === "function") {
      const color = getDominantColor(img);
      const shadow = color.replace(/,(\s*\d+\.?\d*)\)/, ", 0.5)");
      img.style.boxShadow = `0 8px 40px ${shadow}`;
    }
  };
  if (img.complete) aplicarColor();
  else img.onload = aplicarColor;

  $("tbPackName").textContent = pack.nombre;
  $("tbCounter").textContent = `${ilustrActivo + 1} / ${total}`;
  $("tbIlustNombre").textContent = ilust.nombre;

  poblarDetalles("tabletDetails", ilust);
}

/* ─────────────────────────────────────────────
   Poblar panel de detalles
───────────────────────────────────────────── */
function poblarDetalles(contenedorId, ilust) {
  const panel = $(contenedorId);
  if (!panel) return;
  panel.innerHTML = `
    <div class="details-header">
      <span class="details-header-label">// DESCRIPCIÓN</span>
      <span class="details-nombre">${ilust.nombre}</span>
      <span class="details-subtitulo">${ilust.subtitulo}</span>
    </div>
    <div class="details-body">
      <p class="details-desc">${ilust.description}</p>
    </div>
  `;
}

/* ─────────────────────────────────────────────
   Navegar entre ilustraciones
───────────────────────────────────────────── */
function navegarIlustracion(dir) {
  if (!packActivo) return;
  const total = PACKS_ILUSTRACION[packActivo].ilustraciones.length;
  ilustrActivo = (ilustrActivo + dir + total) % total;
  mostrarIlustracion();
}

/* ═══════════════════════════════════════════
   LIGHTBOX
═══════════════════════════════════════════ */

function abrirLightbox(index) {
  if (!packActivo) return;
  lbIndex = index;
  actualizarLightbox();
  $("tabletLightbox").classList.add("active");
  document.body.style.overflow = "hidden";
}

function actualizarLightbox() {
  const ilust = PACKS_ILUSTRACION[packActivo].ilustraciones[lbIndex];
  if (!ilust) return;
  $("lightboxImg").src = ilust.src;
  $("lightboxImg").alt = ilust.alt;
  $("lbNombre").textContent = ilust.nombre;
  $("lbSubtitulo").textContent = ilust.subtitulo;
  $("lbDescription").textContent = ilust.description;
}

function cerrarLightbox() {
  $("tabletLightbox").classList.remove("active");
  document.body.style.overflow = "";
}

function navegarLightbox(dir) {
  if (!packActivo) return;
  const total = PACKS_ILUSTRACION[packActivo].ilustraciones.length;
  lbIndex = (lbIndex + dir + total) % total;
  actualizarLightbox();
}

/* ─────────────────────────────────────────────
   Init
───────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  inicializarPacks();

  const primerKey = Object.keys(PACKS_ILUSTRACION)[0];
  if (primerKey) {
    packActivo = primerKey;
    ilustrActivo = 0;
    document.querySelectorAll(".pack-btn").forEach(btn => {
      btn.classList.toggle("activo", btn.dataset.key === primerKey);
    });
    mostrarIlustracion();   // no llama scrollToSection
  }

  $("tabletLightbox").addEventListener("click", e => {
    if (e.target === $("tabletLightbox")) cerrarLightbox();
  });
  $("lightboxX").addEventListener("click", cerrarLightbox);
  $("lbPrev").addEventListener("click", () => navegarLightbox(-1));
  $("lbNext").addEventListener("click", () => navegarLightbox(1));

  /* Dial → siguiente pack (también hace scroll) */
  const dial = $("tabletDial");
  if (dial) {
    dial.addEventListener("click", () => {
      const keys = Object.keys(PACKS_ILUSTRACION);
      const actual = packActivo ? keys.indexOf(packActivo) : -1;
      seleccionarPack(keys[(actual + 1) % keys.length]);
    });
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && $("tabletLightbox")?.classList.contains("active")) {
    cerrarLightbox();
  }
});