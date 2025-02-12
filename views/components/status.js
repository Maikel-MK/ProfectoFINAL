
function loadStatusPage() {
    const status = document.querySelector('#status')

    status.innerHTML = `
        <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4">Gestión de Estatus</h2>

            <!-- Sección para Residentes -->
            <div class="mb-6">
                <h3 class="font-bold text-lg">Estatus de Residentes</h3>
                <table class="min-w-full bg-white border border-gray-300 mb-4">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border-b">Nombre</th>
                            <th class="py-2 px-4 border-b">Pagos Pendientes</th>
                            <th class="py-2 px-4 border-b">Estado de Morosidad</th>
                            <th class="py-2 px-4 border-b">Alquiler Zonas</th>
                        </tr>
                    </thead>
                    <tbody id="residentStatusTableBody">
                        <!-- Las filas se llenarán dinámicamente -->
                    </tbody>
                </table>
            </div>
            
                        <!-- Sección para Visitantes -->
            <div class="mb-6">
                <h3 class="font-bold text-lg">Estatus de Visitantes</h3>
                <table class="min-w-full bg-white border border-gray-300 mb-4">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border-b">Nombre</th>
                            <th class="py-2 px-4 border-b">Pagos Pendientes</th>
                            <th class="py-2 px-4 border-b">Alquiler Zonas</th>
                        </tr>
                    </thead>
                    <tbody id="visitorStatusTableBody">
                        <!-- Las filas se llenarán dinámicamente -->
                    </tbody>
                </table>
            </div>

            <!-- Sección para gestionar estatus -->
            <div id='manageStatusSection'>
                <h3 class='font-bold text-lg'>Administrar Estatus</h3>

                <!-- Formulario para agregar o editar estatus -->
                <form id='manageStatusForm'>
                    <label for='name' class='block mb-1'>Nombre:</label>
                    <input type='text' id='name' required placeholder='Nombre del residente o visitante' class='border rounded p-2 mb-4 w-full'/>
                    
                    <!-- Selección del tipo (Residente o Visitante) -->
                    <label for='type' class='block mb-1'>Tipo:</label>
                    <select id='type' required class='border rounded p-2 mb-4 w-full'>
                        <option value='resident'>Residente</option>
                        <option value='visitor'>Visitante</option>
                    </select>

                    <!-- Campos adicionales según el tipo -->
                    <label for='pendingPayments' class='block mb-1'>Pagos Pendientes:</label>
                    <input type='number' id='pendingPayments' required placeholder='$0.00' class='border rounded p-2 mb-4 w-full'/>
                    
                    <!-- Estado de morosidad solo para residentes -->
                    <div id='morositySection'>
                        <label for='morosity' class='block mb-1'>Estado de Morosidad:</label>
                        <select id='morosity' required class='border rounded p-2 mb-4 w-full'>
                            <option value='alDia'>Al Día</option>
                            <option value='moroso'>Moroso</option>
                        </select> 
                    </div>

                    <!-- Alquiler de zonas -->
                    <label for='rentedAreas' class='block mb-1'>Alquiler Zonas:</label>
                    <input type='text' id='rentedAreas' placeholder='Zonas alquiladas (separadas por comas)' class='border rounded p-2 mb-4 w-full'/>

                    <!-- Botón para agregar o editar -->
                    <button type='submit' onclick='manageStatus(event)' class='bg-green-500 text-white px-4 py-2 rounded'>Guardar Estatus</button> 
                </form>

            </div>

              <button id="backButton" class="fixed bottom-5 right-5 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 ease-in-out" onclick="goBack()"> Go Back </button>

        </main>`;
    
    loadResidentStatus(); // Cargar los estatus de residentes al cargar la página
    loadVisitorStatus(); // Cargar los estatus de visitantes
}

// Función para cargar los estatus de residentes
function loadResidentStatus() {
    const residentStatusTableBody = document.getElementById('residentStatusTableBody');
    residentStatusTableBody.innerHTML = ''; // Limpiar tabla existente

    // Datos ficticios del estado de residentes
    const residentData = [
        { nombre: 'Juan Pérez', pagosPendientes: '$100', morosidad: 'Al Día', alquiler: 'Zona A' },
        { nombre: 'María Gómez', pagosPendientes: '$50', morosidad: 'Moroso', alquiler: 'Ninguno' },
        { nombre: 'Carlos López', pagosPendientes: '$0', morosidad: 'Al Día', alquiler: 'Zona B' }
    ];

    // Llenar la tabla con los datos del estado de residentes
    residentData.forEach(item => {
        const row = `
            <tr>
                <td class="py-2 px-4 border-b">${item.nombre}</td> 
                <td class="py-2 px-4 border-b">${item.pagosPendientes}</td> 
                <td class="py-2 px-4 border-b">${item.morosidad}</td> 
                <td class="py-2 px-4 border-b">${item.alquiler}</td> 
            </tr>`;
        residentStatusTableBody.innerHTML += row; // Añadir fila a la tabla
    });
}

// Función para cargar los estatus de visitantes
function loadVisitorStatus() {
    const visitorStatusTableBody = document.getElementById('visitorStatusTableBody');
    visitorStatusTableBody.innerHTML = ''; // Limpiar tabla existente

    // Datos ficticios del estado de visitantes
    const visitorData = [
        { nombre: 'Pedro Sánchez', pagosPendientes: '$0', alquiler: 'Zona C' },
        { nombre: 'Laura Fernández', pagosPendientes: '$25', alquiler: 'Ninguno' }
    ];

    // Llenar la tabla con los datos del estado de visitantes
    visitorData.forEach(item => {
        const row = `
            <tr>
                <td class="py-2 px-4 border-b">${item.nombre}</td> 
                <td class="py-2 px-4 border-b">${item.pagosPendientes}</td> 
                <td class="py-2 px-4 border-b">${item.alquiler}</td> 
            </tr>`;
        visitorStatusTableBody.innerHTML += row; // Añadir fila a la tabla
    });
}

// Función para manejar el envío del formulario y gestionar el estatus
function manageStatus(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const name = document.getElementById('name').value; // Obtener nombre
    const type = document.getElementById('type').value; // Obtener tipo (residente o visitante)
    const pendingPayments = document.getElementById('pendingPayments').value; // Obtener pagos pendientes

    let morosity = '';
    if (type === 'resident') {
        morosity = document.getElementById('morosity').value; // Obtener estado de morosidad si es residente
    }

    const rentedAreas = document.getElementById('rentedAreas').value; // Obtener zonas alquiladas

    alert(`Estatus guardado:\nNombre: ${name}\nTipo: ${type}\nPagos Pendientes: ${pendingPayments}\nMorosidad: ${morosity}\nZonas Alquiladas: ${rentedAreas}`);
    
    // Aquí deberías agregar lógica para guardar estos datos en una base de datos o API

    // Reiniciar formulario
    document.getElementById('manageStatusForm').reset();
}


function goBack() {
    history.back()
  }
