const { request, response } = require('../app');

const usersRouter = require('express').Router();
const User = require('../models/registroUsuario')

// router: CRUD


//registrar lo que envia el usuario
usersRouter.post('/registroUsuarios',(request,response)=>{
    const {nombre,correo,password,password2} = request.body
    console.log(nombre,correo,password,password2)

    if(!nombre || !correo || !password || !password2){

        return response.status(400).json({error:'Los datos no pueden estar Incompletos'})
    }else{
        //guardar en la bd
        let usuario = new User()

        usuario.nombre = nombre
        usuario.correo = correo 
        usuario.password = password
        

        async function guardarUsuario() {
            await usuario.save()
            const usuarios = await User.find()
            console.log(usuarios)
        }

        guardarUsuario().catch(console.error)

        return response.status(200).json({message:'Usuario Registrado Correctamente'})
    }

})

//consultar un usuario
usersRouter.get('/consultar-User',(request,response)=>{

})

//editar un usuario
usersRouter.post('/Editar-user',(request,response)=>{

})

//eliminar un usuario
usersRouter.post('/eliminar-User',(request,response)=>{

})


//obtener todos los usuarios
usersRouter.get('/lista-User',(request,response)=>{

})

//obtener un usuario
usersRouter.get('/Obtener-User',(request,response)=>{

})



module.exports = usersRouter