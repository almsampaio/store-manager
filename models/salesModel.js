const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  itensSold: [{
    productId: mongoose.ObjectId,
    quantity: Number,
  }],
});

exports.salesModel = mongoose.model('sales', salesSchema);

exports.isObjectId = mongoose.Types.ObjectId.isValid;
