function loadInformationData() {
    const informationTableBody = document.getElementById('informationTableBody');
    informationTableBody.innerHTML = ''; // Limpiar tabla existente

    // Datos ficticios para el muro de información
    let informationData = []

    // Llenar la tabla con los datos existentes
    informationData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-2 px-4 border-b">${item.title}</td> 
            <td class="py-2 px-4 border-b">${item.content}</td> 
            <td class="py-2 px-4 border-b">
                <!-- Botones para editar y eliminar -->
                <button class='edit-btn text-blue-500' data-id='${item.id}'>Editar</button> 
                <button class='delete-btn text-red-500 ml-2' data-id='${item.id}'>Eliminar</button> 
            </td>
        `;
        informationTableBody.appendChild(row);
    });

    // Agregar eventos a los botones de editar y eliminar
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', () => editInformation(button.dataset.id));
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => deleteInformation(button.dataset.id));
    });
}

// Función para agregar información 
async function addInformation(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const title = document.getElementById('title').value; // Obtener título
    const content = document.getElementById('content').value; // Obtener contenido

    alert(`Información agregada${Date}:\nTítulo: ${title}\nContenido: ${content}`);

    // Validar que todos los campos sean obligatorios
    if (!titulo || !contenido) {
        alert('Todos los campos son obligatorios.');
        return; // Detener la ejecución si hay campos vacíos
    }

    try {
        // Enviar la solicitud POST al backend sin la fecha
        const response = await axios.post('/informacion', {
            titulo,
            contenido
            // No se envía la fecha, ya que se generará en el backend
        });

        // Verificar si la respuesta fue exitosa
        if (response.status === 201) {
            alert('Información guardada correctamente.'); // Mostrar mensaje de éxito
            console.log('Información guardada:', response.data); // Mostrar datos en consola

            // Reiniciar el formulario después de guardar
            document.getElementById('formularioInformacion').reset();

            // Aquí puedes llamar a una función para recargar la lista de información, si es necesario
            loadInformationData(); // Recargar la tabla o lista con los nuevos datos
        } else {
            alert(response.data.error || 'Error al guardar información.'); // Mostrar mensaje de error del servidor
        }
    } catch (error) {
        console.error('Error al guardar información:', error);

        // Manejar errores del servidor o conexión
        if (error.response) {
            alert(error.response.data.error || 'Error al guardar información.');
        } else {
            alert('No se pudo conectar al servidor.'); // Mensaje de error de conexión
        }
    }


    loadInformationData(); // Recargar la tabla con la nueva información
}

// Función para enviar un correo electrónico
function sendEmail(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const recipient = document.getElementById('recipient').value; // Obtener destinatario
    const subject = document.getElementById('emailSubject').value; // Obtener asunto
    const body = document.getElementById('emailBody').value; // Obtener mensaje

    alert(`Correo enviado a: ${recipient}\nAsunto: ${subject}\nMensaje: ${body}`);

    // Reiniciar formulario
    document.getElementById('emailForm').reset();
}

// Función para editar una entrada existente en el muro
function editInformation(id) {
    const newTitle = prompt("Ingrese el nuevo título:");
    const newContent = prompt("Ingrese el nuevo contenido:");
    if (newTitle !== null && newContent !== null) {
        alert(`Información ID ${id} actualizada:\nTítulo: ${newTitle}\nContenido: ${newContent}`);
        loadInformationData(); // Recargar la tabla después de editar (en un sistema real, aquí se debería hacer una llamada a una API)
    }
}

// Función para eliminar una entrada existente en el muro
function deleteInformation(id) {
    const confirmDelete = confirm("¿Estás seguro que deseas eliminar la información ID " + id + "?");
    if (confirmDelete) {
        alert(`Información ID ${id} eliminada.`);
        loadInformationData(); // Recargar la tabla después de eliminar (en un sistema real, aquí se debería hacer una llamada a una API)
    }
}

function goBack() {
    history.back();
}