const DoorDao = require('../dao/mongo/door.dao');
const { OpeningsDTO } = require('../dto');
const { CustomError } = require('../utils/customErrors');

class DoorRepository {
    #doorDao;

    constructor() {
        this.#doorDao = new DoorDao();
    };

    async getOpenings() {
        try {

            const openings = await this.#doorDao.getOpenings();
            const openingsPayload = openings.map(opening => new OpeningsDTO(opening));
            return openingsPayload;

        } catch (error) {
            throw CustomError.createError({
                name: error.name || 'Error en las aberturas.',
                cause: error.cause || 'Ocurrió un error al procesar su solicitud y no se pudieron cargar los datos de forma correcta.',
                message: error.message || 'La petición realizada no pudo ser completada debido a un error en la solicitud.',
                status: error.status || 500
            });
        };
    };
};

module.exports = { DoorRepository };