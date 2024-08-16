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
            const types = await this.#doorRepository.getTypes(opening);
            res.json(types);
        } catch (error) {
            res.status(error.status || 500).json(error);
        };
    };

    async getDesigns(req, res) {
        try {
            const opening = req.params.opening;
            const type = req.params.type;
            const design = await this.#doorRepository.getDesigns(opening, type);
            res.json(design);
        } catch (error) {
            res.status(error.status || 500).json(error);
        };
    };

    async getColors(req, res) {
        try {
            const opening = req.params.opening;
            const type = req.params.type;
            const design = req.params.design;
            const colors = await this.#doorRepository.getColors(opening, type, design);
            res.json(colors);
        } catch (error) {
            res.status(error.status || 500).json(error);
        };
    };
};

module.exports = { Controller };