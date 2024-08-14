const { Designs } = require('./models');

class DesignDao {
    async getDesigns() {
        return await Designs.find();
    };
};

module.exports = DesignDao;