const userType = document.getElementById('user-type').value; 
const username = document.getElementById('username').value; 
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const formulario = document.getElementById('registration-form')

formulario.addEventListener('submit', e=>{
        e.preventDefault()
        const ttpp = ''

        console.log('Usuario registrado:', { userType, username, email, password })

        })