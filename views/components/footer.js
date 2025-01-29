const footer = document.querySelector('#footer')

const crearFooter = ()=>{
    footer.innerHTML= `
        <footer class='bg-gray-800 text-white text-center p-6 mt-auto'>
        &copy; 2025 Mi Página Web. Todos los derechos reservados.
        | 
        <a href='/privacy-policy' 
           class='hover:underline mx-2'>Política de Privacidad</a>
        |
        <a href='/terms-of-service' 
           class='hover:underline mx-2'>Términos de Servicio</a>
        
        | Síguenos en:
        <a href='#' aria-label='Facebook' target='_blank'><i 
           class='fab fa-facebook mx-2'></i></a>
        <a href='#' aria-label='Twitter' target='_blank'><i 
           class='fab fa-twitter mx-2'></i></a>
        <a href='#' aria-label='Instagram' target='_blank'><i 
           class='fab fa-instagram mx-2'></i></a>

    </footer>
    `
}
