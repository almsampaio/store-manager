const { ok } = require('../../utils/httpStatus');
const productModel = require('../../models/Products');

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = productModel.delete(id);

  res.status(ok).json(deletedProduct);
};

module.exports = deleteProduct;
