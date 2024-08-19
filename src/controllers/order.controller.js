const { OrderRepository } = require('../repository/order.repository');

class Controller {

    #orderRepository;

    constructor() {
        this.#orderRepository = new OrderRepository();
    };

    getData(req, res) {
        try {
            const { name, email, phone, cart } = req.body;
            const userData = this.#orderRepository.generateOrder(name, email, phone, cart);
            res.json(userData)
        } catch (error) {
            res.status(error.status || 500).json(error);
        };
    };
};

module.exports = { Controller };
