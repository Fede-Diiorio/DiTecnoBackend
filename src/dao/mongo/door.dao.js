const { Doors, Colors } = require('./models');

class WindowDao {
    async getOpenings() {
        return await Doors.find();
    };

    async getTypes(opening) {
        return await Doors.find({ slug: opening }, 'style');
    };
};

module.exports = WindowDao;