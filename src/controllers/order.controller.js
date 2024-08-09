const { ProductRepository } = require('../repository/product.repository');

class Controller {
    #productRepository;

    constructor() {
        this.#productRepository = new ProductRepository();
    }

    getProducts = (res) => {
        try {
            const product = this.#productRepository.getProducts();
            res.json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    generateProduct = (req, res) => {
        try {
            const type = req.params.type;
            const openingType = req.params.opening;
            const openingStyle = req.params.style;
            const color = req.params.color;
            const { width, height, quantity } = req.body;
            console.log(type, openingStyle, openingType, color, width, height, quantity);

            const product = this.#productRepository.generateProduct(type, openingType, openingStyle, color, width, height, quantity);
            res.status(201).json(product);

        } catch (error) {
            console.log(error)
            // res.status(error.status).json(error)
            res.json('test');
        };
    };
};



module.exports = { Controller };