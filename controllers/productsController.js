const service = require('../services');
const { HTTP_CREATED_STATUS, HTTP_UNPROCESSABLE_STATUS } = require('../helpers');

// REQUISITO 1 ______________________________________________________________________ //

const createProduct = async (req, res) => {
  const product = req.body;

  const products = await service.produtsService.createProduct(product);
  if (products.err) {
    return res.status(HTTP_UNPROCESSABLE_STATUS).json(products);
  }
  return res.status(HTTP_CREATED_STATUS).json(products);
};

// ___________________________________________________________________________________ //

module.exports = {
  createProduct,
};
