   const salesModel = require('../models/salesModel');

const errors = {
    quantityErrorValue: 'Wrong product ID or invalid quantity',
    saleDoesnExistId: 'Sale not found',
    idFormatDoesnExist: 'Wrong sale ID format',
};

const codeError = 'invalid_data';
const codeNotFound = 'not_found';

const validateQuantity = (itensSold) => {
    const quantityVerified = itensSold.find((item) => 
                             item.quantity <= 0 
                             || typeof item.quantity !== 'number');

    if (quantityVerified) {
           return { err: {
               code: codeError,
               message: errors.quantityErrorValue,
           } };
    }
};

// Requisito 6
const validateSaleDoesntExistId = async (id) => {
    const existingSale = await salesModel.getById(id);

    if (!existingSale) {
        return { err: {
            code: codeNotFound,
            message: errors.saleDoesnExistId,
        } };
    }
};

// Requisito 8
const validateSaleIdRemove = async (id) => {
    const existingSale = await salesModel.getById(id);
    
    if (!existingSale) {
        return { err: {
            code: codeError,
            message: errors.idFormatDoesnExist,
        } };
    }
};

module.exports = {
    validateQuantity,
    validateSaleDoesntExistId,
    validateSaleIdRemove,
};