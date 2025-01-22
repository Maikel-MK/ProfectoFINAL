const navegacion = document.querySelector('#navegacion')

const crearNav = ()=>{
    navegacion.innerHTML = `<nav id="navbar" class="hidden md:flex justify-center space-x-4 mt-3">
            <ul class="flex space-x-4">
                <li><a href="#about" class="hover:underline">Información</a></li> <!-- Enlace a la sección Acerca de -->
                <li><a href="#" id="contact-link" class="hover:underline">Contacto</a></li> <!-- Enlace para abrir la ventana modal de contacto -->
                <li><a href="../login/index.html" class="hover:underline">Iniciar Sesión</a></li> <!-- Enlace a la página de inicio de sesión -->
            </ul>
        </nav>`
}