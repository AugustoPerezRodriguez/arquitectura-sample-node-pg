import MateriasRepository from "../repositories/materias-repository.js";

export default class MateriasService {

    repository = new MateriasRepository();

    getAllAsync = async () => {
        return await this.repository.getAllAsync();
    }

    getByIdAsync = async (id) => {
        return await this.repository.getByIdAsync(id);
    }

    createAsync = async (materia) => {

        if (!materia.nombre || materia.nombre.trim() === "") {
            throw new Error("El nombre de la materia es obligatorio.");
        }

        return await this.repository.createAsync(materia);
    }

    updateAsync = async (id, materia) => {

        const existing = await this.repository.getByIdAsync(id);

        if (!existing) {
            throw new Error(`No se encontró la materia (id: ${id}).`);
        }

        return await this.repository.updateAsync(id, materia);
    }

    deleteByIdAsync = async (id) => {

        const existing = await this.repository.getByIdAsync(id);

        if (!existing) {
            throw new Error(`No se encontró la materia (id: ${id}).`);
        }

        return await this.repository.deleteByIdAsync(id);
    }
}