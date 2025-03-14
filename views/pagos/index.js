// Array para almacenar el historial de pagos (simulado)
let paymentHistory = [];

// Función para cargar los pagos dinámicamente
async function loadManagePayments() {
    const paymentCardsContainer = document.getElementById('paymentCards'); // Contenedor de tarjetas
    paymentCardsContainer.innerHTML = ''; // Limpiar tarjetas existentes

    try {
        // Obtener lista de pagos disponibles
        const responsePagos = await axios.get('/api/pagos/lista-pagos');
        console.log('Respuesta del servidor (pagos):', responsePagos.data);

        // Obtener lista de pagos del historial
        const responseHistorial = await axios.get('/api/historial/lista-historial');
        console.log('Respuesta del servidor (historial):', responseHistorial.data);

        if (responsePagos.data.textOk) {
            // Filtrar los pagos que ya están en el historial
            const pagosFiltrados = responsePagos.data.data.filter(pago => {
                // Verificar si el pago ya está en el historial
                return !responseHistorial.data.some(historial => historial.Descripcion === pago.descripcion);
            });

            // Llenar el contenedor de tarjetas con los pagos filtrados
            pagosFiltrados.forEach(item => {
                const card = createPaymentCard(item.descripcion, `$${item.monto}`); // Crear tarjeta
                paymentCardsContainer.innerHTML += card; // Añadir tarjeta al contenedor
            });
        } else {
            alert('No se pudieron cargar los pagos fijos.');
        }
    } catch (error) {
        console.error('Error al cargar pagos fijos:', error);
        alert('No se pudieron cargar los pagos fijos.');
    }
}

// Función para crear una tarjeta de pago
function createPaymentCard(title, amount) {
    return `
        <div class="payment-card bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer" onclick='openPaymentModal("${title}", "${amount}")'>
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

// Función para cerrar el modal
function closeModal() {
    document.getElementById('paymentModal').classList.add('hidden'); // Ocultar el modal
}

// Cerrar el modal al hacer clic fuera del contenido del modal
window.onclick = function (e) {
    const modal = document.getElementById('paymentModal');
    if (e.target === modal) {
        closeModal();
    }
}

// Función para cargar el historial de pagos desde el servidor
async function loadPaymentHistory() {
    try {
        const response = await axios.get('/api/historial/lista-historial'); // Obtener lista de pagos
        const paymentHistoryTableBody = document.getElementById('paymentHistoryTableBody');
        paymentHistoryTableBody.innerHTML = ''; // Limpiar tabla existente

        response.data.forEach(payment => {
            const row = `
                <tr>
                    <td class="py-2 px-4 border-b">${new Date(payment.fecha).toLocaleDateString()}</td>
                    <td class="py-2 px-4 border-b">$${payment.Monto}</td>
                    <td class="py-2 px-4 border-b">${payment.Descripcion}</td>
                    <td class="py-2 px-4 border-b">${payment.Usuario}</td>
                </tr>`;
            paymentHistoryTableBody.innerHTML += row; // Añadir fila a la tabla
        });
    } catch (error) {
        console.error('Error al cargar el historial de pagos:', error);
        alert('No se pudieron cargar los pagos realizados.');
    }
}

// Función para manejar el pago y actualizar el historial
async function payButton(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del botón
    const title = document.getElementById('modalTitle').innerText;
    const amount = document.getElementById('modalAmount').innerText.replace("Monto a Pagar: ", "");

    // Obtener la fecha actual
    const date = new Date().toLocaleDateString();

    // Obtener el usuario activo desde localStorage
    const activeUser = localStorage.getItem('activeUser') || 'Invitado';

    try {
        // Enviar una solicitud POST al servidor para guardar el pago en el historial
        const response = await axios.post('/api/historial', {
            Monto: parseFloat(amount.replace('$', '')),
            Descripcion: title,
            Usuario: activeUser,
        });

        if (response.status === 201) {
            alert(`Pago de ${title} realizado exitosamente!`); // Mensaje de éxito
            closeModal(); // Ocultar el modal después del pago

            // Eliminar la tarjeta correspondiente al pago realizado
            removePaymentCard(title);

            // Actualizar el historial de pagos
            await loadPaymentHistory();

            // Recargar los pagos disponibles (para actualizar la lista de tarjetas)
            await loadManagePayments();
        } else {
            alert('Hubo un error al realizar el pago.');
        }
    } catch (error) {
        console.error('Error al realizar el pago:', error);
        alert('Hubo un error al realizar el pago.');
    }
}

// Función para eliminar la tarjeta del pago realizado
function removePaymentCard(title) {
    const paymentCardsContainer = document.getElementById('paymentCards');
    const cards = paymentCardsContainer.getElementsByClassName('payment-card'); // Obtener todas las tarjetas

    // Buscar la tarjeta que coincide con el título del pago
    for (let i = 0; i < cards.length; i++) {
        const cardTitle = cards[i].querySelector('h3').innerText; // Obtener el título de la tarjeta
        if (cardTitle === title) {
            paymentCardsContainer.removeChild(cards[i]); // Eliminar la tarjeta
            break;
        }
    }
}

// Cargar los pagos y el historial cuando la página se cargue
document.addEventListener('DOMContentLoaded', () => {
    loadManagePayments();
    loadPaymentHistory();
});

function goBack() {
    history.back()
}