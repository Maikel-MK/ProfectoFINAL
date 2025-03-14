const mongoose = require('mongoose');
const estatuesRouter = require('../controllers/pagos')

const estatusSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    pagosPendientes: { type: Number, default: 0 },
    alquilerZonas: { type: [String], default: [] },
    rol: { type: String, enum: ['residente', 'usuario'], required: true },
    estadoMorosidad: { 
        type: String, 
        enum: ['alDia', 'moroso'], 
        required: function() {
            return this.rol === 'residente'; // Solo es requerido si el rol es 'residente'
        }
    }
});

estatusSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const estatus = mongoose.model('Estatus', estatusSchema);

module.exports = estatus;