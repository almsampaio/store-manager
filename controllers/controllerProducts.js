const Service = require('../services');
const { HTTP_UNPROCESSABLE_ENTITY, HTTP_CREATED_STATUS } = require('../httpRequests');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await Service.products.addProduct({
    name,
    quantity,
  });

  if (product.err) return res.status(HTTP_UNPROCESSABLE_ENTITY).json(product);

  res.status(HTTP_CREATED_STATUS).json(product);
};

module.exports = {
  addProduct,
};