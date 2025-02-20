const { request, response } = require('../app')

const pagoRouter = require('express').Router()
const pago = require('../models/pago')



//registrar la informacion de los pagos
// pagoRouter.post('/', async (request, response) => {

//     const { descripcion, monto } = request.body

// console.log(descripcion, monto)
// })

// Obtener todos los pagos fijos
pagoRouter.get('/lista-pagos', async (req, res) => {
    try {
        const listado = await pago.find()
        res.status(200).json({ textOk: true, data: listado })
    } catch (error) {
        console.error('Error al obtener pagos fijos:', error)
        res.status(500).json({ error: 'Error interno del servidor.' })
    }
})

// Agregar un nuevo Pago
pagoRouter.post('/', async (req, res) => {
    try {
        const { descripcion, monto } = req.body

        // Validar que se proporcionen descripción y monto
        if (!descripcion || !monto) {
            return res.status(400).json({ error: 'Descripción y monto son obligatorios.' })
        }

        // Crear un nuevo Pago
        const newPayment = new pago({ descripcion, monto })
        await newPayment.save()

        res.status(201).json({ textOk: true, data: newPayment })
    } catch (error) {
        console.error('Error al agregar Pago:', error)
        res.status(500).json({ error: 'Error interno del servidor.' })
    }
})

// Editar un Pago existente
pagoRouter.put('/editarPago', async (req, res) => {
    try {
        const { id, monto } = req.body

        // Validar que se proporcionen id y monto
        if (!id || !monto) {
            return res.status(400).json({ error: 'ID y monto son obligatorios.' })
        }

        // Buscar y actualizar el Pago
        const updatedPayment = await pago.findByIdAndUpdate(
            id,
            { monto: monto },
            { new: true } // Devolver el documento actualizado
        )

        if (!updatedPayment) {
            return res.status(404).json({ error: 'Pago no encontrado.' })
        }

        res.status(200).json({ textOk: true, data: updatedPayment })
    } catch (error) {
        console.error('Error al editar Pago:', error)
        res.status(500).json({ error: 'Error interno del servidor.' })
    }
})

// Eliminar un Pago existente
pagoRouter.delete('/eliminarPago', async (req, res) => {
    const { id } = req.body

    // Validar que se proporcione el ID
    if (!id) {
        return res.status(400).json({ error: 'ID es obligatorio.' })
    }

    try {
        // Buscar y eliminar el Pago
        const deletedPayment = await pago.deleteOne({ _id: id })

        // Verificar si se eliminó algún documento
        if (deletedPayment.deletedCount === 0) {
            return res.status(404).json({ error: 'Pago no encontrado.' })
        }

        return res.status(200).json({ message: 'Pago eliminado correctamente.' })
    } catch (error) {
        console.error('Error al eliminar Pago:', error)
        return res.status(500).json({ error: 'Error interno del servidor.' })
    }
})

module.exports = pagoRouter
