const { HTTP_UNPROCESSABLE_ENTITY, HTTP_CREATED_STATUS } = require('../httpRequests');
const Service = require('../services');

const additionalSales = async (req, res) => {
  const product = await Service.sales.addSales(req.body);

  if (product.err) return res.status(HTTP_UNPROCESSABLE_ENTITY).json(product);

  res.status(HTTP_CREATED_STATUS).json(product);
};

module.exports = {
  additionalSales,
};