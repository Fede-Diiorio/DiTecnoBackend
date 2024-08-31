const { CustomError } = require('../utils/customErrors');
const { MailingService } = require('../utils/mailingService');
const { DoorRepository } = require('../repository/door.repository');
const { WindowRepository } = require('../repository/window.repository');
const { DoorDTO, WindowDTO } = require('../dto');

class OrderRepository {

    #doorRepository;
    #windowRepository;

    constructor() {
        this.#doorRepository = new DoorRepository();
        this.#windowRepository = new WindowRepository();
    }

    async generateOrder(name, email, phone, cart) {

        const products = [];

        for (const prod of cart) {
            if (prod.product === 'ventana') {
                const type = await this.#windowRepository.getTypeSpecification(prod.opening, prod.style, prod.type);
                products.push(new WindowDTO(prod, type));
                console.log(products)
            } else {
                // const type = await this.#doorRepository.getTypeName(prod.opening, prod.type);
                // products.push(new DoorDTO(prod, type));
                products.push('Puertas');
            }
        };

        const userData = {
            nombre: name,
            email,
            telefono: phone,
            pedidos: products
        };


        await new MailingService().sendMail(email, name, phone, products);
        return userData;
    };
};

module.exports = { OrderRepository };