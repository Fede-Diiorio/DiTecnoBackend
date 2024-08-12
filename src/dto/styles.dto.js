class StylesDTO {
    constructor(data) {
        return data.style.map(s => ({
            name: s.name,
            slug: s.slug,
            id: s._id.toString()
        }));
    };
};

module.exports = StylesDTO;
