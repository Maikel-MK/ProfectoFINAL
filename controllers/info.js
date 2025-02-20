const {request, response} = require('../app')

const infoRouter = require('express').Router()
const Informacion = require('../models/informacion')

// CRUD

// Obtener todas las informaciones
infoRouter.get('/informacion-listado', async (req, res) => {
    try {
        const listado = await Informacion.find(); // Obtener todas las informaciones
        return res.status(200).json({ textOk: true, data: listado });
    } catch (error) {
        console.error('Error al obtener información:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

//guardar informacion
infoRouter.post('/informacion',(req, res)=>{
    const {titulo, contenido, fecha,} = req.body

    if(!titulo || !contenido || !fecha){

        return res.status(400).json({error:'datos incompletos'})
    }else{
        let Muroinfo = new Informacion()

        Muroinfo.titulo = titulo
        Muroinfo.contenido = contenido
        Muroinfo.fecha = fecha

        async function guardarInfo() {
            await Muroinfo.save()
            const registros = await Informacion.find()
            console.log(registros)
        }

        guardarInfo().catch(console.error)

        return response.status().json({message:'Informacion Guardada Correctamente'})
    }
})