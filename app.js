const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const usersRouter = require('./controllers/registrosUsuarios')
const pagoRouter = require('./controllers/pagos')
const infoRouter = require('./controllers/inforM')


//conexion a la Base de datos (B.D)

    try {
         mongoose.connect(process.env.MONGO_URI)
        console.log('Conexion a la BD Correcta')
    } catch (error) {
        console.log(error)
    }




//Crear Rutas de FrontEND por cada carpeta creada en views se debe agregar su ruta de font-end
app.use('/',express.static(path.resolve('views','home')))
app.use('/login',express.static(path.resolve('views','login')))
app.use('/components',express.static(path.resolve('views', 'components')))
app.use('/administrador',express.static(path.resolve('views','administrador')))
app.use('/condominio',express.static(path.resolve('views','condominio')))
app.use('/contador',express.static(path.resolve('views','contador')))
app.use('/residente',express.static(path.resolve('views', 'residente')))
app.use('/registroUsuarios',express.static(path.resolve('views', 'registroUsuarios')))
app.use('/pagos',express.static(path.resolve('views','pagos')))
app.use('/OpcionesP',express.static(path.resolve('views','OpcionesdePago')))
app.use('/info',express.static(path.resolve('views','informacion')))
app.use('/muroInfo',express.static(path.resolve('views','MuroInfo')))
app.use('/estatus',express.static(path.resolve('views','status')))
app.use('/reservas',express.static(path.resolve('views','reservas')))
app.use('/clientes',express.static(path.resolve('views','clientes')))
app.use('/img',express.static(path.resolve('img')))

//Importante

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(morgan('tiny'))


//rutas de BAckend
app.use('/api/users', usersRouter)
app.use('/api/pagos', pagoRouter)
app.use('/api/infoM', infoRouter)





module.exports = app
