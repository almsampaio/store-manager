const rescue = require('express-rescue');
const Joi = require('joi');
const service = require('../services/Product');
const invalid = require('../utils/InvalidData');

const getAllProducts = rescue(async (req, res) => {
  const products = await service.getAllProducts();

  return res.status(200).json(products);
});

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

const findById = rescue(async (req, res) => {
  const { id } = req.params;

  const product = await service.findById(id);

  if (product.err) return res.status(422).json(product);

  return res.status(200).json(product);
});

const updateProduct = rescue(async (req, res) => {
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

    const { id } = req.params;
    const { name, quantity } = req.body;

    const newProduct = await service.update(name, quantity, id);
  
    return res.status(200).json(newProduct);
});

module.exports = {
  create,
  getAllProducts,
  findById,
  updateProduct,
};