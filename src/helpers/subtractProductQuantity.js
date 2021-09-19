const ProductModel = require('../models/productsModel');

module.exports = async (sale) => {
    const { quantity, productId } = sale;
    const { name, quantity: quant } = await ProductModel.findById(productId);

    const newQuantity = quant - quantity;
  
    const updateProduct = {
      name,
      quantity: newQuantity,
    };
  
    return ProductModel.updateOne(productId, updateProduct);
  };
