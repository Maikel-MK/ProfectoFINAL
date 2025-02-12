const dashboard = document.querySelector('#dashboard')


// Función para crear la barra lateral de navegación
function createSidebarAdmin() {
    return `
        <aside class="w-64 bg-white shadow-md">
            <div class="p-6">
                <h1 class="text-2xl font-bold">Residencial Oasis</h1>
                <nav class="mt-6">
                    <ul>
                        <li class="mb-4"><a href="/administrador/" class="text-gray-600 hover:text-blue-500">Inicio</a></li>
                        <li class="mb-4"><a href="/pagos/" class="text-gray-600 hover:text-blue-500">Pagos</a></li> <!-- Redirige a la página de pagos -->
                        <li class="mb-4"><a href="/estatus/" class="text-gray-600 hover:text-blue-500">Estatus</a></li> <!-- Redirige a la página de estatus -->
                        <li class="mb-4"><a href="/info/" class="text-gray-600 hover:text-blue-500">Información</a></li>
                    </ul>
                </nav>
            </div>
        </aside>`;
}

function createSidebarCont() {
    return `
        <aside class="w-64 bg-white shadow-md">
            <div class="p-6">
                <h1 class="text-2xl font-bold">Residencial Oasis</h1>
                <nav class="mt-6">
                    <ul>
                        <li class="mb-4"><a href="/contador/" class="text-gray-600 hover:text-blue-500">Inicio</a></li>
                        <li class="mb-4"><a href="/estatus/" class="text-gray-600 hover:text-blue-500">Estatus</a></li> <!-- Redirige a la página de estatus -->
                        <li class="mb-4"><a href="/info/" class="text-gray-600 hover:text-blue-500">Información</a></li>
                    </ul>
                </nav>
            </div>
        </aside>`;
}

function createSidebarRes() {
    return `
        <aside class="w-64 bg-white shadow-md">
            <div class="p-6">
                <h1 class="text-2xl font-bold">Residencial Oasis</h1>
                <nav class="mt-6">
                    <ul>
                        <li class="mb-4"><a href="/residente/" class="text-gray-600 hover:text-blue-500">Inicio</a></li>
                        <li class="mb-4"><a href="/pagos/" class="text-gray-600 hover:text-blue-500">Pagos</a></li> <!-- Redirige a la página de pagos -->
                        <li class="mb-4"><a href="/info/" class="text-gray-600 hover:text-blue-500">Información</a></li>
                    </ul>
                </nav>
            </div>
        </aside>`;
}


function createCard(title, content) {
    return `
        <div class="bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg p-4">
            <h3 class="font-bold text-lg">
            ${title}
            </h3>

            ${content}

        </div>`
}
// Función que crea el dashboard para el Administrador
function createAdminDashboard() {
    dashboard.innerHTML =`
        ${createSidebarAdmin()}
        <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4 text-center">Administrador</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${createCard("Pagos Pendientes", "<p>Total: $</p><p>Pagos vencidos: - -</p>")}
                ${createCard("Usuarios", "<p><button onclick='manageUsers()' class='text-blue-500 hover:text-blue-700 transition duration-200'>Administrar Usuarios</button></p>")}
                ${createCard("Alicuotas", `<button onclick='manageAlicuotas()' class='text-blue-500 hover:text-blue-700 transition duration-200'>Gestionar Alicuotas</button>`)}
            </div>

            <!-- Sección para gestionar alícuotas -->
            <div id="alicuotasSection" class="mt-6 hidden">
                <h3 class="font-bold text-lg mb-2">Gestión de Alicuotas</h3>
                <table class="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border-b">Propietario</th>
                            <th class="py-2 px-4 border-b">Alicuota (%)</th>
                            <th class="py-2 px-4 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="alicuotasTableBody">
                        <button onclick='#' class='text-blue-500'>Agregar Alicuota</button>
                    </tbody>
                </table>
            </div>

        </main>`;
}


function manageAlicuotas() {
    const alicuotasSection = document.getElementById('alicuotasSection');
    alicuotasSection.classList.toggle('hidden'); // Muestra u oculta la sección de alícuotas
    loadAlicuotas(); // Carga las alícuotas cuando se muestra la sección
 }
 
 // Función que carga las alícuotas en la tabla
 function loadAlicuotas() {
     const alicuotasTableBody = document.getElementById('alicuotasTableBody');
     alicuotasTableBody.innerHTML = ''; // Limpiar tabla existente
 
     // Datos de ejemplo para 10 residentes
     const alicuotasData = [
         { propietario: 'Juan Pérez', alicuota: 30 },
         { propietario: 'María Gómez', alicuota: 20 },
         { propietario: 'Carlos López', alicuota: 15 },
         { propietario: 'Ana Torres', alicuota: 25 },
         { propietario: 'Luis Martínez', alicuota: 10 },
         { propietario: 'Sofía Rodríguez', alicuota: 35 },
         { propietario: 'Pedro Sánchez', alicuota: 40 },
         { propietario: 'Laura Fernández', alicuota: 22 },
         { propietario: 'Javier Castro', alicuota: 18 },
         { propietario: 'Patricia Ruiz', alicuota: 28 }
     ];
 
     // Llenar la tabla con los datos de los residentes
     alicuotasData.forEach(item => {
         const row = `
             <tr>
                 <td class="py-2 px-4 border-b">${item.propietario}</td> <!-- Nombre del propietario -->
                 <td class="py-2 px-4 border-b">${item.alicuota}%</td> <!-- Porcentaje de alícuota -->
                 <td class="py-2 px-4 border-b">
                     <button onclick='editAlicuota("${item.propietario}")' class='text-blue-500'>Editar</button> <!-- Botón para editar -->
                 </td>
             </tr>`;
         alicuotasTableBody.innerHTML += row; // Añadir fila a la tabla
     });
 }

 // Función que permite editar la alícuota de un propietario
function editAlicuota(propietario) {
    const newAlicuota = prompt(`Ingrese nueva alícuota para ${propietario}:`); // Solicita nueva alícuota
    if (newAlicuota !== null) {
        alert(`La alícuota de ${propietario} ha sido actualizada a ${newAlicuota}%.`);
        // Aquí puedes agregar lógica para actualizar la alícuota en la base de datos o API
        loadAlicuotas(); // Recargar las alícuotas después de editar
    }
 }
 
 function manageUsers() {
    alert('Aquí puedes administrar a los demás usuarios.'); // Muestra un mensaje de alerta
    // Aquí puedes agregar lógica adicional para gestionar usuarios, como abrir un modal o redirigir a otra página
 }


// Función que crea el dashboard para el contador
function createAccountantDashboard() {
    dashboard.innerHTML = `
        ${createSidebarCont()} <!-- Llama a la función para crear la barra lateral -->
        <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4">Contador</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${createCard("Reportes Financieros", "<p><button onclick='generateReports()' class='text-blue-500'>Generar Reportes Mensuales</button></p>")}
                ${createCard("Pagos Recibidos", "<p>Total recibido este mes: $5,000.</p>")}
                ${createCard("Estatus de Cuentas", "<p>Cuentas al día: 90%</p>")}
                ${createCard("Gastos Comunes", "<p><button onclick='viewCommonExpenses()' class='text-blue-500'>Ver Gastos Comunes</button></p>")}
            </div>
        </main>`
}






// Función que crea el dashboard para el residente
function createResidentDashboard() {
    dashboard.innerHTML= `
        ${createSidebarRes()} <!-- Llama a la función para crear la barra lateral -->
        <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4">Residente</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${createCard("Mis Proyectos", "<p>Tienes 3 proyectos activos.</p>")}
                ${createCard("Mis Pagos", "<p>No tienes pagos pendientes.</p>")}
                ${createCard("Información Personal", "<p>Última visita: Hoy.</p>")}
            </div>
        </main>`
}


if(window.location.pathname === '/administrador/'){
    createAdminDashboard()
}else if(window.location.pathname === '/contador/'){
    createAccountantDashboard()
}else if(window.location.pathname === '/residente/'){
    createResidentDashboard()
}