
let fixedPaymentsData = []

// Función para cargar y mostrar las opciones de pago
async function loadManagePayments() {
    const managePaymentsTableBody = document.getElementById('managePaymentsTableBody');
    managePaymentsTableBody.innerHTML = ''; // Limpiar tabla existente

    try {
        // Obtener los pagos fijos desde la API
        const response = await axios.get('/api/pagos/lista-pagos');
        console.log('Respuesta del servidor:', response.data);

        if (response.data.textOk) {
            // Llenar la tabla con los pagos fijos
            response.data.data.forEach(item => {
                const row = `
                    <tr>
                        <td class="py-2 px-4 border-b">${item.descripcion}</td> <!-- Descripción del pago -->
                        <td class="py-2 px-4 border-b">$${item.monto}</td> <!-- Monto del pago -->
                        <td class="py-2 px-4 border-b">
                            <!-- Botones para editar y eliminar -->
                            <button onclick='editFixedPayment("${item.id}")' class='text-blue-500'>Editar</button> 
                            <button onclick='deleteFixedPayment("${item.id}")' class='text-red-500 ml-2'>Eliminar</button> 
                        </td>
                    </tr>`;
                managePaymentsTableBody.innerHTML += row; // Añadir fila a la tabla
            });
        } else {
            alert('No se pudieron cargar los pagos fijos.');
        }
    } catch (error) {
        console.error('Error al cargar pagos fijos:', error);
        alert('No se pudieron cargar los pagos fijos.');
    }
}

// Función para agregar un nuevo pago fijo
async function addFixedPayment(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const description = document.getElementById('newDescription').value; // Obtener descripción
    const newAmount = document.getElementById('newAmount').value; // Obtener monto

    if (!description || !newAmount) {
        alert('Descripción y monto son obligatorios.');
        return;
    }

    try {
        // Enviar la solicitud para agregar un nuevo pago fijo
        const response = await axios.post('/api/pagos', {
            descripcion: description,
            monto: newAmount
        });

        if (response.status === 201) {
            alert('Pago fijo agregado correctamente.');
            document.getElementById('addPaymentForm').reset(); // Reiniciar formulario
            loadManagePayments(); // Recargar la lista de pagos fijos
        } else {
            alert(response.data.error); // Mostrar mensaje de error del servidor
        }
    } catch (error) {
        console.error('Error al agregar pago fijo:', error);
        if (error.response) {
            alert(error.response.data.error || 'Error al agregar pago fijo.');
        } else {
            alert('No se pudo conectar al servidor.');
        }
    }
}

// Función para editar un pago fijo
async function editFixedPayment(id) {
    const newAmount = prompt("Ingrese el nuevo monto para el pago:");
    const newdescripcion = prompt("Ingrese su nueva descripcion")
    if (newAmount !== null || newdescripcion !== null) {
        try {
            // Enviar la solicitud para actualizar el pago fijo
            const response = await axios.put('/api/pagos/editarPago', {
                id: id, // Enviar el ID en el cuerpo de la solicitud
                monto: newAmount
            });

            if (response.status === 200) {
                alert('Pago fijo actualizado correctamente.');
                loadManagePayments(); // Recargar la lista de pagos fijos
            } else {
                alert(response.data.error); // Mostrar mensaje de error del servidor
            }
        } catch (error) {
            console.error('Error al editar pago fijo:', error);
            if (error.response) {
                alert(error.response.data.error || 'Error al editar pago fijo.');
            } else {
                alert('No se pudo conectar al servidor.');
            }
        }
    }
}

// Función para eliminar un pago fijo
async function deleteFixedPayment(id) {
    const confirmDelete = confirm("¿Estás seguro que deseas eliminar este pago fijo?");
    
    if (confirmDelete) {
        try {
            // Enviar la solicitud para eliminar el pago fijo
            const response = await axios.delete(`/api/pagos/eliminarPago`, {
                data: { id } // Enviar el ID del pago en el cuerpo de la solicitud
            });

            if (response.status === 200) {
                alert('Pago fijo eliminado correctamente.');
                loadManagePayments(); // Recargar la lista de pagos fijos
            } else {
                alert(response.data.error || 'Error al eliminar el pago fijo.'); // Mostrar mensaje de error del servidor
            }
        } catch (error) {
            console.error('Error al eliminar pago fijo:', error);
            if (error.response) {
                alert(error.response.data.error || 'Error al eliminar el pago fijo.');
            } else {
                alert('No se pudo conectar al servidor.');
            }
        }
    }
}


// Función para volver atrás
function goBack() {
    history.back()
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
        </main>`

    loadManagePayments()

    // Agregar evento al formulario utilizando addEventListener
    const addPaymentForm = document.getElementById('addPaymentForm')
    addPaymentForm.addEventListener('submit', addFixedPayment)

    // Agregar evento al botón de volver atrás
    const backButton = document.getElementById('backButton')
    backButton.addEventListener('click', goBack)
}

// Cargar la página de administración de pagos al cargar la página
document.addEventListener('DOMContentLoaded', loadManagePaymentsPage)