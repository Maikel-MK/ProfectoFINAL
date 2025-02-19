

async function loadUsuariosSinAlicuota() {
    const usuariosSinAlicuotaTableBody = document.getElementById('usuariosSinAlicuotaTableBody');
    usuariosSinAlicuotaTableBody.innerHTML = ''; // Limpiar la tabla

    try {
        const response = await axios.get('/api/users/usuarios-sin-alicuota');
        console.log('Respuesta del servidor:', response.data);

        if (response.data.textOk) {
            // Llenar la tabla con los usuarios sin alícuota
            response.data.data.forEach(user => {
                const row = `
                    <tr>
                        <td class="py-2 px-4 border-b">${user.nombre}</td>
                        <td class="py-2 px-4 border-b">${user.correo}</td>
                        <td class="py-2 px-4 border-b">${user.rol}</td>
                        <td class="py-2 px-4 border-b">
                            <button onclick='asignarAlicuota("${user.id}")' class='text-blue-500 hover:text-blue-700'>Asignar Alícuota</button>
                        </td>
                    </tr>`;
                usuariosSinAlicuotaTableBody.innerHTML += row; // Añadir fila a la tabla
            });
        } else {
            alert('No se pudieron cargar los usuarios sin alícuota.');
        }
    } catch (error) {
        console.error('Error al cargar usuarios sin alícuota:', error);
        alert('No se pudieron cargar los usuarios sin alícuota.');
    }
}

// Función para asignar alícuota
async function asignarAlicuota(id) {
    const alicuota = prompt('Ingrese la alícuota para este usuario:');

    if (alicuota) {
        try {
            const response = await axios.post('/api/users/asignar-alicuota', {
                userId: id,
                alicuota: alicuota
            });

            if (response.status === 200) {
                alert(response.data.message); // Mostrar mensaje de éxito
                loadUsuariosSinAlicuota(); // Recargar la lista de usuarios sin alícuota
                loadUsuariosConAlicuota(); // Recargar la lista de usuarios con alícuota
            } else {
                alert(response.data.error); // Mostrar mensaje de error del servidor
            }
        } catch (error) {
            console.error('Error al asignar alícuota:', error);
            if (error.response) {
                alert(error.response.data.error || 'Error al asignar alícuota.');
            } else {
                alert('No se pudo conectar al servidor.');
            }
        }
    } else {
        console.log('La alícuota cancelada.');
    }
}

async function loadUsuariosConAlicuota() {
    const usuariosConAlicuotaTableBody = document.getElementById('usuariosConAlicuotaTableBody');
    usuariosConAlicuotaTableBody.innerHTML = ''; // Limpiar la tabla

    try {
        const response = await axios.get('/api/users/usuarios-con-alicuota');
        console.log('Respuesta del servidor:', response.data);

        if (response.data.textOk) {
            // Llenar la tabla con los usuarios con alícuota
            response.data.data.forEach(user => {
                const row = `
                    <tr>
                        <td class="py-2 px-4 border-b">${user.nombre}</td>
                        <td class="py-2 px-4 border-b">${user.correo}</td>
                        <td class="py-2 px-4 border-b">${user.rol}</td>
                        <td class="py-2 px-4 border-b">${user.alicuota}%</td>
                        <td class="py-2 px-4 border-b">
                            <button onclick='editarAlicuota("${user.id}")' class='text-blue-500 hover:text-blue-700'>Editar</button>
                            <button onclick='eliminarAlicuota("${user.id}")' class='text-red-500 hover:text-red-700 ml-2'>Eliminar</button>
                        </td>
                    </tr>`;
                usuariosConAlicuotaTableBody.innerHTML += row; // Añadir fila a la tabla
            });
        } else {
            alert('No se pudieron cargar los usuarios con alícuota.');
        }
    } catch (error) {
        console.error('Error al cargar usuarios con alícuota:', error);
        alert('No se pudieron cargar los usuarios con alícuota.');
    }
}

// Función para mostrar usuarios sin alícuota
function mostrarUsuariosSinAlicuota() {
    const asignarAlicuotaSection = document.getElementById('asignarAlicuotaSection');
    const usuariosConAlicuotaSection = document.getElementById('usuariosConAlicuotaSection');

    // Ocultar la sección de usuarios con alícuota
    usuariosConAlicuotaSection.classList.add('hidden');

    // Mostrar la sección de usuarios sin alícuota
    asignarAlicuotaSection.classList.remove('hidden');

    // Cargar los usuarios sin alícuota
    loadUsuariosSinAlicuota();
}

// Función para mostrar usuarios con alícuota
function mostrarUsuariosConAlicuota() {
    const asignarAlicuotaSection = document.getElementById('asignarAlicuotaSection');
    const usuariosConAlicuotaSection = document.getElementById('usuariosConAlicuotaSection');

    // Ocultar la sección de usuarios sin alícuota
    asignarAlicuotaSection.classList.add('hidden');

    // Mostrar la sección de usuarios con alícuota
    usuariosConAlicuotaSection.classList.remove('hidden');

    // Cargar los usuarios con alícuota
    loadUsuariosConAlicuota();
}

async function asignarAlicuota(userId) {
    const alicuota = prompt('Ingrese la alícuota para este usuario:');

    if (alicuota) {
        try {
            const response = await axios.post('/api/users/asignar-alicuota', {
                userId: userId,
                alicuota: alicuota
            });

            if (response.status === 200) {
                alert(response.data.message); // Mostrar mensaje de éxito
                loadUsuariosSinAlicuota(); 
                loadUsuariosConAlicuota(); 
            } else {
                alert(response.data.error); // Mostrar mensaje de error del servidor
            }
        } catch (error) {
            console.error('Error al asignar alícuota:', error);
            if (error.response) {
                alert(error.response.data.error || 'Error al asignar alícuota.');
            } else {
                alert('No se pudo conectar al servidor.');
            }
        }
    } else {
        alert('La alícuota es obligatoria.');
    }
}

async function editarAlicuota(userId) {
    const nuevaAlicuota = prompt('Ingrese la nueva alícuota para este usuario:');

    if (nuevaAlicuota) {
        try {
            const response = await axios.post('/api/users/asignar-alicuota', {
                userId: userId,
                alicuota: nuevaAlicuota
            });

            if (response.status === 200) {
                alert(response.data.message); // Mostrar mensaje de éxito
                loadUsuariosConAlicuota(); // Recargar la lista de usuarios con alícuota
            } else {
                alert(response.data.error); // Mostrar mensaje de error del servidor
            }
        } catch (error) {
            console.error('Error al editar alícuota:', error);
            if (error.response) {
                alert(error.response.data.error || 'Error al editar alícuota.');
            } else {
                alert('No se pudo conectar al servidor.');
            }
        }
    } else {
        alert('La alícuota es obligatoria.');
    }
}

async function eliminarAlicuota(userId) {
    const confirmar = confirm('¿Está seguro de que desea eliminar la alícuota de este usuario?');

    if (confirmar) {
        try {
            const response = await axios.post('/api/users/eliminar-alicuota', {
                userId: userId
            });

            if (response.status === 200) {
                alert(response.data.message); // Mostrar mensaje de éxito
                loadUsuariosConAlicuota(); // Recargar la lista de usuarios con alícuota
                loadUsuariosSinAlicuota(); // Recargar la lista de usuarios sin alícuota
            } else {
                alert(response.data.error); // Mostrar mensaje de error del servidor
            }
        } catch (error) {
            console.error('Error al eliminar alícuota:', error);
            if (error.response) {
                alert(error.response.data.error || 'Error al eliminar alícuota.');
            } else {
                alert('No se pudo conectar al servidor.');
            }
        }
    }
}