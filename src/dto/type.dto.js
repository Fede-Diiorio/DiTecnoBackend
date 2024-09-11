export default class TypeDTO {
    constructor(data) {
        this.name = data.name;
        this.slug = data.slug;
        this.id = data._id;
        this.image = data.image;
        this.casementQuantity = data.casementQuantity;
    };
};