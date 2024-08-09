const { Products } = require('./models');

class ProductsDao {
    async getProducts() {
        return await Products.find();
    };
};

module.exports = { ProductsDao };