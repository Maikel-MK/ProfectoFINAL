async function loadUsers() {
    const usersTableBody = document.getElementById('usersTableBody');
    usersTableBody.innerHTML = ''; // Limpiar la tabla

    try {
        // Obtener los usuarios desde la API
        const response = await axios.get('/api/users/lista-User');
        console.log('Respuesta del servidor:', response.data);

        if (response.data.textOk) {
            // Llenar la tabla con los usuarios
            response.data.data.forEach(user => {
                const row = `
                    <tr>
                        <td class="py-2 px-4 border-b">${user.nombre}</td>
                        <td class="py-2 px-4 border-b">${user.correo}</td>
                        <td class="py-2 px-4 border-b">${user.rol}</td>
                        <td class="py-2 px-4 border-b">
                            <button onclick='editUser("${user.id}")' class='text-blue-500 hover:text-blue-700'>Editar</button>
                            <button onclick='deleteUser("${user.id}")' class='text-red-500 hover:text-red-700 ml-2'>Eliminar</button>
                        </td>
                    </tr>`;
                usersTableBody.innerHTML += row; // Añadir fila a la tabla
            });
        } else {
            alert('No se pudieron cargar los usuarios.');
        }
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        alert('No se pudieron cargar los usuarios.');
    }
}

// Función para abrir el modal
function openEditModal(user) {
    const modal = document.getElementById('editUserModal');
    document.getElementById('editName').value = user.nombre;
    document.getElementById('editEmail').value = user.correo;
    document.getElementById('editPassword').value = '';
    document.getElementById('editConfirmPassword').value = '';
    document.getElementById('editRol').value = user.rol;
    modal.classList.remove('hidden');
}

// Función para cerrar el modal
function closeEditModal() {
    const modal = document.getElementById('editUserModal');
    modal.classList.add('hidden');
}



async function editUser(userId) {
    try {
        console.log('Obteniendo datos del usuario con ID:', userId); // Depuración

        // Verificar que el userId no sea undefined
        if (!userId) {
            alert('ID de usuario no válido.');
            return;
        }

        // Hacer la solicitud a la ruta /consultar-User
        const response = await axios.get('/api/users/consultar-User', {
            params: { id: userId } // Pasar el ID como parámetro
        });

        console.log('Respuesta del servidor:', response.data); // Depuración

        if (response.data.textOk) {
            const user = response.data.data; // Datos del usuario
            openEditModal(user); // Abrir el modal con los datos del usuario

            // Manejar el envío del formulario del modal
            document.getElementById('editUserForm').onsubmit = async (e) => {
                e.preventDefault();

                const newName = document.getElementById('editName').value;
                const newEmail = document.getElementById('editEmail').value;
                const newPassword = document.getElementById('editPassword').value;
                const confirmPassword = document.getElementById('editConfirmPassword').value;
                const newRol = document.getElementById('editRol').value;

                if (newName && newEmail && newPassword && confirmPassword && newRol) {
                    if (newPassword !== confirmPassword) {
                        alert('Las contraseñas no coinciden.');
                        return;
                    }

                    try {
                        const response = await axios.post('/api/users/editar-user', {
                            id: userId,
                            nombre: newName,
                            correo: newEmail,
                            password: newPassword,
                            password2: confirmPassword,
                            rol: newRol
                        });

                        if (response.status === 200) {
                            alert(response.data.message); // Mostrar mensaje de éxito
                            closeEditModal(); // Cerrar el modal
                            loadUsers(); // Recargar la lista de usuarios
                        } else {
                            alert(response.data.error); // Mostrar mensaje de error del servidor
                        }
                    } catch (error) {
                        console.error('Error al editar usuario:', error);
                        if (error.response) {
                            alert(error.response.data.error || 'Error al editar el usuario.');
                        } else {
                            alert('No se pudo conectar al servidor.');
                        }
                    }
                } else {
                    alert('Todos los campos son obligatorios.');
                }
            };
        } else {
            alert('No se pudieron cargar los datos del usuario.');
        }
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        if (error.response) {
            // Error de respuesta del servidor (ej: 404, 500)
            console.error('Respuesta del servidor:', error.response.data); // Depuración
            alert(error.response.data.error || 'Error al obtener el usuario.');
        } else if (error.request) {
            // Error de conexión (no se recibió respuesta)
            alert('No se pudo conectar al servidor.');
        } else {
            // Error en la configuración de la solicitud
            alert('Error al enviar la solicitud.');
        }
    }
}

async function deleteUser(userId) {
    const confirmDelete = confirm('¿Está seguro de que desea eliminar este usuario?');
    if (confirmDelete) {
        try {
            const response = await fetch('/eliminar-User', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userId })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // "Usuario eliminado correctamente"
                loadUsers(); // Recargar la lista de usuarios
            } else {
                alert(data.error); // "No se pudo eliminar el usuario"
            }
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            alert('No se pudo eliminar el usuario.');
        }
    }
}



async function loadUsuariosSinAlicuota() {
    const usuariosSinAlicuotaTableBody = document.getElementById('usuariosSinAlicuotaTableBody');
    usuariosSinAlicuotaTableBody.innerHTML = ''; // Limpiar la tabla

    try {
        // Obtener usuarios sin alícuota desde la API
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
                            <button onclick='asignarAlicuota("${user._id}")' class='text-blue-500 hover:text-blue-700'>Asignar Alícuota</button>
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
        alert('La alícuota es obligatoria.');
    }
}

async function loadUsuariosConAlicuota() {
    const usuariosConAlicuotaTableBody = document.getElementById('usuariosConAlicuotaTableBody');
    usuariosConAlicuotaTableBody.innerHTML = ''; // Limpiar la tabla

    try {
        // Obtener usuarios con alícuota desde la API
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
                            <button onclick='editarAlicuota("${user._id}")' class='text-blue-500 hover:text-blue-700'>Editar</button>
                            <button onclick='eliminarAlicuota("${user._id}")' class='text-red-500 hover:text-red-700 ml-2'>Eliminar</button>
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