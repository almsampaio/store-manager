// Recebe as requisições e manda as responses pro cliente
// Manda pro index

const productService = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { err, statusCode, product } = await productService.create(name, quantity);
  if (err) return res.status(statusCode).json({ err });

  res.status(201).json(product);
};

module.exports = {
  create,
};