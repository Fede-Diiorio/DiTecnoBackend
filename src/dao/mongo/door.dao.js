import { Doors } from './models/index.js';

export default class DoorDao {
    async getOpenings() {
        return await Doors.find();
    };

    async getTypes(opening) {
        return await Doors.find({ slug: opening }, 'type');
    };
};