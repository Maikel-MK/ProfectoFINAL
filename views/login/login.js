const emailInput =document.querySelector('#username')
const passwordInput =document.querySelector('#password')
const formulario = document.querySelector('#loginForm')

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

formulario.addEventListener('submit', async e=>{
    e.preventDefault()

    if(datosLogin.email && datosLogin.password){
        const response = await axios.get('/api/users',datosLogin)

    }

})