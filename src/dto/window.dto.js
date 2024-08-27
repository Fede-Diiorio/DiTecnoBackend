class WindowDTO {
    constructor(data, type) {
        this.product = data.product;
        this.opening = data.opening;
        this.type = type.image;
        this.style = data.style;
        this.colors = data.colors;
        this.width = `${data.width} cm`;
        this.height = `${data.height} cm`;
        this.fixedWidth = data.fixedWidth ? `${data.fixedWidth} cm` : 'No requerido';
        this.fixedHeight = data.fixedHeight ? `${data.fixedHeight} cm` : 'No requerido';
        this.quantity = data.quantity;
    };
};

module.exports = WindowDTO;