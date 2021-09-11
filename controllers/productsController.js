const productsService = require('../services/productsService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsService.createProduct({ name, quantity });
  if (product.err) {
    const messageError = product.err;
    if (product.status === 422) {
      const INVALID_NAME_STATUS_422 = 422;
      return res.status(INVALID_NAME_STATUS_422).json({ messageError });
    }
  }
};

module.exports = {
  createProduct,
};
