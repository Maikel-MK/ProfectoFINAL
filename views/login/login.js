const correo =document.querySelector('#username')
const password =document.querySelector('#password')
const formulario = document.querySelector('#loginForm')

const datosLogin = {
    correo:'',
    password:''
}

correo.addEventListener('input', e=>{

    datosLogin.correo = e.target.value

    console.log(datosLogin.correo)
})

password.addEventListener('input', e=>{

    datosLogin.password = e.target.value

    console.log(datosLogin.password)
})

formulario.addEventListener('submit', async e=>{
    e.preventDefault()

    if(datosLogin.correo && datosLogin.password){
        console.log('Datos completos')
    }

    try {
        const response = await axios.get('/api/users/lista-User')
        console.log(response.data.data)

        const ListadoUser = response.data.data

        const Usuario = ListadoUser.some(user => user.correo === correo && user.password === password)

        console.log(Usuario)

        if(!Usuario){

            if(ListadoUser.some(user => user.correo === correo)){
                const usuario = ListadoUser.map(user =>{

                    if(user.rol === 'admin'){
                        window.location.href = '/administrador/'
                    }else if (user.rol === 'usuario'){
                        windoes.location.href = '/clientes/'
                    }

                })



            }
        }else{
            alert("no tiene credenciales")
        }

    } catch (error) {
        console.log(error)
    }

})