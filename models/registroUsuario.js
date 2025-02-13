// const mongoose = require('mongoose')

// //definir schema para guardar usuarios
// const registroUsuarioSchema = new mongoose.Schema({
//     nombre: {
//         type: String,
//     },
//     email: {
//         type: String,
//     },
//     password: {
//         type: String,
//     },
//     tipo: {
//         type: String,
//         required: true
//     }
// })

// //configuarar respuesta del usuario en el schema
// registroUsuarioSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
// })

// //registrar el modelo y elegir el nombre

// const User = mongoose.model('User', registroUsuarioSchema)

// //debemos exportar

// module.exports = User