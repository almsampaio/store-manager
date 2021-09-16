const productService = require('../service/productService');

const HTTP_CREATED_STATUS = 201;
const HTTP_UNPROCESSABLE_ENTITY_STATUS = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { err, product } = await productService.create(name, quantity);
  if (err) {
  return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS)
    .json({ err }); 
  }
  res.status(HTTP_CREATED_STATUS).json(product);
};

module.exports = {
  create,
};
