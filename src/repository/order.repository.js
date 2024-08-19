const { CustomError } = require('../utils/customErrors');
const { MailingService } = require('../utils/mailingService');
class OrderRepository {

    async generateOrder(name, email, phone, cart) {

        const userData = {
            nombre: name,
            email,
            telefono: phone,
            pedidos: cart
        };

        await new MailingService().sendMail(email, name, phone, cart);
        return userData;
    };
};

module.exports = { OrderRepository };