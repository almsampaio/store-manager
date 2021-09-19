// const { ObjectId } = require('mongodb');

const ProductModel = require('../models/productsModel');
const SalesModel = require('../models/salesModel');

module.exports = async (id) => {
  const sale = await SalesModel.findById(id);

  if (!sale) return;

  const { itensSold: [{ productId, quantity }] } = sale;
  
    const { name, quantity: quant } = await ProductModel.findById(productId);

    const newQuantity = quant + quantity;
  
    const updateProduct = {
      name,
      quantity: newQuantity,
    };
  
    await ProductModel.updateOne(productId, updateProduct);
  };
