import { pool } from '../database/connection.js'

const findAll = async () => {
    const queryText = `
        SELECT 
            t.id AS transferencia_id, 
            t.emisor, 
            u_emisor.nombre AS nombre_emisor, 
            t.receptor, 
            u_receptor.nombre AS nombre_receptor, 
            t.monto, 
            t.fecha 
        FROM 
            transferencias t 
            JOIN usuarios u_emisor ON t.emisor = u_emisor.id 
            JOIN usuarios u_receptor ON t.receptor = u_receptor.id
    `;
    const { rows } = await pool.query(queryText);
    return rows;
}

const create = async (emisor, receptor, monto) => {
    try {
        await pool.query('BEGIN');

        const query1 = {
            text: 'INSERT INTO transferencias (emisor, receptor, monto) VALUES ($1, $2, $3) RETURNING *',
            values: [emisor, receptor, monto]
        }
        const query2 = {
            text: 'UPDATE usuarios SET balance = balance - $1 WHERE id = $2',
            values: [monto, emisor]
        }
        const query3 = {
            text: 'UPDATE usuarios SET balance = balance + $1 WHERE id = $2',
            values: [monto, receptor]
        }

        const { rows } = await pool.query(query1);
        await pool.query(query2);
        await pool.query(query3);

        await pool.query('COMMIT');
        return {
            ok: true,
            data: rows[0]
        }
    } catch (error) {
        console.log(error)
        await pool.query("ROLLBACK")
        return {
            ok: false,
            data: "error en la transferencia"
        }
    }
}


export const Transferencias = {

    findAll,
    create
}