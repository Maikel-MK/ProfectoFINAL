const {request, response} = require('../app')

const infoRouter = require('express').Router()
const Informacion = require('../models/informacion')

// CRUD

// // Obtener todas las informaciones
// infoRouter.get('/informacion-listado', async (req, res) => {
//     try {
//         const listado = await Informacion.find(); // Obtener todas las informaciones
//         return res.status(200).json({ textOk: true, data: listado });
//     } catch (error) {
//         console.error('Error al obtener información:', error);
//         return res.status(500).json({ error: 'Error interno del servidor.' });
//     }
// });

//guardar informacion
infoRouter.post('/informacion', async (req, res) => {
    const { titulo, contenido, fecha } = req.body;

    // Validar que se proporcionen todos los campos
    if (!titulo || !contenido || !fecha) {
        return res.status(400).json({ error: 'Datos incompletos.' });
    }

    try {
        // Crear una nueva instancia de Informacion
        const Muroinfo = new Informacion({
            titulo,
            contenido,
            fecha
        });

        // Guardar la información en la base de datos
        await Muroinfo.save();

        // Devolver una respuesta exitosa
        return res.status(201).json({ message: 'Información guardada correctamente.', data: Muroinfo });
    } catch (error) {
        console.error('Error al guardar información:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
});