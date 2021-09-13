const ProductsService = require('../services/ProductsService');

const CREATED_STATUS = 201;
const UNPROCESSABLE_ENTITY_STATUS = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await ProductsService.create(name, quantity); // Interação com o Service

  if (product.err) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json(product);
  }

  return res.status(CREATED_STATUS).json(product);
};

module.exports = {
  create,
};
