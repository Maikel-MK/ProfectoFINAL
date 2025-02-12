function loadArticlesPage() {
    const Muro = document.querySelector('#Muro')
    Muro.innerHTML = `
        <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4 text-center">Muro de Informacion</h2>

            <!-- Tabla para mostrar los artículos publicados -->
            <table class="min-w-full bg-white border border-gray-300 transition-transform duration-300 hover:shadow-lg">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b">Título</th>
                        <th class="py-2 px-4 border-b">Contenido</th>
                        <th class="py-2 px-4 border-b">Acciones</th> <!-- Nueva columna para acciones -->
                    </tr>
                </thead>
                <tbody id="articlesTableBody">
                    <!-- Las filas se llenarán dinámicamente -->
                </tbody>
            </table>

        </main>`;
    
    loadPublishedArticles(); 
}

// Función para cargar los artículos publicados
function loadPublishedArticles() {
    const articlesTableBody = document.getElementById('articlesTableBody');
    articlesTableBody.innerHTML = ''; // Limpiar tabla existente

    // Datos ficticios para los artículos publicados
    const articlesData = [
        { title: 'Reunión Mensual', content: 'La próxima reunión será el 10 de febrero.' },
        { title: 'Mantenimiento Programado', content: 'El mantenimiento se realizará el 15 de febrero.' }
    ];

    // Llenar la tabla con los datos existentes
    articlesData.forEach(item => {
        const row = `
            <tr class="transition-transform duration-300 hover:bg-gray-100 cursor-pointer" onclick='openModal("${item.title}", "${item.content}")'>
                <td class="py-2 px-4 border-b">${item.title}</td> 
                <td class="py-2 px-4 border-b">${item.content}</td> 
                <td class="py-2 px-4 border-b">
                    <!-- Botón para ver más detalles -->
                    <button onclick='openModal("${item.title}", "${item.content}")' class='text-blue-500'>Ver Detalles</button> 
                </td>
            </tr>`;
        articlesTableBody.innerHTML += row; // Añadir fila a la tabla
    });
}

// Función para abrir el modal y mostrar contenido extenso
function openModal(title, content) {
    document.getElementById('modalTitle').innerText = title; // Establecer título del modal
    document.getElementById('modalContent').innerText = content; // Establecer contenido del modal
    document.getElementById('articleModal').style.display = "block"; // Mostrar el modal
}

// Función para cerrar el modal
document.getElementById('closeModal').onclick = function() {
    document.getElementById('articleModal').style.display = "none"; // Ocultar el modal
}

// Cerrar el modal al hacer clic fuera del contenido del modal
window.onclick = function(event) {
    if (event.target == document.getElementById('articleModal')) {
        document.getElementById('articleModal').style.display = "none"; // Ocultar el modal si se hace clic fuera de él
    }
}
