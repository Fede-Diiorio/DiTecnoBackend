const { DoorRepository } = require('../repository/door.repository');

class Controller {

    #doorRepository;

    constructor() {
        this.#doorRepository = new DoorRepository();
    };

    async getOpening(res) {
        try {
            const openings = await this.#doorRepository.getOpenings();
            res.json(openings);
        } catch (error) {
            res.status(error.status || 500).json(error);
        };
    };

    async getTypes(req, res) {
        try {
            const opening = req.params.opening;
            const style = req.params.style;
            const types = await this.#doorRepository.getTypes(opening, style);
            res.json(types);
        } catch (error) {
            res.status(error.status || 500).json(error);
        };
    }
};;

module.exports = { Controller };