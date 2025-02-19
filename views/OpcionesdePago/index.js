// Definir la variable fixedPaymentsData con algunos datos de ejemplo
let fixedPaymentsData = [
    { id: 1, descripcion: 'Pago de Mantenimiento', monto: 50.00 },
    { id: 2, descripcion: 'Pago de Seguridad', monto: 30.00 },
    { id: 3, descripcion: 'Pago de Agua', monto: 20.00 }
];

// Función para cargar y mostrar las opciones de pago
function loadManagePayments() {
    const managePaymentsTableBody = document.getElementById('managePaymentsTableBody');
    managePaymentsTableBody.innerHTML = ''; // Limpiar tabla existente

    fixedPaymentsData.forEach(item => {
        const row = `
            <tr class="hover:bg-gray-100">
                <td class="py-2 px-4 border-b">${item.descripcion}</td>
                <td class="py-2 px-4 border-b">${item.monto}</td>
                <td class="py-2 px-4 border-b">
                    <button onclick='editFixedPayment(${item.id})' class='text-blue-500'>Editar</button> 
                    <button onclick='deleteFixedPayment(${item.id})' class='text-red-500 ml-2'>Eliminar</button> 
                </td>
            </tr>`;
        managePaymentsTableBody.innerHTML += row; // Añadir fila a la tabla
    });
}

// Función para agregar un nuevo pago fijo
function addFixedPayment(e) {
    // Prevenir el comportamiento por defecto del formulario
    e.preventDefault();

    // Obtener referencias a los campos del formulario
    const descriptionInput = document.getElementById('newDescription');
    const amountInput = document.getElementById('newAmount');

    // Obtener los valores de los campos
    const description = descriptionInput.value.trim(); // Eliminar espacios en blanco al inicio y al final
    const amount = parseFloat(amountInput.value);

    // Validar los campos
    if (!description) {
        alert("Por favor, introduce una descripción.");
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert("Por favor, introduce un monto válido y mayor que cero.");
        return;
    }

    // Crear el objeto con los datos validados
    const newPago = {
        id: fixedPaymentsData.length + 1, // Generar un ID único
        descripcion: description,
        monto: amount
    };

    // Mostrar el objeto en la consola (para verificar)
    console.log("Nuevo pago a agregar:", newPago);

    // Agregar el nuevo pago a la lista de pagos fijos
    fixedPaymentsData.push(newPago);

    // Recargar la tabla de pagos para mostrar el nuevo pago
    loadManagePayments();

    // Reiniciar el formulario
    document.getElementById('addPaymentForm').reset();

    // Mostrar un mensaje de éxito
    alert(`Nuevo pago fijo agregado: ${description} por un monto de ${amount}`);
}

// Función para editar un pago fijo
function editFixedPayment(id) {
    const monto = prompt("Ingrese el nuevo monto para el pago ID " + id + ":");
    if (monto !== null) {
        // Actualizar el monto del pago en fixedPaymentsData
        const pago = fixedPaymentsData.find(p => p.id === id);
        if (pago) {
            pago.monto = parseFloat(monto);
            alert(`Pago ID ${id} actualizado a ${monto}.`);
            loadManagePayments(); // Recargar las opciones después de editar
        } else {
            alert(`Pago ID ${id} no encontrado.`);
        }
    }
}

// Función para eliminar un pago fijo
function deleteFixedPayment(id) {
    const confirmDelete = confirm("¿Estás seguro que deseas eliminar el pago ID " + id + "?");
    if (confirmDelete) {
        // Eliminar el pago de fixedPaymentsData
        fixedPaymentsData = fixedPaymentsData.filter(p => p.id !== id);
        alert(`Pago ID ${id} eliminado.`);
        loadManagePayments(); // Recargar las opciones después de eliminar
    }
}

// Función para volver atrás
function goBack() {
    history.back();
}

// Función para cargar la página de administración de pagos
function loadManagePaymentsPage() {
    document.getElementById('opcPagos').innerHTML = `
        <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4">Administrar Opciones de Pago</h2>

            <div class="mb-6">
                <h3 class="font-bold text-lg">Opciones de Pago Fijas</h3>
                <table class="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border-b">Descripción</th>
                            <th class="py-2 px-4 border-b">Monto</th>
                            <th class="py-2 px-4 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="managePaymentsTableBody">
                        <!-- Las filas se llenarán dinámicamente -->
                    </tbody>
                </table>

                <h3 class='font-bold text-lg mt-6'>Agregar Nuevo Pago Fijo</h3>
                <form id='addPaymentForm'>
                    <label for='newDescription' class='block mb-1'>Descripción:</label>
                    <input type='text' id='newDescription' required placeholder='Descripción del pago' class='border rounded p-2 mb-4 w-full'/>
                    <label for='newAmount' class='block mb-1'>Monto:</label>
                    <input type='number' id='newAmount' required placeholder='$0.00' class='border rounded p-2 mb-4 w-full' min="0" step="0.01"/>
                    <button type='submit' id='addPaymentButton' class='bg-green-500 text-white px-4 py-2 rounded'>Agregar Pago Fijo</button> 
                </form>
            </div>

            <button id="backButton" class="fixed bottom-5 right-5 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 ease-in-out">Go Back</button>
        </main>`;

    loadManagePayments();

    // Agregar evento al formulario utilizando addEventListener
    const addPaymentForm = document.getElementById('addPaymentForm');
    addPaymentForm.addEventListener('submit', addFixedPayment);

    // Agregar evento al botón de volver atrás
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', goBack);
}

// Cargar la página de administración de pagos al cargar la página
document.addEventListener('DOMContentLoaded', loadManagePaymentsPage);