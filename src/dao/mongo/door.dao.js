const { Doors } = require('./models');

class DoorDao {
    async getOpenings() {
        return await Doors.find();
    };

    async getTypes(opening) {
        return await Doors.find({ slug: opening }, 'type');
    };
};

module.exports = DoorDao;