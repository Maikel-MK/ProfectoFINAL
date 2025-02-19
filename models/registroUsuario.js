const mongoose = require('mongoose')
const usersRouter = require('../controllers/registrosUsuarios')

//definir schema para guardar usuarios
const registroUsuarioSchema = new mongoose.Schema({
    nombre:String,
    correo:String,
    password:String,
    rol:{
        type:String,
        default:"usuario"
    },
    alicuota: {
        type: Number,
        default: null 
    },
    verified: {
        type: Boolean,
        default: false
    }
})


//configuarar respuesta del usuario en el schema
registroUsuarioSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//registrar el modelo y elegir el nombre

const User = mongoose.model('User', registroUsuarioSchema)

//debemos exportar

module.exports = User