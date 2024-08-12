const { Windows, Colors } = require('./models');

class WindowDao {
    async getOpenings() {
        return await Windows.find();
    };

    async getStyles(opening) {
        return await Windows.find({ slug: opening }, 'style');
    }
};

module.exports = WindowDao;