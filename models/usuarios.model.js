import { pool } from '../database/connection.js'

const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM USUARIOS")
    return rows
}

const create = async ({ nombre, balance }) => {
    const query = {
        text: `INSERT INTO usuarios (nombre, balance)
        VALUES ($1, $2) RETURNING *`,
        values: [nombre, balance]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

const remove = async (id) => {
    const query = {
        text: `
        DELETE FROM USUARIOS WHERE ID = $1
        RETURNING *
        `,
        values: [id]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

const update = async ({ id, nombre, balance }) => {
    const query = {
        text: `UPDATE USUARIOS SET
        NOMBRE = $2,
        BALANCE = $3
        WHERE ID = $1
        RETURNING *
        `,
        values: [id, nombre, balance]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

export const Usuarios = {
    findAll,
    create,
    remove,
    update
}