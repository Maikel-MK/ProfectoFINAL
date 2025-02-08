const dashboard = document.querySelector('#dashboard')


// Función para crear la barra lateral de navegación
function createSidebar(){
    dashboard.innerHTML = `
        <aside class="w-64 bg-white shadow-md">
            <div class="p-6">
                <h1 class="text-2xl font-bold">Residencial Oasis</h1>
                <nav class="mt-6">
                    <ul>
                        <li class="mb-4"><a href="admin.html" class="text-gray-600 hover:text-blue-500">Inicio</a></li>
                        <li class="mb-4"><a href="pagos.html" class="text-gray-600 hover:text-blue-500">Pagos</a></li> 
                        <li class="mb-4"><a href="estatus.html" class="text-gray-600 hover:text-blue-500">Estatus</a></li> 
                        <li class="mb-4"><a href="informacion.html" class="text-gray-600 hover:text-blue-500">Información</a></li>
                    </ul>
                </nav>
            </div>
        </aside>`
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
    return `
        ${createSidebar()}
        <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4">Resumen del Dashboard - Administrador</h2>

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
                        
                    </tbody>
                </table>
            </div>

        </main>`;
}

// Función que crea el dashboard para el contador
function createAccountantDashboard() {
    return `
        ${createSidebar()} <!-- Llama a la función para crear la barra lateral -->
        <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4">Resumen del Dashboard - Contador</h2>

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
    return `
        ${createSidebar()} <!-- Llama a la función para crear la barra lateral -->
        <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4">Resumen del Dashboard - Residente</h2>

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