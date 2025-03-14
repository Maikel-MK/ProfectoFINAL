// Función genérica para cargar datos de la API
async function loadStatus(rol, tableBodyId, includeMorosity = false) {
    const tableBody = document.getElementById(tableBodyId);
    tableBody.innerHTML = ''; // Limpiar tabla existente

    try {
        // Llamada a la API con filtro de rol
        const response = await axios.get(`/api/status/lista-estatus?rol=${rol}`);
        const statusData = response.data.data; // Datos de la API

        // Llenar la tabla con los datos de la API
        statusData.forEach(item => {
            const row = `
                <tr>
                    <td class="py-2 px-4 border-b">${item.nombre}</td> 
                    <td class="py-2 px-4 border-b">${item.pagosPendientes}</td> 
                    ${includeMorosity ? `<td class="py-2 px-4 border-b">${item.estadoMorosidad}</td>` : ''}
                    <td class="py-2 px-4 border-b">${item.alquilerZonas.join(', ')}</td> 
                </tr>`;
            tableBody.innerHTML += row; // Añadir fila a la tabla
        });
    } catch (error) {
        console.error(`Error al cargar los datos de ${rol}:`, error);
        tableBody.innerHTML = `<tr><td colspan="${includeMorosity ? 4 : 3}" class="text-center py-2">Error al cargar los datos.</td></tr>`;
    }
}

// Función para cargar los estatus de residentes
function loadResidentStatus() {
    const residentStatusTableBody = document.getElementById('residentStatusTableBody');
    residentStatusTableBody.innerHTML = ''; // Limpiar tabla existente

    // Llamada a la API para obtener los residentes
    axios.get(`/api/status/lista-estatus?rol=residente`)
        .then(response => {
            const residentData = response.data.data; // Datos de la API

            // Llenar la tabla con los datos de la API
            residentData.forEach(item => {
                const row = `
                    <tr>
                        <td class="py-2 px-4 border-b">${item.nombre}</td> 
                        <td class="py-2 px-4 border-b">${item.pagosPendientes}</td> 
                        <td class="py-2 px-4 border-b">${item.estadoMorosidad}</td> 
                        <td class="py-2 px-4 border-b">${item.alquilerZonas.join(', ')}</td> 
                        <td class="py-2 px-4 border-b">
                            <button onclick="openModal('${item.id}')" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer">Cambiar</button>
                        </td>
                    </tr>`;
                residentStatusTableBody.innerHTML += row; // Añadir fila a la tabla
            });
        })
        .catch(error => {
            console.error('Error al cargar los residentes:', error);
            residentStatusTableBody.innerHTML = `<tr><td colspan="5" class="text-center py-2">Error al cargar los datos.</td></tr>`;
        });
}

// Función para cargar los estatus de visitantes
function loadVisitorStatus() {
    const visitorStatusTableBody = document.getElementById('visitorStatusTableBody');
    visitorStatusTableBody.innerHTML = ''; // Limpiar tabla existente

    // Llamada a la API para obtener los visitantes
    axios.get(`/api/status/lista-estatus?rol=usuario`)
        .then(response => {
            const visitorData = response.data.data; // Datos de la API

            // Llenar la tabla con los datos de la API
            visitorData.forEach(item => {
                const row = `
                    <tr>
                        <td class="py-2 px-4 border-b">${item.nombre}</td> 
                        <td class="py-2 px-4 border-b">${item.pagosPendientes}</td> 
                        <td class="py-2 px-4 border-b">${item.alquilerZonas.join(', ')}</td> 
                        <td class="py-2 px-4 border-b">
                            <button onclick="openModal('${item.id}')" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer">Cambiar</button>
                        </td>
                    </tr>`;
                visitorStatusTableBody.innerHTML += row; // Añadir fila a la tabla
            });
        })
        .catch(error => {
            console.error('Error al cargar los visitantes:', error);
            visitorStatusTableBody.innerHTML = `<tr><td colspan="4" class="text-center py-2">Error al cargar los datos.</td></tr>`;
        });
}

// Función para manejar el envío del formulario y gestionar el estatus
function manageStatus(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const name = document.getElementById('name').value; // Obtener nombre
    const type = document.getElementById('type').value; // Obtener tipo (residente o visitante)
    const pendingPayments = document.getElementById('pendingPayments').value; // Obtener pagos pendientes

    let morosity = '';
    if (type === 'resident') {
        morosity = document.getElementById('morosity').value; // Obtener estado de morosidad si es residente
    }

    const rentedAreas = document.getElementById('rentedAreas').value.split(',').map(area => area.trim()); // Obtener zonas alquiladas

    const data = {
        nombre: name,
        rol: type === 'resident' ? 'residente' : 'usuario',
        pagosPendientes: pendingPayments,
        estadoMorosidad: morosity, // Asegúrate de incluir este campo
        alquilerZonas: rentedAreas
    };

    // Llamada a la API para guardar el estatus
    axios.post('/api/status/', data)
        .then(response => {
            alert('Estatus guardado correctamente.');
            loadResidentStatus(); // Recargar la tabla de residentes
            loadVisitorStatus(); // Recargar la tabla de visitantes
            document.getElementById('manageStatusForm').reset(); // Reiniciar formulario
        })
        .catch(error => {
            console.error('Error al guardar el estatus:', error);
            alert('Error al guardar el estatus.');
        });
}

// Función para abrir el modal con los datos del registro
function openModal(id) {
    const modal = document.getElementById('editModal');
    modal.classList.remove('hidden');

    // Guardar el ID del registro seleccionado en un atributo del modal
    modal.setAttribute('data-id', id);

    // Llamada a la API para obtener los detalles del estatus
    axios.get(`/api/status/${id}`)
        .then(response => {
            const data = response.data.data;
            document.getElementById('editName').value = data.nombre;
            document.getElementById('editPendingPayments').value = data.pagosPendientes;
            document.getElementById('editType').value = data.rol; // Cargar el rol
            document.getElementById('editMorosity').value = data.estadoMorosidad || ''; // Cargar el estado de morosidad (si existe)
            document.getElementById('editRentedAreas').value = data.alquilerZonas.join(', ');
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            alert('No se pudo cargar la información del estatus. Por favor, inténtalo de nuevo.');
        });
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('editModal');
    modal.classList.add('hidden');
}

// Función para eliminar el estatus
function deleteStatus() {
    const modal = document.getElementById('editModal');
    const id = modal.getAttribute('data-id'); // Obtener el ID del registro seleccionado

    if (!id) {
        alert('No se pudo obtener el ID del estatus.');
        return;
    }

    // Confirmar antes de eliminar
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este estatus?');
    if (!confirmDelete) {
        return;
    }

    // Llamada a la API para eliminar el estatus
    axios.delete(`/api/status/eliminar-estatus/${id}`)
        .then(response => {
            alert('Estatus eliminado correctamente.');
            closeModal(); // Cerrar el modal
            loadResidentStatus(); // Recargar la lista de residentes
            loadVisitorStatus(); // Recargar la lista de visitantes
        })
        .catch(error => {
            console.error('Error al eliminar el estatus:', error);
            alert('Error al eliminar el estatus. Por favor, inténtalo de nuevo.');
        });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('editStatusForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    
        const modal = document.getElementById('editModal');
        const id = modal.getAttribute('data-id'); // Obtener el ID del registro seleccionado
    
        const nombre = document.getElementById('editName').value;
        const pagosPendientes = document.getElementById('editPendingPayments').value;
        const estadoMorosidad = document.getElementById('editMorosity').value;
        const alquilerZonas = document.getElementById('editRentedAreas').value.split(',').map(area => area.trim());
    
        // Obtener el rol del registro seleccionado
        const rol = document.getElementById('editType').value; // Asegúrate de tener un campo para el rol en el modal
    
        // Datos a enviar al backend
        const data = {
            id,
            nombre,
            pagosPendientes,
            alquilerZonas,
            rol, // Incluir el rol en los datos
            estadoMorosidad: rol === 'residente' ? estadoMorosidad : undefined // Solo enviar si el rol es 'residente'
        };
    
        // Llamada a la API para editar el estatus
        axios.put('/api/status/editar-estatus', data)
        .then(response => {
            alert('Estatus actualizado correctamente.');
            closeModal(); // Cerrar el modal
            loadResidentStatus(); // Recargar la lista de residentes
            loadVisitorStatus(); // Recargar la lista de visitantes
        })
        .catch(error => {
            console.error('Error al editar el estatus:', error);
            if (error.response && error.response.status === 400) {
                alert('Error de validación: ' + error.response.data.error);
            } else {
                alert('Error al editar el estatus. Por favor, inténtalo de nuevo.');
            }
        });
    });
});

function goBack() {
    history.back();
}