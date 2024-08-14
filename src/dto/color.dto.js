class ColorDTO {
    constructor(data) {
        this.name = data.name;
        this.slug = data.slug;
        this.id = data.id;
        this.image = data.image;
    };
};

module.exports = ColorDTO;