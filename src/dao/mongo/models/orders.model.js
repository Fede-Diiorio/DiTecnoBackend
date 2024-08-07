const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    products: [{
        product: {
            type: Object,
        }
    }]
});

schema.virtual('id').get(function () {
    return this._id.toString();
});

module.exports = mongoose.model('Orders', schema, 'orders');