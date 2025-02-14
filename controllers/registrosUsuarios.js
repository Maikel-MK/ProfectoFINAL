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
usersRouter.post('/editar-user', async(request,response)=>{

    try {
        const {id,nombre,correo,password,password2} = request.body

        if(!nombre && !correo && !password && !password2){

            return response.status(400).json({error:'Todos los campos son obligatorios'})
        }else{
            const updateUser = await User.findByIdAndUpdate({_id:id},{nombre:nombre,correo:correo,password:password})

            await updateUser.save()

            return response.status(200).json({message:'Usuario editado correctamente'}) 
        }

    } catch (error) {
        return response.status(400).json({error:'error al editar el usuario'})
    }
})

//eliminar un usuario
usersRouter.post('/eliminar-User',async (request,response)=>{
    const {id} = request.body	

    try {
        
        const usuario = await User.deleteOne({_id:id})

        return response.status(200).json({message:'Usuario eliminado correctamente'})

    } catch (error) {
        return response.status(400).json({error:'No se pudo eliminar el usuario'})
    }
})


//obtener todos los usuarios
usersRouter.get('/lista-User',async (request,response)=>{

    try {
        const listado = await User.find()

        return response.status(200).json({textOk:true,data:listado})

    } catch (error) {
        return response.status(400).json({error:'No se pudo obtener la lista de usuarios'})
    }
})

//obtener un usuario
usersRouter.get('/Obtener-User',(request,response)=>{

})

//verificar el Registro
usersRouter.get('/validar-confirmacion/:correo',async (request,response)=>{

    try {
        const {correo} = response.param

        console.log(correo)

        //cerificar si existe el usuario

        const usuario = await User.findOne({correo:correo})

        if(!usuario){
            response.send('Error:El Usuario NO esta Registrado')
        }else if(usuario.verified){

                response.send('Error: El Usuario Ya esta Verificado')

        }else{
            //actualizar Verificacion
            const actualizarUsuario = await User.findByIdAndUpdate({correo:correo},{verified:true})

            await actualizarUsuario.save()

            //redireccionar
            // return response.redirect()
        }

    } catch (error) {
        console.log(error)
    }
})



module.exports = usersRouter