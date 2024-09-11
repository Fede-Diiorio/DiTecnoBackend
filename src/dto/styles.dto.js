export default class StylesDTO {
    constructor(data) {
        return data.style.map(s => ({
            name: s.name,
            slug: s.slug,
            image: s.image,
            id: s._id.toString()
        }));
    };
};