const serviceProduct = require('../services/products');
const status = require('../services/status');

const getAll = async (req, res) => {
  const productsAll = await serviceProduct.getAll();
  return res.status(status.HTTP_OK_STATUS).json({ products: productsAll });
};

const newProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const productNew = await serviceProduct.newProduct(name, quantity);
  if (productNew.err) {
    return res.status(status.UNPROCESSABLE_ENTITY).json(productNew);
  }
  res.status(status.HTTP_CREATE_STATUS).json(productNew);
};

const searchById = async (req, res) => {
  const { id } = req.params;
  const searchProduct = await serviceProduct.searchById(id);
  if (!searchProduct) {
    return res.status(status.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  // fix
  return res.status(status.HTTP_OK_STATUS).json(searchProduct);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const update = await serviceProduct.updateProduct(id, name, quantity);
  if (update.err) return res.status(status.UNPROCESSABLE_ENTITY).json(update);
  res.status(status.HTTP_OK_STATUS).json(update);
};

module.exports = {
  getAll,
  newProduct,
  searchById,
  updateProduct,
};
