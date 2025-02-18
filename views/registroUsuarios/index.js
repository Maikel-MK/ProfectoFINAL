const userName = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const match = document.querySelector('#password2')
const formulario = document.querySelector('#formulario')
const registroBtn = document.querySelector('#BTNregistro')
import {createNotification} from '../components/notificaciones.js'
const notification = document.querySelector('#notification')

//validar
const emailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/gm
const nameVal = /[a-zA-Z]+( [a-zA-Z])?$/g

let valemail = false
let valpassword = false
let valMatch = false
let valName = false

const errorMessages = {
    nombre: "El nombre solo puede contener letras y espacios y no puede terminar en espacio.",
    correo: "Ingresa un correo electrónico válido.",
    password: "La contraseña debe tener entre 8 y 16 caracteres, incluir una mayúscula, una minúscula, un signo y un número.",
    match: "Las contraseñas no coinciden."
}

function mostrarError(input, mensaje) {
    const errorElement = input.nextElementSibling //para los span
    errorElement.textContent = mensaje
    errorElement.style.display = 'block'
}

function ocultarError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = ''
    errorElement.style.display = 'none'
}

userName.addEventListener('input', e => {
    valName = nameVal.test(e.target.value);
    validar(userName, valName);
    if (!valName) {
        mostrarError(userName, errorMessages.nombre)
    } else {
        ocultarError(userName)
    }
})


email.addEventListener('input', e=>{
    valemail = emailVal.test(e.target.value)
    // console.log(valemail)
    validar(email, valemail) 
    if (!valemail) {
        mostrarError(email, errorMessages.correo)
    } else {
        ocultarError(email)
    }
})

password.addEventListener('input', e=>{
    // console.log(e.target.value)
    valpassword = passwordVal.test(e.target.value)
    validar(password,valpassword)
    validar(match,valMatch)
    if (!valpassword) {
        mostrarError(password, errorMessages.password)
    } else {
        ocultarError(password)
    }
})


match.addEventListener('input', e=>{
    valMatch = e.target.value === password.value

    validar(match,valMatch)
    validar(password,valpassword)
    if (!valMatch) {
        mostrarError(match, errorMessages.match)
    } else {
        ocultarError(match)
    }
})


formulario.addEventListener('submit', async e => {
    e.preventDefault()

    // Mostrar ícono de carga
    registroBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Registrando...'
    registroBtn.disabled = true

    try {
        const newUser = {
            nombre: userName.value,
            correo: email.value,
            password: password.value,
            password2: match.value
        }

        if (valName && valemail && valpassword && valMatch) {
            const response = await axios.post('/api/users/registroUsuarios', newUser)
            createNotification(false, 'Usuario Registrado Correctamente')
            setTimeout(() => {
                notification.innerHTML = ''
            }, 5000);
        } else {
            createNotification(true, 'Los datos no pueden estar Incompletos')
            setTimeout(() => {
                notification.innerHTML = ''
            }, 5000);
        }
    } catch (error) {
        createNotification(true, error.response.data.error)
        setTimeout(() => {
            notification.innerHTML = ''
        }, 5000);
    } finally {
        // Restaurar el botón
        registroBtn.innerHTML = 'Registrarse'
        registroBtn.disabled = false
    }
})


    
const validar = (input, val)=>{


    registroBtn.disabled = valName && valemail && valpassword && valMatch ? false : true
    
        // console.log(valMatch,valemail,valName) 
        if(val){
            //caso de test sea true
            input.classList.remove('focus:outline-blue-600')
            input.classList.remove('focus:outline-red-700','outline-red-700','outline-3','border', 'border-red-500')
            input.classList.add('focus:outline-green-700','outline-green-700','outline-3','border', 'border-green-500')
        }else if(input.value === ''){
            input.classList.remove('focus:outline-green-700','outline-green-700','outline-3','border', 'border-green-500')
            input.classList.remove('focus:outline-red-700','outline-red-700','outline-3','border', 'border-red-500')
            input.classList.add('focus:outline-blue-600')
    
        }else{
            //caso que sea false
            input.classList.remove('focus:outline-blue-600')
            input.classList.remove('focus:outline-green-700','outline-green-700','outline-3','border', 'border-green-500')
            input.classList.add('focus:outline-red-700','outline-red-700','outline-3','border', 'border-red-500')
        }
    }