export default class DoorModelDTO {
    constructor(door, design) {
        this.id = door._id;
        this.doorName = door.name;
        this.doorSlug = door.slug;
        this.doorImage = door.image;
        this.casementQuantity = door.casementQuantity;
        this.designName = design.name;
        this.designSlug = design.slug
        this.designImage = design.image;
    };
};