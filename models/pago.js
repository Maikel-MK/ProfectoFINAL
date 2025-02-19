const mongoose = require('mongoose')
const pagosRouter = require('../controllers/pagos')

const pagoSchema = new mongoose.Schema({
    descripcion:String,
    monto:Number
})



//configuarar respuesta del usuario en el schema
pagoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        //propiedad de id
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//registrar el modelo y elegir el nombre

const Pago = mongoose.model('Pagos',pagoSchema)

//debemos exportar

module.exports = Pago