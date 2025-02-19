const { request, response } = require('../app')

const pagoRouter = require('express').Router()
const pago = require('../models/pago')



//registrar la informacion de los pagos
// pagoRouter.post('/', async (request, response) => {

//     const { descripcion, monto } = request.body;

// console.log(descripcion, monto)
// })

// Obtener todos los pagos fijos
pagoRouter.get('/lista-pagos', async (req, res) => {
    try {
        const listado = await pago.find();
        res.status(200).json({ textOk: true, data: listado });
    } catch (error) {
        console.error('Error al obtener pagos fijos:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Agregar un nuevo pago fijo
pagoRouter.post('/', async (req, res) => {
    try {
        const { descripcion, monto } = req.body;

        // Validar que se proporcionen descripción y monto
        if (!descripcion || !monto) {
            return res.status(400).json({ error: 'Descripción y monto son obligatorios.' });
        }

        // Crear un nuevo pago fijo
        const newPayment = new pago({ descripcion, monto });
        await newPayment.save();

        res.status(201).json({ textOk: true, data: newPayment });
    } catch (error) {
        console.error('Error al agregar pago fijo:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Editar un pago fijo existente
pagoRouter.put('/editarPago', async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, monto } = req.body;

        // Validar que se proporcionen descripción y monto
        if (!descripcion || !monto) {
            return res.status(400).json({ error: 'Descripción y monto son obligatorios.' });
        }

        // Buscar y actualizar el pago fijo
        const updatedPayment = await pago.findByIdAndUpdate(
            id,
            { descripcion, monto },
            { new: true } // Devolver el documento actualizado
        );

        if (!updatedPayment) {
            return res.status(404).json({ error: 'Pago fijo no encontrado.' });
        }

        res.status(200).json({ textOk: true, data: updatedPayment });
    } catch (error) {
        console.error('Error al editar pago fijo:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Eliminar un pago fijo existente
pagoRouter.delete('/eliminarPago', async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar y eliminar el pago fijo
        const deletedPayment = await pago.findByIdAndDelete(id);

        if (!deletedPayment) {
            return res.status(404).json({ error: 'Pago fijo no encontrado.' });
        }

        res.status(200).json({ textOk: true, message: 'Pago fijo eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar pago fijo:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

module.exports = pagoRouter
