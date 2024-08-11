const { WindowRepository } = require('../repository/window.repository');

class Controller {

    #windowRepository;

    constructor() {
        this.#windowRepository = new WindowRepository();
    };

    async getOpening(res) {
        const openings = await this.#windowRepository.getOpenings();
        res.json(openings);
    };
};

module.exports = { Controller };