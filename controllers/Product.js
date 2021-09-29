const rescue = require('express-rescue');
const service = require('../services/Product');

const CREATED_STATUS = 201;
const UNPROCESSABLE_ENTITY_STATUS = 422;

const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await service.create(name, quantity);
  if (newProduct.err) return res.status(UNPROCESSABLE_ENTITY_STATUS).json(newProduct);

  res.status(CREATED_STATUS).json(newProduct);
});

module.exports = {
  create,
};
