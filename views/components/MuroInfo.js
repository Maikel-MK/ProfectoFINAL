async function loadArticlesPage() {
    const Muro = document.querySelector('#Muro');
    Muro.innerHTML = `
        <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4 text-center">Muro de Informacion</h2>

            <!-- Tabla para mostrar los artículos publicados -->
            <table class="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="py-3 px-4 border-b text-center">Título</th>
                        <th class="py-3 px-4 border-b">Contenido</th>
                        <th class="py-3 px-4 border-b text-center">Acciones</th> <!-- Columna para acciones -->
                    </tr>
                </thead>
                <tbody id="articlesTableBody" class="divide-y divide-gray-200">
                    <!-- Las filas se llenarán dinámicamente -->
                </tbody>
            </table>

            <div class="flex justify-center mt-20">
                <button id="backButton" class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 ease-in-out cursor-pointer" onclick="goBack()">Go Back</button>
            </div>
        </main>
    `;

    await loadPublishedArticles();
}

// Función para cargar los artículos publicados
async function loadPublishedArticles() {
    const articlesTableBody = document.getElementById('articlesTableBody');
    articlesTableBody.innerHTML = ''; // Limpiar tabla existente

    try {
        const response = await axios.get('/api/infoM/lista-informacion');
        if (response.status === 200) {
            response.data.data.forEach(item => {
                const row = document.createElement('tr');
                row.classList.add('hover:bg-gray-100', 'transition-colors', 'duration-200'); // Efecto hover

                // Truncar contenido
                const truncatedContent = item.contenido.length > 20 
                    ? item.contenido.substring(0, 20) + '... ' 
                    : item.contenido;

                row.innerHTML = `
                    <td class="py-3 px-4 border-b text-center">${item.titulo}</td> 
                    <td class="py-3 px-4 border-b">
                        ${truncatedContent}
                    </td> 
                    <td class="py-3 px-4 border-b text-center">
                        <!-- Botón para ver más detalles -->
                    <button class='view-more-btn text-blue-500 hover:text-blue-700 transition-colors duration-200 cursor-pointer' data-title='${item.titulo}' data-content='${item.contenido}'>Ver Detalles</button>
                    </td>
                `;
                articlesTableBody.appendChild(row);
            });

            // Agregar evento para los botones "Ver Detalles"
            document.querySelectorAll('.view-more-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const title = this.dataset.title;
                    const content = this.dataset.content;
                    openModal(title, content); // Llamar a la función para mostrar el modal
                });
            });
        } else {
            alert('No se pudieron cargar las informaciones.');
        }

    } catch (error) {
        console.error('Error al cargar la informacion:', error);
        alert('No se pudo cargar la informacion.');
    }
}

// Función para abrir el modal y mostrar contenido extenso
function openModal(title, content) {
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const articleModal = document.getElementById('articleModal');

    modalTitle.innerText = title; // Establecer título del modal
    modalContent.innerText = content; // Establecer contenido del modal
    articleModal.classList.remove('hidden'); // Mostrar el modal
}

// Función para cerrar el modal
document.getElementById('closeModal').onclick = function() {
    document.getElementById('articleModal').classList.add('hidden'); // Ocultar el modal
}

// Cerrar el modal al hacer clic fuera del contenido del modal
window.onclick = function(event) {
    const articleModal = document.getElementById('articleModal');
    if (event.target == articleModal) {
        articleModal.classList.add('hidden'); // Ocultar el modal si se hace clic fuera de él
    }
}

function goBack() {
    history.back();
}