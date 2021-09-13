const productsModel = require('../models/productsModel');
const productSchema = require('../schemas/productSchema');

const create = async (name, quantity) => {
    const productLength = productSchema.validateProductLength(name);
    const productExist = await productSchema.validateProductExist(name);
    const quantityMoreZero = productSchema.validateQuantityMoreZero(quantity);
    const quantityIsNumber = productSchema.validateQuantityIsNumber(quantity);
    
    if (productLength) { return productLength; }
    if (productExist) { return productExist; }
  //  console.log(quantityMoreZero);
    if (quantityMoreZero) { return quantityMoreZero; }
    if (quantityIsNumber) { return quantityIsNumber; }
    
    const createdProduct = await productsModel.create(name, quantity);
    return createdProduct;
};

module.exports = {
    create,
};