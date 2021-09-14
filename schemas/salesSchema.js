  // const salesModel = require('../models/salesModel');

const errors = {
    quantityErrorValue: 'Wrong product ID or invalid quantity',
};

const codeError = 'invalid_data';

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

module.exports = {
    validateQuantity,
};