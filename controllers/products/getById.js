const productsModel = require('../../models/Products');
const { ok } = require('../../utils/httpStatus');

const getById = async (req, res) => {
  const { id } = req.params;

  const product = await productsModel.getById(id);

  res.status(ok).json(product);
};

module.exports = getById;
