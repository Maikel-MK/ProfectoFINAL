const navegacion = document.querySelector('#navegacion')

const crearNav = ()=>{
    navegacion.innerHTML = `        
        <div>
            <ul class="flex space-x-4">
                <li><a href="#about" class="hover:underline">Información</a></li> <!-- Enlace a la sección Acerca de -->
                <li><a href="#" id="contact-link" class="hover:underline">Contacto</a></li> <!-- Enlace para abrir la ventana modal de contacto -->
                <li><a href="../login/index.html" class="hover:underline">Iniciar Sesión</a></li> <!-- Enlace a la página de inicio de sesión -->
                <li><a href="../registroUsuarios/index.html" class="hover:underline">Registro</a></li>
            </ul>
        </div>

        <!-- Menú desplegable para móviles (inicialmente oculto) -->
        <nav id="mobile-menu" class="md:hidden hidden flex-col items-center mt-3 space-y-2">
            <a href="#about" class="hover:underline">Información</a> <!-- Enlace a la sección Acerca de -->
            <a href="#" id="contact-link-mobile" class="hover:underline">Contacto</a> <!-- Enlace para abrir la ventana modal de contacto -->
            <a href="login.html" class="hover:underline">Iniciar Sesión</a> <!-- Enlace a la página de inicio de sesión -->
        </nav>`
}