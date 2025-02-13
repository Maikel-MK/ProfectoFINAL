const emailInput =document.querySelector('#username')
const password =document.querySelector('#password')

const datosLogin = {
    email:'',
    password:''
}

emailInput.addEventListener('input', e=>{

    datosLogin.email = e.target.value

    console.log(datosLogin.email)
})

passwordInput.addEventListener('input', e=>{

    datosLogin.password = e.target.value

    console.log(datosLogin.password)
})