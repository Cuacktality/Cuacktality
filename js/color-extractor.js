/**
 * @fileoverview color-extractor.js: Contiene funciones para extraer el color dominante de una imagen.
 * Permite generar un efecto de resplandor basado en los colores de la ilustración actual.
 */

/**
 * Extrae el color dominante (promedio) de un elemento de imagen dado.
 * Utiliza un canvas para procesar los píxeles de la imagen.
 * @param {HTMLImageElement} imgElement - El elemento <img> del que se extraerá el color.
 * @returns {string} El color dominante en formato RGBA, o un color predeterminado si falla.
 */
function getDominantColor(imgElement) {
  // Crea un elemento canvas temporal para dibujar la imagen
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Asegura que el canvas tenga las mismas dimensiones que la imagen para un muestreo preciso
  canvas.width = imgElement.naturalWidth;
  canvas.height = imgElement.naturalHeight;

  // Si la imagen no tiene dimensiones naturales (ej. aún no cargada), usa un tamaño por defecto
  if (canvas.width === 0 || canvas.height === 0) {
    canvas.width = 100;
    canvas.height = 100;
  }

  try {
    // Dibuja la imagen en el canvas. Esto puede fallar debido a restricciones de CORS.
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

    // Obtiene los datos de los píxeles del canvas
    // Muestreamos cada 4 píxeles (RGBA) para optimizar el rendimiento
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let r = 0,
      g = 0,
      b = 0,
      a = 0;
    let count = 0;

    // Itera sobre los píxeles para calcular el promedio de color
    // Se salta píxeles para mejorar el rendimiento, muestreando cada 20 píxeles horizontales y verticales
    const step = 20 * 4; // Multiplicar por 4 porque imageData es [R, G, B, A]
    for (let i = 0; i < imageData.length; i += step) {
      r += imageData[i];
      g += imageData[i + 1];
      b += imageData[i + 2];
      a += imageData[i + 3]; // Incluir el canal alfa
      count++;
    }

    // Calcula el promedio
    r = Math.floor(r / count);
    g = Math.floor(g / count);
    b = Math.floor(b / count);
    a = (a / count / 255).toFixed(2); // Normaliza el alfa a un valor entre 0 y 1

    // Retorna el color en formato RGBA
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  } catch (e) {
    // Si hay un error (ej. por CORS), imprime en consola y retorna un color predeterminado
    console.error(
      "Error al extraer el color de la imagen (posiblemente CORS):",
      e
    );
    return "rgba(147, 249, 185, 0.6)"; // Color predeterminado (verde azulado)
  }
}
