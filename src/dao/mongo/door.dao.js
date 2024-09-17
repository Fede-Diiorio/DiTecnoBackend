import { Doors } from './models/index.js';

export default class DoorDao {
    async getOpenings() {
        return await Doors.find();
    };

    async getStyles(opening) {
        return await Doors.find({ slug: opening }, 'style');
    };

    async getTypes(opening, style) {
        const door = await Doors.findOne(
            { slug: opening, 'style.slug': style },
            { 'style.$': 1 }
        );

        if (door && door.style.length > 0) {
            return door.style[0].type;
        };

        return null;
    };
};