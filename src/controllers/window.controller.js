import WindowRepository from '../repository/window.repository.js';

export default class Controller {

    #windowRepository;

    constructor() {
        this.#windowRepository = new WindowRepository();
    };

    async getOpening(res) {
        try {
            const openings = await this.#windowRepository.getOpenings();
            res.json(openings);
        } catch (error) {
            res.status(error.status || 500).json(error);
        };
    };

    async getStyles(req, res) {
        try {
            const opening = req.params.opening;
            const styles = await this.#windowRepository.getStyles(opening);
            res.json(styles);
        } catch (error) {
            res.status(error.status || 500).json(error);
        };
    };

    async getTypes(req, res) {
        try {
            const opening = req.params.opening;
            const style = req.params.style;
            const types = await this.#windowRepository.getTypes(opening, style);
            res.json(types);
        } catch (error) {
            res.status(error.status || 500).json(error);
        };
    };

    async getTypeSpecification(req, res) {
        try {
            const opening = req.params.opening;
            const style = req.params.style;
            const type = req.params.type
            const typeSpecification = await this.#windowRepository.getTypeSpecification(opening, style, type);
            res.json(typeSpecification);
        } catch (error) {
            res.status(error.status || 500).json(error);
        };
    };
};