const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const messageErrors = {
  bodyIsNotArray: 'body must be an array',
  invalidQuantityOrProductID: 'Wrong product ID or invalid quantity',
};

const codeErrors = {
  invalidData: 'invalid_data',
  notFound: 'not_found',
};

const validateSaleJoi = (sale) => 
  Joi.array().items({
    productId: Joi.objectId(),
    quantity: Joi.number().min(1).required(),
}).validate(sale);

const validateUpdate = (sale) => {
  const err = {
    err: {
      code: codeErrors.invalidData,
      message: messageErrors.invalidQuantityOrProductID,
    },
  };

  const { error } = validateSaleJoi(sale);
  if (error) return err;
  return {};
};

module.exports = {
  validateSaleJoi,
  validateUpdate,
};