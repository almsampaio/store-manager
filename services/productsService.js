const productsModel = require('../models/productsModel');

const create = async (name, quantity) => {
  if (!name || name.length < 5) return { message: "\"name\" length must be at leat 5 characters long" };
  if (quantity <= 0 ) return { message: "\"quantity\" must be larger than or equal to 1" };
  if (typeof quantity !== 'number') return { message: "\"quantity\" must be a number" };

  const didFindProduct = await productsModel.findByName(name);
  if (didFindProduct) return { message: "Product already exists" };

  const product = await productsModel.create(name, quantity);
  return { product };
}

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return products;
}

const getProductById = async (id) => {
  const product = await productsModel.findProductById(id);
  if (!product) return { message: "Wrong id format" };
  return { product };
}

const modifyProduct = async (id, name, quantity) => {
  if (!name || name.length < 5) return { message: "\"name\" length must be at leat 5 characters long" };
  if (quantity <= 0 ) return { message: "\"quantity\" must be larger than or equal to 1" };
  if (typeof quantity !== 'number') return { message: "\"quantity\" must be a number" };

  const changedProduct = await productsModel.changeProductInfo(id, name, quantity);
  return { changedProduct };
}

const remove = async (id) => {
  const product = await productsModel.remove(id);
  if (!product) return { message: "Wrong id format" }
  return { product }
}

module.exports = {
  create,
  getAllProducts,
  getProductById,
  modifyProduct,
  remove,
};
