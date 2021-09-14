const rescue = require('express-rescue');
const Joi = require('joi');
const service = require('../services/Product');
const invalid = require('../utils/InvalidData');

const create = rescue(async (req, res) => {
  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().integer().min(1).required(),
  })
    .validate(req.body);

  if (error) {
    const errorMsg = error.details[0].message;
    const invalidJson = invalid.InvalidData(errorMsg);
    return res.status(422).json(invalidJson);
  }

  const { name, quantity } = req.body;

  const newProduct = await service.create(name, quantity);

  if (newProduct.err) return res.status(422).json(newProduct);

  return res.status(201).json(newProduct);
});

module.exports = {
  create,
};