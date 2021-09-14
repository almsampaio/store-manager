const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, min: 0, required: true },
});

exports.productsModel = mongoose.model('products', productSchema);

exports.isObjectId = mongoose.Types.ObjectId.isValid;
