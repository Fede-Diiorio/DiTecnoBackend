import { Designs } from './models/index.js';

export default class DesignDao {
    async getDesigns() {
        return await Designs.find();
    };
};