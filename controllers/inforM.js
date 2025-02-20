const {request, response} = require('../app')

const infoRouter = require('express').Router()
const Informacion = require('../models/informacion')

// CRUD

// // Obtener todas las informaciones
infoRouter.get('/lista-informacion', async (req, res) => {
    try {
        const listado = await Informacion.find() // Obtener todas las informaciones
        return res.status(200).json({ textOk: true, data: listado })
    } catch (error) {
        console.error('Error al obtener información:', error)
        return res.status(500).json({ error: 'Error interno del servidor.' })
    }
})

//guardar informacion

infoRouter.post('/', async (req, res) => {
    const { titulo, contenido } = req.body // No se recibe la fecha desde el frontend

    try {
        // Crear un nuevo documento de Informacion con la fecha actual
        const nuevaInformacion = new Informacion({
            titulo,
            contenido,
            fecha: new Date() // Agregar la fecha actual automáticamente
        })

        // Guardar el documento en la base de datos
        const informacionGuardada = await nuevaInformacion.save()

        // Enviar una respuesta exitosa con el documento guardado
        res.status(201).json(informacionGuardada)
    } catch (error) {
        // Manejar errores
        res.status(500).json({ error: 'Error al guardar la información', details: error.message })
    }
})


// Editar un informacion existente
infoRouter.put('/editarInformacion', async (req, res) => {
    try {
        const { titulo, contenido } = req.body

        // Validar que se proporcionen titulo y contenido
        if (!titulo || !contenido) {
            return res.status(400).json({ error: 'titulo y contenido son obligatorios.' })
        }

        // Buscar y actualizar 
        const updatedInfo = await Informacion.findByIdAndUpdate(
            id,
            { titulo: titulo },
            { contenido: contenido },
           { fecha: new Date()}
        )

        if (!updatedInfo) {
            return res.status(404).json({ error: 'informacion no encontrada.' })
        }

        res.status(200).json({ textOk: true, data: updatedInfo })
    } catch (error) {
        console.error('Error al editar Informacion:', error)
        res.status(500).json({ error: 'Error interno del servidor.' })
    }
})

// Ruta para eliminar información
infoRouter.delete('/eliminar-informacion', async (req, res) => {
    const { id } = req.body

    // Validar que se proporcione el ID
    if (!id) {
        return res.status(400).json({ error: 'ID es obligatorio.' })
    }

    try {
        // Buscar y eliminar el Pago
        const eliminarinfo = await Informacion.deleteOne({ _id: id })

        // Verificar si se eliminó algún documento
        if (eliminarinfo.deletedCount === 0) {
            return res.status(404).json({ error: 'Informacion no encontrado.' })
        }

        return res.status(200).json({ message: 'Informacion eliminada correctamente.' })
    } catch (error) {
        console.error('Error al eliminar Informacion:', error)
        return res.status(500).json({ error: 'Error interno del servidor.' })
    }
})
module.exports = infoRouter