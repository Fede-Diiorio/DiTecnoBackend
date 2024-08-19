const { CustomError } = require('../utils/customErrors');

class OrderRepository {

    generateOrder(name, email, phone, cart) {
        const userData = {
            nombre: name,
            email,
            telefono: phone,
            pedidos: cart
        };

        return userData;
    };
};

module.exports = { OrderRepository };