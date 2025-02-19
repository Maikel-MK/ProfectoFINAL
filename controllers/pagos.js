const pagoRouter = require('express').Router()

//registrar la informacion de los pagos
// Obtener todos los pagos fijos
pagoRouter.post('/', async (request, response) => {

    const { descripcion, monto } = request.body;

console.log(descripcion, monto)
})


module.exports = pagoRouter
