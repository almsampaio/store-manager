const productsModel = require('../../models/Products');
const { ok } = require('../../utils/httpStatus');

const getAll = async (_req, res) => {
  const products = await productsModel.getAll();

  res.status(ok).json(products);
};

module.exports = getAll;
