const { addProduct, 
  getAll,
  getProductById,
  updateProductByid,
  deleteProductById,
} = require('../services/Products');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const products = await addProduct(name, quantity);

  if (products.err) return res.status(422).json({ err: products.err });

  res.status(201).json(products);
};

const getAllProducts = async (_req, res) => {
  const products = await getAll();
  res.status(200).json({ products });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id);

  if (product.err) return res.status(product.status).json({ err: product.err });

  res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await updateProductByid(name, quantity, id);

  if (product.err) return res.status(422).json({ err: product.err });

  res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await deleteProductById(id);

  if (product.err) return res.status(product.status).json({ err: product.err });

  res.status(200).json(product);
};

module.exports = {
  create,
  getAllProducts,
  getById,
  updateProduct,
  deleteProduct,
};
