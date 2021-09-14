const rescue = require('express-rescue');
const Joi = require('joi');

const service = require('../services/productsService');

const ERROR_MESSAGES_NAME = {
  'string.base': 'Product name should be a type of string',
  'string.empty': 'Product name  cannot be an empty field',
  'string.min': 'Product name should have a minimum length of 5 characters',
  'any.required': 'Product name  is a required field',
};

const ERROR_MESSAGES_QUANTITY = {
  'number.base': 'Quantity should be a integer number',
  'number.empty': 'Quantity name  cannot be an empty field',
  'number.min': 'Quantity name should have a minimum length of 5 characters',
  'any.required': 'Quantity name  is a required field',
};

const create = rescue(async (req, res) => {
  const { error } = Joi.object({
    name: Joi.string().min(5).not().empty()
      .required()
      .messages(ERROR_MESSAGES_NAME),

    quantity: Joi.number().integer().min(1).required()
      .messages(ERROR_MESSAGES_QUANTITY),
  })
    .validate(req.body);

  if (error) {
    return res.status(422).json({ err: {
      code: 'invalid_data',
      message: error.details[0].message,
    } });
  }

  const { name, quantity } = req.body;

  const createProduct = await service.create(name, quantity);

  res.status(201).json(createProduct);
});

module.exports = {
  create,
};

// Consegui usar essa estrutura de erros no próprio Joi com referência ao: https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages