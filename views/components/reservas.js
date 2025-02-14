const reservas = document.querySelector('#reservas')

reservas.innerHTML = `
        <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4">Gestión de Pagos</h2>

            <!-- Sección Pagos Fijos -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6" id="paymentCards">
                ${createCard("Piscina", "$100","Se alquila la piscina por un maximo de 4 horas al dia de lunes a viernes y 6 horas los fines de semana y festivos ")}   
                ${createCard("Zonas Verdes", "$50", "Se alquila las zonas verdes por un maximo de 4 horas al dia de lunes a viernes y 6 horas los fines de semana y festivos ")}
                ${createCard("Salon de Fiestas", "$75", "Se alquila el salon de fiestas por un maximo de 12 horas al dia de lunes a viernes ")}
            </div>
</main>

`

function createCard(title, monto, descripcion) {
    return `
        <div class="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer h-60" onclick='openModal("${title}", "${monto}")'>
            <h3 class="font-bold text-lg">${title}</h3>
            <p class="text-gray-600">${monto}</p>
             <p class="text-gray-600">${descripcion}</p>
        </div>`;
}

function openModal(title, monto) {
    document.getElementById('modalTitle').innerText = title; // Establecer título del modal
    document.getElementById('modalAmount').innerText = `Monto a Pagar: ${monto}`; // Establecer monto del modal
    document.getElementById('paymentModal').classList.remove('hidden'); // Mostrar el modal
}

// Función para cerrar el modal.
function closeModal() {
    document.getElementById('paymentModal').classList.add('hidden'); // Ocultar el modal
}

// Cerrar el modal al hacer clic fuera del contenido del modal
window.onclick = function(e) {
    const modal = document.getElementById('paymentModal');
    if (e.target === modal) {
        closeModal()
    }
}
// Función para manejar el pago y actualizar el historial
function payButton(e) {
    e.preventDefault()
    console.log('llega pago');
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