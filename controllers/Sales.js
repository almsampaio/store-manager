const rescue = require('express-rescue');
const Joi = require('joi');
const service = require('../services/Sales');
const invalid = require('../utils/InvalidData');

const create = rescue(async (req, res) => {
const array = req.body;
array.forEach((sale) => {
  const { error } = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),
  })
    .validate(sale);
  
  if (error) {
    const errorMsg = 'Wrong product ID or invalid quantity';
    const invalidJson = invalid.InvalidData(errorMsg);
    return res.status(422).json(invalidJson);
  }
});

  const sales = await service.create(req.body);
  return res.status(200).json(sales);
});

module.exports = {
  create,
};