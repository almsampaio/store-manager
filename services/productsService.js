const productsModel = require('../models/productsModel');
const productSchema = require('../schemas/productSchema');

const create = async (name, quantity) => {
    const productLength = productSchema.validateProductLength(name);
    const productExist = await productSchema.validateProductExist(name);
    const quantityMoreZero = productSchema.validateQuantityMoreZero(quantity);
    const quantityIsNumber = productSchema.validateQuantityIsNumber(quantity);
    
    if (productLength) { return productLength; }
    if (productExist) { return productExist; }
    if (quantityMoreZero) { return quantityMoreZero; }
    if (quantityIsNumber) { return quantityIsNumber; }
    
    const createdProduct = await productsModel.create(name, quantity);
    return createdProduct;
};

const getAll = async () => {
    const products = await productsModel.getAll();
    return { products };
};

const getById = async (id) => {
    const productId = await productSchema.validateProductDoesntExistId(id);

    if (productId) { return productId; }

    const listedProduct = await productsModel.getById(id);
    return listedProduct;
};

const update = async (id, name, quantity) => {
    const productLength = productSchema.validateProductLength(name);
    const quantityMoreZero = productSchema.validateQuantityMoreZero(quantity);
    const quantityIsNumber = productSchema.validateQuantityIsNumber(quantity);

    if (productLength) { return productLength; }
    if (quantityMoreZero) { return quantityMoreZero; }
    if (quantityIsNumber) { return quantityIsNumber; }

    const updatedProduct = await productsModel.update(id, name, quantity);
  //  console.log(updatedProduct);
    return updatedProduct;
};

module.exports = {
    create,
    getById,
    getAll,
    update,
};