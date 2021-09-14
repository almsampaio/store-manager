const rescue = require('express-rescue');
const Joi = require('joi');

const service = require('../services/productsService');

const create = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    product_name: Joi.string()
      .min(5)
      .not()
      .empty()
      .required(),

    product_quantity: Joi.number()
      .integer()
      .min(1)
      .required(),
  })
    .validate(req.body);

  if (error) {
    return next(error);
  }

  const { product_name, product_quantity } = req.body;

  const createProduct = await service.create(product_name, product_quantity);

  res.status(201).json(createProduct);
});

module.exports = {
  create,
};
