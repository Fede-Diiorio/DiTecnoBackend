const { Types } = require('./models');

class TypesDao {
    async getTypes() {
        return await Types.find();
    };
};

module.exports = { TypesDao };