import { Usuarios } from '../models/usuarios.model.js'

export const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll()
        return res.json(usuarios)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const createUsuario = async (req, res) => {
    try {
        const { nombre, balance } = req.body
        const usuario = await Usuarios.create({ nombre, balance })
        return res.json(usuario)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const removeUsuario = async (req, res) => {
    try {
        const { id } = req.query
        const usuario = await Usuarios.remove(id)
        return res.json(usuario)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const updateUsuario = async (req, res) => {
    try {
        const { id } = req.query
        const { nombre, balance } = req.body
        const usuario = await Usuarios.update({ id, nombre, balance })
        return res.json(usuario)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}