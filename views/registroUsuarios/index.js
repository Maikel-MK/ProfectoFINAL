const userName = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const match = document.querySelector('#password2')
const formulario = document.querySelector('#formulario')


const emailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/gm
const nameVal = /[a-zA-Z]+( [a-zA-Z])?$/g

let valemail = false
let valpassword = false
let valMatch = false
let valName = false

userName.addEventListener('change', e=>{
        valName = nameVal.test(e.target.value)
        validar(userName,valName)

})

email.addEventListener('change', e=>{
        valemail = emailVal.test(e.target.value)
        // console.log(valemail)
        validar(email, valemail) 
    })

password.addEventListener('input', e=>{
        // console.log(e.target.value)
        valpassword = passwordVal.test(e.target.value)
        validar(password,valpassword)
        validar(match,valMatch)
    })

    match.addEventListener('input', e=>{
        valpassword = passwordVal.test(e.target.value)
        validar(match,valMatch)
        validar(password,valpassword)
    })

    formulario.addEventListener('submit', e=>{
        e.preventDefault()

        try {
            const newUser = {
                nombre:userName.value,
                correo:email.value,
                password:password.value,
                password2:match.value
            }
            console.log(newUser)
            // if(valName && valemail && valpassword && valMatc){
            //     const response =await axios.post()
            // }
        } catch (error) {
            console.log(error)
        }
    })

    
const validar = (input, val)=>{
        btnRegistro.disabled = valName && valemail && valpassword && valMatch ? false : true
    
        // console.log(valMatch,valemail,valName) 
        if(val){
            //caso de test sea true
            input.classList.remove('border-blue-600')
            input.classList.remove('border-red-600','outline-4')
            input.classList.add('border-green-700','outline-4')
        }else if(input.value === ''){
            input.classList.remove('border-green-700','outline-4')
            input.classList.remove('border-red-600','outline-4')
            input.classList.add('border-blue-600')  
        }else{
            //caso que sea false
            input.classList.remove('border-blue-600')
            input.classList.remove('border-green-700','outline-4')
            input.classList.add('border-red-600','outline-4') 
        }
    }