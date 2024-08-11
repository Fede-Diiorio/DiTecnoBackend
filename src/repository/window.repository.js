const WindowDao = require('../dao/mongo/window.dao');

class WindowRepository {
    #windowDao;

    constructor() {
        this.#windowDao = new WindowDao();
    };

    async getOpenings() {
        try {
            const openings = await this.#windowDao.getOpenings();
            return openings;
        } catch (error) {
            throw new Error('Error')
        };
    };
};

module.exports = { WindowRepository };