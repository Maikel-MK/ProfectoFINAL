const formulario = document.querySelector('#loginForm');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const correo = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    if (!correo || !password) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    try {
        const response = await axios.get('/api/users/lista-User');
        console.log('Respuesta del servidor:', response.data);

        let listaUsuarios;

        // Verifica si la respuesta es un arreglo
        if (Array.isArray(response.data)) {
            listaUsuarios = response.data;
        }
        // Verifica si la respuesta es un objeto con una propiedad "data"
        else if (response.data.data && Array.isArray(response.data.data)) {
            listaUsuarios = response.data.data;
        }
        // Verifica si la respuesta es un objeto con usuarios individuales
        else if (typeof response.data === 'object') {
            listaUsuarios = Object.values(response.data);
        }
        // Si no es ninguna de las anteriores, lanza un error
        else {
            throw new Error('Formato de respuesta no válido.');
        }

        console.log('Lista de usuarios:', listaUsuarios);

        // Buscar el usuario que coincida con las credenciales
        const usuario = listaUsuarios.find(user => user.correo === correo && user.password === password);

        if (usuario) {
            console.log('Usuario encontrado:', usuario);
            alert(`Bienvenido, ${usuario.correo}!`);

            // Redirigir según el rol del usuario
            if (usuario.rol === 'admin') {
                console.log('Redirigiendo a /administrador/');
                window.location.href = '/administrador/';
            } else if (usuario.rol === 'usuario') {
                console.log('Redirigiendo a /clientes/');
                window.location.href = '/clientes/';
            }
        } else {
            alert('Credenciales incorrectas.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al intentar iniciar sesión.');
    }
});