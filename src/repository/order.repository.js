import CustomError from '../utils/customErrors.js';
import MailingService from '../utils/mailingService.js';
import DoorRepository from '../repository/door.repository.js';
import WindowRepository from '../repository/window.repository.js';
import { DoorDTO, WindowDTO } from '../dto/index.js';

export default class OrderRepository {

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
        await new MailingService().sendMailToUser(email);
        return userData;
    };
};