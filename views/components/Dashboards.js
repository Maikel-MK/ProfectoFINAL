const dashboard = document.querySelector('#dashboard')


// Función para crear la barra lateral de navegación
function createSidebarAdmin() {
    return `
        <aside class="w-64 bg-white shadow-lg fixed h-screen overflow-y-auto">
            <div class="p-6">
                <h1 class="text-2xl font-bold text-gray-800">Residencial Oasis</h1>
                <nav class="mt-6">
                    <ul>
                        <li class="mb-4">
                            <a href="/administrador/" class="flex items-center text-gray-600 hover:text-blue-500 transition duration-200">
                                <span class="mr-2">🏠</span> Inicio
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="/pagos/" class="flex items-center text-gray-600 hover:text-blue-500 transition duration-200">
                                <span class="mr-2">💵</span> Pagos
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="/reservas/" class="flex items-center text-gray-600 hover:text-blue-500 transition duration-200">
                                <span class="mr-2">📅</span> Alquiler de Espacios
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="/estatus/" class="flex items-center text-gray-600 hover:text-blue-500 transition duration-200">
                                <span class="mr-2">📊</span> Estatus
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="/info/" class="flex items-center text-gray-600 hover:text-blue-500 transition duration-200">
                                <span class="mr-2">ℹ️</span> Información
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>`;
}
function createSidebarCont() {
    return `
        <aside class="w-64 bg-white shadow-lg fixed h-screen overflow-y-auto">
            <div class="p-6">
                <h1 class="text-2xl font-bold text-gray-800">Residencial Oasis</h1>
                <nav class="mt-6">
                    <ul>
                        <li class="mb-4">
                            <a href="/contador/" class="flex items-center text-gray-600 hover:text-blue-500 transition duration-200">
                                <span class="mr-2">🏠</span> Inicio
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="/estatus/" class="flex items-center text-gray-600 hover:text-blue-500 transition duration-200">
                                <span class="mr-2">📊</span> Estatus
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="/info/" class="flex items-center text-gray-600 hover:text-blue-500 transition duration-200">
                                <span class="mr-2">ℹ️</span> Información
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>`;
}

function createSidebarRes() {
    return `
        <aside class="w-64 bg-white shadow-lg fixed h-screen overflow-y-auto">
            <div class="p-6">
                <h1 class="text-2xl font-bold text-gray-800">Residencial Oasis</h1>
                <nav class="mt-6">
                    <ul>
                        <li class="mb-4">
                            <a href="/residente/" class="flex items-center text-gray-600 hover:text-blue-500 transition duration-200">
                                <span class="mr-2">🏠</span> Inicio
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="/pagos/" class="flex items-center text-gray-600 hover:text-blue-500 transition duration-200">
                                <span class="mr-2">💵</span> Pagos
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="/reservas/" class="flex items-center text-gray-600 hover:text-blue-500 transition duration-200">
                                <span class="mr-2">📅</span> Alquiler de Espacios
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="/muroInfo/" class="flex items-center text-gray-600 hover:text-blue-500 transition duration-200">
                                <span class="mr-2">ℹ️</span> Información
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>`;
}

function createSidebarClientes() {
    return `
        <aside class="w-64 bg-white shadow-lg fixed h-screen overflow-y-auto">
            <div class="p-6">
                <h1 class="text-2xl font-bold text-gray-800">Residencial Oasis</h1>
                <nav class="mt-6">
                    <ul>
                        <li class="mb-4">
                            <a href="/clientes/" class="flex items-center text-gray-600 hover:text-blue-500 transition duration-200">
                                <span class="mr-2">🏠</span> Inicio
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="/reservas/" class="flex items-center text-gray-600 hover:text-blue-500 transition duration-200">
                                <span class="mr-2">📅</span> Alquiler de Espacios
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>`;
}


function createCard(title, content) {
    return `
        <div class="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg">
            <h3 class="font-bold text-lg text-gray-800 mb-4">${title}</h3>
            <div class="text-gray-600">${content}</div>
        </div>`;
}

// Función que crea el dashboard para el Administrador
function createAdminDashboard() {
    dashboard.innerHTML = `
        ${createSidebarAdmin()}
        <main class="flex-grow p-6 ml-64">
            <h2 class="text-xl font-semibold mb-4 text-center text-gray-800">Administrador</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${createCard("Usuarios", "<p><button onclick='manageUsers()' class='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200'>Administrar Usuarios</button></p>")}
                ${createCard("Alicuotas", `<button onclick='manageAlicuotas()' class='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200'>Gestionar Alicuotas</button>`)}
            </div>

            <!-- Sección para gestionar alícuotas -->
            <div id="alicuotasSection" class="mt-6 hidden">
                <div class="flex space-x-4 mb-6">
                    <button onclick="mostrarUsuariosSinAlicuota()" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                        Mostrar Usuarios sin Alícuota
                    </button>
                    <button onclick="mostrarUsuariosConAlicuota()" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200">
                        Mostrar Usuarios con Alícuota
                    </button>
                </div>
            </div>

            <!-- Sección para asignar alícuotas -->
            <div id="asignarAlicuotaSection" class="mt-6 hidden">
                <h3 class="font-bold text-lg mb-4 text-gray-800">Asignar Alícuotas</h3>
                <table class="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="py-3 px-4 text-left">Nombre</th>
                            <th class="py-3 px-4 text-left">Correo</th>
                            <th class="py-3 px-4 text-left">Rol</th>
                            <th class="py-3 px-4 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="usuariosSinAlicuotaTableBody" class="divide-y divide-gray-200">
                        <!-- Aquí se cargarán los usuarios sin alícuota -->
                    </tbody>
                </table>
            </div>

            <!-- Sección para ver usuarios con alícuotas -->
            <div id="usuariosConAlicuotaSection" class="mt-6 hidden">
                <h3 class="font-bold text-lg mb-4 text-gray-800">Usuarios con Alícuotas</h3>
                <table class="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="py-3 px-4 text-left">Nombre</th>
                            <th class="py-3 px-4 text-left">Correo</th>
                            <th class="py-3 px-4 text-left">Rol</th>
                            <th class="py-3 px-4 text-left">Alícuota (%)</th>
                            <th class="py-3 px-4 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="usuariosConAlicuotaTableBody" class="divide-y divide-gray-200">
                        <!-- Aquí se cargarán los usuarios con alícuota -->
                    </tbody>
                </table>
            </div>

            <!-- Sección para gestionar usuarios -->
            <div id="usersSection" class="mt-6 hidden">
                <h3 class="font-bold text-lg mb-4 text-gray-800">Gestión de Usuarios</h3>
                <table class="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="py-3 px-4 text-left">Nombre</th>
                            <th class="py-3 px-4 text-left">Correo</th>
                            <th class="py-3 px-4 text-left">Rol</th>
                            <th class="py-3 px-4 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="usersTableBody" class="divide-y divide-gray-200">
                        <!-- Aquí se cargarán los usuarios -->
                    </tbody>
                </table>
            </div>
        </main>`;
}

function manageAlicuotas() {
    const alicuotasSection = document.getElementById('alicuotasSection');
    const usersSection = document.getElementById('usersSection');

    // Mostrar u ocultar la sección de alícuotas
    alicuotasSection.classList.toggle('hidden');

    // Ocultar la sección de usuarios si está abierta
    if (!usersSection.classList.contains('hidden')) {
        usersSection.classList.add('hidden');
    }
}
 
 function manageUsers() {
    const usersSection = document.getElementById('usersSection');
    const alicuotasSection = document.getElementById('alicuotasSection');
    const usuariosConAlicuotaSection = document.getElementById('usuariosConAlicuotaSection');
    const usuariosSinAlicuotaSection = document.getElementById('asignarAlicuotaSection');

    // Mostrar u ocultar la sección de usuarios
    usersSection.classList.toggle('hidden');

    // Ocultar las secciones de alícuotas si están abiertas
    if (!alicuotasSection.classList.contains('hidden')) {
        alicuotasSection.classList.add('hidden');
    }
    if (!usuariosConAlicuotaSection.classList.contains('hidden')) {
        usuariosConAlicuotaSection.classList.add('hidden');
    }
    if (!usuariosSinAlicuotaSection.classList.contains('hidden')) {
        usuariosSinAlicuotaSection.classList.add('hidden');
    }

    // Cargar los usuarios si la sección está visible
    if (!usersSection.classList.contains('hidden')) {
        loadUsers();
    }
}

 
async function loadUsers() {
    const usersTableBody = document.getElementById('usersTableBody')
    usersTableBody.innerHTML = '' // Limpiar la tabla

    try {
        const response = await axios.get('/api/users/lista-User')
        console.log('Respuesta del servidor:', response.data)

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
                    </tr>`
                usersTableBody.innerHTML += row // Añadir fila a la tabla
            })
        } else {
            alert('No se pudieron cargar los usuarios.')
        }
    } catch (error) {
        console.error('Error al cargar usuarios:', error)
        alert('No se pudieron cargar los usuarios.')
    }
}

// Función para abrir el modal
function openEditModal(user) {
    const modal = document.getElementById('editUserModal')
    document.getElementById('editName').value = user.nombre
    document.getElementById('editEmail').value = user.correo
    document.getElementById('editPassword').value = ''
    document.getElementById('editConfirmPassword').value = ''
    document.getElementById('editRol').value = user.rol
    modal.classList.remove('hidden')
}

// Función para cerrar el modal
function closeEditModal() {
    const modal = document.getElementById('editUserModal')
    modal.classList.add('hidden')
}

async function editUser(userId) {
    try {
        console.log('Obteniendo datos del usuario con ID:', userId) // Depuración

        // Verificar que el userId no sea undefined
        if (!userId) {
            alert('ID de usuario no válido.')
            return
        }

        // Hacer la solicitud a la ruta /consultar-User
        const response = await axios.get('/api/users/consultar-User', {
            params: { id: userId } // Pasar el ID como parámetro
        })

        console.log('Respuesta del servidor:', response.data) // Depuración

        if (response.data.textOk) {
            const user = response.data.data // Datos del usuario
            openEditModal(user) // Abrir el modal con los datos del usuario

            // Manejar el envío del formulario del modal
            document.getElementById('editUserForm').onsubmit = async (e) => {
                e.preventDefault()

                const newName = document.getElementById('editName').value
                const newEmail = document.getElementById('editEmail').value
                const newPassword = document.getElementById('editPassword').value
                const confirmPassword = document.getElementById('editConfirmPassword').value
                const newRol = document.getElementById('editRol').value

                if (newName && newEmail && newPassword && confirmPassword && newRol) {
                    if (newPassword !== confirmPassword) {
                        alert('Las contraseñas no coinciden.')
                        return
                    }

                    try {
                        const response = await axios.post('/api/users/editar-user', {
                            id: userId,
                            nombre: newName,
                            correo: newEmail,
                            password: newPassword,
                            password2: confirmPassword,
                            rol: newRol
                        })

                        if (response.status === 200) {
                            alert(response.data.message) // Mostrar mensaje de éxito
                            closeEditModal() // Cerrar el modal
                            loadUsers() // Recargar la lista de usuarios
                        } else {
                            alert(response.data.error) // Mostrar mensaje de error del servidor
                        }
                    } catch (error) {
                        console.error('Error al editar usuario:', error)
                        if (error.response) {
                            alert(error.response.data.error || 'Error al editar el usuario.')
                        } else {
                            alert('No se pudo conectar al servidor.')
                        }
                    }
                } else {
                    alert('Todos los campos son obligatorios.')
                }
            }
        } else {
            alert('No se pudieron cargar los datos del usuario.')
        }
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error)
        if (error.response) {
            // Error de respuesta del servidor (ej: 404, 500)
            console.error('Respuesta del servidor:', error.response.data) // Depuración
            alert(error.response.data.error || 'Error al obtener el usuario.')
        } else if (error.request) {
            // Error de conexión (no se recibió respuesta)
            alert('No se pudo conectar al servidor.')
        } else {
            // Error en la configuración de la solicitud
            alert('Error al enviar la solicitud.')
        }
    }
}

async function deleteUser(userId) {
    const confirmDelete = confirm('¿Está seguro de que desea eliminar este usuario?')
    if (confirmDelete) {
        try {
            // Enviar la solicitud para eliminar el usuario
            const response = await axios.post('/api/users/eliminar-User', {
                id: userId
            })

            // Verificar si la solicitud fue exitosa
            if (response.status === 200) {
                alert(response.data.message) // Mostrar mensaje de éxito
                loadUsers() // Recargar la lista de usuarios
            } else {
                alert(response.data.error) // Mostrar mensaje de error del servidor
            }
        } catch (error) {
            console.error('Error al eliminar usuario:', error)
            if (error.response) {
                // Error de respuesta del servidor (ej: 404, 500)
                alert(error.response.data.error || 'Error al eliminar el usuario.')
            } else if (error.request) {
                // Error de conexión (no se recibió respuesta)
                alert('No se pudo conectar al servidor.')
            } else {
                // Error en la configuración de la solicitud
                alert('Error al enviar la solicitud.')
            }
        }
    }
}

// Función que crea el dashboard para el contador
function createAccountantDashboard() {
    dashboard.innerHTML = `
        <div class="flex">
            ${createSidebarCont()}
            <main class="flex-grow p-6 ml-64"> <!-- Margen izquierdo para evitar solapamiento -->
                <h2 class="text-xl font-semibold mb-4">Contador</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${createCard("Pagos Recibidos", "<p>Total recibido este mes: $5,000.</p>")}
                </div>
            </main>
        </div>`;
}

function createResidentDashboard() {
    dashboard.innerHTML = `
        <div class="flex">
            ${createSidebarRes()}
            <main class="flex-grow p-6 ml-64"> <!-- Margen izquierdo para evitar solapamiento -->
                <h2 class="text-xl font-semibold mb-4">Residente</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${createCard("Mis Pagos", "<p>No tienes pagos pendientes.</p>")}
                    ${createCard("Información Personal", "<p>Última visita: Hoy.</p>")}
                </div>
            </main>
        </div>`;
}

function createClienteDashboard() {
    dashboard.innerHTML= `
        <div class="flex">
            ${createSidebarClientes()}
            <main class="flex-grow p-6 ml-64"> <!-- Margen izquierdo para evitar solapamiento -->
                <h2 class="text-xl font-semibold mb-4">Residente</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${createCard("Mis Pagos", "<p>No tienes pagos pendientes.</p>")}
                    ${createCard("Información Personal", "<p>Última visita: Hoy.</p>")}
                </div>
            </main>
        </div>`;
}


if(window.location.pathname === '/administrador/'){
    createAdminDashboard()
}else if(window.location.pathname === '/contador/'){
    createAccountantDashboard()
}else if(window.location.pathname === '/residente/'){
    createResidentDashboard()
}else if(window.location.pathname === '/clientes/'){
    createClienteDashboard()
}