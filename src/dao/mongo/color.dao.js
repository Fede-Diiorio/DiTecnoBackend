const { Colors } = require('./models');

class ColorDao {
    async getColors() {
        return await Colors.find();
    };
};

module.exports = ColorDao;