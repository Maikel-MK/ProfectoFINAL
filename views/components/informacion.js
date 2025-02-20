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
                        <button type='submit' class='bg-green-500 text-white px-4 py-2 rounded'>Agregar Información</button> 
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

                    <button type='submit' class='bg-blue-500 text-white px-4 py-2 rounded'>Enviar Correo</button> 
                </form>

            </div>
            
            <button id="backButton" class="fixed bottom-5 right-5 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 ease-in-out">Go Back</button>
        </main>`;
    
    loadInformationData();

    // Agregar eventos a los formularios
    document.getElementById('infoForm').addEventListener('submit', addInformation);
    document.getElementById('emailForm').addEventListener('submit', sendEmail);
    document.getElementById('backButton').addEventListener('click', goBack);
}