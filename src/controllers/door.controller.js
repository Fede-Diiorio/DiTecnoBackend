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
            res.status(error.status || 500).json(error || 'Error inesperado.');
        };
    };

    async getTypes(req, res) {
        try {
            const opening = req.params.opening;
            const types = await this.#doorRepository.getTypes(opening);
            res.json(types);
        } catch (error) {
            res.status(error.status || 500).json(error || 'Error inesperado.');
        };
    };

    async getDesigns(req, res) {
        try {
            const opening = req.params.opening;
            const type = req.params.type;
            const design = await this.#doorRepository.getDesigns(opening, type);
            res.json(design);
        } catch (error) {
            res.status(error.status || 500).json(error || 'Error inesperado.');
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
            res.status(error.status || 500).json(error || 'Error inesperado.');
        };
    };

    async generateProduct(req, res) {
        try {
            const opening = req.params.opening;
            const type = req.params.type;
            const design = req.params.design;
            const color = req.params.color;
            const { width, height, quantity, fixedWidth, fixedHeight } = req.body;
            const product = this.#doorRepository.generateDoor(opening, type, design, color, req.body);
            res.json(product);
        } catch (error) {
            res.status(error.status || 500).json(error || 'Error inesperado.');
        }
    }
};

module.exports = { Controller };