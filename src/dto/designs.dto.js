export default class DesignDTO {
    constructor(data) {
        let id = 1;

        return data.map(d => ({
            name: d.name,
            slug: d.slug,
            image: d.image,
            id: id++,
        }));
    };
};
