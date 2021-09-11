const joi = require('@hapi/joi');
const productsModel = require('../models/productsModel');

const validateName = joi.object({ name: joi.string().min(5).required() });

const validateNewProductName = (name) => validateName.validate({ name }).error;

const validateQuantity = joi.object({ quantity: joi.number().min(1).required() });

const validateNewQuantityName = (quantity) => validateQuantity
.validate({ quantity }).error;

const verifyProductAlreadyExists = async (name) => {
    const productName = await productsModel.searchProductByName(name);
    if (productName.length > 0) return true;
};

const getById = async (id) => {
    const product = await productsModel.getById(id);
    if (!product) return false;
    return product;
};

module.exports = { 
    validateNewProductName, 
    validateNewQuantityName,
    verifyProductAlreadyExists,
    getById,
};