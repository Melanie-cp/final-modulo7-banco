import express from 'express'
import usuariosRoutes from './routes/usuarios.route.js'
import transferRoutes from './routes/transfer.route.js'

const app = express()

const __dirname = import.meta.dirname
app.use(express.static(__dirname + '/public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/usuarios', usuariosRoutes)

app.use('/transferencias', transferRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor encendido http://localhost:${PORT}`)
})