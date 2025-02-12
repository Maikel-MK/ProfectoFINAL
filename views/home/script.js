let currentIndex = 0; // Índice actual del slide visible
const carouselInterval = 10000; // Tiempo en milisegundos para el cambio automático del primer carrusel (10 segundos)
const installationInterval = 6000; // Tiempo en milisegundos para el cambio automático del slider (6 segundos)

// Función para mostrar el slide correspondiente
function showSlide(index) {
    const items = document.querySelectorAll('.carousel-item'); // Selecciona todos los items del carrusel
    items.forEach((item, i) => {
        // Añadir o quitar la clase 'active' para mostrar el item correspondiente y ocultar los demás
        item.classList.toggle('active', i === index);
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

// Lógica para mostrar/ocultar el menú hamburguesa
const menuToggle = document.getElementById('menu-toggle'); // Selecciona el botón del menú hamburguesa
const mobileMenu = document.getElementById('mobile-menu'); // Selecciona el menú móvil

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden'); // Alternar visibilidad del menú móvil al hacer clic en el botón
});

// Funciones para el slider automático (nuevo)
let installationIndex = 0; // Índice actual del slide visible en instalaciones

function showInstallationSlide(index) {
    const items = document.querySelectorAll('#installations-slider .slider-item'); // Selecciona todos los items del slider
    items.forEach((item, i) => {
        item.style.display = i === index ? 'block' : 'none'; // Muestra u oculta según corresponda
    });
}

function nextInstallationSlide() {
    const items = document.querySelectorAll('#installations-slider .slider-item');
    installationIndex = (installationIndex + 1) % items.length; // Incrementar índice y reiniciar si es necesario
    showInstallationSlide(installationIndex); // Muestra nuevo slide
}

// Inicializa mostrando primer elemento en instalaciones
showInstallationSlide(installationIndex);

// Cambia automáticamente cada 6 segundos usando setInterval para las instalaciones
setInterval(nextInstallationSlide, installationInterval); // Llama a nextInstallationSlide cada 6 segundos

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