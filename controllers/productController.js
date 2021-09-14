// const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
// const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_NO_BODY_STATUS = 422;

const productService = require('../services/productService');

const getAll = async (req, res) => {
  const { name, quantity } = req.body;

  const { errorMessage, product } = await productService.getAll(name, quantity);

  if (errorMessage) return res.status(HTTP_NO_BODY_STATUS).json({ message: errorMessage });

  res.status(HTTP_CREATED_STATUS).json(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { errorMessage, product } = await productService.create(name, quantity);

  if (errorMessage) return res.status(HTTP_422).json({ message: errorMessage });

  res.status(HTTP_CREATED_STATUS).json(product);
};

module.exports = {
  create,
  getAll,
};