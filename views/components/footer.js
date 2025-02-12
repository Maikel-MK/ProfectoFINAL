document.addEventListener('DOMContentLoaded', function() {
   loadFooter();
});

function loadFooter() {
   const footer = document.getElementById('footer');
   footer.innerHTML = `
       <div class="bg-gray-800 text-white py-4">
           <div class="container mx-auto text-center">
               <p>&copy; Residencial Oasis</p>
               <p>
                   <a href="#" class="text-blue-400 hover:underline">Política de Privacidad</a> |
                   <a href="#" class="text-blue-400 hover:underline">Términos de Servicio</a>
               </p>
           </div>
       </div>
   `;
}