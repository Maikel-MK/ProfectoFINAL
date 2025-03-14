const {request, response} = require('../app')

const historialRouter = require('express').Router()
const Historial = require('../models/historial')

historialRouter.post('/', async (req, res) => {
    const { Monto, Descripcion, Usuario } = req.body;

    try {
        const nuevoRegistro = new Historial({
            Monto,
            Descripcion,
            Usuario,
            fecha: new Date()
        });

        const registroGuardado = await nuevoRegistro.save();
        res.status(201).json(registroGuardado);
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar el registro en el historial', details: error.message });
    }
});

// Obtener todos los registros del historial de pagos
historialRouter.get('/lista-historial', async (req, res) => {
    try {
        const historial = await Historial.find();
        res.json(historial);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el historial de pagos', details: error.message });
    }
});

module.exports = historialRouter