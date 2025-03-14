// document.addEventListener('DOMContentLoaded', function () {
//     loadPaymentsPage(); // Cargar la estructura de la página
//     loadManagePayments(); // Cargar los pagos dinámicamente
//     document.getElementById('payButton').addEventListener('click', payButton); // Asignar evento al botón de pago
// })

// let paymentHistory = []; // Array para almacenar el historial de pagos

// Función para cargar la estructura de la página
function loadPaymentsPage() {
    const pago = document.getElementById('pago');

    pago.innerHTML = `
        <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4">Gestión de Pagos</h2>

            <!-- Sección Pagos Fijos -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6" id="paymentCards">
                <!-- Las tarjetas se llenarán dinámicamente -->
            </div>

               <!-- Modal para mostrar información del pago -->
    <div id="paymentModal" class="hidden fixed top-0 left-0 w-full h-full bg-gray-800/40 bg-opacity-70 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg relative w-11/12 md:w-3/4 lg:w-2/5 p-6 text-center">
            <h3 id="modalTitle" class="font-bold text-lg mb-2"></h3>
            <p id="modalAmount" class="text-gray-700 mb-4"></p>
            <button id="payButton" class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer" onclick="payButton(event)">
                Pagar
            </button>       
        </div>
    </div>

    <!-- Historial de Pagos -->
    <h3 class="font-bold text-lg mt-6">Historial de Pagos</h3>
    <table class="min-w-full bg-white border border-gray-300 mt-4">
        <thead>
            <tr>
                <th class="py-2 px-4 border-b">Fecha</th>
                <th class="py-2 px-4 border-b">Monto</th>
                <th class="py-2 px-4 border-b">Descripción</th>
                <th class="py-2 px-4 border-b">Usuario</th>
            </tr>
        </thead>
        <tbody id="paymentHistoryTableBody">
            <!-- Las filas se llenarán dinámicamente -->
        </tbody>
    </table>
            <!-- Enlace a la página de gestión de pagos -->
            <div class='mt-4'>
                <a href='/opcionesP/' class='text-blue-500'>Administrar Opciones de Pago</a>
            </div>
        </main>

        <button id="backButton" class="fixed bottom-5 right-5 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 ease-in-out cursor-pointer" onclick="goBack()">Go Back</button>
    `;
}

function loadPaymentsPageResident(){
    const pago = document.getElementById('pago');

    pago.innerHTML = `
        <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4">Gestión de Pagos</h2>

            <!-- Sección Pagos Fijos -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6" id="paymentCards">
                <!-- Las tarjetas se llenarán dinámicamente -->
            </div>

            <!-- Modal para mostrar información del pago -->
            <div id="paymentModal" class="hidden fixed top-0 left-0 w-full h-full bg-gray-800/40 bg-opacity-70 flex items-center justify-center">
                <div class="bg-white rounded-lg shadow-lg relative w-11/12 md:w-3/4 lg:w-2/5 p-6 text-center">
                    <h3 id="modalTitle" class="font-bold text-lg mb-2"></h3>
                    <p id="modalAmount" class="text-gray-700 mb-4"></p>
                    <button id="payButton" class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Pagar</button>
                </div>
            </div>

            <!-- Historial de Pagos -->
            <h3 class="font-bold text-lg mt-6">Historial de Pagos</h3>
            <table class="min-w-full bg-white border border-gray-300 mt-4">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b">Fecha</th>
                        <th class="py-2 px-4 border-b">Monto</th>
                        <th class="py-2 px-4 border-b">Descripción</th>
                        <th class="py-2 px-4 border-b">Usuario</th>
                    </tr>
                </thead>
                <tbody id="paymentHistoryTableBody">
                    <!-- Las filas se llenarán dinámicamente -->
                </tbody>
            </table>
        </main>

        <button id="backButton" class="fixed bottom-5 right-5 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 ease-in-out cursor-pointer" onclick="goBack()">Go Back</button>
    `;
}


if(window.location.pathname === '/administrador/'){
    document.addEventListener('DOMContentLoaded', function () {
        loadPaymentsPage(); // Cargar la estructura de la página
        loadManagePayments(); // Cargar los pagos dinámicamente
        document.getElementById('payButton').addEventListener('click', payButton); // Asignar evento al botón de pago
    })
}else if(window.location.pathname === '/residente/'){
    document.addEventListener('DOMContentLoaded', function () {
        loadPaymentsPageResident(); // Cargar la estructura de la página
        loadManagePayments(); // Cargar los pagos dinámicamente
        document.getElementById('payButton').addEventListener('click', payButton); // Asignar evento al botón de pago
    })
}