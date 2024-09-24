export default class DoorDTO {
    constructor(data, type) {
        this.product = data.product;
        this.productName = type.name;
        this.opening = data.opening;
        this.image = type.image;
        this.design = data.design;
        this.colors = data.colors;
        this.width = `${data.width} cm`;
        this.height = `${data.height} cm`;
        this.casement = data.casement ? `${data.casement} cm` : 'No requerido';
        this.casement2 = data.casement2 ? `${data.casement2} cm` : 'No requerido';
        this.casement3 = data.casement3 ? `${data.casement3} cm` : 'No requerido';
        this.quantity = data.quantity;
    };
};