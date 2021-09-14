const Joi = require('joi');

const MIN_QUANTITY = 1;
const ID_LENGTH = 24;

// Source: https://thewebdev.info/2020/09/01/validate-objects-with-joi%E2%80%8A-%E2%80%8Amethods/
// const existsProduct = async (value, helpers) => {

// };

const salesSchema = Joi.object({
  productId: Joi
    .string()
    .length(ID_LENGTH)
    .hex()
    .required(),
  quantity: Joi
    .number()
    .integer()
    .not()
    .empty()
    .min(MIN_QUANTITY)
    .required(),
}).error(() => ({ message: 'Wrong product ID or invalid quantity' }));

module.exports = salesSchema;