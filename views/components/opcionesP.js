function loadManagePaymentsPage() {
    document.getElementById('app').innerHTML = `
        <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4">Administrar Opciones de Pago</h2>

            <!-- Sección para ver y administrar pagos fijos -->
            <div class="mb-6">
                <h3 class="font-bold text-lg">Opciones de Pago Fijas</h3>
                <table class="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border-b">Descripción</th>
                            <th class="py-2 px-4 border-b">Monto</th>
                            <th class="py-2 px-4 border-b">Acciones</th> <!-- Nueva columna para acciones -->
                        </tr>
                    </thead>
                    <tbody id="managePaymentsTableBody">
                        <!-- Las filas se llenarán dinámicamente -->
                    </tbody>
                </table>

                <!-- Formulario para agregar un nuevo pago fijo -->
                <h3 class='font-bold text-lg mt-6'>Agregar Nuevo Pago Fijo</h3>
                <form id='addPaymentForm'>
                    <label for='newDescription' class='block mb-1'>Descripción:</label>
                    <input type='text' id='newDescription' required placeholder='Descripción del pago' class='border rounded p-2 mb-4 w-full'/>
                    <label for='newAmount' class='block mb-1'>Monto:</label>
                    <input type='number' id='newAmount' required placeholder='$0.00' class='border rounded p-2 mb-4 w-full'/>
                    <button type='submit' onclick='addFixedPayment(event)' class='bg-green-500 text-white px-4 py-2 rounded'>Agregar Pago Fijo</button> 
                </form>

            </div>

        </main>`;
    
    loadManagePayments(); // Cargar las opciones de pago al cargar la página
}

// Función para cargar las opciones de pago en la tabla
function loadManagePayments() {
    const managePaymentsTableBody = document.getElementById('managePaymentsTableBody');
    managePaymentsTableBody.innerHTML = ''; // Limpiar tabla existente

    // Datos ficticios para las opciones de pago fijas
    const fixedPaymentsData = [
        { descripcion: 'Cuota Mensual', monto: '$100', id: 1 },
        { descripcion: 'Fondo de Reserva', monto: '$50', id: 2 },
        { descripcion: 'Mantenimiento', monto: '$75', id: 3 }
    ];

    // Llenar la tabla con los datos de pagos fijos
    fixedPaymentsData.forEach(item => {
        const row = `
            <tr>
                <td class="py-2 px-4 border-b">${item.descripcion}</td> <!-- Descripción del pago -->
                <td class="py-2 px-4 border-b">${item.monto}</td> <!-- Monto del pago -->
                <td class="py-2 px-4 border-b">
                    <!-- Botones para editar y eliminar -->
                    <button onclick='editFixedPayment(${item.id})' class='text-blue-500'>Editar</button> 
                    <button onclick='deleteFixedPayment(${item.id})' class='text-red-500 ml-2'>Eliminar</button> 
                </td>
            </tr>`;
        managePaymentsTableBody.innerHTML += row; // Añadir fila a la tabla
    });
}

// Función para agregar un nuevo pago fijo
function addFixedPayment(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const description = document.getElementById('newDescription').value; // Obtener descripción
    const newAmount = document.getElementById('newAmount').value; // Obtener monto

    alert(`Nuevo pago fijo agregado: ${description} por un monto de ${newAmount}`); 
    document.getElementById('addPaymentForm').reset(); // Reiniciar formulario

    loadManagePayments(); // Recargar las opciones después de agregar uno nuevo (en un sistema real, aquí se debería hacer una llamada a una API)
}

// Función para editar un pago existente
function editFixedPayment(id) {
   const newAmount = prompt("Ingrese el nuevo monto para el pago ID " + id + ":");
   if (newAmount !== null) {
       alert(`Pago ID ${id} actualizado a ${newAmount}.`); 
       // Aquí puedes agregar lógica para actualizar el pago en la base de datos o API
       loadManagePayments(); // Recargar las opciones después de editar (en un sistema real, aquí se debería hacer una llamada a una API)
   }
}

// Función para eliminar un pago existente
function deleteFixedPayment(id) {
   const confirmDelete = confirm("¿Estás seguro que deseas eliminar el pago ID " + id + "?");
   if (confirmDelete) {
       alert(`Pago ID ${id} eliminado.`); 
       // Aquí puedes agregar lógica para eliminar el pago en la base de datos o API
       loadManagePayments(); // Recargar las opciones después de eliminar (en un sistema real, aquí se debería hacer una llamada a una API)
   }
}