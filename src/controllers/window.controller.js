const { WindowRepository } = require('../repository/window.repository');

class Controller {

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

    async getColors(req, res) {
        try {
            const opening = req.params.opening;
            const style = req.params.style;
            const type = req.params.type
            const colors = await this.#windowRepository.getColors(opening, style, type);
            res.json(colors);
        } catch (error) {
            res.status(error.status || 500).json(error);
        };
    }
};

module.exports = { Controller };