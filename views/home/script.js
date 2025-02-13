let currentIndex = 0; // Índice actual del slide visible
const carouselInterval = 10000; // Tiempo en milisegundos para el cambio automático del primer carrusel (10 segundos)

// Función para mostrar el slide correspondiente
function showSlide(index) {
    const items = document.querySelectorAll('.carousel-item'); // Selecciona todos los items del carrusel
    items.forEach((item, i) => {
        // Añadir o quitar la clase 'active' para mostrar el item correspondiente y ocultar los demás
        item.classList.toggle('opacity-100', i === index);
        item.classList.toggle('opacity-0', i !== index);
    });
}

// Función para ir al siguiente slide
function nextSlide() {
    const items = document.querySelectorAll('.carousel-item');
    currentIndex = (currentIndex + 1) % items.length; // Incrementa el índice y lo reinicia si supera el número de slides
    showSlide(currentIndex); // Muestra el nuevo slide
}

// Función para ir al slide anterior
function prevSlide() {
    const items = document.querySelectorAll('.carousel-item');
    currentIndex = (currentIndex - 1 + items.length) % items.length; // Decrementa el índice y lo ajusta si es negativo
    showSlide(currentIndex); // Muestra el nuevo slide
}

// Inicializa el carrusel mostrando el primer elemento al cargar la página
showSlide(currentIndex);

// Configurar el carrusel para cambiar automáticamente
setInterval(nextSlide, carouselInterval);

// Funciones para abrir y cerrar la ventana modal
const contactLink = document.getElementById('contact-link'); // Selecciona el enlace Contacto

contactLink.addEventListener('click', (e) => {
    e.preventDefault(); // Previene que se siga el enlace
    document.getElementById('contact-modal').style.display = 'block'; // Muestra la ventana modal
});

// Cerrar ventana modal al hacer clic en "X"
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('contact-modal').style.display = 'none'; // Oculta la ventana modal
});

document.getElementById('piscina').addEventListener('click', function() {
    openModal('modalPiscina');
});

document.getElementById('salonFiestas').addEventListener('click', function() {
    openModal('modalSalonFiestas');
});

document.getElementById('zonasVerdes').addEventListener('click', function() {
    openModal('modalZonasVerdes');
});

function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}