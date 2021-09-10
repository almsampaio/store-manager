const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
});

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;
