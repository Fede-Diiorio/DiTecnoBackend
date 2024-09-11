import { Colors } from './models/index.js';

export default class ColorDao {
    async getColors() {
        return await Colors.find();
    };
};