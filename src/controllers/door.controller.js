import DoorRepository from '../repository/door.repository.js';

export default class Controller {

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

    async getStyles(req, res) {
        try {
            const opening = req.params.opening;
            const types = await this.#doorRepository.getStyles(opening);
            res.json(types);
        } catch (error) {
            res.status(error.status || 500).json(error || 'Error inesperado.');
        };
    };

    async getTypes(req, res) {
        try {
            const opening = req.params.opening;
            const style = req.params.style;
            const type = await this.#doorRepository.getTypes(opening, style);
            res.json(type);
        } catch (error) {
            res.status(error.status || 500).json(error || 'Error inesperado.');
        };
    };
};