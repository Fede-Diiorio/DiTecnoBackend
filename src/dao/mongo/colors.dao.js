const { Colors } = require('./models');

class ColorsDao {
    async getColors() {
        return await Colors.find();
    };
};

module.exports = { ColorsDao };