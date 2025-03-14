// Función para agregar información 
async function addInformation(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const title = document.getElementById('title').value; // Obtener título
    const content = document.getElementById('content').value; // Obtener contenido

    // Mostrar alerta con la información y la fecha actual
    alert(`Información agregada el ${new Date().toLocaleString()}:\nTítulo: ${title}\nContenido: ${content}`);

    // Validar que todos los campos sean obligatorios
    if (!title || !content) {
        alert('Todos los campos son obligatorios.');
        return; // Detener la ejecución si hay campos vacíos
    }

    try {
        // Enviar la solicitud POST al backend sin la fecha
        const response = await axios.post('/api/infoM/', {
            titulo: title, // Usar las variables correctas
            contenido: content
            // No se envía la fecha, ya que se generará en el backend
        });

        // Verificar si la respuesta fue exitosa
        if (response.status === 201) {
            alert('Información guardada correctamente.'); // Mostrar mensaje de éxito
            console.log('Información guardada:', response.data); // Mostrar datos en consola

            // Reiniciar el formulario después de guardar
            document.getElementById('infoForm').reset();

            // Recargar la tabla o lista con los nuevos datos
            loadInformationData();
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
}

async function loadInformationData() {
    const manageinfoTableBody = document.getElementById('informationTableBody');
    manageinfoTableBody.innerHTML = ''; // Limpiar tabla existente
    try {
        const response = await axios.get('/api/infoM/lista-informacion');
        if (response.status === 200) {
            response.data.data.forEach(item => {
                const row = document.createElement('tr');
                
                // Truncar contenido
                const truncatedContent = item.contenido.length > 20 
                    ? item.contenido.substring(0, 20) + '... ' 
                    : item.contenido;

                row.innerHTML = `
                    <td class="py-2 px-4 border-b bg-gray-100  ">${item.titulo}</td> 
                    <td class="py-2 px-4 border-b bg-gray-100  ">
                        ${truncatedContent}
                        ${item.contenido.length > 20 ? `<button class='view-more-btn text-blue-500' data-content='${item.contenido}'>Ver más</button>` : ''}
                    </td> 
                    <td class="py-2 px-4 border-b bg-gray-100 ">
                        <!-- Botones para editar y eliminar -->
                    <button class='edit-btn text-blue-500 hover:text-blue-700 transition-colors duration-200 cursor-pointer' data-id='${item.id}' data-title='${item.titulo}' data-content='${item.contenido}'>Editar</button>
                    <button class='delete-btn text-red-500 ml-2 cursor-pointer' data-id='${item.id}'>Eliminar</button> 
                    </td>
                `;
                manageinfoTableBody.appendChild(row);
            });

                    // Agregar eventos a los botones de editar y eliminar
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.dataset.id;
                const title = button.dataset.title;
                const content = button.dataset.content;
                    openEditModal(id, title, content); // Abrir el modal de edición
                                });
                            });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => deleteInformation(button.dataset.id));
        });

            // Agregar evento para los botones "Ver más"
            document.querySelectorAll('.view-more-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const fullContent = this.dataset.content;
                    showModal(fullContent); // Llamar a la función para mostrar el modal
                });
            });
        } else {
            alert('No se pudieron cargar las informaciones.');
        }

    } catch (error) {
        console.error('Error al cargar la informacion:', error);
        alert('No se pudo cargar la informacion.');
    }
}

// Función para mostrar el modal
function showModal(content) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/70 bg-opacity-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto my-6">
            <div class="flex justify-between items-center p-4 border-b">
                <h3 class="text-lg font-semibold">Contenido Completo</h3>
                <button type="button" class="close-btn text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <div class="p-6 overflow-y-auto" style="max-height: 400px;">
                <p>${content}</p>
            </div>
            <div class="flex justify-end p-4 border-t">
                <button type="button" class="close-btn text-blue-500">Cerrar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);

    // Cerrar el modal al hacer clic en 'X' o en 'Cerrar'
    modal.querySelectorAll('.close-btn').forEach(btn => {
        btn.onclick = function() {
            document.body.removeChild(modal);
        };
    });

    // Cerrar el modal al hacer clic fuera del contenido
    window.onclick = function(event) {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    };
}

// Función para enviar un correo electrónico
// function sendEmail(e) {
//     e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

//     const recipient = document.getElementById('recipient').value; // Obtener destinatario
//     const subject = document.getElementById('emailSubject').value; // Obtener asunto
//     const body = document.getElementById('emailBody').value; // Obtener mensaje

//     alert(`Correo enviado a: ${recipient}\nAsunto: ${subject}\nMensaje: ${body}`);

//     // Reiniciar formulario
//     document.getElementById('emailForm').reset();
// }

// Función para abrir el modal de edición
function openEditModal(id, currentTitle, currentContent) {
    const editModal = document.getElementById('editModal');
    const editTitle = document.getElementById('editTitle');
    const editContent = document.getElementById('editContent');

    // Llenar el modal con los datos actuales
    editTitle.value = currentTitle;
    editContent.value = currentContent;

    // Mostrar el modal
    editModal.classList.remove('hidden');

    // Manejar el envío del formulario
    const editForm = document.getElementById('editForm');
    editForm.onsubmit = async (e) => {
        e.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

        const newTitle = editTitle.value;
        const newContent = editContent.value;

        if (newTitle && newContent) {
            try {
                // Enviar la solicitud PUT al servidor para actualizar la información
                const response = await axios.put(`/api/infoM/editarInformacion`, {
                    id: id,
                    titulo: newTitle,
                    contenido: newContent
                });

                if (response.status === 200) {
                    alert(`Información ID ${id} actualizada:\nTítulo: ${newTitle}\nContenido: ${newContent}`);
                    loadInformationData(); // Recargar la tabla después de editar
                    editModal.classList.add('hidden'); // Cerrar el modal
                } else {
                    alert(response.data.error || 'Error al actualizar la información.');
                }
            } catch (error) {
                console.error('Error al editar informacion:', error);
                if (error.response) {
                    alert(error.response.data.error || 'Error al editar informacion.');
                } else {
                    alert('No se pudo conectar al servidor.');
                }
            }
        } else {
            alert('Por favor, complete todos los campos.');
        }
    };

    // Manejar el botón de cancelar
    const cancelEdit = document.getElementById('cancelEdit');
    cancelEdit.onclick = () => {
        editModal.classList.add('hidden'); // Cerrar el modal
    };
}

// Función para cerrar el modal de edición
document.getElementById('closeEditModal').onclick = function() {
    document.getElementById('editModal').classList.add('hidden');
};

// Cerrar el modal de edición al hacer clic fuera del contenido del modal
window.onclick = function(event) {
    const editModal = document.getElementById('editModal');
    if (event.target == editModal) {
        editModal.classList.add('hidden');
    }
};

// Función para eliminar una entrada existente
async function deleteInformation(id) {
    const confirmDelete = confirm("¿Estás seguro que deseas eliminar la Informacion?");

    if (confirmDelete) {
        try {
            // Enviar la solicitud DELETE al servidor para eliminar la información
            const response = await axios.delete(`/api/infoM/eliminar-informacion`, {
                data: { id } // Enviar el ID en el cuerpo de la solicitud
            });

            if (response.status === 200) {
                alert(`Información eliminada.`);
                loadInformationData(); // Recargar la tabla después de eliminar
            } else {
                alert(response.data.error || 'Error al eliminar la información.');
            }
        } catch (error) {
            console.error('Error al eliminar pago:', error)
            if (error.response) {
                alert(error.response.data.error || 'Error al eliminar el pago.')
            } else {
                alert('No se pudo conectar al servidor.')
            }
        }
    }
}


function goBack() {
    history.back();
}
