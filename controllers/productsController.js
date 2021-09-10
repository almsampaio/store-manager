const { StatusCodes } = require('http-status-codes');
const service = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await service.create(name, quantity);
  console.log(`Antes ${JSON.stringify(newProduct)}`, name, quantity);
  if (newProduct.err) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(newProduct);

  console.log(newProduct);

  return res.status(StatusCodes.CREATED).json(newProduct);
};

module.exports = {
  create,
};
