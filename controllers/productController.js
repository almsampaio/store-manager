// const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
// const HTTP_NO_BODY_STATUS = 422;
const HTTP_422 = 422;
// const HTTP_NOT_FOUND_STATUS = 404;

const productService = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { errorMessage, product } = await productService.create(name, quantity);

  if (errorMessage) return res.status(HTTP_422).json({ message: errorMessage });

  res.status(HTTP_CREATED_STATUS).json(product);
};

module.exports = {
  create,
};