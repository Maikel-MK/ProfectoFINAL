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
                            <button onclick='editUser("${user._id}")' class='text-blue-500 hover:text-blue-700'>Editar</button>
                            <button onclick='deleteUser("${user._id}")' class='text-red-500 hover:text-red-700 ml-2'>Eliminar</button>
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
        // Obtener los datos del usuario desde la API
        const response = await axios.get(`/api/users/consultar-User`);
        const user = response.data;

        // Abrir el modal con los datos del usuario
        openEditModal(user);

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
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        alert('No se pudo cargar la información del usuario.');
    }
}