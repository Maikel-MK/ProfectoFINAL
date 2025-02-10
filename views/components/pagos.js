// payments.js

let paymentHistory = []; // Array para almacenar el historial de pagos

// Función para crear una tarjeta de pago
function createPaymentCard(title, amount) {
    return `
        <div class="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer" onclick='openPaymentModal("${title}", "${amount}")'>
            <h3 class="font-bold text-lg">${title}</h3>
            <p class="text-gray-600">${amount}</p>
        </div>`;
}

// Función para abrir el modal con información del pago
function openPaymentModal(title, amount) {
    document.getElementById('modalTitle').innerText = title; // Establecer título del modal
    document.getElementById('modalAmount').innerText = `Monto a Pagar: ${amount}`; // Establecer monto del modal
    document.getElementById('paymentModal').classList.remove('hidden'); // Mostrar el modal
}

// Función para cerrar el modal.
function closeModal() {
    document.getElementById('paymentModal').classList.add('hidden'); // Ocultar el modal
}

// Cerrar el modal al hacer clic fuera del contenido del modal
window.onclick = function(event) {
    const modal = document.getElementById('paymentModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Función para manejar el pago y actualizar el historial
document.getElementById('payButton').onclick = function() {
    const title = document.getElementById('modalTitle').innerText;
    const amount = document.getElementById('modalAmount').innerText.replace("Monto a Pagar: ", "");

    // Obtener la fecha actual
    const date = new Date().toLocaleDateString();

    // Agregar pago al historial
    paymentHistory.push({
        date: date,
        amount: amount,
        description: title,
        person: "Juan Pérez" // Puedes cambiar esto según sea necesario
    });

    alert(`Pago de ${title} realizado exitosamente!`); // Mensaje de éxito
    closeModal(); // Ocultar el modal después del pago

    updatePaymentHistory(); // Actualizar el historial de pagos
}

// Función para actualizar el historial de pagos en la tabla
function updatePaymentHistory() {
    const paymentHistoryTableBody = document.getElementById('paymentHistoryTableBody');
    paymentHistoryTableBody.innerHTML = ''; // Limpiar tabla existente

    paymentHistory.forEach(payment => {
        const row = `
            <tr>
                <td class="py-2 px-4 border-b">${payment.date}</td>
                <td class="py-2 px-4 border-b">${payment.amount}</td>
                <td class="py-2 px-4 border-b">${payment.description}</td>
                <td class="py-2 px-4 border-b">${payment.person}</td>
            </tr>`;
        paymentHistoryTableBody.innerHTML += row; // Añadir fila a la tabla
    });
}

// Función para cargar la página de pagos
function loadPaymentsPage() {
    const pago = document.getElementById('pago');
    if (!pago) {
        console.error('Element with id "pago" not found.');
        return;
    }

    pago.innerHTML = `
        <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4">Gestión de Pagos</h2>

            <!-- Sección Pagos Fijos -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6" id="paymentCards">
                ${createPaymentCard("Cuota Mensual", "$100")}
                ${createPaymentCard("Fondo de Reserva", "$50")}
                ${createPaymentCard("Mantenimiento", "$75")}
            </div>

            <!-- Modal para mostrar información del pago -->
            <div id="paymentModal" class="hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div class="bg-white rounded-lg shadow-lg relative w-11/12 md:w-3/4 lg:w-2/5 p-6 text-center">
                    <h3 id="modalTitle" class="font-bold text-lg mb-2"></h3>
                    <p id="modalAmount" class="text-gray-700 mb-4"></p>
                    <button id="payButton" class='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'>Pagar</button>
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
                        <th class="py-2 px-4 border-b">Persona</th>
                    </tr>
                </thead>
                <tbody id="paymentHistoryTableBody">
                    <!-- Las filas se llenarán dinámicamente -->
                </tbody>
            </table>

            <!-- Enlace a la página de gestión de pagos -->
            <div class='mt-4'>
                <a href='/opcionesP/' class='text-blue-500'>Administrar Opciones de Pago</a> <!-- Enlace a la página de gestión -->
            </div>

        </main>`;
}
