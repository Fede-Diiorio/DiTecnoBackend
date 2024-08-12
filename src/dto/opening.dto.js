class OpeningDTO {
    constructor(data) {
        this.name = data.name;
        this.slug = data.slug;
        this.id = data.id;
        this.style = data.style.map(s => ({
            name: s.name,
            slug: s.slug
        }))
    };
};

module.exports = { OpeningDTO };