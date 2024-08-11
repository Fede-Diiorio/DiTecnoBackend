const { Windows, Colors } = require('./models');

class WindowDao {
    async getOpenings() {
        return await Windows.find();
    };
};

module.exports = WindowDao;