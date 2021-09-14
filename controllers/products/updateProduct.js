const { ok } = require('../../utils/httpStatus');
const productModel = require('../../models/Products');

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  await productModel.update(id, { name, quantity });

  res.status(ok).json({ _id: id, name, quantity });
};

module.exports = updateProduct;
