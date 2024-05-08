// crudOperations.js
import poolConnection from './poolConnection.js';

export async function getAll(tableName, limit, filters) {
    let query = `SELECT * FROM ${tableName}`;
    let params = [];
    if (Object.keys(filters).length > 0) {
        query += ' WHERE ';
        const conditions = Object.keys(filters).map(key => `${key} = ?`);
        query += conditions.join(' AND ');
        params = Object.values(filters);
    }
    if (limit) {
        query += ' LIMIT ?';
        params.push(parseInt(limit));
    }
    const [rows] = await poolConnection.query(query, params);
    return rows;
}


export async function getById(tableName, id) {
    const [rows] = await poolConnection.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
    return rows[0];
}

export async function create(tableName, data) {
    const [result] = await poolConnection.query(`INSERT INTO ${tableName} SET ?`, [data]);
    return result.insertId;
}

export async function update(tableName, id, data) {
    await poolConnection.query(`UPDATE ${tableName} SET ? WHERE id = ?`, [data, id]);
}

export async function remove(tableName, id) {
    await poolConnection.query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
}