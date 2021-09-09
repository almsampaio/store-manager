const productsService = require('../services/productsService');

const HTTP_200 = 200;
const HTTP_201 = 201;
const HTTP_422 = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { err, product } = await productsService.create(name, quantity);
  if (err) return res.status(HTTP_422).json({ err });
  return res.status(HTTP_201).json(product);
};

module.exports = {
  // getAll,
  // getById,
  create,
  // editById,
  // deleteById
};
