const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
});

exports.productsModel = mongoose.model('products', productSchema);

exports.isObjectId = mongoose.Types.ObjectId.isValid;
