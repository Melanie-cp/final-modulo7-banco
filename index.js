import express from 'express'
import { Usuarios } from './models/usuarios.model.js'

const app = express()

const __dirname = import.meta.dirname
app.use(express.static(__dirname + '/public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll()
        return res.json(usuarios)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

app.post('/usuario', async (req, res) => {
    try {
        const { nombre, balance } = req.body
        const usuario = await Usuarios.create({ nombre, balance })
        return res.json(usuario)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

app.delete('/usuario', async (req, res) => {
    try {
        const { id } = req.query
        const usuario = await Usuarios.remove(id)
        return res.json(usuario)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

app.put('/usuario', async (req, res) => {
    try {
        const { id } = req.query
        const { nombre, balance } = req.body
        const usuario = await Usuarios.update({ id, nombre, balance })
        return res.json(usuario)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor encendido http://localhost:${PORT}`)
})