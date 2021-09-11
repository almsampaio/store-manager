const productsService = require('../services/productsService');

/* const HTTP_OK = 200; */
const HTTP_CREATED = 201;
const HTTP_UNPROCESSABLE = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { err, product } = await productsService.create(name, quantity);
  if (err) return res.status(HTTP_UNPROCESSABLE).json({ err });
  return res.status(HTTP_CREATED).json(product);
};

module.exports = { create };