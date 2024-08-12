const WindowDao = require('../dao/mongo/window.dao');
const { SpecificationDTO } = require('../dto/specifications.dto');

class WindowRepository {
    #windowDao;

    constructor() {
        this.#windowDao = new WindowDao();
    };

    async getOpenings() {
        try {
            const openings = await this.#windowDao.getOpenings();
            const openingsPayload = openings.map(opening => new SpecificationDTO(opening));
            return openingsPayload;
        } catch (error) {
            console.log(error)
        };
    };
};

module.exports = { WindowRepository };