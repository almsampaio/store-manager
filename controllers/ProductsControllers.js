const Product = require('../services/ProductsServices');

const createNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await Product.createNewProduct(name, quantity);
  res.status(201).json(newProduct);
};

const listProducts = async (_req, res) => {
  const productsAll = await Product.listProducts();
  res.status(200).json({ products: productsAll });
};

const listAProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.listAProductById(id);
  if (product === null) {
    return res.status(422).json({
      err:
        { code: 'invalid_data', message: 'Wrong id format' },
    });
  }
  return res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const update = await Product.updateProduct(id, name, quantity);
  res.status(200).json(update.value);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const exclude = await Product.deleteProduct(id);
  if (!exclude) {
    return res.status(422)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  return res.status(200).json(exclude);
};

module.exports = {
  createNewProduct,
  listProducts,
  listAProductById,
  updateProduct,
  deleteProduct,
};