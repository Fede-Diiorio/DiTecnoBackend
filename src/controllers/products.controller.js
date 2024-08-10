const { ProductRepository } = require('../repository/product.repository');

class Controller {
    #productRepository;

    constructor() {
        this.#productRepository = new ProductRepository();
    };

    async getProducts(res) {
        try {
            const product = await this.#productRepository.getProducts();
            res.json(product);
        } catch (error) {
            res.status(error.status || 500).json(error);
        };
    };

    async getOpenings(req, res) {
        try {
            const product = req.params.product;
            const openings = await this.#productRepository.getOpeningTypes(product);
            res.json(openings);
        } catch (error) {
            res.status(error.status || 500).json(error);
        };
    };

    async getStyles(req, res) {
        try {
            const product = req.params.product;
            const opening = req.params.opening;
            const openingStyle = await this.#productRepository.getOpeningStyles(product, opening);
            res.json(openingStyle);
        } catch (error) {
            res.status(error.status || 500).json(error);
        };
    };

    async getTypes(req, res) {
        try {
            const product = req.params.product;
            const opening = req.params.opening;
            const style = req.params.style;
            const type = await this.#productRepository.getTypes(product, opening, style);
            res.json(type);
        } catch (error) {
            res.status(error.status || 500).json(error);
        };
    };

    async getColors(req, res) {
        try {
            const product = req.params.product;
            const opening = req.params.opening;
            const style = req.params.style;
            res.json({ product, opening, style });
        } catch (error) {
            res.status(error.status || 500).json(error);
        };
    };
};



module.exports = { Controller };