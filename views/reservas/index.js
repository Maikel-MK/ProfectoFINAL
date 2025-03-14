// Función para abrir el modal con información del pago
function openModal(title, monto) {
    document.getElementById('modalTitle').innerText = title; // Establecer título del modal
    document.getElementById('modalAmount').innerText = `Monto a Pagar: ${monto}`; // Establecer monto del modal
    document.getElementById('paymentModal').classList.remove('hidden'); // Mostrar el modal

    // Limpiar el contenedor del botón de PayPal
    const paypalButtonContainer = document.getElementById('paypal-button-container');
    paypalButtonContainer.innerHTML = '';

    // Crear un botón para iniciar el pago con PayPal
    const paypalButton = document.createElement('button');
    paypalButton.innerText = 'Pagar con PayPal';
    paypalButton.className = 'bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer';
    paypalButton.onclick = async () => {
        try {
            // Enviar una solicitud al backend para crear la orden de pago
            const response = await fetch('/create-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: monto.replace('$', '') })
            });

            const data = await response.json();

            // Abrir una nueva ventana para el pago
            const paypalWindow = window.open(data.approvalUrl, 'PayPal', 'width=600,height=400');

            // Verificar si la ventana se cerró
            const checkWindowClosed = setInterval(() => {
                if (paypalWindow.closed) {
                    clearInterval(checkWindowClosed);
                    // Actualizar el historial de pagos
                    updatePaymentHistory();
                    
                }
            }, 500); // Verificar cada 500ms
        } catch (error) {
            console.error('Error al crear el pago:', error);
            alert('Hubo un error al procesar el pago. Inténtalo de nuevo.');
        }
    };

    // Agregar el botón de PayPal al modal
    paypalButtonContainer.appendChild(paypalButton);
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('paymentModal').classList.add('hidden'); // Ocultar el modal
}

// Cerrar el modal al hacer clic fuera del contenido del modal
window.onclick = function(e) {
    const modal = document.getElementById('paymentModal');
    if (e.target === modal) {
        closeModal();
    }
}

// Función para manejar el pago y actualizar el historial
function payButton(e) {
    e.preventDefault();
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

    closeModal(); // Ocultar el modal después del pago

    updatePaymentHistory(); // Actualizar el historial de pagos
}

// Función para actualizar el historial de pagos en la interfaz
function updatePaymentHistory() {
    const paymentHistoryTableBody = document.getElementById('paymentHistoryTableBody');
    paymentHistoryTableBody.innerHTML = '';

    paymentHistory.forEach(payment => {
        const row = `
            <tr>
                <td class="py-2 px-4 border-b">${payment.date}</td>
                <td class="py-2 px-4 border-b">$${payment.amount}</td>
                <td class="py-2 px-4 border-b">${payment.description}</td>
                <td class="py-2 px-4 border-b">${payment.person}</td>
            </tr>`;
        paymentHistoryTableBody.innerHTML += row;
    });
}

// Array para almacenar el historial de pagos
let paymentHistory = [];

// Cargar el historial de pagos cuando la página se cargue
document.addEventListener('DOMContentLoaded', () => {
    updatePaymentHistory();
});


function goBack() {
    history.back()
}