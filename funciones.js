/* ============================================================
   FUNCIONES PRINCIPALES
   Catálogo de tarjetas con paginación dinámica
   ============================================================ */


/* ============================================================
   1. DATOS — Arreglo de tarjetas del catálogo
   ============================================================ */

/**
 * Cada objeto representa una tarjeta con su imagen, título,
 * categoría, descripción, precio y enlace de detalle.
 */
const tarjetas = [
    {
        img: "img/caterin.postres.jpg",
        idtitulo: "titulo1",
        titulo: "Paquete de Postres",
        categoria: "Fiestas y Bodas",
        descripcion: "Un paquete de postres deliciosos para tu evento.",
        precio: "10.000 colones",
        link: "#"
    },
    {
        img: "img/DesayunosCorp.jpg",
        idtitulo: "titulo2",
        titulo: "Paquete de Desayunos Corporativos",
        categoria: "Eventos Corporativos",
        descripcion: "Un paquete de desayunos deliciosos para tu evento corporativo.",
        precio: "15.000 colones",
        link: "#"
    },
    {
        img: "img/Animacion.jpg",
        idtitulo: "titulo3",
        titulo: "Paquete de Animación",
        categoria: "Fiestas y Bodas",
        descripcion: "Un paquete de animación para tu evento.",
        precio: "20.000 colones",
        link: "#"
    },
    {
        img: "img/catering-bodas-en-la-playa.jpg",
        idtitulo: "titulo4",
        titulo: "Paquete de Bodas en la Playa",
        categoria: "Fiestas y Bodas",
        descripcion: "Un paquete de bodas en la playa para tu evento.",
        precio: "25.000 colones",
        link: "#"
    },
    {
        img: "img/Brunch.jpg",
        idtitulo: "titulo5",
        titulo: "Brunch",
        categoria: "Comidas y Bebidas",
        descripcion: "Un paquete de brunch para tu evento.",
        precio: "20.000 colones",
        link: "#"
    },
    {
        img: "img/Revelacion.jpg",
        idtitulo: "titulo6",
        titulo: "Paquete de Revelación",
        categoria: "Fiestas y Bodas",
        descripcion: "Un paquete de revelación para tu evento.",
        precio: "20.000 colones",
        link: "#"
    },
];


/* ============================================================
   2. CONFIGURACIÓN DE PAGINACIÓN
   ============================================================ */

var tarjetasPorPagina = 4;  // Cantidad de tarjetas visibles por página
var paginaActual = 1;       // Página que se muestra al cargar (comienza en 1)


/* ============================================================
   3. FUNCIÓN: mostrarTarjetas
   Renderiza las tarjetas correspondientes a la página actual
   ============================================================ */

/**
 * Limpia el contenedor, calcula qué tarjetas corresponden
 * a la página actual y las inserta dinámicamente en el DOM.
 */
function mostrarTarjetas() {
    var contenedor = document.getElementById('contenedor'); // Obtiene el contenedor del catálogo

    if (!contenedor) return; // Protección: sale si el elemento no existe en el HTML

    contenedor.innerHTML = ''; // Limpia las tarjetas anteriores antes de renderizar

    // Calcula el rango de tarjetas que pertenecen a la página actual
    var inicio = (paginaActual - 1) * tarjetasPorPagina; // Índice de la primera tarjeta
    var fin    = inicio + tarjetasPorPagina;              // Índice de la última tarjeta (exclusivo)

    var tarjetasPagina = tarjetas.slice(inicio, fin); // Extrae solo las tarjetas de esta página

    // Recorre cada tarjeta y la inserta como elemento HTML en el contenedor
    for (var i = 0; i < tarjetasPagina.length; i++) {
        var tarjeta = tarjetasPagina[i];

        var tarjetaElement = document.createElement('div'); // Crea el contenedor de la tarjeta
        tarjetaElement.className = 'tarjeta';               // Asigna la clase CSS (compatible con IE9+)

        // Construye el HTML interno de la tarjeta con los datos del objeto
        tarjetaElement.innerHTML =
            '<img src="' + tarjeta.img + '" alt="Imagen de ' + tarjeta.titulo + '">' +  // Imagen
            '<div class="info">' +
                '<h2 id="' + tarjeta.idtitulo + '">' + tarjeta.titulo + '</h2>' +         // Título
                '<p class="categoria">Categoría: ' + tarjeta.categoria + '</p>' +         // Categoría
                '<p class="descripcion">' + tarjeta.descripcion + '</p>' +                // Descripción
                '<p class="precio">Precio: ' + tarjeta.precio + '</p>' +                  // Precio
                '<a href="' + tarjeta.link + '" class="ver-mas">Ver más</a>' +            // Enlace de detalle
            '</div>';

        contenedor.appendChild(tarjetaElement); // Agrega la tarjeta al contenedor en el DOM
    }

    mostrarPaginacion(); // Actualiza los botones de paginación después de renderizar
}


/* ============================================================
   4. FUNCIÓN: mostrarPaginacion
   Genera los botones de página dinámicamente
   ============================================================ */

/**
 * Calcula el total de páginas según la cantidad de tarjetas,
 * crea un botón por cada página y marca la página activa.
 */
function mostrarPaginacion() {
    var paginacion = document.getElementById('paginacion'); // Obtiene el contenedor de paginación

    if (!paginacion) return; // Protección: sale si el elemento no existe en el HTML

    var totalPaginas = Math.ceil(tarjetas.length / tarjetasPorPagina); // Total de páginas necesarias

    paginacion.innerHTML = ''; // Limpia los botones anteriores antes de regenerarlos

    // Crea un botón (enlace) por cada página disponible
    for (var i = 1; i <= totalPaginas; i++) {
        var paginaBtn = document.createElement('a'); // Crea el enlace del botón de página

        paginaBtn.href = '#';       // El # evita que el navegador haga scroll al tope
        paginaBtn.textContent
            ? (paginaBtn.textContent = i)
            : (paginaBtn.innerText  = i); // Compatibilidad: textContent (moderno) o innerText (IE8)

        if (i === paginaActual) {
            paginaBtn.className = 'active'; // Resalta visualmente la página actual
        }

        // Usa una función envuelta (IIFE) para capturar correctamente el valor de 'i'
        // en cada iteración del bucle (evita el clásico problema de cierre en bucles)
        paginaBtn.onclick = (function (numeroPagina) {
            return function (e) {
                e.preventDefault();         // Evita que el enlace recargue la página
                paginaActual = numeroPagina; // Actualiza la página activa
                mostrarTarjetas();           // Re-renderiza las tarjetas para la nueva página
            };
        })(i);

        paginacion.appendChild(paginaBtn); // Inserta el botón en el contenedor de paginación
    }
}


/* ============================================================
   5. INICIALIZACIÓN
   Se ejecuta cuando el script carga, mostrando la primera página
   ============================================================ */

mostrarTarjetas(); // Muestra las tarjetas y paginación al cargar la página

// ============================================================
// BUSCADOR//


// Obtiene el elemento input con id 'buscador'
const buscador = document.getElementById('buscador');
// Obtiene el contenedor donde se mostrarán los resultados
const resultados = document.getElementById('resultados-busqueda');
// Arreglo con las páginas que se van a revisar en la búsqueda
const paginas = [ // Lista de páginas a examinar
  { archivo: 'index.html', nombre: 'Inicio' }, // Página principal
  { archivo: 'Coronado.html', nombre: 'Coronado' }, // Página de Coronado 
  { archivo: 'HotelFiesta.html', nombre: 'Hotel Fiesta' }, // Página de Hotel Fiesta
  { archivo: 'LagunasDeDoñaAna.html', nombre: 'Lagunas de Doña Ana' }, // Página de Lagunas de Doña Ana
  { archivo: 'Contacto.html', nombre: 'Contacto' }, // Página de Contacto
  { archivo: 'Recomendados.html', nombre: 'Recomendados' }, // Página de Recomendados
  { archivo: 'preguntasF.html', nombre: 'Preguntas Frecuentes' } // Página de Preguntas Frecuentes

];
async function buscarEnPaginas(palabra) {// Función asíncrona que busca una palabra dentro de las páginas
  resultados.innerHTML = '';  // Limpia los resultados anteriores
  if (palabra.trim() === '') {  // Si el input está vacío (solo espacios o nada)
    resultados.style.display = 'none';    // Oculta el contenedor de resultados
    return; // Sale de la función
  }
  let encontrado = false;
  for (let pagina of paginas) {  // Recorre cada página del arreglo
    try {
      const res = await fetch(pagina.archivo);      // Hace una petición para obtener el contenido de la página
      const texto = await res.text();      // Convierte la respuesta en texto
      // Verifica si el contenido incluye la palabra buscada (sin importar mayúsculas)
      if (texto.toLowerCase().includes(palabra.toLowerCase())) {
        encontrado = true;
        const enlace = document.createElement('a');        // Crea un elemento <a> (enlace)
        enlace.href = pagina.archivo;        // Define la ruta del enlace
        // Texto que verá el usuario
        enlace.textContent = `🔎 Coincidencia en: ${pagina.nombre}`;
        enlace.style.display = 'block';        // Hace que cada resultado esté en una línea
        enlace.style.margin = '5px 0';        // Agrega un pequeño margen entre resultados
        resultados.appendChild(enlace);        // Añade el enlace al contenedor de resultados
      }
    } catch (error) {
      // Muestra error en consola si falla la carga de la página
      console.error('Error al cargar:', pagina.archivo);
    }
  }
  if (encontrado) {
    resultados.style.display = 'block';    // Muestra el contenedor de resultados
  } else {
    // Si no hay coincidencias, lo oculta
    resultados.style.display = 'none';
  }
}
// Evento que se activa cuando el usuario escribe en el buscador
buscador.addEventListener('input', (e) => {
  // Obtiene el texto ingresado eliminando espacios innecesarios
  const palabra = e.target.value.trim();
  // Llama a la función de búsqueda
  buscarEnPaginas(palabra);
});
// Evento global para detectar clics en el documento
document.addEventListener('click', (e) => {
  // Si el clic NO fue dentro del buscador
  if (!document.getElementById('buscador').contains(e.target)) {
    resultados.style.display = 'none';    // Oculta los resultados
  }
});