import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import CalificacionesService from './../services/calificaciones-service.js';

const router = Router();
const currentService = new CalificacionesService();

router.get('', async (req, res) => {

    try {

        const returnArray =
            await currentService.getAllAsync();

        if (returnArray != null) {

            res.status(StatusCodes.OK)
               .json(returnArray);

        } else {

            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
               .send(`Error interno.`);
        }

    } catch (error) {

        console.log(error);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
           .send(`Error: ${error.message}`);
    }
});

router.get('/alumno/:idAlumno', async (req, res) => {

    try {

        const idAlumno =
            parseInt(req.params.idAlumno);

        const result =
            await currentService.getByAlumnoAsync(idAlumno);

        res.status(StatusCodes.OK)
           .json(result);

    } catch (error) {

        console.log(error);

        res.status(StatusCodes.NOT_FOUND)
           .send(error.message);
    }
});

router.get('/:id', async (req, res) => {

    try {

        const id = req.params.id;

        const entity =
            await currentService.getByIdAsync(id);

        if (entity != null) {

            res.status(StatusCodes.OK)
               .json(entity);

        } else {

            res.status(StatusCodes.NOT_FOUND)
               .send(`No se encontro la entidad (id:${id}).`);
        }

    } catch (error) {

        console.log(error);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
           .send(`Error: ${error.message}`);
    }
});

router.post('', async (req, res) => {

    try {

        const entity = req.body;

        const created =
            await currentService.createAsync(entity);

        res.status(StatusCodes.CREATED)
           .json(created);

    } catch (error) {

        console.log(error);

        if (
            error.message.includes(
                "Ya existe una calificación"
            )
        ) {

            return res
                .status(StatusCodes.CONFLICT)
                .json({
                    error: error.message
                });
        }

        res.status(StatusCodes.BAD_REQUEST)
           .json({
               error: error.message
           });
    }
});

router.put('/:id', async (req, res) => {

    try {

        const id =
            parseInt(req.params.id);

        const rowsAffected =
            await currentService.updateAsync(
                id,
                req.body
            );

        if (rowsAffected != 0) {

            res.status(StatusCodes.OK)
               .json(rowsAffected);

        } else {

            res.status(StatusCodes.NOT_FOUND)
               .send(
                    `No se encontro la entidad (id:${id}).`
                );
        }

    } catch (error) {

        console.log(error);

        if (
            error.message.includes(
                "No se encontró la calificación"
            )
        ) {

            return res
                .status(StatusCodes.NOT_FOUND)
                .send(error.message);
        }

        res.status(StatusCodes.BAD_REQUEST)
           .send(error.message);
    }
});

router.delete('/:id', async (req, res) => {

    try {

        const id = req.params.id;

        const rowCount =
            await currentService.deleteByIdAsync(id);

        if (rowCount != 0) {

            res.status(StatusCodes.OK)
               .json(null);

        } else {

            res.status(StatusCodes.NOT_FOUND)
               .send(
                    `No se encontro la entidad (id:${id}).`
                );
        }

    } catch (error) {

        console.log(error);

        if (
            error.message.includes(
                "No se encontró la calificación"
            )
        ) {

            return res
                .status(StatusCodes.NOT_FOUND)
                .send(error.message);
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
           .send(`Error: ${error.message}`);
    }
});

export default router;