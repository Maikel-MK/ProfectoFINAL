const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const paypal = require('paypal-rest-sdk');
const usersRouter = require('./controllers/registrosUsuarios');
const pagoRouter = require('./controllers/pagos');
const infoRouter = require('./controllers/inforM');
const estatuesRouter = require('./controllers/Estatues');
const historialRouter = require('./controllers/historial');

// Inicializar la aplicación Express
const app = express();

// Conexión a la base de datos
try {
    mongoose.connect(process.env.MONGO_URI);
    console.log('Conexión a la BD correcta');
} catch (error) {
    console.log(error);
}

// Configurar PayPal SDK
paypal.configure({
    mode: process.env.PAYPAL_MODE,
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_SECRET
});

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('tiny'));

// Rutas de frontend (archivos estáticos)
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/administrador', express.static(path.resolve('views', 'administrador')));
app.use('/contador', express.static(path.resolve('views', 'contador')));
app.use('/residente', express.static(path.resolve('views', 'residente')));
app.use('/registroUsuarios', express.static(path.resolve('views', 'registroUsuarios')));
app.use('/pagos', express.static(path.resolve('views', 'pagos')));
app.use('/OpcionesP', express.static(path.resolve('views', 'OpcionesdePago')));
app.use('/info', express.static(path.resolve('views', 'informacion')));
app.use('/muroInfo', express.static(path.resolve('views', 'MuroInfo')));
app.use('/estatus', express.static(path.resolve('views', 'status')));
app.use('/reservas', express.static(path.resolve('views', 'reservas')));
app.use('/clientes', express.static(path.resolve('views', 'clientes')));
app.use('/img', express.static(path.resolve('img')));

// Rutas de backend
app.use('/api/users', usersRouter);
app.use('/api/pagos', pagoRouter);
app.use('/api/infoM', infoRouter);
app.use('/api/status', estatuesRouter);
app.use('/api/historial', historialRouter);

// Ruta para crear una orden de pago
app.post('/create-payment', (req, res) => {
    const { amount } = req.body;

    const paymentData = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        transactions: [{
            amount: {
                total: amount,
                currency: 'USD'
            },
            description: 'Pago de prueba'
        }],
        redirect_urls: {
            return_url: '/success', // URL de éxito
            cancel_url: '/cancel'  // URL de cancelación
        }
    };

    paypal.payment.create(paymentData, (error, payment) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al crear el pago');
        }

        // Enviar la URL de aprobación al frontend
        const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;
        res.json({ approvalUrl });
    });
});

// Ruta para manejar la redirección después de un pago exitoso
app.get('/success', async (req, res) => {
    const { paymentId, PayerID } = req.query;

    try {
        // Ejecutar el pago
        const payment = await new Promise((resolve, reject) => {
            paypal.payment.execute(paymentId, { payer_id: PayerID }, (error, payment) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(payment);
                }
            });
        });

        // Obtener los detalles del pago
        const amount = payment.transactions[0].amount.total; // Monto del pago
        const description = payment.transactions[0].description; // Descripción del pago
        const date = new Date().toISOString(); // Fecha actual
        const user = 'Usuario activo'; // Aquí debes obtener el usuario activo (puedes usar un token JWT o session)

        // Guardar el pago en el historial
        const response = await axios.post('/api/historial', {
            Monto: amount,
            Descripcion: description,
            Fecha: date,
            Usuario: user
        });
        const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    console.log('Status:', status); // Debería imprimir "success" o "cancel"

        // Redirigir al frontend con un mensaje de éxito
        res.redirect('/pagos');
    } catch (error) {
        console.error('Error al ejecutar el pago:', error);
        res.status(500).send('Error al ejecutar el pago');
    }
});

app.get('/cancel', (req, res) => {
    console.log('Redirección a /cancel');
    res.redirect('/pagos');
});

// Exportar la aplicación
module.exports = app;