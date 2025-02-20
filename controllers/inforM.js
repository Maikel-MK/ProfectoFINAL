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

infoRouter.post('/', async (req, res) => {
    const { titulo, contenido } = req.body; // No se recibe la fecha desde el frontend

    try {
        // Crear un nuevo documento de Informacion con la fecha actual
        const nuevaInformacion = new Informacion({
            titulo,
            contenido,
            fecha: new Date() // Agregar la fecha actual automáticamente
        });

        // Guardar el documento en la base de datos
        const informacionGuardada = await nuevaInformacion.save();

        // Enviar una respuesta exitosa con el documento guardado
        res.status(201).json(informacionGuardada);
    } catch (error) {
        // Manejar errores
        res.status(500).json({ error: 'Error al guardar la información', details: error.message });
    }
});
module.exports = infoRouter