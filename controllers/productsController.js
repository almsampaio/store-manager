const rescue = require('express-rescue');
const Joi = require('joi');

const service = require('../services/productsService');

const ERROR_MESSAGES_NAME = {
  'string.base': 'Product name should be a type of string',
  'string.empty': 'Product name  cannot be an empty field',
  'string.min': '"name" length must be at least 5 characters long',
  'any.required': 'Product name  is a required field',
};

const ERROR_MESSAGES_QUANTITY = {
  'number.base': '"quantity" must be a number',
  'number.empty': 'Quantity cannot be an empty field',
  'number.min': '"quantity" must be larger than or equal to 1',
  'any.required': 'Quantity is a required field',
};

const getAll = rescue(async (_req, res) => {
  const productsArray = await service.getAll();

  res.status(200).json({ products: productsArray });
});

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

  if (createProduct.err) return res.status(422).json(createProduct);

  res.status(201).json(createProduct);
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;

  const product = await service.findById(id);

  if (product.err) return res.status(422).json(product);

  res.status(200).json(product);
});

const update = rescue(async (res, req) => {
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

  const updateProduct = await service.update(name, quantity);

  if (updateProduct.err) return res.status(422).json(updateProduct);

  res.status(201).json(updateProduct);
});

module.exports = {
  getAll,
  create,
  findById,
  update,
};

// Consegui usar essa estrutura de erros no próprio Joi com referência ao: https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages