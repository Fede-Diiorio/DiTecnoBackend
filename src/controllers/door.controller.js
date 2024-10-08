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

    async getDesigns(req, res) {
        try {
            const opening = req.params.opening;
            const style = req.params.style;
            const type = req.params.type;
            const designs = await this.#doorRepository.getDesigns(opening, style, type);
            res.json(designs);
        } catch (error) {
            res.status(error.status || 500).json(error || 'Error inesperado.');
        };
    };

    async getDesignsSpecification(req, res) {
        try {
            const opening = req.params.opening;
            const style = req.params.style;
            const type = req.params.type;
            const design = req.params.design;
            const designSpecification = await this.#doorRepository.getDesignsSpecification(opening, style, type, design);
            res.json(designSpecification);
        } catch (error) {
            res.status(error.status || 500).json(error || 'Error inesperado.');
        }
    }
};