export default class DoorModelDTO {
    constructor(door, design) {
        this.name = door.name;
        this.slug = door.slug;
        this.id = door._id;
        this.image = design.image;
        this.casementQuantity = door.casementQuantity;
        this.design = design.slug;
    };
};