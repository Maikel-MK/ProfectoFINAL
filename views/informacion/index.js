function loadInformationData() {
    const informationTableBody = document.getElementById('informationTableBody');
    informationTableBody.innerHTML = ''; // Limpiar tabla existente

    // Datos ficticios para el muro de información
    const informationData = [
        { title: 'Reunión Mensual', content: 'La próxima reunión será el 10 de febrero.', id: 1 },
        { title: 'Mantenimiento Programado', content: 'El mantenimiento se realizará el 15 de febrero.', id: 2 }
    ];

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
function addInformation(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const title = document.getElementById('title').value; // Obtener título
    const content = document.getElementById('content').value; // Obtener contenido

    // Aquí puedes manejar la subida del archivo (imagen o video) si es necesario

    alert(`Información agregada:\nTítulo: ${title}\nContenido: ${content}`);
    
    // Reiniciar formulario
    document.getElementById('infoForm').reset();

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