import OrderRepository from '../repository/order.repository.js';

export default class Controller {

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