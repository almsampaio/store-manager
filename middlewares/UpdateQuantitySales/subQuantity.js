const {
  updateSubProductsServices,
} = require('../../services/sales/salesServices');

const subProducts = async (req, _res, next) => {
  const products = req.body;

  await Promise
    .all(products
      .map(async ({ productId, quantity }) => updateSubProductsServices(productId, quantity)));

  next();
};

module.exports = { subProducts };