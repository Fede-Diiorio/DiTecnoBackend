import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    opening: {
        type: String,
        required: true,
    },
    style: {
        type: String,
    },
    type: {
        type: String,
    },
    color: {
        type: String,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
});

const Product = mongoose.model('Window', schema);

export default Product;
