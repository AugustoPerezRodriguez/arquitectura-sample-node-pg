import CalificacionesRepository from "../repositories/calificaciones-repository.js";
import AlumnosService from "./alumnos-service.js";
import MateriasService from "./materias-service.js";

export default class CalificacionesService {

    repository = new CalificacionesRepository();

    alumnosService = new AlumnosService();

    materiasService = new MateriasService();

    getAllAsync = async () => {
        return await this.repository.getAllAsync();
    }

    getByIdAsync = async (id) => {
        return await this.repository.getByIdAsync(id);
    }

    getByAlumnoAsync = async (idAlumno) => {

        const alumno =
            await this.alumnosService.getByIdAsync(idAlumno);

        if (!alumno) {
            throw new Error(
                `El alumno con id ${idAlumno} no existe.`
            );
        }

        return await this.repository.getByAlumnoAsync(idAlumno);
    }

    createAsync = async (entity) => {

        if (
            !Number.isInteger(entity.nota) ||
            entity.nota < 0 ||
            entity.nota > 10
        ) {
            throw new Error(
                "La nota debe ser un número entero entre 0 y 10."
            );
        }

        const alumno =
            await this.alumnosService.getByIdAsync(entity.id_alumno);

        if (!alumno) {
            throw new Error(
                `El alumno con id ${entity.id_alumno} no existe.`
            );
        }

        const materia =
            await this.materiasService.getByIdAsync(entity.id_materia);

        if (!materia) {
            throw new Error(
                `La materia con id ${entity.id_materia} no existe.`
            );
        }

        const existing =
            await this.repository.getByAlumnoMateriaAsync(
                entity.id_alumno,
                entity.id_materia
            );

        if (existing) {
            throw new Error(
                `Ya existe una calificación para el alumno ${entity.id_alumno} en la materia ${entity.id_materia}.`
            );
        }

        return await this.repository.createAsync(entity);
    }

    updateAsync = async (id, body) => {

        const existing =
            await this.repository.getByIdAsync(id);

        if (!existing) {
            throw new Error(
                `No se encontró la calificación (id: ${id}).`
            );
        }

        if (
            body.nota !== undefined &&
            (
                !Number.isInteger(body.nota) ||
                body.nota < 0 ||
                body.nota > 10
            )
        ) {
            throw new Error(
                "La nota debe ser un número entero entre 0 y 10."
            );
        }

        return await this.repository.updateAsync(
            id,
            body.nota ?? existing.nota,
            body.fecha ?? existing.fecha
        );
    }

    deleteByIdAsync = async (id) => {

        const existing =
            await this.repository.getByIdAsync(id);

        if (!existing) {
            throw new Error(
                `No se encontró la calificación (id: ${id}).`
            );
        }

        return await this.repository.deleteByIdAsync(id);
    }
}