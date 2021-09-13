const Joi = require('joi');

// Fonte: https://www.youtube.com/watch?v=xXjyqcDTkD0
// https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages
const productSchema = Joi.object({
  name: Joi.string().min(5).required()
    .messages({
      'string.base': '"name" should be a type of "text"',
      'string.empty': '"name" cannot be an empty field',
      'string.min': '"name" length must be at least 5 characters long',
      'any.required': '"name" is a required field',
    }),
  quantity: Joi.number().integer().greater(0).required()
    .messages({
      'number.base': '"quantity" must be a number',
      'number.empty': '"quantity" cannot be an empty field',
      'number.greater': '"quantity" must be larger than or equal to 1',
      'any.required': '"quantity" is a required field',
    }),
});

const validateProduct = (name, quantity) => {
  const productData = {
    name,
    quantity: parseInt(quantity, 10),
  };

  return productSchema.validate(productData);
};

module.exports = {
  validateProduct,
};
