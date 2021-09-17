const productsModel = require('../models/productsModel');

const errors = {
    productLength: '"name" length must be at least 5 characters long',
    productExist: 'Product already exists',
    productDoesntExistId: 'Wrong id format',
    quantityMoreZero: '"quantity" must be larger than or equal to 1',
    quantityIsNumber: '"quantity" must be a number',
};

const codeError = 'invalid_data';

const validateProductLength = (name) => {
    if (name.length < 5) {
        return { err: {
            code: codeError,
            message: errors.productLength,
        } };
    }
};

const validateProductExist = async (name) => {
    const existingProduct = await productsModel.getAll();
    const products = existingProduct.find((product) => product.name === name);

  //  console.log(products);
    if (products) {
        return { err: {
            code: codeError,
            message: errors.productExist,
        } };
    }
};

const validateQuantityMoreZero = (quantity) => {
    if (quantity <= 0) {
     //   console.log(quantity);
        return { err: {
            code: codeError,
            message: errors.quantityMoreZero,
        } };
    }
};

const validateQuantityIsNumber = (quantity) => {
    if (typeof quantity !== 'number') {
        return { err: {
            code: codeError,
            message: errors.quantityIsNumber,
        } };
    }
};

// Requisito 2
const validateProductDoesntExistId = async (id) => {
    const existingProduct = await productsModel.getById(id);
  
  //  console.log(existingProduct);
    
    if (!existingProduct) {
        return { err: {
            code: codeError,
            message: errors.productDoesntExistId,
        } };
    }
};

module.exports = {
    validateProductLength,
    validateProductExist,
    validateQuantityMoreZero,
    validateQuantityIsNumber,
    validateProductDoesntExistId,
};