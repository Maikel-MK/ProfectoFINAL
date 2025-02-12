b
function loadInformationPage() {
    document.getElementById('Informacion').innerHTML = `
        <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4">Gestión de Información</h2>

            <!-- Sección Muro de Información -->
            <div class="mb-6">
                <h3 class="font-bold text-lg">Muro de Información</h3>
                <form id='infoForm'>
                    <label for='title' class='block mb-1'>Título:</label>
                    <input type='text' id='title' required placeholder='Título de la información' class='border rounded p-2 mb-4 w-full'/>
                    
                    <label for='content' class='block mb-1'>Contenido:</label>
                    <textarea id='content' required placeholder='Escribe la información aquí...' class='border rounded p-2 mb-4 w-full'></textarea>

                    <div class="flex justify-around">
                        <button type='submit' onclick='addInformation(e)' class='bg-green-500 text-white px-4 py-2 rounded'>Agregar Información</button> 
                        <a href="/muroInfo/" class="bg-blue-500 text-white px-4 py-2 rounded">Muro de Informacion</a> 
                    </div>
                </form>

                <!-- Tabla para mostrar la información existente -->
                <table class="min-w-full bg-white border border-gray-300 mt-4">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border-b">Título</th>
                            <th class="py-2 px-4 border-b">Contenido</th>
                            <th class="py-2 px-4 border-b">Acciones</th> <!-- Nueva columna para acciones -->
                        </tr>
                    </thead>
                    <tbody id="informationTableBody">
                        <!-- Las filas se llenarán dinámicamente -->
                    </tbody>
                </table>
            </div>

            <!-- Sección Correo -->
            <div id='emailSection'>
                <h3 class='font-bold text-lg'>Enviar Correo Electrónico</h3>
                <form id='emailForm'>
                    <label for='recipient' class='block mb-1'>Destinatario:</label>
                    <select id='recipient' required class='border rounded p-2 mb-4 w-full'>
                        <option value='all'>Todos</option> <!-- Opción para enviar a todos -->
                        <!-- Aquí puedes agregar más opciones para residentes específicos -->
                        <option value='resident1'>Juan Pérez</option>
                        <option value='resident2'>María Gómez</option>
                    </select>

                    <label for='emailSubject' class='block mb-1'>Asunto:</label>
                    <input type='text' id='emailSubject' required placeholder='Asunto del correo' class='border rounded p-2 mb-4 w-full'/>

                    <label for='emailBody' class='block mb-1'>Mensaje:</label>
                    <textarea id='emailBody' required placeholder='Escribe tu mensaje aquí...' class='border rounded p-2 mb-4 w-full'></textarea>

                    <button type='submit' onclick='sendEmail(e)' class='bg-blue-500 text-white px-4 py-2 rounded'>Enviar Correo</button> 
                </form>

            </div>
            
            <button id="backButton" class="fixed bottom-5 right-5 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 ease-in-out" onclick="goBack()"> Go Back </button>


        </main>`;
    
    loadInformationData()
}

document.addEventListener('DOMContentLoaded', function() {
    loadInformation();
});

function loadInformation() {
    const informationTableBody = document.getElementById('informationTableBody');
    informationTableBody.innerHTML = ''; // Limpiar tabla existente

    // Datos ficticios para la información
    const informationData = [
        { title: 'Información 1', content: 'Contenido de la información 1' },
        { title: 'Información 2', content: 'Contenido de la información 2' }
    ];

    // Llenar la tabla con los datos existentes
    informationData.forEach(info => {
        const row = document.createElement('tr');
        row.classList.add('transition-transform', 'duration-300', 'hover:bg-gray-100', 'cursor-pointer');

        row.innerHTML = `
            <td class="py-2 px-4 border-b">${info.title}</td>
            <td class="py-2 px-4 border-b">${info.content}</td>
        `;

        informationTableBody.appendChild(row);
    });
}

// Llamar a la función para cargar la información
loadInformation()




function goBack() {
    history.back()
  }


// Función para ver los artículos publicados
function viewArticles() {
    const articles = [
        { title: 'Reunión Mensual', content: 'La próxima reunión será el 10 de febrero.' },
        { title: 'Mantenimiento Programado', content: 'El mantenimiento se realizará el 15 de febrero.' }
    ];

    let articlesList = 'Artículos Publicados:\n\n';
    
    articles.forEach(article => {
        articlesList += `Título: ${article.title}\nContenido: ${article.content}\n\n`;
    });

    alert(articlesList); // Mostrar los artículos en un alert (puedes cambiar esto por un modal o una nueva sección)
}

// Función para agregar información 
function addInformation(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const title = document.getElementById('title').value; // Obtener título
    const content = document.getElementById('content').value; // Obtener contenido

    // Aquí puedes manejar la subida del archivo (imagen o video) si es necesario

    alert(`Información agregada:\nTítulo: ${title}\nContenido: ${content}`);
    
    // Reiniciar formulario
    document.getElementById('infoForm').reset();

    loadInformationData(); // Recargar la tabla con la nueva información
}

// Función para cargar la información existente en el muro
function loadInformationData() {
    const informationTableBody = document.getElementById('informationTableBody');
    informationTableBody.innerHTML = ''; // Limpiar tabla existente
    

    // Datos ficticios para el muro de información
    const informationData = [
        { title: 'Reunión Mensual', content: 'La próxima reunión será el 10 de febrero.', id: 1 },
        { title: 'Mantenimiento Programado', content: 'El mantenimiento se realizará el 15 de febrero.', id: 2 }
    ];

    // Llenar la tabla con los datos existentes
    informationData.forEach(item => {
        const row = `
            <tr>
                <td class="py-2 px-4 border-b">${item.title}</td> 
                <td class="py-2 px-4 border-b">${item.content}</td> 
                <td class="py-2 px-4 border-b">
                    <!-- Botones para editar y eliminar -->
                    <button onclick='editInformation(${item.id})' class='text-blue-500'>Editar</button> 
                    <button onclick='deleteInformation(${item.id})' class='text-red-500 ml-2'>Eliminar</button> 
                </td>
            </tr>`;
        informationTableBody.innerHTML += row; // Añadir fila a la tabla
    });
}

// Función para enviar un correo electrónico
function sendEmail(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const recipient = document.getElementById('recipient').value; // Obtener destinatario
    const subject = document.getElementById('emailSubject').value; // Obtener asunto
    const body = document.getElementById('emailBody').value; // Obtener mensaje

    alert(`Correo enviado a: ${recipient}\nAsunto: ${subject}\nMensaje: ${body}`);

    // Reiniciar formulario
    document.getElementById('emailForm').reset();
}

// Función para editar una entrada existente en el muro
function editInformation(id) {
   const newTitle = prompt("Ingrese el nuevo título:");
   const newContent = prompt("Ingrese el nuevo contenido:");
   if (newTitle !== null && newContent !== null) {
       alert(`Información ID ${id} actualizada:\nTítulo: ${newTitle}\nContenido: ${newContent}`);
       loadInformationData(); // Recargar la tabla después de editar (en un sistema real, aquí se debería hacer una llamada a una API)
   }
}

// Función para eliminar una entrada existente en el muro
function deleteInformation(id) {
   const confirmDelete = confirm("¿Estás seguro que deseas eliminar la información ID " + id + "?");
   if (confirmDelete) {
       alert(`Información ID ${id} eliminada.`);
       loadInformationData(); // Recargar la tabla después de eliminar (en un sistema real, aquí se debería hacer una llamada a una API)
   }
}