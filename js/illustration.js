const datosIlustraciones = [
  {
    src: "https://placehold.co/300x200/FFD700/000000?text=Boceto+1",
    alt: "Boceto de personaje fantástico",
    description:
      "Este boceto representa mi exploración inicial de un personaje para un RPG de fantasía, centrándome en la silueta y la pose dinámica.",
  },
  {
    src: "https://placehold.co/300x200/ADFF2F/000000?text=Concepto+2",
    alt: "Concepto de entorno futurista",
    description:
      "Un estudio de ambiente para un nivel de ciencia ficción, experimentando con iluminación y arquitectura modular.",
  },
  {
    src: "https://placehold.co/300x200/8A2BE2/FFFFFF?text=Ilustracion+3",
    alt: "Ilustración de criatura mítica",
    description:
      "Una ilustración detallada de una criatura alada, combinando elementos orgánicos y fantásticos en su diseño.",
  },
  {
    src: "https://placehold.co/300x200/FF6347/FFFFFF?text=Boceto+4",
    alt: "Boceto de arma de ciencia ficción",
    description:
      "Diseño conceptual de un arma energética, explorando formas ergonómicas y detalles tecnológicos.",
  },
  {
    src: "https://placehold.co/300x200/4682B4/FFFFFF?text=Escena+5",
    alt: "Escena de batalla épica",
    description:
      "Una composición de una escena de acción, enfocada en la narrativa visual y el movimiento de los personajes.",
  },
  {
    src: "https://placehold.co/300x200/FFD700/000000?text=Boceto+6",
    alt: "Boceto de personaje fantástico",
    description:
      "Este boceto representa mi exploración inicial de un personaje para un RPG de fantasía, centrándome en la silueta y la pose dinámica.",
  },
  {
    src: "https://placehold.co/300x200/ADFF2F/000000?text=Concepto+7",
    alt: "Concepto de entorno futurista",
    description:
      "Un estudio de ambiente para un nivel de ciencia ficción, experimentando con iluminación y arquitectura modular.",
  },
  {
    src: "https://placehold.co/300x200/8A2BE2/FFFFFF?text=Ilustracion+8",
    alt: "Ilustración de criatura mítica",
    description:
      "Una ilustración detallada de una criatura alada, combinando elementos orgánicos y fantásticos en su diseño.",
  },
  {
    src: "https://placehold.co/300x200/FF6347/FFFFFF?text=Boceto+9",
    alt: "Boceto de arma de ciencia ficción",
    description:
      "Diseño conceptual de un arma energética, explorando formas ergonómicas y detalles tecnológicos.",
  },
  {
    src: "https://placehold.co/300x200/4682B4/FFFFFF?text=Escena+10",
    alt: "Escena de batalla épica",
    description:
      "Una composición de una escena de acción, enfocada en la narrativa visual y el movimiento de los personajes.",
  },
];

function cargarGaleriaIlustraciones() {
  const galeriaContainer = document.querySelector("#dibujo .galeria");
  if (!galeriaContainer) return; // Ensure the container exists

  galeriaContainer.innerHTML = ""; // Clear existing content

  datosIlustraciones.forEach((ilustracion) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("galeria-item");

    const img = document.createElement("img");
    img.src = ilustracion.src;
    img.alt = ilustracion.alt;

    const desc = document.createElement("p");
    desc.classList.add("descripcion-ilustracion");
    desc.textContent = ilustracion.description;

    itemDiv.appendChild(img);
    itemDiv.appendChild(desc);
    galeriaContainer.appendChild(itemDiv);
  });
}

// Call the function when the DOM is fully loaded
window.addEventListener("DOMContentLoaded", cargarGaleriaIlustraciones);
