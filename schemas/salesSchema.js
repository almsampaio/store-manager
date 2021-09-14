   const salesModel = require('../models/salesModel');

const errors = {
    quantityErrorValue: 'Wrong product ID or invalid quantity',
    saleDoesnExistId: 'Sale not found',
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

module.exports = {
    validateQuantity,
    validateSaleDoesntExistId,
};