const rescue = require('express-rescue');
const Joi = require('joi');
const service = require('../services/Product');

const create = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().integer().greater(0).required(),
  })
    .validate(req.body);

  if (error) {
    return next(error);
  }

  const { name, quantity } = req.body;

  const newProduct = await service.create(name, quantity);

  if (newProduct.error) return next(newProduct.error);

  return res.status(201).json(newProduct);
});

module.exports = {
  create,
};