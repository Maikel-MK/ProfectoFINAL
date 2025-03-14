const {request, response} = require('../app')

const estatuesRouter = require('express').Router();
const Estatues = require('../models/Estatus'); // Importa el modelo de Estatues

// Ruta para obtener la lista de estatus filtrada por rol
estatuesRouter.get('/lista-estatus', async (req, res) => {
    try {
        const { rol } = req.query; // Obtener el parámetro "rol" de la consulta

        // Filtrar los datos según el rol
        const filtro = rol ? { rol } : {}; // Si no se proporciona un rol, devolver todos los datos
        const datos = await Estatues.find(filtro);

        res.status(200).json({ textOk: true, data: datos });
    } catch (error) {
        console.error('Error al obtener los estatus:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Agregar un nuevo Estatus
estatuesRouter.post('/', async (req, res) => {
    try {
        const { nombre, pagosPendientes, alquilerZonas, rol, estadoMorosidad } = req.body;

        // Validar campos obligatorios
        if (!nombre || !rol) {
            return res.status(400).json({ error: 'Nombre y rol son obligatorios.' });
        }

        // Validar que el estado de morosidad se proporcione solo para residentes
        if (rol === 'residente' && !estadoMorosidad) {
            return res.status(400).json({ error: 'Estado de morosidad es obligatorio para residentes.' });
        }

        // Crear un nuevo Estatus
        const nuevoEstatues = new Estatues({
            nombre,
            pagosPendientes: pagosPendientes || 0, // Valor por defecto si no se proporciona
            alquilerZonas: alquilerZonas || [], // Valor por defecto si no se proporciona
            rol,
            estadoMorosidad: rol === 'residente' ? estadoMorosidad : undefined // Solo para residentes
        });

        await nuevoEstatues.save();

        res.status(201).json({ textOk: true, data: nuevoEstatues });
    } catch (error) {
        console.error('Error al agregar estatues:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Editar un estatus existente
estatuesRouter.put('/editar-estatus', async (req, res) => {
    try {
        const { id, nombre, pagosPendientes, alquilerZonas, rol, estadoMorosidad } = req.body;

        // Validar que se proporcione el ID
        if (!id) {
            return res.status(400).json({ error: 'ID es obligatorio.' });
        }

        // Buscar el estatus existente
        const estatuesExistente = await Estatues.findById(id);
        if (!estatuesExistente) {
            return res.status(404).json({ error: 'Estatus no encontrado.' });
        }

        // Validar que el estado de morosidad se proporcione solo para residentes
        if (rol === 'residente' && !estadoMorosidad) {
            return res.status(400).json({ error: 'Estado de morosidad es obligatorio para residentes.' });
        }

        // Actualizar los campos del estatus
        estatuesExistente.nombre = nombre || estatuesExistente.nombre;
        estatuesExistente.pagosPendientes = pagosPendientes || estatuesExistente.pagosPendientes;
        estatuesExistente.alquilerZonas = alquilerZonas || estatuesExistente.alquilerZonas;
        estatuesExistente.rol = rol || estatuesExistente.rol;
        estatuesExistente.estadoMorosidad = rol === 'residente' ? estadoMorosidad : undefined;

        // Guardar los cambios
        const estatuesActualizado = await estatuesExistente.save();

        res.status(200).json({ textOk: true, data: estatuesActualizado });
    } catch (error) {
        console.error('Error al editar el estatus:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Ruta para eliminar un estatus por ID
estatuesRouter.delete('/eliminar-estatus/:id', async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de los parámetros de la URL

        // Buscar y eliminar el estatus por ID
        const estatusEliminado = await Estatues.findByIdAndDelete(id);
        if (!estatusEliminado) {
            return res.status(404).json({ error: 'Estatus no encontrado.' });
        }

        res.status(200).json({ textOk: true, message: 'Estatus eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar el estatus:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Ruta para obtener un estatus por ID
estatuesRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de los parámetros de la URL
        const estatus = await Estatues.findById(id); // Buscar el estatus por ID
        if (!estatus) {
            return res.status(404).json({ error: 'Estatus no encontrado.' });
        }
        res.status(200).json({ textOk: true, data: estatus });
    } catch (error) {
        console.error('Error al obtener el estatus:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});


module.exports = estatuesRouter;