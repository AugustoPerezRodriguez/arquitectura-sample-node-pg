import DbPg from "./db-pg.js";

export default class CalificacionesRepository {

    getAllAsync = async () => {

        const db = new DbPg();

        const sql = `
            SELECT
                c.id,
                c.id_alumno,
                a.nombre AS nombre_alumno,
                a.apellido AS apellido_alumno,
                c.id_materia,
                m.nombre AS nombre_materia,
                c.nota,
                c.fecha
            FROM calificaciones c
            INNER JOIN alumnos a
                ON a.id = c.id_alumno
            INNER JOIN materias m
                ON m.id = c.id_materia
            ORDER BY c.id
        `;

        return await db.queryAll(sql);
    }

    getByIdAsync = async (id) => {

        const db = new DbPg();

        const sql = `
            SELECT
                c.id,
                c.id_alumno,
                a.nombre AS nombre_alumno,
                a.apellido AS apellido_alumno,
                c.id_materia,
                m.nombre AS nombre_materia,
                c.nota,
                c.fecha
            FROM calificaciones c
            INNER JOIN alumnos a
                ON a.id = c.id_alumno
            INNER JOIN materias m
                ON m.id = c.id_materia
            WHERE c.id = $1
        `;

        return await db.queryOne(sql, [id]);
    }

    getByAlumnoAsync = async (idAlumno) => {

        const db = new DbPg();

        const sql = `
            SELECT
                c.id,
                c.id_materia,
                m.nombre AS nombre_materia,
                c.nota,
                c.fecha
            FROM calificaciones c
            INNER JOIN materias m
                ON m.id = c.id_materia
            WHERE c.id_alumno = $1
        `;

        return await db.queryAll(sql, [idAlumno]);
    }

    getByAlumnoMateriaAsync = async (idAlumno, idMateria) => {

        const db = new DbPg();

        const sql = `
            SELECT *
            FROM calificaciones
            WHERE id_alumno = $1
            AND id_materia = $2
        `;

        return await db.queryOne(sql, [
            idAlumno,
            idMateria
        ]);
    }

    createAsync = async (calificacion) => {

        const db = new DbPg();

        const sql = `
            INSERT INTO calificaciones
            (
                id_alumno,
                id_materia,
                nota,
                fecha
            )
            VALUES
            (
                $1,$2,$3,
                COALESCE($4,CURRENT_DATE)
            )
            RETURNING *
        `;

        return await db.queryOne(sql, [
            calificacion.id_alumno,
            calificacion.id_materia,
            calificacion.nota,
            calificacion.fecha
        ]);
    }

    updateAsync = async (id, nota, fecha) => {

        const db = new DbPg();

        const sql = `
            UPDATE calificaciones
            SET
                nota = $2,
                fecha = $3
            WHERE id = $1
        `;

        return await db.queryRowCount(sql, [
            id,
            nota,
            fecha
        ]);
    }

    deleteByIdAsync = async (id) => {

        const db = new DbPg();

        const sql = `
            DELETE FROM calificaciones
            WHERE id = $1
        `;

        return await db.queryRowCount(sql, [id]);
    }
}