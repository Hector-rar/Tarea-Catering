const tarjetas = [
    {
        img: "img/catering-bodas-en-la-playa.jpg",
        idtitulo: "titulo1",
        titulo: "Bodas en la Playa",
        categoria: "Fiestas y Bodas",
        descripcion: "Un paquete de bodas en la playa para tu evento",
        precio: "200.000 colones",
        link: "#"
    },
    {
        img: "img/CenaCorporativa.jpg",
        idtitulo: "titulo2",
        titulo: "Cenas Corporativas",
        categoria: "Eventos Corporativos",
        descripcion: "Un paquete de cenas deliciosas para tu evento corporativo.",
        precio: "150.000 colones",
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
        img: "img/Decoracion.jpg",
        idtitulo: "titulo4",
        titulo: "Paquete de Decoración",
        categoria: "Fiestas y Bodas",
        descripcion: "Un paquete de decoración para tu evento.",
        precio: "15.000 colones",
        link: "#"
    },
    {
        img: "img/Bartender.jpg",
        idtitulo: "titulo5",
        titulo: "Paquete de Bartender",
        categoria: "Fiestas y Bodas",
        descripcion: "Un paquete de bartenders para tu evento.",
        precio: "25.000 colones",
        link: "#"
    },
    {
        img: "img/Graduacion.jpg",
        idtitulo: "titulo6",
        titulo: "Paquete de Graduación",
        categoria: "Fiestas y Bodas",
        descripcion: "Un paquete de cenas para tu evento de graduación.",
        precio: "20.000 colones",
        link: "#"
    }
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