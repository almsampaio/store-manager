const Products = require('../models/Products');

const create = async (name, quantity) => {
  const myProduct = await Products.findProduct(name);

  if (myProduct) return { status: 422, message: 'Product already exists' };

  const product = await Products.create(name, quantity);
  return { status: 201, data: product };
};

const findAllProducts = async () => {
  const allProducts = await Products.findAllProducts();
  return { status: 200, data: allProducts };
};

const findProductById = async (id) => {
  const productById = await Products.findProductById(id);
  if (!productById) return { status: 422, message: 'Wrong id format' };

  return { status: 200, data: productById };
};

module.exports = {
  create,
  findAllProducts,
  findProductById,
};
