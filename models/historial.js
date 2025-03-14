const mongoose = require('mongoose')
const historialRouter = require('../controllers/historial')

const historialSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        default: Date.now
    },
    Monto:{
        type: Number
    },
    Descripcion:{
        type: String
    },
    Usuario:{
        type: String
    }
})

historialSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Historial = mongoose.model('Historial', historialSchema)   

module.exports = Historial