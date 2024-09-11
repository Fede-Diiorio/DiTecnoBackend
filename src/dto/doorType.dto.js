export default class DoorTypeDTO {
    constructor(data) {
        return data.type.map(t => ({
            name: t.name,
            slug: t.slug,
            id: t._id.toString()
        }));
    };
};