const { Opening } = require('./models');

class OpeningDao {
    async getOpeningTypes() {
        return await Opening.find();
    };
};

module.exports = { OpeningDao };