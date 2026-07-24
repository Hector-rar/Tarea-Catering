/* ================================================
   1. GALERÍA DE SLIDES (index.html)
   ================================================ */

/* Variables de estado de la galería */
let index = 0;          /* Número del slide actual (empieza en 0, el primero) */
let slideInterval;      /* Guarda el temporizador del avance automático */

/* Selección de elementos del DOM */
const slides = document.querySelectorAll('.slide');    /* Todos los slides */
const gallery = document.querySelector('.gallery');    /* Contenedor que se mueve horizontalmente */
const dotsContainer = document.querySelector('.dots'); /* Contenedor de los puntitos de navegación */

/* Solo ejecuta el código de la galería si los elementos existen en la página actual */
if (gallery && dotsContainer && slides.length > 0) {

    /* --- Crear un puntito de navegación por cada slide --- */
    slides.forEach((_, i) => {
        const dot = document.createElement('span'); /* Crea un <span> que será el puntito visual */
        dot.addEventListener('click', () => {       /* Al hacer clic en el puntito... */
            index = i;                              /* ...actualiza el índice al de ese puntito */
            showSlide(index);                       /* ...muestra el slide correspondiente */
            resetInterval();                        /* ...reinicia el temporizador automático */
        });
        dotsContainer.appendChild(dot);             /* Agrega el puntito al contenedor en el HTML */
    });

    /* --- Mueve la galería al slide indicado por el índice --- */
    function showSlide(i) {
        if (i >= slides.length) index = 0;                        /* Si pasó del último, vuelve al primero */
        if (i < 0) index = slides.length - 1;                    /* Si retrocedió del primero, va al último */
        gallery.style.transform = `translateX(-${index * 100}%)`; /* Desplaza la galería horizontalmente */
        updateDots();                                              /* Actualiza cuál puntito aparece activo */
    }

    /* --- Avanza al siguiente slide --- */
    function nextSlide() {
        index++;
        showSlide(index);
        resetInterval(); /* Reinicia el temporizador para que cuente desde cero */
    }

    /* --- Retrocede al slide anterior --- */
    function prevSlide() {
        index--;
        showSlide(index);
        resetInterval();
    }

    /* --- Resalta el puntito del slide activo --- */
    function updateDots() {
        const dots = document.querySelectorAll('.dots span');
        dots.forEach(dot => dot.classList.remove('active')); /* Quita "active" de todos */
        dots[index].classList.add('active');                 /* Agrega "active" solo al actual */
    }

    /* --- Reinicia el temporizador del avance automático --- */
    function resetInterval() {
        clearInterval(slideInterval);                   /* Cancela el temporizador anterior */
        slideInterval = setInterval(nextSlide, 4000);  /* Crea uno nuevo cada 4 segundos */
    }

    /* Pausa el avance automático cuando el mouse está sobre la galería */
    gallery.addEventListener('mouseover', () => clearInterval(slideInterval));
    /* Reanuda el avance automático cuando el mouse sale de la galería */
    gallery.addEventListener('mouseout', () => resetInterval());

    /* Inicialización: marca el primer puntito y arranca el avance automático */
    updateDots();
    slideInterval = setInterval(nextSlide, 4000);

} /* Fin del bloque galería */

