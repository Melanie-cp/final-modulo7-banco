import { Transferencias } from '../models/transfer.model.js'

export const getAllTransfers = async (req, res) => {
    try {
        const transferencias = await Transferencias.findAll()
        return res.json(transferencias)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const createTransfer = async (req, res) => {
    try {
        const { emisor, receptor, monto } = req.body
        const transferencias = await Transferencias.create(emisor, receptor, monto)
        return res.json(transferencias)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}