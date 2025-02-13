const { request, response } = require('../app');

const usersRouter = require('express').Router();

// router: CRUD


//registrar lo que envia el usuario
usersRouter.post('/registroUsuarios',(request,response)=>{
    const {nombre,correo,password,password2} = request.body
    console.log(nombre,correo,password,password2)

    if(!nombre || !correo || !password || !password2){
        return response.status(400).json({error:'Los datos no pueden estar Incompletos'})
    }else{
        return response.status(200).json({message:'Usuario Registrado Correctamente'})
    }

})



module.exports = usersRouter