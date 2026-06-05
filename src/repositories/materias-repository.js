import DbPg from "./db-pg.js";

export default class MateriasRepository {

    getAllAsync = async () => {
        const db = new DbPg();

        const sql = `
            SELECT *
            FROM materias
            ORDER BY id
        `;

        return await db.queryAll(sql);
    }

    getByIdAsync = async (id) => {
        const db = new DbPg();

        const sql = `
            SELECT *
            FROM materias
            WHERE id = $1
        `;

        return await db.queryOne(sql, [id]);
    }

    createAsync = async (materia) => {
        const db = new DbPg();

        const sql = `
            INSERT INTO materias(nombre)
            VALUES($1)
            RETURNING id
        `;

        return await db.queryReturnId(sql, [
            materia.nombre
        ]);
    }

    updateAsync = async (id, materia) => {
        const db = new DbPg();

        const sql = `
            UPDATE materias
            SET nombre = $2
            WHERE id = $1
        `;

        return await db.queryRowCount(sql, [
            id,
            materia.nombre
        ]);
    }

    deleteByIdAsync = async (id) => {
        const db = new DbPg();

        const sql = `
            DELETE FROM materias
            WHERE id = $1
        `;

        return await db.queryRowCount(sql, [id]);
    }
}